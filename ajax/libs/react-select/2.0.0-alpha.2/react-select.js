(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('glam'), require('react-input-autosize')) :
	typeof define === 'function' && define.amd ? define(['react', 'glam', 'react-input-autosize'], factory) :
	(global.Select = factory(global.React,global.glam,global.AutosizeInput));
}(this, (function (React,glam,AutosizeInput) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;
glam = glam && glam.hasOwnProperty('default') ? glam['default'] : glam;
AutosizeInput = AutosizeInput && AutosizeInput.hasOwnProperty('default') ? AutosizeInput['default'] : AutosizeInput;

function handleInputChange(inputValue, onInputChange) {
  if (onInputChange) {
    var newValue = onInputChange(inputValue);
    if (typeof newValue === 'string') return newValue;
  }
  return inputValue;
}

var CLASS_PREFIX = 'react-select';

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
function className(name, state) {
  var arr = Array.isArray(name) ? name : [name];

  // loop through state object, remove falsey values and combine with name
  if (state && typeof name === 'string') {
    for (var _key in state) {
      if (state.hasOwnProperty(_key) && state[_key]) {
        arr.push(name + '--' + _key);
      }
    }
  }

  // prefix everything and return a string
  return arr.map(function (cn) {
    return CLASS_PREFIX + '__' + cn;
  }).join(' ');
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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

// @jsx glam
var Base = function Base(_ref) {
  var css = _ref.css,
      innerRef = _ref.innerRef,
      Tag = _ref.tag,
      props = objectWithoutProperties(_ref, ['css', 'innerRef', 'tag']);
  return glam(Tag, _extends({ ref: innerRef, css: _extends({ boxSizing: 'border-box' }, css) }, props));
};


var Div = function Div(props) {
  return glam(Base, _extends({ tag: 'div' }, props));
};
var Span = function Span(props) {
  return glam(Base, _extends({ tag: 'span' }, props));
};
var Strong = function Strong(props) {
  return glam(Base, _extends({ tag: 'strong' }, props));
};


var Ul = function Ul(_ref2) {
  var css = _ref2.css,
      props = objectWithoutProperties(_ref2, ['css']);
  return glam(Base, _extends({ tag: 'ul', css: _extends({ margin: 0, padding: 0 }, css) }, props));
};
var Li = function Li(_ref3) {
  var css = _ref3.css,
      props = objectWithoutProperties(_ref3, ['css']);
  return glam(Base, _extends({ tag: 'li', css: _extends({ listStyle: 'none' }, css) }, props));
};

var SROnly = function SROnly(_ref4) {
  var _ref4$tag = _ref4.tag,
      Tag = _ref4$tag === undefined ? 'div' : _ref4$tag,
      props = objectWithoutProperties(_ref4, ['tag']);
  return glam(Tag, _extends({
    css: {
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1
    }
  }, props));
};

function marginHorizontal(p) {
  return { marginLeft: p, marginRight: p };
}
function marginVertical(p) {
  return { marginBottom: p, marginTop: p };
}

function paddingHorizontal(p) {
  return { paddingLeft: p, paddingRight: p };
}
function paddingVertical(p) {
  return { paddingBottom: p, paddingTop: p };
}

var borderRadius = 4;

var colors = {
	text: '#222',
	textLight: '#444',
	primary: '#2684FF',
	primaryLight: '#DEEBFF',
	danger: '#DE350B',
	dangerLight: '#FFBDAD',

	neutral0: 'hsl(0, 0%, 100%)',
	neutral1: 'hsl(0, 0%, 99%)',
	neutral2: 'hsl(0, 0%, 98%)',
	neutral3: 'hsl(0, 0%, 97%)',
	neutral4: 'hsl(0, 0%, 96%)',
	neutral5: 'hsl(0, 0%, 95%)',
	neutral10: 'hsl(0, 0%, 90%)',
	neutral20: 'hsl(0, 0%, 80%)',
	neutral30: 'hsl(0, 0%, 70%)',
	neutral40: 'hsl(0, 0%, 60%)',
	neutral50: 'hsl(0, 0%, 50%)',
	neutral60: 'hsl(0, 0%, 40%)',
	neutral70: 'hsl(0, 0%, 30%)',
	neutral80: 'hsl(0, 0%, 20%)',
	neutral90: 'hsl(0, 0%, 10%)',
	neutral100: 'hsl(0, 0%, 0%)',

	neutral1a: 'hsla(0, 0%, 0%, 0.01)',
	neutral2a: 'hsla(0, 0%, 0%, 0.02)',
	neutral3a: 'hsla(0, 0%, 0%, 0.03)',
	neutral4a: 'hsla(0, 0%, 0%, 0.04)',
	neutral5a: 'hsla(0, 0%, 0%, 0.05)',
	neutral10a: 'hsla(0, 0%, 0%, 0.1)',
	neutral20a: 'hsla(0, 0%, 0%, 0.2)',
	neutral30a: 'hsla(0, 0%, 0%, 0.3)',
	neutral40a: 'hsla(0, 0%, 0%, 0.4)',
	neutral50a: 'hsla(0, 0%, 0%, 0.5)',
	neutral60a: 'hsla(0, 0%, 0%, 0.6)',
	neutral70a: 'hsla(0, 0%, 0%, 0.7)',
	neutral80a: 'hsla(0, 0%, 0%, 0.8)',
	neutral90a: 'hsla(0, 0%, 0%, 0.9)'
};

var spacing = {
	controlHeight: 36,
	baseUnit: 4
};

// ==============================
// Root Container
// ==============================

var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled;
  return {
    pointerEvents: isDisabled ? 'none' : 'initial', // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      cleanProps = objectWithoutProperties(props, ['getStyles', 'isDisabled']);

  return React__default.createElement(Div, _extends({
    css: getStyles('container', props),
    className: className('container', { isDisabled: isDisabled })
  }, cleanProps));
};

var valueContainerCSS = function valueContainerCSS(_ref2) {
  var maxHeight = _ref2.maxHeight;
  return _extends({
    alignItems: 'baseline',
    display: 'flex ',
    flex: 1,
    flexWrap: 'wrap',
    maxHeight: maxHeight, // max-height allows scroll when multi
    overflowY: 'auto'
  }, paddingHorizontal(spacing.baseUnit * 2), paddingVertical(spacing.baseUnit / 2));
};
var ValueContainer = function (_Component) {
  inherits(ValueContainer, _Component);

  function ValueContainer() {
    var _ref3;

    var _temp, _this, _ret;

    classCallCheck(this, ValueContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref3 = ValueContainer.__proto__ || Object.getPrototypeOf(ValueContainer)).call.apply(_ref3, [this].concat(args))), _this), _this.shouldScrollBottom = false, _this.getScrollContainer = function (ref) {
      _this.node = ref;
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(ValueContainer, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      if (!this.props.isMulti) return;

      // scroll only if the user was already at the bottom
      var total = this.node.scrollTop + this.node.offsetHeight;
      this.shouldScrollBottom = total === this.node.scrollHeight;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.props.isMulti) return;

      // ensure we're showing items being added by forcing scroll to the bottom
      if (this.shouldScrollBottom) {
        this.node.scrollTop = this.node.scrollHeight;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isMulti = _props.isMulti,
          getStyles = _props.getStyles,
          hasValue = _props.hasValue,
          maxHeight = _props.maxHeight,
          cleanProps = objectWithoutProperties(_props, ['isMulti', 'getStyles', 'hasValue', 'maxHeight']);


      return React__default.createElement(Div, _extends({
        innerRef: isMulti ? this.getScrollContainer : null,
        className: className('value-container', { isMulti: isMulti, hasValue: hasValue }),
        css: getStyles('valueContainer', this.props)
      }, cleanProps));
    }
  }]);
  return ValueContainer;
}(React.Component);

// ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    display: 'flex ',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(_ref4) {
  var getStyles = _ref4.getStyles,
      props = objectWithoutProperties(_ref4, ['getStyles']);

  return React__default.createElement(Div, _extends({
    className: className('indicators'),
    css: getStyles('indicatorsContainer', props)
  }, props));
};

// @jsx glam
// ==============================
// Dropdown & Clear Icons
// ==============================

var Svg = function Svg(_ref) {
  var size = _ref.size,
      props = objectWithoutProperties(_ref, ['size']);
  return glam('svg', _extends({
    height: size,
    width: size,
    viewBox: '0 0 20 20',
    css: {
      display: 'inline-block',
      fill: 'currentColor',
      lineHeight: 1,
      stroke: 'currentColor',
      strokeWidth: 0
    }
  }, props));
};
var CrossIcon = function CrossIcon(props) {
  return glam(
    Svg,
    _extends({ size: 20, className: className(['icon', 'cross-icon']) }, props),
    glam(
      'title',
      null,
      'cross'
    ),
    glam('path', { d: 'M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z' })
  );
};
var DownChevron = function DownChevron(props) {
  return glam(
    Svg,
    _extends({ size: 20, className: className(['icon', 'down-icon']) }, props),
    glam(
      'title',
      null,
      'chevron-down'
    ),
    glam('path', { d: 'M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z' })
  );
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

var css = function css(_ref2) {
  var isFocused = _ref2.isFocused;
  return {
    color: isFocused ? colors.text : colors.neutral20,
    cursor: 'pointer',
    display: 'flex ',
    padding: '8px 2px',
    transition: 'opacity 200ms',

    ':first-child': { paddingLeft: spacing.baseUnit * 2 },
    ':last-child': { paddingRight: spacing.baseUnit * 2 },

    ':hover': {
      color: isFocused ? colors.text : colors.neutral40
    }
  };
};

var Indicator = function Indicator(props) {
  var getStyles = props.getStyles,
      isFocused = props.isFocused,
      cleanProps = objectWithoutProperties(props, ['getStyles', 'isFocused']);

  return glam(Div, _extends({ css: getStyles('indicator', props) }, cleanProps));
};

var DropdownIndicator = function DropdownIndicator(_ref3) {
  var children = _ref3.children,
      props = objectWithoutProperties(_ref3, ['children']);
  return glam(
    Indicator,
    _extends({
      className: className(['indicator', 'dropdown-indicator'])
    }, props),
    children
  );
};
DropdownIndicator.defaultProps = {
  children: glam(DownChevron, { label: 'Toggle Menu' })
};

var ClearIndicator = function ClearIndicator(_ref4) {
  var children = _ref4.children,
      props = objectWithoutProperties(_ref4, ['children']);
  return glam(
    Indicator,
    _extends({ className: className(['indicator', 'clear-indicator']) }, props),
    children
  );
};
ClearIndicator.defaultProps = {
  children: glam(CrossIcon, { label: 'Clear Value' })
};

// ==============================
// Loading
// ==============================

var keyframesName = 'react-select-loading-indicator';

var LoadingContainer = function LoadingContainer(_ref5) {
  var size = _ref5.size,
      props = objectWithoutProperties(_ref5, ['size']);
  return glam(Div, _extends({
    css: {
      alignSelf: 'center',
      fontSize: size,
      lineHeight: 1,
      marginRight: size,
      textAlign: 'center',
      verticalAlign: 'middle'
    }
  }, props));
};

var LoadingDot = function LoadingDot(_ref6) {
  var color = _ref6.color,
      delay = _ref6.delay,
      offset = _ref6.offset;
  return glam(Span, {
    css: {
      animationDuration: '1s',
      animationDelay: delay + 'ms',
      animationIterationCount: 'infinite',
      animationName: keyframesName,
      animationTimingFunction: 'ease-in-out',
      backgroundColor: color,
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : null,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    }
  });
};
// TODO @jossmac Source `keyframes` solution for glam
// - at the very least, ensure this is only rendered once to the DOM
var LoadingAnimation = function LoadingAnimation() {
  return glam(
    'style',
    { type: 'text/css' },
    '@keyframes ' + keyframesName + ' {\n        0%, 80%, 100% { opacity: 0; }\n        40% { opacity: 1; }\n    };'
  );
};

var LoadingIcon = function LoadingIcon(_ref7) {
  var isFocused = _ref7.isFocused,
      _ref7$size = _ref7.size,
      size = _ref7$size === undefined ? 4 : _ref7$size;

  var clr = isFocused ? colors.text : colors.neutral20;

  return glam(
    LoadingContainer,
    { size: size },
    glam(LoadingAnimation, null),
    glam(LoadingDot, { color: clr }),
    glam(LoadingDot, { color: clr, delay: 160, offset: true }),
    glam(LoadingDot, { color: clr, delay: 320, offset: true }),
    glam(
      SROnly,
      null,
      'Loading'
    )
  );
};

var LoadingIndicator = function LoadingIndicator(_ref8) {
  var children = _ref8.children,
      isFocused = _ref8.isFocused,
      props = objectWithoutProperties(_ref8, ['children', 'isFocused']);
  return glam(
    Indicator,
    _extends({
      role: 'presentation',
      className: className(['indicator', 'loading-indicator'])
    }, props),
    glam(LoadingIcon, { isFocused: isFocused })
  );
};

var css$1 = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused;
  return {
    alignItems: 'center',
    backgroundColor: isDisabled ? colors.neutral5 : isFocused ? colors.neutral0 : colors.neutral2,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? '0 0 0 1px ' + colors.primary : null,
    cursor: 'default',
    display: 'flex ',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms',

    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  };
};

