"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    validateBadgeIcon: function() {
        return validateBadgeIcon;
    },
    validateFallbackIcon: function() {
        return validateFallbackIcon;
    },
    validateOverlayIcon: function() {
        return validateOverlayIcon;
    },
    validateSize: function() {
        return validateSize;
    }
});
var _warnOnce = require("../../lib/warnOnce");
var _helpers = require("./helpers");
var _types = require("./types");
/**
 * Пример,
 *
 * Icon28User -> 28
 * Icon12Circle1 -> 12
 * Icon12Circle2 -> 12
 * Icon20TextHeading1Outline -> 20
 */ function parseIconSizeByDisplayName(displayName) {
    if (typeof displayName !== "string") {
        return null;
    }
    var match = /Icon(\d+)/.exec(displayName);
    return match ? Number(match[1]) : null;
}
function parseIconSizeByWidthProp(width) {
    if (typeof width !== "string" && typeof width !== "number") {
        return null;
    }
    var size = Number(width);
    return size > 0 ? size : null;
}
function getElementDisplayName(element) {
    var _element_type_displayName;
    return (_element_type_displayName = element.type.displayName) !== null && _element_type_displayName !== void 0 ? _element_type_displayName : null;
}
function getElementWidthProp(element) {
    var _element_props_width;
    return (_element_props_width = element.props.width) !== null && _element_props_width !== void 0 ? _element_props_width : null;
}
function getIconSizeByElement(element) {
    var sizeByDisplayName = parseIconSizeByDisplayName(getElementDisplayName(element));
    var sizeByWidth = parseIconSizeByWidthProp(getElementWidthProp(element));
    return sizeByWidth ? sizeByWidth : sizeByDisplayName;
}
function validateIconComponentSizeByImageSize(imageSize, iconProp, selectorFn, logger) {
    var iconSize = getIconSizeByElement(iconProp.value);
    if (iconSize === null) {
        return;
    }
    var result = selectorFn(imageSize);
    if (result === iconSize || result === selectorFn.MAX_SIZE && iconSize >= result) {
        return;
    }
    var iconName = getElementDisplayName(iconProp.value);
    var propMessage = iconName ? "".concat(iconProp.name, "={<").concat(iconName, " />}") : iconProp.name;
    logger("Размер `".concat(propMessage, "` не соответствует дизайн-системе. Для `size={").concat(imageSize, "}` размер иконки для `").concat(iconProp.name, "` должен соответствовать <Icon").concat(result, "<name> />. Если такого размера нет, то используйте <").concat(iconName, " width={").concat(result, "} height={").concat(result, "} />"), "log");
}
var warnImageBase = (0, _warnOnce.warnOnce)("ImageBase");
function validateFallbackIcon(imageSize, iconProp) {
    return validateIconComponentSizeByImageSize(imageSize, iconProp, _helpers.getFallbackIconSizeByImageBaseSize, warnImageBase);
}
var mapOfExpectedSize = new Set(_types.imageBaseSizes);
var arrayOfSizes = Object.keys(mapOfExpectedSize).map(function(str) {
    return Number(str);
});
var maxSize = arrayOfSizes.reduce(function(maxSize, size) {
    return size > maxSize ? size : maxSize;
}, 0);
function validateSize(imageSize) {
    if (imageSize > maxSize || mapOfExpectedSize.has(imageSize)) {
        return;
    }
    warnImageBase("`size={".concat(imageSize, "}` не соответствует дизайн-системе. Пожалуйста, используйте один из следующих вариантов: ").concat(arrayOfSizes.join(" | ")), "log");
}
var warnImageBaseBadge = (0, _warnOnce.warnOnce)("ImageBase.Badge");
function validateBadgeIcon(imageSize, iconProp) {
    if (imageSize < 24 && iconProp) {
        return warnImageBaseBadge("Не используйте бейдж при `size < 24`.", "log");
    }
    validateIconComponentSizeByImageSize(imageSize, iconProp, _helpers.getBadgeIconSizeByImageBaseSize, warnImageBaseBadge);
}
var warnImageBaseOverlay = (0, _warnOnce.warnOnce)("ImageBase.Overlay");
function validateOverlayIcon(imageSize, iconProp) {
    validateIconComponentSizeByImageSize(imageSize, iconProp, _helpers.getOverlayIconSizeByImageBaseSize, warnImageBaseOverlay);
}

//# sourceMappingURL=validators.js.map