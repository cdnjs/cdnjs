import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "name", "options", "getRootRef", "defaultValue", "children", "className", "onChange", "value"],
  _excluded2 = ["label", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
import { useId } from '../../hooks/useId';
import { warnOnce } from '../../lib/warnOnce';
import { SegmentedControlOption } from './SegmentedControlOption/SegmentedControlOption';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { useCustomEnsuredControl } from '../../hooks/useEnsuredControl';
var warn = warnOnce('SegmentedControl');

/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */
export var SegmentedControl = function SegmentedControl(_ref) {
  var _options$;
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'l' : _ref$size,
    name = _ref.name,
    options = _ref.options,
    getRootRef = _ref.getRootRef,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? (_options$ = options[0]) === null || _options$ === void 0 ? void 0 : _options$.value : _ref$defaultValue,
    children = _ref.children,
    className = _ref.className,
    onChangeProp = _ref.onChange,
    valueProp = _ref.value,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var id = useId();
  var _useCustomEnsuredCont = useCustomEnsuredControl({
      onChange: onChangeProp,
      value: valueProp,
      defaultValue: defaultValue
    }),
    _useCustomEnsuredCont2 = _slicedToArray(_useCustomEnsuredCont, 2),
    value = _useCustomEnsuredCont2[0],
    _onChange = _useCustomEnsuredCont2[1];
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var _React$useState = React.useState(0),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeOptionIdx = _React$useState2[0],
    updateActiveOptionIdx = _React$useState2[1];
  useIsomorphicLayoutEffect(function () {
    var _activeOptionIdx = options.findIndex(function (option) {
      return option.value === value;
    });
    if (_activeOptionIdx === -1 && process.env.NODE_ENV === 'development') {
      warn('defaultValue: такого значения нет среди опций!', 'error');
    }
    updateActiveOptionIdx(_activeOptionIdx);
  }, [value, options]);
  var translateX = "translateX(".concat(100 * activeOptionIdx, "%)");
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiSegmentedControl", getSizeYClassName("vkuiSegmentedControl", sizeY), styles["SegmentedControl--size-".concat(size)], className),
    ref: getRootRef
  }), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    className: "vkuiSegmentedControl__in"
  }, activeOptionIdx > -1 && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    className: "vkuiSegmentedControl__slider",
    style: {
      width: "".concat(100 / options.length, "%"),
      transform: translateX,
      WebkitTransform: translateX
    }
  }), options.map(function (_ref2) {
    var label = _ref2.label,
      optionClassName = _ref2.className,
      optionProps = _objectWithoutProperties(_ref2, _excluded2);
    return /*#__PURE__*/React.createElement(SegmentedControlOption, _extends({
      key: "".concat(optionProps.value)
    }, optionProps, {
      className: classNames("vkuiSegmentedControl__option", optionClassName),
      name: name !== null && name !== void 0 ? name : id,
      checked: value === optionProps.value,
      onChange: function onChange() {
        return _onChange(optionProps.value);
      }
    }), label);
  })));
};
var styles = {
  "SegmentedControl--size-l": "vkuiSegmentedControl--size-l",
  "SegmentedControl--size-m": "vkuiSegmentedControl--size-m"
};
//# sourceMappingURL=SegmentedControl.js.map