import * as $array from "./Array";
import * as $log from "./Log";
var Native = /** @class */ (function () {
    function Native() {
        var _this = this;
        this._targets = [];
        this._observer = new ResizeObserver(function (entries) {
            $array.each(entries, function (entry) {
                $array.each(_this._targets, function (x) {
                    if (x.target === entry.target) {
                        x.callback();
                    }
                });
            });
        });
    }
    Native.prototype.addTarget = function (target, callback) {
        this._observer.observe(target, { box: "content-box" });
        this._targets.push({ target: target, callback: callback });
    };
    Native.prototype.removeTarget = function (target) {
        this._observer.unobserve(target);
        $array.keepIf(this._targets, function (x) {
            return x.target !== target;
        });
    };
    return Native;
}());
var Raf = /** @class */ (function () {
    function Raf() {
        this._targets = [];
    }
    Raf.prototype.addTarget = function (target, callback) {
        var _this = this;
        if (this._targets.length === 0) {
            var lastTime_1 = null;
            var loop_1 = function () {
                var currentTime = Date.now();
                if (lastTime_1 === null || currentTime > (lastTime_1 + Raf.delay)) {
                    lastTime_1 = currentTime;
                    $array.each(_this._targets, function (x) {
                        var newSize = x.target.getBoundingClientRect();
                        if (newSize.width !== x.size.width || newSize.height !== x.size.height) {
                            x.size = newSize;
                            x.callback();
                        }
                    });
                }
                _this._timer = requestAnimationFrame(loop_1);
            };
            this._timer = requestAnimationFrame(loop_1);
        }
        var size = target.getBoundingClientRect();
        this._targets.push({ target: target, callback: callback, size: size });
    };
    Raf.prototype.removeTarget = function (target) {
        $array.keepIf(this._targets, function (x) {
            return x.target !== target;
        });
        if (this._targets.length === 0) {
            cancelAnimationFrame(this._timer);
        }
    };
    Raf.delay = 200;
    return Raf;
}());
var observer = null;
function makeSensor() {
    if (observer === null) {
        if (typeof ResizeObserver !== "undefined") {
            observer = new Native();
        }
        else {
            observer = new Raf();
        }
    }
    return observer;
}
var ResizeSensor = /** @class */ (function () {
    function ResizeSensor(element, callback) {
        this._disposed = false;
        this._sensor = makeSensor();
        this._element = element;
        this._sensor.addTarget(element, callback);
    }
    ResizeSensor.prototype.isDisposed = function () {
        return this._disposed;
    };
    ResizeSensor.prototype.dispose = function () {
        if (!this._disposed) {
            this._disposed = true;
            this._sensor.removeTarget(this._element);
        }
    };
    Object.defineProperty(ResizeSensor.prototype, "sensor", {
        get: function () {
            return this._sensor;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deprecated: do not use.
     *
     * @ignore Exclude from docs
     */
    ResizeSensor.prototype.reset = function () {
        $log.warn("resizeSensor.reset() is no longer needed and can be removed");
    };
    return ResizeSensor;
}());
export { ResizeSensor };
//# sourceMappingURL=ResizeSensor.js.map