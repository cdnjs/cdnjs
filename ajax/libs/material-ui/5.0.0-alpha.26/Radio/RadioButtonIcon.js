import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    '&$checked $dot': {
      transform: 'scale(1)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest
      })
    }
  },
  checked: {},
  background: {
    // Scale applied to prevent dot misalignment in Safari
    transform: 'scale(1)'
  },
  dot: {
    left: 0,
    position: 'absolute',
    transform: 'scale(0)',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest
    })
  }
});
/**
 * @ignore - internal component.
 */

function RadioButtonIcon(props) {
  const {
    checked,
    classes,
    fontSize
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.root, checked && classes.checked)
  }, /*#__PURE__*/React.createElement(RadioButtonUncheckedIcon, {
    fontSize: fontSize,
    className: classes.background
  }), /*#__PURE__*/React.createElement(RadioButtonCheckedIcon, {
    fontSize: fontSize,
    className: classes.dot
  }));
}

process.env.NODE_ENV !== "production" ? RadioButtonIcon.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   */
  fontSize: PropTypes.oneOf(['small', 'medium'])
} : void 0;
export default withStyles(styles, {
  name: 'PrivateRadioButtonIcon'
})(RadioButtonIcon);