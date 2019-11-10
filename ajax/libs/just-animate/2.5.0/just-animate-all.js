(function (exports) {
'use strict';

var plugins = {};
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
    return a && isFinite(a.length) && !isString(a) && !isFunction(a);
}
function isDOM(target) {
    return target.nodeType || target instanceof SVGElement;
}
function isOwner(obj, name) {
    return obj.hasOwnProperty(name);
}

var S_INACTIVE = 1;
var S_PAUSED = 2;
var S_PLAYING = 3;
var _ = undefined;
var measureExpression = /^([+|-]*[0-9]*[.]*?[0-9]+)([a-z%]+)*$/i;

var CONFIG = 'config';

var abs = Math.abs;
var flr = Math.floor;
var max = Math.max;
var min = Math.min;


function inRange(val, a, z) {
    return val !== _ && a <= val && val <= z;
}
function minMax(val, a, z) {
    return min(max(val, a), z);
}

function hyphenate(value) {
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}
function csvToList(data) {
    return data.split(',');
}

var RUNNING = 'running';
var PX = 'px';
var DEG = 'deg';
var X = 'X';
var Y = 'Y';
var Z = 'Z';
var TRANSLATE = 'translate';
var TRANSFORM = 'transform';
var transformAngles = csvToList('rotateX,rotateY,rotateZ,rotate');
var transformScales = csvToList('scaleX,scaleY,scaleZ,scale');
var transformLengths = csvToList('perspective,x,y,z');
var transforms = transformAngles.concat(transformScales, transformLengths);
var aliases = {
    x: TRANSLATE + X,
    y: TRANSLATE + Y,
    z: TRANSLATE + Z
};
var cssLengths = csvToList("backgroundSize,border,borderBottom,borderBottomLeftRadius,borderBottomRightRadius,borderBottomWidth,borderLeft,borderLeftWidth,borderRadius,borderRight,borderRightWidth,borderTop,borderTopLeftRadius,borderTopRightRadius,borderTopWidth,borderWidth,bottom,columnGap,columnRuleWidth,columnWidth,columns,flexBasis,font,fontSize,gridColumnGap,gridGap,gridRowGap,height,left,letterSpacing,lineHeight,margin,marginBottom,marginLeft,marginRight,marginTop,maskSize,maxHeight,maxWidth,minHeight,minWidth,outline,outlineOffset,outlineWidth,padding,paddingBottom,paddingLeft,paddingRight,paddingTop,perspective,right,shapeMargin,tabSize,top,width,wordSpacing");
var cssProps = [TRANSFORM].concat(transforms, cssLengths);

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

var frameSize = 17;
function animate(effect) {
    var keyframes = effect.keyframes, prop = effect.prop, from = effect.from, to = effect.to, target = effect.target;
    var duration = to - from;
    var getAnimator = memoize(function () {
        var frames = keyframes.map(function (_a) {
            var offset = _a.offset, value = _a.value, easing = _a.easing;
            return (_b = { offset: offset }, _b[prop] = value, _b.easing = easing, _b);
            var _b;
        });
        var a = target.animate(frames, {
            duration: duration,
            fill: 'both'
        });
        a.pause();
        return a;
    });
    return {
        cancel: function () {
            getAnimator().cancel();
        },
        update: function (offset, rate, isPlaying) {
            var animator = getAnimator();
            var time = duration * offset;
            if (abs(animator.currentTime - time) > 1) {
                animator.currentTime = time;
            }
            if (isPlaying && animator.playbackRate !== rate) {
                var currentTime = animator.currentTime;
                if (currentTime < 1) {
                    animator.currentTime = 1;
                }
                else if (currentTime >= duration - 1) {
                    animator.currentTime = duration - 1;
                }
                animator.playbackRate = rate;
            }
            var needsToPlay = isPlaying &&
                !(animator.playState === RUNNING || animator.playState === 'finish') &&
                !(rate < 0 && time < frameSize) &&
                !(rate >= 0 && time > duration - frameSize);
            if (needsToPlay) {
                animator.play();
            }
            var needsToPause = !isPlaying && (animator.playState === RUNNING || animator.playState === 'pending');
            if (needsToPause) {
                animator.pause();
            }
        }
    };
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

function appendUnits(effects) {
    for (var propName in effects) {
        if (includes(cssLengths, propName)) {
            var prop = effects[propName];
            for (var offset in prop) {
                var obj = prop[offset];
                if (isDefined(obj)) {
                    var value = obj.value;
                    if (isNumber(value)) {
                        obj.value += PX;
                    }
                }
            }
        }
    }
}

function parseUnit(val) {
    var output = {
        unit: _,
        value: _
    };
    if (!isDefined(val)) {
        return output;
    }
    if (Number(val)) {
        output.value = +val;
        return output;
    }
    var match = measureExpression.exec(val);
    if (match) {
        output.unit = match[2] || _;
        output.value = match[1] ? parseFloat(match[1]) : _;
    }
    return output;
}

function combineTransforms(target, effects, propToPlugin) {
    var transformNames = target.propNames.filter(function (t) { return includes(transforms, t); });
    if (!transformNames.length) {
        return;
    }
    if (includes(target.propNames, TRANSFORM)) {
        throw new Error('transform + shorthand is not allowed');
    }
    var offsets = [];
    var easings = {};
    all(transformNames, function (name) {
        var effects2 = effects[name];
        if (effects2) {
            all(effects2, function (effect) {
                easings[effect.offset] = effect.easing;
                pushDistinct(offsets, effect.offset);
            });
        }
    });
    offsets.sort();
    var transformEffects = offsets.map(function (offset) {
        var values = {};
        all(transformNames, function (name) {
            var effect = find(effects[name], function (e) { return e.offset === offset; });
            values[name] = effect ? effect.value : _;
        });
        return {
            offset: offset,
            easing: easings[offset],
            values: values
        };
    });
    var len = transformEffects.length;
    for (var i = len - 1; i > -1; --i) {
        var effect = transformEffects[i];
        for (var transform in effect.values) {
            var value = effect.values[transform];
            if (isDefined(value)) {
                continue;
            }
            var startingPos = _;
            for (var j = i - 1; j > -1; j--) {
                if (isDefined(transformEffects[j].values[transform])) {
                    startingPos = j;
                    break;
                }
            }
            var endingPos = _;
            for (var k = i + 1; k < len; k++) {
                if (isDefined(transformEffects[k].values[transform])) {
                    endingPos = k;
                    break;
                }
            }
            var startingPosFound = startingPos !== _;
            var endingPosFound = endingPos !== _;
            if (startingPosFound && endingPosFound) {
                var startEffect = transformEffects[startingPos];
                var endEffect = transformEffects[endingPos];
                var startVal = parseUnit(startEffect.values[transform]);
                var endVal = parseUnit(endEffect.values[transform]);
                for (var g = startingPos + 1; g < endingPos; g++) {
                    var currentOffset = offsets[g];
                    var offsetDelta = (currentOffset - startEffect.offset) / (endEffect.offset - startEffect.offset);
                    var currentValue = startVal.value + (endVal.value - startVal.value) * offsetDelta;
                    var currentValueWithUnit = currentValue + (endVal.unit || startVal.unit || '');
                    var currentKeyframe = transformEffects[g];
                    currentKeyframe.values[transform] = currentValueWithUnit;
                }
            }
            else if (startingPosFound) {
                for (var g = startingPos + 1; g < len; g++) {
                    transformEffects[g].values[transform] = transformEffects[startingPos].values[transform];
                }
            }
        }
    }
    if (transformEffects.length) {
        all(transformNames, function (name) {
            effects[name] = _;
        });
        var transformEffects2_1 = [];
        all(transformEffects, function (effect) {
            var val = _;
            for (var prop in effect.values) {
                var unit = parseUnit(effect.values[prop]);
                if (unit.value === _) {
                    continue;
                }
                if (!unit.unit) {
                    unit.unit = includes(transformLengths, prop) ? PX : includes(transformAngles, prop) ? DEG : '';
                }
                val = (val ? val + ' ' : '') + (aliases[prop] || prop) + '(' + unit.value + unit.unit + ')';
            }
            transformEffects2_1.push({
                offset: effect.offset,
                value: val,
                easing: effect.easing,
                interpolate: _
            });
        });
        effects[TRANSFORM] = transformEffects2_1;
        propToPlugin[TRANSFORM] = 'web';
    }
}

var waapiPlugin = {
    name: 'web',
    animate: animate,
    getValue: function (target, key) {
        return getComputedStyle(target)[key];
    },
    onWillAnimate: function (target, effects, propToPlugin) {
        if (isDOM(target.target)) {
            appendUnits(effects);
            combineTransforms(target, effects, propToPlugin);
        }
    }
};

var s4 = function () { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
var uuid = function () { return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4(); };

var APPEND = 'append';
var CANCEL = 'cancel';
var DESTROY = 'destroy';
var FINISH = 'finish';
var INSERT = 'insert';
var PAUSE = 'pause';
var PLAY = 'play';
var REVERSE = 'reverse';
var SET = 'set';

var TICK = 'tick';
var UPDATE = 'update';
var UPDATE_RATE = 'rate';
var UPDATE_TIME = 'time';

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
    all(model.players, function (effect) { return effect.cancel(); });
    model.state = S_INACTIVE;
    model.time = _;
    model.round = _;
    model.players = _;
    loopOff(model.id);
    ctx.trigger(CANCEL);
};

var destroy = function (model, _data, ctx) {
    cancel(model, _, ctx);
    ctx.destroyed = true;
};

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

function resolveProperty(input, target, index, len) {
    return isFunction(input)
        ? resolveProperty(input(target, index, len), target, index, len)
        : input;
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
    model.duration = max.apply(_, model.players.filter(function (a) { return isFinite(a.to); }).map(function (a) { return a.to; }));
    model.time = isFinite(model.time) ? model.time : model.rate < 0 ? model.duration : 0;
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
    var isPlaying = model.state === S_PLAYING;
    var time = model.time;
    if (!isPlaying) {
        loopOff(model.id);
    }
    all(model.players, function (player) {
        var from = player.from;
        var to = player.to;
        var isActive = isPlaying && inRange(flr(time), from, to);
        var offset = minMax((time - from) / (to - from), 0, 1);
        player.update(offset, model.rate, isActive);
    });
    ctx.trigger(UPDATE);
};

var finish = function (model, _data, ctx) {
    model.round = 0;
    model.state = S_PAUSED;
    if (!model.yoyo) {
        model.time = model.rate < 0 ? 0 : model.duration;
    }
    loopOff(model.id);
    update$1(model, _, ctx);
    ctx.trigger(FINISH);
    if (model.destroy) {
        destroy(model, _, ctx);
    }
};

var pause = function (model, _data, ctx) {
    model.state = S_PAUSED;
    loopOff(model.id);
    update$1(model, _, ctx);
    ctx.trigger(PAUSE);
};

var play = function (model, options, ctx) {
    if (options) {
        model.repeat = options.repeat;
        model.yoyo = !!options.alternate;
        model.destroy = !!options.destroy;
    }
    model.repeat = model.repeat || 1;
    model.yoyo = model.yoyo || false;
    model.state = S_PLAYING;
    var isForwards = model.rate >= 0;
    if (isForwards && model.time === model.duration) {
        model.time = 0;
    }
    else if (!isForwards && model.time === 0) {
        model.time = model.duration;
    }
    loopOn(model.id);
    update$1(model, _, ctx);
    ctx.trigger(PLAY);
};

var reverse = function (model, _data, ctx) {
    model.rate *= -1;
    update$1(model, _, ctx);
    ctx.trigger(REVERSE);
};

var tick = function (model, delta, _ctx) {
    var duration = model.duration;
    var repeat = model.repeat;
    var rate = model.rate;
    var time = model.time === _ ? (rate < 0 ? duration : 0) : model.time;
    var round = model.round || 0;
    var isReversed = rate < 0;
    time += delta * rate;
    var iterationEnded = false;
    if (!inRange(time, 0, duration)) {
        model.round = ++round;
        time = isReversed ? 0 : duration;
        iterationEnded = true;
        if (model.yoyo) {
            model.rate = (model.rate || 0) * -1;
        }
        time = model.rate < 0 ? duration : 0;
    }
    model.time = time;
    model.round = round;
    if (iterationEnded && repeat === round) {
        finish(model, _, _ctx);
        return;
    }
    update$1(model, _, _ctx);
};

var updateRate = function (model, rate, ctx) {
    model.rate = rate || 1;
    update$1(model, _, ctx);
};

var updateTime = function (model, time, ctx) {
    var currentTime = +time;
    model.time = isFinite(currentTime) ? currentTime : model.rate < 0 ? model.duration : 0;
    update$1(model, _, ctx);
};

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
    model.duration = maxTo;
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

var set = function (model, options, ctx) {
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
};

function rebuild(model, ctx) {
    var state = model.state;
    all(model.players, function (p) { return p.cancel(); });
    model.players = _;
    switch (state) {
        case S_PAUSED:
            pause(model, _, ctx);
            break;
        case S_PLAYING:
            play(model, _, ctx);
            break;
    }
}

var stateSubs = [];
var stores = {};
var reducers = (_a = {},
    _a[APPEND] = append,
    _a[CANCEL] = cancel,
    _a[DESTROY] = destroy,
    _a[FINISH] = finish,
    _a[INSERT] = insert,
    _a[PAUSE] = pause,
    _a[PLAY] = play,
    _a[REVERSE] = reverse,
    _a[SET] = set,
    _a[TICK] = tick,
    _a[UPDATE] = update$1,
    _a[UPDATE_RATE] = updateRate,
    _a[UPDATE_TIME] = updateTime,
    _a);
function createInitial(opts) {
    var refs = {};
    if (opts.references) {
        for (var name in opts.references) {
            refs['@' + name] = opts.references[name];
        }
    }
    var newModel = {
        configs: [],
        cursor: 0,
        duration: 0,
        id: opts.id,
        players: _,
        rate: 1,
        refs: refs,
        repeat: _,
        round: _,
        state: S_INACTIVE,
        time: _,
        yoyo: false
    };
    return newModel;
}
function getState(id) {
    var model = stores[id];
    if (!model) {
        throw new Error('not found');
    }
    return model.state;
}
function addState(opts) {
    stores[opts.id] = {
        state: createInitial(opts),
        subs: {}
    };
}
function on(id, eventName, listener) {
    var store = stores[id];
    if (store) {
        var subs = (store.subs[eventName] = store.subs[eventName] || []);
        pushDistinct(subs, listener);
    }
}
function off(id, eventName, listener) {
    var store = stores[id];
    if (store) {
        remove(store.subs[eventName], listener);
    }
}
function dispatch(action, id, data) {
    var fn = reducers[action];
    var store = stores[id];
    if (!fn || !store) {
        throw new Error('not found');
    }
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
            all(subs, function (sub) {
                sub(model.time);
            });
        }
    });
    if (ctx.destroyed) {
        delete stores[id];
    }
    else if (ctx.needUpdate.length) {
        if (model.state !== S_INACTIVE) {
            rebuild(model, ctx);
        }
        else {
            calculateConfigs(model);
        }
        all(stateSubs, function (sub) {
            sub(store);
        });
    }
}
function trigger(eventName) {
    pushDistinct(this.events, eventName);
}
function dirty(config) {
    pushDistinct(this.needUpdate, config);
}
if (typeof window !== 'undefined') {
    
    window.just_devtools = {
        dispatch: dispatch,
        subscribe: function (fn) {
            pushDistinct(stateSubs, fn);
        },
        unsubscribe: function (fn) {
            remove(stateSubs, fn);
        }
    };
}
var _a;

