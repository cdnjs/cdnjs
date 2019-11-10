(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
  typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
  (global.TextareaAutosize = factory(global.React,global.PropTypes));
}(this, (function (React,PropTypes) { 'use strict';

React = 'default' in React ? React['default'] : React;
PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;

/**
 * calculateNodeHeight(uiTextNode, useCache = false)
 */
var browser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE = browser ? !!document.documentElement.currentStyle : false;
var boxSizingProp = function () {
  if (!browser) {
    return 'box-sizing';
  }
  var documentStyle = window.getComputedStyle(document.documentElement);
  // TODO: remove prefixed - they are probably obsolete, were introduced in by df79cf502630744d40233b64cad01770e5584610 in 2014
  return documentStyle.getPropertyValue('box-sizing') ? 'box-sizing' : documentStyle.getPropertyValue('-moz-box-sizing') ? '-moz-box-sizing' : documentStyle.getPropertyValue('-webkit-box-sizing') ? '-webkit-box-sizing' : 'box-sizing';
}();

var HIDDEN_TEXTAREA_STYLE = {
  'min-height': '0',
  'max-height': 'none',
  'height': '0',
  'visibility': 'hidden',
  'overflow': 'hidden',
  'position': 'absolute',
  'z-index': '-1000',
  'top': '0',
  'right': '0'
};

var SIZING_STYLE = ['letter-spacing', 'line-height', 'font-family', 'font-weight', 'font-size', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', boxSizingProp];

var computedStyleCache = {};
var hiddenTextarea = void 0;

function calculateNodeHeight(uiTextNode) {
  var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  } else if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox

  var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
      paddingSize = _calculateNodeStyling.paddingSize,
      borderSize = _calculateNodeStyling.borderSize,
      boxSizing = _calculateNodeStyling.boxSizing,
      sizingStyle = _calculateNodeStyling.sizingStyle;

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content


  Object.keys(sizingStyle).map(function (key) {
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  Object.keys(HIDDEN_TEXTAREA_STYLE).map(function (key) {
    hiddenTextarea.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key], 'important');
  });
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || 'x';

  var minHeight = -Infinity;
  var maxHeight = Infinity;
  var height = hiddenTextarea.scrollHeight;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height = height - paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = 'x';
    var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      height = Math.min(maxHeight, height);
    }
  }
  return { height: height, minHeight: minHeight, maxHeight: maxHeight };
}

function calculateNodeStyling(node) {
  var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // TODO: generate id in constructor + clear cache in componentWillUnmount
  var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');

  if (useCache && computedStyleCache[nodeRef]) {
    return computedStyleCache[nodeRef];
  }

  var style = window.getComputedStyle(node);

  var sizingStyle = SIZING_STYLE.reduce(function (obj, name) {
    obj[name] = style.getPropertyValue(name);
    return obj;
  }, {});

  var boxSizing = sizingStyle[boxSizingProp];

  // IE (Edge has already correct behaviour) returns content width as computed width
  // so we need to add manually padding and border widths
  if (isIE && boxSizing === 'border-box') {
    sizingStyle.width = parseFloat(sizingStyle.width) + parseFloat(style['border-right-width']) + parseFloat(style['border-left-width']) + parseFloat(style['padding-right']) + parseFloat(style['padding-left']) + 'px';
  }

  var paddingSize = parseFloat(sizingStyle['padding-bottom']) + parseFloat(sizingStyle['padding-top']);

  var borderSize = parseFloat(sizingStyle['border-bottom-width']) + parseFloat(sizingStyle['border-top-width']);

  var nodeInfo = {
    sizingStyle: sizingStyle,
    paddingSize: paddingSize,
    borderSize: borderSize,
    boxSizing: boxSizing
  };

  if (useCache && nodeRef) {
    computedStyleCache[nodeRef] = nodeInfo;
  }

  return nodeInfo;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
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

var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * <TextareaAutosize />
 */

var noop = function noop() {};

var TextareaAutosize = function (_React$Component) {
  inherits(TextareaAutosize, _React$Component);

  function TextareaAutosize(props) {
    classCallCheck(this, TextareaAutosize);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._onRootDOMNode = function (node) {
      _this._rootDOMNode = node;
      if (_this.props.inputRef) _this.props.inputRef(node);
    };

    _this._onChange = function (event) {
      if (!_this._controlled) {
        _this._resizeComponent();
      }
      var _this$props = _this.props,
          valueLink = _this$props.valueLink,
          onChange = _this$props.onChange;

      if (valueLink) {
        valueLink.requestChange(event.target.value);
      } else {
        onChange(event);
      }
    };

    _this._resizeComponent = function () {
      if (!_this._rootDOMNode) {
        return;
      }

      var _calculateNodeHeight = calculateNodeHeight(_this._rootDOMNode, _this.props.useCacheForDOMMeasurements, _this.props.rows || _this.props.minRows, _this.props.maxRows),
          height = _calculateNodeHeight.height,
          minHeight = _calculateNodeHeight.minHeight,
          maxHeight = _calculateNodeHeight.maxHeight;

      if (_this.state.height !== height || _this.state.minHeight !== minHeight || _this.state.maxHeight !== maxHeight) {
        _this.setState({ height: height, minHeight: minHeight, maxHeight: maxHeight });
      }
    };

    _this.state = {
      height: props.style && props.style.height || 0,
      minHeight: -Infinity,
      maxHeight: Infinity
    };

    _this._controlled = typeof props.value === 'string';
    return _this;
  }

  TextareaAutosize.prototype.render = function render() {
    var _props = this.props,
        valueLink = _props.valueLink,
        _minRows = _props.minRows,
        _maxRows = _props.maxRows,
        _onHeightChange = _props.onHeightChange,
        _useCacheForDOMMeasurements = _props.useCacheForDOMMeasurements,
        _inputRef = _props.inputRef,
        props = objectWithoutProperties(_props, ['valueLink', 'minRows', 'maxRows', 'onHeightChange', 'useCacheForDOMMeasurements', 'inputRef']);


    if ((typeof valueLink === 'undefined' ? 'undefined' : _typeof(valueLink)) === 'object') {
      props.value = valueLink.value;
    }

    props.style = _extends({}, props.style, {
      height: this.state.height
    });

    var maxHeight = Math.max(props.style.maxHeight || Infinity, this.state.maxHeight);

    if (maxHeight < this.state.height) {
      props.style.overflow = 'hidden';
    }

    return React.createElement('textarea', _extends({}, props, {
      onChange: this._onChange,
      ref: this._onRootDOMNode
    }));
  };

  TextareaAutosize.prototype.componentDidMount = function componentDidMount() {
    this._resizeComponent();
    window.addEventListener('resize', this._resizeComponent);
  };

  TextareaAutosize.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    // Re-render with the new content then recalculate the height as required.
    this._clearNextFrame();
    this._onNextFrameActionId = onNextFrame(this._resizeComponent);
  };

  TextareaAutosize.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Invoke callback when old height does not equal to new one.
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height);
    }
  };

  TextareaAutosize.prototype.componentWillUnmount = function componentWillUnmount() {
    // Remove any scheduled events to prevent manipulating the node after it's
    // been unmounted.
    this._clearNextFrame();
    window.removeEventListener('resize', this._resizeComponent);
  };

  TextareaAutosize.prototype._clearNextFrame = function _clearNextFrame() {
    if (this._onNextFrameActionId) {
      clearNextFrameAction(this._onNextFrameActionId);
    }
  };

  /**
   * Put focus on a <textarea /> DOM element.
   */
  TextareaAutosize.prototype.focus = function focus() {
    this._rootDOMNode.focus();
  };

  /**
   * Shifts focus away from a <textarea /> DOM element.
   */


  TextareaAutosize.prototype.blur = function blur() {
    this._rootDOMNode.blur();
  };

  createClass(TextareaAutosize, [{
    key: 'value',


    /**
     * Read the current value of <textarea /> from DOM.
     */
    get: function get() {
      return this._rootDOMNode.value;
    }

    /**
     * Set the current value of <textarea /> DOM node.
     */
    ,
    set: function set(val) {
      this._rootDOMNode.value = val;
    }

    /**
     * Read the current selectionStart of <textarea /> from DOM.
     */

  }, {
    key: 'selectionStart',
    get: function get() {
      return this._rootDOMNode.selectionStart;
    }

    /**
     * Set the current selectionStart of <textarea /> DOM node.
     */
    ,
    set: function set(selectionStart) {
      this._rootDOMNode.selectionStart = selectionStart;
    }

    /**
     * Read the current selectionEnd of <textarea /> from DOM.
     */

  }, {
    key: 'selectionEnd',
    get: function get() {
      return this._rootDOMNode.selectionEnd;
    }

    /**
     * Set the current selectionEnd of <textarea /> DOM node.
     */
    ,
    set: function set(selectionEnd) {
      this._rootDOMNode.selectionEnd = selectionEnd;
    }
  }]);
  return TextareaAutosize;
}(React.Component);

TextareaAutosize.propTypes = {
  /**
   * Current textarea value.
   */
  value: PropTypes.string,

  /**
   * Callback on value change.
   */
  onChange: PropTypes.func,

  /**
   * Callback on height changes.
   */
  onHeightChange: PropTypes.func,

  /**
   * Try to cache DOM measurements performed by component so that we don't
   * touch DOM when it's not needed.
   *
   * This optimization doesn't work if we dynamically style <textarea />
   * component.
   */
  useCacheForDOMMeasurements: PropTypes.bool,

  /**
   * Minimal numbder of rows to show.
   */
  rows: PropTypes.number,

  /**
   * Alias for `rows`.
   */
  minRows: PropTypes.number,

  /**
   * Maximum number of rows to show.
   */
  maxRows: PropTypes.number,

  /**
   * Allows an owner to retrieve the DOM node.
   */
  inputRef: PropTypes.func
};
TextareaAutosize.defaultProps = {
  onChange: noop,
  onHeightChange: noop,
  useCacheForDOMMeasurements: false
};
function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

return TextareaAutosize;

})));
