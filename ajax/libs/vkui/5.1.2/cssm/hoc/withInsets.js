import _extends from "@babel/runtime/helpers/extends";
import * as React from 'react';
import { useInsets } from '../hooks/useInsets';
export function withInsets(Component) {
  function WithInsets(props) {
    var insets = useInsets();
    return /*#__PURE__*/React.createElement(Component, _extends({}, props, {
      insets: insets
    }));
  }
  return WithInsets;
}
//# sourceMappingURL=withInsets.js.map