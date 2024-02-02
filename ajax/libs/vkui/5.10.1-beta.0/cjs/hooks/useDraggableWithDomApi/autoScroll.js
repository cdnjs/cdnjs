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
var _sliced_to_array = require("@swc/helpers/_/_sliced_to_array");
var _dom = require("../../lib/dom");
var _rafSchd = require("../../lib/rafSchd");
var SCROLL_SPEED = 10;
var EDGE_SIZE = 50;
var OUTBOX_OFFSET = -30;
var getAutoScrollingData = function(clientY, scrollEl) {
    var scrollTop = Math.floor((0, _dom.getNodeScroll)(scrollEl).scrollTop);
    var _getScrollRect = (0, _dom.getScrollRect)(scrollEl), relative = _getScrollRect.relative, edges = _getScrollRect.edges;
    var viewportHeight = relative.height;
    var documentHeight = (0, _dom.getScrollHeight)(scrollEl);
    var maxScrollY = documentHeight - viewportHeight;
    var canScrollUp = scrollTop > 0;
    var canScrollDown = scrollTop < maxScrollY;
    var _edges_y = _sliced_to_array._(edges.y, 2), edgeTop = _edges_y[0], edgeBottom = _edges_y[1];
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
var createAutoScrollController = function(scrollEl) {
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
    var scheduledScroll = (0, _rafSchd.rafSchd)(scroll);
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