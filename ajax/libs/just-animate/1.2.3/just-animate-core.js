(function () {
'use strict';

function isArray(a) {
    return isDefined(a) && !isString(a) && !isFunction(a) && isNumber(a.length);
}
function isDefined(a) {
    return !!a || a === 0 || a === false;
}
function isElement(target) {
    return !!target && typeof target['tagName'] === 'string';
}
function isFunction(a) {
    return getTypeString(a) === '[object Function]';
}
function isNumber(a) {
    return typeof a === 'number';
}
function isObject(a) {
    return typeof a === 'object' && !!a;
}
function isString(a) {
    return typeof a === 'string';
}
function getTypeString(val) {
    return Object.prototype.toString.call(val);
}

var slice = Array.prototype.slice;

function head(indexed, predicate) {
    if (!indexed) {
        return undefined;
    }
    var len = indexed.length;
    if (len < 1) {
        return undefined;
    }
    if (predicate === undefined) {
        return indexed[0];
    }
    for (var _i = 0, _a = indexed; _i < _a.length; _i++) {
        var item = _a[_i];
        if (predicate(item)) {
            return item;
        }
    }
    return undefined;
}
function tail(indexed, predicate) {
    if (!indexed) {
        return undefined;
    }
    var len = indexed.length;
    if (len < 1) {
        return undefined;
    }
    if (predicate === undefined) {
        return indexed[len - 1];
    }
    for (var _i = 0, _a = indexed; _i < _a.length; _i++) {
        var item = _a[_i];
        if (predicate(item)) {
            return item;
        }
    }
    return undefined;
}
function toArray(indexed, index) {
    return slice.call(indexed, index || 0);
}
function chain(indexed) {
    return isArray(indexed) ? indexed : [indexed];
}
function maxBy(items, predicate) {
    var max = '';
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var prop = predicate(item);
        if (max < prop) {
            max = prop;
        }
    }
    return max;
}

function invalidArg(name) {
    return new Error("Bad: " + name);
}
function unsupported(msg) {
    return new Error("Unsupported: " + msg);
}

function getTargets(target) {
    if (!target) {
        throw invalidArg('source');
    }
    if (isString(target)) {
        return toArray(document.querySelectorAll(target));
    }
    if (isElement(target)) {
        return [target];
    }
    if (isFunction(target)) {
        var provider = target;
        var result = provider();
        return getTargets(result);
    }
    if (isArray(target)) {
        var elements = [];
        for (var _i = 0, _a = target; _i < _a.length; _i++) {
            var i = _a[_i];
            var innerElements = getTargets(i);
            elements.push.apply(elements, innerElements);
        }
        return elements;
    }
    if (isObject(target)) {
        return [target];
    }
    return [];
}
function splitText(target) {
    var characters = [];
    var words = [];
    var elements = getTargets(target);
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var element = elements_1[_i];
        if (element.getAttribute('ja-split-text')) {
            var ws_1 = toArray(element.querySelectorAll('[ja-word]'));
            var cs = toArray(element.querySelectorAll('[ja-character]'));
            if (ws_1.length || cs.length) {
                words.push.apply(words, ws_1);
                characters.push.apply(characters, cs);
                continue;
            }
        }
        var contents = element.textContent.replace(/[\r\n\s\t]+/ig, ' ').trim();
        element.innerHTML = '';
        element.setAttribute('ja-split', '');
        var ws = contents.split(/[\s]+/ig);
        for (var i = 0, len = ws.length; i < len; i++) {
            var w = ws[i];
            var word = document.createElement('div');
            applySplitStyles(word);
            word.setAttribute('ja-word', w);
            words.push(word);
            if (i > 0) {
                var space = document.createElement('div');
                applySplitStyles(space);
                space.innerHTML = '&nbsp;';
                space.setAttribute('ja-space', '');
                element.appendChild(space);
            }
            element.appendChild(word);
            for (var _a = 0, w_1 = w; _a < w_1.length; _a++) {
                var c = w_1[_a];
                var char = document.createElement('div');
                applySplitStyles(char);
                char.textContent = c;
                char.setAttribute('ja-character', c);
                characters.push(char);
                word.appendChild(char);
            }
        }
    }
    return {
        characters: characters,
        words: words
    };
}
function applySplitStyles(element) {
    element.style.display = 'inline-block';
    element.style.position = 'relative';
    element.style.textAlign = 'start';
}

