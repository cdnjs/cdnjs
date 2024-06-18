/*! shepherd.js 12.0.2 */

'use strict';

/**
 * Checks if `value` is classified as an `Element`.
 * @param value The param to check if it is an Element
 */
function isElement$1(value) {
    return value instanceof Element;
}
/**
 * Checks if `value` is classified as an `HTMLElement`.
 * @param value The param to check if it is an HTMLElement
 */
function isHTMLElement$1(value) {
    return value instanceof HTMLElement;
}
/**
 * Checks if `value` is classified as a `Function` object.
 * @param value The param to check if it is a function
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Checks if `value` is classified as a `String` object.
 * @param value The param to check if it is a string
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Checks if `value` is undefined.
 * @param value The param to check if it is undefined
 */
function isUndefined(value) {
    return value === undefined;
}

class Evented {
    /**
     * Adds an event listener for the given event string.
     *
     * @param {string} event
     * @param {Function} handler
     * @param ctx
     * @param {boolean} once
     * @returns
     */
    on(event, handler, ctx, once = false) {
        if (isUndefined(this.bindings)) {
            this.bindings = {};
        }
        if (isUndefined(this.bindings[event])) {
            this.bindings[event] = [];
        }
        this.bindings[event]?.push({ handler, ctx, once });
        return this;
    }
    /**
     * Adds an event listener that only fires once for the given event string.
     *
     * @param {string} event
     * @param {Function} handler
     * @param ctx
     * @returns
     */
    once(event, handler, ctx) {
        return this.on(event, handler, ctx, true);
    }
    /**
     * Removes an event listener for the given event string.
     *
     * @param {string} event
     * @param {Function} handler
     * @returns
     */
    off(event, handler) {
        if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
            return this;
        }
        if (isUndefined(handler)) {
            delete this.bindings[event];
        }
        else {
            this.bindings[event]?.forEach((binding, index) => {
                if (binding.handler === handler) {
                    this.bindings[event]?.splice(index, 1);
                }
            });
        }
        return this;
    }
    /**
     * Triggers an event listener for the given event string.
     *
     * @param {string} event
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trigger(event, ...args) {
        if (!isUndefined(this.bindings) && this.bindings[event]) {
            this.bindings[event]?.forEach((binding, index) => {
                const { ctx, handler, once } = binding;
                const context = ctx || this;
                handler.apply(context, args);
                if (once) {
                    this.bindings[event]?.splice(index, 1);
                }
            });
        }
        return this;
    }
}

function _AsyncGenerator(e) {
  var r, t;
  function resume(r, t) {
    try {
      var n = e[r](t),
        o = n.value,
        u = o instanceof _OverloadYield;
      Promise.resolve(u ? o.v : o).then(function (t) {
        if (u) {
          var i = "return" === r ? "return" : "next";
          if (!o.k || t.done) return resume(i, t);
          t = e[i](t).value;
        }
        settle(n.done ? "return" : "normal", t);
      }, function (e) {
        resume("throw", e);
      });
    } catch (e) {
      settle("throw", e);
    }
  }
  function settle(e, n) {
    switch (e) {
      case "return":
        r.resolve({
          value: n,
          done: !0
        });
        break;
      case "throw":
        r.reject(n);
        break;
      default:
        r.resolve({
          value: n,
          done: !1
        });
    }
    (r = r.next) ? resume(r.key, r.arg) : t = null;
  }
  this._invoke = function (e, n) {
    return new Promise(function (o, u) {
      var i = {
        key: e,
        arg: n,
        resolve: o,
        reject: u,
        next: null
      };
      t ? t = t.next = i : (r = t = i, resume(e, n));
    });
  }, "function" != typeof e.return && (this.return = void 0);
}
_AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () {
  return this;
}, _AsyncGenerator.prototype.next = function (e) {
  return this._invoke("next", e);
}, _AsyncGenerator.prototype.throw = function (e) {
  return this._invoke("throw", e);
}, _AsyncGenerator.prototype.return = function (e) {
  return this._invoke("return", e);
};
function _OverloadYield(t, e) {
  this.v = t, this.k = e;
}
function _awaitAsyncGenerator(e) {
  return new _OverloadYield(e, 0);
}
function _wrapAsyncGenerator(fn) {
  return function () {
    return new _AsyncGenerator(fn.apply(this, arguments));
  };
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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * Special values that tell deepmerge to perform a certain action.
 */
const actions = {
  defaultMerge: Symbol("deepmerge-ts: default merge"),
  skip: Symbol("deepmerge-ts: skip")
};
/**
 * Special values that tell deepmergeInto to perform a certain action.
 */
({
  defaultMerge: actions.defaultMerge
});

/**
 * The default function to update meta data.
 */
function defaultMetaDataUpdater(previousMeta, metaMeta) {
  return metaMeta;
}

/**
 * Get the type of the given object.
 *
 * @param object - The object to get the type of.
 * @returns The type of the given object.
 */
function getObjectType(object) {
  if (typeof object !== "object" || object === null) {
    return 0 /* ObjectType.NOT */;
  }
  if (Array.isArray(object)) {
    return 2 /* ObjectType.ARRAY */;
  }
  if (isRecord(object)) {
    return 1 /* ObjectType.RECORD */;
  }
  if (object instanceof Set) {
    return 3 /* ObjectType.SET */;
  }
  if (object instanceof Map) {
    return 4 /* ObjectType.MAP */;
  }
  return 5 /* ObjectType.OTHER */;
}
/**
 * Get the keys of the given objects including symbol keys.
 *
 * Note: Only keys to enumerable properties are returned.
 *
 * @param objects - An array of objects to get the keys of.
 * @returns A set containing all the keys of all the given objects.
 */
function getKeys(objects) {
  const keys = new Set();
  /* eslint-disable functional/no-loop-statements, functional/no-expression-statements -- using a loop here is more efficient. */
  for (const object of objects) {
    for (const key of [...Object.keys(object), ...Object.getOwnPropertySymbols(object)]) {
      keys.add(key);
    }
  }
  /* eslint-enable functional/no-loop-statements, functional/no-expression-statements */
  return keys;
}
/**
 * Does the given object have the given property.
 *
 * @param object - The object to test.
 * @param property - The property to test.
 * @returns Whether the object has the property.
 */
function objectHasProperty(object, property) {
  return typeof object === "object" && Object.prototype.propertyIsEnumerable.call(object, property);
}
/**
 * Get an iterable object that iterates over the given iterables.
 */
function getIterableOfIterables(iterables) {
  return {
    // eslint-disable-next-line functional/functional-parameters
    *[Symbol.iterator]() {
      // eslint-disable-next-line functional/no-loop-statements
      for (const iterable of iterables) {
        // eslint-disable-next-line functional/no-loop-statements
        for (const value of iterable) {
          yield value;
        }
      }
    }
  };
}
const validRecordToStringValues = new Set(["[object Object]", "[object Module]"]);
/**
 * Does the given object appear to be a record.
 */
function isRecord(value) {
  // All records are objects.
  if (!validRecordToStringValues.has(Object.prototype.toString.call(value))) {
    return false;
  }
  const {
    constructor
  } = value;
  // If has modified constructor.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (constructor === undefined) {
    return true;
  }
  // eslint-disable-next-line prefer-destructuring
  const prototype = constructor.prototype;
  // If has modified prototype.
  if (prototype === null || typeof prototype !== "object" || !validRecordToStringValues.has(Object.prototype.toString.call(prototype))) {
    return false;
  }
  // If constructor does not have an Object-specific method.
  // eslint-disable-next-line sonarjs/prefer-single-boolean-return, no-prototype-builtins
  if (!prototype.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  // Most likely a record.
  return true;
}

/**
 * The default strategy to merge records.
 *
 * @param values - The records.
 */
function mergeRecords$2(values, utils, meta) {
  const result = {};
  /* eslint-disable functional/no-loop-statements, functional/no-conditional-statements, functional/no-expression-statements, functional/immutable-data -- using imperative code here is more performant. */
  for (const key of getKeys(values)) {
    const propValues = [];
    for (const value of values) {
      if (objectHasProperty(value, key)) {
        propValues.push(value[key]);
      }
    }
    if (propValues.length === 0) {
      continue;
    }
    const updatedMeta = utils.metaDataUpdater(meta, {
      key,
      parents: values
    });
    const propertyResult = mergeUnknowns(propValues, utils, updatedMeta);
    if (propertyResult === actions.skip) {
      continue;
    }
    if (key === "__proto__") {
      Object.defineProperty(result, key, {
        value: propertyResult,
        configurable: true,
        enumerable: true,
        writable: true
      });
    } else {
      result[key] = propertyResult;
    }
  }
  /* eslint-enable functional/no-loop-statements, functional/no-conditional-statements, functional/no-expression-statements, functional/immutable-data */
  return result;
}
/**
 * The default strategy to merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays$2(values) {
  return values.flat();
}
/**
 * The default strategy to merge sets.
 *
 * @param values - The sets.
 */
function mergeSets$2(values) {
  return new Set(getIterableOfIterables(values));
}
/**
 * The default strategy to merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps$2(values) {
  return new Map(getIterableOfIterables(values));
}
/**
 * Get the last value in the given array.
 */
function mergeOthers$2(values) {
  return values.at(-1);
}
var defaultMergeFunctions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mergeArrays: mergeArrays$2,
  mergeMaps: mergeMaps$2,
  mergeOthers: mergeOthers$2,
  mergeRecords: mergeRecords$2,
  mergeSets: mergeSets$2
});

/**
 * Deeply merge objects.
 *
 * @param objects - The objects to merge.
 */
function deepmerge(
// eslint-disable-next-line functional/functional-parameters
...objects) {
  return deepmergeCustom({})(...objects);
}
function deepmergeCustom(options, rootMetaData) {
  const utils = getUtils(options, customizedDeepmerge);
  /**
   * The customized deepmerge function.
   */
  function customizedDeepmerge(
  // eslint-disable-next-line functional/functional-parameters
  ...objects) {
    return mergeUnknowns(objects, utils, rootMetaData);
  }
  return customizedDeepmerge;
}
/**
 * The the utils that are available to the merge functions.
 *
 * @param options - The options the user specified
 */
function getUtils(options, customizedDeepmerge) {
  var _options$metaDataUpda, _options$enableImplic;
  return {
    defaultMergeFunctions,
    mergeFunctions: _extends({}, defaultMergeFunctions, Object.fromEntries(Object.entries(options).filter(([key, option]) => Object.hasOwn(defaultMergeFunctions, key)).map(([key, option]) => option === false ? [key, mergeOthers$2] : [key, option]))),
    metaDataUpdater: (_options$metaDataUpda = options.metaDataUpdater) != null ? _options$metaDataUpda : defaultMetaDataUpdater,
    deepmerge: customizedDeepmerge,
    useImplicitDefaultMerging: (_options$enableImplic = options.enableImplicitDefaultMerging) != null ? _options$enableImplic : false,
    actions
  };
}
/**
 * Merge unknown things.
 *
 * @param values - The values.
 */
