'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mobx = require('mobx');
var React = require('react');
var React__default = _interopDefault(React);
var reactDom = require('react-dom');
var mobxReactLite = require('mobx-react-lite');

let symbolId = 0;

function createSymbol(name) {
  if (typeof Symbol === "function") {
    return Symbol(name);
  }

  const symbol = `__$mobx-react ${name} (${symbolId})`;
  symbolId++;
  return symbol;
}

const createdSymbols = {};
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

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
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


const hoistBlackList = {
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
  const protoProps = Object.getOwnPropertyNames(Object.getPrototypeOf(base));
  Object.getOwnPropertyNames(base).forEach(key => {
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
      value
    });
  } else {
    target[prop] = value;
  }
}
/**
 * Utilities for patching componentWillUnmount, to make sure @disposeOnUnmount works correctly icm with user defined hooks
 * and the handler provided by mobx-react
 */

const mobxMixins =
/*#__PURE__*/
newSymbol("patchMixins");
const mobxPatchedDefinition =
/*#__PURE__*/
newSymbol("patchedDefinition");

function getMixins(target, methodName) {
  const mixins = target[mobxMixins] = target[mobxMixins] || {};
  const methodMixins = mixins[methodName] = mixins[methodName] || {};
  methodMixins.locks = methodMixins.locks || 0;
  methodMixins.methods = methodMixins.methods || [];
  return methodMixins;
}

function wrapper(realMethod, mixins, ...args) {
  // locks are used to ensure that mixins are invoked only once per invocation, even on recursive calls
  mixins.locks++;

  try {
    let retVal;

    if (realMethod !== undefined && realMethod !== null) {
      retVal = realMethod.apply(this, args);
    }

    return retVal;
  } finally {
    mixins.locks--;

    if (mixins.locks === 0) {
      mixins.methods.forEach(mx => {
        mx.apply(this, args);
      });
    }
  }
}

function wrapFunction(realMethod, mixins) {
  const fn = function (...args) {
    wrapper.call(this, realMethod, mixins, ...args);
  };

  return fn;
}

function patch(target, methodName, mixinMethod) {
  const mixins = getMixins(target, methodName);

  if (mixins.methods.indexOf(mixinMethod) < 0) {
    mixins.methods.push(mixinMethod);
  }

  const oldDefinition = Object.getOwnPropertyDescriptor(target, methodName);

  if (oldDefinition && oldDefinition[mobxPatchedDefinition]) {
    // already patched definition, do not repatch
    return;
  }

  const originalMethod = target[methodName];
  const newDefinition = createDefinition(target, methodName, oldDefinition ? oldDefinition.enumerable : undefined, mixins, originalMethod);
  Object.defineProperty(target, methodName, newDefinition);
}

function createDefinition(target, methodName, enumerable, mixins, originalMethod) {
  let wrappedFunc = wrapFunction(originalMethod, mixins);
  return {
    [mobxPatchedDefinition]: true,
    get: function () {
      return wrappedFunc;
    },
    set: function (value) {
      if (this === target) {
        wrappedFunc = wrapFunction(value, mixins);
      } else {
        // when it is an instance of the prototype/a child prototype patch that particular case again separately
        // since we need to store separate values depending on wether it is the actual instance, the prototype, etc
        // e.g. the method for super might not be the same as the method for the prototype which might be not the same
        // as the method for the instance
        const newDefinition = createDefinition(this, methodName, enumerable, mixins, value);
        Object.defineProperty(this, methodName, newDefinition);
      }
    },
    configurable: true,
    enumerable: enumerable
  };
}