function inRange(val, min, max) {
    return min < max ? min <= val && val <= max : max <= val && val <= min;
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
        destProp = undefined;
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
    var result = target;
    for (var propName in source) {
        if (!isDefined(result[propName])) {
            result[propName] = source[propName];
        }
    }
    return result;
}

function resolve(value, ctx) {
    return isFunction(value) ? value(ctx) : value;
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

function shuffle(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}
function random(first, last, unit, wholeNumbersOnly) {
    var val = first + (Math.random() * (last - first));
    if (wholeNumbersOnly === true) {
        val = Math.floor(val);
    }
    return !unit ? val : val + unit;
}

var camelCaseRegex = /([a-z])[- ]([a-z])/ig;
var measureExpression = /^[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]*){1}[ ]*([a-z%]+){0,1}$/i;
var unitExpression = /^([+-][=]){0,1}[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]*){0,1}[ ]*(to){0,1}[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]*)[ ]*([a-z%]+){0,1}[ ]*$/i;

function camelCaseReplacer(match, p1, p2) {
    return p1 + p2.toUpperCase();
}
function toCamelCase(value) {
    return isString(value) ? value.replace(camelCaseRegex, camelCaseReplacer) : '';
}
function startsWith(value, pattern) {
    return value.indexOf(pattern) === 0;
}
var cssFunction = function () {
    var args = arguments;
    return args[0] + "(" + toArray(args, 1).join(',') + ")";
};

var stepBackward = '-=';
function createUnitResolver(val) {
    if (!isDefined(val)) {
        return function () { return ({ unit: undefined, value: 0 }); };
    }
    if (isNumber(val)) {
        return function () { return ({ unit: undefined, value: val }); };
    }
    var match = unitExpression.exec(val);
    var stepTypeString = match[1];
    var startString = match[2];
    var toOperator = match[3];
    var endValueString = match[4];
    var unitTypeString = match[5];
    var startCo = startString ? parseFloat(startString) : undefined;
    var endCo = endValueString ? parseFloat(endValueString) : undefined;
    var sign = stepTypeString === stepBackward ? -1 : 1;
    var isIndexed = !!stepTypeString;
    var isRange = toOperator === 'to';
    var resolver = function (index) {
        var index2 = isIndexed && isDefined(index) ? index + 1 : 1;
        var value = isRange
            ? random(startCo * (index2) * sign, (endCo - startCo) * index2 * sign)
            : startCo * index2 * sign;
        return {
            unit: unitTypeString || undefined,
            value: value
        };
    };
    return resolver;
}
function parseUnit(val, output) {
    output = output || {};
    if (!isDefined(val)) {
        output.unit = undefined;
        output.value = undefined;
    }
    else if (isNumber(val)) {
        output.unit = undefined;
        output.value = val;
    }
    else {
        var match = measureExpression.exec(val);
        var startString = match[1];
        var unitTypeString = match[2];
        output.unit = unitTypeString || undefined;
        output.value = startString ? parseFloat(startString) : undefined;
    }
    return output;
}
function getCanonicalTime(unit) {
    if (unit.unit === 's') {
        return unit.value * 1000;
    }
    return unit.value;
}

function now() {
    return performance && performance.now ? performance.now() : Date.now();
}
function raf(ctx, fn) {
    var callback = function () { fn(ctx); };
    return requestAnimationFrame
        ? requestAnimationFrame(callback)
        : setTimeout(callback, 16.66);
}

var Dispatcher = (function () {
    function Dispatcher() {
        this._fn = {};
    }
    Dispatcher.prototype.trigger = function (eventName, resolvable) {
        var listeners = this._fn[eventName];
        if (!listeners) {
            return;
        }
        var ctx = isFunction(resolvable)
            ? resolvable()
            : resolvable;
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener(ctx);
        }
    };
    Dispatcher.prototype.on = function (eventName, listener) {
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
    };
    Dispatcher.prototype.off = function (eventName, listener) {
        var listeners = this._fn[eventName];
        if (listeners) {
            var indexOfListener = listeners.indexOf(listener);
            if (indexOfListener !== -1) {
                listeners.splice(indexOfListener, 1);
            }
        }
    };
    return Dispatcher;
}());

