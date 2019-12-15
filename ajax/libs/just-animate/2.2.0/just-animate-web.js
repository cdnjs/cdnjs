(function () {
'use strict';

function isDefined(a) {
    return !!a || a === 0 || a === false;
}

function isNumber(a) {
    return typeof a === 'number';
}



function isSVG(target) {
    return target instanceof SVGElement;
}
function isDOM(target) {
    return target.nodeType || isSVG(target);
}

function lazy(initializer) {
    var value;
    return function () { return value || (value = initializer()); };
}

var _ = undefined;
var measureExpression = /^([+|-]*[0-9]*[.]*?[0-9]+)([a-z%]+)*$/i;



var FINISH = 'finish';






var PENDING = 'pending';

var abs = Math.abs;

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
            var needsToPlay = isPlaying
                && !(animator.playState === RUNNING || animator.playState === FINISH)
                && !(rate < 0 && time < frameSize)
                && !(rate >= 0 && time > duration - frameSize);
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
    return items.indexOf(item) !== -1;
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

function forEach(items, action) {
    if (items) {
        for (var i = 0, ilen = items.length; i < ilen; i++) {
            if (action(items[i], i, ilen) === false) {
                break;
            }
        }
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

function combineTransforms(target, effects) {
    var transformNames = target.propNames.filter(function (t) { return includes(transforms, t); });
    if (!transformNames.length) {
        return;
    }
    if (includes(target.propNames, TRANSFORM)) {
        throw new Error('mixing transform and shorthand properties is not allowed');
    }
    var offsets = [];
    var easings = {};
    forEach(transformNames, function (name) {
        var effects2 = effects[name];
        if (effects2) {
            forEach(effects2, function (effect) {
                easings[effect.offset] = effect.easing;
                pushDistinct(offsets, effect.offset);
            });
        }
    });
    offsets.sort();
    var transformEffects = offsets.map(function (offset) {
        var values = {};
        forEach(transformNames, function (name) {
            var effect = head(effects[name], function (e) { return e.offset === offset; });
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
        forEach(transformNames, function (name) {
            effects[name] = _;
        });
        var transformEffects2_1 = [];
        forEach(transformEffects, function (effect) {
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
                easing: effect.easing
            });
        });
        effects[TRANSFORM] = transformEffects2_1;
    }
}

var waapiPlugin = {
    name: 'web',
    animate: animate,
    getValue: function (target, key) {
        return getComputedStyle(target)[key];
    },
    onWillAnimate: function (target, effects) {
        if (isDOM(target.target)) {
            appendUnits(effects);
            combineTransforms(target, effects);
        }
    }
};

if (typeof window !== 'undefined' && typeof window.just !== 'undefined') {
    window.just.addPlugin(waapiPlugin);
}
else {
    require('just-animate').addPlugin(waapiPlugin);
}

}());