const mobxAdminProperty = mobx.$mobx || "$mobx";
const mobxIsUnmounted =
/*#__PURE__*/
newSymbol("isUnmounted");
const skipRenderKey =
/*#__PURE__*/
newSymbol("skipRender");
const isForcingUpdateKey =
/*#__PURE__*/
newSymbol("isForcingUpdate");
function makeClassComponentObserver(componentClass) {
  const target = componentClass.prototype;
  if (target.componentWillReact) throw new Error("The componentWillReact life-cycle event is no longer supported");

  if (componentClass["__proto__"] !== React.PureComponent) {
    if (!target.shouldComponentUpdate) target.shouldComponentUpdate = observerSCU;else if (target.shouldComponentUpdate !== observerSCU) // n.b. unequal check, instead of existence check, as @observer might be on superclass as well
      throw new Error("It is not allowed to use shouldComponentUpdate in observer based components.");
  } // this.props and this.state are made observable, just to make sure @computed fields that
  // are defined inside the component, and which rely on state or props, re-compute if state or props change
  // (otherwise the computed wouldn't update and become stale on props change, since props are not observable)
  // However, this solution is not without it's own problems: https://github.com/mobxjs/mobx-react/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aobservable-props-or-not+


  makeObservableProp(target, "props");
  makeObservableProp(target, "state");
  const baseRender = target.render;

  target.render = function () {
    return makeComponentReactive.call(this, baseRender);
  };

  patch(target, "componentWillUnmount", function () {
    if (mobxReactLite.isUsingStaticRendering() === true) return;

    if (this.render[mobxAdminProperty]) {
      this.render[mobxAdminProperty].dispose();
    } else {
      const displayName = getDisplayName(this);
      console.warn(`The render function for an observer component (${displayName}) was modified after MobX attached. This is not supported, since the new function can't be triggered by MobX.`);
    }

    this[mobxIsUnmounted] = true;
  });
  return componentClass;
} // Generates a friendly name for debugging

function getDisplayName(comp) {
  return comp.displayName || comp.name || comp.constructor && (comp.constructor.displayName || comp.constructor.name) || "<component>";
}