var SUBDIVISION_EPSILON = 0.0001;
var cssFunctionRegex = /([a-z-]+)\(([^\)]+)\)/ig;
var linearCubicBezier = function (x) { return x; };
var stepAliases = {
    end: 0,
    start: 1
};
var cb = 'cubic-bezier';
var st = 'steps';
var easings = {
    ease: [cb, .25, .1, .25, 1],
    easeIn: [cb, .42, 0, 1, 1],
    easeInBack: [cb, .6, -.28, .735, .045],
    easeInCirc: [cb, .6, .04, .98, .335],
    easeInCubic: [cb, .55, .055, .675, .19],
    easeInExpo: [cb, .95, .05, .795, .035],
    easeInOut: [cb, .42, 0, .58, 1],
    easeInOutBack: [cb, .68, -.55, .265, 1.55],
    easeInOutCirc: [cb, .785, .135, .15, .86],
    easeInOutCubic: [cb, .645, .045, .355, 1],
    easeInOutExpo: [cb, 1, 0, 0, 1],
    easeInOutQuad: [cb, .455, .03, .515, .955],
    easeInOutQuart: [cb, .77, 0, .175, 1],
    easeInOutQuint: [cb, .86, 0, .07, 1],
    easeInOutSine: [cb, .445, .05, .55, .95],
    easeInQuad: [cb, .55, .085, .68, .53],
    easeInQuart: [cb, .895, .03, .685, .22],
    easeInQuint: [cb, .755, .05, .855, .06],
    easeInSine: [cb, .47, 0, .745, .715],
    easeOut: [cb, 0, 0, .58, 1],
    easeOutBack: [cb, .175, .885, .32, 1.275],
    easeOutCirc: [cb, .075, .82, .165, 1],
    easeOutCubic: [cb, .215, .61, .355, 1],
    easeOutExpo: [cb, .19, 1, .22, 1],
    easeOutQuad: [cb, .25, .46, .45, .94],
    easeOutQuart: [cb, .165, .84, .44, 1],
    easeOutQuint: [cb, .23, 1, .32, 1],
    easeOutSine: [cb, .39, .575, .565, 1],
    elegantSlowStartEnd: [cb, .175, .885, .32, 1.275],
    linear: [cb, 0, 0, 1, 1],
    stepEnd: [st, 1, 'end'],
    stepStart: [st, 1, 'start']
};
var defaultEasing = easings.ease;
function getEasingString(easingString) {
    if (easingString) {
        if (startsWith(easingString, cb) || startsWith(easingString, st)) {
            return easingString;
        }
        var def = easings[toCamelCase(easingString)];
        if (def) {
            return cssFunction.apply(undefined, def);
        }
    }
    return cssFunction.apply(undefined, defaultEasing);
}
function getEasingFunction(easingString) {
    var parts = getEasingDef(easingString);
    return parts[0] === st
        ? steps(parts[1], parts[2])
        : cubic(parts[1], parts[2], parts[3], parts[4]);
}
function getEasingDef(easingString) {
    if (!easingString) {
        return defaultEasing;
    }
    var def = easings[toCamelCase(easingString)];
    if (def && def.length) {
        return def;
    }
    var matches = cssFunctionRegex.exec(easingString);
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
    return function (x) {
        if (x === 0 || x === 1) {
            return x;
        }
        var start = 0;
        var end = 1;
        var limit = 20;
        while (--limit) {
            var mid = (start + end) / 2;
            var xEst = bezier(p0, p2, mid);
            if (Math.abs(x - xEst) < SUBDIVISION_EPSILON) {
                return bezier(p1, p3, mid);
            }
            if (xEst < x) {
                start = mid;
            }
            else {
                end = mid;
            }
        }
        return x;
    };
}
function steps(count, pos) {
    var p = stepAliases.hasOwnProperty(pos)
        ? stepAliases[pos]
        : pos;
    var ratio = count / 1;
    return function (x) { return x >= 1 ? 1 : (p * ratio + x) - (p * ratio + x) % ratio; };
}

