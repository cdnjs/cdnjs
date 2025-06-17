this.primereact = this.primereact || {};
this.primereact.inplace = (function (exports, React, api, button, componentbase, hooks, times, utils) {
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
    display: function display(_ref) {
      var props = _ref.props;
      return utils.classNames('p-inplace-display', {
        'p-disabled': props.disabled
      });
    },
    root: function root(_ref2) {
      var props = _ref2.props;
      return utils.classNames('p-inplace p-component', {
        'p-inplace-closable': props.closable
      });
    },
    closeButton: 'p-inplace-content-close',
    content: 'p-inplace-content'
  };
  var styles = "\n@layer primereact {\n    .p-inplace .p-inplace-display {\n        display: inline;\n        cursor: pointer;\n    }\n    \n    .p-inplace .p-inplace-content {\n        display: inline;\n    }\n    \n    .p-fluid .p-inplace.p-inplace-closable .p-inplace-content {\n        display: flex;\n    }\n    \n    .p-fluid .p-inplace.p-inplace-closable .p-inplace-content > .p-inputtext {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n    \n    .p-inplace-content-close {\n        margin-left: .25rem;\n    }\n}\n";
  componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InplaceDisplay',
      children: undefined
    }
  });
  componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'InplaceContent',
      children: undefined
    }
  });
  var InplaceBase = componentbase.ComponentBase.extend({
    defaultProps: {
      __TYPE: 'Inplace',
      style: null,
      className: null,
      active: false,
      closable: false,
      closeIcon: null,
      disabled: false,
      tabIndex: 0,
      ariaLabel: null,
      onOpen: null,
      onClose: null,
      onToggle: null,
      children: undefined
    },
    css: {
      classes: classes,
      styles: styles
    }
  });

  var InplaceDisplay = function InplaceDisplay(props) {
    return props.children;
  };
  var InplaceContent = function InplaceContent(props) {
    return props.children;
  };
  var Inplace = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var mergeProps = hooks.useMergeProps();
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = InplaceBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.active),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeState = _React$useState2[0],
      setActiveState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var active = props.onToggle ? props.active : activeState;
    var metaData = {
      props: props,
      state: {
        active: activeState
      }
    };
    var _InplaceBase$setMetaD = InplaceBase.setMetaData(metaData),
      ptm = _InplaceBase$setMetaD.ptm,
      cx = _InplaceBase$setMetaD.cx,
      isUnstyled = _InplaceBase$setMetaD.isUnstyled;
    componentbase.useHandleStyle(InplaceBase.css.styles, isUnstyled, {
      name: 'inplace'
    });
    var open = function open(event) {
      if (props.disabled) {
        return;
      }
      props.onOpen && props.onOpen(event);
      if (props.onToggle) {
        props.onToggle({
          originalEvent: event,
          value: true
        });
      } else {
        setActiveState(true);
      }
    };
    var close = function close(event) {
      if (props.disabled) {
        return;
      }
      props.onClose && props.onClose(event);
      if (props.onToggle) {
        props.onToggle({
          originalEvent: event,
          value: false
        });
      } else {
        setActiveState(false);
      }
    };
    var onDisplayKeyDown = function onDisplayKeyDown(event) {
      if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Space') {
        open(event);
        event.preventDefault();
      }
    };
    var createDisplay = function createDisplay(content) {
      var displayProps = mergeProps({
        onClick: open,
        className: cx('display'),
        onKeyDown: onDisplayKeyDown,
        tabIndex: props.tabIndex || '0',
        role: 'button',
        'aria-label': props.ariaLabel
      }, ptm('display'));
      return /*#__PURE__*/React__namespace.createElement("div", displayProps, content);
    };
    var createCloseButton = function createCloseButton() {
      var icon = props.closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, null);
      var closeIcon = utils.IconUtils.getJSXIcon(icon, undefined, {
        props: props
      });
      var closeAriaLabel = api.localeOption('aria') ? api.localeOption('aria').close : undefined;
      if (props.closable) {
        var closeButtonProps = mergeProps({
          className: cx('closeButton'),
          icon: closeIcon,
          type: 'button',
          onClick: close,
          'aria-label': closeAriaLabel,
          pt: ptm('closeButton'),
          __parentMetadata: {
            parent: metaData
          }
        });
        return /*#__PURE__*/React__namespace.createElement(button.Button, closeButtonProps);
      }
      return null;
    };
    var createContent = function createContent(content) {
      var closeButton = createCloseButton();
      var contentProps = mergeProps({
        className: cx('content')
      }, ptm('content'));
      return /*#__PURE__*/React__namespace.createElement("div", contentProps, content, closeButton);
    };
    var createChildren = function createChildren() {
      var validChildTypes = ['InplaceContent', 'InplaceDisplay'];
      return React__namespace.Children.map(props.children, function (child) {
        if (active && utils.ObjectUtils.isValidChild(child, 'InplaceContent', validChildTypes)) {
          return createContent(child);
        } else if (!active && utils.ObjectUtils.isValidChild(child, 'InplaceDisplay', validChildTypes)) {
          return createDisplay(child);
        }
      });
    };
    React__namespace.useImperativeHandle(ref, function () {
      return {
        props: props,
        getElement: function getElement() {
          return elementRef.current;
        }
      };
    });
    hooks.useUpdateEffect(function () {
      props.active ? open(null) : close(null);
    }, [props.active]);
    var children = createChildren();
    var rootProps = mergeProps({
      ref: elementRef,
      className: utils.classNames(props.className, cx('root')),
      'aria-live': 'polite'
    }, InplaceBase.getOtherProps(props), ptm('root'));
    return /*#__PURE__*/React__namespace.createElement("div", rootProps, children);
  });
  InplaceDisplay.displayName = 'InplaceDisplay';
  InplaceContent.displayName = 'InplaceContent';
  Inplace.displayName = 'Inplace';

  exports.Inplace = Inplace;
  exports.InplaceContent = InplaceContent;
  exports.InplaceDisplay = InplaceDisplay;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, React, primereact.api, primereact.button, primereact.componentbase, primereact.hooks, primereact.icons.times, primereact.utils);
