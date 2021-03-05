"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.shouldForwardProp = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _styledEngine = _interopRequireDefault(require("@material-ui/styled-engine"));

var _styles = require("@material-ui/styles");

var _system = require("@material-ui/system");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

const getVariantStyles = (name, theme) => {
  let variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};
  variants.forEach(definition => {
    const key = (0, _styles.propsToClassKey)(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;

  const {
    styleProps = {}
  } = props;
  let variantsStyles = {};
  const themeVariants = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$nam = _theme$components[name]) === null || _theme$components$nam === void 0 ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(themeVariant => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach(key => {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles = (0, _extends2.default)({}, variantsStyles, styles[(0, _styles.propsToClassKey)(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
};

const shouldForwardProp = prop => prop !== 'styleProps' && prop !== 'theme' && prop !== 'isRtl' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';

exports.shouldForwardProp = shouldForwardProp;

const lowercaseFirstLetter = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const experimentalStyled = (tag, options, muiOptions = {}) => {
  const componentName = muiOptions.name;
  const componentSlot = muiOptions.slot;
  const overridesResolver = muiOptions.overridesResolver;
  const skipVariantsResolver = muiOptions.skipVariantsResolver || false;
  const skipSx = muiOptions.skipSx || false;
  let displayName;
  let className;

  if (componentName) {
    displayName = `${componentName}${componentSlot || ''}`;
    className = `${componentName}-${lowercaseFirstLetter(componentSlot || 'Root')}`;
  }

  const defaultStyledResolver = (0, _styledEngine.default)(tag, (0, _extends2.default)({
    shouldForwardProp,
    label: className || componentName || ''
  }, options));

  const muiStyledResolver = (styleArg, ...expressions) => {
    const expressionsWithDefaultTheme = expressions ? expressions.map(stylesArg => {
      return typeof stylesArg === 'function' ? (_ref) => {
        let {
          theme: themeInput
        } = _ref,
            other = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["theme"]);
        return stylesArg((0, _extends2.default)({
          theme: isEmpty(themeInput) ? _defaultTheme.default : themeInput
        }, other));
      } : stylesArg;
    }) : [];
    let transformedStyleArg = styleArg;

    if (componentName && overridesResolver) {
      expressionsWithDefaultTheme.push(props => {
        const theme = isEmpty(props.theme) ? _defaultTheme.default : props.theme;
        const styleOverrides = getStyleOverrides(componentName, theme);

        if (styleOverrides) {
          return overridesResolver(props, styleOverrides);
        }

        return null;
      });
    }

    if (componentName && overridesResolver && !skipVariantsResolver) {
      expressionsWithDefaultTheme.push(props => {
        const theme = isEmpty(props.theme) ? _defaultTheme.default : props.theme;
        return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
      });
    }

    if (!skipSx) {
      expressionsWithDefaultTheme.push(props => {
        const theme = isEmpty(props.theme) ? _defaultTheme.default : props.theme;
        return (0, _system.unstable_styleFunctionSx)((0, _extends2.default)({}, props, {
          theme
        }));
      });
    }

    const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

    if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
      const placeholders = new Array(numOfCustomFnsApplied).fill(''); // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles

      transformedStyleArg = [...styleArg, ...placeholders];
      transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
    } else if (typeof styleArg === 'function') {
      // If the type is function, we need to define the default theme
      transformedStyleArg = (_ref2) => {
        let {
          theme: themeInput
        } = _ref2,
            other = (0, _objectWithoutPropertiesLoose2.default)(_ref2, ["theme"]);
        return styleArg((0, _extends2.default)({
          theme: isEmpty(themeInput) ? _defaultTheme.default : themeInput
        }, other));
      };
    }

    const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);

    if (displayName) {
      Component.displayName = displayName;
    }

    return Component;
  };

  return muiStyledResolver;
};

var _default = experimentalStyled;
exports.default = _default;