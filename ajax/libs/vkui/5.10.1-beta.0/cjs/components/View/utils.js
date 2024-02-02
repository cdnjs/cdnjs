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
    SWIPE_BACK_EDGE_SIZE_THRESHOLD: function() {
        return SWIPE_BACK_EDGE_SIZE_THRESHOLD;
    },
    SWIPE_BACK_SHIFT_THRESHOLD: function() {
        return SWIPE_BACK_SHIFT_THRESHOLD;
    },
    getSwipeBackPredicates: function() {
        return getSwipeBackPredicates;
    },
    hasHorizontalScrollableElementWithScrolledToLeft: function() {
        return hasHorizontalScrollableElementWithScrolledToLeft;
    },
    swipeBackExcluded: function() {
        return swipeBackExcluded;
    }
});
var _floating = require("../../lib/floating");
var swipeBackExcludedSelector = "input, textarea, [data-vkui-swipe-back=false]";
function swipeBackExcluded(e) {
    var _target_closest;
    var target = e.originalEvent.target;
    // eslint-disable-next-line no-restricted-properties
    return Boolean(target === null || target === void 0 ? void 0 : (_target_closest = target.closest) === null || _target_closest === void 0 ? void 0 : _target_closest.call(target, swipeBackExcludedSelector));
}
function hasHorizontalScrollableElementWithScrolledToLeft(node) {
    return (0, _floating.getOverflowAncestors)(node).some(function(node) {
        return "scrollLeft" in node ? node.scrollLeft > 0 : false;
    });
}
var SWIPE_BACK_EDGE_SIZE_THRESHOLD = 20;
var SWIPE_BACK_SHIFT_THRESHOLD = 10;
var getSwipeBackPredicates = function(startX, shiftX, innerWidth) {
    var swipedToOpposite = shiftX < 0;
    var swipeBackTriggered = shiftX >= SWIPE_BACK_SHIFT_THRESHOLD;
    var viewportStartEdgeTouched = startX <= SWIPE_BACK_EDGE_SIZE_THRESHOLD;
    var viewportEndEdgeTouched = startX >= innerWidth - SWIPE_BACK_EDGE_SIZE_THRESHOLD;
    return {
        swipedToOpposite: swipedToOpposite,
        swipeBackTriggered: swipeBackTriggered,
        viewportStartEdgeTouched: viewportStartEdgeTouched,
        viewportEndEdgeTouched: viewportEndEdgeTouched
    };
};

//# sourceMappingURL=utils.js.map