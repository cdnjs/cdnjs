(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.popmotion = {}));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    var warning = function () { };
    var invariant = function () { };
    {
        warning = function (check, message) {
            if (!check && typeof console !== 'undefined') {
                console.warn(message);
            }
        };
        invariant = function (check, message) {
            if (!check) {
                throw new Error(message);
            }
        };
    }

    var clamp$1 = function (min, max, v) {
        return Math.min(Math.max(v, min), max);
    };

    var safeMin = 0.001;
    var minDuration = 0.01;
    var maxDuration = 10.0;
    var minDamping = 0.05;
    var maxDamping = 1;
    function findSpring(_a) {
        var _b = _a.duration, duration = _b === void 0 ? 800 : _b, _c = _a.bounce, bounce = _c === void 0 ? 0.25 : _c, _d = _a.velocity, velocity = _d === void 0 ? 0 : _d, _e = _a.mass, mass = _e === void 0 ? 1 : _e;
        var envelope;
        var derivative;
        warning(duration <= maxDuration * 1000, "Spring duration must be 10 seconds or less");
        var dampingRatio = 1 - bounce;
        dampingRatio = clamp$1(minDamping, maxDamping, dampingRatio);
        duration = clamp$1(minDuration, maxDuration, duration / 1000);
        if (dampingRatio < 1) {
            envelope = function (undampedFreq) {
                var exponentialDecay = undampedFreq * dampingRatio;
                var delta = exponentialDecay * duration;
                var a = exponentialDecay - velocity;
                var b = calcAngularFreq(undampedFreq, dampingRatio);
                var c = Math.exp(-delta);
                return safeMin - (a / b) * c;
            };
            derivative = function (undampedFreq) {
                var exponentialDecay = undampedFreq * dampingRatio;
                var delta = exponentialDecay * duration;
                var d = delta * velocity + velocity;
                var e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
                var f = Math.exp(-delta);
                var g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
                var factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
                return (factor * ((d - e) * f)) / g;
            };
        }
        else {
            envelope = function (undampedFreq) {
                var a = Math.exp(-undampedFreq * duration);
                var b = (undampedFreq - velocity) * duration + 1;
                return -safeMin + a * b;
            };
            derivative = function (undampedFreq) {
                var a = Math.exp(-undampedFreq * duration);
                var b = (velocity - undampedFreq) * (duration * duration);
                return a * b;
            };
        }
        var initialGuess = 5 / duration;
        var undampedFreq = approximateRoot(envelope, derivative, initialGuess);
        if (isNaN(undampedFreq)) {
            return {
                stiffness: 100,
                damping: 10,
            };
        }
        else {
            var stiffness = Math.pow(undampedFreq, 2) * mass;
            return {
                stiffness: stiffness,
                damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            };
        }
    }
    var rootIterations = 12;
    function approximateRoot(envelope, derivative, initialGuess) {
        var result = initialGuess;
        for (var i = 1; i < rootIterations; i++) {
            result = result - envelope(result) / derivative(result);
        }
        return result;
    }
    function calcAngularFreq(undampedFreq, dampingRatio) {
        return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    }

    var durationKeys = ["duration", "bounce"];
    var physicsKeys = ["stiffness", "damping", "mass"];
    function isSpringType(options, keys) {
        return keys.some(function (key) { return options[key] !== undefined; });
    }
    function getSpringOptions(options) {
        var springOptions = __assign({ velocity: 0.0, stiffness: 100, damping: 10, mass: 1.0, isResolvedFromDuration: false }, options);
        if (!isSpringType(options, physicsKeys) &&
            isSpringType(options, durationKeys)) {
            var derived = findSpring(options);
            springOptions = __assign(__assign(__assign({}, springOptions), derived), { velocity: 0.0, mass: 1.0 });
            springOptions.isResolvedFromDuration = true;
        }
        return springOptions;
    }
    function spring(_a) {
        var _b = _a.from, from = _b === void 0 ? 0.0 : _b, _c = _a.to, to = _c === void 0 ? 1.0 : _c, _d = _a.restSpeed, restSpeed = _d === void 0 ? 2 : _d, restDelta = _a.restDelta, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
        var state = { done: false, value: from };
        var _e = getSpringOptions(options), stiffness = _e.stiffness, damping = _e.damping, mass = _e.mass, velocity = _e.velocity, isResolvedFromDuration = _e.isResolvedFromDuration;
        var resolveSpring = zero;
        var resolveVelocity = zero;
        function createSpring() {
            var initialVelocity = velocity ? -(velocity / 1000) : 0.0;
            var initialDelta = to - from;
            var dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
            var undampedAngularFreq = Math.sqrt(stiffness / mass) / 1000;
            restDelta !== null && restDelta !== void 0 ? restDelta : (restDelta = Math.abs(to - from) <= 1 ? 0.01 : 0.4);
            if (dampingRatio < 1) {
                var angularFreq_1 = calcAngularFreq(undampedAngularFreq, dampingRatio);
                resolveSpring = function (t) {
                    var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                    return (to -
                        envelope *
                            (((initialVelocity +
                                dampingRatio * undampedAngularFreq * initialDelta) /
                                angularFreq_1) *
                                Math.sin(angularFreq_1 * t) +
                                initialDelta * Math.cos(angularFreq_1 * t)));
                };
                resolveVelocity = function (t) {
                    var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                    return (dampingRatio *
                        undampedAngularFreq *
                        envelope *
                        ((Math.sin(angularFreq_1 * t) *
                            (initialVelocity +
                                dampingRatio *
                                    undampedAngularFreq *
                                    initialDelta)) /
                            angularFreq_1 +
                            initialDelta * Math.cos(angularFreq_1 * t)) -
                        envelope *
                            (Math.cos(angularFreq_1 * t) *
                                (initialVelocity +
                                    dampingRatio *
                                        undampedAngularFreq *
                                        initialDelta) -
                                angularFreq_1 *
                                    initialDelta *
                                    Math.sin(angularFreq_1 * t)));
                };
            }
            else if (dampingRatio === 1) {
                resolveSpring = function (t) {
                    return to -
                        Math.exp(-undampedAngularFreq * t) *
                            (initialDelta +
                                (initialVelocity + undampedAngularFreq * initialDelta) *
                                    t);
                };
            }
            else {
                var dampedAngularFreq_1 = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
                resolveSpring = function (t) {
                    var envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
                    var freqForT = Math.min(dampedAngularFreq_1 * t, 300);
                    return (to -
                        (envelope *
                            ((initialVelocity +
                                dampingRatio * undampedAngularFreq * initialDelta) *
                                Math.sinh(freqForT) +
                                dampedAngularFreq_1 *
                                    initialDelta *
                                    Math.cosh(freqForT))) /
                            dampedAngularFreq_1);
                };
            }
        }
        createSpring();
        return {
            next: function (t) {
                var current = resolveSpring(t);
                if (!isResolvedFromDuration) {
                    var currentVelocity = resolveVelocity(t) * 1000;
                    var isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                    var isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
                    state.done =
                        isBelowVelocityThreshold && isBelowDisplacementThreshold;
                }
                else {
                    state.done = t >= options.duration;
                }
                state.value = state.done ? to : current;
                return state;
            },
            flipTarget: function () {
                var _a;
                velocity = -velocity;
                _a = [to, from], from = _a[0], to = _a[1];
                createSpring();
            },
        };
    }
    spring.needsInterpolation = function (a, b) {
        return typeof a === "string" || typeof b === "string";
    };
    var zero = function (_t) { return 0; };

    var progress = function (from, to, value) {
        var toFromDifference = to - from;
        return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
    };

    var mix = function (from, to, progress) {
        return -progress * from + progress * to + from;
    };

    var clamp = function (min, max) { return function (v) {
        return Math.max(Math.min(v, max), min);
    }; };
    var sanitize = function (v) { return (v % 1 ? Number(v.toFixed(5)) : v); };
    var floatRegex = /(-)?([\d]*\.?[\d])+/g;
    var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi;
    var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
    function isString(v) {
        return typeof v === 'string';
    }

    var number = {
        test: function (v) { return typeof v === 'number'; },
        parse: parseFloat,
        transform: function (v) { return v; },
    };
    var alpha = __assign(__assign({}, number), { transform: clamp(0, 1) });
    __assign(__assign({}, number), { default: 1 });

    var createUnitType = function (unit) { return ({
        test: function (v) {
            return isString(v) && v.endsWith(unit) && v.split(' ').length === 1;
        },
        parse: parseFloat,
        transform: function (v) { return "" + v + unit; },
    }); };
    var percent = createUnitType('%');
    __assign(__assign({}, percent), { parse: function (v) { return percent.parse(v) / 100; }, transform: function (v) { return percent.transform(v * 100); } });

    var isColorString = function (type, testProp) { return function (v) {
        return ((isString(v) && singleColorRegex.test(v) && v.startsWith(type)) ||
            (testProp && Object.prototype.hasOwnProperty.call(v, testProp)));
    }; };
    var splitColor = function (aName, bName, cName) { return function (v) {
        var _a;
        if (!isString(v))
            return v;
        var _b = v.match(floatRegex), a = _b[0], b = _b[1], c = _b[2], alpha = _b[3];
        return _a = {},
            _a[aName] = parseFloat(a),
            _a[bName] = parseFloat(b),
            _a[cName] = parseFloat(c),
            _a.alpha = alpha !== undefined ? parseFloat(alpha) : 1,
            _a;
    }; };

    var hsla = {
        test: isColorString('hsl', 'hue'),
        parse: splitColor('hue', 'saturation', 'lightness'),
        transform: function (_a) {
            var hue = _a.hue, saturation = _a.saturation, lightness = _a.lightness, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
            return ('hsla(' +
                Math.round(hue) +
                ', ' +
                percent.transform(sanitize(saturation)) +
                ', ' +
                percent.transform(sanitize(lightness)) +
                ', ' +
                sanitize(alpha.transform(alpha$1)) +
                ')');
        },
    };

    var clampRgbUnit = clamp(0, 255);
    var rgbUnit = __assign(__assign({}, number), { transform: function (v) { return Math.round(clampRgbUnit(v)); } });
    var rgba = {
        test: isColorString('rgb', 'red'),
        parse: splitColor('red', 'green', 'blue'),
        transform: function (_a) {
            var red = _a.red, green = _a.green, blue = _a.blue, _b = _a.alpha, alpha$1 = _b === void 0 ? 1 : _b;
            return 'rgba(' +
                rgbUnit.transform(red) +
                ', ' +
                rgbUnit.transform(green) +
                ', ' +
                rgbUnit.transform(blue) +
                ', ' +
                sanitize(alpha.transform(alpha$1)) +
                ')';
        },
    };

    function parseHex(v) {
        var r = '';
        var g = '';
        var b = '';
        var a = '';
        if (v.length > 5) {
            r = v.substr(1, 2);
            g = v.substr(3, 2);
            b = v.substr(5, 2);
            a = v.substr(7, 2);
        }
        else {
            r = v.substr(1, 1);
            g = v.substr(2, 1);
            b = v.substr(3, 1);
            a = v.substr(4, 1);
            r += r;
            g += g;
            b += b;
            a += a;
        }
        return {
            red: parseInt(r, 16),
            green: parseInt(g, 16),
            blue: parseInt(b, 16),
            alpha: a ? parseInt(a, 16) / 255 : 1,
        };
    }
    var hex = {
        test: isColorString('#'),
        parse: parseHex,
        transform: rgba.transform,
    };

    var color = {
        test: function (v) { return rgba.test(v) || hex.test(v) || hsla.test(v); },
        parse: function (v) {
            if (rgba.test(v)) {
                return rgba.parse(v);
            }
            else if (hsla.test(v)) {
                return hsla.parse(v);
            }
            else {
                return hex.parse(v);
            }
        },
        transform: function (v) {
            return isString(v)
                ? v
                : v.hasOwnProperty('red')
                    ? rgba.transform(v)
                    : hsla.transform(v);
        },
    };

    var colorToken = '${c}';
    var numberToken = '${n}';
    function test(v) {
        var _a, _b, _c, _d;
        return (isNaN(v) &&
            isString(v) &&
            ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0);
    }
    function analyse$1(v) {
        var values = [];
        var numColors = 0;
        var colors = v.match(colorRegex);
        if (colors) {
            numColors = colors.length;
            v = v.replace(colorRegex, colorToken);
            values.push.apply(values, colors.map(color.parse));
        }
        var numbers = v.match(floatRegex);
        if (numbers) {
            v = v.replace(floatRegex, numberToken);
            values.push.apply(values, numbers.map(number.parse));
        }
        return { values: values, numColors: numColors, tokenised: v };
    }
    function parse(v) {
        return analyse$1(v).values;
    }
    function createTransformer(v) {
        var _a = analyse$1(v), values = _a.values, numColors = _a.numColors, tokenised = _a.tokenised;
        var numValues = values.length;
        return function (v) {
            var output = tokenised;
            for (var i = 0; i < numValues; i++) {
                output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v[i]) : sanitize(v[i]));
            }
            return output;
        };
    }
    var convertNumbersToZero = function (v) {
        return typeof v === 'number' ? 0 : v;
    };
    function getAnimatableNone(v) {
        var parsed = parse(v);
        var transformer = createTransformer(v);
        return transformer(parsed.map(convertNumbersToZero));
    }
    var complex = { test: test, parse: parse, createTransformer: createTransformer, getAnimatableNone: getAnimatableNone };

    var mixLinearColor = function (from, to, v) {
        var fromExpo = from * from;
        var toExpo = to * to;
        return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
    };
    var colorTypes = [hex, rgba, hsla];
    var getColorType = function (v) {
        return colorTypes.find(function (type) { return type.test(v); });
    };
    var notAnimatable = function (color) {
        return "'" + color + "' is not an animatable color. Use the equivalent color code instead.";
    };
    var mixColor = function (from, to) {
        var fromColorType = getColorType(from);
        var toColorType = getColorType(to);
        invariant(!!fromColorType, notAnimatable(from));
        invariant(!!toColorType, notAnimatable(to));
        invariant(fromColorType.transform === toColorType.transform, "Both colors must be hex/RGBA, OR both must be HSLA.");
        var fromColor = fromColorType.parse(from);
        var toColor = toColorType.parse(to);
        var blended = __assign({}, fromColor);
        var mixFunc = fromColorType === hsla ? mix : mixLinearColor;
        return function (v) {
            for (var key in blended) {
                if (key !== "alpha") {
                    blended[key] = mixFunc(fromColor[key], toColor[key], v);
                }
            }
            blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
            return fromColorType.transform(blended);
        };
    };

    var zeroPoint = {
        x: 0,
        y: 0,
        z: 0
    };
    var isNum = function (v) { return typeof v === 'number'; };

    var combineFunctions = function (a, b) { return function (v) { return b(a(v)); }; };
    var pipe = function () {
        var transformers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            transformers[_i] = arguments[_i];
        }
        return transformers.reduce(combineFunctions);
    };

    function getMixer(origin, target) {
        if (isNum(origin)) {
            return function (v) { return mix(origin, target, v); };
        }
        else if (color.test(origin)) {
            return mixColor(origin, target);
        }
        else {
            return mixComplex(origin, target);
        }
    }
    var mixArray = function (from, to) {
        var output = __spreadArrays(from);
        var numValues = output.length;
        var blendValue = from.map(function (fromThis, i) { return getMixer(fromThis, to[i]); });
        return function (v) {
            for (var i = 0; i < numValues; i++) {
                output[i] = blendValue[i](v);
            }
            return output;
        };
    };
    var mixObject = function (origin, target) {
        var output = __assign(__assign({}, origin), target);
        var blendValue = {};
        for (var key in output) {
            if (origin[key] !== undefined && target[key] !== undefined) {
                blendValue[key] = getMixer(origin[key], target[key]);
            }
        }
        return function (v) {
            for (var key in blendValue) {
                output[key] = blendValue[key](v);
            }
            return output;
        };
    };
    function analyse(value) {
        var parsed = complex.parse(value);
        var numValues = parsed.length;
        var numNumbers = 0;
        var numRGB = 0;
        var numHSL = 0;
        for (var i = 0; i < numValues; i++) {
            if (numNumbers || typeof parsed[i] === "number") {
                numNumbers++;
            }
            else {
                if (parsed[i].hue !== undefined) {
                    numHSL++;
                }
                else {
                    numRGB++;
                }
            }
        }
        return { parsed: parsed, numNumbers: numNumbers, numRGB: numRGB, numHSL: numHSL };
    }
    var mixComplex = function (origin, target) {
        var template = complex.createTransformer(target);
        var originStats = analyse(origin);
        var targetStats = analyse(target);
        invariant(originStats.numHSL === targetStats.numHSL &&
            originStats.numRGB === targetStats.numRGB &&
            originStats.numNumbers >= targetStats.numNumbers, "Complex values '" + origin + "' and '" + target + "' too different to mix. Ensure all colors are of the same type.");
        return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    };

    var mixNumber = function (from, to) { return function (p) { return mix(from, to, p); }; };
    function detectMixerFactory(v) {
        if (typeof v === 'number') {
            return mixNumber;
        }
        else if (typeof v === 'string') {
            if (color.test(v)) {
                return mixColor;
            }
            else {
                return mixComplex;
            }
        }
        else if (Array.isArray(v)) {
            return mixArray;
        }
        else if (typeof v === 'object') {
            return mixObject;
        }
    }
    function createMixers(output, ease, customMixer) {
        var mixers = [];
        var mixerFactory = customMixer || detectMixerFactory(output[0]);
        var numMixers = output.length - 1;
        for (var i = 0; i < numMixers; i++) {
            var mixer = mixerFactory(output[i], output[i + 1]);
            if (ease) {
                var easingFunction = Array.isArray(ease) ? ease[i] : ease;
                mixer = pipe(easingFunction, mixer);
            }
            mixers.push(mixer);
        }
        return mixers;
    }
    function fastInterpolate(_a, _b) {
        var from = _a[0], to = _a[1];
        var mixer = _b[0];
        return function (v) { return mixer(progress(from, to, v)); };
    }
    function slowInterpolate(input, mixers) {
        var inputLength = input.length;
        var lastInputIndex = inputLength - 1;
        return function (v) {
            var mixerIndex = 0;
            var foundMixerIndex = false;
            if (v <= input[0]) {
                foundMixerIndex = true;
            }
            else if (v >= input[lastInputIndex]) {
                mixerIndex = lastInputIndex - 1;
                foundMixerIndex = true;
            }
            if (!foundMixerIndex) {
                var i = 1;
                for (; i < inputLength; i++) {
                    if (input[i] > v || i === lastInputIndex) {
                        break;
                    }
                }
                mixerIndex = i - 1;
            }
            var progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
            return mixers[mixerIndex](progressInRange);
        };
    }
    function interpolate(input, output, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.clamp, isClamp = _c === void 0 ? true : _c, ease = _b.ease, mixer = _b.mixer;
        var inputLength = input.length;
        invariant(inputLength === output.length, 'Both input and output ranges must be the same length');
        invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, 'Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.');
        if (input[0] > input[inputLength - 1]) {
            input = [].concat(input);
            output = [].concat(output);
            input.reverse();
            output.reverse();
        }
        var mixers = createMixers(output, ease, mixer);
        var interpolator = inputLength === 2
            ? fastInterpolate(input, mixers)
            : slowInterpolate(input, mixers);
        return isClamp
            ? function (v) { return interpolator(clamp$1(input[0], input[inputLength - 1], v)); }
            : interpolator;
    }

    var reverseEasing = function (easing) { return function (p) { return 1 - easing(1 - p); }; };
    var mirrorEasing = function (easing) { return function (p) {
        return p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
    }; };
    var createExpoIn = function (power) { return function (p) { return Math.pow(p, power); }; };
    var createBackIn = function (power) { return function (p) {
        return p * p * ((power + 1) * p - power);
    }; };
    var createAnticipate = function (power) {
        var backEasing = createBackIn(power);
        return function (p) {
            return (p *= 2) < 1
                ? 0.5 * backEasing(p)
                : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
        };
    };

    var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
    var BOUNCE_FIRST_THRESHOLD = 4.0 / 11.0;
    var BOUNCE_SECOND_THRESHOLD = 8.0 / 11.0;
    var BOUNCE_THIRD_THRESHOLD = 9.0 / 10.0;
    var linear = function (p) { return p; };
    var easeIn = createExpoIn(2);
    var easeOut = reverseEasing(easeIn);
    var easeInOut = mirrorEasing(easeIn);
    var circIn = function (p) { return 1 - Math.sin(Math.acos(p)); };
    var circOut = reverseEasing(circIn);
    var circInOut = mirrorEasing(circOut);
    var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
    var backOut = reverseEasing(backIn);
    var backInOut = mirrorEasing(backIn);
    var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
    var ca = 4356.0 / 361.0;
    var cb = 35442.0 / 1805.0;
    var cc = 16061.0 / 1805.0;
    var bounceOut = function (p) {
        if (p === 1 || p === 0)
            return p;
        var p2 = p * p;
        return p < BOUNCE_FIRST_THRESHOLD
            ? 7.5625 * p2
            : p < BOUNCE_SECOND_THRESHOLD
                ? 9.075 * p2 - 9.9 * p + 3.4
                : p < BOUNCE_THIRD_THRESHOLD
                    ? ca * p2 - cb * p + cc
                    : 10.8 * p * p - 20.52 * p + 10.72;
    };
    var bounceIn = reverseEasing(bounceOut);
    var bounceInOut = function (p) {
        return p < 0.5
            ? 0.5 * (1.0 - bounceOut(1.0 - p * 2.0))
            : 0.5 * bounceOut(p * 2.0 - 1.0) + 0.5;
    };

    function defaultEasing(values, easing) {
        return values.map(function () { return easing || easeInOut; }).splice(0, values.length - 1);
    }
    function defaultOffset(values) {
        var numValues = values.length;
        return values.map(function (_value, i) {
            return i !== 0 ? i / (numValues - 1) : 0;
        });
    }
    function convertOffsetToTimes(offset, duration) {
        return offset.map(function (o) { return o * duration; });
    }
    function keyframes(_a) {
        var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.to, to = _c === void 0 ? 1 : _c, ease = _a.ease, offset = _a.offset, _d = _a.duration, duration = _d === void 0 ? 300 : _d;
        var state = { done: false, value: from };
        var values = Array.isArray(to) ? to : [from, to];
        var times = convertOffsetToTimes(offset && offset.length === values.length
            ? offset
            : defaultOffset(values), duration);
        function createInterpolator() {
            return interpolate(times, values, {
                ease: Array.isArray(ease) ? ease : defaultEasing(values, ease),
            });
        }
        var interpolator = createInterpolator();
        return {
            next: function (t) {
                state.value = interpolator(t);
                state.done = t >= duration;
                return state;
            },
            flipTarget: function () {
                values.reverse();
                interpolator = createInterpolator();
            },
        };
    }

    function decay(_a) {
        var _b = _a.velocity, velocity = _b === void 0 ? 0 : _b, _c = _a.from, from = _c === void 0 ? 0 : _c, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 350 : _e, _f = _a.restDelta, restDelta = _f === void 0 ? 0.5 : _f, modifyTarget = _a.modifyTarget;
        var state = { done: false, value: from };
        var amplitude = power * velocity;
        var ideal = from + amplitude;
        var target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
        if (target !== ideal)
            amplitude = target - from;
        return {
            next: function (t) {
                var delta = -amplitude * Math.exp(-t / timeConstant);
                state.done = !(delta > restDelta || delta < -restDelta);
                state.value = state.done ? target : target + delta;
                return state;
            },
            flipTarget: function () { },
        };
    }

    var types = { keyframes: keyframes, spring: spring, decay: decay };
    function detectAnimationFromOptions(config) {
        if (Array.isArray(config.to)) {
            return keyframes;
        }
        else if (types[config.type]) {
            return types[config.type];
        }
        var keys = new Set(Object.keys(config));
        if (keys.has("ease") ||
            (keys.has("duration") && !keys.has("dampingRatio"))) {
            return keyframes;
        }
        else if (keys.has("dampingRatio") ||
            keys.has("stiffness") ||
            keys.has("mass") ||
            keys.has("damping") ||
            keys.has("restSpeed") ||
            keys.has("restDelta")) {
            return spring;
        }
        return keyframes;
    }

    var defaultTimestep = (1 / 60) * 1000;
    var getCurrentTime = typeof performance !== "undefined"
        ? function () { return performance.now(); }
        : function () { return Date.now(); };
    var onNextFrame = typeof window !== "undefined"
        ? function (callback) {
            return window.requestAnimationFrame(callback);
        }
        : function (callback) {
            return setTimeout(function () { return callback(getCurrentTime()); }, defaultTimestep);
        };

    function createRenderStep(runNextFrame) {
        var toRun = [];
        var toRunNextFrame = [];
        var numToRun = 0;
        var isProcessing = false;
        var toKeepAlive = new WeakSet();
        var step = {
            schedule: function (callback, keepAlive, immediate) {
                if (keepAlive === void 0) { keepAlive = false; }
                if (immediate === void 0) { immediate = false; }
                var addToCurrentFrame = immediate && isProcessing;
                var buffer = addToCurrentFrame ? toRun : toRunNextFrame;
                if (keepAlive)
                    toKeepAlive.add(callback);
                if (buffer.indexOf(callback) === -1) {
                    buffer.push(callback);
                    if (addToCurrentFrame && isProcessing)
                        numToRun = toRun.length;
                }
                return callback;
            },
            cancel: function (callback) {
                var index = toRunNextFrame.indexOf(callback);
                if (index !== -1)
                    toRunNextFrame.splice(index, 1);
                toKeepAlive.delete(callback);
            },
            process: function (frameData) {
                var _a;
                isProcessing = true;
                _a = [toRunNextFrame, toRun], toRun = _a[0], toRunNextFrame = _a[1];
                toRunNextFrame.length = 0;
                numToRun = toRun.length;
                if (numToRun) {
                    for (var i = 0; i < numToRun; i++) {
                        var callback = toRun[i];
                        callback(frameData);
                        if (toKeepAlive.has(callback)) {
                            step.schedule(callback);
                            runNextFrame();
                        }
                    }
                }
                isProcessing = false;
            },
        };
        return step;
    }

    var maxElapsed = 40;
    var useDefaultElapsed = true;
    var runNextFrame = false;
    var isProcessing = false;
    var frame = {
        delta: 0,
        timestamp: 0
    };
    var stepsOrder = ["read", "update", "preRender", "render", "postRender"];
    var steps$1 = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
        acc[key] = createRenderStep(function () {
            return runNextFrame = true;
        });
        return acc;
    }, {});
    var sync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
        var step = steps$1[key];
        acc[key] = function (process, keepAlive, immediate) {
            if (keepAlive === void 0) {
                keepAlive = false;
            }
            if (immediate === void 0) {
                immediate = false;
            }
            if (!runNextFrame) startLoop();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    var cancelSync = /*#__PURE__*/stepsOrder.reduce(function (acc, key) {
        acc[key] = steps$1[key].cancel;
        return acc;
    }, {});
    var processStep = function (stepId) {
        return steps$1[stepId].process(frame);
    };
    var processFrame = function (timestamp) {
        runNextFrame = false;
        frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
        frame.timestamp = timestamp;
        isProcessing = true;
        stepsOrder.forEach(processStep);
        isProcessing = false;
        if (runNextFrame) {
            useDefaultElapsed = false;
            onNextFrame(processFrame);
        }
    };
    var startLoop = function () {
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!isProcessing) onNextFrame(processFrame);
    };
    var getFrameData = function () {
        return frame;
    };

    function loopElapsed(elapsed, duration, delay) {
        if (delay === void 0) { delay = 0; }
        return elapsed - duration - delay;
    }
    function reverseElapsed(elapsed, duration, delay, isForwardPlayback) {
        if (delay === void 0) { delay = 0; }
        if (isForwardPlayback === void 0) { isForwardPlayback = true; }
        return isForwardPlayback
            ? loopElapsed(duration + -elapsed, duration, delay)
            : duration - (elapsed - duration) + delay;
    }
    function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
        return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
    }

    var framesync = function (update) {
        var passTimestamp = function (_a) {
            var delta = _a.delta;
            return update(delta);
        };
        return {
            start: function () { return sync.update(passTimestamp, true); },
            stop: function () { return cancelSync.update(passTimestamp); },
        };
    };
    function animate(_a) {
        var _b, _c;
        var from = _a.from, _d = _a.autoplay, autoplay = _d === void 0 ? true : _d, _e = _a.driver, driver = _e === void 0 ? framesync : _e, _f = _a.elapsed, elapsed = _f === void 0 ? 0 : _f, _g = _a.repeat, repeatMax = _g === void 0 ? 0 : _g, _h = _a.repeatType, repeatType = _h === void 0 ? "loop" : _h, _j = _a.repeatDelay, repeatDelay = _j === void 0 ? 0 : _j, onPlay = _a.onPlay, onStop = _a.onStop, onComplete = _a.onComplete, onRepeat = _a.onRepeat, onUpdate = _a.onUpdate, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
        var to = options.to;
        var driverControls;
        var repeatCount = 0;
        var computedDuration = options.duration;
        var latest;
        var isComplete = false;
        var isForwardPlayback = true;
        var interpolateFromNumber;
        var animator = detectAnimationFromOptions(options);
        if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
            interpolateFromNumber = interpolate([0, 100], [from, to], {
                clamp: false,
            });
            from = 0;
            to = 100;
        }
        var animation = animator(__assign(__assign({}, options), { from: from, to: to }));
        function repeat() {
            repeatCount++;
            if (repeatType === "reverse") {
                isForwardPlayback = repeatCount % 2 === 0;
                elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
            }
            else {
                elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
                if (repeatType === "mirror")
                    animation.flipTarget();
            }
            isComplete = false;
            onRepeat && onRepeat();
        }
        function complete() {
            driverControls.stop();
            onComplete && onComplete();
        }
        function update(delta) {
            if (!isForwardPlayback)
                delta = -delta;
            elapsed += delta;
            if (!isComplete) {
                var state = animation.next(Math.max(0, elapsed));
                latest = state.value;
                if (interpolateFromNumber)
                    latest = interpolateFromNumber(latest);
                isComplete = isForwardPlayback ? state.done : elapsed <= 0;
            }
            onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
            if (isComplete) {
                if (repeatCount === 0)
                    computedDuration !== null && computedDuration !== void 0 ? computedDuration : (computedDuration = elapsed);
                if (repeatCount < repeatMax) {
                    hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
                }
                else {
                    complete();
                }
            }
        }
        function play() {
            onPlay === null || onPlay === void 0 ? void 0 : onPlay();
            driverControls = driver(update);
            driverControls.start();
        }
        autoplay && play();
        return {
            stop: function () {
                onStop === null || onStop === void 0 ? void 0 : onStop();
                driverControls.stop();
            },
        };
    }

    function velocityPerSecond(velocity, frameDuration) {
        return frameDuration ? velocity * (1000 / frameDuration) : 0;
    }

    function inertia(_a) {
        var _b = _a.from, from = _b === void 0 ? 0 : _b, _c = _a.velocity, velocity = _c === void 0 ? 0 : _c, min = _a.min, max = _a.max, _d = _a.power, power = _d === void 0 ? 0.8 : _d, _e = _a.timeConstant, timeConstant = _e === void 0 ? 750 : _e, _f = _a.bounceStiffness, bounceStiffness = _f === void 0 ? 500 : _f, _g = _a.bounceDamping, bounceDamping = _g === void 0 ? 10 : _g, _h = _a.restDelta, restDelta = _h === void 0 ? 1 : _h, modifyTarget = _a.modifyTarget, driver = _a.driver, onUpdate = _a.onUpdate, onComplete = _a.onComplete;
        var currentAnimation;
        function isOutOfBounds(v) {
            return (min !== undefined && v < min) || (max !== undefined && v > max);
        }
        function boundaryNearest(v) {
            if (min === undefined)
                return max;
            if (max === undefined)
                return min;
            return Math.abs(min - v) < Math.abs(max - v) ? min : max;
        }
        function startAnimation(options) {
            currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
            currentAnimation = animate(__assign(__assign({}, options), { driver: driver, onUpdate: function (v) {
                    var _a;
                    onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
                    (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
                }, onComplete: onComplete }));
        }
        function startSpring(options) {
            startAnimation(__assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta: restDelta }, options));
        }
        if (isOutOfBounds(from)) {
            startSpring({ from: from, velocity: velocity, to: boundaryNearest(from) });
        }
        else {
            var target = power * velocity + from;
            if (typeof modifyTarget !== "undefined")
                target = modifyTarget(target);
            var boundary_1 = boundaryNearest(target);
            var heading_1 = boundary_1 === min ? -1 : 1;
            var prev_1;
            var current_1;
            var checkBoundary = function (v) {
                prev_1 = current_1;
                current_1 = v;
                velocity = velocityPerSecond(v - prev_1, getFrameData().delta);
                if ((heading_1 === 1 && v > boundary_1) ||
                    (heading_1 === -1 && v < boundary_1)) {
                    startSpring({ from: v, to: boundary_1, velocity: velocity });
                }
            };
            startAnimation({
                type: "decay",
                from: from,
                velocity: velocity,
                timeConstant: timeConstant,
                power: power,
                restDelta: restDelta,
                modifyTarget: modifyTarget,
                onUpdate: isOutOfBounds(target) ? checkBoundary : undefined,
            });
        }
        return {
            stop: function () { return currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop(); },
        };
    }

    var radiansToDegrees = function (radians) { return (radians * 180) / Math.PI; };

    var angle = function (a, b) {
        if (b === void 0) { b = zeroPoint; }
        return radiansToDegrees(Math.atan2(b.y - a.y, b.x - a.x));
    };

    var applyOffset = function (from, to) {
        var hasReceivedFrom = true;
        if (to === undefined) {
            to = from;
            hasReceivedFrom = false;
        }
        return function (v) {
            if (hasReceivedFrom) {
                return v - from + to;
            }
            else {
                from = v;
                hasReceivedFrom = true;
                return to;
            }
        };
    };

    var identity = function (v) { return v; };
    var createAttractor = function (alterDisplacement) {
        if (alterDisplacement === void 0) { alterDisplacement = identity; }
        return function (constant, origin, v) {
            var displacement = origin - v;
            var springModifiedDisplacement = -(0 - constant + 1) * (0 - alterDisplacement(Math.abs(displacement)));
            return displacement <= 0
                ? origin + springModifiedDisplacement
                : origin - springModifiedDisplacement;
        };
    };
    var attract = createAttractor();
    var attractExpo = createAttractor(Math.sqrt);

    var degreesToRadians = function (degrees) { return (degrees * Math.PI) / 180; };

    var isPoint = function (point) {
        return point.hasOwnProperty('x') && point.hasOwnProperty('y');
    };

    var isPoint3D = function (point) {
        return isPoint(point) && point.hasOwnProperty('z');
    };

    var distance1D = function (a, b) { return Math.abs(a - b); };
    function distance(a, b) {
        if (isNum(a) && isNum(b)) {
            return distance1D(a, b);
        }
        else if (isPoint(a) && isPoint(b)) {
            var xDelta = distance1D(a.x, b.x);
            var yDelta = distance1D(a.y, b.y);
            var zDelta = isPoint3D(a) && isPoint3D(b) ? distance1D(a.z, b.z) : 0;
            return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
        }
    }

    var pointFromVector = function (origin, angle, distance) {
        angle = degreesToRadians(angle);
        return {
            x: distance * Math.cos(angle) + origin.x,
            y: distance * Math.sin(angle) + origin.y
        };
    };

    var toDecimal = function (num, precision) {
        if (precision === void 0) { precision = 2; }
        precision = Math.pow(10, precision);
        return Math.round(num * precision) / precision;
    };

    var smoothFrame = function (prevValue, nextValue, duration, smoothing) {
        if (smoothing === void 0) { smoothing = 0; }
        return toDecimal(prevValue +
            (duration * (nextValue - prevValue)) / Math.max(smoothing, duration));
    };

    var smooth = function (strength) {
        if (strength === void 0) { strength = 50; }
        var previousValue = 0;
        var lastUpdated = 0;
        return function (v) {
            var currentFramestamp = getFrameData().timestamp;
            var timeDelta = currentFramestamp !== lastUpdated ? currentFramestamp - lastUpdated : 0;
            var newValue = timeDelta
                ? smoothFrame(previousValue, v, timeDelta, strength)
                : previousValue;
            lastUpdated = currentFramestamp;
            previousValue = newValue;
            return newValue;
        };
    };

    var snap = function (points) {
        if (typeof points === 'number') {
            return function (v) { return Math.round(v / points) * points; };
        }
        else {
            var i_1 = 0;
            var numPoints_1 = points.length;
            return function (v) {
                var lastDistance = Math.abs(points[0] - v);
                for (i_1 = 1; i_1 < numPoints_1; i_1++) {
                    var point = points[i_1];
                    var distance = Math.abs(point - v);
                    if (distance === 0)
                        return point;
                    if (distance > lastDistance)
                        return points[i_1 - 1];
                    if (i_1 === numPoints_1 - 1)
                        return point;
                    lastDistance = distance;
                }
            };
        }
    };

    function velocityPerFrame(xps, frameDuration) {
        return xps / (1000 / frameDuration);
    }

    var wrap = function (min, max, v) {
        var rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    var a = function (a1, a2) { return 1.0 - 3.0 * a2 + 3.0 * a1; };
    var b = function (a1, a2) { return 3.0 * a2 - 6.0 * a1; };
    var c = function (a1) { return 3.0 * a1; };
    var calcBezier = function (t, a1, a2) {
        return ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;
    };
    var getSlope = function (t, a1, a2) {
        return 3.0 * a(a1, a2) * t * t + 2.0 * b(a1, a2) * t + c(a1);
    };
    var subdivisionPrecision = 0.0000001;
    var subdivisionMaxIterations = 10;
    function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX;
        var currentT;
        var i = 0;
        do {
            currentT = aA + (aB - aA) / 2.0;
            currentX = calcBezier(currentT, mX1, mX2) - aX;
            if (currentX > 0.0) {
                aB = currentT;
            }
            else {
                aA = currentT;
            }
        } while (Math.abs(currentX) > subdivisionPrecision &&
            ++i < subdivisionMaxIterations);
        return currentT;
    }
    var newtonIterations = 8;
    var newtonMinSlope = 0.001;
    function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < newtonIterations; ++i) {
            var currentSlope = getSlope(aGuessT, mX1, mX2);
            if (currentSlope === 0.0) {
                return aGuessT;
            }
            var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
            aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
    }
    var kSplineTableSize = 11;
    var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
    function cubicBezier(mX1, mY1, mX2, mY2) {
        if (mX1 === mY1 && mX2 === mY2)
            return linear;
        var sampleValues = new Float32Array(kSplineTableSize);
        for (var i = 0; i < kSplineTableSize; ++i) {
            sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
        function getTForX(aX) {
            var intervalStart = 0.0;
            var currentSample = 1;
            var lastSample = kSplineTableSize - 1;
            for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
                intervalStart += kSampleStepSize;
            }
            --currentSample;
            var dist = (aX - sampleValues[currentSample]) /
                (sampleValues[currentSample + 1] - sampleValues[currentSample]);
            var guessForT = intervalStart + dist * kSampleStepSize;
            var initialSlope = getSlope(guessForT, mX1, mX2);
            if (initialSlope >= newtonMinSlope) {
                return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
            }
            else if (initialSlope === 0.0) {
                return guessForT;
            }
            else {
                return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
            }
        }
        return function (t) {
            return t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
        };
    }

    var steps = function (steps, direction) {
        if (direction === void 0) { direction = 'end'; }
        return function (progress) {
            progress =
                direction === 'end' ? Math.min(progress, 0.999) : Math.max(progress, 0.001);
            var expanded = progress * steps;
            var rounded = direction === 'end' ? Math.floor(expanded) : Math.ceil(expanded);
            return clamp$1(0, 1, rounded / steps);
        };
    };

    exports.angle = angle;
    exports.animate = animate;
    exports.anticipate = anticipate;
    exports.applyOffset = applyOffset;
    exports.attract = attract;
    exports.attractExpo = attractExpo;
    exports.backIn = backIn;
    exports.backInOut = backInOut;
    exports.backOut = backOut;
    exports.bounceIn = bounceIn;
    exports.bounceInOut = bounceInOut;
    exports.bounceOut = bounceOut;
    exports.circIn = circIn;
    exports.circInOut = circInOut;
    exports.circOut = circOut;
    exports.clamp = clamp$1;
    exports.createAnticipate = createAnticipate;
    exports.createAttractor = createAttractor;
    exports.createBackIn = createBackIn;
    exports.createExpoIn = createExpoIn;
    exports.cubicBezier = cubicBezier;
    exports.decay = decay;
    exports.degreesToRadians = degreesToRadians;
    exports.distance = distance;
    exports.easeIn = easeIn;
    exports.easeInOut = easeInOut;
    exports.easeOut = easeOut;
    exports.inertia = inertia;
    exports.interpolate = interpolate;
    exports.isPoint = isPoint;
    exports.isPoint3D = isPoint3D;
    exports.keyframes = keyframes;
    exports.linear = linear;
    exports.mirrorEasing = mirrorEasing;
    exports.mix = mix;
    exports.mixColor = mixColor;
    exports.mixComplex = mixComplex;
    exports.pipe = pipe;
    exports.pointFromVector = pointFromVector;
    exports.progress = progress;
    exports.radiansToDegrees = radiansToDegrees;
    exports.reverseEasing = reverseEasing;
    exports.smooth = smooth;
    exports.smoothFrame = smoothFrame;
    exports.snap = snap;
    exports.spring = spring;
    exports.steps = steps;
    exports.toDecimal = toDecimal;
    exports.velocityPerFrame = velocityPerFrame;
    exports.velocityPerSecond = velocityPerSecond;
    exports.wrap = wrap;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
