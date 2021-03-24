import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
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
  const childrenArray = React.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push( /*#__PURE__*/React.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }

    return output;
  }, []);
}

function resolveBreakpointValues({
  values,
  base
}) {
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return values;
  }

  let previous;
  return keys.reduce((acc, breakpoint) => {
    if (typeof values === 'object') {
      acc[breakpoint] = values[breakpoint] || values[previous];
    } else {
      acc[breakpoint] = values;
    }

    previous = breakpoint;
    return acc;
  }, {});
}

const getSideFromDirection = direction => {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom'
  }[direction];
};

export const style = ({
  styleProps,
  theme
}) => {
  let styles = _extends({
    display: 'flex'
  }, handleBreakpoints({
    theme
  }, styleProps.direction, propValue => ({
    flexDirection: propValue
  })));

  if (styleProps.spacing) {
    const transformer = createUnarySpacing(theme);
    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (styleProps.spacing[breakpoint] || styleProps.direction[breakpoint]) {
        acc[breakpoint] = true;
      }

      return acc;
    }, {});
    const directionValues = resolveBreakpointValues({
      values: styleProps.direction,
      base
    });
    const spacingValues = resolveBreakpointValues({
      values: styleProps.spacing,
      base
    });

    const styleFromPropValue = (propValue, breakpoint) => {
      return {
        '& > :not(styles) + :not(styles)': {
          margin: 0,
          [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : styleProps.direction)}`]: getValue(transformer, propValue)
        }
      };
    };

    styles = deepmerge(styles, handleBreakpoints({
      theme
    }, spacingValues, styleFromPropValue));
  }

  return styles;
};
const StackRoot = experimentalStyled('div', {}, {
  name: 'Stack'
})(style);
const Stack = /*#__PURE__*/React.forwardRef(function Stack(inProps, ref) {
  const themeProps = useThemeProps({
    props: inProps,
    name: 'MuiStack'
  });
  const props = extendSxProp(themeProps);

  const {
    direction = 'column',
    spacing,
    divider,
    children
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["direction", "spacing", "divider", "children"]);

  const styleProps = {
    direction,
    spacing
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