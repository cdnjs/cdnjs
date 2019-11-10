(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.StringFn = {})));
}(this, (function (exports) { 'use strict';

  function between(str, left, rightRaw) {
    // if(str === 2) return
    const right = rightRaw === undefined ? left : rightRaw;

    const rightIndex = str.lastIndexOf(right);
    const leftIndex = str.indexOf(left);

    return rightIndex === -1 ? str : str.substring(leftIndex + left.length, rightIndex).trim();
  }

  function compose(...fns){return(...args)=>{const h1=fns.slice();if(h1.length>0){const fn=h1.pop();let j1=fn(...args);while(h1.length>0){j1=h1.pop()(j1);}return j1;}return void 0;};}function type(a){const l1=typeof a;if(a===null){return'Null';}else if(a===void 0){return'Undefined';}else if(l1==='boolean'){return'Boolean';}else if(l1==='number'){return'Number';}else if(l1==='string'){return'String';}else if(Array.isArray(a)){return'Array';}else if(a instanceof RegExp){return'RegExp';}const m1=a.toString();if(m1.startsWith('async')){return'Async';}else if(m1==='[object Promise]'){return'Promise';}else if(m1.includes('function')||m1.includes('=>')){return'Function';}return'Object';}function drop(L1,x){if(arguments.length===1){return M1=>drop(L1,M1);}return x.slice(L1);}function mapObject(fn,i2){const j2={};for(const k2 in i2){j2[k2]=fn(i2[k2],k2);}return j2;}function map(fn,m2){if(arguments.length===1){return n2=>map(fn,n2);}if(m2===void 0){return[];}if(!Array.isArray(m2)){return mapObject(fn,m2);}let o2=-1;const p2=m2.length,q2=Array(p2);while(++o2<p2){q2[o2]=fn(m2[o2]);}return q2;}function head(a){if(typeof a==='string'){return a[0]||'';}return a[0];}function baseSlice(V2,W2,X2){let Y2=-1,Z2=V2.length;X2=X2>Z2?Z2:X2;if(X2<0){X2+=Z2;}Z2=W2>X2?0:X2-W2>>>0;W2>>>=0;const a3=Array(Z2);while(++Y2<Z2){a3[Y2]=V2[Y2+W2];}return a3;}function init(a){if(typeof a==='string'){return a.slice(0,-1);}return a.length?baseSlice(a,0,-1):[];}function join(d3,e3){if(arguments.length===1){return f3=>join(d3,f3);}return e3.join(d3);}function last(a){if(typeof a==='string'){return a[a.length-1]||'';}return a[a.length-1];}function length(x){return x.length;}function match(l3,x){if(arguments.length===1){return m3=>match(l3,m3);}const n3=x.match(l3);return n3===null?[]:n3;}function merge(o3,p3){if(arguments.length===1){return q3=>merge(o3,q3);}return Object.assign({},o3||{},p3||{});}function partialCurry(fn,P3={}){return Q3=>{if(type(fn)==='Async'||type(fn)==='Promise'){return new Promise((R3,S3)=>{fn(merge(Q3,P3)).then(R3).catch(S3);});}return fn(merge(Q3,P3));};}function replace(V4,W4,X4){if(W4===void 0){return(Y4,Z4)=>replace(V4,Y4,Z4);}else if(X4===void 0){return a5=>replace(V4,W4,a5);}return X4.replace(V4,W4);}function split(n5,o5){if(arguments.length===1)return p5=>split(n5,p5);return o5.split(n5);}function tail(x5){return drop(1,x5);}function test$1(G5,H5){if(arguments.length===1)return I5=>test$1(G5,I5);return H5.search(G5)!==-1;}function toLower(x){return x.toLowerCase();}function toUpper(x){return x.toUpperCase();}

  const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g;
  const WORDS_EXTENDED = /[A-Z\xC0-\xD6\xD8-\xDEА-Я]?[a-z\xDF-\xF6\xF8-\xFFа-я]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])/g;
  const PUNCTUATIONSX = /[",\.\?]/g;
  const PUNCTUATIONS = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g;
  const HTML_TAGS = /<[^>]*>/g;

  function words(str) {
    return match(WORDS, str);
  }

  function camelCase(str) {
    const result = join('', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, words(str)));

    return `${toLower(head(result))}${tail(result)}`;
  }

  function count(str, substr) {
    return length(split(substr, str)) - 1;
  }

  const constantCase = /*#__PURE__*/compose( /*#__PURE__*/join('_'), /*#__PURE__*/map(toUpper), words);

  function distance(a, b) {
    if (a.length === 0) {
      return b.length;
    }
    if (b.length === 0) {
      return a.length;
    }
    let i, j, prev, tmp, val;

    if (a.length > b.length) {
      tmp = a;
      a = b;
      b = tmp;
    }

    const row = Array(a.length + 1);

    for (i = 0; i <= a.length; i++) {
      row[i] = i;
    }

    for (i = 1; i <= b.length; i++) {
      prev = i;
      for (j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          val = row[j - 1];
        } else {
          val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
        }
        row[j - 1] = prev;
        prev = val;
      }
      row[a.length] = prev;
    }

    return row[a.length];
  }

  const normalizeGermanChar = char => {
    const arr = ['ä', 'ö', 'ü', 'ß'];
    const normalizedArr = ['a', 'o', 'u', 'ss'];
    const foundIndex = arr.indexOf(char);

    if (foundIndex === -1) {
      return char;
    }

    return normalizedArr[foundIndex];
  };

  const normalizeGermanWord = str => join('', map(val => normalizeGermanChar(val), split('', toLower(str))));

  function distanceGerman(a, b) {
    return distance(normalizeGermanWord(a), normalizeGermanWord(b));
  }

  function dotCase(str) {
    return join('.', map(toLower, words(str)));
  }

  function glob(str, globStr) {
    const numGlobs = count(globStr, '*');

    if (numGlobs === 1) {
      if (head(globStr) === '*') {
        return str.endsWith(tail(globStr));
      } else if (last(globStr) === '*') {
        return str.startsWith(init(globStr));
      }
    } else if (numGlobs === 2 && head(globStr) === '*' && last(globStr) === '*') {
      globStr = init(tail(globStr));
      const foundIndex = str.indexOf(globStr);

      return foundIndex > 0 && foundIndex + globStr.length < str.length;
    }

    return false;
  }

  function indent(str, indentCount) {
    return join('\n', map(val => `${' '.repeat(indentCount)}${val}`, split('\n', str)));
  }

  function isLetter(char) {
    return test$1(WORDS_EXTENDED, char);
  }

  function isPunctuation(char) {
    return test$1(PUNCTUATIONS, char);
  }

  function kebabCase(str) {
    return toLower(join('-', words(str)));
  }

  function trim$1(str) {
    return replace(/\s+/g, ' ', str).trim();
  }

  const humanLengths = {
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight'
  };

  const globs = {
    easyFive: '*123*',
    easySix: '*123**',
    easySixR: '**234*',
    easierSix: '*123**',
    easierSixR: '**234*',
    easySeven: '*1234**',
    easySevenR: '**2345*',
    easierSeven: '**234**',
    easyEight: '**2345**',
    easierEight: '**234***',
    easierEightR: '***345**',
    easyAny: len => `**${'-'.repeat(len - 5)}***`,
    easierAny: len => `***${'-'.repeat(len - 6)}***`
  };

  function chance() {
    return Math.random() > 0.49;
  }

  function getGlob(len, mode, random) {
    if (len > 8) return globs[`${mode}Any`](len);
    if (len === 5) return globs.easyFive;
    const base = `${mode}${humanLengths[len]}`;
    const maybeKey = globs[base];

    if (!random) {
      return maybeKey === undefined ? globs[`easy${humanLengths[len]}`] : maybeKey;
    }

    return globs[`${base}R`] === undefined ? maybeKey : chance() ? globs[`${base}R`] : maybeKey;
  }

  function ant(word, glob, replacer) {
    const chars = [...word];

    return chars.map((char, i) => glob[i] === '*' ? char : replacer).join('');
  }

  function maskWordHelper(word, replacer, charLimit = 4) {
    if (test$1(PUNCTUATIONSX, word) || word.length <= 1) {
      return word;
    }

    if (word.length < charLimit) {
      return `${head(word)}${replacer.repeat(word.length - 1)}`;
    }

    return `${head(word)}${replacer.repeat(word.length - 2)}${last(word)}`;
  }

  function maskWordHelperX({
    word,
    replacer = '_',
    easyMode = false,
    randomMode = false,
    easierMode = false,
    charLimit = 4
  }) {
    const len = word.length;
    if (!easyMode && !easierMode || len <= 4) return maskWordHelper(word, replacer, charLimit);

    const glob = getGlob(len, easyMode ? 'easy' : 'easier', randomMode);

    return ant(word, glob, replacer);
  }

  const addSpaceAroundPunctuation = sentence => sentence.replace(PUNCTUATIONSX, x => ` ${x} `);

  /**
   * Use shorter version of PUNCTUATIONS so_
   * cases `didn't` and `по-добри` be handled
   */
  function maskSentence({
    charLimit = 4,
    easyMode = false,
    easierMode = false,
    randomMode = false,
    replacer = '_',
    sentence,
    words = []
  }) {
    const parsed = trim$1(addSpaceAroundPunctuation(sentence));
    const hidden = [];
    const visible = [];
    const input = {
      replacer,
      easyMode,
      randomMode,
      easierMode,
      charLimit
    };
    const easyFn = partialCurry(maskWordHelperX, input);
    const ant$$1 = easierMode || easyMode ? word => easyFn({ word }) : word => maskWordHelper(word, replacer, charLimit);

    map(word => {
      const ok = words.length === 0 || words.includes(word);

      const visiblePart = ok ? ant$$1(word) : word;

      hidden.push(word);
      visible.push(visiblePart);
    }, split(' ', parsed));

    return {
      hidden,
      visible
    };
  }

  function maskWords({ words, replacer = '_', charLimit = 3 }) {
    const result = map(val => maskWordHelper(val, replacer, charLimit), split(' ', words));

    return join(' ', result);
  }

  function parseInput(inputRaw) {
    if (typeof inputRaw !== 'string') throw new Error('inputRaw !== string');

    const numbers = [];
    const chars = [];
    let flag = false;

    inputRaw.split('').forEach(x => {
      if (flag && x) {

        chars.push(x);
      } else if (!flag) {

        const isNumber = Number(x) === Number(x);

        if (isNumber) {

          numbers.push(x);
        } else {

          chars.push(x);
          flag = true;
        }
      } else {

        flag = true;
      }
    });

    return {
      numbers: Number(numbers.join('')),
      chars: chars.join('')
    };
  }

  const hash = {
    1: ['s', 'seconds', 'second', 'sec'],
    60: ['m', 'minutes', 'minute', 'min'],
    3600: ['h', 'hours', 'hour'],
    86400: ['d', 'days', 'day']
  };

  function findInHash(hashKey) {
    const [found] = Object.keys(hash).filter(singleKey => hash[singleKey].includes(hashKey));

    if (!found) throw new Error('no numbers passed to `ms`');

    return found;
  }

  function ms(inputRaw) {
    const input = parseInput(inputRaw);

    const miliseconds = findInHash(input.chars);

    return Math.floor(Number(miliseconds) * 1000 * input.numbers);
  }

  function pascalCase(str) {
    return join('', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, words(str)));
  }

  function removeIndent(str) {
    return join('\n', map(val => val.trimLeft(), split('\n', str)));
  }

  function reverse$1(str) {
    return [...str].reverse().join('');
  }

  function seoTitle(str, limit = 3) {
    const result = join(' ', map(val => {
      if (val.length >= limit) {
        return `${toUpper(head(val))}${toLower(tail(val))}`;
      }

      return val;
    }, words(str)));

    return `${toUpper(head(result))}${tail(result)}`;
  }

  const shuffleArr = arr => {
    let counter = arr.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }

    return arr;
  };

  function shuffle(str) {
    return join('', shuffleArr(split('', str)));
  }

  function snakeCase(str) {
    return toLower(join('_', words(str)));
  }

  function workingMan(partialSplitted, perLine) {
    let lengthHolder = 0;
    let counter = -1;
    let didOverflow = false;
    const willReturn = [];
    const len = partialSplitted.length;
    const overTheTop = head(partialSplitted).length >= perLine;

    while (lengthHolder < perLine && counter + 1 < len) {
      counter++;
      const currentInstance = partialSplitted[counter];
      const mystery = lengthHolder + currentInstance.length + 1;

      if (mystery > perLine) {

        didOverflow = true;
        if (overTheTop) willReturn.push(currentInstance);
      } else {

        willReturn.push(currentInstance);
      }

      lengthHolder = mystery;
    }

    const okCounter = counter - len + 1 === 0;

    const isOver = didOverflow ? overTheTop : okCounter;

    const newPartialSplitted = partialSplitted.slice(willReturn.length);

    return {
      end: isOver,
      readyForPush: willReturn,
      newPartialSplitted: newPartialSplitted
    };
  }

  function splitPerLine({
    text,
    splitChar = ' ',
    perLine = 30
  }) {
    const willReturn = [];
    let counter = -1;
    let splitted = text.split(splitChar);
    const len = splitted.length;

    while (counter++ < len) {
      const {
        end,
        newPartialSplitted,
        readyForPush
      } = workingMan(splitted, perLine);

      willReturn.push(readyForPush);

      if (end) {

        counter = len;
      } else {

        splitted = newPartialSplitted;
      }
    }
    const parsed = willReturn.map(singleAnswer => singleAnswer.join(splitChar));

    return parsed;
  }

  const addSpaceAroundPunctuation$1 = sentence => sentence.replace(PUNCTUATIONS, match$$1 => ` ${match$$1} `);

  function splitSentence(sentence) {
    return split(' ', trim$1(addSpaceAroundPunctuation$1(sentence)));
  }

  function stripPunctuation(str) {
    return replace(PUNCTUATIONS, '', str);
  }

  /**Used as the `TypeError` message for "Functions" methods. */
  const FUNC_ERROR_TEXT = 'Expected a function';

  /**Used to stand-in for `undefined` hash values. */
  const HASH_UNDEFINED = '__lodash_hash_undefined__';

  /**Used as references for various `Number` constants. */
  let INFINITY = 1 / 0;

  /**`Object#toString` result references. */
  let funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      symbolTag = '[object Symbol]';

  /**Used to match property names within property paths. */
  let reLeadingDot = /^\./,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /**Used to match backslashes in property paths. */
  const reEscapeChar = /\\(\\)?/g;

  /**Used to detect host constructors (Safari). */
  const reIsHostCtor = /^\[object .+?Constructor\]$/;

  /**Detect free variable `global` from Node.js. */
  const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;

  /**Detect free variable `self`. */
  const freeSelf = typeof self === 'object' && self && self.Object === Object && self;

  /**Used as a reference to the global object. */
  const root = freeGlobal || freeSelf || /*#__PURE__*/Function('return this')();

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Checks if `value` is a host object in IE < 9.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
   */
  function isHostObject(value) {
    //Many host objects are `Object` objects that can coerce to strings
    //despite having improperly defined `toString` methods.
    let result = false;
    if (value != null && typeof value.toString !== 'function') {
      try {
        result = Boolean(String(value));
      } catch (e) {}
    }

    return result;
  }

  /**Used for built-in method references. */
  let arrayProto = Array.prototype,
      funcProto = Function.prototype,
      objectProto = Object.prototype;

  /**Used to detect overreaching core-js shims. */
  const coreJsData = root['__core-js_shared__'];

  /**Used to detect methods masquerading as native. */
  const maskSrcKey = /*#__PURE__*/function () {
    const uid = /*#__PURE__*//[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');

    return uid ? 'Symbol(src)_1.' + uid : '';
  }();

  /**Used to resolve the decompiled source of functions. */
  const funcToString = funcProto.toString;

  /**Used to check objects for own properties. */
  const hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  const objectToString = objectProto.toString;

  /**Used to detect if a method is native. */
  const reIsNative = /*#__PURE__*/RegExp('^' + /*#__PURE__*/funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

  /**Built-in value references. */
  let Symbol$1 = root.Symbol,
      splice = arrayProto.splice;

  /*Built-in method references that are verified to be native. */
  let Map = /*#__PURE__*/getNative(root, 'Map'),
      nativeCreate = /*#__PURE__*/getNative(Object, 'create');

  /**Used to convert symbols to primitives and strings. */
  let symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    let index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    const data = this.__data__;
    if (nativeCreate) {
      const result = data[key];

      return result === HASH_UNDEFINED ? undefined : result;
    }

    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    const data = this.__data__;

    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    const data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;

    return this;
  }

  //Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype.delete = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    let index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
  }

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    let data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    const lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }

    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    let data = this.__data__,
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    let data = this.__data__,
        index = assocIndexOf(data, key);

    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  //Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype.delete = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    let index = -1,
        length = entries ? entries.length : 0;

    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map || ListCache)(),
      string: new Hash()
    };
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    return getMapData(this, key).delete(key);
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);

    return this;
  }

  //Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype.delete = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    let length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    const pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;

    return pattern.test(toSource(value));
  }

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    //Exit early for strings to avoid a performance hit in some environments.
    if (typeof value === 'string') {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    const result = String(value);

    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    const data = map.__data__;

    return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    const value = getValue(object, key);

    return baseIsNative(value) ? value : undefined;
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    const type = typeof value;

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return Boolean(maskSrcKey) && maskSrcKey in func;
  }

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = /*#__PURE__*/memoize(string => {
    string = toString$1(string);

    const result = [];
    if (reLeadingDot.test(string)) {
      result.push('');
    }
    string.replace(rePropName, (match, number, quote, string) => {
      result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
    });

    return result;
  });

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to process.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return String(func);
      } catch (e) {}
    }

    return '';
  }

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func !== 'function' || resolver && typeof resolver !== 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function () {
      let args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result);

      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();

    return memoized;
  }

  //Assign cache to `_.memoize`.
  memoize.Cache = MapCache;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    //The use of `Object#toString` avoids issues with the `typeof` operator
    //in Safari 8-9 which returns 'object' for typed array and other constructors.
    const tag = isObject(value) ? objectToString.call(value) : '';

    return tag == funcTag || tag == genTag;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    const type = typeof value;

    return Boolean(value) && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return Boolean(value) && typeof value === 'object';
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value === 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString$1(value) {
    return value == null ? '' : baseToString(value);
  }

  function sort$1(fn, arr) {
    if (arguments.length === 1) return arrHolder => sort$1(fn, arrHolder);

    const arrClone = arr.concat();

    return arrClone.sort(fn);
  }

  function dropLast$1(dropNumber, x) {
    if (arguments.length === 1) {
      return xHolder => dropLast$1(dropNumber, xHolder);
    }

    return x.slice(0, -dropNumber);
  }

  function trim$2(str) {
    return str.trim();
  }

  const getMaxLength = lines => {
    const [max] = sort$1((a, b) => a.length < b.length ? 1 : -1)(lines);

    return max.length;
  };

  const BUFFER = 3;

  function fitWithinLines({
    limit,
    perLine = 30,
    text
  }) {
    let counter = perLine;
    const len = text.length;
    let answer;

    while (counter < len) {
      counter++;
      const maybeAnswer = splitPerLine({
        text,
        perLine: counter
      });
      if (maybeAnswer.length <= limit) {
        answer = maybeAnswer;
        counter = len;
      } else if (counter + BUFFER === len) {}
    }

    if (!answer) {
      const partial = trim$2(dropLast$1(BUFFER, text));
      if (partial.length < BUFFER * 2) {
        throw new Error(`such text cannot fit within ${limit} lines`);
      }

      return fitWithinLines({
        text: partial,
        perLine,
        limit
      });
    }

    return answer;
  }

  function stripTags(str) {
    return replace(/\s+/g, ' ', replace(HTML_TAGS, ' ', str)).trim();
  }

  function mergeAll$1(arr) {
    let willReturn = {};
    map(val => {
      willReturn = merge(willReturn, val);
    }, arr);

    return willReturn;
  }

  function mapToObject$1(fn, list) {
    return mergeAll$1(map(fn, list));
  }

  function takeArguments(url, sep = '?', rawFlag = false) {
    const [, ...rawArguments] = url.split(sep);
    if (rawArguments.length === 0) return {};

    return mapToObject$1(x => {
      const [keyRaw, value] = x.split('=');
      const key = rawFlag ? keyRaw : camelCase(keyRaw);
      if (value === undefined || value === 'true') {
        return { [key]: true };
      }
      if (value === 'false') {
        return { [key]: false };
      }

      if (Number.isNaN(Number(value))) {
        return { [key]: value };
      }

      return { [key]: Number(value) };
    }, rawArguments);
  }

  function titleCase(str) {
    return join(' ', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, words(str)));
  }

  function wordsX(str) {
    return match(WORDS_EXTENDED, str);
  }

  exports.between = between;
  exports.camelCase = camelCase;
  exports.count = count;
  exports.constantCase = constantCase;
  exports.distance = distance;
  exports.distanceGerman = distanceGerman;
  exports.dotCase = dotCase;
  exports.glob = glob;
  exports.indent = indent;
  exports.isLetter = isLetter;
  exports.isPunctuation = isPunctuation;
  exports.kebabCase = kebabCase;
  exports.maskSentence = maskSentence;
  exports.maskWords = maskWords;
  exports.ms = ms;
  exports.pascalCase = pascalCase;
  exports.removeIndent = removeIndent;
  exports.reverse = reverse$1;
  exports.seoTitle = seoTitle;
  exports.shuffle = shuffle;
  exports.snakeCase = snakeCase;
  exports.splitPerLine = splitPerLine;
  exports.splitSentence = splitSentence;
  exports.stripPunctuation = stripPunctuation;
  exports.getMaxLength = getMaxLength;
  exports.fitWithinLines = fitWithinLines;
  exports.stripTags = stripTags;
  exports.takeArguments = takeArguments;
  exports.titleCase = titleCase;
  exports.trim = trim$1;
  exports.words = words;
  exports.wordsX = wordsX;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