function makeComponentReactive(render) {
  if (mobxReactLite.isUsingStaticRendering() === true) return render.call(this);
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
  const initialName = getDisplayName(this);
  const baseRender = render.bind(this);
  let isRenderingPending = false;
  const reaction = new mobx.Reaction(`${initialName}.render()`, () => {
    if (!isRenderingPending) {
      // N.B. Getting here *before mounting* means that a component constructor has side effects (see the relevant test in misc.js)
      // This unidiomatic React usage but React will correctly warn about this so we continue as usual
      // See #85 / Pull #44
      isRenderingPending = true;

      if (this[mobxIsUnmounted] !== true) {
        let hasError = true;

        try {
          setHiddenProp(this, isForcingUpdateKey, true);
          if (!this[skipRenderKey]) React.Component.prototype.forceUpdate.call(this);
          hasError = false;
        } finally {
          setHiddenProp(this, isForcingUpdateKey, false);
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
    let exception = undefined;
    let rendering = undefined;
    reaction.track(() => {
      try {
        rendering = mobx._allowStateChanges(false, baseRender);
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
  if (mobxReactLite.isUsingStaticRendering()) {
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
  const valueHolderKey = newSymbol(`reactProp_${propName}_valueHolder`);
  const atomHolderKey = newSymbol(`reactProp_${propName}_atomHolder`);

  function getAtom() {
    if (!this[atomHolderKey]) {
      setHiddenProp(this, atomHolderKey, mobx.createAtom("reactive " + propName));
    }

    return this[atomHolderKey];
  }

  Object.defineProperty(target, propName, {
    configurable: true,
    enumerable: true,
    get: function () {
      let prevReadState = false;

      if (mobx._allowStateReadsStart && mobx._allowStateReadsEnd) {
        prevReadState = mobx._allowStateReadsStart(true);
      }

      getAtom.call(this).reportObserved();

      if (mobx._allowStateReadsStart && mobx._allowStateReadsEnd) {
        mobx._allowStateReadsEnd(prevReadState);
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

const hasSymbol = typeof Symbol === "function" && Symbol.for; // Using react-is had some issues (and operates on elements, not on types), see #608 / #609

const ReactForwardRefSymbol = hasSymbol ?
/*#__PURE__*/
Symbol.for("react.forward_ref") : typeof React.forwardRef === "function" &&
/*#__PURE__*/
React.forwardRef(props => null)["$$typeof"];
const ReactMemoSymbol = hasSymbol ?
/*#__PURE__*/
Symbol.for("react.memo") : typeof React.memo === "function" &&
/*#__PURE__*/
React.memo(props => null)["$$typeof"];
/**
 * Observer function / decorator
 */

function observer(component) {
  if (component["isMobxInjector"] === true) {
    console.warn("Mobx observer: You are trying to use 'observer' on a component that already has 'inject'. Please apply 'observer' before applying 'inject'");
  }

  if (ReactMemoSymbol && component["$$typeof"] === ReactMemoSymbol) {
    throw new Error("Mobx observer: You are trying to use 'observer' on function component wrapped to either another observer or 'React.memo'. The observer already applies 'React.memo' for you.");
  } // Unwrap forward refs into `<Observer>` component
  // we need to unwrap the render, because it is the inner render that needs to be tracked,
  // not the ForwardRef HoC


  if (ReactForwardRefSymbol && component["$$typeof"] === ReactForwardRefSymbol) {
    const baseRender = component["render"];
    if (typeof baseRender !== "function") throw new Error("render property of ForwardRef was not a function");
    return React.forwardRef(function ObserverForwardRef() {
      return React.createElement(mobxReactLite.Observer, null, () => baseRender.apply(undefined, arguments));
    });
  } // Function component


  if (typeof component === "function" && (!component.prototype || !component.prototype.render) && !component["isReactClass"] && !Object.prototype.isPrototypeOf.call(React.Component, component)) {
    return mobxReactLite.observer(component);
  }

  return makeClassComponentObserver(component);
}

const MobXProviderContext =
/*#__PURE__*/
React__default.createContext({});
function Provider(props) {
  const {
    children,
    ...stores
  } = props;
  const parentValue = React__default.useContext(MobXProviderContext);
  const mutableProviderRef = React__default.useRef({ ...parentValue,
    ...stores
  });
  const value = mutableProviderRef.current;

  {
    const newValue = { ...value,
      ...stores
    }; // spread in previous state for the context based stores

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
  let Injector = React__default.forwardRef((props, ref) => {
    const newProps = { ...props
    };
    const context = React__default.useContext(MobXProviderContext);
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
  let displayName;
  const componentName = component.displayName || component.name || component.constructor && component.constructor.name || "Component";
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


function inject(
/* fn(stores, nextProps) or ...storeNames */
...storeNames) {
  if (typeof arguments[0] === "function") {
    let grabStoresFn = arguments[0];
    return componentClass => createStoreInjector(grabStoresFn, componentClass, grabStoresFn.name, true);
  } else {
    return componentClass => createStoreInjector(grabStoresByName(storeNames), componentClass, storeNames.join("-"), false);
  }
}

const protoStoreKey =
/*#__PURE__*/
newSymbol("disposeOnUnmountProto");
const instStoreKey =
/*#__PURE__*/
newSymbol("disposeOnUnmountInst");

function runDisposersOnWillUnmount() {
  [...(this[protoStoreKey] || []), ...(this[instStoreKey] || [])].forEach(propKeyOrFunction => {
    const prop = typeof propKeyOrFunction === "string" ? this[propKeyOrFunction] : propKeyOrFunction;

    if (prop !== undefined && prop !== null) {
      if (Array.isArray(prop)) prop.map(f => f());else prop();
    }
  });
}

function disposeOnUnmount(target, propertyKeyOrFunction) {
  if (Array.isArray(propertyKeyOrFunction)) {
    return propertyKeyOrFunction.map(fn => disposeOnUnmount(target, fn));
  }

  const c = Object.getPrototypeOf(target).constructor || Object.getPrototypeOf(target.constructor);
  const c2 = Object.getPrototypeOf(target.constructor);

  if (!(c === React__default.Component || c === React__default.PureComponent || c2 === React__default.Component || c2 === React__default.PureComponent)) {
    throw new Error("[mobx-react] disposeOnUnmount only supports direct subclasses of React.Component or React.PureComponent.");
  }

  if (typeof propertyKeyOrFunction !== "string" && typeof propertyKeyOrFunction !== "function" && !Array.isArray(propertyKeyOrFunction)) {
    throw new Error("[mobx-react] disposeOnUnmount only works if the parameter is either a property key or a function.");
  } // decorator's target is the prototype, so it doesn't have any instance properties like props


  const isDecorator = typeof propertyKeyOrFunction === "string"; // add property key / function we want run (disposed) to the store

  const componentWasAlreadyModified = !!target[protoStoreKey] || !!target[instStoreKey];
  const store = isDecorator ? // decorators are added to the prototype store
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
  function checkType(isRequired, props, propName, componentName, location, propFullName, ...rest) {
    return mobx.untracked(() => {
      componentName = componentName || "<<anonymous>>";
      propFullName = propFullName || propName;

      if (props[propName] == null) {
        if (isRequired) {
          const actual = props[propName] === null ? "null" : "undefined";
          return new Error("The " + location + " `" + propFullName + "` is marked as required " + "in `" + componentName + "`, but its value is `" + actual + "`.");
        }

        return null;
      } else {
        // @ts-ignore rest arg is necessary for some React internals - fails tests otherwise
        return validator(props, propName, componentName, location, propFullName, ...rest);
      }
    });
  }

  const chainedCheckType = checkType.bind(null, false); // Add isRequired to satisfy Requirable

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
  const propType = typeof propValue;

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
  const propType = getPropType(propValue);

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
  return createChainableTypeChecker((props, propName, componentName, location, propFullName) => {
    return mobx.untracked(() => {
      if (allowNativeType) {
        if (getPropType(props[propName]) === mobxType.toLowerCase()) return null;
      }

      let mobxChecker;

      switch (mobxType) {
        case "Array":
          mobxChecker = mobx.isObservableArray;
          break;

        case "Object":
          mobxChecker = mobx.isObservableObject;
          break;

        case "Map":
          mobxChecker = mobx.isObservableMap;
          break;

        default:
          throw new Error(`Unexpected mobxType: ${mobxType}`);
      }

      const propValue = props[propName];

      if (!mobxChecker(propValue)) {
        const preciseType = getPreciseType(propValue);
        const nativeTypeExpectationMessage = allowNativeType ? " or javascript `" + mobxType.toLowerCase() + "`" : "";
        return new Error("Invalid prop `" + propFullName + "` of type `" + preciseType + "` supplied to" + " `" + componentName + "`, expected `mobx.Observable" + mobxType + "`" + nativeTypeExpectationMessage + ".");
      }

      return null;
    });
  });
}

function createObservableArrayOfTypeChecker(allowNativeType, typeChecker) {
  return createChainableTypeChecker((props, propName, componentName, location, propFullName, ...rest) => {
    return mobx.untracked(() => {
      if (typeof typeChecker !== "function") {
        return new Error("Property `" + propFullName + "` of component `" + componentName + "` has " + "invalid PropType notation.");
      } else {
        let error = createObservableTypeCheckerCreator(allowNativeType, "Array")(props, propName, componentName, location, propFullName);
        if (error instanceof Error) return error;
        const propValue = props[propName];

        for (let i = 0; i < propValue.length; i++) {
          error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ...rest);
          if (error instanceof Error) return error;
        }

        return null;
      }
    });
  });
}

const observableArray =
/*#__PURE__*/
createObservableTypeCheckerCreator(false, "Array");
const observableArrayOf =
/*#__PURE__*/
createObservableArrayOfTypeChecker.bind(null, false);
const observableMap =
/*#__PURE__*/
createObservableTypeCheckerCreator(false, "Map");
const observableObject =
/*#__PURE__*/
createObservableTypeCheckerCreator(false, "Object");
const arrayOrObservableArray =
/*#__PURE__*/
createObservableTypeCheckerCreator(true, "Array");
const arrayOrObservableArrayOf =
/*#__PURE__*/
createObservableArrayOfTypeChecker.bind(null, true);
const objectOrObservableObject =
/*#__PURE__*/
createObservableTypeCheckerCreator(true, "Object");
const PropTypes = {
  observableArray,
  observableArrayOf,
  observableMap,
  observableObject,
  arrayOrObservableArray,
  arrayOrObservableArrayOf,
  objectOrObservableObject
};

if (!React.Component) throw new Error("mobx-react requires React to be available");
if (!mobx.observable) throw new Error("mobx-react requires mobx to be available");
if (typeof reactDom.unstable_batchedUpdates === "function") mobx.configure({
  reactionScheduler: reactDom.unstable_batchedUpdates
});

Object.defineProperty(exports, 'Observer', {
    enumerable: true,
    get: function () {
        return mobxReactLite.Observer;
    }
});
Object.defineProperty(exports, 'isUsingStaticRendering', {
    enumerable: true,
    get: function () {
        return mobxReactLite.isUsingStaticRendering;
    }
});
Object.defineProperty(exports, 'useAsObservableSource', {
    enumerable: true,
    get: function () {
        return mobxReactLite.useAsObservableSource;
    }
});
Object.defineProperty(exports, 'useLocalStore', {
    enumerable: true,
    get: function () {
        return mobxReactLite.useLocalStore;
    }
});
Object.defineProperty(exports, 'useObserver', {
    enumerable: true,
    get: function () {
        return mobxReactLite.useObserver;
    }
});
Object.defineProperty(exports, 'useStaticRendering', {
    enumerable: true,
    get: function () {
        return mobxReactLite.useStaticRendering;
    }
});
exports.MobXProviderContext = MobXProviderContext;
exports.PropTypes = PropTypes;
exports.Provider = Provider;
exports.disposeOnUnmount = disposeOnUnmount;
exports.inject = inject;
exports.observer = observer;
//# sourceMappingURL=mobxreact.cjs.development.js.map
