var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isDate = (val) => val instanceof Date;
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const cacheStringFunction = (fn) => {
  const cache = Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let activeEffectScope;
function recordEffectScope(effect2, scope) {
  scope = scope || activeEffectScope;
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect2) => {
  const { deps } = effect2;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect2);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
const effectStack = [];
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    if (!effectStack.includes(this)) {
      try {
        effectStack.push(activeEffect = this);
        enableTracking();
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        resetTracking();
        effectStack.pop();
        const n = effectStack.length;
        activeEffect = n > 0 ? effectStack[n - 1] : void 0;
      }
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
function effect$1(fn, options) {
  if (fn.effect) {
    fn = fn.effect.fn;
  }
  const _effect = new ReactiveEffect(fn);
  if (options) {
    extend(_effect, options);
    if (options.scope)
      recordEffectScope(_effect, options.scope);
  }
  if (!options || !options.lazy) {
    _effect.run();
  }
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!isTracking()) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = createDep());
  }
  trackEffects(dep);
}
function isTracking() {
  return shouldTrack && activeEffect !== void 0;
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$1(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect2 of isArray(dep) ? dep : [...dep]) {
    if (effect2 !== activeEffect || effect2.allowRecurse) {
      if (effect2.scheduler) {
        effect2.scheduler();
      } else {
        effect2.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set = /* @__PURE__ */ createSetter();
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow && !isReadonly(value)) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger$1(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger$1(target, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger$1(target, "delete", key, void 0);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    return true;
  },
  deleteProperty(target, key) {
    return true;
  }
};
const reactiveMap = new WeakMap();
const shallowReactiveMap = new WeakMap();
const readonlyMap = new WeakMap();
const shallowReadonlyMap = new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (target && target["__v_isReadonly"]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, null, reactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, null, readonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
Promise.resolve();
let queued = false;
const queue = [];
const p = Promise.resolve();
const nextTick = (fn) => p.then(fn);
const queueJob = (job) => {
  if (!queue.includes(job))
    queue.push(job);
  if (!queued) {
    queued = true;
    nextTick(flushJobs);
  }
};
const flushJobs = () => {
  for (const job of queue) {
    job();
  }
  queue.length = 0;
  queued = false;
};
const forceAttrRE = /^(spellcheck|draggable|form|list|type)$/;
const bind = ({
  el,
  get: get2,
  effect: effect2,
  arg,
  modifiers
}) => {
  let prevValue;
  if (arg === "class") {
    el._class = el.className;
  }
  effect2(() => {
    let value = get2();
    if (arg) {
      if (modifiers == null ? void 0 : modifiers.camel) {
        arg = camelize(arg);
      }
      setProp(el, arg, value, prevValue);
    } else {
      for (const key in value) {
        setProp(el, key, value[key], prevValue && prevValue[key]);
      }
      for (const key in prevValue) {
        if (!value || !(key in value)) {
          setProp(el, key, null);
        }
      }
    }
    prevValue = value;
  });
};
const setProp = (el, key, value, prevValue) => {
  if (key === "class") {
    el.setAttribute("class", normalizeClass(el._class ? [el._class, value] : value) || "");
  } else if (key === "style") {
    value = normalizeStyle(value);
    const { style } = el;
    if (!value) {
      el.removeAttribute("style");
    } else if (isString(value)) {
      if (value !== prevValue)
        style.cssText = value;
    } else {
      for (const key2 in value) {
        setStyle(style, key2, value[key2]);
      }
      if (prevValue && !isString(prevValue)) {
        for (const key2 in prevValue) {
          if (value[key2] == null) {
            setStyle(style, key2, "");
          }
        }
      }
    }
  } else if (!(el instanceof SVGElement) && key in el && !forceAttrRE.test(key)) {
    el[key] = value;
    if (key === "value") {
      el._value = value;
    }
  } else {
    if (key === "true-value") {
      el._trueValue = value;
    } else if (key === "false-value") {
      el._falseValue = value;
    } else if (value != null) {
      el.setAttribute(key, value);
    } else {
      el.removeAttribute(key);
    }
  }
};
const importantRE = /\s*!important$/;
const setStyle = (style, name, val) => {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      if (importantRE.test(val)) {
        style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
      } else {
        style[name] = val;
      }
    }
  }
};
const checkAttr = (el, name) => {
  const val = el.getAttribute(name);
  if (val != null)
    el.removeAttribute(name);
  return val;
};
const listen = (el, event, handler, options) => {
  el.addEventListener(event, handler, options);
};
const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers[m])
};
const on = ({ el, get: get2, exp, arg, modifiers }) => {
  if (!arg) {
    return;
  }
  let handler = simplePathRE.test(exp) ? get2(`(e => ${exp}(e))`) : get2(`($event => { ${exp} })`);
  if (arg === "vue:mounted") {
    nextTick(handler);
    return;
  } else if (arg === "vue:unmounted") {
    return () => handler();
  }
  if (modifiers) {
    if (arg === "click") {
      if (modifiers.right)
        arg = "contextmenu";
      if (modifiers.middle)
        arg = "mouseup";
    }
    const raw = handler;
    handler = (e) => {
      if ("key" in e && !(hyphenate(e.key) in modifiers)) {
        return;
      }
      for (const key in modifiers) {
        const guard = modifierGuards[key];
        if (guard && guard(e, modifiers)) {
          return;
        }
      }
      return raw(e);
    };
  }
  listen(el, arg, handler, modifiers);
};
const show = ({ el, get: get2, effect: effect2 }) => {
  const initialDisplay = el.style.display;
  effect2(() => {
    el.style.display = get2() ? initialDisplay : "none";
  });
};
const text = ({ el, get: get2, effect: effect2 }) => {
  effect2(() => {
    el.textContent = toDisplayString(get2());
  });
};
const toDisplayString = (value) => value == null ? "" : isObject(value) ? JSON.stringify(value, null, 2) : String(value);
const html = ({ el, get: get2, effect: effect2 }) => {
  effect2(() => {
    el.innerHTML = get2();
  });
};
const model = ({ el, exp, get: get2, effect: effect2, modifiers }) => {
  const type = el.type;
  const assign = get2(`(val) => { ${exp} = val }`);
  const { trim, number = type === "number" } = modifiers || {};
  if (el.tagName === "SELECT") {
    const sel = el;
    listen(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(sel.options, (o) => o.selected).map((o) => number ? toNumber(getValue(o)) : getValue(o));
      assign(sel.multiple ? selectedVal : selectedVal[0]);
    });
    effect2(() => {
      const value = get2();
      const isMultiple = sel.multiple;
      for (let i = 0, l = sel.options.length; i < l; i++) {
        const option = sel.options[i];
        const optionValue = getValue(option);
        if (isMultiple) {
          if (isArray(value)) {
            option.selected = looseIndexOf(value, optionValue) > -1;
          } else {
            option.selected = value.has(optionValue);
          }
        } else {
          if (looseEqual(getValue(option), value)) {
            if (sel.selectedIndex !== i)
              sel.selectedIndex = i;
            return;
          }
        }
      }
      if (!isMultiple && sel.selectedIndex !== -1) {
        sel.selectedIndex = -1;
      }
    });
  } else if (type === "checkbox") {
    listen(el, "change", () => {
      const modelValue = get2();
      const checked = el.checked;
      if (isArray(modelValue)) {
        const elementValue = getValue(el);
        const index = looseIndexOf(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
    let oldValue;
    effect2(() => {
      const value = get2();
      if (isArray(value)) {
        el.checked = looseIndexOf(value, getValue(el)) > -1;
      } else if (value !== oldValue) {
        el.checked = looseEqual(value, getCheckboxValue(el, true));
      }
      oldValue = value;
    });
  } else if (type === "radio") {
    listen(el, "change", () => {
      assign(getValue(el));
    });
    let oldValue;
    effect2(() => {
      const value = get2();
      if (value !== oldValue) {
        el.checked = looseEqual(value, getValue(el));
      }
    });
  } else {
    const resolveValue = (val) => {
      if (trim)
        return val.trim();
      if (number)
        return toNumber(val);
      return val;
    };
    listen(el, "compositionstart", onCompositionStart);
    listen(el, "compositionend", onCompositionEnd);
    listen(el, (modifiers == null ? void 0 : modifiers.lazy) ? "change" : "input", () => {
      if (el.composing)
        return;
      assign(resolveValue(el.value));
    });
    if (trim) {
      listen(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    effect2(() => {
      if (el.composing) {
        return;
      }
      const curVal = el.value;
      const newVal = get2();
      if (document.activeElement === el && resolveValue(curVal) === newVal) {
        return;
      }
      if (curVal !== newVal) {
        el.value = newVal;
      }
    });
  }
};
const getValue = (el) => "_value" in el ? el._value : el.value;
const getCheckboxValue = (el, checked) => {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
};
const onCompositionStart = (e) => {
  e.target.composing = true;
};
const onCompositionEnd = (e) => {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    trigger(target, "input");
  }
};
const trigger = (el, type) => {
  const e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
};
const evalCache = Object.create(null);
const evaluate = (scope, exp, el) => execute(scope, `return(${exp})`, el);
const execute = (scope, exp, el) => {
  const fn = evalCache[exp] || (evalCache[exp] = toFunction(exp));
  try {
    return fn(scope, el);
  } catch (e) {
    console.error(e);
  }
};
const toFunction = (exp) => {
  try {
    return new Function(`$data`, `$el`, `with($data){${exp}}`);
  } catch (e) {
    console.error(`${e.message} in expression: ${exp}`);
    return () => {
    };
  }
};
const effect = ({ el, ctx, exp, effect: effect2 }) => {
  nextTick(() => effect2(() => execute(ctx.scope, exp, el)));
};
const builtInDirectives = {
  bind,
  on,
  show,
  text,
  html,
  model,
  effect
};
const _if = (el, exp, ctx) => {
  const parent = el.parentElement;
  const anchor = new Comment("v-if");
  parent.insertBefore(anchor, el);
  const branches = [
    {
      exp,
      el
    }
  ];
  let elseEl;
  let elseExp;
  while (elseEl = el.nextElementSibling) {
    elseExp = null;
    if (checkAttr(elseEl, "v-else") === "" || (elseExp = checkAttr(elseEl, "v-else-if"))) {
      parent.removeChild(elseEl);
      branches.push({ exp: elseExp, el: elseEl });
    } else {
      break;
    }
  }
  const nextNode = el.nextSibling;
  parent.removeChild(el);
  let block;
  let activeBranchIndex = -1;
  const removeActiveBlock = () => {
    if (block) {
      parent.insertBefore(anchor, block.el);
      block.remove();
      block = void 0;
    }
  };
  ctx.effect(() => {
    for (let i = 0; i < branches.length; i++) {
      const { exp: exp2, el: el2 } = branches[i];
      if (!exp2 || evaluate(ctx.scope, exp2)) {
        if (i !== activeBranchIndex) {
          removeActiveBlock();
          block = new Block(el2, ctx);
          block.insert(parent, anchor);
          parent.removeChild(anchor);
          activeBranchIndex = i;
        }
        return;
      }
    }
    activeBranchIndex = -1;
    removeActiveBlock();
  });
  return nextNode;
};
const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
const stripParensRE = /^\(|\)$/g;
const destructureRE = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/;
const _for = (el, exp, ctx) => {
  const inMatch = exp.match(forAliasRE);
  if (!inMatch) {
    return;
  }
  const nextNode = el.nextSibling;
  const parent = el.parentElement;
  const anchor = new Text("");
  parent.insertBefore(anchor, el);
  parent.removeChild(el);
  const sourceExp = inMatch[2].trim();
  let valueExp = inMatch[1].trim().replace(stripParensRE, "").trim();
  let destructureBindings;
  let isArrayDestructure = false;
  let indexExp;
  let objIndexExp;
  let keyAttr = "key";
  let keyExp = el.getAttribute(keyAttr) || el.getAttribute(keyAttr = ":key") || el.getAttribute(keyAttr = "v-bind:key");
  if (keyExp) {
    el.removeAttribute(keyAttr);
    if (keyAttr === "key")
      keyExp = JSON.stringify(keyExp);
  }
  let match;
  if (match = valueExp.match(forIteratorRE)) {
    valueExp = valueExp.replace(forIteratorRE, "").trim();
    indexExp = match[1].trim();
    if (match[2]) {
      objIndexExp = match[2].trim();
    }
  }
  if (match = valueExp.match(destructureRE)) {
    destructureBindings = match[1].split(",").map((s2) => s2.trim());
    isArrayDestructure = valueExp[0] === "[";
  }
  let mounted = false;
  let blocks;
  let childCtxs;
  let keyToIndexMap;
  const createChildContexts = (source) => {
    const map = new Map();
    const ctxs = [];
    if (isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        ctxs.push(createChildContext(map, source[i], i));
      }
    } else if (typeof source === "number") {
      for (let i = 0; i < source; i++) {
        ctxs.push(createChildContext(map, i + 1, i));
      }
    } else if (isObject(source)) {
      let i = 0;
      for (const key in source) {
        ctxs.push(createChildContext(map, source[key], i++, key));
      }
    }
    return [ctxs, map];
  };
  const createChildContext = (map, value, index, objKey) => {
    const data = {};
    if (destructureBindings) {
      destructureBindings.forEach((b, i) => data[b] = value[isArrayDestructure ? i : b]);
    } else {
      data[valueExp] = value;
    }
    if (objKey) {
      indexExp && (data[indexExp] = objKey);
      objIndexExp && (data[objIndexExp] = index);
    } else {
      indexExp && (data[indexExp] = index);
    }
    const childCtx = createScopedContext(ctx, data);
    const key = keyExp ? evaluate(childCtx.scope, keyExp) : index;
    map.set(key, index);
    childCtx.key = key;
    return childCtx;
  };
  const mountBlock = (ctx2, ref2) => {
    const block = new Block(el, ctx2);
    block.key = ctx2.key;
    block.insert(parent, ref2);
    return block;
  };
  ctx.effect(() => {
    const source = evaluate(ctx.scope, sourceExp);
    const prevKeyToIndexMap = keyToIndexMap;
    [childCtxs, keyToIndexMap] = createChildContexts(source);
    if (!mounted) {
      blocks = childCtxs.map((s2) => mountBlock(s2, anchor));
      mounted = true;
    } else {
      for (let i2 = 0; i2 < blocks.length; i2++) {
        if (!keyToIndexMap.has(blocks[i2].key)) {
          blocks[i2].remove();
        }
      }
      const nextBlocks = [];
      let i = childCtxs.length;
      let nextBlock;
      let prevMovedBlock;
      while (i--) {
        const childCtx = childCtxs[i];
        const oldIndex = prevKeyToIndexMap.get(childCtx.key);
        let block;
        if (oldIndex == null) {
          block = mountBlock(childCtx, nextBlock ? nextBlock.el : anchor);
        } else {
          block = blocks[oldIndex];
          Object.assign(block.ctx.scope, childCtx.scope);
          if (oldIndex !== i) {
            if (blocks[oldIndex + 1] !== nextBlock || prevMovedBlock === nextBlock) {
              prevMovedBlock = block;
              block.insert(parent, nextBlock ? nextBlock.el : anchor);
            }
          }
        }
        nextBlocks.unshift(nextBlock = block);
      }
      blocks = nextBlocks;
    }
  });
  return nextNode;
};
const ref = ({
  el,
  ctx: {
    scope: { $refs }
  },
  get: get2,
  effect: effect2
}) => {
  let prevRef;
  effect2(() => {
    const ref2 = get2();
    $refs[ref2] = el;
    if (prevRef && ref2 !== prevRef) {
      delete $refs[prevRef];
    }
    prevRef = ref2;
  });
  return () => {
    prevRef && delete $refs[prevRef];
  };
};
const dirRE = /^(?:v-|:|@)/;
const modifierRE = /\.([\w-]+)/g;
let inOnce = false;
const walk = (node, ctx) => {
  const type = node.nodeType;
  if (type === 1) {
    const el = node;
    if (el.hasAttribute("v-pre")) {
      return;
    }
    checkAttr(el, "v-cloak");
    let exp;
    if (exp = checkAttr(el, "v-if")) {
      return _if(el, exp, ctx);
    }
    if (exp = checkAttr(el, "v-for")) {
      return _for(el, exp, ctx);
    }
    if ((exp = checkAttr(el, "v-scope")) || exp === "") {
      const scope = exp ? evaluate(ctx.scope, exp) : {};
      ctx = createScopedContext(ctx, scope);
      if (scope.$template) {
        resolveTemplate(el, scope.$template);
      }
    }
    const hasVOnce = checkAttr(el, "v-once") != null;
    if (hasVOnce) {
      inOnce = true;
    }
    if (exp = checkAttr(el, "ref")) {
      applyDirective(el, ref, `"${exp}"`, ctx);
    }
    walkChildren(el, ctx);
    const deferred = [];
    for (const { name, value } of [...el.attributes]) {
      if (dirRE.test(name) && name !== "v-cloak") {
        if (name === "v-model") {
          deferred.unshift([name, value]);
        } else if (name[0] === "@" || /^v-on\b/.test(name)) {
          deferred.push([name, value]);
        } else {
          processDirective(el, name, value, ctx);
        }
      }
    }
    for (const [name, value] of deferred) {
      processDirective(el, name, value, ctx);
    }
    if (hasVOnce) {
      inOnce = false;
    }
  } else if (type === 3) {
    const data = node.data;
    if (data.includes(ctx.delimiters[0])) {
      let segments = [];
      let lastIndex = 0;
      let match;
      while (match = ctx.delimitersRE.exec(data)) {
        const leading = data.slice(lastIndex, match.index);
        if (leading)
          segments.push(JSON.stringify(leading));
        segments.push(`$s(${match[1]})`);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < data.length) {
        segments.push(JSON.stringify(data.slice(lastIndex)));
      }
      applyDirective(node, text, segments.join("+"), ctx);
    }
  } else if (type === 11) {
    walkChildren(node, ctx);
  }
};
const walkChildren = (node, ctx) => {
  let child = node.firstChild;
  while (child) {
    child = walk(child, ctx) || child.nextSibling;
  }
};
const processDirective = (el, raw, exp, ctx) => {
  let dir;
  let arg;
  let modifiers;
  raw = raw.replace(modifierRE, (_, m) => {
    (modifiers || (modifiers = {}))[m] = true;
    return "";
  });
  if (raw[0] === ":") {
    dir = bind;
    arg = raw.slice(1);
  } else if (raw[0] === "@") {
    dir = on;
    arg = raw.slice(1);
  } else {
    const argIndex = raw.indexOf(":");
    const dirName = argIndex > 0 ? raw.slice(2, argIndex) : raw.slice(2);
    dir = builtInDirectives[dirName] || ctx.dirs[dirName];
    arg = argIndex > 0 ? raw.slice(argIndex + 1) : void 0;
  }
  if (dir) {
    if (dir === bind && arg === "ref")
      dir = ref;
    applyDirective(el, dir, exp, ctx, arg, modifiers);
    el.removeAttribute(raw);
  }
};
const applyDirective = (el, dir, exp, ctx, arg, modifiers) => {
  const get2 = (e = exp) => evaluate(ctx.scope, e, el);
  const cleanup = dir({
    el,
    get: get2,
    effect: ctx.effect,
    ctx,
    exp,
    arg,
    modifiers
  });
  if (cleanup) {
    ctx.cleanups.push(cleanup);
  }
};
const resolveTemplate = (el, template) => {
  if (template[0] === "#") {
    const templateEl = document.querySelector(template);
    el.appendChild(templateEl.content.cloneNode(true));
    return;
  }
  el.innerHTML = template;
};
const createContext = (parent) => {
  const ctx = {
    ...parent,
    scope: parent ? parent.scope : reactive({}),
    dirs: parent ? parent.dirs : {},
    effects: [],
    blocks: [],
    cleanups: [],
    delimiters: ["{{", "}}"],
    delimitersRE: /\{\{([^]+?)\}\}/g,
    effect: (fn) => {
      if (inOnce) {
        queueJob(fn);
        return fn;
      }
      const e = effect$1(fn, {
        scheduler: () => queueJob(e)
      });
      ctx.effects.push(e);
      return e;
    }
  };
  return ctx;
};
const createScopedContext = (ctx, data = {}) => {
  const parentScope = ctx.scope;
  const mergedScope = Object.create(parentScope);
  Object.defineProperties(mergedScope, Object.getOwnPropertyDescriptors(data));
  mergedScope.$refs = Object.create(parentScope.$refs);
  const reactiveProxy = reactive(new Proxy(mergedScope, {
    set(target, key, val, receiver) {
      if (receiver === reactiveProxy && !target.hasOwnProperty(key)) {
        return Reflect.set(parentScope, key, val);
      }
      return Reflect.set(target, key, val, receiver);
    }
  }));
  bindContextMethods(reactiveProxy);
  return {
    ...ctx,
    scope: reactiveProxy
  };
};
const bindContextMethods = (scope) => {
  for (const key of Object.keys(scope)) {
    if (typeof scope[key] === "function") {
      scope[key] = scope[key].bind(scope);
    }
  }
};
class Block {
  constructor(template, parentCtx, isRoot = false) {
    __publicField(this, "template");
    __publicField(this, "ctx");
    __publicField(this, "key");
    __publicField(this, "parentCtx");
    __publicField(this, "isFragment");
    __publicField(this, "start");
    __publicField(this, "end");
    this.isFragment = template instanceof HTMLTemplateElement;
    if (isRoot) {
      this.template = template;
    } else if (this.isFragment) {
      this.template = template.content.cloneNode(true);
    } else {
      this.template = template.cloneNode(true);
    }
    if (isRoot) {
      this.ctx = parentCtx;
    } else {
      this.parentCtx = parentCtx;
      parentCtx.blocks.push(this);
      this.ctx = createContext(parentCtx);
    }
    walk(this.template, this.ctx);
  }
  get el() {
    return this.start || this.template;
  }
  insert(parent, anchor = null) {
    if (this.isFragment) {
      if (this.start) {
        let node = this.start;
        let next;
        while (node) {
          next = node.nextSibling;
          parent.insertBefore(node, anchor);
          if (node === this.end)
            break;
          node = next;
        }
      } else {
        this.start = new Text("");
        this.end = new Text("");
        parent.insertBefore(this.end, anchor);
        parent.insertBefore(this.start, this.end);
        parent.insertBefore(this.template, this.end);
      }
    } else {
      parent.insertBefore(this.template, anchor);
    }
  }
  remove() {
    if (this.parentCtx) {
      remove(this.parentCtx.blocks, this);
    }
    if (this.start) {
      const parent = this.start.parentNode;
      let node = this.start;
      let next;
      while (node) {
        next = node.nextSibling;
        parent.removeChild(node);
        if (node === this.end)
          break;
        node = next;
      }
    } else {
      this.template.parentNode.removeChild(this.template);
    }
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((child) => {
      child.teardown();
    });
    this.ctx.effects.forEach(stop);
    this.ctx.cleanups.forEach((fn) => fn());
  }
}
const escapeRegex = (str) => str.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&");
const createApp = (initialData) => {
  const ctx = createContext();
  if (initialData) {
    ctx.scope = reactive(initialData);
    bindContextMethods(ctx.scope);
    if (initialData.$delimiters) {
      const [open, close] = ctx.delimiters = initialData.$delimiters;
      ctx.delimitersRE = new RegExp(escapeRegex(open) + "([^]+?)" + escapeRegex(close), "g");
    }
  }
  ctx.scope.$s = toDisplayString;
  ctx.scope.$nextTick = nextTick;
  ctx.scope.$refs = Object.create(null);
  let rootBlocks;
  return {
    directive(name, def) {
      if (def) {
        ctx.dirs[name] = def;
        return this;
      } else {
        return ctx.dirs[name];
      }
    },
    mount(el) {
      if (typeof el === "string") {
        el = document.querySelector(el);
        if (!el) {
          return;
        }
      }
      el = el || document.documentElement;
      let roots;
      if (el.hasAttribute("v-scope")) {
        roots = [el];
      } else {
        roots = [...el.querySelectorAll(`[v-scope]`)].filter((root) => !root.matches(`[v-scope] [v-scope]`));
      }
      if (!roots.length) {
        roots = [el];
      }
      rootBlocks = roots.map((el2) => new Block(el2, ctx, true));
      return this;
    },
    unmount() {
      rootBlocks.forEach((block) => block.teardown());
    }
  };
};
let s;
if ((s = document.currentScript) && s.hasAttribute("init")) {
  createApp().mount();
}
export { createApp, nextTick, reactive };
