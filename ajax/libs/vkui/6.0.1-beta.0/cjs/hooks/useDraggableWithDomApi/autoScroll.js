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
    EDGE_SIZE: function() {
        return EDGE_SIZE;
    },
    OUTBOX_OFFSET: function() {
        return OUTBOX_OFFSET;
    },
    createAutoScrollController: function() {
        return createAutoScrollController;
    },
    getAutoScrollingData: function() {
        return getAutoScrollingData;
    }
});
const _dom = require("../../lib/dom");
const _rafSchd = require("../../lib/rafSchd");
const SCROLL_SPEED = 10;
const EDGE_SIZE = 50;
const OUTBOX_OFFSET = -30;
const getAutoScrollingData = (clientY, scrollEl)=>{
    const scrollTop = Math.floor((0, _dom.getNodeScroll)(scrollEl).scrollTop);
    const { relative, edges } = (0, _dom.getScrollRect)(scrollEl);
    const viewportHeight = relative.height;
    const documentHeight = (0, _dom.getScrollHeight)(scrollEl);
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
const createAutoScrollController = (scrollEl)=>{
    let isRunning = false;
    const scheduledScroll = (0, _rafSchd.rafSchd)(scroll);
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