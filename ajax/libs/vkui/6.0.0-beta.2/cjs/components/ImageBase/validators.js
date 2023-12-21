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
const _warnOnce = require("../../lib/warnOnce");
const _helpers = require("./helpers");
const _types = require("./types");
/**
 * Пример,
 *
 * Icon28User -> 28
 * Icon12Circle1 -> 12
 * Icon12Circle2 -> 12
 * Icon20TextHeading1Outline -> 20
 */ function parseIconSizeByDisplayName(displayName) {
    if (typeof displayName !== 'string') {
        return null;
    }
    const match = /Icon(\d+)/.exec(displayName);
    return match ? Number(match[1]) : null;
}
function parseIconSizeByWidthProp(width) {
    if (typeof width !== 'string' && typeof width !== 'number') {
        return null;
    }
    const size = Number(width);
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
    const sizeByDisplayName = parseIconSizeByDisplayName(getElementDisplayName(element));
    const sizeByWidth = parseIconSizeByWidthProp(getElementWidthProp(element));
    return sizeByWidth ? sizeByWidth : sizeByDisplayName;
}
function validateIconComponentSizeByImageSize(imageSize, iconProp, selectorFn, logger) {
    const iconSize = getIconSizeByElement(iconProp.value);
    if (iconSize === null) {
        return;
    }
    const result = selectorFn(imageSize);
    if (result === iconSize || result === selectorFn.MAX_SIZE && iconSize >= result) {
        return;
    }
    const iconName = getElementDisplayName(iconProp.value);
    const propMessage = iconName ? `${iconProp.name}={<${iconName} />}` : iconProp.name;
    logger(`Размер \`${propMessage}\` не соответствует дизайн-системе. Для \`size={${imageSize}}\` размер иконки для \`${iconProp.name}\` должен соответствовать <Icon${result}<name> />. Если такого размера нет, то используйте <${iconName} width={${result}} height={${result}} />`, 'log');
}
const warnImageBase = (0, _warnOnce.warnOnce)('ImageBase');
function validateFallbackIcon(imageSize, iconProp) {
    return validateIconComponentSizeByImageSize(imageSize, iconProp, _helpers.getFallbackIconSizeByImageBaseSize, warnImageBase);
}
const mapOfExpectedSize = new Set(_types.imageBaseSizes);
const arrayOfSizes = Object.keys(mapOfExpectedSize).map((str)=>Number(str));
const maxSize = arrayOfSizes.reduce((maxSize, size)=>size > maxSize ? size : maxSize, 0);
function validateSize(imageSize) {
    if (imageSize > maxSize || mapOfExpectedSize.has(imageSize)) {
        return;
    }
    warnImageBase(`\`size={${imageSize}}\` не соответствует дизайн-системе. Пожалуйста, используйте один из следующих вариантов: ${arrayOfSizes.join(' | ')}`, 'log');
}
const warnImageBaseBadge = (0, _warnOnce.warnOnce)('ImageBase.Badge');
function validateBadgeIcon(imageSize, iconProp) {
    if (imageSize < 24 && iconProp) {
        return warnImageBaseBadge('Не используйте бейдж при `size < 24`.', 'log');
    }
    validateIconComponentSizeByImageSize(imageSize, iconProp, _helpers.getBadgeIconSizeByImageBaseSize, warnImageBaseBadge);
}
const warnImageBaseOverlay = (0, _warnOnce.warnOnce)('ImageBase.Overlay');
function validateOverlayIcon(imageSize, iconProp) {
    validateIconComponentSizeByImageSize(imageSize, iconProp, _helpers.getOverlayIconSizeByImageBaseSize, warnImageBaseOverlay);
}

//# sourceMappingURL=validators.js.map