var noop = function () { };
var animationPadding = (1.0 / 60) + 7;
var Animator = (function () {
    function Animator(resolver, timeloop, plugins) {
        var self = this;
        self._context = {};
        self._duration = 0;
        self._currentTime = undefined;
        self._currentIteration = undefined;
        self._playState = 'idle';
        self._playbackRate = 1;
        self._events = [];
        self._resolver = resolver;
        self._timeLoop = timeloop;
        self._plugins = plugins;
        self._dispatcher = new Dispatcher();
        self._onTick = function (delta, runningTime) { return tick(self, delta, runningTime); };
        self.on('finish', function (ctx) { return self._onFinish(ctx); });
        self.on('cancel', function (ctx) { return self._onCancel(ctx); });
        self.on('pause', function (ctx) { return self._onPause(ctx); });
        self.play();
        return self;
    }
    Animator.prototype.animate = function (options) {
        var self = this;
        if (isArray(options)) {
            for (var _i = 0, _a = options; _i < _a.length; _i++) {
                var e = _a[_i];
                self._addEvent(e);
            }
        }
        else {
            self._addEvent(options);
        }
        self._recalculate();
        return self;
    };
    Animator.prototype.cancel = function () {
        var self = this;
        self._dispatcher.trigger('cancel', self._context);
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
        self._dispatcher.trigger('finish', self._context);
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
        return self;
    };
    Animator.prototype.off = function (event, listener) {
        if (listener === void 0) { listener = undefined; }
        var self = this;
        if (typeof event === 'string' && listener !== undefined) {
            self._dispatcher.off(event, listener);
        }
        else {
            var eventConfig = event;
            for (var eventName in eventConfig) {
                var listener1 = eventConfig[eventName];
                if (listener1) {
                    self._dispatcher.off(eventName, listener1);
                }
            }
        }
        return self;
    };
    Animator.prototype.on = function (event, listener) {
        if (listener === void 0) { listener = undefined; }
        var self = this;
        if (typeof event === 'string' && listener !== undefined) {
            self._dispatcher.on(event, listener);
        }
        else {
            var eventConfig = event;
            for (var eventName in eventConfig) {
                var listener1 = eventConfig[eventName];
                if (listener1) {
                    self._dispatcher.on(eventName, listener1);
                }
            }
        }
        return self;
    };
    Animator.prototype.pause = function () {
        var self = this;
        self._dispatcher.trigger('pause', self._context);
        return self;
    };
    Animator.prototype.play = function (options) {
        var self = this;
        var totalIterations = 0;
        var direction = 'normal';
        if (options) {
            if (!isNumber(options)) {
                var playOptions = options;
                if (playOptions.iterations) {
                    totalIterations = playOptions.iterations;
                }
                if (playOptions.direction) {
                    direction = playOptions.direction;
                }
            }
            else {
                totalIterations = options;
            }
        }
        if (!totalIterations) {
            totalIterations = 1;
        }
        if (!direction) {
            direction = 'normal';
        }
        self._totalIterations = totalIterations;
        self._direction = direction;
        if (!(self._playState === 'running' || self._playState === 'pending')) {
            self._playState = 'pending';
            self._timeLoop.on(self._onTick);
            self._dispatcher.trigger('play', self._context);
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
        self._duration = maxBy(self._events, function (e) { return e.startTimeMs + e.animator.totalDuration; });
    };
    Animator.prototype._resolveMixins = function (options) {
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
        return event;
    };
    Animator.prototype._addEvent = function (options) {
        var self = this;
        var event = self._resolveMixins(options);
        event.from = getCanonicalTime(parseUnit(event.from || 0)) + self._duration;
        event.to = getCanonicalTime(parseUnit(event.to || 0)) + self._duration;
        var easingFn = getEasingFunction(event.easing);
        event.easing = getEasingString(event.easing);
        var delay = event.delay || 0;
        var endDelay = event.endDelay || 0;
        var targets = getTargets(event.targets);
        var targetLength = targets.length;
        for (var i = 0, len = targetLength; i < len; i++) {
            var target = targets[i];
            var ctx = {
                index: i,
                options: event,
                target: target,
                targets: targets
            };
            if (event.on && isFunction(event.on.create)) {
                event.on.create(ctx);
            }
            var playFunction = event.on && isFunction(event.on.play) ? event.on.play : noop;
            var pauseFunction = event.on && isFunction(event.on.pause) ? event.on.pause : noop;
            var cancelFunction = event.on && isFunction(event.on.cancel) ? event.on.cancel : noop;
            var finishFunction = event.on && isFunction(event.on.finish) ? event.on.finish : noop;
            var updateFunction = event.on && isFunction(event.on.update) ? event.on.update : noop;
            var delayUnit = createUnitResolver(resolve(delay, ctx) || 0)(i);
            event.delay = getCanonicalTime(delayUnit);
            var endDelayUnit = createUnitResolver(resolve(endDelay, ctx) || 0)(i);
            event.endDelay = getCanonicalTime(endDelayUnit);
            var iterations = resolve(options.iterations, ctx) || 1;
            var iterationStart = resolve(options.iterationStart, ctx) || 0;
            var direction = resolve(options.direction, ctx) || undefined;
            var duration = options.to - options.from;
            var fill = resolve(options.fill, ctx) || 'none';
            var totalTime = event.delay + ((iterations || 1) * duration) + event.endDelay;
            var easing = getEasingString(options.easing);
            var timings = {
                delay: event.delay,
                endDelay: event.endDelay,
                duration: duration,
                iterations: iterations,
                iterationStart: iterationStart,
                fill: fill,
                direction: direction,
                easing: easing,
                totalTime: totalTime
            };
            for (var _i = 0, _a = self._plugins; _i < _a.length; _i++) {
                var plugin = _a[_i];
                if (!plugin.canHandle(ctx)) {
                    continue;
                }
                var animator = plugin.handle(timings, ctx);
                self._events.push({
                    animator: animator,
                    cancel: cancelFunction,
                    easingFn: easingFn,
                    endTimeMs: event.from + animator.totalDuration,
                    finish: finishFunction,
                    index: i,
                    pause: pauseFunction,
                    play: playFunction,
                    startTimeMs: event.from,
                    target: target,
                    targets: targets,
                    update: updateFunction
                });
            }
        }
    };
    Animator.prototype._onCancel = function (ctx) {
        var self = this;
        var context = self._context;
        self._timeLoop.off(self._onTick);
        self._currentTime = 0;
        self._currentIteration = undefined;
        self._playState = 'idle';
        for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
            var evt = _a[_i];
            evt.animator.playState('idle');
        }
        for (var _b = 0, _c = self._events; _b < _c.length; _b++) {
            var evt = _c[_b];
            context.target = evt.target;
            context.targets = evt.targets;
            context.index = evt.index;
            evt.cancel(self._context);
        }
    };
    Animator.prototype._onFinish = function (ctx) {
        var self = this;
        var context = self._context;
        self._timeLoop.off(self._onTick);
        self._currentTime = undefined;
        self._currentIteration = undefined;
        self._playState = 'finished';
        for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
            var evt = _a[_i];
            evt.animator.playState('finished');
        }
        for (var _b = 0, _c = self._events; _b < _c.length; _b++) {
            var evt = _c[_b];
            context.target = evt.target;
            context.targets = evt.targets;
            context.index = evt.index;
            evt.finish(self._context);
        }
    };
    Animator.prototype._onPause = function (ctx) {
        var self = this;
        var context = self._context;
        self._timeLoop.off(self._onTick);
        self._playState = 'paused';
        for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
            var evt = _a[_i];
            evt.animator.playState('paused');
        }
        for (var _b = 0, _c = self._events; _b < _c.length; _b++) {
            var evt = _c[_b];
            context.target = evt.target;
            context.targets = evt.targets;
            context.index = evt.index;
            evt.pause(self._context);
        }
    };
    return Animator;
}());
function tick(self, delta, runningTime) {
    var dispatcher = self._dispatcher;
    var playState = self._playState;
    var context = self._context;
    if (playState === 'idle') {
        dispatcher.trigger('cancel', context);
        return;
    }
    if (playState === 'finished') {
        dispatcher.trigger('finish', context);
        return;
    }
    if (playState === 'paused') {
        dispatcher.trigger('pause', context);
        return;
    }
    var duration1 = self._duration;
    var totalIterations = self._totalIterations;
    var playbackRate = self._playbackRate;
    var isReversed = playbackRate < 0;
    var startTime = isReversed ? duration1 : 0;
    var endTime = isReversed ? 0 : duration1;
    if (self._playState === 'pending') {
        var currentTime2 = self._currentTime;
        var currentIteration_1 = self._currentIteration;
        self._currentTime = currentTime2 === undefined || currentTime2 === endTime ? startTime : currentTime2;
        self._currentIteration = currentIteration_1 === undefined || currentIteration_1 === totalIterations ? 0 : currentIteration_1;
        self._playState = 'running';
    }
    var currentTime = self._currentTime + delta * playbackRate;
    var currentIteration = self._currentIteration;
    var isLastFrame = false;
    if (!inRange(currentTime, startTime, endTime)) {
        isLastFrame = true;
        if (self._direction === 'alternate') {
            playbackRate = self._playbackRate * -1;
            self._playbackRate = playbackRate;
            isReversed = playbackRate < 0;
            startTime = isReversed ? duration1 : 0;
            endTime = isReversed ? 0 : duration1;
        }
        currentIteration++;
        currentTime = startTime;
        context.currentTime = currentTime;
        context.delta = delta;
        context.duration = endTime - startTime;
        context.playbackRate = playbackRate;
        context.iterations = currentIteration;
        context.offset = undefined;
        context.computedOffset = undefined;
        context.target = undefined;
        context.targets = undefined;
        context.index = undefined;
        self._dispatcher.trigger('iteration', context);
    }
    self._currentIteration = currentIteration;
    self._currentTime = currentTime;
    dispatcher.trigger('update', context);
    if (totalIterations === currentIteration) {
        dispatcher.trigger('finish', context);
        return;
    }
    for (var _i = 0, _a = self._events; _i < _a.length; _i++) {
        var evt = _a[_i];
        var startTimeMs = playbackRate >= 0 ? evt.startTimeMs : evt.startTimeMs + animationPadding;
        var endTimeMs = playbackRate >= 0 ? evt.endTimeMs : evt.endTimeMs - animationPadding;
        var shouldBeActive = startTimeMs <= currentTime && currentTime <= endTimeMs;
        var animator = evt.animator;
        if (!shouldBeActive) {
            continue;
        }
        var controllerState = animator.playState();
        if (controllerState === 'fatal') {
            dispatcher.trigger('cancel', context);
            return;
        }
        if (isLastFrame) {
            animator.restart();
        }
        var playedThisFrame = false;
        if (controllerState !== 'running' || isLastFrame) {
            animator.playbackRate(playbackRate);
            animator.playState('running');
            playedThisFrame = true;
        }
        animator.playbackRate(playbackRate);
        var shouldTriggerPlay = evt.play !== noop && playedThisFrame;
        var shouldTriggerUpdate = evt.update !== noop;
        if (shouldTriggerPlay || shouldTriggerUpdate) {
            context.target = evt.target;
            context.targets = evt.targets;
            context.index = evt.index;
            context.currentTime = undefined;
            context.delta = undefined;
            context.duration = undefined;
            context.offset = undefined;
            context.playbackRate = undefined;
            context.iterations = undefined;
            context.computedOffset = undefined;
        }
        if (shouldTriggerPlay) {
            evt.play(context);
        }
        if (shouldTriggerUpdate) {
            var relativeDuration = evt.endTimeMs - evt.startTimeMs;
            var relativeCurrentTime = currentTime - evt.startTimeMs;
            var timeOffset = relativeCurrentTime / relativeDuration;
            context.currentTime = relativeCurrentTime;
            context.delta = delta;
            context.duration = relativeDuration;
            context.offset = timeOffset;
            context.playbackRate = playbackRate;
            context.iterations = currentIteration;
            context.computedOffset = evt.easingFn(timeOffset);
            evt.update(context);
        }
    }
}

