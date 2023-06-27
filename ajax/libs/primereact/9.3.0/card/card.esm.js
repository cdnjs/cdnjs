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

var CardBase = {
  defaultProps: {
    __TYPE: 'Card',
    id: null,
    header: null,
    footer: null,
    title: null,
    subTitle: null,
    style: null,
    className: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, CardBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, CardBase.defaultProps);
  }
};

var Card = /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = CardBase.getProps(inProps);
  var elementRef = React.useRef(ref);
  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React.createElement("div", {
        className: "p-card-header"
      }, ObjectUtils.getJSXElement(props.header, props));
    }
    return null;
  };
  var createBody = function createBody() {
    var title = props.title && /*#__PURE__*/React.createElement("div", {
      className: "p-card-title"
    }, ObjectUtils.getJSXElement(props.title, props));
    var subTitle = props.subTitle && /*#__PURE__*/React.createElement("div", {
      className: "p-card-subtitle"
    }, ObjectUtils.getJSXElement(props.subTitle, props));
    var children = props.children && /*#__PURE__*/React.createElement("div", {
      className: "p-card-content"
    }, props.children);
    var footer = props.footer && /*#__PURE__*/React.createElement("div", {
      className: "p-card-footer"
    }, ObjectUtils.getJSXElement(props.footer, props));
    return /*#__PURE__*/React.createElement("div", {
      className: "p-card-body"
    }, title, subTitle, children, footer);
  };
  React.useEffect(function () {
    ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var otherProps = CardBase.getOtherProps(props);
  var className = classNames('p-card p-component', props.className);
  var header = createHeader();
  var body = createBody();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), header, body);
});
Card.displayName = 'Card';

export { Card };
