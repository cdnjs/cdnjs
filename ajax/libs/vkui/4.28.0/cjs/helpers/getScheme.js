"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScheme = getScheme;

var _platform = require("../lib/platform");

var _scheme = require("./scheme");

function getScheme(_ref) {
  var platform = _ref.platform,
      appearance = _ref.appearance;

  switch (appearance) {
    case "dark":
      switch (platform) {
        case _platform.VKCOM:
          return _scheme.Scheme.VKCOM_DARK;

        default:
          return _scheme.Scheme.SPACE_GRAY;
      }

    case "light":
      switch (platform) {
        case _platform.VKCOM:
          return _scheme.Scheme.VKCOM_LIGHT;

        default:
          return _scheme.Scheme.BRIGHT_LIGHT;
      }

  }
}
//# sourceMappingURL=getScheme.js.map