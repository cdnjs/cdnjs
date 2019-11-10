/** Checks if value is string */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}
/**
  Direction
  @prop {string} NONE
  @prop {string} LEFT
  @prop {string} FORCE_LEFT
  @prop {string} RIGHT
  @prop {string} FORCE_RIGHT
*/

const DIRECTION = {
  NONE: 'NONE',
  LEFT: 'LEFT',
  FORCE_LEFT: 'FORCE_LEFT',
  RIGHT: 'RIGHT',
  FORCE_RIGHT: 'FORCE_RIGHT'
  /**
    Direction
    @enum {string}
  */

};

/** Returns next char index in direction */
function indexInDirection(pos, direction) {
  if (direction === DIRECTION.LEFT) --pos;
  return pos;
}
/** Returns next char position in direction */

function posInDirection(pos, direction) {
  switch (direction) {
    case DIRECTION.LEFT:
      return --pos;

    case DIRECTION.RIGHT:
    case DIRECTION.FORCE_RIGHT:
      return ++pos;

    default:
      return pos;
  }
}
/** */

function forceDirection(direction) {
  switch (direction) {
    case DIRECTION.LEFT:
      return DIRECTION.FORCE_LEFT;

    case DIRECTION.RIGHT:
      return DIRECTION.FORCE_RIGHT;

    default:
      return direction;
  }
}
/** Escapes regular expression control chars */

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
} // cloned from https://github.com/epoberezkin/fast-deep-equal with small changes

function objectIncludes(b, a) {
  if (a === b) return true;
  var arrA = Array.isArray(a),
      arrB = Array.isArray(b),
      i;

  if (arrA && arrB) {
    if (a.length != b.length) return false;

    for (i = 0; i < a.length; i++) if (!objectIncludes(a[i], b[i])) return false;

    return true;
  }

  if (arrA != arrB) return false;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;
    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;
    var keys = Object.keys(a); // if (keys.length !== Object.keys(b).length) return false;

    for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = 0; i < keys.length; i++) if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;

    return true;
  }

  return false;
}
/* eslint-disable no-undef */

const g = typeof window !== 'undefined' && window || typeof global !== 'undefined' && global.global === global && global || typeof self !== 'undefined' && self.self === self && self || {};
/* eslint-enable no-undef */

/** Selection range */

function _defineProperty(obj, key, value) {
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
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/** Provides details of changing input */

class ActionDetails {
  /** Current input value */

  /** Current cursor position */

  /** Old input value */

  /** Old selection */
  constructor(value, cursorPos, oldValue, oldSelection) {
    this.value = value;
    this.cursorPos = cursorPos;
    this.oldValue = oldValue;
    this.oldSelection = oldSelection; // double check if left part was changed (autofilling, other non-standard input triggers)

    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
      --this.oldSelection.start;
    }
  }
  /**
    Start changing position
    @readonly
  */


  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }
  /**
    Inserted symbols count
    @readonly
  */


  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }
  /**
    Inserted symbols
    @readonly
  */


  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }
  /**
    Removed symbols count
    @readonly
  */


  get removedCount() {
    // Math.max for opposite operation
    return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
    this.oldValue.length - this.value.length, 0);
  }
  /**
    Removed symbols
    @readonly
  */


  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }
  /**
    Unchanged head symbols
    @readonly
  */


  get head() {
    return this.value.substring(0, this.startChangePos);
  }
  /**
    Unchanged tail symbols
    @readonly
  */


  get tail() {
    return this.value.substring(this.startChangePos + this.insertedCount);
  }
  /**
    Remove direction
    @readonly
  */


  get removeDirection() {
    if (!this.removedCount || this.insertedCount) return DIRECTION.NONE; // align right if delete at right or if range removed (event with backspace)

    return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
  }

}

/**
  Provides details of changing model value
  @param {Object} [details]
  @param {string} [details.inserted] - Inserted symbols
  @param {boolean} [details.skip] - Can skip chars
  @param {number} [details.removeCount] - Removed symbols count
  @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
*/
class ChangeDetails {
  /** Inserted symbols */

  /** Can skip chars */

  /** Additional offset if any changes occurred before tail */

  /** Raw inserted is used by dynamic mask */
  constructor(details) {
    Object.assign(this, {
      inserted: '',
      rawInserted: '',
      skip: false,
      tailShift: 0
    }, details);
  }
  /**
    Aggregate changes
    @returns {ChangeDetails} `this`
  */


  aggregate(details) {
    this.rawInserted += details.rawInserted;
    this.skip = this.skip || details.skip;
    this.inserted += details.inserted;
    this.tailShift += details.tailShift;
    return this;
  }
  /** Total offset considering all changes */


  get offset() {
    return this.tailShift + this.inserted.length;
  }

}

/** Provides common masking stuff */
class Masked {
  // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

  /** @type {Mask} */

  /** */
  // $FlowFixMe TODO no ideas

  /** Transforms value before mask processing */

  /** Validates if value is acceptable */

  /** Does additional processing in the end of editing */

  /** */
  constructor(opts) {
    this._value = '';

    this._update(opts);

    this.isInitialized = true;
  }
  /** Sets and applies new options */


  updateOptions(opts) {
    this.withValueRefresh(this._update.bind(this, opts));
  }
  /**
    Sets new options
    @protected
  */


  _update(opts) {
    Object.assign(this, opts);
  }

  get state() {
    return {
      _value: this.value
    };
  }

  set state(state) {
    this._value = state._value;
  }
  /** Resets value */


  reset() {
    this._value = '';
  }
  /** */


  get value() {
    return this._value;
  }

  set value(value) {
    this.resolve(value);
  }
  /** Resolve new value */


  resolve(value) {
    this.reset();
    this.append(value, {
      input: true
    }, {
      value: ''
    });
    this.doCommit();
    return this.value;
  }
  /** */


  get unmaskedValue() {
    return this.value;
  }

  set unmaskedValue(value) {
    this.reset();
    this.append(value, {}, {
      value: ''
    });
    this.doCommit();
  }
  /** */


  get typedValue() {
    return this.unmaskedValue;
  }

  set typedValue(value) {
    this.unmaskedValue = value;
  }
  /** Value that includes raw user input */


  get rawInputValue() {
    return this.extractInput(0, this.value.length, {
      raw: true
    });
  }

  set rawInputValue(value) {
    this.reset();
    this.append(value, {
      raw: true
    }, {
      value: ''
    });
    this.doCommit();
  }
  /** */


  get isComplete() {
    return true;
  }
  /** Finds nearest input position in direction */


  nearestInputPos(cursorPos, direction) {
    return cursorPos;
  }
  /** Extracts value in range considering flags */


  extractInput(fromPos = 0, toPos = this.value.length, flags) {
    return this.value.slice(fromPos, toPos);
  }
  /** Extracts tail in range */


  extractTail(fromPos = 0, toPos = this.value.length) {
    return {
      value: this.extractInput(fromPos, toPos)
    };
  }
  /** Stores state before tail */


  _storeBeforeTailState() {
    this._beforeTailState = this.state;
  }
  /** Restores state before tail */


  _restoreBeforeTailState() {
    this.state = this._beforeTailState;
  }
  /** Resets state before tail */


  _resetBeforeTailState() {
    this._beforeTailState = null;
  }
  /** Appends tail */


  appendTail(tail) {
    return this.append(tail ? tail.value : '', {
      tail: true
    });
  }
  /** Appends char */


  _appendCharRaw(ch, flags = {}) {
    this._value += ch;
    return new ChangeDetails({
      inserted: ch,
      rawInserted: ch
    });
  }
  /** Appends char */


