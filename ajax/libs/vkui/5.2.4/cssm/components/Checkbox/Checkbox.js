import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["children", "className", "style", "getRootRef", "getRef", "description", "indeterminate", "defaultIndeterminate", "hoverMode", "activeMode", "hasHover", "hasActive", "focusVisibleMode", "onChange"];
var _sizeYClassNames;
import * as React from 'react';
import { Icon20CheckBoxIndetermanate, Icon20CheckBoxOff, Icon20CheckBoxOn, Icon24CheckBoxOff, Icon24CheckBoxOn } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { warnOnce } from '../../lib/warnOnce';
import { ACTIVE_EFFECT_DELAY, Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { VisuallyHiddenInput } from '../VisuallyHiddenInput/VisuallyHiddenInput';
import "./Checkbox.module.css";
var sizeYClassNames = (_sizeYClassNames = {
  none: "vkuiCheckbox--sizeY-none"
}, _defineProperty(_sizeYClassNames, SizeType.COMPACT, "vkuiCheckbox--sizeY-compact"), _defineProperty(_sizeYClassNames, SizeType.REGULAR, "vkuiCheckbox--sizeY-regular"), _sizeYClassNames);
var warn = warnOnce('Checkbox');

/**
 * @see https://vkcom.github.io/VKUI/#/Checkbox
 */
export var Checkbox = function Checkbox(_ref) {
  var children = _ref.children,
    className = _ref.className,
    style = _ref.style,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    description = _ref.description,
    indeterminate = _ref.indeterminate,
    defaultIndeterminate = _ref.defaultIndeterminate,
    hoverMode = _ref.hoverMode,
    activeMode = _ref.activeMode,
    hasHover = _ref.hasHover,
    hasActive = _ref.hasActive,
    focusVisibleMode = _ref.focusVisibleMode,
    onChange = _ref.onChange,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var inputRef = useExternRef(getRef);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  var _useAdaptivityConditi = useAdaptivityConditionalRender(),
    adaptiveSizeY = _useAdaptivityConditi.sizeY;
  React.useEffect(function () {
    var indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(indeterminateValue);
    }
  }, [defaultIndeterminate, indeterminate, inputRef]);
  var handleChange = React.useCallback(function (event) {
    if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
      inputRef.current.indeterminate = false;
    }
    if (indeterminate !== undefined && inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
    onChange && onChange(event);
  }, [defaultIndeterminate, indeterminate, restProps.checked, onChange, inputRef]);
  if (process.env.NODE_ENV === 'development') {
    if (defaultIndeterminate && restProps.defaultChecked) {
      warn('defaultIndeterminate и defaultChecked не могут быть true одновременно', 'error');
    }
    if (indeterminate && restProps.checked) {
      warn('indeterminate и checked не могут быть true одновременно', 'error');
    }
    if (restProps.defaultChecked && restProps.checked) {
      warn('defaultChecked и checked не могут быть true одновременно', 'error');
    }
  }
  return /*#__PURE__*/React.createElement(Tappable, {
    Component: "label",
    className: classNames("vkuiCheckbox", platform === Platform.VKCOM && "vkuiCheckbox--vkcom", sizeYClassNames[sizeY], !(hasReactNode(children) || hasReactNode(description)) && "vkuiCheckbox--simple", className),
    style: style,
    disabled: restProps.disabled,
    activeEffectDelay: platform === Platform.IOS ? 100 : ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef,
    hoverMode: hoverMode,
    activeMode: activeMode,
    hasHover: hasHover,
    hasActive: hasActive,
    focusVisibleMode: focusVisibleMode
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, _extends({}, restProps, {
    onChange: handleChange,
    type: "checkbox",
    className: "vkuiCheckbox__input",
    getRef: inputRef
  })), /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--on")
  }, platform === Platform.VKCOM ? /*#__PURE__*/React.createElement(Icon20CheckBoxOn, null) : /*#__PURE__*/React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/React.createElement(Icon20CheckBoxOn, {
    className: adaptiveSizeY.compact.className
  }), adaptiveSizeY.regular && /*#__PURE__*/React.createElement(Icon24CheckBoxOn, {
    className: adaptiveSizeY.regular.className
  }))), /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--off")
  }, platform === Platform.VKCOM ? /*#__PURE__*/React.createElement(Icon20CheckBoxOff, null) : /*#__PURE__*/React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/React.createElement(Icon20CheckBoxOff, {
    className: adaptiveSizeY.compact.className
  }), adaptiveSizeY.regular && /*#__PURE__*/React.createElement(Icon24CheckBoxOff, {
    className: adaptiveSizeY.regular.className
  }))), /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--indeterminate")
  }, platform === Platform.VKCOM ? /*#__PURE__*/React.createElement(Icon20CheckBoxIndetermanate, {
    width: 20,
    height: 20
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/React.createElement(Icon20CheckBoxIndetermanate, {
    className: adaptiveSizeY.compact.className,
    width: 20,
    height: 20
  }), adaptiveSizeY.regular && /*#__PURE__*/React.createElement(Icon20CheckBoxIndetermanate, {
    className: adaptiveSizeY.regular.className,
    width: 24,
    height: 24
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vkuiCheckbox__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCheckbox__children"
  }, children), hasReactNode(description) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiCheckbox__description"
  }, description)));
};
//# sourceMappingURL=Checkbox.js.map