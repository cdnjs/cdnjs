/** @internal */
export function numberToPixels(value) {
    return value.toString(10) + 'px';
}
/** @internal */
export function pixelsToNumber(value) {
    const numberStr = value.replace("px", "");
    return parseFloat(numberStr);
}
/** @internal */
export function getElementWidth(element) {
    return element.offsetWidth;
}
/** @internal */
export function setElementWidth(element, width) {
    const widthAsPixels = numberToPixels(width);
    element.style.width = widthAsPixels;
}
/** @internal */
export function getElementHeight(element) {
    return element.offsetHeight;
}
/** @internal */
export function setElementHeight(element, height) {
    const heightAsPixels = numberToPixels(height);
    element.style.height = heightAsPixels;
}
/** @internal */
export function getElementWidthAndHeight(element) {
    return {
        width: element.offsetWidth,
        height: element.offsetHeight,
    };
}
/** @internal */
export function setElementDisplayVisibility(element, visible) {
    if (visible) {
        element.style.display = '';
    }
    else {
        element.style.display = 'none';
    }
}
/** @internal */
export function ensureElementPositionAbsolute(element) {
    const absolutePosition = 'absolute';
    if (element.style.position !== absolutePosition) {
        element.style.position = absolutePosition;
    }
}
/**
 * Replacement for JQuery $.extend(target, obj)
 * @internal
*/
export function extend(target, obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            target[key] = obj[key];
        }
    }
    return target;
}
/**
 * Replacement for JQuery $.extend(true, target, obj)
 * @internal
*/
export function deepExtend(target, obj) {
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
/** @internal */
export function deepExtendValue(existingTarget, value) {
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
/** @internal */
export function removeFromArray(item, array) {
    const index = array.indexOf(item);
    if (index === -1) {
        throw new Error('Can\'t remove item from array. Item is not in the array');
    }
    array.splice(index, 1);
}
/** @internal */
export function getUniqueId() {
    return (Math.random() * 1000000000000000)
        .toString(36)
        .replace('.', '');
}
//# sourceMappingURL=utils.js.map