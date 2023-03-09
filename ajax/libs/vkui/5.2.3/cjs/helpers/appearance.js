"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deriveAppearance = exports.Scheme = exports.Appearance = void 0;
exports.resolveAppearance = resolveAppearance;
var Scheme;
exports.Scheme = Scheme;
(function (Scheme) {
  Scheme["BRIGHT_LIGHT"] = "bright_light";
  Scheme["SPACE_GRAY"] = "space_gray";
  Scheme["VKCOM_LIGHT"] = "vkcom_light";
  Scheme["VKCOM_DARK"] = "vkcom_dark";
})(Scheme || (exports.Scheme = Scheme = {}));
var Appearance;
exports.Appearance = Appearance;
(function (Appearance) {
  Appearance["DARK"] = "dark";
  Appearance["LIGHT"] = "light";
})(Appearance || (exports.Appearance = Appearance = {}));
var deriveAppearance = function deriveAppearance(scheme) {
  return scheme === Scheme.SPACE_GRAY || scheme === Scheme.VKCOM_DARK ? 'dark' : 'light';
};
exports.deriveAppearance = deriveAppearance;
function resolveAppearance(data) {
  var scheme = data.scheme,
    appearance = data.appearance;

  // appearance пока приходит только на IOS и ANDROID
  if (appearance) {
    return appearance;
  }

  // Проверяем scheme если appearance не пришел
  return deriveAppearance(scheme);
}
//# sourceMappingURL=appearance.js.map