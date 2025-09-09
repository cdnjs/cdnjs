function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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