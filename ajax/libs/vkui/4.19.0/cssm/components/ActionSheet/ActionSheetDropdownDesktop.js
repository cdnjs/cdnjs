import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "toggleRef", "closing", "popupDirection", "onClose"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { useDOM } from "../../lib/dom";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { warnOnce } from "../../lib/warnOnce";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useEventListener } from "../../hooks/useEventListener";
import "./ActionSheet.css";
var warn = warnOnce('ActionSheet');

function getEl(ref) {
  return ref && 'current' in ref ? ref.current : ref;
}

export var ActionSheetDropdownDesktop = function ActionSheetDropdownDesktop(_ref) {
  var children = _ref.children,
      toggleRef = _ref.toggleRef,
      closing = _ref.closing,
      popupDirection = _ref.popupDirection,
      onClose = _ref.onClose,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useDOM = useDOM(),
      window = _useDOM.window,
      document = _useDOM.document;

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var elementRef = React.useRef();

  var _React$useState = React.useState({
    left: 0,
    top: 0,
    opacity: 0,
    pointerEvents: 'none'
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      dropdownStyles = _React$useState2[0],
      setDropdownStyles = _React$useState2[1];

  useIsomorphicLayoutEffect(function () {
    var toggleEl = getEl(toggleRef);

    if (!toggleEl) {
      if (process.env.NODE_ENV === 'development') {
        warn('toggleRef not passed');
      }

      return;
    }

    var toggleRect = toggleEl.getBoundingClientRect();
    var elementRect = elementRef.current.getBoundingClientRect();
    var isTop = popupDirection === 'top' || typeof popupDirection === 'function' && popupDirection(elementRef) === 'top';
    setDropdownStyles({
      left: toggleRect.left + toggleRect.width - elementRect.width + window.pageXOffset,
      top: toggleRect.top + window.pageYOffset + (isTop ? -elementRect.height : toggleRect.height)
    });
  }, [toggleRef]);
  var bodyClickListener = useEventListener('click', function (e) {
    var dropdownElement = elementRef === null || elementRef === void 0 ? void 0 : elementRef.current;

    if (dropdownElement && !dropdownElement.contains(e.target)) {
      onClose();
    }
  });
  React.useEffect(function () {
    setTimeout(function () {
      bodyClickListener.add(document.body);
    });
  }, []);
  return createScopedElement("div", _extends({}, restProps, {
    ref: elementRef,
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: dropdownStyles,
    vkuiClass: classNames(getClassName('ActionSheet', platform), 'ActionSheet--desktop', {
      'ActionSheet--closing': closing
    }, "ActionSheet--sizeY-".concat(sizeY))
  }), children);
};
//# sourceMappingURL=ActionSheetDropdownDesktop.js.map