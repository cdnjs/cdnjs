'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PrimeReact = require('primereact/api');
var button = require('primereact/button');
var hooks = require('primereact/hooks');
var overlayservice = require('primereact/overlayservice');
var tooltip = require('primereact/tooltip');
var utils = require('primereact/utils');
var csstransition = require('primereact/csstransition');
var portal = require('primereact/portal');

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

var SplitButtonBase = {
  defaultProps: {
    __TYPE: 'SplitButton',
    id: null,
    label: null,
    icon: null,
    loading: false,
    loadingIcon: 'pi pi-spinner pi-spin',
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
    appendTo: null,
    tooltip: null,
    tooltipOptions: null,
    buttonTemplate: null,
    transitionOptions: null,
    dropdownIcon: 'pi pi-chevron-down',
    onClick: null,
    onShow: null,
    onHide: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return utils.ObjectUtils.getMergedProps(props, SplitButtonBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return utils.ObjectUtils.getDiffProps(props, SplitButtonBase.defaultProps);
  }
};

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
    return /*#__PURE__*/React__namespace.createElement("li", {
      className: "p-menu-separator",
      role: "separator"
    });
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
    var icon = utils.IconUtils.getJSXIcon(_icon, {
      className: 'p-menuitem-icon'
    }, {
      props: props.splitButtonProps
    });
    var label = _label && /*#__PURE__*/React__namespace.createElement("span", {
      className: "p-menuitem-text"
    }, _label);
    var content = /*#__PURE__*/React__namespace.createElement("a", {
      href: url || '#',
      role: "menuitem",
      className: className,
      target: target,
      onClick: onClick,
      "aria-label": _label
    }, icon, label);
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
    return /*#__PURE__*/React__namespace.createElement("li", {
      className: "p-menuitem",
      role: "none"
    }, content);
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
    }, /*#__PURE__*/React__namespace.createElement("div", {
      ref: ref,
      className: className,
      style: props.menuStyle,
      onClick: props.onClick
    }, /*#__PURE__*/React__namespace.createElement("ul", {
      id: props.menuId,
      className: "p-menu-list p-reset",
      role: "menu"
    }, props.children)));
  };
  var element = createElement();
  return /*#__PURE__*/React__namespace.createElement(portal.Portal, {
    element: element,
    appendTo: props.appendTo
  });
});
SplitButtonPanel.displayName = 'SplitButtonPanel';

var SplitButton = /*#__PURE__*/React__namespace.memo( /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
  var props = SplitButtonBase.getProps(inProps);
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
    utils.ZIndexUtils.set('overlay', overlayRef.current, PrimeReact__default["default"].autoZIndex, PrimeReact__default["default"].zIndex['overlay']);
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
    utils.DomHandler.alignOverlay(overlayRef.current, defaultButtonRef.current.parentElement, props.appendTo || PrimeReact__default["default"].appendTo);
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
          onItemClick: onItemClick
        });
      });
    }
    return null;
  };
  if (props.visible === false) {
    return null;
  }
  var hasTooltip = utils.ObjectUtils.isNotEmpty(props.tooltip);
  var otherProps = SplitButtonBase.getOtherProps(props);
  var className = utils.classNames('p-splitbutton p-component', props.className, {
    'p-disabled': props.disabled
  });
  var buttonClassName = utils.classNames('p-splitbutton-defaultbutton', props.buttonClassName);
  var menuButtonClassName = utils.classNames('p-splitbutton-menubutton', props.menuButtonClassName);
  var buttonContent = props.buttonTemplate ? utils.ObjectUtils.getJSXElement(props.buttonTemplate, props) : null;
  var items = createItems();
  var menuId = idState + '_menu';
  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement("div", _extends({
    ref: elementRef,
    id: idState,
    className: className,
    style: props.style
  }, otherProps), /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
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
  }, props.buttonProps), buttonContent), /*#__PURE__*/React__namespace.createElement(button.Button, _extends({
    type: "button",
    className: menuButtonClassName,
    icon: props.dropdownIcon,
    onClick: onDropdownButtonClick,
    disabled: props.disabled,
    "aria-expanded": overlayVisibleState,
    "aria-haspopup": "true",
    "aria-controls": overlayVisibleState ? menuId : null
  }, props.menuButtonProps)), /*#__PURE__*/React__namespace.createElement(SplitButtonPanel, {
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
    transitionOptions: props.transitionOptions
  }, items)), hasTooltip && /*#__PURE__*/React__namespace.createElement(tooltip.Tooltip, _extends({
    target: elementRef,
    content: props.tooltip
  }, props.tooltipOptions)));
}));
SplitButton.displayName = 'SplitButton';

exports.SplitButton = SplitButton;
