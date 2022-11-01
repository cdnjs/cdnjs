import * as React from 'react';
import { ObjectUtils, classNames } from 'primereact/utils';

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

var Toolbar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (props, ref) {
  var elementRef = React.useRef(null);
  var otherProps = ObjectUtils.findDiffKeys(props, Toolbar.defaultProps);
  var toolbarClass = classNames('p-toolbar p-component', props.className);
  var left = ObjectUtils.getJSXElement(props.left, props);
  var right = ObjectUtils.getJSXElement(props.right, props);
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: toolbarClass,
    style: props.style,
    role: "toolbar"
  }, otherProps), /*#__PURE__*/React.createElement("div", {
    className: "p-toolbar-group-left"
  }, left), /*#__PURE__*/React.createElement("div", {
    className: "p-toolbar-group-right"
  }, right));
}));
Toolbar.displayName = 'Toolbar';
Toolbar.defaultProps = {
  __TYPE: 'Toolbar',
  id: null,
  style: null,
  className: null,
  left: null,
  right: null
};

export { Toolbar };
