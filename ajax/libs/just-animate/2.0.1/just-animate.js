(function (exports) {
'use strict';

var S_IDLE = 1;
var S_PENDING = 2;
var S_RUNNING = 3;
var S_PAUSED = 4;
var S_FINISHED = 5;
var _ = undefined;


var CANCEL = 'cancel';

var FINISH = 'finish';




var PAUSE = 'pause';


var PLAY = 'play';
var REVERSE = 'reverse';
var UPDATE = 'update';

var plugins = {};
function getPlugins() {
    return plugins;
}
function addPlugin(plugin) {
    plugins[plugin.name] = plugin;
}
function removePlugin(plugin) {
    delete plugins[plugin.name];
}

function isDefined(a) {
    return !!a || a === 0 || a === false;
}
function isFunction(a) {
    return typeof a === 'function';
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
function isArrayLike(a) {
    return a && isFinite(a.length) && !isString(a);
}
function isSVG(target) {
    return target instanceof SVGElement;
}
function isDOM(target) {
    return target.nodeType || isSVG(target);
}

function resolveProperty(input, target, index, len) {
    return isFunction(input)
        ? resolveProperty(input(target, index, len), target, index, len)
        : input;
}

function now() {
    return (performance && performance.now()) || Date.now();
}
function raf(fn) {
    return requestAnimationFrame(fn);
}
function caf(handle) {
    cancelAnimationFrame(handle);
}

function head(indexed, predicate) {
    if (!indexed || indexed.length < 1) {
        return _;
    }
    if (predicate === _) {
        return indexed[0];
    }
    for (var i = 0, ilen = indexed.length; i < ilen; i++) {
        if (predicate(indexed[i])) {
            return indexed[i];
        }
    }
    return _;
}
function tail(indexed, predicate) {
    var ilen = indexed && indexed.length;
    if (!indexed || ilen < 1) {
        return _;
    }
    if (predicate === _) {
        return indexed[ilen - 1];
    }
    for (var i = 0; i < ilen; i++) {
        var item = indexed[i];
        if (predicate(item)) {
            return item;
        }
    }
    return _;
}
function indexOf(items, predicate) {
    for (var i = 0, ilen = items.length; i < ilen; i++) {
        var item = items[i];
        if (predicate(item)) {
            return i;
        }
    }
    return -1;
}
function sortBy(fieldName) {
    return function (a, b) {
        var a1 = a[fieldName];
        var b1 = b[fieldName];
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
    };
}
function list(indexed) {
    return isArrayLike(indexed) ? indexed : [indexed];
}
function push(indexed, item) {
    Array.prototype.push.call(indexed, item);
    return item;
}
function pushDistinct(indexed, item) {
    var index = indexed.indexOf(item);
    if (index !== -1) {
        return item;
    }
    push(indexed, item);
    return item;
}
function mapFlatten(items, mapper) {
    var results = [];
    for (var i = 0, ilen = items.length; i < ilen; i++) {
        var result = mapper(items[i]);
        if (isArrayLike(result)) {
            pushAll(results, result);
        }
        else {
            push(results, result);
        }
    }
    return results;
}
function pushAll(items, newItems) {
    for (var i = 0, ilen = newItems.length; i < ilen; i++) {
        if (isDefined(newItems[i])) {
            push(items, newItems[i]);
        }
    }
}
function forEach(items, action) {
    if (items) {
        for (var i = 0, ilen = items.length; i < ilen; i++) {
            if (action(items[i], i, ilen) === false) {
                break;
            }
        }
    }
}

var active = [];
var elapses = [];
var lastHandle = _;
var lastTime = _;
function cancel() {
    caf(lastHandle);
    lastHandle = lastTime = _;
}
function update() {
    var len = active.length;
    lastTime = lastTime || now();
    var thisTime = now();
    var delta = thisTime - lastTime;
    if (!len) {
        cancel();
        return;
    }
    lastTime = thisTime;
    lastHandle = raf(update);
    for (var i = 0; i < len; i++) {
        var existingElapsed = elapses[i];
        var updatedElapsed = existingElapsed + delta;
        elapses[i] = updatedElapsed;
        active[i](delta, updatedElapsed);
    }
}
function loopOn(fn) {
    var indexOfSub = active.indexOf(fn);
    if (indexOfSub === -1) {
        push(active, fn);
        push(elapses, 0);
    }
    if (!lastHandle) {
        lastHandle = raf(update);
    }
}
function loopOff(fn) {
    var indexOfSub = active.indexOf(fn);
    if (indexOfSub !== -1) {
        active.splice(indexOfSub, 1);
        elapses.splice(indexOfSub, 1);
    }
    if (!active.length) {
        cancel();
    }
}

var flr = Math.floor;
var max = Math.max;
var min = Math.min;

var rnd = Math.round;
function inRange(val, a, z) {
    return val !== _ && a <= val && val <= z;
}
function minMax(val, a, z) {
    return min(max(val, a), z);
}

var offsetSorter = sortBy('offset');
function toEffects(plugin, configs) {
    var result = [];
    forEach(configs, function (targetConfig) {
        var from = targetConfig.from, to = targetConfig.to, duration = targetConfig.duration, keyframes = targetConfig.keyframes, target = targetConfig.target, targetLength = targetConfig.targetLength;
        var effects = {};
        forEach(keyframes, function (p) {
            var effects2 = (effects[p.prop] || (effects[p.prop] = []));
            var offset = (p.time - from) / (duration || 1);
            var easing = p.easing;
            var value = resolveProperty(p.value, target, p.index, targetLength);
            var effect2 = head(effects2, function (e) { return e.offset === offset; }) || push(effects2, {
                easing: easing,
                offset: offset,
                value: value
            });
            effect2.easing = easing;
            effect2.value = value;
        });
        if (plugin.onWillAnimate) {
            plugin.onWillAnimate(targetConfig, effects);
        }
        for (var prop in effects) {
            var effect = effects[prop];
            if (effect) {
                effect.sort(offsetSorter);
                var firstFrame = head(effect, function (c) { return c.offset === 0; });
                if (firstFrame === _ || firstFrame.value === _) {
                    var value2 = plugin.getValue(target, prop);
                    if (firstFrame === _) {
                        effect.splice(0, 0, {
                            offset: 0,
                            value: value2,
                            easing: targetConfig.easing
                        });
                    }
                    else {
                        firstFrame.value = value2;
                        firstFrame.easing = targetConfig.easing;
                    }
                }
                var lastFrame = tail(effect, function (c) { return c.offset === 1; });
                if (lastFrame === _ || lastFrame.value === _) {
                    var value3 = effect[effect.length - 1].value;
                    if (lastFrame === _) {
                        push(effect, {
                            offset: 1,
                            value: value3,
                            easing: targetConfig.easing
                        });
                    }
                    else {
                        lastFrame.value = value3;
                        lastFrame.easing = targetConfig.easing;
                    }
                }
                push(result, {
                    plugin: plugin.name,
                    target: target,
                    prop: prop,
                    from: from,
                    to: to,
                    keyframes: effect
                });
            }
        }
    });
    return result;
}
function addPropertyKeyframes(pluginName, target, index, options) {
    var props = options[pluginName];
    var staggerMs = (options.stagger && options.stagger * (index + 1)) || 0;
    var delayMs = resolveProperty(options.delay, target, index, target.targetLength) || 0;
    var from = max(staggerMs + delayMs + options.from, 0);
    var duration = options.to - options.from;
    var easing = options.easing || 'ease';
    for (var name in props) {
        if (props.hasOwnProperty(name)) {
            addProperty(target, index, name, props[name], duration, from, easing);
        }
    }
}
function addProperty(target, index, name, val, duration, from, defaultEasing) {
    if (!isDefined(val)) {
        return;
    }
    pushDistinct(target.propNames, name);
    var keyframes = list(val).map(function (v, i, vals) {
        var valOrObj = resolveProperty(v, target.target, index, target.targetLength);
        var valObj = valOrObj;
        var isObj2 = isObject(valOrObj);
        var value = isObj2 ? valObj.value : valOrObj;
        var offset = isObj2 && isNumber(valObj.offset)
            ? valObj.offset
            : i === vals.length - 1
                ? 1
                : i === 0
                    ? 0
                    : _;
        var easing = valObj.easing || defaultEasing;
        return { offset: offset, value: value, easing: easing };
    });
    inferOffsets(keyframes);
    keyframes.forEach(function (keyframe) {
        var offset = keyframe.offset, value = keyframe.value, easing = keyframe.easing;
        var time = flr(duration * offset + from);
        var indexOfFrame = indexOf(target.keyframes, function (k) { return k.prop === name && k.time === time; });
        if (indexOfFrame !== -1) {
            keyframes[indexOfFrame].value = value;
            return;
        }
        push(target.keyframes, {
            easing: easing,
            index: index,
            prop: name,
            time: time,
            value: value
        });
    });
    if (!head(target.keyframes, function (k) { return k.prop === name && k.time === from; })) {
        push(target.keyframes, {
            easing: defaultEasing,
            index: index,
            prop: name,
            time: from,
            value: _
        });
    }
    var to = from + duration;
    if (!tail(target.keyframes, function (k) { return k.prop === name && k.time === to; })) {
        push(target.keyframes, {
            easing: defaultEasing,
            index: index,
            prop: name,
            time: to,
            value: _
        });
    }
}
function inferOffsets(keyframes) {
    if (!keyframes.length) {
        return;
    }
    var first = head(keyframes, function (k) { return k.offset === 0; }) || keyframes[0];
    if (!isDefined(first.offset)) {
        first.offset = 0;
    }
    var last = tail(keyframes, function (k) { return k.offset === 1; }) || keyframes[keyframes.length - 1];
    if (keyframes.length > 1 && !isDefined(last.offset)) {
        last.offset = 1;
    }
    for (var i = 1, ilen = keyframes.length; i < ilen; i++) {
        var target = keyframes[i];
        if (isDefined(target.offset)) {
            continue;
        }
        for (var j = i + 1; j < ilen; j++) {
            var endTime = keyframes[j].offset;
            if (!isDefined(endTime)) {
                continue;
            }
            var startTime = keyframes[i - 1].offset;
            var timeDelta = endTime - startTime;
            var deltaLength = j - i + 1;
            for (var k = 1; k < deltaLength; k++) {
                keyframes[k - 1 + i].offset = k / j * timeDelta + startTime;
            }
            i = j;
            break;
        }
    }
}

function getTargets(target) {
    return isString(target)
        ? Array.prototype.slice.call(document.querySelectorAll(target))
        : isFunction(target)
            ? getTargets(target())
            : isArrayLike(target)
                ? mapFlatten(target, getTargets)
                : isObject(target)
                    ? [target]
                    : [];
}

var propKeyframeSort = sortBy('time');
var timelineProto = {
    get currentTime() {
        return this._time;
    },
    set currentTime(time) {
        var self = this;
        time = +time;
        self._time = isFinite(time) ? time : (self._rate < 0 ? self.duration : 0);
        updateTimeline(self, UPDATE);
    },
    get playbackRate() {
        return this._rate;
    },
    set playbackRate(rate) {
        var self = this;
        self._rate = +rate || 1;
        updateTimeline(self, REVERSE);
    },
    add: function (opts) {
        var self = this;
        var _nextTime = self._nextTime;
        var hasTo = isDefined(opts.to);
        var hasFrom = isDefined(opts.from);
        var hasDuration = isDefined(opts.duration);
        var from, to;
        if (hasFrom && hasTo) {
            from = opts.from;
            to = opts.to;
        }
        else if (hasFrom && hasDuration) {
            from = opts.from;
            to = from + opts.duration;
        }
        else if (hasTo && hasDuration) {
            to = opts.to;
            from = to - opts.duration;
        }
        else if (hasTo && !hasDuration) {
            from = _nextTime;
            to = from + opts.to;
        }
        else if (hasDuration) {
            from = _nextTime;
            to = from + opts.duration;
        }
        else {
            throw new Error('Missing duration');
        }
        return self.fromTo(from, to, opts);
    },
    fromTo: function (from, to, options) {
        var self = this;
        var plugins = getPlugins();
        var options2 = options;
        options2.from = from;
        options2.to = to;
        options2.duration = options2.to - options2.from;
        var _loop_1 = function (pluginName) {
            var plugin = plugins[pluginName];
            if (!options.hasOwnProperty(pluginName)) {
                return "continue";
            }
            var config = self._configs[pluginName] || (self._configs[pluginName] = []);
            forEach(getTargets(options.targets), function (target, i, ilen) {
                var delay = resolveProperty(options2.delay, target, i, ilen) || 0;
                var targetConfig = head(config, function (t2) { return t2.target === target; }) ||
                    push(config, {
                        from: max(options2.from + delay, 0),
                        to: max(options2.to + delay, 0),
                        easing: options2.easing || 'ease',
                        duration: options2.to - options2.from,
                        endDelay: resolveProperty(options2.endDelay, target, i, ilen) || 0,
                        target: target,
                        targetLength: ilen,
                        keyframes: [],
                        propNames: []
                    });
                addPropertyKeyframes(plugin.name, targetConfig, i, options2);
            });
            forEach(config, function (c) { return c.keyframes.sort(propKeyframeSort); });
        };
        for (var pluginName in plugins) {
            _loop_1(pluginName);
        }
        calculateTimes(self);
        return self;
    },
    cancel: function () {
        return updateTimeline(this, CANCEL);
    },
    finish: function () {
        return updateTimeline(this, FINISH);
    },
    on: function (eventName, listener) {
        var self = this;
        var _listeners = self._listeners;
        var listeners = _listeners[eventName] || (_listeners[eventName] = []);
        if (listeners.indexOf(listener) === -1) {
            push(listeners, listener);
        }
        return self;
    },
    off: function (eventName, listener) {
        var self = this;
        var listeners = self._listeners[eventName];
        if (listeners) {
            var indexOfListener = listeners.indexOf(listener);
            if (indexOfListener !== -1) {
                listeners.splice(indexOfListener, 1);
            }
        }
        return self;
    },
    pause: function () {
        return updateTimeline(this, PAUSE);
    },
    play: function (options) {
        var self = this;
        if (options) {
            self._repeat = options.repeat;
            self._alternate = options.alternate === true;
        }
        self._repeat = self._repeat || 1;
        self._alternate = self._alternate || false;
        self._state = S_RUNNING;
        return updateTimeline(self, PLAY);
    },
    reverse: function () {
        var self = this;
        self.playbackRate = (self.playbackRate || 0) * -1;
        return self;
    },
    seek: function (time) {
        var self = this;
        self.currentTime = time;
        return self;
    },
    getEffects: function () {
        var _configs = this._configs;
        var plugins = getPlugins();
        return mapFlatten(Object.keys(_configs), function (k) { return toEffects(plugins[k], _configs[k]); });
    }
};
function calculateTimes(self) {
    var timelineTo = 0;
    var maxNextTime = 0;
    for (var pluginName in self._configs) {
        forEach(self._configs[pluginName], function (target) {
            var keyframes = target.keyframes;
            var targetFrom;
            var targetTo;
            forEach(keyframes, function (keyframe) {
                var time = keyframe.time;
                if (time < targetFrom || targetFrom === _) {
                    targetFrom = time;
                }
                if (time > targetTo || targetTo === _) {
                    targetTo = time;
                    if (time > timelineTo) {
                        timelineTo = time;
                    }
                }
            });
            target.to = targetTo;
            target.from = targetFrom;
            target.duration = targetTo - targetFrom;
            maxNextTime = max(targetTo + target.endDelay, maxNextTime);
        });
    }
    self._nextTime = maxNextTime;
    self.duration = timelineTo;
}
function setupEffects(self) {
    if (self._effects) {
        return;
    }
    var animations = [];
    var plugins = getPlugins();
    var _loop_2 = function (pluginName) {
        var plugin = plugins[pluginName];
        var config = self._configs[pluginName];
        if (!config) {
            return "continue";
        }
        forEach(toEffects(plugin, config), function (effect) {
            var controller = plugin.animate(effect);
            if (controller) {
                controller.from = effect.from;
                controller.to = effect.to;
                push(animations, controller);
            }
        });
    };
    for (var pluginName in plugins) {
        _loop_2(pluginName);
    }
    self._time = self._rate < 0 ? self.duration : 0;
    self._effects = animations;
}
function updateTimeline(self, type) {
    if (type === CANCEL) {
        self._iteration = 0;
        self._state = S_IDLE;
    }
    else if (type === FINISH) {
        self._iteration = 0;
        self._state = S_FINISHED;
        if (!self._alternate) {
            self._time = self._rate < 0 ? 0 : self.duration;
        }
    }
    else if (type === PAUSE) {
        self._state = S_PAUSED;
    }
    else if (type === PLAY) {
        var isForwards = self._rate >= 0;
        if (isForwards && self._time === self.duration) {
            self._time = 0;
        }
        else if (!isForwards && self._time === 0) {
            self._time = self.duration;
        }
    }
    var isTimelineActive = self._state === S_RUNNING;
    var isTimelineInEffect = self._state !== S_IDLE;
    var time = self.currentTime;
    if (isTimelineInEffect && self._effects === _) {
        setupEffects(self);
    }
    if (isTimelineInEffect) {
        forEach(self._effects, function (effect) {
            var from = effect.from, to = effect.to;
            var isAnimationActive = isTimelineActive && inRange(flr(time), from, to);
            var offset = minMax((time - from) / (to - from), 0, 1);
            effect.update(offset, self._rate, isAnimationActive);
        });
    }
    if (!isTimelineActive) {
        loopOff(self._tick);
    }
    if (type === PLAY) {
        loopOn(self._tick);
    }
    if (!isTimelineInEffect) {
        forEach(self._effects, function (effect) { return effect.cancel(); });
        self._time = 0;
        self._iteration = _;
        self._effects = _;
    }
    if (type === FINISH) {
        forEach(self._listeners[UPDATE], function (c) { return c(time); });
    }
    forEach(self._listeners[type], function (c) { return c(time); });
    return self;
}
function tick(self, delta) {
    var playState = self._state;
    if (playState === S_IDLE) {
        updateTimeline(self, CANCEL);
        return;
    }
    if (playState === S_FINISHED) {
        updateTimeline(self, FINISH);
        return;
    }
    if (playState === S_PAUSED) {
        updateTimeline(self, PAUSE);
        return;
    }
    var duration = self.duration;
    var repeat = self._repeat;
    var rate = self._rate;
    var isReversed = rate < 0;
    var time = self._time === _
        ? rate < 0 ? duration : 0
        : self._time;
    var iteration = self._iteration || 0;
    if (self._state === S_PENDING) {
        self._state = S_RUNNING;
        if (time === _ || (isReversed && time > duration) || (!isReversed && time < 0)) {
            time = isReversed ? duration : 0;
        }
        if (iteration === repeat) {
            iteration = 0;
        }
    }
    time += delta * rate;
    var iterationEnded = false;
    if (!inRange(time, 0, duration)) {
        self._iteration = ++iteration;
        time = isReversed ? 0 : duration;
        iterationEnded = true;
        if (self._alternate) {
            self._rate = (self._rate || 0) * -1;
        }
        time = self._rate < 0 ? duration : 0;
    }
    self._iteration = iteration;
    self._time = time;
    if (!iterationEnded) {
        forEach(self._listeners[UPDATE], function (c) { return c(time); });
        updateTimeline(self, UPDATE);
        return;
    }
    if (repeat === iteration) {
        updateTimeline(self, FINISH);
        return;
    }
    forEach(self._listeners[UPDATE], function (c) { return c(time); });
    updateTimeline(self, UPDATE);
}
function timeline() {
    var self = Object.create(timelineProto);
    self.duration = 0;
    self._nextTime = 0;
    self._rate = 1;
    self._time = 0;
    self._alternate = false;
    self._state = S_IDLE;
    self._configs = {};
    self._listeners = {};
    self._tick = function (delta) { return tick(self, delta); };
    return self;
}

var epsilon = 0.0001;

var c = "cubic-bezier";
var s = "steps";
var ease = c + "(.25,.1,.25,1)";
var easeIn = c + "(.42,0,1,1)";




var easeInOut = c + "(.42,0,.58,1)";












var easeOut = c + "(0,0,.58,1)";









var linear = c + "(0,0,1,1)";
var stepEnd = s + "(1,0)";
var stepStart = s + "(1,1)";

var camelCaseRegex = /([a-z])[- ]([a-z])/ig;
var cssFunctionRegex = /^([a-z-]+)\(([^\)]+)\)$/i;
var cssEasings = { ease: ease, easeIn: easeIn, easeOut: easeOut, easeInOut: easeInOut, stepStart: stepStart, stepEnd: stepEnd, linear: linear };
var camelCaseMatcher = function (match, p1, p2) { return p1 + p2.toUpperCase(); };
var toCamelCase = function (value) { return typeof value === 'string'
    ? value.replace(camelCaseRegex, camelCaseMatcher) : ''; };
var find = function (nameOrCssFunction) {
    // search for a compatible known easing
    var easingName = toCamelCase(nameOrCssFunction);
    var easing = cssEasings[easingName] || nameOrCssFunction;
    var matches = cssFunctionRegex.exec(easing);
    if (!matches) {
        throw new Error('could not parse css function');
    }
    return [matches[1]].concat(matches[2].split(','));
};
var cssFunction$$1 = function (easingString) {
    var p = find(easingString);
    var fnName = p[0];
    if (fnName === 'steps') {
        return steps(+p[1], p[2]);
    }
    if (fnName === 'cubic-bezier') {
        return cubicBezier$$1(+p[1], +p[2], +p[3], +p[4]);
    }
    if (fnName === 'frames') {
        return frames$$1(+p[1]);
    }
    throw new Error('unknown css function');
};

var bezier = function (n1, n2, t) {
    return 3 * n1 * (1 - t) * (1 - t) * t + 3 * n2 * (1 - t) * t * t + t * t * t;
};
var cubicBezier$$1 = function (p0, p1, p2, p3) {
    if (p0 < 0 || p0 > 1 || p2 < 0 || p2 > 1) {
        return function (x) { return x; };
    }
    return function (x) {
        if (x === 0 || x === 1) {
            return x;
        }
        var start = 0;
        var end = 1;
        var limit = 19;
        do {
            var mid = (start + end) * .5;
            var xEst = bezier(p0, p2, mid);
            if (abs$1(x - xEst) < epsilon) {
                return bezier(p1, p3, mid);
            }
            if (xEst < x) {
                start = mid;
            }
            else {
                end = mid;
            }
        } while (--limit);
        // limit is reached
        return x;
    };
};

var frames$$1 = function (n) {
    var q = 1 / (n - 1);
    return function (x) {
        var o = floor(x * n) * q;
        return x >= 0 && o < 0 ? 0 : x <= 1 && o > 1 ? 1 : o;
    };
};

var abs$1 = Math.abs;

var floor = Math.floor;

var steps = function (count, pos) {
    var q = count / 1;
    var p = pos === 'end'
        ? 0 : pos === 'start'
        ? 1 : pos || 0;
    return function (x) { return x >= 1 ? 1 : (p * q + x) - (p * q + x) % q; };
};

/**
 * Animations change at a constant speed
 */
/**
 * Animations change at a constant speed
 */

function memoize(func) {
    var cache = [];
    return function () {
        var args = arguments;
        for (var h = 0, hlen = cache.length; h < hlen; h++) {
            var keys = cache[h].args;
            if (keys.length !== hlen) {
                continue;
            }
            var matches = 0;
            var ilen = args.length;
            for (var i = 0; i < ilen; i++) {
                if (keys[i] !== args[i]) {
                    break;
                }
                ++matches;
            }
            if (matches === ilen) {
                return cache[h].value;
            }
        }
        var value = func.apply(_, args);
        cache.push({ args: args, value: value });
        return value;
    };
}

function findEndIndex(ns, n) {
    var ilen = ns.length;
    for (var i = 0; i < ilen; i++) {
        if (ns[i] > n) {
            return i;
        }
    }
    return ilen - 1;
}
var floatLimit = /^(\-?\d+\.?\d{0,5})/;
var getEasing = memoize(cssFunction$$1);
function floatToString(value) {
    return floatLimit.exec((rnd(value * 100000) / 100000).toString())[1];
}
function integerInterpolator(l, r, o) {
    return floatToString(l + ((r - l) * o));
}
function fallbackInterpolator(l, r, o) {
    return o < .5 ? l : r;
}
function interpolator(duration, keyframes) {
    var times = keyframes.map(function (k) { return k.offset * duration; });
    var values = keyframes.map(function (k) { return k.value; });
    var easings = keyframes.map(function (k) { return getEasing(k.easing); });
    var sampleValue = values[0];
    var fn;
    if (isNumber(sampleValue)) {
        fn = integerInterpolator;
    }
    else {
        fn = fallbackInterpolator;
    }
    return function (offset) {
        var time = duration * offset;
        var r = findEndIndex(times, time);
        var l = r ? r - 1 : 0;
        var rt = times[r];
        var lt = times[l];
        var localOffset = (time - lt) / (rt - lt);
        var relativeOffset = easings[l](localOffset);
        return fn(values[l], values[r], relativeOffset);
    };
}

function hyphenate(value) {
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}

var cssVarExp = /^\-\-[a-z0-9\-]+$/i;
var propsPlugin = {
    name: 'props',
    animate: function (effect) {
        var target = effect.target, prop = effect.prop;
        var interpolate = interpolator(effect.to - effect.from, effect.keyframes);
        var propSetter;
        if (!isDOM(target) || typeof target[prop] !== 'undefined') {
            propSetter = setProperty(effect.target, prop);
        }
        else if (cssVarExp.test(prop)) {
            propSetter = setVariable(effect.target, prop);
        }
        else {
            propSetter = setAttribute(effect.target, prop);
        }
        var initial = target[effect.prop];
        return {
            cancel: function () {
                if (initial !== _) {
                    propSetter(initial);
                }
                initial = _;
            },
            update: function (localTime, _playbackRate, _isActive) {
                propSetter(interpolate(localTime));
            }
        };
    },
    getValue: function (target, prop) {
        if ((!isDOM(target) || typeof target[prop] !== 'undefined')) {
            return target[prop];
        }
        if (cssVarExp.test(prop)) {
            return target.style.getPropertyValue(prop);
        }
        return target.getAttribute(hyphenate(prop));
    }
};
function setAttribute(target, name) {
    var attName = hyphenate(name);
    return function (value) { return target.setAttribute(attName, value); };
}
function setVariable(target, name) {
    return function (value) {
        target.style.setProperty(name, value ? value + '' : '');
    };
}
function setProperty(target, name) {
    return function (value) { return target[name] = value; };
}

addPlugin(propsPlugin);
function animate(options) {
    var t1 = timeline();
    if (options) {
        forEach(list(options), function (opt) {
            opt.from = opt.from || 0;
            t1.add(opt);
        });
    }
    return t1;
}
function sequence(seqOptions) {
    var t1 = timeline();
    forEach(seqOptions, function (opt) { return t1.add(opt); });
    return t1;
}

exports.animate = animate;
exports.sequence = sequence;
exports.timeline = timeline;
exports.addPlugin = addPlugin;
exports.removePlugin = removePlugin;

}((this.just = this.just || {})));
