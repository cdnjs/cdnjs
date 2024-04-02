import { getOverflowAncestors } from '../../lib/floating';
const swipeBackExcludedSelector = 'input, textarea, [data-vkui-swipe-back=false]';
export function swipeBackExcluded(e) {
    var _target_closest;
    const target = e.originalEvent.target;
    // eslint-disable-next-line no-restricted-properties
    return Boolean(target === null || target === void 0 ? void 0 : (_target_closest = target.closest) === null || _target_closest === void 0 ? void 0 : _target_closest.call(target, swipeBackExcludedSelector));
}
export function hasHorizontalScrollableElementWithScrolledToLeft(node) {
    return getOverflowAncestors(node).some((node)=>'scrollLeft' in node ? node.scrollLeft > 0 : false);
}
export const SWIPE_BACK_EDGE_SIZE_THRESHOLD = 20;
export const SWIPE_BACK_SHIFT_THRESHOLD = 10;
export const getSwipeBackPredicates = (startX, shiftX, innerWidth)=>{
    const swipedToOpposite = shiftX < 0;
    const swipeBackTriggered = shiftX >= SWIPE_BACK_SHIFT_THRESHOLD;
    const viewportStartEdgeTouched = startX <= SWIPE_BACK_EDGE_SIZE_THRESHOLD;
    const viewportEndEdgeTouched = startX >= innerWidth - SWIPE_BACK_EDGE_SIZE_THRESHOLD;
    return {
        swipedToOpposite,
        swipeBackTriggered,
        viewportStartEdgeTouched,
        viewportEndEdgeTouched
    };
};

//# sourceMappingURL=utils.js.map