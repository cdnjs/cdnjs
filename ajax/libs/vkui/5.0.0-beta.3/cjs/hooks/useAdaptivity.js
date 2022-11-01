"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivity = void 0;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
var _excluded = ["hasMouse"];
var useAdaptivity = function useAdaptivity() {
  var _React$useContext = React.useContext(_AdaptivityContext.AdaptivityContext),
    hasMouseContext = _React$useContext.hasMouse,
    adaptivity = (0, _objectWithoutProperties2.default)(_React$useContext, _excluded);
  var _React$useState = React.useState(hasMouseContext),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    hasMouse = _React$useState2[0],
    setHasMouse = _React$useState2[1];

  // определение hasMouse в @vkontakte/vkjs происходит через window.matchMedia
  // чтобы не было ошибок при гидрации определяем значение после первого рендера
  React.useEffect(function () {
    if (hasMouseContext !== undefined) {
      setHasMouse(hasMouseContext);
    } else {
      setHasMouse(_vkjs.hasMouse);
    }
  }, [hasMouseContext]);
  return (0, _objectSpread2.default)({
    hasMouse: hasMouse
  }, adaptivity);
};
exports.useAdaptivity = useAdaptivity;
//# sourceMappingURL=useAdaptivity.js.map