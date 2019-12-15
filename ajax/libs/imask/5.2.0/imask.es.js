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

var DIRECTION = {
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

    for (i = 0; i < a.length; i++) {
      if (!objectIncludes(a[i], b[i])) return false;
    }

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

    for (i = 0; i < keys.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }

    for (i = 0; i < keys.length; i++) {
      if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
    }

    return true;
  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }

  return false;
}
/* eslint-disable no-undef */

var g = typeof window !== 'undefined' && window || typeof global !== 'undefined' && global.global === global && global || typeof self !== 'undefined' && self.self === self && self || {};
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

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
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

/** Provides details of continuous extracted tail */
class ContinuousTailDetails {
  /** Tail value as string */

  /** Tail start position */

  /** Start position */
  constructor() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var stop = arguments.length > 2 ? arguments[2] : undefined;
    this.value = value;
    this.from = from;
    this.stop = stop;
  }

  toString() {
    return this.value;
  }

  extend(tail) {
    this.value += String(tail);
  }

  appendTo(masked) {
    return masked.append(this.toString(), {
      tail: true
    }).aggregate(masked._appendPlaceholder());
  }

  get state() {
    return {
      value: this.value,
      from: this.from,
      stop: this.stop
    };
  }

  set state(state) {
    Object.assign(this, state);
  }

  shiftBefore(pos) {
    if (this.from >= pos || !this.value.length) return '';
    var shiftChar = this.value[0];
    this.value = this.value.slice(1);
    return shiftChar;
  }

}

/** Provides common masking stuff */
class Masked {
  // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

  /** @type {Mask} */

  /** */
  // $FlowFixMe no ideas

  /** Transforms value before mask processing */

  /** Validates if value is acceptable */

  /** Does additional processing in the end of editing */

  /** Enable characters overwriting */

  /** */
  constructor(opts) {
    this._value = '';

    this._update(opts);

    this.isInitialized = true;
  }
  /** Sets and applies new options */


  updateOptions(opts) {
    if (!Object.keys(opts).length) return;
    this.withValueRefresh(this._update.bind(this, opts));
  }
  /**
    Sets new options
    @protected
  */


