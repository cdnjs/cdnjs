import { applyPatch } from 'fast-json-patch';
import stringify from 'json-stringify-pretty-compact';
import * as vegaImport from 'vega';
import { writeConfig, isString, mergeConfig, isBoolean, isObject } from 'vega';
import { expressionInterpreter } from 'vega-interpreter';
import * as vegaLiteImport from 'vega-lite';
import schemaParser from 'vega-schema-url-parser';
import * as themes from 'vega-themes';
import { Handler } from 'vega-tooltip';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var iterator;
var hasRequiredIterator;
function requireIterator() {
  if (hasRequiredIterator) return iterator;
  hasRequiredIterator = 1;
  iterator = function (Yallist) {
    Yallist.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value;
      }
    };
  };
  return iterator;
}

var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;
function Yallist$1(list) {
  var self = this;
  if (!(self instanceof Yallist$1)) {
    self = new Yallist$1();
  }
  self.tail = null;
  self.head = null;
  self.length = 0;
  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }
  return self;
}
Yallist$1.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist$1.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist$1.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist$1.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};
Yallist$1.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};
Yallist$1.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist$1.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist$1.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }
  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }
  return acc;
};
Yallist$1.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }
  return acc;
};
Yallist$1.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist$1.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist$1.prototype.slice = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.sliceReverse = function (from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.splice = function (start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};
Yallist$1.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self, node, value) {
  var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
  if (inserted.next === null) {
    self.tail = inserted;
  }
  if (inserted.prev === null) {
    self.head = inserted;
  }
  self.length++;
  return inserted;
}
function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);
  if (!self.head) {
    self.head = self.tail;
  }
  self.length++;
}
function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);
  if (!self.tail) {
    self.tail = self.head;
  }
  self.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  // add if support for Symbol.iterator is present
  requireIterator()(Yallist$1);
} catch (er) {}

// A linked list to keep track of recently-used-ness
const Yallist = yallist;
const MAX = Symbol('max');
const LENGTH = Symbol('length');
const LENGTH_CALCULATOR = Symbol('lengthCalculator');
const ALLOW_STALE = Symbol('allowStale');
const MAX_AGE = Symbol('maxAge');
const DISPOSE = Symbol('dispose');
const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
const LRU_LIST = Symbol('lruList');
const CACHE = Symbol('cache');
const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');
const naiveLength = () => 1;

// lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.
class LRUCache {
  constructor(options) {
    if (typeof options === 'number') options = {
      max: options
    };
    if (!options) options = {};
    if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number');
    // Kind of weird to have a default max of Infinity, but oh well.
    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }

  // resize the cache when the max changes.
  set max(mL) {
    if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }

  // resize the cache when the lengthCalculator changes.
  set lengthCalculator(lC) {
    if (typeof lC !== 'function') lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(hit => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null;) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null;) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map(k => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map(k => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = new Map(); // hash of items by key
    this[LRU_LIST] = new Yallist(); // list of items in order of use recency
    this[LENGTH] = 0; // length of items in the list
  }

  dump() {
    return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter(h => h);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;

      // dispose of the old one before overwriting
      // split out into 2 ifs for better coverage tracking
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);

    // oversized objects fall out of cache automatically.
    if (hit.length > this[MAX]) {
      if (this[DISPOSE]) this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key)) return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node) return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    // reset the cache
    this.reset();
    const now = Date.now();
    // A previous serialized cache has the most recent items first
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        // the item was created without expiration in a non aged cache
        this.set(hit.k, hit.v);else {
        const maxAge = expiresAt - now;
        // dont add already expired items
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self, key, doUse) => {
  const node = self[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) return undefined;
    } else {
      if (doUse) {
        if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
        self[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self, hit) => {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
  const diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
};
const trim = self => {
  if (self[LENGTH] > self[MAX]) {
    for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      const prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
};
const del = (self, node) => {
  if (node) {
    const hit = node.value;
    if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    if (!self[ALLOW_STALE]) hit = undefined;
  }
  if (hit) fn.call(thisp, hit.value, hit.key, self);
};
var lruCache = LRUCache;

// parse out just the options we care about
const looseOption = Object.freeze({
  loose: true
});
const emptyOpts = Object.freeze({});
const parseOptions$1 = options => {
  if (!options) {
    return emptyOpts;
  }
  if (typeof options !== 'object') {
    return looseOption;
  }
  return options;
};
var parseOptions_1 = parseOptions$1;

var re$1 = {exports: {}};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
const SEMVER_SPEC_VERSION = '2.0.0';
const MAX_LENGTH$1 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */9007199254740991;

// Max safe segment length for coercion.
const MAX_SAFE_COMPONENT_LENGTH = 16;

// Max safe length for a build identifier. The max length minus 6 characters for
// the shortest version with a build 0.0.0+BUILD.
const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH$1 - 6;
const RELEASE_TYPES = ['major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch', 'prerelease'];
var constants = {
  MAX_LENGTH: MAX_LENGTH$1,
  MAX_SAFE_COMPONENT_LENGTH,
  MAX_SAFE_BUILD_LENGTH,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  RELEASE_TYPES,
  SEMVER_SPEC_VERSION,
  FLAG_INCLUDE_PRERELEASE: 0b001,
  FLAG_LOOSE: 0b010
};

const debug$1 = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error('SEMVER', ...args) : () => {};
var debug_1 = debug$1;

(function (module, exports) {
  const {
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_LENGTH
  } = constants;
  const debug = debug_1;
  exports = module.exports = {};

  // The actual regexps go on exports.re
  const re = exports.re = [];
  const safeRe = exports.safeRe = [];
  const src = exports.src = [];
  const t = exports.t = {};
  let R = 0;
  const LETTERDASHNUMBER = '[a-zA-Z0-9-]';

  // Replace some greedy regex tokens to prevent regex dos issues. These regex are
  // used internally via the safeRe object since all inputs in this library get
  // normalized first to trim and collapse all extra whitespace. The original
  // regexes are exported for userland consumption and lower level usage. A
  // future breaking change could export the safer regex only with a note that
  // all input should have extra whitespace removed.
  const safeRegexReplacements = [['\\s', 1], ['\\d', MAX_LENGTH], [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]];
  const makeSafeRegex = value => {
    for (const [token, max] of safeRegexReplacements) {
      value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
    }
    return value;
  };
  const createToken = (name, value, isGlobal) => {
    const safe = makeSafeRegex(value);
    const index = R++;
    debug(name, index, value);
    t[name] = index;
    src[index] = value;
    re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
    safeRe[index] = new RegExp(safe, isGlobal ? 'g' : undefined);
  };

  // The following Regular Expressions can be used for tokenizing,
  // validating, and parsing SemVer version strings.

  // ## Numeric Identifier
  // A single `0`, or a non-zero digit followed by zero or more digits.

  createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
  createToken('NUMERICIDENTIFIERLOOSE', '\\d+');

  // ## Non-numeric Identifier
  // Zero or more digits, followed by a letter or hyphen, and then zero or
  // more letters, digits, or hyphens.

  createToken('NONNUMERICIDENTIFIER', `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);

  // ## Main Version
  // Three dot-separated numeric identifiers.

  createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
  createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);

  // ## Pre-release Version Identifier
  // A numeric identifier, or a non-numeric identifier.

  createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
  createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);

  // ## Pre-release Version
  // Hyphen, followed by one or more dot-separated pre-release version
  // identifiers.

  createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
  createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);

  // ## Build Metadata Identifier
  // Any combination of digits, letters, or hyphens.

  createToken('BUILDIDENTIFIER', `${LETTERDASHNUMBER}+`);

  // ## Build Metadata
  // Plus sign, followed by one or more period-separated build metadata
  // identifiers.

  createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);

  // ## Full Version String
  // A main version, followed optionally by a pre-release version and
  // build metadata.

  // Note that the only major, minor, patch, and pre-release sections of
  // the version string are capturing groups.  The build metadata is not a
  // capturing group, because it should not ever be used in version
  // comparison.

  createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
  createToken('FULL', `^${src[t.FULLPLAIN]}$`);

  // like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
  // also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
  // common in the npm registry.
  createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
  createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
  createToken('GTLT', '((?:<|>)?=?)');

  // Something like "2.*" or "1.2.x".
  // Note that "x.x" is a valid xRange identifer, meaning "any version"
  // Only the first item is strictly required.
  createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
  createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
  createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
  createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);

  // Coercion.
  // Extract anything that could conceivably be a part of a valid semver
  createToken('COERCE', `${'(^|[^\\d])' + '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:$|[^\\d])`);
  createToken('COERCERTL', src[t.COERCE], true);

  // Tilde ranges.
  // Meaning is "reasonably at or greater than"
  createToken('LONETILDE', '(?:~>?)');
  createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = '$1~';
  createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
  createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);

  // Caret ranges.
  // Meaning is "at least and backwards compatible with"
  createToken('LONECARET', '(?:\\^)');
  createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = '$1^';
  createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
  createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);

  // A simple gt/lt/eq thing, or just "" to indicate "any version"
  createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
  createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);

  // An expression to strip any whitespace between the gtlt and the thing
  // it modifies, so that `> 1.2.3` ==> `>1.2.3`
  createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = '$1$2$3';

  // Something like `1.2.3 - 1.2.4`
  // Note that these all use the loose form, because they'll be
  // checked against either the strict or loose comparator form
  // later.
  createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
  createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);

  // Star ranges basically just allow anything at all.
  createToken('STAR', '(<|>)?=?\\s*\\*');
  // >=0.0.0 is like a star
  createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
  createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
})(re$1, re$1.exports);
var reExports = re$1.exports;

const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};