function mergeUnknowns(values, utils, meta) {
  if (values.length === 0) {
    return undefined;
  }
  if (values.length === 1) {
    return mergeOthers$1(values, utils, meta);
  }
  const type = getObjectType(values[0]);
  /* eslint-disable functional/no-loop-statements, functional/no-conditional-statements -- using imperative code here is more performant. */
  if (type !== 0 /* ObjectType.NOT */ && type !== 5 /* ObjectType.OTHER */) {
    for (let m_index = 1; m_index < values.length; m_index++) {
      if (getObjectType(values[m_index]) === type) {
        continue;
      }
      return mergeOthers$1(values, utils, meta);
    }
  }
  /* eslint-enable functional/no-loop-statements, functional/no-conditional-statements */
  switch (type) {
    case 1 /* ObjectType.RECORD */:
      {
        return mergeRecords$1(values, utils, meta);
      }
    case 2 /* ObjectType.ARRAY */:
      {
        return mergeArrays$1(values, utils, meta);
      }
    case 3 /* ObjectType.SET */:
      {
        return mergeSets$1(values, utils, meta);
      }
    case 4 /* ObjectType.MAP */:
      {
        return mergeMaps$1(values, utils, meta);
      }
    default:
      {
        return mergeOthers$1(values, utils, meta);
      }
  }
}
/**
 * Merge records.
 *
 * @param values - The records.
 */
function mergeRecords$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeRecords(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeRecords !== utils.defaultMergeFunctions.mergeRecords) {
    return utils.defaultMergeFunctions.mergeRecords(values, utils, meta);
  }
  return result;
}
/**
 * Merge arrays.
 *
 * @param values - The arrays.
 */
function mergeArrays$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeArrays(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeArrays !== utils.defaultMergeFunctions.mergeArrays) {
    return utils.defaultMergeFunctions.mergeArrays(values);
  }
  return result;
}
/**
 * Merge sets.
 *
 * @param values - The sets.
 */
function mergeSets$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeSets(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeSets !== utils.defaultMergeFunctions.mergeSets) {
    return utils.defaultMergeFunctions.mergeSets(values);
  }
  return result;
}
/**
 * Merge maps.
 *
 * @param values - The maps.
 */
function mergeMaps$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeMaps(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeMaps !== utils.defaultMergeFunctions.mergeMaps) {
    return utils.defaultMergeFunctions.mergeMaps(values);
  }
  return result;
}
/**
 * Merge other things.
 *
 * @param values - The other things.
 */
function mergeOthers$1(values, utils, meta) {
  const result = utils.mergeFunctions.mergeOthers(values, utils, meta);
  if (result === actions.defaultMerge || utils.useImplicitDefaultMerging && result === undefined && utils.mergeFunctions.mergeOthers !== utils.defaultMergeFunctions.mergeOthers) {
    return utils.defaultMergeFunctions.mergeOthers(values);
  }
  return result;
}

/**
 * Binds all the methods on a JS Class to the `this` context of the class.
 * Adapted from https://github.com/sindresorhus/auto-bind
 * @param self The `this` context of the class
 * @return The `this` context of the class
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function autoBind(self) {
    const keys = Object.getOwnPropertyNames(self.constructor.prototype);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = self[key];
        if (key !== 'constructor' && typeof val === 'function') {
            self[key] = val.bind(self);
        }
    }
    return self;
}

/**
 * Sets up the handler to determine if we should advance the tour
 * @param step The step instance
 * @param selector
 * @private
 */
function _setupAdvanceOnHandler(step, selector) {
    return (event) => {
        if (step.isOpen()) {
            const targetIsEl = step.el && event.currentTarget === step.el;
            const targetIsSelector = !isUndefined(selector) &&
                event.currentTarget.matches(selector);
            if (targetIsSelector || targetIsEl) {
                step.tour.next();
            }
        }
    };
}
/**
 * Bind the event handler for advanceOn
 * @param step The step instance
 */
function bindAdvance(step) {
    // An empty selector matches the step element
    const { event, selector } = step.options.advanceOn || {};
    if (event) {
        const handler = _setupAdvanceOnHandler(step, selector);
        // TODO: this should also bind/unbind on show/hide
        let el = null;
        if (!isUndefined(selector)) {
            el = document.querySelector(selector);
            if (!el) {
                return console.error(`No element was found for the selector supplied to advanceOn: ${selector}`);
            }
        }
        if (el) {
            el.addEventListener(event, handler);
            step.on('destroy', () => {
                return el.removeEventListener(event, handler);
            });
        }
        else {
            document.body.addEventListener(event, handler, true);
            step.on('destroy', () => {
                return document.body.removeEventListener(event, handler, true);
            });
        }
    }
    else {
        return console.error('advanceOn was defined, but no event name was passed.');
    }
}

class StepNoOp {
    constructor(_options) { }
}
class TourNoOp {
    constructor(_tour, _options) { }
}
/**
 * Ensure class prefix ends in `-`
 * @param prefix - The prefix to prepend to the class names generated by nano-css
 * @return The prefix ending in `-`
 */
function normalizePrefix(prefix) {
    if (!isString(prefix) || prefix === '') {
        return '';
    }
    return prefix.charAt(prefix.length - 1) !== '-' ? `${prefix}-` : prefix;
}
/**
 * Resolves attachTo options, converting element option value to a qualified HTMLElement.
 * @param step - The step instance
 * @returns {{}|{element, on}}
 * `element` is a qualified HTML Element
 * `on` is a string position value
 */
function parseAttachTo(step) {
    const options = step.options.attachTo || {};
    const returnOpts = Object.assign({}, options);
    if (isFunction(returnOpts.element)) {
        // Bind the callback to step so that it has access to the object, to enable running additional logic
        returnOpts.element = returnOpts.element.call(step);
    }
    if (isString(returnOpts.element)) {
        // Can't override the element in user opts reference because we can't
        // guarantee that the element will exist in the future.
        try {
            returnOpts.element = document.querySelector(returnOpts.element);
        }
        catch (e) {
            // TODO
        }
        if (!returnOpts.element) {
            console.error(`The element for this Shepherd step was not found ${options.element}`);
        }
    }
    return returnOpts;
}
/**
 * Checks if the step should be centered or not. Does not trigger attachTo.element evaluation, making it a pure
 * alternative for the deprecated step.isCentered() method.
 */
function shouldCenterStep(resolvedAttachToOptions) {
    if (resolvedAttachToOptions === undefined ||
        resolvedAttachToOptions === null) {
        return true;
    }
    return !resolvedAttachToOptions.element || !resolvedAttachToOptions.on;
}
/**
 * Create a unique id for steps, tours, modals, etc
 */
