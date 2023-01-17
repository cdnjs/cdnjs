import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["value", "getRootRef", "className"];
import * as React from 'react';
import { clamp } from '../../helpers/math';
import { classNames } from '@vkontakte/vkjs';
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;

/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */
export var Progress = function Progress(_ref) {
  var _ref$value = _ref.value,
    value = _ref$value === void 0 ? 0 : _ref$value,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-valuenow": value
  }, restProps, {
    role: "progressbar",
    "aria-valuemin": PROGRESS_MIN_VALUE,
    "aria-valuemax": PROGRESS_MAX_VALUE,
    ref: getRootRef,
    className: classNames("vkuiProgress", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiProgress__in",
    style: {
      width: "".concat(progress, "%")
    }
  }));
};
//# sourceMappingURL=Progress.js.map