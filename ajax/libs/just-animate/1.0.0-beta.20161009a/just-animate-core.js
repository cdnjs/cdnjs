(function () {
'use strict';

var nada = null;
var nil = undefined;
var animate = 'animate';
var easingString = 'easing';

var cancel = 'cancel';
var cubicBezier = 'cubic-bezier';
var duration = 'duration';
var finish = 'finish';
var finished = 'finished';
var idle = 'idle';
var offsetString = 'offset';
var pause = 'pause';
var paused = 'paused';



var rotate = 'rotate';
var rotate3d = 'rotate3d';
var rotateX = 'rotateX';
var rotateY = 'rotateY';
var rotateZ = 'rotateZ';
var running = 'running';
var scale = 'scale';
var scale3d = 'scale3d';
var scaleX = 'scaleX';
var scaleY = 'scaleY';
var scaleZ = 'scaleZ';
var skew = 'skew';
var skewX = 'skewX';
var skewY = 'skewY';
var steps = 'steps';
var transform = 'transform';
var translate = 'translate';
var translate3d = 'translate3d';
var translateX = 'translateX';
var translateY = 'translateY';
var translateZ = 'translateZ';

var x = 'x';
var y = 'y';
var z = 'z';
var functionTypeString = '[object Function]';
var numberString = 'number';
var objectString = 'object';
var stringString = 'string';
var camelCaseRegex = /([a-z])[- ]([a-z])/ig;
var distanceExpression = /(-{0,1}[0-9.]+)(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|q|cm|in|pt|pc|\%){0,1}/;
var percentageExpression = /(-{0,1}[0-9.]+)%{0,1}/;
var timeExpression = /([+-][=]){0,1}([\-]{0,1}[0-9]+[\.]{0,1}[0-9]*){1}(s|ms){0,1}/;

var ostring = Object.prototype.toString;
function isArray(a) {
    return isDefined(a) && !isString(a) && !isFunction(a) && isNumber(a.length);
}
function isDefined(a) {
    return a !== nil && a !== nada && a !== '';
}
function isFunction(a) {
    return getTypeString(a) === functionTypeString;
}
function isNumber(a) {
    return typeof a === numberString;
}
function isObject(a) {
    return typeof a === objectString && a !== nada;
}
function isString(a) {
    return typeof a === stringString;
}
function getTypeString(val) {
    return ostring.call(val);
}

var slice = Array.prototype.slice;
var push = Array.prototype.push;

function head(indexed, predicate) {
    if (!indexed) {
        return nil;
    }
    var len = indexed.length;
    if (len < 1) {
        return nil;
    }
    if (predicate === nil) {
        return indexed[0];
    }
    for (var i = 0; i < len; i++) {
        var item = indexed[i];
        var result = predicate(item);
        if (result === true) {
            return item;
        }
    }
    return nil;
}
function tail(indexed, predicate) {
    if (!indexed) {
        return nil;
    }
    var len = indexed.length;
    if (len < 1) {
        return nil;
    }
    if (predicate === nil) {
        return indexed[len - 1];
    }
    for (var i = len - 1; i > -1; --i) {
        var item = indexed[i];
        var result = predicate(item);
        if (result === true) {
            return item;
        }
    }
    return nil;
}
function toArray(indexed, index) {
    return slice.call(indexed, index || 0);
}
function chain(indexed) {
    return isArray(indexed) ? indexed : [indexed];
}
function each(items, fn) {
    for (var i = 0, len = items.length; i < len; i++) {
        fn(items[i]);
    }
}

function maxBy(items, predicate) {
    var max = '';
    for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i];
        var prop = predicate(item);
        if (max < prop) {
            max = prop;
        }
    }
    return max;
}

function deepCopyObject(origin, dest) {
    dest = dest || {};
    for (var prop in origin) {
        deepCopyProperty(prop, origin, dest);
    }
    return dest;
}
function deepCopyProperty(prop, origin, dest) {
    var originProp = origin[prop];
    var destProp = dest[prop];
    var originType = getTypeString(originProp);
    var destType = getTypeString(destProp);
    if (originType !== destType) {
        destProp = nil;
    }
    if (isArray(originProp)) {
        dest[prop] = originProp.slice(0);
    }
    else if (isObject(originProp)) {
        dest[prop] = deepCopyObject(originProp, destProp);
    }
    else {
        dest[prop] = originProp;
    }
}
function inherit(target, source) {
    for (var propName in source) {
        if (!isDefined(target[propName])) {
            target[propName] = source[propName];
        }
    }
    return target;
}