  _appendChar(ch, flags = {}, checkTail) {
    ch = this.doPrepare(ch, flags);
    if (!ch) return new ChangeDetails();
    const consistentState = this.state;

    const details = this._appendCharRaw(ch, flags);

    if (details.inserted) {
      let appended = this.doValidate(flags) !== false;

      if (appended && checkTail != null) {
        // validation ok, check tail
        this._storeBeforeTailState();

        const tailDetails = this.appendTail(checkTail);
        appended = tailDetails.rawInserted === checkTail.value; // if ok, rollback state after tail

        if (appended && tailDetails.inserted) this._restoreBeforeTailState();
      } // revert all if something went wrong


      if (!appended) {
        details.rawInserted = details.inserted = '';
        this.state = consistentState;
      }
    }

    return details;
  }
  /** Appends symbols considering flags */


  append(str, flags, tail) {
    const oldValueLength = this.value.length;
    const details = new ChangeDetails();

    for (let ci = 0; ci < str.length; ++ci) {
      details.aggregate(this._appendChar(str[ci], flags, tail));
    } // append tail but aggregate only tailShift


    if (tail != null) {
      this._storeBeforeTailState();

      details.tailShift += this.appendTail(tail).tailShift; // TODO it's a good idea to clear state after appending ends
      // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
      // this._resetBeforeTailState();
    }

    return details;
  }
  /** */


  remove(fromPos = 0, toPos = this.value.length) {
    this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
    return new ChangeDetails();
  }
  /** Calls function and reapplies current value */


  withValueRefresh(fn) {
    if (this._refreshing || !this.isInitialized) return fn();
    this._refreshing = true;
    const unmasked = this.unmaskedValue;
    const value = this.value;
    const ret = fn(); // try to update with raw value first to keep fixed chars

    if (this.resolve(value) !== value) {
      // or fallback to unmasked
      this.unmaskedValue = unmasked;
    }

    delete this._refreshing;
    return ret;
  }
  /**
    Prepares string before mask processing
    @protected
  */


  doPrepare(str, flags = {}) {
    return this.prepare ? this.prepare(str, this, flags) : str;
  }
  /**
    Validates if value is acceptable
    @protected
  */


  doValidate(flags) {
    return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
  }
  /**
    Does additional processing in the end of editing
    @protected
  */


  doCommit() {
    if (this.commit) this.commit(this.value, this);
  }
  /** */


  splice(start, deleteCount, inserted, removeDirection) {
    const tailPos = start + deleteCount;
    const tail = this.extractTail(tailPos);
    let startChangePos = this.nearestInputPos(start, removeDirection);
    const changeDetails = new ChangeDetails({
      tailShift: startChangePos - start // adjust tailShift if start was aligned

    }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
      input: true
    }, tail));
    return changeDetails;
  }

}

/** Get Masked class by mask type */
function maskedClass(mask) {
  if (mask == null) {
    throw new Error('mask property should be defined');
  }

  if (mask instanceof RegExp) return g.IMask.MaskedRegExp;
  if (isString(mask)) return g.IMask.MaskedPattern;
  if (mask instanceof Date || mask === Date) return g.IMask.MaskedDate;
  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return g.IMask.MaskedNumber;
  if (Array.isArray(mask) || mask === Array) return g.IMask.MaskedDynamic; // $FlowFixMe

  if (mask.prototype instanceof g.IMask.Masked) return mask; // $FlowFixMe

  if (mask instanceof Function) return g.IMask.MaskedFunction;
  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console

  return g.IMask.Masked;
}
/** Creates new {@link Masked} depending on mask type */

function createMask(opts) {
  opts = _objectSpread({}, opts);
  const mask = opts.mask;
  if (mask instanceof g.IMask.Masked) return mask;
  const MaskedClass = maskedClass(mask);
  return new MaskedClass(opts);
}

const DEFAULT_INPUT_DEFINITIONS = {
  '0': /\d/,
  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  // http://stackoverflow.com/a/22075070
  '*': /./
};
/** */

class PatternInputDefinition {
  /** */

  /** */

  /** */

  /** */

  /** */

  /** */
  constructor(opts) {
    const mask = opts.mask,
          blockOpts = _objectWithoutProperties(opts, ["mask"]);

    this.masked = createMask({
      mask
    });
    Object.assign(this, blockOpts);
  }

  reset() {
    this._isFilled = false;
    this.masked.reset();
  }

  remove(fromPos = 0, toPos = this.value.length) {
    if (fromPos === 0 && toPos >= 1) {
      this._isFilled = false;
      return this.masked.remove(fromPos, toPos);
    }

    return new ChangeDetails();
  }

  get value() {
    return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
  }

  get unmaskedValue() {
    return this.masked.unmaskedValue;
  }

  get isComplete() {
    return Boolean(this.masked.value) || this.isOptional;
  }

  _appendChar(str, flags = {}) {
    if (this._isFilled) return new ChangeDetails();
    const state = this.masked.state; // simulate input

    const details = this.masked._appendChar(str, flags);

    if (details.inserted && this.doValidate(flags) === false) {
      details.inserted = details.rawInserted = '';
      this.masked.state = state;
    }

    if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
      details.inserted = this.placeholderChar;
    }

    details.skip = !details.inserted && !this.isOptional;
    this._isFilled = Boolean(details.inserted);
    return details;
  }

  _appendPlaceholder() {
    const details = new ChangeDetails();
    if (this._isFilled || this.isOptional) return details;
    this._isFilled = true;
    details.inserted = this.placeholderChar;
    return details;
  }

  extractTail(...args) {
    return this.masked.extractTail(...args);
  }

  appendTail(...args) {
    return this.masked.appendTail(...args);
  }

  extractInput(fromPos = 0, toPos = this.value.length, flags) {
    return this.masked.extractInput(fromPos, toPos, flags);
  }

  nearestInputPos(cursorPos, direction = DIRECTION.NONE) {
    const minPos = 0;
    const maxPos = this.value.length;
    const boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

    switch (direction) {
      case DIRECTION.LEFT:
      case DIRECTION.FORCE_LEFT:
        return this.isComplete ? boundPos : minPos;

      case DIRECTION.RIGHT:
      case DIRECTION.FORCE_RIGHT:
        return this.isComplete ? boundPos : maxPos;

      case DIRECTION.NONE:
      default:
        return boundPos;
    }
  }

  doValidate(...args) {
    return this.masked.doValidate(...args) && (!this.parent || this.parent.doValidate(...args));
  }

  doCommit() {
    this.masked.doCommit();
  }

  get state() {
    return {
      masked: this.masked.state,
      _isFilled: this._isFilled
    };
  }

  set state(state) {
    this.masked.state = state.masked;
    this._isFilled = state._isFilled;
  }

}

class PatternFixedDefinition {
  /** */

  /** */

  /** */

  /** */
  constructor(opts) {
    Object.assign(this, opts);
    this._value = '';
  }

  get value() {
    return this._value;
  }

  get unmaskedValue() {
    return this.isUnmasking ? this.value : '';
  }

  reset() {
    this._isRawInput = false;
    this._value = '';
  }

  remove(fromPos = 0, toPos = this._value.length) {
    this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
    if (!this._value) this._isRawInput = false;
    return new ChangeDetails();
  }

  nearestInputPos(cursorPos, direction = DIRECTION.NONE) {
    const minPos = 0;
    const maxPos = this._value.length;

    switch (direction) {
      case DIRECTION.LEFT:
      case DIRECTION.FORCE_LEFT:
        return minPos;

      case DIRECTION.NONE:
      case DIRECTION.RIGHT:
      case DIRECTION.FORCE_RIGHT:
      default:
        return maxPos;
    }
  }

  extractInput(fromPos = 0, toPos = this._value.length, flags = {}) {
    return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
  }

  get isComplete() {
    return true;
  }

  _appendChar(str, flags) {
    const details = new ChangeDetails();
    if (this._value) return details;
    const appended = this.char === str[0];
    const isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
    if (isResolved) details.rawInserted = this.char;
    this._value = details.inserted = this.char;
    this._isRawInput = isResolved && (flags.raw || flags.input);
    return details;
  }

  _appendPlaceholder() {
    const details = new ChangeDetails();
    if (this._value) return details;
    this._value = details.inserted = this.char;
    return details;
  }

