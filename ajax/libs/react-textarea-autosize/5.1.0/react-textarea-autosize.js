(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
	typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
	(global.TextareaAutosize = factory(global.React,global.PropTypes));
}(this, (function (React,PropTypes) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

var isIE = isBrowser ? !!document.documentElement.currentStyle : false;
var hiddenTextarea = isBrowser && document.createElement('textarea');

var HIDDEN_TEXTAREA_STYLE = {
  'min-height': '0',
  'max-height': 'none',
  height: '0',
  visibility: 'hidden',
  overflow: 'hidden',
  position: 'absolute',
  'z-index': '-1000',
  top: '0',
  right: '0'
};

var SIZING_STYLE = ['letter-spacing', 'line-height', 'font-family', 'font-weight', 'font-size', 'font-style', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width', 'box-sizing'];

var computedStyleCache = {};

function calculateNodeHeight(uiTextNode, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var minRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var maxRows = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  if (hiddenTextarea.parentNode === null) {
    document.body.appendChild(hiddenTextarea);
  }

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  var nodeStyling = calculateNodeStyling(uiTextNode, uid, useCache);

  if (nodeStyling === null) {
    return null;
  }

  var paddingSize = nodeStyling.paddingSize,
      borderSize = nodeStyling.borderSize,
      boxSizing = nodeStyling.boxSizing,
      sizingStyle = nodeStyling.sizingStyle;

  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content

  Object.keys(sizingStyle).forEach(function (key) {
    hiddenTextarea.style[key] = sizingStyle[key];
  });
  Object.keys(HIDDEN_TEXTAREA_STYLE).forEach(function (key) {
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

  // measure height of a textarea with a single row
  hiddenTextarea.value = 'x';
  var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null || maxRows !== null) {
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

  var rowCount = Math.floor(height / singleRowHeight);

  return { height: height, minHeight: minHeight, maxHeight: maxHeight, rowCount: rowCount };
}

function calculateNodeStyling(node, uid) {
  var useCache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (useCache && computedStyleCache[uid]) {
    return computedStyleCache[uid];
  }

  var style = window.getComputedStyle(node);

  if (style === null) {
    return null;
  }

  var sizingStyle = SIZING_STYLE.reduce(function (obj, name) {
    obj[name] = style.getPropertyValue(name);
    return obj;
  }, {});

  var boxSizing = sizingStyle['box-sizing'];

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

  if (useCache) {
    computedStyleCache[uid] = nodeInfo;
  }

  return nodeInfo;
}

var purgeCache = function purgeCache(uid) {
  return delete computedStyleCache[uid];
};

function autoInc() {
  var seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return function () {
    return ++seed;
  };
}

var uid = autoInc();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









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

/**
 * <TextareaAutosize />
 */

var noop = function noop() {};

var _ref = isBrowser && window.requestAnimationFrame ? [window.requestAnimationFrame, window.cancelAnimationFrame] : [setTimeout, clearTimeout];
var onNextFrame = _ref[0];
var clearNextFrameAction = _ref[1];

var TextareaAutosize = function (_React$Component) {
  inherits(TextareaAutosize, _React$Component);

  function TextareaAutosize(props) {
    classCallCheck(this, TextareaAutosize);

    var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

    _this._resizeLock = false;

    _this._onRootDOMNode = function (node) {
      _this._rootDOMNode = node;

      if (_this.props.inputRef) {
        _this.props.inputRef(node);
      }
    };

    _this._onChange = function (event) {
      if (!_this._controlled) {
        _this._resizeComponent();
      }
      _this.props.onChange(event);
    };

    _this._resizeComponent = function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;

      if (typeof _this._rootDOMNode === 'undefined') {
        callback();
        return;
      }

      var nodeHeight = calculateNodeHeight(_this._rootDOMNode, _this._uid, _this.props.useCacheForDOMMeasurements, _this.props.minRows, _this.props.maxRows);

      if (nodeHeight === null) {
        callback();
        return;
      }

      var height = nodeHeight.height,
          minHeight = nodeHeight.minHeight,
          maxHeight = nodeHeight.maxHeight,
          rowCount = nodeHeight.rowCount;


      _this.rowCount = rowCount;

      if (_this.state.height !== height || _this.state.minHeight !== minHeight || _this.state.maxHeight !== maxHeight) {
        _this.setState({ height: height, minHeight: minHeight, maxHeight: maxHeight }, callback);
        return;
      }

      callback();
    };

    _this.state = {
      height: props.style && props.style.height || 0,
      minHeight: -Infinity,
      maxHeight: Infinity
    };

    _this._uid = uid();
    _this._controlled = typeof props.value === 'string';
    return _this;
  }

  TextareaAutosize.prototype.render = function render() {
    var _props = this.props,
        _minRows = _props.minRows,
        _maxRows = _props.maxRows,
        _onHeightChange = _props.onHeightChange,
        _useCacheForDOMMeasurements = _props.useCacheForDOMMeasurements,
        _inputRef = _props.inputRef,
        props = objectWithoutProperties(_props, ['minRows', 'maxRows', 'onHeightChange', 'useCacheForDOMMeasurements', 'inputRef']);


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
    var _this2 = this;

    this._resizeComponent();
    // Working around Firefox bug which runs resize listeners even when other JS is running at the same moment
    // causing competing rerenders (due to setState in the listener) in React.
    // More can be found here - facebook/react#6324
    this._resizeListener = function () {
      if (_this2._resizeLock) {
        return;
      }
      _this2._resizeLock = true;
      _this2._resizeComponent(function () {
        return _this2._resizeLock = false;
      });
    };
    window.addEventListener('resize', this._resizeListener);
  };

  TextareaAutosize.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    var _this3 = this;

    this._clearNextFrame();
    this._onNextFrameActionId = onNextFrame(function () {
      return _this3._resizeComponent();
    });
  };

  TextareaAutosize.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.state.height !== prevState.height) {
      this.props.onHeightChange(this.state.height, this);
    }
  };

  TextareaAutosize.prototype.componentWillUnmount = function componentWillUnmount() {
    this._clearNextFrame();
    window.removeEventListener('resize', this._resizeListener);
    purgeCache(this._uid);
  };

  TextareaAutosize.prototype._clearNextFrame = function _clearNextFrame() {
    clearNextFrameAction(this._onNextFrameActionId);
  };

  return TextareaAutosize;
}(React.Component);

TextareaAutosize.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onHeightChange: PropTypes.func,
  useCacheForDOMMeasurements: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  inputRef: PropTypes.func
};
TextareaAutosize.defaultProps = {
  onChange: noop,
  onHeightChange: noop,
  useCacheForDOMMeasurements: false
};

return TextareaAutosize;

})));