function resolve(value, ctx) {
    if (!isFunction(value)) {
        return value;
    }
    return value(ctx.target, ctx.index, ctx.targets);
}
function listProps(indexed) {
    var props = [];
    var len = indexed.length;
    for (var i = 0; i < len; i++) {
        var item = indexed[i];
        for (var property in item) {
            if (props.indexOf(property) === -1) {
                props.push(property);
            }
        }
    }
    return props;
}

function inRange(val, min, max) {
    return min < max ? min <= val && val <= max : max <= val && val <= min;
}

function invalidArg(name) {
    return new Error("Bad: " + name);
}

function Dispatcher() {
    var self = this;
    self = self instanceof Dispatcher ? self : Object.create(Dispatcher.prototype);
    self._fn = {};
    return self;
}
Dispatcher.prototype = {
    _fn: nil,
    trigger: function (eventName, args) {
        var listeners = this._fn[eventName];
        if (!listeners) {
            return;
        }
        var len = listeners.length;
        for (var i = 0; i < len; i++) {
            var listener = listeners[i];
            listener.apply(nil, args);
        }
    },
    on: function (eventName, listener) {
        if (!isFunction(listener)) {
            throw invalidArg('listener');
        }
        var fn = this._fn;
        var listeners = fn[eventName];
        if (!listeners) {
            fn[eventName] = [listener];
            return;
        }
        if (listeners.indexOf(listener) !== -1) {
            return;
        }
        listeners.push(listener);
    },
    off: function (eventName, listener) {
        var listeners = this._fn[eventName];
        if (listeners) {
            var indexOfListener = listeners.indexOf(listener);
            if (indexOfListener !== -1) {
                listeners.splice(indexOfListener, 1);
            }
        }
    }
};

function camelCaseReplacer(match, p1, p2) {
    return p1 + p2.toUpperCase();
}
function toCamelCase(value) {
    return isString(value) ? value.replace(camelCaseRegex, camelCaseReplacer) : nil;
}
function startsWith(value, pattern) {
    return value.indexOf(pattern) === 0;
}
var cssFunction = function () {
    var args = arguments;
    return args[0] + "(" + toArray(args, 1).join(',') + ")";
};

var SUBDIVISION_EPSILON = 0.0001;
var cssFunctionRegex = /([a-z-]+)\(([^\)]+)\)/ig;
var linearCubicBezier = function (x$$1) { return x$$1; };
var stepAliases = {
    end: 0,
    start: 1
};
var easings = {
    ease: [cubicBezier, .25, .1, .25, 1],
    easeIn: [cubicBezier, .42, 0, 1, 1],
    easeInBack: [cubicBezier, .6, -.28, .735, .045],
    easeInCirc: [cubicBezier, .6, .04, .98, .335],
    easeInCubic: [cubicBezier, .55, .055, .675, .19],
    easeInExpo: [cubicBezier, .95, .05, .795, .035],
    easeInOut: [cubicBezier, .42, 0, .58, 1],
    easeInOutBack: [cubicBezier, .68, -.55, .265, 1.55],
    easeInOutCirc: [cubicBezier, .785, .135, .15, .86],
    easeInOutCubic: [cubicBezier, .645, .045, .355, 1],
    easeInOutExpo: [cubicBezier, 1, 0, 0, 1],
    easeInOutQuad: [cubicBezier, .455, .03, .515, .955],
    easeInOutQuart: [cubicBezier, .77, 0, .175, 1],
    easeInOutQuint: [cubicBezier, .86, 0, .07, 1],
    easeInOutSine: [cubicBezier, .445, .05, .55, .95],
    easeInQuad: [cubicBezier, .55, .085, .68, .53],
    easeInQuart: [cubicBezier, .895, .03, .685, .22],
    easeInQuint: [cubicBezier, .755, .05, .855, .06],
    easeInSine: [cubicBezier, .47, 0, .745, .715],
    easeOut: [cubicBezier, 0, 0, .58, 1],
    easeOutBack: [cubicBezier, .175, .885, .32, 1.275],
    easeOutCirc: [cubicBezier, .075, .82, .165, 1],
    easeOutCubic: [cubicBezier, .215, .61, .355, 1],
    easeOutExpo: [cubicBezier, .19, 1, .22, 1],
    easeOutQuad: [cubicBezier, .25, .46, .45, .94],
    easeOutQuart: [cubicBezier, .165, .84, .44, 1],
    easeOutQuint: [cubicBezier, .23, 1, .32, 1],
    easeOutSine: [cubicBezier, .39, .575, .565, 1],
    elegantSlowStartEnd: [cubicBezier, .175, .885, .32, 1.275],
    linear: [cubicBezier, 0, 0, 1, 1],
    stepEnd: [steps, 1, 'end'],
    stepStart: [steps, 1, 'start']
};
var defaultEasing = easings.ease;
function getEasingString(easingString$$1) {
    if (easingString$$1) {
        if (startsWith(easingString$$1, cubicBezier) || startsWith(easingString$$1, steps)) {
            return easingString$$1;
        }
        var def = easings[toCamelCase(easingString$$1)];
        if (def) {
            return cssFunction.apply(nil, def);
        }
    }
    return cssFunction.apply(nil, defaultEasing);
}
function getEasingFunction(easingString$$1) {
    var parts = getEasingDef(easingString$$1);
    return parts[0] === steps
        ? steps$1(parts[1], parts[2])
        : cubic(parts[1], parts[2], parts[3], parts[4]);
}
function getEasingDef(easingString$$1) {
    if (!easingString$$1) {
        return defaultEasing;
    }
    var def = easings[toCamelCase(easingString$$1)];
    if (def && def.length) {
        return def;
    }
    var matches = cssFunctionRegex.exec(easingString$$1);
    if (matches && matches.length) {
        return [matches[1]].concat(matches[2].split(','));
    }
    return defaultEasing;
}
function bezier(n1, n2, t) {
    return 3 * n1 * (1 - t) * (1 - t) * t + 3 * n2 * (1 - t) * t * t + t * t * t;
}
function cubic(p0, p1, p2, p3) {
    if (p0 < 0 || p0 > 1 || p2 < 0 || p2 > 1) {
        return linearCubicBezier;
    }
    return function (x$$1) {
        if (x$$1 === 0 || x$$1 === 1) {
            return x$$1;
        }
        var start = 0;
        var end = 1;
        var limit = 20;
        while (--limit) {
            var mid = (start + end) / 2;
            var xEst = bezier(p0, p2, mid);
            if (Math.abs(x$$1 - xEst) < SUBDIVISION_EPSILON) {
                return bezier(p1, p3, mid);
            }
            if (xEst < x$$1) {
                start = mid;
            }
            else {
                end = mid;
            }
        }
        return x$$1;
    };
}
function steps$1(count, pos) {
    var p = stepAliases.hasOwnProperty(pos)
        ? stepAliases[pos]
        : pos;
    var ratio = count / 1;
    return function (x$$1) { return x$$1 >= 1 ? 1 : (p * ratio + x$$1) - (p * ratio + x$$1) % ratio; };
}

