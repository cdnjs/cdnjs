'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ripple = require('primereact/ripple');
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

var TabMenuBase = {
  defaultProps: {
    __TYPE: 'TabMenu',
    id: null,
    model: null,
    activeIndex: 0,
    style: null,
    className: null,
    onTabChange: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, TabMenuBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, TabMenuBase.defaultProps);
  }
};

var TabMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = TabMenuBase.getProps(inProps);
  var _React$useState = React__namespace.useState(props.activeIndex),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    activeIndexState = _React$useState2[0],
    setActiveIndexState = _React$useState2[1];
  var elementRef = React__namespace.useRef(null);
  var inkbarRef = React__namespace.useRef(null);
  var navRef = React__namespace.useRef(null);
  var tabsRef = React__namespace.useRef({});
  var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
  var itemClick = function itemClick(event, item, index) {
    if (item.disabled) {
      event.preventDefault();
      return;
    }
    if (!item.url) {
      event.preventDefault();
    }
    if (item.command) {
      item.command({
        originalEvent: event,
        item: item
      });
    }
    if (props.onTabChange) {
      props.onTabChange({
        originalEvent: event,
        value: item,
        index: index
      });
    } else {
      setActiveIndexState(index);
    }
  };
  var isSelected = function isSelected(index) {
    return index === (activeIndex || 0);
  };
  var updateInkBar = function updateInkBar() {
    if (props.model) {
      var tabHeader = tabsRef.current["tab_".concat(activeIndex)];
      inkbarRef.current.style.width = utils.DomHandler.getWidth(tabHeader) + 'px';
      inkbarRef.current.style.left = utils.DomHandler.getOffset(tabHeader).left - utils.DomHandler.getOffset(navRef.current).left + 'px';
    }
  };
  React__namespace.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  React__namespace.useEffect(function () {
    updateInkBar();
  });
  var createMenuItem = function createMenuItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var _className = item.className,
      style = item.style,
      disabled = item.disabled,
      _icon = item.icon,
      _label = item.label,
      template = item.template,
      url = item.url,
      target = item.target;
    var key = _label + '_' + index;
    var active = isSelected(index);
    var className = utils.classNames('p-tabmenuitem', {
      'p-highlight': active,
      'p-disabled': disabled
    }, _className);
    var iconClassName = utils.classNames('p-menuitem-icon', _icon);
    var icon = utils.IconUtils.getJSXIcon(_icon, {
      className: 'p-menuitem-icon'
    }, {
      props: props
    });
    var label = _label && /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-menuitem-text"
    }, _label);
    var content = /*#__PURE__*/React__namespace.createElement("a", {
      href: url || '#',
      className: "p-menuitem-link",
      target: target,
      onClick: function onClick(event) {
        return itemClick(event, item, index);
      },
      role: "presentation"
    }, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
    if (template) {
      var defaultContentOptions = {
        onClick: function onClick(event) {
          return itemClick(event, item, index);
        },
        className: 'p-menuitem-link',
        labelClassName: 'p-menuitem-text',
        iconClassName: iconClassName,
        element: content,
        props: props,
        active: active,
        index: index,
        disabled: disabled
      };
      content = utils.ObjectUtils.getJSXElement(template, item, defaultContentOptions);
    }
    return /*#__PURE__*/React__namespace.createElement("li", {
      ref: tabsRef.current["tab_".concat(index)],
      key: key,
      className: className,
      style: style,
      role: "tab",
      "aria-selected": active,
      "aria-expanded": active,
      "aria-disabled": disabled
    }, content);
  };
  var createItems = function createItems() {
    return props.model.map(createMenuItem);
  };
  if (props.model) {
    var otherProps = TabMenuBase.getOtherProps(props);
    var className = utils.classNames('p-tabmenu p-component', props.className);
    var items = createItems();
    return /*#__PURE__*/React__namespace.createElement("div", _extends({
      id: props.id,
      ref: elementRef,
      className: className,
      style: props.style
    }, otherProps), /*#__PURE__*/React__namespace.createElement("ul", {
      ref: navRef,
      className: "p-tabmenu-nav p-reset",
      role: "tablist"
    }, items, /*#__PURE__*/React__namespace.createElement("li", {
      ref: inkbarRef,
      className: "p-tabmenu-ink-bar"
    })));
  }
  return null;
}));
TabMenu.displayName = 'TabMenu';

exports.TabMenu = TabMenu;
