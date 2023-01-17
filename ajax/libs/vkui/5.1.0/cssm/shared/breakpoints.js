/**
 * Храним брейкпоинты в JS файле для синхронизации значений между TS и CSS.
 *
 * @type {{
 *  DESKTOP: 1280,
 *  TABLET: 1024,
 *  SMALL_TABLET: 768,
 *  MOBILE: 320,
 *  MOBILE_LANDSCAPE_HEIGHT: 414,
 *  MEDIUM_HEIGHT: 720
 * }}
 */
var BREAKPOINTS = {
  DESKTOP: 1280,
  TABLET: 1024,
  SMALL_TABLET: 768,
  MOBILE: 320,
  MOBILE_LANDSCAPE_HEIGHT: 414,
  MEDIUM_HEIGHT: 720
};
var MEDIA_QUERIES = {
  DESKTOP_PLUS: "(min-width: ".concat(BREAKPOINTS.DESKTOP, "px)"),
  TABLET: "(min-width: ".concat(BREAKPOINTS.TABLET, "px) and (max-width: ").concat(BREAKPOINTS.DESKTOP - 1, "px)"),
  // prettier-ignore

  SMALL_TABLET_PLUS: "(min-width: ".concat(BREAKPOINTS.SMALL_TABLET, "px)"),
  SMALL_TABLET: "(min-width: ".concat(BREAKPOINTS.SMALL_TABLET, "px) and (max-width: ").concat(BREAKPOINTS.TABLET - 1, "px)"),
  // prettier-ignore

  MOBILE: "(min-width: ".concat(BREAKPOINTS.MOBILE, "px) and (max-width: ").concat(BREAKPOINTS.SMALL_TABLET - 1, "px)"),
  // prettier-ignore

  MEDIUM_HEIGHT: "(min-height: ".concat(BREAKPOINTS.MEDIUM_HEIGHT, "px)"),
  MOBILE_LANDSCAPE_HEIGHT: "(min-height: ".concat(BREAKPOINTS.MOBILE_LANDSCAPE_HEIGHT + 1, "px)") // prettier-ignore
};

module.exports = {
  BREAKPOINTS: BREAKPOINTS,
  MEDIA_QUERIES: MEDIA_QUERIES
};
//# sourceMappingURL=breakpoints.js.map