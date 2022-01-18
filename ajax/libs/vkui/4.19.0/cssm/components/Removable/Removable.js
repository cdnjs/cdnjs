import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "onRemove", "removePlaceholder", "align"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { classNames } from "../../lib/classNames";
import { getTitleFromChildren } from "../../lib/utils";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useDOM } from "../../lib/dom";
import { ANDROID, IOS, VKCOM } from "../../lib/platform";
import { Icon24Cancel } from '@vkontakte/icons';
import IconButton from "../IconButton/IconButton";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import Tappable from "../Tappable/Tappable";
import "./Removable.css";
export var Removable = function Removable(_ref) {
  var children = _ref.children,
      onRemove = _ref.onRemove,
      _ref$removePlaceholde = _ref.removePlaceholder,
      removePlaceholder = _ref$removePlaceholde === void 0 ? 'Удалить' : _ref$removePlaceholde,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'center' : _ref$align,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var _useDOM = useDOM(),
      document = _useDOM.document;

  var removeButtonRef = React.useRef(null);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isRemoveActivated = _React$useState2[0],
      setRemoveActivated = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      removeOffset = _React$useState4[0],
      updateRemoveOffset = _React$useState4[1];

  useGlobalEventListener(document, 'click', isRemoveActivated && function () {
    setRemoveActivated(false);
    updateRemoveOffset(0);
  });

  var onRemoveTransitionEnd = function onRemoveTransitionEnd() {
    if (isRemoveActivated) {
      var _removeButtonRef$curr;

      removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef$curr = removeButtonRef.current) === null || _removeButtonRef$curr === void 0 ? void 0 : _removeButtonRef$curr.focus();
    }
  };

  var onRemoveActivateClick = function onRemoveActivateClick(e) {
    e.nativeEvent.stopPropagation();
    e.preventDefault();
    setRemoveActivated(true);
  };

  var onRemoveClick = function onRemoveClick(e) {
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    onRemove && onRemove(e);
  };

  React.useEffect(function () {
    var removeButton = removeButtonRef === null || removeButtonRef === void 0 ? void 0 : removeButtonRef.current;

    if (isRemoveActivated && removeButton) {
      updateRemoveOffset(removeButton.offsetWidth);
    }
  }, [isRemoveActivated]);
  var removePlaceholderString = getTitleFromChildren(removePlaceholder);
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('Removable', platform), "Removable--".concat(align), "Removable--sizeY-".concat(sizeY))
  }), (platform === ANDROID || platform === VKCOM) && createScopedElement("div", {
    vkuiClass: "Removable__content"
  }, children, createScopedElement(IconButton, {
    "aria-label": removePlaceholderString,
    vkuiClass: "Removable__action",
    onClick: onRemoveClick
  }, createScopedElement(Icon24Cancel, {
    role: "presentation"
  }))), platform === IOS && createScopedElement(React.Fragment, null, createScopedElement("div", {
    vkuiClass: "Removable__content",
    style: {
      transform: "translateX(-".concat(removeOffset, "px)")
    }
  }, createScopedElement(IconButton, {
    hasActive: false,
    hasHover: false,
    "aria-label": removePlaceholderString,
    vkuiClass: "Removable__action Removable__toggle",
    onClick: onRemoveActivateClick
  }, createScopedElement("i", {
    vkuiClass: "Removable__toggle-in",
    role: "presentation"
  })), children, createScopedElement("span", {
    vkuiClass: "Removable__offset",
    "aria-hidden": "true"
  })), createScopedElement(Tappable, {
    Component: "button",
    hasActive: false,
    hasHover: false,
    disabled: !isRemoveActivated,
    getRootRef: removeButtonRef,
    vkuiClass: "Removable__remove",
    onClick: onRemoveClick,
    onTransitionEnd: onRemoveTransitionEnd,
    style: {
      transform: "translateX(-".concat(removeOffset, "px)")
    }
  }, createScopedElement("span", {
    vkuiClass: "Removable__remove-in"
  }, removePlaceholder))));
};
//# sourceMappingURL=Removable.js.map