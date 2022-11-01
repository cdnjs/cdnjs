import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["hasMouse"];
import * as React from "react";
import { hasMouse as _hasMouse } from "@vkontakte/vkjs";
import { AdaptivityContext } from "../components/AdaptivityProvider/AdaptivityContext";
export var useAdaptivity = function useAdaptivity() {
  var _React$useContext = React.useContext(AdaptivityContext),
    hasMouseContext = _React$useContext.hasMouse,
    adaptivity = _objectWithoutProperties(_React$useContext, _excluded);
  var _React$useState = React.useState(hasMouseContext),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hasMouse = _React$useState2[0],
    setHasMouse = _React$useState2[1];

  // определение hasMouse в @vkontakte/vkjs происходит через window.matchMedia
  // чтобы не было ошибок при гидрации определяем значение после первого рендера
  React.useEffect(function () {
    if (hasMouseContext !== undefined) {
      setHasMouse(hasMouseContext);
    } else {
      setHasMouse(_hasMouse);
    }
  }, [hasMouseContext]);
  return _objectSpread({
    hasMouse: hasMouse
  }, adaptivity);
};
//# sourceMappingURL=useAdaptivity.js.map