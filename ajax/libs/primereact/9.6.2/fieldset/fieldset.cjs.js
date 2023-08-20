'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var csstransition = require('primereact/csstransition');
var hooks = require('primereact/hooks');
var ripple = require('primereact/ripple');
var utils = require('primereact/utils');
var componentbase = require('primereact/componentbase');
var plus = require('primereact/icons/plus');
var minus = require('primereact/icons/minus');
var api = require('primereact/api');

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var FieldsetBase = componentbase.ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Fieldset',
    id: null,
    legend: null,
    className: null,
    style: null,
    toggleable: null,
    collapsed: null,
    collapseIcon: null,
    transitionOptions: null,
    expandIcon: null,
    onExpand: null,
    onCollapse: null,
    onToggle: null,
    onClick: null,
    children: undefined
  }
});

var Fieldset = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var context = React__namespace.useContext(api.PrimeReactContext);
  var props = FieldsetBase.getProps(inProps, context);
  var _React$useState = React__namespace.useState(props.id),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    idState = _React$useState2[0],
    setIdState = _React$useState2[1];
  var _React$useState3 = React__namespace.useState(props.collapsed),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    collapsedState = _React$useState4[0],
    setCollapsedState = _React$useState4[1];
  var collapsed = props.toggleable ? props.onToggle ? props.collapsed : collapsedState : false;
  var elementRef = React__namespace.useRef(null);
  var contentRef = React__namespace.useRef(null);
  var headerId = idState + '_header';
  var contentId = idState + '_content';
  var _FieldsetBase$setMeta = FieldsetBase.setMetaData({
      props: props,
      state: {
        id: idState,
        collapsed: collapsed
      }
    }),
    ptm = _FieldsetBase$setMeta.ptm;
  var toggle = function toggle(event) {
    if (props.toggleable) {
      collapsed ? expand(event) : collapse(event);
      if (props.onToggle) {
        props.onToggle({
          originalEvent: event,
          value: !collapsed
        });
      }
    }
    event.preventDefault();
  };
  var expand = function expand(event) {
    if (!props.onToggle) {
      setCollapsedState(false);
    }
    props.onExpand && props.onExpand(event);
  };
  var collapse = function collapse(event) {
    if (!props.onToggle) {
      setCollapsedState(true);
    }
    props.onCollapse && props.onCollapse(event);
  };
  hooks.useMountEffect(function () {
    if (!props.id) {
      setIdState(utils.UniqueComponentId());
    }
  });
  var createContent = function createContent() {
    var contentProps = utils.mergeProps({
      className: 'p-fieldset-content'
    }, ptm('content'));
    var toggleableProps = utils.mergeProps({
      ref: contentRef,
      id: contentId,
      'aria-hidden': collapsed,
      role: 'region',
      'aria-labelledby': headerId,
      className: 'p-toggleable-content'
    }, ptm('toggleableContent'));
    return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
      nodeRef: contentRef,
      classNames: "p-toggleable-content",
      timeout: {
        enter: 1000,
        exit: 450
      },
      "in": !collapsed,
      unmountOnExit: true,
      options: props.transitionOptions
    }, /*#__PURE__*/React__namespace.createElement("div", toggleableProps, /*#__PURE__*/React__namespace.createElement("div", contentProps, props.children)));
  };
  var createToggleIcon = function createToggleIcon() {
    if (props.toggleable) {
      var togglerIconProps = utils.mergeProps({
        className: 'p-fieldset-toggler'
      }, ptm('togglericon'));
      var icon = collapsed ? props.expandIcon || /*#__PURE__*/React__namespace.createElement(plus.PlusIcon, togglerIconProps) : props.collapseIcon || /*#__PURE__*/React__namespace.createElement(minus.MinusIcon, togglerIconProps);
      var toggleIcon = utils.IconUtils.getJSXIcon(icon, togglerIconProps, {
        props: props
      });
      return toggleIcon;
    }
    return null;
  };
  var createLegendContent = function createLegendContent() {
    var legendTextProps = utils.mergeProps({
      className: 'p-fieldset-legend-text'
    }, ptm('legendTitle'));
    var togglerProps = utils.mergeProps({
      id: headerId,
      'aria-expanded': !collapsed,
      'aria-controls': contentId,
      href: '#' + contentId,
      tabIndex: props.toggleable ? null : -1
    }, ptm('toggler'));
    if (props.toggleable) {
      var toggleIcon = createToggleIcon();
      return /*#__PURE__*/React__namespace.createElement("a", togglerProps, toggleIcon, /*#__PURE__*/React__namespace.createElement("span", legendTextProps, props.legend), /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    }
    return /*#__PURE__*/React__namespace.createElement("span", _extends({}, legendTextProps, {
      id: headerId
    }), props.legend);
  };
  var createLegend = function createLegend() {
    var legendProps = utils.mergeProps({
      className: 'p-fieldset-legend p-unselectable-text',
      onClick: toggle
    }, ptm('legend'));
    if (props.legend != null || props.toggleable) {
      var legendContent = createLegendContent();
      return /*#__PURE__*/React__namespace.createElement("legend", legendProps, legendContent);
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      },
      getContent: function getContent() {
        return contentRef.current;
      }
    };
  });
  var rootProps = utils.mergeProps({
    id: idState,
    ref: elementRef,
    style: props.style,
    className: utils.classNames('p-fieldset p-component', {
      'p-fieldset-toggleable': props.toggleable
    }, props.className),
    onClick: props.onClick
  }, FieldsetBase.getOtherProps(props), ptm('root'));
  var legend = createLegend();
  var content = createContent();
  return /*#__PURE__*/React__namespace.createElement("fieldset", rootProps, legend, content);
});
Fieldset.displayName = 'Fieldset';

exports.Fieldset = Fieldset;
