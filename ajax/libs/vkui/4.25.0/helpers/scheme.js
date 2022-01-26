import { VKCOM } from "../lib/platform";
import { warnOnce } from "../lib/warnOnce";
import { getScheme } from "./getScheme";
export var Scheme;

(function (Scheme) {
  Scheme["DEPRECATED_CLIENT_LIGHT"] = "client_light";
  Scheme["DEPRECATED_CLIENT_DARK"] = "client_dark";
  Scheme["VKCOM"] = "vkcom";
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

var warn = warnOnce("scheme");
export function normalizeScheme(_ref) {
  var platform = _ref.platform,
      scheme = _ref.scheme,
      appearance = _ref.appearance;

  if (appearance) {
    return getScheme({
      platform: platform,
      appearance: appearance
    });
  }

  if (scheme === "inherit") {
    return scheme;
  }

  if (scheme === Scheme.VKCOM) {
    process.env.NODE_ENV === "development" && warn("\u0421\u0445\u0435\u043C\u0430 \"".concat(Scheme.VKCOM, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u0430 \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u0430 5.0.0. \u0412\u043C\u0435\u0441\u0442\u043E \u043D\u0435\u0451 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \"").concat(Scheme.VKCOM_LIGHT, "\""));
    return Scheme.VKCOM_LIGHT;
  }

  if (platform === VKCOM && (scheme === Scheme.BRIGHT_LIGHT || scheme === Scheme.SPACE_GRAY)) {
    process.env.NODE_ENV === "development" && warn("\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \"vkcom\" \u0438 \u0441\u0445\u0435\u043C\u0430 \"".concat(scheme, "\" \u043D\u0435\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B. \u0421 \u044D\u0442\u043E\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0445\u0435\u043C\u044B \"").concat(Scheme.VKCOM_LIGHT, "\" \u0438\u043B\u0438 \"").concat(Scheme.VKCOM_DARK, "\""));
    return Scheme.VKCOM_LIGHT;
  }

  switch (scheme) {
    case Scheme.DEPRECATED_CLIENT_LIGHT:
      return Scheme.BRIGHT_LIGHT;

    case Scheme.DEPRECATED_CLIENT_DARK:
      return Scheme.SPACE_GRAY;

    default:
      return scheme;
  }
}
//# sourceMappingURL=scheme.js.map