var Control = function Control(props) {
  var getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      cleanProps = objectWithoutProperties(props, ['getStyles', 'isDisabled', 'isFocused']);

  return React__default.createElement(Div, _extends({
    className: className('control', { isDisabled: isDisabled, isFocused: isFocused }),
    css: getStyles('control', props)
  }, cleanProps));
};

var css$2 = function css() {
  return paddingVertical(spacing.baseUnit * 2);
};

var Group = function Group(props) {
  var components = props.components,
      getStyles = props.getStyles,
      children = props.children,
      label = props.label,
      cleanProps = objectWithoutProperties(props, ['components', 'getStyles', 'children', 'label']);
  var Heading = components.Heading;

  return React__default.createElement(
    Li,
    _extends({
      'aria-label': label,
      className: className('group'),
      css: getStyles('group', props)
    }, cleanProps),
    React__default.createElement(
      Heading,
      null,
      label
    ),
    React__default.createElement(
      Ul,
      null,
      children
    )
  );
};

var GroupHeading = function GroupHeading(props) {
  return React__default.createElement(Strong, _extends({
    className: className('group-heading'),
    css: _extends({
      color: '#999',
      cursor: 'default',
      display: 'block',
      fontSize: '75%',
      fontWeight: '500',
      marginBottom: '0.25em'
    }, paddingHorizontal(spacing.baseUnit * 3), {
      textTransform: 'uppercase'
    })
  }, props));
};

var css$3 = function css() {
  return marginHorizontal(spacing.baseUnit / 2);
};

var Input = function Input(_ref) {
  var getStyles = _ref.getStyles,
      innerRef = _ref.innerRef,
      isHidden = _ref.isHidden,
      props = objectWithoutProperties(_ref, ['getStyles', 'innerRef', 'isHidden']);
  return React__default.createElement(
    Div,
    { css: getStyles('input', props) },
    React__default.createElement(AutosizeInput, _extends({
      className: className('input'),
      inputRef: innerRef,
      inputStyle: {
        background: 0,
        border: 0,
        padding: 0,
        fontSize: 'inherit',
        outline: 0,
        opacity: isHidden ? 0 : 1
      }
    }, props))
  );
};

var menuCSS = function menuCSS() {
  return _extends({
    backgroundColor: colors.neutral0,
    boxShadow: '0 0 0 1px ' + colors.neutral10a + ', 0 4px 11px ' + colors.neutral10a,
    borderRadius: borderRadius
  }, marginVertical(spacing.baseUnit * 2), {
    position: 'absolute',
    top: '100%',
    width: '100%',
    zIndex: 1
  });
};

var Menu = function Menu(_ref) {
  var getStyles = _ref.getStyles,
      props = objectWithoutProperties(_ref, ['getStyles']);
  return React__default.createElement(Div, _extends({
    className: className('menu'),
    css: getStyles('menu', props)
  }, props));
};

var menulistCSS = function menulistCSS(_ref2) {
  var maxHeight = _ref2.maxHeight;
  return _extends({
    maxHeight: maxHeight,
    overflowY: 'auto'
  }, paddingVertical(spacing.baseUnit), {
    position: 'relative' // required for offset[Height, Top] > keyboard scroll
  });
};
var MenuList = function MenuList(props) {
  var getStyles = props.getStyles,
      isMulti = props.isMulti,
      maxHeight = props.maxHeight,
      cleanProps = objectWithoutProperties(props, ['getStyles', 'isMulti', 'maxHeight']);

  return React__default.createElement(Ul, _extends({
    className: className('menu-list', { isMulti: isMulti }),
    css: getStyles('menulist', props)
  }, cleanProps));
};

var NoOptionsMessage = function NoOptionsMessage(props) {
  return React__default.createElement(Div, _extends({
    className: className('menu-no-options-message'),
    css: _extends({
      color: colors.neutral40
    }, paddingHorizontal(spacing.baseUnit * 3), paddingVertical(spacing.baseUnit * 2), {
      textAlign: 'center'
    })
  }, props));
};

var LoadingMessage = function LoadingMessage(props) {
  return React__default.createElement(Div, _extends({
    className: className('menu-loading-message'),
    css: _extends({
      color: colors.neutral40
    }, paddingHorizontal(spacing.baseUnit * 3), paddingVertical(spacing.baseUnit * 2), {
      textAlign: 'center'
    })
  }, props));
};

var multiValueCSS = function multiValueCSS() {
  return {
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    display: 'flex ',
    margin: spacing.baseUnit / 2
  };
};
var multiValueLabelCSS = function multiValueLabelCSS() {
  return {
    color: colors.text,
    fontSize: '85%',
    padding: 3,
    paddingLeft: 6
  };
};
var multiValueRemoveCSS = function multiValueRemoveCSS() {
  return _extends({
    alignItems: 'center',
    borderRadius: borderRadius / 2,
    color: colors.textLight,
    display: 'flex '
  }, paddingHorizontal(spacing.baseUnit), {

    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  });
};

