import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["height", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import Spinner from "../Spinner/Spinner";

var PanelSpinner = function PanelSpinner(_ref) {
  var height = _ref.height,
      style = _ref.style,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(Spinner, _extends({
    size: "regular"
  }, restProps, {
    style: _objectSpread({
      height: height
    }, style)
  }));
};

PanelSpinner.defaultProps = {
  height: 96
};
export default /*#__PURE__*/React.memo(PanelSpinner);
//# sourceMappingURL=PanelSpinner.js.map