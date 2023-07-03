import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
export var useDraggable = function(param) {
    var rootElRef = param.rootElRef, onDragFinish = param.onDragFinish;
    var _React_useState = _sliced_to_array(React.useState(false), 2), dragging = _React_useState[0], setDragging = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState([]), 2), siblings = _React_useState1[0], setSiblings = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState(0), 2), dragStartIndex = _React_useState2[0], setDragStartIndex = _React_useState2[1];
    var _React_useState3 = _sliced_to_array(React.useState(0), 2), dragEndIndex = _React_useState3[0], setDragEndIndex = _React_useState3[1];
    var _React_useState4 = _sliced_to_array(React.useState(0), 2), dragShift = _React_useState4[0], setDragShift = _React_useState4[1];
    var _React_useState5 = _sliced_to_array(React.useState(undefined), 2), dragDirection = _React_useState5[0], setDragDirection = _React_useState5[1];
    var onDragStart = function(event) {
        var _rootEl_parentElement;
        var rootEl = rootElRef.current;
        if (!rootEl) {
            return;
        }
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        setDragging(true);
        var _siblings = [];
        if ((_rootEl_parentElement = rootEl.parentElement) === null || _rootEl_parentElement === void 0 ? void 0 : _rootEl_parentElement.childNodes) {
            _siblings = Array.from(rootEl.parentElement.children);
        }
        var idx = _siblings.indexOf(rootEl);
        setDragStartIndex(idx);
        setDragEndIndex(idx);
        setSiblings(_siblings);
        setDragShift(0);
    };
    var onDragMove = function(event) {
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        var rootEl = rootElRef.current;
        if (rootEl) {
            rootEl.style.transform = "translateY(".concat(event.shiftY, "px)");
            var rootGesture = rootEl.getBoundingClientRect();
            setDragDirection(dragShift - event.shiftY < 0 ? "down" : "up");
            setDragShift(event.shiftY);
            setDragEndIndex(dragStartIndex);
            siblings.forEach(function(sibling, siblingIndex) {
                var siblingGesture = sibling.getBoundingClientRect();
                var siblingHalfHeight = siblingGesture.height / 2;
                var rootOverSibling = rootGesture.bottom > siblingGesture.top + siblingHalfHeight;
                var rootUnderSibling = rootGesture.top < siblingGesture.bottom - siblingHalfHeight;
                if (dragStartIndex < siblingIndex) {
                    if (rootOverSibling) {
                        if (dragDirection === "down") {
                            sibling.style.transform = "translateY(-100%)";
                        }
                        setDragEndIndex(function(dragEndIndex) {
                            return dragEndIndex + 1;
                        });
                    }
                    if (rootUnderSibling && dragDirection === "up") {
                        sibling.style.transform = "translateY(0)";
                    }
                } else if (dragStartIndex > siblingIndex) {
                    if (rootUnderSibling) {
                        if (dragDirection === "up") {
                            sibling.style.transform = "translateY(100%)";
                        }
                        setDragEndIndex(function(dragEndIndex) {
                            return dragEndIndex - 1;
                        });
                    }
                    if (rootOverSibling && dragDirection === "down") {
                        sibling.style.transform = "translateY(0)";
                    }
                }
            });
        }
    };
    var onDragEnd = function(event) {
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        var _ref = [
            dragStartIndex,
            dragEndIndex
        ], from = _ref[0], to = _ref[1];
        siblings.forEach(function(sibling) {
            sibling.style.transform = "";
        });
        setSiblings([]);
        setDragEndIndex(0);
        setDragStartIndex(0);
        setDragDirection(undefined);
        setDragShift(0);
        setDragging(false);
        onDragFinish && onDragFinish({
            from: from,
            to: to
        });
    };
    var useDraggableProps = {
        onDragStart: onDragStart,
        onDragMove: onDragMove,
        onDragEnd: onDragEnd,
        dragging: dragging
    };
    return useDraggableProps;
};

//# sourceMappingURL=useDraggable.js.map