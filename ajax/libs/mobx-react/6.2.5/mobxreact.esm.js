import { Reaction, _allowStateChanges, _allowStateReadsStart, _allowStateReadsEnd, $mobx, createAtom, untracked, isObservableMap, isObservableObject, isObservableArray, observable } from 'mobx';
import React__default, { PureComponent, Component, forwardRef, memo, createElement } from 'react';
import { isUsingStaticRendering, Observer, observer as observer$1 } from 'mobx-react-lite';
export { Observer, isObserverBatched, isUsingStaticRendering, observerBatching, observerBatchingOptOut, useAsObservableSource, useLocalStore, useObserver, useStaticRendering } from 'mobx-react-lite';

var symbolId = 0;

function createSymbol(name) {
  if (typeof Symbol === "function") {
    return Symbol(name);
  }

  var symbol = "__$mobx-react " + name + " (" + symbolId + ")";
  symbolId++;
  return symbol;
}

var createdSymbols = {};
function newSymbol(name) {
  if (!createdSymbols[name]) {
    createdSymbols[name] = createSymbol(name);
  }

  return createdSymbols[name];
}
function shallowEqual(objA, objB) {
  //From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (is(objA, objB)) return true;

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
} // based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js


var hoistBlackList = {
  $$typeof: 1,
  render: 1,
  compare: 1,
  type: 1,
  childContextTypes: 1,
  contextType: 1,
  contextTypes: 1,
  defaultProps: 1,
  getDefaultProps: 1,
  getDerivedStateFromError: 1,
  getDerivedStateFromProps: 1,
  mixins: 1,
  propTypes: 1
};
function copyStaticProperties(base, target) {
  var protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(base));
  Object.getOwnPropertyNames(base).forEach(function (key) {
    if (!hoistBlackList[key] && protoProps.indexOf(key) === -1) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}
/**
 * Helper to set `prop` to `this` as non-enumerable (hidden prop)
 * @param target
 * @param prop
 * @param value
 */

function setHiddenProp(target, prop, value) {
  if (!Object.hasOwnProperty.call(target, prop)) {
    Object.defineProperty(target, prop, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: value
    });
  } else {
    target[prop] = value;
  }
}
/**
 * Utilities for patching componentWillUnmount, to make sure @disposeOnUnmount works correctly icm with user defined hooks
 * and the handler provided by mobx-react
 */

var mobxMixins =
/*#__PURE__*/
newSymbol("patchMixins");
var mobxPatchedDefinition =
/*#__PURE__*/
newSymbol("patchedDefinition");

function getMixins(target, methodName) {
  var mixins = target[mobxMixins] = target[mobxMixins] || {};
  var methodMixins = mixins[methodName] = mixins[methodName] || {};
  methodMixins.locks = methodMixins.locks || 0;
  methodMixins.methods = methodMixins.methods || [];
  return methodMixins;
}

function wrapper(realMethod, mixins) {
  var _this = this;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  // locks are used to ensure that mixins are invoked only once per invocation, even on recursive calls
  mixins.locks++;

  try {
    var retVal;

    if (realMethod !== undefined && realMethod !== null) {
      retVal = realMethod.apply(this, args);
    }

    return retVal;
  } finally {
    mixins.locks--;

    if (mixins.locks === 0) {
      mixins.methods.forEach(function (mx) {
        mx.apply(_this, args);
      });
    }
  }
}

function wrapFunction(realMethod, mixins) {
  var fn = function fn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    wrapper.call.apply(wrapper, [this, realMethod, mixins].concat(args));
  };

  return fn;
}

function patch(target, methodName, mixinMethod) {
  var mixins = getMixins(target, methodName);

  if (mixins.methods.indexOf(mixinMethod) < 0) {
    mixins.methods.push(mixinMethod);
  }

  var oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);

  if (oldDefinition && oldDefinition[mobxPatchedDefinition]) {
    // already patched definition, do not repatch
    return;
  }

  var originalMethod = target[methodName];
  var newDefinition = createDefinition(target, methodName, oldDefinition ? oldDefinition.enumerable : undefined, mixins, originalMethod);
  Object.defineProperty(target, methodName, newDefinition);
}

