import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import styled from '@material-ui/styled-engine';
import { propsToClassKey } from '@material-ui/styles';
import { unstable_styleFunctionSx as styleFunctionSx } from '@material-ui/system';
import defaultTheme from './defaultTheme';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

var getStyleOverrides = function getStyleOverrides(name, theme) {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }

  return null;
};

var getVariantStyles = function getVariantStyles(name, theme) {
  var variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  var variantsStyles = {};
  variants.forEach(function (definition) {
    var key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

var variantsResolver = function variantsResolver(props, styles, theme, name) {
  var _theme$components, _theme$components$nam;

  var _props$styleProps = props.styleProps,
      styleProps = _props$styleProps === void 0 ? {} : _props$styleProps;
  var variantsStyles = {};
  var themeVariants = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$nam = _theme$components[name]) === null || _theme$components$nam === void 0 ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(function (themeVariant) {
      var isMatch = true;
      Object.keys(themeVariant.props).forEach(function (key) {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles = _extends({}, variantsStyles, styles[propsToClassKey(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
};

export var shouldForwardProp = function shouldForwardProp(prop) {
  return prop !== 'styleProps' && prop !== 'theme' && prop !== 'isRtl' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';
};

var lowercaseFirstLetter = function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

var experimentalStyled = function experimentalStyled(tag, options) {
  var muiOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var componentName = muiOptions.name;
  var componentSlot = muiOptions.slot;
  var overridesResolver = muiOptions.overridesResolver;
  var skipVariantsResolver = muiOptions.skipVariantsResolver || false;
  var skipSx = muiOptions.skipSx || false;
  var displayName;
  var className;

  if (componentName) {
    displayName = "".concat(componentName).concat(componentSlot || '');
    className = "".concat(componentName, "-").concat(lowercaseFirstLetter(componentSlot || 'Root'));
  }

  var defaultStyledResolver = styled(tag, _extends({
    shouldForwardProp: shouldForwardProp,
    label: className || componentName || ''
  }, options));

  var muiStyledResolver = function muiStyledResolver(styleArg) {
    for (var _len = arguments.length, expressions = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      expressions[_key - 1] = arguments[_key];
    }

    var expressionsWithDefaultTheme = expressions ? expressions.map(function (stylesArg) {
      return typeof stylesArg === 'function' ? function (_ref) {
        var themeInput = _ref.theme,
            other = _objectWithoutProperties(_ref, ["theme"]);

        return stylesArg(_extends({
          theme: isEmpty(themeInput) ? defaultTheme : themeInput
        }, other));
      } : stylesArg;
    }) : [];
    var transformedStyleArg = styleArg;

    if (componentName && overridesResolver) {
      expressionsWithDefaultTheme.push(function (props) {
        var theme = isEmpty(props.theme) ? defaultTheme : props.theme;
        var styleOverrides = getStyleOverrides(componentName, theme);

        if (styleOverrides) {
          return overridesResolver(props, styleOverrides);
        }

        return null;
      });
    }

    if (componentName && overridesResolver && !skipVariantsResolver) {
      expressionsWithDefaultTheme.push(function (props) {
        var theme = isEmpty(props.theme) ? defaultTheme : props.theme;
        return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
      });
    }

    if (!skipSx) {
      expressionsWithDefaultTheme.push(function (props) {
        var theme = isEmpty(props.theme) ? defaultTheme : props.theme;
        return styleFunctionSx(_extends({}, props, {
          theme: theme
        }));
      });
    }

    var numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;

    if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
      var placeholders = new Array(numOfCustomFnsApplied).fill(''); // If the type is array, than we need to add placeholders in the template for the overrides, variants and the sx styles

      transformedStyleArg = [].concat(_toConsumableArray(styleArg), _toConsumableArray(placeholders));
      transformedStyleArg.raw = [].concat(_toConsumableArray(styleArg.raw), _toConsumableArray(placeholders));
    } else if (typeof styleArg === 'function') {
      // If the type is function, we need to define the default theme
      transformedStyleArg = function transformedStyleArg(_ref2) {
        var themeInput = _ref2.theme,
            other = _objectWithoutProperties(_ref2, ["theme"]);

        return styleArg(_extends({
          theme: isEmpty(themeInput) ? defaultTheme : themeInput
        }, other));
      };
    }

    var Component = defaultStyledResolver.apply(void 0, [transformedStyleArg].concat(_toConsumableArray(expressionsWithDefaultTheme)));

    if (displayName) {
      Component.displayName = displayName;
    }

    return Component;
  };

  return muiStyledResolver;
};

export default experimentalStyled;