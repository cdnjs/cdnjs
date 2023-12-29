import { getNodeScroll, getScrollHeight, getScrollRect } from '../../lib/dom';
import { rafSchd } from '../../lib/rafSchd';
const SCROLL_SPEED = 10;
export const EDGE_SIZE = 50;
export const OUTBOX_OFFSET = -30;
export const getAutoScrollingData = (clientY, scrollEl)=>{
    const scrollTop = Math.floor(getNodeScroll(scrollEl).scrollTop);
    const { relative, edges } = getScrollRect(scrollEl);
    const viewportHeight = relative.height;
    const documentHeight = getScrollHeight(scrollEl);
    const maxScrollY = documentHeight - viewportHeight;
    const canScrollUp = scrollTop > 0;
    const canScrollDown = scrollTop < maxScrollY;
    const [edgeTop, edgeBottom] = edges.y;
    const topDistance = clientY - edgeTop;
    const bottomDistance = edgeBottom - clientY;
    const isInTopEdge = topDistance <= EDGE_SIZE;
    const isInBottomEdge = bottomDistance <= EDGE_SIZE;
    const result = {
        shouldScrolling: canScrollUp && isInTopEdge && topDistance >= OUTBOX_OFFSET || canScrollDown && isInBottomEdge && bottomDistance >= OUTBOX_OFFSET,
        y: 0
    };
    // Inspired by https://github.com/SortableJS/Sortable/issues/1907#issuecomment-1495403785
    if (isInTopEdge) {
        result.y = -1 * ((EDGE_SIZE - topDistance) / EDGE_SIZE) * SCROLL_SPEED;
    } else if (isInBottomEdge) {
        result.y = (EDGE_SIZE - bottomDistance) / EDGE_SIZE * SCROLL_SPEED;
    }
    return result;
};
export const createAutoScrollController = (scrollEl)=>{
    let isRunning = false;
    const scheduledScroll = rafSchd(scroll);
    function scroll(fn) {
        const { shouldScrolling, y } = fn();
        if (shouldScrolling) {
            isRunning = true;
            scrollEl.scrollBy(0, y);
            scheduledScroll(fn);
        } else {
            isRunning = false;
            scheduledScroll.cancel();
        }
    }
    const tryAutoScroll = (fn)=>{
        scheduledScroll(fn);
    };
    const stop = ()=>{
        isRunning = false;
        scheduledScroll.cancel();
    };
    return {
        tryAutoScroll,
        stop,
        get isRunning () {
            return isRunning;
        }
    };
};

//# sourceMappingURL=autoScroll.js.map