  extractTail(fromPos = 0, toPos = this.value.length) {
    return {
      value: ''
    };
  }

  appendTail(tail) {
    return this._appendChar(tail ? tail.value : '', {
      tail: true
    });
  }

  doCommit() {}

  get state() {
    return {
      _value: this._value,
      _isRawInput: this._isRawInput
    };
  }

  set state(state) {
    Object.assign(this, state);
  }

}

class ChunksTailDetails {
  constructor(chunks) {
    this.chunks = chunks;
  }

  get value() {
    return this.chunks.map(c => c.value).join('');
  }

}

/**
  Pattern mask
  @param {Object} opts
  @param {Object} opts.blocks
  @param {Object} opts.definitions
  @param {string} opts.placeholderChar
  @param {boolean} opts.lazy
*/
class MaskedPattern extends Masked {
  /** */

  /** */

  /** Single char for empty input */

  /** Show placeholder only when needed */
  constructor(opts = {}) {
    // TODO type $Shape<MaskedPatternOptions>={} does not work
    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
    super(_objectSpread({}, MaskedPattern.DEFAULTS, opts));
  }
  /**
    @override
    @param {Object} opts
  */


  _update(opts = {}) {
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);

    super._update(opts);

    this._rebuildMask();
  }
  /** */


  _rebuildMask() {
    const defs = this.definitions;
    this._blocks = [];
    this._stops = [];
    this._maskedBlocks = {};
    let pattern = this.mask;
    if (!pattern || !defs) return;
    let unmaskingBlock = false;
    let optionalBlock = false;

    for (let i = 0; i < pattern.length; ++i) {
      if (this.blocks) {
        const p = pattern.slice(i);
        const bNames = Object.keys(this.blocks).filter(bName => p.indexOf(bName) === 0); // order by key length

        bNames.sort((a, b) => b.length - a.length); // use block name with max length

        const bName = bNames[0];

        if (bName) {
          const maskedBlock = createMask(_objectSpread({
            parent: this,
            lazy: this.lazy,
            placeholderChar: this.placeholderChar
          }, this.blocks[bName]));

          if (maskedBlock) {
            this._blocks.push(maskedBlock); // store block index


            if (!this._maskedBlocks[bName]) this._maskedBlocks[bName] = [];

            this._maskedBlocks[bName].push(this._blocks.length - 1);
          }

          i += bName.length - 1;
          continue;
        }
      }

      let char = pattern[i];
      let isInput = char in defs;

      if (char === MaskedPattern.STOP_CHAR) {
        this._stops.push(this._blocks.length);

        continue;
      }

      if (char === '{' || char === '}') {
        unmaskingBlock = !unmaskingBlock;
        continue;
      }

      if (char === '[' || char === ']') {
        optionalBlock = !optionalBlock;
        continue;
      }

      if (char === MaskedPattern.ESCAPE_CHAR) {
        ++i;
        char = pattern[i];
        if (!char) break;
        isInput = false;
      }

      let def;

      if (isInput) {
        def = new PatternInputDefinition({
          parent: this,
          lazy: this.lazy,
          placeholderChar: this.placeholderChar,
          mask: defs[char],
          isOptional: optionalBlock
        });
      } else {
        def = new PatternFixedDefinition({
          char,
          isUnmasking: unmaskingBlock
        });
      }

      this._blocks.push(def);
    }
  }
  /**
    @override
  */


  get state() {
    return _objectSpread({}, super.state, {
      _blocks: this._blocks.map(b => b.state)
    });
  }

  set state(state) {
    const _blocks = state._blocks,
          maskedState = _objectWithoutProperties(state, ["_blocks"]);

    this._blocks.forEach((b, bi) => b.state = _blocks[bi]);

    super.state = maskedState;
  }
  /**
    @override
  */


  _storeBeforeTailState() {
    this._blocks.forEach(b => {
      // $FlowFixMe _storeBeforeTailState is not exist in PatternBlock
      if (typeof b._storeBeforeTailState === 'function') {
        b._storeBeforeTailState();
      }
    });

    super._storeBeforeTailState();
  }
  /**
    @override
  */


  _restoreBeforeTailState() {
    this._blocks.forEach(b => {
      // $FlowFixMe _restoreBeforeTailState is not exist in PatternBlock
      if (typeof b._restoreBeforeTailState === 'function') {
        b._restoreBeforeTailState();
      }
    });

    super._restoreBeforeTailState();
  }
  /**
    @override
  */


  _resetBeforeTailState() {
    this._blocks.forEach(b => {
      // $FlowFixMe _resetBeforeTailState is not exist in PatternBlock
      if (typeof b._resetBeforeTailState === 'function') {
        b._resetBeforeTailState();
      }
    });

    super._resetBeforeTailState();
  }
  /**
    @override
  */


  reset() {
    super.reset();

    this._blocks.forEach(b => b.reset());
  }
  /**
    @override
  */


  get isComplete() {
    return this._blocks.every(b => b.isComplete);
  }
  /**
    @override
  */


  doCommit() {
    this._blocks.forEach(b => b.doCommit());

    super.doCommit();
  }
  /**
    @override
  */


  get unmaskedValue() {
    return this._blocks.reduce((str, b) => str += b.unmaskedValue, '');
  }

  set unmaskedValue(unmaskedValue) {
    super.unmaskedValue = unmaskedValue;
  }
  /**
    @override
  */


  get value() {
    // TODO return _value when not in change?
    return this._blocks.reduce((str, b) => str += b.value, '');
  }

  set value(value) {
    super.value = value;
  }
  /**
    @override
  */


  appendTail(tail) {
    const details = new ChangeDetails();

    if (tail) {
      details.aggregate(tail instanceof ChunksTailDetails ? this._appendTailChunks(tail.chunks) : super.appendTail(tail));
    }

    return details.aggregate(this._appendPlaceholder());
  }
  /**
    @override
  */


  _appendCharRaw(ch, flags = {}) {
    const blockData = this._mapPosToBlock(this.value.length);

    const details = new ChangeDetails();
    if (!blockData) return details;

    for (let bi = blockData.index;; ++bi) {
      const block = this._blocks[bi];
      if (!block) break;

      const blockDetails = block._appendChar(ch, flags);

      const skip = blockDetails.skip;
      details.aggregate(blockDetails);
      if (skip || blockDetails.rawInserted) break; // go next char
    }

    return details;
  }
  /** Appends chunks splitted by stop chars */


  _appendTailChunks(chunks) {
    const details = new ChangeDetails();

    for (let ci = 0; ci < chunks.length && !details.skip; ++ci) {
      const chunk = chunks[ci];

      const lastBlock = this._mapPosToBlock(this.value.length);

      const chunkBlock = chunk instanceof ChunksTailDetails && chunk.index != null && (!lastBlock || lastBlock.index <= chunk.index) && this._blocks[chunk.index];

      if (chunkBlock) {
        // $FlowFixMe we already check index above
        details.aggregate(this._appendPlaceholder(chunk.index));
        const tailDetails = chunkBlock.appendTail(chunk);
        tailDetails.skip = false; // always ignore skip, it will be set on last

        details.aggregate(tailDetails);
        this._value += tailDetails.inserted; // get not inserted chars

        const remainChars = chunk.value.slice(tailDetails.rawInserted.length);
        if (remainChars) details.aggregate(this.append(remainChars, {
          tail: true
        }));
      } else {
        const _ref = chunk,
              stop = _ref.stop,
              value = _ref.value;
        if (stop != null && this._stops.indexOf(stop) >= 0) details.aggregate(this._appendPlaceholder(stop));
        details.aggregate(this.append(value, {
          tail: true
        }));
      }
    }
    return details;
  }
  /**
    @override
  */


  extractTail(fromPos = 0, toPos = this.value.length) {
    return new ChunksTailDetails(this._extractTailChunks(fromPos, toPos));
  }
  /**
    @override
  */


  extractInput(fromPos = 0, toPos = this.value.length, flags = {}) {
    if (fromPos === toPos) return '';
    let input = '';

    this._forEachBlocksInRange(fromPos, toPos, (b, _, fromPos, toPos) => {
      input += b.extractInput(fromPos, toPos, flags);
    });

    return input;
  }
  /** Extracts chunks from input splitted by stop chars */


  _extractTailChunks(fromPos = 0, toPos = this.value.length) {
    if (fromPos === toPos) return [];
    const chunks = [];
    let lastChunk;

    this._forEachBlocksInRange(fromPos, toPos, (b, bi, fromPos, toPos) => {
      const blockChunk = b.extractTail(fromPos, toPos);
      let nearestStop;

      for (let si = 0; si < this._stops.length; ++si) {
        const stop = this._stops[si];
        if (stop <= bi) nearestStop = stop;else break;
      }

      if (blockChunk instanceof ChunksTailDetails) {
        // TODO append to lastChunk with same index
        if (nearestStop == null) {
          // try append floating chunks to existed lastChunk
          let headFloatChunksCount = blockChunk.chunks.length;

          for (let ci = 0; ci < blockChunk.chunks.length; ++ci) {
            if (blockChunk.chunks[ci].stop != null) {
              headFloatChunksCount = ci;
              break;
            }
          }

          const headFloatChunks = blockChunk.chunks.splice(0, headFloatChunksCount);
          headFloatChunks.filter(chunk => chunk.value).forEach(chunk => {
            if (lastChunk) lastChunk.value += chunk.value; // will flat nested chunks
            else lastChunk = {
                value: chunk.value
              };
          });
        } // if block chunk has stops


        if (blockChunk.chunks.length) {
          if (lastChunk) chunks.push(lastChunk);
          blockChunk.index = nearestStop;
          chunks.push(blockChunk); // we cant append to ChunksTailDetails, so just reset lastChunk to force adding new

          lastChunk = null;
        }
      } else {
        if (nearestStop != null) {
          // on middle chunks consider stop flag and do not consider value
          // add block even if it is empty
          if (lastChunk) chunks.push(lastChunk);
          blockChunk.stop = nearestStop;
        } else if (lastChunk) {
          lastChunk.value += blockChunk.value;
          return;
        }

        lastChunk = blockChunk;
      }
    });

    if (lastChunk && lastChunk.value) chunks.push(lastChunk);
    return chunks;
  }
  /** Appends placeholder depending on laziness */


  _appendPlaceholder(toBlockIndex) {
    const details = new ChangeDetails();
    if (this.lazy && toBlockIndex == null) return details;

    const startBlockData = this._mapPosToBlock(this.value.length);

    if (!startBlockData) return details;
    const startBlockIndex = startBlockData.index;
    const endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

    this._blocks.slice(startBlockIndex, endBlockIndex).forEach(b => {
      if (typeof b._appendPlaceholder === 'function') {
        // $FlowFixMe `_blocks` may not be present
        const args = b._blocks != null ? [b._blocks.length] : [];

        const bDetails = b._appendPlaceholder.apply(b, args);

        this._value += bDetails.inserted;
        details.aggregate(bDetails);
      }
    });

    return details;
  }
  /** Finds block in pos */


  _mapPosToBlock(pos) {
    let accVal = '';

    for (let bi = 0; bi < this._blocks.length; ++bi) {
      const block = this._blocks[bi];
      const blockStartPos = accVal.length;
      accVal += block.value;

      if (pos <= accVal.length) {
        return {
          index: bi,
          offset: pos - blockStartPos
        };
      }
    }
  }

  _blockStartPos(blockIndex) {
    return this._blocks.slice(0, blockIndex).reduce((pos, b) => pos += b.value.length, 0);
  }

  _forEachBlocksInRange(fromPos, toPos = this.value.length, fn) {
    const fromBlock = this._mapPosToBlock(fromPos);

    if (fromBlock) {
      const toBlock = this._mapPosToBlock(toPos); // process first block


      const isSameBlock = toBlock && fromBlock.index === toBlock.index;
      const fromBlockRemoveBegin = fromBlock.offset;
      const fromBlockRemoveEnd = toBlock && isSameBlock ? toBlock.offset : undefined;
      fn(this._blocks[fromBlock.index], fromBlock.index, fromBlockRemoveBegin, fromBlockRemoveEnd);

      if (toBlock && !isSameBlock) {
        // process intermediate blocks
        for (let bi = fromBlock.index + 1; bi < toBlock.index; ++bi) {
          fn(this._blocks[bi], bi);
        } // process last block


        fn(this._blocks[toBlock.index], toBlock.index, 0, toBlock.offset);
      }
    }
  }
  /**
    @override
  */


  remove(fromPos = 0, toPos = this.value.length) {
    const removeDetails = super.remove(fromPos, toPos);

    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      removeDetails.aggregate(b.remove(bFromPos, bToPos));
    });

    return removeDetails;
  }
  /**
    @override
  */


  nearestInputPos(cursorPos, direction = DIRECTION.NONE) {
    // TODO refactor - extract alignblock
    const beginBlockData = this._mapPosToBlock(cursorPos) || {
      index: 0,
      offset: 0
    };
    const beginBlockOffset = beginBlockData.offset,
          beginBlockIndex = beginBlockData.index;
    const beginBlock = this._blocks[beginBlockIndex];
    if (!beginBlock) return cursorPos;
    let beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it

    if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
      beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
    }

    const cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
    const cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)

    if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
    const searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;

    if (direction === DIRECTION.NONE) {
      // NONE direction used to calculate start input position if no chars were removed
      // FOR NONE:
      // -
      // input|any
      // ->
      //  any|input
      // <-
      //  filled-input|any
      // check if first block at left is input
      if (searchBlockIndex > 0) {
        const blockIndexAtLeft = searchBlockIndex - 1;
        const blockAtLeft = this._blocks[blockIndexAtLeft];
        const blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE); // is input

        if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
          return this._blockStartPos(searchBlockIndex);
        }
      } // ->


      let firstInputAtRight = searchBlockIndex;

      for (let bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
        const block = this._blocks[bi];
        const blockInputPos = block.nearestInputPos(0, DIRECTION.NONE);

        if (blockInputPos !== block.value.length) {
          return this._blockStartPos(bi) + blockInputPos;
        }
      }

      return this.value.length; // // <-
      // for (let bi=Math.min(searchBlockIndex, this._blocks.length-1); bi >= 0; --bi) {
      //   const block = this._blocks[bi];
      //   const blockInputPos = block.nearestInputPos(block.value.length, DIRECTION.LEFT);
      //   if (blockInputPos !== 0) {
      //     return this._blockStartPos(bi) + blockInputPos;
      //   }
      // }
      // return 0;
    }

    if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
      // -
      //  any|filled-input
      // <-
      //  any|first not empty is not-len-aligned
      //  not-0-aligned|any
      // ->
      //  any|not-len-aligned or end
      // check if first block at right is filled input
      let firstFilledBlockIndexAtRight;

      for (let bi = searchBlockIndex; bi < this._blocks.length; ++bi) {
        if (this._blocks[bi].value) {
          firstFilledBlockIndexAtRight = bi;
          break;
        }
      }

      if (firstFilledBlockIndexAtRight != null) {
        const filledBlock = this._blocks[firstFilledBlockIndexAtRight];
        const blockInputPos = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);

        if (blockInputPos === 0 && filledBlock.unmaskedValue.length) {
          // filled block is input
          return this._blockStartPos(firstFilledBlockIndexAtRight) + blockInputPos;
        }
      } // <-
      // find this vars


      let firstFilledInputBlockIndex = -1;
      let firstEmptyInputBlockIndex; // TODO consider nested empty inputs

      for (let bi = searchBlockIndex - 1; bi >= 0; --bi) {
        const block = this._blocks[bi];
        const blockInputPos = block.nearestInputPos(block.value.length, DIRECTION.FORCE_LEFT);

        if (firstEmptyInputBlockIndex == null && (!block.value || blockInputPos !== 0)) {
          firstEmptyInputBlockIndex = bi;
        }

        if (blockInputPos !== 0) {
          if (blockInputPos !== block.value.length) {
            // aligned inside block - return immediately
            return this._blockStartPos(bi) + blockInputPos;
          } else {
            // found filled
            firstFilledInputBlockIndex = bi;
            break;
          }
        }
      }

      if (direction === DIRECTION.LEFT) {
        // try find first empty input before start searching position only when not forced
        for (let bi = firstFilledInputBlockIndex + 1; bi <= Math.min(searchBlockIndex, this._blocks.length - 1); ++bi) {
          const block = this._blocks[bi];
          const blockInputPos = block.nearestInputPos(0, DIRECTION.NONE);
          const blockAlignedPos = this._blockStartPos(bi) + blockInputPos; // if block is empty and last or not lazy input

          if ((!block.value.length && blockAlignedPos === this.value.length || blockInputPos !== block.value.length) && blockAlignedPos <= cursorPos) {
            return blockAlignedPos;
          }
        }
      } // process overflow


      if (firstFilledInputBlockIndex >= 0) {
        return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
      } // for lazy if has aligned left inside fixed and has came to the start - use start position


      if (direction === DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
        return 0;
      }

      if (firstEmptyInputBlockIndex != null) {
        return this._blockStartPos(firstEmptyInputBlockIndex);
      } // find first input


      for (let bi = searchBlockIndex; bi < this._blocks.length; ++bi) {
        const block = this._blocks[bi];
        const blockInputPos = block.nearestInputPos(0, DIRECTION.NONE); // is input

        if (!block.value.length || blockInputPos !== block.value.length) {
          return this._blockStartPos(bi) + blockInputPos;
        }
      }

      return 0;
    }

    if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
      // ->
      //  any|not-len-aligned and filled
      //  any|not-len-aligned
      // <-
      let firstInputBlockAlignedIndex;
      let firstInputBlockAlignedPos;

      for (let bi = searchBlockIndex; bi < this._blocks.length; ++bi) {
        const block = this._blocks[bi];
        const blockInputPos = block.nearestInputPos(0, DIRECTION.NONE);

        if (blockInputPos !== block.value.length) {
          firstInputBlockAlignedPos = this._blockStartPos(bi) + blockInputPos;
          firstInputBlockAlignedIndex = bi;
          break;
        }
      }

      if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
        for (let bi = firstInputBlockAlignedIndex; bi < this._blocks.length; ++bi) {
          const block = this._blocks[bi];
          const blockInputPos = block.nearestInputPos(0, DIRECTION.FORCE_RIGHT);

          if (blockInputPos !== block.value.length) {
            return this._blockStartPos(bi) + blockInputPos;
          }
        }

        return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
      }

      for (let bi = Math.min(searchBlockIndex, this._blocks.length - 1); bi >= 0; --bi) {
        const block = this._blocks[bi];
        const blockInputPos = block.nearestInputPos(block.value.length, DIRECTION.LEFT);

        if (blockInputPos !== 0) {
          const alignedPos = this._blockStartPos(bi) + blockInputPos;
          if (alignedPos >= cursorPos) return alignedPos;
          break;
        }
      }
    }

    return cursorPos;
  }
  /** Get block by name */


  maskedBlock(name) {
    return this.maskedBlocks(name)[0];
  }
  /** Get all blocks by name */


  maskedBlocks(name) {
    const indices = this._maskedBlocks[name];
    if (!indices) return [];
    return indices.map(gi => this._blocks[gi]);
  }

}
MaskedPattern.DEFAULTS = {
  lazy: true,
  placeholderChar: '_'
};
MaskedPattern.STOP_CHAR = '`';
MaskedPattern.ESCAPE_CHAR = '\\';
MaskedPattern.InputDefinition = PatternInputDefinition;
MaskedPattern.FixedDefinition = PatternFixedDefinition;