function createDefinition(target, methodName, enumerable, mixins, originalMethod) {
  var _ref;

  var wrappedFunc = wrapFunction(originalMethod, mixins);
  return _ref = {}, _ref[mobxPatchedDefinition] = true, _ref.get = function get() {
    return wrappedFunc;
  }, _ref.set = function set(value) {
    if (this === target) {
      wrappedFunc = wrapFunction(value, mixins);
    } else {
      // when it is an instance of the prototype/a child prototype patch that particular case again separately
      // since we need to store separate values depending on wether it is the actual instance, the prototype, etc
      // e.g. the method for super might not be the same as the method for the prototype which might be not the same
      // as the method for the instance
      var newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
      Object.defineProperty(this, methodName, newDefinition);
    }
  }, _ref.configurable = true, _ref.enumerable = enumerable, _ref;
}

var mobxAdminProperty = $mobx || "$mobx";
var mobxObserverProperty =
/*#__PURE__*/
newSymbol("isMobXReactObserver");
var mobxIsUnmounted =
/*#__PURE__*/
newSymbol("isUnmounted");
var skipRenderKey =
/*#__PURE__*/
newSymbol("skipRender");
var isForcingUpdateKey =
/*#__PURE__*/
newSymbol("isForcingUpdate");
function makeClassComponentObserver(componentClass) {
  var target = componentClass.prototype;

  if (componentClass[mobxObserverProperty]) {
    var displayName = getDisplayName(target);
    console.warn("The provided component class (" + displayName + ") \n                has already been declared as an observer component.");
  } else {
    componentClass[mobxObserverProperty] = true;
  }

  if (target.componentWillReact) throw new Error("The componentWillReact life-cycle event is no longer supported");

  if (componentClass["__proto__"] !== PureComponent) {
    if (!target.shouldComponentUpdate) target.shouldComponentUpdate = observerSCU;else if (target.shouldComponentUpdate !== observerSCU) // n.b. unequal check, instead of existence check, as @observer might be on superclass as well
      throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.");
  } // this.props and this.state are made observable, just to make sure @computed fields that
  // are defined inside the component, and which rely on state or props, re-compute if state or props change
  // (otherwise the computed wouldn't update and become stale on props change, since props are not observable)
  // However, this solution is not without it's own problems: https://github.com/mobxjs/mobx-react/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aobservable-props-or-not+


  makeObservableProp(target, "props");
  makeObservableProp(target, "state");
  var baseRender = target.render;

  target.render = function () {
    return makeComponentReactive.call(this, baseRender);
  };

  patch(target, "componentWillUnmount", function () {
    var _this$render$mobxAdmi;

    if (isUsingStaticRendering() === true) return;
    (_this$render$mobxAdmi = this.render[mobxAdminProperty]) === null || _this$render$mobxAdmi === void 0 ? void 0 : _this$render$mobxAdmi.dispose();
    this[mobxIsUnmounted] = true;

    if (!this.render[mobxAdminProperty]) {
      // Render may have been hot-swapped and/or overriden by a subclass.
      var _displayName = getDisplayName(this);

      console.warn("The reactive render of an observer class component (" + _displayName + ") \n                was overriden after MobX attached. This may result in a memory leak if the \n                overriden reactive render was not properly disposed.");
    }
  });
  return componentClass;
} // Generates a friendly name for debugging

function getDisplayName(comp) {
  return comp.displayName || comp.name || comp.constructor && (comp.constructor.displayName || comp.constructor.name) || "<component>";
}

