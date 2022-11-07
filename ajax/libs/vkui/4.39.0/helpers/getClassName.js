import { platform } from "../lib/platform";
export function getClassName(base) {
  var osname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : platform();
  return "".concat(base, " ").concat(base, "--").concat(osname);
}
//# sourceMappingURL=getClassName.js.map