"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripTags = exports.getUniqueId = exports.removeFromArray = exports.deepExtendValue = exports.deepExtend = exports.extend = exports.setElementDisplayVisibility = exports.getElementWidthAndHeight = exports.setElementHeight = exports.getElementHeight = exports.setElementWidth = exports.getElementWidth = exports.pixelsToNumber = exports.numberToPixels = exports.getQueryStringParam = void 0;
/** @internal */
function getQueryStringParam(key) {
    const matches = location.search.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
}
exports.getQueryStringParam = getQueryStringParam;
/** @internal */
function numberToPixels(value) {
    return value.toString(10) + 'px';
}
exports.numberToPixels = numberToPixels;
/** @internal */
function pixelsToNumber(value) {
    const numberStr = value.replace("px", "");
    return parseFloat(numberStr);
}
exports.pixelsToNumber = pixelsToNumber;
/** @internal */
function getElementWidth(element) {
    return element.offsetWidth;
}
exports.getElementWidth = getElementWidth;
/** @internal */
function setElementWidth(element, width) {
    const widthAsPixels = numberToPixels(width);
    element.style.width = widthAsPixels;
}
exports.setElementWidth = setElementWidth;
/** @internal */
function getElementHeight(element) {
    return element.offsetHeight;
}
exports.getElementHeight = getElementHeight;
/** @internal */
function setElementHeight(element, height) {
    const heightAsPixels = numberToPixels(height);
    element.style.height = heightAsPixels;
}
exports.setElementHeight = setElementHeight;
/** @internal */
function getElementWidthAndHeight(element) {
    return {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
}
exports.getElementWidthAndHeight = getElementWidthAndHeight;
/** @internal */
function setElementDisplayVisibility(element, visible) {
    if (visible) {
        element.style.display = '';
    }
    else {
        element.style.display = 'none';
    }
}
exports.setElementDisplayVisibility = setElementDisplayVisibility;
/**
 * Replacement for JQuery $.extend(target, obj)
 * @internal
*/
function extend(target, obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            target[key] = obj[key];
        }
    }
    return target;
}
exports.extend = extend;
/**
 * Replacement for JQuery $.extend(true, target, obj)
 * @internal
*/
function deepExtend(target, obj) {
    if (obj !== undefined) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const existingTarget = target[key];
                target[key] = deepExtendValue(existingTarget, value);
            }
        }
    }
    return target;
}
exports.deepExtend = deepExtend;
/** @internal */
function deepExtendValue(existingTarget, value) {
    if (typeof value !== 'object') {
        return value;
    }
    else {
        if (Array.isArray(value)) {
            const length = value.length;
            const targetArray = new Array(length);
            for (let i = 0; i < length; i++) {
                const element = value[i];
                targetArray[i] = deepExtendValue({}, element);
            }
            return targetArray;
        }
        else {
            if (value === null) {
                return null;
            }
            else {
                const valueObj = value;
                if (existingTarget === undefined) {
                    return deepExtend({}, valueObj); // overwrite
                }
                else {
                    if (typeof existingTarget !== "object") {
                        return deepExtend({}, valueObj); // overwrite
                    }
                    else {
                        if (Array.isArray(existingTarget)) {
                            return deepExtend({}, valueObj); // overwrite
                        }
                        else {
                            if (existingTarget === null) {
                                return deepExtend({}, valueObj); // overwrite
                            }
                            else {
                                const existingTargetObj = existingTarget;
                                return deepExtend(existingTargetObj, valueObj); // merge
                            }
                        }
                    }
                }
            }
        }
    }
}
exports.deepExtendValue = deepExtendValue;
/** @internal */
function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index === -1) {
        throw new Error('Can\'t remove item from array. Item is not in the array');
    }
    array.splice(index, 1);
}
exports.removeFromArray = removeFromArray;
/** @internal */
function getUniqueId() {
    return (Math.random() * 1000000000000000)
        .toString(36)
        .replace('.', '');
}
exports.getUniqueId = getUniqueId;
/**
 * Removes html tags from a string
 * @returns input without tags
 * @internal
*/
function stripTags(input) {
    const strippedInput = input.replace(/(<([^>]+)>)/ig, '');
    return strippedInput.trim();
}
exports.stripTags = stripTags;
//# sourceMappingURL=utils.js.map