"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdaptivity = void 0;
var React = _interopRequireWildcard(require("react"));
var _AdaptivityContext = require("../components/AdaptivityProvider/AdaptivityContext");
/**
 * Возвращает сырые данные из AdaptivityProvider.
 */
var useAdaptivity = function useAdaptivity() {
  return React.useContext(_AdaptivityContext.AdaptivityContext);
};
exports.useAdaptivity = useAdaptivity;
//# sourceMappingURL=useAdaptivity.js.map