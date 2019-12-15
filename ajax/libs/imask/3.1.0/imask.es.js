/** Checks if value is string */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

/** Conforms string with fallback */
function conform(res, str, fallback = '') {
  return isString(res) ? res : res ? str : fallback;
}

/**
  Direction
  @prop {number} NONE
  @prop {number} LEFT
  @prop {number} RIGHT
*/
const DIRECTION = {
  NONE: 0,
  LEFT: -1,
  RIGHT: 1
  /**
    Direction
    @enum {number}
  */
};

/** Returns next char position in direction */
function indexInDirection(pos, direction) {
  if (direction === DIRECTION.LEFT) --pos;
  return pos;
}

/** Escapes regular expression control chars */
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

// cloned from https://github.com/epoberezkin/fast-deep-equal with small changes
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
    var keys = Object.keys(a);
    // if (keys.length !== Object.keys(b).length) return false;

    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;

    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;

    for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = 0; i < keys.length; i++) if (!objectIncludes(a[keys[i]], b[keys[i]])) return false;

    return true;
  }

  return false;
}

/* eslint-disable no-undef */
const g = typeof window !== 'undefined' && window || typeof global !== 'undefined' && global.global === global && global || typeof self !== 'undefined' && self.self === self && self || {};
/* eslint-enable no-undef */

/** Selection range */

/** Provides details of changing input */
class ActionDetails {
  /** Old input value */

  /** Current input value */
  constructor(value, cursorPos, oldValue, oldSelection) {
    this.value = value;
    this.cursorPos = cursorPos;
    this.oldValue = oldValue;
    this.oldSelection = oldSelection;

    // double check if left part was changed (autofilling, other non-standard input triggers)
    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
      --this.oldSelection.start;
    }
  }

  /**
    Start changing position
    @readonly
  */

  /** Old selection */

  /** Current cursor position */
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
    return Math.max(this.oldSelection.end - this.startChangePos ||
    // for Delete
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
    if (!this.removedCount || this.insertedCount) return DIRECTION.NONE;

    // align right if delete at right or if range removed (event with backspace)
    return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT;
  }
}

/**
  Provides details of changing model value
  @param {Object} [details]
  @param {string} [details.inserted] - Inserted symbols
  @param {boolean} [details.overflow] - Is overflowed
  @param {number} [details.removeCount] - Removed symbols count
  @param {number} [details.shift] - Additional offset if any changes occurred before current position
*/
class ChangeDetails {
  /** Additional offset if any changes occurred before current position */

  /** Inserted symbols */
  constructor(details) {
    Object.assign(this, {
      inserted: '',
      overflow: false,
      shift: 0
    }, details);
  }

  /**
    Aggregate changes
    @returns {ChangeDetails} `this`
  */

  /** Is overflowed */
  aggregate(details) {
    this.inserted += details.inserted;
    this.shift += details.shift;
    this.overflow = this.overflow || details.overflow;
    if (details.rawInserted) this.rawInserted += details.rawInserted;
    return this;
  }

  /** Total offset considering all changes */
  get offset() {
    return this.shift + this.inserted.length;
  }

  /** Raw inserted is used by dynamic mask */
  get rawInserted() {
    return this._rawInserted != null ? this._rawInserted : this.inserted;
  }

  set rawInserted(rawInserted) {
    this._rawInserted = rawInserted;
  }
}