const debug = debug_1;
const {
  MAX_LENGTH,
  MAX_SAFE_INTEGER
} = constants;
const {
  safeRe: re,
  t
} = reExports;
const parseOptions = parseOptions_1;
const {
  compareIdentifiers
} = identifiers;
let SemVer$1 = class SemVer {
  constructor(version, options) {
    options = parseOptions(options);
    if (version instanceof SemVer) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== 'string') {
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
    }
    debug('SemVer', version, options);
    this.options = options;
    this.loose = !!options.loose;
    // this isn't actually relevant for versions, but keep it so that we
    // don't run into trouble passing this.options around.
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;

    // these are actually numbers
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError('Invalid major version');
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError('Invalid minor version');
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError('Invalid patch version');
    }

    // numberify any prerelease numeric ids
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split('.').map(id => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split('.') : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join('.')}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug('SemVer.compare', this.version, this.options, other);
    if (!(other instanceof SemVer)) {
      if (typeof other === 'string' && other === this.version) {
        return 0;
      }
      other = new SemVer(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }

    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0;
      } else if (b === undefined) {
        return 1;
      } else if (a === undefined) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug('prerelease compare', i, a, b);
      if (a === undefined && b === undefined) {
        return 0;
      } else if (b === undefined) {
        return 1;
      } else if (a === undefined) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }

  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(release, identifier, identifierBase) {
    switch (release) {
      case 'premajor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc('pre', identifier, identifierBase);
        break;
      case 'preminor':
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc('pre', identifier, identifierBase);
        break;
      case 'prepatch':
        // If this is already a prerelease, it will bump to the next version
        // drop any prereleases that might already exist, since they are not
        // relevant at this point.
        this.prerelease.length = 0;
        this.inc('patch', identifier, identifierBase);
        this.inc('pre', identifier, identifierBase);
        break;
      // If the input is a non-prerelease version, this acts the same as
      // prepatch.
      case 'prerelease':
        if (this.prerelease.length === 0) {
          this.inc('patch', identifier, identifierBase);
        }
        this.inc('pre', identifier, identifierBase);
        break;
      case 'major':
        // If this is a pre-major version, bump up to the same major version.
        // Otherwise increment major.
        // 1.0.0-5 bumps to 1.0.0
        // 1.1.0 bumps to 2.0.0
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'minor':
        // If this is a pre-minor version, bump up to the same minor version.
        // Otherwise increment minor.
        // 1.2.0-5 bumps to 1.2.0
        // 1.2.1 bumps to 1.3.0
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case 'patch':
        // If this is not a pre-release version, it will increment the patch.
        // If it is a pre-release it will bump up to the same patch version.
        // 1.2.0-5 patches to 1.2.0
        // 1.2.0 patches to 1.2.1
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      // This probably shouldn't be used publicly.
      // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
      case 'pre':
        {
          const base = Number(identifierBase) ? 1 : 0;
          if (!identifier && identifierBase === false) {
            throw new Error('invalid increment argument: identifier is empty');
          }
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i = this.prerelease.length;
            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++;
                i = -2;
              }
            }
            if (i === -1) {
              // didn't increment anything
              if (identifier === this.prerelease.join('.') && identifierBase === false) {
                throw new Error('invalid increment argument: identifier already exists');
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
            // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.raw = this.format();
    if (this.build.length) {
      this.raw += `+${this.build.join('.')}`;
    }
    return this;
  }
};
var semver = SemVer$1;

const SemVer = semver;
const compare$6 = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
var compare_1 = compare$6;

const compare$5 = compare_1;
const eq$1 = (a, b, loose) => compare$5(a, b, loose) === 0;
var eq_1 = eq$1;

const compare$4 = compare_1;
const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
var neq_1 = neq$1;

const compare$3 = compare_1;
const gt$1 = (a, b, loose) => compare$3(a, b, loose) > 0;
var gt_1 = gt$1;

const compare$2 = compare_1;
const gte$1 = (a, b, loose) => compare$2(a, b, loose) >= 0;
var gte_1 = gte$1;

const compare$1 = compare_1;
const lt$1 = (a, b, loose) => compare$1(a, b, loose) < 0;
var lt_1 = lt$1;

const compare = compare_1;
const lte$1 = (a, b, loose) => compare(a, b, loose) <= 0;
var lte_1 = lte$1;

const eq = eq_1;
const neq = neq_1;
const gt = gt_1;
const gte = gte_1;
const lt = lt_1;
const lte = lte_1;
const cmp = (a, op, b, loose) => {
  switch (op) {
    case '===':
      if (typeof a === 'object') {
        a = a.version;
      }
      if (typeof b === 'object') {
        b = b.version;
      }
      return a === b;
    case '!==':
      if (typeof a === 'object') {
        a = a.version;
      }
      if (typeof b === 'object') {
        b = b.version;
      }
      return a !== b;
    case '':
    case '=':
    case '==':
      return eq(a, b, loose);
    case '!=':
      return neq(a, b, loose);
    case '>':
      return gt(a, b, loose);
    case '>=':
      return gte(a, b, loose);
    case '<':
      return lt(a, b, loose);
    case '<=':
      return lte(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp;

var comparator;
var hasRequiredComparator;
function requireComparator() {
  if (hasRequiredComparator) return comparator;
  hasRequiredComparator = 1;
  const ANY = Symbol('SemVer ANY');
  // hoisted class for cyclic dependency
  class Comparator {
    static get ANY() {
      return ANY;
    }
    constructor(comp, options) {
      options = parseOptions(options);
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      comp = comp.trim().split(/\s+/).join(' ');
      debug('comparator', comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = '';
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug('comp', this);
    }
    parse(comp) {
      const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
      const m = comp.match(r);
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`);
      }
      this.operator = m[1] !== undefined ? m[1] : '';
      if (this.operator === '=') {
        this.operator = '';
      }

      // if it literally is just '>' or '' then allow anything.
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    }
    toString() {
      return this.value;
    }
    test(version) {
      debug('Comparator.test', version, this.options.loose);
      if (this.semver === ANY || version === ANY) {
        return true;
      }
      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      return cmp(version, this.operator, this.semver, this.options);
    }
    intersects(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required');
      }
      if (this.operator === '') {
        if (this.value === '') {
          return true;
        }
        return new Range(comp.value, options).test(this.value);
      } else if (comp.operator === '') {
        if (comp.value === '') {
          return true;
        }
        return new Range(this.value, options).test(comp.semver);
      }
      options = parseOptions(options);

      // Special cases where nothing can possibly be lower
      if (options.includePrerelease && (this.value === '<0.0.0-0' || comp.value === '<0.0.0-0')) {
        return false;
      }
      if (!options.includePrerelease && (this.value.startsWith('<0.0.0') || comp.value.startsWith('<0.0.0'))) {
        return false;
      }

      // Same direction increasing (> or >=)
      if (this.operator.startsWith('>') && comp.operator.startsWith('>')) {
        return true;
      }
      // Same direction decreasing (< or <=)
      if (this.operator.startsWith('<') && comp.operator.startsWith('<')) {
        return true;
      }
      // same SemVer and both sides are inclusive (<= or >=)
      if (this.semver.version === comp.semver.version && this.operator.includes('=') && comp.operator.includes('=')) {
        return true;
      }
      // opposite directions less than
      if (cmp(this.semver, '<', comp.semver, options) && this.operator.startsWith('>') && comp.operator.startsWith('<')) {
        return true;
      }
      // opposite directions greater than
      if (cmp(this.semver, '>', comp.semver, options) && this.operator.startsWith('<') && comp.operator.startsWith('>')) {
        return true;
      }
      return false;
    }
  }
  comparator = Comparator;
  const parseOptions = parseOptions_1;
  const {
    safeRe: re,
    t
  } = reExports;
  const cmp = cmp_1;
  const debug = debug_1;
  const SemVer = semver;
  const Range = requireRange();
  return comparator;
}

var range;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  // hoisted class for cyclic dependency
  class Range {
    constructor(range, options) {
      options = parseOptions(options);
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        // just put it in the set and return
        this.raw = range.value;
        this.set = [[range]];
        this.format();
        return this;
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;

      // First reduce all whitespace as much as possible so we do not have to rely
      // on potentially slow regexes like \s*. This is then stored and used for
      // future error messages as well.
      this.raw = range.trim().split(/\s+/).join(' ');

      // First, split on ||
      this.set = this.raw.split('||')
      // map the range to a 2d array of comparators
      .map(r => this.parseRange(r.trim()))
      // throw out any comparator lists that are empty
      // this generally means that it was not a valid range, which is allowed
      // in loose mode, but will still throw if the WHOLE range is invalid.
      .filter(c => c.length);
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      }

      // if we have any that are not the null set, throw out null sets.
      if (this.set.length > 1) {
        // keep the first one, in case they're all null sets
        const first = this.set[0];
        this.set = this.set.filter(c => !isNullSet(c[0]));
        if (this.set.length === 0) {
          this.set = [first];
        } else if (this.set.length > 1) {
          // if we have any that are *, then the range is just *
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c];
              break;
            }
          }
        }
      }
      this.format();
    }
    format() {
      this.range = this.set.map(comps => comps.join(' ').trim()).join('||').trim();
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(range) {
      // memoize range parsing for performance.
      // this is a very hot path, and fully deterministic.
      const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
      const memoKey = memoOpts + ':' + range;
      const cached = cache.get(memoKey);
      if (cached) {
        return cached;
      }
      const loose = this.options.loose;
      // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
      const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
      range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
      debug('hyphen replace', range);

      // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
      range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
      debug('comparator trim', range);

      // `~ 1.2.3` => `~1.2.3`
      range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
      debug('tilde trim', range);

      // `^ 1.2.3` => `^1.2.3`
      range = range.replace(re[t.CARETTRIM], caretTrimReplace);
      debug('caret trim', range);

      // At this point, the range is completely trimmed and
      // ready to be split into comparators.

      let rangeList = range.split(' ').map(comp => parseComparator(comp, this.options)).join(' ').split(/\s+/)
      // >=0.0.0 is equivalent to *
      .map(comp => replaceGTE0(comp, this.options));
      if (loose) {
        // in loose mode, throw out any that are not valid comparators
        rangeList = rangeList.filter(comp => {
          debug('loose invalid filter', comp, this.options);
          return !!comp.match(re[t.COMPARATORLOOSE]);
        });
      }
      debug('range list', rangeList);

      // if any comparators are the null set, then replace with JUST null set
      // if more than one comparator, remove any * comparators
      // also, don't include the same comparator more than once
      const rangeMap = new Map();
      const comparators = rangeList.map(comp => new Comparator(comp, this.options));
      for (const comp of comparators) {
        if (isNullSet(comp)) {
          return [comp];
        }
        rangeMap.set(comp.value, comp);
      }
      if (rangeMap.size > 1 && rangeMap.has('')) {
        rangeMap.delete('');
      }
      const result = [...rangeMap.values()];
      cache.set(memoKey, result);
      return result;
    }
    intersects(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required');
      }
      return this.set.some(thisComparators => {
        return isSatisfiable(thisComparators, options) && range.set.some(rangeComparators => {
          return isSatisfiable(rangeComparators, options) && thisComparators.every(thisComparator => {
            return rangeComparators.every(rangeComparator => {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    }

    // if ANY of the sets match ALL of its comparators, then pass
    test(version) {
      if (!version) {
        return false;
      }
      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options);
        } catch (er) {
          return false;
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true;
        }
      }
      return false;
    }
  }
  range = Range;
  const LRU = lruCache;
  const cache = new LRU({
    max: 1000
  });
  const parseOptions = parseOptions_1;
  const Comparator = requireComparator();
  const debug = debug_1;
  const SemVer = semver;
  const {
    safeRe: re,
    t,
    comparatorTrimReplace,
    tildeTrimReplace,
    caretTrimReplace
  } = reExports;
  const {
    FLAG_INCLUDE_PRERELEASE,
    FLAG_LOOSE
  } = constants;
  const isNullSet = c => c.value === '<0.0.0-0';
  const isAny = c => c.value === '';

  // take a set of comparators and determine whether there
  // exists a version which can satisfy it
  const isSatisfiable = (comparators, options) => {
    let result = true;
    const remainingComparators = comparators.slice();
    let testComparator = remainingComparators.pop();
    while (result && remainingComparators.length) {
      result = remainingComparators.every(otherComparator => {
        return testComparator.intersects(otherComparator, options);
      });
      testComparator = remainingComparators.pop();
    }
    return result;
  };

  // comprised of xranges, tildes, stars, and gtlt's at this point.
  // already replaced the hyphen ranges
  // turn into a set of JUST comparators.
  const parseComparator = (comp, options) => {
    debug('comp', comp, options);
    comp = replaceCarets(comp, options);
    debug('caret', comp);
    comp = replaceTildes(comp, options);
    debug('tildes', comp);
    comp = replaceXRanges(comp, options);
    debug('xrange', comp);
    comp = replaceStars(comp, options);
    debug('stars', comp);
    return comp;
  };
  const isX = id => !id || id.toLowerCase() === 'x' || id === '*';

  // ~, ~> --> * (any, kinda silly)
  // ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0-0
  // ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0-0
  // ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0-0
  // ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0-0
  // ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0-0
  // ~0.0.1 --> >=0.0.1 <0.1.0-0
  const replaceTildes = (comp, options) => {
    return comp.trim().split(/\s+/).map(c => replaceTilde(c, options)).join(' ');
  };
  const replaceTilde = (comp, options) => {
    const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, (_, M, m, p, pr) => {
      debug('tilde', comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        // ~1.2 == >=1.2.0 <1.3.0-0
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
      } else if (pr) {
        debug('replaceTilde pr', pr);
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
      } else {
        // ~1.2.3 == >=1.2.3 <1.3.0-0
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
      }
      debug('tilde return', ret);
      return ret;
    });
  };

  // ^ --> * (any, kinda silly)
  // ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0-0
  // ^2.0, ^2.0.x --> >=2.0.0 <3.0.0-0
  // ^1.2, ^1.2.x --> >=1.2.0 <2.0.0-0
  // ^1.2.3 --> >=1.2.3 <2.0.0-0
  // ^1.2.0 --> >=1.2.0 <2.0.0-0
  // ^0.0.1 --> >=0.0.1 <0.0.2-0
  // ^0.1.0 --> >=0.1.0 <0.2.0-0
  const replaceCarets = (comp, options) => {
    return comp.trim().split(/\s+/).map(c => replaceCaret(c, options)).join(' ');
  };
  const replaceCaret = (comp, options) => {
    debug('caret', comp, options);
    const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    const z = options.includePrerelease ? '-0' : '';
    return comp.replace(r, (_, M, m, p, pr) => {
      debug('caret', comp, _, M, m, p, pr);
      let ret;
      if (isX(M)) {
        ret = '';
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
      } else if (isX(p)) {
        if (M === '0') {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
        }
      } else if (pr) {
        debug('replaceCaret pr', pr);
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
        }
      } else {
        debug('no pr');
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
        }
      }
      debug('caret return', ret);
      return ret;
    });
  };
  const replaceXRanges = (comp, options) => {
    debug('replaceXRanges', comp, options);
    return comp.split(/\s+/).map(c => replaceXRange(c, options)).join(' ');
  };
  const replaceXRange = (comp, options) => {
    comp = comp.trim();
    const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug('xRange', comp, ret, gtlt, M, m, p, pr);
      const xM = isX(M);
      const xm = xM || isX(m);
      const xp = xm || isX(p);
      const anyX = xp;
      if (gtlt === '=' && anyX) {
        gtlt = '';
      }

      // if we're including prereleases in the match, then we need
      // to fix this to -0, the lowest possible prerelease value
      pr = options.includePrerelease ? '-0' : '';
      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          // nothing is allowed
          ret = '<0.0.0-0';
        } else {
          // nothing is forbidden
          ret = '*';
        }
      } else if (gtlt && anyX) {
        // we know patch is an x, because we have any x at all.
        // replace X with 0
        if (xm) {
          m = 0;
        }
        p = 0;
        if (gtlt === '>') {
          // >1 => >=2.0.0
          // >1.2 => >=1.3.0
          gtlt = '>=';
          if (xm) {
            M = +M + 1;
            m = 0;
            p = 0;
          } else {
            m = +m + 1;
            p = 0;
          }
        } else if (gtlt === '<=') {
          // <=0.7.x is actually <0.8.0, since any 0.7.x should
          // pass.  Similarly, <=7.x is actually <8.0.0, etc.
          gtlt = '<';
          if (xm) {
            M = +M + 1;
          } else {
            m = +m + 1;
          }
        }
        if (gtlt === '<') {
          pr = '-0';
        }
        ret = `${gtlt + M}.${m}.${p}${pr}`;
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
      }
      debug('xRange return', ret);
      return ret;
    });
  };

  // Because * is AND-ed with everything else in the comparator,
  // and '' means "any version", just remove the *s entirely.
  const replaceStars = (comp, options) => {
    debug('replaceStars', comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[t.STAR], '');
  };
  const replaceGTE0 = (comp, options) => {
    debug('replaceGTE0', comp, options);
    return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
  };

  // This function is passed to string.replace(re[t.HYPHENRANGE])
  // M, m, patch, prerelease, build
  // 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
  // 1.2.3 - 3.4 => >=1.2.0 <3.5.0-0 Any 3.4.x will do
  // 1.2 - 3.4 => >=1.2.0 <3.5.0-0
  const hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = '';
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
    } else if (fpr) {
      from = `>=${from}`;
    } else {
      from = `>=${from}${incPr ? '-0' : ''}`;
    }
    if (isX(tM)) {
      to = '';
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`;
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`;
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`;
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`;
    } else {
      to = `<=${to}`;
    }
    return `${from} ${to}`.trim();
  };
  const testSet = (set, version, options) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false;
      }
    }
    if (version.prerelease.length && !options.includePrerelease) {
      // Find the set of versions that are allowed to have prereleases
      // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
      // That should allow `1.2.3-pr.2` to pass.
      // However, `1.2.4-alpha.notready` should NOT be allowed,
      // even though it's within the range set by the comparators.
      for (let i = 0; i < set.length; i++) {
        debug(set[i].semver);
        if (set[i].semver === Comparator.ANY) {
          continue;
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver;
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true;
          }
        }
      }

      // Version has a -pre, but it's not one of the ones we like.
      return false;
    }
    return true;
  };
  return range;
}

const Range = requireRange();
const satisfies = (version, range, options) => {
  try {
    range = new Range(range, options);
  } catch (er) {
    return false;
  }
  return range.test(version);
};
var satisfies_1 = satisfies;
var satisfies$1 = /*@__PURE__*/getDefaultExportFromCjs(satisfies_1);

/**
 * Open editor url in a new window, and pass a message.
 */
function post (window, url, data) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const editor = window.open(url);
  const wait = 10_000;
  const step = 250;
  const {
    origin
  } = new URL(url);
  // eslint-disable-next-line no-bitwise
  let count = ~~(wait / step);
  function listen(evt) {
    if (evt.source === editor) {
      count = 0;
      window.removeEventListener('message', listen, false);
    }
  }
  window.addEventListener('message', listen, false);

  // send message
  // periodically resend until ack received or timeout
  function send() {
    if (count <= 0) {
      return;
    }
    editor.postMessage(data, origin);
    setTimeout(send, step);
    count -= 1;
  }
  setTimeout(send, step);
}

// generated with build-style.sh
var embedStyle = `.vega-embed {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
}
.vega-embed.has-actions {
  padding-right: 38px;
}
.vega-embed details:not([open]) > :not(summary) {
  display: none !important;
}
.vega-embed summary {
  list-style: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 6px;
  z-index: 1000;
  background: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  color: #1b1e23;
  border: 1px solid #aaa;
  border-radius: 999px;
  opacity: 0.2;
  transition: opacity 0.4s ease-in;
  cursor: pointer;
  line-height: 0px;
}
.vega-embed summary::-webkit-details-marker {
  display: none;
}
.vega-embed summary:active {
  box-shadow: #aaa 0px 0px 0px 1px inset;
}
.vega-embed summary svg {
  width: 14px;
  height: 14px;
}
.vega-embed details[open] summary {
  opacity: 0.7;
}
.vega-embed:hover summary, .vega-embed:focus-within summary {
  opacity: 1 !important;
  transition: opacity 0.2s ease;
}
.vega-embed .vega-actions {
  position: absolute;
  z-index: 1001;
  top: 35px;
  right: -9px;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  padding-top: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid #d9d9d9;
  background: white;
  animation-duration: 0.15s;
  animation-name: scale-in;
  animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
  text-align: left;
}
.vega-embed .vega-actions a {
  padding: 8px 16px;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: #434a56;
  text-decoration: none;
}
.vega-embed .vega-actions a:hover, .vega-embed .vega-actions a:focus {
  background-color: #f7f7f9;
  color: black;
}
.vega-embed .vega-actions::before, .vega-embed .vega-actions::after {
  content: "";
  display: inline-block;
  position: absolute;
}
.vega-embed .vega-actions::before {
  left: auto;
  right: 14px;
  top: -16px;
  border: 8px solid rgba(0, 0, 0, 0);
  border-bottom-color: #d9d9d9;
}
.vega-embed .vega-actions::after {
  left: auto;
  right: 15px;
  top: -14px;
  border: 7px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}
.vega-embed .chart-wrapper.fit-x {
  width: 100%;
}
.vega-embed .chart-wrapper.fit-y {
  height: 100%;
}

.vega-embed-wrapper {
  max-width: 100%;
  overflow: auto;
  padding-right: 14px;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`;

function mergeDeep(dest, ...src) {
  for (const s of src) {
    deepMerge_(dest, s);
  }
  return dest;
}
function deepMerge_(dest, src) {
  for (const property of Object.keys(src)) {
    writeConfig(dest, property, src[property], true);
  }
}

var name = "vega-embed";
var version$1 = "6.23.0";
var description = "Publish Vega visualizations as embedded web components.";
var keywords = ["vega", "data", "visualization", "component", "embed"];
var repository = {
  type: "git",
  url: "http://github.com/vega/vega-embed.git"
};
var author = {
  name: "UW Interactive Data Lab",
  url: "http://idl.cs.washington.edu"
};
var contributors = [{
  name: "Dominik Moritz",
  url: "https://www.domoritz.de"
}];
var bugs = {
  url: "https://github.com/vega/vega-embed/issues"
};
var homepage = "https://github.com/vega/vega-embed#readme";
var license = "BSD-3-Clause";
var main = "build/vega-embed.js";
var module = "build/vega-embed.module.js";
var unpkg = "build/vega-embed.min.js";
var jsdelivr = "build/vega-embed.min.js";
var types = "build/vega-embed.module.d.ts";
var files = ["src", "build", "patches"];
var devDependencies = {
  "@babel/core": "^7.22.9",
  "@babel/plugin-proposal-async-generator-functions": "^7.20.7",
  "@babel/plugin-proposal-json-strings": "^7.18.6",
  "@babel/plugin-proposal-object-rest-spread": "^7.20.7",
  "@babel/plugin-proposal-optional-catch-binding": "^7.18.6",
  "@babel/plugin-transform-runtime": "^7.22.9",
  "@babel/preset-env": "^7.22.9",
  "@babel/preset-typescript": "^7.22.5",
  "@release-it/conventional-changelog": "^7.0.0",
  "@rollup/plugin-commonjs": "25.0.4",
  "@rollup/plugin-json": "^6.0.0",
  "@rollup/plugin-node-resolve": "^15.1.0",
  "@rollup/plugin-terser": "^0.4.3",
  "@types/semver": "^7.5.0",
  "@typescript-eslint/eslint-plugin": "^6.2.0",
  "@typescript-eslint/parser": "^6.2.0",
  "browser-sync": "^2.29.3",
  concurrently: "^8.2.0",
  "del-cli": "^5.0.0",
  eslint: "^8.46.0",
  "eslint-config-prettier": "^9.0.0",
  "eslint-plugin-jest": "^27.2.3",
  "eslint-plugin-prettier": "^5.0.0",
  jest: "^29.6.2",
  "jest-canvas-mock": "^2.5.2",
  "jest-environment-jsdom": "^29.6.2",
  "patch-package": "^8.0.0",
  "postinstall-postinstall": "^2.1.0",
  prettier: "^3.0.0",
  "release-it": "^16.1.3",
  rollup: "3.29.1",
  "rollup-plugin-bundle-size": "^1.0.3",
  "rollup-plugin-ts": "^3.2.0",
  sass: "^1.64.1",
  typescript: "^5.1.6",
  vega: "^5.22.1",
  "vega-lite": "^5.2.0"
};
var peerDependencies = {
  vega: "^5.21.0",
  "vega-lite": "*"
};
var dependencies = {
  "fast-json-patch": "^3.1.1",
  "json-stringify-pretty-compact": "^3.0.0",
  semver: "^7.5.4",
  tslib: "^2.6.1",
  "vega-interpreter": "^1.0.5",
  "vega-schema-url-parser": "^2.2.0",
  "vega-themes": "^2.14.0",
  "vega-tooltip": "^0.33.0"
};
var bundledDependencies = ["yallist"];
var scripts = {
  prebuild: "yarn clean && yarn build:style",
  build: "rollup -c",
  "build:style": "./build-style.sh",
  clean: "del-cli build src/style.ts",
  prepublishOnly: "yarn clean && yarn build",
  preversion: "yarn lint && yarn test",
  serve: "browser-sync start --directory -s -f build *.html",
  start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
  pretest: "yarn build:style",
  test: "jest",
  "test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
  prettierbase: "prettier '*.{css,scss,html}'",
  format: "eslint . --fix && yarn prettierbase --write",
  lint: "eslint . && yarn prettierbase --check",
  release: "release-it"
};
var pkg = {
  name: name,
  version: version$1,
  description: description,
  keywords: keywords,
  repository: repository,
  author: author,
  contributors: contributors,
  bugs: bugs,
  homepage: homepage,
  license: license,
  main: main,
  module: module,
  unpkg: unpkg,
  jsdelivr: jsdelivr,
  types: types,
  files: files,
  devDependencies: devDependencies,
  peerDependencies: peerDependencies,
  dependencies: dependencies,
  bundledDependencies: bundledDependencies,
  scripts: scripts
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
const version = pkg.version;
const vega = vegaImport;
let vegaLite = vegaLiteImport;

// For backwards compatibility with Vega-Lite before v4.
const w = typeof window !== 'undefined' ? window : undefined;
if (vegaLite === undefined && w?.vl?.compile) {
  vegaLite = w.vl;
}
const DEFAULT_ACTIONS = {
  export: {
    svg: true,
    png: true
  },
  source: true,
  compiled: true,
  editor: true
};
const I18N = {
  CLICK_TO_VIEW_ACTIONS: 'Click to view actions',
  COMPILED_ACTION: 'View Compiled Vega',
  EDITOR_ACTION: 'Open in Vega Editor',
  PNG_ACTION: 'Save as PNG',
  SOURCE_ACTION: 'View Source',
  SVG_ACTION: 'Save as SVG'
};
const NAMES = {
  vega: 'Vega',
  'vega-lite': 'Vega-Lite'
};
const VERSION = {
  vega: vega.version,
  'vega-lite': vegaLite ? vegaLite.version : 'not available'
};
const PREPROCESSOR = {
  vega: vgSpec => vgSpec,
  'vega-lite': (vlSpec, config) => vegaLite.compile(vlSpec, {
    config: config
  }).spec
};
const SVG_CIRCLES = `
<svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
  <circle r="2" cy="8" cx="2"></circle>
  <circle r="2" cy="8" cx="8"></circle>
  <circle r="2" cy="8" cx="14"></circle>
</svg>`;
const CHART_WRAPPER_CLASS = 'chart-wrapper';
function isTooltipHandler(h) {
  return typeof h === 'function';
}
function viewSource(source, sourceHeader, sourceFooter, mode) {
  const header = `<html><head>${sourceHeader}</head><body><pre><code class="json">`;
  const footer = `</code></pre>${sourceFooter}</body></html>`;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const win = window.open('');
  win.document.write(header + source + footer);
  win.document.title = `${NAMES[mode]} JSON Source`;
}

/**
 * Try to guess the type of spec.
 *
 * @param spec Vega or Vega-Lite spec.
 */
function guessMode(spec, providedMode) {
  // Decide mode
  if (spec.$schema) {
    const parsed = schemaParser(spec.$schema);
    if (providedMode && providedMode !== parsed.library) {
      console.warn(`The given visualization spec is written in ${NAMES[parsed.library]}, but mode argument sets ${NAMES[providedMode] ?? providedMode}.`);
    }
    const mode = parsed.library;
    if (!satisfies$1(VERSION[mode], `^${parsed.version.slice(1)}`)) {
      console.warn(`The input spec uses ${NAMES[mode]} ${parsed.version}, but the current version of ${NAMES[mode]} is v${VERSION[mode]}.`);
    }
    return mode;
  }

  // try to guess from the provided spec
  if ('mark' in spec || 'encoding' in spec || 'layer' in spec || 'hconcat' in spec || 'vconcat' in spec || 'facet' in spec || 'repeat' in spec) {
    return 'vega-lite';
  }
  if ('marks' in spec || 'signals' in spec || 'scales' in spec || 'axes' in spec) {
    return 'vega';
  }
  return providedMode ?? 'vega';
}
function isLoader(o) {
  return !!(o && 'load' in o);
}
function createLoader(opts) {
  return isLoader(opts) ? opts : vega.loader(opts);
}
function embedOptionsFromUsermeta(parsedSpec) {
  const opts = parsedSpec.usermeta?.embedOptions ?? {};
  if (isString(opts.defaultStyle)) {
    // we don't allow styles set via usermeta since it would allow injection of logic (we set the style via innerHTML)
    opts.defaultStyle = false;
  }
  return opts;
}

/**
 * Embed a Vega visualization component in a web page. This function returns a promise.
 *
 * @param el        DOM element in which to place component (DOM node or CSS selector).
 * @param spec      String : A URL string from which to load the Vega specification.
 *                  Object : The Vega/Vega-Lite specification as a parsed JSON object.
 * @param opts       A JavaScript object containing options for embedding.
 */
async function embed(el, spec, opts = {}) {
  let parsedSpec;
  let loader;
  if (isString(spec)) {
    loader = createLoader(opts.loader);
    parsedSpec = JSON.parse(await loader.load(spec));
  } else {
    parsedSpec = spec;
  }
  const loadedEmbedOptions = embedOptionsFromUsermeta(parsedSpec);
  const usermetaLoader = loadedEmbedOptions.loader;

  // either create the loader for the first time or create a new loader if the spec has new loader options
  if (!loader || usermetaLoader) {
    loader = createLoader(opts.loader ?? usermetaLoader);
  }
  const usermetaOpts = await loadOpts(loadedEmbedOptions, loader);
  const parsedOpts = await loadOpts(opts, loader);
  const mergedOpts = _objectSpread(_objectSpread({}, mergeDeep(parsedOpts, usermetaOpts)), {}, {
    config: mergeConfig(parsedOpts.config ?? {}, usermetaOpts.config ?? {})
  });
  return await _embed(el, parsedSpec, mergedOpts, loader);
}
async function loadOpts(opt, loader) {
  const config = isString(opt.config) ? JSON.parse(await loader.load(opt.config)) : opt.config ?? {};
  const patch = isString(opt.patch) ? JSON.parse(await loader.load(opt.patch)) : opt.patch;
  return _objectSpread(_objectSpread(_objectSpread({}, opt), patch ? {
    patch
  } : {}), config ? {
    config
  } : {});
}
function getRoot(el) {
  const possibleRoot = el.getRootNode ? el.getRootNode() : document;
  return possibleRoot instanceof ShadowRoot ? {
    root: possibleRoot,
    rootContainer: possibleRoot
  } : {
    root: document,
    rootContainer: document.head ?? document.body
  };
}
async function _embed(el, spec, opts = {}, loader) {
  const config = opts.theme ? mergeConfig(themes[opts.theme], opts.config ?? {}) : opts.config;
  const actions = isBoolean(opts.actions) ? opts.actions : mergeDeep({}, DEFAULT_ACTIONS, opts.actions ?? {});
  const i18n = _objectSpread(_objectSpread({}, I18N), opts.i18n);
  const renderer = opts.renderer ?? 'canvas';
  const logLevel = opts.logLevel ?? vega.Warn;
  const downloadFileName = opts.downloadFileName ?? 'visualization';
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  if (!element) {
    throw new Error(`${el} does not exist`);
  }
  if (opts.defaultStyle !== false) {
    const ID = 'vega-embed-style';
    const {
      root,
      rootContainer
    } = getRoot(element);
    if (!root.getElementById(ID)) {
      const style = document.createElement('style');
      style.id = ID;
      style.innerHTML = opts.defaultStyle === undefined || opts.defaultStyle === true ? (embedStyle ).toString() : opts.defaultStyle;
      rootContainer.appendChild(style);
    }
  }
  const mode = guessMode(spec, opts.mode);
  let vgSpec = PREPROCESSOR[mode](spec, config);
  if (mode === 'vega-lite') {
    if (vgSpec.$schema) {
      const parsed = schemaParser(vgSpec.$schema);
      if (!satisfies$1(VERSION.vega, `^${parsed.version.slice(1)}`)) {
        console.warn(`The compiled spec uses Vega ${parsed.version}, but current version is v${VERSION.vega}.`);
      }
    }
  }
  element.classList.add('vega-embed');
  if (actions) {
    element.classList.add('has-actions');
  }
  element.innerHTML = ''; // clear container

  let container = element;
  if (actions) {
    const chartWrapper = document.createElement('div');
    chartWrapper.classList.add(CHART_WRAPPER_CLASS);
    element.appendChild(chartWrapper);
    container = chartWrapper;
  }
  const patch = opts.patch;
  if (patch) {
    vgSpec = patch instanceof Function ? patch(vgSpec) : applyPatch(vgSpec, patch, true, false).newDocument;
  }

  // Set locale. Note that this is a global setting.
  if (opts.formatLocale) {
    vega.formatLocale(opts.formatLocale);
  }
  if (opts.timeFormatLocale) {
    vega.timeFormatLocale(opts.timeFormatLocale);
  }

  // Set custom expression functions
  if (opts.expressionFunctions) {
    for (const name in opts.expressionFunctions) {
      const expressionFunction = opts.expressionFunctions[name];
      if ('fn' in expressionFunction) {
        vega.expressionFunction(name, expressionFunction.fn, expressionFunction['visitor']);
      } else if (expressionFunction instanceof Function) {
        vega.expressionFunction(name, expressionFunction);
      }
    }
  }
  const {
    ast
  } = opts;

  // Do not apply the config to Vega when we have already applied it to Vega-Lite.
  // This call may throw an Error if parsing fails.
  const runtime = vega.parse(vgSpec, mode === 'vega-lite' ? {} : config, {
    ast
  });
  const view = new (opts.viewClass || vega.View)(runtime, _objectSpread({
    loader,
    logLevel,
    renderer
  }, ast ? {
    expr: vega.expressionInterpreter ?? opts.expr ?? expressionInterpreter
  } : {}));
  view.addSignalListener('autosize', (_, autosize) => {
    const {
      type
    } = autosize;
    if (type == 'fit-x') {
      container.classList.add('fit-x');
      container.classList.remove('fit-y');
    } else if (type == 'fit-y') {
      container.classList.remove('fit-x');
      container.classList.add('fit-y');
    } else if (type == 'fit') {
      container.classList.add('fit-x', 'fit-y');
    } else {
      container.classList.remove('fit-x', 'fit-y');
    }
  });
  if (opts.tooltip !== false) {
    const handler = isTooltipHandler(opts.tooltip) ? opts.tooltip :
    // user provided boolean true or tooltip options
    new Handler(opts.tooltip === true ? {} : opts.tooltip).call;
    view.tooltip(handler);
  }
  let {
    hover
  } = opts;
  if (hover === undefined) {
    hover = mode === 'vega';
  }
  if (hover) {
    const {
      hoverSet,
      updateSet
    } = typeof hover === 'boolean' ? {} : hover;
    view.hover(hoverSet, updateSet);
  }
  if (opts) {
    if (opts.width != null) {
      view.width(opts.width);
    }
    if (opts.height != null) {
      view.height(opts.height);
    }
    if (opts.padding != null) {
      view.padding(opts.padding);
    }
  }
  await view.initialize(container, opts.bind).runAsync();
  let documentClickHandler;
  if (actions !== false) {
    let wrapper = element;
    if (opts.defaultStyle !== false || opts.forceActionsMenu) {
      const details = document.createElement('details');
      details.title = i18n.CLICK_TO_VIEW_ACTIONS;
      element.append(details);
      wrapper = details;
      const summary = document.createElement('summary');
      summary.innerHTML = SVG_CIRCLES;
      details.append(summary);
      documentClickHandler = ev => {
        if (!details.contains(ev.target)) {
          details.removeAttribute('open');
        }
      };
      document.addEventListener('click', documentClickHandler);
    }
    const ctrl = document.createElement('div');
    wrapper.append(ctrl);
    ctrl.classList.add('vega-actions');

    // add 'Export' action
    if (actions === true || actions.export !== false) {
      for (const ext of ['svg', 'png']) {
        if (actions === true || actions.export === true || actions.export[ext]) {
          const i18nExportAction = i18n[`${ext.toUpperCase()}_ACTION`];
          const exportLink = document.createElement('a');
          const scaleFactor = isObject(opts.scaleFactor) ? opts.scaleFactor[ext] : opts.scaleFactor;
          exportLink.text = i18nExportAction;
          exportLink.href = '#';
          exportLink.target = '_blank';
          exportLink.download = `${downloadFileName}.${ext}`;
          // add link on mousedown so that it's correct when the click happens
          exportLink.addEventListener('mousedown', async function (e) {
            e.preventDefault();
            const url = await view.toImageURL(ext, scaleFactor);
            this.href = url;
          });
          ctrl.append(exportLink);
        }
      }
    }

    // add 'View Source' action
    if (actions === true || actions.source !== false) {
      const viewSourceLink = document.createElement('a');
      viewSourceLink.text = i18n.SOURCE_ACTION;
      viewSourceLink.href = '#';
      viewSourceLink.addEventListener('click', function (e) {
        viewSource(stringify(spec), opts.sourceHeader ?? '', opts.sourceFooter ?? '', mode);
        e.preventDefault();
      });
      ctrl.append(viewSourceLink);
    }

    // add 'View Compiled' action
    if (mode === 'vega-lite' && (actions === true || actions.compiled !== false)) {
      const compileLink = document.createElement('a');
      compileLink.text = i18n.COMPILED_ACTION;
      compileLink.href = '#';
      compileLink.addEventListener('click', function (e) {
        viewSource(stringify(vgSpec), opts.sourceHeader ?? '', opts.sourceFooter ?? '', 'vega');
        e.preventDefault();
      });
      ctrl.append(compileLink);
    }

    // add 'Open in Vega Editor' action
    if (actions === true || actions.editor !== false) {
      const editorUrl = opts.editorUrl ?? 'https://vega.github.io/editor/';
      const editorLink = document.createElement('a');
      editorLink.text = i18n.EDITOR_ACTION;
      editorLink.href = '#';
      editorLink.addEventListener('click', function (e) {
        post(window, editorUrl, {
          config: config,
          mode,
          renderer,
          spec: stringify(spec)
        });
        e.preventDefault();
      });
      ctrl.append(editorLink);
    }
  }
  function finalize() {
    if (documentClickHandler) {
      document.removeEventListener('click', documentClickHandler);
    }
    view.finalize();
  }
  return {
    view,
    spec,
    vgSpec,
    finalize,
    embedOptions: opts
  };
}

export { DEFAULT_ACTIONS, embed as default, guessMode, vega, vegaLite, version };
//# sourceMappingURL=vega-embed.module.js.map
