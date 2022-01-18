import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getClassName } from "../../helpers/getClassName";
import { Icon24Spinner, Icon32Spinner, Icon44Spinner, Icon16Spinner } from '@vkontakte/icons';
import { usePlatform } from "../../hooks/usePlatform";

var Spinner = function Spinner(_ref) {
  var size = _ref.size,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var SpinnerIcon = Icon24Spinner;

  if (size === 'large') {
    SpinnerIcon = Icon44Spinner;
  }

  if (size === 'medium') {
    SpinnerIcon = Icon32Spinner;
  }

  if (size === 'small') {
    SpinnerIcon = Icon16Spinner;
  }

  return createScopedElement("span", _extends({
    role: "status"
  }, restProps, {
    vkuiClass: getClassName('Spinner', platform)
  }), createScopedElement(SpinnerIcon, {
    "aria-hidden": "true",
    vkuiClass: "Spinner__self"
  }));
};

Spinner.defaultProps = {
  'size': 'regular',
  'aria-label': 'Загружается...'
};
export default /*#__PURE__*/React.memo(Spinner);
//# sourceMappingURL=Spinner.js.map