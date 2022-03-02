import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["getRef", "content", "children", "onShownChange", "shown"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { useDOM } from "../../lib/dom";
import { Popper } from "../Popper/Popper";
import { useExternRef } from "../../hooks/useExternRef";
import { useEventListener } from "../../hooks/useEventListener";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePatchChildrenRef } from "../../hooks/usePatchChildrenRef";
export var ClickPopper = function ClickPopper(_ref) {
  var getRef = _ref.getRef,
      content = _ref.content,
      children = _ref.children,
      onShownChange = _ref.onShownChange,
      _shown = _ref.shown,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _React$useState = React.useState(_shown || false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      computedShown = _React$useState2[0],
      setComputedShown = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      dropdownNode = _React$useState4[0],
      setPopperNode = _React$useState4[1];

  var shown = typeof _shown === "boolean" ? _shown : computedShown;

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var patchedPopperRef = useExternRef(setPopperNode, getRef);

  var _usePatchChildrenRef = usePatchChildrenRef(children),
      _usePatchChildrenRef2 = _slicedToArray(_usePatchChildrenRef, 2),
      childRef = _usePatchChildrenRef2[0],
      child = _usePatchChildrenRef2[1];

  var setShown = function setShown(value) {
    if (typeof _shown !== "boolean") {
      setComputedShown(value);
    }

    typeof onShownChange === "function" && onShownChange(value);
  };

  useGlobalEventListener(document, "click", function (e) {
    var _childRef$current;

    if (dropdownNode && !((_childRef$current = childRef.current) !== null && _childRef$current !== void 0 && _childRef$current.contains(e.target)) && !dropdownNode.contains(e.target)) {
      setShown(false);
    }
  });
  var targetClickEvent = useEventListener("click", function () {
    setShown(!shown);
  });
  React.useEffect(function () {
    if (childRef.current !== null) {
      targetClickEvent.add(childRef.current);
    }
  }, [childRef, targetClickEvent]);
  return createScopedElement(React.Fragment, null, child, shown && createScopedElement(Popper, _extends({}, restProps, {
    targetRef: childRef,
    getRef: patchedPopperRef
  }), content));
};
//# sourceMappingURL=ClickPopper.js.map