import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
var _excluded = ["getRootRef", "children", "onRemove", "removePlaceholder", "align", "className"];
import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { getTitleFromChildren } from '../../lib/utils';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useDOM } from '../../lib/dom';
import { Platform } from '../../lib/platform';
import { Icon24Cancel } from '@vkontakte/icons';
import { IconButton } from '../IconButton/IconButton';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { Tappable } from '../Tappable/Tappable';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import "./Removable.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/RemovableIos
 */
var RemovableIos = function RemovableIos(_ref) {
  var onRemove = _ref.onRemove,
    removePlaceholder = _ref.removePlaceholder,
    removePlaceholderString = _ref.removePlaceholderString,
    children = _ref.children;
  var _useDOM = useDOM(),
    window = _useDOM.window;
  var removeButtonRef = React.useRef(null);
  var disabledRef = React.useRef(true);
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    removeOffset = _React$useState2[0],
    updateRemoveOffset = _React$useState2[1];
  useGlobalEventListener(window, 'click', function () {
    if (removeOffset > 0) {
      updateRemoveOffset(0);
    }
  }, {
    capture: true
  });
  var onRemoveTransitionEnd = function onRemoveTransitionEnd() {
    if (removeOffset > 0) {
      var _removeButtonRef$curr;
      removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef$curr = removeButtonRef.current) === null || _removeButtonRef$curr === void 0 ? void 0 : _removeButtonRef$curr.focus();
    } else {
      disabledRef.current = true;
    }
  };
  var onRemoveActivateClick = function onRemoveActivateClick(e) {
    e.stopPropagation();
    if (!removeButtonRef.current) {
      return;
    }
    var offsetWidth = removeButtonRef.current.offsetWidth;
    disabledRef.current = false;
    updateRemoveOffset(offsetWidth);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "vkuiRemovable__content",
    style: {
      transform: "translateX(-".concat(removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0, "px)")
    },
    onTransitionEnd: onRemoveTransitionEnd
  }, /*#__PURE__*/React.createElement(IconButton, {
    hasActive: false,
    hasHover: false,
    "aria-label": removePlaceholderString,
    className: classNames("vkuiRemovable__action", "vkuiRemovable__toggle"),
    onClick: onRemoveActivateClick,
    disabled: removeOffset > 0
  }, /*#__PURE__*/React.createElement("i", {
    className: "vkuiRemovable__toggle-in",
    role: "presentation"
  })), children, /*#__PURE__*/React.createElement("span", {
    className: "vkuiRemovable__offset",
    "aria-hidden": true
  }), /*#__PURE__*/React.createElement(Tappable, {
    Component: "button",
    hasActive: false,
    hasHover: false,
    disabled: disabledRef.current,
    getRootRef: removeButtonRef,
    className: "vkuiRemovable__remove",
    onClick: onRemove
  }, /*#__PURE__*/React.createElement("span", {
    className: "vkuiRemovable__remove-in"
  }, removePlaceholder)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Removable
 */
export var Removable = function Removable(_ref2) {
  var getRootRef = _ref2.getRootRef,
    children = _ref2.children,
    _ref2$onRemove = _ref2.onRemove,
    onRemove = _ref2$onRemove === void 0 ? noop : _ref2$onRemove,
    _ref2$removePlacehold = _ref2.removePlaceholder,
    removePlaceholder = _ref2$removePlacehold === void 0 ? 'Удалить' : _ref2$removePlacehold,
    _ref2$align = _ref2.align,
    align = _ref2$align === void 0 ? 'center' : _ref2$align,
    className = _ref2.className,
    restProps = _objectWithoutProperties(_ref2, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var ref = useExternRef(getRootRef);
  var onRemoveClick = function onRemoveClick(e) {
    e.preventDefault();
    onRemove(e);
  };
  var removePlaceholderString = getTitleFromChildren(removePlaceholder);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: ref,
    className: classNames("vkuiRemovable", platform === Platform.IOS && "vkuiRemovable--ios", styles["Removable--align-".concat(align)], getSizeYClassName("vkuiRemovable", sizeY), className)
  }), platform !== Platform.IOS && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRemovable__content"
  }, children, /*#__PURE__*/React.createElement(IconButton, {
    activeMode: "opacity",
    hoverMode: "opacity",
    className: "vkuiRemovable__action",
    onClick: onRemoveClick,
    "aria-label": removePlaceholderString
  }, /*#__PURE__*/React.createElement(Icon24Cancel, {
    role: "presentation"
  })), /*#__PURE__*/React.createElement("span", {
    className: "vkuiRemovable__offset",
    "aria-hidden": true
  })), platform === Platform.IOS && /*#__PURE__*/React.createElement(RemovableIos, {
    onRemove: onRemoveClick,
    removePlaceholder: removePlaceholder,
    removePlaceholderString: removePlaceholderString
  }, children));
};
var styles = {
  "Removable--align-start": "vkuiRemovable--align-start",
  "Removable--align-center": "vkuiRemovable--align-center"
};
//# sourceMappingURL=Removable.js.map