var stepNone = '=';
var stepForward = '+=';
var stepBackward = '-=';








var px = 'px';






var percent = '%';
var millisecond = 'ms';
var second = 's';
function Unit() {
    var self = this instanceof Unit ? this : Object.create(Unit.prototype);
    return self;
}
Unit.prototype = {
    step: nil,
    unit: nil,
    value: nil,
    values: function (value, unit, step) {
        var self = this;
        self.value = value;
        self.unit = unit;
        self.step = step;
        return self;
    },
    toString: function () {
        return String(this.value) + this.unit;
    }
};
var sharedUnit = Unit();


function fromTime(val, unit) {
    var returnUnit = unit || Unit();
    if (isNumber(val)) {
        return returnUnit.values(Number(val), millisecond, stepNone);
    }
    var match = timeExpression.exec(val);
    var step = match[1] || stepNone;
    var unitType = match[3];
    var value = parseFloat(match[2]);
    var valueMs;
    if (unitType === nil || unitType === millisecond) {
        valueMs = value;
    }
    else if (unitType === second) {
        valueMs = value * 1000;
    }
    else {
        throw invalidArg('format');
    }
    return returnUnit.values(valueMs, millisecond, step);
}
function resolveTimeExpression(val, index) {
    fromTime(val, sharedUnit);
    if (sharedUnit.step === stepForward) {
        return sharedUnit.value * index;
    }
    if (sharedUnit.step === stepBackward) {
        return sharedUnit.value * index * -1;
    }
    return sharedUnit.value;
}

function queryElements(source) {
    if (!source) {
        throw invalidArg('source');
    }
    if (isString(source)) {
        var nodeResults = document.querySelectorAll(source);
        return toArray(nodeResults);
    }
    if (typeof source['tagName'] === 'string') {
        return [source];
    }
    if (isFunction(source)) {
        var provider = source;
        var result = provider();
        return queryElements(result);
    }
    if (isArray(source)) {
        var elements_1 = [];
        each(source, function (i) {
            var innerElements = queryElements(i);
            elements_1.push.apply(elements_1, innerElements);
        });
        return elements_1;
    }
    return [];
}