function makeComponentReactive(render) {
  var _this = this;

  if (isUsingStaticRendering() === true) return render.call(this);
  /**
   * If props are shallowly modified, react will render anyway,
   * so atom.reportChanged() should not result in yet another re-render
   */

  setHiddenProp(this, skipRenderKey, false);
  /**
   * forceUpdate will re-assign this.props. We don't want that to cause a loop,
   * so detect these changes
   */

  setHiddenProp(this, isForcingUpdateKey, false);
  var initialName = getDisplayName(this);
  var baseRender = render.bind(this);
  var isRenderingPending = false;
  var reaction = new Reaction(initialName + ".render()", function () {
    if (!isRenderingPending) {
      // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
      // This unidiomatic React usage but React will correctly warn about this so we continue as usual
      // See #85 / Pull #44
      isRenderingPending = true;

      if (_this[mobxIsUnmounted] !== true) {
        var hasError = true;

        try {
          setHiddenProp(_this, isForcingUpdateKey, true);
          if (!_this[skipRenderKey]) Component.prototype.forceUpdate.call(_this);
          hasError = false;
        } finally {
          setHiddenProp(_this, isForcingUpdateKey, false);
          if (hasError) reaction.dispose();
        }
      }
    }
  });
  reaction["reactComponent"] = this;
  reactiveRender[mobxAdminProperty] = reaction;
  this.render = reactiveRender;

  function reactiveRender() {
    isRenderingPending = false;
    var exception = undefined;
    var rendering = undefined;
    reaction.track(function () {
      try {
        rendering = _allowStateChanges(false, baseRender);
      } catch (e) {
        exception = e;
      }
    });

    if (exception) {
      throw exception;
    }

    return rendering;
  }

  return reactiveRender.call(this);
}

function observerSCU(nextProps, nextState) {
  if (isUsingStaticRendering()) {
    console.warn("[mobx-react] It seems that a re-rendering of a React component is triggered while in static (server-side) mode. Please make sure components are rendered only once server-side.");
  } // update on any state changes (as is the default)


  if (this.state !== nextState) {
    return true;
  } // update if props are shallowly not equal, inspired by PureRenderMixin
  // we could return just 'false' here, and avoid the `skipRender` checks etc
  // however, it is nicer if lifecycle events are triggered like usually,
  // so we return true here if props are shallowly modified.


  return !shallowEqual(this.props, nextProps);
}

function makeObservableProp(target, propName) {
  var valueHolderKey = newSymbol("reactProp_" + propName + "_valueHolder");
  var atomHolderKey = newSymbol("reactProp_" + propName + "_atomHolder");

  function getAtom() {
    if (!this[atomHolderKey]) {
      setHiddenProp(this, atomHolderKey, createAtom("reactive " + propName));
    }

    return this[atomHolderKey];
  }

  Object.defineProperty(target, propName, {
    configurable: true,
    enumerable: true,
    get: function get() {
      var prevReadState = false;

      if (_allowStateReadsStart && _allowStateReadsEnd) {
        prevReadState = _allowStateReadsStart(true);
      }

      getAtom.call(this).reportObserved();

      if (_allowStateReadsStart && _allowStateReadsEnd) {
        _allowStateReadsEnd(prevReadState);
      }

      return this[valueHolderKey];
    },
    set: function set(v) {
      if (!this[isForcingUpdateKey] && !shallowEqual(this[valueHolderKey], v)) {
        setHiddenProp(this, valueHolderKey, v);
        setHiddenProp(this, skipRenderKey, true);
        getAtom.call(this).reportChanged();
        setHiddenProp(this, skipRenderKey, false);
      } else {
        setHiddenProp(this, valueHolderKey, v);
      }
    }
  });
}

var hasSymbol = typeof Symbol === "function" && Symbol.for; // Using react-is had some issues (and operates on elements, not on types), see #608 / #609

