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

var RowBase = {
  defaultProps: {
    __TYPE: 'Row',
    style: null,
    className: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, RowBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, RowBase.defaultProps);
  },
  getCProp: function getCProp(row, name) {
    return ObjectUtils.getComponentProp(row, name, RowBase.defaultProps);
  }
};

var Row = function Row(inProps) {
  var props = RowBase.getProps(inProps);
  var otherProps = RowBase.getOtherProps(props);
  return /*#__PURE__*/React.createElement("tr", _extends({
    className: props.className,
    style: props.style
  }, otherProps), props.children);
};
Row.displayName = 'Row';

export { Row };