var animationPadding = 1.0 / 30;
var unitOut = Unit();
var Animator = (function () {
    function Animator(resolver, timeloop, plugins) {
        var self = this;
        if (!isDefined(duration)) {
            throw invalidArg(duration);
        }
        self._context = {};
        self._duration = 0;
        self._currentTime = nil;
        self._playState = 'idle';
        self._playbackRate = 1;
        self._events = [];
        self._resolver = resolver;
        self._timeLoop = timeloop;
        self._plugins = plugins;
        self._dispatcher = Dispatcher();
        self._onTick = self._onTick.bind(self);
        self.on(finish, self._onFinish);
        self.on(cancel, self._onCancel);
        self.on(pause, self._onPause);
        self.play();
        return self;
    }
    Animator.prototype.animate = function (options) {
        var self = this;
        if (isArray(options)) {
            each(options, function (e) { return self._addEvent(e); });
        }
        else {
            self._addEvent(options);
        }
        self._recalculate();
        return self;
    };
    Animator.prototype.cancel = function () {
        var self = this;
        self._dispatcher.trigger(cancel, [self]);
        return self;
    };
    Animator.prototype.duration = function () {
        return this._duration;
    };
    Animator.prototype.currentTime = function (value) {
        var self = this;
        if (!isDefined(value)) {
            return self._currentTime;
        }
        self._currentTime = value;
        return self;
    };
    Animator.prototype.finish = function () {
        var self = this;
        self._dispatcher.trigger(finish, [self]);
        return self;
    };
    Animator.prototype.playbackRate = function (value) {
        var self = this;
        if (!isDefined(value)) {
            return self._playbackRate;
        }
        self._playbackRate = value;
        return self;
    };
    Animator.prototype.playState = function (value) {
        var self = this;
        if (!isDefined(value)) {
            return self._playState;
        }
        self._playState = value;
        self._dispatcher.trigger('set', ['playbackState', value]);
        return self;
    };
    Animator.prototype.off = function (eventName, listener) {
        var self = this;
        self._dispatcher.off(eventName, listener);
        return self;
    };
    Animator.prototype.on = function (eventName, listener) {
        var self = this;
        self._dispatcher.on(eventName, listener);
        return self;
    };
    Animator.prototype.pause = function () {
        var self = this;
        self._dispatcher.trigger(pause, [self]);
        return self;
    };
    Animator.prototype.play = function () {
        var self = this;
        if (!(self._playState === 'running' || self._playState === 'pending')) {
            self._playState = 'pending';
            self._timeLoop.on(self._onTick);
        }
        return self;
    };
    Animator.prototype.reverse = function () {
        var self = this;
        self._playbackRate *= -1;
        return self;
    };
    Animator.prototype._recalculate = function () {
        var self = this;
        var endsAt = maxBy(self._events, function (e) { return e.startTimeMs + e.animator.totalDuration; });
        self._duration = endsAt;
    };
    Animator.prototype._addEvent = function (options) {
        var self = this;
        var event;
        if (options.mixins) {
            var mixinTarget = chain(options.mixins)
                .map(function (mixin) {
                var def = self._resolver.findAnimation(mixin);
                if (!isDefined(def)) {
                    throw invalidArg('mixin');
                }
                return def;
            })
                .reduce(function (c, n) { return deepCopyObject(n, c); });
            event = inherit(options, mixinTarget);
        }
        else {
            event = options;
        }
        fromTime(event.from || 0, unitOut);
        event.from = unitOut.value + this._duration;
        fromTime(event.to || 0, unitOut);
        event.to = unitOut.value + this._duration;
        var easingFn = getEasingFunction(event.easing);
        event.easing = getEasingString(event.easing);
        each(this._plugins, function (plugin) {
            if (plugin.canHandle(event)) {
                var targets = queryElements(event.targets);
                for (var i = 0, len = targets.length; i < len; i++) {
                    var target = targets[i];
                    var animator = plugin.handle({
                        index: i,
                        options: event,
                        target: target,
                        targets: targets
                    });
                    self._events.push({
                        animator: animator,
                        easingFn: easingFn,
                        endTimeMs: event.from + animator.totalDuration,
                        index: i,
                        startTimeMs: event.from,
                        target: target,
                        targets: targets
                    });
                }
            }
        });
    };
    Animator.prototype._onCancel = function (self) {
        self._timeLoop.off(self._onTick);
        self._currentTime = 0;
        self._playState = 'idle';
        each(self._events, function (evt) { evt.animator.playState('idle'); });
    };
    Animator.prototype._onFinish = function (self) {
        self._timeLoop.off(self._onTick);
        self._currentTime = 0;
        self._playState = 'finished';
        each(self._events, function (evt) { evt.animator.playState('finished'); });
    };
    Animator.prototype._onPause = function (self) {
        self._timeLoop.off(self._onTick);
        self._playState = 'paused';
        each(self._events, function (evt) { evt.animator.playState('paused'); });
    };
    Animator.prototype._onTick = function (delta, runningTime) {
        var self = this;
        var dispatcher = self._dispatcher;
        var playState = self._playState;
        var context = self._context;
        if (playState === 'idle') {
            dispatcher.trigger(cancel, [self]);
            return;
        }
        if (playState === 'finished') {
            dispatcher.trigger(finish, [self]);
            return;
        }
        if (playState === 'paused') {
            dispatcher.trigger(pause, [self]);
            return;
        }
        var playbackRate = self._playbackRate;
        var isReversed = playbackRate < 0;
        var duration1 = self._duration;
        var startTime = isReversed ? duration1 : 0;
        var endTime = isReversed ? 0 : duration1;
        if (self._playState === 'pending') {
            var currentTime_1 = self._currentTime;
            self._currentTime = currentTime_1 === nil || currentTime_1 === endTime ? startTime : currentTime_1;
            self._playState = 'running';
        }
        var currentTime = self._currentTime + delta * playbackRate;
        self._currentTime = currentTime;
        if (!inRange(currentTime, startTime, endTime)) {
            dispatcher.trigger(finish, [self]);
            return;
        }
        var events = self._events;
        var eventLength = events.length;
        for (var i = 0; i < eventLength; i++) {
            var evt = events[i];
            var startTimeMs = playbackRate < 0 ? evt.startTimeMs : evt.startTimeMs + animationPadding;
            var endTimeMs = playbackRate >= 0 ? evt.endTimeMs : evt.endTimeMs - animationPadding;
            var shouldBeActive = startTimeMs <= currentTime && currentTime <= endTimeMs;
            if (shouldBeActive) {
                var animator = evt.animator;
                if (animator.playState() !== 'running') {
                    animator.playbackRate(playbackRate);
                    animator.playState('running');
                }
                animator.playbackRate(playbackRate);
                if (animator.onupdate) {
                    var relativeDuration = evt.endTimeMs - evt.startTimeMs;
                    var relativeCurrentTime = currentTime - evt.startTimeMs;
                    var timeOffset = relativeCurrentTime / relativeDuration;
                    context.currentTime = relativeCurrentTime;
                    context.delta = delta;
                    context.duration = relativeDuration;
                    context.offset = timeOffset;
                    context.playbackRate = playbackRate;
                    context.computedOffset = evt.easingFn(timeOffset);
                    context.target = evt.target;
                    context.targets = evt.targets;
                    context.index = evt.index;
                    animator.onupdate(context);
                }
            }
        }
    };
    return Animator;
}());

