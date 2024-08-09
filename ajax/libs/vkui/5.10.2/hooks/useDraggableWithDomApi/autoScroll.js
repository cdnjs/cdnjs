import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { getNodeScroll, getScrollHeight, getScrollRect } from "../../lib/dom";
import { rafSchd } from "../../lib/rafSchd";
var SCROLL_SPEED = 10;
export var EDGE_SIZE = 50;
export var OUTBOX_OFFSET = -30;
export var getAutoScrollingData = function(clientY, scrollEl) {
    var scrollTop = Math.floor(getNodeScroll(scrollEl).scrollTop);
    var _getScrollRect = getScrollRect(scrollEl), relative = _getScrollRect.relative, edges = _getScrollRect.edges;
    var viewportHeight = relative.height;
    var documentHeight = getScrollHeight(scrollEl);
    var maxScrollY = documentHeight - viewportHeight;
    var canScrollUp = scrollTop > 0;
    var canScrollDown = scrollTop < maxScrollY;
    var _edges_y = _sliced_to_array(edges.y, 2), edgeTop = _edges_y[0], edgeBottom = _edges_y[1];
    var topDistance = clientY - edgeTop;
    var bottomDistance = edgeBottom - clientY;
    var isInTopEdge = topDistance <= EDGE_SIZE;
    var isInBottomEdge = bottomDistance <= EDGE_SIZE;
    var result = {
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
export var createAutoScrollController = function(scrollEl) {
    var scroll = function scroll(fn) {
        var _fn = fn(), shouldScrolling = _fn.shouldScrolling, y = _fn.y;
        if (shouldScrolling) {
            isRunning = true;
            scrollEl.scrollBy(0, y);
            scheduledScroll(fn);
        } else {
            isRunning = false;
            scheduledScroll.cancel();
        }
    };
    var isRunning = false;
    var scheduledScroll = rafSchd(scroll);
    var tryAutoScroll = function(fn) {
        scheduledScroll(fn);
    };
    var stop = function() {
        isRunning = false;
        scheduledScroll.cancel();
    };
    return {
        tryAutoScroll: tryAutoScroll,
        stop: stop,
        get isRunning () {
            return isRunning;
        }
    };
};

//# sourceMappingURL=autoScroll.js.map