var timelineProto = {
    get state() {
        return getState(this.id).state;
    },
    get duration() {
        return getState(this.id).duration;
    },
    get currentTime() {
        return getState(this.id).time;
    },
    set currentTime(time) {
        dispatch(UPDATE_TIME, this.id, time);
    },
    get playbackRate() {
        return getState(this.id).rate;
    },
    set playbackRate(rate) {
        dispatch(UPDATE_RATE, this.id, rate);
    },
    add: function (opts) {
        dispatch(APPEND, this.id, opts);
        return this;
    },
    animate: function (opts) {
        dispatch(APPEND, this.id, opts);
        return this;
    },
    fromTo: function (from, to, options) {
        all(options, function (options2) {
            options2.to = to;
            options2.from = from;
        });
        dispatch(INSERT, this.id, options);
        return this;
    },
    cancel: function () {
        dispatch(CANCEL, this.id);
        return this;
    },
    destroy: function () {
        dispatch(DESTROY, this.id);
    },
    finish: function () {
        dispatch(FINISH, this.id);
        return this;
    },
    on: function (name, fn) {
        on(this.id, name, fn);
        return this;
    },
    once: function (eventName, listener) {
        var self = this;
        self.on(eventName, function s(time) {
            self.off(eventName, s);
            listener(time);
        });
        return self;
    },
    off: function (name, fn) {
        off(this.id, name, fn);
        return this;
    },
    pause: function () {
        dispatch(PAUSE, this.id);
        return this;
    },
    play: function (options) {
        dispatch(PLAY, this.id, options);
        return this;
    },
    reverse: function () {
        dispatch(REVERSE, this.id);
        return this;
    },
    seek: function (time) {
        dispatch(UPDATE_TIME, this.id, time);
        return this;
    },
    sequence: function (seqOptions) {
        var _this = this;
        all(seqOptions, function (opt) { return dispatch(APPEND, _this.id, opt); });
        return this;
    },
    set: function (opts) {
        dispatch(SET, this.id, opts);
        return this;
    }
};
function timeline(opts) {
    var t1 = Object.create(timelineProto);
    opts = opts || {};
    opts.id = opts.id || uuid();
    t1.id = opts.id;
    addState(opts);
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

var camelCaseRegex$1 = /([a-z])[- ]([a-z])/ig;
var cssFunctionRegex = /^([a-z-]+)\(([^\)]+)\)$/i;
var cssEasings = { ease: ease, easeIn: easeIn, easeOut: easeOut, easeInOut: easeInOut, stepStart: stepStart, stepEnd: stepEnd, linear: linear };
var camelCaseMatcher = function (match, p1, p2) { return p1 + p2.toUpperCase(); };
var toCamelCase$1 = function (value) { return typeof value === 'string'
    ? value.replace(camelCaseRegex$1, camelCaseMatcher) : ''; };
