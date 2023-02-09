"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BREAKPOINTS", {
  enumerable: true,
  get: function get() {
    return _breakpoints.BREAKPOINTS;
  }
});
Object.defineProperty(exports, "MEDIA_QUERIES", {
  enumerable: true,
  get: function get() {
    return _breakpoints.MEDIA_QUERIES;
  }
});
exports.ViewWidth = exports.ViewHeight = exports.SizeType = void 0;
var _breakpoints = require("../../shared/breakpoints");
/**
 * Public API.
 * Брейкпоинты на ширину.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
var ViewWidth;
/**
 * Public API.
 * Брейкпоинт на высоту.
 *
 * > Note: Используется порядковый номер вместо значений в пикселях... ¯\_(ツ)_/¯
 */
exports.ViewWidth = ViewWidth;
(function (ViewWidth) {
  ViewWidth[ViewWidth["SMALL_MOBILE"] = 1] = "SMALL_MOBILE";
  ViewWidth[ViewWidth["MOBILE"] = 2] = "MOBILE";
  ViewWidth[ViewWidth["SMALL_TABLET"] = 3] = "SMALL_TABLET";
  ViewWidth[ViewWidth["TABLET"] = 4] = "TABLET";
  ViewWidth[ViewWidth["DESKTOP"] = 5] = "DESKTOP";
})(ViewWidth || (exports.ViewWidth = ViewWidth = {}));
var ViewHeight;
/**
 * Public API.
 * Классы размеров. Заимствованы из гайдлайнов Apple.
 *
 * Ссылки
 * - {@link https://www.figma.com/file/2sQl2eaxsp7RDRdMOeneEC/%F0%9F%92%A0-VKUI-Common-Library-%5BBeta%5D?node-id=3220%3A0 | Figma VKUI – Адаптивность}
 * - {@link https://developer.apple.com/design/human-interface-guidelines/foundations/layout/ | Layout - Foundations - Human Interface Guidelines - Design}
 */
exports.ViewHeight = ViewHeight;
(function (ViewHeight) {
  ViewHeight[ViewHeight["EXTRA_SMALL"] = 1] = "EXTRA_SMALL";
  ViewHeight[ViewHeight["SMALL"] = 2] = "SMALL";
  ViewHeight[ViewHeight["MEDIUM"] = 3] = "MEDIUM";
})(ViewHeight || (exports.ViewHeight = ViewHeight = {}));
var SizeType;
exports.SizeType = SizeType;
(function (SizeType) {
  SizeType["COMPACT"] = "compact";
  SizeType["REGULAR"] = "regular";
})(SizeType || (exports.SizeType = SizeType = {}));
//# sourceMappingURL=constants.js.map