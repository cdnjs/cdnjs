import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
export var getTargetIsOverOrUnderElData = function(clientY, elRect) {
    var elRectHalfHeight = elRect.height / 2;
    return {
        isUnderEl: clientY <= elRect.bottom - elRectHalfHeight,
        isOverEl: clientY >= elRect.top + elRectHalfHeight
    };
};
export var setDraggingItemShiftStyles = function(draggingEl, nextShiftY) {
    requestAnimationFrame(function() {
        draggingEl.style.transform = "translateY(".concat(nextShiftY, "px)");
    });
};
export var setSiblingItemsShiftStyles = function(param) {
    var _param = _sliced_to_array(param, 2), _param_ = _param[0], el = _param_.el, height = _param_.draggingElRect.height, direction = _param[1];
    requestAnimationFrame(function() {
        if (direction === "up") {
            el.style.setProperty("transition", "transform 0.3s ease-in 0s");
            el.style.removeProperty("transform");
        } else {
            el.style.setProperty("transition", "transform 0.3s ease-out 0s");
            el.style.setProperty("transform", "translateY(".concat(height, "px)"));
        }
    });
};
export var setInitialDraggingItemStyles = function(param) {
    var el = param.el, draggingElRect = param.draggingElRect;
    var top = draggingElRect.top, left = draggingElRect.left, width = draggingElRect.width, height = draggingElRect.height;
    requestAnimationFrame(function() {
        // Inspired by https://github.com/hello-pangea/dnd
        el.style.setProperty("pointer-events", "none");
        el.style.setProperty("position", "fixed");
        el.style.setProperty("top", "".concat(top, "px"));
        el.style.setProperty("left", "".concat(left, "px"));
        el.style.setProperty("width", "".concat(width, "px"));
        el.style.setProperty("height", "".concat(height, "px"));
        el.style.setProperty("z-index", "var(--vkui_internal--z_index_cell_dragging)");
        el.style.setProperty("box-sizing", "border-box");
        el.style.setProperty("transform", "translateY(0)");
    });
};
export var unsetInitialDraggingItemStyles = function(param) {
    var el = param.el;
    requestAnimationFrame(function() {
        el.style.removeProperty("pointer-events");
        el.style.removeProperty("position");
        el.style.removeProperty("top");
        el.style.removeProperty("left");
        el.style.removeProperty("width");
        el.style.removeProperty("height");
        el.style.removeProperty("z-index");
        el.style.removeProperty("box-sizing");
        el.style.removeProperty("transform");
    });
};
export var setInitialPlaceholderItemStyles = function(param) {
    var el = param.el, draggingElRect = param.draggingElRect;
    if (el.firstElementChild) {
        return;
    }
    var width = draggingElRect.width, height = draggingElRect.height;
    var node = el.cloneNode();
    node.style.setProperty("display", "block");
    node.style.setProperty("width", "".concat(width, "px"));
    node.style.setProperty("height", "".concat(height, "px"));
    node.style.setProperty("pointer-events", "none");
    el.appendChild(node);
};
export var unsetInitialPlaceholderItemStyles = function(param) {
    var el = param.el;
    if (el.firstElementChild) {
        el.firstElementChild.remove();
    }
};
export var setInitialSiblingItemStyles = function(param) {
    var el = param.el, shifted = param.shifted, draggingElRect = param.draggingElRect;
    var height = draggingElRect.height;
    requestAnimationFrame(function() {
        el.style.setProperty("pointer-events", "none");
        el.style.setProperty("transition", "none 0s ease 0s");
        if (shifted) {
            el.style.setProperty("transform", "translateY(".concat(height, "px)"));
        }
    });
};
export var unsetInitialSiblingItemStyles = function(param) {
    var el = param.el;
    requestAnimationFrame(function() {
        el.style.removeProperty("pointer-events");
        el.style.removeProperty("transition");
        el.style.removeProperty("transform");
    });
};

//# sourceMappingURL=utils.js.map