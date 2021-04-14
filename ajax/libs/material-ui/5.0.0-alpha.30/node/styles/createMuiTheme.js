"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _createBreakpoints = _interopRequireDefault(require("./createBreakpoints"));

var _createMixins = _interopRequireDefault(require("./createMixins"));

var _createPalette = _interopRequireDefault(require("./createPalette"));

var _createTypography = _interopRequireDefault(require("./createTypography"));

var _shadows = _interopRequireDefault(require("./shadows"));

var _shape = _interopRequireDefault(require("./shape"));

var _createSpacing = _interopRequireDefault(require("./createSpacing"));

var _transitions = require("./transitions");

var _zIndex = _interopRequireDefault(require("./zIndex"));

function createMuiTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    typography: typographyInput = {}
  } = options,
        other = (0, _objectWithoutPropertiesLoose2.default)(options, ["breakpoints", "mixins", "palette", "spacing", "typography"]);
  const palette = (0, _createPalette.default)(paletteInput);
  const breakpoints = (0, _createBreakpoints.default)(breakpointsInput);
  const spacing = (0, _createSpacing.default)(spacingInput);
  let muiTheme = (0, _utils.deepmerge)({
    breakpoints,
    direction: 'ltr',
    mixins: (0, _createMixins.default)(breakpoints, spacing, mixinsInput),
    components: {},
    // Inject component definitions
    palette,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: _shadows.default.slice(),
    typography: (0, _createTypography.default)(palette, typographyInput),
    spacing,
    shape: (0, _extends2.default)({}, _shape.default),
    transitions: {
      duration: _transitions.duration,
      easing: _transitions.easing,
      create: _transitions.create,
      getAutoHeightDuration: _transitions.getAutoHeightDuration
    },
    zIndex: (0, _extends2.default)({}, _zIndex.default)
  }, other);
  muiTheme = args.reduce((acc, argument) => (0, _utils.deepmerge)(acc, argument), muiTheme);

  if (process.env.NODE_ENV !== 'production') {
    const pseudoClasses = ['active', 'checked', 'disabled', 'error', 'focused', 'focusVisible', 'required', 'expanded', 'selected'];

    const traverse = (node, component) => {
      let key; // eslint-disable-next-line guard-for-in, no-restricted-syntax

      for (key in node) {
        const child = node[key];

        if (pseudoClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (process.env.NODE_ENV !== 'production') {
            const pseudoClass = (0, _unstyled.generateUtilityClass)('', key);
            console.error([`Material-UI: The \`${component}\` component increases ` + `the CSS specificity of the \`${key}\` internal state.`, 'You can not override it like this: ', JSON.stringify(node, null, 2), '', `Instead, you need to use the '&.${pseudoClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${pseudoClass}`]: child
              }
            }, null, 2), '', 'https://material-ui.com/r/pseudo-classes-guide'].join('\n'));
          } // Remove the style to prevent global conflicts.


          node[key] = {};
        }
      }
    };

    Object.keys(muiTheme.components).forEach(component => {
      const styleOverrides = muiTheme.components[component].styleOverrides;

      if (styleOverrides && component.indexOf('Mui') === 0) {
        traverse(styleOverrides, component);
      }
    });
  }

  return muiTheme;
}

var _default = createMuiTheme;
exports.default = _default;