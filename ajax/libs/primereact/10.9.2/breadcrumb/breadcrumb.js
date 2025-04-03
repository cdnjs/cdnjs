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

  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
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
        'aria-disabled': item.disabled
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