var ReactForwardRefSymbol = hasSymbol ?
/*#__PURE__*/
Symbol.for("react.forward_ref") : typeof forwardRef === "function" &&
/*#__PURE__*/
forwardRef(function (props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ?
/*#__PURE__*/
Symbol.for("react.memo") : typeof memo === "function" &&
/*#__PURE__*/
memo(function (props) {
  return null;
})["$$typeof"];
/**
 * Observer function / decorator
 */

function observer(component) {
  if (component["isMobxInjector"] === true) {
    console.warn("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
  }

  if (ReactMemoSymbol && component["$$typeof"] === ReactMemoSymbol) {
    throw new Error("Mobx observer: You are trying to use 'observer' on a function component wrapped in either another observer or 'React.memo'. The observer already applies 'React.memo' for you.");
  } // Unwrap forward refs into `<Observer>` component
  // we need to unwrap the render, because it is the inner render that needs to be tracked,
  // not the ForwardRef HoC


  if (ReactForwardRefSymbol && component["$$typeof"] === ReactForwardRefSymbol) {
    var baseRender = component["render"];
    if (typeof baseRender !== "function") throw new Error("render property of ForwardRef was not a function");
    return forwardRef(function ObserverForwardRef() {
      var args = arguments;
      return createElement(Observer, null, function () {
        return baseRender.apply(undefined, args);
      });
    });
  } // Function component


  if (typeof component === "function" && (!component.prototype || !component.prototype.render) && !component["isReactClass"] && !Object.prototype.isPrototypeOf.call(Component, component)) {
    return observer$1(component);
  }

  return makeClassComponentObserver(component);
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

var MobXProviderContext =
/*#__PURE__*/
React__default.createContext({});
function Provider(props) {
  var children = props.children,
      stores = _objectWithoutPropertiesLoose(props, ["children"]);

  var parentValue = React__default.useContext(MobXProviderContext);
  var mutableProviderRef = React__default.useRef(_extends({}, parentValue, {}, stores));
  var value = mutableProviderRef.current;

  if (process.env.NODE_ENV !== "production") {
    var newValue = _extends({}, value, {}, stores); // spread in previous state for the context based stores


    if (!shallowEqual(value, newValue)) {
      throw new Error("MobX Provider: The set of provided stores has changed. See: https://github.com/mobxjs/mobx-react#the-set-of-provided-stores-has-changed-error.");
    }
  }

  return React__default.createElement(MobXProviderContext.Provider, {
    value: value
  }, children);
}
Provider.displayName = "MobXProvider";

/**
 * Store Injection
 */

function createStoreInjector(grabStoresFn, component, injectNames, makeReactive) {
  // Support forward refs
  var Injector = React__default.forwardRef(function (props, ref) {
    var newProps = _extends({}, props);

    var context = React__default.useContext(MobXProviderContext);
    Object.assign(newProps, grabStoresFn(context || {}, newProps) || {});

    if (ref) {
      newProps.ref = ref;
    }

    return React__default.createElement(component, newProps);
  });
  if (makeReactive) Injector = observer(Injector);
  Injector["isMobxInjector"] = true; // assigned late to suppress observer warning
  // Static fields from component should be visible on the generated Injector

  copyStaticProperties(component, Injector);
  Injector["wrappedComponent"] = component;
  Injector.displayName = getInjectName(component, injectNames);
  return Injector;
}

function getInjectName(component, injectNames) {
  var displayName;
  var componentName = component.displayName || component.name || component.constructor && component.constructor.name || "Component";
  if (injectNames) displayName = "inject-with-" + injectNames + "(" + componentName + ")";else displayName = "inject(" + componentName + ")";
  return displayName;
}

function grabStoresByName(storeNames) {
  return function (baseStores, nextProps) {
    storeNames.forEach(function (storeName) {
      if (storeName in nextProps // prefer props over stores
      ) return;
      if (!(storeName in baseStores)) throw new Error("MobX injector: Store '" + storeName + "' is not available! Make sure it is provided by some Provider");
      nextProps[storeName] = baseStores[storeName];
    });
    return nextProps;
  };
}
/**
 * higher order component that injects stores to a child.
 * takes either a varargs list of strings, which are stores read from the context,
 * or a function that manually maps the available stores from the context to props:
 * storesToProps(mobxStores, props, context) => newProps
 */


function inject() {
  for (var _len = arguments.length, storeNames = new Array(_len), _key = 0; _key < _len; _key++) {
    storeNames[_key] = arguments[_key];
  }

  if (typeof arguments[0] === "function") {
    var grabStoresFn = arguments[0];
    return function (componentClass) {
      return createStoreInjector(grabStoresFn, componentClass, grabStoresFn.name, true);
    };
  } else {
    return function (componentClass) {
      return createStoreInjector(grabStoresByName(storeNames), componentClass, storeNames.join("-"), false);
    };
  }
}

var protoStoreKey =
/*#__PURE__*/
newSymbol("disposeOnUnmountProto");
var instStoreKey =
/*#__PURE__*/
newSymbol("disposeOnUnmountInst");

function runDisposersOnWillUnmount() {
  var _this = this;
  [].concat(this[protoStoreKey] || [], this[instStoreKey] || []).forEach(function (propKeyOrFunction) {
    var prop = typeof propKeyOrFunction === "string" ? _this[propKeyOrFunction] : propKeyOrFunction;

    if (prop !== undefined && prop !== null) {
      if (Array.isArray(prop)) prop.map(function (f) {
        return f();
      });else prop();
    }
  });
}

function disposeOnUnmount(target, propertyKeyOrFunction) {
  if (Array.isArray(propertyKeyOrFunction)) {
    return propertyKeyOrFunction.map(function (fn) {
      return disposeOnUnmount(target, fn);
    });
  }

  var c = Object.getPrototypeOf(target).constructor;
  var c2 = Object.getPrototypeOf(target.constructor); // Special case for react-hot-loader

  var c3 = Object.getPrototypeOf(Object.getPrototypeOf(target));

  if (!(c === React__default.Component || c === React__default.PureComponent || c2 === React__default.Component || c2 === React__default.PureComponent || c3 === React__default.Component || c3 === React__default.PureComponent)) {
    throw new Error("[mobx-react] disposeOnUnmount only supports direct subclasses of React.Component or React.PureComponent.");
  }

  if (typeof propertyKeyOrFunction !== "string" && typeof propertyKeyOrFunction !== "function" && !Array.isArray(propertyKeyOrFunction)) {
    throw new Error("[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function.");
  } // decorator's target is the prototype, so it doesn't have any instance properties like props


  var isDecorator = typeof propertyKeyOrFunction === "string"; // add property key / function we want run (disposed) to the store

  var componentWasAlreadyModified = !!target[protoStoreKey] || !!target[instStoreKey];
  var store = isDecorator ? // decorators are added to the prototype store
  target[protoStoreKey] || (target[protoStoreKey] = []) : // functions are added to the instance store
  target[instStoreKey] || (target[instStoreKey] = []);
  store.push(propertyKeyOrFunction); // tweak the component class componentWillUnmount if not done already

  if (!componentWasAlreadyModified) {
    patch(target, "componentWillUnmount", runDisposersOnWillUnmount);
  } // return the disposer as is if invoked as a non decorator


  if (typeof propertyKeyOrFunction !== "string") {
    return propertyKeyOrFunction;
  }
}

function createChainableTypeChecker(validator) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    for (var _len = arguments.length, rest = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
      rest[_key - 6] = arguments[_key];
    }

    return untracked(function () {
      componentName = componentName || "<<anonymous>>";
      propFullName = propFullName || propName;

      if (props[propName] == null) {
        if (isRequired) {
          var actual = props[propName] === null ? "null" : "undefined";
          return new Error("The " + location + " `" + propFullName + "` is marked as required " + "in `" + componentName + "`, but its value is `" + actual + "`.");
        }

        return null;
      } else {
        // @ts-ignore rest arg is necessary for some React internals - fails tests otherwise
        return validator.apply(void 0, [props, propName, componentName, location, propFullName].concat(rest));
      }
    });
  }

  var chainedCheckType = checkType.bind(null, false); // Add isRequired to satisfy Requirable

  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
} // Copied from React.PropTypes


function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === "symbol") {
    return true;
  } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


  if (propValue["@@toStringTag"] === "Symbol") {
    return true;
  } // Fallback for non-spec compliant Symbols which are polyfilled.


  if (typeof Symbol === "function" && propValue instanceof Symbol) {
    return true;
  }

  return false;
} // Copied from React.PropTypes