var _extends = Object.assign || function (target) {
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

var slicedToArray = function () {
  function sliceIterator(arr, i) {
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
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/** Supported mask type */


/** Append flags */


/** Extract flags */


/** Provides common masking stuff */
class Masked {
  /** Does additional processing in the end of editing */

  /** Transforms value before mask processing */
  constructor(opts) {
    this._value = '';
    this._update(_extends({}, Masked.DEFAULTS, opts));
    this.isInitialized = true;
  }

  /** Sets and applies new options */

  /** */

  /** Validates if value is acceptable */
  // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

  /** @type {Mask} */
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

  /** Clones masked with options and value */
  clone() {
    const m = new Masked(this);
    m._value = this.value.slice();
    return m;
  }

  /** */
  assign(source) {
    // $FlowFixMe
    return Object.assign(this, source);
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
    this._append(value, { input: true });
    this._appendTail();
    this.doCommit();
    return this.value;
  }

  /** */
  get unmaskedValue() {
    return this.value;
  }

  set unmaskedValue(value) {
    this.reset();
    this._append(value);
    this._appendTail();
    this.doCommit();
  }

  /** Value that includes raw user input */
  get rawInputValue() {
    return this.extractInput(0, this.value.length, { raw: true });
  }

  set rawInputValue(value) {
    this.reset();
    this._append(value, { raw: true });
    this._appendTail();
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
  _extractTail(fromPos = 0, toPos = this.value.length) {
    return {
      value: this.extractInput(fromPos, toPos),
      fromPos,
      toPos
    };
  }

  /** Appends tail */
  _appendTail(tail) {
    return this._append(tail ? tail.value : '', { tail: true });
  }

  /** Appends symbols considering flags */
  _append(str, flags = {}) {
    const oldValueLength = this.value.length;
    let consistentValue = this.clone();
    let overflow = false;

    str = this.doPrepare(str, flags);

    for (let ci = 0; ci < str.length; ++ci) {
      this._value += str[ci];
      if (this.doValidate(flags) === false) {
        this.assign(consistentValue);
        if (!flags.input) {
          // in `input` mode dont skip invalid chars
          overflow = true;
          break;
        }
      }

      consistentValue = this.clone();
    }

    return new ChangeDetails({
      inserted: this.value.slice(oldValueLength),
      overflow
    });
  }

  /** Appends symbols considering tail */
  appendWithTail(str, tail) {
    // TODO refactor
    const aggregateDetails = new ChangeDetails();
    let consistentValue = this.clone();
    let consistentAppended;

    for (let ci = 0; ci < str.length; ++ci) {
      const ch = str[ci];

      const appendDetails = this._append(ch, { input: true });
      consistentAppended = this.clone();
      const tailAppended = !appendDetails.overflow && !this._appendTail(tail).overflow;
      if (!tailAppended || this.doValidate({ tail: true }) === false) {
        this.assign(consistentValue);
        break;
      }

      this.assign(consistentAppended);
      consistentValue = this.clone();
      aggregateDetails.aggregate(appendDetails);
    }

    // TODO needed for cases when
    // 1) REMOVE ONLY AND NO LOOP AT ALL
    // 2) last loop iteration removes tail
    // 3) when breaks on tail insert

    // aggregate only shift from tail
    aggregateDetails.shift += this._appendTail(tail).shift;

    return aggregateDetails;
  }

  /** */
  remove(from = 0, count = this.value.length - from) {
    this._value = this.value.slice(0, from) + this.value.slice(from + count);
    return new ChangeDetails();
  }

  /** Calls function and reapplies current value */
  withValueRefresh(fn) {
    if (this._refreshing || !this.isInitialized) return fn();
    this._refreshing = true;

    const unmasked = this.unmaskedValue;

    const ret = fn();

    this.unmaskedValue = unmasked;

    delete this._refreshing;
    return ret;
  }

  /**
    Prepares string before mask processing
    @protected
  */
  doPrepare(str, flags = {}) {
    return this.prepare(str, this, flags);
  }

  /**
    Validates if value is acceptable
    @protected
  */
  doValidate(flags) {
    return this.validate(this.value, this, flags);
  }

  /**
    Does additional processing in the end of editing
    @protected
  */
  doCommit() {
    this.commit(this.value, this);
  }

  // TODO
  // insert (str, fromPos, flags)

  /** */
  splice(start, deleteCount, inserted, removeDirection) {
    const tailPos = start + deleteCount;
    const tail = this._extractTail(tailPos);

    let startChangePos = this.nearestInputPos(start, removeDirection);
    const changeDetails = new ChangeDetails({
      shift: startChangePos - start // adjust shift if start was aligned
    }).aggregate(this.remove(startChangePos)).aggregate(this.appendWithTail(inserted, tail));

    return changeDetails;
  }
}
Masked.DEFAULTS = {
  prepare: val => val,
  validate: () => true,
  commit: () => {}
};

/** Get Masked class by mask type */
function maskedClass(mask) {
  if (mask == null) {
    throw new Error('mask property should be defined');
  }

  if (mask instanceof RegExp) return g.IMask.MaskedRegExp;
  if (isString(mask)) return g.IMask.MaskedPattern;
  if (mask instanceof Date || mask === Date) return g.IMask.MaskedDate;
  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return g.IMask.MaskedNumber;
  if (Array.isArray(mask) || mask === Array) return g.IMask.MaskedDynamic;
  // $FlowFixMe
  if (mask.prototype instanceof g.IMask.Masked) return mask;
  // $FlowFixMe
  if (mask instanceof Function) return g.IMask.MaskedFunction;

  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
  return g.IMask.Masked;
}

/** Creates new {@link Masked} depending on mask type */
function createMask(opts) {
  opts = Object.assign({}, opts); // clone
  const mask = opts.mask;

  if (mask instanceof g.IMask.Masked) return mask;

  const MaskedClass = maskedClass(mask);
  return new MaskedClass(opts);
}

/** */


/** */
class PatternDefinition {
  /** */

  /** */

  /** */
  constructor(opts) {
    // TODO flow
    Object.assign(this, opts);

    if (this.mask) {
      this._masked = createMask(opts);
    }
  }

  /** */

  /** */

  /** */

  /** */


  /** */
  reset() {
    this.isHollow = false;
    this.isRawInput = false;
    if (this._masked) this._masked.reset();
  }

  /** */
  get isInput() {
    return this.type === PatternDefinition.TYPES.INPUT;
  }

  /** */
  get isHiddenHollow() {
    return this.isHollow && this.optional;
  }

  /** */
  resolve(ch) {
    if (!this._masked) return false;
    return this._masked.resolve(ch);
  }
}
PatternDefinition.DEFAULTS = {
  '0': /\d/,
  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/, // http://stackoverflow.com/a/22075070
  '*': /./
};
/**
  @prop {string} INPUT
  @prop {string} FIXED
*/
PatternDefinition.TYPES = {
  INPUT: 'input',
  FIXED: 'fixed'
};

/** */


/** */


/**
  Pattern group symbols from parent
  @param {MaskedPattern} masked - Internal {@link masked} model
  @param {Object} opts
  @param {string} opts.name - Group name
  @param {number} opts.offset - Group offset in masked definitions array
  @param {string} opts.mask - Group mask
  @param {Function} [opts.validate] - Custom group validator
*/
class PatternGroup {
  /** Group mask */

  /** Group name */

  /** */
  constructor(masked, { name, offset, mask, validate }) {
    this.masked = masked;
    this.name = name;
    this.offset = offset;
    this.mask = mask;
    this.validate = validate || (() => true);
  }

  /** Slice of internal {@link masked} value */

  /** Custom group validator */

  /** Group offset in masked definitions array */


  /** Internal {@link masked} model */

  /** */
  get value() {
    return this.masked.value.slice(this.masked.mapDefIndexToPos(this.offset), this.masked.mapDefIndexToPos(this.offset + this.mask.length));
  }

  /** Unmasked slice of internal {@link masked} value */
  get unmaskedValue() {
    return this.masked.extractInput(this.masked.mapDefIndexToPos(this.offset), this.masked.mapDefIndexToPos(this.offset + this.mask.length));
  }

  /** Validates if current value is acceptable */
  doValidate(flags) {
    return this.validate(this.value, this, flags);
  }
}

/**
  Pattern group that validates number ranges
  @param {number[]} range - [from, to]
  @param {?number} maxlen - Maximum number length, will be padded with leading zeros
*/
class RangeGroup {
  /** @type {Function} */
  constructor([from, to], maxlen = String(to).length) {
    this._from = from;
    this._to = to;
    this._maxLength = maxlen;
    this.validate = this.validate.bind(this);

    this._update();
  }
  /** @type {string} */


  get to() {
    return this._to;
  }

  set to(to) {
    this._to = to;
    this._update();
  }

  get from() {
    return this._from;
  }

  set from(from) {
    this._from = from;
    this._update();
  }

  get maxLength() {
    return this._maxLength;
  }

  set maxLength(maxLength) {
    this._maxLength = maxLength;
    this._update();
  }

  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }

  _update() {
    this._maxLength = Math.max(this._maxLength, String(this.to).length);
    this.mask = '0'.repeat(this._maxLength);
  }

  validate(str) {
    let minstr = '';
    let maxstr = '';

    var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
        _ref2 = slicedToArray(_ref, 3);

    const placeholder = _ref2[1],
          num = _ref2[2];

    if (num) {
      minstr = '0'.repeat(placeholder.length) + num;
      maxstr = '9'.repeat(placeholder.length) + num;
    }

    const firstNonZero = str.search(/[^0]/);
    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;

    minstr = minstr.padEnd(this._maxLength, '0');
    maxstr = maxstr.padEnd(this._maxLength, '9');

    return this.from <= Number(maxstr) && Number(minstr) <= this.to;
  }
}

/** Pattern group that validates enum values */
function EnumGroup(enums) {
  return {
    mask: '*'.repeat(enums[0].length),
    validate: (value, group, flags) => enums.some(e => e.indexOf(group.unmaskedValue) >= 0)
  };
}

PatternGroup.Range = RangeGroup;
PatternGroup.Enum = EnumGroup;

class ChunksTailDetails {

  constructor(chunks) {
    this.chunks = chunks;
  }

  get value() {
    return this.chunks.map(c => c.value).join('');
  }

  get fromPos() {
    const firstChunk = this.chunks[0];
    return firstChunk && firstChunk.stop;
  }

  get toPos() {
    const lastChunk = this.chunks[this.chunks.length - 1];
    return lastChunk && lastChunk.stop;
  }
}

/**
  Pattern mask
  @param {Object} opts
  @param {Object} opts.groups
  @param {Object} opts.definitions
  @param {string} opts.placeholderChar
  @param {boolean} opts.lazy
*/
class MaskedPattern extends Masked {
  // TODO mask type
  /** Single char for empty input */


  /** */
  constructor(opts = {}) {
    // TODO type $Shape<MaskedPatternOptions>={} does not work
    opts.definitions = Object.assign({}, PatternDefinition.DEFAULTS, opts.definitions);
    super(_extends({}, MaskedPattern.DEFAULTS, opts));
  }

  /**
    @override
    @param {Object} opts
  */

  /** Show placeholder only when needed */

  /** */
  _update(opts = {}) {
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);
    super._update(opts);
    this._rebuildMask();
  }

  /** */
  _rebuildMask() {
    const defs = this.definitions;
    this._charDefs = [];
    this._groupDefs = [];

    let pattern = this.mask;
    if (!pattern || !defs) return;

    let unmaskingBlock = false;
    let optionalBlock = false;
    let stopAlign = false;

    for (let i = 0; i < pattern.length; ++i) {
      if (this.groups) {
        const p = pattern.slice(i);
        const gNames = Object.keys(this.groups).filter(gName => p.indexOf(gName) === 0);
        // order by key length
        gNames.sort((a, b) => b.length - a.length);
        // use group name with max length
        const gName = gNames[0];
        if (gName) {
          const group = this.groups[gName];
          this._groupDefs.push(new PatternGroup(this, {
            name: gName,
            offset: this._charDefs.length,
            mask: group.mask,
            validate: group.validate
          }));
          pattern = pattern.replace(gName, group.mask);
        }
      }

      let char = pattern[i];
      let type = char in defs ? PatternDefinition.TYPES.INPUT : PatternDefinition.TYPES.FIXED;
      const unmasking = type === PatternDefinition.TYPES.INPUT || unmaskingBlock;
      const optional = type === PatternDefinition.TYPES.INPUT && optionalBlock;

      if (char === MaskedPattern.STOP_CHAR) {
        stopAlign = true;
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
        type = PatternDefinition.TYPES.FIXED;
      }

      this._charDefs.push(new PatternDefinition({
        char,
        type,
        optional,
        stopAlign,
        unmasking,
        mask: type === PatternDefinition.TYPES.INPUT ? defs[char] : value => value === char
      }));

      stopAlign = false;
    }
  }

  /**
    @override
  */
  doValidate(...args) {
    return this._groupDefs.every(g$$1 => g$$1.doValidate(...args)) && super.doValidate(...args);
  }

  /**
    @override
  */
  clone() {
    const m = new MaskedPattern(this);
    m._value = this.value;
    // $FlowFixMe
    m._charDefs.forEach((d, i) => Object.assign(d, this._charDefs[i]));
    // $FlowFixMe
    m._groupDefs.forEach((d, i) => Object.assign(d, this._groupDefs[i]));
    return m;
  }

  /**
    @override
  */
  reset() {
    super.reset();
    this._charDefs.forEach(d => {
      delete d.isHollow;
    });
  }

  /**
    @override
  */
  get isComplete() {
    return !this._charDefs.some((d, i) => d.isInput && !d.optional && (d.isHollow || !this.extractInput(i, i + 1)));
  }

  /** */
  hiddenHollowsBefore(defIndex) {
    return this._charDefs.slice(0, defIndex).filter(d => d.isHiddenHollow).length;
  }

  /** Map definition index to position on view */
  mapDefIndexToPos(defIndex) {
    return defIndex - this.hiddenHollowsBefore(defIndex);
  }

  /** Map position on view to definition index */
  mapPosToDefIndex(pos) {
    let defIndex = pos;
    for (let di = 0; di < this._charDefs.length; ++di) {
      const def = this._charDefs[di];
      if (di >= defIndex) break;
      if (def.isHiddenHollow) ++defIndex;
    }
    return defIndex;
  }

  /**
    @override
  */
  get unmaskedValue() {
    const str = this.value;
    let unmasked = '';

    for (let ci = 0, di = 0; ci < str.length && di < this._charDefs.length; ++di) {
      const ch = str[ci];
      const def = this._charDefs[di];

      if (def.isHiddenHollow) continue;
      if (def.unmasking && !def.isHollow) unmasked += ch;
      ++ci;
    }

    return unmasked;
  }

  set unmaskedValue(unmaskedValue) {
    super.unmaskedValue = unmaskedValue;
  }

  /**
    @override
  */
  _appendTail(tail) {
    const details = new ChangeDetails();
    if (tail) {
      details.aggregate(tail instanceof ChunksTailDetails ? this._appendChunks(tail.chunks, { tail: true }) : super._appendTail(tail));
    }
    return details.aggregate(this._appendPlaceholder());
  }

  /**
    @override
  */
  _append(str, flags = {}) {
    const oldValueLength = this.value.length;
    let rawInserted = '';
    let overflow = false;

    str = this.doPrepare(str, flags);

    for (let ci = 0, di = this.mapPosToDefIndex(this.value.length); ci < str.length;) {
      const ch = str[ci];
      const def = this._charDefs[di];

      // check overflow
      if (def == null) {
        overflow = true;
        break;
      }

      // reset
      def.isHollow = false;

      let resolved, skipped;
      let chres = conform(def.resolve(ch), ch);

      if (def.type === PatternDefinition.TYPES.INPUT) {
        if (chres) {
          this._value += chres;
          if (!this.doValidate()) {
            chres = '';
            this._value = this.value.slice(0, -1);
          }
        }

        resolved = !!chres;
        skipped = !chres && !def.optional;

        if (!chres) {
          if (!def.optional && !flags.input && !this.lazy) {
            this._value += this.placeholderChar;
            skipped = false;
          }
          if (!skipped) def.isHollow = true;
        } else {
          rawInserted += chres;
        }
      } else {
        this._value += def.char;
        resolved = chres && (def.unmasking || flags.input || flags.raw) && !flags.tail;
        def.isRawInput = resolved && (flags.raw || flags.input);
        if (def.isRawInput) rawInserted += def.char;
      }

      if (!skipped) ++di;
      if (resolved || skipped) ++ci;
    }

    return new ChangeDetails({
      inserted: this.value.slice(oldValueLength),
      rawInserted,
      overflow
    });
  }

  /** Appends chunks splitted by stop chars */
  _appendChunks(chunks, ...args) {
    const details = new ChangeDetails();
    for (let ci = 0; ci < chunks.length; ++ci) {
      var _chunks$ci = chunks[ci];
      const stop = _chunks$ci.stop,
            value = _chunks$ci.value;

      const fromDef = stop != null && this._charDefs[stop];
      // lets double check if stopAlign is here
      if (fromDef && fromDef.stopAlign) details.aggregate(this._appendPlaceholder(stop));
      if (details.aggregate(this._append(value, ...args)).overflow) break;
    }
    return details;
  }

  /**
    @override
  */
  _extractTail(fromPos = 0, toPos = this.value.length) {
    return new ChunksTailDetails(this._extractInputChunks(fromPos, toPos));
  }

  /**
    @override
  */
  extractInput(fromPos = 0, toPos = this.value.length, flags = {}) {
    if (fromPos === toPos) return '';

    const str = this.value;
    let input = '';

    const toDefIndex = this.mapPosToDefIndex(toPos);
    for (let ci = fromPos, di = this.mapPosToDefIndex(fromPos); ci < toPos && ci < str.length && di < toDefIndex; ++di) {
      const ch = str[ci];
      const def = this._charDefs[di];

      if (!def) break;
      if (def.isHiddenHollow) continue;

      if (def.isInput && !def.isHollow || flags.raw && !def.isInput && def.isRawInput) input += ch;
      ++ci;
    }
    return input;
  }

  /** Extracts chunks from input splitted by stop chars */
  _extractInputChunks(fromPos = 0, toPos = this.value.length) {
    if (fromPos === toPos) return [];

    const fromDefIndex = this.mapPosToDefIndex(fromPos);
    const toDefIndex = this.mapPosToDefIndex(toPos);
    const stopDefIndices = this._charDefs.map((d, i) => [d, i]).slice(fromDefIndex, toDefIndex).filter(([d]) => d.stopAlign).map(([, i]) => i);

    const stops = [fromDefIndex, ...stopDefIndices, toDefIndex];

    return stops.map((s, i) => ({
      stop: stopDefIndices.indexOf(s) >= 0 ? s : null,

      value: this.extractInput(this.mapDefIndexToPos(s), this.mapDefIndexToPos(stops[++i]))
    })).filter(({ stop, value }) => stop != null || value);
  }

  /** Appends placeholder depending on laziness */
  _appendPlaceholder(toDefIndex) {
    const oldValueLength = this.value.length;
    const maxDefIndex = toDefIndex || this._charDefs.length;
    for (let di = this.mapPosToDefIndex(this.value.length); di < maxDefIndex; ++di) {
      const def = this._charDefs[di];
      if (def.isInput) def.isHollow = true;

      if (!this.lazy || toDefIndex) {
        this._value += !def.isInput && def.char != null ? def.char : !def.optional ? this.placeholderChar : '';
      }
    }
    return new ChangeDetails({
      inserted: this.value.slice(oldValueLength)
    });
  }

  /**
    @override
  */
  remove(from = 0, count = this.value.length - from) {
    const fromDefIndex = this.mapPosToDefIndex(from);
    const toDefIndex = this.mapPosToDefIndex(from + count);
    this._charDefs.slice(fromDefIndex, toDefIndex).forEach(d => d.reset());

    return super.remove(from, count);
  }

  /**
    @override
  */
  nearestInputPos(cursorPos, direction = DIRECTION.NONE) {
    let step = direction || DIRECTION.RIGHT;

    const initialDefIndex = this.mapPosToDefIndex(cursorPos);
    const initialDef = this._charDefs[initialDefIndex];
    let di = initialDefIndex;

    let firstInputIndex, firstFilledInputIndex, firstVisibleHollowIndex, nextdi;

    // check if chars at right is acceptable for LEFT and NONE directions
    if (direction !== DIRECTION.RIGHT && (initialDef && initialDef.isInput ||
    // in none direction latest position is acceptable also
    direction === DIRECTION.NONE && cursorPos === this.value.length)) {
      firstInputIndex = initialDefIndex;
      if (initialDef && !initialDef.isHollow) firstFilledInputIndex = initialDefIndex;
    }

    if (firstFilledInputIndex == null && direction == DIRECTION.LEFT || firstInputIndex == null) {
      // search forward
      for (nextdi = indexInDirection(di, step); 0 <= nextdi && nextdi < this._charDefs.length; di += step, nextdi += step) {
        const nextDef = this._charDefs[nextdi];
        if (firstInputIndex == null && nextDef.isInput) {
          firstInputIndex = di;
          if (direction === DIRECTION.NONE) break;
        }
        if (firstVisibleHollowIndex == null && nextDef.isHollow && !nextDef.isHiddenHollow) firstVisibleHollowIndex = di;
        if (nextDef.isInput && !nextDef.isHollow) {
          firstFilledInputIndex = di;
          break;
        }
      }
    }

    // for lazy if has aligned left inside fixed and has came to the start - use start position
    if (direction === DIRECTION.LEFT && di === 0 && this.lazy && (!initialDef || !initialDef.isInput)) firstInputIndex = 0;

    if (direction === DIRECTION.LEFT || firstInputIndex == null) {
      // search backward
      step = -step;
      let overflow = false;

      // find hollows only before initial pos
      for (nextdi = indexInDirection(di, step); 0 <= nextdi && nextdi < this._charDefs.length; di += step, nextdi += step) {
        const nextDef = this._charDefs[nextdi];
        if (nextDef.isInput) {
          firstInputIndex = di;
          if (nextDef.isHollow && !nextDef.isHiddenHollow) break;
        }

        // if hollow not found before start position - set `overflow`
        // and try to find just any input
        if (di === initialDefIndex) overflow = true;

        // first input found
        if (overflow && firstInputIndex != null) break;
      }

      // process overflow
      overflow = overflow || nextdi >= this._charDefs.length;
      if (overflow && firstInputIndex != null) di = firstInputIndex;
    } else if (firstFilledInputIndex == null) {
      // adjust index if delete at right and filled input not found at right
      di = firstVisibleHollowIndex != null ? firstVisibleHollowIndex : firstInputIndex;
    }

    return this.mapDefIndexToPos(di);
  }

  /** Get group by name */
  group(name) {
    return this.groupsByName(name)[0];
  }

  /** Get all groups by name */
  groupsByName(name) {
    return this._groupDefs.filter(g$$1 => g$$1.name === name);
  }
}
MaskedPattern.DEFAULTS = {
  lazy: true,
  placeholderChar: '_'
};
MaskedPattern.STOP_CHAR = '`';
MaskedPattern.ESCAPE_CHAR = '\\';
MaskedPattern.Definition = PatternDefinition;
MaskedPattern.Group = PatternGroup;

/** Date mask */
class MaskedDate extends MaskedPattern {

  /**
    @param {Object} opts
  */

  /** Start date */

  /** Format Date to string */
  constructor(opts) {
    super(_extends({}, MaskedDate.DEFAULTS, opts));
  }

  /**
    @override
  */

  /** End date */

  /** Pattern mask for date according to {@link MaskedDate#format} */


  /** Parse string to Date */
  _update(opts) {
    if (opts.mask === Date) delete opts.mask;
    if (opts.pattern) {
      opts.mask = opts.pattern;
      delete opts.pattern;
    }

    const groups = opts.groups;
    opts.groups = Object.assign({}, MaskedDate.GET_DEFAULT_GROUPS());
    // adjust year group
    if (opts.min) opts.groups.Y.from = opts.min.getFullYear();
    if (opts.max) opts.groups.Y.to = opts.max.getFullYear();
    Object.assign(opts.groups, groups);

    super._update(opts);
  }

  /**
    @override
  */
  doValidate(...args) {
    const valid = super.doValidate(...args);
    const date = this.date;

    return valid && (!this.isComplete || this.isDateExist(this.value) && date && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
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
    var _str$split = str.split('.'),
        _str$split2 = slicedToArray(_str$split, 3);

    const day = _str$split2[0],
          month = _str$split2[1],
          year = _str$split2[2];

    return new Date(year, month - 1, day);
  }
};
MaskedDate.GET_DEFAULT_GROUPS = () => {
  return {
    d: new PatternGroup.Range([1, 31]),
    m: new PatternGroup.Range([1, 12]),
    Y: new PatternGroup.Range([1900, 9999])
  };
};

/**
  Generic element API to use with mask
  @interface
*/


/** Listens to element events and controls changes between element and {@link Masked} */
class InputMask {

  /**
    @param {UIElement} el
    @param {Object} opts
  */

  /**
    View element
    @readonly
  */
  constructor(el, opts) {
    this.el = el;
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

    this._bindEvents();

    // refresh
    this.updateValue();
    this._onChange();
  }

  /** Read or update mask */


  /**
    Internal {@link Masked} model
    @readonly
  */
  get mask() {
    return this.masked.mask;
  }
  set mask(mask) {
    if (mask == null || mask === this.masked.mask) return;

    if (this.masked.constructor === maskedClass(mask)) {
      this.masked.mask = mask;
      return;
    }

    const masked = createMask({ mask });
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

  /**
    Starts listening to element events
    @protected
  */
  _bindEvents() {
    this.el.addEventListener('keydown', this._saveSelection);
    this.el.addEventListener('input', this._onInput);
    this.el.addEventListener('drop', this._onDrop);
    this.el.addEventListener('click', this.alignCursorFriendly);
    this.el.addEventListener('change', this._onChange);
  }

  /**
    Stops listening to element events
    @protected
   */
  _unbindEvents() {
    this.el.removeEventListener('keydown', this._saveSelection);
    this.el.removeEventListener('input', this._onInput);
    this.el.removeEventListener('drop', this._onDrop);
    this.el.removeEventListener('click', this.alignCursorFriendly);
    this.el.removeEventListener('change', this._onChange);
  }

  /**
    Fires custom event
    @protected
   */
  _fireEvent(ev) {
    const listeners = this._listeners[ev] || [];
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
    if (this.el !== document.activeElement) return;

    this.el.setSelectionRange(pos, pos);
    this._saveSelection();
  }

  /**
    Stores current selection
    @protected
  */
  _saveSelection() /* ev */{
    if (this.value !== this.el.value) {
      console.warn('Uncontrolled input change, refresh mask manually!'); // eslint-disable-line no-console
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
    opts = Object.assign({}, opts); // clone
    if (opts.mask === Date && this.masked instanceof MaskedDate) delete opts.mask;

    // check if changed
    if (objectIncludes(this.masked, opts)) return;

    this.masked.updateOptions(opts);
    this.updateControl();
  }

  /** Updates cursor */
  updateCursor(cursorPos) {
    if (cursorPos == null) return;
    this.cursorPos = cursorPos;

    // also queue change cursor for mobile browsers
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
    this._abortUpdateCursor();

    const details = new ActionDetails(
    // new state
    this.el.value, this.cursorPos,
    // old state
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
    this._unbindEvents();
    // $FlowFixMe why not do so?
    this._listeners.length = 0;
    delete this.el;
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
  /** Flag to remove leading and trailing zeros in the end of editing */

  /** Digits after point */

  /** */

  /** Single char */
  constructor(opts) {
    super(_extends({}, MaskedNumber.DEFAULTS, opts));
  }

  /**
    @override
  */

  /** Flag to pad trailing zeros after point in the end of editing */

  /** */

  /** */

  /** Array of single chars */


  /** Single char */
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
  _extractTail(fromPos = 0, toPos = this.value.length) {
    const tail = super._extractTail(fromPos, toPos);

    return _extends({}, tail, {
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

  /**
    @override
  */
  appendWithTail(...args) {
    let previousValue = this.value;
    this._value = this._removeThousandsSeparators(this.value);
    let startChangePos = this.value.length;

    const appendDetails = super.appendWithTail(...args);
    this._value = this._insertThousandsSeparators(this.value);

    // calculate offsets after insert separators
    let beforeTailPos = startChangePos + appendDetails.inserted.length;
    for (let pos = 0; pos <= beforeTailPos; ++pos) {
      if (this.value[pos] === this.thousandsSeparator) {
        if (pos < startChangePos ||
        // check high bound
        // if separator is still there - consider it also
        pos === startChangePos && previousValue[pos] === this.thousandsSeparator) {
          ++startChangePos;
        }
        if (pos < beforeTailPos) ++beforeTailPos;
      }
    }

    // adjust details with separators
    appendDetails.rawInserted = appendDetails.inserted;
    appendDetails.inserted = this.value.slice(startChangePos, beforeTailPos);
    appendDetails.shift += startChangePos - previousValue.length;

    return appendDetails;
  }

  /**
    @override
  */
  nearestInputPos(cursorPos, direction) {
    if (!direction) return cursorPos;

    const nextPos = indexInDirection(cursorPos, direction);
    if (this.value[nextPos] === this.thousandsSeparator) cursorPos += direction;
    return cursorPos;
  }

  /**
    @override
  */
  doValidate(flags) {
    const regexp = flags.input ? this._numberRegExpInput : this._numberRegExp;

    // validate as string
    let valid = regexp.test(this._removeThousandsSeparators(this.value));

    if (valid) {
      // validate as number
      const number = this.number;
      valid = valid && !isNaN(number) && (
      // check min bound for negative values
      this.min == null || this.min >= 0 || this.min <= this.number) && (
      // check max bound for positive values
      this.max == null || this.max <= 0 || this.number <= this.max);
    }

    return valid && super.doValidate(flags);
  }

  /**
    @override
  */
  doCommit() {
    const number = this.number;
    let validnum = number;

    // check bounds
    if (this.min != null) validnum = Math.max(validnum, this.min);
    if (this.max != null) validnum = Math.min(validnum, this.max);

    if (validnum !== number) this.unmaskedValue = String(validnum);

    let formatted = this.value;

    if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
    if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);

    this._value = formatted;
    super.doCommit();
  }

  /** */
  _normalizeZeros(value) {
    const parts = this._removeThousandsSeparators(value).split(this.radix);

    // remove leading zeros
    parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, (match, sign, zeros, num) => sign + num);
    // add leading zero
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

  /**
    @param {Object} opts
  */

  /** Compliled {@link Masked} options */
  constructor(opts) {
    super(_extends({}, MaskedDynamic.DEFAULTS, opts));

    this.currentMask = null;
  }

  /**
    @override
  */

  /** Chooses {@link Masked} depending on input value */

  /** Currently chosen mask */
  _update(opts) {
    super._update(opts);
    // mask could be totally dynamic with only `dispatch` option
    this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => createMask(m)) : [];
  }

  /**
    @override
  */
  _append(str, ...args) {
    str = this.doPrepare(str, ...args);

    const details = this._applyDispatch(str, ...args);

    if (this.currentMask) {
      details.aggregate(this.currentMask._append(str, ...args));
    }

    return details;
  }

  _applyDispatch(appended, ...args) {
    const oldValueLength = this.value.length;
    const inputValue = this.rawInputValue;
    const oldMask = this.currentMask;
    const details = new ChangeDetails();

    this.currentMask = this.doDispatch(appended, ...args);
    if (this.currentMask && this.currentMask !== oldMask) {
      this.currentMask.reset();
      // $FlowFixMe - it's ok, we don't change current mask
      this.currentMask._append(inputValue, { raw: true });
      details.shift = this.value.length - oldValueLength;
    }

    return details;
  }

  /**
    @override
  */
  doDispatch(appended, flags = {}) {
    return this.dispatch(appended, this, flags);
  }

  /**
    @override
  */
  clone() {
    const m = new MaskedDynamic(this);
    m._value = this.value;

    // try to keep reference to compiled masks
    const currentMaskIndex = this.compiledMasks.indexOf(this.currentMask);
    if (this.currentMask) {
      m.currentMask = currentMaskIndex >= 0 ? m.compiledMasks[currentMaskIndex].assign(this.currentMask) : this.currentMask.clone();
    }

    return m;
  }

  /**
    @override
  */
  reset() {
    if (this.currentMask) this.currentMask.reset();
    this.compiledMasks.forEach(cm => cm.reset());
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
  get isComplete() {
    return !!this.currentMask && this.currentMask.isComplete;
  }

  /**
    @override
  */
  remove(...args) {
    const details = new ChangeDetails();
    if (this.currentMask) {
      details.aggregate(this.currentMask.remove(...args))
      // update with dispatch
      .aggregate(this._applyDispatch(''));
    }

    return details;
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
  _extractTail(...args) {
    return this.currentMask ? this.currentMask._extractTail(...args) : super._extractTail(...args);
  }

  /**
    @override
  */
  _appendTail(...args) {
    return this.currentMask ? this.currentMask._appendTail(...args) : super._appendTail(...args);
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

    const inputValue = masked.rawInputValue;

    // update all
    masked.compiledMasks.forEach(cm => {
      cm.rawInputValue = inputValue;
      cm._append(appended, flags);
    });

    // pop masks with longer values first
    const inputs = masked.compiledMasks.map((cm, index) => ({ value: cm.rawInputValue.length, index }));
    inputs.sort((i1, i2) => i2.value - i1.value);

    return masked.compiledMasks[inputs[0].index];
  }
};

/**
 * Applies mask on element.
 * @constructor
 * @param {HTMLInput|UIElement} el - Element to apply mask
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

g.IMask = IMask;

export default IMask;
//# sourceMappingURL=imask.es.js.map
