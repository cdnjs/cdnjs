(function (exports) {
'use strict';

var S_IDLE = 1;
var S_PENDING = 2;
var S_RUNNING = 3;
var S_PAUSED = 4;
var S_FINISHED = 5;
var _ = undefined;


var CANCEL = 'cancel';
var CONFIG = 'config';

var FINISH = 'finish';




var PAUSE = 'pause';


var PLAY = 'play';
var RATE = 'rate';
var UPDATE = 'update';

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
    return a && isFinite(a.length) && !isString(a) && !isFunction(a);
}
function isDOM(target) {
    return target.nodeType || target instanceof SVGElement;
}

function includes(items, item) {
    return getIndex(items, item) !== -1;
}
function getIndex(items, item) {
    return items.indexOf(item);
}
function find(indexed, predicate, reverse) {
    var ilen = indexed && indexed.length;
    if (!ilen) {
        return _;
    }
    if (predicate === _) {
        return indexed[reverse ? ilen - 1 : 0];
    }
    if (reverse) {
        for (var i = ilen - 1; i > -1; i--) {
            if (predicate(indexed[i])) {
                return indexed[i];
            }
        }
    }
    else {
        for (var i = 0; i < ilen; i++) {
            if (predicate(indexed[i])) {
                return indexed[i];
            }
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
    return !isDefined(indexed) ? [] : isArrayLike(indexed) ? indexed : [indexed];
}
function push(indexed, item) {
    if (item !== _) {
        Array.prototype.push.call(indexed, item);
    }
    return item;
}
function pushDistinct(indexed, item) {
    if (!includes(indexed, item)) {
        push(indexed, item);
    }
    return item;
}
function mapFlatten(items, mapper) {
    var results = [];
    all(items, function (item) {
        var result = mapper(item);
        if (isArrayLike(result)) {
            all(result, function (item2) { return push(results, item2); });
        }
        else {
            push(results, result);
        }
    });
    return results;
}
function all(items, action) {
    var items2 = list(items);
    for (var i = 0, ilen = items2.length; i < ilen; i++) {
        action(items2[i], i, ilen);
    }
}

var s4 = function () { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
var uuid = function () { return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4(); };

var stores = {};
function createModel(opts) {
    var refs = {};
    if (opts.references) {
        for (var name in opts.references) {
            refs['@' + name] = opts.references[name];
        }
    }
    var id = uuid();
    stores[id] = {
        id: id,
        duration: 0,
        pos: 0,
        rate: 1,
        yoyo: false,
        state: S_IDLE,
        configs: [],
        players: _,
        repeat: _,
        round: _,
        refs: refs,
        time: _
    };
    return id;
}
function getModel(id) {
    var model = stores[id];
    if (!model) {
        throw new Error('Could not find timeline');
    }
    return model;
}
function destroyModel(id) {
    delete stores[id];
}

var handlers = {};
function publish(id, eventName, data) {
    var subscribers = handlers[id];
    if (subscribers) {
        all(subscribers[eventName], function (s) {
            s(data);
        });
    }
}
function subscribe(id, eventName, listener) {
    var subscribers = handlers[id] || (handlers[id] = {});
    pushDistinct(subscribers[eventName] || (subscribers[eventName] = []), listener);
}
function unsubscribeAll(id) {
    delete handlers[id];
}
function unsubscribe(id, eventName, listener) {
    var subscribers = handlers[id];
    if (subscribers) {
        var listeners = subscribers[eventName];
        if (listeners) {
            var indexOfListener = getIndex(listeners, listener);
            if (indexOfListener !== -1) {
                listeners.splice(indexOfListener, 1);
            }
        }
    }
}

var flr = Math.floor;
var max = Math.max;
var min = Math.min;


function inRange(val, a, z) {
    return val !== _ && a <= val && val <= z;
}
function minMax(val, a, z) {
    return min(max(val, a), z);
}

function now() {
    return performance.now();
}
function raf(fn) {
    return requestAnimationFrame(fn);
}
function caf(handle) {
    cancelAnimationFrame(handle);
}

function owns(obj, name) {
    return obj.hasOwnProperty(name);
}
function assign() {
    var args = arguments;
    var result = {};
    for (var i = 0, ilen = args.length; i < ilen; i++) {
        var obj = args[i];
        if (obj) {
            for (var name in obj) {
                if (owns(obj, name)) {
                    result[name] = obj[name];
                }
            }
        }
    }
    return result;
}

var active = [];
var deltas = {};
var lastHandle = _;
var lastTime = _;
function cancel() {
    caf(lastHandle);
    lastHandle = lastTime = _;
}
function update() {
    var len = active.length;
    lastTime = lastTime || now();
    if (!len) {
        cancel();
        return;
    }
    var thisTime = now();
    var delta = thisTime - lastTime;
    lastTime = thisTime;
    lastHandle = raf(update);
    for (var i = len - 1; i > -1; i--) {
        var activeId = active[i];
        var existingElapsed = deltas[activeId];
        var updatedElapsed = existingElapsed + delta;
        deltas[activeId] = updatedElapsed;
        tick(activeId, delta);
    }
}
function loopOn(id) {
    if (!includes(active, id)) {
        deltas[id] = 0;
        push(active, id);
    }
    if (!lastHandle) {
        lastHandle = raf(update);
    }
}
function loopOff(id) {
    var indexOfSub = getIndex(active, id);
    if (indexOfSub !== -1) {
        delete deltas[id];
        active.splice(indexOfSub, 1);
    }
    if (!active.length) {
        cancel();
    }
}

function resolveProperty(input, target, index, len) {
    return isFunction(input)
        ? resolveProperty(input(target, index, len), target, index, len)
        : input;
}

var plugins = {};
function addPlugin(plugin) {
    plugins[plugin.name] = plugin;
}
function removePlugin(plugin) {
    delete plugins[plugin.name];
}

function getTargets(target) {
    return isString(target)
        ? Array.prototype.slice.call(document.querySelectorAll(target))
        :
            isFunction(target)
                ? getTargets(target())
                :
                    isArrayLike(target)
                        ? mapFlatten(target, getTargets)
                        :
                            isObject(target)
                                ? [target]
                                :
                                    [];
}

var refId = 0;
var objNameExp = /\[object ([a-z]+)\]/i;
function getName(target) {
    var name = target.id || target.name;
    if (!name) {
        name = Object.prototype.toString.call(target);
        var matches = objNameExp.exec(name);
        if (matches) {
            name = matches[1];
        }
    }
    return '@' + name + '_' + ++refId;
}
function assignRef(refs, target) {
    for (var ref in refs) {
        if (refs[ref] === target) {
            return ref;
        }
    }
    var refName = getName(target);
    refs[refName] = target;
    return refName;
}
function replaceWithRefs(refs, target, recurseObjects) {
    if (!isDefined(target) || isString(target) || isNumber(target)) {
        return target;
    }
    if (isArrayLike(target)) {
        return mapFlatten(target, function (t) { return replaceWithRefs(refs, t, recurseObjects); });
    }
    if (isFunction(target)) {
        return assignRef(refs, target);
    }
    if (recurseObjects) {
        for (var name in target) {
            if (owns(target, name)) {
                target[name] = replaceWithRefs(refs, target[name], recurseObjects && name !== 'targets');
            }
        }
        return target;
    }
    return assignRef(refs, target);
}
function resolveRefs(refs, value, recurseObjects) {
    if (!isDefined(value) || isNumber(value) || isFunction(value)) {
        return value;
    }
    if (isString(value)) {
        var str = value;
        return owns(refs, str) && str.charAt(0) === '@' ? refs[str] : str;
    }
    if (isArrayLike(value)) {
        var results_1 = [];
        all(value, function (item) { return push(results_1, resolveRefs(refs, item, recurseObjects)); });
        return results_1;
    }
    if (!recurseObjects || isDOM(value)) {
        return value;
    }
    var obj2 = {};
    for (var name in value) {
        if (owns(value, name)) {
            var value2 = value[name];
            obj2[name] = recurseObjects ? resolveRefs(refs, value2, name !== 'targets') : value2;
        }
    }
    return obj2;
}

var offsetSorter = sortBy('offset');
function getEffects(model) {
    return mapFlatten(model.configs, function (c) {
        return toEffects(resolveRefs(model.refs, c, true));
    });
}
function toEffects(config) {
    var keyframes = config.keyframes;
    var from = config.from;
    var to = config.to;
    var stagger = config.stagger || 0;
    var duration = config.duration;
    var result = [];
    all(getTargets(config.target), function (target, index, targetLength) {
        var effects = {};
        var propToPlugin = {};
        all(keyframes, function (p) {
            var effects3 = effects[p.prop] || (effects[p.prop] = []);
            var offset = (p.time - from) / (duration || 1);
            var easing = p.easing;
            var interpolate = p.interpolate;
            var value = resolveProperty(p.value, target, p.index, targetLength);
            propToPlugin[p.prop] = p.plugin;
            var effect2 = find(effects3, function (e) { return e.offset === offset; }) ||
                push(effects3, {
                    easing: easing,
                    offset: offset,
                    value: value,
                    interpolate: interpolate
                });
            effect2.easing = easing;
            effect2.value = value;
            effect2.interpolate = interpolate;
        });
        for (var pluginName in plugins) {
            var plugin2 = plugins[pluginName];
            if (plugin2.onWillAnimate && config.keyframes.some(function (c) { return c.plugin === pluginName; })) {
                var targetConfig2 = assign(config, { target: target });
                plugin2.onWillAnimate(targetConfig2, effects, propToPlugin);
            }
        }
        for (var prop in effects) {
            var effects2 = effects[prop];
            var pluginName2 = propToPlugin[prop];
            var plugin = plugins[pluginName2];
            if (effects2) {
                effects2.sort(offsetSorter);
                ensureFirstFrame(config, effects2, target, plugin, prop);
                fillValues(effects2);
                fillInterpolators(effects2);
                ensureLastFrame(config, effects2);
                push(result, {
                    plugin: propToPlugin[prop],
                    target: target,
                    prop: prop,
                    from: from + (stagger ? stagger * index : 0),
                    to: to + (stagger ? stagger * index : 0),
                    keyframes: effects2
                });
            }
        }
    });
    return result;
}
function fillValues(items) {
    var lastValue;
    all(items, function (item) {
        if (item.value !== _) {
            lastValue = item.value;
        }
        else {
            item.value = lastValue;
        }
    });
}
function fillInterpolators(items) {
    var lastInterpolator;
    for (var y = items.length - 1; y > -1; y--) {
        var item2 = items[y];
        if (item2.interpolate !== _) {
            lastInterpolator = item2.interpolate;
        }
        else {
            item2.interpolate = lastInterpolator;
        }
    }
}
function ensureFirstFrame(config, items, target, plugin, prop) {
    var firstFrame = find(items, function (c) { return c.offset === 0; });
    if (firstFrame === _ || firstFrame.value === _) {
        var value2 = plugin.getValue(target, prop);
        if (firstFrame === _) {
            items.splice(0, 0, {
                offset: 0,
                value: value2,
                easing: config.easing,
                interpolate: _
            });
        }
        else {
            firstFrame.value = value2;
            firstFrame.easing = config.easing;
            firstFrame.interpolate = _;
        }
    }
}
function ensureLastFrame(config, items) {
    var lastFrame = find(items, function (c) { return c.offset === 1; }, true);
    if (lastFrame === _ || lastFrame.value === _) {
        var value3 = items[items.length - 1].value;
        if (lastFrame === _) {
            push(items, {
                offset: 1,
                value: value3,
                easing: config.easing,
                interpolate: _
            });
        }
        else {
            lastFrame.value = value3;
            lastFrame.easing = lastFrame.easing || config.easing;
        }
    }
}

function tick(id, delta) {
    var model = getModel(id);
    var playState = model.state;
    if (playState === S_IDLE) {
        updateTimeline(id, CANCEL);
        return;
    }
    if (playState === S_FINISHED) {
        updateTimeline(id, FINISH);
        return;
    }
    if (playState === S_PAUSED) {
        updateTimeline(id, PAUSE);
        return;
    }
    var duration = model.duration;
    var repeat = model.repeat;
    var rate = model.rate;
    var isReversed = rate < 0;
    var time = model.time === _ ? (rate < 0 ? duration : 0) : model.time;
    var iteration = model.round || 0;
    if (model.state === S_PENDING) {
        model.state = S_RUNNING;
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
        model.round = ++iteration;
        time = isReversed ? 0 : duration;
        iterationEnded = true;
        if (model.yoyo) {
            model.rate = (model.rate || 0) * -1;
        }
        time = model.rate < 0 ? duration : 0;
    }
    model.round = iteration;
    model.time = time;
    if (!iterationEnded) {
        publish(model.id, UPDATE, model.time);
        updateTimeline(id, UPDATE);
        return;
    }
    if (repeat === iteration) {
        updateTimeline(id, FINISH);
        return;
    }
    publish(model.id, UPDATE, model.time);
    updateTimeline(id, UPDATE);
}
function updateTimeline(id, type) {
    var model = getModel(id);
    if (type === CANCEL) {
        model.round = 0;
        model.state = S_IDLE;
    }
    else if (type === FINISH) {
        model.round = 0;
        model.state = S_FINISHED;
        if (!model.yoyo) {
            model.time = model.rate < 0 ? 0 : model.duration;
        }
    }
    else if (type === PAUSE) {
        model.state = S_PAUSED;
    }
    else if (type === PLAY) {
        var isForwards = model.rate >= 0;
        if (isForwards && model.time === model.duration) {
            model.time = 0;
        }
        else if (!isForwards && model.time === 0) {
            model.time = model.duration;
        }
    }
    var isTimelineActive = model.state === S_RUNNING;
    var isTimelineInEffect = model.state !== S_IDLE;
    if (isTimelineInEffect && model.players === _) {
        setupEffects(model);
    }
    var time = model.time;
    var rate = model.rate;
    if (isTimelineInEffect) {
        all(model.players, function (effect) {
            var from = effect.from, to = effect.to;
            var isAnimationActive = isTimelineActive && inRange(flr(time), from, to);
            var offset = minMax((time - from) / (to - from), 0, 1);
            effect.update(offset, rate, isAnimationActive);
        });
    }
    if (!isTimelineActive) {
        loopOff(model.id);
    }
    if (type === PLAY) {
        loopOn(model.id);
    }
    if (!isTimelineInEffect) {
        all(model.players, function (effect) { return effect.cancel(); });
        model.time = 0;
        model.round = _;
        model.players = _;
    }
    if (type === FINISH) {
        publish(model.id, UPDATE, model.time);
    }
    publish(model.id, type, model.time);
}
function reverseTimeline(id) {
    updateRate(id, (getModel(id).rate || 0) * -1);
}
function playTimeline(id, options) {
    var model = getModel(id);
    if (options) {
        model.repeat = options.repeat;
        model.yoyo = options.alternate === true;
    }
    model.repeat = model.repeat || 1;
    model.yoyo = model.yoyo || false;
    model.state = S_RUNNING;
    updateTimeline(model.id, PLAY);
}
function updateTime(id, time) {
    var model = getModel(id);
    time = +time;
    model.time = isFinite(time) ? time : model.rate < 0 ? model.duration : 0;
    updateTimeline(id, UPDATE);
}
function updateRate(id, rate) {
    var model = getModel(id);
    model.rate = +rate || 1;
    updateTimeline(id, RATE);
}
function setupEffects(model) {
    if (model.players) {
        return;
    }
    var animations = [];
    all(getEffects(model), function (effect) {
        var controller = plugins[effect.plugin].animate(effect);
        if (controller) {
            controller.from = effect.from;
            controller.to = effect.to;
            push(animations, controller);
        }
    });
    model.duration = max.apply(_, animations
        .filter(function (a) { return isFinite(a.to); })
        .map(function (a) { return a.to; }));
    model.players = animations;
    updateTime(model.id, _);
}

var propKeyframeSort = sortBy('time');
function appendConfig(id, opts) {
    var model = getModel(id);
    var _nextTime = model.pos;
    all(opts, function (opt) {
        var to = opt.to, from = opt.from, duration = opt.duration;
        var hasTo = isDefined(to);
        var hasFrom = isDefined(from);
        var hasDuration = isDefined(duration);
        var to2 = hasTo && (hasFrom || hasDuration)
            ? to
            : hasDuration && hasFrom
                ? from + duration
                : hasTo && !hasDuration
                    ? _nextTime + to
                    : hasDuration
                        ? _nextTime + duration
                        : _;
        var from2 = hasFrom && (hasTo || hasDuration)
            ? from
            : hasTo && hasDuration
                ? to - duration
                : hasTo || hasDuration
                    ? _nextTime
                    : _;
        insert(model, from2, to2, opt);
    });
    calculateTimes(model);
    publish(model.id, CONFIG, model.time);
}
function insertConfigs(id, from, to, options) {
    var model = getModel(id);
    all(options, function (options2) {
        insert(model, from, to, options2);
    });
    calculateTimes(model);
    publish(model.id, CONFIG, model.time);
}
function insertSetConfigs(id, options) {
    var model = getModel(id);
    var pluginNames = Object.keys(plugins);
    all(options, function (opts) {
        var at = opts.at || model.pos;
        var opts2 = {};
        for (var name in opts) {
            if (includes(pluginNames, name)) {
                var props = opts[name];
                var props2 = {};
                for (var propName in props) {
                    var value = props[propName];
                    props2[propName] = [_, value];
                }
                opts2[name] = props2;
            }
            else {
                opts2[name] = opts[name];
            }
        }
        insert(model, at - 0.000000001, at, opts2);
    });
    calculateTimes(model);
    publish(model.id, CONFIG, model.time);
}
function insert(model, from, to, opts) {
    if (to === _) {
        throw new Error('missing duration');
    }
    var config = model.configs;
    opts = replaceWithRefs(model.refs, opts, true);
    opts.from = from;
    opts.to = to;
    opts.duration = opts.to - opts.from;
    all(opts.targets, function (target, i, ilen) {
        var delay = resolveProperty(opts.delay, target, i, ilen) || 0;
        var targetConfig = find(config, function (c) { return c.target === target; }) ||
            push(config, {
                from: max(opts.from + delay, 0),
                to: max(opts.to + delay, 0),
                easing: opts.easing || 'ease',
                duration: opts.to - opts.from,
                endDelay: resolveProperty(opts.endDelay, target, i, ilen) || 0,
                stagger: opts.stagger || 0,
                target: target,
                targetLength: ilen,
                propNames: [],
                keyframes: []
            });
        addPropertyKeyframes(targetConfig, i, opts);
        all(config, function (c) { return c.keyframes.sort(propKeyframeSort); });
    });
}
function addPropertyKeyframes(config, index, options) {
    var staggerMs = (options.stagger && options.stagger * (index + 1)) || 0;
    var delayMs = resolveProperty(options.delay, config, index, config.targetLength) || 0;
    var from = max(staggerMs + delayMs + options.from, 0);
    var duration = options.to - options.from;
    var easing = options.easing || 'ease';
    for (var pluginName in plugins) {
        if (owns(options, pluginName)) {
            var props = options[pluginName];
            for (var name in props) {
                if (owns(props, name)) {
                    pushDistinct(config.propNames, name);
                    addProperty(config, pluginName, index, name, props[name], duration, from, easing);
                }
            }
        }
    }
}
function addProperty(target, plugin, index, name, val, duration, from, defaultEasing) {
    if (!isDefined(val)) {
        return;
    }
    var defaultInterpolator = _;
    var values;
    if (isArrayLike(val) || !isObject(val)) {
        values = list(val);
    }
    else {
        var objVal = val;
        if (objVal.easing) {
            defaultEasing = objVal.easing;
        }
        if (objVal.interpolate) {
            defaultInterpolator = objVal.interpolate;
        }
        values = list(objVal.value);
    }
    var keyframes = values.map(function (v, i, vals) {
        var valOrObj = resolveProperty(v, target.target, index, target.targetLength);
        var valObj = valOrObj;
        var isObj2 = isObject(valOrObj);
        var value = isObj2 ? valObj.value : valOrObj;
        var offset = isObj2 && isNumber(valObj.offset)
            ?
                valObj.offset
            : i === vals.length - 1
                ?
                    1
                : i === 0
                    ?
                        0
                    : _;
        var interpolate = (valObj && valObj.interpolate) || defaultInterpolator;
        var easing = (valObj && valObj.easing) || defaultEasing;
        return { offset: offset, value: value, easing: easing, interpolate: interpolate };
    });
    inferOffsets(keyframes);
    all(keyframes, function (keyframe) {
        var offset = keyframe.offset, value = keyframe.value, easing = keyframe.easing, interpolate = keyframe.interpolate;
        var time = flr(duration * offset + from);
        var indexOfFrame = indexOf(target.keyframes, function (k) { return k.prop === name && k.time === time; });
        if (indexOfFrame !== -1) {
            target.keyframes[indexOfFrame].value = value;
            return;
        }
        push(target.keyframes, {
            plugin: plugin,
            easing: easing,
            index: index,
            prop: name,
            time: time,
            value: value,
            interpolate: interpolate
        });
    });
    find(target.keyframes, function (k) { return k.prop === name && k.time === from; }) ||
        push(target.keyframes, {
            plugin: plugin,
            easing: defaultEasing,
            index: index,
            prop: name,
            time: from,
            value: _,
            interpolate: defaultInterpolator
        });
    var to = from + duration;
    find(target.keyframes, function (k) { return k.prop === name && k.time === to; }, true) ||
        push(target.keyframes, {
            plugin: plugin,
            easing: defaultEasing,
            index: index,
            prop: name,
            time: to,
            value: _,
            interpolate: defaultInterpolator
        });
}
function inferOffsets(keyframes) {
    if (!keyframes.length) {
        return;
    }
    var first = find(keyframes, function (k) { return k.offset === 0; }) || keyframes[0];
    if (!isDefined(first.offset)) {
        first.offset = 0;
    }
    var last = find(keyframes, function (k) { return k.offset === 1; }, true) || keyframes[keyframes.length - 1];
    if (keyframes.length > 1 && !isDefined(last.offset)) {
        last.offset = 1;
    }
    for (var i = 1, ilen = keyframes.length; i < ilen; i++) {
        var target = keyframes[i];
        if (!isDefined(target.offset)) {
            for (var j = i + 1; j < ilen; j++) {
                var endTime = keyframes[j].offset;
                if (isDefined(endTime)) {
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
    }
}
function calculateTimes(model) {
    var timelineTo = 0;
    var maxNextTime = 0;
    all(model.configs, function (config) {
        var keyframes = config.keyframes;
        var targetFrom;
        var targetTo;
        all(keyframes, function (keyframe) {
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
        config.to = targetTo;
        config.from = targetFrom;
        config.duration = targetTo - targetFrom;
        maxNextTime = max(targetTo + config.endDelay, maxNextTime);
    });
    model.pos = maxNextTime;
    model.duration = timelineTo;
}

var timelineProto = {
    get state() {
        return getModel(this.id).state;
    },
    get duration() {
        return getModel(this.id).duration;
    },
    get currentTime() {
        return getModel(this.id).time;
    },
    set currentTime(time) {
        updateTime(this.id, time);
    },
    get playbackRate() {
        return getModel(this.id).rate;
    },
    set playbackRate(rate) {
        updateRate(this.id, rate);
    },
    add: function (opts) {
        appendConfig(this.id, opts);
        return this;
    },
    animate: function (opts) {
        appendConfig(this.id, opts);
        return this;
    },
    fromTo: function (from, to, options) {
        insertConfigs(this.id, from, to, options);
        return this;
    },
    cancel: function () {
        updateTimeline(this.id, CANCEL);
        return this;
    },
    destroy: function () {
        updateTimeline(this.id, CANCEL);
        unsubscribeAll(this.id);
        destroyModel(this.id);
    },
    finish: function () {
        updateTimeline(this.id, FINISH);
        return this;
    },
    on: function (eventName, listener) {
        subscribe(this.id, eventName, listener);
        return this;
    },
    once: function (eventName, listener) {
        var id = this.id;
        subscribe(id, eventName, function s(time) {
            unsubscribe(id, eventName, s);
            listener(time);
        });
        return this;
    },
    off: function (eventName, listener) {
        unsubscribe(this.id, eventName, listener);
        return this;
    },
    pause: function () {
        updateTimeline(this.id, PAUSE);
        return this;
    },
    play: function (options) {
        var self = this;
        if (options && options.destroy) {
            self.on('finish', function () { return self.destroy(); });
        }
        playTimeline(self.id, options);
        return self;
    },
    reverse: function () {
        reverseTimeline(this.id);
        return this;
    },
    seek: function (time) {
        updateTime(this.id, time);
        return this;
    },
    sequence: function (seqOptions) {
        var _this = this;
        all(seqOptions, function (opt) { return appendConfig(_this.id, opt); });
        return this;
    },
    set: function (options) {
        insertSetConfigs(this.id, options);
        return this;
    }
};
function timeline(opts) {
    var t1 = Object.create(timelineProto);
    t1.id = createModel(opts || {});
    return t1;
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
var find$1 = function (nameOrCssFunction) {
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
    var p = find$1(easingString);
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
var getEasing = memoize(cssFunction$$1);
var getInterpolator = memoize(function (fn) { return memoize(fn); });
function interpolate(l, r, o) {
    return l + (r - l) * o;
}
function fallbackInterpolator(l, r, o) {
    return o < 0.5 ? l : r;
}
function interpolator(duration, keyframes) {
    var times = keyframes.map(function (k) { return k.offset * duration; });
    all(keyframes, function (k) {
        var isSimple = !isFunction(k.interpolate);
        k.simpleFn = isSimple;
        k.interpolate = !isSimple
            ? getInterpolator(k.interpolate)
            : isNumber(k.value)
                ? interpolate
                : fallbackInterpolator;
    });
    return function (timelineOffset) {
        var absTime = duration * timelineOffset;
        var r = findEndIndex(times, absTime);
        var l = r ? r - 1 : 0;
        var rt = times[r];
        var lt = times[l];
        var lk = keyframes[l];
        var time = (absTime - lt) / (rt - lt);
        var progression = lk.easing ? getEasing(lk.easing)(time) : time;
        if (lk.simpleFn) {
            return lk.interpolate(lk.value, keyframes[r].value, progression);
        }
        return lk.interpolate(lk.value, keyframes[r].value)(progression);
    };
}

function hyphenate(value) {
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}

var PROPERTY = 0;
var ATTRIBUTE = 1;
var ATTRIBUTE_HYPHENATE = 2;
var CSSVAR = 3;
var cssVarExp = /^\-\-[a-z0-9\-]+$/i;
var viewbox = 'viewBox';
var svgReadonly = [viewbox];
var noHyphenate = [viewbox];
var propsPlugin = {
    name: 'props',
    animate: function (effect) {
        var target = effect.target, prop = effect.prop;
        var interpolate$$1 = interpolator(effect.to - effect.from, effect.keyframes);
        var propSetter = getTargetSetter(target, prop);
        var propGetter = getTargetGetter(target, prop);
        var initial = _;
        return {
            cancel: function () {
                if (initial !== _) {
                    propSetter(initial);
                }
                initial = _;
            },
            update: function (localTime, _playbackRate, _isActive) {
                if (initial === _) {
                    initial = propGetter();
                }
                propSetter(interpolate$$1(localTime));
            }
        };
    },
    getValue: function (target, prop) {
        return getTargetGetter(target, prop)();
    }
};
function getTargetType(target, prop) {
    if (isDOM(target)) {
        if (cssVarExp.test(prop)) {
            return CSSVAR;
        }
        else if (typeof target[prop] !== 'undefined' && !includes(svgReadonly, prop)) {
            return PROPERTY;
        }
        else if (includes(noHyphenate, prop)) {
            return ATTRIBUTE;
        }
        else {
            return ATTRIBUTE_HYPHENATE;
        }
    }
    else {
        return PROPERTY;
    }
}
function getTargetGetter(target, prop) {
    var targetType = getTargetType(target, prop);
    return targetType === CSSVAR
        ? getVariable(target, prop)
        : targetType === ATTRIBUTE
            ? getAttribute(target, prop)
            : targetType === ATTRIBUTE_HYPHENATE ? getAttributeHyphenate(target, prop) : getProperty(target, prop);
}
function getTargetSetter(target, prop) {
    var targetType = getTargetType(target, prop);
    return targetType === CSSVAR
        ? setVariable(target, prop)
        : targetType === ATTRIBUTE
            ? setAttribute(target, prop)
            : targetType === ATTRIBUTE_HYPHENATE ? setAttributeHyphenate(target, prop) : setProperty(target, prop);
}
function getAttribute(target, name) {
    return function () { return target.getAttribute(name); };
}
function setAttribute(target, name) {
    return function (value) { return target.setAttribute(name, value); };
}
function setAttributeHyphenate(target, name) {
    var attName = hyphenate(name);
    return function (value) { return target.setAttribute(attName, value); };
}
function getAttributeHyphenate(target, name) {
    var attName = hyphenate(name);
    return function () { return target.getAttribute(attName); };
}
function getVariable(target, name) {
    return function () { return target.style.getPropertyValue(name); };
}
function setVariable(target, name) {
    return function (value) { return target.style.setProperty(name, value ? value + '' : ''); };
}
function setProperty(target, name) {
    return function (value) { return (target[name] = value); };
}
function getProperty(target, name) {
    return function () { return target[name]; };
}

addPlugin(propsPlugin);
function animate(options) {
    return timeline().add(options);
}
function sequence(seqOptions) {
    return timeline().sequence(seqOptions);
}

exports.animate = animate;
exports.sequence = sequence;
exports.timeline = timeline;
exports.addPlugin = addPlugin;
exports.removePlugin = removePlugin;
exports.interpolate = interpolate;

}((this.just = this.just || {})));
