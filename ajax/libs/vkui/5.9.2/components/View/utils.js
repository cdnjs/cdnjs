import { getOverflowAncestors } from "../../lib/floating";
var swipeBackExcludedSelector = "input, textarea, [data-vkui-swipe-back=false]";
export function swipeBackExcluded(e) {
    var _target_closest;
    var target = e.originalEvent.target;
    // eslint-disable-next-line no-restricted-properties
    return Boolean(target === null || target === void 0 ? void 0 : (_target_closest = target.closest) === null || _target_closest === void 0 ? void 0 : _target_closest.call(target, swipeBackExcludedSelector));
}
export function hasHorizontalScrollableElementWithScrolledToLeft(node) {
    return getOverflowAncestors(node).some(function(node) {
        return "scrollLeft" in node ? node.scrollLeft > 0 : false;
    });
}
export var SWIPE_BACK_EDGE_SIZE_THRESHOLD = 20;
export var SWIPE_BACK_SHIFT_THRESHOLD = 10;
export var getSwipeBackPredicates = function(startX, shiftX, innerWidth) {
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