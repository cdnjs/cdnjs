"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSplitCol = exports.SplitColContext = void 0;
var React = _interopRequireWildcard(require("react"));
var SplitColContext = /*#__PURE__*/React.createContext({
  colRef: null,
  animate: true
});
exports.SplitColContext = SplitColContext;
var useSplitCol = function useSplitCol() {
  return React.useContext(SplitColContext);
};
exports.useSplitCol = useSplitCol;
//# sourceMappingURL=SplitColContext.js.map