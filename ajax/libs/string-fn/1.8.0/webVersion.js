(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.StringFn = {})));
}(this, (function (exports) { 'use strict';

  function between(str, left, rightRaw) {
    const right = rightRaw === undefined ? left : rightRaw;

    const rightIndex = str.lastIndexOf(right);
    const leftIndex = str.indexOf(left);
    return rightIndex === -1 ? str : str.substring(leftIndex + left.length, rightIndex).trim();
  }

  function compose(...fns){return(...args)=>{const h1=fns.slice();if(h1.length>0){const fn=h1.pop();let j1=fn(...args);while(h1.length>0){j1=h1.pop()(j1);}return j1;}return void 0;};}function drop(L1,x){if(arguments.length===1){return M1=>drop(L1,M1);}return x.slice(L1);}function mapObject(fn,i2){const j2={};for(const k2 in i2){j2[k2]=fn(i2[k2],k2);}return j2;}function map(fn,m2){if(arguments.length===1){return n2=>map(fn,n2);}if(m2===void 0){return[];}if(!Array.isArray(m2)){return mapObject(fn,m2);}let o2=-1;const p2=m2.length,q2=Array(p2);while(++o2<p2){q2[o2]=fn(m2[o2]);}return q2;}function head(a){if(typeof a==='string'){return a[0]||'';}return a[0];}function baseSlice(V2,W2,X2){let Y2=-1,Z2=V2.length;X2=X2>Z2?Z2:X2;if(X2<0){X2+=Z2;}Z2=W2>X2?0:X2-W2>>>0;W2>>>=0;const a3=Array(Z2);while(++Y2<Z2){a3[Y2]=V2[Y2+W2];}return a3;}function init(a){if(typeof a==='string'){return a.slice(0,-1);}return a.length?baseSlice(a,0,-1):[];}function join(d3,e3){if(arguments.length===1){return f3=>join(d3,f3);}return e3.join(d3);}function last(a){if(typeof a==='string'){return a[a.length-1]||'';}return a[a.length-1];}function length(x){return x.length;}function match(l3,x){if(arguments.length===1){return m3=>match(l3,m3);}const n3=x.match(l3);return n3===null?[]:n3;}function merge(o3,p3){if(arguments.length===1){return q3=>merge(o3,q3);}return Object.assign({},o3||{},p3||{});}function replace(V4,W4,X4){if(W4===void 0){return(Y4,Z4)=>replace(V4,Y4,Z4);}else if(X4===void 0){return a5=>replace(V4,W4,a5);}return X4.replace(V4,W4);}function split(n5,o5){if(arguments.length===1)return p5=>split(n5,p5);return o5.split(n5);}function tail(x5){return drop(1,x5);}function test(G5,H5){if(arguments.length===1)return I5=>test(G5,I5);return H5.search(G5)!==-1;}function toLower(x){return x.toLowerCase();}function toUpper(x){return x.toUpperCase();}

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

  function camelCase$1(str) {
    return join('.', map(toLower, words(str)));
  }

  function pascalCase(str) {
    return join('', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, words(str)));
  }

  function trim$1(str) {
    return replace(/\s+/g, ' ', str).trim();
  }

  function maskWordHelper(word, replacer, charLimit) {
    if (test(PUNCTUATIONSX, word) || word.length <= 2) {
      return word;
    }

    if (word.length < charLimit) {
      return `${head(word)}${replacer.repeat(word.length - 1)}`;
    }

    return `${head(word)}${replacer.repeat(word.length - 2)}${last(word)}`;
  }

  const addSpaceAroundPunctuation = sentence => sentence.replace(PUNCTUATIONSX, x => ` ${x} `);

  /**
   * Use shorter version of PUNCTUATIONS so_
   * cases `didn't` and `по-добри` be handled
   */
  function maskSentence({
    sentence,
    replacer = '_',
    charLimit = 3,
    words = []
  }) {
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

  function constantCase(x) {
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

  function takeArguments(url) {
    const [base, ...rawArguments] = url.split('?');
    if (rawArguments.length === 0) return {};

    return mapToObject(x => {
      const [key, value] = x.split('=');
      if (value === undefined || value === 'true') {
        return { [key]: true };
      }
      if (value === 'false') {
        return { [key]: false };
      }

      if (Number.isNaN(value * 1)) {
        return { [key]: value };
      }

      return { [key]: Number(value) };
    }, rawArguments);
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
  exports.dotCase = camelCase$1;
  exports.pascalCase = pascalCase;
  exports.maskSentence = maskSentence;
  exports.maskWords = maskWords;
  exports.constantCase = constantCase;
  exports.removeIndent = removeIndent;
  exports.reverse = reverse$1;
  exports.seoTitle = seoTitle;
  exports.shuffle = shuffle;
  exports.snakeCase = snakeCase;
  exports.splitSentence = splitSentence;
  exports.stripPunctuation = stripPunctuation;
  exports.stripTags = stripTags;
  exports.takeArguments = takeArguments;
  exports.titleCase = titleCase;
  exports.trim = trim$1;
  exports.words = words;
  exports.wordsX = words$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
