/**
 * Возвращает размер иконки основанный на дизайн-системы.
 *
 * @param imageSize наименьшая сторона изображения
 */ "use strict";
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
    getBadgeIconSizeByImageBaseSize: function() {
        return getBadgeIconSizeByImageBaseSize;
    },
    getFallbackIconSizeByImageBaseSize: function() {
        return getFallbackIconSizeByImageBaseSize;
    },
    getOverlayIconSizeByImageBaseSize: function() {
        return getOverlayIconSizeByImageBaseSize;
    }
});
function getFallbackIconSizeByImageBaseSize(imageSize) {
    if (imageSize <= 20) {
        return 12;
    } else if (imageSize > 20 && imageSize <= 28) {
        return 16;
    } else if (imageSize > 28 && imageSize <= 32) {
        return 20;
    } else if (imageSize > 32 && imageSize <= 44) {
        return 24;
    } else if (imageSize > 44 && imageSize <= 64) {
        return 28;
    }
    return getFallbackIconSizeByImageBaseSize.MAX_SIZE;
}
getFallbackIconSizeByImageBaseSize.MAX_SIZE = 36;
function getBadgeIconSizeByImageBaseSize(imageSize) {
    if (imageSize <= 36) {
        return 12;
    } else if (imageSize > 36 && imageSize <= 48) {
        return 16;
    } else if (imageSize > 48 && imageSize <= 64) {
        return 20;
    }
    return getBadgeIconSizeByImageBaseSize.MAX_SIZE;
}
getBadgeIconSizeByImageBaseSize.MAX_SIZE = 24;
function getOverlayIconSizeByImageBaseSize(imageSize) {
    if (imageSize <= 20) {
        return 12;
    } else if (imageSize > 20 && imageSize <= 24) {
        return 16;
    } else if (imageSize > 24 && imageSize <= 28) {
        return 18;
    } else if (imageSize > 28 && imageSize <= 40) {
        return 20;
    } else if (imageSize > 40 && imageSize <= 48) {
        return 24;
    } else if (imageSize > 48 && imageSize <= 88) {
        return 28;
    }
    return getOverlayIconSizeByImageBaseSize.MAX_SIZE;
}
getOverlayIconSizeByImageBaseSize.MAX_SIZE = 32;

//# sourceMappingURL=helpers.js.map