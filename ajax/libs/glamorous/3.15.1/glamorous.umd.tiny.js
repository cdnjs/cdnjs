(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('glamor')) :
	typeof define === 'function' && define.amd ? define(['react', 'glamor'], factory) :
	(global.glamorous = factory(global.React,global.Glamor));
}(this, (function (React,glamor) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

/* eslint import/no-mutable-exports:0, import/prefer-default-export:0 */
var PropTypes = void 0;

/* istanbul ignore next */
if (React__default.version.slice(0, 4) === '15.5') {
  /* istanbul ignore next */
  try {
    PropTypes = require('prop-types');
    /* istanbul ignore next */
  } catch (error) {
    // ignore
  }
}
/* istanbul ignore next */
PropTypes = PropTypes || React__default.PropTypes;

var CHANNEL = '__glamorous__';

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





var defineProperty = function (obj, key, value) {
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



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * This function takes a className string and gets all the
 * associated glamor styles. It's used to merge glamor styles
 * from a className to make sure that specificity is not
 * a problem when passing a className to a component.
 * @param {String} [className=''] the className string
 * @return {Object} { glamorStyles, glamorlessClassName }
 *   - glamorStyles is an array of all the glamor styles objects
 *   - glamorlessClassName is the rest of the className string
 *     without the glamor classNames
 */
function extractGlamorStyles() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return className.toString().split(' ').reduce(function (groups, name) {
    if (name.indexOf('css-') === 0) {
      var style = getGlamorStylesFromClassName(name);
      groups.glamorStyles.push(style);
    } else {
      // eslint-disable-next-line max-len
      groups.glamorlessClassName = (groups.glamorlessClassName + ' ' + name).trim();
    }
    return groups;
  }, { glamorlessClassName: '', glamorStyles: [] });
}

function getGlamorClassName$1(styles, props, cssOverrides, theme) {
  var className = void 0,
      current = void 0;
  var mappedArgs = [];
  var nonGlamorClassNames = [];
  for (var i = 0; i < styles.length; i++) {
    current = styles[i];
    if (typeof current === 'function') {
      mappedArgs.push(current(props, theme));
    } else if (typeof current === 'string') {
      className = getGlamorStylesFromClassName(current);
      if (className) {
        mappedArgs.push(className);
      } else {
        nonGlamorClassNames.push(current);
      }
    } else {
      mappedArgs.push(current);
    }
  }

  var _extractGlamorStyles = extractGlamorStyles(props.className),
      parentGlamorStyles = _extractGlamorStyles.glamorStyles,
      glamorlessClassName = _extractGlamorStyles.glamorlessClassName;

  var glamorClassName = glamor.css.apply(undefined, mappedArgs.concat(toConsumableArray(parentGlamorStyles), [cssOverrides])).toString();
  var extras = nonGlamorClassNames.join(' ');
  return (glamorlessClassName + ' ' + glamorClassName + ' ' + extras).trim();
}

function getGlamorStylesFromClassName(className) {
  var id = className.slice('css-'.length);
  if (glamor.styleSheet.registered[id]) {
    return glamor.styleSheet.registered[id].style;
  } else {
    return null;
  }
}

/*
 * This is a relatively small abstraction that's ripe for open sourcing.
 * Documentation is in the README.md
 */
function createGlamorous(splitProps) {
  /**
   * This is the main export and the function that people
   * interact with most directly.
   *
   * It accepts a component which can be a string or
   * a React Component and returns
   * a "glamorousComponentFactory"
   * @param {String|ReactComponent} comp the component to render
   * @param {Object} options helpful info for the GlamorousComponents
   * @return {Function} the glamorousComponentFactory
   */
  return function glamorous(comp) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        rootEl = _ref.rootEl,
        displayName = _ref.displayName,
        _ref$forwardProps = _ref.forwardProps,
        forwardProps = _ref$forwardProps === undefined ? [] : _ref$forwardProps;

    return glamorousComponentFactory;

    /**
     * This returns a React Component that renders the comp (closure)
     * with a className based on the given glamor styles object(s)
     * @param {...Object|Function} styles the styles to create with glamor.
     *   If any of these are functions, they are invoked with the component
     *   props and the return value is used.
     * @return {ReactComponent} the ReactComponent function
     */
    function glamorousComponentFactory() {
      for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
        styles[_key] = arguments[_key];
      }

      /**
       * This is a component which will render the comp (closure)
       * with the glamorous styles (closure). Forwards any valid
       * props to the underlying component.
       * @param {Object} theme the theme object
       * @return {ReactElement} React.createElement
       */
      var GlamorousComponent = function (_Component) {
        inherits(GlamorousComponent, _Component);

        function GlamorousComponent() {
          var _ref2;

          var _temp, _this, _ret;

          classCallCheck(this, GlamorousComponent);

          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref2 = GlamorousComponent.__proto__ || Object.getPrototypeOf(GlamorousComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.state = { theme: null }, _this.setTheme = function (theme) {
            return _this.setState({ theme: theme });
          }, _temp), possibleConstructorReturn(_this, _ret);
        }

        createClass(GlamorousComponent, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            var theme = this.props.theme;

            if (this.context[CHANNEL]) {
              // if a theme is provided via props,
              // it takes precedence over context
              this.setTheme(theme ? theme : this.context[CHANNEL].getState());
            } else {
              this.setTheme(theme || {});
            }
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
            if (this.props.theme !== nextProps.theme) {
              this.setTheme(nextProps.theme);
            }
          }
        }, {
          key: 'componentDidMount',
          value: function componentDidMount() {
            if (this.context[CHANNEL] && !this.props.theme) {
              // subscribe to future theme changes
              this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme);
            }
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            // cleanup subscription
            this.unsubscribe && this.unsubscribe();
          }
        }, {
          key: 'render',
          value: function render() {
            // in this function, we're willing to sacrafice a little on
            // readability to get better performance because it actually
            // matters.
            var props = this.props;

            var _splitProps = splitProps(props, GlamorousComponent),
                toForward = _splitProps.toForward,
                cssOverrides = _splitProps.cssOverrides;

            // freeze the theme object in dev mode


            var theme = Object.freeze(this.state.theme);
            // create className to apply
            var fullClassName = getGlamorClassName$1(GlamorousComponent.styles, props, cssOverrides, theme);

            return React__default.createElement(GlamorousComponent.comp, _extends({
              ref: props.innerRef
            }, toForward, {
              className: fullClassName
            }));
          }
        }]);
        return GlamorousComponent;
      }(React.Component);

      GlamorousComponent.propTypes = {
        className: PropTypes.string,
        cssOverrides: PropTypes.object,
        theme: PropTypes.object,
        innerRef: PropTypes.func,
        glam: PropTypes.object
      };

      GlamorousComponent.contextTypes = defineProperty({}, CHANNEL, PropTypes.object);

      Object.assign(GlamorousComponent, getGlamorousComponentMetadata({
        comp: comp,
        styles: styles,
        rootEl: rootEl,
        forwardProps: forwardProps,
        displayName: displayName
      }));
      return GlamorousComponent;
    }
  };

  function getGlamorousComponentMetadata(_ref3) {
    var comp = _ref3.comp,
        styles = _ref3.styles,
        rootEl = _ref3.rootEl,
        forwardProps = _ref3.forwardProps,
        displayName = _ref3.displayName;

    var componentsComp = comp.comp ? comp.comp : comp;
    return {
      // join styles together (for anyone doing: glamorous(glamorous.a({}), {}))
      styles: when(comp.styles, styles),
      // keep track of the ultimate rootEl to render (we never
      // actually render anything but
      // the base component, even when people wrap a glamorous
      // component in glamorous
      comp: componentsComp,
      rootEl: rootEl || componentsComp,
      // join forwardProps (for anyone doing: glamorous(glamorous.a({}), {}))
      forwardProps: when(comp.forwardProps, forwardProps),
      // set the displayName to something that's slightly more
      // helpful than `GlamorousComponent` :)
      displayName: displayName || 'glamorous(' + getDisplayName(comp) + ')'
    };
  }

  function when(comp, prop) {
    return comp ? comp.concat(prop) : prop;
  }

  function getDisplayName(comp) {
    return typeof comp === 'string' ? comp : comp.displayName || comp.name || 'unknown';
  }
}

/* eslint no-unused-vars:0 */
function splitProps(_ref) {
  var _ref$css = _ref.css,
      cssOverrides = _ref$css === undefined ? {} : _ref$css,
      theme = _ref.theme,
      className = _ref.className,
      innerRef = _ref.innerRef,
      glam = _ref.glam,
      rest = objectWithoutProperties(_ref, ['css', 'theme', 'className', 'innerRef', 'glam']);

  return { toForward: rest, cssOverrides: cssOverrides };
}

var glamorous = createGlamorous(splitProps);

return glamorous;

})));
//# sourceMappingURL=glamorous.umd.tiny.js.map