  _update(opts) {
    Object.assign(this, opts);
  }
  /** Mask state */


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
    }, '');
    this.doCommit();
    return this.value;
  }
  /** */


  get unmaskedValue() {
    return this.value;
  }

  set unmaskedValue(value) {
    this.reset();
    this.append(value, {}, '');
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
    }, '');
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


  extractInput() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    return this.value.slice(fromPos, toPos);
  }
  /** Extracts tail in range */


  extractTail() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
  }
  /** Appends tail */
  // $FlowFixMe no ideas


  appendTail(tail) {
    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
    return tail.appendTo(this);
  }
  /** Appends char */


  _appendCharRaw(ch) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    ch = this.doPrepare(ch, flags);
    if (!ch) return new ChangeDetails();
    this._value += ch;
    return new ChangeDetails({
      inserted: ch,
      rawInserted: ch
    });
  }
  /** Appends char */


  _appendChar(ch) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var checkTail = arguments.length > 2 ? arguments[2] : undefined;
    var consistentState = this.state;

    var details = this._appendCharRaw(ch, flags);

    if (details.inserted) {
      var consistentTail;
      var appended = this.doValidate(flags) !== false;

      if (appended && checkTail != null) {
        // validation ok, check tail
        var beforeTailState = this.state;

        if (this.overwrite) {
          consistentTail = checkTail.state;
          checkTail.shiftBefore(this.value.length);
        }

        var tailDetails = this.appendTail(checkTail);
        appended = tailDetails.rawInserted === checkTail.toString(); // if ok, rollback state after tail

        if (appended && tailDetails.inserted) this.state = beforeTailState;
      } // revert all if something went wrong


      if (!appended) {
        details.rawInserted = details.inserted = '';
        this.state = consistentState;
        if (checkTail && consistentTail) checkTail.state = consistentTail;
      }
    }

    return details;
  }
  /** Appends optional placeholder at end */


  _appendPlaceholder() {
    return new ChangeDetails();
  }
  /** Appends symbols considering flags */
  // $FlowFixMe no ideas


  append(str, flags, tail) {
    if (!isString(str)) throw new Error('value should be string');
    var details = new ChangeDetails();
    var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
    if (flags.tail) flags._beforeTailState = this.state;

    for (var ci = 0; ci < str.length; ++ci) {
      details.aggregate(this._appendChar(str[ci], flags, checkTail));
    } // append tail but aggregate only tailShift


    if (checkTail != null) {
      details.tailShift += this.appendTail(checkTail).tailShift; // TODO it's a good idea to clear state after appending ends
      // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
      // this._resetBeforeTailState();
    }

    return details;
  }
  /** */


  remove() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
    return new ChangeDetails();
  }
  /** Calls function and reapplies current value */


  withValueRefresh(fn) {
    if (this._refreshing || !this.isInitialized) return fn();
    this._refreshing = true;
    var unmasked = this.unmaskedValue;
    var value = this.value;
    var ret = fn(); // try to update with raw value first to keep fixed chars

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


  doPrepare(str) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
    var tailPos = start + deleteCount;
    var tail = this.extractTail(tailPos);
    var startChangePos = this.nearestInputPos(start, removeDirection);
    var changeDetails = new ChangeDetails({
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
  opts = _objectSpread2({}, opts);
  var mask = opts.mask;
  if (mask instanceof g.IMask.Masked) return mask;
  var MaskedClass = maskedClass(mask);
  return new MaskedClass(opts);
}

var DEFAULT_INPUT_DEFINITIONS = {
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
    var {
      mask
    } = opts,
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

  remove() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

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

  _appendChar(str) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this._isFilled) return new ChangeDetails();
    var state = this.masked.state; // simulate input

    var details = this.masked._appendChar(str, flags);

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

  append() {
    return this.masked.append(...arguments);
  }

  _appendPlaceholder() {
    var details = new ChangeDetails();
    if (this._isFilled || this.isOptional) return details;
    this._isFilled = true;
    details.inserted = this.placeholderChar;
    return details;
  }

  extractTail() {
    return this.masked.extractTail(...arguments);
  }

  appendTail() {
    return this.masked.appendTail(...arguments);
  }

  extractInput() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    var flags = arguments.length > 2 ? arguments[2] : undefined;
    return this.masked.extractInput(fromPos, toPos, flags);
  }

  nearestInputPos(cursorPos) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
    var minPos = 0;
    var maxPos = this.value.length;
    var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

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

  doValidate() {
    return this.masked.doValidate(...arguments) && (!this.parent || this.parent.doValidate(...arguments));
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

  remove() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
    this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
    if (!this._value) this._isRawInput = false;
    return new ChangeDetails();
  }

  nearestInputPos(cursorPos) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
    var minPos = 0;
    var maxPos = this._value.length;

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

  extractInput() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
    var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
  }

  get isComplete() {
    return true;
  }

  _appendChar(str) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var details = new ChangeDetails();
    if (this._value) return details;
    var appended = this.char === str[0];
    var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
    if (isResolved) details.rawInserted = this.char;
    this._value = details.inserted = this.char;
    this._isRawInput = isResolved && (flags.raw || flags.input);
    return details;
  }

  _appendPlaceholder() {
    var details = new ChangeDetails();
    if (this._value) return details;
    this._value = details.inserted = this.char;
    return details;
  }

  extractTail() {
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    return new ContinuousTailDetails('');
  } // $FlowFixMe no ideas


  appendTail(tail) {
    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
    return tail.appendTo(this);
  }

  append(str, flags, tail) {
    var details = this._appendChar(str, flags);

    if (tail != null) {
      details.tailShift += this.appendTail(tail).tailShift;
    }

    return details;
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
  /** */
  constructor() {
    var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    this.chunks = chunks;
    this.from = from;
  }

  toString() {
    return this.chunks.map(String).join('');
  } // $FlowFixMe no ideas


  extend(tailChunk) {
    if (!String(tailChunk)) return;
    if (isString(tailChunk)) tailChunk = new ContinuousTailDetails(String(tailChunk));
    var lastChunk = this.chunks[this.chunks.length - 1];
    var extendLast = lastChunk && ( // if stops are same or tail has no stop
    lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && // if tail chunk goes just after last chunk
    tailChunk.from === lastChunk.from + lastChunk.toString().length;

    if (tailChunk instanceof ContinuousTailDetails) {
      // check the ability to extend previous chunk
      if (extendLast) {
        // extend previous chunk
        lastChunk.extend(tailChunk.toString());
      } else {
        // append new chunk
        this.chunks.push(tailChunk);
      }
    } else if (tailChunk instanceof ChunksTailDetails) {
      if (tailChunk.stop == null) {
        // unwrap floating chunks to parent, keeping `from` pos
        var firstTailChunk;

        while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
          firstTailChunk = tailChunk.chunks.shift();
          firstTailChunk.from += tailChunk.from;
          this.extend(firstTailChunk);
        }
      } // if tail chunk still has value


      if (tailChunk.toString()) {
        // if chunks contains stops, then popup stop to container
        tailChunk.stop = tailChunk.blockIndex;
        this.chunks.push(tailChunk);
      }
    }
  }

  appendTo(masked) {
    if (!(masked instanceof g.IMask.MaskedPattern)) {
      var tail = new ContinuousTailDetails(this.toString());
      return tail.appendTo(masked);
    }

    var details = new ChangeDetails();

    for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
      var chunk = this.chunks[ci];

      var lastBlockIter = masked._mapPosToBlock(masked.value.length);

      var stop = chunk.stop;
      var chunkBlock = void 0;

      if (stop && ( // if block not found or stop is behind lastBlock
      !lastBlockIter || lastBlockIter.index <= stop)) {
        if (chunk instanceof ChunksTailDetails || // for continuous block also check if stop is exist
        masked._stops.indexOf(stop) >= 0) {
          details.aggregate(masked._appendPlaceholder(stop));
        }

        chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
      }

      if (chunkBlock) {
        var tailDetails = chunkBlock.appendTail(chunk);
        tailDetails.skip = false; // always ignore skip, it will be set on last

        details.aggregate(tailDetails);
        masked._value += tailDetails.inserted; // get not inserted chars

        var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
        if (remainChars) details.aggregate(masked.append(remainChars, {
          tail: true
        }));
      } else {
        details.aggregate(masked.append(chunk.toString(), {
          tail: true
        }));
      }
    }
    return details;
  }

  get state() {
    return {
      chunks: this.chunks.map(c => c.state),
      from: this.from,
      stop: this.stop,
      blockIndex: this.blockIndex
    };
  }

  set state(state) {
    var {
      chunks
    } = state,
        props = _objectWithoutProperties(state, ["chunks"]);

    Object.assign(this, props);
    this.chunks = chunks.map(cstate => {
      var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails(); // $FlowFixMe already checked above

      chunk.state = cstate;
      return chunk;
    });
  }

  shiftBefore(pos) {
    if (this.from >= pos || !this.chunks.length) return '';
    var chunkShiftPos = pos - this.from;
    var ci = 0;

    while (ci < this.chunks.length) {
      var chunk = this.chunks[ci];
      var shiftChar = chunk.shiftBefore(chunkShiftPos);

      if (chunk.toString()) {
        // chunk still contains value
        // but not shifted - means no more available chars to shift
        if (!shiftChar) break;
        ++ci;
      } else {
        // clean if chunk has no value
        this.chunks.splice(ci, 1);
      }

      if (shiftChar) return shiftChar;
    }

    return '';
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
  constructor() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO type $Shape<MaskedPatternOptions>={} does not work
    opts.definitions = Object.assign({}, DEFAULT_INPUT_DEFINITIONS, opts.definitions);
    super(_objectSpread2({}, MaskedPattern.DEFAULTS, {}, opts));
  }
  /**
    @override
    @param {Object} opts
  */


  _update() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);

    super._update(opts);

    this._rebuildMask();
  }
  /** */


  _rebuildMask() {
    var _this = this;

    var defs = this.definitions;
    this._blocks = [];
    this._stops = [];
    this._maskedBlocks = {};
    var pattern = this.mask;
    if (!pattern || !defs) return;
    var unmaskingBlock = false;
    var optionalBlock = false;

    for (var i = 0; i < pattern.length; ++i) {
      if (this.blocks) {
        var _ret = function () {
          var p = pattern.slice(i);
          var bNames = Object.keys(_this.blocks).filter(bName => p.indexOf(bName) === 0); // order by key length

          bNames.sort((a, b) => b.length - a.length); // use block name with max length

          var bName = bNames[0];

          if (bName) {
            var maskedBlock = createMask(_objectSpread2({
              parent: _this,
              lazy: _this.lazy,
              placeholderChar: _this.placeholderChar,
              overwrite: _this.overwrite
            }, _this.blocks[bName]));

            if (maskedBlock) {
              _this._blocks.push(maskedBlock); // store block index


              if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];

              _this._maskedBlocks[bName].push(_this._blocks.length - 1);
            }

            i += bName.length - 1;
            return "continue";
          }
        }();

        if (_ret === "continue") continue;
      }

      var char = pattern[i];

      var _isInput = char in defs;

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
        _isInput = false;
      }

      var def = _isInput ? new PatternInputDefinition({
        parent: this,
        lazy: this.lazy,
        placeholderChar: this.placeholderChar,
        mask: defs[char],
        isOptional: optionalBlock
      }) : new PatternFixedDefinition({
        char,
        isUnmasking: unmaskingBlock
      });

      this._blocks.push(def);
    }
  }
  /**
    @override
  */


  get state() {
    return _objectSpread2({}, super.state, {
      _blocks: this._blocks.map(b => b.state)
    });
  }

  set state(state) {
    var {
      _blocks
    } = state,
        maskedState = _objectWithoutProperties(state, ["_blocks"]);

    this._blocks.forEach((b, bi) => b.state = _blocks[bi]);

    super.state = maskedState;
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
    return super.appendTail(tail).aggregate(this._appendPlaceholder());
  }
  /**
    @override
  */


  _appendCharRaw(ch) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    ch = this.doPrepare(ch, flags);

    var blockIter = this._mapPosToBlock(this.value.length);

    var details = new ChangeDetails();
    if (!blockIter) return details;

    for (var bi = blockIter.index;; ++bi) {
      var _block = this._blocks[bi];
      if (!_block) break;

      var blockDetails = _block._appendChar(ch, flags);

      var skip = blockDetails.skip;
      details.aggregate(blockDetails);
      if (skip || blockDetails.rawInserted) break; // go next char
    }

    return details;
  }
  /**
    @override
  */


  extractTail() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    var chunkTail = new ChunksTailDetails();
    if (fromPos === toPos) return chunkTail;

    this._forEachBlocksInRange(fromPos, toPos, (b, bi, bFromPos, bToPos) => {
      var blockChunk = b.extractTail(bFromPos, bToPos);
      blockChunk.stop = this._findStopBefore(bi);
      blockChunk.from = this._blockStartPos(bi);
      if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
      chunkTail.extend(blockChunk);
    });

    return chunkTail;
  }
  /**
    @override
  */


  extractInput() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (fromPos === toPos) return '';
    var input = '';

    this._forEachBlocksInRange(fromPos, toPos, (b, _, fromPos, toPos) => {
      input += b.extractInput(fromPos, toPos, flags);
    });

    return input;
  }

  _findStopBefore(blockIndex) {
    var stopBefore;

    for (var si = 0; si < this._stops.length; ++si) {
      var stop = this._stops[si];
      if (stop <= blockIndex) stopBefore = stop;else break;
    }

    return stopBefore;
  }
  /** Appends placeholder depending on laziness */


  _appendPlaceholder(toBlockIndex) {
    var details = new ChangeDetails();
    if (this.lazy && toBlockIndex == null) return details;

    var startBlockIter = this._mapPosToBlock(this.value.length);

    if (!startBlockIter) return details;
    var startBlockIndex = startBlockIter.index;
    var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

    this._blocks.slice(startBlockIndex, endBlockIndex).forEach(b => {
      if (!b.lazy || toBlockIndex != null) {
        // $FlowFixMe `_blocks` may not be present
        var args = b._blocks != null ? [b._blocks.length] : [];

        var bDetails = b._appendPlaceholder(...args);

        this._value += bDetails.inserted;
        details.aggregate(bDetails);
      }
    });

    return details;
  }
  /** Finds block in pos */


  _mapPosToBlock(pos) {
    var accVal = '';

    for (var bi = 0; bi < this._blocks.length; ++bi) {
      var _block2 = this._blocks[bi];
      var blockStartPos = accVal.length;
      accVal += _block2.value;

      if (pos <= accVal.length) {
        return {
          index: bi,
          offset: pos - blockStartPos
        };
      }
    }
  }
  /** */


  _blockStartPos(blockIndex) {
    return this._blocks.slice(0, blockIndex).reduce((pos, b) => pos += b.value.length, 0);
  }
  /** */


  _forEachBlocksInRange(fromPos) {
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    var fn = arguments.length > 2 ? arguments[2] : undefined;

    var fromBlockIter = this._mapPosToBlock(fromPos);

    if (fromBlockIter) {
      var toBlockIter = this._mapPosToBlock(toPos); // process first block


      var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
      var fromBlockStartPos = fromBlockIter.offset;
      var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
      fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);

      if (toBlockIter && !isSameBlock) {
        // process intermediate blocks
        for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
          fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
        } // process last block


        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
      }
    }
  }
  /**
    @override
  */


  remove() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    var removeDetails = super.remove(fromPos, toPos);

    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      removeDetails.aggregate(b.remove(bFromPos, bToPos));
    });

    return removeDetails;
  }
  /**
    @override
  */


  nearestInputPos(cursorPos) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DIRECTION.NONE;
    // TODO refactor - extract alignblock
    var beginBlockData = this._mapPosToBlock(cursorPos) || {
      index: 0,
      offset: 0
    };
    var {
      offset: beginBlockOffset,
      index: beginBlockIndex
    } = beginBlockData;
    var beginBlock = this._blocks[beginBlockIndex];
    if (!beginBlock) return cursorPos;
    var beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it

    if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
      beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, forceDirection(direction));
    }

    var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
    var cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)

    if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
    var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;

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
        var blockIndexAtLeft = searchBlockIndex - 1;
        var blockAtLeft = this._blocks[blockIndexAtLeft];
        var blockInputPos = blockAtLeft.nearestInputPos(0, DIRECTION.NONE); // is input

        if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
          return this._blockStartPos(searchBlockIndex);
        }
      } // ->


      var firstInputAtRight = searchBlockIndex;

      for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
        var blockAtRight = this._blocks[bi];

        var _blockInputPos = blockAtRight.nearestInputPos(0, DIRECTION.NONE);

        if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
          return this._blockStartPos(bi) + _blockInputPos;
        }
      } // <-
      // find first non-fixed symbol


      for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
        var _block3 = this._blocks[_bi];

        var _blockInputPos2 = _block3.nearestInputPos(0, DIRECTION.NONE); // is input


        if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
          return this._blockStartPos(_bi) + _block3.value.length;
        }
      }

      return cursorPos;
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
      var firstFilledBlockIndexAtRight;

      for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
        if (this._blocks[_bi2].value) {
          firstFilledBlockIndexAtRight = _bi2;
          break;
        }
      }

      if (firstFilledBlockIndexAtRight != null) {
        var filledBlock = this._blocks[firstFilledBlockIndexAtRight];

        var _blockInputPos3 = filledBlock.nearestInputPos(0, DIRECTION.RIGHT);

        if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
          // filled block is input
          return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
        }
      } // <-
      // find this vars


      var firstFilledInputBlockIndex = -1;
      var firstEmptyInputBlockIndex; // TODO consider nested empty inputs

      for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
        var _block4 = this._blocks[_bi3];

        var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, DIRECTION.FORCE_LEFT);

        if (!_block4.value || _blockInputPos4 !== 0) firstEmptyInputBlockIndex = _bi3;

        if (_blockInputPos4 !== 0) {
          if (_blockInputPos4 !== _block4.value.length) {
            // aligned inside block - return immediately
            return this._blockStartPos(_bi3) + _blockInputPos4;
          } else {
            // found filled
            firstFilledInputBlockIndex = _bi3;
            break;
          }
        }
      }

      if (direction === DIRECTION.LEFT) {
        // try find first empty input before start searching position only when not forced
        for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
          var _block5 = this._blocks[_bi4];

          var _blockInputPos5 = _block5.nearestInputPos(0, DIRECTION.NONE);

          var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;

          if (blockAlignedPos > cursorPos) break; // if block is not lazy input

          if (_blockInputPos5 !== _block5.value.length) return blockAlignedPos;
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


      for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
        var _block6 = this._blocks[_bi5];

        var _blockInputPos6 = _block6.nearestInputPos(0, DIRECTION.NONE); // is input


        if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
          return this._blockStartPos(_bi5) + _blockInputPos6;
        }
      }

      return 0;
    }

    if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
      // ->
      //  any|not-len-aligned and filled
      //  any|not-len-aligned
      // <-
      //  not-0-aligned or start|any
      var firstInputBlockAlignedIndex;
      var firstInputBlockAlignedPos;

      for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
        var _block7 = this._blocks[_bi6];

        var _blockInputPos7 = _block7.nearestInputPos(0, DIRECTION.NONE);

        if (_blockInputPos7 !== _block7.value.length) {
          firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
          firstInputBlockAlignedIndex = _bi6;
          break;
        }
      }

      if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
        for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
          var _block8 = this._blocks[_bi7];

          var _blockInputPos8 = _block8.nearestInputPos(0, DIRECTION.FORCE_RIGHT);

          if (_blockInputPos8 !== _block8.value.length) {
            return this._blockStartPos(_bi7) + _blockInputPos8;
          }
        }

        return direction === DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
      }

      for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
        var _block9 = this._blocks[_bi8];

        var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, DIRECTION.LEFT);

        if (_blockInputPos9 !== 0) {
          var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;

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
    var indices = this._maskedBlocks[name];
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
  var value = block.value;
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

  /** */
  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  /**
    @override
  */


  _update(opts) {
    // TODO type
    opts = _objectSpread2({
      to: this.to || 0,
      from: this.from || 0
    }, opts);
    var maxLength = String(opts.to).length;
    if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
    opts.maxLength = maxLength;
    var fromStr = String(opts.from).padStart(maxLength, '0');
    var toStr = String(opts.to).padStart(maxLength, '0');
    var sameCharsCount = 0;

    while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
      ++sameCharsCount;
    }

    opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);

    super._update(opts);
  }
  /**
    @override
  */


  get isComplete() {
    return super.isComplete && Boolean(this.value);
  }

  boundaries(str) {
    var minstr = '';
    var maxstr = '';
    var [, placeholder, num] = str.match(/^(\D*)(\d*)(\D*)/) || [];

    if (num) {
      minstr = '0'.repeat(placeholder.length) + num;
      maxstr = '9'.repeat(placeholder.length) + num;
    }

    minstr = minstr.padEnd(this.maxLength, '0');
    maxstr = maxstr.padEnd(this.maxLength, '9');
    return [minstr, maxstr];
  }
  /**
    @override
  */


  doPrepare(str) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    str = super.doPrepare(str, flags).replace(/\D/g, '');
    if (!this.autofix) return str;
    var fromStr = String(this.from).padStart(this.maxLength, '0');
    var toStr = String(this.to).padStart(this.maxLength, '0');
    var val = this.value;
    var prepStr = '';

    for (var ci = 0; ci < str.length; ++ci) {
      var nextVal = val + prepStr + str[ci];
      var [minstr, maxstr] = this.boundaries(nextVal);
      if (Number(maxstr) < this.from) prepStr += fromStr[nextVal.length - 1];else if (Number(minstr) > this.to) prepStr += toStr[nextVal.length - 1];else prepStr += str[ci];
    }

    return prepStr;
  }
  /**
    @override
  */


  doValidate() {
    var str = this.value;
    var firstNonZero = str.search(/[^0]/);
    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
    var [minstr, maxstr] = this.boundaries(str);
    return this.from <= Number(maxstr) && Number(minstr) <= this.to && super.doValidate(...arguments);
  }

}

