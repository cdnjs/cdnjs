import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["height", "style"];
import * as React from 'react';
import { Spinner } from '../Spinner/Spinner';
/**
 * @see https://vkcom.github.io/VKUI/#/PanelSpinner
 */
export var PanelSpinner = /*#__PURE__*/React.memo(function (_ref) {
  var _ref$height = _ref.height,
    height = _ref$height === void 0 ? 96 : _ref$height,
    style = _ref.style,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Spinner, _extends({
    size: "regular"
  }, restProps, {
    style: _objectSpread({
      height: height
    }, style)
  }));
});
PanelSpinner.displayName = 'PanelSpinner';
//# sourceMappingURL=PanelSpinner.js.map