var global = window;
var requestAnimationFrame = global.requestAnimationFrame;
var now = (performance && performance.now)
    ? function () { return performance.now(); }
    : function () { return Date.now(); };
var raf = (requestAnimationFrame)
    ? function (ctx, fn) {
        requestAnimationFrame(function () { fn(ctx); });
    }
    : function (ctx, fn) {
        setTimeout(function () { fn(ctx); }, 16.66);
    };

function TimeLoop() {
    var self = this instanceof TimeLoop ? this : Object.create(TimeLoop.prototype);
    self.active = [];
    self.elapses = [];
    self.isActive = nil;
    self.lastTime = nil;
    self.offs = [];
    self.ons = [];
    return self;
}
TimeLoop.prototype = {
    on: function (fn) {
        var self = this;
        var offs = self.offs;
        var ons = self.ons;
        var offIndex = offs.indexOf(fn);
        if (offIndex !== -1) {
            offs.splice(offIndex, 1);
        }
        if (ons.indexOf(fn) === -1) {
            ons.push(fn);
        }
        if (!self.isActive) {
            self.isActive = true;
            raf(self, update$1);
        }
    },
    off: function (fn) {
        var self = this;
        var offs = self.offs;
        var ons = self.ons;
        var onIndex = ons.indexOf(fn);
        if (onIndex !== -1) {
            ons.splice(onIndex, 1);
        }
        if (offs.indexOf(fn) === -1) {
            offs.push(fn);
        }
        if (!self.isActive) {
            self.isActive = true;
            raf(self, update$1);
        }
    }
};
function update$1(self) {
    updateOffs(self);
    updateOns(self);
    var callbacks = self.active;
    var elapses = self.elapses;
    var len = callbacks.length;
    var lastTime = self.lastTime || now();
    var thisTime = now();
    var delta = thisTime - lastTime;
    if (!len) {
        self.isActive = nil;
        self.lastTime = nil;
        return;
    }
    self.isActive = true;
    self.lastTime = thisTime;
    raf(self, update$1);
    for (var i = 0; i < len; i++) {
        var existingElapsed = elapses[i];
        var updatedElapsed = existingElapsed + delta;
        elapses[i] = updatedElapsed;
        callbacks[i](delta, updatedElapsed);
    }
}
function updateOffs(self) {
    var len = self.offs.length;
    var active = self.active;
    for (var i = 0; i < len; i++) {
        var fn = self.offs[i];
        var indexOfSub = active.indexOf(fn);
        if (indexOfSub !== -1) {
            active.splice(indexOfSub, 1);
            self.elapses.splice(indexOfSub, 1);
        }
    }
}
function updateOns(self) {
    var len = self.ons.length;
    var active = self.active;
    for (var i = 0; i < len; i++) {
        var fn = self.ons[i];
        if (active.indexOf(fn) === -1) {
            active.push(fn);
            self.elapses.push(0);
        }
    }
}

