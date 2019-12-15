class ChangeDetails {
  constructor(details) {
    Object.assign(this, {
      inserted: '',
      overflow: false,
      removedCount: 0,
      shift: 0
    }, details);
  }

  aggregate(details) {
    this.inserted += details.inserted;
    this.removedCount += details.removedCount;
    this.shift += details.shift;
    this.overflow = this.overflow || details.overflow;
    if (details.rawInserted) this.rawInserted += details.rawInserted;
    return this;
  }

  get offset() {
    return this.shift + this.inserted.length - this.removedCount;
  }

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

class Masked {
  constructor(opts) {
    this._value = '';
    this._update(_extends({}, Masked.DEFAULTS, opts));
    this.isInitialized = true;
  }

  updateOptions(opts) {
    this.withValueRefresh(this._update.bind(this, opts));
  }

  _update(opts) {
    Object.assign(this, opts);
  }

  clone() {
    const m = new Masked(this);
    m._value = this.value.slice();
    return m;
  }

  reset() {
    this._value = '';
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this.resolve(value);
  }

  resolve(value) {
    this.reset();
    this.appendWithTail(value);
    this.doCommit();
    return this.value;
  }

  get unmaskedValue() {
    return this._unmask();
  }

  set unmaskedValue(value) {
    this.reset();
    this._append(value);
    this.appendWithTail("");
    this.doCommit();
  }

  get rawInputValue() {
    return this.extractInput(0, this.value.length, { raw: true });
  }

  set rawInputValue(value) {
    this.reset();
    this._append(value, { raw: true });
    this.appendWithTail("");
    this.doCommit();
  }

  get isComplete() {
    return true;
  }

  nearestInputPos(cursorPos) /* direction */{
    return cursorPos;
  }

  extractInput(fromPos = 0, toPos = this.value.length /*, flags */) {
    return this.value.slice(fromPos, toPos);
  }

  extractTail(fromPos = 0, toPos = this.value.length) {
    return this.extractInput(fromPos, toPos);
  }

  _appendTail(tail) {
    return !tail ? new ChangeDetails() : this._append(tail, { tail: true });
  }

  _append(str, flags = {}) {
    const oldValueLength = this.value.length;
    let consistentValue = this.clone();
    let overflow = false;

    str = this.doPrepare(str, flags);
    for (let ci = 0; ci < str.length; ++ci) {
      this._value += str[ci];
      if (this.doValidate(flags) === false) {
        Object.assign(this, consistentValue);
        if (!flags.input) {
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
        Object.assign(this, consistentValue);
        break;
      }

      consistentValue = this.clone();
      Object.assign(this, consistentAppended);
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

  _unmask() {
    return this.value;
  }

  remove(from = 0, count = this.value.length - from) {
    this._value = this.value.slice(0, from) + this.value.slice(from + count);
  }

  withValueRefresh(fn) {
    if (this._refreshing || !this.isInitialized) return fn();
    this._refreshing = true;

    const unmasked = this.unmaskedValue;

    const ret = fn();

    this.unmaskedValue = unmasked;

    delete this._refreshing;
    return ret;
  }

  doPrepare(str, flags) {
    return this.prepare(str, this, flags);
  }

  doValidate(flags) {
    return this.validate(this.value, this, flags);
  }

  doCommit() {
    this.commit(this.value, this);
  }

  // TODO
  // insert (str, fromPos, flags)

  splice(start, deleteCount, inserted, removeDirection) {
    const tailPos = start + deleteCount;
    const tail = this.extractTail(tailPos);

    const startChangePos = this.nearestInputPos(start, removeDirection);
    this.remove(startChangePos);
    const changeDetails = this.appendWithTail(inserted, tail);

    // adjust shift if start was aligned
    changeDetails.shift += startChangePos - start;
    return changeDetails;
  }
}

Masked.DEFAULTS = {
  prepare: val => val,
  validate: () => true,
  commit: () => {}
};

function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function conform(res, str, fallback = '') {
  return isString(res) ? res : res ? str : fallback;
}

const DIRECTION = {
  NONE: 0,
  LEFT: -1,
  RIGHT: 1
};

function indexInDirection(pos, direction) {
  if (direction === DIRECTION.LEFT) --pos;
  return pos;
}

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

class MaskedRegExp extends Masked {
  _update(opts) {
    opts.validate = value => value.search(opts.mask) >= 0;
    super._update(opts);
  }
}

class MaskedFunction extends Masked {
  _update(opts) {
    opts.validate = opts.mask;
    super._update(opts);
  }
}

class MaskedNumber extends Masked {
  constructor(opts) {
    opts.postFormat = Object.assign({}, MaskedNumber.DEFAULTS.postFormat, opts.postFormat);
    super(_extends({}, MaskedNumber.DEFAULTS, opts));
  }

  _update(opts) {
    opts.postFormat = Object.assign({}, this.postFormat, opts.postFormat);

    super._update(opts);
    this._updateRegExps();
  }

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

  extractTail(fromPos = 0, toPos = this.value.length) {
    return this._removeThousandsSeparators(super.extractTail(fromPos, toPos));
  }

  _removeThousandsSeparators(value) {
    return value.replace(this._thousandsSeparatorRegExp, '');
  }

  _insertThousandsSeparators(value) {
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    const parts = value.split(this.radix);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    return parts.join(this.radix);
  }

  doPrepare(str, ...args) {
    return super.doPrepare(this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix)), ...args);
  }

  appendWithTail(str, tail) {
    const oldValueLength = this.value.length;
    this._value = this._removeThousandsSeparators(this.value);
    let startChangePos = this.value.length;

    const appendDetails = super.appendWithTail(str, tail);
    this._value = this._insertThousandsSeparators(this.value);

    // calculate offsets after insert separators
    let beforeTailPos = startChangePos + appendDetails.inserted.length;
    for (let pos = 0; pos <= beforeTailPos; ++pos) {
      if (this.value[pos] === this.thousandsSeparator) {
        if (pos <= startChangePos) ++startChangePos;
        ++beforeTailPos;
      }
    }

    // adjust details with separators
    appendDetails.rawInserted = appendDetails.inserted;
    appendDetails.inserted = this.value.slice(startChangePos, beforeTailPos);
    appendDetails.shift += startChangePos - oldValueLength;

    return appendDetails;
  }

  nearestInputPos(cursorPos, direction = DIRECTION.LEFT) {
    if (!direction) return cursorPos;

    const nextPos = indexInDirection(cursorPos, direction);
    if (this.value[nextPos] === this.thousandsSeparator) cursorPos += direction;
    return cursorPos;
  }

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

  doCommit() {
    const number = this.number;
    let validnum = number;

    // check bounds
    if (this.min != null) validnum = Math.max(validnum, this.min);
    if (this.max != null) validnum = Math.min(validnum, this.max);

    if (validnum !== number) this.unmaskedValue = String(validnum);

    let formatted = this.value;

    if (this.postFormat.normalizeZeros) formatted = this._normalizeZeros(formatted);
    if (this.postFormat.padFractionalZeros) formatted = this._padFractionalZeros(formatted);

    this._value = formatted;
    super.doCommit();
  }

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

  _padFractionalZeros(value) {
    const parts = value.split(this.radix);
    if (parts.length < 2) parts.push('');
    parts[1] = parts[1].padEnd(this.scale, '0');
    return parts.join(this.radix);
  }

  get number() {
    let numstr = this._removeThousandsSeparators(this._normalizeZeros(this.unmaskedValue)).replace(this.radix, '.');

    return Number(numstr);
  }

  set number(number) {
    this.unmaskedValue = String(number).replace('.', this.radix);
  }

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
  postFormat: {
    normalizeZeros: true,
    padFractionalZeros: false
  }
};

function maskedClass(mask) {
  if (mask == null) {
    throw new Error('mask property should be defined');
  }

  if (mask instanceof RegExp) return MaskedRegExp;
  if (isString(mask)) return IMask.MaskedPattern;
  if (mask.prototype instanceof Masked) return mask;
  if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic;
  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return MaskedNumber;
  if (mask instanceof Date || mask === Date) return IMask.MaskedDate;
  if (mask instanceof Function) return MaskedFunction;

  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
  return Masked;
}

function createMask(opts) {
  opts = Object.assign({}, opts); // clone
  const mask = opts.mask;

  if (mask instanceof Masked) return mask;

  const MaskedClass = maskedClass(mask);
  return new MaskedClass(opts);
}

class PatternDefinition {
  constructor(opts) {
    Object.assign(this, opts);

    if (this.mask) {
      this._masked = createMask(opts);
    }
  }

  reset() {
    this.isHollow = false;
    this.isRawInput = false;
    if (this._masked) this._masked.reset();
  }

  get isInput() {
    return this.type === PatternDefinition.TYPES.INPUT;
  }

  get isHiddenHollow() {
    return this.isHollow && this.optional;
  }

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
PatternDefinition.TYPES = {
  INPUT: 'input',
  FIXED: 'fixed'
};

class PatternGroup {
  constructor(masked, { name, offset, mask, validate }) {
    this.masked = masked;
    this.name = name;
    this.offset = offset;
    this.mask = mask;
    this.validate = validate || (() => true);
  }

  get value() {
    return this.masked.value.slice(this.masked.mapDefIndexToPos(this.offset), this.masked.mapDefIndexToPos(this.offset + this.mask.length));
  }

  get unmaskedValue() {
    return this.masked.extractInput(this.masked.mapDefIndexToPos(this.offset), this.masked.mapDefIndexToPos(this.offset + this.mask.length));
  }

  doValidate(opts) {
    return this.validate(this.value, this, opts);
  }
}

class RangeGroup {
  constructor([from, to], maxlen = String(to).length) {
    this._from = from;
    this._to = to;
    this._maxLength = maxlen;
    this.validate = this.validate.bind(this);

    this._update();
  }

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

    var _str$match = str.match(/^(\D*)(\d*)(\D*)/),
        _str$match2 = slicedToArray(_str$match, 3);

    const placeholder = _str$match2[1],
          num = _str$match2[2];

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

function EnumGroup(enums) {
  return {
    mask: '*'.repeat(enums[0].length),
    validate: (value, group) => enums.some(e => e.indexOf(group.unmaskedValue) >= 0)
  };
}

PatternGroup.Range = RangeGroup;
PatternGroup.Enum = EnumGroup;

class MaskedPattern extends Masked {
  constructor(opts = {}) {
    opts.placeholder = Object.assign({}, MaskedPattern.DEFAULT_PLACEHOLDER, opts.placeholder);
    opts.definitions = Object.assign({}, PatternDefinition.DEFAULTS, opts.definitions);
    super(opts);
  }

  _update(opts) {
    opts.placeholder = Object.assign({}, this.placeholder, opts.placeholder);
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);
    super._update(opts);
    this._updateMask();
  }

  _updateMask() {
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
      let type = !unmaskingBlock && char in defs ? PatternDefinition.TYPES.INPUT : PatternDefinition.TYPES.FIXED;
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
        // TODO validation
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

  doValidate(...args) {
    return this._groupDefs.every(g => g.doValidate(...args)) && super.doValidate(...args);
  }

  clone() {
    const m = new MaskedPattern(this);
    m._value = this.value;
    m._charDefs.forEach((d, i) => Object.assign(d, this._charDefs[i]));
    m._groupDefs.forEach((d, i) => Object.assign(d, this._groupDefs[i]));
    return m;
  }

  reset() {
    super.reset();
    this._charDefs.forEach(d => {
      delete d.isHollow;
    });
  }

  get isComplete() {
    return !this._charDefs.some((d, i) => d.isInput && !d.optional && (d.isHollow || !this.extractInput(i, i + 1)));
  }

  hiddenHollowsBefore(defIndex) {
    return this._charDefs.slice(0, defIndex).filter(d => d.isHiddenHollow).length;
  }

  mapDefIndexToPos(defIndex) {
    if (defIndex == null) return;
    return defIndex - this.hiddenHollowsBefore(defIndex);
  }

  mapPosToDefIndex(pos) {
    if (pos == null) return;
    let defIndex = pos;
    for (let di = 0; di < this._charDefs.length; ++di) {
      const def = this._charDefs[di];
      if (di >= defIndex) break;
      if (def.isHiddenHollow) ++defIndex;
    }
    return defIndex;
  }

  _unmask() {
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

  _appendTail(tail) {
    return (!tail ? new ChangeDetails() : this._appendChunks(tail, { tail: true })).aggregate(this._appendPlaceholder());
  }

  _append(str, flags = {}) {
    const oldValueLength = this.value.length;
    let rawInserted = '';
    let overflow = false;

    str = this.doPrepare(str, flags.input);
    for (let ci = 0, di = this.mapPosToDefIndex(this.value.length); ci < str.length;) {
      const ch = str[ci];
      const def = this._charDefs[di];

      // check overflow
      if (!def) {
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
          if (!def.optional && !flags.input) {
            this._value += this.placeholder.char;
            skipped = false;
          }
          if (!skipped) def.isHollow = true;
        } else {
          rawInserted += chres;
        }
      } else {
        this._value += def.char;
        resolved = chres && (def.unmasking || flags.input) && !flags.tail;
        def.isRawInput = resolved && (flags.raw || def.unmasking && flags.input);
        if (def.isRawInput) rawInserted += chres;
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

  _appendChunks(chunks, ...args) {
    const details = new ChangeDetails();
    for (let ci = 0; ci < chunks.length; ++ci) {
      var _chunks$ci = slicedToArray(chunks[ci], 2);

      const fromDefIndex = _chunks$ci[0],
            input = _chunks$ci[1];

      if (fromDefIndex != null) details.aggregate(this._appendPlaceholder(fromDefIndex));
      if (details.aggregate(this._append(input, ...args)).overflow) break;
    }
    return details;
  }

  extractTail(fromPos, toPos) {
    return this.extractInputChunks(fromPos, toPos);
  }

  extractInput(fromPos = 0, toPos = this.value.length, flags = {}) {
    // TODO fromPos === toPos
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

  extractInputChunks(fromPos = 0, toPos = this.value.length) {
    // TODO fromPos === toPos
    const fromDefIndex = this.mapPosToDefIndex(fromPos);
    const toDefIndex = this.mapPosToDefIndex(toPos);
    const stopDefIndices = this._charDefs.map((d, i) => [d, i]).slice(fromDefIndex, toDefIndex).filter(([d]) => d.stopAlign).map(([, i]) => i);

    const stops = [fromDefIndex, ...stopDefIndices, toDefIndex];

    return stops.map((s, i) => [stopDefIndices.indexOf(s) >= 0 ? s : null, this.extractInput(this.mapDefIndexToPos(s), this.mapDefIndexToPos(stops[++i]))]).filter(([stop, input]) => stop != null || input);
  }

  _appendPlaceholder(toDefIndex) {
    const oldValueLength = this.value.length;
    const maxDefIndex = toDefIndex || this._charDefs.length;
    for (let di = this.mapPosToDefIndex(this.value.length); di < maxDefIndex; ++di) {
      const def = this._charDefs[di];
      if (def.isInput) def.isHollow = true;

      if (!this.placeholder.lazy || toDefIndex) {
        this._value += !def.isInput ? def.char : !def.optional ? this.placeholder.char : '';
      }
    }
    return new ChangeDetails({
      inserted: this.value.slice(oldValueLength)
    });
  }

  remove(from = 0, count = this.value.length - from) {
    const to = from + count;
    this._value = this.value.slice(0, from) + this.value.slice(to);
    const fromDefIndex = this.mapPosToDefIndex(from);
    const toDefIndex = this.mapPosToDefIndex(to);
    this._charDefs.slice(fromDefIndex, toDefIndex).forEach(d => d.reset());
  }

  nearestInputPos(cursorPos, direction = DIRECTION.LEFT) {
    if (!direction) return cursorPos;

    const initialDefIndex = this.mapPosToDefIndex(cursorPos);
    let di = initialDefIndex;

    let firstInputIndex, firstFilledInputIndex, firstVisibleHollowIndex, nextdi;

    // search forward
    for (nextdi = indexInDirection(di, direction); 0 <= nextdi && nextdi < this._charDefs.length; di += direction, nextdi += direction) {
      const nextDef = this._charDefs[nextdi];
      if (firstInputIndex == null && nextDef.isInput) firstInputIndex = di;
      if (firstVisibleHollowIndex == null && nextDef.isHollow && !nextDef.isHiddenHollow) firstVisibleHollowIndex = di;
      if (nextDef.isInput && !nextDef.isHollow) {
        firstFilledInputIndex = di;
        break;
      }
    }

    if (direction === DIRECTION.LEFT || firstInputIndex == null) {
      // search backwards
      direction = -direction;
      let overflow = false;

      // find hollows only before initial pos
      for (nextdi = indexInDirection(di, direction); 0 <= nextdi && nextdi < this._charDefs.length; di += direction, nextdi += direction) {
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

  group(name) {
    return this.groupsByName(name)[0];
  }

  groupsByName(name) {
    return this._groupDefs.filter(g => g.name === name);
  }
}

MaskedPattern.DEFAULT_PLACEHOLDER = {
  lazy: true,
  char: '_'
};
MaskedPattern.STOP_CHAR = '`';
MaskedPattern.ESCAPE_CHAR = '\\';
MaskedPattern.Definition = PatternDefinition;
MaskedPattern.Group = PatternGroup;

class MaskedDate extends MaskedPattern {
  constructor(opts) {
    super(_extends({}, MaskedDate.DEFAULTS, opts));
  }

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

  doValidate(...args) {
    const valid = super.doValidate(...args);
    const date = this.date;

    return valid && (!this.isComplete || this.isDateExist(this.value) && date && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
  }

  isDateExist(str) {
    return this.format(this.parse(str)) === str;
  }

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

class MaskedDynamic extends Masked {
  constructor(opts) {
    super(_extends({}, MaskedDynamic.DEFAULTS, opts));

    this.currentMask = null;
  }

  _update(opts) {
    super._update(opts);
    this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => createMask(m)) : [];
  }

  _append(str, ...args) {
    const oldValueLength = this.value.length;
    const details = new ChangeDetails();

    str = this.doPrepare(str, ...args);

    const inputValue = this.rawInputValue;
    this.currentMask = this.doDispatch(str, ...args);
    if (this.currentMask) {
      // update current mask
      this.currentMask.rawInputValue = inputValue;
      details.shift = this.value.length - oldValueLength;
      details.aggregate(this.currentMask._append(str, ...args));
    }

    return details;
  }

  appendWithTail(str, tail) {
    // TODO seems strange
    // call append to do dispatch and get offset
    return this._append('').aggregate(super.appendWithTail(str, tail));
  }

  doDispatch(appended, flags) {
    return this.dispatch(appended, this, flags);
  }

  clone() {
    const m = new MaskedDynamic(this);
    m._value = this.value;
    if (this.currentMask) m.currentMask = this.currentMask.clone();
    return m;
  }

  reset() {
    if (this.currentMask) this.currentMask.reset();
    this.compiledMasks.forEach(cm => cm.reset());
  }

  get value() {
    return this.currentMask ? this.currentMask.value : '';
  }

  set value(value) {
    this.resolve(value);
  }

  get isComplete() {
    return !!this.currentMask && this.currentMask.isComplete;
  }

  _unmask() {
    return this.currentMask ? this.currentMask._unmask() : '';
  }

  remove(...args) {
    if (this.currentMask) this.currentMask.remove(...args);
  }

  extractInput(...args) {
    return this.currentMask ? this.currentMask.extractInput(...args) : '';
  }

  doCommit() {
    if (this.currentMask) this.currentMask.doCommit();
    super.doCommit();
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

class ActionDetails {
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

  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }

  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }

  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }

  get removedCount() {
    // Math.max for opposite operation
    return Math.max(this.oldSelection.end - this.startChangePos ||
    // for Delete
    this.oldValue.length - this.value.length, 0);
  }

  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }

  get head() {
    return this.value.substring(0, this.startChangePos);
  }

  get tail() {
    this.value.substring(this.startChangePos + this.insertedCount);
  }

  get removeDirection() {
    return this.removedCount && !this.insertedCount && (this.oldSelection.end === this.cursorPos ? DIRECTION.RIGHT : DIRECTION.LEFT);
  }
}

class InputMask {
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

    this.bindEvents();

    // refresh
    this.updateValue();
    this._onChange();
  }

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

  get value() {
    return this._value;
  }

  set value(str) {
    this.masked.value = str;
    this.updateControl();
    this.alignCursor();
  }

  get unmaskedValue() {
    return this._unmaskedValue;
  }

  set unmaskedValue(str) {
    this.masked.unmaskedValue = str;
    this.updateControl();
    this.alignCursor();
  }

  bindEvents() {
    this.el.addEventListener('keydown', this._saveSelection);
    this.el.addEventListener('input', this._onInput);
    this.el.addEventListener('drop', this._onDrop);
    this.el.addEventListener('click', this.alignCursorFriendly);
    this.el.addEventListener('change', this._onChange);
  }

  unbindEvents() {
    this.el.removeEventListener('keydown', this._saveSelection);
    this.el.removeEventListener('input', this._onInput);
    this.el.removeEventListener('drop', this._onDrop);
    this.el.removeEventListener('click', this.alignCursorFriendly);
    this.el.removeEventListener('change', this._onChange);
  }

  fireEvent(ev) {
    const listeners = this._listeners[ev] || [];
    listeners.forEach(l => l());
  }

  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }

  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }

  set cursorPos(pos) {
    if (this.el !== document.activeElement) return;

    this.el.setSelectionRange(pos, pos);
    this._saveSelection();
  }

  _saveSelection() /* ev */{
    if (this.value !== this.el.value) {
      console.warn('Uncontrolled input change, refresh mask manually!'); // eslint-disable-line no-console
    }
    this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }

  updateValue() {
    this.masked.value = this.el.value;
  }

  updateControl() {
    const newUnmaskedValue = this.masked.unmaskedValue;
    const newValue = this.masked.value;
    const isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;

    this._unmaskedValue = newUnmaskedValue;
    this._value = newValue;

    if (this.el.value !== newValue) this.el.value = newValue;
    if (isChanged) this._fireChangeEvents();
  }

  updateOptions(opts) {
    opts = Object.assign({}, opts); // clone
    if (opts.mask === Date && this.masked instanceof MaskedDate) delete opts.mask;

    // check if changed
    if (objectIncludes(this.masked, opts)) return;

    this.masked.updateOptions(opts);
    this.updateControl();
  }

  updateCursor(cursorPos) {
    if (cursorPos == null) return;
    this.cursorPos = cursorPos;

    // also queue change cursor for mobile browsers
    this._delayUpdateCursor(cursorPos);
  }

  _delayUpdateCursor(cursorPos) {
    this._abortUpdateCursor();
    this._changingCursorPos = cursorPos;
    this._cursorChanging = setTimeout(() => {
      this.cursorPos = this._changingCursorPos;
      this._abortUpdateCursor();
    }, 10);
  }

  _fireChangeEvents() {
    this.fireEvent('accept');
    if (this.masked.isComplete) this.fireEvent('complete');
  }

  _abortUpdateCursor() {
    if (this._cursorChanging) {
      clearTimeout(this._cursorChanging);
      delete this._cursorChanging;
    }
  }

  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.cursorPos);
  }

  alignCursorFriendly() {
    if (this.selectionStart !== this.cursorPos) return;
    this.alignCursor();
  }

  on(ev, handler) {
    if (!this._listeners[ev]) this._listeners[ev] = [];
    this._listeners[ev].push(handler);
    return this;
  }

  off(ev, handler) {
    if (!this._listeners[ev]) return;
    if (!handler) {
      delete this._listeners[ev];
      return;
    }
    const hIndex = this._listeners[ev].indexOf(handler);
    if (hIndex >= 0) this._listeners.splice(hIndex, 1);
    return this;
  }

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

  _onChange() {
    if (this.value !== this.el.value) {
      this.updateValue();
    }
    this.masked.doCommit();
    this.updateControl();
  }

  _onDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  destroy() {
    this.unbindEvents();
    this._listeners.length = 0;
  }
}

function IMask$1(el, opts = {}) {
  // currently available only for input-like elements
  return new InputMask(el, opts);
}

IMask$1.InputMask = InputMask;

IMask$1.Masked = Masked;
IMask$1.MaskedPattern = MaskedPattern;
IMask$1.MaskedNumber = MaskedNumber;
IMask$1.MaskedDate = MaskedDate;
IMask$1.MaskedRegExp = MaskedRegExp;
IMask$1.MaskedFunction = MaskedFunction;
IMask$1.MaskedDynamic = MaskedDynamic;

window.IMask = IMask$1;

export default IMask$1;
//# sourceMappingURL=imask.es.js.map
