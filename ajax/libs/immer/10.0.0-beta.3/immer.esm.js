// Should be no imports here!
/**
 * The sentinel value returned by producers to replace the draft with undefined.
 */
var NOTHING = /*#__PURE__*/Symbol["for"]("immer-nothing");
/**
 * To let Immer treat your class instances as plain immutable objects
 * (albeit with a custom prototype), you must define either an instance property
 * or a static property on each of your custom classes.
 *
 * Otherwise, your class instance will never be drafted, which means it won't be
 * safe to mutate in a produce callback.
 */
var DRAFTABLE = /*#__PURE__*/Symbol["for"]("immer-draftable");
var DRAFT_STATE = /*#__PURE__*/Symbol["for"]("immer-state");

var errors = process.env.NODE_ENV !== "production" ? [
// All error codes, starting by 0:
function (plugin) {
  return "The plugin for '" + plugin + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + plugin + "()` when initializing your application.";
}, function (thing) {
  return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + thing + "'";
}, "This object has been frozen and should not be mutated", function (data) {
  return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
}, "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.", "Immer forbids circular references", "The first or second argument to `produce` must be a function", "The third argument to `produce` must be a function or undefined", "First argument to `createDraft` must be a plain object, an array, or an immerable object", "First argument to `finishDraft` must be a draft returned by `createDraft`", function (thing) {
  return "'current' expects a draft, got: " + thing;
}, "Object.defineProperty() cannot be used on an Immer draft", "Object.setPrototypeOf() cannot be used on an Immer draft", "Immer only supports deleting array indices", "Immer only supports setting array indices and the 'length' property", function (thing) {
  return "'original' expects a draft, got: " + thing;
}
// Note: if more errors are added, the errorOffset in Patches.ts should be increased
// See Patches.ts for additional errors
] : [];
function die(error) {
  if (process.env.NODE_ENV !== "production") {
    var e = errors[error];
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var msg = typeof e === "function" ? e.apply(null, args) : e;
    throw new Error("[Immer] " + msg);
  }
  throw new Error("[Immer] minified error nr: " + error + ". Full error at: https://bit.ly/3cXEKWf");
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;
  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;
    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);
      _cache.set(Class, Wrapper);
    }
    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

/** Returns true if the given value is an Immer draft */
/*#__PURE__*/
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
/** Returns true if the given value can be drafted by Immer */
/*#__PURE__*/
function isDraftable(value) {
  var _value$constructor;
  if (!value) return false;
  return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!((_value$constructor = value.constructor) != null && _value$constructor[DRAFTABLE]) || isMap(value) || isSet(value);
}
var objectCtorString = /*#__PURE__*/Object.prototype.constructor.toString();
/*#__PURE__*/
function isPlainObject(value) {
  if (!value || typeof value !== "object") return false;
  var proto = Object.getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  var Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object) return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function original(value) {
  if (!isDraft(value)) die(15, value);
  return value[DRAFT_STATE].base_;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0 /* Object */) {
    Object.entries(obj).forEach(function (_ref) {
      var key = _ref[0],
        value = _ref[1];
      iter(key, value, obj);
    });
  } else {
    obj.forEach(function (entry, index) {
      return iter(index, entry, obj);
    });
  }
}
/*#__PURE__*/
function getArchtype(thing) {
  var state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 /* Array */ : isMap(thing) ? 2 /* Map */ : isSet(thing) ? 3 /* Set */ : 0 /* Object */;
}
/*#__PURE__*/
function has(thing, prop) {
  return getArchtype(thing) === 2 /* Map */ ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
/*#__PURE__*/
function get(thing, prop) {
  // @ts-ignore
  return getArchtype(thing) === 2 /* Map */ ? thing.get(prop) : thing[prop];
}
/*#__PURE__*/
function set(thing, propOrOldValue, value) {
  var t = getArchtype(thing);
  if (t === 2 /* Map */) thing.set(propOrOldValue, value);else if (t === 3 /* Set */) {
    thing.add(value);
  } else thing[propOrOldValue] = value;
}
/*#__PURE__*/
function is(x, y) {
  // From: https://github.com/facebook/fbjs/blob/c69904a511b900266935168223063dd8772dfc40/packages/fbjs/src/core/shallowEqual.js
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
/*#__PURE__*/
function isMap(target) {
  return target instanceof Map;
}
/*#__PURE__*/
function isSet(target) {
  return target instanceof Set;
}
/*#__PURE__*/
function latest(state) {
  return state.copy_ || state.base_;
}
/*#__PURE__*/
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base)) return Array.prototype.slice.call(base);
  if (!strict && isPlainObject(base)) {
    if (!Object.getPrototypeOf(base)) {
      var obj = Object.create(null);
      return Object.assign(obj, base);
    }
    return _extends({}, base);
  }
  var descriptors = Object.getOwnPropertyDescriptors(base);
  delete descriptors[DRAFT_STATE];
  var keys = Reflect.ownKeys(descriptors);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var desc = descriptors[key];
    if (desc.writable === false) {
      desc.writable = true;
      desc.configurable = true;
    }
    // like object.assign, we will read any _own_, get/set accessors. This helps in dealing
    // with libraries that trap values, like mobx or vue
    // unlike object.assign, non-enumerables will be copied as well
    if (desc.get || desc.set) descriptors[key] = {
      configurable: true,
      writable: true,
      enumerable: desc.enumerable,
      value: base[key]
    };
  }
  return Object.create(Object.getPrototypeOf(base), descriptors);
}
function freeze(obj, deep) {
  if (deep === void 0) {
    deep = false;
  }
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
  if (getArchtype(obj) > 1 /* Map or Set */) {
    obj.set = obj.add = obj.clear = obj["delete"] = dontMutateFrozenCollections;
  }
  Object.freeze(obj);
  if (deep) each(obj, function (_key, value) {
    return freeze(value, true);
  });
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}