var presets = {};
var MixinService = (function () {
    function MixinService() {
        this.defs = {};
    }
    MixinService.prototype.findAnimation = function (name) {
        return this.defs[name] || presets[name] || nil;
    };
    MixinService.prototype.registerAnimation = function (animationOptions, isGlobal) {
        var name = animationOptions.name;
        if (isGlobal) {
            presets[name] = animationOptions;
            return;
        }
        this.defs[name] = animationOptions;
    };
    return MixinService;
}());

var JustAnimate = (function () {
    function JustAnimate() {
        this.easings = {
            ease: 'ease',
            easeIn: 'easeIn',
            easeInBack: 'easeInBack',
            easeInCirc: 'easeInCirc',
            easeInCubic: 'easeInCubic',
            easeInExpo: 'easeInExpo',
            easeInOut: 'easeInOut',
            easeInOutBack: 'easeInOutBack',
            easeInOutCirc: 'easeInOutCirc',
            easeInOutCubic: 'easeInOutCubic',
            easeInOutExpo: 'easeInOutExpo',
            easeInOutQuad: 'easeInOutQuad',
            easeInOutQuart: 'easeInOutQuart',
            easeInOutQuint: 'easeInOutQuint',
            easeInOutSine: 'easeInOutSine',
            easeInQuad: 'easeInQuad',
            easeInQuart: 'easeInQuart',
            easeInQuint: 'easeInQuint',
            easeInSine: 'easeInSine',
            easeOut: 'easeOut',
            easeOutBack: 'easeOutBack',
            easeOutCirc: 'easeOutCirc',
            easeOutCubic: 'easeOutCubic',
            easeOutExpo: 'easeOutExpo',
            easeOutQuad: 'easeOutQuad',
            easeOutQuart: 'easeOutQuart',
            easeOutQuint: 'easeOutQuint',
            easeOutSine: 'easeOutSine',
            elegantSlowStartEnd: 'elegantSlowStartEnd',
            linear: 'linear',
            stepEnd: 'stepEnd',
            stepStart: 'stepStart'
        };
        var self = this;
        self._resolver = new MixinService();
        self._timeLoop = TimeLoop();
        self.plugins = [];
    }
    JustAnimate.inject = function (animations) {
        var resolver = new MixinService();
        each(animations, function (a) { return resolver.registerAnimation(a, true); });
    };
    JustAnimate.prototype.animate = function (options) {
        return new Animator(this._resolver, this._timeLoop, this.plugins).animate(options);
    };
    JustAnimate.prototype.register = function (preset) {
        this._resolver.registerAnimation(preset, false);
    };
    JustAnimate.prototype.inject = function (animations) {
        var resolver = this._resolver;
        each(animations, function (a) { return resolver.registerAnimation(a, true); });
    };
    return JustAnimate;
}());

var KeyframeAnimator = (function () {
    function KeyframeAnimator(init) {
        this._init = init;
    }
    KeyframeAnimator.prototype.seek = function (value) {
        this._ensureInit();
        if (this._animator.currentTime !== value) {
            this._animator.currentTime = value;
        }
    };
    KeyframeAnimator.prototype.playbackRate = function (value) {
        this._ensureInit();
        if (this._animator.playbackRate !== value) {
            this._animator.playbackRate = value;
        }
    };
    KeyframeAnimator.prototype.reverse = function () {
        this._ensureInit();
        this._animator.playbackRate *= -1;
    };
    KeyframeAnimator.prototype.playState = function (value) {
        var self = this;
        self._ensureInit();
        var animator = self._animator;
        var playState = animator.playState;
        if (value === nil) {
            return playState;
        }
        if (value === finished) {
            animator.finish();
        }
        else if (value === idle) {
            animator.cancel();
        }
        else if (value === paused) {
            animator.pause();
        }
        else if (value === running) {
            animator.play();
        }
    };
    KeyframeAnimator.prototype._ensureInit = function () {
        if (this._init) {
            this._animator = this._init();
            this._init = nil;
        }
    };
    return KeyframeAnimator;
}());