function isInput(block) {
  if (!block) return false;
  const value = block.value;
  return !value || block.nearestInputPos(0, DIRECTION.NONE) !== value.length;
}

/** Pattern which accepts ranges */

class MaskedRange extends MaskedPattern {
  /**
    Optionally sets max length of pattern.
    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
  */

  /** Min bound */

  /** Max bound */
  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  /**
    @override
  */


  _update(opts) {
    // TODO type
    let maxLength = String(opts.to).length;
    if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
    opts.maxLength = maxLength;
    const toStr = String(opts.to).padStart(maxLength, '0');
    const fromStr = String(opts.from).padStart(maxLength, '0');
    let sameCharsCount = 0;

    while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) ++sameCharsCount;

    opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);

    super._update(opts);
  }
  /**
    @override
  */


  get isComplete() {
    return super.isComplete && Boolean(this.value);
  }
  /**
    @override
  */


  doValidate(...args) {
    const str = this.value;
    let minstr = '';
    let maxstr = '';

    const _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
          _ref2 = _slicedToArray(_ref, 3),
          placeholder = _ref2[1],
          num = _ref2[2];

    if (num) {
      minstr = '0'.repeat(placeholder.length) + num;
      maxstr = '9'.repeat(placeholder.length) + num;
    }

    const firstNonZero = str.search(/[^0]/);
    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
    minstr = minstr.padEnd(this.maxLength, '0');
    maxstr = maxstr.padEnd(this.maxLength, '9');
    return this.from <= Number(maxstr) && Number(minstr) <= this.to && super.doValidate(...args);
  }

}