var presets = {};
var MixinService = (function () {
    function MixinService() {
        this.defs = {};
    }
    MixinService.prototype.findAnimation = function (name) {
        return this.defs[name] || presets[name] || undefined;
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

var TimeLoop = (function () {
    function TimeLoop() {
        var self = this;
        self.active = [];
        self.elapses = [];
        self.isActive = undefined;
        self.lastTime = undefined;
        self.offs = [];
        self.ons = [];
    }
    TimeLoop.prototype.on = function (fn) {
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
            raf(self, update);
        }
    };
    TimeLoop.prototype.off = function (fn) {
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
            raf(self, update);
        }
    };
    return TimeLoop;
}());
function update(self) {
    updateOffs(self);
    updateOns(self);
    var callbacks = self.active;
    var elapses = self.elapses;
    var len = callbacks.length;
    var lastTime = self.lastTime || now();
    var thisTime = now();
    var delta = thisTime - lastTime;
    if (!len) {
        self.isActive = undefined;
        self.lastTime = undefined;
        return;
    }
    self.isActive = true;
    self.lastTime = thisTime;
    raf(self, update);
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
        self._timeLoop = new TimeLoop();
        self.plugins = [];
    }
    JustAnimate.inject = function (animations) {
        var resolver = new MixinService();
        for (var _i = 0, animations_1 = animations; _i < animations_1.length; _i++) {
            var a = animations_1[_i];
            resolver.registerAnimation(a, true);
        }
    };
    JustAnimate.prototype.animate = function (options) {
        return new Animator(this._resolver, this._timeLoop, this.plugins).animate(options);
    };
    JustAnimate.prototype.random = function (first, last, unit, wholeNumbersOnly) {
        return random(first, last, unit, wholeNumbersOnly);
    };
    JustAnimate.prototype.register = function (preset) {
        this._resolver.registerAnimation(preset, false);
    };
    JustAnimate.prototype.shuffle = function (choices) {
        return shuffle(choices);
    };
    JustAnimate.prototype.splitText = function (target) {
        return splitText(target);
    };
    JustAnimate.prototype.inject = function (animations) {
        var resolver = this._resolver;
        for (var _i = 0, animations_2 = animations; _i < animations_2.length; _i++) {
            var a = animations_2[_i];
            resolver.registerAnimation(a, true);
        }
    };
    return JustAnimate;
}());

