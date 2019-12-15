(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.StringFn = {})));
}(this, (function (exports) { 'use strict';

//Taken from https://github.com/getify/Functional-Light-JS/blob/master/ch4.md
function compose(...fns) {
  return result => {
    const list = fns.slice();

    while (list.length > 0) {
      result = list.pop()(result);
    }

    return result;
  };
}

function drop(dropNumber, x) {
  if (x === undefined) {
    return xHolder => drop(dropNumber, xHolder);
  }

  return x.slice(dropNumber);
}

function mapObject(fn, obj) {
  const willReturn = {};

  for (const prop in obj) {
    willReturn[prop] = fn(obj[prop]);
  }

  return willReturn;
}

function map(fn, arr) {
  if (arr === undefined) {
    return arrHolder => map(fn, arrHolder);
  }
  if (arr.length === undefined) {
    return mapObject(fn, arr);
  }
  let index = -1;
  const len = arr.length;
  const willReturn = Array(len);

  while (++index < len) {
    willReturn[index] = fn(arr[index]);
  }

  return willReturn;
}

function head(a) {
  if (typeof a === 'string') {
    return a[0] || '';
  }

  return a[0];
}

function baseSlice(array, start, end) {
  let index = -1;
  let length = array.length;

  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;

  const result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

function init(a) {
  if (typeof a === 'string') {
    return a.slice(0, -1);
  }

  return a.length ? baseSlice(a, 0, -1) : [];
}

function join(glue, arr) {
  if (arr === undefined) {
    return arrHolder => join(glue, arrHolder);
  }

  return arr.join(glue);
}

function last(a) {
  if (typeof a === 'string') {
    return a[a.length - 1] || '';
  }

  return a[a.length - 1];
}

function length(x) {
  return x.length;
}

function match(regex, x) {
  if (x === undefined) {
    return xHolder => match(regex, xHolder);
  }
  const willReturn = x.match(regex);

  return willReturn === null ? [] : willReturn;
}

function replace(regex, replacer, str) {
  if (replacer === undefined) {
    return (replacerHolder, strHolder) => replace(regex, replacerHolder, strHolder);
  } else if (str === undefined) {
    return strHolder => replace(regex, replacer, strHolder);
  }

  return str.replace(regex, replacer);
}

function split(glue, str) {
  if (str === undefined) {
    return strHolder => split(glue, strHolder);
  }

  return str.split(glue);
}

function tail(arr) {
  return drop(1, arr);
}

function test(regex, str) {
  if (str === undefined) {
    return strHolder => test(regex, strHolder);
  }

  return str.search(regex) !== -1;
}

function toLower(x) {
  return x.toLowerCase();
}

function toUpper(x) {
  return x.toUpperCase();
}

function between(str, left, right) {
  return last(split(left, head(split(right, str)))).trim();
}

const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g;
const WORDS_EXTENDED = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])/g;
const PUNCTUATIONS = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g;
const HTML_TAGS = /<[^>]*>/g;

function words(str) {

  return match(WORDS, str);
}

function camelCase(str, flag = false) {
  const result = join('', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, words(str)));

  return `${toLower(head(result))}${tail(result)}`;
}

function count(str, substr) {
  return length(split(substr, str)) - 1;
}

function distance(a, b) {
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }
  let i, j, prev, val, tmp;

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

  return str.includes(globStr);
}

function indent(str, indentCount) {
  return join('\n', map(val => `${' '.repeat(indentCount)}${val}`, split('\n', str)));
}

function kebabCase(str) {
  return toLower(join('-', words(str)));
}

function trim$1(str) {
  return replace(/\s+/g, ' ', str).trim();
}

function maskWordHelper(word, replacer, charLimit) {
  if (test(PUNCTUATIONS, word) || word.length < 2) {
    return word;
  }

  if (word.length < charLimit) {
    return `${head(word)}${replacer.repeat(word.length - 1)}`;
  }

  return `${head(word)}${replacer.repeat(word.length - 2)}${last(word)}`;
}

const addSpaceAroundPunctuation = sentence => sentence.replace(PUNCTUATIONS, x => ` ${x} `);

function maskSentence({ sentence, replacer = '_', charLimit = 3, words = [] }) {
  sentence = trim$1(addSpaceAroundPunctuation(sentence));

  const hidden = [];
  const visible = [];

  map(val => {
    let visiblePart;

    if (words.length === 0 || words.includes(val)) {
      visiblePart = maskWordHelper(val, replacer, charLimit);
    } else {
      visiblePart = val;
    }
    hidden.push(val);
    visible.push(visiblePart);
  }, split(' ', sentence));

  return {
    hidden,
    visible
  };
}

function maskWords({ words, replacer = '_', charLimit = 3 }) {
  const result = map(val => maskWordHelper(val, replacer, charLimit), split(' ', words));

  return join(' ', result);
}

function redux(x) {
  return compose(join('_'), map(toUpper), words)(x);
}

function removeIndent(str) {
  return join('\n', map(val => val.trimLeft(), split('\n', str)));
}

function reverse$1(str) {

  return str.split('').reverse().join('');
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

const addSpaceAroundPunctuation$1 = sentence => sentence.replace(PUNCTUATIONS, match$$1 => ` ${match$$1} `);

function splitSentence(sentence) {
  return split(" ", trim$1(addSpaceAroundPunctuation$1(sentence)));
}

function stripPunctuation(str) {
  return replace(PUNCTUATIONS, '', str);
}

function stripTags(str) {
  return replace(/\s+/g, ' ', replace(HTML_TAGS, ' ', str)).trim();
}

function titleCase(str) {
  return join(' ', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, words(str)));
}

function words$1(str) {

  return match(WORDS_EXTENDED, str);
}

exports.between = between;
exports.camelCase = camelCase;
exports.count = count;
exports.distance = distance;
exports.distanceGerman = distanceGerman;
exports.glob = glob;
exports.indent = indent;
exports.kebabCase = kebabCase;
exports.maskSentence = maskSentence;
exports.maskWords = maskWords;
exports.redux = redux;
exports.removeIndent = removeIndent;
exports.reverse = reverse$1;
exports.seoTitle = seoTitle;
exports.shuffle = shuffle;
exports.snakeCase = snakeCase;
exports.splitSentence = splitSentence;
exports.stripPunctuation = stripPunctuation;
exports.stripTags = stripTags;
exports.titleCase = titleCase;
exports.trim = trim$1;
exports.words = words;
exports.wordsX = words$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
