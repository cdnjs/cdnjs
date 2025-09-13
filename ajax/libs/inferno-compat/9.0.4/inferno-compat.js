(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('inferno-hydrate'), require('inferno-clone-vnode'), require('inferno-create-element'), require('inferno-extras')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'inferno-hydrate', 'inferno-clone-vnode', 'inferno-create-element', 'inferno-extras'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Inferno = global.Inferno || {}, global.Inferno, global.Inferno, global.Inferno, global.Inferno, global.Inferno));
})(this, (function (exports, inferno, infernoHydrate, infernoCloneVnode, infernoCreateElement, infernoExtras) { 'use strict';

    var isArray = Array.isArray;
    function isNullOrUndef(o) {
      return o === void 0 || o === null;
    }
    function isInvalid(o) {
      return o === null || o === false || o === true || o === void 0;
    }
    function isFunction(o) {
      return typeof o === 'function';
    }
    function isString(o) {
      return typeof o === 'string';
    }
    function isNumber(o) {
      return typeof o === 'number';
    }
    function isNull(o) {
      return o === null;
    }
    function warning(message) {
      console.error(message);
    }
    function isValidElement(obj) {
      var isValidObject = typeof obj === 'object' && !isNull(obj);
      if (!isValidObject) {
        return false;
      }
      return (obj.flags & (14 /* VNodeFlags.Component */ | 481 /* VNodeFlags.Element */)) > 0;
    }

    /**
     * @module Inferno-Compat
     */
    /**
     * Inlined PropTypes, there is propType checking ATM.
     */
    function proptype() {}
    proptype.isRequired = proptype;
    function getProptype() {
      return proptype;
    }
    var PropTypes = {
      any: getProptype,
      array: proptype,
      arrayOf: getProptype,
      bool: proptype,
      checkPropTypes: function checkPropTypes() {
        return null;
      },
      element: getProptype,
      func: proptype,
      instanceOf: getProptype,
      node: getProptype,
      number: proptype,
      object: proptype,
      objectOf: getProptype,
      oneOf: getProptype,
      oneOfType: getProptype,
      shape: getProptype,
      string: proptype,
      symbol: proptype
    };

    /**
     * This is a list of all SVG attributes that need special casing,
     * namespacing, or boolean value assignment.
     *
     * When adding attributes to this list, be sure to also add them to
     * the `possibleStandardNames` module to ensure casing and incorrect
     * name warnings.
     *
     * SVG Attributes List:
     * https://www.w3.org/TR/SVG/attindex.html
     * SMIL Spec:
     * https://www.w3.org/TR/smil
     */
    var ATTRS = ['accent-height', 'alignment-baseline', 'arabic-form', 'baseline-shift', 'cap-height', 'clip-path', 'clip-rule', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'dominant-baseline', 'enable-background', 'fill-opacity', 'fill-rule', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-constiant', 'font-weight', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'horiz-adv-x', 'horiz-origin-x', 'image-rendering', 'letter-spacing', 'lighting-color', 'marker-end', 'marker-mid', 'marker-start', 'overline-position', 'overline-thickness', 'paint-order', 'panose-1', 'pointer-events', 'rendering-intent', 'shape-rendering', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'text-anchor', 'text-decoration', 'text-rendering', 'underline-position', 'underline-thickness', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'vector-effect', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'word-spacing', 'writing-mode', 'x-height', 'xlink:actuate', 'xlink:arcrole', 'xlink:href', 'xlink:role', 'xlink:show', 'xlink:title', 'xlink:type', 'xml:base', 'xmlns:xlink', 'xml:lang', 'xml:space'];
    var InfernoCompatPropertyMap = {
      htmlFor: 'for',
      onDoubleClick: 'onDblClick'
    };
    var CAMELIZE = /[-:]([a-z])/g;
    function capitalize(token) {
      return token[1].toUpperCase();
    }
    for (var _i = 0, _ATTRS = ATTRS; _i < _ATTRS.length; _i++) {
      var original = _ATTRS[_i];
      var reactName = original.replace(CAMELIZE, capitalize);
      InfernoCompatPropertyMap[reactName] = original;
    }

    function getNumberStyleValue(style, value) {
      switch (style) {
        case 'animation-iteration-count':
        case 'border-image-outset':
        case 'border-image-slice':
        case 'border-image-width':
        case 'box-flex':
        case 'box-flex-group':
        case 'box-ordinal-group':
        case 'column-count':
        case 'fill-opacity':
        case 'flex':
        case 'flex-grow':
        case 'flex-negative':
        case 'flex-order':
        case 'flex-positive':
        case 'flex-shrink':
        case 'flood-opacity':
        case 'font-weight':
        case 'grid-column':
        case 'grid-row':
        case 'line-clamp':
        case 'line-height':
        case 'opacity':
        case 'order':
        case 'orphans':
        case 'stop-opacity':
        case 'stroke-dasharray':
        case 'stroke-dashoffset':
        case 'stroke-miterlimit':
        case 'stroke-opacity':
        case 'stroke-width':
        case 'tab-size':
        case 'widows':
        case 'z-index':
        case 'zoom':
          return value;
        default:
          return value + 'px';
      }
    }
    var uppercasePattern = /[A-Z]/g;
    function hyphenCase(str) {
      return str.replace(uppercasePattern, '-$&').toLowerCase();
    }

    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    inferno.options.reactStyles = true;
    function unmountComponentAtNode(container) {
      inferno.renderInternal(null, container, null, {});
      return true;
    }
    function flatten(arr, result) {
      for (var i = 0, len = arr.length; i < len; ++i) {
        var value = arr[i];
        if (isArray(value)) {
          flatten(value, result);
        } else {
          result.push(value);
        }
      }
      return result;
    }
    var ARR = [];
    var Children = {
      map: function map(children, fn, ctx) {
        if (isNullOrUndef(children)) {
          return children;
        }
        children = Children.toArray(children);
        if (ctx) {
          fn = fn.bind(ctx);
        }
        return children.map(fn);
      },
      forEach: function forEach(children, fn, ctx) {
        if (isNullOrUndef(children)) {
          return;
        }
        children = Children.toArray(children);
        if (ctx) {
          fn = fn.bind(ctx);
        }
        for (var i = 0, len = children.length; i < len; ++i) {
          var child = isInvalid(children[i]) ? null : children[i];
          fn(child, i, children);
        }
      },
      count: function count(children) {
        children = Children.toArray(children);
        return children.length;
      },
      only: function only(children) {
        children = Children.toArray(children);
        if (children.length !== 1) {
          throw new Error('Children.only() expects only one child.');
        }
        return children[0];
      },
      toArray: function toArray(children) {
        if (isNullOrUndef(children)) {
          return [];
        }
        // We need to flatten arrays here,
        // because React does it also and application level code might depend on that behavior
        if (isArray(children)) {
          var result = [];
          flatten(children, result);
          return result;
        }
        return ARR.concat(children);
      }
    };
    inferno.Component.prototype.isReactComponent = {};
    var version = '15.4.2';
    var validLineInputs = {
      date: true,
      'datetime-local': true,
      email: true,
      month: true,
      number: true,
      password: true,
      search: true,
      tel: true,
      text: true,
      time: true,
      url: true,
      week: true
    };
    function normalizeGenericProps(props) {
      for (var prop in props) {
        var mappedProp = InfernoCompatPropertyMap[prop];
        if (mappedProp && props[prop] && mappedProp !== prop) {
          props[mappedProp] = props[prop];
          props[prop] = void 0;
        }
        if (inferno.options.reactStyles && prop === 'style') {
          var styles = props.style;
          if (styles && !isString(styles)) {
            var newStyles = {};
            for (var s in styles) {
              var value = styles[s];
              var hyphenStr = hyphenCase(s);
              newStyles[hyphenStr] = isNumber(value) ? getNumberStyleValue(hyphenStr, value) : value;
            }
            props.style = newStyles;
          }
        }
      }
    }
    function normalizeFormProps(name, props) {
      if ((name === 'input' || name === 'textarea') && props.type !== 'radio' && props.onChange) {
        var _props$type;
        var type = (_props$type = props.type) == null ? void 0 : _props$type.toLowerCase();
        var eventName;
        if (!type || validLineInputs[type]) {
          eventName = 'oninput';
        }
        if (eventName && !props[eventName]) {
          {
            var existingMethod = props.oninput || props.onInput;
            if (existingMethod) {
              warning("Inferno-compat Warning! 'onInput' handler is reserved to support React like 'onChange' event flow.\nOriginal event handler 'function " + existingMethod.name + "' will not be called.");
            }
          }
          props[eventName] = props.onChange;
          props.onChange = void 0;
        }
      }
    }
    // we need to add persist() to Event (as React has it for synthetic events)
    // this is a hack, and we really shouldn't be modifying a global object this way,
    // but there isn't a performant way of doing this apart from trying to proxy
    // every prop event that starts with "on", i.e. onClick or onKeyPress
    // but in reality devs use onSomething for many things, not only for
    // input events
    if (typeof Event !== 'undefined') {
      var eventProtoType = Event.prototype;
      if (!eventProtoType.persist) {
        eventProtoType.persist = function () {};
      }
    }
    function iterableToArray(iterable) {
      var iterStep;
      var tmpArr = [];
      do {
        iterStep = iterable.next();
        tmpArr.push(iterStep.value);
      } while (!iterStep.done);
      return tmpArr;
    }
    var g = typeof window === 'undefined' ? global : window;
    var hasSymbolSupport = typeof g.Symbol !== 'undefined';
    var symbolIterator = hasSymbolSupport ? g.Symbol.iterator : '';
    var oldCreateVNode = inferno.options.createVNode;
    inferno.options.createVNode = function (vNode) {
      var children = vNode.children;
      var props = vNode.props;
      if (isNullOrUndef(props)) {
        props = vNode.props = {};
      }
      // React supports iterable children, in addition to Array-like
      if (hasSymbolSupport && !isNull(children) && typeof children === 'object' && !isArray(children) && isFunction(children[symbolIterator])) {
        vNode.children = iterableToArray(children[symbolIterator]());
      }
      if (!isNullOrUndef(children) && isNullOrUndef(props.children)) {
        props.children = children;
      }
      if (vNode.flags & 14 /* VNodeFlags.Component */) {
        if (isString(vNode.type)) {
          vNode.flags = inferno.getFlagsForElementVnode(vNode.type);
          if (props) {
            inferno.normalizeProps(vNode);
          }
        }
      }
      var flags = vNode.flags;
      if (flags & 448 /* VNodeFlags.FormElement */) {
        normalizeFormProps(vNode.type, props);
      }
      if (flags & 481 /* VNodeFlags.Element */) {
        if (vNode.className) {
          props.className = vNode.className;
        }
        normalizeGenericProps(props);
      }
      if (oldCreateVNode) {
        oldCreateVNode(vNode);
      }
    };
    // Credit: preact-compat - https://github.com/developit/preact-compat :)
    function shallowDiffers(a, b) {
      var i;
      for (i in a) {
        if (!(i in b)) {
          return true;
        }
      }
      for (i in b) {
        if (a[i] !== b[i]) {
          return true;
        }
      }
      return false;
    }
    var PureComponent = /*#__PURE__*/function (_Component) {
      function PureComponent() {
        return _Component.apply(this, arguments) || this;
      }
      _inheritsLoose(PureComponent, _Component);
      var _proto = PureComponent.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(props, state) {
        return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
      };
      return PureComponent;
    }(inferno.Component);
    var WrapperComponent = /*#__PURE__*/function (_Component2) {
      function WrapperComponent() {
        return _Component2.apply(this, arguments) || this;
      }
      _inheritsLoose(WrapperComponent, _Component2);
      var _proto2 = WrapperComponent.prototype;
      _proto2.getChildContext = function getChildContext() {
        return this.props.context;
      };
      _proto2.render = function render(props) {
        return props.children;
      };
      return WrapperComponent;
    }(inferno.Component);
    function unstable_renderSubtreeIntoContainer(parentComponent, vNode, container, callback) {
      var wrapperVNode = inferno.createComponentVNode(4 /* VNodeFlags.ComponentClass */, WrapperComponent, {
        children: vNode,
        context: parentComponent.context
      });
      render(wrapperVNode, container, null);
      var component = vNode.children;
      if (callback) {
        // callback gets the component as context, no other argument.
        callback.call(component);
      }
      return component;
    }
    function createFactory(type) {
      return infernoCreateElement.createElement.bind(null, type);
    }
    function render(rootInput, container, cb, context) {
      if (cb === void 0) {
        cb = null;
      }
      if (context === void 0) {
        context = inferno.EMPTY_OBJ;
      }
      inferno.renderInternal(rootInput, container, cb, context);
      var input = container.$V;
      if (input && input.flags & 14 /* VNodeFlags.Component */) {
        return input.children;
      }
      return void 0;
    }
    // Mask React global in browser enviornments when React is not used.
    if (typeof window !== 'undefined' && typeof window.React === 'undefined') {
      var exports$1 = {
        Children: Children,
        Component: inferno.Component,
        EMPTY_OBJ: inferno.EMPTY_OBJ,
        Fragment: inferno.Fragment,
        PropTypes: PropTypes,
        PureComponent: PureComponent,
        // Internal methods
        _CI: inferno._CI,
        _HI: inferno._HI,
        _M: inferno._M,
        _MCCC: inferno._MCCC,
        _ME: inferno._ME,
        _MFCC: inferno._MFCC,
        _MP: inferno._MP,
        _MR: inferno._MR,
        __render: inferno.renderInternal,
        // Public methods
        cloneElement: infernoCloneVnode.cloneVNode,
        cloneVNode: infernoCloneVnode.cloneVNode,
        createComponentVNode: inferno.createComponentVNode,
        createElement: infernoCreateElement.createElement,
        createFactory: createFactory,
        createFragment: inferno.createFragment,
        createPortal: inferno.createPortal,
        createRef: inferno.createRef,
        createRenderer: inferno.createRenderer,
        createTextVNode: inferno.createTextVNode,
        createVNode: inferno.createVNode,
        directClone: inferno.directClone,
        findDOMFromVNode: inferno.findDOMFromVNode,
        findDOMNode: infernoExtras.findDOMNode,
        forwardRef: inferno.forwardRef,
        getFlagsForElementVnode: inferno.getFlagsForElementVnode,
        hydrate: infernoHydrate.hydrate,
        isValidElement: isValidElement,
        linkEvent: inferno.linkEvent,
        normalizeProps: inferno.normalizeProps,
        options: inferno.options,
        render: render,
        rerender: inferno.rerender,
        unmountComponentAtNode: unmountComponentAtNode,
        unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
        version: version
      };
      window.React = exports$1;
      window.ReactDOM = exports$1;
    }
    var index = {
      Children: Children,
      Component: inferno.Component,
      EMPTY_OBJ: inferno.EMPTY_OBJ,
      Fragment: inferno.Fragment,
      PropTypes: PropTypes,
      PureComponent: PureComponent,
      // Internal methods
      _CI: inferno._CI,
      _HI: inferno._HI,
      _M: inferno._M,
      _MCCC: inferno._MCCC,
      _ME: inferno._ME,
      _MFCC: inferno._MFCC,
      _MP: inferno._MP,
      _MR: inferno._MR,
      __render: inferno.renderInternal,
      // Public methods
      cloneElement: infernoCloneVnode.cloneVNode,
      cloneVNode: infernoCloneVnode.cloneVNode,
      createComponentVNode: inferno.createComponentVNode,
      createElement: infernoCreateElement.createElement,
      createFactory: createFactory,
      createFragment: inferno.createFragment,
      createPortal: inferno.createPortal,
      createRef: inferno.createRef,
      createRenderer: inferno.createRenderer,
      createTextVNode: inferno.createTextVNode,
      createVNode: inferno.createVNode,
      directClone: inferno.directClone,
      findDOMFromVNode: inferno.findDOMFromVNode,
      findDOMNode: infernoExtras.findDOMNode,
      forwardRef: inferno.forwardRef,
      getFlagsForElementVnode: inferno.getFlagsForElementVnode,
      hydrate: infernoHydrate.hydrate,
      isValidElement: isValidElement,
      linkEvent: inferno.linkEvent,
      normalizeProps: inferno.normalizeProps,
      options: inferno.options,
      render: render,
      rerender: inferno.rerender,
      unmountComponentAtNode: unmountComponentAtNode,
      unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
      version: version
    };

    Object.defineProperty(exports, "Component", {
        enumerable: true,
        get: function () { return inferno.Component; }
    });
    Object.defineProperty(exports, "EMPTY_OBJ", {
        enumerable: true,
        get: function () { return inferno.EMPTY_OBJ; }
    });
    Object.defineProperty(exports, "Fragment", {
        enumerable: true,
        get: function () { return inferno.Fragment; }
    });
    Object.defineProperty(exports, "_CI", {
        enumerable: true,
        get: function () { return inferno._CI; }
    });
    Object.defineProperty(exports, "_HI", {
        enumerable: true,
        get: function () { return inferno._HI; }
    });
    Object.defineProperty(exports, "_M", {
        enumerable: true,
        get: function () { return inferno._M; }
    });
    Object.defineProperty(exports, "_MCCC", {
        enumerable: true,
        get: function () { return inferno._MCCC; }
    });
    Object.defineProperty(exports, "_ME", {
        enumerable: true,
        get: function () { return inferno._ME; }
    });
    Object.defineProperty(exports, "_MFCC", {
        enumerable: true,
        get: function () { return inferno._MFCC; }
    });
    Object.defineProperty(exports, "_MP", {
        enumerable: true,
        get: function () { return inferno._MP; }
    });
    Object.defineProperty(exports, "_MR", {
        enumerable: true,
        get: function () { return inferno._MR; }
    });
    Object.defineProperty(exports, "createComponentVNode", {
        enumerable: true,
        get: function () { return inferno.createComponentVNode; }
    });
    Object.defineProperty(exports, "createFragment", {
        enumerable: true,
        get: function () { return inferno.createFragment; }
    });
    Object.defineProperty(exports, "createPortal", {
        enumerable: true,
        get: function () { return inferno.createPortal; }
    });
    Object.defineProperty(exports, "createRef", {
        enumerable: true,
        get: function () { return inferno.createRef; }
    });
    Object.defineProperty(exports, "createRenderer", {
        enumerable: true,
        get: function () { return inferno.createRenderer; }
    });
    Object.defineProperty(exports, "createTextVNode", {
        enumerable: true,
        get: function () { return inferno.createTextVNode; }
    });
    Object.defineProperty(exports, "createVNode", {
        enumerable: true,
        get: function () { return inferno.createVNode; }
    });
    Object.defineProperty(exports, "directClone", {
        enumerable: true,
        get: function () { return inferno.directClone; }
    });
    Object.defineProperty(exports, "findDOMFromVNode", {
        enumerable: true,
        get: function () { return inferno.findDOMFromVNode; }
    });
    Object.defineProperty(exports, "forwardRef", {
        enumerable: true,
        get: function () { return inferno.forwardRef; }
    });
    Object.defineProperty(exports, "getFlagsForElementVnode", {
        enumerable: true,
        get: function () { return inferno.getFlagsForElementVnode; }
    });
    Object.defineProperty(exports, "linkEvent", {
        enumerable: true,
        get: function () { return inferno.linkEvent; }
    });
    Object.defineProperty(exports, "normalizeProps", {
        enumerable: true,
        get: function () { return inferno.normalizeProps; }
    });
    Object.defineProperty(exports, "options", {
        enumerable: true,
        get: function () { return inferno.options; }
    });
    Object.defineProperty(exports, "renderInternal", {
        enumerable: true,
        get: function () { return inferno.renderInternal; }
    });
    Object.defineProperty(exports, "rerender", {
        enumerable: true,
        get: function () { return inferno.rerender; }
    });
    Object.defineProperty(exports, "hydrate", {
        enumerable: true,
        get: function () { return infernoHydrate.hydrate; }
    });
    Object.defineProperty(exports, "cloneElement", {
        enumerable: true,
        get: function () { return infernoCloneVnode.cloneVNode; }
    });
    Object.defineProperty(exports, "cloneVNode", {
        enumerable: true,
        get: function () { return infernoCloneVnode.cloneVNode; }
    });
    Object.defineProperty(exports, "createElement", {
        enumerable: true,
        get: function () { return infernoCreateElement.createElement; }
    });
    Object.defineProperty(exports, "findDOMNode", {
        enumerable: true,
        get: function () { return infernoExtras.findDOMNode; }
    });
    exports.Children = Children;
    exports.PropTypes = PropTypes;
    exports.PureComponent = PureComponent;
    exports.createFactory = createFactory;
    exports.default = index;
    exports.isValidElement = isValidElement;
    exports.render = render;
    exports.unmountComponentAtNode = unmountComponentAtNode;
    exports.unstable_renderSubtreeIntoContainer = unstable_renderSubtreeIntoContainer;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