var KeyframeAnimator = (function () {
    function KeyframeAnimator(init) {
        this._init = init;
        this._initialized = undefined;
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
    KeyframeAnimator.prototype.restart = function () {
        var animator = this._animator;
        animator.cancel();
        animator.play();
    };
    KeyframeAnimator.prototype.playState = function (value) {
        var self = this;
        self._ensureInit();
        var animator = self._animator;
        var playState = !animator || self._initialized === false ? 'fatal' : animator.playState;
        if (value === undefined) {
            return playState;
        }
        if (playState === value) {
        }
        else if (playState === 'fatal') {
            animator.cancel();
        }
        else if (value === 'finished') {
            animator.finish();
        }
        else if (value === 'idle') {
            animator.cancel();
        }
        else if (value === 'paused') {
            animator.pause();
        }
        else if (value === 'running') {
            animator.play();
        }
        return undefined;
    };
    KeyframeAnimator.prototype._ensureInit = function () {
        var self = this;
        var init = self._init;
        if (init) {
            self._init = undefined;
            self._initialized = false;
            self._animator = init();
            self._initialized = true;
        }
    };
    return KeyframeAnimator;
}());

var propertyAliases = {
    x: 'translateX',
    y: 'translateY',
    z: 'translateZ'
};
var transforms = [
    'perspective',
    'matrix',
    'translateX',
    'translateY',
    'translateZ',
    'translate',
    'translate3d',
    'x',
    'y',
    'z',
    'skew',
    'skewX',
    'skewY',
    'rotateX',
    'rotateY',
    'rotateZ',
    'rotate',
    'rotate3d',
    'scaleX',
    'scaleY',
    'scaleZ',
    'scale',
    'scale3d'
];

function addTransition(keyframes, target) {
    var properties = listProps(keyframes);
    var style = window.getComputedStyle(target);
    var firstFrame = { offset: 0 };
    keyframes.splice(0, 0, firstFrame);
    properties.forEach(function (property) {
        if (property === 'offset') {
            return;
        }
        var alias = transforms.indexOf(property) !== -1 ? 'transform' : property;
        var val = style[alias];
        if (isDefined(val)) {
            firstFrame[alias] = val;
        }
    });
}

function arrangeKeyframes(keyframes) {
    if (keyframes.length < 1) {
        return;
    }
    var first = head(keyframes, function (k) { return k.offset === 0; })
        || head(keyframes, function (k) { return k.offset === undefined; });
    if (first === undefined) {
        first = {};
        keyframes.splice(0, 0, first);
    }
    if (first.offset !== 0) {
        first.offset = 0;
    }
    var last = tail(keyframes, function (k) { return k.offset === 1; })
        || tail(keyframes, function (k) { return k.offset === undefined; });
    if (last === undefined) {
        last = {};
        keyframes.push(last);
    }
    if (last.offset !== 1) {
        last.offset = 0;
    }
}

function keyframeOffsetComparer(a, b) {
    return a.offset - b.offset;
}

function expandOffsets(keyframes) {
    for (var i = keyframes.length - 1; i > -1; --i) {
        var keyframe = keyframes[i];
        if (!isArray(keyframe.offset)) {
            continue;
        }
        keyframes.splice(i, 1);
        var offsets = keyframe.offset;
        offsets.sort();
        for (var j = offsets.length - 1; j > -1; --j) {
            var newKeyframe = deepCopyObject(keyframe);
            newKeyframe.offset = offsets[j];
            keyframes.splice(i, 0, newKeyframe);
        }
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
            if (prop !== 'offset' && !isDefined(first[prop])) {
                first[prop] = keyframe[prop];
            }
        }
    }
    for (var i = len - 2; i > -1; i--) {
        var keyframe = keyframes[i];
        for (var prop in keyframe) {
            if (prop !== 'offset' && !isDefined(last[prop])) {
                last[prop] = keyframe[prop];
            }
        }
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
                var offset = i === 0 ? 0
                    : i === valLength - 1 ? 1
                        : i / (valLength - 1.0);
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
    var includedTransforms = Object
        .keys(cssProps)
        .filter(function (c) { return transforms.indexOf(c) !== -1; });
    var offsets = Object
        .keys(keyframesByOffset)
        .map(function (s) { return Number(s); })
        .sort();
    for (var i = offsets.length - 2; i > -1; --i) {
        var offset = offsets[i];
        var keyframe = keyframesByOffset[offset];
        for (var _i = 0, includedTransforms_1 = includedTransforms; _i < includedTransforms_1.length; _i++) {
            var transform = includedTransforms_1[_i];
            if (isDefined(keyframe[transform])) {
                continue;
            }
            var endOffset = offsets[i + 1];
            var endKeyframe = keyframesByOffset[endOffset];
            var envValueUnit = parseUnit(endKeyframe[transform]);
            var endValue = envValueUnit.value;
            var endUnitType = envValueUnit.unit;
            var startIndex = 0;
            var startValue = endValue;
            var startOffset = 0;
            var startUnit = undefined;
            for (var j = i - 1; j > -1; --j) {
                var offset1 = offsets[j];
                var keyframe1 = keyframesByOffset[offset1];
                if (isDefined(keyframe1[transform])) {
                    var startValueUnit = parseUnit(keyframe1[transform]);
                    startValue = startValueUnit.value;
                    startUnit = startValueUnit.unit;
                    startIndex = j;
                    startOffset = offsets[j];
                    break;
                }
            }
            if (startValue !== 0 && isDefined(startUnit) && isDefined(endUnitType) && startUnit !== endUnitType) {
                throw unsupported('Mixed transform property units');
            }
            for (var j = startIndex; j < i + 1; j++) {
                var currentOffset = offsets[j];
                var currentKeyframe = keyframesByOffset[currentOffset];
                var offsetDelta = (currentOffset - startOffset) / (endOffset - startOffset);
                var currentValue = startValue + (endValue - startValue) * offsetDelta;
                var currentValueWithUnit = isDefined(endUnitType)
                    ? currentValue + endUnitType
                    : isDefined(startUnit)
                        ? currentValue + startUnit
                        : currentValue;
                currentKeyframe[transform] = currentValueWithUnit;
                startOffset = currentOffset;
                startValue = currentValue;
            }
        }
    }
    for (var offset in keyframesByOffset) {
        var keyframe = keyframesByOffset[offset];
        keyframe.offset = Number(offset);
        keyframes.push(keyframe);
    }
    keyframes.sort(keyframeOffsetComparer);
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
function transformPropertyComparer(a, b) {
    return transforms.indexOf(a[0]) - transforms.indexOf(b[0]);
}
function normalizeProperties(keyframe) {
    var cssTransforms = [];
    for (var prop in keyframe) {
        var value = keyframe[prop];
        if (!isDefined(value)) {
            keyframe[prop] = undefined;
            continue;
        }
        keyframe[prop] = undefined;
        var propAlias = propertyAliases[prop] || prop;
        var transformIndex = transforms.indexOf(propAlias);
        if (transformIndex !== -1) {
            cssTransforms.push([propAlias, value]);
        }
        else if (propAlias === 'easing') {
            keyframe.easing = getEasingString(value);
        }
        else {
            keyframe[toCamelCase(propAlias)] = value;
        }
    }
    if (cssTransforms.length) {
        keyframe.transform = cssTransforms
            .sort(transformPropertyComparer)
            .reduce(function (c, n) { return c + (" " + n[0] + "(" + n[1] + ")"); }, '');
    }
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
        if (typeof target.offset === 'number') {
            continue;
        }
        for (var j = i + 1; j < len; j++) {
            if (typeof keyframes[j].offset !== 'number') {
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

var KeyframePlugin = (function () {
    function KeyframePlugin() {
    }
    KeyframePlugin.prototype.canHandle = function (ctx) {
        return !!(ctx.options.css) && isElement(ctx.target);
    };
    KeyframePlugin.prototype.handle = function (timings, ctx) {
        var animator = new KeyframeAnimator(function () { return initAnimator(timings, ctx); });
        animator.totalDuration = timings.totalTime;
        return animator;
    };
    return KeyframePlugin;
}());
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
    targetKeyframes.sort(keyframeOffsetComparer);
    fixPartialKeyframes(targetKeyframes);
    var animator = target['animate'](targetKeyframes, timings);
    animator.cancel();
    return animator;
}

if (typeof angular !== 'undefined') {
    angular.module('just.animate', []).service('just', JustAnimate);
}
var just = new JustAnimate();
just.plugins.push(new KeyframePlugin());
window.just = just;

}());
