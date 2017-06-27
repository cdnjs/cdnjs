/*!
 * Lunr - 0.1.1
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */
;

/**
 * Convinience method for instantiating and configuring a new Lunr index
 *
 * @param {Function} config - A function that will be run with a newly created Lunr.Index as its context.
 * @returns {Lunr.Index} a new Lunr Index instance.
 */
var Lunr = function (name, config) {
  var index = new Lunr.Index (name)
  config.call(index, index)
  return index
};

Lunr.version = "0.1.1"/*!
 * Lunr - utils
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

/**
 * A collection of utils that are used as part of the Lunr code base.
 */
Lunr.utils = {
  /**
   * ## Lunr.utils.uniq
   * Retuns an array with duplicate elements removed.
   *
   * @private
   * @params {Array} array - an array to remove duplicates from
   * @returns {Array} a copy of the input array with all duplicates removed.
   */
  uniq: function (array) {
    var out = []

    if (!array) return out

    for (var i=0; i < array.length; i++) {
      var elem = array[i]
      if (!~out.indexOf(elem)) out.push(elem)
    };

    return out
  },

  /**
   * ## Lunr.utils.intersect
   * Finds the intersect of the array with all other passed arrays.
   *
   * @private
   * @params {Array} array - an array to intersect with.
   * @params {Splat} any number of other arrays to intersect with array.
   * @returns {Array} a new array containing the intersection of all the input arrays
   */
  intersect: function (array) {
    var rest = Array.prototype.slice.call(arguments, 1),
        uniquedArr = this.uniq(array),
        len = uniquedArr.length,
        out = []

    for (var i=0; i < len; i++) {
      var elem = uniquedArr[i],
          inIntersect = true

      for (var j=0; j < rest.length; j++) {
        inIntersect = inIntersect && (~rest[j].indexOf(elem))
      };

      if (inIntersect) out.push(elem)
    };

    return out
  },

  /**
   * ## Lunr.utils.copy
   * Makes a copy of an object.
   *
   * @private
   * @params {Object} obj - the obj to copy.
   * @returns {Object} a copy of the input object.
   */
  copy: function (obj) {
    var out = {}
    for (var prop in obj) {
      if (!obj.hasOwnProperty(prop)) return
      out[prop] = obj[prop]
    }
    return out
  },

  /**
   * ## Lunr.utils.forEachKey
   * Iterates through the passed object, yeilding each key to the passed function. Takes an
   * optional context object which will be used as the context in the passed function.
   *
   * @private
   * @params {Object} obj - the obj to iterate through.
   * @params {Function} fn - the function to yield to for each key.
   * @params {Obj} ctx - an optional context object for fn.
   */
  forEachKey: function (obj, fn, ctx) {
    for (var prop in obj) {
      fn.call(ctx, prop)
    }
  },

  /**
   * ## Lunr.utils.mapKeys
   * Iterates through the passed object, yeilding each key to the passed function and returning
   * an array of the output of that function. Takes an optional context object which will be used
   * as the context in the passed function.
   *
   * @private
   * @params {Object} obj - the obj to iterate through.
   * @params {Function} fn - the function to yield to for each key.
   * @params {Obj} ctx - an optional context object for fn.
   * @returns {Array} the result of mapping each key through fn.
   */
  mapKeys: function (obj, fn, ctx) {
    var out = []
    this.forEachKey(obj, function (key) {
      out.push(fn.call(ctx, key))
    })

    return out
  },

  /**
   * ## Lunr.utils.map
   * A compatibility wrapper to allow the use of map in browsers which do not support
   * it natively.  If a native map is available this is used, otherwise a fallback is
   * used.
   *
   * @private
   * @params {Array} arr - the array to map through.
   * @params {Function} fn - the function to yield to for each key.
   * @params {Obj} ctx - an optional context object for fn.
   * @returns {Array} the result of mapping the array through fn.
   */
  map: function (arr, fn, ctx) {
    var out = [],
        len = arr.length

    for (var i=0; i < len; i++) {
      out.push(fn.call(ctx, arr[i], i, arr))
    };

    return out
  },

  /**
   * ## Lunr.utils.reduce
   * A compatibility wrapper to allow the use of reduce in browsers which do not support
   * it natively.  If a native reduce is available this is used, otherwise a fallback is
   * used.
   *
   * @private
   * @params {Array} arr - the array to map through.
   * @params {Function} fn - the function to yield to for each key.
   * @params {Obj} memo - the starting value of the memo.
   * @returns the result of reducing the array through fn.
   */
  reduce: function (arr, fn, memo) {
    var len = arr.length

    for (var i=0; i < len; i++) {
      memo = fn(memo, arr[i])
    };

    return memo
  },

  /**
   * ## Lunr.utils.forEach
   * A compatibility wrapper to allow the use of forEach in browsers which do not support
   * it natively.  If a native forEach is available this is used, otherwise a fallback is
   * used.
   *
   * @private
   * @params {Array} arr - the array to map through.
   * @params {Function} fn - the function to yield to for each key.
   * @params {Object} ctx - an optional context object for fn.
   */
  forEach: function (arr, fn, ctx) {
    var len = arr.length
    for (var i=0; i < len; i++) {
      fn.call(ctx, arr[i], i, arr)
    };
  }
};
/*!
 * Lunr - Index
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

Lunr.Index = (function () {

  /**
   * Lunr.Index provides the public api for the Lunr library.
   *
   * A Lunr.Index is returned from using the convinience wrapper `Lunr`.  It holds the configuration
   * regarding which fields from a document to index, and the weight to apply to those fields.  It also
   * manages the store for the index.
   *
   * @constructor
   * @param {String} name - the name of this search index.
   *
   */
  var Index = function (name) {
    this.name = name
    this.refName = "id"
    this.fields = {} // by default no fields will be indexed
    this.trie = new Lunr.Trie ()
  }

  /**
   * Adds objects to the search index.
   *
   * It will convert the passed JSON object and convert it into a Lunr.Document.
   * The words from the document will then be extracted and added to the index.
   *
   * @param {Object} obj the object to add to the index.
   * @see Lunr.Document
   */
  Index.prototype.add = function (obj) {
    var doc = new Lunr.Document(obj, this.refName, this.fields)
    var words = doc.words()

    for (var i=0; i < words.length; i++) {
      var word = words[i]
      this.trie.set(word.id, word.doc)
    };
  }

  /**
   * Adds fields to the index.
   *
   * Use this method to describe which fields from a document should be part of the index.
   * An options object can be passed as the second argument that will change the way that
   * a particular field is indexed.
   *
   * `multiplier` is a multiplier to apply to a field, you can use this to make sure certain fields are
   * considered more important, e.g. a documents title.
   *
   * @param {String} name the name of the field to index in a document
   * @param {Object} opts options for indexing this particular field
   *
   * Example:
   *
   *     this.field('title', { multiplier: 10 })
   *     this.field('body')
   *
   */
  Index.prototype.field = function (name, opts) {
    this.fields[name] = opts || {multiplier: 1}
  }

  /**
   * Sets the ref for the index.
   *
   * Use this method to select the property by which objects added to the index can be uniquely identified.
   *
   * @param {String} name the name of the field to index in a document
   *
   * Example:
   *
   *     this.ref('cid')
   *
   */
  Index.prototype.ref = function (name) {
    this.refName = name
  }

  /**
   * Searches the index for a term.
   *
   * You can pass in a string of words separated by spaces.  By default the search is an AND search,
   * so if you searched for 'foo bar' the results would be those documents in the index that contain
   * both the word foo AND the word bar.
   *
   * @param {String} term the term or terms to search the index for.
   * @returns {Array} an array of references to documents in the index, this will be the property as defined by ref.
   */
  Index.prototype.search = function (term) {
    if (!term) return []

    var docIds = Lunr.utils.map(Lunr.Word.fromString(term), function (word) {
      var docs = this.trie
        .get(word.toString())
        .sort(function (a, b) {
          if (a.exact && b.exact === undefined) return -1
          if (b.exact && a.exact === undefined) return 1
          if (a.score < b.score) return 1
          if (a.score > b.score) return -1
          return 0
        })

      return Lunr.utils.map(docs, function (doc) { return doc.documentId })
    }, this)

    return Lunr.utils.intersect.apply(Lunr.utils, docIds)
  }

  /**
   * Empties the index.
   *
   * It will delete the index store and create a new, empty one in its place.
   */
  Index.prototype.empty = function () {
    delete this.trie
    this.trie = new Lunr.Trie
  }

  /*!
   * exposing the constructor
   * @private
   */
  return Index
})()
/*!
 * Lunr - Document
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

Lunr.Document = (function () {

  /**
   * Lunr.Document wraps any document that is added to the index.  It extracts any words from the document
   * fields that need indexing and formats the document in a way ready for insertion into the Lunr.Index
   * docStore.
   *
   * @constructor
   * @param {Object} original - the document to be added to the search index.
   * @param {String} refName - the name of the property that can be used as a reference to this document in the index.
   * @param {Object} fields - the fields object from the index, indicationg which fields from the document need indexing.
   *
   */
  var Document = function (original, refName, fields) {
    this.original = original
    this.fields = fields
    this.ref = original[refName]
  }

  /**
   * Returns a json representation of the document.
   *
   * Converts this instance of Lunr.Document into a plain object ready for insertion into the index.
   * The returned object consists of three properties, an id, an array of Lunr.Word ids and the
   * original document.
   *
   * @returns {Object} the plain object representation of the Lunr.Document.
   */
  Document.prototype.asJSON = function () {
    return {
      id: this.ref,
      words: Lunr.utils.map(this.words(), function (word) { return word.id }),
      original: this.original
    }
  }

  /**
   * Retrurns a list of words within the document.
   *
   * For each field in the original document that requires indexing this method will create an instance of
   * Lunr.Word and then tally the total score for that word in the document as a whole.  At this time any
   * multiplier specified in the fields object will be applied.
   *
   * The list of words will then be converted into a format ready for insertion into the index.
   *
   * @see Lunr.Word
   * @returns {Array} an array of all word objects ready for insertion into the index's wordStore.
   */
  Document.prototype.words = function () {
    var words = {}
    var self = this
    var allWords = {}

    Lunr.utils.forEachKey(this.fields, function (fieldName) {
      var wordObjs = Lunr.Word.fromString(self.original[fieldName]),
          numberOfWords = wordObjs.length

      for (var i=0; i < numberOfWords; i++) {
        var word = wordObjs[i].toString()

        if (!(word in allWords)) {
          allWords[word] = { score: 0, ref: self.ref }
        };

        allWords[word].score = allWords[word].score + self.fields[fieldName].multiplier
      };
    })

    return Lunr.utils.mapKeys(allWords, function (word) {
      return {id: word, doc: {score: allWords[word].score, documentId: self.ref} }
    })
  }

  return Document
})()
/*!
 * Lunr - Trie
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

Lunr.Trie = (function () {

  /**
   * A node in the trie
   *
   * @constructor
   * @private
   */
  var Node = function () {
    this.children = {}
    this.values = []
  }
  
  /**
   * Returns the correct child node for the given key.
   *
   * @private
   * @params {String} key - the key for the child
   * @returns {Node} the node for the given key.
   */
  Node.prototype.childForKey = function (key) {

    var child = this.children[key]

    if (!child) {
      child = new Node ()
      this.children[key] = child
    };

    return child
  }

  /**
   * Lunr.Trie stores the built search index.  It handles lookups against the index and the building of the index.
   *
   * @constructor
   */
  var Trie = function () {
    this.root = new Node ()
  }

  /**
   * Gets objects from the trie which match the passed key.
   *
   * Takes a key and gets all objects from the trie which could match the key.
   *
   * @param {String} key the key will be used to lookup values
   * @returns {Array} an array of values found in the trie
   */
  Trie.prototype.get = function (key) {
    var keys = this.keys(key)
    var self = this

    return Lunr.utils.reduce(keys, function (res, k) {
      Lunr.utils.forEach(self.getNode(k).values, function (v) {
        var val = Lunr.utils.copy(v)
        if (key === k) val.exact = true
        res.push(val)
      })
      return res
    }, [])
  }

  /**
   * Gets nodes from the trie for the given key.
   *
   * Takes a key and gets the node for that key.
   *
   * @param {String} key the key will be used to lookup values
   * @returns {Node} a node in the trie that matches the key
   */
  Trie.prototype.getNode = function (key) {
    var recursiveGet = function (node, key) {
      if (!key.length) return node
      return recursiveGet(node.childForKey(key.charAt(0)), key.slice(1))
    }

    return recursiveGet(this.root, key)
  }

  /**
   * Gets all keys from the trie that have a given prefix.
   *
   * Takes the given prefix and walks the trie, returning all keys which contain the prefix.
   *
   * @param {String} term the prefix to search with
   * @returns {Array} a list of keys that match the prefix
   */
  Trie.prototype.keys = function (term) {
    var keys = [],
        term = term || ""

    var getKeys = function (node, term) {
      if (node.values.length) keys.push(term)

      Lunr.utils.forEachKey(node.children, function (childKey) {
        getKeys(node.children[childKey], term + childKey)
      })
    }

    getKeys(this.getNode(term), term)
    return keys
  }

  /**
   * Set a key to the passed value.
   *
   * Takes a key and a value, walks through the trie to the right node and adds the
   * given value to that node.
   *
   * @param {String} key the key under which the value should be stored
   * @param {Object} value the value to store
   */
  Trie.prototype.set = function (key, value) {
    var recursiveSet = function (node, key) {
      if (!key.length) return node.values.push(value)
      recursiveSet(node.childForKey(key.charAt(0)), key.slice(1))
    }

    return recursiveSet(this.root, key)
  }

  return Trie
})();
/*!
 * Lunr - Word
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */

Lunr.Word = (function () {

  var stopWords = ["the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "this"]

  /**
  * A Lunr.Word wraps a string and provides methods to convert the string into a form ready for insertion
  * into the index.  It handles exclusion of stop word as well as performing any language based algorithms.
  *
  * @constructor
  * @param {String} raw - the raw word to be used as the base of a search word.
  */
  var Word = function (raw) {
    this.raw = raw
    this.out = this.raw.replace(/^\W+/, "").replace(/\W+$/, "").toLowerCase()
  }

  Word.fromString = function (str, splitter) {
    var splitter = splitter || /\b/g,
        splitStr = str.split(splitter),
        splitStrLen = splitStr.length,
        out = []

    for (var i=0; i < splitStrLen; i++) {
      var word = new Lunr.Word (splitStr[i])
      if (!word.isStopWord()) out.push(word)
    };

    return out
  }

  /**
   * Determines whether or not this word is a stop word.
   *
   * @returns {Boolean}
   */
  Word.prototype.isStopWord = function () {
    return (stopWords.indexOf(this.raw.toLowerCase()) !== -1)
  }

  /**
   * Converts the search word into a string representation.
   *
   * @returns {String}
   */
  Word.prototype.toString = function () {
    if (this.isStopWord()) return
    this.stem()
    return this.out
  }

  /**
   * Stems the current word.
   *
   * Stemming is the process for reducing inflected (or sometimes derived) words to their stem, base or root
   * form. Porter stemming is designed for the English language.
   * 
   * This code has been slighly adapted from Martin Porter's examples.
   *  - http://tartarus.org/~martin/PorterStemmer/
   *  
   * Please assume any errors found in the below code are translation errors
   * inserted by myself and not those of the original authors.
   *  
   * @author Matt Chadburn <matt@commuterjoy.co.uk>
   * 
   * June 2011
   * Additions and modifications by Oliver Nightingale
   *
   */
  Word.prototype.stem = (function () {
    var step2list = {
      "ational" : "ate",
      "tional"  : "tion",
      "enci"    : "ence",
      "anci"    : "ance",
      "izer"    : "ize",
      "bli"     : "ble",
      "alli"    : "al",
      "entli"   : "ent",
      "eli"     : "e",
      "ousli"   : "ous",
      "ization" : "ize",
      "ation"   : "ate",
      "ator"    : "ate",
      "alism"   : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti"   : "al",
      "iviti"   : "ive",
      "biliti"  : "ble",
      "logi"    : "log"
    }

    var step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical"  : "ic",
      "ful"   : "",
      "ness"  : ""
    }

    var c = "[^aeiou]";          // consonant
    var v = "[aeiouy]";          // vowel
    var C = c + "[^aeiouy]*";    // consonant sequence
    var V = v + "[aeiou]*";      // vowel sequence

    var mgr0 = "^(" + C + ")?" + V + C;               // [C]VC... is m>0
    var meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$";  // [C]VC[V] is m=1
    var mgr1 = "^(" + C + ")?" + V + C + V + C;       // [C]VCVC... is m>1
    var s_v   = "^(" + C + ")?" + v;                   // vowel in stem

    return function () {
      var stem;
      var suffix;
      var firstch;
      var origword = this.out;
      var w = this.out;

      if (origword.length < 3) return origword

      var re;
      var re2;
      var re3;
      var re4;

      firstch = origword.substr(0,1);
      if (firstch == "y") {
        w = firstch.toUpperCase() + w.substr(1);
      }

      // Step 1a
      re = /^(.+?)(ss|i)es$/;
      re2 = /^(.+?)([^s])s$/;

      if (re.test(w)) { 
        w = w.replace(re,"$1$2");
      } else if (re2.test(w)) { 
        w = w.replace(re2,"$1$2");
      }

      // Step 1b
      re = /^(.+?)eed$/;
      re2 = /^(.+?)(ed|ing)$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        re = new RegExp(mgr0);
        if (re.test(fp[1])) {
          re = /.$/;
          w = w.replace(re,"");
        }
      } else if (re2.test(w)) {
        var fp = re2.exec(w);
        stem = fp[1];
        re2 = new RegExp(s_v);
        if (re2.test(stem)) {
          w = stem;
          re2 = /(at|bl|iz)$/;
          re3 = new RegExp("([^aeiouylsz])\\1$");
          re4 = new RegExp("^" + C + v + "[^aeiouwxy]$");
          if (re2.test(w)) {  w = w + "e"; }
          else if (re3.test(w)) { re = /.$/; w = w.replace(re,""); }
          else if (re4.test(w)) { w = w + "e"; }
        }
      }

      // Step 1c
      re = /^(.+?)y$/;
      if (re.test(w)) {
        var fp = re.exec(w);
        stem = fp[1];
        re = new RegExp(s_v);
        if (re.test(stem)) { w = stem + "i"; }
      }

      // Step 2
      re = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
      if (re.test(w)) {
        var fp = re.exec(w);
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
        var fp = re.exec(w);
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
        var fp = re.exec(w);
        stem = fp[1];
        re = new RegExp(mgr1);
        if (re.test(stem)) {
          w = stem;
        }
      } else if (re2.test(w)) {
        var fp = re2.exec(w);
        stem = fp[1] + fp[2];
        re2 = new RegExp(mgr1);
        if (re2.test(stem)) {
          w = stem;
        }
      }

      // Step 5
      re = /^(.+?)e$/;
      if (re.test(w)) {
        var fp = re.exec(w);
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
        w = w.replace(re,"");
      }

      if (firstch == "y") {
        w = firstch.toLowerCase() + w.substr(1);
      }

      this.out = w;
    }

  })()

  return Word
})()
