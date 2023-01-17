import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["getRef", "content", "children", "onShownChange", "shown", "showDelay", "hideDelay"];
import * as React from 'react';
import { Popper } from '../Popper/Popper';
import { useEventListener } from '../../hooks/useEventListener';
import { useTimeout } from '../../hooks/useTimeout';
import { usePatchChildrenRef } from '../../hooks/usePatchChildrenRef';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
export var HoverPopper = function HoverPopper(_ref) {
  var getRef = _ref.getRef,
    content = _ref.content,
    children = _ref.children,
    onShownChange = _ref.onShownChange,
    _shown = _ref.shown,
    _ref$showDelay = _ref.showDelay,
    showDelay = _ref$showDelay === void 0 ? 150 : _ref$showDelay,
    _ref$hideDelay = _ref.hideDelay,
    hideDelay = _ref$hideDelay === void 0 ? 150 : _ref$hideDelay,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useState = React.useState(_shown || false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    computedShown = _React$useState2[0],
    setComputedShown = _React$useState2[1];
  var shown = typeof _shown === 'boolean' ? _shown : computedShown;
  var setShown = function setShown(value) {
    if (typeof _shown !== 'boolean') {
      setComputedShown(value);
    }
    typeof onShownChange === 'function' && onShownChange(value);
  };
  var showTimeout = useTimeout(function () {
    setShown(true);
  }, showDelay);
  var hideTimeout = useTimeout(function () {
    setShown(false);
  }, hideDelay);
  var _usePatchChildrenRef = usePatchChildrenRef(children),
    _usePatchChildrenRef2 = _slicedToArray(_usePatchChildrenRef, 2),
    childRef = _usePatchChildrenRef2[0],
    child = _usePatchChildrenRef2[1];
  var onTargetEnter = function onTargetEnter() {
    hideTimeout.clear();
    showTimeout.set();
  };
  var onTargetLeave = function onTargetLeave() {
    showTimeout.clear();
    hideTimeout.set();
  };
  var targetEnterListener = useEventListener('pointerenter', onTargetEnter);
  var targetLeaveListener = useEventListener('pointerleave', onTargetLeave);
  useIsomorphicLayoutEffect(function () {
    if (childRef.current) {
      targetEnterListener.add(childRef.current);
      targetLeaveListener.add(childRef.current);
    }
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, child, shown && /*#__PURE__*/React.createElement(Popper, _extends({}, restProps, {
    onMouseOver: hideTimeout.clear,
    onMouseOut: onTargetLeave,
    getRef: getRef,
    targetRef: childRef
  }), content));
};
//# sourceMappingURL=HoverPopper.js.map