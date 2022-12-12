import { once, invariant, isAssignableTo } from "../utils/utils";
var rootContextCache = new WeakMap();
var Context = /** @class */ (function () {
    function Context(parentContext, modelSchema, json, onReadyCb, customArgs) {
        this.parentContext = parentContext;
        this.modelSchema = modelSchema;
        this.json = json;
        this.onReadyCb = onReadyCb;
        this.isRoot = !parentContext;
        this.pendingCallbacks = 0;
        this.pendingRefsCount = 0;
        this.target = undefined; // always set this property using setTarget
        this.hasError = false;
        if (!parentContext) {
            this.rootContext = this;
            this.args = customArgs;
            this.pendingRefs = {};
            this.resolvedRefs = {};
        }
        else {
            this.rootContext = parentContext.rootContext;
            this.args = parentContext.args;
        }
    }
    Context.prototype.createCallback = function (fn) {
        var _this = this;
        this.pendingCallbacks++;
        // once: defend against user-land calling 'done' twice
        return once(function (err, value) {
            if (err) {
                if (!_this.hasError) {
                    _this.hasError = true;
                    _this.onReadyCb(err);
                    rootContextCache.delete(_this);
                }
            }
            else if (!_this.hasError) {
                fn(value);
                if (--_this.pendingCallbacks === _this.pendingRefsCount) {
                    if (_this.pendingRefsCount > 0) {
                        // all pending callbacks are pending reference resolvers. not good.
                        _this.onReadyCb(new Error('Unresolvable references in json: "' +
                            Object.keys(_this.pendingRefs)
                                .filter(function (uuid) { return _this.pendingRefs[uuid].length > 0; })
                                .join('", "') +
                            '"'));
                        rootContextCache.delete(_this);
                    }
                    else {
                        _this.onReadyCb(null, _this.target);
                        rootContextCache.delete(_this);
                    }
                }
            }
        });
    };
    // given an object with uuid, modelSchema, callback, awaits until the given uuid is available
    // resolve immediately if possible
    Context.prototype.await = function (modelSchema, uuid, callback) {
        invariant(this.isRoot, "await can only be called on the root context");
        if (uuid in this.resolvedRefs) {
            var match = this.resolvedRefs[uuid].filter(function (resolved) {
                return isAssignableTo(resolved.modelSchema, modelSchema);
            })[0];
            if (match)
                return void callback(null, match.value);
        }
        this.pendingRefsCount++;
        if (!this.pendingRefs[uuid])
            this.pendingRefs[uuid] = [];
        this.pendingRefs[uuid].push({
            modelSchema: modelSchema,
            uuid: uuid,
            callback: callback,
        });
    };
    // given a model schema, uuid and value, resolve all references that were looking for this object
    Context.prototype.resolve = function (modelSchema, uuid, value) {
        invariant(this.isRoot, "resolve can only called on the root context");
        if (!this.resolvedRefs[uuid])
            this.resolvedRefs[uuid] = [];
        this.resolvedRefs[uuid].push({
            modelSchema: modelSchema,
            value: value,
        });
        if (uuid in this.pendingRefs) {
            for (var i = this.pendingRefs[uuid].length - 1; i >= 0; i--) {
                var opts = this.pendingRefs[uuid][i];
                if (isAssignableTo(modelSchema, opts.modelSchema)) {
                    this.pendingRefs[uuid].splice(i, 1);
                    this.pendingRefsCount--;
                    opts.callback(null, value);
                }
            }
        }
    };
    // set target and update root context cache
    Context.prototype.setTarget = function (target) {
        if (this.isRoot && this.target) {
            rootContextCache.delete(this.target);
        }
        this.target = target;
        rootContextCache.set(this.target, this);
    };
    // call all remaining reference lookup callbacks indicating an error during ref resolution
    Context.prototype.cancelAwaits = function () {
        invariant(this.isRoot, "cancelAwaits can only be called on the root context");
        var self = this;
        Object.keys(this.pendingRefs).forEach(function (uuid) {
            self.pendingRefs[uuid].forEach(function (refOpts) {
                self.pendingRefsCount--;
                refOpts.callback(new Error("Reference resolution canceled for " + uuid));
            });
        });
        this.pendingRefs = {};
        this.pendingRefsCount = 0;
    };
    return Context;
}());
export default Context;
export function getTargetContext(target) {
    return rootContextCache.get(target);
}
//# sourceMappingURL=Context.js.map