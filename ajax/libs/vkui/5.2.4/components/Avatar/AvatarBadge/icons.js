import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["width", "height"],
  _excluded2 = ["width", "height"];
import * as React from 'react';
import { Icon12Circle as Icon12CircleLib, Icon12OnlineMobile as Icon12OnlineMobileLib } from '@vkontakte/icons';
export var Icon12Circle = function Icon12Circle(_ref) {
  var _ref$width = _ref.width,
    width = _ref$width === void 0 ? 12 : _ref$width,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? 12 : _ref$height,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Icon12CircleLib, _extends({}, restProps, {
    width: width >= 24 ? 15 : 12,
    height: height >= 24 ? 15 : 12
  }));
};
export var Icon12OnlineMobile = function Icon12OnlineMobile(_ref2) {
  var _ref2$width = _ref2.width,
    width = _ref2$width === void 0 ? 8 : _ref2$width,
    _ref2$height = _ref2.height,
    height = _ref2$height === void 0 ? 12 : _ref2$height,
    restProps = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement(Icon12OnlineMobileLib, _extends({}, restProps, {
    width: width >= 24 ? 9 : 8,
    height: height >= 24 ? 15 : 12
  }));
};
//# sourceMappingURL=icons.js.map