function getPropType(propValue) {
  var propType = typeof propValue;

  if (Array.isArray(propValue)) {
    return "array";
  }

  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return "object";
  }

  if (isSymbol(propType, propValue)) {
    return "symbol";
  }

  return propType;
} // This handles more types than `getPropType`. Only used for error messages.
// Copied from React.PropTypes


function getPreciseType(propValue) {
  var propType = getPropType(propValue);

  if (propType === "object") {
    if (propValue instanceof Date) {
      return "date";
    } else if (propValue instanceof RegExp) {
      return "regexp";
    }
  }

  return propType;
}

function createObservableTypeCheckerCreator(allowNativeType, mobxType) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    return untracked(function () {
      if (allowNativeType) {
        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
      }

      var mobxChecker;

      switch (mobxType) {
        case "Array":
          mobxChecker = isObservableArray;
          break;

        case "Object":
          mobxChecker = isObservableObject;
          break;

        case "Map":
          mobxChecker = isObservableMap;
          break;

        default:
          throw new Error("Unexpected mobxType: " + mobxType);
      }

      var propValue = props[propName];

      if (!mobxChecker(propValue)) {
        var preciseType = getPreciseType(propValue);
        var nativeTypeExpectationMessage = allowNativeType ? " or javascript `" + mobxType.toLowerCase() + "`" : "";
        return new Error("Invalid prop `" + propFullName + "` of type `" + preciseType + "` supplied to" + " `" + componentName + "`, expected `mobx.Observable" + mobxType + "`" + nativeTypeExpectationMessage + ".");
      }

      return null;
    });
  });
}