var propertyAliases = {
    x: translateX,
    y: translateY,
    z: translateZ
};
var transforms = [
    'perspective',
    'matrix',
    translateX,
    translateY,
    translateZ,
    translate,
    translate3d,
    x,
    y,
    z,
    skew,
    skewX,
    skewY,
    rotateX,
    rotateY,
    rotateZ,
    rotate,
    rotate3d,
    scaleX,
    scaleY,
    scaleZ,
    scale,
    scale3d
];
function initAnimator(timings, ctx) {
    var options = ctx.options;
    var target = ctx.target;
    var css = options.css;
    var sourceKeyframes;
    if (isArray(css)) {
        sourceKeyframes = css;
        expandOffsets(sourceKeyframes);
    }
    else {
        sourceKeyframes = [];
        propsToKeyframes(css, sourceKeyframes, ctx);
    }
    var targetKeyframes = [];
    resolvePropertiesInKeyframes(sourceKeyframes, targetKeyframes, ctx);
    if (options.isTransition === true) {
        addTransition(targetKeyframes, target);
    }
    spaceKeyframes(targetKeyframes);
    arrangeKeyframes(targetKeyframes);
    fixPartialKeyframes(targetKeyframes);
    var animator = target[animate](targetKeyframes, timings);
    animator.cancel();
    return animator;
}
function addTransition(keyframes, target) {
    var properties = listProps(keyframes);
    var style = window.getComputedStyle(target);
    var firstFrame = { offset: 0 };
    keyframes.splice(0, 0, firstFrame);
    properties.forEach(function (property) {
        if (property === offsetString) {
            return;
        }
        var alias = transforms.indexOf(property) !== -1 ? transform : property;
        var val = style[alias];
        if (isDefined(val)) {
            firstFrame[alias] = val;
        }
    });
}
function expandOffsets(keyframes) {
    var len = keyframes.length;
    for (var i = len - 1; i > -1; --i) {
        var keyframe = keyframes[i];
        if (isArray(keyframe.offset)) {
            keyframes.splice(i, 1);
            var offsets = keyframe.offset;
            var offsetLen = offsets.length;
            for (var j = offsetLen - 1; j > -1; --j) {
                var offsetAmount = offsets[j];
                var newKeyframe = {};
                for (var prop in keyframe) {
                    if (prop !== offsetString) {
                        newKeyframe[prop] = keyframe[prop];
                    }
                }
                newKeyframe.offset = offsetAmount;
                keyframes.splice(i, 0, newKeyframe);
            }
        }
    }
}
function resolvePropertiesInKeyframes(source, target, ctx) {
    var len = source.length;
    for (var i = 0; i < len; i++) {
        var sourceKeyframe = source[i];
        var targetKeyframe = {};
        for (var propertyName in sourceKeyframe) {
            if (!sourceKeyframe.hasOwnProperty(propertyName)) {
                continue;
            }
            var sourceValue = sourceKeyframe[propertyName];
            if (!isDefined(sourceValue)) {
                continue;
            }
            targetKeyframe[propertyName] = resolve(sourceValue, ctx);
        }
        normalizeProperties(targetKeyframe);
        target.push(targetKeyframe);
    }
}
function propsToKeyframes(css, keyframes, ctx) {
    var keyframesByOffset = {};
    var cssProps = css;
    for (var prop in cssProps) {
        if (!cssProps.hasOwnProperty(prop)) {
            continue;
        }
        var val = resolve(cssProps[prop], ctx);
        if (isArray(val)) {
            var valAsArray = val;
            var valLength = valAsArray.length;
            for (var i = 0; i < valLength; i++) {
                var offset = i === 0 ? 0 : i === valLength - 1 ? 1 : i / (valLength - 1.0);
                var keyframe = keyframesByOffset[offset];
                if (!keyframe) {
                    keyframe = {};
                    keyframesByOffset[offset] = keyframe;
                }
                keyframe[prop] = val[i];
            }
        }
        else {
            var keyframe = keyframesByOffset[1];
            if (!keyframe) {
                keyframe = {};
                keyframesByOffset[1] = keyframe;
            }
            keyframe[prop] = val;
        }
    }
    for (var offset in keyframesByOffset) {
        var keyframe = keyframesByOffset[offset];
        keyframe.offset = Number(offset);
        keyframes.push(keyframe);
    }
    keyframes.sort(keyframeOffsetComparer);
}
function spaceKeyframes(keyframes) {
    if (keyframes.length < 2) {
        return;
    }
    var first = keyframes[0];
    if (first.offset !== 0) {
        first.offset = 0;
    }
    var last = keyframes[keyframes.length - 1];
    if (last.offset !== 1) {
        last.offset = 1;
    }
    var len = keyframes.length;
    var lasti = len - 1;
    for (var i = 1; i < lasti; i++) {
        var target = keyframes[i];
        if (isNumber(target.offset)) {
            continue;
        }
        for (var j = i + 1; j < len; j++) {
            if (!isNumber(keyframes[j].offset)) {
                continue;
            }
            var startTime = keyframes[i - 1].offset;
            var endTime = keyframes[j].offset;
            var timeDelta = endTime - startTime;
            var deltaLength = j - i + 1;
            for (var k = 1; k < deltaLength; k++) {
                keyframes[k - 1 + i].offset = ((k / j) * timeDelta) + startTime;
            }
            i = j;
            break;
        }
    }
}
function arrangeKeyframes(keyframes) {
    if (keyframes.length < 1) {
        return;
    }
    var first = head(keyframes, function (k) { return k.offset === 0; })
        || head(keyframes, function (k) { return k.offset === nil; });
    if (first === nil) {
        first = {};
        keyframes.splice(0, 0, first);
    }
    if (first.offset !== 0) {
        first.offset = 0;
    }
    var last = tail(keyframes, function (k) { return k.offset === 1; })
        || tail(keyframes, function (k) { return k.offset === nil; });
    if (last === nil) {
        last = {};
        keyframes.push(last);
    }
    if (last.offset !== 1) {
        last.offset = 0;
    }
    keyframes.sort(keyframeOffsetComparer);
}
function fixPartialKeyframes(keyframes) {
    if (keyframes.length < 1) {
        return;
    }
    var first = head(keyframes);
    var last = tail(keyframes);
    var len = keyframes.length;
    for (var i = 1; i < len; i++) {
        var keyframe = keyframes[i];
        for (var prop in keyframe) {
            if (prop !== offsetString && !isDefined(first[prop])) {
                first[prop] = keyframe[prop];
            }
        }
    }
    for (var i = len - 2; i > -1; i--) {
        var keyframe = keyframes[i];
        for (var prop in keyframe) {
            if (prop !== offsetString && !isDefined(last[prop])) {
                last[prop] = keyframe[prop];
            }
        }
    }
}
function keyframeOffsetComparer(a, b) {
    return a.offset - b.offset;
}
function transformPropertyComparer(a, b) {
    return transforms.indexOf(a[0]) - transforms.indexOf(b[0]);
}
function normalizeProperties(keyframe) {
    var cssTransforms = [];
    for (var prop in keyframe) {
        var value = keyframe[prop];
        if (!isDefined(value)) {
            keyframe[prop] = nil;
            continue;
        }
        keyframe[prop] = nil;
        var propAlias = propertyAliases[prop] || prop;
        var transformIndex = transforms.indexOf(propAlias);
        if (transformIndex !== -1) {
            cssTransforms.push([propAlias, value]);
        }
        else if (propAlias === easingString) {
            keyframe[easingString] = getEasingString(value);
        }
        else {
            keyframe[toCamelCase(propAlias)] = value;
        }
    }
    if (cssTransforms.length) {
        keyframe[transform] = cssTransforms
            .sort(transformPropertyComparer)
            .reduce(function (c, n) { return c + (" " + n[0] + "(" + n[1] + ")"); }, '');
    }
}

