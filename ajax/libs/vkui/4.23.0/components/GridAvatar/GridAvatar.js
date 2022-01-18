import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["src", "size", "shadow"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Avatar, { AVATAR_DEFAULT_SHADOW, AVATAR_DEFAULT_SIZE } from "../Avatar/Avatar";
import { classNames } from "../../lib/classNames";
import { warnOnce } from "../../lib/warnOnce";
var MIN_GRID_LENGTH = 1;
var MAX_GRID_LENGTH = 4;
var warn = warnOnce('GridAvatar');
export var GridAvatar = function GridAvatar(_ref) {
  var _ref$src = _ref.src,
      src = _ref$src === void 0 ? [] : _ref$src,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? AVATAR_DEFAULT_SIZE : _ref$size,
      _ref$shadow = _ref.shadow,
      shadow = _ref$shadow === void 0 ? AVATAR_DEFAULT_SHADOW : _ref$shadow,
      restProps = _objectWithoutProperties(_ref, _excluded);

  if (process.env.NODE_ENV === 'development' && src.length > MAX_GRID_LENGTH) {
    warn("\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0440\u043E\u043F\u0430 src (".concat(src.length, ") \u0431\u043E\u043B\u044C\u0448\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0433\u043E (").concat(MAX_GRID_LENGTH, ")"));
  }

  var count = Math.max(MIN_GRID_LENGTH, Math.min(MAX_GRID_LENGTH, src.length));
  return createScopedElement(Avatar, _extends({}, restProps, {
    vkuiClass: classNames('GridAvatar', "GridAvatar--images-".concat(count)),
    shadow: shadow,
    size: size
  }), createScopedElement("div", {
    vkuiClass: "GridAvatar__in"
  }, src.slice(0, MAX_GRID_LENGTH).map(function (src, i) {
    return createScopedElement("div", {
      key: i,
      vkuiClass: "GridAvatar__item",
      style: {
        backgroundImage: "url(".concat(src, ")")
      }
    });
  })));
};
//# sourceMappingURL=GridAvatar.js.map