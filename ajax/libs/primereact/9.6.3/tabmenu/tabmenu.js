this.primereact = this.primereact || {};
this.primereact.tabmenu = (function (exports, React, ripple, utils, componentbase, api) {
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  var TabMenuBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'TabMenu',
      id: null,
      model: null,
      activeIndex: 0,
      style: null,
      className: null,
      onTabChange: null,
      children: undefined
    }
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var TabMenu = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = TabMenuBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.activeIndex),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeIndexState = _React$useState2[0],
      setActiveIndexState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var inkbarRef = React__namespace.useRef(null);
    var navRef = React__namespace.useRef(null);
    var tabsRef = React__namespace.useRef({});
    var activeIndex = props.onTabChange ? props.activeIndex : activeIndexState;
    var _TabMenuBase$setMetaD = TabMenuBase.setMetaData({
        props: props,
        state: {
          activeIndex: activeIndexState
        }
      }),
      ptm = _TabMenuBase$setMetaD.ptm;
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
      var iconProps = utils.mergeProps({
        className: iconClassName
      }, ptm('icon'));
      var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread({}, iconProps), {
        props: props
      });
      var labelProps = utils.mergeProps({
        className: 'p-menuitem-text'
      }, ptm('label'));
      var label = _label && /*#__PURE__*/React__namespace.createElement("span", labelProps, _label);
      var actionProps = utils.mergeProps({
        href: url || '#',
        className: 'p-menuitem-link',
        target: target,
        onClick: function onClick(event) {
          return itemClick(event, item, index);
        },
        role: 'presentation'
      }, ptm('action'));
      var content = /*#__PURE__*/React__namespace.createElement("a", actionProps, icon, label, /*#__PURE__*/React__namespace.createElement(ripple.Ripple, null));
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
      var menuItemProps = utils.mergeProps({
        ref: tabsRef.current["tab_".concat(index)],
        key: key,
        className: className,
        style: style,
        role: 'tab',
        'aria-selected': active,
        'aria-expanded': active,
        'aria-disabled': disabled
      }, ptm('menuitem'));
      return /*#__PURE__*/React__namespace.createElement("li", menuItemProps, content);
    };
    var createItems = function createItems() {
      return props.model.map(createMenuItem);
    };
    if (props.model) {
      var className = utils.classNames('p-tabmenu p-component', props.className);
      var items = createItems();
      var inkbarProps = utils.mergeProps({
        ref: inkbarRef,
        className: 'p-tabmenu-ink-bar'
      }, ptm('inkbar'));
      var menuProps = utils.mergeProps({
        ref: navRef,
        className: 'p-tabmenu-nav p-reset',
        role: 'tablist'
      }, ptm('menu'));
      var rootProps = utils.mergeProps({
        id: props.id,
        ref: elementRef,
        className: className,
        style: props.style
      }, TabMenuBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement("ul", menuProps, items, /*#__PURE__*/React__namespace.createElement("li", inkbarProps)));
    }
    return null;
  }));
  TabMenu.displayName = 'TabMenu';

  exports.TabMenu = TabMenu;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.ripple, primereact.utils, primereact.componentbase, primereact.api);
