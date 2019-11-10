(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('glamor')) :
	typeof define === 'function' && define.amd ? define(['react', 'glamor'], factory) :
	(global.glamorous = factory(global.React,global.Glamor));
}(this, (function (React,glamor) { 'use strict';

var React__default = 'default' in React ? React['default'] : React;

var PropTypes = void 0;

/* istanbul ignore next */
if (parseFloat(React__default.version.slice(0, 4)) >= 15.5) {
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



/*
eslint
  import/no-mutable-exports:0,
  import/prefer-default-export:0,
  react/no-deprecated:0
 */

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

function generateWarningMessage(Comp) {
  var componentName = Comp.displayName || Comp.name || 'FunctionComponent';
  // eslint-disable-next-line max-len
  return 'glamorous warning: Expected component called "' + componentName + '" which uses withTheme to be within a ThemeProvider but none was found.';
}

function withTheme(ComponentToTheme) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$noWarn = _ref.noWarn,
      noWarn = _ref$noWarn === undefined ? false : _ref$noWarn,
      _ref$createElement = _ref.createElement,
      createElement = _ref$createElement === undefined ? true : _ref$createElement;

  var ThemedComponent = function (_Component) {
    inherits(ThemedComponent, _Component);

    function ThemedComponent() {
      var _ref2;

      var _temp, _this, _ret;

      classCallCheck(this, ThemedComponent);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref2 = ThemedComponent.__proto__ || Object.getPrototypeOf(ThemedComponent)).call.apply(_ref2, [this].concat(args))), _this), _this.warned = noWarn, _this.state = { theme: {} }, _this.setTheme = function (theme) {
        return _this.setState({ theme: theme });
      }, _temp), possibleConstructorReturn(_this, _ret);
    }

    createClass(ThemedComponent, [{
      key: 'componentWillMount',


      // eslint-disable-next-line complexity
      value: function componentWillMount() {
        if (!this.context[CHANNEL]) {
          if ("development" !== 'production' && !this.warned) {
            this.warned = true;
            // eslint-disable-next-line no-console
            console.warn(generateWarningMessage(ComponentToTheme));
          }
        }
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
        if (createElement) {
          return React__default.createElement(ComponentToTheme, _extends({}, this.props, this.state));
        } else {
          // this allows us to effectively use the GlamorousComponent
          // as our `render` method without going through lifecycle hooks.
          // Also allows us to forward the context in the scenario where
          // a user wants to add more context.
          // eslint-disable-next-line babel/new-cap
          return ComponentToTheme(_extends({}, this.props, this.state), this.context);
        }
      }
    }]);
    return ThemedComponent;
  }(React.Component);

  ThemedComponent.propTypes = {
    theme: PropTypes.object
  };


  var defaultContextTypes = defineProperty({}, CHANNEL, PropTypes.object);

  var userDefinedContextTypes = null;

  // configure the contextTypes to be settable by the user,
  // however also retaining the glamorous channel.
  Object.defineProperty(ThemedComponent, 'contextTypes', {
    enumerable: true,
    configurable: true,
    set: function set$$1(value) {
      userDefinedContextTypes = value;
    },
    get: function get$$1() {
      // if the user has provided a contextTypes definition,
      // merge the default context types with the provided ones.
      if (userDefinedContextTypes) {
        return _extends({}, defaultContextTypes, userDefinedContextTypes);
      }
      return defaultContextTypes;
    }
  });

  return ThemedComponent;
}

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

function getGlamorClassName$1(_ref) {
  var styles = _ref.styles,
      props = _ref.props,
      cssOverrides = _ref.cssOverrides,
      cssProp = _ref.cssProp,
      theme = _ref.theme,
      context = _ref.context;

  var _extractGlamorStyles = extractGlamorStyles(props.className),
      parentGlamorStyles = _extractGlamorStyles.glamorStyles,
      glamorlessClassName = _extractGlamorStyles.glamorlessClassName;

  var _handleStyles = handleStyles([].concat(toConsumableArray(styles), [parentGlamorStyles, cssOverrides, cssProp]), props, theme, context),
      mappedArgs = _handleStyles.mappedArgs,
      nonGlamorClassNames = _handleStyles.nonGlamorClassNames;

  var glamorClassName = glamor.css.apply(undefined, toConsumableArray(mappedArgs)).toString();
  var extras = [].concat(toConsumableArray(nonGlamorClassNames), [glamorlessClassName]).join(' ').trim();
  return (glamorClassName + ' ' + extras).trim();
}