/** Date mask */

class MaskedDate extends MaskedPattern {
  /** Parse string to Date */

  /** Format Date to string */

  /** Pattern mask for date according to {@link MaskedDate#format} */

  /** Start date */

  /** End date */

  /**
    @param {Object} opts
  */
  constructor(opts) {
    super(_objectSpread({}, MaskedDate.DEFAULTS, opts));
  }
  /**
    @override
  */


  _update(opts) {
    if (opts.mask === Date) delete opts.mask;

    if (opts.pattern) {
      opts.mask = opts.pattern;
      delete opts.pattern;
    }

    const blocks = opts.blocks;
    opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); // adjust year block

    if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
    if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();

    if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
      opts.blocks.m.from = opts.min.getMonth() + 1;
      opts.blocks.m.to = opts.max.getMonth() + 1;

      if (opts.blocks.m.from === opts.blocks.m.to) {
        opts.blocks.d.from = opts.min.getDate();
        opts.blocks.d.to = opts.max.getDate();
      }
    }

    Object.assign(opts.blocks, blocks);

    super._update(opts);
  }
  /**
    @override
  */


  doValidate(...args) {
    const date = this.date;
    return super.doValidate(...args) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
  }
  /** Checks if date is exists */


  isDateExist(str) {
    return this.format(this.parse(str)) === str;
  }
  /** Parsed Date */


  get date() {
    return this.isComplete ? this.parse(this.value) : null;
  }

  set date(date) {
    this.value = this.format(date);
  }
  /**
    @override
  */


  get typedValue() {
    return this.date;
  }

  set typedValue(value) {
    this.date = value;
  }

}
MaskedDate.DEFAULTS = {
  pattern: 'd{.}`m{.}`Y',
  format: date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return [day, month, year].join('.');
  },
  parse: str => {
    const _str$split = str.split('.'),
          _str$split2 = _slicedToArray(_str$split, 3),
          day = _str$split2[0],
          month = _str$split2[1],
          year = _str$split2[2];

    return new Date(year, month - 1, day);
  }
};

MaskedDate.GET_DEFAULT_BLOCKS = () => {
  return {
    d: {
      mask: MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2
    },
    m: {
      mask: MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2
    },
    Y: {
      mask: MaskedRange,
      from: 1900,
      to: 9999
    }
  };
};

/**
  Generic element API to use with mask
  @interface
*/
class MaskElement {
  /** */

  /** */

  /** */