var MultiValueLabel = Div;
var MultiValueRemove = Div;

var MultiValue = function MultiValue(props) {
  var components = props.components,
      data = props.data,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      label = props.label,
      onRemoveClick = props.onRemoveClick,
      onRemoveMouseDown = props.onRemoveMouseDown,
      cleanProps = objectWithoutProperties(props, ['components', 'data', 'getStyles', 'isDisabled', 'label', 'onRemoveClick', 'onRemoveMouseDown']);

  var cn = {
    root: className('multi-value', { isDisabled: isDisabled }),
    label: className('multi-value__label'),
    remove: className('multi-value__remove')
  };
  var css$$1 = {
    root: getStyles('multiValue', props),
    label: getStyles('multiValueLabel', props),
    remove: getStyles('multiValueRemove', props)
  };
  var Label = components.Label,
      Remove = components.Remove;


  return React__default.createElement(
    Div,
    _extends({ className: cn.root, css: css$$1.root }, cleanProps),
    React__default.createElement(
      Label,
      { className: cn.label, css: css$$1.label },
      label
    ),
    React__default.createElement(
      Remove,
      {
        className: cn.remove,
        css: css$$1.remove,
        onClick: onRemoveClick,
        onMouseDown: onRemoveMouseDown
      },
      React__default.createElement(CrossIcon, { label: 'Remove ' + label, size: 14 })
    )
  );
};

var css$4 = function css(_ref) {
  var isDisabled = _ref.isDisabled,
      isFocused = _ref.isFocused,
      isSelected = _ref.isSelected;
  return _extends({
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primaryLight : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit'
  }, paddingHorizontal(spacing.baseUnit * 3), paddingVertical(spacing.baseUnit * 2), {
    width: '100%'
  });
};

var Option = function Option(props) {
  var data = props.data,
      getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isFocused = props.isFocused,
      isSelected = props.isSelected,
      cleanProps = objectWithoutProperties(props, ['data', 'getStyles', 'isDisabled', 'isFocused', 'isSelected']);

  return React__default.createElement(Li, _extends({
    className: className('option', { isFocused: isFocused, isSelected: isSelected }),
    css: getStyles('option', props)
  }, cleanProps));
};

var css$5 = function css() {
  return _extends({}, marginHorizontal(spacing.baseUnit / 2), {
    color: colors.neutral60,
    position: 'absolute'
  });
};

var Placeholder = function Placeholder(props) {
  var getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      isMulti = props.isMulti,
      cleanProps = objectWithoutProperties(props, ['getStyles', 'isDisabled', 'isMulti']);

  return React__default.createElement(Div, _extends({
    className: className('placeholder'),
    css: getStyles('placeholder', props)
  }, cleanProps));
};

var css$6 = function css(_ref) {
  var isDisabled = _ref.isDisabled;
  return _extends({}, marginHorizontal(spacing.baseUnit / 2), {
    color: isDisabled ? colors.neutral40 : colors.text,
    position: 'absolute'
  });
};

var SingleValue = function SingleValue(props) {
  var getStyles = props.getStyles,
      isDisabled = props.isDisabled,
      data = props.data,
      cleanProps = objectWithoutProperties(props, ['getStyles', 'isDisabled', 'data']);

  return React__default.createElement(Div, _extends({
    className: className('single-value', { isDisabled: isDisabled }),
    css: getStyles('singleValue', props)
  }, cleanProps));
};

var components = {
  ClearIndicator: ClearIndicator,
  Control: Control,
  DropdownIndicator: DropdownIndicator,
  Group: Group,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  Input: Input,
  LoadingIndicator: LoadingIndicator,
  LoadingMessage: LoadingMessage,
  Menu: Menu,
  MenuList: MenuList,
  MultiValue: MultiValue,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  NoOptionsMessage: NoOptionsMessage,
  Option: Option,
  Placeholder: Placeholder,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};

var defaultComponents = function defaultComponents(props) {
  return _extends({}, components, props.components);
};

var AriaStatus = function AriaStatus(props) {
  return React__default.createElement(SROnly, _extends({ className: className('aria-status') }, props));
};

var formatters = {
  optionLabel: function optionLabel(_ref) {
    var label = _ref.label;
    return label;
  },
  optionValue: function optionValue(_ref2) {
    var value = _ref2.value;
    return value;
  },
  valueLabel: function valueLabel(_ref3) {
    var label = _ref3.label;
    return label;
  }
};


var defaultFormatters = function defaultFormatters(props) {
  return _extends({}, formatters, props.formatters);
};

var defaultStyles = {
  container: containerCSS,
  control: css$1,
  group: css$2,
  indicator: css,
  indicatorsContainer: indicatorsContainerCSS,
  input: css$3,
  menu: menuCSS,
  menulist: menulistCSS,
  multiValue: multiValueCSS,
  multiValueLabel: multiValueLabelCSS,
  multiValueRemove: multiValueRemoveCSS,
  option: css$4,
  placeholder: css$5,
  singleValue: css$6,
  valueContainer: valueContainerCSS
};

// @jsx glam
var filterOption = function filterOption(optionLabel, inputValue) {
  return optionLabel.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
};

/*
// TODO: make sure these are implemented comprehensively
type Customisations = {
	formatters: {
		optionLabel: OptionType => Node,
		valueLabel: OptionType => Node,
		formData: ValueType => string | Array<string>,
	},
	logic: {
		filterOptions: OptionsType => OptionsType,
		isSelected: OptionType => boolean,
		isDisabled: OptionType => boolean,
	},
};
*/

var defaultProps = {
  backspaceRemovesValue: true,
  closeMenuOnSelect: true,
  components: {},
  disabledKey: 'disabled',
  escapeClearsValue: false,
  filterOption: filterOption,
  formatters: {},
  hideSelectedOptions: true,
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  maxMenuHeight: 300,
  maxValueHeight: 100,
  options: [],
  placeholder: 'Select...',
  styles: {},
  tabSelectsValue: true
};

