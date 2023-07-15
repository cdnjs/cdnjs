import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["action", "shown", "showDelay", "hideDelay", "offsetDistance", "content", "children", "style", "getRef", "onShownChange"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { useDOM } from "../../lib/dom";
import { Popper } from "../Popper/Popper";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import { useTimeout } from "../../hooks/useTimeout";
import { useExternRef } from "../../hooks/useExternRef";
import { useEventListener } from "../../hooks/useEventListener";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePatchChildrenRef } from "../../hooks/usePatchChildrenRef";
/**
 * @see https://vkcom.github.io/VKUI/#/Dropdown
 *
 * TODO v5.0.0 Переименовать в `Popover` (см. https://github.com/VKCOM/VKUI/issues/2523)
 */
export var Dropdown = function Dropdown(_ref) {
  var _ref$action = _ref.action,
    action = _ref$action === void 0 ? "click" : _ref$action,
    shownProp = _ref.shown,
    _ref$showDelay = _ref.showDelay,
    showDelay = _ref$showDelay === void 0 ? 150 : _ref$showDelay,
    _ref$hideDelay = _ref.hideDelay,
    hideDelay = _ref$hideDelay === void 0 ? 150 : _ref$hideDelay,
    _ref$offsetDistance = _ref.offsetDistance,
    offsetDistance = _ref$offsetDistance === void 0 ? 8 : _ref$offsetDistance,
    content = _ref.content,
    children = _ref.children,
    style = _ref.style,
    getRef = _ref.getRef,
    onShownChange = _ref.onShownChange,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useDOM = useDOM(),
    document = _useDOM.document;
  var hoverable = action === "hover";
  var hovered = React.useRef(false);
  var _React$useState = React.useState(shownProp || false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    computedShown = _React$useState2[0],
    setComputedShown = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    dropdownNode = _React$useState4[0],
    setPopperNode = _React$useState4[1];

  // Reason: Typescript ругается на CSS Custom Properties в объекте
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  var styles = _objectSpread(_objectSpread({}, style), {}, {
    "--popover-safe-zone-padding": "".concat(offsetDistance, "px")
  });
  var shown = typeof shownProp === "boolean" ? shownProp : computedShown;
  var patchedPopperRef = useExternRef(setPopperNode, getRef);
  var _usePatchChildrenRef = usePatchChildrenRef(children),
    _usePatchChildrenRef2 = _slicedToArray(_usePatchChildrenRef, 2),
    childRef = _usePatchChildrenRef2[0],
    child = _usePatchChildrenRef2[1];
  var setShown = function setShown(value) {
    if (typeof shownProp !== "boolean") {
      setComputedShown(value);
    }
    typeof onShownChange === "function" && onShownChange(value);
  };
  var showTimeout = useTimeout(function () {
    return setShown(true);
  }, showDelay);
  var hideTimeout = useTimeout(function () {
    return setShown(false);
  }, hideDelay);
  var handleTargetEnter = function handleTargetEnter() {
    hovered.current = true;
    hideTimeout.clear();
    showTimeout.set();
  };
  var handleTargetClick = function handleTargetClick() {
    if (hovered.current && shown) {
      return;
    }
    setShown(!shown);
  };
  var handleTargetLeave = function handleTargetLeave() {
    hovered.current = false;
    showTimeout.clear();
    hideTimeout.set();
  };
  var handleContentKeyDownEscape = function handleContentKeyDownEscape() {
    setShown(false);
  };
  var handleOutsideClick = function handleOutsideClick(e) {
    var _childRef$current;
    if (dropdownNode && !((_childRef$current = childRef.current) !== null && _childRef$current !== void 0 && _childRef$current.contains(e.target)) && !dropdownNode.contains(e.target)) {
      setShown(false);
    }
  };
  useGlobalEventListener(document, "click", handleOutsideClick, {
    capture: true,
    passive: true
  });
  var targetEnterListener = useEventListener("mouseenter", handleTargetEnter);
  var targetClickEvent = useEventListener("click", handleTargetClick);
  var targetLeaveListener = useEventListener("mouseleave", handleTargetLeave);
  React.useEffect(function () {
    if (!childRef.current) {
      return;
    }
    targetClickEvent.add(childRef.current);
    if (hoverable) {
      targetEnterListener.add(childRef.current);
      targetLeaveListener.add(childRef.current);
    }
  }, [childRef, hoverable, targetClickEvent, targetEnterListener, targetLeaveListener]);
  return createScopedElement(React.Fragment, null, child, shown && createScopedElement(Popper, _extends({}, restProps, {
    vkuiClass: "Dropdown",
    targetRef: childRef,
    getRef: patchedPopperRef,
    offsetDistance: offsetDistance,
    style: styles,
    renderContent: function renderContent(_ref2) {
      var className = _ref2.className;
      return createScopedElement(FocusTrap, {
        vkuiClass: className,
        onClose: handleContentKeyDownEscape
      }, content);
    },
    onMouseOver: hoverable ? hideTimeout.clear : undefined,
    onMouseOut: hoverable ? handleTargetLeave : undefined
  })));
};
//# sourceMappingURL=Dropdown.js.map