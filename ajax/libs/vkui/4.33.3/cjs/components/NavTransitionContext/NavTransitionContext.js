"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNavTransition = exports.NavTransitionProvider = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var React = _interopRequireWildcard(require("react"));

var _useObjectMemo = require("../../hooks/useObjectMemo");

var TransitionContext = /*#__PURE__*/React.createContext({
  entering: false
});

var useNavTransition = function useNavTransition() {
  return React.useContext(TransitionContext);
};

exports.useNavTransition = useNavTransition;

var NavTransitionProvider = function NavTransitionProvider(_ref) {
  var children = _ref.children,
      entering = _ref.entering;
  var parentContext = useNavTransition();
  var contextValue = (0, _useObjectMemo.useObjectMemo)({
    entering: parentContext.entering || entering
  });
  return (0, _jsxRuntime.createScopedElement)(TransitionContext.Provider, {
    value: contextValue
  }, children);
};

exports.NavTransitionProvider = NavTransitionProvider;
//# sourceMappingURL=NavTransitionContext.js.map