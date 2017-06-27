/*jshint browser:true, -W100:true, evil:true */

(function(window, undefined) {

var E= '', SP= ' ', EA= [], N= 'number', S= 'string', O= 'object',
  A= 'array', B= 'boolean', R= 'regexp', F= 'function', BN = '\n';

function makeClass() { // from: Resig, TODO: make work with strict
  return function(args) {
    if (this instanceof arguments.callee) {
      if (typeof this.init == "function") {
        this.init.apply(this, args && args.callee ? args : arguments);
      }
    } else return new arguments.callee(arguments);
  };
}

// Returns true if the object is of type 'type', otherwise false
function is(obj, type) {
  return get(obj) === type;
}

// Throws TypeError if not the correct type, else returns true
function ok(obj, type) {
  if (get(obj) != type) {
    throw TypeError('Expected ' + (type ? type.toUpperCase() : type + E) +
      ", but received " + (obj ? get(obj).toUpperCase() : obj + E));
  }
  return true;
}

function isNum(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function okeys(obj) {
  var keys = []; // replaces Object.keys();
  for (var k in obj) keys.push(k);
  return keys;
}

function err() {
  var msg = "[RiTa] " + arguments[0];
  for (var i = 1; i < arguments.length; i++)
    msg += '\n' + arguments[i];
  throw Error(msg);
}

function warn() {
  if (RiTa.SILENT || !console) return;
  if (arguments && arguments.length) {
    console.warn("[WARN] " + arguments[0]);
    for (var i = 1; i < arguments.length; i++)
      console.warn(arguments[i]);
  }
}

function log() {
  if (RiTa.SILENT || !console) return;
  console.log.apply(console, arguments);
}

function strOk(str) {
  return (typeof str === S && str.length > 0);
}

function trim(str) {
  if (!strOk(str)) return str;
  // from: http://blog.stevenlevithan.com/archives/faster-trim-javascript
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function last(word) { // last char of string
  if (!word || !word.length) return E;
  return word.charAt(word.length - 1);
}

function extend(l1, l2) { // python extend
  for (var i = 0; i < l2.length; i++)
    l1.push(l2[i]);
}

function endsWith(str, ending) {
  if (!is(str, S)) return false;
  return new RegExp(ending + '$').test(str);
}

function startsWith(str, starting) {
  if (!is(str, S)) return false;
  return new RegExp('^' + starting).test(str);
}

function equalsIgnoreCase(str1, str2) {
  return (is(str1, S) && is(str2, S)) ?
    (str1.toLowerCase() === str2.toLowerCase()) : false;
}

// Returns true if NodeJS is the current environment
function isNode() {
  return (typeof module != 'undefined' && module.exports);
}

function shuffle(oldArray) { // shuffle array
  var newArray = oldArray.slice(),
    len = newArray.length,
    i = len;
  while (i--) {
    var p = parseInt(Math.random() * len),
      t = newArray[i];
    newArray[i] = newArray[p];
    newArray[p] = t;
  }
  return newArray;
}

function inArray(array, val) {
  return (!array) ? false : array.indexOf(val) > -1;
}

function escapeRegExp(string) {
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

// From: http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
function get(obj) {
  if (typeof obj != 'undefined') // else return undef
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

'use strict';

var RiLexicon = makeClass(); // stub
RiLexicon.enabled = false;
RiLexicon.prototype.init = function() {
    throw Error('RiLexicon is not available -- ' +
      'if needed, make sure to include rilexicon.js');
};

var RiTa = {

  VERSION: '1.1.27',

  LEXICON: null, // static RiLexicon instance

  /* For tokenization, Can't -> Can not, etc. */
  SPLIT_CONTRACTIONS: false,

  JAVA: 1, JS: 2, NODE: 3,

  _FEATURES: [ 'tokens', 'stresses', 'phonemes', 'syllables', 'pos', 'text' ],

  // For Conjugator =================================

  FIRST_PERSON: 1,
  SECOND_PERSON: 2,
  THIRD_PERSON: 3,
  PAST_TENSE: 4,
  PRESENT_TENSE: 5,
  FUTURE_TENSE: 6,
  SINGULAR: 7,
  PLURAL: 8,
  NORMAL: 9,
  FEATURE_DELIM: ':',
  STRESSED: '1',
  UNSTRESSED: '0',
  PHONEME_BOUNDARY: '-',
  WORD_BOUNDARY: " ",
  SYLLABLE_BOUNDARY: "/",
  SENTENCE_BOUNDARY: "|",
  VOWELS: "aeiou",
  ABBREVIATIONS: ["Adm.", "Capt.", "Cmdr.", "Col.", "Dr.", "Gen.", "Gov.", "Lt.", "Maj.", "Messrs.", "Mr.", "Mrs.", "Ms.", "Prof.", "Rep.", "Reps.", "Rev.", "Sen.", "Sens.", "Sgt.", "Sr.", "St.", "a.k.a.", "c.f.", "i.e.", "e.g.", "vs.", "v.", "Jan.", "Feb.", "Mar.", "Apr.", "Mar.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
  ALL_PHONES: ['aa','ae','ah','ao','aw','ax','ay','b','ch','d','dh', 'eh','er','ey','f','g','hh','ih','iy','jh', 'k','l', 'm','n','ng','ow','oy','p','r','s','sh','t','th','uh', 'uw','v','w','y','z','zh'],

  /* The infinitive verb form  - 'to eat an apple' */
  INFINITIVE: 1,

  /* Gerund form of a verb  - 'eating an apple' */
  GERUND: 2,

  /* The imperative verb form - 'eat an apple!' */
  IMPERATIVE: 3,

  /* Bare infinitive verb form - 'eat an apple' */
  BARE_INFINITIVE: 4,

  /* The subjunctive verb form */
  SUBJUNCTIVE: 5,

  /* Set to true to disable all console output */
  SILENT: false,

  /* Stemmer type: Lancaster */
  LANCASTER: "Lancaster",

  /* Stemmer type: Porter */
  PORTER: "Porter",

  /* Stemmer type: Pling */
  PLING: "Pling",

  DATA_LOADED: 'DataLoaded',
  INTERNAL: 'Internal',
  UNKNOWN: 'Unknown',

  NON_BREAKING_SPACE: '<sp/>',
	PARAGRAPH_BREAK: '<p/>',  //   regex: /<p\/?>/g;
	LINE_BREAK: '<br/>',

  STOP_WORDS: [ ".", ",", "the",
    "and", "a", "of", "\"", "in", "i", ":", "you", "is", "to",
    "that", ")", "(", "it", "for", "on", "!", "have", "with", "?",
    "this", "be", "...", "not", "are", "as", "was", "but", "or", "from",
    "my", "at", "if", "they", "your", "all", "he", "by", "one",
    "me", "what", "so", "can", "will", "do", "an", "about", "we", "just",
    "would", "there", "no", "like", "out", "his", "has", "up", "more", "who",
    "when", "don't", "some", "had", "them", "any", "their", "it's", "only",
    ";", "which", "i'm", "been", "other", "were", "how", "then", "now",
    "her", "than", "she", "well", "also", "us", "very", "because",
    "am", "here", "could", "even", "him", "into", "our", "much",
    "too", "did", "should", "over", "want", "these", "may", "where", "most",
    "many", "those", "does", "why", "please", "off", "going", "its", "i've",
    "down", "that's", "can't", "you're", "didn't", "another", "around",
    "must",  "few", "doesn't", "every", "yes", "each", "maybe",
    "i'll", "away", "doing", "oh", "else", "isn't", "he's", "there's", "hi",
    "won't", "ok", "they're", "yeah", "mine", "we're", "what's", "shall",
    "she's", "hello", "okay", "here's", "-", "less"
  ],

  // Start functions =================================

  _lexicon: function() {

    if (!RiTa.LEXICON) {
      RiTa.LEXICON = new RiLexicon();
    }
    return RiTa.LEXICON;
  },

  untokenize: function(arr, delim, adjustPunctuationSpacing) {

    delim = delim || SP;
    adjustPunctuationSpacing = adjustPunctuationSpacing || 1;

    if (adjustPunctuationSpacing) {

      var newStr = arr[0] || E;
      for (var i = 1; i < arr.length; i++) {

        if (arr[i]) {

          if (!RiTa.isPunctuation(arr[i]))
            newStr += delim;

          newStr += arr[i];
        }
      }
      return newStr.trim();
    }

    return arr.join(delim);
  },

  random: function() {
    var currentRandom = Math.random();
    if (!arguments.length) return currentRandom;
    return (arguments.length === 1) ? currentRandom * arguments[0] :
      currentRandom * (arguments[1] - arguments[0]) + arguments[0];
  },

  randomItem: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  distance: function(x1, y1, x2, y2) {
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  },

  _tagForPENN: function(words) {
    if (!words || !words.length) return EA;
    var arr = is(words, S) ? RiTa.tokenize(words) : words;
    return PosTagger.tag(arr);
  },

  _tagForWordNet: function(words) {

    var pos, posArr = RiTa._tagForPENN(words);
    if (words && posArr.length) {

      for (var i = 0; i < posArr.length; i++) {
        pos = posArr[i];
        posArr[i] = '-'; // default=other
        if (PosTagger.isNoun(pos)) posArr[i] = 'n';
        else if (PosTagger.isVerb(pos)) posArr[i] = 'v';
        else if (PosTagger.isAdverb(pos)) posArr[i] = 'r';
        else if (PosTagger.isAdj(pos)) posArr[i] = 'a';
      }
      return posArr;
    }
    return EA;
  },

  getPosTags: function(words, useWordNetTags) {
    return (useWordNetTags) ? RiTa._tagForWordNet(words) : RiTa._tagForPENN(words);
  },

  getPosTagsInline: function(words, delimiter) {

    if (!words || !words.length) return E;

    delimiter = delimiter || '/';
    words = is(words, S) ? RiTa.tokenize(words) : words;

    var sb = E,
      tags = RiTa.getPosTags(words);
    for (var i = 0; i < words.length; i++) {

      sb += (words[i]);
      if (!RiTa.isPunctuation(words[i])) {
        sb += delimiter + tags[i];
      }
      sb += SP;
    }

    return sb.trim();
  },

  getPresentParticiple: function(verb) {
    return Conjugator().getPresentParticiple(verb);
  },

  getPastParticiple: function(verb) {
    return Conjugator().getPastParticiple(verb);
  },

  // TODO: 2 examples
  concordance: function(text, options) {
    return Concorder(text, options).concordance();
  },

  // TODO: 2 examples (add cache)
  kwic: function(text, word, options) {
    wordCount = (options && options.wordCount) || 4;
    return Concorder(text, options).kwic(word, wordCount);
  },

  // TODO: 2 examples
  conjugate: function(verb, args) {
    return Conjugator().conjugate(verb, args);
  },

  upperCaseFirst: function(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
  },

  pluralize: function(word) {

    if (!strOk(word)) return E;

    var i, rule, rules = PLURAL_RULES;

    if (inArray(MODALS, word.toLowerCase())) {
      return word;
    }

    for (i = 0; i < rules.length; i++) {
      rule = rules[i];
      if (rule.applies(word.toLowerCase())) {
        return rule.fire(word);
      }
    }

    return DEFAULT_PLURAL_RULE.fire(word);
  },

  singularize: function(word) {

    if (!strOk(word)) return E;

    var i, rule, rules = SINGULAR_RULES;
    if (inArray(MODALS, word.toLowerCase())) {
      return word;
    }
    i = rules.length;
    while (i--) {
      rule = rules[i];
      if (rule.applies(word.toLowerCase())) {
        return rule.fire(word);
      }
    }
    ////////////////////////////////////////

    return this.stem(word, 'Pling');
  },

  trim: function(str) {
    return trim(str); // delegate to private
  },

  tokenize: function(words, regex) {

    if (!is(words,S)) return [];

    if (regex) return words.split(regex);

    words = trim(words);

    words = words.replace(/([\\?!\"\\.,;:@#$%&])/g, " $1 ");
    words = words.replace(/\\.\\.\\./g, " ... ");
    words = words.replace(/\\s+/g, SP);
    words = words.replace(/,([^0-9])/g, " , $1");
    words = words.replace(/([^.])([.])([\])}>\"']*)\\s*$/g, "$1 $2$3 ");
    words = words.replace(/([\[\](){}<>])/g, " $1 ");
    words = words.replace(/--/g, " -- ");
    words = words.replace(/$/g, SP);
    words = words.replace(/^/g, SP);
    words = words.replace(/([^'])' /g, "$1 ' ");
    words = words.replace(/'([SMD]) /g, " '$1 ");

    if (RiTa.SPLIT_CONTRACTIONS) {

      words = words.replace(/([Cc])an't/g, "$1an not");
      words = words.replace(/([Dd])idn't/g, "$1id not");
      words = words.replace(/([CcWw])ouldn't/g, "$1ould not");
      words = words.replace(/([Ss])houldn't/g, "$1hould not");
      words = words.replace(/ ([Ii])t's/g, " $1t is");
      words = words.replace(/n't /g, " not ");
      words = words.replace(/'ve /g, " have ");
      words = words.replace(/'re /g, " are ");
    }

    // "Nicole I. Kidman" gets tokenized as "Nicole I . Kidman"
    words = words.replace(/ ([A-Z]) \\./g, " $1. ");
    words = words.replace(/\\s+/g, SP);
    words = words.replace(/^\\s+/g, E);

    return trim(words).split(/\s+/);
  },

  splitSentences: function(text, regex) {

    var arr = text.match(/(\S.+?[.!?])(?=\s+|$)/g);
    return (text.length && arr && arr.length) ? arr : [text];
  },

  isAbbreviation: function(input, caseSensitive) {

    caseSensitive = caseSensitive || false;
    input = caseSensitive ? input : RiTa._titleCase(input);
    return inArray(this.ABBREVIATIONS, input);
  },

  _loadStringsNode: function(url, callback) {

    var data = '', isUrl = /.+?:\/\/.+/.test(url), me = this;

    function processResponse(data) {
      data = data.toString('utf-8').trim();
      var lines = data.split(/(\r\n|\n)/gm);
      me.fireDataLoaded(url, callback, lines);
    }
    //log("Using Node for: "+url +" isUrl="+isUrl);

    if (isUrl) {

      var httpcb = function(response) {
        response.on('data', function(chunk) {
          data += chunk;
        });
        response.on('error', function(e) {
          throw e;
        });
        response.on('end', function() {
          processResponse(data);
        });
      };

      var req = require('http').request(url, httpcb);
      req.on('socket', function(socket) { // shouldnt be needed

        socket.setTimeout(5000); // ?
        socket.on('timeout', function() {
          req.abort();
          throw Error("[RiTa] loadString timed-out and aborted request");
        });
      });
      req.end();

    } else {

      // try with node file-system
      var rq = require('fs');
      rq.readFile(url, function(e, data) {
        if (e || !data) {
          err("[Node] Error reading file: " + url + BN + e);
          throw e;
        }
        processResponse(data);
      });
    }
    //return data;
  },

  _loadStringNode: function(url, callback, linebreakChars) {

    var data = '', lb = linebreakChars || BN,
      isUrl = /.+?:\/\/.+/.test(url), me = this;

    //log("Using Node for: "+url +" isUrl="+isUrl);

    if (isUrl) {

      var httpcb = function(response) {
        response.on('data', function(chunk) {
          data += chunk;
        });
        response.on('error', function(e) {
          throw e;
        });
        response.on('end', function() {
          data = data.toString('utf-8').replace(/[\r\n]+/g, lb).trim();
          me.fireDataLoaded(url, callback, data);
        });
      };

      var req = require('http').request(url, httpcb);
      req.on('socket', function(socket) { // shouldnt be needed

        socket.setTimeout(5000); // ?
        socket.on('timeout', function() {
          req.abort();
          throw Error("[RiTa] loadString timed-out and aborted request");
        });
      });
      req.end();

    } else {

      // try with node file-system
      var rq = require('fs');
      rq.readFile(url, function(e, data) {
        if (e || !data) {
          err("[Node] Error reading file: " + url + BN + e);
          throw e;
        }
        data = data.toString('utf-8').replace(/[\r\n]+/g, lb).trim();
        me.fireDataLoaded(url, callback, data);
      });
    }
    //return data;
  },

  loadString: function(url, callback, linebreakChars) {

    ok(url, S);

    if (isNode()) {
      return this._loadStringNode.apply(this, arguments);
    }

    var me = this, res = '', lb = linebreakChars || BN,
      req = new XMLHttpRequest();

    req.addEventListener('error', function () {
      console.error('[RiTa] loadStrings() unable to load ' + url);
    });

    req.open('GET', url, true);
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200) {
          var ret = [];
          // remove blank lines
          var arr = req.responseText.match(/[^\r\n]+/g);
          for (var k in arr) {
            ret[k] = arr[k];
          }
          ret = ret.join(BN);
          me.fireDataLoaded(url, callback, ret);
          //callback(res);
        } else {
          console.error('[RiTa] loadString() unable to load: ' + url);
        }
      }
    };
    req.send(null);
    return res;
  },

  // TODO: update 'return' value in docs (for preload())
  loadStrings: function(url, callback, linebreakChars) {

    ok(url, S);

    if (isNode()) {
      return this._loadStringsNode.apply(this, arguments);
    }

    var me = this, res = '', lb = linebreakChars || BN,
      req = new XMLHttpRequest();

    req.addEventListener('error', function () {
      console.error('[RiTa] loadStrings() unable to load ' + url);
    });

    req.open('GET', url, true);
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200) {

          // remove blank lines
          var arr = req.responseText.match(/[^\r\n]+/g);
          var ret = [];
          for (var k in arr) {
            ret[k] = arr[k];
          }
          me.fireDataLoaded(url, callback, ret);
          //callback(res);
        } else {
          console.error('[RiTa] loadString() unable to load: ' + url);
        }
      }
    };
    req.send(null);
    return res;
  },

  fireDataLoaded: function(url, callback, data) {

    //log('fireDataLoaded: '+url, callback, data);
    return (callback) ? callback(data, url) :
      RiTaEvent({
        name: 'RiTaLoader',
        urls: is(url, S) ? [ url ] : url
      }, RiTa.DATA_LOADED, data)._fire();
  },

  isQuestion: function(sentence) {

    var sentenceArr = RiTa.tokenize((sentence));

    for (var i = 0; i < QUESTION_STARTS.length; i++) {
      if (equalsIgnoreCase(sentenceArr[0], QUESTION_STARTS[i]))
        return true;
    }
    return false;
  },

  isSentenceEnd: function(currentWord, nextWord) {

    if (!is(currentWord, S) || !is(nextWord, S))
      return false;

    var cw = currentWord.charAt(0),
      cWL = currentWord.length;

    // token is a mid-sentence abbreviation (mainly, titles) --> middle of sent
    if (RiTa.isAbbreviation(currentWord))
      return false;

    if (cWL > 1 && cw.indexOf("`'\"([{<") != -1 && RiTa.isAbbreviation(currentWord.substring(1)))
      return false;

    if (cWL > 2 && ((currentWord.charAt(0) == '\'' && currentWord.charAt(1) == '\'') ||
      (currentWord.charAt(0) == '`' && currentWord.charAt(1) == '`')) &&
      RiTa.isAbbreviation(currentWord.substring(2)))
    {
      return false;
    }

    var nTL = nextWord.length,
      currentToken0 = currentWord.charAt(cWL - 1),
      currentToken1 = (cWL > 1) ? currentWord.charAt(cWL - 2) : SP,
      currentToken2 = (cWL > 2) ? currentWord.charAt(cWL - 3) : SP,
      nextToken0 = nextWord.charAt(0),
      nextToken1 = (nTL > 1) ? nextWord.charAt(1) : SP,
      nextToken2 = (nTL > 2) ? nextWord.charAt(2) : SP;

    // nextToken does not begin with an upper case,
    // [`'"([{<] + upper case, `` + upper case, or < -> middle of sent.
    if (!(nextToken0 == nextToken0.toUpperCase() ||
        (nextToken1 == nextToken1.toUpperCase() && nextToken0.indexOf("`'\"([{<") != -1) ||
        (nextToken2 == nextToken2.toUpperCase() && ((nextToken0 == '`' && nextToken1 == '`') ||
          (nextToken0 == '\'' && nextToken1 == '\''))) ||
        nextWord == "_" || nextToken0 == '<'))
      return false;

    // ends with ?, !, [!?.]["'}>)], or [?!.]'' -> end of sentence
    if (currentToken0 == '?' || currentToken0 == '!' ||
      (currentToken1.indexOf("?!.") != -1 && currentToken0.indexOf("\"'}>)") != -1) ||
      (currentToken2.indexOf("?!.") != -1 && currentToken1 == '\'' && currentToken0 == '\''))
      return true;

    // last char not "." -> middle of sentence
    if (currentToken0 != '.') return false;

    // Note: wont handle Q. / A. at start of sentence, as in a news wire
    //if (startOfSentence && (currentWord.equalsIgnoreCase("Q.")
    //|| currentWord.equalsIgnoreCase("A.")))return true;

    // single upper-case alpha + "." -> middle of sentence
    if (cWL == 2 && currentToken1 == currentToken1.toUpperCase())
      return false;

    // double initial (X.Y.) -> middle of sentence << added for ACE
    if (cWL == 4 && currentToken2 == '.' && (currentToken1 == currentToken1.toUpperCase() && currentWord.charAt(0) == currentWord.charAt(0).toUpperCase()))
      return false;

    return true;
  },

  isW_Question: function(sentence) {
    var sentenceArr = RiTa.tokenize((sentence));
    for (var i = 0; i < W_QUESTION_STARTS.length; i++)
      if (equalsIgnoreCase(sentenceArr[0], W_QUESTION_STARTS[i]))
        return true;
    return false;
  },

  unescapeHTML: function(input) {

    if (!input || !input.length) return input;

    var answer = input.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&").replace(/&quot;/g, "\"");

    String.fromCharCodePoint = function() { // uggh
      var codeunits = [];
      for (var i = 0; i < arguments.length; i++) {
        var c = arguments[i];
        if (arguments[i] < 0x10000) {
          codeunits.push(arguments[i]);
        } else if (arguments[i] < 0x110000) {
          c -= 0x10000;
          codeunits.push((c >> 10 & 0x3FF) + 0xD800);
          codeunits.push((c & 0x3FF) + 0xDC00);
        }
      }
      return String.fromCharCode.apply(String, codeunits);
    };

    answer = answer.replace(/&#(\d+);/g, function(_, n) {
      return String.fromCharCodePoint(parseInt(n, 10));
    }).replace(/&#x([0-9a-f]+);/gi, function(_, n) {
      return String.fromCharCodePoint(parseInt(n, 16));
    });

    return answer;
  },

  randomOrdering: function(num) {

    var o = [];
    if (num) {
      for (var z = 0; z < num; z++) o.push(z);
      // Array shuffle, from http://jsfromhell.com/array/shuffle
      for (var j, x, i = o.length; i; j = parseInt(Math.random() * i),
        x = o[--i], o[i] = o[j], o[j] = x) { /* no-op */ }
    }
    return o;
  },

  // Trims punctuation from each side of token
  //   (doesnt trim whitespace or internal punctuation).
  trimPunctuation: function(text) {

    if (!is(text,S)) return text;

    var s = '[�`~\"\/' + "\\'_\\-[\\]{}()*+!?%&.,\\\\^$|#@<>|+=;:]";
    var regex = new RegExp("^" + s + "+|" + s + "+$", 'g');

    return (text === E) ? E : text.replace(regex,E);
  },

  stripPunctuation: function(text) {
    return (text === E) ? E : text.replace(PUNCTUATION_CLASS,E);
  },

  isPunctuation: function(text) {
    if (!text || !text.length) return false;
    return ONLY_PUNCT.test(text);
  },

  hasPunctuation: function(text) {
    if (!text || !text.length) return false;
    return ONLY_PUNCT.test(text);
  },

  env: function() {
    return isNode() ? RiTa.NODE : RiTa.JS;
  },

  chomp: function(txt) {
    return txt.replace(/\s+$|^\s+/g,E);
  },

  getPhonemes: function(words) {
    return RiString(words).analyze().get(RiTa.PHONEMES);
  },

  getStresses: function(words) {
    return RiString(words).analyze().get(RiTa.STRESSES);
  },

  getSyllables: function(words) {
    return RiString(words).analyze().get(RiTa.SYLLABLES);
  },

  getWordCount: function(words) {
    return RiTa.tokenize(words).length;
  },

  stem: function(word, type) {

    type = type || 'Lancaster';

    if (type != 'Lancaster' && type != 'Porter' && type != 'Pling')
      err('Bad stemmer type: ' + type);

    var stemImpl = RiTa['stem_' + type];

    if (word.indexOf(SP) < 0) return stemImpl(word);

    // remove non-words && white-space chars
    word = word.replace(/[^\w]/g, SP).replace(/\s+/g, SP);

    var res = [],
      words = word.split(SP);

    for (var i = 0; i < words.length; i++) {

      res.push(stemImpl(words[i]));
    }
    return res.join(SP);
  },

  // Converts 'input' to Titlecase (1st letter upper, rest lower)
  _titleCase: function(input) {

    if (!input || !input.length) return input;
    return input.substring(0, 1).toUpperCase() + input.substring(1);
  },

  /*
   * Takes pair of strings or string-arrays and returns the min-edit distance
   * @param normalized based on max-length if 3rd (optional) parameter is true (default=f).
   */
  minEditDistance: function(a, b, adjusted) {

    var func = adjusted ? MinEditDist.computeAdjusted : MinEditDist.computeRaw;
    return func.call(MinEditDist, a, b);
  },

  _makeClass: function() { // By John Resig (MIT Licensed)

    return function(args) {
      if (this instanceof arguments.callee) {
        if (typeof this.init == "function") {
          this.init.apply(this, args && args.callee ? args : arguments);
        }
      } else {
        return new arguments.callee(arguments);
      }
    };
  }
}; // end RiTa object

// set additional properties/functions on RiTa
for (var i = 0; i < RiTa._FEATURES.length; i++)
  RiTa[RiTa._FEATURES[i].toUpperCase()] = RiTa._FEATURES[i];

//for (var name in Type) RiTa[name] = Type[name];// needed?

// ////////////////////////////////////////////////////////////
// RiMarkov
// ////////////////////////////////////////////////////////////

var RiMarkov = makeClass();

RiMarkov.MAX_GENERATION_ATTEMPTS = 1000;
RiMarkov._SSRE = /"?[A-Z][a-z"',;`-]*/;
RiMarkov._SSDLM = 'D=l1m_';

RiMarkov.prototype = {

  /*
   * Construct a Markov chain (or n-gram) model and set its n-Factor
   */
  init: function(nFactor, recognizeSentences, allowDuplicates) {

    var a = this._initArgs.apply(this, arguments);

    ok(a[0], N);

    this._n = a[0];
    this.pathTrace = [];
    this.sentenceList = [];
    this.sentenceStarts = [];
    this.minSentenceLength = 6;
    this.maxSentenceLength = 35;
    this.maxDuplicatesToSkip = 10000;
    this.root = new TextNode(null, 'ROOT');
    this.isSentenceAware = (a.length > 1 && !a[1]) ? false : true;
    this.allowDuplicates = (a.length > 2 && !a[2]) ? false : true;
    this.printIgnoredText = false;
  },

  _initArgs: function() {

    var a = arguments, t = get(a[0]);
    // recurse, ignore 'this'
    if (a.length && (t === O || t === 'global' || t === 'window'))
      return this._initArgs.apply(this, Array.prototype.slice.call(a, 1));
    return a;
  },

  getProbability: function(data) {

    if (!this.root) err("Model not initd: null root!");

    var tn = is(data, S) ? this.root.lookup(data) : this._findNode(data);

    return (tn) ? tn.probability() : 0;

  },

  getProbabilities: function(path) {

    if (is(path, S)) path = [path];

    if (path.length > this._n) {

      path = path.slice(Math.max(0, path.length - (this._n - 1)), path.length);
    }

    var probs = {},
      tn = this._findNode(path);

    if (!tn) return {};

    var nexts = tn.childNodes();
    for (var i = 0; i < nexts.length; i++) {
      var node = nexts[i];
      if (node) {
        probs[node.token] = node.probability();
      }
    }

    return probs;
  },

  getCompletions: function(pre, post) {

    var tn, result = [],
      node, atest, nexts;

    if (post) { // fill the center

      if (pre.length + post.length > this._n) {

        err('Sum of pre.length && post.length must be < N, was ' + (pre.length + post.length));
      }

      tn = this._findNode(pre);
      if (!tn) return null;

      nexts = tn.childNodes();
      for (var i = 0; i < nexts.length; i++) {

        node = nexts[i];

        atest = pre.slice(0); // clone

        atest.push(node.token);

        for (var j = 0; j < post.length; j++)
          atest.push(post[j]);

        if (this._findNode(atest)) result.push(node.token);
      }
      return result;
    } else { // fill the end

      var hash = this.getProbabilities(pre);
      var keys = okeys(hash);
      return keys.sort(function(a, b) {

        return hash[b] - hash[a];
      });
    }
  },

  generateUntil: function(regex, minLength, maxLength) {

    minLength = minLength || 1;
    maxLength = maxLength || Number.MAX_VALUE;

    var mn, tokens, tries = 0,
      maxTries = 999;

    OUT: while (++tries < maxTries) {

      // generate the min number of tokens
      tokens = this.generateTokens(minLength);

      // keep adding one and checking until we pass the max
      while (tokens.length < maxLength) {

        mn = this._nextNodeForArr(tokens);

        if (!mn || !mn.token)
          continue OUT; // fail, restart

        tokens.push(mn.token);

        // check against our regex
        if (mn.token.search(regex) > -1)
          return tokens;
      }
    }

    // uh-oh, we failed
    if (tries >= maxTries)
      err(BN+"RiMarkov failed to complete after " + tries + " attempts"+BN);

    return tokens;

  },

  generateTokens: function(targetNumber) {

    var tries = 0,
      maxTries = 500,
      tokens = [];

    OUT: while (++tries < maxTries) {

      var mn = this.root.selectChild(null, true);
      if (!mn || !mn.token) continue OUT;
      tokens.push(mn);

      while (tokens.length < targetNumber) {

        mn = this._nextNodeForArr(tokens);
        if (!mn || !mn.token) { // hit the end
          tokens = []; // start over
          continue OUT;
        }

        tokens.push(mn);
      }

      break;
    }

    // uh-oh, looks like we failed...
    if (tokens.length < targetNumber) {
      err('\nRiMarkov failed to complete after ' + tries + ' tries, ' +
        'with only ' + tokens.length + ' successful generations...\n');
    }

    var res = [];
    for (var i = 0; i < tokens.length; i++) {
      res[i] = tokens[i].token;
    }

    return res;
  },

  sentenceAware: function() {

    if (arguments.length > 0)
      throw Error('sentenceAware() takes no arguments, instead ' +
        'use the constructor RiMarkov(n, recognizeSentences);');
    return this.isSentenceAware;
  },

  getN: function() {
    return this._n;
  },

  print: function() {

    if (console) console.log(this.root.asTree(false));
    return this;
  },

  ready: function(url) {
    return this.size() > 0;
  },

  loadFrom: function(url, multiplier, regex, callback) {

    var me = this;

    is(url, S) || ok(url, A);

    if (is(multiplier, F)) {
      callback = multiplier;
      multiplier = undefined;
    }
    else if (is(regex, F)) {
      callback = regex;
      regex = undefined;
    }

    RiTa.loadStrings(url, function(data) {

      data = data.join(BN);
      me.loadText(data, multiplier, regex);
      callback && is(callback, F) && (callback(data));
    });
  },

  loadText: function(text, multiplier, regex) {

    //log("loadText: "+text.length + " "+this.isSentenceAware);

    ok(text, S);

    multiplier = multiplier || 1;

    if (multiplier < 1 || multiplier != Math.floor(multiplier)) // TODO: really?
      err('Multiplier must be an positive integer, found: ' + multiplier);

    var result = !this.isSentenceAware ?
      this.loadTokens(RiTa.tokenize(text, regex), multiplier) :
      this._loadSentences(RiTa.splitSentences(text), multiplier);

    return result;
  },

  loadTokens: function(tokens, multiplier) {

    multiplier = multiplier || 1;

    if (multiplier < 1 || multiplier != Math.floor(multiplier))
      err('multiplier must be an positive integer, found: ' + multiplier);

    this.root.count += tokens.length; // here?

    for (var toAdd, k = 0; k < tokens.length; k++) {
      toAdd = [];

      for (var j = 0; j < this._n; j++) {
        if ((k + j) < tokens.length) toAdd[j] = (tokens[k + j]) ? tokens[k + j] : null;
        else toAdd[j] = null;
      }

      // hack to deal with multiplier...
      for (var l = 0; l < multiplier; l++) {

        var node = this.root;
        for (var i = 0; i < toAdd.length; i++) {
          if (node.token) {
            node = node.addChild(toAdd[i], 1);
          }
        }
      }
    }

    return this;
  },

  generateSentences: function(num) {

    if (!this.isSentenceAware) {
      err('generateSentences() can only be called when the model is ' +
        'in \'sentence-aware\' mode, otherwise use generateTokens()');
    }

    var mn = this._getSentenceStart(),
      s = mn.token + SP,
      result = [],
      tries = 0,
      totalTries = 0,
      wordsInSentence = 1;

    while (result.length < num) {

      if (wordsInSentence >= this.maxSentenceLength) {

        //console.log("MarkovModel.generateSentences().reject:: too long!");

        mn = this._getSentenceStart();
        s = mn.token + SP;
        wordsInSentence = 1;
      }

      if (mn.isLeaf()) {
        mn = this._tracePathFromRoot(mn);
        continue;
      }

      mn = this._nextNodeForNode(mn);

      if (mn.isSentenceStart) {

        if (wordsInSentence >= this.minSentenceLength) {

          var candidate = RiTa.untokenize(s.trim().split(/\s+/));

          // deals with incorrect output: "word( next" -> "word (next"
          candidate = candidate.replace(/(.)\( /, "$1 ("); // added DCH: 5/2/14

          if (this._validateSentence(candidate)) {

            // got one, store and reset the counters
            if (result.indexOf(candidate) < 0)
              result.push(candidate);

            //log(result.length+" RESULTS SO FAR");
            totalTries += tries;
            tries = 0;
          }
        }
        mn = this._getSentenceStart();
        s = mn.token + SP;
        wordsInSentence = 1;
        continue;
      }

      // add the next word
      wordsInSentence++;
      s += mn.token + SP;

      // check if its time to give up
      if (++tries >= RiMarkov.MAX_GENERATION_ATTEMPTS) {

        this._onGenerationIncomplete(totalTries += tries, result.length);
        break; // give-up
      }
    }

    return result;
  },

  _validateSentence: function(sent) {

    var tokens = RiTa.tokenize(sent),
      first = tokens[0],
      last = tokens[tokens.length - 1];

    if (!first.match(/[A-Z]\S*/)) {
      if (this.printIgnoredText)
        log("Skipping: bad first char in '" + sent + "'");
      return false;
    }

    if (!last.match(/[!?.]/)) {
      if (this.printIgnoredText)
        log("Bad last token: '" + last + "' in: " + sent);
      return false;
    }

    if (!this.allowDuplicates) {
      if (!this.isSentenceAware) {
        err('Invalid state: allowDuplicates must be' +
          ' true when not generating sentences');
      }

      if (this.sentenceList.indexOf(sent) > -1) {
        if (++this.skippedDups == this.maxDuplicatesToSkip) {
          warn('Hit skip-maximum (RiMarkov.maxDuplicatesToSkip=' + this.maxDuplicatesToSkip +
            ') after skipping ' + this.maxDuplicatesToSkip + ', now allowing duplicates!');
          this.allowDuplicates = true;
        }

        if (this.printIgnoredText)
          log('Ignoring duplicate: ' + sent);

        return false;
      }
    }

    var words = sent.split(/\s+/);
    if (RiTa.isAbbreviation(words[words.length - 1])) {
      //log("BAD SENTENCE: "+sent);
      return false;
    }

    return true;
  },

  _tracePathFromRoot: function(node) {

    node.pathFromRoot(this.pathTrace);

    this.pathTrace.pop(); // ignore the first element
    var mn = this.root;
    while (this.pathTrace.length) {
      var search = this.pathTrace.pop();
      mn = mn.lookup(search);
    }

    return mn;
  },

  _nextNodeForArr: function(previousTokens) {

    // Follow the seed path down the tree
    var firstLookupIdx = Math.max(0, previousTokens.length - (this._n - 1)),
      node = this.root.lookup(previousTokens[firstLookupIdx++]);

    for (var i = firstLookupIdx; i < previousTokens.length; i++) {

      if (node) node = node.lookup(previousTokens[i]);
    }

    // Now select the next node
    return node ? node.selectChild(null, true) : null;
  },

  _nextNodeForNode: function(current) {

    var attempts = 0,
      selector, pTotal = 0,
      nodes = current.childNodes(),
      maxProbMisses = 1000;

    while (true) {

      pTotal = 0;
      selector = Math.random();
      for (var i = 0, j = nodes.length; i < j; i++) {

        pTotal += nodes[i].probability();
        if (current.isRoot() && (this.isSentenceAware && !nodes[i].isSentenceStart())) {
          continue;
        }
        if (selector < pTotal) {
          return nodes[i];
        }
      }

      attempts++;
      warn('Prob. miss (#\'+attempts+\') in RiMarkov.nextNode().' +
        ' Make sure there are a sufficient\n       # of sentences' +
        ' in the model that are longer than \'minSentenceLength\'');

      if (attempts == maxProbMisses) // should never happen
        err('PROB. MISS' + current + ' total=' + pTotal + ' selector=' + selector);
    }
  },

  _clean: function(sentence) {

    return RiTa.trim(sentence.replace(/\s+/, SP));
  },

  _onGenerationIncomplete: function(tries, successes) {

    warn('\nRiMarkov failed to complete after ' + tries +
      ' tries\n       Giving up after ' + successes + ' successful generations\n');
  },

  // Loads a sentence[] into the model; each element must be a single sentence
  _loadSentences: function(sentences, multiplier) {

    ok(sentences, A);

    multiplier = multiplier || 1;
    multiplier = Math.min(multiplier, 1);

    // log("_loadSentences("+sentences.length+", multiplier="+multiplier+" "+this.allowDuplicates+")");

    var i, j, tokens, sentence, allWords = [];

    // do the cleaning/splitting first ---------------------

    for (i = 0; i < sentences.length; i++) {

      sentence = this._clean(sentences[i]);

      // do we need this?
      if (!this.allowDuplicates) this.sentenceList.push(sentence);

      tokens = RiTa.tokenize(sentence);

      if (!this._validSentenceStart(tokens[0])) {

        if (this.printIgnoredText)
          warn("Skipping (bad sentence start): " + tokens);
        continue;
      }

      //log("Added sentence start] " + tokens);

      allWords.push(RiMarkov._SSDLM + tokens[0]); // bad hack for sentence-starts

      for (j = 1; j < tokens.length; j++)
        allWords.push(tokens[j]);
    }

    // ------------------------------------------------

    var toAdd, words = allWords,
      nFactor = this.getN();

    for (i = 0; i < words.length; i++) {

      toAdd = [];
      for (j = 0; j < nFactor; j++) {
        if ((i + j) < words.length)
          toAdd[j] = words[i + j];
      }

      // hack to deal with multiplier...
      for (j = 0; j < multiplier; j++)
        this._addSentenceSequence(toAdd);
    }

    this.root.count += words.length;

    return this;
  },

  size: function() {

    return this.root.count;
  },

  _validSentenceStart: function(word) {

    return (!this.isSentenceAware || word && word.match(RiMarkov._SSRE));
  },

  _addSentenceSequence: function(toAdd) {

    var node = this.root;

    for (var i = 0; i < toAdd.length; i++) {

      if (!toAdd[i]) continue;

      if (node.token) {

        var add = toAdd[i];

        if (startsWith(add, RiMarkov._SSDLM)) {

          add = add.substring(RiMarkov._SSDLM.length);
          var parent = node;

          node = node.addChild(add, 1);
          node.isSentenceStart = true;

          if (parent.isRoot()) {
            this.sentenceStarts.push(node.token);
          }

        } else
          node = node.addChild(add, 1);
      }
    }
  },

  _getSentenceStart: function() {

    if (!this.isSentenceAware) {
      err("getSentenceStart() can only " +
        "be called when the model is in 'sentence-aware' mode...");
    }

    if (!this.sentenceStarts || !this.sentenceStarts.length)
      err('No sentence starts found! genSen=' + this.isSentenceAware);

    return this.root.lookup(RiTa.randomItem(this.sentenceStarts));
  },

  _findNode: function(path) {

    if (!path || !is(path, A) || !path.length)
      return null;

    var nFactor = this._n;
    var numNodes = Math.min(path.length, nFactor - 1);
    var firstLookupIdx = Math.max(0, path.length - (nFactor - 1));
    var node = this.root.lookup(path[firstLookupIdx++]);

    if (!node) return null;

    var idx = 0; // found at least one good node
    var nodes = [];
    nodes[idx++] = node;
    for (var i = firstLookupIdx; i < path.length; i++) {
      node = node.lookup(path[i]);
      if (!node) return null;
      nodes[idx++] = node;
    }

    return nodes ? nodes[nodes.length - 1] : null;
  }
};

var RiWordNet = function() { // stub
    throw Error("RiWordNet is not yet implemented in JavaScript!");
};

////////////////////////////////////////////////////////////////
// RiString
////////////////////////////////////////////////////////////////

var RiString = makeClass();

RiString.phones = {

  consonants: ['b', 'ch', 'd', 'dh', 'f', 'g', 'hh', 'jh', 'k', 'l', 'm',
    'n', 'ng', 'p', 'r', 's', 'sh', 't', 'th', 'v', 'w', 'y', 'z', 'zh'
  ],

  vowels: ['aa', 'ae', 'ah', 'ao', 'aw', 'ax', 'ay', 'eh', 'er', 'ey', 'ih',
    'iy', 'ow', 'oy', 'uh', 'uw'
  ],

  onsets: ['p', 't', 'k', 'b', 'd', 'g', 'f', 'v', 'th', 'dh', 's', 'z',
    'sh', 'ch', 'jh', 'm', 'n', 'r', 'l', 'hh', 'w', 'y', 'p r', 't r',
    'k r', 'b r', 'd r', 'g r', 'f r', 'th r', 'sh r', 'p l', 'k l', 'b l',
    'g l', 'f l', 's l', 't w', 'k w', 'd w', 's w', 's p', 's t', 's k',
    's f', 's m', 's n', 'g w', 'sh w', 's p r', 's p l', 's t r', 's k r',
    's k w', 's k l', 'th w', 'zh', 'p y', 'k y', 'b y', 'f y', 'hh y',
    'v y', 'th y', 'm y', 's p y', 's k y', 'g y', 'hh w', ''
  ],

  digits: ['z-ih-r-ow', 'w-ah-n', 't-uw', 'th-r-iy', 'f-ao-r', 'f-ay-v',
    's-ih-k-s', 's-eh1-v-ax-n', 'ey-t', 'n-ih-n'
  ]
};

RiString._syllabify = function(input) { // adapted from FreeTTS

  var dbug, None, internuclei = [],
    syllables = [], // returned data structure.
    sylls = ((typeof(input) == 'string') ? input.split('-') : input);

  for (var i = 0; i < sylls.length; i++) {

    var phoneme = sylls[i].trim(),
      stress = None;

    if (!phoneme.length) continue;

    if (isNum(last(phoneme))) {

      stress = parseInt(last(phoneme));
      phoneme = phoneme.substring(0, phoneme.length - 1);
    }

    if (dbug) log(i + ")" + phoneme + ' stress=' + stress + ' inter=' + internuclei.join(':'));

    if (inArray(RiString.phones.vowels, phoneme)) {

      // Split the consonants seen since the last nucleus into coda and onset.
      var coda = None,
        onset = None;

      // Make the largest onset we can. The 'split' variable marks the break point.
      for (var split = 0; split < internuclei.length + 1; split++) {

        coda = internuclei.slice(0, split);
        onset = internuclei.slice(split, internuclei.length);

        if (dbug) log('  ' + split + ') onset=' + onset.join(':') +
          '  coda=' + coda.join(':') + '  inter=' + internuclei.join(':'));

        // If we are looking at a valid onset, or if we're at the start of the word
        // (in which case an invalid onset is better than a coda that doesn't follow
        // a nucleus), or if we've gone through all of the onsets and we didn't find
        // any that are valid, then split the nonvowels we've seen at this location.
        var bool = inArray(RiString.phones.onsets, onset.join(" "));
        if (bool || syllables.length === 0 || onset.length === 0) {
          if (dbug) log('  break ' + phoneme);
          break;
        }
      }

      //if (dbug)log('  onset='+join(',',onset)+'  coda='+join(',',coda));

      // Tack the coda onto the coda of the last syllable. Can't do it if this
      // is the first syllable.
      if (syllables.length > 0) {

        //syllables[syllables.length-1][3] = syllables[syllables.length-1][3] || [];
        //log('  len='+syllables[syllables.length-1][3].length);
        extend(syllables[syllables.length - 1][3], coda);

        if (dbug) log('  tack: ' + coda + ' -> len=' +
          syllables[syllables.length - 1][3].length + " [" +
          syllables[syllables.length - 1][3] + "]");
      }

      // Make a new syllable out of the onset and nucleus.

      var toPush = [
        [stress], onset, [phoneme],
        []
      ];
      syllables.push(toPush);

      // At this point we've processed the internuclei list.
      internuclei = [];
    }
    else if (!inArray(RiString.phones.consonants, phoneme) && phoneme != " ") {
      throw Error('Invalid phoneme: ' + phoneme);
    }
    else { // a consonant

      //log('inter.push: '+phoneme);
      internuclei.push(phoneme);
    }
  }


  // Done looping through phonemes. We may have consonants left at the end.
  // We may have even not found a nucleus.
  if (internuclei.length > 0) {

    if (syllables.length === 0) {

      syllables.push([
        [None], internuclei, [],
        []
      ]);
    } else {

      extend(syllables[syllables.length - 1][3], internuclei);
    }
  }

  return RiString._stringify(syllables);
};

/*
 * Takes a syllabification and turns it into a string of phonemes,
 * delimited with dashes, with spaces between syllables
 */
RiString._stringify = function(syllables) {

  var i, j, ret = [];
  for (i = 0; i < syllables.length; i++) {

    var syl = syllables[i];
    var stress = syl[0][0];
    var onset = syl[1];
    var nucleus = syl[2];
    var coda = syl[3];

    if (stress !== undefined && nucleus.length) // dch
      nucleus[0] += (E + stress);

    var data = [];
    for (j = 0; j < onset.length; j++)
      data.push(onset[j]);

    for (j = 0; j < nucleus.length; j++)
      data.push(nucleus[j]);

    for (j = 0; j < coda.length; j++)
      data.push(coda[j]);

    ret.push(data.join('-'));
  }

  return ret.join(SP);
};

// ////////////////////////////////////////////////////////////
// Member functions
// ////////////////////////////////////////////////////////////

RiString.prototype = {

  init: function(text) {

    if (is(text, N)) {

      text = String.fromCharCode(text);
    }

    text = text || '';

    // convenience fields, in case we use this object for rendering
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this._text = text;
    this._features = undefined;
  },

  copy: function() {

    var rs = RiString(this._text),
      feats = this.features();

    if (feats) {
      rs._features = {};

      for (var prop in feats) {

        rs._features[prop] = feats[prop];
      }
    }
    return rs;
  },

  features: function() {

    if (!this._features) {
      this.analyze();
    }
    return this._features;
  },

  _initFeatureMap: function() {

    if (!this._features) {

      this._features = {};

    } else {

      delete this._features.tokens;
      delete this._features.stresses;
      delete this._features.phonemes;
      delete this._features.syllables;
      delete this._features.pos;
      delete this._features.text;
    }

    //this._features.mutable = "true";
    this._features.text = this.text();
  },


  analyze: function() {

    var phonemes = E, syllables = E, stresses = E, slash = '/',
      delim = '-', lex, stressyls, phones, lts, ltsPhones, useRaw,
      words = RiTa.tokenize(this._text);

    if (!this._features) this._initFeatureMap();

    this._features.tokens = words.join(SP);
    this._features.pos = RiTa.getPosTags(this._text).join(SP);

    if (RiLexicon.enabled) {

      lex = RiTa._lexicon();
      for (var i = 0, l = words.length; i < l; i++) {

        useRaw = false;

        phones = lex && lex._getRawPhones(words[i]);

        if (!phones) {

          if (words[i].match(/[a-zA-Z]+/))
            log("[RiTa] Used LTS-rules for '" + words[i] + "'");

          lts = lex._letterToSound();

          ltsPhones = lts.getPhones(words[i]);

          if (ltsPhones && ltsPhones.length > 0) {

            phones = RiString._syllabify(ltsPhones);

          } else {
            phones = words[i];
            useRaw = true;
          }
        }

        phonemes += phones.replace(/[0-2]/g, E).replace(/ /g, delim) + SP;
        syllables += phones.replace(/ /g, slash).replace(/1/g, E) + SP;

        if (!useRaw) {
          stressyls = phones.split(SP);
          for (var j = 0; j < stressyls.length; j++) {

            if (!stressyls[j].length) continue;

            stresses += (stressyls[j].indexOf(RiTa.STRESSED) > -1) ?
              RiTa.STRESSED : RiTa.UNSTRESSED;

            if (j < stressyls.length - 1) stresses += slash;
          }
        } else {

          stresses += words[i];
        }

        if (!endsWith(stresses, SP)) stresses += SP;
      }

      stresses = stresses.trim();
      phonemes = phonemes.trim().replace(/\\s+/, SP);
      syllables = syllables.trim().replace(/\\s+/, SP);
    }

    this._features.stresses = stresses;
    this._features.phonemes = phonemes;
    this._features.syllables = syllables;

    return this;
  },

  get: function(featureName) {

    this._features || this.analyze();
    var s = this._features[featureName];

    //console.log(featureName,tracked.indexOf(featureName));
    if (!s && (RiTa._FEATURES.indexOf(featureName) > -1) &&
      (!this._features.hasOwnProperty(featureName)))
    {
      this.analyze();
      s = this._features[featureName];
    }
    return s;
  },

  set: function(featureName, featureValue) {

    this._features || (this._features = {});
    this._features[featureName] = featureValue;
    //log(this._features);
    return this;
  },

  endsWith: function(substr) {

    return endsWith(this._text, substr);
  },

  equals: function(arg) {

    return (typeof arg === S) ? arg === this._text : arg.text() === this._text;
  },

  equalsIgnoreCase: function(arg) {

    if (typeof arg === S) {

      return arg.toLowerCase() === this._text.toLowerCase();
    } else {

      return arg.text().toLowerCase() === this._text.toLowerCase();
    }
  },

  text: function(theText) {

    if (arguments.length > 0) {
      this._text = theText;
      this._initFeatureMap();
      return this;
    }
    return this._text;
  },

  pos: function() {

    var words = RiTa.tokenize(this._text);
    var tags = PosTagger.tag(words);

    for (var i = 0, l = tags.length; i < l; i++) {
      if (!strOk(tags[i]))
        err("RiString: can't parse pos for:" + words[i]);
    }

    return tags;
  },

  posAt: function(index) {

    var tags = this.pos();

    if (!tags || !tags.length)
      return E;

    return tags[ Math.min(index < 0 ?
      tags.length + index : index, tags.length - 1) ];
  },

  wordAt: function(index) {

    var words = this.words();
    if (index < 0 || index >= words.length)
      return E;
    return words[index];
  },

  wordCount: function() {

    return this._text.length ? this.words().length : 0;
  },

  words: function() {

    return RiTa.tokenize(this._text);
  },

  indexOf: function(searchstring, start) {

    return this._text.indexOf(searchstring, start);
  },

  lastIndexOf: function(searchstring, start) {

    return this._text.lastIndexOf(searchstring, start);
  },

  length: function() {

    return this._text.length;
  },

  match: function(regex) {

    return this._text.match(regex) || [];
  },

  slice: function(begin, end) {

    return this._text.slice(begin, end) || E;
  },

  insertChar: function(idx, toInsert) {

    var s = this.text();

    if (idx > s.length || idx < -s.length) {

      warn("RiString.insertChar: bad index=" + idx);
      return this;
    }

    idx = idx < 0 ? idx += s.length : idx;
    var beg = s.substring(0, idx);
    var end = s.substring(idx);

    if (toInsert) beg += toInsert;

    return this.text(beg + end);
  },

  removeChar: function(idx) {

    var s = this.text();

    if (idx > s.length || idx < -s.length) {
      warn("RiString.removeChar: bad index=" + idx);
      return this;
    }
    idx = idx < 0 ? idx += s.length : idx;

    this.text(this._text.substring(0, idx).concat(this._text.substring(idx + 1)));
    return this;
  },

  replaceChar: function(idx, replaceWith) {

    var s = this.text();

    if (idx > s.length || idx < -s.length) {
      warn("RiString.replaceChar: bad index=" + idx);
      return this;
    }
    idx = idx < 0 ? idx += s.length : idx;

    s = this.text();
    var beg = s.substring(0, idx),
      end = s.substring(idx + 1);

    if (replaceWith)
      beg += replaceWith;

    return this.text(beg + end);
  },

  replaceFirst: function(regex, replaceWith) {

    // strip out global if we have it
    if (regex && !is(regex, S) && regex.global) {

      var flags = '';
      regex.ignoreCase && (flags += 'i');
      regex.multiline && (flags += 'm');
      regex.sticky && (flags += 'y');
      regex = new RegExp(regex.source, flags);
    }

    this._text = this._text.replace(regex, replaceWith);
    return this;
  },

  replaceAll: function(pattern, replacement) {

    var flags = 'g';

    if (pattern && (replacement || replacement === '')) {

      if (!is(pattern, S) && pattern.source) {

        pattern.ignoreCase && (flags += 'i');
        pattern.multiline && (flags += 'm');
        pattern.sticky && (flags += 'y');

        pattern = pattern.source;
      } else {

        pattern = escapeRegExp(pattern);
      }

      //console.log("RE: /"+pattern+"/"+flags);

      this._text = this._text.replace(new RegExp(pattern, flags), replacement);
    }

    return this;
  },

  removeWord: function(wordIdx) {

    return this.replaceWord(wordIdx, E);
  },

  insertWord: function(wordIdx, newWord) {

    var words = this.words(); //  tokenize

    if (wordIdx < 0) wordIdx += words.length;

    // log("insertWord("+ newWord+', '+wordIdx+") -> words["+wordIdx+"] = " + words[wordIdx]);

    if (newWord && newWord.length >= 0 && wordIdx >= 0 && wordIdx < words.length) {

      words[wordIdx] = newWord + SP + words[wordIdx];

      this.text(RiTa.untokenize(words));
    }

    return this;
  },

  toCharArray: function() {

    return this._text.split(RiTa.E);
  },

  replaceWord: function(wordIdx, newWord) {

    //log("replaceWord: "+wordIdx+", '"+newWord+"'");

    var words = this.words(); //  tokenize

    if (wordIdx < 0) wordIdx += words.length;

    if ((newWord || newWord === E) && wordIdx >= 0 && wordIdx < words.length) {

      words[wordIdx] = newWord;

      this.text(RiTa.untokenize(words));
    }

    return this;
  },

  split: function(separator, limit) {

    var parts = this._text.split(separator, limit);
    var rs = [];
    for (var i = 0; i < parts.length; i++) {
      if (parts[i])
        rs.push(new RiString(parts[i]));
    }
    return rs;
  },

  startsWith: function(substr) {

    return this.indexOf(substr) === 0;
  },

  substr: function(start, length) {

    return this._text.substr(start, length);
  },

  substring: function(from, to) {

    return this._text.substring(from, to);
  },

  toLowerCase: function() {

    return this.text(this._text.toLowerCase());
  },

  toString: function() {

    return '[' + this._text + ']';
  },

  toUpperCase: function() {

    return this.text(this._text.toUpperCase());
  },

  trim: function() {

    return this.text(trim(this._text));
  },

  charAt: function(index) {

    return this._text.charAt(index);
  },

  concat: function(riString) {

    return this._text.concat(riString.text());
  }
};

// ////////////////////////////////////////////////////////////
// RiGrammar
// ////////////////////////////////////////////////////////////

var RiGrammar = makeClass();

RiGrammar.START_RULE = "<start>";
RiGrammar.PROB_PATT = /(.*[^\s])\s*\[([0-9.]+)\](.*)/;
RiGrammar.EXEC_PATT = /(.*?)(`[^`]+?\(.*?\);?`)(.*)/;
RiGrammar.STRIP_TICKS = /`([^`]*)`/g;
RiGrammar.OR_PATT = /\s*\|\s*/;

RiGrammar.prototype = {

  init: function(grammar) {

    this._rules = {};
    this.execDisabled = false;

    if (grammar) {

      // a String or Object, but make sure its not a PApplet (e.g., this)
      if (is(grammar, S) || (is(grammar, O) && typeof grammar.loadStrings !== F))
        this.load(grammar);
    }
  },

  ready: function(url) {

    return (okeys(this._rules).length > 0);
  },

  loadFrom: function(url, callback) {

    RiTa.loadStrings(url, function(data) {

      data = data.join(BN);
      this.load(data);
      is(callback, F) && (callback(data));

    }.bind(this));
  },

  load: function(grammar) {

    this.reset();

    if (is(grammar, S)) {

      if (typeof YAML != 'undefined') { // found a yaml-parser, so try it first

        try {
          //console.log('trying YAML');
          grammar = YAML.parse(grammar);

        } catch (e) {

          warn('YAML parsing failed, trying JSON');
        }
      }

      if (!is(grammar, O)) { // we failed with our yaml-parser, so try JSON
        try {

          //console.log('trying JSON');
          grammar = JSON.parse(grammar);

        } catch (e) {

          var ex = e;
        }
      }
    }

    if (ex || !is(grammar, O)) {

      if (typeof YAML != 'undefined') {
        err('Grammar appears to be invalid JSON/YAML, please check it!' +
          ' (http://jsonlint.com/ or http://yamllint.com/)', grammar);
      }
      else {
        var isnode = RiTa.env() === RiTa.NODE, verb =  isnode ? 'require'
          : 'include', syntax = isnode ? "YAML = require('yamljs')" :
            '<script src="yaml.min.js"></script>';

        err('Grammar appears to be invalid JSON, please check it at ' +
          'http://jsonlint.com/. If you are using YAML, be sure to '  +
          verb + ' yamljs (https://github.com/jeremyfa/yaml.js), e.g. ' +
          syntax, grammar);
      }

      return;
    }

    for (var rule in grammar) {
      this.addRule(rule, grammar[rule]);
    }

    return this;
  },

  addRule: function(name, theRule, weight) {
    var dbug = false;

    weight = weight || 1.0; // default

    if (dbug) log('addRule: "' + name + '" : "' + theRule +
      '"       [' + get(theRule) + ']');

    var ruleset = theRule;
    if (!is(theRule, A))
      ruleset = theRule.split(RiGrammar.OR_PATT);

    for (var i = 0; i < ruleset.length; i++) {

      var rule = ruleset[i];
      var prob = weight;
      var m = RiGrammar.PROB_PATT.exec(rule);

      if (m) // found weighting
      {
        if (dbug) {
          log("Found weight for " + rule);
          for (i = 0; i < m.length; i++)
            log("  " + i + ") '" + m[i] + "'");
        }

        rule = m[1] + m[3];
        prob = m[2];

        if (dbug) log("weight=" + prob + " rule='" + rule + "'");
      }

      if (this.hasRule(name)) {

        if (dbug) log("rule exists");
        var temp = this._rules[name];
        temp[rule] = prob;
      } else {

        var temp2 = {};
        temp2[rule] = prob;
        this._rules[name] = temp2;

        if (dbug) log("added rule: " + name);
      }
    }

    return this;
  },

  removeRule: function(name) {

    delete this._rules[name];
    return this;
  },

  _copy: function() {

    var tmp = RiGrammar();
    for (var name in this._rules) {
      tmp._rules[name] = this._rules[name];
    }
    return tmp;
  },

  reset: function() {

    this._rules = {};
    return this;

  },

  doRule: function(pre) {

    var cnt = 0,
      name = E,
      rules = this._rules[pre];

    if (!rules) return null;

    for (name in rules) cnt++;

    if (!cnt) return null;

    return (cnt == 1) ? name : this._getStochasticRule(rules);
  },


  getGrammar: function() {

    var s = E;
    for (var name in this._rules) {
      s += (name + BN);
      var choices = this._rules[name];
      for (var p in choices) {
        s += ("  '" + p + "' [" + choices[p] + ']' + BN);
      }
    }
    return RiTa.chomp(s);
  },

  print: function() {

    if (console) {
      var ln = "\n------------------------------";
      console.log(ln + BN + this.getGrammar() + ln);
    }
    return this;

  },

  hasRule: function(name) {

    return (typeof this._rules[name] !== 'undefined');
  },

  expandWith: function(literal, symbol) { // TODO: finish

    var name, gr = this._copy(),
      match = false;

    for (name in gr._rules) {

      if (name === symbol) {

        var obj = {};
        obj[literal] = 1.0;
        gr._rules[name] = obj;
        match = true;
      }
    }

    if (!match)
      err("Rule '" + symbol + "' not found in grammar");

    // TODO: tmp, awful hack, write this correctly
    var tries, maxTries = 1000;
    for (tries = 0; tries < maxTries; tries++) {
      var s = gr.expand();
      if (s.indexOf(literal) > -1)
        return s;
    }
    err("RiGrammar failed to complete after " + tries + " tries" + BN);

  },

  expand: function(context) {

    return this.expandFrom(RiGrammar.START_RULE, context);
  },

  expandFrom: function(rule, context) {

    if (!okeys(this._rules).length)
      err("(RiGrammar) No grammar rules found!");

    if (!this.hasRule(rule))
      err("Rule not found: " + rule + BN + "Rules:" + BN + JSON.stringify(this._rules));

    var parts, theCall, callResult, tries = 0,
      maxIterations = 1000;
    while (++tries < maxIterations) {
      var next = this._expandRule(rule);

      if (next && next.length) { // matched a rule

        rule = next;
        continue;
      }

      if (this.execDisabled) break; // return

      // finished rules, check for back-ticked exec calls

      parts = RiGrammar.EXEC_PATT.exec(rule);

      if (!parts || !parts.length) break; // return, no evals

      if (parts.length > 2) {

        theCall = parts[2];

        if (this._countTicks(theCall) != 2) {

          warn("Unable to parse recursive exec: " + theCall + "...");
          return null;
        }

        callResult = this._handleExec(theCall, context);

        if (!callResult) {

          if (0) log("[WARN] (RiGrammar.expandFrom) Unexpected" +
            " state: eval(" + theCall + ") :: returning '" + rule + "'");

          break; // return
        }

        rule = parts[1] + callResult;

        (parts.length > 3) && (rule += parts[3]);
      }
    }

    if (tries >= maxIterations)
      log("[WARN] max number of iterations reached: " + maxIterations);

    return RiTa.unescapeHTML(rule);
  },

  _countTicks: function(theCall) {

    var count = 0;
    for (var i = 0; i < theCall.length; i++) {
      if (theCall.charAt(i) == '`')
        count++;
    }
    return count;
  },

  openEditor: function() {

    warn("Editor not yet implemented in JavaScript");
    return this;
  },

  _handleExec: function(input, context) { // TODO: list all cases and rewrite

    if (!input || !input.length) return null;

    // strip backticks and eval
    var res, exec = input.replace(RiGrammar.STRIP_TICKS, '$1');

    try {
      // TODO: See issue #9 [https://github.com/dhowe/RiTaJS/issues?state=open]
      // if (typeof module != 'undefined' && module.exports) // for node
      // 		return require("vm").runInThisContext(exec,context);

      res = eval(exec); // try in global context

      return res ? res + E : null;

    } catch (e) {

      // try with the PApplet context
      // TODO: clean this up
      // TODO: do we need to explicitly check window[funName] in the browser?
      var parts = exec.split('(');
      if (parts && parts.length == 2) {

        var funName = parts[0];
        var argStr = parts[1].replace(/\)/,E);
        var g = context;
        if (!g && typeof window != 'undefined') g = window;
        if (g && g[funName] && is(g[funName], F)) {

          var args = argStr.split(',');
          //log("calling "+funName + "("+argStr+");");
          res = g[funName].apply(g, args);
          return res ? res + E : null;
        }
      }

      warn("RiGrammar failed parsing: " + input + BN + " -> " + e.message);
      return null;
    }
  },

  _expandRule: function(prod) {

    var entry, idx, pre, expanded, post, dbug = 0;

    if (dbug) log("_expandRule(" + prod + ")");

    for (var name in this._rules) {

      entry = this._rules[name];

      if (dbug) log("  name=" + name + "  entry=" + entry + "  prod=" + prod + "  idx=" + idx);

      idx = prod.indexOf(name);

      if (idx >= 0) { // got a match, split into 3 parts

        pre = prod.substring(0, idx) || E;
        expanded = this.doRule(name) || E;
        post = prod.substring(idx + name.length) || E;

        if (dbug) log("  pre=" + pre + "  expanded=" + expanded +
          "  post=" + post + "  result=" + pre + expanded + post);

        return pre + expanded + post;
      }
    }

    return null; // no rules matched
  },

  _getStochasticRule: function(temp) { // map

    var name, dbug = false;

    if (dbug) log("_getStochasticRule(" + temp + ")");

    var p = Math.random();
    var result, total = 0;
    for (name in temp) {
      total += parseFloat(temp[name]);
    }

    if (dbug) log("total=" + total + "p=" + p);

    for (name in temp) {
      if (dbug) log("  name=" + name);
      var amt = temp[name] / total;

      if (dbug) log("amt=" + amt);

      if (p < amt) {
        result = name;
        if (dbug) log("hit!=" + name);
        break;
      } else {
        p -= amt;
      }
    }
    return result;
  }


}; // end RiGrammar

var RiTaEvent = makeClass();

RiTaEvent._callbacksDisabled = false;
RiTaEvent.ID = 0;

RiTaEvent.prototype = {

  init: function(source, eventType, data) {

    is(source, O) || ok(source, S);

    this._id = ++RiTaEvent.ID;
    this._data = data;
    this._source = source;
    this._type = eventType || RiTa.UNKNOWN;
  },

  toString: function() {

    var s = 'RiTaEvent[#' + this._id + ' type=' +
      '(' + this._type + ') source=' + this._source.toString();

    s += !this._data ? s += ' data=null' :
      (' data-length=' + this._data.toString().length);

    return s + ']';
  },

  isType: function(t) {

    return this._type === t;
  },

  _fire: function(callback) {

    callback = callback || window.onRiTaEvent;

    if (callback && is(callback, F)) {
      try {

        callback(this); // first arg ??
        return this;

      } catch (err) {

        RiTaEvent._callbacksDisabled = true;
        var msg = "RiTaEvent: error calling '" + callback + "': " + err;
        is(callback, S) && (msg += " Callback must be a function in JS!");
        warn(msg);
        throw err;
      }
    }
  }
};


/////////////////////////////////////////////////////////////////////////
//StringTokenizer
/////////////////////////////////////////////////////////////////////////

var StringTokenizer = makeClass();

StringTokenizer.prototype = {

  init: function(str, delim) {

    this.idx = 0;
    this.text = str;
    this.delim = delim || " ";
    this.tokens = str.split(delim);
  },

  nextToken: function() {

    return (this.idx < this.tokens.length) ? this.tokens[this.idx++] : null;
  }
};

////////////////////////// PRIVATE CLASSES ///////////////////////////////

// ////////////////////////////////////////////////////////////
// TextNode
// ////////////////////////////////////////////////////////////

var TextNode = makeClass();

TextNode.prototype = {

  init: function(parent, token) {
    this.count = 0;
    this.children = {};
    this.parent = parent;
    this.token = token;
  },

  pathFromRoot: function(result) {
    var mn = this;
    while (true) {
      if (mn.isRoot()) break;
      result.push(mn.token);
      mn = mn.parent;
    }
  },

  selectChild: function(regex, probabalisticSelect) {
    var ps = probabalisticSelect || true;
    return this.children ? this._select(this.childNodes(regex), ps) : null;
  },

  _select: function(arr, probabalisticSelect) {
    if (!arr) throw TypeError("bad arg to '_select()'");
    probabalisticSelect = probabalisticSelect || false;
    return (probabalisticSelect ? this._probabalisticSelect(arr) : arr[Math.floor((Math.random() * arr.length))]);
  },

  _probabalisticSelect: function(arr) {

    if (!arr) throw TypeError("bad arg to '_probabalisticSelect()'");

    //log("RiTa.probabalisticSelect("+c+", size="+c.size()+")");
    if (!arr.length) return null;
    if (arr.length == 1) return arr[0];

    // select from multiple options based on frequency
    var pTotal = 0,
      selector = Math.random();
    for (var i = 0; i < arr.length; i++) {

      pTotal += arr[i].probability();
      if (selector < pTotal)
        return arr[i];
    }
    err("Invalid State in RiTa.probabalisticSelect()");
  },

  addChild: function(newToken, initialCount) {

    initialCount = initialCount || 1;

    var node = this.children[newToken];

    //  add first instance of this token
    if (!node) {

      node = new TextNode(this, newToken);
      node.count = initialCount;
      this.children[newToken] = node;
    } else {

      node.count++;
    }

    return node;
  },

  asTree: function(sort) {
    var s = this.token + " ";
    if (!this.isRoot())
      s += "(" + this.count + ")->";
    s += "{";
    if (!this.isLeaf())
      return this.childrenToString(this, s, 1, sort);
    return s + "}";
  },

  isRoot: function() {
    return !this.parent;
  },

  isLeaf: function() {
    return this.childCount() === 0;
  },

  probability: function() {
    //log('probability: '+ this.count+'/'+this.siblingCount());
    return this.count / this.siblingCount();
  },

  childNodes: function(regex) {
    if (!this.children) return EA;
    regex = is(regex, S) ? new RegExp(regex) : regex;
    var res = [];
    for (var k in this.children) {
      var nd = this.children[k];
      if (!regex || (nd && nd.token && nd.token.search(regex) > -1)) {
        res.push(nd);
      }
    }
    return res;
  },

  siblingCount: function() {
    if (!this.parent) err("Illegal siblingCount on ROOT!");
    return this.parent.childCount();
  },

  childCount: function() {
    if (!this.children) return 0;
    var sum = 0;
    for (var k in this.children) {
      if (k && this.children[k])
        sum += this.children[k].count;
    }
    return sum;
  },

  // takes node or string, returns node
  lookup: function(obj) {
    if (!obj) return null;
    obj = (typeof obj != S && obj.token) ? obj.token : obj;
    return obj ? this.children[obj] : null;
  },

  childrenToString: function(textNode, str, depth, sort) {

    var i, j, k, mn = textNode,
      l = [],
      node = null,
      indent = BN;

    sort = sort || false;

    for (k in textNode.children) {
      l.push(textNode.children[k]);
    }

    if (!l.length) return str;

    if (sort) l.sort();

    for (j = 0; j < depth; j++)
      indent += "  ";

    for (i = 0; i < l.length; i++) {

      node = l[i];

      if (!node) break;

      var tok = node.token;
      if (tok) {
        (tok == BN) && (tok = "\\n");
        (tok == "\r") && (tok = "\\r");
        (tok == "\t") && (tok = "\\t");
        (tok == "\r\n") && (tok = "\\r\\n");
      }

      str += indent + "'" + tok + "'";

      if (!node.count)
        err("ILLEGAL FREQ: " + node.count + " -> " + mn.token + "," + node.token);

      if (!node.isRoot())
        str += " [" + node.count + ",p=" + //formatter.format
        (node.probability().toFixed(3)) + "]->{";

      if (node.children)
        str = this.childrenToString(node, str, depth + 1, sort);
      else
        str += "}";
    }

    indent = BN;
    for (j = 0; j < depth - 1; j++)
      indent += "  ";

    return str + indent + "}";
  },

  toString: function() {
    return '[ ' + this.token + " (" + this.count + '/' + this.probability().toFixed(3) + '%)]';
  }
};

// ////////////////////////////////////////////////////////////
// Conjugator
// ////////////////////////////////////////////////////////////

var Conjugator = makeClass();

Conjugator.prototype = {

  init: function() {

    this.perfect = this.progressive = this.passive = this.interrogative = false;
    this.tense = RiTa.PRESENT_TENSE;
    this.person = RiTa.FIRST_PERSON;
    this.number = RiTa.SINGULAR;
    this.form = RiTa.NORMAL;
  },

  // !@# TODO: add handling of past tense modals.
  conjugate: function(theVerb, args) {

    var v, s, actualModal, conjs = [],
      frontVG, verbForm;

    if (!theVerb || !theVerb.length) return E;

    if (!args) return theVerb;

    // ------------------ handle arguments ------------------

    v = theVerb.toLowerCase();
    if (v === "am" || v === "are" || v === "is" || v === "was" || v === "were") {
      v = "be";
    }
    frontVG = v;

    args.number && (this.number = args.number);
    args.person && (this.person = args.person);
    args.tense && (this.tense = args.tense);
    args.form && (this.form = args.form);
    args.passive && (this.passive = args.passive);
    args.progressive && (this.progressive = args.progressive);
    args.interrogative && (this.interrogative = args.interrogative);
    args.perfect && (this.perfect = args.perfect);

    // ----------------------- start ---------------------------
    if (this.form == RiTa.INFINITIVE) {
      actualModal = "to";
    }

    if (this.tense == RiTa.FUTURE_TENSE) {
      actualModal = "will";
    }

    if (this.passive) {
      conjs.push(this.getPastParticiple(frontVG));
      frontVG = "be";
    }

    if (this.progressive) {
      conjs.push(this.getPresentParticiple(frontVG));
      frontVG = "be";
    }

    if (this.perfect) {
      conjs.push(this.getPastParticiple(frontVG));
      frontVG = "have";
    }

    if (actualModal) {

      // log("push: "+frontVG);
      conjs.push(frontVG);
      frontVG = null;
    }

    // Now inflect frontVG (if it exists) and push it on restVG
    if (frontVG) {

      if (this.form === RiTa.GERUND) { // gerund - use ING form

        var pp = this.getPresentParticiple(frontVG);

        // !@# not yet implemented! ??? WHAT?
        conjs.push(pp);
      } else if (this.interrogative && frontVG != "be" && conjs.length < 1) {

        conjs.push(frontVG);
      } else {

        verbForm = this.getVerbForm(frontVG, this.tense, this.person, this.number);
        conjs.push(verbForm);
      }
    }

    // add modal, and we're done
    actualModal && conjs.push(actualModal);

    s = E;
    for (var i = 0; i < conjs.length; i++) {

      s = conjs[i] + " " + s;
    }

    // !@# test this
    endsWith(s, "peted") && err("Unexpected output: " + this.toString());

    return trim(s);
  },

  checkRules: function(ruleSet, theVerb) {

    var res, name = ruleSet.name,
      rules = ruleSet.rules,
      defRule = ruleSet.defaultRule;

    if (!rules) err("no rule: " + ruleSet.name + ' of ' + theVerb);

    if (inArray(MODALS, theVerb)) return theVerb;

    for (var i = 0; i < rules.length; i++) {

      //log("checkRules2("+name+").fire("+i+")="+rules[i].regex);
      if (rules[i].applies(theVerb)) {

        var got = rules[i].fire(theVerb);

        //log("HIT("+name+").fire("+i+")="+rules[i].regex+"_returns: "+got);
        return got;
      }
    }
    //log("NO HIT!");

    if (ruleSet.doubling && inArray(VERB_CONS_DOUBLING, theVerb)) {

      //log("doDoubling!");
      theVerb = this.doubleFinalConsonant(theVerb);
    }

    res = defRule.fire(theVerb);

    //log("checkRules("+name+").returns: "+res);

    return res;
  },

  doubleFinalConsonant: function(word) {
    var letter = word.charAt(word.length - 1);
    return word + letter;
  },

  getPast: function(theVerb, pers, numb) {

    if (theVerb.toLowerCase() == "be") {

      switch (numb) {

        case RiTa.SINGULAR:

          switch (pers) {

            case RiTa.FIRST_PERSON:
              break;

            case RiTa.THIRD_PERSON:
              return "was";

            case RiTa.SECOND_PERSON:
              return "were";

          }
          break;

        case RiTa.PLURAL:

          return "were";
      }
    }

    var got = this.checkRules(PAST_TENSE_RULESET, theVerb);

    return got;
  },

  getPresent: function(theVerb, person, number) {

    person = person || this.person;
    number = number || this.number;

    if ((person == RiTa.THIRD_PERSON) && (number == RiTa.SINGULAR)) {

      return this.checkRules(PRESENT_TENSE_RULESET, theVerb);
    } else if (theVerb == "be") {

      if (number == RiTa.SINGULAR) {

        switch (person) {

          case RiTa.FIRST_PERSON:
            return "am";

          case RiTa.SECOND_PERSON:
            return "are";

          case RiTa.THIRD_PERSON:
            return "is";

            // default: ???
        }

      } else {
        return "are";
      }
    }
    return theVerb;
  },

  getPresentParticiple: function(theVerb) {

    return strOk(theVerb) ? this.checkRules(PRESENT_PARTICIPLE_RULESET, theVerb) : E;
  },

  getPastParticiple: function(theVerb) {

    var res = strOk(theVerb) ? this.checkRules(PAST_PARTICIPLE_RULESET, theVerb) : E;
    return res;
  },

  getVerbForm: function(theVerb, tense, person, number) {

    switch (tense) {

      case RiTa.PRESENT_TENSE:
        return this.getPresent(theVerb, person, number);

      case RiTa.PAST_TENSE:
        return this.getPast(theVerb, person, number);

      default:
        return theVerb;
    }
  },

  toString: function() {
    return "  ---------------------" + BN + "  Passive = " + this.passive +
      BN + "  Perfect = " + this.perfect + BN + "  Progressive = " +
      this.progressive + BN + "  ---------------------" + BN + "  Number = " +
      this.number + BN + "  Person = " + this.person + BN + "  Tense = " +
      this.tense + BN + "  ---------------------" + BN;
  }
};

// ////////////////////////////////////////////////////////////
// PosTagger  (singleton)
// ////////////////////////////////////////////////////////////
var PosTagger = {

  // Penn Pos types ------------------------------ (40+UKNOWN)

  UNKNOWN: ['???', 'unknown'],
  N: ['n', 'NOUN_KEY'],
  V: ['v', 'VERB_KEY'],
  R: ['r', 'ADVERB_KEY'],
  A: ['a', 'ADJECTIVE_KEY'],
  CC: ['cc', 'Coordinating conjunction'],
  CD: ['cd', 'Cardinal number'],
  DT: ['dt', 'Determiner'],
  EX: ['ex', 'Existential there'],
  FW: ['fw', 'Foreign word'],
  IN: ['in', 'Preposition or subordinating conjunction'],
  JJ: ['jj', 'Adjective'],
  JJR: ['jjr', 'Adjective, comparative'],
  JJS: ['jjs', 'Adjective, superlative'],
  LS: ['ls', 'List item marker'],
  MD: ['md', 'Modal'],
  NN: ['nn', 'Noun, singular or mass'],
  NNS: ['nns', 'Noun, plural'],
  NNP: ['nnp', 'Proper noun, singular'],
  NNPS: ['nnps', 'Proper noun, plural'],
  PDT: ['pdt', 'Predeterminer'],
  POS: ['pos', 'Possessive ending'],
  PRP: ['prp', 'Personal pronoun'],
  PRP$: ['prp$', 'Possessive pronoun (prolog version PRP-S)'],
  RB: ['rb', 'Adverb'],
  RBR: ['rbr', 'Adverb, comparative'],
  RBS: ['rbs', 'Adverb, superlative'],
  RP: ['rp', 'Particle'],
  SYM: ['sym', 'Symbol'],
  TO: ['to', 'to'],
  UH: ['uh', 'Interjection'],
  VB: ['vb', 'Verb, base form'],
  VBD: ['vbd', 'Verb, past tense'],
  VBG: ['vbg', 'Verb, gerund or present participle'],
  VBN: ['vbn', 'Verb, past participle'],
  VBP: ['vbp', 'Verb, non-3rd person singular present'],
  VBZ: ['vbz', 'Verb, 3rd person singular present'],
  WDT: ['wdt', 'Wh-determiner'],
  WP: ['wp', 'Wh-pronoun'],
  WP$: ['wp$', 'Possessive wh-pronoun (prolog version WP-S)'],
  WRB: ['wrb', 'Wh-adverb'],

  TAGS: ['cc', 'cd', 'dt', 'ex', 'fw', 'in', 'jj',
    'jjr', 'jjs', 'ls', 'md', 'nn', 'nns', 'nnp',
    'nnps', 'pdt', 'pos', 'prp', 'prp$', 'rb',
    'rbr', 'rbs', 'rp', 'sym', 'to',
    'uh', 'vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz', 'wdt',
    'wp', 'wp$', 'wrb', 'unknown'
  ],

  NOUNS: ['nn', 'nns', 'nnp', 'nnps'],
  VERBS: ['vb', 'vbd', 'vbg', 'vbn', 'vbp', 'vbz'],
  ADJ: ['jj', 'jjr', 'jjs'],
  ADV: ['rb', 'rbr', 'rbs', 'rp'],
  NOLEX_WARNED: false,

  isVerb: function(tag) {
    return inArray(this.VERBS, tag);
  },

  isNoun: function(tag) {
    return inArray(this.NOUNS, tag);
  },

  isAdverb: function(tag) {
    return inArray(this.ADV, tag);
  },

  isAdj: function(tag) {
    return inArray(this.ADJ, tag);
  },

  isTag: function(tag) {
    return inArray(this.TAGS, tag);
  },

  hasTag: function(choices, tag) {
    ok(choices, A);
    var choiceStr = choices.join();
    return (choiceStr.indexOf(tag) > -1);
  },

  // Returns an array of parts-of-speech from the Penn tagset,
  // each corresponding to one word of input
  tag: function(words) {

    var result = [], choices2d = [], lex;

    if (RiLexicon.enabled) {
      lex = RiTa._lexicon();
    }
    else if (!RiTa.SILENT && !this.NOLEX_WARNED){
      this.NOLEX_WARNED = true;
      console.warn('No RiLexicon found: ' +
        'part-of-speech tagging will be inaccurate!');
    }

    words = is(words, A) ? words : [words];

    for (var i = 0, l = words.length; i < l; i++) {

      /*if (!words[i]) {
				choices2d[i] = [];
				continue;
			}*/

      if (words[i].length < 1) {

        result.push(E);
        continue;
      }

      if (words[i].length == 1) {

        result.push(this._handleSingleLetter(words[i]));
        continue;
      }

      var data = lex && lex._getPosArr(words[i]);

      if (!data || !data.length) {

        choices2d[i] = [];
        result.push((endsWith(words[i], 's') ? 'nns' : 'nn'));

      } else {

        result.push(data[0]);
        choices2d[i] = data;
      }
    }

    // Adjust pos according to transformation rules
    return this._applyContext(words, result, choices2d);
  },

  _handleSingleLetter: function(c) {

    var result = c;

    if (c === 'a' || c === 'A')
      result = "dt";
    else if (c === 'I')
      result = "prp";
    else if (c >= '0' && c <= '9')
      result = "cd";

    //System.out.println("handleSingleLetter("+word+") :: "+result);

    return result;
  },

  // Applies a customized subset of the Brill transformations
  _applyContext: function(words, result, choices) {

    //log("_applyContext("+words+","+result+","+choices+")");

    var sW = startsWith, eW = endsWith,
      PRINT_CUSTOM_TAGS = (0 && !RiTa.SILENT);

    // Apply transformations
    for (var i = 0, l = words.length; i < l; i++) {

      // transform 1: DT, {VBD | VBP | VB} --> DT, NN
      if (i > 0 && (result[i - 1] == "dt")) {

        if (sW(result[i], "vb")) {
          if (PRINT_CUSTOM_TAGS) {
            log("PosTagger: changing verb to noun: " + words[i]);
          }
          result[i] = "nn";
        }

        // transform 1: DT, {RB | RBR | RBS} --> DT, {JJ |
        // JJR | JJS}
        else if (sW(result[i], "rb")) {

          if (PRINT_CUSTOM_TAGS)
            log("PosTagger: custom tagged '" + words[i] + "', " + result[i]);
          result[i] = (result[i].length > 2) ? "jj" + result[i].charAt(2) : "jj";
          if (PRINT_CUSTOM_TAGS) {
            log(" -> " + result[i]);
          }
        }
      }

      // transform 2: convert a noun to a number (cd) if it is
      // all digits and/or a decimal "."
      if (sW(result[i], "n") && !choices[i]) {
        if (isNum(words[i])) {
          result[i] = "cd";
        } // mods: dch (add choice check above) <---- ? >
      }

      // transform 3: convert a noun to a past participle if
      // words[i] ends with "ed"
      if (sW(result[i], "n") && eW(words[i], "ed")) {
        result[i] = "vbn";
      }

      // transform 4: convert any type to adverb if it ends in "ly";
      if (eW(words[i], "ly")) {
        result[i] = "rb";
      }

      // transform 5: convert a common noun (NN or NNS) to a
      // adjective if it ends with "al", special-case for mammal
      if (sW(result[i], "nn") && eW(words[i], "al") && words[i] != 'mammal') {
        result[i] = "jj";
      }

      // transform 6: convert a noun to a verb if the
      // preceeding word is "would"
      if (i > 0 && sW(result[i], "nn") && equalsIgnoreCase(words[i - 1], "would")) {
        result[i] = "vb";
      }

      // transform 7: if a word has been categorized as a
      // common noun and it ends with "s", then set its type to plural common noun (NNS)
      if ((result[i] == "nn") && words[i].match(/^.*[^s]s$/)) {
        if (!NULL_PLURALS.applies(words[i]))
          result[i] = "nns";
      }

      // transform 8: convert a common noun to a present
      // participle verb (i.e., a gerund)
      if (sW(result[i], "nn") && eW(words[i], "ing")) {
        // DH: fixed here -- add check on choices for any verb: eg. // 'morning'
        if (this.hasTag(choices[i], "vb")) {
          result[i] = "vbg";
        } else if (PRINT_CUSTOM_TAGS) {
          log("[RiTa] PosTagger tagged '" + words[i] + "' as " + result[i]);
        }
      }

      // transform 9(dch): convert plural nouns (which are also 3sg-verbs) to
      // 3sg-verbs when following a singular noun (the dog dances, Dave dances, he dances)
      if (i > 0 && result[i] == "nns" && this.hasTag(choices[i], "vbz") && result[i - 1].match(/^(nn|prp|nnp)$/)) {
        result[i] = "vbz";
      }

      // transform 10(dch): convert common nouns to proper
      // nouns when they start w' a capital and (?are not a
      // sentence start?)
      if ( /*i > 0 && */ sW(result[i], "nn") && (words[i].charAt(0) == words[i].charAt(0).toUpperCase())) {
        result[i] = eW(result[i], "s") ? "nnps" : "nnp";
      }

      // DISABLED: transform 10(dch): convert plural nouns (which are
      // also 3sg-verbs) to 3sg-verbs when followed by adverb
      /*if (i < result.length - 1 && result[i] == "nns" && sW(result[i + 1], "rb")
					&& this.hasTag(choices[i], "vbz")) {
				result[i] = "vbz";
			}*/
    }

    return result;
  }
}; // end PosTagger

// Stemming demo/comparison - http://text-processing.com/demo/stem/

/*
 *  Porter stemmer in Javascript: from https://github.com/kristopolous/Porter-Stemmer
 *  Ported from Porter, 1980, An algorithm for suffix stripping, Program, Vol. 14,
 *  no. 3, pp 130-137, see also http:www.tartarus.org/~martin/PorterStemmer
 *
 *  Porter is default Stemmer: for Lancaster or Pling, include the specific file
 */
RiTa.stem_Porter = (function() {

  var step2list = {
      'ational': 'ate',
      'tional': 'tion',
      'enci': 'ence',
      'anci': 'ance',
      'izer': 'ize',
      'bli': 'ble',
      'alli': 'al',
      'entli': 'ent',
      'eli': 'e',
      'ousli': 'ous',
      'ization': 'ize',
      'ation': 'ate',
      'ator': 'ate',
      'alism': 'al',
      'iveness': 'ive',
      'fulness': 'ful',
      'ousness': 'ous',
      'aliti': 'al',
      'iviti': 'ive',
      'biliti': 'ble',
      'logi': 'log'
    },

    step3list = {
      'icate': 'ic',
      'ative': '',
      'alize': 'al',
      'iciti': 'ic',
      'ical': 'ic',
      'ful': '',
      'ness': ''
    },

    c = '[^aeiou]', // consonant
    v = '[aeiouy]', // vowel
    C = c + '[^aeiouy]*', // consonant sequence
    V = v + '[aeiou]*', // vowel sequence

    mgr0 = '^(' + C + ')?' + V + C, // [C]VC... is m>0
    meq1 = '^(' + C + ')?' + V + C + '(' + V + ')?$', // [C]VC[V] is m=1
    mgr1 = '^(' + C + ')?' + V + C + V + C, // [C]VCVC... is m>1
    s_v = '^(' + C + ')?' + v; // vowel in stem

  return function(w) {

    var fp, stem, suffix, firstch, re, re2, re3, re4, origword = w;

    if (w.length < 3) {
      return w;
    }

    firstch = w.substr(0, 1);
    if (firstch == "y") {
      w = firstch + w.substr(1);
    }

    // Step 1a
    re = /^(.+?)(ss|i)es$/;
    re2 = /^(.+?)([^s])s$/;

    if (re.test(w)) {
      w = w.replace(re, "$1$2");
    } else if (re2.test(w)) {
      w = w.replace(re2, "$1$2");
    }

    // Step 1b
    re = /^(.+?)eed$/;
    re2 = /^(.+?)(ed|ing)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      re = new RegExp(mgr0);
      if (re.test(fp[1])) {
        re = /.$/;
        w = w.replace(re,E);
      }
    } else if (re2.test(w)) {
      fp = re2.exec(w);
      stem = fp[1];
      re2 = new RegExp(s_v);
      if (re2.test(stem)) {
        w = stem;
        re2 = /(at|bl|iz)$/;
        re3 = new RegExp("([^aeiouylsz])\\1$");
        re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
        if (re2.test(w)) {
          w = w + "e";
        } else if (re3.test(w)) {
          re = /.$/;
          w = w.replace(re,E);
        } else if (re4.test(w)) {
          w = w + "e";
        }
      }
    }

    // Step 1c
    re = /^(.+?)y$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(s_v);
      if (re.test(stem)) w = stem + "i";
    }

    // Step 2
    re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = new RegExp(mgr0);
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
    re2 = /^(.+?)(s|t)(ion)$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = new RegExp(mgr1);
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = /^(.+?)e$/;
    if (re.test(w)) {
      fp = re.exec(w);
      stem = fp[1];
      re = new RegExp(mgr1);
      re2 = new RegExp(meq1);
      re3 = new RegExp("^" + C + v + "[^aeiouwxy]$");
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = /ll$/;
    re2 = new RegExp(mgr1);
    if (re.test(w) && re2.test(w)) {
      re = /.$/;
      w = w.replace(re,E);
    }

    // and turn initial Y back to y

    (firstch == "y") && (w = firstch.toLowerCase() + w.substr(1));

    return w;
  };

})();

/* From the PlingStemmer impl in the Java Tools package (see http://mpii.de/yago-naga/javatools). */
RiTa.stem_Pling = (function() {

  /* Words that are both singular and plural */
  var categorySP = ["acoustics", "aestetics", "aquatics", "basics", "ceramics", "classics", "cosmetics", "dermatoglyphics", "dialectics", "deer", "dynamics", "esthetics", "ethics", "harmonics", "heroics", "isometrics", "mechanics", "metrics", "statistics", "optic", "people", "physics", "polemics", "propaedeutics", "pyrotechnics", "quadratics", "quarters", "statistics", "tactics", "tropics"];

  /* Words that end in "-se" in their plural forms (like "nurse" etc.) */
  var categorySE_SES = ["nurses", "cruises"];

  /* Words that do not have a distinct plural form (like "atlas" etc.) */
  var category00 = ["alias", "asbestos", "atlas", "barracks", "bathos", "bias", "breeches", "britches", "canvas", "chaos", "clippers", "contretemps", "corps", "cosmos", "crossroads", "diabetes", "ethos", "gallows", "gas", "graffiti", "headquarters", "herpes", "high-jinks", "innings", "jackanapes", "lens", "means", "measles", "mews", "mumps", "news", "pathos", "pincers", "pliers", "proceedings", "rabies", "rhinoceros", "sassafras", "scissors", "series", "shears", "species", "tuna"];

  /* Words that change from "-um" to "-a" (like "curriculum" etc.), listed in their plural forms */
  var categoryUM_A = ["addenda", "agenda", "aquaria", "bacteria", "candelabra", "compendia", "consortia", "crania", "curricula", "data", "desiderata", "dicta", "emporia", "enconia", "errata", "extrema", "gymnasia", "honoraria", "interregna", "lustra", "maxima", "media", "memoranda", "millenia", "minima", "momenta", "optima", "ova", "phyla", "quanta", "rostra", "spectra", "specula", "stadia", "strata", "symposia", "trapezia", "ultimata", "vacua", "vela"];

  /* Words that change from "-on" to "-a" (like "phenomenon" etc.), listed in their plural forms */
  var categoryON_A = ["aphelia", "asyndeta", "automata", "criteria", "hyperbata", "noumena", "organa", "perihelia", "phenomena", "prolegomena"];

  /* Words that change from "-o" to "-i" (like "libretto" etc.), listed in their plural forms */
  var categoryO_I = ["alti", "bassi", "canti", "contralti", "crescendi", "libretti", "soli", "soprani", "tempi", "virtuosi"];

  /*  Words that change from "-us" to "-i" (like "fungus" etc.), listed in their plural forms		 */
  var categoryUS_I = ["alumni", "bacilli", "cacti", "foci", "fungi", "genii", "hippopotami", "incubi", "nimbi", "nuclei", "nucleoli", "octopi", "radii", "stimuli", "styli", "succubi", "syllabi", "termini", "tori", "umbilici", "uteri"];

  /* Words that change from "-ix" to "-ices" (like "appendix" etc.), listed in their plural forms */
  var categoryIX_ICES = ["appendices", "cervices"];

  /* Words that change from "-is" to "-es" (like "axis" etc.), listed in their plural forms, plus everybody ending in theses */
  var categoryIS_ES = ["analyses", "axes", "bases", "crises", "diagnoses", "ellipses", "em_PHASEs", "neuroses", "oases", "paralyses", "synopses"];

  /* Words that change from "-oe" to "-oes" (like "toe" etc.), listed in their plural forms*/
  var categoryOE_OES = ["aloes", "backhoes", "beroes", "canoes", "chigoes", "cohoes", "does", "felloes", "floes", "foes", "gumshoes", "hammertoes", "hoes", "hoopoes", "horseshoes", "leucothoes", "mahoes", "mistletoes", "oboes", "overshoes", "pahoehoes", "pekoes", "roes", "shoes", "sloes", "snowshoes", "throes", "tic-tac-toes", "tick-tack-toes", "ticktacktoes", "tiptoes", "tit-tat-toes", "toes", "toetoes", "tuckahoes", "woes"];

  /* Words that change from "-ex" to "-ices" (like "index" etc.), listed in their plural forms*/
  var categoryEX_ICES = ["apices", "codices", "cortices", "indices", "latices", "murices", "pontifices", "silices", "simplices", "vertices", "vortices"];

  /* Words that change from "-u" to "-us" (like "emu" etc.), listed in their plural forms*/
  var categoryU_US = ["apercus", "barbus", "cornus", "ecrus", "emus", "fondus", "gnus", "iglus", "mus", "nandus", "napus", "poilus", "quipus", "snafus", "tabus", "tamandus", "tatus", "timucus", "tiramisus", "tofus", "tutus"];

  /* Words that change from "-sse" to "-sses" (like "finesse" etc.), listed in their plural forms,plus those ending in mousse*/
  var categorySSE_SSES = ["bouillabaisses", "coulisses", "crevasses", "crosses", "cuisses", "demitasses", "ecrevisses", "fesses", "finesses", "fosses", "impasses", "lacrosses", "largesses", "masses", "noblesses", "palliasses", "pelisses", "politesses", "posses", "tasses", "wrasses"];

  /* Words that change from "-che" to "-ches" (like "brioche" etc.), listed in their plural forms*/
  var categoryCHE_CHES = ["adrenarches", "attaches", "avalanches", "barouches", "brioches", "caches", "caleches", "caroches", "cartouches", "cliches", "cloches", "creches", "demarches", "douches", "gouaches", "guilloches", "headaches", "heartaches", "huaraches", "menarches", "microfiches", "moustaches", "mustaches", "niches", "panaches", "panoches", "pastiches", "penuches", "pinches", "postiches", "psyches", "quiches", "schottisches", "seiches", "soutaches", "synecdoches", "thelarches", "troches"];

  /* Words that end with "-ics" and do not exist as nouns without the 's' (like "aerobics" etc.)*/
  var categoryICS = ["aerobatics", "aerobics", "aerodynamics", "aeromechanics", "aeronautics", "alphanumerics", "animatronics", "apologetics", "architectonics", "astrodynamics", "astronautics", "astrophysics", "athletics", "atmospherics", "autogenics", "avionics", "ballistics", "bibliotics", "bioethics", "biometrics", "bionics", "bionomics", "biophysics", "biosystematics", "cacogenics", "calisthenics", "callisthenics", "catoptrics", "civics", "cladistics", "cryogenics", "cryonics", "cryptanalytics", "cybernetics", "cytoarchitectonics", "cytogenetics", "diagnostics", "dietetics", "dramatics", "dysgenics", "econometrics", "economics", "electromagnetics", "electronics", "electrostatics", "endodontics", "enterics", "ergonomics", "eugenics", "eurhythmics", "eurythmics", "exodontics", "fibreoptics", "futuristics", "genetics", "genomics", "geographics", "geophysics", "geopolitics", "geriatrics", "glyptics", "graphics", "gymnastics", "hermeneutics", "histrionics", "homiletics", "hydraulics", "hydrodynamics", "hydrokinetics", "hydroponics", "hydrostatics", "hygienics", "informatics", "kinematics", "kinesthetics", "kinetics", "lexicostatistics", "linguistics", "lithoglyptics", "liturgics", "logistics", "macrobiotics", "macroeconomics", "magnetics", "magnetohydrodynamics", "mathematics", "metamathematics", "metaphysics", "microeconomics", "microelectronics", "mnemonics", "morphophonemics", "neuroethics", "neurolinguistics", "nucleonics", "numismatics", "obstetrics", "onomastics", "orthodontics", "orthopaedics", "orthopedics", "orthoptics", "paediatrics", "patristics", "patristics", "pedagogics", "pediatrics", "periodontics", "pharmaceutics", "pharmacogenetics", "pharmacokinetics", "phonemics", "phonetics", "phonics", "photomechanics", "physiatrics", "pneumatics", "poetics", "politics", "pragmatics", "prosthetics", "prosthodontics", "proteomics", "proxemics", "psycholinguistics", "psychometrics", "psychonomics", "psychophysics", "psychotherapeutics", "robotics", "semantics", "semiotics", "semitropics", "sociolinguistics", "stemmatics", "strategics", "subtropics", "systematics", "tectonics", "telerobotics", "therapeutics", "thermionics", "thermodynamics", "thermostatics"];

  /* Words that change from "-ie" to "-ies" (like "auntie" etc.), listed in their plural forms*/
  var categoryIE_IES = ["aeries", "anomies", "aunties", "baddies", "beanies", "birdies", "boccies", "bogies", "bolshies", "bombies", "bonhomies", "bonxies", "booboisies", "boogies", "boogie-woogies", "bookies", "booties", "bosies", "bourgeoisies", "brasseries", "brassies", "brownies", "budgies", "byrnies", "caddies", "calories", "camaraderies", "capercaillies", "capercailzies", "cassies", "catties", "causeries", "charcuteries", "chinoiseries", "collies", "commies", "cookies", "coolies", "coonties", "cooties", "corries", "coteries", "cowpies", "cowries", "cozies", "crappies", "crossties", "curies", "dachsies", "darkies", "dassies", "dearies", "dickies", "dies", "dixies", "doggies", "dogies", "dominies", "dovekies", "eyries", "faeries", "falsies", "floozies", "folies", "foodies", "freebies", "gaucheries", "gendarmeries", "genies", "ghillies", "gillies", "goalies", "goonies", "grannies", "grotesqueries", "groupies", "hankies", "hippies", "hoagies", "honkies", "hymies", "indies", "junkies", "kelpies", "kilocalories", "knobkerries", "koppies", "kylies", "laddies", "lassies", "lies", "lingeries", "magpies", "magpies", "marqueteries", "mashies", "mealies", "meanies", "menageries", "millicuries", "mollies", "facts1", "moxies", "neckties", "newbies", "nighties", "nookies", "oldies", "organdies", "panties", "parqueteries", "passementeries", "patisseries", "pies", "pinkies", "pixies", "porkpies", "potpies", "prairies", "preemies", "premies", "punkies", "pyxies", "quickies", "ramies", "reveries", "rookies", "rotisseries", "scrapies", "sharpies", "smoothies", "softies", "stoolies", "stymies", "swaggies", "sweeties", "talkies", "techies", "ties", "tooshies", "toughies", "townies", "veggies", "walkie-talkies", "wedgies", "weenies", "weirdies", "yardies", "yuppies", "zombies"];

  /* Maps irregular Germanic English plural nouns to their singular form */
  var categoryIRR = ["beefs", "beef", "beeves", "beef", "brethren", "brother", "busses", "bus", "cattle", "cattlebeast", "children", "child", "corpora", "corpus", "ephemerides", "ephemeris", "firemen", "fireman", "genera", "genus", "genies", "genie", "genii", "genie", "kine", "cow", "lice", "louse", "men", "man", "mice", "mouse", "mongooses", "mongoose", "monies", "money", "mythoi", "mythos", "octopodes", "octopus", "octopuses", "octopus", "oxen", "ox", "people", "person", "soliloquies", "soliloquy", "throes", "throes", "trilbys", "trilby", "women", "woman"];

  /* Tells whether a noun is plural. */
  function isPlural(s) {
    return s !== stem(s);
  }

  /* Tells whether a word form is singular. Note that a word can be both plural and singular */
  function isSingular(s) {
    return (categorySP._arrayContains(s.toLowerCase()) || !isPlural(s));
  }

  /*
   * Tells whether a word form is the singular form of one word and at
   * the same time the plural form of another.
   */
  function isSingularAndPlural(s) {
    return (categorySP._arrayContains(s.toLowerCase()));
  }

  /* Cuts a suffix from a string (that is the number of chars given by the suffix) */
  function cut(s, suffix) {
    return (s.substring(0, s.length - suffix.length));
  }

  /* Returns true if a word is probably not Latin */
  function noLatin(s) {
    return (s.indexOf('h') > 0 || s.indexOf('j') > 0 || s.indexOf('k') > 0 || s.indexOf('w') > 0 || s.indexOf('y') > 0 || s.indexOf('z') > 0 || s.indexOf("ou") > 0 || s.indexOf("sh") > 0 || s.indexOf("ch") > 0 || s._endsWith("aus"));
  }

  /* Returns true if a word is probably Greek */
  function greek(s) {
    return (s.indexOf("ph") > 0 || s.indexOf('y') > 0 && s._endsWith("nges"));
  }

  function stem(s) {

    // Handle irregular ones
    var irreg = categoryIRR[s];

    if (irreg) return (irreg);

    // -on to -a
    if (categoryON_A._arrayContains(s))
      return (cut(s, "a") + "on");

    // -um to -a
    if (categoryUM_A._arrayContains(s))
      return (cut(s, "a") + "um");

    // -x to -ices
    if (categoryIX_ICES._arrayContains(s))
      return (cut(s, "ices") + "ix");

    // -o to -i
    if (categoryO_I._arrayContains(s))
      return (cut(s, "i") + "o");

    // -se to ses
    if (categorySE_SES._arrayContains(s))
      return (cut(s, "s"));

    // -is to -es
    if (categoryIS_ES._arrayContains(s) || s._endsWith("theses"))
      return (cut(s, "es") + "is");

    // -us to -i
    if (categoryUS_I._arrayContains(s))
      return (cut(s, "i") + "us");

    //Wrong plural
    if (s._endsWith("uses") && (categoryUS_I._arrayContains(cut(s, "uses") + "i") || s === ("genuses") || s === ("corpuses")))
      return (cut(s, "es"));

    // -ex to -ices
    if (categoryEX_ICES._arrayContains(s))
      return (cut(s, "ices") + "ex");

    // Words that do not inflect in the plural
    if (s._endsWith("ois") || s._endsWith("itis") || category00._arrayContains(s) || categoryICS._arrayContains(s))
      return (s);

    // -en to -ina
    // No other common words end in -ina
    if (s._endsWith("ina"))
      return (cut(s, "en"));

    // -a to -ae
    // No other common words end in -ae
    if (s._endsWith("ae"))
      return (cut(s, "e"));

    // -a to -ata
    // No other common words end in -ata
    if (s._endsWith("ata"))
      return (cut(s, "ta"));

    // trix to -trices
    // No common word ends with -trice(s)
    if (s._endsWith("trices"))
      return (cut(s, "trices") + "trix");

    // -us to -us
    //No other common word ends in -us, except for false plurals of French words
    //Catch words that are not latin or known to end in -u
    if (s._endsWith("us") && !s._endsWith("eaus") && !s._endsWith("ieus") && !noLatin(s) && !categoryU_US._arrayContains(s))
      return (s);

    // -tooth to -teeth
    // -goose to -geese
    // -foot to -feet
    // -zoon to -zoa
    //No other common words end with the indicated suffixes
    if (s._endsWith("teeth"))
      return (cut(s, "teeth") + "tooth");
    if (s._endsWith("geese"))
      return (cut(s, "geese") + "goose");
    if (s._endsWith("feet"))
      return (cut(s, "feet") + "foot");
    if (s._endsWith("zoa"))
      return (cut(s, "zoa") + "zoon");

    // -eau to -eaux
    //No other common words end in eaux
    if (s._endsWith("eaux"))
      return (cut(s, "x"));

    // -ieu to -ieux
    //No other common words end in ieux
    if (s._endsWith("ieux"))
      return (cut(s, "x"));

    // -nx to -nges
    // Pay attention not to kill words ending in -nge with plural -nges
    // Take only Greek words (works fine, only a handfull of exceptions)
    if (s._endsWith("nges") && greek(s))
      return (cut(s, "nges") + "nx");

    // -[sc]h to -[sc]hes
    //No other common word ends with "shes", "ches" or "she(s)"
    //Quite a lot end with "che(s)", filter them out
    if (s._endsWith("shes") || s._endsWith("ches") && !categoryCHE_CHES._arrayContains(s))
      return (cut(s, "es"));

    // -ss to -sses
    // No other common singular word ends with "sses"
    // Filter out those ending in "sse(s)"
    if (s._endsWith("sses") && !categorySSE_SSES._arrayContains(s) && !s._endsWith("mousses"))
      return (cut(s, "es"));

    // -x to -xes
    // No other common word ends with "xe(s)" except for "axe"
    if (s._endsWith("xes") && s !== "axes")
      return (cut(s, "es"));

    // -[nlw]ife to -[nlw]ives
    //No other common word ends with "[nlw]ive(s)" except for olive
    if (s._endsWith("nives") || s._endsWith("lives") && !s._endsWith("olives") || s._endsWith("wives"))
      return (cut(s, "ves") + "fe");

    // -[aeo]lf to -ves  exceptions: valve, solve
    // -[^d]eaf to -ves  exceptions: heave, weave
    // -arf to -ves      no exception
    if (s._endsWith("alves") && !s._endsWith("valves") || s._endsWith("olves") && !s._endsWith("solves") || s._endsWith("eaves") && !s._endsWith("heaves") && !s._endsWith("weaves") || s._endsWith("arves"))
      return (cut(s, "ves") + "f");

    // -y to -ies
    // -ies is very uncommon as a singular suffix
    // but -ie is quite common, filter them out
    if (s._endsWith("ies") && !categoryIE_IES._arrayContains(s))
      return (cut(s, "ies") + "y");

    // -o to -oes
    // Some words end with -oe, so don't kill the "e"
    if (s._endsWith("oes") && !categoryOE_OES._arrayContains(s))
      return (cut(s, "es"));

    // -s to -ses
    // -z to -zes
    // no words end with "-ses" or "-zes" in singular
    if (s._endsWith("ses") || s._endsWith("zes"))
      return (cut(s, "es"));

    // - to -s
    if (s._endsWith("s") && !s._endsWith("ss") && !s._endsWith("is"))
      return (cut(s, "s"));

    return (s);
  }

  return function(token) {

    return stem(token.toLowerCase());
  };

})();

Array.prototype._arrayContains = function(ele) {
  return (Array.prototype.indexOf(ele) > -1);
};

String.prototype._endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/*
 * Minimum-Edit-Distance (or Levenshtein distance) is a measure of the similarity
 * between two strings, the source string and the target string (t). The distance
 * is the number of deletions, insertions, or substitutions required to transform
 * the source into the target / avg_string_length<p>
 *
 * Adapted from Michael Gilleland's algorithm
 */
var MinEditDist = {

  _min3: function(a, b, c) {

    var min = a;
    if (b < min) min = b;
    if (c < min) min = c;
    return min;
  },

  /* Computes min-edit-distance between 2 string arrays where each array element either matches or does not */
  _computeRawArray: function(srcArr, trgArr) {

    //log((srcArr)+" "+(trgArr));

    var matrix = []; // matrix
    var sI; // ith element of s
    var tJ; // jth element of t
    var cost; // cost
    var i, j, sl, tl;

    // Step 1 ----------------------------------------------

    if (!srcArr.length) return trgArr.length;

    if (!trgArr.length) return srcArr.length;

    // Step 2 ----------------------------------------------

    for (i = 0, sl = srcArr.length; i <= sl; i++) {

      matrix[i] = [];
      matrix[i][0] = i;
    }

    for (j = 0, tl = trgArr.length; j <= tl; j++)
      matrix[0][j] = j;

    // Step 3 ----------------------------------------------

    for (i = 1, sl = srcArr.length; i <= sl; i++) {

      sI = srcArr[i - 1];

      // Step 4 --------------------------------------------

      for (j = 1, tl = trgArr.length; j <= tl; j++) {

        tJ = trgArr[j - 1];

        // Step 5 ------------------------------------------

        cost = (sI === tJ) ? 0 : 1;

        // Step 6 ------------------------------------------

        matrix[i][j] = this._min3(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost);
      }
    }

    // Step 7 ----------------------------------------------

    return matrix[srcArr.length][trgArr.length];
  },


  /*
   * Compute min-edit-distance between 2 strings (or 2 arrays)
   */
  computeRaw: function(source, target) {

    //log('computeRaw: '+arguments.length+ " "+Type.get(source));

    if (is(source, A)) return this._computeRawArray(source, target);

    if (!source.length && !target.length) return 0;

    var i, j, matrix = []; // matrix
    var cost; // cost
    var sI; // ith character of s
    var tJ; // jth character of t

    // Step 1 ----------------------------------------------

    var sourceLength = source.length;
    var targetLength = target.length;

    if (!sourceLength) return targetLength;

    if (!targetLength) return sourceLength;

    // Step 2 ----------------------------------------------

    for (i = 0; i <= sourceLength; i++) {
      matrix[i] = [];
      matrix[i][0] = i;
    }

    for (j = 0; j <= targetLength; j++)
      matrix[0][j] = j;

    // Step 3 ----------------------------------------------

    for (i = 1; i <= sourceLength; i++) {
      sI = source.charAt(i - 1);

      // Step 4 --------------------------------------------

      for (j = 1; j <= targetLength; j++) {
        tJ = target.charAt(j - 1);

        // Step 5 ------------------------------------------

        cost = (sI == tJ) ? 0 : 1;

        // Step 6 ------------------------------------------
        matrix[i][j] = this._min3(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost);
      }
    }

    // Step 7 ----------------------------------------------

    return matrix[sourceLength][targetLength];

  },

  /*
   * Compute min-edit-distance between 2 strings (or 2 arrays of strings)
   * divided by the max of their lengths.
   */
  computeAdjusted: function(source, target) {

    var st = get(source), tt = get(source);

    if (st === tt) {
      if (tt === S) {
        if (!source.length && !target.length) return 0;
        //log(this.computeRaw(source, target)+'/'+(source.length + target.length));
        return this.computeRaw(source, target) / Math.max(source.length, target.length);
      } else if (tt === A) {
        if (!source.length && !target.length) return 0;
        //log(_computeRawArray(source, target)+'/'+(source.length + target.length));
        return this._computeRawArray(source, target) / Math.max(source.length, target.length);
      }
    }
    err('Unexpected args: ' + source + "/" + target);
  }
};

////////////////////////////////////////////////////////////////
//////// Concorder
////////////////////////////////////////////////////////////////

var Concorder = makeClass();

Concorder.prototype = {

  init: function(text, options) {

    this.model = null;
    this.wordsToIgnore = [];
    this.ignoreCase = false;
    this.ignoreStopWords = false;
    this.ignorePunctuation = false;

    if (options) {
      options.ignoreCase && (this.ignoreCase = true);
      options.ignoreStopWords && (this.ignoreStopWords = true);
      options.ignorePunctuation && (this.ignorePunctuation = true);
      options.wordsToIgnore && (this.wordsToIgnore = options.wordsToIgnore);
    }

    if (this.ignoreStopWords)
      this.wordsToIgnore = this.wordsToIgnore.concat(RiTa.STOP_WORDS);

    this.words = is(text, A) ? text : RiTa.tokenize(text);
  },

  count: function(word) {

    var value = this.lookup(word);
    return value === null ? 0 : value.count;
  },

  concordance: function() {

    if (!this.model) this.build();

    var result = {};
    for (var name in this.model)
      result[name] = this.model[name].indexes.length;

    // TODO: need to sort by value here
    return result;
  },

  kwic: function(word, numWords) {

    var value = this.lookup(word), result = [];
    if (value) {
      var idxs = value.indexes;
      for (var i = 0; i < idxs.length; i++) {
          var sub = this.words.slice(Math.max(0,idxs[i] - numWords),
            Math.min(this.words.length, idxs[i] + numWords+1));
  	      result[i] = RiTa.untokenize(sub);
      }
    }
    return result;
  },

  /////////////////// helpers ////////////////////////////

  build: function() {

    if (!this.words) throw Error('No text in model');

    this.model = {};
    var ts = +new Date();
    for (var j = 0; j < this.words.length; j++) {

      var word = this.words[j];
      if (this.ignorable(word)) continue;
      var lookup = this.lookup(word);

      // The typeof check below fixes a strange bug in Firefox: #XYZ
      // where the string 'watch' comes back from lookup as a function
      // TODO: resolve in a better way
      if (!lookup || typeof lookup !== 'object') {

         lookup = { word: word, key: this.compareKey(word), indexes: [] };
         this.model[lookup.key] = lookup;
      }
      lookup.indexes.push(j);
    }
  },

  ignorable: function(key) {

    if (this.ignorePunctuation && RiTa.isPunctuation(key))
      return true;

    for (var i = 0; i < this.wordsToIgnore.length; i++) {
      var word = this.wordsToIgnore[i];
      if ((this.ignoreCase && key.toUpperCase() === word.toUpperCase()) || key===word)
          return true;
    }
    return false;
  },

  compareKey: function(word) {
    return this.ignoreCase ? word.toLowerCase() : word;
  },

  lookup: function(word) {
    var key = this.compareKey(word);
    if (!this.model) this.build();
    return this.model[key];
  }
};

//////////////////////////////////////////////////////////////////
//////// RE
////////////////////////////////////////////////////////////////

var RE = makeClass();

RE.prototype = {

  init: function(regex, offset, suffix) {
    this.regex = new RegExp(regex);
    this.offset = offset;
    this.suffix = suffix || '';
  },

  applies: function(word) {
    return this.regex.test(trim(word));
  },

  fire: function(word) {
    return this.truncate(trim(word)) + this.suffix;
  },

  analyze: function(word) {
    return ((this.suffix != E) && endsWith(word, this.suffix)) ? true : false;
  },

  truncate: function(word) {
    return (this.offset === 0) ? word : word.substr(0, word.length - this.offset);
  }
};

////////////////////////////////// End Classes ///////////////////////////////////

var QUESTION_STARTS = ["Was", "What", "When", "Where", "How", "Which", "If", "Who", "Is", "Could", "Might", "Will", "Does", "Why", "Are"];

var W_QUESTION_STARTS = ["Was", "What", "When", "Where", "How", "Which", "Why", "Who", "Will"];

var PUNCTUATION_CLASS = /[�`~\"\/'_\-[\]{}()*+!?%&.,\\^$|#@<>|+=;:]/g; // TODO: add smart-quotes

var ONLY_PUNCT = /^[^0-9A-Za-z\s]*$/,
  DEFAULT_PLURAL_RULE = RE("^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$", 0, "s"),
  ALL_PUNCT = /^[-[\]{}()*+!?%&.,\\^$|#@<>|+=;:]+$/g;

var NULL_PLURALS = RE( // these don't change for plural/singular
  "^(bantu|bengalese|bengali|beninese|boche|bonsai|digitalis|mess|" + "burmese|chinese|colossus|congolese|discus|emphasis|gabonese|guyanese|japanese|javanese|" + "lebanese|maltese|olympics|portuguese|senegalese|siamese|singhalese|innings|" + "sinhalese|sioux|sudanese|swiss|taiwanese|togolese|vietnamese|aircraft|" + "anopheles|apparatus|asparagus|barracks|bellows|bison|bluefish|bob|bourgeois|" + "bream|brill|butterfingers|cargo|carp|catfish|chassis|clothes|chub|cod|codfish|" + "coley|contretemps|corps|crawfish|crayfish|crossroads|cuttlefish|dace|deer|dice|" + "dogfish|doings|dory|downstairs|eldest|earnings|economics|electronics|finnan|" + "firstborn|fish|flatfish|flounder|fowl|fry|fries|works|globefish|goldfish|golf|" + "grand|grief|gudgeon|gulden|haddock|hake|halibut|headquarters|herring|hertz|horsepower|" + "goods|hovercraft|hundredweight|ironworks|jackanapes|kilohertz|kurus|kwacha|ling|lungfish|" + "mackerel|means|megahertz|moorfowl|moorgame|mullet|nepalese|offspring|pampas|parr|pants|" + "patois|pekinese|penn'orth|perch|pickerel|pike|pince-nez|plaice|precis|quid|rand|" + "rendezvous|revers|roach|roux|salmon|samurai|series|seychelles|seychellois|shad|" + "sheep|shellfish|smelt|spacecraft|species|starfish|stockfish|sunfish|superficies|" + "sweepstakes|swordfish|tench|tennis|[a-z]+osis|[a-z]+itis|[a-z]+ness|" + "tobacco|tope|triceps|trout|tuna|tunafish|tunny|turbot|trousers|" + "undersigned|veg|waterfowl|waterworks|waxworks|whiting|wildfowl|woodworm|" + "yen|aries|pisces|forceps|lieder|jeans|physics|mathematics|news|odds|politics|remains|" + "surroundings|thanks|statistics|goods|aids|wildlife)$", 0);

var SINGULAR_RULES = [
  NULL_PLURALS,
  RE("^(oxen|buses)$", 2),
  RE("^(toes|taxis)$", 1),
  RE("^series$", 0),
  RE("(men|women)$", 2, "an"),
  RE("^[lm]ice$", 3, "ouse"),
  RE("^children", 3),
  RE("^(appendices|indices|matrices)", 3, "x"),
  RE("^(stimuli|alumni)$", 1, "us"),
  RE("^(data)$", 1, "um"),
  RE("^(memoranda|bacteria|curricula|minima|" + "maxima|referenda|spectra|phenomena|criteria)$", 1, "um"),
  RE("monies", 3, "ey"),
  RE("people", 4, "rson"),
  RE("^meninges|phalanges$", 3, "x"),
  RE("schemata$", 2, "s"),
  RE("^corpora$", 3, "us"),
  RE("^(curi|formul|vertebr|larv|uln|alumn|signor|alg)ae$", 1),
  RE("^apices|cortices$", 4, "ex"),
  RE("^teeth$", 4, "ooth"),
  RE("^feet$", 3, "oot"),
  RE("femora", 3, "ur"),
  RE("geese", 4, "oose"),
  RE("crises", 2, "is"),
  RE("(human|german|roman)$", 0, "s")
];

var C = "[bcdfghjklmnpqrstvwxyz]",
  VL = "[lraeiou]";

var PLURAL_RULES = [
    NULL_PLURALS,
    RE("^(piano|photo|solo|ego|tobacco|cargo|golf|grief)$", 0, "s"),
    RE("^(wildlife)$", 0, "s"),
    RE(C + "o$", 0, "es"),
    RE(C + "y$", 1, "ies"),
    RE("^ox$", 0, "en"),
    RE("^(stimulus|alumnus)$", 2, "i"),
    RE("^corpus$", 2, "ora"),
    RE("(xis|sis)$", 2, "es"),
    RE("([zsx]|ch|sh)$", 0, "es"),
    RE(VL + "fe$", 2, "ves"),
    RE(VL + "f$", 1, "ves"),
    RE("(eu|eau)$", 0, "x"),

    RE("(man|woman)$", 2, "en"),
    RE("money$", 2, "ies"),
    RE("person$", 4, "ople"),
    RE("motif$", 0, "s"),
    RE("^meninx|phalanx$", 1, "ges"),

    RE("schema$", 0, "ta"),
    RE("^bus$", 0, "ses"),
    RE("child$", 0, "ren"),
    RE("^(curi|formul|vertebr|larv|uln|alumn|signor|alg)a$", 0, "e"),
    RE("^(maharaj|raj|myn|mull)a$", 0, "hs"),
    RE("^aide-de-camp$", 8, "s-de-camp"),
    RE("^apex|cortex$", 2, "ices"),
    RE("^weltanschauung$", 0, "en"),
    RE("^lied$", 0, "er"),
    RE("^tooth$", 4, "eeth"),
    RE("^[lm]ouse$", 4, "ice"),
    RE("^foot$", 3, "eet"),
    RE("femur", 2, "ora"),
    RE("goose", 4, "eese"),
    RE("(human|german|roman)$", 0, "s"),
    RE("^(monarch|loch|stomach)$", 0, "s"),
    RE("^(taxi|chief|proof|ref|relief|roof|belief)$", 0, "s"),
    RE("^(co|no)$", 0, "'s"),
    RE("^blond$", 0, "es"),

    // Latin stems
    RE("^(memorandum|bacterium|curriculum|minimum|" + "maximum|referendum|spectrum|phenomenon|criterion)$", 2, "a"),
    RE("^(appendix|index|matrix)", 2, "ices")
  ],

  ANY_STEM = "^((\\w+)(-\\w+)*)(\\s((\\w+)(-\\w+)*))*$",
  CONS = "[bcdfghjklmnpqrstvwxyz]",
  VERBAL_PREFIX = "((be|with|pre|un|over|re|mis|under|out|up|fore|for|counter|co|sub)(-?))",
  AUXILIARIES = ["do", "have", "be"],
  MODALS = ["shall", "would", "may", "might", "ought", "should"],
  SYMBOLS = ["!", "?", "$", "%", "*", "+", "-", "="],

  ING_FORM_RULES = [
    RE(CONS + "ie$", 2, "ying", 1),
    RE("[^ie]e$", 1, "ing", 1),
    RE("^bog-down$", 5, "ging-down", 0),
    RE("^chivy$", 1, "vying", 0),
    RE("^trek$", 1, "cking", 0),
    RE("^bring$", 0, "ing", 0),
    RE("^be$", 0, "ing", 0),
    RE("^age$", 1, "ing", 0),
    RE("(ibe)$", 1, "ing", 0)
  ],

  PAST_PARTICIPLE_RULES = [

    RE(CONS + "y$", 1, "ied", 1),
    RE("^" + VERBAL_PREFIX + "?(bring)$", 3, "ought", 0),
    RE("^" + VERBAL_PREFIX + "?(take|rise|strew|blow|draw|drive|know|give|" + "arise|gnaw|grave|grow|hew|know|mow|see|sew|throw|prove|saw|quartersaw|" + "partake|sake|shake|shew|show|shrive|sightsee|strew|strive)$",
      0, "n", 0),
    RE("^" + VERBAL_PREFIX + "?[gd]o$", 0, "ne", 1),
    RE("^(beat|eat|be|fall)$", 0, "en", 0),
    RE("^(have)$", 2, "d", 0),
    RE("^" + VERBAL_PREFIX + "?bid$", 0, "den", 0),
    RE("^" + VERBAL_PREFIX + "?[lps]ay$", 1, "id", 1),
    RE("^behave$", 0, "d", 0),
    RE("^" + VERBAL_PREFIX + "?have$", 2, "d", 1),
    RE("(sink|slink|drink|shrink|stink)$", 3, "unk", 0),
    RE("(([sfc][twlp]?r?|w?r)ing|hang)$", 3, "ung", 0),
    RE("^" + VERBAL_PREFIX + "?(shear|swear|bear|wear|tear)$", 3, "orn", 0),
    RE("^" + VERBAL_PREFIX + "?(bend|spend|send|lend)$", 1, "t", 0),
    RE("^" + VERBAL_PREFIX + "?(weep|sleep|sweep|creep|keep$)$", 2, "pt", 0),
    RE("^" + VERBAL_PREFIX + "?(sell|tell)$", 3, "old", 0),
    RE("^(outfight|beseech)$", 4, "ought", 0),
    RE("^bethink$", 3, "ought", 0),
    RE("^buy$", 2, "ought", 0),
    RE("^aby$", 1, "ought", 0),
    RE("^tarmac", 0, "ked", 0),
    RE("^abide$", 3, "ode", 0),
    RE("^" + VERBAL_PREFIX + "?(speak|(a?)wake|break)$", 3, "oken", 0),
    RE("^backbite$", 1, "ten", 0),
    RE("^backslide$", 1, "den", 0),
    RE("^become$", 3, "ame", 0),
    RE("^begird$", 3, "irt", 0),
    RE("^outlie$", 2, "ay", 0),
    RE("^rebind$", 3, "ound", 0),
    RE("^relay$", 2, "aid", 0),
    RE("^shit$", 3, "hat", 0),
    RE("^bereave$", 4, "eft", 0),
    RE("^foreswear$", 3, "ore", 0),
    RE("^overfly$", 1, "own", 0),
    RE("^beget$", 2, "otten", 0),
    RE("^begin$", 3, "gun", 0),
    RE("^bestride$", 1, "den", 0),
    RE("^bite$", 1, "ten", 0),
    RE("^bleed$", 4, "led", 0),
    RE("^bog-down$", 5, "ged-down", 0),
    RE("^bind$", 3, "ound", 0),
    RE("^(.*)feed$", 4, "fed", 0),
    RE("^breed$", 4, "red", 0),
    RE("^brei", 0, "d", 0),
    RE("^bring$", 3, "ought", 0),
    RE("^build$", 1, "t", 0),
    RE("^come", 0),
    RE("^catch$", 3, "ught", 0),
    RE("^chivy$", 1, "vied", 0),
    RE("^choose$", 3, "sen", 0),
    RE("^cleave$", 4, "oven", 0),
    RE("^crossbreed$", 4, "red", 0),
    RE("^deal", 0, "t", 0),
    RE("^dow$", 1, "ught", 0),
    RE("^dream", 0, "t", 0),
    RE("^dig$", 3, "dug", 0),
    RE("^dwell$", 2, "lt", 0),
    RE("^enwind$", 3, "ound", 0),
    RE("^feel$", 3, "elt", 0),
    RE("^flee$", 2, "ed", 0),
    RE("^floodlight$", 5, "lit", 0),
    RE("^fly$", 1, "own", 0),
    RE("^forbear$", 3, "orne", 0),
    RE("^forerun$", 3, "ran", 0),
    RE("^forget$", 2, "otten", 0),
    RE("^fight$", 4, "ought", 0),
    RE("^find$", 3, "ound", 0),
    RE("^freeze$", 4, "ozen", 0),
    RE("^gainsay$", 2, "aid", 0),
    RE("^gin$", 3, "gan", 0),
    RE("^gen-up$", 3, "ned-up", 0),
    RE("^ghostwrite$", 1, "ten", 0),
    RE("^get$", 2, "otten", 0),
    RE("^grind$", 3, "ound", 0),
    RE("^hacksaw", 0, "n", 0),
    RE("^hear", 0, "d", 0),
    RE("^hold$", 3, "eld", 0),
    RE("^hide$", 1, "den", 0),
    RE("^honey$", 2, "ied", 0),
    RE("^inbreed$", 4, "red", 0),
    RE("^indwell$", 3, "elt", 0),
    RE("^interbreed$", 4, "red", 0),
    RE("^interweave$", 4, "oven", 0),
    RE("^inweave$", 4, "oven", 0),
    RE("^ken$", 2, "ent", 0),
    RE("^kneel$", 3, "elt", 0),
    RE("^lie$", 2, "ain", 0),
    RE("^leap$", 0, "t", 0),
    RE("^learn$", 0, "t", 0),
    RE("^lead$", 4, "led", 0),
    RE("^leave$", 4, "eft", 0),
    RE("^light$", 5, "lit", 0),
    RE("^lose$", 3, "ost", 0),
    RE("^make$", 3, "ade", 0),
    RE("^mean", 0, "t", 0),
    RE("^meet$", 4, "met", 0),
    RE("^misbecome$", 3, "ame", 0),
    RE("^misdeal$", 2, "alt", 0),
    RE("^mishear$", 1, "d", 0),
    RE("^mislead$", 4, "led", 0),
    RE("^misunderstand$", 3, "ood", 0),
    RE("^outbreed$", 4, "red", 0),
    RE("^outrun$", 3, "ran", 0),
    RE("^outride$", 1, "den", 0),
    RE("^outshine$", 3, "one", 0),
    RE("^outshoot$", 4, "hot", 0),
    RE("^outstand$", 3, "ood", 0),
    RE("^outthink$", 3, "ought", 0),
    RE("^outgo$", 2, "went", 0),
    RE("^overbear$", 3, "orne", 0),
    RE("^overbuild$", 3, "ilt", 0),
    RE("^overcome$", 3, "ame", 0),
    RE("^overfly$", 2, "lew", 0),
    RE("^overhear$", 2, "ard", 0),
    RE("^overlie$", 2, "ain", 0),
    RE("^overrun$", 3, "ran", 0),
    RE("^override$", 1, "den", 0),
    RE("^overshoot$", 4, "hot", 0),
    RE("^overwind$", 3, "ound", 0),
    RE("^overwrite$", 1, "ten", 0),
    RE("^plead$", 2, "d", 0),
    //RE("^run$", 3, "ran", 0), //DH
    //RE("^rerun$", 3, "run", 0),
    RE("^rebuild$", 3, "ilt", 0),
    RE("^red$", 3, "red", 0),
    RE("^redo$", 1, "one", 0),
    RE("^remake$", 3, "ade", 0),
    RE("^resit$", 3, "sat", 0),
    RE("^rethink$", 3, "ought", 0),
    RE("^rewind$", 3, "ound", 0),
    RE("^rewrite$", 1, "ten", 0),
    RE("^ride$", 1, "den", 0),
    RE("^reeve$", 4, "ove", 0),
    RE("^sit$", 3, "sat", 0),
    RE("^shoe$", 3, "hod", 0),
    RE("^shine$", 3, "one", 0),
    RE("^shoot$", 4, "hot", 0),
    RE("^ski$", 1, "i'd", 0),
    RE("^slide$", 1, "den", 0),
    RE("^smite$", 1, "ten", 0),
    RE("^seek$", 3, "ought", 0),
    RE("^spit$", 3, "pat", 0),
    RE("^speed$", 4, "ped", 0),
    RE("^spellbind$", 3, "ound", 0),
    RE("^spoil$", 2, "ilt", 0),
    RE("^spotlight$", 5, "lit", 0),
    RE("^spin$", 3, "pun", 0),
    RE("^steal$", 3, "olen", 0),
    RE("^stand$", 3, "ood", 0),
    RE("^stave$", 3, "ove", 0),
    RE("^stride$", 1, "den", 0),
    RE("^strike$", 3, "uck", 0),
    RE("^stick$", 3, "uck", 0),
    RE("^swell$", 3, "ollen", 0),
    RE("^swim$", 3, "wum", 0),
    RE("^teach$", 4, "aught", 0),
    RE("^think$", 3, "ought", 0),
    RE("^tread$", 3, "odden", 0),
    RE("^typewrite$", 1, "ten", 0),
    RE("^unbind$", 3, "ound", 0),
    RE("^underbuy$", 2, "ought", 0),
    RE("^undergird$", 3, "irt", 0),
    RE("^undergo$", 1, "one", 0),
    RE("^underlie$", 2, "ain", 0),
    RE("^undershoot$", 4, "hot", 0),
    RE("^understand$", 3, "ood", 0),
    RE("^unfreeze$", 4, "ozen", 0),
    RE("^unlearn", 0, "t", 0),
    RE("^unmake$", 3, "ade", 0),
    RE("^unreeve$", 4, "ove", 0),
    RE("^unstick$", 3, "uck", 0),
    RE("^unteach$", 4, "aught", 0),
    RE("^unthink$", 3, "ought", 0),
    RE("^untread$", 3, "odden", 0),
    RE("^unwind$", 3, "ound", 0),
    RE("^upbuild$", 1, "t", 0),
    RE("^uphold$", 3, "eld", 0),
    RE("^upheave$", 4, "ove", 0),
    RE("^waylay$", 2, "ain", 0),
    RE("^whipsaw$", 2, "awn", 0),
    RE("^withhold$", 3, "eld", 0),
    RE("^withstand$", 3, "ood", 0),
    RE("^win$", 3, "won", 0),
    RE("^wind$", 3, "ound", 0),
    RE("^weave$", 4, "oven", 0),
    RE("^write$", 1, "ten", 0),
    RE("^trek$", 1, "cked", 0),
    RE("^ko$", 1, "o'd", 0),
    RE("^win$", 2, "on", 0),

    RE("e$", 0, "d", 1),

    // Null past forms
    RE("^" + VERBAL_PREFIX + "?(cast|thrust|typeset|cut|bid|upset|wet|bet|cut|hit|hurt|inset|let|cost|burst|beat|beset|set|upset|hit|offset|put|quit|" + "wed|typeset|wed|spread|split|slit|read|run|rerun|shut|shed)$", 0)
  ],

  PAST_TENSE_RULES = [
    RE("^(reduce)$", 0, "d", 0),
    RE("e$", 0, "d", 1),
    RE("^" + VERBAL_PREFIX + "?[pls]ay$", 1, "id", 1),
    RE(CONS + "y$", 1, "ied", 1),
    RE("^(fling|cling|hang)$", 3, "ung", 0),
    RE("(([sfc][twlp]?r?|w?r)ing)$", 3, "ang", 1),
    RE("^" + VERBAL_PREFIX + "?(bend|spend|send|lend|spend)$", 1, "t", 0),
    RE("^" + VERBAL_PREFIX + "?lie$", 2, "ay", 0),
    RE("^" + VERBAL_PREFIX + "?(weep|sleep|sweep|creep|keep)$", 2, "pt",
      0),
    RE("^" + VERBAL_PREFIX + "?(sell|tell)$", 3, "old", 0),
    RE("^" + VERBAL_PREFIX + "?do$", 1, "id", 0),
    RE("^" + VERBAL_PREFIX + "?dig$", 2, "ug", 0),
    RE("^behave$", 0, "d", 0),
    RE("^(have)$", 2, "d", 0),
    RE("(sink|drink)$", 3, "ank", 0),
    RE("^swing$", 3, "ung", 0),
    RE("^be$", 2, "was", 0),
    RE("^outfight$", 4, "ought", 0),
    RE("^tarmac", 0, "ked", 0),
    RE("^abide$", 3, "ode", 0),
    RE("^aby$", 1, "ought", 0),
    RE("^become$", 3, "ame", 0),
    RE("^begird$", 3, "irt", 0),
    RE("^outlie$", 2, "ay", 0),
    RE("^rebind$", 3, "ound", 0),
    RE("^shit$", 3, "hat", 0),
    RE("^bereave$", 4, "eft", 0),
    RE("^foreswear$", 3, "ore", 0),
    RE("^bename$", 3, "empt", 0),
    RE("^beseech$", 4, "ought", 0),
    RE("^bethink$", 3, "ought", 0),
    RE("^bleed$", 4, "led", 0),
    RE("^bog-down$", 5, "ged-down", 0),
    RE("^buy$", 2, "ought", 0),
    RE("^bind$", 3, "ound", 0),
    RE("^(.*)feed$", 4, "fed", 0),
    RE("^breed$", 4, "red", 0),
    RE("^brei$", 2, "eid", 0),
    RE("^bring$", 3, "ought", 0),
    RE("^build$", 3, "ilt", 0),
    RE("^come$", 3, "ame", 0),
    RE("^catch$", 3, "ught", 0),
    RE("^clothe$", 5, "lad", 0),
    RE("^crossbreed$", 4, "red", 0),
    RE("^deal$", 2, "alt", 0),
    RE("^dow$", 1, "ught", 0),
    RE("^dream$", 2, "amt", 0),
    RE("^dwell$", 3, "elt", 0),
    RE("^enwind$", 3, "ound", 0),
    RE("^feel$", 3, "elt", 0),
    RE("^flee$", 3, "led", 0),
    RE("^floodlight$", 5, "lit", 0),
    RE("^arise$", 3, "ose", 0),
    RE("^eat$", 3, "ate", 0),
    RE("^backbite$", 4, "bit", 0),
    RE("^backslide$", 4, "lid", 0),
    RE("^befall$", 3, "ell", 0),
    RE("^begin$", 3, "gan", 0),
    RE("^beget$", 3, "got", 0),
    RE("^behold$", 3, "eld", 0),
    RE("^bespeak$", 3, "oke", 0),
    RE("^bestride$", 3, "ode", 0),
    RE("^betake$", 3, "ook", 0),
    RE("^bite$", 4, "bit", 0),
    RE("^blow$", 3, "lew", 0),
    RE("^bear$", 3, "ore", 0),
    RE("^break$", 3, "oke", 0),
    RE("^choose$", 4, "ose", 0),
    RE("^cleave$", 4, "ove", 0),
    RE("^countersink$", 3, "ank", 0),
    RE("^drink$", 3, "ank", 0),
    RE("^draw$", 3, "rew", 0),
    RE("^drive$", 3, "ove", 0),
    RE("^fall$", 3, "ell", 0),
    RE("^fly$", 2, "lew", 0),
    RE("^flyblow$", 3, "lew", 0),
    RE("^forbid$", 2, "ade", 0),
    RE("^forbear$", 3, "ore", 0),
    RE("^foreknow$", 3, "new", 0),
    RE("^foresee$", 3, "saw", 0),
    RE("^forespeak$", 3, "oke", 0),
    RE("^forego$", 2, "went", 0),
    RE("^forgive$", 3, "ave", 0),
    RE("^forget$", 3, "got", 0),
    RE("^forsake$", 3, "ook", 0),
    RE("^forspeak$", 3, "oke", 0),
    RE("^forswear$", 3, "ore", 0),
    RE("^forgo$", 2, "went", 0),
    RE("^fight$", 4, "ought", 0),
    RE("^find$", 3, "ound", 0),
    RE("^freeze$", 4, "oze", 0),
    RE("^give$", 3, "ave", 0),
    RE("^geld$", 3, "elt", 0),
    RE("^gen-up$", 3, "ned-up", 0),
    RE("^ghostwrite$", 3, "ote", 0),
    RE("^get$", 3, "got", 0),
    RE("^grow$", 3, "rew", 0),
    RE("^grind$", 3, "ound", 0),
    RE("^hear$", 2, "ard", 0),
    RE("^hold$", 3, "eld", 0),
    RE("^hide$", 4, "hid", 0),
    RE("^honey$", 2, "ied", 0),
    RE("^inbreed$", 4, "red", 0),
    RE("^indwell$", 3, "elt", 0),
    RE("^interbreed$", 4, "red", 0),
    RE("^interweave$", 4, "ove", 0),
    RE("^inweave$", 4, "ove", 0),
    RE("^ken$", 2, "ent", 0),
    RE("^kneel$", 3, "elt", 0),
    RE("^^know$$", 3, "new", 0),
    RE("^leap$", 2, "apt", 0),
    RE("^learn$", 2, "rnt", 0),
    RE("^lead$", 4, "led", 0),
    RE("^leave$", 4, "eft", 0),
    RE("^light$", 5, "lit", 0),
    RE("^lose$", 3, "ost", 0),
    RE("^make$", 3, "ade", 0),
    RE("^mean$", 2, "ant", 0),
    RE("^meet$", 4, "met", 0),
    RE("^misbecome$", 3, "ame", 0),
    RE("^misdeal$", 2, "alt", 0),
    RE("^misgive$", 3, "ave", 0),
    RE("^mishear$", 2, "ard", 0),
    RE("^mislead$", 4, "led", 0),
    RE("^mistake$", 3, "ook", 0),
    RE("^misunderstand$", 3, "ood", 0),
    RE("^outbreed$", 4, "red", 0),
    RE("^outgrow$", 3, "rew", 0),
    RE("^outride$", 3, "ode", 0),
    RE("^outshine$", 3, "one", 0),
    RE("^outshoot$", 4, "hot", 0),
    RE("^outstand$", 3, "ood", 0),
    RE("^outthink$", 3, "ought", 0),
    RE("^outgo$", 2, "went", 0),
    RE("^outwear$", 3, "ore", 0),
    RE("^overblow$", 3, "lew", 0),
    RE("^overbear$", 3, "ore", 0),
    RE("^overbuild$", 3, "ilt", 0),
    RE("^overcome$", 3, "ame", 0),
    RE("^overdraw$", 3, "rew", 0),
    RE("^overdrive$", 3, "ove", 0),
    RE("^overfly$", 2, "lew", 0),
    RE("^overgrow$", 3, "rew", 0),
    RE("^overhear$", 2, "ard", 0),
    RE("^overpass$", 3, "ast", 0),
    RE("^override$", 3, "ode", 0),
    RE("^oversee$", 3, "saw", 0),
    RE("^overshoot$", 4, "hot", 0),
    RE("^overthrow$", 3, "rew", 0),
    RE("^overtake$", 3, "ook", 0),
    RE("^overwind$", 3, "ound", 0),
    RE("^overwrite$", 3, "ote", 0),
    RE("^partake$", 3, "ook", 0),
    RE("^" + VERBAL_PREFIX + "?run$", 2, "an", 0),
    RE("^ring$", 3, "ang", 0),
    RE("^rebuild$", 3, "ilt", 0),
    RE("^red", 0),
    RE("^reave$", 4, "eft", 0),
    RE("^remake$", 3, "ade", 0),
    RE("^resit$", 3, "sat", 0),
    RE("^rethink$", 3, "ought", 0),
    RE("^retake$", 3, "ook", 0),
    RE("^rewind$", 3, "ound", 0),
    RE("^rewrite$", 3, "ote", 0),
    RE("^ride$", 3, "ode", 0),
    RE("^rise$", 3, "ose", 0),
    RE("^reeve$", 4, "ove", 0),
    RE("^sing$", 3, "ang", 0),
    RE("^sink$", 3, "ank", 0),
    RE("^sit$", 3, "sat", 0),
    RE("^see$", 3, "saw", 0),
    RE("^shoe$", 3, "hod", 0),
    RE("^shine$", 3, "one", 0),
    RE("^shake$", 3, "ook", 0),
    RE("^shoot$", 4, "hot", 0),
    RE("^shrink$", 3, "ank", 0),
    RE("^shrive$", 3, "ove", 0),
    RE("^sightsee$", 3, "saw", 0),
    RE("^ski$", 1, "i'd", 0),
    RE("^skydive$", 3, "ove", 0),
    RE("^slay$", 3, "lew", 0),
    RE("^slide$", 4, "lid", 0),
    RE("^slink$", 3, "unk", 0),
    RE("^smite$", 4, "mit", 0),
    RE("^seek$", 3, "ought", 0),
    RE("^spit$", 3, "pat", 0),
    RE("^speed$", 4, "ped", 0),
    RE("^spellbind$", 3, "ound", 0),
    RE("^spoil$", 2, "ilt", 0),
    RE("^speak$", 3, "oke", 0),
    RE("^spotlight$", 5, "lit", 0),
    RE("^spring$", 3, "ang", 0),
    RE("^spin$", 3, "pun", 0),
    RE("^stink$", 3, "ank", 0),
    RE("^steal$", 3, "ole", 0),
    RE("^stand$", 3, "ood", 0),
    RE("^stave$", 3, "ove", 0),
    RE("^stride$", 3, "ode", 0),
    RE("^strive$", 3, "ove", 0),
    RE("^strike$", 3, "uck", 0),
    RE("^stick$", 3, "uck", 0),
    RE("^swim$", 3, "wam", 0),
    RE("^swear$", 3, "ore", 0),
    RE("^teach$", 4, "aught", 0),
    RE("^think$", 3, "ought", 0),
    RE("^throw$", 3, "rew", 0),
    RE("^take$", 3, "ook", 0),
    RE("^tear$", 3, "ore", 0),
    RE("^transship$", 4, "hip", 0),
    RE("^tread$", 4, "rod", 0),
    RE("^typewrite$", 3, "ote", 0),
    RE("^unbind$", 3, "ound", 0),
    RE("^unclothe$", 5, "lad", 0),
    RE("^underbuy$", 2, "ought", 0),
    RE("^undergird$", 3, "irt", 0),
    RE("^undershoot$", 4, "hot", 0),
    RE("^understand$", 3, "ood", 0),
    RE("^undertake$", 3, "ook", 0),
    RE("^undergo$", 2, "went", 0),
    RE("^underwrite$", 3, "ote", 0),
    RE("^unfreeze$", 4, "oze", 0),
    RE("^unlearn$", 2, "rnt", 0),
    RE("^unmake$", 3, "ade", 0),
    RE("^unreeve$", 4, "ove", 0),
    RE("^unspeak$", 3, "oke", 0),
    RE("^unstick$", 3, "uck", 0),
    RE("^unswear$", 3, "ore", 0),
    RE("^unteach$", 4, "aught", 0),
    RE("^unthink$", 3, "ought", 0),
    RE("^untread$", 4, "rod", 0),
    RE("^unwind$", 3, "ound", 0),
    RE("^upbuild$", 3, "ilt", 0),
    RE("^uphold$", 3, "eld", 0),
    RE("^upheave$", 4, "ove", 0),
    RE("^uprise$", 3, "ose", 0),
    RE("^upspring$", 3, "ang", 0),
    RE("^go$", 2, "went", 0),
    RE("^wiredraw$", 3, "rew", 0),
    RE("^withdraw$", 3, "rew", 0),
    RE("^withhold$", 3, "eld", 0),
    RE("^withstand$", 3, "ood", 0),
    RE("^wake$", 3, "oke", 0),
    RE("^win$", 3, "won", 0),
    RE("^wear$", 3, "ore", 0),
    RE("^wind$", 3, "ound", 0),
    RE("^weave$", 4, "ove", 0),
    RE("^write$", 3, "ote", 0),
    RE("^trek$", 1, "cked", 0),
    RE("^ko$", 1, "o'd", 0),
    RE("^bid", 2, "ade", 0),
    RE("^win$", 2, "on", 0),
    RE("^swim", 2, "am", 0),

    // Null past forms
    RE("^" + VERBAL_PREFIX + "?(cast|thrust|typeset|cut|bid|upset|wet|bet|cut|hit|hurt|inset|" + "let|cost|burst|beat|beset|set|upset|offset|put|quit|wed|typeset|" + "wed|spread|split|slit|read|run|shut|shed|lay)$", 0)
  ],

  PRESENT_TENSE_RULES = [
    RE("^aby$", 0, "es", 0),
    RE("^bog-down$", 5, "s-down", 0),
    RE("^chivy$", 1, "vies", 0),
    RE("^gen-up$", 3, "s-up", 0),
    RE("^prologue$", 3, "gs", 0),
    RE("^picknic$", 0, "ks", 0),
    //RE("^swim$", 0, "s", 0),
    RE("^ko$", 0, "'s", 0),
    RE("[osz]$", 0, "es", 1),
    RE("^have$", 2, "s", 0),
    RE(CONS + "y$", 1, "ies", 1),
    RE("^be$", 2, "is"),
    RE("([zsx]|ch|sh)$", 0, "es", 1)
  ],

  VERB_CONS_DOUBLING = ["abat", "abet", "abhor", "abut", "accur", "acquit", "adlib",
    "admit", "aerobat", "aerosol", "agendaset", "allot", "alot", "anagram",
    "annul", "appal", "apparel", "armbar", "aver", "babysit", "airdrop", "appal",
    "blackleg", "bobsled", "bur", "chum", "confab", "counterplot", "curet", "dib",
    "backdrop", "backfil", "backflip", "backlog", "backpedal", "backslap",
    "backstab", "bag", "balfun", "ballot", "ban", "bar", "barbel", "bareleg",
    "barrel", "bat", "bayonet", "becom", "bed", "bedevil", "bedwet", "beenhop",
    "befit", "befog", "beg", "beget", "begin", "bejewel", "bemedal", "benefit",
    "benum", "beset", "besot", "bestir", "bet", "betassel", "bevel", "bewig",
    "bib", "bid", "billet", "bin", "bip", "bit", "bitmap", "blab", "blag", "blam",
    "blan", "blat", "bles", "blim", "blip", "blob", "bloodlet", "blot", "blub",
    "blur", "bob", "bodypop", "bog", "booby-trap", "boobytrap", "booksel",
    "bootleg", "bop", "bot", "bowel", "bracket", "brag", "brig", "brim", "bud",
    "buffet", "bug", "bullshit", "bum", "bun", "bus", "but", "cab", "cabal", "cam",
    "can", "cancel", "cap", "caracol", "caravan", "carburet", "carnap", "carol",
    "carpetbag", "castanet", "cat", "catcal", "catnap", "cavil", "chan", "chanel",
    "channel", "chap", "char", "chargecap", "chat", "chin", "chip", "chir",
    "chirrup", "chisel", "chop", "chug", "chur", "clam", "clap", "clearcut",
    "clip", "clodhop", "clog", "clop", "closet", "clot", "club", "co-occur",
    "co-program", "co-refer", "co-run", "co-star", "cob", "cobweb", "cod", "coif",
    "com", "combat", "comit", "commit", "compel", "con", "concur", "confer",
    "confiscat", "control", "cop", "coquet", "coral", "corbel", "corral", "cosset",
    "cotransmit", "councel", "council", "counsel", "court-martial", "crab", "cram",
    "crap", "crib", "crop", "crossleg", "cub", "cudgel", "cum", "cun", "cup",
    "cut", "dab", "dag", "dam", "dan", "dap", "daysit", "de-control", "de-gazet",
    "de-hul", "de-instal", "de-mob", "de-program", "de-rig", "de-skil", "deadpan",
    "debag", "debar", "log", "decommit", "decontrol", "defer", "defog", "deg",
    "degas", "deinstal", "demit", "demob", "demur", "den", "denet", "depig",
    "depip", "depit", "der", "deskil", "deter", "devil", "diagram", "dial", "dig",
    "dim", "din", "dip", "disbar", "disbud", "discomfit", "disembed", "disembowel",
    "dishevel", "disinter", "dispel", "disprefer", "distil", "dog", "dognap",
    "don", "doorstep", "dot", "dowel", "drag", "drat", "driftnet", "distil",
    "egotrip", "enrol", "enthral", "extol", "fulfil", "gaffe", "golliwog", "idyl",
    "inspan", "drip", "drivel", "drop", "drub", "drug", "drum", "dub", "duel",
    "dun", "dybbuk", "earwig", "eavesdrop", "ecolabel", "eitherspigot",
    "electroblot", "embed", "emit", "empanel", "enamel", "endlabel", "endtrim",
    "enrol", "enthral", "entrammel", "entrap", "enwrap", "equal", "equip", "estop",
    "exaggerat", "excel", "expel", "extol", "fag", "fan", "farewel", "fat",
    "featherbed", "feget", "fet", "fib", "fig", "fin", "fingerspel", "fingertip",
    "fit", "flab", "flag", "flap", "flip", "flit", "flog", "flop", "fob", "focus",
    "fog", "footbal", "footslog", "fop", "forbid", "forget", "format",
    "fortunetel", "fot", "foxtrot", "frag", "freefal", "fret", "frig", "frip",
    "frog", "frug", "fuel", "fufil", "fulfil", "fullyfit", "fun", "funnel", "fur",
    "furpul", "gab", "gad", "gag", "gam", "gambol", "gap", "garot", "garrot",
    "gas", "gat", "gel", "gen", "get", "giftwrap", "gig", "gimbal", "gin", "glam",
    "glenden", "glendin", "globetrot", "glug", "glut", "gob", "goldpan", "goostep",
    "gossip", "grab", "gravel", "grid", "grin", "grip", "grit", "groundhop",
    "grovel", "grub", "gum", "gun", "gunrun", "gut", "gyp", "haircut", "ham",
    "han", "handbag", "handicap", "handknit", "handset", "hap", "hareleg", "hat",
    "headbut", "hedgehop", "hem", "hen", "hiccup", "highwal", "hip", "hit",
    "hobnob", "hog", "hop", "horsewhip", "hostel", "hot", "hotdog", "hovel", "hug",
    "hum", "humbug", "hup", "hushkit", "hut", "illfit", "imbed", "immunblot",
    "immunoblot", "impannel", "impel", "imperil", "incur", "infer", "infil",
    "inflam", "initial", "input", "inset", "instil", "inter", "interbed",
    "intercrop", "intercut", "interfer", "instal", "instil", "intermit", "japan",
    "jug", "kris", "manumit", "mishit", "mousse", "mud", "interwar", "jab", "jag",
    "jam", "jar", "jawdrop", "jet", "jetlag", "jewel", "jib", "jig", "jitterbug",
    "job", "jog", "jog-trot", "jot", "jut", "ken", "kennel", "kid", "kidnap",
    "kip", "kissogram", "kit", "knap", "kneecap", "knit", "knob", "knot", "kor",
    "label", "lag", "lam", "lap", "lavel", "leafcut", "leapfrog", "leg", "lem",
    "lep", "let", "level", "libel", "lid", "lig", "lip", "lob", "log", "lok",
    "lollop", "longleg", "lop", "lowbal", "lug", "mackerel", "mahom", "man", "map",
    "mar", "marshal", "marvel", "mat", "matchwin", "metal", "micro-program",
    "microplan", "microprogram", "milksop", "mis-cal", "mis-club", "mis-spel",
    "miscal", "mishit", "mislabel", "mit", "mob", "mod", "model", "mohmam",
    "monogram", "mop", "mothbal", "mug", "multilevel", "mum", "nab", "nag", "nan",
    "nap", "net", "nightclub", "nightsit", "nip", "nod", "nonplus", "norkop",
    "nostril", "not", "nut", "nutmeg", "occur", "ocur", "offput", "offset", "omit",
    "ommit", "onlap", "out-general", "out-gun", "out-jab", "out-plan", "out-pol",
    "out-pul", "out-put", "out-run", "out-sel", "outbid", "outcrop", "outfit",
    "outgas", "outgun", "outhit", "outjab", "outpol", "output", "outrun",
    "outship", "outshop", "outsin", "outstrip", "outswel", "outspan", "overcrop",
    "pettifog", "photostat", "pouf", "preset", "prim", "pug", "ret", "rosin",
    "outwit", "over-commit", "over-control", "over-fil", "over-fit", "over-lap",
    "over-model", "over-pedal", "over-pet", "over-run", "over-sel", "over-step",
    "over-tip", "over-top", "overbid", "overcal", "overcommit", "overcontrol",
    "overcrap", "overdub", "overfil", "overhat", "overhit", "overlap", "overman",
    "overplot", "overrun", "overshop", "overstep", "overtip", "overtop", "overwet",
    "overwil", "pad", "paintbal", "pan", "panel", "paperclip", "par", "parallel",
    "parcel", "partiescal", "pat", "patrol", "pedal", "peewit", "peg", "pen",
    "pencil", "pep", "permit", "pet", "petal", "photoset", "phototypeset", "phut",
    "picket", "pig", "pilot", "pin", "pinbal", "pip", "pipefit", "pipet", "pit",
    "plan", "plit", "plod", "plop", "plot", "plug", "plumet", "plummet", "pod",
    "policyset", "polyfil", "ponytrek", "pop", "pot", "pram", "prebag",
    "predistil", "predril", "prefer", "prefil", "preinstal", "prep", "preplan",
    "preprogram", "prizewin", "prod", "profer", "prog", "program", "prop",
    "propel", "pub", "pummel", "pun", "pup", "pushfit", "put", "quarel", "quarrel",
    "quickskim", "quickstep", "quickwit", "quip", "quit", "quivertip", "quiz",
    "rabbit", "rabit", "radiolabel", "rag", "ram", "ramrod", "rap", "rat",
    "ratecap", "ravel", "re-admit", "re-cal", "re-cap", "re-channel", "re-dig",
    "re-dril", "re-emit", "re-fil", "re-fit", "re-flag", "re-format", "re-fret",
    "re-hab", "re-instal", "re-inter", "re-lap", "re-let", "re-map", "re-metal",
    "re-model", "re-pastel", "re-plan", "re-plot", "re-plug", "re-pot",
    "re-program", "re-refer", "re-rig", "re-rol", "re-run", "re-sel", "re-set",
    "re-skin", "re-stal", "re-submit", "re-tel", "re-top", "re-transmit",
    "re-trim", "re-wrap", "readmit", "reallot", "rebel", "rebid", "rebin", "rebut",
    "recap", "rechannel", "recommit", "recrop", "recur", "recut", "red", "redril",
    "refer", "refit", "reformat", "refret", "refuel", "reget", "regret", "reinter",
    "rejig", "rekit", "reknot", "relabel", "relet", "rem", "remap", "remetal",
    "remit", "remodel", "reoccur", "rep", "repel", "repin", "replan", "replot",
    "repol", "repot", "reprogram", "rerun", "reset", "resignal", "resit", "reskil",
    "resubmit", "retransfer", "retransmit", "retro-fit", "retrofit", "rev",
    "revel", "revet", "rewrap", "rib", "richochet", "ricochet", "rid", "rig",
    "rim", "ringlet", "rip", "rit", "rival", "rivet", "roadrun", "rob", "rocket",
    "rod", "roset", "rot", "rowel", "rub", "run", "runnel", "rut", "sab", "sad",
    "sag", "sandbag", "sap", "scab", "scalpel", "scam", "scan", "scar", "scat",
    "schlep", "scrag", "scram", "shall", "sled", "smut", "stet", "sulfuret",
    "trepan", "unrip", "unstop", "whir", "whop", "wig", "scrap", "scrat", "scrub",
    "scrum", "scud", "scum", "scur", "semi-control", "semi-skil", "semi-skim",
    "semiskil", "sentinel", "set", "shag", "sham", "shed", "shim", "shin", "ship",
    "shir", "shit", "shlap", "shop", "shopfit", "shortfal", "shot", "shovel",
    "shred", "shrinkwrap", "shrivel", "shrug", "shun", "shut", "side-step",
    "sideslip", "sidestep", "signal", "sin", "sinbin", "sip", "sit", "skid",
    "skim", "skin", "skip", "skir", "skrag", "slab", "slag", "slam", "slap",
    "slim", "slip", "slit", "slob", "slog", "slop", "slot", "slowclap", "slug",
    "slum", "slur", "smit", "snag", "snap", "snip", "snivel", "snog", "snorkel",
    "snowcem", "snub", "snug", "sob", "sod", "softpedal", "son", "sop", "spam",
    "span", "spar", "spat", "spiderweb", "spin", "spiral", "spit", "splat",
    "split", "spot", "sprag", "spraygun", "sprig", "springtip", "spud", "spur",
    "squat", "squirrel", "stab", "stag", "star", "stem", "sten", "stencil", "step",
    "stir", "stop", "storytel", "strap", "strim", "strip", "strop", "strug",
    "strum", "strut", "stub", "stud", "stun", "sub", "subcrop", "sublet", "submit",
    "subset", "suedetrim", "sum", "summit", "sun", "suntan", "sup", "super-chil",
    "superad", "swab", "swag", "swan", "swap", "swat", "swig", "swim", "swivel",
    "swot", "tab", "tag", "tan", "tansfer", "tap", "tar", "tassel", "tat", "tefer",
    "teleshop", "tendril", "terschel", "th'strip", "thermal", "thermostat", "thin",
    "throb", "thrum", "thud", "thug", "tightlip", "tin", "tinsel", "tip", "tittup",
    "toecap", "tog", "tom", "tomorrow", "top", "tot", "total", "towel", "traget",
    "trainspot", "tram", "trammel", "transfer", "tranship", "transit", "transmit",
    "transship", "trap", "travel", "trek", "trendset", "trim", "trip", "tripod",
    "trod", "trog", "trot", "trousseaushop", "trowel", "trup", "tub", "tug",
    "tunnel", "tup", "tut", "twat", "twig", "twin", "twit", "typeset", "tyset",
    "un-man", "unban", "unbar", "unbob", "uncap", "unclip", "uncompel", "undam",
    "under-bil", "under-cut", "under-fit", "under-pin", "under-skil", "underbid",
    "undercut", "underlet", "underman", "underpin", "unfit", "unfulfil", "unknot",
    "unlip", "unlywil", "unman", "unpad", "unpeg", "unpin", "unplug", "unravel",
    "unrol", "unscrol", "unsnap", "unstal", "unstep", "unstir", "untap", "unwrap",
    "unzip", "up", "upset", "upskil", "upwel", "ven", "verbal", "vet", "victual",
    "vignet", "wad", "wag", "wainscot", "wan", "war", "water-log", "waterfal",
    "waterfil", "waterlog", "weasel", "web", "wed", "wet", "wham", "whet", "whip",
    "whir", "whiteskin", "whiz", "whup", "wildcat", "win", "windmil", "wit",
    "woodchop", "woodcut", "wor", "worship", "wrap", "wiretap", "yen", "yak",
    "yap", "yarnspin", "yip", "yodel", "zag", "zap", "zig", "zig-zag", "zigzag",
    "zip", "ztrip", "hand-bag", "hocus", "hocus-pocus"
  ],

  PAST_PARTICIPLE_RULESET = {
    name: "PAST_PARTICIPLE",
    defaultRule: RE(ANY_STEM, 0, "ed", 2),
    rules: PAST_PARTICIPLE_RULES,
    doubling: true
  },

  PRESENT_PARTICIPLE_RULESET = {
    name: "ING_FORM",
    defaultRule: RE(ANY_STEM, 0, "ing", 2),
    rules: ING_FORM_RULES,
    doubling: true
  },

  PAST_TENSE_RULESET = {
    name: "PAST_TENSE",
    defaultRule: RE(ANY_STEM, 0, "ed", 2),
    rules: PAST_TENSE_RULES,
    doubling: true
  },

  PRESENT_TENSE_RULESET = {
    name: "PRESENT_TENSE",
    defaultRule: RE(ANY_STEM, 0, "s", 2),
    rules: PRESENT_TENSE_RULES,
    doubling: false
  };

// ///////////////////////////// End Functions ////////////////////////////////////

if (!RiTa.SILENT && console)
  console.log('[INFO] RiTaJS.version [' + RiTa.VERSION + ']');


/*jshint -W069 */

if (window) { // for browser

  window['RiTa'] = RiTa;
  window['RiString'] = RiString;
  window['RiGrammar'] = RiGrammar;
  window['RiMarkov'] = RiMarkov;
  window['RiWordNet'] = RiWordNet;
  window['RiLexicon'] = RiLexicon;
  window['RiTaEvent'] = RiTaEvent;

} else if (typeof module !== 'undefined') { // for node

  module.exports['RiTa'] = RiTa;
  module.exports['RiString'] = RiString;
  module.exports['RiGrammar'] = RiGrammar;
  module.exports['RiMarkov'] = RiMarkov;
  module.exports['RiWordNet'] = RiWordNet;
  module.exports['RiLexicon'] = RiLexicon;
  module.exports['RiTaEvent'] = RiTaEvent;
}

// if (typeof p5 !== 'undefined') {
//   p5.prototype.registerPreloadMethod('loadFrom', RiGrammar.prototype);
//   p5.prototype.registerPreloadMethod('loadFrom', RiMarkov.prototype);
// }

/*jshint +W069 */

})(typeof window !== 'undefined' ? window : null);
