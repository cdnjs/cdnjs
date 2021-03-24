import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import * as React from 'react';
import PropTypes from 'prop-types';
import { createUnarySpacing, getValue, handleBreakpoints, unstable_extendSxProp as extendSxProp } from '@material-ui/system';
import { deepmerge } from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */

import { jsx as _jsx } from "react/jsx-runtime";

function joinChildren(children, separator) {
  var childrenArray = React.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce(function (output, child, index) {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push( /*#__PURE__*/React.cloneElement(separator, {
        key: "separator-".concat(index)
      }));
    }

    return output;
  }, []);
}

function resolveBreakpointValues(_ref) {
  var values = _ref.values,
      base = _ref.base;
  var keys = Object.keys(base);

  if (keys.length === 0) {
    return values;
  }

  var previous;
  return keys.reduce(function (acc, breakpoint) {
    if (_typeof(values) === 'object') {
      acc[breakpoint] = values[breakpoint] || values[previous];
    } else {
      acc[breakpoint] = values;
    }

    previous = breakpoint;
    return acc;
  }, {});
}

var getSideFromDirection = function getSideFromDirection(direction) {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom'
  }[direction];
};

export var style = function style(_ref2) {
  var styleProps = _ref2.styleProps,
      theme = _ref2.theme;

  var styles = _extends({
    display: 'flex'
  }, handleBreakpoints({
    theme: theme
  }, styleProps.direction, function (propValue) {
    return {
      flexDirection: propValue
    };
  }));

  if (styleProps.spacing) {
    var transformer = createUnarySpacing(theme);
    var base = Object.keys(theme.breakpoints.values).reduce(function (acc, breakpoint) {
      if (styleProps.spacing[breakpoint] || styleProps.direction[breakpoint]) {
        acc[breakpoint] = true;
      }

      return acc;
    }, {});
    var directionValues = resolveBreakpointValues({
      values: styleProps.direction,
      base: base
    });
    var spacingValues = resolveBreakpointValues({
      values: styleProps.spacing,
      base: base
    });

    var styleFromPropValue = function styleFromPropValue(propValue, breakpoint) {
      return {
        '& > :not(styles) + :not(styles)': _defineProperty({
          margin: 0
        }, "margin".concat(getSideFromDirection(breakpoint ? directionValues[breakpoint] : styleProps.direction)), getValue(transformer, propValue))
      };
    };

    styles = deepmerge(styles, handleBreakpoints({
      theme: theme
    }, spacingValues, styleFromPropValue));
  }

  return styles;
};
var StackRoot = experimentalStyled('div', {}, {
  name: 'Stack'
})(style);
var Stack = /*#__PURE__*/React.forwardRef(function Stack(inProps, ref) {
  var themeProps = useThemeProps({
    props: inProps,
    name: 'MuiStack'
  });
  var props = extendSxProp(themeProps);

  var _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'column' : _props$direction,
      spacing = props.spacing,
      divider = props.divider,
      children = props.children,
      other = _objectWithoutProperties(props, ["direction", "spacing", "divider", "children"]);

  var styleProps = {
    direction: direction,
    spacing: spacing
  };
  return /*#__PURE__*/_jsx(StackRoot, _extends({
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: divider ? joinChildren(children, divider) : children
  }));
});
process.env.NODE_ENV !== "production" ? Stack.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']), PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])), PropTypes.object]),

  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,

  /**
   * Defines the space between immediate children.
   */
  spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number, PropTypes.object]),

  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Stack;