function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  url,
  fallbackUrl,
  ...props
}) => /*#__PURE__*/React.createElement("img", _extends({}, props, {
  src: url,
  onError: event => {
    const element = event.currentTarget;

    if (fallbackUrl) {
      element.src = fallbackUrl;
    } else {
      element.style.visibility = 'hidden';
    }
  }
}));

Image.propTypes = {
  url: PropTypes.string.isRequired,
  fallbackUrl: PropTypes.string
};
Image.defaultProps = {
  fallbackUrl: undefined
};
export default Image;