this.primereact = this.primereact || {};
this.primereact.splitbutton = (function (exports, React, PrimeReact, button, hooks, chevrondown, overlayservice, tooltip, utils, componentbase, csstransition, portal) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

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
  var PrimeReact__default = /*#__PURE__*/_interopDefaultLegacy(PrimeReact);

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

  var SplitButtonBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'SplitButton',
      id: null,
      label: null,
      icon: null,
      loading: false,
      loadingIcon: null,
      model: null,
      disabled: null,
      style: null,
      className: null,
      buttonClassName: null,
      menuStyle: null,
      menuClassName: null,
      menuButtonClassName: null,
      buttonProps: null,
      menuButtonProps: null,
      tabIndex: null,
      severity: null,
      rounded: false,
      raised: false,
      outlined: false,
      text: false,
      size: null,
      appendTo: null,
      tooltip: null,
      tooltipOptions: null,
      buttonTemplate: null,
      transitionOptions: null,
      dropdownIcon: null,
      onClick: null,
      onShow: null,
      onHide: null,
      children: undefined
    }
  });

  function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var SplitButtonItem = /*#__PURE__*/React__namespace.memo(function (props) {
    var onClick = function onClick(e) {
      if (props.menuitem.command) {
        props.menuitem.command({
          originalEvent: e,
          item: props.menuitem
        });
      }
      if (props.onItemClick) {
        props.onItemClick(e);
      }
      e.preventDefault();
    };
    var createSeparator = function createSeparator() {
      var separatorProps = utils.mergeProps({
        className: 'p-menu-separator',
        role: 'separator'
      }, props.ptm('separator'));
      return /*#__PURE__*/React__namespace.createElement("li", separatorProps);
    };
    var createMenuitem = function createMenuitem() {
      if (props.menuitem.visible === false) {
        return null;
      }
      var _props$menuitem = props.menuitem,
        disabled = _props$menuitem.disabled,
        _icon = _props$menuitem.icon,
        _label = _props$menuitem.label,
        template = _props$menuitem.template,
        url = _props$menuitem.url,
        target = _props$menuitem.target,
        _className = _props$menuitem.className;
      var className = utils.classNames('p-menuitem-link', _className, {
        'p-disabled': disabled
      });
      var iconClassName = utils.classNames('p-menuitem-icon', _icon);
      var menuIconProps = utils.mergeProps({
        className: 'p-menuitem-icon'
      }, props.ptm('menuIcon'));
      var icon = utils.IconUtils.getJSXIcon(_icon, _objectSpread$1({}, menuIconProps), {
        props: props.splitButtonProps
      });
      var menuLabelProps = utils.mergeProps({
        className: 'p-menuitem-text'
      }, props.ptm('menuLabel'));
      var label = _label && /*#__PURE__*/React__namespace.createElement("span", menuLabelProps, _label);
      var anchorProps = utils.mergeProps({
        href: url || '#',
        role: 'menuitem',
        className: className,
        target: target,
        onClick: onClick,
        'aria-label': _label
      }, props.ptm('anchor'));
      var content = /*#__PURE__*/React__namespace.createElement("a", anchorProps, icon, label);
      if (template) {
        var defaultContentOptions = {
          onClick: onClick,
          className: className,
          labelClassName: 'p-menuitem-text',
          iconClassName: iconClassName,
          element: content,
          props: props
        };
        content = utils.ObjectUtils.getJSXElement(template, props.menuitem, defaultContentOptions);
      }
      var menuItemProps = utils.mergeProps({
        className: 'p-menuitem',
        role: 'none'
      }, props.ptm('menuItem'));
      return /*#__PURE__*/React__namespace.createElement("li", menuItemProps, content);
    };
    var createItem = function createItem() {
      return props.menuitem.separator ? createSeparator() : createMenuitem();
    };
    var item = createItem();
    return item;
  });
  SplitButtonItem.displayName = 'SplitButtonItem';

  var SplitButtonPanel = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
    var createElement = function createElement() {
      var className = utils.classNames('p-menu p-menu-overlay p-component', props.menuClassName);
      var menuProps = utils.mergeProps({
        ref: ref,
        className: className,
        style: props.menuStyle,
        onClick: props.onClick
      }, props.ptm('menu'));
      var menuListProps = utils.mergeProps({
        id: props.menuId,
        className: 'p-menu-list p-reset',
        role: 'menu'
      }, props.ptm('menuList'));
      return /*#__PURE__*/React__namespace.createElement(csstransition.CSSTransition, {
        nodeRef: ref,
        classNames: "p-connected-overlay",
        "in": props["in"],
        timeout: {
          enter: 120,
          exit: 100
        },
        options: props.transitionOptions,
        unmountOnExit: true,
        onEnter: props.onEnter,
        onEntered: props.onEntered,
        onExit: props.onExit,
        onExited: props.onExited
      }, /*#__PURE__*/React__namespace.createElement("div", menuProps, /*#__PURE__*/React__namespace.createElement("ul", menuListProps, props.children)));
    };
    var element = createElement();
    return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
      element: element,
      appendTo: props.appendTo
    });
  });
  SplitButtonPanel.displayName = 'SplitButtonPanel';

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
  var SplitButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var _classNames;
    var context = React__namespace.useContext(PrimeReact.PrimeReactContext);
    var props = SplitButtonBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.id),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      idState = _React$useState2[0],
      setIdState = _React$useState2[1];
    var _React$useState3 = React__namespace.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      overlayVisibleState = _React$useState4[0],
      setOverlayVisibleState = _React$useState4[1];
    var elementRef = React__namespace.useRef(null);
    var defaultButtonRef = React__namespace.useRef(null);
    var overlayRef = React__namespace.useRef(null);
    var _SplitButtonBase$setM = SplitButtonBase.setMetaData({
        props: props,
        state: {
          id: idState,
          overlayVisible: overlayVisibleState
        }
      }),
      ptm = _SplitButtonBase$setM.ptm;
    var _useOverlayListener = hooks.useOverlayListener({
        target: elementRef,
        overlay: overlayRef,
        listener: function listener(event, _ref) {
          var valid = _ref.valid;
          valid && hide();
        },
        when: overlayVisibleState
      }),
      _useOverlayListener2 = _slicedToArray(_useOverlayListener, 2),
      bindOverlayListener = _useOverlayListener2[0],
      unbindOverlayListener = _useOverlayListener2[1];
    var onPanelClick = function onPanelClick(event) {
      overlayservice.OverlayService.emit('overlay-click', {
        originalEvent: event,
        target: elementRef.current
      });
    };
    var onDropdownButtonClick = function onDropdownButtonClick() {
      overlayVisibleState ? hide() : show();
    };
    var onItemClick = function onItemClick() {
      hide();
    };
    var show = function show() {
      setOverlayVisibleState(true);
    };
    var hide = function hide() {
      setOverlayVisibleState(false);
    };
    var onOverlayEnter = function onOverlayEnter() {
      utils.ZIndexUtils.set('overlay', overlayRef.current, context && context.autoZIndex || PrimeReact__default["default"].autoZIndex, context && context.zIndex['overlay'] || PrimeReact__default["default"].zIndex['overlay']);
      alignOverlay();
    };
    var onOverlayEntered = function onOverlayEntered() {
      bindOverlayListener();
      props.onShow && props.onShow();
    };
    var onOverlayExit = function onOverlayExit() {
      unbindOverlayListener();
    };
    var onOverlayExited = function onOverlayExited() {
      utils.ZIndexUtils.clear(overlayRef.current);
      props.onHide && props.onHide();
    };
    var alignOverlay = function alignOverlay() {
      utils.DomHandler.alignOverlay(overlayRef.current, defaultButtonRef.current.parentElement, props.appendTo || context && context.appendTo || PrimeReact__default["default"].appendTo);
    };
    hooks.useMountEffect(function () {
      if (!idState) {
        setIdState(utils.UniqueComponentId());
      }
    });
    hooks.useUnmountEffect(function () {
      utils.ZIndexUtils.clear(overlayRef.current);
    });
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        show: show,
        hide: hide,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    var createItems = function createItems() {
      if (props.model) {
        return props.model.map(function (menuitem, index) {
          return /*#__PURE__*/React__namespace.createElement(SplitButtonItem, {
            splitButtonProps: props,
            menuitem: menuitem,
            key: index,
            onItemClick: onItemClick,
            ptm: ptm
          });
        });
      }
      return null;
    };
    if (props.visible === false) {
      return null;
    }
    var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
    var sizeMapping = {
      large: 'lg',
      small: 'sm'
    };
    var size = sizeMapping[props.size];
    var className = utils.classNames('p-splitbutton p-component', props.className, (_classNames = {
      'p-disabled': props.disabled,
      'p-button-loading-label-only': props.loading && !props.icon && props.label
    }, _defineProperty(_classNames, "p-button-".concat(props.severity), props.severity), _defineProperty(_classNames, 'p-button-raised', props.raised), _defineProperty(_classNames, 'p-button-rounded', props.rounded), _defineProperty(_classNames, 'p-button-text', props.text), _defineProperty(_classNames, 'p-button-outlined', props.outlined), _defineProperty(_classNames, "p-button-".concat(size), size), _classNames));
    var buttonClassName = utils.classNames('p-splitbutton-defaultbutton', props.buttonClassName);
    var menuButtonClassName = utils.classNames('p-splitbutton-menubutton', props.menuButtonClassName);
    var buttonContent = props.buttonTemplate ? utils.ObjectUtils.getJSXElement(props.buttonTemplate, props) : null;
    var items = createItems();
    var menuId = idState + '_menu';
    var dropdownIcon = function dropdownIcon() {
      var iconProps = utils.mergeProps({
        className: 'p-button-icon p-c'
      }, ptm('icon'));
      var icon = props.dropdownIcon || /*#__PURE__*/React__namespace.createElement(chevrondown.ChevronDownIcon, iconProps);
      var dropdownIcon = utils.IconUtils.getJSXIcon(icon, _objectSpread({}, iconProps), {
        props: props
      });
      return dropdownIcon;
    };
    var rootProps = utils.mergeProps({
      ref: elementRef,
      id: idState,
      className: className,
      style: props.style
    }, SplitButtonBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", rootProps, /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
      ref: defaultButtonRef,
      type: "button",
      className: buttonClassName,
      icon: props.icon,
      loading: props.loading,
      loadingIcon: props.loadingIcon,
      label: props.label,
      onClick: props.onClick,
      disabled: props.disabled,
      tabIndex: props.tabIndex
    }, props.buttonProps, {
      pt: ptm('button')
    }), buttonContent), /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
      type: "button",
      className: menuButtonClassName,
      icon: dropdownIcon,
      onClick: onDropdownButtonClick,
      disabled: props.disabled,
      "aria-expanded": overlayVisibleState,
      "aria-haspopup": "true",
      "aria-controls": overlayVisibleState ? menuId : null
    }, props.menuButtonProps, {
      pt: ptm('menuButton')
    })), /*#__PURE__*/React__namespace.createElement(SplitButtonPanel, {
      ref: overlayRef,
      appendTo: props.appendTo,
      menuId: menuId,
      menuStyle: props.menuStyle,
      menuClassName: props.menuClassName,
      onClick: onPanelClick,
      "in": overlayVisibleState,
      onEnter: onOverlayEnter,
      onEntered: onOverlayEntered,
      onExit: onOverlayExit,
      onExited: onOverlayExited,
      transitionOptions: props.transitionOptions,
      ptm: ptm
    }, items)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
      target: elementRef,
      content: props.tooltip
    }, props.tooltipOptions, {
      pt: ptm('tooltip')
    })));
  }));
  SplitButton.displayName = 'SplitButton';

  exports.SplitButton = SplitButton;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.hooks, primereact.icons.chevrondown, primereact.overlayservice, primereact.tooltip, primereact.utils, primereact.componentbase, primereact.csstransition, primereact.portal);