// this next function is on a "hot" code-path
// so it's pretty complex to make sure it's fast.
// eslint-disable-next-line complexity
function handleStyles(styles, props, theme, context) {
  var current = void 0;
  var mappedArgs = [];
  var nonGlamorClassNames = [];
  for (var i = 0; i < styles.length; i++) {
    current = styles[i];
    if (typeof current === 'function') {
      var result = current(props, theme, context);
      if (typeof result === 'string') {
        processStringClass(result, mappedArgs, nonGlamorClassNames);
      } else {
        mappedArgs.push(result);
      }
    } else if (typeof current === 'string') {
      processStringClass(current, mappedArgs, nonGlamorClassNames);
    } else if (Array.isArray(current)) {
      var recursed = handleStyles(current, props, theme, context);
      mappedArgs.push.apply(mappedArgs, toConsumableArray(recursed.mappedArgs));
      nonGlamorClassNames.push.apply(nonGlamorClassNames, toConsumableArray(recursed.nonGlamorClassNames));
    } else {
      mappedArgs.push(current);
    }
  }
  return { mappedArgs: mappedArgs, nonGlamorClassNames: nonGlamorClassNames };
}

function processStringClass(str, mappedArgs, nonGlamorClassNames) {
  var className = getGlamorStylesFromClassName(str);
  if (className) {
    mappedArgs.push(className);
  } else {
    nonGlamorClassNames.push(str);
  }
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
function createGlamorous$1(splitProps) {
  // TODO: in a breaking version, make this default to true
  glamorous.config = { useDisplayNameInClassName: false };

  return glamorous;

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
  function glamorous(comp) {
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
       */
      var GlamorousComponent = withTheme(function (props, context) {
        /* eslint no-use-before-define: 0 */
        var _splitProps = splitProps(props, GlamorousComponent),
            toForward = _splitProps.toForward,
            cssOverrides = _splitProps.cssOverrides,
            cssProp = _splitProps.cssProp;

        // freeze the theme object in dev mode


        var theme = Object.freeze(props.theme);

        // create className to apply
        var fullClassName = getGlamorClassName$1({
          styles: GlamorousComponent.styles,
          props: props,
          cssOverrides: cssOverrides,
          cssProp: cssProp,
          theme: theme,
          context: context
        });
        var debugClassName = glamorous.config.useDisplayNameInClassName ? cleanClassname(GlamorousComponent.displayName) : '';
        var className = (fullClassName + ' ' + debugClassName).trim();

        return React__default.createElement(GlamorousComponent.comp, _extends({
          ref: props.innerRef
        }, toForward, {
          className: className
        }));
      }, { noWarn: true, createElement: false });

      GlamorousComponent.propTypes = {
        className: PropTypes.string,
        cssOverrides: PropTypes.object,
        theme: PropTypes.object,
        innerRef: PropTypes.func,
        glam: PropTypes.object
      };

      function withComponent(newComp) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return glamorous(newComp, _extends({
          forwardProps: GlamorousComponent.forwardProps
        }, options))(GlamorousComponent.styles);
      }

      Object.assign(GlamorousComponent, getGlamorousComponentMetadata({
        comp: comp,
        styles: styles,
        rootEl: rootEl,
        forwardProps: forwardProps,
        displayName: displayName
      }), { withComponent: withComponent, isGlamorousComponent: true });
      return GlamorousComponent;
    }
  }

  function getGlamorousComponentMetadata(_ref2) {
    var comp = _ref2.comp,
        styles = _ref2.styles,
        rootEl = _ref2.rootEl,
        forwardProps = _ref2.forwardProps,
        displayName = _ref2.displayName;

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

function cleanClassname(className) {
  return className.replace(/ /g, '-').replace(/[^A-Za-z0-9\-_]/g, '_');
}

/* eslint no-unused-vars:0 */
function splitProps(_ref) {
  var cssProp = _ref.css,
      theme = _ref.theme,
      className = _ref.className,
      innerRef = _ref.innerRef,
      glam = _ref.glam,
      rest = objectWithoutProperties(_ref, ['css', 'theme', 'className', 'innerRef', 'glam']);

  return { toForward: rest, cssProp: cssProp };
}

var glamorous = createGlamorous$1(splitProps);

return glamorous;

})));
//# sourceMappingURL=glamorous.umd.tiny.js.map
