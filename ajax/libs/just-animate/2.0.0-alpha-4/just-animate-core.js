(function (exports) {
'use strict';

var missing = function (msg) { return new Error("Missing: " + msg); };
var unsupported = function (msg) { return new Error("Unsupported: " + msg); };

var isDefined = function (a) { return !!a || a === 0 || a === false; };
var getTypeString = function (val) { return Object.prototype.toString.call(val); };
var isFunction = function (a) { return getTypeString(a) === '[object Function]'; };
var isNumber = function (a) { return typeof a === 'number'; };
var isObject = function (a) { return typeof a === 'object' && !!a; };
var isString = function (a) { return typeof a === 'string'; };
var isArray = function (a) { return isDefined(a) && !isString(a) && !isFunction(a) && isNumber(a.length); };
var isElement = function (target) { return !!target && typeof target.tagName === 'string'; };

var slice = Array.prototype.slice;
var head$$1 = function (indexed, predicate) {
    if (!indexed || indexed.length < 1) {
        return _;
    }
    if (predicate === _) {
        return indexed[0];
    }
    for (var _i = 0, _a = indexed; _i < _a.length; _i++) {
        var item = _a[_i];
        if (predicate(item)) {
            return item;
        }
    }
    return _;
};
var tail$$1 = function (indexed, predicate) {
    if (!indexed || indexed.length < 1) {
        return _;
    }
    if (predicate === _) {
        return indexed[indexed.length - 1];
    }
    for (var _i = 0, _a = indexed; _i < _a.length; _i++) {
        var item = _a[_i];
        if (predicate(item)) {
            return item;
        }
    }
    return _;
};
var toArray$$1 = function (indexed, index) { return slice.call(indexed, index || 0); };
var listify$$1 = function (indexed) {
    return isArray(indexed) ? indexed : [indexed];
};
var maxBy$$1 = function (items, predicate) {
    var max = '';
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        var prop = predicate(item);
        if (max < prop) {
            max = prop;
        }
    }
    return max;
};

var getTargets = function (target) {
    if (isString(target)) {
        return toArray$$1(document.querySelectorAll(target));
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
        for (var i = 0, ilen = target.length; i < ilen; i++) {
            elements.push.apply(elements, getTargets(target[i]));
        }
        return elements;
    }
    if (isObject(target)) {
        return [target];
    }
    return [];
};

var inRange = function (val, min, max) {
    return min < max ? min <= val && val <= max : max <= val && val <= min;
};

var deepCopyProperty$$1 = function (prop, origin, dest) {
    var originProp = origin[prop];
    var destProp = dest[prop];
    var originType = getTypeString(originProp);
    var destType = getTypeString(destProp);
    if (originType !== destType) {
        destProp = _;
    }
    if (isArray(originProp)) {
        dest[prop] = originProp.slice(0);
    }
    else if (isObject(originProp)) {
        dest[prop] = deepCopyObject$$1(originProp, destProp);
    }
    else {
        dest[prop] = originProp;
    }
};
var assign$$1 = function (target, source) {
    var result = target;
    for (var prop in source) {
        result[prop] = source[prop];
    }
    return result;
};
var deepCopyObject$$1 = function (origin, dest) {
    dest = dest || {};
    for (var prop in origin) {
        deepCopyProperty$$1(prop, origin, dest);
    }
    return dest;
};

var shuffle = function (choices) {
    return choices[Math.floor(Math.random() * choices.length)];
};
var random = function (first, last, unit, wholeNumbersOnly) {
    var val = first + (Math.random() * (last - first));
    if (wholeNumbersOnly === true) {
        val = Math.floor(val);
    }
    return !unit ? val : val + unit;
};

var _ = undefined;
var camelCaseRegex = /([a-z])[- ]([a-z])/ig;
var measureExpression = /^[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]*){1}[ ]*([a-z%]+){0,1}$/i;
var unitExpression = /^[ ]*([+-][=]){0,1}[ ]*([\-]{0,1}[0-9]*[\.]{0,1}[0-9]+){1}[ ]*([a-z%]+){0,1}$/i;
var ALTERNATE = 'alternate';
var CANCEL = 'cancel';
var FATAL = 'fatal';
var FINISH = 'finish';
var FINISHED = 'finished';
var IDLE = 'idle';
var ITERATION = 'iteration';
var NORMAL = 'normal';
var PAUSE = 'pause';
var PAUSED = 'paused';
var PENDING = 'pending';
var PLAY = 'play';
var RUNNING = 'running';
var UPDATE = 'update';

