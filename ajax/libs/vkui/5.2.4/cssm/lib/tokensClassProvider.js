import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { generateVKUITokensClassName } from '../helpers/generateVKUITokensClassName';
export var TokensClassProvider = function TokensClassProvider(_ref) {
  var children = _ref.children,
    platform = _ref.platform,
    appearance = _ref.appearance;
  return /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.map(children, function (child) {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      return /*#__PURE__*/React.cloneElement(child, {
        className: classNames(child.props.className, generateVKUITokensClassName(platform, appearance))
      });
    }
    return child;
  }));
};
//# sourceMappingURL=tokensClassProvider.js.map