/** Date mask */

class MaskedDate extends MaskedPattern {
  /** Parse string to Date */

  /** Format Date to string */

  /** Pattern mask for date according to {@link MaskedDate#format} */

  /** Start date */

  /** End date */

  /** */

  /**
    @param {Object} opts
  */
  constructor(opts) {
    super(_objectSpread2({}, MaskedDate.DEFAULTS, {}, opts));
  }
  /**
    @override
  */


  _update(opts) {
    if (opts.mask === Date) delete opts.mask;
    if (opts.pattern) opts.mask = opts.pattern;
    var blocks = opts.blocks;
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

    Object.assign(opts.blocks, blocks); // add autofix

    Object.keys(opts.blocks).forEach(bk => {
      var b = opts.blocks[bk];
      if (!('autofix' in b)) b.autofix = opts.autofix;
    });

    super._update(opts);
  }
  /**
    @override
  */


  doValidate() {
    var date = this.date;
    return super.doValidate(...arguments) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
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
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return [day, month, year].join('.');
  },
  parse: str => {
    var [day, month, year] = str.split('.');
    return new Date(year, month - 1, day);
  }
};

MaskedDate.GET_DEFAULT_BLOCKS = () => ({
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
});

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
    var start;

    try {
      start = this._unsafeSelectionStart;
    } catch (e) {}

    return start != null ? start : this.value.length;
  }
  /** Safely returns selection end */


  get selectionEnd() {
    var end;

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
  /** */


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
  commit: 'blur'
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
    this._onFocus = this._onFocus.bind(this);
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

  maskEquals(mask) {
    return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof MaskedDate;
  }

  set mask(mask) {
    if (this.maskEquals(mask)) return;

    if (this.masked.constructor === maskedClass(mask)) {
      this.masked.updateOptions({
        mask
      });
      return;
    }

    var masked = createMask({
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
      focus: this._onFocus,
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
    var listeners = this._listeners[ev];
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
    this._value = this.masked.value;
  }
  /** Syncronizes view from model value, fires change events */


  updateControl() {
    var newUnmaskedValue = this.masked.unmaskedValue;
    var newValue = this.masked.value;
    var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
    this._unmaskedValue = newUnmaskedValue;
    this._value = newValue;
    if (this.el.value !== newValue) this.el.value = newValue;
    if (isChanged) this._fireChangeEvents();
  }
  /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */


  updateOptions(opts) {
    var {
      mask
    } = opts,
        restOpts = _objectWithoutProperties(opts, ["mask"]);

    var updateMask = !this.maskEquals(mask);
    var updateOpts = !objectIncludes(this.masked, restOpts);
    if (updateMask) this.mask = mask;
    if (updateOpts) this.masked.updateOptions(restOpts);
    if (updateMask || updateOpts) this.updateControl();
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
    if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

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
    if (!this._listeners[ev]) return this;

    if (!handler) {
      delete this._listeners[ev];
      return this;
    }

    var hIndex = this._listeners[ev].indexOf(handler);

    if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
    return this;
  }
  /** Handles view input event */


  _onInput() {
    this._abortUpdateCursor(); // fix strange IE behavior


    if (!this._selection) return this.updateValue();
    var details = new ActionDetails( // new state
    this.el.value, this.cursorPos, // old state
    this.value, this._selection);
    var oldRawValue = this.masked.rawInputValue;
    var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset; // force align in remove direction only if no input chars were removed
    // otherwise we still need to align with NONE (to get out from fixed symbols for instance)

    var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
    var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
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

    this._saveSelection();
  }
  /** Handles view drop event, prevents by default */


  _onDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  /** Restore last selection on focus */


  _onFocus(ev) {
    if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

    if (this._selection) this.cursorPos = this._selection.end;
    this.alignCursorFriendly();
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


  doValidate() {
    return this.enum.some(e => e.indexOf(this.unmaskedValue) >= 0) && super.doValidate(...arguments);
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
    super(_objectSpread2({}, MaskedNumber.DEFAULTS, {}, opts));
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
    var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
    var midInput = '(0|([1-9]+\\d*))?';
    var mid = '\\d*';
    var end = (this.scale ? '(' + escapeRegExp(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
    this._numberRegExpInput = new RegExp(start + midInput + end);
    this._numberRegExp = new RegExp(start + mid + end);
    this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(escapeRegExp).join('') + ']', 'g');
    this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
  }
  /** */


  _removeThousandsSeparators(value) {
    return value.replace(this._thousandsSeparatorRegExp, '');
  }
  /** */


  _insertThousandsSeparators(value) {
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    var parts = value.split(this.radix);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    return parts.join(this.radix);
  }
  /**
    @override
  */


  doPrepare(str) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return super.doPrepare(this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix)), ...args);
  }
  /** */


  _separatorsCount(to) {
    var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var count = 0;

    for (var pos = 0; pos < to; ++pos) {
      if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
        ++count;
        if (extendOnSeparators) to += this.thousandsSeparator.length;
      }
    }

    return count;
  }
  /** */


  _separatorsCountFromSlice() {
    var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
    return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
  }
  /**
    @override
  */


  extractInput() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    var flags = arguments.length > 2 ? arguments[2] : undefined;
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    return this._removeThousandsSeparators(super.extractInput(fromPos, toPos, flags));
  }
  /**
    @override
  */


  _appendCharRaw(ch) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.thousandsSeparator) return super._appendCharRaw(ch, flags);
    var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

    var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);

    this._value = this._removeThousandsSeparators(this.value);

    var appendDetails = super._appendCharRaw(ch, flags);

    this._value = this._insertThousandsSeparators(this._value);
    var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

    var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);

    appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
    return appendDetails;
  }
  /** */


  _findSeparatorAround(pos) {
    if (this.thousandsSeparator) {
      var searchFrom = pos - this.thousandsSeparator.length + 1;
      var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
      if (separatorPos <= pos) return separatorPos;
    }

    return -1;
  }

  _adjustRangeWithSeparators(from, to) {
    var separatorAroundFromPos = this._findSeparatorAround(from);

    if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;

    var separatorAroundToPos = this._findSeparatorAround(to);

    if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
    return [from, to];
  }
  /**
    @override
  */


  remove() {
    var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    var valueBeforePos = this.value.slice(0, fromPos);
    var valueAfterPos = this.value.slice(toPos);

    var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);

    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));

    var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);

    return new ChangeDetails({
      tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
    });
  }
  /**
    @override
  */


  nearestInputPos(cursorPos, direction) {
    if (!this.thousandsSeparator) return cursorPos;

    switch (direction) {
      case DIRECTION.NONE:
      case DIRECTION.LEFT:
      case DIRECTION.FORCE_LEFT:
        {
          var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);

          if (separatorAtLeftPos >= 0) {
            var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;

            if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
              return separatorAtLeftPos;
            }
          }

          break;
        }

      case DIRECTION.RIGHT:
      case DIRECTION.FORCE_RIGHT:
        {
          var separatorAtRightPos = this._findSeparatorAround(cursorPos);

          if (separatorAtRightPos >= 0) {
            return separatorAtRightPos + this.thousandsSeparator.length;
          }
        }
    }

    return cursorPos;
  }
  /**
    @override
  */


  doValidate(flags) {
    var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; // validate as string

    var valid = regexp.test(this._removeThousandsSeparators(this.value));

    if (valid) {
      // validate as number
      var number = this.number;
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
    if (this.value) {
      var number = this.number;
      var validnum = number; // check bounds

      if (this.min != null) validnum = Math.max(validnum, this.min);
      if (this.max != null) validnum = Math.min(validnum, this.max);
      if (validnum !== number) this.unmaskedValue = String(validnum);
      var formatted = this.value;
      if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
      if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
      this._value = formatted;
    }

    super.doCommit();
  }
  /** */


  _normalizeZeros(value) {
    var parts = this._removeThousandsSeparators(value).split(this.radix); // remove leading zeros


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
    var parts = value.split(this.radix);
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
    if (opts.mask) opts.validate = value => value.search(opts.mask) >= 0;

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
    if (opts.mask) opts.validate = opts.mask;

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
    super(_objectSpread2({}, MaskedDynamic.DEFAULTS, {}, opts));
    this.currentMask = null;
  }
  /**
    @override
  */


  _update(opts) {
    super._update(opts);

    if ('mask' in opts) {
      // mask could be totally dynamic with only `dispatch` option
      this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => createMask(m)) : [];
    }
  }
  /**
    @override
  */


  _appendCharRaw() {
    var details = this._applyDispatch(...arguments);

    if (this.currentMask) {
      details.aggregate(this.currentMask._appendChar(...arguments));
    }

    return details;
  }

  _applyDispatch() {
    var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
    var inputValue = this.rawInputValue;
    var insertValue = flags.tail && flags._beforeTailState != null ? // $FlowFixMe - tired to fight with type system
    flags._beforeTailState._rawInputValue : inputValue;
    var tailValue = inputValue.slice(insertValue.length);
    var prevMask = this.currentMask;
    var details = new ChangeDetails();
    var prevMaskState = prevMask && prevMask.state; // clone flags to prevent overwriting `_beforeTailState`

    this.currentMask = this.doDispatch(appended, _objectSpread2({}, flags)); // restore state after dispatch

    if (this.currentMask) {
      if (this.currentMask !== prevMask) {
        // if mask changed reapply input
        this.currentMask.reset(); // $FlowFixMe - it's ok, we don't change current mask above

        var d = this.currentMask.append(insertValue, {
          raw: true
        });
        details.tailShift = d.inserted.length - prevValueBeforeTail.length;

        if (tailValue) {
          // $FlowFixMe - it's ok, we don't change current mask above
          details.tailShift += this.currentMask.append(tailValue, {
            raw: true,
            tail: true
          }).tailShift;
        }
      } else {
        // Dispatch can do something bad with state, so
        // restore prev mask state
        this.currentMask.state = prevMaskState;
      }
    }

    return details;
  }

  _appendPlaceholder() {
    var details = this._applyDispatch(...arguments);

    if (this.currentMask) {
      details.aggregate(this.currentMask._appendPlaceholder());
    }

    return details;
  }
  /**
    @override
  */


  doDispatch(appended) {
    var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return this.dispatch(appended, this, flags);
  }
  /**
    @override
  */


  doValidate() {
    return super.doValidate(...arguments) && (!this.currentMask || this.currentMask.doValidate(...arguments));
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
    var unmaskedValue = String(value); // double check it

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


  remove() {
    var details = new ChangeDetails();

    if (this.currentMask) {
      details.aggregate(this.currentMask.remove(...arguments)) // update with dispatch
      .aggregate(this._applyDispatch());
    }

    return details;
  }
  /**
    @override
  */


  get state() {
    return _objectSpread2({}, super.state, {
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map(m => m.state),
      currentMaskRef: this.currentMask,
      currentMask: this.currentMask && this.currentMask.state
    });
  }

  set state(state) {
    var {
      compiledMasks,
      currentMaskRef,
      currentMask
    } = state,
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


  extractInput() {
    return this.currentMask ? this.currentMask.extractInput(...arguments) : '';
  }
  /**
    @override
  */


  extractTail() {
    return this.currentMask ? this.currentMask.extractTail(...arguments) : super.extractTail(...arguments);
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


  nearestInputPos() {
    return this.currentMask ? this.currentMask.nearestInputPos(...arguments) : super.nearestInputPos(...arguments);
  }

  get overwrite() {
    return this.currentMask ? this.currentMask.overwrite : super.overwrite;
  }

  set overwrite(overwrite) {
    console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
  }

}
MaskedDynamic.DEFAULTS = {
  dispatch: (appended, masked, flags) => {
    if (!masked.compiledMasks.length) return;
    var inputValue = masked.rawInputValue; // simulate input

    var inputs = masked.compiledMasks.map((m, index) => {
      m.reset();
      m.append(inputValue, {
        raw: true
      });
      m.append(appended, flags);
      var weight = m.rawInputValue.length;
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

function IMask(el) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
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