/** Plugin utilities */
var plugins = {};
function getPlugin(pluginKey) {
  var plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  // @ts-ignore
  return plugin;
}
function loadPlugin(pluginKey, implementation) {
  if (!plugins[pluginKey]) plugins[pluginKey] = implementation;
}

var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_: parent_,
    immer_: immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches"); // assert we have the plugin
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  // @ts-ignore
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer) {
  return currentScope = createScope(currentScope, immer);
}
function revokeDraft(draft) {
  var state = draft[DRAFT_STATE];
  if (state.type_ === 0 /* Object */ || state.type_ === 1 /* Array */) state.revoke_();else state.revoked_ = true;
}

function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  var baseDraft = scope.drafts_[0];
  var isReplaced = result !== undefined && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      // Finalize the result in case it contains (or is) a subset of the draft.
      result = finalize(scope, result);
      if (!scope.parent_) maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope.patches_, scope.inversePatches_);
    }
  } else {
    // Finalize the base draft.
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : undefined;
}
function finalize(rootScope, value, path) {
  // Don't recurse in tho recursive data structures
  if (isFrozen(value)) return value;
  var state = value[DRAFT_STATE];
  // A plain object, might need freezing, might contain drafts
  if (!state) {
    each(value, function (key, childValue) {
      return finalizeProperty(rootScope, state, value, key, childValue, path);
    });

    return value;
  }
  // Never finalize drafts owned by another scope.
  if (state.scope_ !== rootScope) return value;
  // Unmodified draft, return the (frozen) original
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  // Not finalized yet, let's do that now
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    var result = state.copy_;
    // Finalize all children of the copy
    // For sets we clone before iterating, otherwise we can get in endless loop due to modifying during iteration, see #628
    // To preserve insertion order in all cases we then clear the set
    // And we let finalizeProperty know it needs to re-add non-draft children back to the target
    var resultEach = result;
    var isSet = false;
    if (state.type_ === 3 /* Set */) {
      resultEach = new Set(result);
      result.clear();
      isSet = true;
    }
    each(resultEach, function (key, childValue) {
      return finalizeProperty(rootScope, state, result, key, childValue, path, isSet);
    });
    // everything inside is frozen, we can freeze here
    maybeFreeze(rootScope, result, false);
    // first time finalizing, let's create those patches
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(state, path, rootScope.patches_, rootScope.inversePatches_);
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (process.env.NODE_ENV !== "production" && childValue === targetObject) die(5);
  if (isDraft(childValue)) {
    var path = rootPath && parentState && parentState.type_ !== 3 /* Set */ &&
    // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) // Skip deep patches for assigned keys.
    ? rootPath.concat(prop) : undefined;
    // Drafts owned by `scope` are finalized here.
    var res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    // Drafts from another scope must prevented to be frozen
    // if we got a draft back from finalize, we're in a nested produce and shouldn't freeze
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  // Search new objects for unfinalized drafts. Frozen objects should never contain drafts.
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      // optimization: if an object is not a draft, and we don't have to
      // deepfreeze everything, and we are sure that no drafts are left in the remaining object
      // cause we saw and finalized all drafts already; we can stop visiting the rest of the tree.
      // This benefits especially adding large data tree's without further processing.
      // See add-data.js perf test
      return;
    }
    finalize(rootScope, childValue);
    // immer deep freezes plain objects, so if there is no parent state, we freeze as well
    if (!parentState || !parentState.scope_.parent_) maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep) {
  if (deep === void 0) {
    deep = false;
  }
  // we never freeze for a non-root scope; as it would prevent pruning for drafts inside wrapping objects
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}

