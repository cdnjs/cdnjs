"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppearance = void 0;

var React = _interopRequireWildcard(require("react"));

var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");

var useAppearance = function useAppearance() {
  return React.useContext(_ConfigProviderContext.ConfigProviderContext).appearance;
};

exports.useAppearance = useAppearance;
//# sourceMappingURL=useAppearance.js.map