  /** Safely returns selection start */
  get selectionStart() {
    let start;

    try {
      start = this._unsafeSelectionStart;
    } catch (e) {}

    return start != null ? start : this.value.length;
  }
  /** Safely returns selection end */


  get selectionEnd() {
    let end;

    try {
      end = this._unsafeSelectionEnd;
    } catch (e) {}

    return end != null ? end : this.value.length;
  }
  /** Safely sets element selection */


  select(start, end) {
    if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;

    try {
      this._unsafeSelect(start, end);
    } catch (e) {}
  }
  /** Should be overriden in subclasses */


  _unsafeSelect(start, end) {}
  /** Should be overriden in subclasses */


  get isActive() {
    return false;
  }
  /** Should be overriden in subclasses */


  bindEvents(handlers) {}
  /** Should be overriden in subclasses */


  unbindEvents() {}

}

/** Bridge between HTMLElement and {@link Masked} */

class HTMLMaskElement extends MaskElement {
  /** Mapping between HTMLElement events and mask internal events */

  /** HTMLElement to use mask on */

  /**
    @param {HTMLInputElement|HTMLTextAreaElement} input
  */
  constructor(input) {
    super();
    this.input = input;
    this._handlers = {};
  }
  /**
    Is element in focus
    @readonly
  */


  get isActive() {
    return this.input === document.activeElement;
  }
  /**
    Returns HTMLElement selection start
    @override
  */


  get _unsafeSelectionStart() {
    return this.input.selectionStart;
  }
  /**
    Returns HTMLElement selection end
    @override
  */


  get _unsafeSelectionEnd() {
    return this.input.selectionEnd;
  }
  /**
    Sets HTMLElement selection
    @override
  */


  _unsafeSelect(start, end) {
    this.input.setSelectionRange(start, end);
  }
  /**
    HTMLElement value
    @override
  */


  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }
  /**
    Binds HTMLElement events to mask internal events
    @override
  */


  bindEvents(handlers) {
    Object.keys(handlers).forEach(event => this._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]));
  }
  /**
    Unbinds HTMLElement events to mask internal events
    @override
  */


  unbindEvents() {
    Object.keys(this._handlers).forEach(event => this._toggleEventHandler(event));
  }

  _toggleEventHandler(event, handler) {
    if (this._handlers[event]) {
      this.input.removeEventListener(event, this._handlers[event]);
      delete this._handlers[event];
    }

    if (handler) {
      this.input.addEventListener(event, handler);
      this._handlers[event] = handler;
    }
  }

}
HTMLMaskElement.EVENTS_MAP = {
  selectionChange: 'keydown',
  input: 'input',
  drop: 'drop',
  click: 'click',
  focus: 'focus',
  commit: 'change'
};

/** Listens to element events and controls changes between element and {@link Masked} */

class InputMask {
  /**
    View element
    @readonly
  */

  /**
    Internal {@link Masked} model
    @readonly
  */

  /**
    @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
    @param {Object} opts
  */
  constructor(el, opts) {
    this.el = el instanceof MaskElement ? el : new HTMLMaskElement(el);
    this.masked = createMask(opts);
    this._listeners = {};
    this._value = '';
    this._unmaskedValue = '';
    this._saveSelection = this._saveSelection.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this.alignCursor = this.alignCursor.bind(this);
    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);

    this._bindEvents(); // refresh


    this.updateValue();

    this._onChange();
  }
  /** Read or update mask */


  get mask() {
    return this.masked.mask;
  }

  set mask(mask) {
    if (mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate) return;

    if (this.masked.constructor === maskedClass(mask)) {
      this.masked.updateOptions({
        mask
      });
      return;
    }

    const masked = createMask({
      mask
    });
    masked.unmaskedValue = this.masked.unmaskedValue;
    this.masked = masked;
  }
  /** Raw value */


  get value() {
    return this._value;
  }

  set value(str) {
    this.masked.value = str;
    this.updateControl();
    this.alignCursor();
  }
  /** Unmasked value */


  get unmaskedValue() {
    return this._unmaskedValue;
  }

  set unmaskedValue(str) {
    this.masked.unmaskedValue = str;
    this.updateControl();
    this.alignCursor();
  }
  /** Typed unmasked value */


  get typedValue() {
    return this.masked.typedValue;
  }

  set typedValue(val) {
    this.masked.typedValue = val;
    this.updateControl();
    this.alignCursor();
  }
  /**
    Starts listening to element events
    @protected
  */


  _bindEvents() {
    this.el.bindEvents({
      selectionChange: this._saveSelection,
      input: this._onInput,
      drop: this._onDrop,
      click: this.alignCursorFriendly,
      focus: this.alignCursorFriendly,
      commit: this._onChange
    });
  }
  /**
    Stops listening to element events
    @protected
   */


  _unbindEvents() {
    this.el.unbindEvents();
  }
  /**
    Fires custom event
    @protected
   */


  _fireEvent(ev) {
    const listeners = this._listeners[ev];
    if (!listeners) return;
    listeners.forEach(l => l());
  }
  /**
    Current selection start
    @readonly
  */


  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }
  /** Current cursor position */


  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }

  set cursorPos(pos) {
    if (!this.el.isActive) return;
    this.el.select(pos, pos);

    this._saveSelection();
  }
  /**
    Stores current selection
    @protected
  */


  _saveSelection()
  /* ev */
  {
    if (this.value !== this.el.value) {
      console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
    }

    this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }
  /** Syncronizes model value from view */


  updateValue() {
    this.masked.value = this.el.value;
  }
  /** Syncronizes view from model value, fires change events */


  updateControl() {
    const newUnmaskedValue = this.masked.unmaskedValue;
    const newValue = this.masked.value;
    const isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
    this._unmaskedValue = newUnmaskedValue;
    this._value = newValue;
    if (this.el.value !== newValue) this.el.value = newValue;
    if (isChanged) this._fireChangeEvents();
  }
  /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */


  updateOptions(opts) {
    opts = _objectSpread({}, opts);
    this.mask = opts.mask;
    delete opts.mask; // check if changed

    if (!objectIncludes(this.masked, opts)) {
      this.masked.updateOptions(opts);
    }

    this.updateControl();
  }
  /** Updates cursor */


  updateCursor(cursorPos) {
    if (cursorPos == null) return;
    this.cursorPos = cursorPos; // also queue change cursor for mobile browsers

    this._delayUpdateCursor(cursorPos);
  }
  /**
    Delays cursor update to support mobile browsers
    @private
  */


  _delayUpdateCursor(cursorPos) {
    this._abortUpdateCursor();

    this._changingCursorPos = cursorPos;
    this._cursorChanging = setTimeout(() => {
      if (!this.el) return; // if was destroyed

      this.cursorPos = this._changingCursorPos;

      this._abortUpdateCursor();
    }, 10);
  }
  /**
    Fires custom events
    @protected
  */


  _fireChangeEvents() {
    this._fireEvent('accept');

    if (this.masked.isComplete) this._fireEvent('complete');
  }
  /**
    Aborts delayed cursor update
    @private
  */


  _abortUpdateCursor() {
    if (this._cursorChanging) {
      clearTimeout(this._cursorChanging);
      delete this._cursorChanging;
    }
  }
  /** Aligns cursor to nearest available position */


  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT);
  }
  /** Aligns cursor only if selection is empty */


  alignCursorFriendly() {
    if (this.selectionStart !== this.cursorPos) return;
    this.alignCursor();
  }
  /** Adds listener on custom event */


  on(ev, handler) {
    if (!this._listeners[ev]) this._listeners[ev] = [];

    this._listeners[ev].push(handler);

    return this;
  }
  /** Removes custom event listener */


  off(ev, handler) {
    if (!this._listeners[ev]) return;

    if (!handler) {
      delete this._listeners[ev];
      return;
    }

    const hIndex = this._listeners[ev].indexOf(handler);

    if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
    return this;
  }
  /** Handles view input event */


  _onInput() {
    this._abortUpdateCursor(); // fix strange IE behavior


    if (!this._selection) return this.updateValue();
    const details = new ActionDetails( // new state
    this.el.value, this.cursorPos, // old state
    this.value, this._selection);
    const offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset;
    const cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, details.removeDirection);
    this.updateControl();
    this.updateCursor(cursorPos);
  }
  /** Handles view change event and commits model value */


  _onChange() {
    if (this.value !== this.el.value) {
      this.updateValue();
    }

    this.masked.doCommit();
    this.updateControl();
  }
  /** Handles view drop event, prevents by default */


  _onDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  /** Unbind view events and removes element reference */


  destroy() {
    this._unbindEvents(); // $FlowFixMe why not do so?


    this._listeners.length = 0;
    delete this.el;
  }

}

