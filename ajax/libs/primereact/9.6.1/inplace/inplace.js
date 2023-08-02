this.primereact = this.primereact || {};
this.primereact.inplace = (function (exports, React, api, button, times, utils, componentbase) {
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
    }
  });

  var InplaceDisplay = function InplaceDisplay(props) {
    return props.children;
  };
  var InplaceContent = function InplaceContent(props) {
    return props.children;
  };
  var Inplace = /*#__PURE__*/React__namespace.forwardRef(function (inProps, ref) {
    var context = React__namespace.useContext(api.PrimeReactContext);
    var props = InplaceBase.getProps(inProps, context);
    var _React$useState = React__namespace.useState(props.active),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      activeState = _React$useState2[0],
      setActiveState = _React$useState2[1];
    var elementRef = React__namespace.useRef(null);
    var active = props.onToggle ? props.active : activeState;
    var _InplaceBase$setMetaD = InplaceBase.setMetaData({
        props: props,
        state: {
          active: activeState
        }
      }),
      ptm = _InplaceBase$setMetaD.ptm;
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
      if (event.key === 'Enter') {
        open(event);
        event.preventDefault();
      }
    };
    var createDisplay = function createDisplay(content) {
      var className = utils.classNames('p-inplace-display', {
        'p-disabled': props.disabled
      });
      var displayProps = utils.mergeProps({
        onClick: open,
        className: className,
        onKeyDown: onDisplayKeyDown,
        tabIndex: props.tabIndex,
        'aria-label': props.ariaLabel
      }, ptm('display'));
      return /*#__PURE__*/React__namespace.createElement("div", displayProps, content);
    };
    var createCloseButton = function createCloseButton() {
      var icon = props.closeIcon || /*#__PURE__*/React__namespace.createElement(times.TimesIcon, null);
      var closeIcon = utils.IconUtils.getJSXIcon(icon, undefined, {
        props: props
      });
      var ariaLabel = api.localeOption('close');
      if (props.closable) {
        var closeButtonProps = utils.mergeProps({
          className: 'p-inplace-content-close',
          icon: closeIcon,
          type: 'button',
          onClick: close,
          'aria-label': ariaLabel,
          pt: ptm('closeButton')
        });
        return /*#__PURE__*/React__namespace.createElement(button.Button, closeButtonProps);
      }
      return null;
    };
    var createContent = function createContent(content) {
      var closeButton = createCloseButton();
      var contentProps = utils.mergeProps({
        className: 'p-inplace-content'
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
    var children = createChildren();
    var className = utils.classNames('p-inplace p-component', {
      'p-inplace-closable': props.closable
    }, props.className);
    var rootProps = utils.mergeProps({
      ref: elementRef,
      className: className
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

})({}, React, primereact.api, primereact.button, primereact.icons.times, primereact.utils, primereact.componentbase);