/**
 * Returns a new draft of the `base` object.
 *
 * The second argument is the parent draft-state (used internally).
 */
function createProxyProxy(base, parent) {
  var isArray = Array.isArray(base);
  var state = {
    type_: isArray ? 1 /* Array */ : 0 /* Object */,

    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  // the traps must target something, a bit like the 'real' base.
  // but also, we need to be able to determine from the target what the relevant state is
  // (to avoid creating traps per instance to capture the state in closure,
  // and to avoid creating weird hidden properties as well)
  // So the trick is to use 'state' as the actual 'target'! (and make sure we intercept everything)
  // Note that in the case of an array, we put the state in an array to have better Reflect defaults ootb
  var target = state;
  var traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  var _Proxy$revocable = Proxy.revocable(target, traps),
    revoke = _Proxy$revocable.revoke,
    proxy = _Proxy$revocable.proxy;
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
/**
 * Object drafts
 */
var objectTraps = {
  get: function get(state, prop) {
    if (prop === DRAFT_STATE) return state;
    var source = latest(state);
    if (!has(source, prop)) {
      // non-existing or non-own property...
      return readPropFromProto(state, source, prop);
    }
    var value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    // Check for existing draft in modified state.
    // Assigned values are never drafted. This catches any drafts we created, too.
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has: function has(state, prop) {
    return prop in latest(state);
  },
  ownKeys: function ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set: function set(state, prop /* strictly not, but helps TS */, value) {
    var desc = getDescriptorFromProto(latest(state), prop);
    if (desc != null && desc.set) {
      // special case: if this write is captured by a setter, we have
      // to trigger it with the correct context
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      // the last check is because we need to be able to distinguish setting a non-existing to undefined (which is a change)
      // from setting an existing property with value undefined to undefined (which is not a change)
      var current = peek(latest(state), prop);
      // special case, if we assigning the original value to a draft, we can ignore the assignment
      var currentState = current == null ? void 0 : current[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is(value, current) && (value !== undefined || has(state.base_, prop))) return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && (
    // special case: handle new props with value 'undefined'
    value !== undefined || prop in state.copy_) ||
    // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop])) return true;
    // @ts-ignore
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty: function deleteProperty(state, prop) {
    // The `undefined` check is a fast path for pre-existing keys.
    if (peek(state.base_, prop) !== undefined || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      // if an originally not assigned property was deleted
      delete state.assigned_[prop];
    }
    delete state.copy_[prop];
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(state, prop) {
    var owner = latest(state);
    var desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc) return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 /* Array */ || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty: function defineProperty() {
    die(11);
  },
  getPrototypeOf: function getPrototypeOf(state) {
    return Object.getPrototypeOf(state.base_);
  },
  setPrototypeOf: function setPrototypeOf() {
    die(12);
  }
};
/**
 * Array drafts
 */
var arrayTraps = {};
each(objectTraps, function (key, fn) {
  // @ts-ignore
  arrayTraps[key] = function () {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function (state, prop) {
  if (process.env.NODE_ENV !== "production" && isNaN(parseInt(prop))) die(13);
  // @ts-ignore
  return arrayTraps.set.call(this, state, prop, undefined);
};
arrayTraps.set = function (state, prop, value) {
  if (process.env.NODE_ENV !== "production" && prop !== "length" && isNaN(parseInt(prop))) die(14);
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
// Access a property without creating an Immer draft.
function peek(draft, prop) {
  var state = draft[DRAFT_STATE];
  var source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  var _desc$get;
  var desc = getDescriptorFromProto(source, prop);
  return desc ? "value" in desc ? desc.value : // This is a very special case, if the prop is a getter defined by the
  // prototype, we should invoke it with the draft as context!
  (_desc$get = desc.get) == null ? void 0 : _desc$get.call(state.draft_) : undefined;
}
function getDescriptorFromProto(source, prop) {
  // 'in' checks proto!
  if (!(prop in source)) return undefined;
  var proto = Object.getPrototypeOf(source);
  while (proto) {
    var desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc) return desc;
    proto = Object.getPrototypeOf(proto);
  }
  return undefined;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
  }
}

var Immer = /*#__PURE__*/function () {
  function Immer(config) {
    var _this = this;
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    this.produce = function (base, recipe, patchListener) {
      // curried invocation
      if (typeof base === "function" && typeof recipe !== "function") {
        var defaultBase = recipe;
        recipe = base;
        var self = _this;
        return function curriedProduce(base) {
          var _this2 = this;
          if (base === void 0) {
            base = defaultBase;
          }
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return self.produce(base, function (draft) {
            var _recipe;
            return (_recipe = recipe).call.apply(_recipe, [_this2, draft].concat(args));
          }); // prettier-ignore
        };
      }

      if (typeof recipe !== "function") die(6);
      if (patchListener !== undefined && typeof patchListener !== "function") die(7);
      var result;
      // Only plain objects, arrays, and "immerable classes" are drafted.
      if (isDraftable(base)) {
        var scope = enterScope(_this);
        var proxy = createProxy(base, undefined);
        var hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          // finally instead of catch + rethrow better preserves original stack
          if (hasError) revokeScope(scope);else leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === undefined) result = base;
        if (result === NOTHING) result = undefined;
        if (_this.autoFreeze_) freeze(result, true);
        if (patchListener) {
          var p = [];
          var ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
          patchListener(p, ip);
        }
        return result;
      } else die(1, base);
    };
    this.produceWithPatches = function (base, recipe) {
      // curried invocation
      if (typeof base === "function") {
        return function (state) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          return _this.produceWithPatches(state, function (draft) {
            return base.apply(void 0, [draft].concat(args));
          });
        };
      }
      var patches, inversePatches;
      var result = _this.produce(base, recipe, function (p, ip) {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof (config == null ? void 0 : config.autoFreeze) === "boolean") this.setAutoFreeze(config.autoFreeze);
    if (typeof (config == null ? void 0 : config.useStrictShallowCopy) === "boolean") this.setUseStrictShallowCopy(config.useStrictShallowCopy);
  }
  var _proto = Immer.prototype;
  _proto.createDraft = function createDraft(base) {
    if (!isDraftable(base)) die(8);
    if (isDraft(base)) base = current(base);
    var scope = enterScope(this);
    var proxy = createProxy(base, undefined);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  };
  _proto.finishDraft = function finishDraft(draft, patchListener) {
    var state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_) die(9);
    var scope = state.scope_;
    usePatchesInScope(scope, patchListener);
    return processResult(undefined, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */;
  _proto.setAutoFreeze = function setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */;
  _proto.setUseStrictShallowCopy = function setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  };
  _proto.applyPatches = function applyPatches(base, patches) {
    // If a patch replaces the entire state, take that replacement as base
    // before applying patches
    var i;
    for (i = patches.length - 1; i >= 0; i--) {
      var patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    // If there was a patch that replaced the entire state, start from the
    // patch after that.
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    var applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      // N.B: never hits if some patch a replacement, patches are never drafts
      return applyPatchesImpl(base, patches);
    }
    // Otherwise, produce a copy of the base state.
    return this.produce(base, function (draft) {
      return applyPatchesImpl(draft, patches);
    });
  };
  return Immer;
}();
function createProxy(value, parent) {
  // precondition: createProxy should be guarded by isDraftable, so we know we can safely draft
  var draft = isMap(value) ? proxyMap(value, parent) : isSet(value) ? proxySet(value, parent) : createProxyProxy(value, parent);
  var scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}

function current(value) {
  if (!isDraft(value)) die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value)) return value;
  var state = value[DRAFT_STATE];
  var copy;
  if (state) {
    if (!state.modified_) return state.base_;
    // Optimization: avoid generating new drafts during copying
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy = shallowCopy(value, true);
  }
  // recurse
  each(copy, function (key, childValue) {
    set(copy, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

var DraftMap = /*#__PURE__*/function (_Map, _Symbol$iterator) {
  _inheritsLoose(DraftMap, _Map);
  function DraftMap(target, parent) {
    var _this;
    _this = _Map.call(this) || this;
    _this[DRAFT_STATE] = {
      type_: 2 /* Map */,
      parent_: parent,
      scope_: parent ? parent.scope_ : getCurrentScope(),
      modified_: false,
      finalized_: false,
      copy_: undefined,
      assigned_: undefined,
      base_: target,
      draft_: _assertThisInitialized(_this),
      isManual_: false,
      revoked_: false
    };
    return _this;
  }
  var _proto = DraftMap.prototype;
  _proto.has = function has(key) {
    return latest(this[DRAFT_STATE]).has(key);
  };
  _proto.set = function set(key, value) {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    if (!latest(state).has(key) || latest(state).get(key) !== value) {
      prepareMapCopy(state);
      markChanged(state);
      state.assigned_.set(key, true);
      state.copy_.set(key, value);
      state.assigned_.set(key, true);
    }
    return this;
  };
  _proto["delete"] = function _delete(key) {
    if (!this.has(key)) {
      return false;
    }
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    prepareMapCopy(state);
    markChanged(state);
    if (state.base_.has(key)) {
      state.assigned_.set(key, false);
    } else {
      state.assigned_["delete"](key);
    }
    state.copy_["delete"](key);
    return true;
  };
  _proto.clear = function clear() {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    if (latest(state).size) {
      prepareMapCopy(state);
      markChanged(state);
      state.assigned_ = new Map();
      each(state.base_, function (key) {
        state.assigned_.set(key, false);
      });
      state.copy_.clear();
    }
  };
  _proto.forEach = function forEach(cb, thisArg) {
    var _this2 = this;
    var state = this[DRAFT_STATE];
    latest(state).forEach(function (_value, key, _map) {
      cb.call(thisArg, _this2.get(key), key, _this2);
    });
  };
  _proto.get = function get(key) {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    var value = latest(state).get(key);
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value !== state.base_.get(key)) {
      return value; // either already drafted or reassigned
    }
    // despite what it looks, this creates a draft only once, see above condition
    var draft = createProxy(value, state);
    prepareMapCopy(state);
    state.copy_.set(key, draft);
    return draft;
  };
  _proto.keys = function keys() {
    return latest(this[DRAFT_STATE]).keys();
  };
  _proto.values = function values() {
    var _this3 = this,
      _ref;
    var iterator = this.keys();
    return _ref = {}, _ref[Symbol.iterator] = function () {
      return _this3.values();
    }, _ref.next = function next() {
      var r = iterator.next();
      /* istanbul ignore next */
      if (r.done) return r;
      var value = _this3.get(r.value);
      return {
        done: false,
        value: value
      };
    }, _ref;
  };
  _proto.entries = function entries() {
    var _this4 = this,
      _ref2;
    var iterator = this.keys();
    return _ref2 = {}, _ref2[Symbol.iterator] = function () {
      return _this4.entries();
    }, _ref2.next = function next() {
      var r = iterator.next();
      /* istanbul ignore next */
      if (r.done) return r;
      var value = _this4.get(r.value);
      return {
        done: false,
        value: [r.value, value]
      };
    }, _ref2;
  };
  _proto[_Symbol$iterator] = function () {
    return this.entries();
  };
  _createClass(DraftMap, [{
    key: "size",
    get: function get() {
      return latest(this[DRAFT_STATE]).size;
    }
  }]);
  return DraftMap;
}( /*#__PURE__*/_wrapNativeSuper(Map), Symbol.iterator);
function proxyMap(target, parent) {
  // @ts-ignore
  return new DraftMap(target, parent);
}
function prepareMapCopy(state) {
  if (!state.copy_) {
    state.assigned_ = new Map();
    state.copy_ = new Map(state.base_);
  }
}
var DraftSet = /*#__PURE__*/function (_Set, _Symbol$iterator2) {
  _inheritsLoose(DraftSet, _Set);
  function DraftSet(target, parent) {
    var _this5;
    _this5 = _Set.call(this) || this;
    _this5[DRAFT_STATE] = {
      type_: 3 /* Set */,
      parent_: parent,
      scope_: parent ? parent.scope_ : getCurrentScope(),
      modified_: false,
      finalized_: false,
      copy_: undefined,
      base_: target,
      draft_: _assertThisInitialized(_this5),
      drafts_: new Map(),
      revoked_: false,
      isManual_: false
    };
    return _this5;
  }
  var _proto2 = DraftSet.prototype;
  _proto2.has = function has(value) {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    // bit of trickery here, to be able to recognize both the value, and the draft of its value
    if (!state.copy_) {
      return state.base_.has(value);
    }
    if (state.copy_.has(value)) return true;
    if (state.drafts_.has(value) && state.copy_.has(state.drafts_.get(value))) return true;
    return false;
  };
  _proto2.add = function add(value) {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    if (!this.has(value)) {
      prepareSetCopy(state);
      markChanged(state);
      state.copy_.add(value);
    }
    return this;
  };
  _proto2["delete"] = function _delete(value) {
    if (!this.has(value)) {
      return false;
    }
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    prepareSetCopy(state);
    markChanged(state);
    return state.copy_["delete"](value) || (state.drafts_.has(value) ? state.copy_["delete"](state.drafts_.get(value)) : /* istanbul ignore next */false);
  };
  _proto2.clear = function clear() {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    if (latest(state).size) {
      prepareSetCopy(state);
      markChanged(state);
      state.copy_.clear();
    }
  };
  _proto2.values = function values() {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    prepareSetCopy(state);
    return state.copy_.values();
  };
  _proto2.entries = function entries() {
    var state = this[DRAFT_STATE];
    assertUnrevoked(state);
    prepareSetCopy(state);
    return state.copy_.entries();
  };
  _proto2.keys = function keys() {
    return this.values();
  };
  _proto2[_Symbol$iterator2] = function () {
    return this.values();
  };
  _proto2.forEach = function forEach(cb, thisArg) {
    var iterator = this.values();
    var result = iterator.next();
    while (!result.done) {
      cb.call(thisArg, result.value, result.value, this);
      result = iterator.next();
    }
  };
  _createClass(DraftSet, [{
    key: "size",
    get: function get() {
      return latest(this[DRAFT_STATE]).size;
    }
  }]);
  return DraftSet;
}( /*#__PURE__*/_wrapNativeSuper(Set), Symbol.iterator);
function proxySet(target, parent) {
  // @ts-ignore
  return new DraftSet(target, parent);
}
function prepareSetCopy(state) {
  if (!state.copy_) {
    // create drafts for all entries to preserve insertion order
    state.copy_ = new Set();
    state.base_.forEach(function (value) {
      if (isDraftable(value)) {
        var draft = createProxy(value, state);
        state.drafts_.set(value, draft);
        state.copy_.add(draft);
      } else {
        state.copy_.add(value);
      }
    });
  }
}
function assertUnrevoked(state /*ES5State | MapState | SetState*/) {
  if (state.revoked_) die(3, JSON.stringify(latest(state)));
}

function enablePatches() {
  var errorOffset = 16;
  if (process.env.NODE_ENV !== "production") {
    errors.push('Sets cannot have "replace" patches.', function (op) {
      return "Unsupported patch operation: " + op;
    }, function (path) {
      return "Cannot apply patch, path doesn't resolve: " + path;
    }, "Patching reserved attributes like __proto__, prototype and constructor is not allowed");
  }
  var REPLACE = "replace";
  var ADD = "add";
  var REMOVE = "remove";
  function generatePatches_(state, basePath, patches, inversePatches) {
    switch (state.type_) {
      case 0 /* Object */:
      case 2 /* Map */:
        return generatePatchesFromAssigned(state, basePath, patches, inversePatches);
      case 1 /* Array */:
        return generateArrayPatches(state, basePath, patches, inversePatches);
      case 3 /* Set */:
        return generateSetPatches(state, basePath, patches, inversePatches);
    }
  }
  function generateArrayPatches(state, basePath, patches, inversePatches) {
    var base_ = state.base_,
      assigned_ = state.assigned_;
    var copy_ = state.copy_;
    // Reduce complexity by ensuring `base` is never longer.
    if (copy_.length < base_.length) {
      var _ref = [copy_, base_];
      base_ = _ref[0];
      copy_ = _ref[1];
      var _ref2 = [inversePatches, patches];
      patches = _ref2[0];
      inversePatches = _ref2[1];
    }
    // Process replaced indices.
    for (var i = 0; i < base_.length; i++) {
      if (assigned_[i] && copy_[i] !== base_[i]) {
        var path = basePath.concat([i]);
        patches.push({
          op: REPLACE,
          path: path,
          // Need to maybe clone it, as it can in fact be the original value
          // due to the base/copy inversion at the start of this function
          value: clonePatchValueIfNeeded(copy_[i])
        });
        inversePatches.push({
          op: REPLACE,
          path: path,
          value: clonePatchValueIfNeeded(base_[i])
        });
      }
    }
    // Process added indices.
    for (var _i = base_.length; _i < copy_.length; _i++) {
      var _path = basePath.concat([_i]);
      patches.push({
        op: ADD,
        path: _path,
        // Need to maybe clone it, as it can in fact be the original value
        // due to the base/copy inversion at the start of this function
        value: clonePatchValueIfNeeded(copy_[_i])
      });
    }
    for (var _i2 = copy_.length - 1; base_.length <= _i2; --_i2) {
      var _path2 = basePath.concat([_i2]);
      inversePatches.push({
        op: REMOVE,
        path: _path2
      });
    }
  }
  // This is used for both Map objects and normal objects.
  function generatePatchesFromAssigned(state, basePath, patches, inversePatches) {
    var base_ = state.base_,
      copy_ = state.copy_;
    each(state.assigned_, function (key, assignedValue) {
      var origValue = get(base_, key);
      var value = get(copy_, key);
      var op = !assignedValue ? REMOVE : has(base_, key) ? REPLACE : ADD;
      if (origValue === value && op === REPLACE) return;
      var path = basePath.concat(key);
      patches.push(op === REMOVE ? {
        op: op,
        path: path
      } : {
        op: op,
        path: path,
        value: value
      });
      inversePatches.push(op === ADD ? {
        op: REMOVE,
        path: path
      } : op === REMOVE ? {
        op: ADD,
        path: path,
        value: clonePatchValueIfNeeded(origValue)
      } : {
        op: REPLACE,
        path: path,
        value: clonePatchValueIfNeeded(origValue)
      });
    });
  }
  function generateSetPatches(state, basePath, patches, inversePatches) {
    var base_ = state.base_,
      copy_ = state.copy_;
    var i = 0;
    base_.forEach(function (value) {
      if (!copy_.has(value)) {
        var path = basePath.concat([i]);
        patches.push({
          op: REMOVE,
          path: path,
          value: value
        });
        inversePatches.unshift({
          op: ADD,
          path: path,
          value: value
        });
      }
      i++;
    });
    i = 0;
    copy_.forEach(function (value) {
      if (!base_.has(value)) {
        var path = basePath.concat([i]);
        patches.push({
          op: ADD,
          path: path,
          value: value
        });
        inversePatches.unshift({
          op: REMOVE,
          path: path,
          value: value
        });
      }
      i++;
    });
  }
  function generateReplacementPatches_(baseValue, replacement, patches, inversePatches) {
    patches.push({
      op: REPLACE,
      path: [],
      value: replacement === NOTHING ? undefined : replacement
    });
    inversePatches.push({
      op: REPLACE,
      path: [],
      value: baseValue
    });
  }
  function applyPatches_(draft, patches) {
    patches.forEach(function (patch) {
      var path = patch.path,
        op = patch.op;
      var base = draft;
      for (var i = 0; i < path.length - 1; i++) {
        var parentType = getArchtype(base);
        var p = path[i];
        if (typeof p !== "string" && typeof p !== "number") {
          p = "" + p;
        }
        // See #738, avoid prototype pollution
        if ((parentType === 0 /* Object */ || parentType === 1 /* Array */) && (p === "__proto__" || p === "constructor")) die(errorOffset + 3);
        if (typeof base === "function" && p === "prototype") die(errorOffset + 3);
        base = get(base, p);
        if (typeof base !== "object") die(errorOffset + 2, path.join("/"));
      }
      var type = getArchtype(base);
      var value = deepClonePatchValue(patch.value); // used to clone patch to ensure original patch is not modified, see #411
      var key = path[path.length - 1];
      switch (op) {
        case REPLACE:
          switch (type) {
            case 2 /* Map */:
              return base.set(key, value);
            /* istanbul ignore next */
            case 3 /* Set */:
              die(errorOffset);
            default:
              // if value is an object, then it's assigned by reference
              // in the following add or remove ops, the value field inside the patch will also be modifyed
              // so we use value from the cloned patch
              // @ts-ignore
              return base[key] = value;
          }
        case ADD:
          switch (type) {
            case 1 /* Array */:
              return key === "-" ? base.push(value) : base.splice(key, 0, value);
            case 2 /* Map */:
              return base.set(key, value);
            case 3 /* Set */:
              return base.add(value);
            default:
              return base[key] = value;
          }
        case REMOVE:
          switch (type) {
            case 1 /* Array */:
              return base.splice(key, 1);
            case 2 /* Map */:
              return base["delete"](key);
            case 3 /* Set */:
              return base["delete"](patch.value);
            default:
              return delete base[key];
          }
        default:
          die(errorOffset + 1, op);
      }
    });
    return draft;
  }
  function deepClonePatchValue(obj) {
    if (!isDraftable(obj)) return obj;
    if (Array.isArray(obj)) return obj.map(deepClonePatchValue);
    if (isMap(obj)) return new Map(Array.from(obj.entries()).map(function (_ref3) {
      var k = _ref3[0],
        v = _ref3[1];
      return [k, deepClonePatchValue(v)];
    }));
    if (isSet(obj)) return new Set(Array.from(obj).map(deepClonePatchValue));
    var cloned = Object.create(Object.getPrototypeOf(obj));
    for (var key in obj) cloned[key] = deepClonePatchValue(obj[key]);
    if (has(obj, DRAFTABLE)) cloned[DRAFTABLE] = obj[DRAFTABLE];
    return cloned;
  }
  function clonePatchValueIfNeeded(obj) {
    if (isDraft(obj)) {
      return deepClonePatchValue(obj);
    } else return obj;
  }
  loadPlugin("Patches", {
    applyPatches_: applyPatches_,
    generatePatches_: generatePatches_,
    generateReplacementPatches_: generateReplacementPatches_
  });
}

var immer = /*#__PURE__*/new Immer();
/**
 * The `produce` function takes a value and a "recipe function" (whose
 * return value often depends on the base state). The recipe function is
 * free to mutate its first argument however it wants. All mutations are
 * only ever applied to a __copy__ of the base state.
 *
 * Pass only a function to create a "curried producer" which relieves you
 * from passing the recipe function every time.
 *
 * Only plain objects and arrays are made mutable. All other objects are
 * considered uncopyable.
 *
 * Note: This function is __bound__ to its `Immer` instance.
 *
 * @param {any} base - the initial state
 * @param {Function} producer - function that receives a proxy of the base state as first argument and which can be freely modified
 * @param {Function} patchListener - optional function that will be called with all the patches produced here
 * @returns {any} a new state, or the initial state if nothing was modified
 */
var produce = immer.produce;
/**
 * Like `produce`, but `produceWithPatches` always returns a tuple
 * [nextState, patches, inversePatches] (instead of just the next state)
 */
var produceWithPatches = /*#__PURE__*/immer.produceWithPatches.bind(immer);
/**
 * Pass true to automatically freeze all copies created by Immer.
 *
 * Always freeze by default, even in production mode
 */
var setAutoFreeze = /*#__PURE__*/immer.setAutoFreeze.bind(immer);
/**
 * Pass true to enable strict shallow copy.
 *
 * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
 */
var setUseStrictShallowCopy = /*#__PURE__*/immer.setUseStrictShallowCopy.bind(immer);
/**
 * Apply an array of Immer patches to the first argument.
 *
 * This function is a producer, which means copy-on-write is in effect.
 */
var applyPatches = /*#__PURE__*/immer.applyPatches.bind(immer);
/**
 * Create an Immer draft from the given base state, which may be a draft itself.
 * The draft can be modified until you finalize it with the `finishDraft` function.
 */
var createDraft = /*#__PURE__*/immer.createDraft.bind(immer);
/**
 * Finalize an Immer draft from a `createDraft` call, returning the base state
 * (if no changes were made) or a modified copy. The draft must *not* be
 * mutated afterwards.
 *
 * Pass a function as the 2nd argument to generate Immer patches based on the
 * changes that were made.
 */
var finishDraft = /*#__PURE__*/immer.finishDraft.bind(immer);
/**
 * This function is actually a no-op, but can be used to cast an immutable type
 * to an draft type and make TypeScript happy
 *
 * @param value
 */
function castDraft(value) {
  return value;
}
/**
 * This function is actually a no-op, but can be used to cast a mutable type
 * to an immutable type and make TypeScript happy
 * @param value
 */
function castImmutable(value) {
  return value;
}

export { Immer, applyPatches, castDraft, castImmutable, createDraft, current, enablePatches, finishDraft, freeze, DRAFTABLE as immerable, isDraft, isDraftable, NOTHING as nothing, original, produce, produceWithPatches, setAutoFreeze, setUseStrictShallowCopy };
//# sourceMappingURL=immer.esm.js.map
