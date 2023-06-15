export var Scheme;
(function (Scheme) {
  Scheme["BRIGHT_LIGHT"] = "bright_light";
  Scheme["SPACE_GRAY"] = "space_gray";
  Scheme["VKCOM_LIGHT"] = "vkcom_light";
  Scheme["VKCOM_DARK"] = "vkcom_dark";
})(Scheme || (Scheme = {}));
export var Appearance;
(function (Appearance) {
  Appearance["DARK"] = "dark";
  Appearance["LIGHT"] = "light";
})(Appearance || (Appearance = {}));
export var deriveAppearance = function deriveAppearance(scheme) {
  return scheme === Scheme.SPACE_GRAY || scheme === Scheme.VKCOM_DARK ? 'dark' : 'light';
};
export function resolveAppearance(data) {
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