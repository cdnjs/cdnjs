(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('hoist-non-inferno-statics'), require('inferno'), require('redux')) :
  typeof define === 'function' && define.amd ? define(['exports', 'hoist-non-inferno-statics', 'inferno', 'redux'], factory) :
  (factory((global.Inferno = global.Inferno || {}, global.Inferno.Redux = global.Inferno.Redux || {}),global.hoistNonReactStatics,global.Inferno,global.redux));
}(this, (function (exports,hoistNonReactStatics,inferno,redux) { 'use strict';

  hoistNonReactStatics = hoistNonReactStatics && hoistNonReactStatics.hasOwnProperty('default') ? hoistNonReactStatics['default'] : hoistNonReactStatics;

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */





  function __rest(s, e) {
      var t = {};
      for (var p in s) { if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          { t[p] = s[p]; } }
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          { for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) { if (e.indexOf(p[i]) < 0)
              { t[p[i]] = s[p[i]]; } } }
      return t;
  }

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var CLEARED = null;
  // tslint:disable-next-line:no-empty
  var nullSubscriptionHandler = function () { };
  var nullListenerCollection = {
      // tslint:disable-next-line:no-empty
      clear: function () { },
      // tslint:disable-next-line:no-empty
      notify: function () { },
      subscribe: function (_) { return nullSubscriptionHandler; }
  };
  var createListenerCollection = function () {
      // the current/next pattern is copied from redux's createStore code.
      var current = [];
      var next = [];
      return {
          clear: function () {
              next = CLEARED;
              current = CLEARED;
          },
          notify: function () {
              var listeners = (current = next);
              for (var i = 0; i < listeners.length; i++) {
                  listeners[i]();
              }
          },
          subscribe: function (listener) {
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
  var Subscription = function Subscription(store, parentSub, onStateChange) {
      this.store = store;
      this.parentSub = parentSub;
      this.onStateChange = onStateChange;
      this.unsubscribe = null;
      this.listeners = nullListenerCollection;
  };
  Subscription.prototype.addNestedSub = function addNestedSub (listener) {
      this.trySubscribe();
      return this.listeners.subscribe(listener);
  };
  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs () {
      this.listeners.notify();
  };
  Subscription.prototype.isSubscribed = function isSubscribed () {
      return Boolean(this.unsubscribe);
  };
  Subscription.prototype.trySubscribe = function trySubscribe () {
      if (!this.unsubscribe) {
          this.unsubscribe = this.parentSub
              ? this.parentSub.addNestedSub(this.onStateChange)
              : this.store.subscribe(this.onStateChange);
          this.listeners = createListenerCollection();
      }
  };
  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe () {
      if (this.unsubscribe) {
          this.unsubscribe();
          this.unsubscribe = null;
          this.listeners.clear();
          this.listeners = nullListenerCollection;
      }
  };

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var hotReloadingVersion = 0;
  var dummyState = {};
  // tslint:disable-next-line:no-empty
  var noop = function () { };
  var makeSelectorStateful = function (sourceSelector, store) {
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
              }
              catch (e) {
                  selector.shouldComponentUpdate = true;
                  selector.error = e;
              }
          },
          shouldComponentUpdate: false
      };
      return selector;
  };
  // TODO: Move
  var invariant = function (test, error) {
      if (!test) {
          throw new Error(error);
      }
  };
  function getDefaultName(name) {
      return ("ConnectAdvanced(" + name + ")");
  }
  function connectAdvanced(selectorFactory, _a) {
      var getDisplayName = _a.getDisplayName; if ( getDisplayName === void 0 ) getDisplayName = getDefaultName;
      var methodName = _a.methodName; if ( methodName === void 0 ) methodName = 'connectAdvanced';
      var renderCountProp = _a.renderCountProp; if ( renderCountProp === void 0 ) renderCountProp = null;
      var shouldHandleStateChanges = _a.shouldHandleStateChanges; if ( shouldHandleStateChanges === void 0 ) shouldHandleStateChanges = true;
      var storeKey = _a.storeKey; if ( storeKey === void 0 ) storeKey = 'store';
      var withRef = _a.withRef; if ( withRef === void 0 ) withRef = false;
      var connectOptions = __rest(_a, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]);
      var subscriptionKey = storeKey + 'Subscription';
      var version = hotReloadingVersion++;
      var wrapWithConnect = function (WrappedComponent) {
          invariant(typeof WrappedComponent === 'function', "You must pass a component to the function returned by " +
              "connect. Instead received " + WrappedComponent);
          var wrappedComponentName = WrappedComponent.displayName ||
              WrappedComponent.name ||
              'Component';
          var displayName = getDisplayName(wrappedComponentName);
          var selectorFactoryOptions = Object.assign({}, connectOptions, { WrappedComponent: WrappedComponent,
              displayName: displayName,
              getDisplayName: getDisplayName,
              methodName: methodName,
              renderCountProp: renderCountProp,
              shouldHandleStateChanges: shouldHandleStateChanges,
              storeKey: storeKey,
              withRef: withRef,
              wrappedComponentName: wrappedComponentName });
          var Connect = (function (Component$$1) {
              function Connect(props, context) {
                  Component$$1.call(this, props, context);
                  this.version = version;
                  this.state = {};
                  this.renderCount = 0;
                  this.store = this.props[storeKey] || this.context[storeKey];
                  this.propsMode = Boolean(props[storeKey]);
                  this.setWrappedInstance = this.setWrappedInstance.bind(this);
                  invariant(!!this.store, "Could not find \"" + storeKey + "\" in either the context or " +
                      "props of \"" + displayName + "\". " +
                      "Either wrap the root component in a <Provider>, " +
                      "or explicitly pass \"" + storeKey + "\" as a prop to \"" + displayName + "\".");
                  this.initSelector();
                  this.initSubscription();
              }

              if ( Component$$1 ) Connect.__proto__ = Component$$1;
              Connect.prototype = Object.create( Component$$1 && Component$$1.prototype );
              Connect.prototype.constructor = Connect;
              Connect.prototype.getChildContext = function getChildContext () {
                  var obj;

                  // If this component received store from props, its subscription should be transparent
                  // to any descendants receiving store+subscription from context; it passes along
                  // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
                  // Connect to control ordering of notifications to flow top-down.
                  var subscription = this.propsMode ? null : this.subscription;
                  return ( obj = {}, obj[subscriptionKey] = subscription || this.context[subscriptionKey], obj);
              };
              Connect.prototype.componentDidMount = function componentDidMount () {
                  if (!shouldHandleStateChanges) {
                      return;
                  }
                  // componentWillMount fires during server side rendering, but componentDidMount and
                  // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
                  // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
                  // To handle the case where a child component may have triggered a state change by
                  // dispatching an action in its componentWillMount, we have to re-run the select and maybe
                  // re-render.
                  this.subscription.trySubscribe();
                  this.selector.run(this.props);
                  if (this.selector.shouldComponentUpdate) {
                      this.forceUpdate();
                  }
              };
              Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps) {
                  this.selector.run(nextProps);
              };
              Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
                  return this.selector.shouldComponentUpdate;
              };
              Connect.prototype.componentWillUnmount = function componentWillUnmount () {
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
              Connect.prototype.getWrappedInstance = function getWrappedInstance () {
                  invariant(withRef, "To access the wrapped instance, you need to specify " +
                      "{ withRef: true } in the options argument of the " + methodName + "() call.");
                  return this.wrappedInstance;
              };
              Connect.prototype.setWrappedInstance = function setWrappedInstance (ref) {
                  this.wrappedInstance = ref;
              };
              Connect.prototype.initSelector = function initSelector () {
                  var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
                  this.selector = makeSelectorStateful(sourceSelector, this.store);
                  this.selector.run(this.props);
              };
              Connect.prototype.initSubscription = function initSubscription () {
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
              Connect.prototype.onStateChange = function onStateChange () {
                  this.selector.run(this.props);
                  if (!this.selector.shouldComponentUpdate) {
                      this.notifyNestedSubs();
                  }
                  else {
                      this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
                      this.setState(dummyState);
                  }
              };
              Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate () {
                  // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
                  // needs to notify nested subs. Once called, it unimplements itself until further state
                  // changes occur. Doing it this way vs having a permanent `componentDidMount` that does
                  // a boolean check every time avoids an extra method call most of the time, resulting
                  // in some perf boost.
                  this.componentDidUpdate = undefined;
                  this.notifyNestedSubs();
              };
              Connect.prototype.isSubscribed = function isSubscribed () {
                  return Boolean(this.subscription && this.subscription.isSubscribed());
              };
              Connect.prototype.addExtraProps = function addExtraProps (props) {
                  if (!renderCountProp) {
                      return props;
                  }
                  // make a shallow copy so that fields added don't leak to the original selector.
                  // this is especially important for 'ref' since that's a reference back to the component
                  // instance. a singleton memoized selector would then be holding a reference to the
                  // instance, preventing the instance from being garbage collected, and that would be bad
                  var withExtras = Object.assign({}, props);
                  if (renderCountProp) {
                      withExtras[renderCountProp] = this.renderCount++;
                  }
                  if (this.propsMode && this.subscription) {
                      withExtras[subscriptionKey] = this.subscription;
                  }
                  return withExtras;
              };
              Connect.prototype.render = function render () {
                  var selector = this.selector;
                  selector.shouldComponentUpdate = false;
                  if (selector.error) {
                      throw selector.error;
                  }
                  else {
                      return inferno.createComponentVNode(2 /* ComponentUnknown */, WrappedComponent, this.addExtraProps(selector.props), null, withRef ? this.setWrappedInstance : null);
                  }
              };

              return Connect;
          }(inferno.Component));
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
          return hoistNonReactStatics(Connect, WrappedComponent);
      };
      return wrapWithConnect;
  }

  /**
   * @module Inferno-Shared
   */ /** TypeDoc Comment */
  // This should be boolean and not reference to window.document
  var isBrowser = !!(typeof window !== 'undefined' && window.document);
  function toArray(children) {
      return isArray(children) ? children : children ? [children] : children;
  }
  // this is MUCH faster than .constructor === Array and instanceof Array
  // in Node 7 and the later versions of V8, slower in older versions though
  var isArray = Array.isArray;
  function isNullOrUndef(o) {
      return isUndefined(o) || isNull(o);
  }
  function isNull(o) {
      return o === null;
  }
  function isUndefined(o) {
      return o === void 0;
  }

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var warning$1 = function (message) {
      if (typeof console !== 'undefined' && typeof console.error === 'function') {
          // tslint:disable-next-line:no-console
          console.error(message);
      }
      try {
          // This error was thrown as a convenience so that if you enable
          // "break on all exceptions" in your console,
          // it would pause the execution at this line.
          throw new Error(message);
          // tslint:disable-next-line:no-empty
      }
      catch (e) { }
  };

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var didWarnAboutReceivingStore = false;
  var warnAboutReceivingStore = function () {
      if (didWarnAboutReceivingStore) {
          return;
      }
      didWarnAboutReceivingStore = true;
      warning$1('<Provider> does not support changing `store` on the fly.');
  };
  var Provider = (function (Component$$1) {
      function Provider(props, context) {
          Component$$1.call(this, props, context);
          this.store = props.store;
      }

      if ( Component$$1 ) Provider.__proto__ = Component$$1;
      Provider.prototype = Object.create( Component$$1 && Component$$1.prototype );
      Provider.prototype.constructor = Provider;
      Provider.prototype.getChildContext = function getChildContext () {
          return { store: this.store, storeSubscription: null };
      };
      Provider.prototype.render = function render () {
          // TODO: Maybe not allocate an array here for no reason?
          if (isNullOrUndef(this.props.children) ||
              toArray(this.props.children).length !== 1) {
              throw Error('Inferno Error: Only one child is allowed within the `Provider` component');
          }
          return this.props.children;
      };

      return Provider;
  }(inferno.Component));
  Provider.displayName = 'Provider';
  {
      Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
          var ref = this;
          var store = ref.store;
          var nextStore = nextProps.store;
          if (store !== nextStore) {
              warnAboutReceivingStore();
          }
      };
  }

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var hasOwn = Object.prototype.hasOwnProperty;
  var shallowEqual = function (a, b) {
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
      for (var key$1 in b) {
          if (hasOwn.call(b, key$1)) {
              countB++;
          }
      }
      return countA === countB;
  };

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */
  var Symbol$1 = root.Symbol;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]';
  var undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */
  var objectTag = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype;
  var objectProto$2 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var verifyPlainObject = function (value, displayName, methodName) {
      if (!isPlainObject(value)) {
          warning$1((methodName + "() in " + displayName + " must return a plain object. Instead received " + value + "."));
      }
  };

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  // TODO: Type
  var wrapMapToPropsConstant = function (getConstant) {
      return function (dispatch, options) {
          var constant = getConstant(dispatch, options);
          var constantSelector = function () { return constant; };
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
  var getDependsOnOwnProps = function (mapToProps) { return mapToProps.dependsOnOwnProps !== null &&
      mapToProps.dependsOnOwnProps !== undefined
      ? !!mapToProps.dependsOnOwnProps
      : mapToProps.length !== 1; };
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
  var wrapMapToPropsFunc = function (mapToProps, methodName) {
      return function (dispatch, ref) {
          var displayName = ref.displayName;

          var proxy = function (stateOrDispatch, ownProps) { return proxy.dependsOnOwnProps
              ? proxy.mapToProps(stateOrDispatch, ownProps)
              : proxy.mapToProps(stateOrDispatch); };
          proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
          proxy.mapToProps = function (stateOrDispatch, ownProps) {
              proxy.mapToProps = mapToProps;
              var props = proxy(stateOrDispatch, ownProps);
              if (typeof props === 'function') {
                  proxy.mapToProps = props;
                  proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
                  props = proxy(stateOrDispatch, ownProps);
              }
              {
                  verifyPlainObject(props, displayName, methodName);
              }
              return props;
          };
          return proxy;
      };
  };

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var whenMapDispatchToPropsIsFunction = function (mapDispatchToProps) { return typeof mapDispatchToProps === 'function'
      ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')
      : undefined; };
  var whenMapDispatchToPropsIsMissing = function (mapDispatchToProps) { return !mapDispatchToProps
      ? wrapMapToPropsConstant(function (dispatch) { return ({ dispatch: dispatch }); })
      : undefined; };
  var whenMapDispatchToPropsIsObject = function (mapDispatchToProps) { return mapDispatchToProps && typeof mapDispatchToProps === 'object'
      ? wrapMapToPropsConstant(function (dispatch) { return redux.bindActionCreators(mapDispatchToProps, dispatch); })
      : undefined; };
  var defaultMapDispatchToPropsFactories = [
      whenMapDispatchToPropsIsFunction,
      whenMapDispatchToPropsIsMissing,
      whenMapDispatchToPropsIsObject
  ];

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var whenMapStateToPropsIsFunction = function (mapStateToProps) { return typeof mapStateToProps === 'function'
      ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps')
      : undefined; };
  var whenMapStateToPropsIsMissing = function (mapStateToProps) { return !mapStateToProps ? wrapMapToPropsConstant(function () { return ({}); }) : undefined; };
  var defaultMapStateToPropsFactories = [
      whenMapStateToPropsIsFunction,
      whenMapStateToPropsIsMissing
  ];

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var defaultMergeProps = function (stateProps, dispatchProps, ownProps) { return (Object.assign({}, ownProps, stateProps, dispatchProps)); };
  var wrapMergePropsFunc = function (mergeProps) {
      return function (dispatch, ref) {
          var displayName = ref.displayName;
          var pure = ref.pure;
          var areMergedPropsEqual = ref.areMergedPropsEqual;

          var hasRunOnce = false;
          var mergedProps;
          return function (stateProps, dispatchProps, ownProps) {
              var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
              if (hasRunOnce) {
                  if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) {
                      mergedProps = nextMergedProps;
                  }
              }
              else {
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
  var whenMergePropsIsFunction = function (mergeProps) { return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined; };
  var whenMergePropsIsOmitted = function (mergeProps) { return !mergeProps ? function () { return defaultMergeProps; } : undefined; };
  var defaultMergePropsFactories = [
      whenMergePropsIsFunction,
      whenMergePropsIsOmitted
  ];

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var verify = function (selector, methodName, displayName) {
      if (!selector) {
          throw new Error(("Unexpected value for " + methodName + " in " + displayName + "."));
      }
      if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
          if (!selector.hasOwnProperty('dependsOnOwnProps')) {
              warning$1(("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps."));
          }
      }
  };
  var verifySubselectors = function (mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
      verify(mapStateToProps, 'mapStateToProps', displayName);
      verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
      verify(mergeProps, 'mergeProps', displayName);
  };

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var impureFinalPropsSelectorFactory = function (mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
      return function (state, ownProps) {
          return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
      };
  };
  var pureFinalPropsSelectorFactory = function (mapStateToProps, mapDispatchToProps, mergeProps, dispatch, ref) {
      var areStatesEqual = ref.areStatesEqual;
      var areOwnPropsEqual = ref.areOwnPropsEqual;
      var areStatePropsEqual = ref.areStatePropsEqual;

      var hasRunAtLeastOnce = false;
      var state;
      var ownProps;
      var stateProps;
      var dispatchProps;
      var mergedProps;
      var handleFirstCall = function (firstState, firstOwnProps) {
          state = firstState;
          ownProps = firstOwnProps;
          stateProps = mapStateToProps(state, ownProps);
          dispatchProps = mapDispatchToProps(dispatch, ownProps);
          mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
          hasRunAtLeastOnce = true;
          return mergedProps;
      };
      var handleNewPropsAndNewState = function () {
          stateProps = mapStateToProps(state, ownProps);
          if (mapDispatchToProps.dependsOnOwnProps) {
              dispatchProps = mapDispatchToProps(dispatch, ownProps);
          }
          mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
          return mergedProps;
      };
      var handleNewProps = function () {
          if (mapStateToProps.dependsOnOwnProps) {
              stateProps = mapStateToProps(state, ownProps);
          }
          if (mapDispatchToProps.dependsOnOwnProps) {
              dispatchProps = mapDispatchToProps(dispatch, ownProps);
          }
          mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
          return mergedProps;
      };
      var handleNewState = function () {
          var nextStateProps = mapStateToProps(state, ownProps);
          var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
          stateProps = nextStateProps;
          if (statePropsChanged) {
              mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
          }
          return mergedProps;
      };
      var handleSubsequentCalls = function (nextState, nextOwnProps) {
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
      var pureFinalPropsSelector = function (nextState, nextOwnProps) { return hasRunAtLeastOnce
          ? handleSubsequentCalls(nextState, nextOwnProps)
          : handleFirstCall(nextState, nextOwnProps); };
      return pureFinalPropsSelector;
  };
  // If pure is true, the selector returned by selectorFactory will memoize its results,
  // allowing connectAdvanced's shouldComponentUpdate to return false if final
  // props have not changed. If false, the selector will always return a new
  // object and shouldComponentUpdate will always return true.
  var defaultSelectorFactory = function (dispatch, _a) {
      var initMapStateToProps = _a.initMapStateToProps;
      var initMapDispatchToProps = _a.initMapDispatchToProps;
      var initMergeProps = _a.initMergeProps;
      var opts = __rest(_a, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);
      var options = opts; // trick typescript
      var mapStateToProps = initMapStateToProps(dispatch, options);
      var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
      var mergeProps = initMergeProps(dispatch, options);
      {
          verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
      }
      var selectorFactory = options.pure
          ? pureFinalPropsSelectorFactory
          : impureFinalPropsSelectorFactory;
      return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
  };

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */
  var match = function (arg, factories, name) {
      for (var i = factories.length - 1; i >= 0; i--) {
          var result = factories[i](arg);
          if (result) {
              return result;
          }
      }
      return function (dispatch, options) {
          throw new Error(("Invalid value of type " + (typeof arg) + " for " + name + " argument when connecting component " + (options.wrappedComponentName) + "."));
      };
  };
  var strictEqual = function (a, b) { return a === b; };
  // createConnect with default args builds the 'official' connect behavior. Calling it with
  // different options opens up some testing and extensibility scenarios
  var createConnect = function (ref) {
      if ( ref === void 0 ) ref = {};
      var connectHOC = ref.connectHOC; if ( connectHOC === void 0 ) connectHOC = connectAdvanced;
      var mapStateToPropsFactories = ref.mapStateToPropsFactories; if ( mapStateToPropsFactories === void 0 ) mapStateToPropsFactories = defaultMapStateToPropsFactories;
      var mapDispatchToPropsFactories = ref.mapDispatchToPropsFactories; if ( mapDispatchToPropsFactories === void 0 ) mapDispatchToPropsFactories = defaultMapDispatchToPropsFactories;
      var mergePropsFactories = ref.mergePropsFactories; if ( mergePropsFactories === void 0 ) mergePropsFactories = defaultMergePropsFactories;
      var selectorFactory = ref.selectorFactory; if ( selectorFactory === void 0 ) selectorFactory = defaultSelectorFactory;

      return function (mapStateToProps, mapDispatchToProps, mergeProps, _a) {
      if ( _a === void 0 ) _a = {};

      var pure = _a.pure; if ( pure === void 0 ) pure = true;
      var areStatesEqual = _a.areStatesEqual; if ( areStatesEqual === void 0 ) areStatesEqual = strictEqual;
      var areOwnPropsEqual = _a.areOwnPropsEqual; if ( areOwnPropsEqual === void 0 ) areOwnPropsEqual = shallowEqual;
      var areStatePropsEqual = _a.areStatePropsEqual; if ( areStatePropsEqual === void 0 ) areStatePropsEqual = shallowEqual;
      var areMergedPropsEqual = _a.areMergedPropsEqual; if ( areMergedPropsEqual === void 0 ) areMergedPropsEqual = shallowEqual;
      var extraOptions = __rest(_a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
      var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
      var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
      var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
      return connectHOC(selectorFactory, Object.assign({ 
          // used in error messages
          methodName: 'connect', 
          // used to compute Connect's displayName from the wrapped component's displayName.
          // tslint:disable-next-line:object-literal-sort-keys
          getDisplayName: function (name) { return ("Connect(" + name + ")"); }, 
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
          pure: pure }, extraOptions));
  };
  };
  var connect = createConnect();

  /**
   * @module Inferno-Redux
   */ /** TypeDoc Comment */

  exports.Provider = Provider;
  exports.connectAdvanced = connectAdvanced;
  exports.connect = connect;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
