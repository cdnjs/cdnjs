import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

const styles = theme => ({
  thumb: {
    '&$open': {
      '& $offset': {
        transform: 'scale(1) translateY(-10px)'
      }
    }
  },
  open: {},
  offset: _extends({
    zIndex: 1
  }, theme.typography.body2, {
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1.2,
    transition: theme.transitions.create(['transform'], {
      duration: theme.transitions.duration.shortest
    }),
    top: -34,
    transformOrigin: 'bottom center',
    transform: 'scale(0)',
    position: 'absolute'
  }),
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'currentColor',
    transform: 'rotate(-45deg)'
  },
  label: {
    color: theme.palette.primary.contrastText,
    transform: 'rotate(45deg)'
  }
});
/**
 * @ignore - internal component.
 */


function ValueLabel(props) {
  const {
    children,
    classes,
    className,
    open,
    value,
    valueLabelDisplay
  } = props;

  if (valueLabelDisplay === 'off') {
    return children;
  }

  return /*#__PURE__*/React.cloneElement(children, {
    className: clsx(children.props.className, (open || valueLabelDisplay === 'on') && classes.open, classes.thumb)
  }, /*#__PURE__*/React.createElement("span", {
    className: clsx(classes.offset, className)
  }, /*#__PURE__*/React.createElement("span", {
    className: classes.circle
  }, /*#__PURE__*/React.createElement("span", {
    className: classes.label
  }, value))));
}

export default withStyles(styles, {
  name: 'PrivateValueLabel'
})(ValueLabel);