function uuid() {
    let d = Date.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return _extends({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, padding);
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return _extends({}, rect, {
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

const _excluded2 = ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"],
  _excluded4 = ["mainAxis", "crossAxis", "limiter"];
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = _extends({}, middlewareData, {
      [name]: _extends({}, middlewareData[name], data)
    });
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? _extends({}, rects.floating, {
    x,
    y
  }) : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: _extends({
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset
      }, shouldAddOffset && {
        alignmentOffset
      }),
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = function flip(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const _evaluate2 = evaluate(options, state),
        {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = 'bestFit',
          fallbackAxisSideDirection = 'none',
          flipAlignment = true
        } = _evaluate2,
        detectOverflowOptions = _objectWithoutPropertiesLoose(_evaluate2, _excluded2);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$map$so;
                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function shift(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const _evaluate4 = evaluate(options, state),
        {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: _ref => {
              let {
                x,
                y
              } = _ref;
              return {
                x,
                y
              };
            }
          }
        } = _evaluate4,
        detectOverflowOptions = _objectWithoutPropertiesLoose(_evaluate4, _excluded4);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn(_extends({}, state, {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      }));
      return _extends({}, limitedCoords, {
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      });
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift$1 = function limitShift(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : _extends({
        mainAxis: 0,
        crossAxis: 0
      }, rawOffset);
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = ['top', 'left'].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle(element);

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

function getCssDimensions(element) {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
const topLayerSelectors = [':popover-open', ':modal'];
function isTopLayer(floating) {
  return topLayerSelectors.some(selector => {
    try {
      return floating.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = _extends({}, clippingAncestor, {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    });
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const window = getWindow(element);
  if (!isHTMLElement(element) || isTopLayer(element)) {
    return window;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
    return window;
  }
  return offsetParent || getContainingBlock(element) || window;
}
const getElementRects = async function getElementRects(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: _extends({
      x: 0,
      y: 0
    }, await getDimensionsFn(data.floating))
  };
};
function isRTL(element) {
  return getComputedStyle(element).direction === 'rtl';
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, _extends({}, options, {
        // Handle <iframe>s
        root: root.ownerDocument
      }));
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = flip$1;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = arrow$1;

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = limitShift$1;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = _extends({
    platform
  }, options);
  const platformWithCache = _extends({}, mergedOptions.platform, {
    _c: cache
  });
  return computePosition$1(reference, floating, _extends({}, mergedOptions, {
    platform: platformWithCache
  }));
};

/**
 * Determines options for the tooltip and initializes event listeners.
 *
 * @param step The step instance
 */
function setupTooltip(step) {
    if (step.cleanup) {
        step.cleanup();
    }
    const attachToOptions = step._getResolvedAttachToOptions();
    let target = attachToOptions.element;
    const floatingUIOptions = getFloatingUIOptions(attachToOptions, step);
    const shouldCenter = shouldCenterStep(attachToOptions);
    if (shouldCenter) {
        target = document.body;
        // @ts-expect-error TODO: fix this type error when we type Svelte
        const content = step.shepherdElementComponent.getElement();
        content.classList.add('shepherd-centered');
    }
    step.cleanup = autoUpdate(target, step.el, () => {
        // The element might have already been removed by the end of the tour.
        if (!step.el) {
            step.cleanup?.();
            return;
        }
        setPosition(target, step, floatingUIOptions, shouldCenter);
    });
    step.target = attachToOptions.element;
    return floatingUIOptions;
}
/**
 * Merge tooltip options handling nested keys.
 *
 * @param tourOptions - The default tour options.
 * @param options - Step specific options.
 *
 * @return {floatingUIOptions: FloatingUIOptions}
 */
function mergeTooltipConfig(tourOptions, options) {
    return {
        floatingUIOptions: deepmerge(tourOptions.floatingUIOptions || {}, options.floatingUIOptions || {})
    };
}
/**
 * Cleanup function called when the step is closed/destroyed.
 *
 * @param step
 */
function destroyTooltip(step) {
    if (step.cleanup) {
        step.cleanup();
    }
    step.cleanup = null;
}
function setPosition(target, step, floatingUIOptions, shouldCenter) {
    return (computePosition(target, step.el, floatingUIOptions)
        .then(floatingUIposition(step, shouldCenter))
        // Wait before forcing focus.
        .then((step) => new Promise((resolve) => {
        setTimeout(() => resolve(step), 300);
    }))
        // Replaces focusAfterRender modifier.
        .then((step) => {
        if (step?.el) {
            step.el.focus({ preventScroll: true });
        }
    }));
}
function floatingUIposition(step, shouldCenter) {
    return ({ x, y, placement, middlewareData }) => {
        if (!step.el) {
            return step;
        }
        if (shouldCenter) {
            Object.assign(step.el.style, {
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            });
        }
        else {
            Object.assign(step.el.style, {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`
            });
        }
        step.el.dataset['popperPlacement'] = placement;
        placeArrow(step.el, middlewareData);
        return step;
    };
}
function placeArrow(el, middlewareData) {
    const arrowEl = el.querySelector('.shepherd-arrow');
    if (isHTMLElement$1(arrowEl) && middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        Object.assign(arrowEl.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : ''
        });
    }
}
/**
 * Gets the `Floating UI` options from a set of base `attachTo` options
 * @param attachToOptions
 * @param step The step instance
 * @private
 */
function getFloatingUIOptions(attachToOptions, step) {
    const options = {
        strategy: 'absolute'
    };
    options.middleware = [];
    const arrowEl = addArrow(step);
    const shouldCenter = shouldCenterStep(attachToOptions);
    if (!shouldCenter) {
        options.middleware.push(flip(), 
        // Replicate PopperJS default behavior.
        shift({
            limiter: limitShift(),
            crossAxis: true
        }));
        if (arrowEl) {
            options.middleware.push(arrow({ element: arrowEl }));
        }
        options.placement = attachToOptions.on;
    }
    return deepmerge(step.options.floatingUIOptions || {}, options);
}
function addArrow(step) {
    if (step.options.arrow && step.el) {
        return step.el.querySelector('.shepherd-arrow');
    }
    return false;
}

/** @returns {void} */
function noop() {}

/**
 * @template T
 * @template S
 * @param {T} tar
 * @param {S} src
 * @returns {T & S}
 */
function assign(tar, src) {
  // @ts-ignore
  for (const k in src) tar[k] = src[k];
  return /** @type {T & S} */tar;
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
  fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
  return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
  target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
  return document.createElement(name);
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */
function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
  return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
  return text(' ');
}

/**
 * @returns {Text} */
function empty() {
  return text('');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
/**
 * List of attributes that should always be set through the attr method,
 * because updating them through the property setter doesn't work reliably.
 * In the example of `width`/`height`, the problem is that the setter only
 * accepts numeric values, but the attribute can also be set to a string like `50%`.
 * If this list becomes too big, rethink this approach.
 */
const always_set_through_set_attribute = ['width', 'height'];

/**
 * @param {Element & ElementCSSInlineStyle} node
 * @param {{ [x: string]: string }} attributes
 * @returns {void}
 */
function set_attributes(node, attributes) {
  // @ts-ignore
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === 'style') {
      node.style.cssText = attributes[key];
    } else if (key === '__value') {
      /** @type {any} */node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
  return Array.from(element.childNodes);
}

/**
 * @returns {void} */
function toggle_class(element, name, toggle) {
  // The `!!` is required because an `undefined` flag means flipping the current state.
  element.classList.toggle(name, !!toggle);
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;

/** @returns {void} */
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}

/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}

/**
 * Schedules a callback to run immediately after the component has been updated.
 *
 * The first time the callback runs will be after the initial `onMount`
 *
 * https://svelte.dev/docs/svelte#afterupdate
 * @param {() => any} fn
 * @returns {void}
 */
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */Promise.resolve();
let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

/** @returns {void} */
function add_render_callback(fn) {
  render_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
  // Do not reenter flush while dirty components are updated, as this can
  // result in an infinite loop. Instead, let the inner flush handle it.
  // Reentrancy is ok afterwards for bindings etc.
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    // first, call beforeUpdate functions
    // and update components
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      // reset dirty state to not end up in a deadlocked state and then rethrow
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}

/** @returns {void} */
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach(c => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach(c => c());
  render_callbacks = filtered;
}

const outroing = new Set();

/**
 * @type {Outro}
 */
let outros;

/**
 * @returns {void} */
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group
  };
}

/**
 * @returns {void} */
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */
function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

// general each functions:

function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== undefined ? array_like_or_iterator : Array.from(array_like_or_iterator);
}

/** @returns {{}} */
function get_spread_update(levels, updates) {
  const update = {};
  const to_null_out = {};
  const accounted_for = {
    $$scope: 1
  };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update)) update[key] = undefined;
  }
  return update;
}

/** @returns {void} */
function create_component(block) {
  block && block.c();
}

/** @returns {void} */
function mount_component(component, target, anchor) {
  const {
    fragment,
    after_update
  } = component.$$;
  fragment && fragment.m(target, anchor);
  // onMount happens before the initial afterUpdate
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    // if the component was destroyed immediately
    // it will update the `$$.on_destroy` reference to `null`.
    // the destructured on_destroy may still reference to the old array
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      // Edge case - component was destroyed immediately,
      // most likely as a result of a binding initialising
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

/** @returns {void} */
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init(component, options, instance, create_fragment, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  /** @type {import('./private.js').T$$} */
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  // `false` as a special case of no DOM component
  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      // TODO: what is the correct type here?
      // @ts-expect-error
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    this.$$ = undefined;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    this.$$set = undefined;
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }

  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }

  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
  // @ts-ignore
  (window.__svelte || (window.__svelte = {
    v: new Set()
  })).v.add(PUBLIC_VERSION);

/* src/components/shepherd-button.svelte generated by Svelte v4.2.15 */
function create_fragment$8(ctx) {
  let button;
  let button_aria_label_value;
  let button_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      attr(button, "aria-label", button_aria_label_value = /*label*/ctx[3] ? /*label*/ctx[3] : null);
      attr(button, "class", button_class_value = `${/*classes*/ctx[1] || ''} shepherd-button ${/*secondary*/ctx[4] ? 'shepherd-button-secondary' : ''}`);
      button.disabled = /*disabled*/ctx[2];
      attr(button, "tabindex", "0");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      button.innerHTML = /*text*/ctx[5];
      if (!mounted) {
        dispose = listen(button, "click", function () {
          if (is_function( /*action*/ctx[0])) /*action*/ctx[0].apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty & /*text*/32) button.innerHTML = /*text*/ctx[5];
      if (dirty & /*label*/8 && button_aria_label_value !== (button_aria_label_value = /*label*/ctx[3] ? /*label*/ctx[3] : null)) {
        attr(button, "aria-label", button_aria_label_value);
      }
      if (dirty & /*classes, secondary*/18 && button_class_value !== (button_class_value = `${/*classes*/ctx[1] || ''} shepherd-button ${/*secondary*/ctx[4] ? 'shepherd-button-secondary' : ''}`)) {
        attr(button, "class", button_class_value);
      }
      if (dirty & /*disabled*/4) {
        button.disabled = /*disabled*/ctx[2];
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$8($$self, $$props, $$invalidate) {
  let {
    config,
    step
  } = $$props;
  let action, classes, disabled, label, secondary, text;
  function getConfigOption(option) {
    if (isFunction(option)) {
      return option = option.call(step);
    }
    return option;
  }
  $$self.$$set = $$props => {
    if ('config' in $$props) $$invalidate(6, config = $$props.config);
    if ('step' in $$props) $$invalidate(7, step = $$props.step);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*config, step*/192) {
      {
        $$invalidate(0, action = config.action ? config.action.bind(step.tour) : null);
        $$invalidate(1, classes = config.classes);
        $$invalidate(2, disabled = config.disabled ? getConfigOption(config.disabled) : false);
        $$invalidate(3, label = config.label ? getConfigOption(config.label) : null);
        $$invalidate(4, secondary = config.secondary);
        $$invalidate(5, text = config.text ? getConfigOption(config.text) : null);
      }
    }
  };
  return [action, classes, disabled, label, secondary, text, config, step];
}
class Shepherd_button extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      config: 6,
      step: 7
    });
  }
}

/* src/components/shepherd-footer.svelte generated by Svelte v4.2.15 */
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[2] = list[i];
  return child_ctx;
}

// (10:2) {#if buttons}
function create_if_block$3(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like( /*buttons*/ctx[1]);
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx, dirty) {
      if (dirty & /*buttons, step*/3) {
        each_value = ensure_array_like( /*buttons*/ctx[1]);
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}

// (11:4) {#each buttons as config}
function create_each_block(ctx) {
  let shepherdbutton;
  let current;
  shepherdbutton = new Shepherd_button({
    props: {
      config: /*config*/ctx[2],
      step: /*step*/ctx[0]
    }
  });
  return {
    c() {
      create_component(shepherdbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(shepherdbutton, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const shepherdbutton_changes = {};
      if (dirty & /*buttons*/2) shepherdbutton_changes.config = /*config*/ctx[2];
      if (dirty & /*step*/1) shepherdbutton_changes.step = /*step*/ctx[0];
      shepherdbutton.$set(shepherdbutton_changes);
    },
    i(local) {
      if (current) return;
      transition_in(shepherdbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(shepherdbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(shepherdbutton, detaching);
    }
  };
}
function create_fragment$7(ctx) {
  let footer;
  let current;
  let if_block = /*buttons*/ctx[1] && create_if_block$3(ctx);
  return {
    c() {
      footer = element("footer");
      if (if_block) if_block.c();
      attr(footer, "class", "shepherd-footer");
    },
    m(target, anchor) {
      insert(target, footer, anchor);
      if (if_block) if_block.m(footer, null);
      current = true;
    },
    p(ctx, [dirty]) {
      if ( /*buttons*/ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);
          if (dirty & /*buttons*/2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(footer, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(footer);
      }
      if (if_block) if_block.d();
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let buttons;
  let {
    step
  } = $$props;
  $$self.$$set = $$props => {
    if ('step' in $$props) $$invalidate(0, step = $$props.step);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*step*/1) {
      $$invalidate(1, buttons = step.options.buttons);
    }
  };
  return [step, buttons];
}
class Shepherd_footer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      step: 0
    });
  }
}

/* src/components/shepherd-cancel-icon.svelte generated by Svelte v4.2.15 */
function create_fragment$6(ctx) {
  let button;
  let span;
  let button_aria_label_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      span = element("span");
      span.textContent = "×";
      attr(span, "aria-hidden", "true");
      attr(button, "aria-label", button_aria_label_value = /*cancelIcon*/ctx[0].label ? /*cancelIcon*/ctx[0].label : 'Close Tour');
      attr(button, "class", "shepherd-cancel-icon");
      attr(button, "type", "button");
    },
    m(target, anchor) {
      insert(target, button, anchor);
      append(button, span);
      if (!mounted) {
        dispose = listen(button, "click", /*handleCancelClick*/ctx[1]);
        mounted = true;
      }
    },
    p(ctx, [dirty]) {
      if (dirty & /*cancelIcon*/1 && button_aria_label_value !== (button_aria_label_value = /*cancelIcon*/ctx[0].label ? /*cancelIcon*/ctx[0].label : 'Close Tour')) {
        attr(button, "aria-label", button_aria_label_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let {
    cancelIcon,
    step
  } = $$props;

  /**
  * Add a click listener to the cancel link that cancels the tour
  */
  const handleCancelClick = e => {
    e.preventDefault();
    step.cancel();
  };
  $$self.$$set = $$props => {
    if ('cancelIcon' in $$props) $$invalidate(0, cancelIcon = $$props.cancelIcon);
    if ('step' in $$props) $$invalidate(2, step = $$props.step);
  };
  return [cancelIcon, handleCancelClick, step];
}
class Shepherd_cancel_icon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      cancelIcon: 0,
      step: 2
    });
  }
}

/* src/components/shepherd-title.svelte generated by Svelte v4.2.15 */
function create_fragment$5(ctx) {
  let h3;
  return {
    c() {
      h3 = element("h3");
      attr(h3, "id", /*labelId*/ctx[1]);
      attr(h3, "class", "shepherd-title");
    },
    m(target, anchor) {
      insert(target, h3, anchor);
      /*h3_binding*/
      ctx[3](h3);
    },
    p(ctx, [dirty]) {
      if (dirty & /*labelId*/2) {
        attr(h3, "id", /*labelId*/ctx[1]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(h3);
      }

      /*h3_binding*/
      ctx[3](null);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let {
    labelId,
    element,
    title
  } = $$props;
  afterUpdate(() => {
    if (isFunction(title)) {
      $$invalidate(2, title = title());
    }
    $$invalidate(0, element.innerHTML = title, element);
  });
  function h3_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      element = $$value;
      $$invalidate(0, element);
    });
  }
  $$self.$$set = $$props => {
    if ('labelId' in $$props) $$invalidate(1, labelId = $$props.labelId);
    if ('element' in $$props) $$invalidate(0, element = $$props.element);
    if ('title' in $$props) $$invalidate(2, title = $$props.title);
  };
  return [element, labelId, title, h3_binding];
}
class Shepherd_title extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      labelId: 1,
      element: 0,
      title: 2
    });
  }
}

/* src/components/shepherd-header.svelte generated by Svelte v4.2.15 */
function create_if_block_1$1(ctx) {
  let shepherdtitle;
  let current;
  shepherdtitle = new Shepherd_title({
    props: {
      labelId: /*labelId*/ctx[0],
      title: /*title*/ctx[2]
    }
  });
  return {
    c() {
      create_component(shepherdtitle.$$.fragment);
    },
    m(target, anchor) {
      mount_component(shepherdtitle, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const shepherdtitle_changes = {};
      if (dirty & /*labelId*/1) shepherdtitle_changes.labelId = /*labelId*/ctx[0];
      if (dirty & /*title*/4) shepherdtitle_changes.title = /*title*/ctx[2];
      shepherdtitle.$set(shepherdtitle_changes);
    },
    i(local) {
      if (current) return;
      transition_in(shepherdtitle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(shepherdtitle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(shepherdtitle, detaching);
    }
  };
}

// (19:2) {#if cancelIcon && cancelIcon.enabled}
function create_if_block$2(ctx) {
  let shepherdcancelicon;
  let current;
  shepherdcancelicon = new Shepherd_cancel_icon({
    props: {
      cancelIcon: /*cancelIcon*/ctx[3],
      step: /*step*/ctx[1]
    }
  });
  return {
    c() {
      create_component(shepherdcancelicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(shepherdcancelicon, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const shepherdcancelicon_changes = {};
      if (dirty & /*cancelIcon*/8) shepherdcancelicon_changes.cancelIcon = /*cancelIcon*/ctx[3];
      if (dirty & /*step*/2) shepherdcancelicon_changes.step = /*step*/ctx[1];
      shepherdcancelicon.$set(shepherdcancelicon_changes);
    },
    i(local) {
      if (current) return;
      transition_in(shepherdcancelicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(shepherdcancelicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(shepherdcancelicon, detaching);
    }
  };
}
function create_fragment$4(ctx) {
  let header;
  let t;
  let current;
  let if_block0 = /*title*/ctx[2] && create_if_block_1$1(ctx);
  let if_block1 = /*cancelIcon*/ctx[3] && /*cancelIcon*/ctx[3].enabled && create_if_block$2(ctx);
  return {
    c() {
      header = element("header");
      if (if_block0) if_block0.c();
      t = space();
      if (if_block1) if_block1.c();
      attr(header, "class", "shepherd-header");
    },
    m(target, anchor) {
      insert(target, header, anchor);
      if (if_block0) if_block0.m(header, null);
      append(header, t);
      if (if_block1) if_block1.m(header, null);
      current = true;
    },
    p(ctx, [dirty]) {
      if ( /*title*/ctx[2]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*title*/4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_1$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(header, t);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if ( /*cancelIcon*/ctx[3] && /*cancelIcon*/ctx[3].enabled) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*cancelIcon*/8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(header, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(header);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let {
    labelId,
    step
  } = $$props;
  let title, cancelIcon;
  $$self.$$set = $$props => {
    if ('labelId' in $$props) $$invalidate(0, labelId = $$props.labelId);
    if ('step' in $$props) $$invalidate(1, step = $$props.step);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*step*/2) {
      {
        $$invalidate(2, title = step.options.title);
        $$invalidate(3, cancelIcon = step.options.cancelIcon);
      }
    }
  };
  return [labelId, step, title, cancelIcon];
}
class Shepherd_header extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      labelId: 0,
      step: 1
    });
  }
}

/* src/components/shepherd-text.svelte generated by Svelte v4.2.15 */
function create_fragment$3(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "shepherd-text");
      attr(div, "id", /*descriptionId*/ctx[1]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      /*div_binding*/
      ctx[3](div);
    },
    p(ctx, [dirty]) {
      if (dirty & /*descriptionId*/2) {
        attr(div, "id", /*descriptionId*/ctx[1]);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }

      /*div_binding*/
      ctx[3](null);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let {
    descriptionId,
    element,
    step
  } = $$props;
  afterUpdate(() => {
    let {
      text
    } = step.options;
    if (isFunction(text)) {
      text = text.call(step);
    }
    if (isHTMLElement$1(text)) {
      element.appendChild(text);
    } else {
      $$invalidate(0, element.innerHTML = text, element);
    }
  });
  function div_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      element = $$value;
      $$invalidate(0, element);
    });
  }
  $$self.$$set = $$props => {
    if ('descriptionId' in $$props) $$invalidate(1, descriptionId = $$props.descriptionId);
    if ('element' in $$props) $$invalidate(0, element = $$props.element);
    if ('step' in $$props) $$invalidate(2, step = $$props.step);
  };
  return [element, descriptionId, step, div_binding];
}
class Shepherd_text extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      descriptionId: 1,
      element: 0,
      step: 2
    });
  }
}

/* src/components/shepherd-content.svelte generated by Svelte v4.2.15 */
function create_if_block_2(ctx) {
  let shepherdheader;
  let current;
  shepherdheader = new Shepherd_header({
    props: {
      labelId: /*labelId*/ctx[1],
      step: /*step*/ctx[2]
    }
  });
  return {
    c() {
      create_component(shepherdheader.$$.fragment);
    },
    m(target, anchor) {
      mount_component(shepherdheader, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const shepherdheader_changes = {};
      if (dirty & /*labelId*/2) shepherdheader_changes.labelId = /*labelId*/ctx[1];
      if (dirty & /*step*/4) shepherdheader_changes.step = /*step*/ctx[2];
      shepherdheader.$set(shepherdheader_changes);
    },
    i(local) {
      if (current) return;
      transition_in(shepherdheader.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(shepherdheader.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(shepherdheader, detaching);
    }
  };
}

// (15:2) {#if !isUndefined(step.options.text)}
function create_if_block_1(ctx) {
  let shepherdtext;
  let current;
  shepherdtext = new Shepherd_text({
    props: {
      descriptionId: /*descriptionId*/ctx[0],
      step: /*step*/ctx[2]
    }
  });
  return {
    c() {
      create_component(shepherdtext.$$.fragment);
    },
    m(target, anchor) {
      mount_component(shepherdtext, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const shepherdtext_changes = {};
      if (dirty & /*descriptionId*/1) shepherdtext_changes.descriptionId = /*descriptionId*/ctx[0];
      if (dirty & /*step*/4) shepherdtext_changes.step = /*step*/ctx[2];
      shepherdtext.$set(shepherdtext_changes);
    },
    i(local) {
      if (current) return;
      transition_in(shepherdtext.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(shepherdtext.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(shepherdtext, detaching);
    }
  };
}

// (19:2) {#if Array.isArray(step.options.buttons) && step.options.buttons.length}
function create_if_block$1(ctx) {
  let shepherdfooter;
  let current;
  shepherdfooter = new Shepherd_footer({
    props: {
      step: /*step*/ctx[2]
    }
  });
  return {
    c() {
      create_component(shepherdfooter.$$.fragment);
    },
    m(target, anchor) {
      mount_component(shepherdfooter, target, anchor);
      current = true;
    },
    p(ctx, dirty) {
      const shepherdfooter_changes = {};
      if (dirty & /*step*/4) shepherdfooter_changes.step = /*step*/ctx[2];
      shepherdfooter.$set(shepherdfooter_changes);
    },
    i(local) {
      if (current) return;
      transition_in(shepherdfooter.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(shepherdfooter.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(shepherdfooter, detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  let show_if_2 = !isUndefined( /*step*/ctx[2].options.title) || /*step*/ctx[2].options.cancelIcon && /*step*/ctx[2].options.cancelIcon.enabled;
  let t0;
  let show_if_1 = !isUndefined( /*step*/ctx[2].options.text);
  let t1;
  let show_if = Array.isArray( /*step*/ctx[2].options.buttons) && /*step*/ctx[2].options.buttons.length;
  let current;
  let if_block0 = show_if_2 && create_if_block_2(ctx);
  let if_block1 = show_if_1 && create_if_block_1(ctx);
  let if_block2 = show_if && create_if_block$1(ctx);
  return {
    c() {
      div = element("div");
      if (if_block0) if_block0.c();
      t0 = space();
      if (if_block1) if_block1.c();
      t1 = space();
      if (if_block2) if_block2.c();
      attr(div, "class", "shepherd-content");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block0) if_block0.m(div, null);
      append(div, t0);
      if (if_block1) if_block1.m(div, null);
      append(div, t1);
      if (if_block2) if_block2.m(div, null);
      current = true;
    },
    p(ctx, [dirty]) {
      if (dirty & /*step*/4) show_if_2 = !isUndefined( /*step*/ctx[2].options.title) || /*step*/ctx[2].options.cancelIcon && /*step*/ctx[2].options.cancelIcon.enabled;
      if (show_if_2) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
          if (dirty & /*step*/4) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (dirty & /*step*/4) show_if_1 = !isUndefined( /*step*/ctx[2].options.text);
      if (show_if_1) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
          if (dirty & /*step*/4) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div, t1);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (dirty & /*step*/4) show_if = Array.isArray( /*step*/ctx[2].options.buttons) && /*step*/ctx[2].options.buttons.length;
      if (show_if) {
        if (if_block2) {
          if_block2.p(ctx, dirty);
          if (dirty & /*step*/4) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$1(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      current = true;
    },
    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let {
    descriptionId,
    labelId,
    step
  } = $$props;
  $$self.$$set = $$props => {
    if ('descriptionId' in $$props) $$invalidate(0, descriptionId = $$props.descriptionId);
    if ('labelId' in $$props) $$invalidate(1, labelId = $$props.labelId);
    if ('step' in $$props) $$invalidate(2, step = $$props.step);
  };
  return [descriptionId, labelId, step];
}
class Shepherd_content extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      descriptionId: 0,
      labelId: 1,
      step: 2
    });
  }
}

/* src/components/shepherd-element.svelte generated by Svelte v4.2.15 */
function create_if_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "shepherd-arrow");
      attr(div, "data-popper-arrow", "");
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function create_fragment$1(ctx) {
  let div;
  let t;
  let shepherdcontent;
  let div_aria_describedby_value;
  let div_aria_labelledby_value;
  let current;
  let mounted;
  let dispose;
  let if_block = /*step*/ctx[4].options.arrow && /*step*/ctx[4].options.attachTo && /*step*/ctx[4].options.attachTo.element && /*step*/ctx[4].options.attachTo.on && create_if_block();
  shepherdcontent = new Shepherd_content({
    props: {
      descriptionId: /*descriptionId*/ctx[2],
      labelId: /*labelId*/ctx[3],
      step: /*step*/ctx[4]
    }
  });
  let div_levels = [{
    "aria-describedby": div_aria_describedby_value = !isUndefined( /*step*/ctx[4].options.text) ? /*descriptionId*/ctx[2] : null
  }, {
    "aria-labelledby": div_aria_labelledby_value = /*step*/ctx[4].options.title ? /*labelId*/ctx[3] : null
  }, /*dataStepId*/ctx[1], {
    role: "dialog"
  }, {
    tabindex: "0"
  }];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (if_block) if_block.c();
      t = space();
      create_component(shepherdcontent.$$.fragment);
      set_attributes(div, div_data);
      toggle_class(div, "shepherd-has-cancel-icon", /*hasCancelIcon*/ctx[5]);
      toggle_class(div, "shepherd-has-title", /*hasTitle*/ctx[6]);
      toggle_class(div, "shepherd-element", true);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block) if_block.m(div, null);
      append(div, t);
      mount_component(shepherdcontent, div, null);
      /*div_binding*/
      ctx[13](div);
      current = true;
      if (!mounted) {
        dispose = listen(div, "keydown", /*handleKeyDown*/ctx[7]);
        mounted = true;
      }
    },
    p(ctx, [dirty]) {
      if ( /*step*/ctx[4].options.arrow && /*step*/ctx[4].options.attachTo && /*step*/ctx[4].options.attachTo.element && /*step*/ctx[4].options.attachTo.on) {
        if (if_block) ; else {
          if_block = create_if_block();
          if_block.c();
          if_block.m(div, t);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      const shepherdcontent_changes = {};
      if (dirty & /*descriptionId*/4) shepherdcontent_changes.descriptionId = /*descriptionId*/ctx[2];
      if (dirty & /*labelId*/8) shepherdcontent_changes.labelId = /*labelId*/ctx[3];
      if (dirty & /*step*/16) shepherdcontent_changes.step = /*step*/ctx[4];
      shepherdcontent.$set(shepherdcontent_changes);
      set_attributes(div, div_data = get_spread_update(div_levels, [(!current || dirty & /*step, descriptionId*/20 && div_aria_describedby_value !== (div_aria_describedby_value = !isUndefined( /*step*/ctx[4].options.text) ? /*descriptionId*/ctx[2] : null)) && {
        "aria-describedby": div_aria_describedby_value
      }, (!current || dirty & /*step, labelId*/24 && div_aria_labelledby_value !== (div_aria_labelledby_value = /*step*/ctx[4].options.title ? /*labelId*/ctx[3] : null)) && {
        "aria-labelledby": div_aria_labelledby_value
      }, dirty & /*dataStepId*/2 && /*dataStepId*/ctx[1], {
        role: "dialog"
      }, {
        tabindex: "0"
      }]));
      toggle_class(div, "shepherd-has-cancel-icon", /*hasCancelIcon*/ctx[5]);
      toggle_class(div, "shepherd-has-title", /*hasTitle*/ctx[6]);
      toggle_class(div, "shepherd-element", true);
    },
    i(local) {
      if (current) return;
      transition_in(shepherdcontent.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(shepherdcontent.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) if_block.d();
      destroy_component(shepherdcontent);
      /*div_binding*/
      ctx[13](null);
      mounted = false;
      dispose();
    }
  };
}
const KEY_TAB = 9;
const KEY_ESC = 27;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
function getClassesArray(classes) {
  return classes.split(' ').filter(className => !!className.length);
}
function instance$1($$self, $$props, $$invalidate) {
  let {
    classPrefix,
    element,
    descriptionId,
    firstFocusableElement,
    focusableElements,
    labelId,
    lastFocusableElement,
    step,
    dataStepId
  } = $$props;
  let hasCancelIcon, hasTitle, classes;
  const getElement = () => element;
  onMount(() => {
    // Get all elements that are focusable
    $$invalidate(1, dataStepId = {
      [`data-${classPrefix}shepherd-step-id`]: step.id
    });
    $$invalidate(9, focusableElements = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
    $$invalidate(8, firstFocusableElement = focusableElements[0]);
    $$invalidate(10, lastFocusableElement = focusableElements[focusableElements.length - 1]);
  });
  afterUpdate(() => {
    if (classes !== step.options.classes) {
      updateDynamicClasses();
    }
  });
  function updateDynamicClasses() {
    removeClasses(classes);
    classes = step.options.classes;
    addClasses(classes);
  }
  function removeClasses(classes) {
    if (isString(classes)) {
      const oldClasses = getClassesArray(classes);
      if (oldClasses.length) {
        element.classList.remove(...oldClasses);
      }
    }
  }
  function addClasses(classes) {
    if (isString(classes)) {
      const newClasses = getClassesArray(classes);
      if (newClasses.length) {
        element.classList.add(...newClasses);
      }
    }
  }

  /**
  * Setup keydown events to allow closing the modal with ESC
  *
  * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
  *
  * @private
  */
  const handleKeyDown = e => {
    const {
      tour
    } = step;
    switch (e.keyCode) {
      case KEY_TAB:
        if (focusableElements.length === 0) {
          e.preventDefault();
          break;
        }
        // Backward tab
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement || document.activeElement.classList.contains('shepherd-element')) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
        break;
      case KEY_ESC:
        if (tour.options.exitOnEsc) {
          e.preventDefault();
          e.stopPropagation();
          step.cancel();
        }
        break;
      case LEFT_ARROW:
        if (tour.options.keyboardNavigation) {
          e.preventDefault();
          e.stopPropagation();
          tour.back();
        }
        break;
      case RIGHT_ARROW:
        if (tour.options.keyboardNavigation) {
          e.preventDefault();
          e.stopPropagation();
          tour.next();
        }
        break;
    }
  };
  function div_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      element = $$value;
      $$invalidate(0, element);
    });
  }
  $$self.$$set = $$props => {
    if ('classPrefix' in $$props) $$invalidate(11, classPrefix = $$props.classPrefix);
    if ('element' in $$props) $$invalidate(0, element = $$props.element);
    if ('descriptionId' in $$props) $$invalidate(2, descriptionId = $$props.descriptionId);
    if ('firstFocusableElement' in $$props) $$invalidate(8, firstFocusableElement = $$props.firstFocusableElement);
    if ('focusableElements' in $$props) $$invalidate(9, focusableElements = $$props.focusableElements);
    if ('labelId' in $$props) $$invalidate(3, labelId = $$props.labelId);
    if ('lastFocusableElement' in $$props) $$invalidate(10, lastFocusableElement = $$props.lastFocusableElement);
    if ('step' in $$props) $$invalidate(4, step = $$props.step);
    if ('dataStepId' in $$props) $$invalidate(1, dataStepId = $$props.dataStepId);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*step*/16) {
      {
        $$invalidate(5, hasCancelIcon = step.options && step.options.cancelIcon && step.options.cancelIcon.enabled);
        $$invalidate(6, hasTitle = step.options && step.options.title);
      }
    }
  };
  return [element, dataStepId, descriptionId, labelId, step, hasCancelIcon, hasTitle, handleKeyDown, firstFocusableElement, focusableElements, lastFocusableElement, classPrefix, getElement, div_binding];
}
class Shepherd_element extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
      classPrefix: 11,
      element: 0,
      descriptionId: 2,
      firstFocusableElement: 8,
      focusableElements: 9,
      labelId: 3,
      lastFocusableElement: 10,
      step: 4,
      dataStepId: 1,
      getElement: 12
    });
  }
  get getElement() {
    return this.$$.ctx[12];
  }
}

/**
 * A class representing steps to be added to a tour.
 * @extends {Evented}
 */
class Step extends Evented {
    constructor(tour, options = {}) {
        super();
        this.tour = tour;
        this.classPrefix = this.tour.options
            ? normalizePrefix(this.tour.options.classPrefix)
            : '';
        // @ts-expect-error TODO: investigate where styles comes from
        this.styles = tour.styles;
        /**
         * Resolved attachTo options. Due to lazy evaluation, we only resolve the options during `before-show` phase.
         * Do not use this directly, use the _getResolvedAttachToOptions method instead.
         * @type {StepOptionsAttachTo | null}
         * @private
         */
        this._resolvedAttachTo = null;
        autoBind(this);
        this._setOptions(options);
        return this;
    }
    /**
     * Cancel the tour
     * Triggers the `cancel` event
     */
    cancel() {
        this.tour.cancel();
        this.trigger('cancel');
    }
    /**
     * Complete the tour
     * Triggers the `complete` event
     */
    complete() {
        this.tour.complete();
        this.trigger('complete');
    }
    /**
     * Remove the step, delete the step's element, and destroy the FloatingUI instance for the step.
     * Triggers `destroy` event
     */
    destroy() {
        destroyTooltip(this);
        if (isHTMLElement$1(this.el)) {
            this.el.remove();
            this.el = null;
        }
        this._updateStepTargetOnHide();
        this.trigger('destroy');
    }
    /**
     * Returns the tour for the step
     * @return The tour instance
     */
    getTour() {
        return this.tour;
    }
    /**
     * Hide the step
     */
    hide() {
        // @ts-expect-error TODO: investigate once Svelte is typed to use Modal component
        this.tour.modal?.hide();
        this.trigger('before-hide');
        if (this.el) {
            this.el.hidden = true;
        }
        this._updateStepTargetOnHide();
        this.trigger('hide');
    }
    /**
     * Resolves attachTo options.
     * @returns {{}|{element, on}}
     */
    _resolveAttachToOptions() {
        this._resolvedAttachTo = parseAttachTo(this);
        return this._resolvedAttachTo;
    }
    /**
     * A selector for resolved attachTo options.
     * @returns {{}|{element, on}}
     * @private
     */
    _getResolvedAttachToOptions() {
        if (this._resolvedAttachTo === null) {
            return this._resolveAttachToOptions();
        }
        return this._resolvedAttachTo;
    }
    /**
     * Check if the step is open and visible
     * @return True if the step is open and visible
     */
    isOpen() {
        return Boolean(this.el && !this.el.hidden);
    }
    /**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     */
    show() {
        if (isFunction(this.options.beforeShowPromise)) {
            return Promise.resolve(this.options.beforeShowPromise()).then(() => this._show());
        }
        return Promise.resolve(this._show());
    }
    /**
     * Updates the options of the step.
     *
     * @param {StepOptions} options The options for the step
     */
    updateStepOptions(options) {
        Object.assign(this.options, options);
        // @ts-expect-error TODO: get types for Svelte components
        if (this.shepherdElementComponent) {
            // @ts-expect-error TODO: get types for Svelte components
            this.shepherdElementComponent.$set({ step: this });
        }
    }
    /**
     * Returns the element for the step
     * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if it has been destroyed
     */
    getElement() {
        return this.el;
    }
    /**
     * Returns the target for the step
     * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if query string has not been found
     */
    getTarget() {
        return this.target;
    }
    /**
     * Creates Shepherd element for step based on options
     *
     * @return {HTMLElement} The DOM element for the step tooltip
     * @private
     */
    _createTooltipContent() {
        const descriptionId = `${this.id}-description`;
        const labelId = `${this.id}-label`;
        // @ts-expect-error TODO: get types for Svelte components
        this.shepherdElementComponent = new Shepherd_element({
            target: this.tour.options.stepsContainer || document.body,
            props: {
                classPrefix: this.classPrefix,
                descriptionId,
                labelId,
                step: this,
                // @ts-expect-error TODO: investigate where styles comes from
                styles: this.styles
            }
        });
        // @ts-expect-error TODO: get types for Svelte components
        return this.shepherdElementComponent.getElement();
    }
    /**
     * If a custom scrollToHandler is defined, call that, otherwise do the generic
     * scrollIntoView call.
     *
     * @param {boolean | ScrollIntoViewOptions} scrollToOptions - If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
     * @private
     */
    _scrollTo(scrollToOptions) {
        const { element } = this._getResolvedAttachToOptions();
        if (isFunction(this.options.scrollToHandler)) {
            this.options.scrollToHandler(element);
        }
        else if (isElement$1(element) &&
            typeof element.scrollIntoView === 'function') {
            element.scrollIntoView(scrollToOptions);
        }
    }
    /**
     * _getClassOptions gets all possible classes for the step
     * @param {StepOptions} stepOptions The step specific options
     * @returns {string} unique string from array of classes
     */
    _getClassOptions(stepOptions) {
        const defaultStepOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
        const stepClasses = stepOptions.classes ? stepOptions.classes : '';
        const defaultStepOptionsClasses = defaultStepOptions && defaultStepOptions.classes
            ? defaultStepOptions.classes
            : '';
        const allClasses = [
            ...stepClasses.split(' '),
            ...defaultStepOptionsClasses.split(' ')
        ];
        const uniqClasses = new Set(allClasses);
        return Array.from(uniqClasses).join(' ').trim();
    }
    /**
     * Sets the options for the step, maps `when` to events, sets up buttons
     * @param options - The options for the step
     */
    _setOptions(options = {}) {
        let tourOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
        tourOptions = deepmerge({}, tourOptions || {});
        this.options = Object.assign({
            arrow: true
        }, tourOptions, options, mergeTooltipConfig(tourOptions, options));
        const { when } = this.options;
        this.options.classes = this._getClassOptions(options);
        this.destroy();
        this.id = this.options.id || `step-${uuid()}`;
        if (when) {
            Object.keys(when).forEach((event) => {
                // @ts-expect-error TODO: fix this type error
                this.on(event, when[event], this);
            });
        }
    }
    /**
     * Create the element and set up the FloatingUI instance
     * @private
     */
    _setupElements() {
        if (!isUndefined(this.el)) {
            this.destroy();
        }
        this.el = this._createTooltipContent();
        if (this.options.advanceOn) {
            bindAdvance(this);
        }
        // The tooltip implementation details are handled outside of the Step
        // object.
        setupTooltip(this);
    }
    /**
     * Triggers `before-show`, generates the tooltip DOM content,
     * sets up a FloatingUI instance for the tooltip, then triggers `show`.
     * @private
     */
    _show() {
        this.trigger('before-show');
        // Force resolve to make sure the options are updated on subsequent shows.
        this._resolveAttachToOptions();
        this._setupElements();
        if (!this.tour.modal) {
            this.tour.setupModal();
        }
        // @ts-expect-error TODO: investigate once Svelte is typed to use Modal component
        this.tour.modal?.setupForStep(this);
        this._styleTargetElementForStep(this);
        if (this.el) {
            this.el.hidden = false;
        }
        // start scrolling to target before showing the step
        if (this.options.scrollTo) {
            setTimeout(() => {
                this._scrollTo(this.options.scrollTo);
            });
        }
        if (this.el) {
            this.el.hidden = false;
        }
        // @ts-expect-error TODO: get types for Svelte components
        const content = this.shepherdElementComponent.getElement();
        const target = this.target || document.body;
        target.classList.add(`${this.classPrefix}shepherd-enabled`);
        target.classList.add(`${this.classPrefix}shepherd-target`);
        content.classList.add('shepherd-enabled');
        this.trigger('show');
    }
    /**
     * Modulates the styles of the passed step's target element, based on the step's options and
     * the tour's `modal` option, to visually emphasize the element
     *
     * @param {Step} step The step object that attaches to the element
     * @private
     */
    _styleTargetElementForStep(step) {
        const targetElement = step.target;
        if (!targetElement) {
            return;
        }
        if (step.options.highlightClass) {
            targetElement.classList.add(step.options.highlightClass);
        }
        targetElement.classList.remove('shepherd-target-click-disabled');
        if (step.options.canClickTarget === false) {
            targetElement.classList.add('shepherd-target-click-disabled');
        }
    }
    /**
     * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
     * and 'shepherd-target' classes
     * @private
     */
    _updateStepTargetOnHide() {
        const target = this.target || document.body;
        if (this.options.highlightClass) {
            target.classList.remove(this.options.highlightClass);
        }
        target.classList.remove('shepherd-target-click-disabled', `${this.classPrefix}shepherd-enabled`, `${this.classPrefix}shepherd-target`);
    }
}

function getContext(window) {
    let context = {};
    if (window.navigator) {
        const userAgent = window.navigator.userAgent;
        context = {
            ...context,
            $os: os(window),
            $browser: browser(userAgent, window.navigator.vendor, !!window.opera),
            $referrer: window.document.referrer,
            $referring_domain: referringDomain(window.document.referrer),
            $device: device(userAgent),
            $current_url: window.location.href,
            $host: window.location.host,
            $pathname: window.location.pathname,
            $browser_version: browserVersion(userAgent, window.navigator.vendor, !!window.opera),
            $screen_height: window.screen.height,
            $screen_width: window.screen.width,
            $screen_dpr: window.devicePixelRatio
        };
    }
    context = {
        ...context,
        $lib: 'js',
        // $lib_version: version,
        $insert_id: Math.random().toString(36).substring(2, 10) +
            Math.random().toString(36).substring(2, 10),
        $time: new Date().getTime() / 1000 // epoch time in seconds
    };
    return context; // TODO: strip empty props?
}
function includes(haystack, needle) {
    return haystack.indexOf(needle) >= 0;
}
function browser(userAgent, vendor, opera) {
    vendor = vendor || ''; // vendor is undefined for at least IE9
    if (opera || includes(userAgent, ' OPR/')) {
        if (includes(userAgent, 'Mini')) {
            return 'Opera Mini';
        }
        return 'Opera';
    }
    else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
        return 'BlackBerry';
    }
    else if (includes(userAgent, 'IEMobile') ||
        includes(userAgent, 'WPDesktop')) {
        return 'Internet Explorer Mobile';
    }
    else if (includes(userAgent, 'SamsungBrowser/')) {
        // https://developer.samsung.com/internet/user-agent-string-format
        return 'Samsung Internet';
    }
    else if (includes(userAgent, 'Edge') || includes(userAgent, 'Edg/')) {
        return 'Microsoft Edge';
    }
    else if (includes(userAgent, 'FBIOS')) {
        return 'Facebook Mobile';
    }
    else if (includes(userAgent, 'Chrome')) {
        return 'Chrome';
    }
    else if (includes(userAgent, 'CriOS')) {
        return 'Chrome iOS';
    }
    else if (includes(userAgent, 'UCWEB') || includes(userAgent, 'UCBrowser')) {
        return 'UC Browser';
    }
    else if (includes(userAgent, 'FxiOS')) {
        return 'Firefox iOS';
    }
    else if (includes(vendor, 'Apple')) {
        if (includes(userAgent, 'Mobile')) {
            return 'Mobile Safari';
        }
        return 'Safari';
    }
    else if (includes(userAgent, 'Android')) {
        return 'Android Mobile';
    }
    else if (includes(userAgent, 'Konqueror')) {
        return 'Konqueror';
    }
    else if (includes(userAgent, 'Firefox')) {
        return 'Firefox';
    }
    else if (includes(userAgent, 'MSIE') || includes(userAgent, 'Trident/')) {
        return 'Internet Explorer';
    }
    else if (includes(userAgent, 'Gecko')) {
        return 'Mozilla';
    }
    else {
        return '';
    }
}
function browserVersion(userAgent, vendor, opera) {
    const regexList = {
        'Internet Explorer Mobile': /rv:(\d+(\.\d+)?)/,
        'Microsoft Edge': /Edge?\/(\d+(\.\d+)?)/,
        Chrome: /Chrome\/(\d+(\.\d+)?)/,
        'Chrome iOS': /CriOS\/(\d+(\.\d+)?)/,
        'UC Browser': /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
        Safari: /Version\/(\d+(\.\d+)?)/,
        'Mobile Safari': /Version\/(\d+(\.\d+)?)/,
        Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
        Firefox: /Firefox\/(\d+(\.\d+)?)/,
        'Firefox iOS': /FxiOS\/(\d+(\.\d+)?)/,
        Konqueror: /Konqueror:(\d+(\.\d+)?)/,
        BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
        'Android Mobile': /android\s(\d+(\.\d+)?)/,
        'Samsung Internet': /SamsungBrowser\/(\d+(\.\d+)?)/,
        'Internet Explorer': /(rv:|MSIE )(\d+(\.\d+)?)/,
        Mozilla: /rv:(\d+(\.\d+)?)/
    };
    const browserString = browser(userAgent, vendor, opera);
    const regex = regexList[browserString] || undefined;
    if (regex === undefined) {
        return null;
    }
    const matches = userAgent.match(regex);
    if (!matches) {
        return null;
    }
    return parseFloat(matches[matches.length - 2]);
}
function os(window) {
    const a = window.navigator.userAgent;
    if (/Windows/i.test(a)) {
        if (/Phone/.test(a) || /WPDesktop/.test(a)) {
            return 'Windows Phone';
        }
        return 'Windows';
    }
    else if (/(iPhone|iPad|iPod)/.test(a)) {
        return 'iOS';
    }
    else if (/Android/.test(a)) {
        return 'Android';
    }
    else if (/(BlackBerry|PlayBook|BB10)/i.test(a)) {
        return 'BlackBerry';
    }
    else if (/Mac/i.test(a)) {
        return 'Mac OS X';
    }
    else if (/Linux/.test(a)) {
        return 'Linux';
    }
    else if (/CrOS/.test(a)) {
        return 'Chrome OS';
    }
    else {
        return '';
    }
}
function device(userAgent) {
    if (/Windows Phone/i.test(userAgent) || /WPDesktop/.test(userAgent)) {
        return 'Windows Phone';
    }
    else if (/iPad/.test(userAgent)) {
        return 'iPad';
    }
    else if (/iPod/.test(userAgent)) {
        return 'iPod Touch';
    }
    else if (/iPhone/.test(userAgent)) {
        return 'iPhone';
    }
    else if (/(BlackBerry|PlayBook|BB10)/i.test(userAgent)) {
        return 'BlackBerry';
    }
    else if (/Android/.test(userAgent)) {
        return 'Android';
    }
    else {
        return '';
    }
}
function referringDomain(referrer) {
    const split = referrer.split('/');
    if (split.length >= 3) {
        return split[2];
    }
    return '';
}

/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
function cleanupSteps(tour) {
    if (tour) {
        const { steps } = tour;
        steps.forEach((step) => {
            if (step.options &&
                step.options.canClickTarget === false &&
                step.options.attachTo) {
                if (isHTMLElement$1(step.target)) {
                    step.target.classList.remove('shepherd-target-click-disabled');
                }
            }
        });
    }
}

const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };
    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  });
  // Cache it for later retrieval.
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target);
      // Make tx.store return the only store in the transaction, or undefined if there are many.
      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    // Else transform whatever we get back.
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.
  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(this.request);
    };
  }
  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value);
  // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).
  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
  // Return the same value back if we're not going to transform it.
  return value;
}
function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value);
  // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.
  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value);
  // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = value => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
    });
  }
  if (blocked) {
    request.addEventListener('blocked', event => blocked(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    event.oldVersion, event.newVersion, event));
  }
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) {
      db.addEventListener('versionchange', event => blocking(event.oldVersion, event.newVersion, event));
    }
  }).catch(() => {});
  return openPromise;
}
const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }
  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
  // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function method(storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift());
    // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)
    return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps(oldTraps => _extends({}, oldTraps, {
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
const advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
  get(target, prop) {
    if (!advanceMethodProps.includes(prop)) return target[prop];
    let cachedFunc = methodMap[prop];
    if (!cachedFunc) {
      cachedFunc = methodMap[prop] = function (...args) {
        advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
      };
    }
    return cachedFunc;
  }
};
function iterate() {
  return _iterate.apply(this, arguments);
}
function _iterate() {
  _iterate = _wrapAsyncGenerator(function* (...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
      cursor = yield _awaitAsyncGenerator(cursor.openCursor(...args));
    }
    if (!cursor) return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
    reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while (cursor) {
      yield proxiedCursor;
      // If one of the advancing methods was not called, call continue().
      cursor = yield _awaitAsyncGenerator(advanceResults.get(proxiedCursor) || cursor.continue());
      advanceResults.delete(proxiedCursor);
    }
  });
  return _iterate.apply(this, arguments);
}
function isIteratorProp(target, prop) {
  return prop === Symbol.asyncIterator && instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor]) || prop === 'iterate' && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
}
replaceTraps(oldTraps => _extends({}, oldTraps, {
  get(target, prop, receiver) {
    if (isIteratorProp(target, prop)) return iterate;
    return oldTraps.get(target, prop, receiver);
  },
  has(target, prop) {
    return isIteratorProp(target, prop) || oldTraps.has(target, prop);
  }
}));

class DataRequest {
    constructor(apiKey, apiPath, properties) {
        if (!apiKey) {
            throw new Error('Shepherd Pro: Missing required apiKey option.');
        }
        if (!apiPath) {
            throw new Error('Shepherd Pro: Missing required apiPath option.');
        }
        this.apiKey = apiKey;
        this.apiPath = apiPath;
        this.properties = properties;
    }
    /**
     * Gets a list of the state for all the tours associated with a given apiKey
     */
    async getTourState() {
        try {
            const response = await fetch(`${this.apiPath}/api/v1/state`, {
                headers: {
                    Authorization: `ApiKey ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Could not fetch state for tours 🐑');
            }
            const { data } = await response.json();
            this.tourStateDb = await openDB('TourState', 1, {
                upgrade(db) {
                    db.createObjectStore('tours', {
                        keyPath: 'uniqueId'
                    });
                }
            });
            if (Array.isArray(data) && data.length) {
                const tx = this.tourStateDb.transaction('tours', 'readwrite');
                const tourAddTxs = data.map((tourState) => {
                    return tx.store.put(tourState);
                });
                await Promise.all([...tourAddTxs, tx.done]);
            }
        }
        catch (error) {
            throw new Error('Error fetching data: ' +
                (error instanceof Error ? error.message : 'Unknown error'));
        }
    }
    /**
     * Send events to the ShepherdPro API
     * @param body The data to send for the event
     */
    async sendEvents(body) {
        body.data['properties'] = this.properties;
        try {
            const response = await fetch(`${this.apiPath}/api/v1/actor`, {
                headers: {
                    Authorization: `ApiKey ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error('Could not create an event 🐑');
            }
            const { data } = (await response.json());
            return data;
        }
        catch (error) {
            throw new Error('Error fetching data: ' +
                (error instanceof Error ? error.message : 'Unknown error'));
        }
    }
}

/**
 * Generates the svg path data for a rounded rectangle overlay
 * @param dimension - Dimensions of rectangle.
 * @param dimension.width - Width.
 * @param dimension.height - Height.
 * @param dimension.x - Offset from top left corner in x axis. default 0.
 * @param dimension.y - Offset from top left corner in y axis. default 0.
 * @param dimension.r - Corner Radius. Keep this smaller than half of width or height.
 * @returns Rounded rectangle overlay path data.
 */
function makeOverlayPath({ width, height, x = 0, y = 0, r = 0 }) {
    const { innerWidth: w, innerHeight: h } = window;
    const { topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0 } = typeof r === 'number'
        ? { topLeft: r, topRight: r, bottomRight: r, bottomLeft: r }
        : r;
    return `M${w},${h}\
H0\
V0\
H${w}\
V${h}\
Z\
M${x + topLeft},${y}\
a${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
V${height + y - bottomLeft}\
a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
H${width + x - bottomRight}\
a${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
V${y + topRight}\
a${topRight},${topRight},0,0,0-${topRight}-${topRight}\
Z`;
}

/* src/components/shepherd-modal.svelte generated by Svelte v4.2.15 */
function create_fragment(ctx) {
  let svg;
  let path;
  let svg_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      svg = svg_element("svg");
      path = svg_element("path");
      attr(path, "d", /*pathDefinition*/ctx[2]);
      attr(svg, "class", svg_class_value = `${/*modalIsVisible*/ctx[1] ? 'shepherd-modal-is-visible' : ''} shepherd-modal-overlay-container`);
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, path);
      /*svg_binding*/
      ctx[11](svg);
      if (!mounted) {
        dispose = listen(svg, "touchmove", /*_preventModalOverlayTouch*/ctx[3]);
        mounted = true;
      }
    },
    p(ctx, [dirty]) {
      if (dirty & /*pathDefinition*/4) {
        attr(path, "d", /*pathDefinition*/ctx[2]);
      }
      if (dirty & /*modalIsVisible*/2 && svg_class_value !== (svg_class_value = `${/*modalIsVisible*/ctx[1] ? 'shepherd-modal-is-visible' : ''} shepherd-modal-overlay-container`)) {
        attr(svg, "class", svg_class_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }

      /*svg_binding*/
      ctx[11](null);
      mounted = false;
      dispose();
    }
  };
}
function _getScrollParent(element) {
  if (!element) {
    return null;
  }
  const isHtmlElement = element instanceof HTMLElement;
  const overflowY = isHtmlElement && window.getComputedStyle(element).overflowY;
  const isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';
  if (isScrollable && element.scrollHeight >= element.clientHeight) {
    return element;
  }
  return _getScrollParent(element.parentElement);
}

/**
 * Get the top and left offset required to position the modal overlay cutout
 * when the target element is within an iframe
 * @param {HTMLElement} element The target element
 * @private
 */
function _getIframeOffset(element) {
  let offset = {
    top: 0,
    left: 0
  };
  if (!element) {
    return offset;
  }
  let targetWindow = element.ownerDocument.defaultView;
  while (targetWindow !== window.top) {
    var _targetWindow;
    const targetIframe = (_targetWindow = targetWindow) == null ? void 0 : _targetWindow.frameElement;
    if (targetIframe) {
      var _targetIframeRect$scr, _targetIframeRect$scr2;
      const targetIframeRect = targetIframe.getBoundingClientRect();
      offset.top += targetIframeRect.top + ((_targetIframeRect$scr = targetIframeRect.scrollTop) != null ? _targetIframeRect$scr : 0);
      offset.left += targetIframeRect.left + ((_targetIframeRect$scr2 = targetIframeRect.scrollLeft) != null ? _targetIframeRect$scr2 : 0);
    }
    targetWindow = targetWindow.parent;
  }
  return offset;
}

/**
 * Get the visible height of the target element relative to its scrollParent.
 * If there is no scroll parent, the height of the element is returned.
 *
 * @param {HTMLElement} element The target element
 * @param {HTMLElement} [scrollParent] The scrollable parent element
 * @returns {{y: number, height: number}}
 * @private
 */
function _getVisibleHeight(element, scrollParent) {
  const elementRect = element.getBoundingClientRect();
  let top = elementRect.y || elementRect.top;
  let bottom = elementRect.bottom || top + elementRect.height;
  if (scrollParent) {
    const scrollRect = scrollParent.getBoundingClientRect();
    const scrollTop = scrollRect.y || scrollRect.top;
    const scrollBottom = scrollRect.bottom || scrollTop + scrollRect.height;
    top = Math.max(top, scrollTop);
    bottom = Math.min(bottom, scrollBottom);
  }
  const height = Math.max(bottom - top, 0); // Default to 0 if height is negative
  return {
    y: top,
    height
  };
}
function instance($$self, $$props, $$invalidate) {
  let {
    element,
    openingProperties
  } = $$props;
  let modalIsVisible = false;
  let rafId = undefined;
  let pathDefinition;
  closeModalOpening();
  const getElement = () => element;
  function closeModalOpening() {
    $$invalidate(4, openingProperties = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      r: 0
    });
  }
  function hide() {
    $$invalidate(1, modalIsVisible = false);

    // Ensure we cleanup all event listeners when we hide the modal
    _cleanupStepEventListeners();
  }
  function positionModal(modalOverlayOpeningPadding = 0, modalOverlayOpeningRadius = 0, modalOverlayOpeningXOffset = 0, modalOverlayOpeningYOffset = 0, scrollParent, targetElement) {
    if (targetElement) {
      const {
        y,
        height
      } = _getVisibleHeight(targetElement, scrollParent);
      const {
        x,
        width,
        left
      } = targetElement.getBoundingClientRect();

      // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
      $$invalidate(4, openingProperties = {
        width: width + modalOverlayOpeningPadding * 2,
        height: height + modalOverlayOpeningPadding * 2,
        x: (x || left) + modalOverlayOpeningXOffset - modalOverlayOpeningPadding,
        y: y + modalOverlayOpeningYOffset - modalOverlayOpeningPadding,
        r: modalOverlayOpeningRadius
      });
    } else {
      closeModalOpening();
    }
  }
  function setupForStep(step) {
    // Ensure we move listeners from the previous step, before we setup new ones
    _cleanupStepEventListeners();
    if (step.tour.options.useModalOverlay) {
      _styleForStep(step);
      show();
    } else {
      hide();
    }
  }
  function show() {
    $$invalidate(1, modalIsVisible = true);
  }
  const _preventModalBodyTouch = e => {
    e.preventDefault();
  };
  const _preventModalOverlayTouch = e => {
    e.stopPropagation();
  };

  /**
  * Add touchmove event listener
  * @private
  */
  function _addStepEventListeners() {
    // Prevents window from moving on touch.
    window.addEventListener('touchmove', _preventModalBodyTouch, {
      passive: false
    });
  }

  /**
  * Cancel the requestAnimationFrame loop and remove touchmove event listeners
  * @private
  */
  function _cleanupStepEventListeners() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = undefined;
    }
    window.removeEventListener('touchmove', _preventModalBodyTouch, {
      passive: false
    });
  }

  /**
  * Style the modal for the step
  * @param {Step} step The step to style the opening for
  * @private
  */
  function _styleForStep(step) {
    const {
      modalOverlayOpeningPadding,
      modalOverlayOpeningRadius,
      modalOverlayOpeningXOffset = 0,
      modalOverlayOpeningYOffset = 0
    } = step.options;
    const iframeOffset = _getIframeOffset(step.target);
    const scrollParent = _getScrollParent(step.target);

    // Setup recursive function to call requestAnimationFrame to update the modal opening position
    const rafLoop = () => {
      rafId = undefined;
      positionModal(modalOverlayOpeningPadding, modalOverlayOpeningRadius, modalOverlayOpeningXOffset + iframeOffset.left, modalOverlayOpeningYOffset + iframeOffset.top, scrollParent, step.target);
      rafId = requestAnimationFrame(rafLoop);
    };
    rafLoop();
    _addStepEventListeners();
  }
  function svg_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      element = $$value;
      $$invalidate(0, element);
    });
  }
  $$self.$$set = $$props => {
    if ('element' in $$props) $$invalidate(0, element = $$props.element);
    if ('openingProperties' in $$props) $$invalidate(4, openingProperties = $$props.openingProperties);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*openingProperties*/16) {
      $$invalidate(2, pathDefinition = makeOverlayPath(openingProperties));
    }
  };
  return [element, modalIsVisible, pathDefinition, _preventModalOverlayTouch, openingProperties, getElement, closeModalOpening, hide, positionModal, setupForStep, show, svg_binding];
}
class Shepherd_modal extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      element: 0,
      openingProperties: 4,
      getElement: 5,
      closeModalOpening: 6,
      hide: 7,
      positionModal: 8,
      setupForStep: 9,
      show: 10
    });
  }
  get getElement() {
    return this.$$.ctx[5];
  }
  get closeModalOpening() {
    return this.$$.ctx[6];
  }
  get hide() {
    return this.$$.ctx[7];
  }
  get positionModal() {
    return this.$$.ctx[8];
  }
  get setupForStep() {
    return this.$$.ctx[9];
  }
  get show() {
    return this.$$.ctx[10];
  }
}

const SHEPHERD_DEFAULT_API = 'https://shepherdpro.com';
const SHEPHERD_USER_ID = 'shepherdPro:userId';
class ShepherdPro extends Evented {
    constructor() {
        super(...arguments);
        this.isProEnabled = false;
    }
    /**
     * Call init to take full advantage of ShepherdPro functionality
     * @param {string} apiKey The API key for your ShepherdPro account
     * @param {string} apiPath
     * @param {object} properties Extra properties to be passed to Shepherd Pro
     */
    async init(apiKey, apiPath, properties) {
        if (!apiKey) {
            throw new Error('Shepherd Pro: Missing required apiKey option.');
        }
        this.apiKey = apiKey;
        this.apiPath = apiPath ?? SHEPHERD_DEFAULT_API;
        this.properties = properties ?? {};
        this.properties['context'] = getContext(window);
        if (this.apiKey) {
            this.dataRequester = new DataRequest(this.apiKey, this.apiPath, this.properties);
            this.isProEnabled = true;
            // Setup actor before first tour is loaded if none exists
            const shepherdProId = localStorage.getItem(SHEPHERD_USER_ID);
            const promises = [this.dataRequester.getTourState()];
            if (!shepherdProId) {
                promises.push(this.createNewActor());
            }
            await Promise.all(promises);
        }
    }
    async createNewActor() {
        if (!this.dataRequester)
            return;
        // Setup type returns an actor
        const response = (await this.dataRequester.sendEvents({
            data: {
                currentUserId: null,
                eventType: 'setup'
            }
        }));
        localStorage.setItem(SHEPHERD_USER_ID, String(response.actorId));
    }
    /**
     * Checks if a given tour's id is enabled
     * @param tourId A string denoting the id of the tour
     */
    async isTourEnabled(tourId) {
        if (!this.dataRequester)
            return;
        const tourState = await this.dataRequester.tourStateDb?.get('tours', tourId);
        return tourState?.isActive ?? true;
    }
}
/**
 * Class representing the site tour
 * @extends {Evented}
 */
class Tour extends Evented {
    constructor(options = {}) {
        super();
        this.trackedEvents = ['active', 'cancel', 'complete', 'show'];
        autoBind(this);
        const defaultTourOptions = {
            exitOnEsc: true,
            keyboardNavigation: true
        };
        this.options = Object.assign({}, defaultTourOptions, options);
        this.classPrefix = normalizePrefix(this.options.classPrefix);
        this.steps = [];
        this.addSteps(this.options.steps);
        // Pass these events onto the global Shepherd object
        const events = [
            'active',
            'cancel',
            'complete',
            'inactive',
            'show',
            'start'
        ];
        events.map((event) => {
            ((e) => {
                this.on(e, (opts) => {
                    opts = opts || {};
                    opts['tour'] = this;
                    Shepherd.trigger(e, opts);
                });
            })(event);
        });
        this._setTourID(options.id);
        const { dataRequester } = Shepherd;
        // If we have an API key, then setup Pro features
        if (dataRequester) {
            this.trackedEvents.forEach((event) => this.on(event, (opts) => {
                const { tour } = opts;
                const { id, steps } = tour;
                let position;
                if (event !== 'active') {
                    const { step: currentStep } = opts;
                    if (currentStep) {
                        position =
                            steps.findIndex((step) => step.id === currentStep.id) + 1;
                    }
                }
                const data = {
                    currentUserId: localStorage.getItem(SHEPHERD_USER_ID),
                    eventType: event,
                    journeyData: {
                        id,
                        currentStep: position,
                        numberOfSteps: steps.length,
                        tourOptions: tour.options
                    }
                };
                dataRequester.sendEvents({ data });
            }));
        }
        return this;
    }
    /**
     * Adds a new step to the tour
     * @param {StepOptions} options - An object containing step options or a Step instance
     * @param {number | undefined} index - The optional index to insert the step at. If undefined, the step
     * is added to the end of the array.
     * @return The newly added step
     */
    addStep(options, index) {
        let step = options;
        if (!(step instanceof Step)) {
            step = new Step(this, step);
        }
        else {
            step.tour = this;
        }
        if (!isUndefined(index)) {
            this.steps.splice(index, 0, step);
        }
        else {
            this.steps.push(step);
        }
        return step;
    }
    /**
     * Add multiple steps to the tour
     * @param {Array<StepOptions> | Array<Step> | undefined} steps - The steps to add to the tour
     */
    addSteps(steps) {
        if (Array.isArray(steps)) {
            steps.forEach((step) => {
                this.addStep(step);
            });
        }
        return this;
    }
    /**
     * Go to the previous step in the tour
     */
    back() {
        const index = this.steps.indexOf(this.currentStep);
        this.show(index - 1, false);
    }
    /**
     * Calls _done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     * If `confirmCancel` is a function, will call it and wait for the return value,
     * and only cancel when the value returned is true
     */
    async cancel() {
        if (this.options.confirmCancel) {
            const cancelMessage = this.options.confirmCancelMessage ||
                'Are you sure you want to stop the tour?';
            let stopTour;
            if (isFunction(this.options.confirmCancel)) {
                stopTour = await this.options.confirmCancel();
            }
            else {
                stopTour = window.confirm(cancelMessage);
            }
            if (stopTour) {
                this._done('cancel');
            }
        }
        else {
            this._done('cancel');
        }
    }
    /**
     * Calls _done() triggering the `complete` event
     */
    complete() {
        this._done('complete');
    }
    /**
     * Gets the step from a given id
     * @param {number | string} id - The id of the step to retrieve
     * @return The step corresponding to the `id`
     */
    getById(id) {
        return this.steps.find((step) => {
            return step.id === id;
        });
    }
    /**
     * Gets the current step
     */
    getCurrentStep() {
        return this.currentStep;
    }
    /**
     * Hide the current step
     */
    hide() {
        const currentStep = this.getCurrentStep();
        if (currentStep) {
            return currentStep.hide();
        }
    }
    /**
     * Check if the tour is active
     */
    isActive() {
        return Shepherd.activeTour === this;
    }
    /**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */
    next() {
        const index = this.steps.indexOf(this.currentStep);
        if (index === this.steps.length - 1) {
            this.complete();
        }
        else {
            this.show(index + 1, true);
        }
    }
    /**
     * Removes the step from the tour
     * @param {string} name - The id for the step to remove
     */
    removeStep(name) {
        const current = this.getCurrentStep();
        // Find the step, destroy it and remove it from this.steps
        this.steps.some((step, i) => {
            if (step.id === name) {
                if (step.isOpen()) {
                    step.hide();
                }
                step.destroy();
                this.steps.splice(i, 1);
                return true;
            }
        });
        if (current && current.id === name) {
            this.currentStep = undefined;
            // If we have steps left, show the first one, otherwise just cancel the tour
            this.steps.length ? this.show(0) : this.cancel();
        }
    }
    /**
     * Show a specific step in the tour
     * @param {number | string} key - The key to look up the step by
     * @param {boolean} forward - True if we are going forward, false if backward
     */
    show(key = 0, forward = true) {
        const step = isString(key) ? this.getById(key) : this.steps[key];
        if (step) {
            this._updateStateBeforeShow();
            const shouldSkipStep = isFunction(step.options.showOn) && !step.options.showOn();
            // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal
            if (shouldSkipStep) {
                this._skipStep(step, forward);
            }
            else {
                this.trigger('show', {
                    step,
                    previous: this.currentStep
                });
                this.currentStep = step;
                step.show();
            }
        }
    }
    /**
     * Start the tour
     */
    async start() {
        // Check if ShepherdPro is enabled, and if so check if the tour id is active or not.
        if (Shepherd.isProEnabled &&
            !(await Shepherd.isTourEnabled(this.options.id))) {
            return;
        }
        this.trigger('start');
        // Save the focused element before the tour opens
        this.focusedElBeforeOpen = document.activeElement;
        this.currentStep = null;
        this.setupModal();
        this._setupActiveTour();
        this.next();
    }
    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param {string} event - The event name to trigger
     * @private
     */
    _done(event) {
        const index = this.steps.indexOf(this.currentStep);
        if (Array.isArray(this.steps)) {
            this.steps.forEach((step) => step.destroy());
        }
        cleanupSteps(this);
        this.trigger(event, { index });
        Shepherd.activeTour = null;
        this.trigger('inactive', { tour: this });
        if (this.modal) {
            // @ts-expect-error TODO: investigate once Svelte is typed
            this.modal.hide();
        }
        if (event === 'cancel' || event === 'complete') {
            if (this.modal) {
                const modalContainer = document.querySelector('.shepherd-modal-overlay-container');
                if (modalContainer) {
                    modalContainer.remove();
                    this.modal = null;
                }
            }
        }
        // Focus the element that was focused before the tour started
        if (isHTMLElement$1(this.focusedElBeforeOpen)) {
            this.focusedElBeforeOpen.focus();
        }
    }
    /**
     * Make this tour "active"
     */
    _setupActiveTour() {
        this.trigger('active', { tour: this });
        Shepherd.activeTour = this;
    }
    /**
     * setupModal create the modal container and instance
     */
    setupModal() {
        this.modal = new Shepherd_modal({
            target: this.options.modalContainer || document.body,
            props: {
                // @ts-expect-error TODO: investigate where styles comes from
                styles: this.styles
            }
        });
    }
    /**
     * Called when `showOn` evaluates to false, to skip the step or complete the tour if it's the last step
     * @param {Step} step - The step to skip
     * @param {boolean} forward - True if we are going forward, false if backward
     * @private
     */
    _skipStep(step, forward) {
        const index = this.steps.indexOf(step);
        if (index === this.steps.length - 1) {
            this.complete();
        }
        else {
            const nextIndex = forward ? index + 1 : index - 1;
            this.show(nextIndex, forward);
        }
    }
    /**
     * Before showing, hide the current step and if the tour is not
     * already active, call `this._setupActiveTour`.
     * @private
     */
    _updateStateBeforeShow() {
        if (this.currentStep) {
            this.currentStep.hide();
        }
        if (!this.isActive()) {
            this._setupActiveTour();
        }
    }
    /**
     * Sets this.id to a provided tourName and id or `${tourName}--${uuid}`
     * @param {string} optionsId - True if we are going forward, false if backward
     * @private
     */
    _setTourID(optionsId) {
        const tourName = this.options.tourName || 'tour';
        const tourId = optionsId || uuid();
        this.id = `${tourName}--${tourId}`;
    }
}
const Shepherd = new ShepherdPro();

const isServerSide = typeof window === 'undefined';
Shepherd.Step = (isServerSide ? StepNoOp : Step);
Shepherd.Tour = (isServerSide ? TourNoOp : Tour);

module.exports = Shepherd;
//# sourceMappingURL=shepherd.js.map