/** Pattern which validates enum values */

class MaskedEnum extends MaskedPattern {
  /**
    @override
    @param {Object} opts
  */
  _update(opts) {
    // TODO type
    if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);

    super._update(opts);
  }
  /**
    @override
  */


  doValidate(...args) {
    return this.enum.some(e => e.indexOf(this.unmaskedValue) >= 0) && super.doValidate(...args);
  }

}

/**
  Number mask
  @param {Object} opts
  @param {string} opts.radix - Single char
  @param {string} opts.thousandsSeparator - Single char
  @param {Array<string>} opts.mapToRadix - Array of single chars
  @param {number} opts.min
  @param {number} opts.max
  @param {number} opts.scale - Digits after point
  @param {boolean} opts.signed - Allow negative
  @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
  @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
*/
class MaskedNumber extends Masked {
  /** Single char */

  /** Single char */

  /** Array of single chars */

  /** */

  /** */

  /** Digits after point */

  /** */

  /** Flag to remove leading and trailing zeros in the end of editing */

  /** Flag to pad trailing zeros after point in the end of editing */
  constructor(opts) {
    super(_objectSpread({}, MaskedNumber.DEFAULTS, opts));
  }
  /**
    @override
  */


  _update(opts) {
    super._update(opts);

    this._updateRegExps();
  }
  /** */


  _updateRegExps() {
    // use different regexp to process user input (more strict, input suffix) and tail shifting
    const start = '^';
    let midInput = '';
    let mid = '';

    if (this.allowNegative) {
      midInput += '([+|\\-]?|([+|\\-]?(0|([1-9]+\\d*))))';
      mid += '[+|\\-]?';
    } else {
      midInput += '(0|([1-9]+\\d*))';
    }

    mid += '\\d*';
    let end = (this.scale ? '(' + this.radix + '\\d{0,' + this.scale + '})?' : '') + '$';
    this._numberRegExpInput = new RegExp(start + midInput + end);
    this._numberRegExp = new RegExp(start + mid + end);
    this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
    this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
  }
  /**
    @override
  */


  extractTail(fromPos = 0, toPos = this.value.length) {
    const tail = super.extractTail(fromPos, toPos); // $FlowFixMe no ideas

    return _objectSpread({}, tail, {
      value: this._removeThousandsSeparators(tail.value)
    });
  }
  /** */


  _removeThousandsSeparators(value) {
    return value.replace(this._thousandsSeparatorRegExp, '');
  }
  /** */


  _insertThousandsSeparators(value) {
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    const parts = value.split(this.radix);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    return parts.join(this.radix);
  }
  /**
    @override
  */


  doPrepare(str, ...args) {
    return super.doPrepare(this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix)), ...args);
  }

  _separatorsCount(value = this._value) {
    let rawValueLength = this._removeThousandsSeparators(value).length;

    let valueWithSeparatorsLength = rawValueLength;

    for (let pos = 0; pos <= valueWithSeparatorsLength; ++pos) {
      if (this._value[pos] === this.thousandsSeparator) ++valueWithSeparatorsLength;
    }

    return valueWithSeparatorsLength - rawValueLength;
  }
  /**
    @override
  */


  _appendCharRaw(ch, flags = {}) {
    if (!this.thousandsSeparator) return super._appendCharRaw(ch, flags);

    const previousBeforeTailSeparatorsCount = this._separatorsCount(flags.tail && this._beforeTailState ? this._beforeTailState._value : this._value);

    this._value = this._removeThousandsSeparators(this.value);

    const appendDetails = super._appendCharRaw(ch, flags);

    this._value = this._insertThousandsSeparators(this._value);

    const beforeTailSeparatorsCount = this._separatorsCount(flags.tail && this._beforeTailState ? this._beforeTailState._value : this._value);

    appendDetails.tailShift += beforeTailSeparatorsCount - previousBeforeTailSeparatorsCount;
    return appendDetails;
  }
  /**
    @override
  */


  remove(fromPos = 0, toPos = this.value.length) {
    const valueBeforePos = this.value.slice(0, fromPos);
    const valueAfterPos = this.value.slice(toPos);

    const previousBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos);

    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));

    const beforeTailSeparatorsCount = this._separatorsCount(valueBeforePos);

    return new ChangeDetails({
      tailShift: beforeTailSeparatorsCount - previousBeforeTailSeparatorsCount
    });
  }
  /**
    @override
  */


  nearestInputPos(cursorPos, direction) {
    if (!direction) return cursorPos;
    const nextPos = indexInDirection(cursorPos, direction);
    if (this.value[nextPos] === this.thousandsSeparator) cursorPos = posInDirection(cursorPos, direction);
    return cursorPos;
  }
  /**
    @override
  */


  doValidate(flags) {
    const regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; // validate as string

    let valid = regexp.test(this._removeThousandsSeparators(this.value));

    if (valid) {
      // validate as number
      const number = this.number;
      valid = valid && !isNaN(number) && ( // check min bound for negative values
      this.min == null || this.min >= 0 || this.min <= this.number) && ( // check max bound for positive values
      this.max == null || this.max <= 0 || this.number <= this.max);
    }

    return valid && super.doValidate(flags);
  }
  /**
    @override
  */


  doCommit() {
    const number = this.number;
    let validnum = number; // check bounds

    if (this.min != null) validnum = Math.max(validnum, this.min);
    if (this.max != null) validnum = Math.min(validnum, this.max);
    if (validnum !== number) this.unmaskedValue = String(validnum);
    let formatted = this.value;
    if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
    if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
    this._value = this._insertThousandsSeparators(formatted);
    super.doCommit();
  }
  /** */


  _normalizeZeros(value) {
    const parts = this._removeThousandsSeparators(value).split(this.radix); // remove leading zeros


    parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, (match, sign, zeros, num) => sign + num); // add leading zero

    if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';

    if (parts.length > 1) {
      parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros

      if (!parts[1].length) parts.length = 1; // remove fractional
    }

    return this._insertThousandsSeparators(parts.join(this.radix));
  }
  /** */


  _padFractionalZeros(value) {
    if (!value) return value;
    const parts = value.split(this.radix);
    if (parts.length < 2) parts.push('');
    parts[1] = parts[1].padEnd(this.scale, '0');
    return parts.join(this.radix);
  }
  /**
    @override
  */


  get unmaskedValue() {
    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
  }

  set unmaskedValue(unmaskedValue) {
    super.unmaskedValue = unmaskedValue.replace('.', this.radix);
  }
  /** Parsed Number */


  get number() {
    return Number(this.unmaskedValue);
  }

  set number(number) {
    this.unmaskedValue = String(number);
  }
  /**
    @override
  */


  get typedValue() {
    return this.number;
  }

  set typedValue(value) {
    this.number = value;
  }
  /**
    Is negative allowed
    @readonly
  */


  get allowNegative() {
    return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
  }

}
MaskedNumber.DEFAULTS = {
  radix: ',',
  thousandsSeparator: '',
  mapToRadix: ['.'],
  scale: 2,
  signed: false,
  normalizeZeros: true,
  padFractionalZeros: false
};

/** Masking by RegExp */

