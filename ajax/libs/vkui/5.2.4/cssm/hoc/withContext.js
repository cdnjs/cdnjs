import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import * as React from 'react';
export function withContext(Component, Ctx, prop) {
  function WithContext(props) {
    var context = React.useContext(Ctx);
    return /*#__PURE__*/React.createElement(Component, _extends({}, props, _defineProperty({}, prop, context)));
  }
  return WithContext;
}
//# sourceMappingURL=withContext.js.map