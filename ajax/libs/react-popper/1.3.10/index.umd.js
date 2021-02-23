(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@hypnosphi/create-react-context'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', '@hypnosphi/create-react-context', 'popper.js'], factory) :
  (factory((global.ReactPopper = {}),global.React,null,global.Popper));
}(this, (function (exports,React,createContext,PopperJS) { 'use strict';

  createContext = createContext && createContext.hasOwnProperty('default') ? createContext['default'] : createContext;
  PopperJS = PopperJS && PopperJS.hasOwnProperty('default') ? PopperJS['default'] : PopperJS;

  function _defineProperty(obj, key, value) {
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

  function _extends() {
    _extends = Object.assign || function (target) {
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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var ManagerReferenceNodeContext = createContext();
  var ManagerReferenceNodeSetterContext = createContext();

  var Manager =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(Manager, _React$Component);

    function Manager() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "referenceNode", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setReferenceNode", function (newReferenceNode) {
        if (newReferenceNode && _this.referenceNode !== newReferenceNode) {
          _this.referenceNode = newReferenceNode;

          _this.forceUpdate();
        }
      });

      return _this;
    }

    var _proto = Manager.prototype;

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.referenceNode = null;
    };

    _proto.render = function render() {
      return React.createElement(ManagerReferenceNodeContext.Provider, {
        value: this.referenceNode
      }, React.createElement(ManagerReferenceNodeSetterContext.Provider, {
        value: this.setReferenceNode
      }, this.props.children));
    };

    return Manager;
  }(React.Component);

  /**
   * Takes an argument and if it's an array, returns the first item in the array,
   * otherwise returns the argument. Used for Preact compatibility.
   */
  var unwrapArray = function unwrapArray(arg) {
    return Array.isArray(arg) ? arg[0] : arg;
  };
  /**
   * Takes a maybe-undefined function and arbitrary args and invokes the function
   * only if it is defined.
   */

  var safeInvoke = function safeInvoke(fn) {
    if (typeof fn === "function") {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return fn.apply(void 0, args);
    }
  };
  /**
   * Does a shallow equality check of two objects by comparing the reference
   * equality of each value.
   */

  var shallowEqual = function shallowEqual(objA, objB) {
    var aKeys = Object.keys(objA);
    var bKeys = Object.keys(objB);

    if (bKeys.length !== aKeys.length) {
      return false;
    }

    for (var i = 0; i < bKeys.length; i++) {
      var key = aKeys[i];

      if (objA[key] !== objB[key]) {
        return false;
      }
    }

    return true;
  };
  /**
   * Sets a ref using either a ref callback or a ref object
   */

  var setRef = function setRef(ref, node) {
    // if its a function call it
    if (typeof ref === "function") {
      return safeInvoke(ref, node);
    } // otherwise we should treat it as a ref object
    else if (ref != null) {
        ref.current = node;
      }
  };

  var initialStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none'
  };
  var initialArrowStyle = {};
  var InnerPopper =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(InnerPopper, _React$Component);

    function InnerPopper() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
        data: undefined,
        placement: undefined
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popperInstance", void 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "popperNode", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "arrowNode", null);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setPopperNode", function (popperNode) {
        if (!popperNode || _this.popperNode === popperNode) return;
        setRef(_this.props.innerRef, popperNode);
        _this.popperNode = popperNode;

        _this.updatePopperInstance();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setArrowNode", function (arrowNode) {
        _this.arrowNode = arrowNode;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateStateModifier", {
        enabled: true,
        order: 900,
        fn: function fn(data) {
          var placement = data.placement;

          _this.setState({
            data: data,
            placement: placement
          });

          return data;
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOptions", function () {
        return {
          placement: _this.props.placement,
          eventsEnabled: _this.props.eventsEnabled,
          positionFixed: _this.props.positionFixed,
          modifiers: _extends({}, _this.props.modifiers, {
            arrow: _extends({}, _this.props.modifiers && _this.props.modifiers.arrow, {
              enabled: !!_this.arrowNode,
              element: _this.arrowNode
            }),
            applyStyle: {
              enabled: false
            },
            updateStateModifier: _this.updateStateModifier
          })
        };
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPopperStyle", function () {
        return !_this.popperNode || !_this.state.data ? initialStyle : _extends({
          position: _this.state.data.offsets.popper.position
        }, _this.state.data.styles);
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPopperPlacement", function () {
        return !_this.state.data ? undefined : _this.state.placement;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getArrowStyle", function () {
        return !_this.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getOutOfBoundariesState", function () {
        return _this.state.data ? _this.state.data.hide : undefined;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "destroyPopperInstance", function () {
        if (!_this.popperInstance) return;

        _this.popperInstance.destroy();

        _this.popperInstance = null;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updatePopperInstance", function () {
        _this.destroyPopperInstance();

        var _assertThisInitialize = _assertThisInitialized(_assertThisInitialized(_this)),
            popperNode = _assertThisInitialize.popperNode;

        var referenceElement = _this.props.referenceElement;
        if (!referenceElement || !popperNode) return;
        _this.popperInstance = new PopperJS(referenceElement, popperNode, _this.getOptions());
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scheduleUpdate", function () {
        if (_this.popperInstance) {
          _this.popperInstance.scheduleUpdate();
        }
      });

      return _this;
    }

    var _proto = InnerPopper.prototype;

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      // If the Popper.js options have changed, update the instance (destroy + create)
      if (this.props.placement !== prevProps.placement || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed || this.props.modifiers !== prevProps.modifiers) {
        // develop only check that modifiers isn't being updated needlessly
        {
          if (this.props.modifiers !== prevProps.modifiers && this.props.modifiers != null && prevProps.modifiers != null && shallowEqual(this.props.modifiers, prevProps.modifiers)) {
            console.warn("'modifiers' prop reference updated even though all values appear the same.\nConsider memoizing the 'modifiers' object to avoid needless rendering.");
          }
        }

        this.updatePopperInstance();
      } else if (this.props.eventsEnabled !== prevProps.eventsEnabled && this.popperInstance) {
        this.props.eventsEnabled ? this.popperInstance.enableEventListeners() : this.popperInstance.disableEventListeners();
      } // A placement difference in state means popper determined a new placement
      // apart from the props value. By the time the popper element is rendered with
      // the new position Popper has already measured it, if the place change triggers
      // a size change it will result in a misaligned popper. So we schedule an update to be sure.


      if (prevState.placement !== this.state.placement) {
        this.scheduleUpdate();
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      setRef(this.props.innerRef, null);
      this.destroyPopperInstance();
    };

    _proto.render = function render() {
      return unwrapArray(this.props.children)({
        ref: this.setPopperNode,
        style: this.getPopperStyle(),
        placement: this.getPopperPlacement(),
        outOfBoundaries: this.getOutOfBoundariesState(),
        scheduleUpdate: this.scheduleUpdate,
        arrowProps: {
          ref: this.setArrowNode,
          style: this.getArrowStyle()
        }
      });
    };

    return InnerPopper;
  }(React.Component);

  _defineProperty(InnerPopper, "defaultProps", {
    placement: 'bottom',
    eventsEnabled: true,
    referenceElement: undefined,
    positionFixed: false
  });

  var placements = PopperJS.placements;
  function Popper(_ref) {
    var referenceElement = _ref.referenceElement,
        props = _objectWithoutPropertiesLoose(_ref, ["referenceElement"]);

    return React.createElement(ManagerReferenceNodeContext.Consumer, null, function (referenceNode) {
      return React.createElement(InnerPopper, _extends({
        referenceElement: referenceElement !== undefined ? referenceElement : referenceNode
      }, props));
    });
  }

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var warning = function() {};

  {
    var printWarning = function printWarning(format, args) {
      var len = arguments.length;
      args = new Array(len > 1 ? len - 1 : 0);
      for (var key = 1; key < len; key++) {
        args[key - 1] = arguments[key];
      }
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function(condition, format, args) {
      var len = arguments.length;
      args = new Array(len > 2 ? len - 2 : 0);
      for (var key = 2; key < len; key++) {
        args[key - 2] = arguments[key];
      }
      if (format === undefined) {
        throw new Error(
            '`warning(condition, format, ...args)` requires a warning ' +
            'message argument'
        );
      }
      if (!condition) {
        printWarning.apply(null, [format].concat(args));
      }
    };
  }

  var warning_1 = warning;

  var InnerReference =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(InnerReference, _React$Component);

    function InnerReference() {
      var _this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "refHandler", function (node) {
        setRef(_this.props.innerRef, node);
        safeInvoke(_this.props.setReferenceNode, node);
      });

      return _this;
    }

    var _proto = InnerReference.prototype;

    _proto.componentWillUnmount = function componentWillUnmount() {
      setRef(this.props.innerRef, null);
    };

    _proto.render = function render() {
      warning_1(Boolean(this.props.setReferenceNode), '`Reference` should not be used outside of a `Manager` component.');
      return unwrapArray(this.props.children)({
        ref: this.refHandler
      });
    };

    return InnerReference;
  }(React.Component);

  function Reference(props) {
    return React.createElement(ManagerReferenceNodeSetterContext.Consumer, null, function (setReferenceNode) {
      return React.createElement(InnerReference, _extends({
        setReferenceNode: setReferenceNode
      }, props));
    });
  }

  // Public components
   // Public types

  exports.Popper = Popper;
  exports.placements = placements;
  exports.Manager = Manager;
  exports.Reference = Reference;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
