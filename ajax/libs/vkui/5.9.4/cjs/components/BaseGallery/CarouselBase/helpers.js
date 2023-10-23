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
    calculateIndent: function() {
        return calculateIndent;
    },
    calculateLoopPoints: function() {
        return calculateLoopPoints;
    },
    getLoopPoints: function() {
        return getLoopPoints;
    },
    getShiftedIndexes: function() {
        return getShiftedIndexes;
    },
    getTargetIndex: function() {
        return getTargetIndex;
    }
});
var _to_consumable_array = require("@swc/helpers/_/_to_consumable_array");
var _constants = require("./constants");
function calculateIndent(targetIndex, slidesManager, isCenterWithCustomWidth) {
    if (slidesManager.isFullyVisible || !slidesManager.slides.length) {
        return 0;
    }
    var targetSlide = slidesManager.slides[targetIndex];
    if (targetSlide) {
        var coordX = targetSlide.coordX, width = targetSlide.width;
        if (isCenterWithCustomWidth) {
            return slidesManager.viewportOffsetWidth / 2 - coordX - width / 2;
        }
        return -1 * coordX;
    }
    return 0;
}
function getShiftedIndexes(direction, slides, availableWidth) {
    var gap = availableWidth;
    var shiftedSlideIndexes = [];
    var startIndex = direction === 1 ? 0 : slides.length - 1;
    var endIndex = direction === 1 ? slides.length - 1 : 0;
    for(var i = startIndex; (direction === 1 ? i <= endIndex : i >= endIndex) && gap > 0; i += direction){
        var slideWidth = slides[i].width;
        if (gap > 0) {
            shiftedSlideIndexes.push(i);
        }
        gap -= slideWidth;
    }
    return shiftedSlideIndexes;
}
function calculateLoopPoints(indexes, edge, slidesManager, containerWidth) {
    var contentSize = slidesManager.contentSize, slides = slidesManager.slides, snaps = slidesManager.snaps;
    var isStartEdge = edge === "start";
    var offset = isStartEdge ? -contentSize : contentSize;
    return indexes.map(function(index) {
        var initial = isStartEdge ? 0 : -contentSize;
        var altered = isStartEdge ? contentSize : 0;
        var loopPoint = isStartEdge ? snaps[index] + containerWidth + offset : snaps[index] - slides[index].width + offset - snaps[0];
        return {
            index: index,
            target: function(currentLocation) {
                return currentLocation >= loopPoint ? initial : altered;
            }
        };
    });
}
function getLoopPoints(slidesManager, containerWidth) {
    var slides = slidesManager.slides, snaps = slidesManager.snaps;
    var startShiftedIndexes = getShiftedIndexes(-1, slides, snaps[0]);
    var endShiftedIndexes = getShiftedIndexes(1, slides, containerWidth - snaps[0]);
    return _to_consumable_array._(calculateLoopPoints(endShiftedIndexes, "start", slidesManager, containerWidth)).concat(_to_consumable_array._(calculateLoopPoints(startShiftedIndexes, "end", slidesManager, containerWidth)));
}
function getTargetIndex(slides, slideIndex, currentShiftX, currentShiftXDelta) {
    var shift = currentShiftX + currentShiftXDelta;
    var direction = currentShiftXDelta < 0 ? 1 : -1;
    // Находим ближайшую границу слайда к текущему отступу
    var targetIndex = slides.reduce(function(val, item, index) {
        var previousValue = Math.abs(slides[val].coordX + shift);
        var currentValue = Math.abs(item.coordX + shift);
        return previousValue < currentValue ? val : index;
    }, slideIndex);
    if (targetIndex === slideIndex) {
        var targetSlide = slideIndex + direction;
        if (targetSlide >= 0 && targetSlide < slides.length) {
            if (Math.abs(currentShiftXDelta) > slides[targetSlide].width * _constants.SLIDE_THRESHOLD) {
                return targetSlide;
            }
            return targetIndex;
        }
        return direction < 0 ? (targetSlide + slides.length) % slides.length : targetSlide % slides.length;
    }
    return targetIndex;
}

//# sourceMappingURL=helpers.js.map