var find$1 = function (nameOrCssFunction) {
    // search for a compatible known easing
    var easingName = toCamelCase$1(nameOrCssFunction);
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
        var progression = lk.easing ? getEasing(lk.easing)(time) : time;
        if (lk.simpleFn) {
            return lk.interpolate(lk.value, keyframes[r].value, progression);
        }
        return lk.interpolate(lk.value, keyframes[r].value)(progression);
    };
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

function animate$1(options) {
    return timeline().add(options);
}
function sequence(seqOptions) {
    return timeline().sequence(seqOptions);
}
addPlugin(propsPlugin);

var rdm$1 = Math.random;
var flr$1 = Math.floor;
function random(first, last, suffix, round) {
    var val = first + rdm$1() * (last - first);
    if (round === true) {
        val = flr$1(val);
    }
    return !suffix ? val : val + suffix;
}

function shuffle(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

function element(innerHTML) {
    var el = document.createElement('div');
    el.setAttribute('style', 'display:inline-block;position:relative;text-align:start');
    el.innerHTML = innerHTML || '';
    return el;
}
function splitText(target) {
    var characters = [];
    var words = [];
    var elements = typeof target === 'string'
        ? document.querySelectorAll(target)
        : target instanceof Element ? [target] : typeof target.length === 'number' ? target : [];
    for (var i = 0, ilen = elements.length; i < ilen; i++) {
        var e = elements[i];
        if (!e) {
            continue;
        }
        var contents = e.textContent.replace(/[\r\n\s\t]+/gi, ' ').trim();
        e.innerHTML = '';
        var ws = contents.split(/[\s]+/gi);
        for (var x = 0, xlen = ws.length; x < xlen; x++) {
            var w = ws[x];
            if (!w) {
                continue;
            }
            if (x > 0) {
                var empty = element('&nbsp;');
                e.appendChild(empty);
            }
            var word = element();
            words.push(word);
            e.appendChild(word);
            for (var y = 0, ylen = w.length; y < ylen; y++) {
                var c = w[y];
                var character = element(c);
                word.appendChild(character);
                characters.push(character);
            }
        }
    }
    return { characters: characters, words: words };
}

addPlugin(waapiPlugin);

exports.animate = animate$1;
exports.sequence = sequence;
exports.timeline = timeline;
exports.addPlugin = addPlugin;
exports.removePlugin = removePlugin;
exports.interpolate = interpolate;
exports.random = random;
exports.shuffle = shuffle;
exports.splitText = splitText;

}((this.just = this.just || {})));