var instanceId = 1;

var cleanValue = function cleanValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) return [value];
  return [];
};

var toKey = function toKey(str) {
  return str.replace(/\W/g, '-');
};

// TODO @jedwatson `findIndex` not used. Safe to remove?
// const findIndex = (arr: Array<*>, match: any): number => {
// 	let index = 0;
// 	while (index < arr.length) {
// 		if (arr[index] === match) return index;
// 	}
// 	return -1;
// };

var scrollIntoView = function scrollIntoView(menuEl, focusedEl) {
  // TODO: Is there a way to overscroll to group headings?
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    menuEl.scrollTop = Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight);
  } else if (focusedRect.top - overScroll < menuRect.top) {
    menuEl.scrollTop = Math.max(focusedEl.offsetTop - overScroll, 0);
  }
};

// TODO: turn this into a prop or measure it when there's a menu ref
var PAGE_SIZE = 5;

var Select$1 = function (_Component) {
  inherits(Select, _Component);

  function Select(props) {
    classCallCheck(this, Select);

    var _this = possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _initialiseProps.call(_this);

    var options = props.options,
        value = props.value;

    _this.components = defaultComponents(props);
    _this.formatters = defaultFormatters(props);
    _this.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId) + '-';

    var selectValue = cleanValue(value);
    var menuOptions = _this.buildMenuOptions(options, selectValue);

    _this.state.menuOptions = menuOptions;
    _this.state.selectValue = selectValue;
    return _this;
  }

  createClass(Select, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.focus();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          components$$1 = _props.components,
          options = _props.options,
          value = _props.value;
      var inputValue = this.state.inputValue;

      if (nextProps.components !== components$$1) {
        this.components = defaultComponents(nextProps);
      }
      if (nextProps.value !== value || nextProps.options !== options) {
        var _selectValue = cleanValue(nextProps.value);
        var _menuOptions = this.buildMenuOptions(nextProps.options, _selectValue, inputValue);
        var _focusedOption = this.getNextFocusedOption(_menuOptions.focusable);
        this.setState({ menuOptions: _menuOptions, selectValue: _selectValue, focusedOption: _focusedOption });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.menuRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        scrollIntoView(this.menuRef, this.focusedOptionRef);
      }
      this.scrollToFocusedOptionOnUpdate = false;
    }
  }, {
    key: 'getNextFocusedOption',
    value: function getNextFocusedOption(options) {
      var lastFocusedOption = this.state.focusedOption;

      return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
    }
  }, {
    key: 'buildMenuOptions',
    value: function buildMenuOptions(options, selectValue) {
      var _this2 = this;

      var inputValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var _props2 = this.props,
          hideSelectedOptions = _props2.hideSelectedOptions,
          isMulti = _props2.isMulti;

      var render = [];
      var focusable = [];

      var toOption = function toOption(option, i) {
        var isSelected = _this2.isSelected(option, selectValue);

        if (isMulti && hideSelectedOptions && isSelected) return;
        if (!_this2.filterOption(_this2.getOptionLabel(option), inputValue)) return;

        var isDisabled = _this2.isDisabled(option);
        if (!isDisabled) {
          focusable.push(option);
        }

        return {
          type: 'option',
          label: _this2.getOptionLabel(option),
          key: i + '-' + _this2.getOptionValue(option),
          isDisabled: isDisabled,
          isSelected: isSelected,
          onMouseOver: isDisabled ? undefined : function () {
            return _this2.onOptionHover(option);
          },
          onClick: isDisabled ? undefined : function () {
            return _this2.selectValue(option);
          },
          data: option
        };
      };

      options.forEach(function (item, itemIndex) {
        if (item.options) {
          // TODO needs a tidier implementation
          if (!_this2.hasGroups) _this2.hasGroups = true;

          var items = item.options;

          var children = items.map(toOption).filter(Boolean);
          if (children.length) {
            var itemLabel = _this2.getOptionLabel(item);
            render.push({
              type: 'group',
              key: itemIndex + '-' + toKey(itemLabel),
              label: itemLabel,
              children: children
            });
          }
        } else {
          var option = toOption(item, itemIndex);
          if (option) render.push(option);
        }
      });
      return { render: render, focusable: focusable };
    }
  }, {
    key: 'filterOption',
    value: function filterOption(optionLabel, inputValue) {
      return this.props.filterOption ? this.props.filterOption(optionLabel, inputValue) : true;
    }
  }, {
    key: 'buildStateForInputValue',
    value: function buildStateForInputValue() {
      var newValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var inputValue = handleInputChange(newValue, this.props.onInputChange);
      var options = this.props.options;
      var selectValue = this.state.selectValue;

      var menuOptions = this.buildMenuOptions(options, selectValue, inputValue);
      var focusedOption = this.getNextFocusedOption(menuOptions.focusable);
      return { inputValue: inputValue, menuOptions: menuOptions, focusedOption: focusedOption };
    }
  }, {
    key: 'hasValue',
    value: function hasValue() {
      var selectValue = this.state.selectValue;

      return selectValue.length > 0;
    }
  }, {
    key: 'hasOptions',
    value: function hasOptions(options) {
      var length = options && options.length;
      var count = this.state.menuOptions.render.length;
      return length ? count : Boolean(count);
    }
  }, {
    key: 'focus',
    value: function focus() {
      if (!this.input) return;
      this.input.focus();
    }
  }, {
    key: 'blurInput',
    value: function blurInput() {
      if (!this.input) return;
      this.input.blur();
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      var focusOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var _state = this.state,
          menuOptions = _state.menuOptions,
          selectValue = _state.selectValue;
      var isMulti = this.props.isMulti;


      var openAtIndex = focusOption === 'first' ? 0 : menuOptions.focusable.length - 1;

      if (!isMulti) {
        var selectedIndex = menuOptions.focusable.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }

      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        menuIsOpen: true,
        focusedOption: menuOptions.focusable[openAtIndex],
        inputIsHidden: false
      });
    }
  }, {
    key: 'focusOption',
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var _state2 = this.state,
          focusedOption = _state2.focusedOption,
          menuOptions = _state2.menuOptions;

      var options = menuOptions.focusable;
      if (!options.length) return;
      var nextFocus = 0; // handles 'first'
      var focusedIndex = focusedOption ? options.indexOf(focusedOption) : -1;
      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - PAGE_SIZE;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + PAGE_SIZE;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }
      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options[nextFocus]
      });
    }
  }, {
    key: 'renderInput',
    value: function renderInput(id) {
      var _props3 = this.props,
          isDisabled = _props3.isDisabled,
          isLoading = _props3.isLoading;
      var Input = this.components.Input;
      var _state3 = this.state,
          inputIsHidden = _state3.inputIsHidden,
          inputValue = _state3.inputValue,
          menuIsOpen = _state3.menuIsOpen;

      // maintain baseline alignment when the input is removed

      if (isDisabled) return glam('div', { style: { height: this.inputHeight } });

      // aria attributes makes the JSX "noisy", separated for clarity
      var ariaAttributes = {
        'aria-activedescendant': this.getActiveDescendentId(),
        'aria-autocomplete': 'list',
        'aria-busy': isLoading,
        'aria-describedby': this.props['aria-describedby'],
        'aria-expanded': menuIsOpen,
        'aria-haspopup': menuIsOpen,
        'aria-label': this.props['aria-label'],
        'aria-labelledby': this.props['aria-labelledby'],
        'aria-owns': menuIsOpen ? this.getElementId('listbox') : undefined,
        role: 'combobox'
      };

      return glam(Input, _extends({
        autoCapitalize: 'none',
        autoComplete: 'off',
        autoCorrect: 'off',
        getStyles: this.getStyles,
        id: id,
        innerRef: this.onInputRef,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.onInputChange,
        onFocus: this.onInputFocus,
        spellCheck: 'false',
        tabIndex: '0',
        type: 'text',
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: 'getOptionLabel',
    value: function getOptionLabel(data) {
      return this.formatters.optionLabel(data);
    }
  }, {
    key: 'getOptionValue',
    value: function getOptionValue(data) {
      return this.formatters.optionValue(data);
    }
  }, {
    key: 'getValueLabel',
    value: function getValueLabel(data) {
      return this.formatters.valueLabel(data);
    }
  }, {
    key: 'renderPlaceholderOrValue',
    value: function renderPlaceholderOrValue() {
      var _this3 = this;

      var _components = this.components,
          MultiValue = _components.MultiValue,
          MultiValueLabel = _components.MultiValueLabel,
          MultiValueRemove = _components.MultiValueRemove,
          SingleValue = _components.SingleValue,
          Placeholder = _components.Placeholder;
      var _props4 = this.props,
          isDisabled = _props4.isDisabled,
          isMulti = _props4.isMulti,
          placeholder = _props4.placeholder;
      var _state4 = this.state,
          inputValue = _state4.inputValue,
          selectValue = _state4.selectValue;


      if (!this.hasValue()) {
        return inputValue ? null : glam(
          Placeholder,
          {
            getStyles: this.getStyles,
            key: 'placeholder',
            isDisabled: isDisabled,
            isMulti: isMulti
          },
          placeholder
        );
      }
      if (isMulti) {
        return selectValue.map(function (opt) {
          return glam(MultiValue, {
            components: {
              Label: MultiValueLabel,
              Remove: MultiValueRemove
            },
            getStyles: _this3.getStyles,
            isDisabled: isDisabled,
            key: _this3.getOptionValue(opt),
            label: _this3.getValueLabel(opt),
            onRemoveClick: function onRemoveClick() {
              return _this3.removeValue(opt);
            },
            onRemoveMouseDown: function onRemoveMouseDown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            data: opt
          });
        });
      }
      if (inputValue) return null;
      var singleValue = selectValue[0];
      return glam(SingleValue, {
        children: this.getValueLabel(singleValue),
        data: singleValue,
        isDisabled: isDisabled,
        getStyles: this.getStyles
      });
    }
  }, {
    key: 'renderClearIndicator',
    value: function renderClearIndicator() {
      var ClearIndicator = this.components.ClearIndicator;
      var _props5 = this.props,
          isClearable = _props5.isClearable,
          isDisabled = _props5.isDisabled,
          isLoading = _props5.isLoading;
      var isFocused = this.state.isFocused;


      if (!isClearable || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }

      return glam(ClearIndicator, {
        getStyles: this.getStyles,
        isFocused: isFocused,
        onMouseDown: this.onClearIndicatorMouseDown,
        role: 'button'
      });
    }
  }, {
    key: 'renderLoadingIndicator',
    value: function renderLoadingIndicator() {
      var LoadingIndicator = this.components.LoadingIndicator;
      var isLoading = this.props.isLoading;
      var isFocused = this.state.isFocused;


      if (!LoadingIndicator || !isLoading) return null;

      return glam(LoadingIndicator, { getStyles: this.getStyles, isFocused: isFocused });
    }
  }, {
    key: 'renderDropdownIndicator',
    value: function renderDropdownIndicator() {
      var DropdownIndicator = this.components.DropdownIndicator;

      if (!DropdownIndicator) return null;
      var isFocused = this.state.isFocused;


      return glam(DropdownIndicator, {
        getStyles: this.getStyles,
        isFocused: isFocused,
        onMouseDown: this.onDropdownIndicatorMouseDown,
        role: 'button'
      });
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this4 = this;

      var _components2 = this.components,
          Group = _components2.Group,
          GroupHeading = _components2.GroupHeading,
          LoadingMessage = _components2.LoadingMessage,
          Menu = _components2.Menu,
          MenuList = _components2.MenuList,
          NoOptionsMessage = _components2.NoOptionsMessage,
          Option = _components2.Option;
      var _state5 = this.state,
          focusedOption = _state5.focusedOption,
          menuIsOpen = _state5.menuIsOpen,
          menuOptions = _state5.menuOptions;
      var _props6 = this.props,
          isLoading = _props6.isLoading,
          isMulti = _props6.isMulti,
          maxMenuHeight = _props6.maxMenuHeight;


      if (!menuIsOpen) return null;

      // TODO: Internal Option Type here
      var render = function render(option) {
        var id = _this4.getElementId('option') + '-' + _this4.getOptionValue(option.data);
        var isFocused = focusedOption === option.data;
        return glam(
          Option,
          _extends({}, option, {
            'aria-selected': option.isSelected,
            getStyles: _this4.getStyles,
            id: id,
            innerRef: isFocused ? _this4.onFocusedOptionRef : undefined,
            isFocused: isFocused,
            role: 'option',
            tabIndex: '-1'
          }),
          option.label
        );
      };

      var menuUI = void 0;

      if (this.hasOptions()) {
        menuUI = menuOptions.render.map(function (item) {
          if (item.type === 'group') {
            var children = item.children,
                type = item.type,
                group = objectWithoutProperties(item, ['children', 'type']);

            return glam(
              Group,
              _extends({
                'aria-expanded': 'true',
                role: 'group',
                components: { Heading: GroupHeading },
                getStyles: _this4.getStyles
              }, group),
              item.children.map(function (option) {
                return render(option);
              })
            );
          } else if (item.type === 'option') {
            return render(item);
          }
        });
      } else if (isLoading) {
        menuUI = glam(
          LoadingMessage,
          null,
          'Loading...'
        );
      } else {
        menuUI = glam(
          NoOptionsMessage,
          null,
          'No options'
        );
      }

      return glam(
        Menu,
        { onMouseDown: this.onMenuMouseDown, getStyles: this.getStyles },
        glam(
          MenuList,
          {
            'aria-multiselectable': isMulti,
            getStyles: this.getStyles,
            id: this.getElementId('listbox'),
            innerRef: this.onMenuRef,
            isMulti: isMulti,
            maxHeight: maxMenuHeight,
            role: 'listbox',
            tabIndex: '-1'
          },
          menuUI
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _components3 = this.components,
          Control = _components3.Control,
          IndicatorsContainer = _components3.IndicatorsContainer,
          SelectContainer = _components3.SelectContainer,
          ValueContainer = _components3.ValueContainer;
      var _props7 = this.props,
          isDisabled = _props7.isDisabled,
          isMulti = _props7.isMulti,
          maxValueHeight = _props7.maxValueHeight;
      var isFocused = this.state.isFocused;

      var inputId = this.getElementId('input');

      return glam(
        SelectContainer,
        {
          isDisabled: isDisabled,
          getStyles: this.getStyles,
          onKeyDown: this.onKeyDown
        },
        glam(
          AriaStatus,
          { 'aria-atomic': 'true', 'aria-live': 'polite', role: 'status' },
          this.hasOptions({ length: true }),
          ' results are available.'
        ),
        glam(
          Control,
          {
            getStyles: this.getStyles,
            isDisabled: isDisabled,
            isFocused: isFocused,
            onMouseDown: this.onControlMouseDown,
            innerRef: this.onControlRef
          },
          glam(
            ValueContainer,
            {
              isMulti: isMulti,
              getStyles: this.getStyles,
              hasValue: this.hasValue(),
              maxHeight: maxValueHeight
            },
            this.renderPlaceholderOrValue(),
            this.renderInput(inputId)
          ),
          glam(
            IndicatorsContainer,
            { getStyles: this.getStyles },
            this.renderClearIndicator(),
            this.renderLoadingIndicator(),
            this.renderDropdownIndicator()
          )
        ),
        this.renderMenu()
      );
    }
  }]);
  return Select;
}(React.Component);

Select$1.defaultProps = defaultProps;

var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.hasGroups = false;
  this.inputHeight = 20;
  this.instancePrefix = '';
  this.openAfterFocus = false;
  this.scrollToFocusedOptionOnUpdate = false;
  this.state = {
    inputIsHidden: false,
    inputValue: '',
    isFocused: false,
    menuIsOpen: false,
    menuOptions: { render: [], focusable: [] },
    focusedOption: null,
    selectValue: []
  };

  this.isDisabled = function (option) {
    var disabledKey = _this5.props.disabledKey;

    if (option[disabledKey]) return true;
    return false;
  };

  this.isSelected = function (option, selectValue) {
    if (selectValue.indexOf(option) > -1) return true;
    return selectValue.some(function (i) {
      return _this5.getOptionValue(i) === _this5.getOptionValue(option);
    });
  };

  this.selectValue = function (newValue) {
    var _props8 = _this5.props,
        closeMenuOnSelect = _props8.closeMenuOnSelect,
        isMulti = _props8.isMulti,
        onChange = _props8.onChange;
    // We update the state here because we should clear inputValue when an
    // option is selected; the onChange event fires when that's reconciled
    // otherwise the new menu items will be filtered with the old inputValue

    _this5.setState(closeMenuOnSelect ? _extends({
      menuIsOpen: false,
      inputIsHidden: isMulti ? false : true
    }, _this5.buildStateForInputValue()) : _this5.buildStateForInputValue(), function () {
      if (onChange) {
        if (isMulti) {
          var _selectValue2 = _this5.state.selectValue;

          if (_this5.isSelected(newValue, _selectValue2)) {
            onChange(_selectValue2.filter(function (i) {
              return i !== newValue;
            }), {
              action: 'deselect-value'
            });
          } else {
            onChange([].concat(toConsumableArray(_selectValue2), [newValue]), {
              action: 'select-option'
            });
          }
        } else {
          onChange(newValue, { action: 'select-option' });
        }
      }
    });
  };

  this.removeValue = function (removedValue) {
    var onChange = _this5.props.onChange;

    if (onChange) {
      var _selectValue3 = _this5.state.selectValue;

      onChange(_selectValue3.filter(function (i) {
        return i !== removedValue;
      }), {
        action: 'remove-value'
      });
    }
    _this5.focus();
  };

  this.clearValue = function () {
    var _props9 = _this5.props,
        isMulti = _props9.isMulti,
        onChange = _props9.onChange;

    if (onChange) {
      onChange(isMulti ? [] : null, { action: 'clear' });
    }
  };

  this.popValue = function () {
    var onChange = _this5.props.onChange;

    if (onChange) {
      var _selectValue4 = _this5.state.selectValue;

      onChange(_selectValue4.slice(0, _selectValue4.length - 1), {
        action: 'pop-value'
      });
    }
  };

  this.onControlRef = function (ref) {
    _this5.controlRef = ref;
  };

  this.onControlMouseDown = function (event) {
    if (!_this5.state.isFocused) {
      _this5.openAfterFocus = true;
      _this5.focus();
    } else if (!_this5.state.menuIsOpen) {
      _this5.openMenu('first');
    } else {
      _this5.setState({
        menuIsOpen: false
      });
    }
    if (event.target.tagName !== 'INPUT') {
      event.preventDefault();
    }
  };

  this.onKeyDown = function (event) {
    var _props10 = _this5.props,
        backspaceRemovesValue = _props10.backspaceRemovesValue,
        isClearable = _props10.isClearable,
        escapeClearsValue = _props10.escapeClearsValue,
        isDisabled = _props10.isDisabled,
        onKeyDown = _props10.onKeyDown,
        tabSelectsValue = _props10.tabSelectsValue;
    var _state6 = _this5.state,
        focusedOption = _state6.focusedOption,
        inputValue = _state6.inputValue,
        menuIsOpen = _state6.menuIsOpen;


    if (isDisabled) return;

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    switch (event.keyCode) {
      case 8:
        // backspace
        if (inputValue || !backspaceRemovesValue) return;
        _this5.popValue();
        break;
      case 9:
        // tab
        if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption) {
          return;
        }
        _this5.selectValue(focusedOption);
        return;
      case 13:
        // enter
        if (menuIsOpen) {
          if (!focusedOption) return;
          _this5.selectValue(focusedOption);
        } else {
          _this5.focusOption();
        }
        break;
      case 27:
        // escape
        if (menuIsOpen) {
          _this5.setState(_extends({
            menuIsOpen: false
          }, _this5.buildStateForInputValue()));
        } else if (isClearable && escapeClearsValue) {
          _this5.clearValue();
        }
        break;
      case 32:
        // space
        if (inputValue) {
          return;
        }
        if (!menuIsOpen) {
          _this5.openMenu();
          break;
        }
        if (!focusedOption) return;
        _this5.selectValue(focusedOption);
        break;
      case 38:
        // up
        if (menuIsOpen) {
          _this5.focusOption('up');
        } else {
          _this5.openMenu('last');
        }
        break;
      case 40:
        // down
        if (menuIsOpen) {
          _this5.focusOption('down');
        } else {
          _this5.openMenu('first');
        }
        break;
      case 33:
        // page up
        if (!menuIsOpen) return;
        _this5.focusOption('pageup');
        break;
      case 34:
        // page down
        if (!menuIsOpen) return;
        _this5.focusOption('pagedown');
        break;
      case 36:
        // home key
        if (!menuIsOpen) return;
        _this5.focusOption('first');
        break;
      case 35:
        // end key
        if (!menuIsOpen) return;
        _this5.focusOption('last');
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  this.onInputRef = function (input) {
    _this5.input = input;

    // cache the input height to use when the select is disabled
    if (input && !_this5.inputHeight) {
      _this5.inputHeight = input.clientHeight;
    }
  };

  this.onInputChange = function (event) {
    var inputValue = event.currentTarget.value;
    _this5.setState(_extends({
      inputIsHidden: false,
      menuIsOpen: true
    }, _this5.buildStateForInputValue(inputValue)));
  };

  this.onInputFocus = function (event) {
    _this5.setState({
      inputIsHidden: false,
      isFocused: true
    });
    if (_this5.openAfterFocus) {
      _this5.openMenu('first');
    }
    _this5.openAfterFocus = false;
  };

  this.onInputBlur = function (event) {
    _this5.setState(_extends({
      isFocused: false,
      menuIsOpen: false
    }, _this5.buildStateForInputValue('')));
  };

  this.onMenuRef = function (ref) {
    _this5.menuRef = ref;
  };

  this.onMenuMouseDown = function (event) {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    _this5.focus();
  };

  this.onFocusedOptionRef = function (ref) {
    _this5.focusedOptionRef = ref;
  };

  this.onOptionHover = function (data) {
    _this5.setState({
      focusedOption: data
    });
  };

  this.onDropdownIndicatorMouseDown = function (event) {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    if (_this5.props.isDisabled) return;
    var isMulti = _this5.props.isMulti;
    var menuIsOpen = _this5.state.menuIsOpen;

    if (!_this5.focused) {
      _this5.focus();
    }
    if (menuIsOpen) {
      _this5.setState({
        menuIsOpen: false,
        inputIsHidden: isMulti ? false : true
      });
    } else {
      _this5.openMenu();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  this.onClearIndicatorMouseDown = function (event) {
    // ignore mouse events that weren't triggered by the primary button
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    _this5.clearValue();
    event.stopPropagation();
    _this5.openAfterFocus = false;
    setTimeout(function () {
      return _this5.focus();
    });
  };

  this.getElementId = function (element) {
    return _this5.instancePrefix + '-' + element;
  };

  this.getActiveDescendentId = function () {
    var _state7 = _this5.state,
        focusedOption = _state7.focusedOption,
        menuIsOpen = _state7.menuIsOpen;

    return menuIsOpen && focusedOption ? _this5.getElementId('option') + '-' + _this5.getOptionValue(focusedOption) : undefined;
  };

  this.getStyles = function (key, props) {
    var base = defaultStyles[key](props);
    var custom = _this5.props.styles[key];
    return custom ? custom(base, props) : base;
  };
};

// This file exists as an entry point for bundling our umd builds.
// Both in rollup and in webpack, umd builds built from es6 modules are not
// compatible with mixed imports (which exist in index.js)
// This file does away with named imports in favor of a single export default.

Select$1.components = components;

return Select$1;

})));