function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
  return createChainableTypeChecker(function (props, propName, componentName, location, propFullName) {
    for (var _len2 = arguments.length, rest = new Array(_len2 > 5 ? _len2 - 5 : 0), _key2 = 5; _key2 < _len2; _key2++) {
      rest[_key2 - 5] = arguments[_key2];
    }

    return untracked(function () {
      if (typeof typeChecker !== "function") {
        return new Error("Property `" + propFullName + "` of component `" + componentName + "` has " + "invalid PropType notation.");
      } else {
        var error = createObservableTypeCheckerCreator(allowNativeType, "Array")(props, propName, componentName, location, propFullName);
        if (error instanceof Error) return error;
        var propValue = props[propName];

        for (var i = 0; i < propValue.length; i++) {
          error = typeChecker.apply(void 0, [propValue, i, componentName, location, propFullName + "[" + i + "]"].concat(rest));
          if (error instanceof Error) return error;
        }

        return null;
      }
    });
  });
}

var observableArray =
/*#__PURE__*/
createObservableTypeCheckerCreator(false, "Array");
var observableArrayOf =
/*#__PURE__*/
createObservableArrayOfTypeChecker.bind(null, false);
var observableMap =
/*#__PURE__*/
createObservableTypeCheckerCreator(false, "Map");
var observableObject =
/*#__PURE__*/
createObservableTypeCheckerCreator(false, "Object");
var arrayOrObservableArray =
/*#__PURE__*/
createObservableTypeCheckerCreator(true, "Array");
var arrayOrObservableArrayOf =
/*#__PURE__*/
createObservableArrayOfTypeChecker.bind(null, true);
var objectOrObservableObject =
/*#__PURE__*/
createObservableTypeCheckerCreator(true, "Object");
var PropTypes = {
  observableArray: observableArray,
  observableArrayOf: observableArrayOf,
  observableMap: observableMap,
  observableObject: observableObject,
  arrayOrObservableArray: arrayOrObservableArray,
  arrayOrObservableArrayOf: arrayOrObservableArrayOf,
  objectOrObservableObject: objectOrObservableObject
};

if (!Component) throw new Error("mobx-react requires React to be available");
if (!observable) throw new Error("mobx-react requires mobx to be available");

export { MobXProviderContext, PropTypes, Provider, disposeOnUnmount, inject, observer };
//# sourceMappingURL=mobxreact.esm.js.map
