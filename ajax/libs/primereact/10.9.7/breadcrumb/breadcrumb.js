this.primereact = this.primereact || {};
this.primereact.breadcrumb = (function (exports, React, api, componentbase, hooks, chevronright, utils) {
  'use strict';

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
    return _extends = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }

  function _defineProperty(e, r, t) {
    return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }

  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }

  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }

  var classes = {
    icon: 'p-menuitem-icon',
    action: 'p-menuitem-link',
    label: 'p-menuitem-text',
    home: function home(_ref) {
      var _className = _ref._className,
        disabled = _ref.disabled;
      return utils.classNames('p-breadcrumb-home p-menuitem', {
        'p-disabled': disabled
      }, _className);
    },
    separatorIcon: 'p-breadcrumb-chevron',
    separator: 'p-menuitem-separator',
    menuitem: function menuitem(_ref2) {
      var item = _ref2.item;
      return utils.classNames('p-menuitem', item.className, {
        'p-disabled': item.disabled
      });
    },
    menu: 'p-breadcrumb-list',
    root: 'p-breadcrumb p-component'
  };
  var styles = "\n@layer primereact {\n    .p-breadcrumb {\n        overflow-x: auto;\n        display: flex;\n    }\n\n    .p-breadcrumb ol {\n        margin: 0;\n        padding: 0;\n        list-style-type: none;\n        display: flex;\n        align-items: center;\n        flex-wrap: nowrap;\n    }\n\n    .p-breadcrumb .p-menuitem-text {\n        line-height: 1;\n    }\n\n    .p-breadcrumb .p-menuitem-link {\n        text-decoration: none;\n        display: flex;\n        align-items: center;\n    }\n\n    .p-breadcrumb .p-menuitem-separator {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-breadcrumb::-webkit-scrollbar {\n        display: none;\n    }\n}\n";
  var BreadCrumbBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'BreadCrumb',
      id: null,
      model: null,
      home: null,
      separatorIcon: null,
      style: null,
      className: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var BreadCrumb = /*#__PURE__*/React__namespace.memo(/*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = BreadCrumbBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var _BreadCrumbBase$setMe = BreadCrumbBase.setMetaData({
        props: props,
        state: {
          id: idState
        }
      }),
      ptm = _BreadCrumbBase$setMe.ptm,
      cx = _BreadCrumbBase$setMe.cx,
      isUnstyled = _BreadCrumbBase$setMe.isUnstyled;
    componentbase.useHandleStyle(BreadCrumbBase.css.styles, isUnstyled, {
      name: 'breadcrumb'
    });
    var itemClick = function itemClick(event, item) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }
      if (!item.url) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    var isCurrent = function isCurrent(url) {
      var lastPath = typeof window !== 'undefined' ? window.location.pathname : '';
      return url === lastPath ? 'page' : undefined;
    };
    var createHome = function createHome() {
      var home = props.home;
      if (home) {
        if (home.visible === false) {
          return null;
        }
        var _icon = home.icon,
          target = home.target,
          url = home.url,
          disabled = home.disabled,
          style = home.style,
          _className = home.className,
          template = home.template,
          _label = home.label;
        var iconProps = mergeProps({
          className: cx('icon')
        }, ptm('icon'));
        var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
          props: props
        });
        var actionProps = mergeProps({
          href: url || '#',
          className: cx('action'),
          'aria-disabled': disabled,
          'aria-current': isCurrent(url),
          target: target,
          onClick: function onClick(event) {
            return itemClick(event, home);
          }
        }, ptm('action'));
        var labelProps = mergeProps({
          className: cx('label')
        }, ptm('label'));
        var label = _label && /*#__PURE__*/React__namespace.createElement("span", labelProps, _label);
        var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label);
        if (template) {
          var defaultContentOptions = {
            onClick: function onClick(event) {
              return itemClick(event, home);
            },
            className: 'p-menuitem-link',
            labelClassName: 'p-menuitem-text',
            element: content,
            props: props
          };
          content = utils.ObjectUtils.getJSXElement(template, home, defaultContentOptions);
        }
        var key = idState + '_home';
        var menuitemProps = mergeProps({
          id: key,
          className: cx('home', {
            _className: _className,
            disabled: disabled
          }),
          style: style
        }, ptm('home'));
        return /*#__PURE__*/React__namespace.createElement("li", _extends({}, menuitemProps, {
          key: key
        }), content);
      }
      return null;
    };
    var createSeparator = function createSeparator(index) {
      var key = idState + '_sep_' + index;
      var separatorIconProps = mergeProps({
        className: cx('separatorIcon'),
        'aria-hidden': 'true'
      }, ptm('separatorIcon'));
      var icon = props.separatorIcon || /*#__PURE__*/React__namespace.createElement(chevronright.ChevronRightIcon, separatorIconProps);
      var separatorIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, separatorIconProps), {
        props: props
      });
      var separatorProps = mergeProps({
        id: key,
        className: cx('separator'),
        role: 'separator'
      }, ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({}, separatorProps, {
        key: key
      }), separatorIcon);
    };
    var createMenuitem = function createMenuitem(item, index) {
      if (item.visible === false) {
        return null;
      }
      var labelProps = mergeProps({
        className: cx('label')
      }, ptm('label'));
      var label = item.label && /*#__PURE__*/React__namespace.createElement("span", labelProps, item.label);
      var actionProps = mergeProps({
        href: item.url || '#',
        className: cx('action'),
        target: item.target,
        'aria-current': isCurrent(item.url),
        onClick: function onClick(event) {
          return itemClick(event, item);
        },
        'aria-disabled': item.disabled,
        tabIndex: item.disabled ? -1 : undefined
      }, ptm('action'));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, label);
      if (item.template) {
        var defaultContentOptions = {
          onClick: function onClick(event) {
            return itemClick(event, item);
          },
          className: 'p-menuitem-link',
          labelClassName: 'p-menuitem-text',
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(item.template, item, defaultContentOptions);
      }
      var key = item.id || idState + '_' + index;
      var menuitemProps = mergeProps({
        id: key,
        className: cx('menuitem', {
          item: item
        }),
        style: item.style
      }, ptm('menuitem'));
      return /*#__PURE__*/React__namespace.createElement("li", _extends({}, menuitemProps, {
        key: key
      }), content);
    };
    var createMenuitems = function createMenuitems() {
      if (props.model) {
        var _items = props.model.map(function (item, index) {
          if (item.visible === false) {
            return null;
          }
          var menuitem = createMenuitem(item, index);
          var separator = index === props.model.length - 1 ? null : createSeparator(index);
          var key = idState + '_' + index;
          return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
            key: key
          }, menuitem, separator);
        });
        return _items;
      }
      return null;
    };
    hooks.useMountEffect(function () {
      if (!idState) {
        setIdState(utils.UniqueComponentId());
      }
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var home = createHome();
    var items = createMenuitems();
    var separator = createSeparator('home');
    var menuProps = mergeProps({
      className: cx('menu')
    }, ptm('menu'));
    var rootProps = mergeProps({
      id: props.id,
      ref: elementRef,
      className: utils.classNames(props.className, cx('root')),
      style: props.style
    }, BreadCrumbBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("nav", rootProps, /*#__PURE__*/React__namespace.createElement("ol", menuProps, home, home && !!(items !== null && items !== void 0 && items.length) && separator, items));
  }));
  BreadCrumb.displayName = 'BreadCrumb';

  exports.BreadCrumb = BreadCrumb;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.componentbase, primereact.hooks, primereact.icons.chevronright, primereact.utils);