var applySplitStyles = function (element) {
    return element.setAttribute('style', 'display:inline-block;position:relative:textAlign:start');
};
var splitText$$1 = function (target) {
    var characters = [];
    var words = [];
    var elements = getTargets(target);
    for (var i = 0, ilen = elements.length; i < ilen; i++) {
        var element = elements[i];
        if (element.getAttribute('ja-split-text')) {
            var ws_1 = toArray$$1(element.querySelectorAll('[ja-word]'));
            var cs = toArray$$1(element.querySelectorAll('[ja-character]'));
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
        for (var j = 0, jlen = ws.length; j < jlen; j++) {
            var w = ws[j];
            var word = document.createElement('div');
            applySplitStyles(word);
            word.setAttribute('ja-word', w);
            words.push(word);
            if (j > 0) {
                var space = document.createElement('div');
                applySplitStyles(space);
                space.innerHTML = '&nbsp;';
                space.setAttribute('ja-space', '');
                element.appendChild(space);
            }
            element.appendChild(word);
            for (var k = 0, klen = w.length; k < klen; k++) {
                var c = w[k];
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
};

function camelCaseReplacer(_$$1, p1, p2) {
    return p1 + p2.toUpperCase();
}
function toCamelCase(value) {
    return isString(value) ? value.replace(camelCaseRegex, camelCaseReplacer) : '';
}

function cssFunction() {
    var args = arguments;
    return args[0] + "(" + toArray$$1(args, 1).join(',') + ")";
}

var parseUnit = function (val, output) {
    output = output || {};
    if (!isDefined(val)) {
        output.unit = _;
        output.value = _;
    }
    else if (isNumber(val)) {
        output.unit = _;
        output.value = val;
    }
    else {
        var match = measureExpression.exec(val);
        var startString = match[1];
        var unitTypeString = match[2];
        output.unit = unitTypeString || _;
        output.value = startString ? parseFloat(startString) : _;
    }
    return output;
};
var convertToMs = function (val) {
    if (!isDefined(val) || isNumber(val)) {
        return val;
    }
    var match = measureExpression.exec(val);
    var unit = match[2];
    return +match[1] * (unit === 's' ? 1000 : unit === 'm' ? 60000 : 1);
};

var now = function () {
    return performance && performance.now ? performance.now() : Date.now();
};
var raf = function (ctx, fn) {
    var callback = function () { fn(ctx); };
    return requestAnimationFrame
        ? requestAnimationFrame(callback)
        : setTimeout(callback, 16);
};

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

var addTransition = function (keyframes, target) {
    var style = window.getComputedStyle(target);
    var firstFrame = { offset: 0 };
    var props = [];
    for (var i = 0, ilen = keyframes.length; i < ilen; i++) {
        var item = keyframes[i];
        for (var property in item) {
            if (props.indexOf(property) === -1 && property !== 'offset') {
                var alias = transforms.indexOf(property) !== -1 ? 'transform' : property;
                var val = style[alias];
                if (isDefined(val)) {
                    firstFrame[alias] = val;
                }
            }
        }
    }
    keyframes.splice(0, 0, firstFrame);
};

var keyframeOffsetComparer = function (a, b) { return a.offset - b.offset; };

var expandOffsets = function (keyframes) {
    for (var i = keyframes.length - 1; i > -1; --i) {
        var keyframe = keyframes[i];
        if (!isArray(keyframe.offset)) {
            continue;
        }
        keyframes.splice(i, 1);
        var offsets = keyframe.offset;
        offsets.sort();
        for (var j = offsets.length - 1; j > -1; --j) {
            var newKeyframe = deepCopyObject$$1(keyframe);
            newKeyframe.offset = offsets[j];
            keyframes.splice(i, 0, newKeyframe);
        }
    }
    keyframes.sort(keyframeOffsetComparer);
};

var fixOffset0 = function (keyframes) {
    var first = head$$1(keyframes, function (k) { return k.offset === 0; })
        || head$$1(keyframes, function (k) { return k.offset === _; });
    if (first === _) {
        first = {};
        keyframes.splice(0, 0, first);
    }
    if (first.offset !== 0) {
        first.offset = 0;
    }
};
var fixOffset1 = function (keyframes) {
    var last = tail$$1(keyframes, function (k) { return k.offset === 1; })
        || tail$$1(keyframes, function (k) { return k.offset === _; });
    if (last === _) {
        last = {};
        keyframes.push(last);
    }
    if (last.offset !== 1) {
        last.offset = 1;
    }
};
var fixOffsets = function (keyframes) {
    fixOffset0(keyframes);
    fixOffset1(keyframes);
};

var fixPartialKeyframes = function (keyframes) {
    var first = head$$1(keyframes);
    var last = tail$$1(keyframes);
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
};

var propsToKeyframes$$1 = function (css, keyframes, ctx) {
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
        .map(function (s) { return +s; })
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
            var startUnit = _;
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
        keyframe.offset = +offset;
        keyframes.push(keyframe);
    }
    keyframes.sort(keyframeOffsetComparer);
};

var epsilon = 0.0001;

var c = "cubic-bezier";
var s = "steps";
var ease = c + "(.25,.1,.25,1)";
var easeIn = c + "(.42,0,1,1)";
var easeInBack = c + "(.6,-.28,.735,.045)";
var easeInCirc = c + "(.6,.04,.98,.335)";
var easeInCubic = c + "(.55,.055,.675,.19)";
var easeInExpo = c + "(.95,.05,.795,.035)";
var easeInOut = c + "(.42,0,.58,1)";
var easeInOutBack = c + "(.68,-.55,.265,1.55)";
var easeInOutCirc = c + "(.785,.135,.15,.86)";
var easeInOutCubic = c + "(.645,.045,.355,1)";
var easeInOutExpo = c + "(1,0,0,1)";
var easeInOutQuad = c + "(.455,.03,.515,.955)";
var easeInOutQuart = c + "(.77,0,.175,1)";
var easeInOutQuint = c + "(.86,0,.07,1)";
var easeInOutSine = c + "(.445,.05,.55,.95)";
var easeInQuad = c + "(.55,.085,.68,.53)";
var easeInQuart = c + "(.895,.03,.685,.22)";
var easeInQuint = c + "(.755,.05,.855,.06)";
var easeInSine = c + "(.47,0,.745,.715)";
var easeOut = c + "(0,0,.58,1)";
var easeOutBack = c + "(.175,.885,.32,1.275)";
var easeOutCirc = c + "(.075,.82,.165,1)";
var easeOutCubic = c + "(.215,.61,.355,1)";
var easeOutExpo = c + "(.19,1,.22,1)";
var easeOutQuad = c + "(.25,.46,.45,.94)";
var easeOutQuart = c + "(.165,.84,.44,1)";
var easeOutQuint = c + "(.23,1,.32,1)";
var easeOutSine = c + "(.39,.575,.565,1)";
var elegantSlowStartEnd = c + "(.175,.885,.32,1.275)";
var linear = c + "(0,0,1,1)";
var stepEnd = s + "(1,0)";
var stepStart = s + "(1,1)";


var css = Object.freeze({
	ease: ease,
	easeIn: easeIn,
	easeInBack: easeInBack,
	easeInCirc: easeInCirc,
	easeInCubic: easeInCubic,
	easeInExpo: easeInExpo,
	easeInOut: easeInOut,
	easeInOutBack: easeInOutBack,
	easeInOutCirc: easeInOutCirc,
	easeInOutCubic: easeInOutCubic,
	easeInOutExpo: easeInOutExpo,
	easeInOutQuad: easeInOutQuad,
	easeInOutQuart: easeInOutQuart,
	easeInOutQuint: easeInOutQuint,
	easeInOutSine: easeInOutSine,
	easeInQuad: easeInQuad,
	easeInQuart: easeInQuart,
	easeInQuint: easeInQuint,
	easeInSine: easeInSine,
	easeOut: easeOut,
	easeOutBack: easeOutBack,
	easeOutCirc: easeOutCirc,
	easeOutCubic: easeOutCubic,
	easeOutExpo: easeOutExpo,
	easeOutQuad: easeOutQuad,
	easeOutQuart: easeOutQuart,
	easeOutQuint: easeOutQuint,
	easeOutSine: easeOutSine,
	elegantSlowStartEnd: elegantSlowStartEnd,
	linear: linear,
	stepEnd: stepEnd,
	stepStart: stepStart
});

var camelCaseRegex$1 = /([a-z])[- ]([a-z])/ig;
var cssFunctionRegex = /^([a-z-]+)\(([^\)]+)\)$/i;
var cssEasings = { ease: ease, easeIn: easeIn, easeOut: easeOut, easeInOut: easeInOut, stepStart: stepStart, stepEnd: stepEnd, linear: linear };
var camelCaseMatcher = function (match, p1, p2) { return p1 + p2.toUpperCase(); };
var toCamelCase$1 = function (value) { return typeof value === 'string'
    ? value.replace(camelCaseRegex$1, camelCaseMatcher) : ''; };
var find = function (nameOrCssFunction) {
    // search for a compatible known easing
    var easingName = toCamelCase$1(nameOrCssFunction);
    var easing = cssEasings[easingName] || nameOrCssFunction;
    var matches = cssFunctionRegex.exec(easing);
    if (!matches) {
        throw new Error('could not parse css function');
    }
    return [matches[1]].concat(matches[2].split(','));
};
var cssFunction$1$$1 = function (easingString) {
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
            if (abs(x - xEst) < epsilon) {
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

var abs = Math.abs;

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

var transformPropertyComparer = function (a, b) {
    return transforms.indexOf(a[0]) - transforms.indexOf(b[0]);
};
var normalizeProperties = function (keyframe) {
    var cssTransforms = [];
    for (var prop in keyframe) {
        var value = keyframe[prop];
        keyframe[prop] = _;
        if (!isDefined(value)) {
            continue;
        }
        var propAlias = propertyAliases[prop] || prop;
        var transformIndex = transforms.indexOf(propAlias);
        if (transformIndex !== -1) {
            cssTransforms.push([propAlias, value]);
            delete keyframe[prop];
        }
        else if (propAlias === 'easing') {
            keyframe.easing = css[toCamelCase(value)] || value || linear;
        }
        else {
            keyframe[toCamelCase(propAlias)] = value;
        }
    }
    if (cssTransforms.length) {
        keyframe.transform = cssTransforms
            .sort(transformPropertyComparer)
            .map(function (n) { return cssFunction(n[0], n[1]); })
            .join('');
    }
};
var resolvePropertiesInKeyframes$$1 = function (source, target, ctx) {
    for (var i = 0, ilen = source.length; i < ilen; i++) {
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
};

var resolve = function (input, ctx, isStep) {
    if (isStep === void 0) { isStep = false; }
    var output = isFunction(input)
        ? resolve(input(ctx), ctx)
        : input;
    if (isDefined(output) && !isNumber(output)) {
        var match = unitExpression.exec(output);
        if (match) {
            var stepTypeString = match[1];
            var startString = match[2];
            var unitTypeString = match[3];
            var num = startString ? parseFloat(startString) : 0;
            var sign = stepTypeString === '-=' ? -1 : 1;
            var step = isStep || stepTypeString && isDefined(ctx.index) ? (ctx.index || 0) + 1 : 1;
            var val = sign * num * step;
            return unitTypeString ? val + unitTypeString : val;
        }
    }
    if (isNumber(output) && isStep) {
        return output * ctx.index;
    }
    return output;
};

function spaceKeyframes(keyframes) {
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

var animationPadding = (1.0 / 60) + 7;
var createAnimation = function (css, ctx, timings, isTransition) {
    var target = ctx.target;
    var sourceKeyframes;
    if (isArray(css)) {
        sourceKeyframes = css;
        expandOffsets(sourceKeyframes);
    }
    else {
        sourceKeyframes = [];
        propsToKeyframes$$1(css, sourceKeyframes, ctx);
    }
    var targetKeyframes = [];
    resolvePropertiesInKeyframes$$1(sourceKeyframes, targetKeyframes, ctx);
    if (isTransition) {
        addTransition(targetKeyframes, target);
    }
    if (targetKeyframes.length > 1) {
        spaceKeyframes(targetKeyframes);
    }
    if (targetKeyframes.length) {
        fixOffsets(targetKeyframes);
    }
    targetKeyframes.sort(keyframeOffsetComparer);
    if (targetKeyframes.length > 0) {
        fixPartialKeyframes(targetKeyframes);
    }
    var animator = target.animate(targetKeyframes, timings);
    animator.cancel();
    return animator;
};
var Animator = (function () {
    function Animator(options) {
        var self = this;
        var transition = options.transition, css = options.css, delay = options.delay, easing = options.easing, endDelay = options.endDelay, from = options.from, index = options.index, stagger = options.stagger, target = options.target, targets = options.targets;
        var ctx = {
            index: index,
            target: target,
            targets: targets
        };
        if (options.onCreate) {
            options.onCreate(ctx);
        }
        var iterations = resolve(options.iterations, ctx) || 1;
        var iterationStart = resolve(options.iterationStart, ctx) || 0;
        var direction = resolve(options.direction, ctx) || _;
        var duration = +options.to - +options.from;
        var fill = resolve(options.fill, ctx) || 'none';
        var staggerMs = convertToMs(resolve(stagger, ctx, true) || 0);
        var delayMs = convertToMs(resolve(delay, ctx) || 0);
        var endDelayMs = convertToMs(resolve(endDelay, ctx) || 0);
        var totalTime = delayMs + ((iterations || 1) * duration) + endDelayMs;
        self.onCancel = options.onCancel;
        self.onFinish = options.onFinish;
        self.onPause = options.onPause;
        self.onPlay = options.onPlay;
        self.onUpdate = options.onUpdate;
        self.endTimeMs = staggerMs + from + totalTime;
        self.startTimeMs = staggerMs + from;
        self.css = css;
        self.ctx = ctx;
        self.transition = !!transition;
        self.easingFn = options.easingFn;
        self.timing = {
            delay: delayMs,
            endDelay: endDelayMs,
            direction: direction,
            duration: duration,
            easing: easing,
            fill: fill,
            iterations: iterations,
            iterationStart: iterationStart,
            totalTime: totalTime
        };
    }
    Object.defineProperty(Animator.prototype, "animator", {
        get: function () {
            var self = this;
            if (self._animator) {
                return self._animator;
            }
            var transition = self.transition, css = self.css, ctx = self.ctx, timing = self.timing;
            self._animator = createAnimation(css, ctx, timing, transition);
            return self._animator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Animator.prototype, "playState", {
        get: function () {
            var animator = this.animator;
            return !animator ? FATAL : animator.playState;
        },
        set: function (value) {
            var animator = this.animator;
            var playState = !animator ? FATAL : animator.playState;
            if (playState === value) {
                return;
            }
            if (playState === FATAL) {
                animator.cancel();
            }
            else if (value === FINISHED) {
                animator.finish();
            }
            else if (value === IDLE) {
                animator.cancel();
            }
            else if (value === PAUSED) {
                animator.pause();
            }
            else if (value === RUNNING) {
                animator.play();
            }
        },
        enumerable: true,
        configurable: true
    });
    Animator.prototype.isActive = function (currentTime, playbackRate) {
        var self = this;
        var isForward = playbackRate >= 0;
        var startTimeMs = isForward ? self.startTimeMs : self.startTimeMs + animationPadding;
        var endTimeMs = isForward ? self.endTimeMs : self.endTimeMs - animationPadding;
        return startTimeMs <= currentTime && currentTime <= endTimeMs;
    };
    Animator.prototype.seek = function (value) {
        var animator = this.animator;
        if (animator.currentTime !== value) {
            animator.currentTime = value;
        }
    };
    Animator.prototype.playbackRate = function (value) {
        var animator = this.animator;
        if (animator.playbackRate !== value) {
            animator.playbackRate = value;
        }
    };
    Animator.prototype.cancel = function () {
        var self = this;
        self.playState = IDLE;
        if (self.onCancel) {
            self.onCancel(self.ctx);
        }
    };
    Animator.prototype.finish = function () {
        var self = this;
        var ctx = self.ctx;
        self.playState = FINISHED;
        if (self.onFinish) {
            self.onFinish(ctx);
        }
    };
    Animator.prototype.pause = function () {
        var self = this;
        var ctx = self.ctx;
        self.playState = PAUSED;
        if (self.onPause) {
            self.onPause(ctx);
        }
    };
    Animator.prototype.restart = function () {
        var animator = this.animator;
        animator.cancel();
        animator.play();
    };
    Animator.prototype.tick = function (currentTime, playbackRate, delta, isLastFrame) {
        var self = this;
        var ctx = self.ctx;
        if (isLastFrame) {
            self.restart();
        }
        var playedThisFrame = false;
        if (self.playState !== RUNNING || isLastFrame) {
            self.playbackRate(playbackRate);
            self.playState = RUNNING;
            playedThisFrame = true;
        }
        self.playbackRate(playbackRate);
        var shouldTriggerPlay = !!self.onPlay && playedThisFrame;
        var shouldTriggerUpdate = !!self.onUpdate;
        if (shouldTriggerPlay || shouldTriggerUpdate) {
            assign$$1(ctx, {
                computedOffset: _,
                currentTime: _,
                delta: _,
                duration: _,
                iterations: _,
                offset: _,
                playbackRate: _
            });
        }
        if (shouldTriggerPlay && self.onPlay) {
            self.onPlay(ctx);
        }
        if (shouldTriggerUpdate) {
            var relativeDuration = self.endTimeMs - self.startTimeMs;
            var relativeCurrentTime = currentTime - self.startTimeMs;
            var timeOffset = relativeCurrentTime / relativeDuration;
            assign$$1(ctx, {
                computedOffset: self.easingFn(timeOffset),
                currentTime: relativeCurrentTime,
                delta: delta,
                offset: timeOffset,
                playbackRate: playbackRate
            });
            self.onUpdate(ctx);
        }
    };
    return Animator;
}());

var Timeline$$1 = (function () {
    function Timeline$$1() {
        var _this = this;
        this.duration = 0;
        this.currentTime = _;
        this.playbackRate = 1;
        this.playState = IDLE;
        this._animations = [];
        this._currentIteration = _;
        this._direction = NORMAL;
        this._totalIterations = _;
        this._trigger = function (eventName, resolvable) {
            var self = _this;
            var listeners = self._listeners[eventName];
            if (listeners) {
                var ctx = isFunction(resolvable)
                    ? resolvable()
                    : resolvable;
                for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
                    var listener = listeners_1[_i];
                    listener(ctx);
                }
            }
            return self;
        };
        this._tick = function (delta) {
            var self = _this;
            var playState = self.playState;
            var context = self._ctx;
            if (playState === IDLE) {
                self.cancel();
                return;
            }
            if (playState === FINISHED) {
                self.finish();
                return;
            }
            if (playState === PAUSED) {
                self.pause();
                return;
            }
            var duration = self.duration;
            var totalIterations = self._totalIterations;
            var playbackRate = self.playbackRate;
            var isReversed = playbackRate < 0;
            var startTime = isReversed ? duration : 0;
            var endTime = isReversed ? 0 : duration;
            if (self.playState === PENDING) {
                var currentTime2 = self.currentTime || 0;
                var currentIteration_1 = self._currentIteration;
                self.currentTime = currentTime2 === endTime ? startTime : currentTime2;
                self._currentIteration = currentIteration_1 === totalIterations ? 0 : currentIteration_1;
                self.playState = RUNNING;
            }
            var currentTime = self.currentTime + delta * playbackRate;
            var currentIteration = self._currentIteration || 0;
            var isLastFrame = false;
            if (!inRange(currentTime, startTime, endTime)) {
                isLastFrame = true;
                if (self._direction === ALTERNATE) {
                    playbackRate = (self.playbackRate || 0) * -1;
                    self.playbackRate = playbackRate;
                    isReversed = playbackRate < 0;
                    startTime = isReversed ? duration : 0;
                    endTime = isReversed ? 0 : duration;
                }
                currentIteration++;
                currentTime = startTime;
                assign$$1(context, {
                    computedOffset: _,
                    currentTime: currentTime,
                    delta: delta,
                    duration: endTime - startTime,
                    index: _,
                    iterations: currentIteration,
                    offset: _,
                    playbackRate: playbackRate,
                    target: _,
                    targets: _
                });
                self._trigger(ITERATION, context);
            }
            self._currentIteration = currentIteration;
            self.currentTime = currentTime;
            self._trigger(UPDATE, context);
            if (totalIterations === currentIteration) {
                self.finish();
                return;
            }
            for (var i = 0, ilen = self._animations.length; i < ilen; i++) {
                var animator = self._animations[i];
                if (!animator.isActive(currentTime, playbackRate)) {
                    continue;
                }
                if (animator.playState === FATAL) {
                    i = ilen;
                    self.cancel();
                    continue;
                }
                animator.tick(currentTime, playbackRate, delta, isLastFrame);
            }
        };
        var self = this;
        var ctx = {};
        self._ctx = ctx;
        self._listeners = {};
    }
    Timeline$$1.prototype.append = function (options) {
        var self = this;
        self.from(self.duration, options);
        return self;
    };
    Timeline$$1.prototype.cancel = function () {
        var self = this;
        timeloop.off(self._tick);
        self.currentTime = 0;
        self._currentIteration = _;
        self.playState = IDLE;
        for (var i = 0, ilen = self._animations.length; i < ilen; i++) {
            self._animations[i].cancel();
        }
        self._trigger(CANCEL, self._ctx);
        return self;
    };
    Timeline$$1.prototype.finish = function () {
        var self = this;
        timeloop.off(self._tick);
        self.currentTime = _;
        self._currentIteration = _;
        self.playState = FINISHED;
        for (var i = 0, ilen = self._animations.length; i < ilen; i++) {
            self._animations[i].finish();
        }
        self._trigger(FINISH, self._ctx);
        return self;
    };
    Timeline$$1.prototype.from = function (fromTime, opts) {
        var self = this;
        var startTime = convertToMs(fromTime);
        var endTime;
        if (isDefined(opts.to)) {
            endTime = convertToMs(opts.to);
        }
        else if (isDefined(opts.duration)) {
            endTime = startTime + convertToMs(opts.duration);
        }
        else if (!self.duration) {
            throw missing('duration/to');
        }
        else {
            endTime = self.duration;
        }
        return self._insert(startTime, endTime, opts);
    };
    Timeline$$1.prototype.on = function (eventName, listener) {
        var self = this;
        var _listeners = self._listeners;
        var listeners = _listeners[eventName] || (_listeners[eventName] = []);
        if (listeners.indexOf(listener) === -1) {
            listeners.push(listener);
        }
        return self;
    };
    Timeline$$1.prototype.off = function (eventName, listener) {
        var self = this;
        var listeners = self._listeners[eventName];
        if (listeners) {
            var indexOfListener = listeners.indexOf(listener);
            if (indexOfListener !== -1) {
                listeners.splice(indexOfListener, 1);
            }
        }
        return self;
    };
    Timeline$$1.prototype.pause = function () {
        var self = this;
        timeloop.off(self._tick);
        self.playState = PAUSED;
        for (var i = 0, ilen = self._animations.length; i < ilen; i++) {
            self._animations[i].pause();
        }
        self._trigger(PAUSE, self._ctx);
        return self;
    };
    Timeline$$1.prototype.play = function (iterations) {
        if (iterations === void 0) { iterations = 1; }
        var self = this;
        self._totalIterations = iterations;
        if (!(self.playState === RUNNING || self.playState === PENDING)) {
            self.playState = PENDING;
            timeloop.on(self._tick);
            self._trigger(PLAY, self._ctx);
        }
        return self;
    };
    Timeline$$1.prototype.reverse = function () {
        var self = this;
        self.playbackRate = (self.playbackRate || 0) * -1;
        return self;
    };
    Timeline$$1.prototype.to = function (toTime, opts) {
        var self = this;
        var endTime = convertToMs(toTime);
        var fromTime;
        if (isDefined(opts.from)) {
            fromTime = convertToMs(fromTime);
        }
        else if (isDefined(opts.duration)) {
            fromTime = Math.max(convertToMs(opts.duration), 0);
        }
        else {
            fromTime = self.duration;
        }
        return self._insert(fromTime, endTime, opts);
    };
    Timeline$$1.prototype._insert = function (from, to, opts) {
        var self = this;
        var _animations = self._animations;
        var transition = opts.transition, css$$1 = opts.css, delay = opts.delay, direction = opts.direction, endDelay = opts.endDelay, fill = opts.fill, iterationStart = opts.iterationStart, stagger = opts.stagger, iterations = opts.iterations;
        var easingFn = cssFunction$1$$1(opts.easing || ease);
        var easing = css$$1[toCamelCase(opts.easing)] || opts.easing || ease;
        var targets = getTargets(opts.targets);
        for (var index = 0, ilen = targets.length; index < ilen; index++) {
            _animations.push(new Animator({
                transition: transition,
                css: css$$1,
                to: to,
                from: from,
                delay: delay,
                direction: direction,
                easing: easing,
                easingFn: easingFn,
                endDelay: endDelay,
                fill: fill,
                iterationStart: iterationStart,
                iterations: iterations,
                stagger: stagger,
                target: targets[index],
                targets: targets,
                index: index,
                onCreate: opts.onCreate,
                onCancel: opts.onCancel,
                onFinish: opts.onFinish,
                onPause: opts.onPause,
                onPlay: opts.onPlay,
                onUpdate: opts.onUpdate
            }));
        }
        self.duration = maxBy$$1(self._animations, function (e) { return e.endTimeMs; });
        return self;
    };
    return Timeline$$1;
}());

var active = [];
var elapses = [];
var offs = [];
var ons = [];
var isActive = _;
var lastTime = _;
var updateOffs = function () {
    for (var i = 0, ilen = offs.length; i < ilen; i++) {
        var indexOfSub = active.indexOf(offs[i]);
        if (indexOfSub !== -1) {
            active.splice(indexOfSub, 1);
            elapses.splice(indexOfSub, 1);
        }
    }
};
var updateOns = function () {
    for (var i = 0, ilen = ons.length; i < ilen; i++) {
        var fn = ons[i];
        if (active.indexOf(fn) === -1) {
            active.push(fn);
            elapses.push(0);
        }
    }
};
var update = function () {
    updateOffs();
    updateOns();
    var len = active.length;
    lastTime = lastTime || now();
    var thisTime = now();
    var delta = thisTime - lastTime;
    if (!len) {
        isActive = _;
        lastTime = _;
        return;
    }
    isActive = true;
    lastTime = thisTime;
    raf(self, update);
    for (var i = 0; i < len; i++) {
        var existingElapsed = elapses[i];
        var updatedElapsed = existingElapsed + delta;
        elapses[i] = updatedElapsed;
        active[i](delta, updatedElapsed);
    }
};
var on = function (fn) {
    var offIndex = offs.indexOf(fn);
    if (offIndex !== -1) {
        offs.splice(offIndex, 1);
    }
    if (ons.indexOf(fn) === -1) {
        ons.push(fn);
    }
    if (!isActive) {
        isActive = true;
        raf(self, update);
    }
};
var off = function (fn) {
    var onIndex = ons.indexOf(fn);
    if (onIndex !== -1) {
        ons.splice(onIndex, 1);
    }
    if (offs.indexOf(fn) === -1) {
        offs.push(fn);
    }
    if (!isActive) {
        isActive = true;
        raf(self, update);
    }
};
var timeloop = { on: on, off: off };

var animate = function (options) {
    var timeline = new Timeline$$1();
    if (options) {
        listify$$1(options).forEach(function (opt) { return timeline.from(0, opt); });
    }
    return timeline;
};

var sequence = function (seqOptions) {
    var timeline = new Timeline$$1();
    for (var i = 0, ilen = seqOptions.length; i < ilen; i++) {
        timeline.append(seqOptions[i]);
    }
    return timeline;
};

exports.random = random;
exports.shuffle = shuffle;
exports.splitText = splitText$$1;
exports.animate = animate;
exports.sequence = sequence;

}((this.just = this.just || {})));
