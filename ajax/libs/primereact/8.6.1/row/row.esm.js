import * as React from 'react';
import { ObjectUtils } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

var Row = function Row(props) {
  var otherProps = ObjectUtils.findDiffKeys(props, Row.defaultProps);
  return /*#__PURE__*/React.createElement("tr", _extends({
    className: props.className,
    style: props.style
  }, otherProps), props.children);
};
Row.displayName = 'Row';
Row.defaultProps = {
  __TYPE: 'Row',
  style: null,
  className: null
};

export { Row };
