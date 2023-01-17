import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import * as React from 'react';
export var useDraggable = function useDraggable(_ref) {
  var rootElRef = _ref.rootElRef,
    onDragFinish = _ref.onDragFinish;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    dragging = _React$useState2[0],
    setDragging = _React$useState2[1];
  var _React$useState3 = React.useState([]),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    siblings = _React$useState4[0],
    setSiblings = _React$useState4[1];
  var _React$useState5 = React.useState(0),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    dragStartIndex = _React$useState6[0],
    setDragStartIndex = _React$useState6[1];
  var _React$useState7 = React.useState(0),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    dragEndIndex = _React$useState8[0],
    setDragEndIndex = _React$useState8[1];
  var _React$useState9 = React.useState(0),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    dragShift = _React$useState10[0],
    setDragShift = _React$useState10[1];
  var _React$useState11 = React.useState(undefined),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    dragDirection = _React$useState12[0],
    setDragDirection = _React$useState12[1];
  var onDragStart = function onDragStart() {
    var _rootEl$parentElement;
    var rootEl = rootElRef.current;
    if (!rootEl) {
      return;
    }
    setDragging(true);
    var _siblings = [];
    if ((_rootEl$parentElement = rootEl.parentElement) !== null && _rootEl$parentElement !== void 0 && _rootEl$parentElement.childNodes) {
      _siblings = Array.from(rootEl.parentElement.children);
    }
    var idx = _siblings.indexOf(rootEl);
    setDragStartIndex(idx);
    setDragEndIndex(idx);
    setSiblings(_siblings);
    setDragShift(0);
  };
  var onDragMove = function onDragMove(e) {
    e.originalEvent.preventDefault();
    var rootEl = rootElRef.current;
    if (rootEl) {
      rootEl.style.transform = "translateY(".concat(e.shiftY, "px)");
      var rootGesture = rootEl.getBoundingClientRect();
      setDragDirection(dragShift - e.shiftY < 0 ? 'down' : 'up');
      setDragShift(e.shiftY);
      setDragEndIndex(dragStartIndex);
      siblings.forEach(function (sibling, siblingIndex) {
        var siblingGesture = sibling.getBoundingClientRect();
        var siblingHalfHeight = siblingGesture.height / 2;
        var rootOverSibling = rootGesture.bottom > siblingGesture.top + siblingHalfHeight;
        var rootUnderSibling = rootGesture.top < siblingGesture.bottom - siblingHalfHeight;
        if (dragStartIndex < siblingIndex) {
          if (rootOverSibling) {
            if (dragDirection === 'down') {
              sibling.style.transform = 'translateY(-100%)';
            }
            setDragEndIndex(function (dragEndIndex) {
              return dragEndIndex + 1;
            });
          }
          if (rootUnderSibling && dragDirection === 'up') {
            sibling.style.transform = 'translateY(0)';
          }
        } else if (dragStartIndex > siblingIndex) {
          if (rootUnderSibling) {
            if (dragDirection === 'up') {
              sibling.style.transform = 'translateY(100%)';
            }
            setDragEndIndex(function (dragEndIndex) {
              return dragEndIndex - 1;
            });
          }
          if (rootOverSibling && dragDirection === 'down') {
            sibling.style.transform = 'translateY(0)';
          }
        }
      });
    }
  };
  var onDragEnd = function onDragEnd() {
    var from = dragStartIndex,
      to = dragEndIndex;
    siblings.forEach(function (sibling) {
      sibling.style.transform = '';
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