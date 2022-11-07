"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppearance = void 0;

var React = _interopRequireWildcard(require("react"));

var _AppearanceProviderContext = require("../components/AppearanceProvider/AppearanceProviderContext");

var useAppearance = function useAppearance() {
  return React.useContext(_AppearanceProviderContext.AppearanceProviderContext);
};

exports.useAppearance = useAppearance;
//# sourceMappingURL=useAppearance.js.map