(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno'), require('redux')) :
    typeof define === 'function' && define.amd ? define(['exports', 'inferno', 'redux'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.Inferno = global.Inferno || {}, global.Inferno.Redux = global.Inferno.Redux || {}), global.Inferno, global.redux));
})(this, (function (exports, inferno, redux) { 'use strict';

    var CLEARED = null;
    var nullSubscriptionHandler = function nullSubscriptionHandler() {};
    var nullListenerCollection = {
      clear: function clear() {},
      notify: function notify() {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      subscribe: function subscribe(_listener) {
        return nullSubscriptionHandler;
      }
    };
    var createListenerCollection = function createListenerCollection() {
      // the current/next pattern is copied from redux's createStore code.
      var current = [];
      var next = [];
      return {
        clear: function clear() {
          next = CLEARED;
          current = CLEARED;
        },
        notify: function notify() {
          var listeners = current = next;
          for (var i = 0; i < listeners.length; ++i) {
            listeners[i]();
          }
        },
        subscribe: function subscribe(listener) {
          var isSubscribed = true;
          if (next === current) {
            next = current.slice();
          }
          next.push(listener);
          return function () {
            if (!isSubscribed || current === null) {
              return;
            }
            isSubscribed = false;
            if (next === current) {
              next = current.slice();
            }
            next.splice(next.indexOf(listener), 1);
          };
        }
      };
    };
    var Subscription = /*#__PURE__*/function () {
      function Subscription(store, parentSub, onStateChange) {
        this.store = void 0;
        this.parentSub = void 0;
        this.onStateChange = void 0;
        this.unsubscribe = void 0;
        this.listeners = void 0;
        this.store = store;
        this.parentSub = parentSub;
        this.onStateChange = onStateChange;
        this.unsubscribe = null;
        this.listeners = nullListenerCollection;
      }
      var _proto = Subscription.prototype;
      _proto.addNestedSub = function addNestedSub(listener) {
        this.trySubscribe();
        return this.listeners.subscribe(listener);
      };
      _proto.notifyNestedSubs = function notifyNestedSubs() {
        this.listeners.notify();
      };
      _proto.isSubscribed = function isSubscribed() {
        return Boolean(this.unsubscribe);
      };
      _proto.trySubscribe = function trySubscribe() {
        if (!this.unsubscribe) {
          this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);
          this.listeners = createListenerCollection();
        }
      };
      _proto.tryUnsubscribe = function tryUnsubscribe() {
        if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
          this.listeners.clear();
          this.listeners = nullListenerCollection;
        }
      };
      return Subscription;
    }();

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

    var _excluded$2 = ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"];
    function _inheritsLoose$1(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf$1(t, o); }
    function _setPrototypeOf$1(t, e) { return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf$1(t, e); }
    function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }
    function _objectWithoutPropertiesLoose$2(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    var hotReloadingVersion = 0;
    var noop = function noop() {};
    var makeSelectorStateful = function makeSelectorStateful(sourceSelector, store) {
      // wrap the selector in an object that tracks its results between runs.
      var selector = {
        error: null,
        props: {},
        run: function runComponentSelector(props) {
          try {
            var nextProps = sourceSelector(store.getState(), props);
            if (nextProps !== selector.props || selector.error) {
              selector.shouldComponentUpdate = true;
              selector.props = nextProps;
              selector.error = null;
            }
          } catch (e) {
            selector.shouldComponentUpdate = true;
            selector.error = e;
          }
        },
        shouldComponentUpdate: false
      };
      return selector;
    };
    // TODO: Move
    var invariant = function invariant(test, error) {
      if (!test) {
        throw new Error(error);
      }
    };
    function getDefaultName(name) {
      return "ConnectAdvanced(" + name + ")";
    }
    function connectAdvanced(selectorFactory, _ref) {
      var _ref$getDisplayName = _ref.getDisplayName,
        getDisplayName = _ref$getDisplayName === void 0 ? getDefaultName : _ref$getDisplayName,
        _ref$methodName = _ref.methodName,
        methodName = _ref$methodName === void 0 ? 'connectAdvanced' : _ref$methodName,
        _ref$renderCountProp = _ref.renderCountProp,
        renderCountProp = _ref$renderCountProp === void 0 ? null : _ref$renderCountProp,
        _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
        shouldHandleStateChanges = _ref$shouldHandleStat === void 0 ? true : _ref$shouldHandleStat,
        _ref$storeKey = _ref.storeKey,
        storeKey = _ref$storeKey === void 0 ? 'store' : _ref$storeKey,
        _ref$withRef = _ref.withRef,
        withRef = _ref$withRef === void 0 ? false : _ref$withRef,
        connectOptions = _objectWithoutPropertiesLoose$2(_ref, _excluded$2);
      var subscriptionKey = storeKey + 'Subscription';
      var version = hotReloadingVersion++;
      var wrapWithConnect = function wrapWithConnect(WrappedComponent) {
        invariant(typeof WrappedComponent === 'function', "You must pass a component to the function returned by " + ("connect. Instead received " + WrappedComponent));
        var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
        var displayName = getDisplayName(wrappedComponentName);
        var selectorFactoryOptions = _extends$2({}, connectOptions, {
          WrappedComponent: WrappedComponent,
          displayName: displayName,
          getDisplayName: getDisplayName,
          methodName: methodName,
          renderCountProp: renderCountProp,
          shouldHandleStateChanges: shouldHandleStateChanges,
          storeKey: storeKey,
          withRef: withRef,
          wrappedComponentName: wrappedComponentName
        });
        var Connect = /*#__PURE__*/function (_Component) {
          function Connect(props, context) {
            var _this;
            _this = _Component.call(this, props, context) || this;
            /* eslint-disable */
            // @ts-ignore
            _this.state = void 0;
            _this.version = void 0;
            _this.renderCount = void 0;
            _this.propsMode = void 0;
            _this.store = void 0;
            _this.notifyNestedSubs = void 0;
            _this.subscription = void 0;
            _this.wrappedInstance = void 0;
            _this.selector = void 0;
            _this.version = version;
            _this.state = {};
            _this.renderCount = 0;
            _this.store = _this.props[storeKey] || _this.context[storeKey];
            _this.propsMode = Boolean(props[storeKey]);
            _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);
            invariant(!!_this.store, "Could not find \"" + storeKey + "\" in either the context or " + ("props of \"" + displayName + "\". ") + "Either wrap the root component in a <Provider>, " + ("or explicitly pass \"" + storeKey + "\" as a prop to \"" + displayName + "\"."));
            _this.initSelector();
            _this.initSubscription();
            return _this;
          }
          _inheritsLoose$1(Connect, _Component);
          var _proto = Connect.prototype;
          _proto.getChildContext = function getChildContext() {
            var _ref2;
            // If this component received store from props, its subscription should be transparent
            // to any descendants receiving store+subscription from context; it passes along
            // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
            // Connect to control ordering of notifications to flow top-down.
            var subscription = this.propsMode ? null : this.subscription;
            return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
          };
          _proto.componentWillMount = function componentWillMount() {
            if (!shouldHandleStateChanges || this.$SSR) {
              return;
            }
            this.subscription.trySubscribe();
            this.selector.run(this.props);
          };
          _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            this.selector.run(nextProps);
          };
          _proto.shouldComponentUpdate = function shouldComponentUpdate() {
            return this.selector.shouldComponentUpdate;
          };
          _proto.componentWillUnmount = function componentWillUnmount() {
            if (this.subscription) {
              this.subscription.tryUnsubscribe();
            }
            // these are just to guard against extra memory leakage if a parent element doesn't
            // dereference this instance properly, such as an async callback that never finishes
            this.subscription = null;
            this.notifyNestedSubs = noop;
            this.store = null;
            this.selector.run = noop;
            this.selector.shouldComponentUpdate = false;
          };
          _proto.getWrappedInstance = function getWrappedInstance() {
            invariant(withRef, "To access the wrapped instance, you need to specify " + ("{ withRef: true } in the options argument of the " + methodName + "() call."));
            return this.wrappedInstance;
          };
          _proto.setWrappedInstance = function setWrappedInstance(ref) {
            this.wrappedInstance = ref;
          };
          _proto.initSelector = function initSelector() {
            var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
            this.selector = makeSelectorStateful(sourceSelector, this.store);
            this.selector.run(this.props);
          };
          _proto.initSubscription = function initSubscription() {
            if (!shouldHandleStateChanges) {
              return;
            }
            // parentSub's source should match where store came from: props vs. context. A component
            // connected to the store via props shouldn't use subscription from context, or vice versa.
            var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
            this.subscription = new Subscription(this.store, parentSub, this.onStateChange.bind(this));
            // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
            // the middle of the notification loop, where `this.subscription` will then be null. An
            // extra null check every change can be avoided by copying the method onto `this` and then
            // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
            // listeners logic is changed to not call listeners that have been unsubscribed in the
            // middle of the notification loop.
            this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
          };
          _proto.onStateChange = function onStateChange() {
            this.selector.run(this.props);
            if (!this.selector.shouldComponentUpdate) {
              this.notifyNestedSubs();
            } else {
              this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
              this.setState({});
            }
          };
          _proto.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
            // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
            // needs to notify nested subs. Once called, it unimplements itself until further state
            // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
            // a boolean check every time avoids an extra method call most of the time, resulting
            // in some perf boost.
            this.componentDidUpdate = undefined;
            this.notifyNestedSubs();
          };
          _proto.isSubscribed = function isSubscribed() {
            var _this$subscription;
            return Boolean((_this$subscription = this.subscription) == null ? void 0 : _this$subscription.isSubscribed());
          };
          _proto.addExtraProps = function addExtraProps(props) {
            if (!renderCountProp) {
              return props;
            }
            // make a shallow copy so that fields added don't leak to the original selector.
            // this is especially important for 'ref' since that's a reference back to the component
            // instance. a singleton memoized selector would then be holding a reference to the
            // instance, preventing the instance from being garbage collected, and that would be bad
            var withExtras = _extends$2({}, props);
            if (renderCountProp) {
              withExtras[renderCountProp] = this.renderCount++;
            }
            if (this.propsMode && this.subscription) {
              withExtras[subscriptionKey] = this.subscription;
            }
            return withExtras;
          };
          _proto.render = function render() {
            var selector = this.selector;
            selector.shouldComponentUpdate = false;
            if (selector.error) {
              throw selector.error;
            } else {
              return inferno.normalizeProps(inferno.createComponentVNode(2 /* VNodeFlags.ComponentUnknown */, WrappedComponent, this.addExtraProps(selector.props), null, withRef ? this.setWrappedInstance : null));
            }
          };
          return Connect;
        }(inferno.Component);
        /* eslint-enable */
        Connect.displayName = displayName;
        Connect.WrappedComponent = WrappedComponent;
        {
          Connect.prototype.componentWillUpdate = function componentWillUpdate() {
            if (this.version !== version) {
              // We are hot reloading!
              this.version = version;
              this.initSelector();
              if (this.subscription) {
                this.subscription.tryUnsubscribe();
              }
              this.initSubscription();
              if (shouldHandleStateChanges) {
                this.subscription.trySubscribe();
              }
            }
          };
        }
        hoistStaticProperties(Connect, WrappedComponent);
        return Connect;
      };
      return wrapWithConnect;
    }

    var warning = function warning(message) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
        console.error(message);
      }
    };

    function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
    function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
    var didWarnAboutReceivingStore = false;
    var warnAboutReceivingStore = function warnAboutReceivingStore() {
      if (didWarnAboutReceivingStore) {
        return;
      }
      didWarnAboutReceivingStore = true;
      warning('<Provider> does not support changing `store` on the fly.');
    };
    var Provider = /*#__PURE__*/function (_Component) {
      function Provider(props, context) {
        var _this;
        _this = _Component.call(this, props, context) || this;
        _this.store = void 0;
        _this.store = props.store;
        return _this;
      }
      _inheritsLoose(Provider, _Component);
      var _proto = Provider.prototype;
      _proto.getChildContext = function getChildContext() {
        return {
          store: this.store,
          storeSubscription: null
        };
      }
      // Don't infer the return type. It may be expanded and cause reference errors
      // in the output.
      ;
      _proto.render = function render() {
        return this.props.children;
      };
      return Provider;
    }(inferno.Component);
    Provider.displayName = 'Provider';
    {
      Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        var store = this.store;
        var nextStore = nextProps.store;
        if (store !== nextStore) {
          warnAboutReceivingStore();
        }
      };
    }

    var hasOwn = Object.prototype.hasOwnProperty;
    var shallowEqual = function shallowEqual(a, b) {
      if (a === b) {
        return true;
      }
      var countA = 0;
      var countB = 0;
      for (var key in a) {
        if (hasOwn.call(a, key) && a[key] !== b[key]) {
          return false;
        }
        countA++;
      }
      for (var _key in b) {
        if (hasOwn.call(b, _key)) {
          countB++;
        }
      }
      return countA === countB;
    };

    function isPlainObject(value) {
      if (typeof value !== 'object' || value + '' !== '[object Object]') {
        return false;
      }
      if (Object.getPrototypeOf(value) === null) {
        return true;
      }
      var proto = value;
      while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
      }
      return Object.getPrototypeOf(value) === proto;
    }
    var verifyPlainObject = function verifyPlainObject(value, displayName, methodName) {
      if (!isPlainObject(value)) {
        warning(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
      }
    };

    // TODO: Type
    var wrapMapToPropsConstant = function wrapMapToPropsConstant(getConstant) {
      return function (dispatch, options) {
        var constant = getConstant(dispatch, options);
        var constantSelector = function constantSelector() {
          return constant;
        };
        constantSelector.dependsOnOwnProps = false;
        return constantSelector;
      };
    };
    // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
    // to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
    // whether mapToProps needs to be invoked when props have changed.
    //
    // A length of one signals that mapToProps does not depend on props from the parent component.
    // A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
    // therefore not reporting its length accurately..
    var getDependsOnOwnProps = function getDependsOnOwnProps(mapToProps) {
      return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? !!mapToProps.dependsOnOwnProps : mapToProps.length !== 1;
    };
    // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
    // this function wraps mapToProps in a proxy function which does several things:
    //
    //  * Detects whether the mapToProps function being called depends on props, which
    //    is used by selectorFactory to decide if it should reinvoke on props changes.
    //
    //  * On first call, handles mapToProps if returns another function, and treats that
    //    new function as the true mapToProps for subsequent calls.
    //
    //  * On first call, verifies the first result is a plain object, in order to warn
    //    the developer that their mapToProps function is not returning a valid result.
    //
    var wrapMapToPropsFunc = function wrapMapToPropsFunc(mapToProps, methodName) {
      return function (_dispatch, _ref) {
        var displayName = _ref.displayName;
        var _proxy = function proxy(stateOrDispatch, ownProps) {
          return _proxy.dependsOnOwnProps ? _proxy.mapToProps(stateOrDispatch, ownProps) : _proxy.mapToProps(stateOrDispatch);
        };
        _proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
        _proxy.mapToProps = function (stateOrDispatch, ownProps) {
          _proxy.mapToProps = mapToProps;
          var props = _proxy(stateOrDispatch, ownProps);
          if (typeof props === 'function') {
            _proxy.mapToProps = props;
            _proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
            props = _proxy(stateOrDispatch, ownProps);
          }
          {
            verifyPlainObject(props, displayName, methodName);
          }
          return props;
        };
        return _proxy;
      };
    };

    var whenMapDispatchToPropsIsFunction = function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
      return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
    };
    var whenMapDispatchToPropsIsMissing = function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
      return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
        return {
          dispatch: dispatch
        };
      }) : undefined;
    };
    var whenMapDispatchToPropsIsObject = function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
      return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
        return redux.bindActionCreators(mapDispatchToProps, dispatch);
      }) : undefined;
    };
    var defaultMapDispatchToPropsFactories = [whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject];

    var whenMapStateToPropsIsFunction = function whenMapStateToPropsIsFunction(mapStateToProps) {
      return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
    };
    var whenMapStateToPropsIsMissing = function whenMapStateToPropsIsMissing(mapStateToProps) {
      return !mapStateToProps ? wrapMapToPropsConstant(function () {
        return {};
      }) : undefined;
    };
    var defaultMapStateToPropsFactories = [whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing];

    function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }
    var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, ownProps) {
      return _extends$1({}, ownProps, stateProps, dispatchProps);
    };
    var wrapMergePropsFunc = function wrapMergePropsFunc(mergeProps) {
      return function (_dispatch, _ref) {
        var displayName = _ref.displayName,
          pure = _ref.pure,
          areMergedPropsEqual = _ref.areMergedPropsEqual;
        var hasRunOnce = false;
        var mergedProps;
        return function (stateProps, dispatchProps, ownProps) {
          var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
          if (hasRunOnce) {
            if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) {
              mergedProps = nextMergedProps;
            }
          } else {
            hasRunOnce = true;
            mergedProps = nextMergedProps;
            {
              verifyPlainObject(mergedProps, displayName, 'mergeProps');
            }
          }
          return mergedProps;
        };
      };
    };
    var whenMergePropsIsFunction = function whenMergePropsIsFunction(mergeProps) {
      return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
    };
    var whenMergePropsIsOmitted = function whenMergePropsIsOmitted(mergeProps) {
      return !mergeProps ? function () {
        return defaultMergeProps;
      } : undefined;
    };
    var defaultMergePropsFactories = [whenMergePropsIsFunction, whenMergePropsIsOmitted];

    var verify = function verify(selector, methodName, displayName) {
      if (!selector) {
        throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
      }
      if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
        // eslint-disable-next-line no-prototype-builtins
        if (!selector.hasOwnProperty('dependsOnOwnProps')) {
          warning("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
        }
      }
    };
    var verifySubselectors = function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
      verify(mapStateToProps, 'mapStateToProps', displayName);
      verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
      verify(mergeProps, 'mergeProps', displayName);
    };

    var _excluded$1 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
    function _objectWithoutPropertiesLoose$1(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    var impureFinalPropsSelectorFactory = function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
      return function (state, ownProps) {
        return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
      };
    };
    var pureFinalPropsSelectorFactory = function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
      var areStatesEqual = _ref.areStatesEqual,
        areOwnPropsEqual = _ref.areOwnPropsEqual,
        areStatePropsEqual = _ref.areStatePropsEqual;
      var hasRunAtLeastOnce = false;
      var state;
      var ownProps;
      var stateProps;
      var dispatchProps;
      var mergedProps;
      var handleFirstCall = function handleFirstCall(firstState, firstOwnProps) {
        state = firstState;
        ownProps = firstOwnProps;
        stateProps = mapStateToProps(state, ownProps);
        dispatchProps = mapDispatchToProps(dispatch, ownProps);
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        hasRunAtLeastOnce = true;
        return mergedProps;
      };
      var handleNewPropsAndNewState = function handleNewPropsAndNewState() {
        stateProps = mapStateToProps(state, ownProps);
        if (mapDispatchToProps.dependsOnOwnProps) {
          dispatchProps = mapDispatchToProps(dispatch, ownProps);
        }
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
      };
      var handleNewProps = function handleNewProps() {
        if (mapStateToProps.dependsOnOwnProps) {
          stateProps = mapStateToProps(state, ownProps);
        }
        if (mapDispatchToProps.dependsOnOwnProps) {
          dispatchProps = mapDispatchToProps(dispatch, ownProps);
        }
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        return mergedProps;
      };
      var handleNewState = function handleNewState() {
        var nextStateProps = mapStateToProps(state, ownProps);
        var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
        stateProps = nextStateProps;
        if (statePropsChanged) {
          mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
        }
        return mergedProps;
      };
      var handleSubsequentCalls = function handleSubsequentCalls(nextState, nextOwnProps) {
        var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
        var stateChanged = !areStatesEqual(nextState, state);
        state = nextState;
        ownProps = nextOwnProps;
        if (propsChanged && stateChanged) {
          return handleNewPropsAndNewState();
        }
        if (propsChanged) {
          return handleNewProps();
        }
        if (stateChanged) {
          return handleNewState();
        }
        return mergedProps;
      };
      var pureFinalPropsSelector = function pureFinalPropsSelector(nextState, nextOwnProps) {
        return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
      };
      return pureFinalPropsSelector;
    };
    // If pure is true, the selector returned by selectorFactory will memoize its results,
    // allowing connectAdvanced's shouldComponentUpdate to return false if final
    // props have not changed. If false, the selector will always return a new
    // object and shouldComponentUpdate will always return true.
    var defaultSelectorFactory = function defaultSelectorFactory(dispatch, _ref2) {
      var initMapStateToProps = _ref2.initMapStateToProps,
        initMapDispatchToProps = _ref2.initMapDispatchToProps,
        initMergeProps = _ref2.initMergeProps,
        opts = _objectWithoutPropertiesLoose$1(_ref2, _excluded$1);
      var options = opts; // trick typescript
      var mapStateToProps = initMapStateToProps(dispatch, options);
      var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
      var mergeProps = initMergeProps(dispatch, options);
      {
        verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
      }
      var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
      return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
    };

    var _excluded = ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"];
    function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
    function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
    var match = function match(arg, factories, name) {
      for (var i = factories.length - 1; i >= 0; i--) {
        var result = factories[i](arg);
        if (result) {
          return result;
        }
      }
      return function (_dispatch, options) {
        throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
      };
    };
    var strictEqual = function strictEqual(a, b) {
      return a === b;
    };
    // createConnect with default args builds the 'official' connect behavior. Calling it with
    // different options opens up some testing and extensibility scenarios
    var createConnect = function createConnect(_temp) {
      var _ref = {} ,
        _ref$connectHOC = _ref.connectHOC,
        connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
        _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
        mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? defaultMapStateToPropsFactories : _ref$mapStateToPropsF,
        _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
        mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? defaultMapDispatchToPropsFactories : _ref$mapDispatchToPro,
        _ref$mergePropsFactor = _ref.mergePropsFactories,
        mergePropsFactories = _ref$mergePropsFactor === void 0 ? defaultMergePropsFactories : _ref$mergePropsFactor,
        _ref$selectorFactory = _ref.selectorFactory,
        selectorFactory = _ref$selectorFactory === void 0 ? defaultSelectorFactory : _ref$selectorFactory;
      return function (mapStateToProps, mapDispatchToProps, mergeProps, _temp2) {
        var _ref2 = _temp2 === void 0 ? {} : _temp2,
          _ref2$pure = _ref2.pure,
          pure = _ref2$pure === void 0 ? true : _ref2$pure,
          _ref2$areStatesEqual = _ref2.areStatesEqual,
          areStatesEqual = _ref2$areStatesEqual === void 0 ? strictEqual : _ref2$areStatesEqual,
          _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
          areOwnPropsEqual = _ref2$areOwnPropsEqua === void 0 ? shallowEqual : _ref2$areOwnPropsEqua,
          _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
          areStatePropsEqual = _ref2$areStatePropsEq === void 0 ? shallowEqual : _ref2$areStatePropsEq,
          _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
          areMergedPropsEqual = _ref2$areMergedPropsE === void 0 ? shallowEqual : _ref2$areMergedPropsE,
          extraOptions = _objectWithoutPropertiesLoose(_ref2, _excluded);
        var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
        var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
        var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
        return connectHOC(selectorFactory, _extends({
          // used in error messages
          methodName: 'connect',
          // used to compute Connect's displayName from the wrapped component's displayName.
          getDisplayName: function getDisplayName(name) {
            return "Connect(" + name + ")";
          },
          // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
          shouldHandleStateChanges: !!mapStateToProps,
          // passed through to selectorFactory
          areMergedPropsEqual: areMergedPropsEqual,
          areOwnPropsEqual: areOwnPropsEqual,
          areStatePropsEqual: areStatePropsEqual,
          areStatesEqual: areStatesEqual,
          initMapDispatchToProps: initMapDispatchToProps,
          initMapStateToProps: initMapStateToProps,
          initMergeProps: initMergeProps,
          pure: pure
        }, extraOptions));
      };
    };
    var connect = createConnect();

    function wrapActionCreators(actionCreators) {
      return function (dispatch) {
        return redux.bindActionCreators(actionCreators, dispatch);
      };
    }

    exports.Provider = Provider;
    exports.connect = connect;
    exports.connectAdvanced = connectAdvanced;
    exports.shallowEqual = shallowEqual;
    exports.wrapActionCreators = wrapActionCreators;

}));
