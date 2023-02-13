'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var utils = require('primereact/utils');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

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
    return utils.ObjectUtils.getMergedProps(props, CardBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, CardBase.defaultProps);
  }
};

var Card = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = CardBase.getProps(inProps);
  var elementRef = React__namespace.useRef(ref);
  var createHeader = function createHeader() {
    if (props.header) {
      return /*#__PURE__*/React__namespace.createElement("div", {
        className: "p-card-header"
      }, utils.ObjectUtils.getJSXElement(props.header, props));
    }
    return null;
  };
  var createBody = function createBody() {
    var title = props.title && /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-card-title"
    }, utils.ObjectUtils.getJSXElement(props.title, props));
    var subTitle = props.subTitle && /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-card-subtitle"
    }, utils.ObjectUtils.getJSXElement(props.subTitle, props));
    var children = props.children && /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-card-content"
    }, props.children);
    var footer = props.footer && /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-card-footer"
    }, utils.ObjectUtils.getJSXElement(props.footer, props));
    return /*#__PURE__*/React__namespace.createElement("div", {
      className: "p-card-body"
    }, title, subTitle, children, footer);
  };
  React__namespace.useEffect(function () {
    utils.ObjectUtils.combinedRefs(elementRef, ref);
  }, [elementRef, ref]);
  var otherProps = CardBase.getOtherProps(props);
  var className = utils.classNames('p-card p-component', props.className);
  var header = createHeader();
  var body = createBody();
  return /*#__PURE__*/React__namespace.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), header, body);
});
Card.displayName = 'Card';

exports.Card = Card;