class MaskedRegExp extends Masked {
  /**
    @override
    @param {Object} opts
  */
  _update(opts) {
    opts.validate = value => value.search(opts.mask) >= 0;

    super._update(opts);
  }

}

/** Masking by custom Function */

class MaskedFunction extends Masked {
  /**
    @override
    @param {Object} opts
  */
  _update(opts) {
    opts.validate = opts.mask;

    super._update(opts);
  }

}

/** Dynamic mask for choosing apropriate mask in run-time */
class MaskedDynamic extends Masked {
  /** Currently chosen mask */

  /** Compliled {@link Masked} options */

  /** Chooses {@link Masked} depending on input value */

  /**
    @param {Object} opts
  */
  constructor(opts) {
    super(_objectSpread({}, MaskedDynamic.DEFAULTS, opts));
    this.currentMask = null;
  }
  /**
    @override
  */


  _update(opts) {
    super._update(opts); // mask could be totally dynamic with only `dispatch` option


    this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => createMask(m)) : [];
  }
  /**
    @override
  */


  _appendCharRaw(...args) {
    const details = this._applyDispatch(...args);

    if (this.currentMask) {
      details.aggregate(this.currentMask._appendChar(...args));
    }

    return details;
  }
  /**
    @override
  */


  _storeBeforeTailState() {
    super._storeBeforeTailState();

    if (this.currentMask) this.currentMask._storeBeforeTailState();
  }
  /**
    @override
  */


  _restoreBeforeTailState() {
    super._restoreBeforeTailState();

    if (this.currentMask) this.currentMask._restoreBeforeTailState();
  }
  /**
    @override
  */


  _resetBeforeTailState() {
    super._resetBeforeTailState();

    if (this.currentMask) this.currentMask._resetBeforeTailState();
  }

  _applyDispatch(appended = '', flags = {}) {
    const prevValueBeforeTail = flags.tail && this._beforeTailState ? this._beforeTailState._value : this.value;
    const inputValue = this.rawInputValue;
    const insertValue = flags.tail && this._beforeTailState ? // $FlowFixMe - tired to fight with type system
    this._beforeTailState._rawInputValue : inputValue;
    const tailValue = inputValue.slice(insertValue.length);
    const prevMask = this.currentMask;
    const details = new ChangeDetails(); // dispatch SHOULD NOT modify mask

    this.currentMask = this.doDispatch(appended, flags); // restore state after dispatch

    if (this.currentMask && this.currentMask !== prevMask) {
      // if mask changed reapply input
      this.currentMask.reset(); // $FlowFixMe - it's ok, we don't change current mask above

      const d = this.currentMask.append(insertValue, {
        raw: true
      });
      details.tailShift = d.inserted.length - prevValueBeforeTail.length;

      this._storeBeforeTailState();

      if (tailValue) {
        // $FlowFixMe - it's ok, we don't change current mask above
        details.tailShift += this.currentMask.append(tailValue, {
          raw: true,
          tail: true
        }).tailShift;
      }
    }

    return details;
  }
  /**
  */


  doDispatch(appended, flags = {}) {
    return this.dispatch(appended, this, flags);
  }
  /**
    @override
  */


  doValidate(...args) {
    return super.doValidate(...args) && (!this.currentMask || this.currentMask.doValidate(...args));
  }
  /**
    @override
  */


  reset() {
    if (this.currentMask) this.currentMask.reset();
    this.compiledMasks.forEach(m => m.reset());
  }
  /**
    @override
  */


  get value() {
    return this.currentMask ? this.currentMask.value : '';
  }

  set value(value) {
    super.value = value;
  }
  /**
    @override
  */


  get unmaskedValue() {
    return this.currentMask ? this.currentMask.unmaskedValue : '';
  }

  set unmaskedValue(unmaskedValue) {
    super.unmaskedValue = unmaskedValue;
  }
  /**
    @override
  */


  get typedValue() {
    return this.currentMask ? this.currentMask.typedValue : '';
  } // probably typedValue should not be used with dynamic


  set typedValue(value) {
    let unmaskedValue = String(value); // double check it

    if (this.currentMask) {
      this.currentMask.typedValue = value;
      unmaskedValue = this.currentMask.unmaskedValue;
    }

    this.unmaskedValue = unmaskedValue;
  }
  /**
    @override
  */


  get isComplete() {
    return !!this.currentMask && this.currentMask.isComplete;
  }
  /**
    @override
  */


  remove(...args) {
    const details = new ChangeDetails();

    if (this.currentMask) {
      details.aggregate(this.currentMask.remove(...args)) // update with dispatch
      .aggregate(this._applyDispatch());
    }

    return details;
  }
  /**
    @override
  */


  get state() {
    return _objectSpread({}, super.state, {
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map(m => m.state),
      currentMaskRef: this.currentMask,
      currentMask: this.currentMask && this.currentMask.state
    });
  }

  set state(state) {
    const compiledMasks = state.compiledMasks,
          currentMaskRef = state.currentMaskRef,
          currentMask = state.currentMask,
          maskedState = _objectWithoutProperties(state, ["compiledMasks", "currentMaskRef", "currentMask"]);

    this.compiledMasks.forEach((m, mi) => m.state = compiledMasks[mi]);

    if (currentMaskRef != null) {
      this.currentMask = currentMaskRef;
      this.currentMask.state = currentMask;
    }

    super.state = maskedState;
  }
  /**
    @override
  */


  extractInput(...args) {
    return this.currentMask ? this.currentMask.extractInput(...args) : '';
  }
  /**
    @override
  */


  extractTail(...args) {
    return this.currentMask ? this.currentMask.extractTail(...args) : super.extractTail(...args);
  }
  /**
    @override
  */


  doCommit() {
    if (this.currentMask) this.currentMask.doCommit();
    super.doCommit();
  }
  /**
    @override
  */


  nearestInputPos(...args) {
    return this.currentMask ? this.currentMask.nearestInputPos(...args) : super.nearestInputPos(...args);
  }

}
MaskedDynamic.DEFAULTS = {
  dispatch: (appended, masked, flags) => {
    if (!masked.compiledMasks.length) return;
    const inputValue = masked.rawInputValue; // simulate input

    const inputs = masked.compiledMasks.map((m, index) => {
      const mState = m.state;
      m.rawInputValue = inputValue;
      m.append(appended, flags);
      const weight = m.rawInputValue.length;
      m.state = mState;
      return {
        weight,
        index
      };
    }); // pop masks with longer values first

    inputs.sort((i1, i2) => i2.weight - i1.weight);
    return masked.compiledMasks[inputs[0].index];
  }
};

/**
 * Applies mask on element.
 * @constructor
 * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
 * @param {Object} opts - Custom mask options
 * @return {InputMask}
 */

function IMask(el, opts = {}) {
  // currently available only for input-like elements
  return new InputMask(el, opts);
}
/** {@link InputMask} */

IMask.InputMask = InputMask;
/** {@link Masked} */

IMask.Masked = Masked;
/** {@link MaskedPattern} */

IMask.MaskedPattern = MaskedPattern;
/** {@link MaskedEnum} */

IMask.MaskedEnum = MaskedEnum;
/** {@link MaskedRange} */

IMask.MaskedRange = MaskedRange;
/** {@link MaskedNumber} */

IMask.MaskedNumber = MaskedNumber;
/** {@link MaskedDate} */

IMask.MaskedDate = MaskedDate;
/** {@link MaskedRegExp} */

IMask.MaskedRegExp = MaskedRegExp;
/** {@link MaskedFunction} */

IMask.MaskedFunction = MaskedFunction;
/** {@link MaskedDynamic} */

IMask.MaskedDynamic = MaskedDynamic;
/** {@link createMask} */

IMask.createMask = createMask;
/** {@link MaskElement} */

IMask.MaskElement = MaskElement;
/** {@link HTMLMaskElement} */

IMask.HTMLMaskElement = HTMLMaskElement;
g.IMask = IMask;

export default IMask;
//# sourceMappingURL=imask.es.js.map