var KeyframePlugin = (function () {
    function KeyframePlugin() {
    }
    KeyframePlugin.prototype.canHandle = function (options) {
        return !!(options.css);
    };
    KeyframePlugin.prototype.handle = function (ctx) {
        var options = ctx.options;
        var delay = resolveTimeExpression(resolve(options.delay, ctx) || 0, ctx.index);
        var endDelay = resolveTimeExpression(resolve(options.endDelay, ctx) || 0, ctx.index);
        var iterations = resolve(options.iterations, ctx) || 1;
        var iterationStart = resolve(options.iterationStart, ctx) || 0;
        var direction = resolve(options.direction, ctx) || nil;
        var duration$$1 = options.to - options.from;
        var fill = resolve(options.fill, ctx) || 'none';
        var totalTime = delay + ((iterations || 1) * duration$$1) + endDelay;
        var easing = getEasingString(options.easing);
        var timings = {
            delay: delay,
            endDelay: endDelay,
            duration: duration$$1,
            iterations: iterations,
            iterationStart: iterationStart,
            fill: fill,
            direction: direction,
            easing: easing
        };
        var animator = new KeyframeAnimator(initAnimator.bind(nada, timings, ctx));
        animator.totalDuration = totalTime;
        if (isFunction(options.update)) {
            animator.onupdate = options.update;
        }
        return animator;
    };
    return KeyframePlugin;
}());

if (typeof angular !== 'undefined') {
    angular.module('just.animate', []).service('just', JustAnimate);
}
var just = new JustAnimate();
just.plugins.push(new KeyframePlugin());
window.just = just;

}());
