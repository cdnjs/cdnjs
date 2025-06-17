(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx'), require('inferno')) :
    typeof define === 'function' && define.amd ? define(['exports', 'mobx', 'inferno'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Mobx = global.Inferno.Mobx || {}), global.mobx, global.Inferno));
})(this, (function (exports, mobx, inferno) { 'use strict';

    var EventEmitter = /*#__PURE__*/function () {
      function EventEmitter() {
        this.listeners = [];
      }
      var _proto = EventEmitter.prototype;
      _proto.on = function on(cb) {
        var _this = this;
        this.listeners.push(cb);
        return function () {
          var index = _this.listeners.indexOf(cb);
          if (index !== -1) {
            _this.listeners.splice(index, 1);
          }
        };
      };
      _proto.emit = function emit(data) {
        var listeners = this.listeners;
        for (var i = 0, len = listeners.length; i < len; ++i) {
          listeners[i](data);
        }
      };
      return EventEmitter;
    }();

    var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
    function throwError(message) {
      if (!message) {
        message = ERROR_MSG;
      }
      throw new Error("Inferno Error: " + message);
    }
    function warning(message) {
      console.error(message);
    }
    var KNOWN_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true,
      // KNOWN STATICS
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    function hoistStaticProperties(targetComponent, sourceComponent) {
      // don't hoist over string (html) components
      var keys = Object.getOwnPropertyNames(sourceComponent);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (!KNOWN_STATICS[key]) {
          targetComponent[key] = sourceComponent[key];
        }
      }
    }

    function isStateless(component) {
      var _component$prototype;
      return !((_component$prototype = component.prototype) != null && _component$prototype.render);
    }

    function _inheritsLoose$1(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$1(t, o); }
    function _setPrototypeOf$1(t, e) { return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$1(t, e); }
    /**
     * dev tool support
     */
    var isDevtoolsEnabled = false;
    var isUsingStaticRendering = false;
    var warnedAboutObserverInjectDeprecation = false;
    var renderReporter = new EventEmitter();
    function reportRendering(component) {
      var node = component.$LI.dom;
      renderReporter.emit({
        component: component,
        event: 'render',
        node: node,
        renderTime: component.__$mobRenderEnd - component.__$mobRenderStart,
        totalTime: Date.now() - component.__$mobRenderStart
      });
    }
    function trackComponents() {
      if (!isDevtoolsEnabled) {
        isDevtoolsEnabled = true;
        warning('Do not turn trackComponents on in production, its expensive. For tracking dom nodes you need inferno-compat.');
      } else {
        isDevtoolsEnabled = false;
        renderReporter.listeners.length = 0;
      }
    }
    function useStaticRendering(useStatic) {
      isUsingStaticRendering = useStatic;
    }
    /**
     * Errors reporter
     */
    var errorsReporter = new EventEmitter();
    /**
     * Utilities
     */
    function patch(target, funcName, runMixinFirst) {
      var base = target[funcName];
      var mixinFunc = reactiveMixin[funcName];
      var f = !base ? mixinFunc : runMixinFirst === true ? function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        mixinFunc.apply.apply(mixinFunc, [this].concat(args));
        base.apply.apply(base, [this].concat(args));
      } : function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        base.apply.apply(base, [this].concat(args));
        mixinFunc.apply.apply(mixinFunc, [this].concat(args));
      };
      // MWE: ideally we freeze here to protect against accidental overwrites in component instances, see #195
      // ...but that breaks react-hot-loader, see #231...
      target[funcName] = f;
    }
    function isObjectShallowModified(prev, next) {
      if (prev == null || next == null || typeof prev !== 'object' || typeof next !== 'object') {
        return prev !== next;
      }
      var keys = Object.keys(prev);
      if (keys.length !== Object.keys(next).length) {
        return true;
      }
      var key;
      for (var i = keys.length - 1; i >= 0; i--) {
        key = keys[i];
        if (next[key] !== prev[key]) {
          return true;
        }
      }
      return false;
    }
    /**
     * ReactiveMixin
     */
    var reactiveMixin = {
      componentWillMount: function componentWillMount() {
        var _this = this;
        if (isUsingStaticRendering) {
          return;
        }
        // Generate friendly name for debugging
        var initialName = this.displayName || this.name || this.constructor && (this.constructor.displayName || this.constructor.name) || '<component>';
        /**
         * If props are shallowly modified, React will render anyway,
         * so atom.reportChanged() should not result in yet another re-render
         */
        var skipRender = false;
        /**
         * forceUpdate will re-assign this.props. We don't want that to cause a loop,
         * so detect these changes
         */
        function makePropertyObservableReference(propName) {
          var valueHolder = this[propName];
          var atom = mobx.createAtom('reactive ' + propName);
          Object.defineProperty(this, propName, {
            configurable: true,
            enumerable: true,
            get: function get() {
              atom.reportObserved();
              return valueHolder;
            },
            set: function set(v) {
              if (isObjectShallowModified(valueHolder, v)) {
                valueHolder = v;
                skipRender = true;
                atom.reportChanged();
                skipRender = false;
              } else {
                valueHolder = v;
              }
            }
          });
        }
        // make this.props an observable reference, see #124
        makePropertyObservableReference.call(this, 'props');
        // make state an observable reference
        makePropertyObservableReference.call(this, 'state');
        // wire up reactive render
        var render = this.render.bind(this);
        var baseRender = function baseRender() {
          return render(_this.props, _this.state, _this.context);
        };
        var reaction = null;
        var isRenderingPending = false;
        var initialRender = function initialRender() {
          reaction = new mobx.Reaction(initialName + ".render()", function () {
            if (!isRenderingPending) {
              // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
              // This unidiomatic React usage but React will correctly warn about this so we continue as usual
              // See #85 / Pull #44
              isRenderingPending = true;
              if (typeof _this.componentWillReact === 'function') {
                _this.componentWillReact(); // TODO: wrap in action?
              }
              if (!skipRender) {
                _this.forceUpdate();
              }
            }
          });
          reaction.reactComponent = _this;
          reactiveRender.$mobx = reaction;
          reactiveRender.$base = _this.render;
          _this.render = reactiveRender;
          return reactiveRender();
        };
        var reactiveRender = function reactiveRender() {
          isRenderingPending = false;
          var exception;
          var rendering = null;
          reaction.track(function () {
            if (isDevtoolsEnabled) {
              _this.__$mobRenderStart = Date.now();
            }
            try {
              rendering = mobx._allowStateChanges(false, baseRender);
            } catch (e) {
              exception = e;
            }
            if (isDevtoolsEnabled) {
              _this.__$mobRenderEnd = Date.now();
            }
          });
          if (exception) {
            errorsReporter.emit(exception);
            throw exception;
          }
          return rendering;
        };
        this.render = initialRender;
      },
      componentWillUnmount: function componentWillUnmount() {
        if (isUsingStaticRendering) {
          return;
        }
        if (this.render.$mobx) {
          this.render.$mobx.dispose();
          this.render = this.render.$base;
        }
        if (isDevtoolsEnabled) {
          var node = this.$LI.dom;
          renderReporter.emit({
            component: this,
            event: 'destroy',
            node: node
          });
        }
      },
      componentDidMount: function componentDidMount() {
        if (isDevtoolsEnabled) {
          reportRendering(this);
        }
      },
      componentDidUpdate: function componentDidUpdate() {
        if (isDevtoolsEnabled) {
          reportRendering(this);
        }
      },
      shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        if (isUsingStaticRendering) {
          warning('[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.');
        }
        // update on any state changes (as is the default)
        if (this.state !== nextState) {
          return true;
        }
        // update if props are shallowly not equal, inspired by PureRenderMixin
        // we could return just 'false' here, and avoid the `skipRender` checks etc
        // however, it is nicer if lifecycle events are triggered like usually,
        // so we return true here if props are shallowly modified.
        return isObjectShallowModified(this.props, nextProps);
      }
    };
    function observer(arg1, arg2) {
      var _component$prototype;
      if (typeof arg1 === 'string') {
        throw new Error('Store names should be provided as array');
      }
      if (Array.isArray(arg1)) {
        // component needs stores
        if (!warnedAboutObserverInjectDeprecation) {
          warnedAboutObserverInjectDeprecation = true;
          warning('Mobx observer: Using observer to inject stores is deprecated since 4.0. Use `@inject("store1", "store2") @observer ComponentClass` or `inject("store1", "store2")(observer(componentClass))` instead of `@observer(["store1", "store2"]) ComponentClass`');
        }
        if (!arg2) {
          // invoked as decorator
          return function (componentClass) {
            return observer(arg1, componentClass);
          };
        } else {
          // eslint-disable-next-line prefer-spread
          return inject.apply(null, arg1)(observer(arg2));
        }
      }
      var component = arg1;
      if (component.isMobxInjector === true) {
        warning("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
      }
      // Stateless function component:
      // If it is function but doesn't seem to be a React class constructor,
      // wrap it to a React class automatically
      if (typeof component === 'function' && !((_component$prototype = component.prototype) != null && _component$prototype.render)) {
        var _Class;
        return observer((_Class = /*#__PURE__*/function (_Component) {
          function _Class() {
            return _Component.apply(this, arguments) || this;
          }
          _inheritsLoose$1(_Class, _Component);
          var _proto = _Class.prototype;
          _proto.render = function render(props, _state, context) {
            return component(props, context);
          };
          return _Class;
        }(inferno.Component), _Class.displayName = component.displayName || component.name, _Class.defaultProps = component.defaultProps, _Class));
      }
      if (!component) {
        throw new Error("Please pass a valid component to 'observer'");
      }
      var target = component.prototype || component;
      {
        if (component.prototype && typeof component.getDerivedStateFromProps === 'function') {
          throw new Error("inferno-mobx 'observer' is incompatible with the 'getDerivedStateFromProps' life cycle hook.");
        }
        if (typeof target.getSnapshotBeforeUpdate === 'function') {
          throw new Error("inferno-mobx 'observer' is incompatible with the 'getSnapshotBeforeUpdate' life cycle hook.");
        }
      }
      mixinLifecycleEvents(target);
      component.isMobXReactObserver = true;
      return component;
    }
    function mixinLifecycleEvents(target) {
      patch(target, 'componentWillMount', true);
      patch(target, 'componentDidMount', false);
      patch(target, 'componentWillUnmount', false);
      patch(target, 'componentDidUpdate', false);
      if (!target.shouldComponentUpdate) {
        target.shouldComponentUpdate = reactiveMixin.shouldComponentUpdate;
      }
    }
    // TODO: support injection somehow as well?
    var Observer = observer(function (_ref) {
      var children = _ref.children;
      return children();
    });
    Observer.displayName = 'Observer';
    var proxiedInjectorProps = {
      isMobxInjector: {
        configurable: true,
        enumerable: true,
        value: true,
        writable: true
      }
    };
    /**
     * Store Injection
     */
    function createStoreInjector(grabStoresFn, component, injectNames) {
      var _component$constructo;
      var displayName = 'inject-' + (component.displayName || component.name || ((_component$constructo = component.constructor) == null ? void 0 : _component$constructo.name) || 'Unknown');
      if (injectNames) {
        displayName += '-with-' + injectNames;
      }
      var Injector = /*#__PURE__*/function (_Component2) {
        function Injector(props, context) {
          var _this2;
          _this2 = _Component2.call(this, props, context) || this;
          _this2.wrappedInstance = void 0;
          _this2.storeRef = _this2.storeRef.bind(_this2);
          return _this2;
        }
        _inheritsLoose$1(Injector, _Component2);
        var _proto2 = Injector.prototype;
        _proto2.storeRef = function storeRef(instance) {
          this.wrappedInstance = instance;
        };
        _proto2.render = function render(props, _state, context) {
          // Optimization: it might be more efficient to apply the mapper function *outside* the render method
          // (if the mapper is a function), that could avoid expensive(?) re-rendering of the injector component
          // See this test: 'using a custom injector is not too reactive' in inject.js
          var newProps = {};
          var key;
          for (key in props) {
            newProps[key] = props[key];
          }
          var additionalProps = grabStoresFn(context.mobxStores || {}, newProps, context) || {};
          for (key in additionalProps) {
            newProps[key] = additionalProps[key];
          }
          return inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, component, newProps, null, isStateless(component) ? null : this.storeRef);
        };
        return Injector;
      }(inferno.Component); // Static fields from component should be visible on the generated Injector
      Injector.displayName = displayName;
      Injector.wrappedComponent = void 0;
      Injector.isMobxInjector = false;
      hoistStaticProperties(Injector, component);
      Injector.wrappedComponent = component;
      Object.defineProperties(Injector, proxiedInjectorProps);
      return Injector;
    }
    function grabStoresByName(storeNames) {
      return function (baseStores, nextProps) {
        for (var i = 0, len = storeNames.length; i < len; ++i) {
          var storeName = storeNames[i];
          if (!(storeName in nextProps)) {
            // Development warning
            {
              if (!(storeName in baseStores)) {
                throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
              }
            }
            nextProps[storeName] = baseStores[storeName];
          }
        }
        return nextProps;
      };
    }
    function inject() {
      var grabStoresFn;
      if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function') {
        grabStoresFn = arguments.length <= 0 ? undefined : arguments[0];
        return function (componentClass) {
          var injected = createStoreInjector(grabStoresFn, componentClass);
          injected.isMobxInjector = false; // supress warning
          // mark the Injector as observer, to make it react to expressions in `grabStoresFn`,
          // see #111
          injected = observer(injected);
          injected.isMobxInjector = true; // restore warning
          return injected;
        };
      } else {
        var storeNames = [];
        for (var i = 0; i < arguments.length; ++i) {
          storeNames.push(i < 0 || arguments.length <= i ? undefined : arguments[i]);
        }
        grabStoresFn = grabStoresByName(storeNames);
        return function (componentClass) {
          return createStoreInjector(grabStoresFn, componentClass, storeNames.join('-'));
        };
      }
    }

    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    var specialKeys = {
      children: true,
      key: true,
      ref: true
    };
    var Provider = /*#__PURE__*/function (_Component) {
      function Provider() {
        return _Component.apply(this, arguments) || this;
      }
      _inheritsLoose(Provider, _Component);
      var _proto = Provider.prototype;
      _proto.render = function render(props) {
        return props.children;
      };
      _proto.getChildContext = function getChildContext() {
        var stores = {};
        // inherit stores
        var props = this.props;
        var baseStores = this.context.mobxStores;
        if (baseStores) {
          for (var key in baseStores) {
            stores[key] = baseStores[key];
          }
        }
        // add own stores
        for (var _key in props) {
          if (specialKeys[_key] === void 0 && _key !== 'suppressChangedStoreWarning') {
            stores[_key] = props[_key];
          }
        }
        return {
          mobxStores: stores
        };
      };
      return Provider;
    }(inferno.Component);
    // Development warning
    {
      Provider.prototype.componentWillReceiveProps = function (nextProps) {
        // Maybe this warning is too aggressive?
        if (Object.keys(nextProps).length !== Object.keys(this.props).length) {
          warning('MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children');
        }
        if (!nextProps.suppressChangedStoreWarning) {
          for (var key in nextProps) {
            if (specialKeys[key] === void 0 && this.props[key] !== nextProps[key]) {
              warning("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
            }
          }
        }
      };
    }

    function makeObserverRender(update, render, name) {
      var reactor = new mobx.Reaction(name, update);
      var track = reactor.track.bind(reactor);
      var observer = function observer() {
        var _this = this;
        for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
          parameters[_key] = arguments[_key];
        }
        var rendered;
        var caught;
        track(function () {
          try {
            rendered = render.apply(_this, parameters);
          } catch (error) {
            caught = error;
          }
        });
        if (caught) {
          throw caught;
        } else {
          return rendered;
        }
      };
      observer.dispose = reactor.dispose.bind(reactor);
      return observer;
    }
    /**
     * Turns a class Component into a MobX observer.
     * @param clazz The constructor of the class to patch as a MobX observer.
     */
    function observerPatch(clazz) {
      var proto = clazz.prototype;
      {
        if (clazz.isMobxInjector === true) {
          warning("Mobx observerPatch: You are trying to use 'observerPatch' on a component that already has 'inject'. Please apply 'observerPatch' before applying 'inject'");
        } else if (clazz.isMobXReactObserver === true) {
          warning("Mobx observerPatch: You are trying to use 'observerPatch' on a component that already has 'observer'. Please only apply one of 'observer' or 'observerPatch'");
        } else if (clazz.isMobXInfernoObserver === true) {
          warning("Mobx observerPatch: You are trying to use 'observerPatch' on a component that already has 'observerPatch' applied. Please only apply once");
        }
        clazz.isMobXInfernoObserver = true;
      }
      var base = proto.render;
      var name = clazz.name;
      proto.render = function () {
        var update = this.forceUpdate.bind(this, undefined);
        var render = makeObserverRender(update, base, (this.displayName || name) + ".render()");
        this.render = render;
        for (var _len2 = arguments.length, parameters = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          parameters[_key2] = arguments[_key2];
        }
        return render.apply(this, parameters);
      };
      if (proto.componentWillUnmount) {
        var unmount = proto.componentWillUnmount;
        proto.componentWillUnmount = function () {
          this.render.dispose();
          this.render = base;
          unmount.call(this);
        };
      } else {
        proto.componentWillUnmount = function () {
          this.render.dispose();
          this.render = base;
        };
      }
    }

    function callDispose(_ref) {
      var dispose = _ref.dispose;
      dispose();
    }
    function innerVNode(type, properties) {
      var ref = {
        onComponentDidUpdate: callDispose,
        onComponentWillUnmount: properties.dispose
      };
      {
        Object.freeze(properties);
        Object.freeze(ref);
      }
      return inferno.createComponentVNode(8 /* VNodeFlags.ComponentFunction */, type, properties, undefined, ref);
    }
    function makeProxy(target) {
      return {
        get $V() {
          return target.children;
        },
        set $V(value) {
          target.children = value;
        }
      };
    }
    function getUpdateHooks(ref, props) {
      var onComponentDidUpdate = null;
      var onComponentWillUpdate = null;
      if (ref) {
        if (ref.onComponentDidUpdate) {
          onComponentDidUpdate = ref.onComponentDidUpdate.bind(ref, props, props);
        }
        if (ref.onComponentWillUpdate) {
          onComponentWillUpdate = ref.onComponentWillUpdate.bind(ref, props, props);
        }
      }
      return [onComponentDidUpdate, onComponentWillUpdate];
    }
    function observerWrap(base) {
      {
        var _base$prototype;
        if (typeof base !== 'function') {
          throwError("observerWrap requires a function to wrap, got " + typeof base + " instead");
        }
        if ((_base$prototype = base.prototype) != null && _base$prototype.render) {
          throwError('observerWrap should not be applied to constructors.');
        }
        // @ts-expect-error there is no type for this
        if (base.isMobXInfernoObserver) {
          warning("'observerWrap' was used on a component that already has 'observerWrap' applied. Please only apply once");
        }
      }
      function tracked(_ref2) {
        var context = _ref2.context,
          props = _ref2.props,
          self = _ref2.self,
          track = _ref2.track;
        var result;
        var caught;
        track(function () {
          try {
            result = base.call(self, props, context);
          } catch (error) {
            caught = error;
          }
        });
        if (caught) {
          throw caught;
        }
        return result;
      }
      function wrapper(props, context) {
        var _this = this;
        var _getUpdateHooks = getUpdateHooks(this.ref, props),
          onComponentDidUpdate = _getUpdateHooks[0],
          onComponentWillUpdate = _getUpdateHooks[1];
        // eslint-disable-next-line prefer-const
        var proxy;
        var reaction = new mobx.Reaction(base.name, function () {
          var next;
          if (onComponentWillUpdate) {
            onComponentWillUpdate();
          }
          reaction.track(function () {
            next = inferno._HI(base.call(_this, props, context));
          });
          if (next) {
            // indirectly call patch as inferno does not export patch
            inferno.render(next, proxy, onComponentDidUpdate, context);
          }
        });
        var inner = innerVNode(tracked, {
          context: context,
          dispose: reaction.dispose.bind(reaction),
          props: props,
          self: this,
          track: reaction.track.bind(reaction)
        });
        proxy = makeProxy(inner);
        return inner;
      }
      wrapper.defaultProps = base.defaultProps;
      wrapper.defaultHooks = base.defaultHooks;
      {
        wrapper.isMobXInfernoObserver = true;
      }
      return wrapper;
    }

    // THIS IS PORT OF AWESOME MOBX-REACT to INFERNO
    // LAST POINT OF PORT
    // https://github.com/mobxjs/mobx-react/commit/a1e05d93efd4d9ac819e865e96af138bc6d2ad75
    function onError(fn) {
      return errorsReporter.on(fn);
    }

    exports.EventEmitter = EventEmitter;
    exports.Observer = Observer;
    exports.Provider = Provider;
    exports.errorsReporter = errorsReporter;
    exports.inject = inject;
    exports.observer = observer;
    exports.observerPatch = observerPatch;
    exports.observerWrap = observerWrap;
    exports.onError = onError;
    exports.renderReporter = renderReporter;
    exports.trackComponents = trackComponents;
    exports.useStaticRendering = useStaticRendering;

}));
