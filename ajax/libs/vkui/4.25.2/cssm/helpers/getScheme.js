import { VKCOM } from "../lib/platform";
import { Scheme } from "./scheme";
export function getScheme(_ref) {
  var platform = _ref.platform,
      appearance = _ref.appearance;

  switch (appearance) {
    case "dark":
      switch (platform) {
        case VKCOM:
          return Scheme.VKCOM_DARK;

        default:
          return Scheme.SPACE_GRAY;
      }

    case "light":
      switch (platform) {
        case VKCOM:
          return Scheme.VKCOM_LIGHT;

        default:
          return Scheme.BRIGHT_LIGHT;
      }

  }
}
//# sourceMappingURL=getScheme.js.map