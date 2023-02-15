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

var ToolbarBase = {
  defaultProps: {
    __TYPE: 'Toolbar',
    id: null,
    style: null,
    className: null,
    left: null,
    right: null,
    start: null,
    center: null,
    end: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, ToolbarBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, ToolbarBase.defaultProps);
  }
};

var Toolbar = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = ToolbarBase.getProps(inProps);
  var elementRef = React.useRef(null);
  var otherProps = ToolbarBase.getOtherProps(props);
  var toolbarClass = classNames('p-toolbar p-component', props.className);
  var start = ObjectUtils.getJSXElement(props.left || props.start, props);
  var center = ObjectUtils.getJSXElement(props.center, props);
  var end = ObjectUtils.getJSXElement(props.right || props.end, props);
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
    className: "p-toolbar-group-start p-toolbar-group-left"
  }, start), /*#__PURE__*/React.createElement("div", {
    className: "p-toolbar-group-center"
  }, center), /*#__PURE__*/React.createElement("div", {
    className: "p-toolbar-group-end p-toolbar-group-right"
  }, end));
}));
Toolbar.displayName = 'Toolbar';

export { Toolbar };
