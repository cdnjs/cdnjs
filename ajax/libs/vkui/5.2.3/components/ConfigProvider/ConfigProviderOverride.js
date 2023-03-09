import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import React from 'react';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { ConfigProviderContext, useConfigProvider } from './ConfigProviderContext';
/**
 * Компонент предназначен для перебивания одного из значений контекста
 */
export function ConfigProviderOverride(_ref) {
  var children = _ref.children,
    contextValue = _objectWithoutProperties(_ref, _excluded);
  var parentConfig = useConfigProvider();
  var configContext = useObjectMemo(_objectSpread(_objectSpread({}, parentConfig), contextValue));
  return /*#__PURE__*/React.createElement(ConfigProviderContext.Provider, {
    value: configContext
  }, children);
}
//# sourceMappingURL=ConfigProviderOverride.js.map