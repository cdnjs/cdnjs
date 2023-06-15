import * as React from 'react';
import { useObjectMemo } from '../../hooks/useObjectMemo';
var TransitionContext = /*#__PURE__*/React.createContext({
  entering: false
});
export var useNavTransition = function useNavTransition() {
  return React.useContext(TransitionContext);
};
export var NavTransitionProvider = function NavTransitionProvider(_ref) {
  var children = _ref.children,
    entering = _ref.entering;
  var parentContext = useNavTransition();
  var contextValue = useObjectMemo({
    entering: parentContext.entering || entering
  });
  return /*#__PURE__*/React.createElement(TransitionContext.Provider, {
    value: contextValue
  }, children);
};
//# sourceMappingURL=NavTransitionContext.js.map