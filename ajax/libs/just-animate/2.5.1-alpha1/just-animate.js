(function (exports) {
'use strict';

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
function isOwner(obj, name) {
    return obj.hasOwnProperty(name);
}

var _ = undefined;


var CONFIG = 'config';

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

function remove(items, item) {
    var index = items.indexOf(item);
    return index !== -1 ? items.splice(index, 1) : _;
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

var APPEND = 'append';
var CANCEL = 'cancel';
var CLEAR_LABEL = 'clear';
var DESTROY = 'destroy';
var FINISH = 'finish';
var INSERT = 'insert';
var PAUSE = 'pause';
var PLAY = 'play';
var REVERSE = 'reverse';
var SET = 'set';
var SET_LABEL = 'set/label';
var SET_REFS = 'set/refs';

var TICK = 'tick';
var UPDATE = 'update';
var UPDATE_RATE = 'rate';
var SEEK = 'seek';

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
            if (isOwner(target, name)) {
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
        return isOwner(refs, str) && str.charAt(0) === '@' ? refs[str] : str;
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
        if (isOwner(value, name)) {
            var value2 = value[name];
            obj2[name] = recurseObjects ? resolveRefs(refs, value2, name !== 'targets') : value2;
        }
    }
    return obj2;
}

var flr = Math.floor;
var max = Math.max;
var min = Math.min;


function inRange(val, a, z) {
    return val !== _ && a <= val && val <= z;
}
function inBetween(val, a, z, sign) {
    return sign > 0 ? inRange(val, a, z) : inRange(val, z, a);
}
function minMax(val, a, z) {
    return min(max(val, a), z);
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

var calculateConfigs = function (model) {
    var maxTo = 0;
    var cursor = 0;
    var configs = model.configs;
    for (var i = 0, ilen = configs.length; i < ilen; i++) {
        var config = configs[i];
        var times = config.keyframes.map(function (k) { return k.time; });
        var to = max.apply(_, times);
        var from = min.apply(_, times);
        config.to = to;
        config.from = from;
        config.duration = to - from;
        maxTo = max(to, maxTo);
        cursor = max(to + config.endDelay, cursor);
    }
    model.cursor = cursor;
    model.timing.duration = maxTo;
};

var propKeyframeSort = sortBy('time');
var insert = function (model, options, ctx) {
    all(options, function (opts) {
        if (opts.to === _) {
            throw new Error('missing duration');
        }
        opts = replaceWithRefs(model.refs, opts, true);
        all(opts.targets, function (target, i, ilen) {
            var config = addPropertyKeyframes(model, target, i, ilen, opts);
            ctx.dirty(config);
        });
    });
    calculateConfigs(model);
    ctx.trigger(CONFIG);
};
function addPropertyKeyframes(model, target, index, ilen, opts) {
    var defaultEasing = 'ease';
    var delay = resolveProperty(opts.delay, target, index, ilen) || 0;
    var config = find(model.configs, function (c) { return c.target === target; }) ||
        push(model.configs, {
            from: max(opts.from + delay, 0),
            to: max(opts.to + delay, 0),
            easing: opts.easing || defaultEasing,
            duration: opts.to - opts.from,
            endDelay: resolveProperty(opts.endDelay, target, index, ilen) || 0,
            stagger: opts.stagger || 0,
            target: target,
            targetLength: ilen,
            propNames: [],
            keyframes: []
        });
    var staggerMs = (opts.stagger && opts.stagger * (index + 1)) || 0;
    var delayMs = resolveProperty(opts.delay, config, index, config.targetLength) || 0;
    var from = max(staggerMs + delayMs + opts.from, 0);
    var duration = opts.to - opts.from;
    var easing = opts.easing || defaultEasing;
    for (var pluginName in plugins) {
        if (isOwner(opts, pluginName)) {
            var props = opts[pluginName];
            for (var name in props) {
                var propVal = props[name];
                if (isOwner(props, name) && isDefined(propVal)) {
                    addProperty(config, pluginName, index, name, propVal, duration, from, easing);
                }
            }
        }
    }
    config.keyframes.sort(propKeyframeSort);
    return config;
}
function addProperty(config, plugin, index, name, val, duration, from, defaultEasing) {
    var defaultInterpolator;
    var values;
    var isValueObject = !isArrayLike(val) && isObject(val);
    if (isValueObject) {
        var objVal = val;
        if (objVal.easing) {
            defaultEasing = objVal.easing;
        }
        if (objVal.interpolate) {
            defaultInterpolator = objVal.interpolate;
        }
        values = list(objVal.value);
    }
    else {
        values = list(val);
    }
    var keyframes = values.map(function (v, i, vals) {
        var valOrObj = resolveProperty(v, config.target, index, config.targetLength);
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
        var offset = keyframe.offset, value = keyframe.value;
        var time = flr(duration * offset + from);
        var frame = find(config.keyframes, function (k) { return k.prop === name && k.time === time; }) ||
            push(config.keyframes, {
                plugin: plugin,
                easing: keyframe.easing,
                index: index,
                prop: name,
                time: time,
                value: value,
                interpolate: keyframe.interpolate
            });
        frame.value = value;
    });
    find(config.keyframes, function (k) { return k.prop === name && k.time === from; }) ||
        push(config.keyframes, {
            plugin: plugin,
            easing: defaultEasing,
            index: index,
            prop: name,
            time: from,
            value: _,
            interpolate: defaultInterpolator
        });
    var to = from + duration;
    find(config.keyframes, function (k) { return k.prop === name && k.time === to; }, true) ||
        push(config.keyframes, {
            plugin: plugin,
            easing: defaultEasing,
            index: index,
            prop: name,
            time: to,
            value: _,
            interpolate: defaultInterpolator
        });
    pushDistinct(config.propNames, name);
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

var append = function (model, data, ctx) {
    var cursor = model.cursor;
    var opts2 = list(data).map(function (opt) {
        var to = opt.to, from = opt.from, duration = opt.duration;
        var hasTo = isDefined(to);
        var hasFrom = isDefined(from);
        var hasDuration = isDefined(duration);
        var opt2 = opt;
        opt2.to =
            hasTo && (hasFrom || hasDuration)
                ? to
                : hasDuration && hasFrom
                    ? from + duration
                    : hasTo && !hasDuration ? cursor + to : hasDuration ? cursor + duration : _;
        opt2.from =
            hasFrom && (hasTo || hasDuration)
                ? from
                : hasTo && hasDuration ? to - duration : hasTo || hasDuration ? cursor : _;
        return opt2;
    });
    insert(model, opts2, ctx);
};

var raf = requestAnimationFrame;
var caf = cancelAnimationFrame;
var now = function () { return performance.now(); };
var active = [];
var deltas = {};
var lastHandle = _;
var lastTime = _;
function cancel$1() {
    caf(lastHandle);
    lastHandle = lastTime = _;
}
function update() {
    var len = active.length;
    lastTime = lastTime || now();
    if (!len) {
        cancel$1();
        return;
    }
    var thisTime = now();
    var delta = thisTime - lastTime;
    lastTime = thisTime;
    lastHandle = raf(update);
    for (var i = len - 1; i > -1; i--) {
        var activeId = active[i];
        deltas[activeId] += delta;
        dispatch(TICK, activeId, delta);
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
    if (remove(active, id)) {
        delete deltas[id];
    }
    if (!active.length) {
        cancel$1();
    }
}

var cancel = function (model, _data, ctx) {
    var timing = model.timing;
    all(model.players, function (effect) { return effect.cancel(); });
    timing.active = false;
    timing.playing = false;
    timing.time = _;
    timing.round = _;
    model.players = _;
    loopOff(model.id);
    ctx.trigger(CANCEL);
};

function clearLabel(model, name, ctx) {
    delete model.labels[name];
    ctx.trigger(CONFIG);
}

var destroy = function (model, _data, ctx) {
    cancel(model, _, ctx);
    ctx.destroyed = true;
};

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

function assign() {
    var result = {};
    all(arguments, function (obj) {
        for (var name in obj) {
            if (isOwner(obj, name)) {
                result[name] = obj[name];
            }
        }
    });
    return result;
}

var offsetSorter = sortBy('offset');

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

function calculatePlayers(model) {
    var players = model.players, timing = model.timing;
    timing.duration = max.apply(_, players.filter(function (a) { return isFinite(a.to); }).map(function (a) { return a.to; }));
    timing.time = isFinite(timing.time) ? timing.time : timing.rate < 0 ? timing.duration : 0;
}

function setup(model) {
    model.players = [];
    all(model.configs, function (config) { return setupTarget(model, config); });
    calculatePlayers(model);
}
function setupTarget(model, config) {
    var resolvedConfig = resolveRefs(model.refs, config, true);
    var effects = toEffects(resolvedConfig);
    all(effects, function (effect) {
        var player = plugins[effect.plugin].animate(effect);
        if (player) {
            player.from = effect.from;
            player.to = effect.to;
            push(model.players, player);
        }
    });
}

var update$1 = function (model, _data, ctx) {
    if (model.players === _) {
        setup(model);
    }
    var playing = model.timing.playing;
    var time = model.timing.time;
    if (!playing) {
        loopOff(model.id);
    }
    all(model.players, function (player) {
        var from = player.from;
        var to = player.to;
        var isActive = playing && inRange(flr(time), from, to);
        var offset = minMax((time - from) / (to - from), 0, 1);
        player.update(offset, model.timing.rate, isActive);
    });
    ctx.trigger(UPDATE);
};

function finish(model, _data, ctx) {
    var playerConfig = model.playerConfig, timing = model.timing;
    timing.round = 0;
    timing.playing = false;
    timing.active = true;
    if (!playerConfig.yoyo) {
        timing.time = timing.rate < 0 ? 0 : timing.duration;
    }
    loopOff(model.id);
    update$1(model, _, ctx);
    ctx.trigger(FINISH);
    if (playerConfig.destroy) {
        destroy(model, _, ctx);
    }
}

function pause(model, _data, ctx) {
    model.timing.playing = false;
    model.timing.active = true;
    loopOff(model.id);
    update$1(model, _, ctx);
    ctx.trigger(PAUSE);
}

function seek(model, time, ctx) {
    var currentTime;
    if (isString(time)) {
        var labelTime = model.labels[time];
        currentTime = isDefined(labelTime) ? labelTime : time;
    }
    else {
        currentTime = time;
    }
    currentTime = +currentTime;
    model.timing.time = isFinite(currentTime) ? currentTime : model.timing.rate < 0 ? model.timing.duration : 0;
    update$1(model, _, ctx);
}

function updateRate(model, rate, ctx) {
    model.timing.rate = rate || 1;
    update$1(model, _, ctx);
}

function play(model, options, ctx) {
    var playerConfig = model.playerConfig, timing = model.timing;
    if (options) {
        playerConfig.repeat = options.repeat;
        playerConfig.yoyo = !!options.alternate;
        playerConfig.destroy = !!options.destroy;
        if (isDefined(options.to)) {
            playerConfig.to = isNumber(options.to) ? options.to : model.labels[options.to];
        }
    }
    playerConfig.repeat = playerConfig.repeat || 1;
    playerConfig.yoyo = playerConfig.yoyo || false;
    model.timing.playing = true;
    model.timing.active = true;
    var isForwards = timing.rate >= 0;
    if (isForwards && timing.time === timing.duration) {
        timing.time = 0;
    }
    else if (!isForwards && timing.time === 0) {
        timing.time = timing.duration;
    }
    if (options && isDefined(options.from)) {
        seek(model, options.from, ctx);
    }
    var shouldReverse = isDefined(playerConfig.to) && (isForwards && timing.time > playerConfig.to) ||
        (!isForwards && timing.time < playerConfig.to);
    if (shouldReverse) {
        updateRate(model, timing.rate * -1, ctx);
    }
    loopOn(model.id);
    update$1(model, _, ctx);
    ctx.trigger(PLAY);
}

function reverse(model, _data, ctx) {
    model.timing.rate *= -1;
    update$1(model, _, ctx);
    ctx.trigger(REVERSE);
}

function set(model, options, ctx) {
    var pluginNames = Object.keys(plugins);
    var opts2 = list(options).map(function (opts) {
        var at = opts.at || model.cursor;
        var opt2 = {};
        for (var name in opts) {
            if (includes(pluginNames, name)) {
                var props = opts[name];
                var props2 = {};
                for (var propName in props) {
                    var value = props[propName];
                    props2[propName] = [_, value];
                }
                opt2[name] = props2;
            }
            else {
                opt2[name] = opts[name];
            }
        }
        opt2.from = at - 0.000000001;
        opt2.to = at;
        return opt2;
    });
    insert(model, opts2, ctx);
}

function setLabel(model, options, ctx) {
    var time = options.time;
    if (!isDefined(time)) {
        time = model.cursor;
    }
    model.labels[options.name] = time;
    ctx.trigger(CONFIG);
}

function tick(model, delta, ctx) {
    var labels = model.labels, playerConfig = model.playerConfig, timing = model.timing;
    var duration = timing.duration;
    var rate = timing.rate;
    var repeat = playerConfig.repeat;
    var time = timing.time === _ ? (rate < 0 ? duration : 0) : timing.time;
    var round = timing.round || 0;
    var isReversed = rate < 0;
    time += delta * rate;
    var iterationEnded = false;
    if (!inRange(time, 0, duration)) {
        timing.round = ++round;
        time = isReversed ? 0 : duration;
        iterationEnded = true;
        if (playerConfig.yoyo) {
            timing.rate = (timing.rate || 0) * -1;
        }
        time = timing.rate < 0 ? duration : 0;
    }
    for (var labelName in labels) {
        var labelTime = labels[labelName];
        if (inBetween(labelTime, timing.time, time, rate)) {
            ctx.trigger(labelName);
        }
    }
    if (playerConfig && isDefined(playerConfig.to)) {
        var to = playerConfig.to;
        if (inBetween(to, timing.time, time, rate)) {
            time = to;
            playerConfig.to = _;
            pause(model, _, ctx);
        }
    }
    timing.time = time;
    timing.round = round;
    if (iterationEnded && repeat === round) {
        finish(model, _, ctx);
        return;
    }
    update$1(model, _, ctx);
}

function rebuild(model, ctx) {
    all(model.players, function (p) { return p.cancel(); });
    model.players = _;
    if (model.timing.playing) {
        play(model, _, ctx);
    }
    else {
        pause(model, _, ctx);
    }
}

function setReferences(model, options, ctx) {
    for (var refName in options) {
        model.refs['@' + refName] = options[refName];
    }
    ctx.needUpdate = model.configs;
    ctx.trigger(CONFIG);
}

var stateSubs = [];
var reducers = (_a = {},
    _a[APPEND] = append,
    _a[CANCEL] = cancel,
    _a[CLEAR_LABEL] = clearLabel,
    _a[DESTROY] = destroy,
    _a[FINISH] = finish,
    _a[INSERT] = insert,
    _a[PAUSE] = pause,
    _a[PLAY] = play,
    _a[REVERSE] = reverse,
    _a[SEEK] = seek,
    _a[SET] = set,
    _a[SET_LABEL] = setLabel,
    _a[SET_REFS] = setReferences,
    _a[TICK] = tick,
    _a[UPDATE] = update$1,
    _a[UPDATE_RATE] = updateRate,
    _a);
var stores = {};
var nextHandlerId = 0;
function createInitial(opts) {
    var refs = {};
    if (opts.references) {
        for (var name in opts.references) {
            refs['@' + name] = opts.references[name];
        }
    }
    var newModel = {
        id: opts.id || _,
        cursor: 0,
        configs: [],
        labels: opts.labels || {},
        players: _,
        playerConfig: {
            repeat: _,
            yoyo: false
        },
        refs: refs,
        timing: {
            rate: 1,
            playing: false,
            active: false,
            round: _,
            time: _,
            duration: 0
        }
    };
    return newModel;
}
function getState(id) {
    return getStore(id).state;
}
function getStore(id) {
    var model = stores[id];
    if (!model) {
        throw new Error('not found');
    }
    return model;
}
function addStore(opts) {
    stores[opts.id] = {
        state: createInitial(opts),
        subs: {}
    };
}
function on(id, eventName, handler, arg) {
    var store = getStore(id);
    var subs = (store.subs[eventName] = store.subs[eventName] || []);
    var hid = handler._ja_id_ || (handler._ja_id_ = ++nextHandlerId);
    subs[hid] = { fn: handler, arg: arg };
    return hid;
}
function off(id, eventName, listener) {
    var store = getStore(id);
    var subs = store.subs[eventName];
    var hid = listener._ja_id_;
    if (subs && hid) {
        subs[hid] = _;
    }
}
function dispatch(action, id, data) {
    var fn = reducers[action];
    var store = getStore(id);
    var ctx = {
        events: [],
        needUpdate: [],
        trigger: trigger,
        dirty: dirty
    };
    var model = store.state;
    fn(model, data, ctx);
    all(ctx.events, function (evt) {
        var subs = store.subs[evt];
        if (subs) {
            for (var hid in subs) {
                var sub = subs[hid];
                if (sub) {
                    sub.fn(sub.arg);
                }
            }
        }
    });
    if (ctx.destroyed) {
        delete stores[id];
    }
    else if (ctx.needUpdate.length) {
        if (model.timing.active) {
            rebuild(model, ctx);
        }
        else {
            calculateConfigs(model);
        }
    }
    all(ctx.events, function (evt) {
        all(stateSubs, function (sub2) {
            sub2(evt, store);
        });
    });
}
function getIds() {
    return Object.keys(stores).filter(function (s) { return stores[s] !== _; });
}
function subscribe(fn) {
    pushDistinct(stateSubs, fn);
}
function unsubscribe(fn) {
    remove(stateSubs, fn);
}
function trigger(eventName) {
    pushDistinct(this.events, eventName);
}
function dirty(config) {
    pushDistinct(this.needUpdate, config);
}
var _a;

var timelineId = 0;
var Timeline = (function () {
    function Timeline(opts) {
        opts = opts || {};
        this.id = opts.id = opts.id || 'Timeline ' + ++timelineId;
        addStore(opts);
    }
    Object.defineProperty(Timeline.prototype, "isActive", {
        get: function () {
            return !!getState(this.id).timing.active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "isPlaying", {
        get: function () {
            return !!getState(this.id).timing.playing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "duration", {
        get: function () {
            var _a = getState(this.id), cursor = _a.cursor, timing = _a.timing;
            return timing.active ? timing.duration : cursor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "currentTime", {
        get: function () {
            return getState(this.id).timing.time;
        },
        set: function (time) {
            dispatch(SEEK, this.id, time);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Timeline.prototype, "playbackRate", {
        get: function () {
            return getState(this.id).timing.rate;
        },
        set: function (rate) {
            dispatch(UPDATE_RATE, this.id, rate);
        },
        enumerable: true,
        configurable: true
    });
    Timeline.prototype.add = function (opts) {
        dispatch(APPEND, this.id, opts);
        return this;
    };
    Timeline.prototype.animate = function (opts) {
        dispatch(APPEND, this.id, opts);
        return this;
    };
    Timeline.prototype.fromTo = function (from, to, options) {
        all(options, function (options2) {
            options2.to = to;
            options2.from = from;
        });
        dispatch(INSERT, this.id, options);
        return this;
    };
    Timeline.prototype.cancel = function () {
        dispatch(CANCEL, this.id);
        return this;
    };
    Timeline.prototype.destroy = function () {
        dispatch(DESTROY, this.id);
    };
    Timeline.prototype.finish = function () {
        dispatch(FINISH, this.id);
        return this;
    };
    Timeline.prototype.on = function (name, fn) {
        on(this.id, name, fn, this);
        return this;
    };
    Timeline.prototype.once = function (eventName, handler) {
        var self = this;
        var callback = function (resolve) {
            self.on(eventName, function s() {
                self.off(eventName, s);
                resolve(self);
            });
        };
        if (arguments.length === 2) {
            callback(handler);
            return self;
        }
        return new Promise(callback);
    };
    Timeline.prototype.off = function (name, fn) {
        off(this.id, name, fn);
        return this;
    };
    Timeline.prototype.pause = function () {
        dispatch(PAUSE, this.id);
        return this;
    };
    Timeline.prototype.play = function (options) {
        dispatch(PLAY, this.id, options);
        return this;
    };
    Timeline.prototype.reverse = function () {
        dispatch(REVERSE, this.id);
        return this;
    };
    Timeline.prototype.seek = function (time) {
        dispatch(SEEK, this.id, time);
        return this;
    };
    Timeline.prototype.sequence = function (seqOptions) {
        var _this = this;
        all(seqOptions, function (opt) { return dispatch(APPEND, _this.id, opt); });
        return this;
    };
    Timeline.prototype.set = function (opts) {
        dispatch(SET, this.id, opts);
        return this;
    };
    Timeline.prototype.setReferences = function (opts) {
        dispatch(SET_REFS, this.id, opts);
        return this;
    };
    Timeline.prototype.getLabel = function (name) {
        return getState(this.id).labels[name] || _;
    };
    Timeline.prototype.setLabel = function (name, time) {
        dispatch(SET_LABEL, this.id, { name: name, time: time });
        return this;
    };
    Timeline.prototype.clearLabel = function (name) {
        dispatch(CLEAR_LABEL, this.id, name);
        return this;
    };
    return Timeline;
}());
function timeline(opts) {
    return new Timeline(opts);
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

var steps = function (count, pos) {
    var q = count / 1;
    var p = pos === 'end'
        ? 0 : pos === 'start'
        ? 1 : pos || 0;
    return function (x) { return x >= 1 ? 1 : (p * q + x) - (p * q + x) % q; };
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
        throw new Error('css parse error');
    }
    return [matches[1]].concat(matches[2].split(','));
};
var cssFunction = function (easingString) {
    var p = find$1(easingString);
    var fnName = p[0];
    if (fnName === 'steps') {
        return steps(+p[1], p[2]);
    }
    if (fnName === 'cubic-bezier') {
        return cubicBezier$$1(+p[1], +p[2], +p[3], +p[4]);
    }
    throw new Error('css parse error');
};

var abs$1 = Math.abs;

/**
 * Animations change at a constant speed
 */

function memoize(func) {
    var cache = [];
    return function () {
        var args = arguments;
        for (var h = 0, hlen = cache.length; h < hlen; h++) {
            var keys = cache[h].args;
            var ilen = args.length;
            if (keys.length !== ilen) {
                continue;
            }
            var matches = 0;
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
var getEasing = memoize(cssFunction);
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
        var progression = !lk.easing
            ? time : (isFunction(lk.easing)
            ? lk.easing
            : getEasing(lk.easing))(time);
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
    if (!isDOM(target)) {
        return PROPERTY;
    }
    if (cssVarExp.test(prop)) {
        return CSSVAR;
    }
    if (typeof target[prop] !== 'undefined' && !includes(svgReadonly, prop)) {
        return PROPERTY;
    }
    if (includes(noHyphenate, prop)) {
        return ATTRIBUTE;
    }
    return ATTRIBUTE_HYPHENATE;
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

function animate(options) {
    return timeline().add(options);
}
function sequence(seqOptions) {
    return timeline().sequence(seqOptions);
}
addPlugin(propsPlugin);
if (typeof window !== 'undefined') {
    window.just_devtools = {
        dispatch: dispatch,
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        getIds: getIds,
        getState: getState
    };
}

exports.animate = animate;
exports.sequence = sequence;
exports.timeline = timeline;
exports.addPlugin = addPlugin;
exports.removePlugin = removePlugin;
exports.interpolate = interpolate;

}((this.just = this.just || {})));
