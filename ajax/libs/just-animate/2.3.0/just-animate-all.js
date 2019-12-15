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

function now() {
    return performance.now();
}
function raf(fn) {
    return requestAnimationFrame(fn);
}
function caf(handle) {
    cancelAnimationFrame(handle);
}
function lazy(initializer) {
    var value;
    return function () { return value || (value = initializer()); };
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

var S_IDLE = 1;
var S_PENDING = 2;
var S_RUNNING = 3;
var S_PAUSED = 4;
var S_FINISHED = 5;
var _ = undefined;
var measureExpression = /^([+|-]*[0-9]*[.]*?[0-9]+)([a-z%]+)*$/i;

var CANCEL = 'cancel';

var FINISH = 'finish';




var PAUSE = 'pause';

var PENDING = 'pending';
var PLAY = 'play';
var REVERSE = 'reverse';
var UPDATE = 'update';

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

var frameSize = 17;
function animate(effect) {
    var keyframes = effect.keyframes, prop = effect.prop, from = effect.from, to = effect.to, target = effect.target;
    var duration = to - from;
    var getAnimator = lazy(function () {
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
                !(animator.playState === RUNNING || animator.playState === FINISH) &&
                !(rate < 0 && time < frameSize) &&
                !(rate >= 0 && time > duration - frameSize);
            if (needsToPlay) {
                animator.play();
            }
            var needsToPause = !isPlaying && (animator.playState === RUNNING || animator.playState === PENDING);
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

function resolveProperty(input, target, index, len) {
    return isFunction(input)
        ? resolveProperty(input(target, index, len), target, index, len)
        : input;
}

var active = [];
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
        var activeFn = active[i];
        var existingElapsed = activeFn.__last;
        var updatedElapsed = existingElapsed + delta;
        activeFn.__last = updatedElapsed;
        activeFn(delta, updatedElapsed);
    }
}
function loopOn(fn) {
    if (!fn) {
        return;
    }
    if (!includes(active, fn)) {
        var tk = fn;
        tk.__last = 0;
        push(active, fn);
    }
    if (!lastHandle) {
        lastHandle = raf(update);
    }
}
function loopOff(fn) {
    if (!fn) {
        return;
    }
    var indexOfSub = getIndex(active, fn);
    if (indexOfSub !== -1) {
        var tk = fn;
        tk.__last = 0;
        active.splice(indexOfSub, 1);
    }
    if (!active.length) {
        cancel();
    }
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

var offsetSorter = sortBy('offset');
function toEffects(targetConfig) {
    var keyframes = targetConfig.keyframes;
    var from = targetConfig.from;
    var to = targetConfig.to;
    var stagger = targetConfig.stagger || 0;
    var duration = targetConfig.duration;
    var result = [];
    all(getTargets(targetConfig.target), function (target, index, targetLength) {
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
            if (plugin2.onWillAnimate && targetConfig.keyframes.some(function (c) { return c.plugin === pluginName; })) {
                var targetConfig2 = assign(targetConfig, { target: target });
                plugin2.onWillAnimate(targetConfig2, effects, propToPlugin);
            }
        }
        for (var prop in effects) {
            var effects2 = effects[prop];
            var pluginName2 = propToPlugin[prop];
            var plugin = plugins[pluginName2];
            if (effects2) {
                effects2.sort(offsetSorter);
                ensureFirstFrame(targetConfig, effects2, target, plugin, prop);
                fillValues(effects2);
                fillInterpolators(effects2);
                ensureLastFrame(targetConfig, effects2);
                push(result, {
                    plugin: propToPlugin[prop],
                    target: target,
                    prop: prop,
                    from: from + (stagger ? (stagger + 1) * index : 0),
                    to: to + (stagger ? (stagger + 1) * index : 0),
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
function addPropertyKeyframes(target, index, options) {
    var staggerMs = (options.stagger && options.stagger * (index + 1)) || 0;
    var delayMs = resolveProperty(options.delay, target, index, target.targetLength) || 0;
    var from = max(staggerMs + delayMs + options.from, 0);
    var duration = options.to - options.from;
    var easing = options.easing || 'ease';
    for (var pluginName in plugins) {
        if (owns(options, pluginName)) {
            var props = options[pluginName];
            for (var name in props) {
                if (owns(props, name)) {
                    pushDistinct(target.propNames, name);
                    addProperty(target, pluginName, index, name, props[name], duration, from, easing);
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

var propKeyframeSort = sortBy('time');
function animate$2(opts) {
    var self = this;
    var _nextTime = self._pos;
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
        insert(self, from2, to2, opt);
    });
    calculateTimes(self);
    return self;
}
var timelineProto = {
    get currentTime() {
        return this._time;
    },
    set currentTime(time) {
        var self = this;
        time = +time;
        self._time = isFinite(time) ? time : self._rate < 0 ? self.duration : 0;
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
    add: animate$2,
    animate: animate$2,
    fromTo: function (from, to, options) {
        var self = this;
        all(options, function (options2) {
            insert(self, from, to, options2);
        });
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
        var _subs = self._subs;
        pushDistinct(_subs[eventName] || (_subs[eventName] = []), listener);
        return self;
    },
    off: function (eventName, listener) {
        var self = this;
        var listeners = self._subs[eventName];
        if (listeners) {
            var indexOfListener = getIndex(listeners, listener);
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
            self._yoyo = options.alternate === true;
        }
        self._repeat = self._repeat || 1;
        self._yoyo = self._yoyo || false;
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
    sequence: function (seqOptions) {
        var self = this;
        all(seqOptions, function (opt) { return self.add(opt); });
        return self;
    },
    set: function (options) {
        var self = this;
        var pluginNames = Object.keys(plugins);
        all(options, function (opts) {
            var at = opts.at || self._pos;
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
            insert(self, at - 0.000000001, at, opts2);
        });
        calculateTimes(self);
        return self;
    },
    getEffects: function () {
        var self = this;
        return mapFlatten(self._model, function (c) {
            return toEffects(resolveRefs(self._refs, c, true));
        });
    }
};
function insert(self, from, to, opts) {
    if (to === _) {
        throw new Error('missing duration');
    }
    var config = self._model;
    opts = replaceWithRefs(self._refs, opts, true);
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
function calculateTimes(self) {
    var timelineTo = 0;
    var maxNextTime = 0;
    all(self._model, function (config) {
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
    self._pos = maxNextTime;
    self.duration = timelineTo;
}
function setupEffects(self) {
    if (self._ctrls) {
        return;
    }
    var effects = self.getEffects();
    var animations = [];
    all(effects, function (effect) {
        var controller = plugins[effect.plugin].animate(effect);
        if (controller) {
            controller.from = effect.from;
            controller.to = effect.to;
            push(animations, controller);
        }
    });
    self._time = self._rate < 0 ? self.duration : 0;
    self._ctrls = animations;
}
function updateTimeline(self, type) {
    if (type === CANCEL) {
        self._round = 0;
        self._state = S_IDLE;
    }
    else if (type === FINISH) {
        self._round = 0;
        self._state = S_FINISHED;
        if (!self._yoyo) {
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
    var rate = self._rate;
    if (isTimelineInEffect && self._ctrls === _) {
        setupEffects(self);
    }
    if (isTimelineInEffect) {
        all(self._ctrls, function (effect) {
            var from = effect.from, to = effect.to;
            var isAnimationActive = isTimelineActive && inRange(flr(time), from, to);
            var offset = minMax((time - from) / (to - from), 0, 1);
            effect.update(offset, rate, isAnimationActive);
        });
    }
    if (!isTimelineActive) {
        loopOff(self._tick);
    }
    if (type === PLAY) {
        loopOn(self._tick);
    }
    if (!isTimelineInEffect) {
        all(self._ctrls, function (effect) { return effect.cancel(); });
        self._time = 0;
        self._round = _;
        self._ctrls = _;
    }
    if (type === FINISH) {
        all(self._subs[UPDATE], function (c) { return c(time); });
    }
    all(self._subs[type], function (c) { return c(time); });
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
    var time = self._time === _ ? (rate < 0 ? duration : 0) : self._time;
    var iteration = self._round || 0;
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
        self._round = ++iteration;
        time = isReversed ? 0 : duration;
        iterationEnded = true;
        if (self._yoyo) {
            self._rate = (self._rate || 0) * -1;
        }
        time = self._rate < 0 ? duration : 0;
    }
    self._round = iteration;
    self._time = time;
    if (!iterationEnded) {
        all(self._subs[UPDATE], function (c) { return c(time); });
        updateTimeline(self, UPDATE);
        return;
    }
    if (repeat === iteration) {
        updateTimeline(self, FINISH);
        return;
    }
    all(self._subs[UPDATE], function (c) { return c(time); });
    updateTimeline(self, UPDATE);
}
function timeline(opts) {
    if (opts === void 0) { opts = {}; }
    var self = Object.create(timelineProto);
    self.duration = 0;
    self._pos = 0;
    self._rate = 1;
    self._time = 0;
    self._yoyo = false;
    self._state = S_IDLE;
    self._model = [];
    self._subs = {};
    var refs = {};
    if (opts.references) {
        for (var name in opts.references) {
            refs['@' + name] = opts.references[name];
        }
    }
    self._refs = refs;
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
function animate$1(options) {
    return timeline().add(options);
}
function sequence(seqOptions) {
    return timeline().sequence(seqOptions);
}

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
exports.propsPlugin = propsPlugin;
exports.random = random;
exports.shuffle = shuffle;
exports.splitText = splitText;

}((this.just = this.just || {})));
