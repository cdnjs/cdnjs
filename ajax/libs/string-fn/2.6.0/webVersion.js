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

  function compose(...fns){return(...args)=>{const h1=fns.slice();if(h1.length>0){const fn=h1.pop();let j1=fn(...args);while(h1.length>0){j1=h1.pop()(j1);}return j1;}return void 0;};}function type(a){const l1=typeof a;if(a===null){return'Null';}else if(a===void 0){return'Undefined';}else if(l1==='boolean'){return'Boolean';}else if(l1==='number'){return'Number';}else if(l1==='string'){return'String';}else if(Array.isArray(a)){return'Array';}else if(a instanceof RegExp){return'RegExp';}const m1=a.toString();if(m1.startsWith('async')){return'Async';}else if(m1==='[object Promise]'){return'Promise';}else if(m1.includes('function')||m1.includes('=>')){return'Function';}return'Object';}function drop(L1,x){if(arguments.length===1){return M1=>drop(L1,M1);}return x.slice(L1);}function mapObject(fn,i2){const j2={};for(const k2 in i2){j2[k2]=fn(i2[k2],k2);}return j2;}function map(fn,m2){if(arguments.length===1){return n2=>map(fn,n2);}if(m2===void 0){return[];}if(!Array.isArray(m2)){return mapObject(fn,m2);}let o2=-1;const p2=m2.length,q2=Array(p2);while(++o2<p2){q2[o2]=fn(m2[o2]);}return q2;}function head(a){if(typeof a==='string'){return a[0]||'';}return a[0];}function baseSlice(V2,W2,X2){let Y2=-1,Z2=V2.length;X2=X2>Z2?Z2:X2;if(X2<0){X2+=Z2;}Z2=W2>X2?0:X2-W2>>>0;W2>>>=0;const a3=Array(Z2);while(++Y2<Z2){a3[Y2]=V2[Y2+W2];}return a3;}function init(a){if(typeof a==='string'){return a.slice(0,-1);}return a.length?baseSlice(a,0,-1):[];}function join(d3,e3){if(arguments.length===1){return f3=>join(d3,f3);}return e3.join(d3);}function last(a){if(typeof a==='string'){return a[a.length-1]||'';}return a[a.length-1];}function length(x){return x.length;}function match(l3,x){if(arguments.length===1){return m3=>match(l3,m3);}const n3=x.match(l3);return n3===null?[]:n3;}function merge(o3,p3){if(arguments.length===1){return q3=>merge(o3,q3);}return Object.assign({},o3||{},p3||{});}function partialCurry(fn,P3={}){return Q3=>{if(type(fn)==='Async'||type(fn)==='Promise'){return new Promise((R3,S3)=>{fn(merge(Q3,P3)).then(R3).catch(S3);});}return fn(merge(Q3,P3));};}function replace(V4,W4,X4){if(W4===void 0){return(Y4,Z4)=>replace(V4,Y4,Z4);}else if(X4===void 0){return a5=>replace(V4,W4,a5);}return X4.replace(V4,W4);}function split(n5,o5){if(arguments.length===1)return p5=>split(n5,p5);return o5.split(n5);}function tail(x5){return drop(1,x5);}function test(G5,H5){if(arguments.length===1)return I5=>test(G5,I5);return H5.search(G5)!==-1;}function toLower(x){return x.toLowerCase();}function toUpper(x){return x.toUpperCase();}

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
    return test(WORDS_EXTENDED, char);
  }

  function isPunctuation(char) {
    return test(PUNCTUATIONS, char);
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
    if (test(PUNCTUATIONSX, word) || word.length <= 1) {
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

  function stripTags(str) {
    return replace(/\s+/g, ' ', replace(HTML_TAGS, ' ', str)).trim();
  }

  function mergeAll(arr) {
    let willReturn = {};
    map(val => {
      willReturn = merge(willReturn, val);
    }, arr);

    return willReturn;
  }

  function mapToObject(fn, list) {
    return mergeAll(map(fn, list));
  }

  function takeArguments(url, sep = '?', rawFlag = false) {
    const [, ...rawArguments] = url.split(sep);
    if (rawArguments.length === 0) return {};

    return mapToObject(x => {
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
  exports.stripTags = stripTags;
  exports.takeArguments = takeArguments;
  exports.titleCase = titleCase;
  exports.trim = trim$1;
  exports.words = words;
  exports.wordsX = wordsX;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
