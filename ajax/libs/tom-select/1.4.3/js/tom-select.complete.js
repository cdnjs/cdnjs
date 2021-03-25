/**
* Tom Select v1.4.3
* Licensed under the Apache License, Version 2.0 (the "License");
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TomSelect = factory());
}(this, (function () { 'use strict';

	/**
	 * MicroEvent - to make any js object an event emitter
	 *
	 * - pure javascript - server compatible, browser compatible
	 * - dont rely on the browser doms
	 * - super simple - you get it immediatly, no mistery, no magic involved
	 *
	 * @author Jerome Etienne (https://github.com/jeromeetienne)
	 */

	/**
	 * Execute callback for each event in space separated list of event names
	 *
	 */
	function forEvents(events, callback) {
	  events.split(/\s+/).forEach(event => {
	    callback(event);
	  });
	}

	class MicroEvent {
	  constructor() {
	    this._events = {};
	  }

	  on(events, fct) {
	    forEvents(events, event => {
	      this._events[event] = this._events[event] || [];

	      this._events[event].push(fct);
	    });
	  }

	  off(events, fct) {
	    var n = arguments.length;

	    if (n === 0) {
	      this._events = {};
	      return;
	    }

	    forEvents(events, event => {
	      if (n === 1) return delete this._events[event];
	      if (event in this._events === false) return;

	      this._events[event].splice(this._events[event].indexOf(fct), 1);
	    });
	  }

	  trigger(events, ...args) {
	    var self = this;
	    forEvents(events, event => {
	      if (event in self._events === false) return;

	      for (let fct of self._events[event]) {
	        fct.apply(self, args);
	      }
	    });
	  }

	}

	/**
	 * microplugin.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */
	function MicroPlugin(Interface) {
	  Interface.plugins = {};
	  return class mixin extends Interface {
	    /**
	     * Registers a plugin.
	     *
	     * @param {string} name
	     * @param {function} fn
	     */
	    static define(name, fn) {
	      Interface.plugins[name] = {
	        'name': name,
	        'fn': fn
	      };
	    }
	    /**
	     * Initializes the listed plugins (with options).
	     * Acceptable formats:
	     *
	     * List (without options):
	     *   ['a', 'b', 'c']
	     *
	     * List (with options):
	     *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
	     *
	     * Hash (with options):
	     *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
	     *
	     * @param {array|object} plugins
	     */


	    initializePlugins(plugins) {
	      var i, n, key;
	      var self = this;
	      var queue = [];
	      self.plugins = {
	        names: [],
	        settings: {},
	        requested: {},
	        loaded: {}
	      };

	      if (Array.isArray(plugins)) {
	        for (i = 0, n = plugins.length; i < n; i++) {
	          if (typeof plugins[i] === 'string') {
	            queue.push(plugins[i]);
	          } else {
	            self.plugins.settings[plugins[i].name] = plugins[i].options;
	            queue.push(plugins[i].name);
	          }
	        }
	      } else if (plugins) {
	        for (key in plugins) {
	          if (plugins.hasOwnProperty(key)) {
	            self.plugins.settings[key] = plugins[key];
	            queue.push(key);
	          }
	        }
	      }

	      while (queue.length) {
	        self.require(queue.shift());
	      }
	    }

	    loadPlugin(name) {
	      var self = this;
	      var plugins = self.plugins;
	      var plugin = Interface.plugins[name];

	      if (!Interface.plugins.hasOwnProperty(name)) {
	        throw new Error('Unable to find "' + name + '" plugin');
	      }

	      plugins.requested[name] = true;
	      plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
	      plugins.names.push(name);
	    }
	    /**
	     * Initializes a plugin.
	     *
	     * @param {string} name
	     */


	    require(name) {
	      var self = this;
	      var plugins = self.plugins;

	      if (!self.plugins.loaded.hasOwnProperty(name)) {
	        if (plugins.requested[name]) {
	          throw new Error('Plugin has circular dependency ("' + name + '")');
	        }

	        self.loadPlugin(name);
	      }

	      return plugins.loaded[name];
	    }

	  };
	}

	/**
	 * sifter.js
	 * Copyright (c) 2013–2020 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */
	// utilities
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var cmp = function cmp(a, b) {
	  if (typeof a === 'number' && typeof b === 'number') {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  a = asciifold(String(a || ''));
	  b = asciifold(String(b || ''));
	  if (a > b) return 1;
	  if (b > a) return -1;
	  return 0;
	};
	/**
	 * A property getter resolving dot-notation
	 * @param  {Object}  obj     The root object to fetch property on
	 * @param  {String}  name    The optionally dotted property name to fetch
	 * @param  {Boolean} nesting Handle nesting or not
	 * @return {Object}          The resolved property value
	 */


	var getattr = function getattr(obj, name, nesting) {
	  if (!obj || !name) return;
	  if (!nesting) return obj[name];
	  var names = name.split(".");

	  while (names.length && (obj = obj[names.shift()]));

	  return obj;
	};

	var escape_regex = function escape_regex(str) {
	  return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	};

	var DIACRITICS = {
	  'a': '[aḀḁĂăÂâǍǎȺⱥȦȧẠạÄäÀàÁáĀāÃãÅåąĄÃąĄ]',
	  'b': '[b␢βΒB฿𐌁ᛒ]',
	  'c': '[cĆćĈĉČčĊċC̄c̄ÇçḈḉȻȼƇƈɕᴄＣｃ]',
	  'd': '[dĎďḊḋḐḑḌḍḒḓḎḏĐđD̦d̦ƉɖƊɗƋƌᵭᶁᶑȡᴅＤｄð]',
	  'e': '[eÉéÈèÊêḘḙĚěĔĕẼẽḚḛẺẻĖėËëĒēȨȩĘęᶒɆɇȄȅẾếỀềỄễỂểḜḝḖḗḔḕȆȇẸẹỆệⱸᴇＥｅɘǝƏƐε]',
	  'f': '[fƑƒḞḟ]',
	  'g': '[gɢ₲ǤǥĜĝĞğĢģƓɠĠġ]',
	  'h': '[hĤĥĦħḨḩẖẖḤḥḢḣɦʰǶƕ]',
	  'i': '[iÍíÌìĬĭÎîǏǐÏïḮḯĨĩĮįĪīỈỉȈȉȊȋỊịḬḭƗɨɨ̆ᵻᶖİiIıɪＩｉ]',
	  'j': '[jȷĴĵɈɉʝɟʲ]',
	  'k': '[kƘƙꝀꝁḰḱǨǩḲḳḴḵκϰ₭]',
	  'l': '[lŁłĽľĻļĹĺḶḷḸḹḼḽḺḻĿŀȽƚⱠⱡⱢɫɬᶅɭȴʟＬｌ]',
	  'n': '[nŃńǸǹŇňÑñṄṅŅņṆṇṊṋṈṉN̈n̈ƝɲȠƞᵰᶇɳȵɴＮｎŊŋ]',
	  'o': '[oØøÖöÓóÒòÔôǑǒŐőŎŏȮȯỌọƟɵƠơỎỏŌōÕõǪǫȌȍՕօ]',
	  'p': '[pṔṕṖṗⱣᵽƤƥᵱ]',
	  'q': '[qꝖꝗʠɊɋꝘꝙq̃]',
	  'r': '[rŔŕɌɍŘřŖŗṘṙȐȑȒȓṚṛⱤɽ]',
	  's': '[sŚśṠṡṢṣꞨꞩŜŝŠšŞşȘșS̈s̈]',
	  't': '[tŤťṪṫŢţṬṭƮʈȚțṰṱṮṯƬƭ]',
	  'u': '[uŬŭɄʉỤụÜüÚúÙùÛûǓǔŰűŬŭƯưỦủŪūŨũŲųȔȕ∪]',
	  'v': '[vṼṽṾṿƲʋꝞꝟⱱʋ]',
	  'w': '[wẂẃẀẁŴŵẄẅẆẇẈẉ]',
	  'x': '[xẌẍẊẋχ]',
	  'y': '[yÝýỲỳŶŷŸÿỸỹẎẏỴỵɎɏƳƴ]',
	  'z': '[zŹźẐẑŽžŻżẒẓẔẕƵƶ]'
	};

	var asciifold = function () {
	  var i, n, k, chunk;
	  var foreignletters = '';
	  var lookup = {};

	  for (k in DIACRITICS) {
	    if (DIACRITICS.hasOwnProperty(k)) {
	      chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
	      foreignletters += chunk;

	      for (i = 0, n = chunk.length; i < n; i++) {
	        lookup[chunk.charAt(i)] = k;
	      }
	    }
	  }

	  var regexp = new RegExp('[' + foreignletters + ']', 'g');
	  return function (str) {
	    return str.replace(regexp, function (foreignletter) {
	      return lookup[foreignletter];
	    }).toLowerCase();
	  };
	}();

	class Sifter {
	  /**
	   * Textually searches arrays and hashes of objects
	   * by property (or multiple properties). Designed
	   * specifically for autocomplete.
	   *
	   * @constructor
	   * @param {array|object} items
	   * @param {object} items
	   */
	  constructor(items, settings) {
	    this.items = void 0;
	    this.settings = void 0;
	    this.items = items;
	    this.settings = settings || {
	      diacritics: true
	    };
	  }

	  /**
	   * Splits a search string into an array of individual
	   * regexps to be used to match results.
	   *
	   * @param {string} query
	   * @returns {array}
	   */
	  tokenize(query, respect_word_boundaries) {
	    query = String(query || '').toLowerCase().trim();
	    if (!query || !query.length) return [];
	    var i, n, regex, letter;
	    var tokens = [];
	    var words = query.split(/ +/);

	    for (i = 0, n = words.length; i < n; i++) {
	      regex = escape_regex(words[i]);

	      if (this.settings.diacritics) {
	        for (letter in DIACRITICS) {
	          if (DIACRITICS.hasOwnProperty(letter)) {
	            regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
	          }
	        }
	      }

	      if (respect_word_boundaries) regex = "\\b" + regex;
	      tokens.push({
	        string: words[i],
	        regex: new RegExp(regex, 'i')
	      });
	    }

	    return tokens;
	  }

	  /**
	   * Iterates over arrays and hashes.
	   *
	   * ```
	   * this.iterator(this.items, function(item, id) {
	   *    // invoked for each item
	   * });
	   * ```
	   *
	   * @param {array|object} object
	   */
	  iterator(object, callback) {
	    var iterator;

	    if (Array.isArray(object)) {
	      iterator = Array.prototype.forEach || function (callback) {
	        for (var i = 0, n = this.length; i < n; i++) {
	          callback(this[i], i, this);
	        }
	      };
	    } else {
	      iterator = function (callback) {
	        for (var key in this) {
	          if (this.hasOwnProperty(key)) {
	            callback(this[key], key, this);
	          }
	        }
	      };
	    }

	    iterator.apply(object, [callback]);
	  }

	  /**
	   * Returns a function to be used to score individual results.
	   *
	   * Good matches will have a higher score than poor matches.
	   * If an item is not a match, 0 will be returned by the function.
	   *
	   * @returns {function}
	   */
	  getScoreFunction(query, options) {
	    var self, fields, tokens, token_count, nesting, search;
	    self = this;
	    search = self.prepareSearch(query, options);
	    tokens = search.tokens;
	    fields = search.options.fields;
	    token_count = tokens.length;
	    nesting = search.options.nesting;
	    /**
	     * Calculates how close of a match the
	     * given value is against a search token.
	     *
	     * @param {string} value
	     * @param {object} token
	     * @return {number}
	     */

	    var scoreValue = function scoreValue(value, token) {
	      var score, pos;
	      if (!value) return 0;
	      value = String(value || '');
	      pos = value.search(token.regex);
	      if (pos === -1) return 0;
	      score = token.string.length / value.length;
	      if (pos === 0) score += 0.5;
	      return score;
	    };
	    /**
	     * Calculates the score of an object
	     * against the search query.
	     *
	     * @param {object} token
	     * @param {object} data
	     * @return {number}
	     */


	    var scoreObject = function () {
	      var field_count = fields.length;

	      if (!field_count) {
	        return function () {
	          return 0;
	        };
	      }

	      if (field_count === 1) {
	        return function (token, data) {
	          return scoreValue(getattr(data, fields[0], nesting), token);
	        };
	      }

	      return function (token, data) {
	        for (var i = 0, sum = 0; i < field_count; i++) {
	          sum += scoreValue(getattr(data, fields[i], nesting), token);
	        }

	        return sum / field_count;
	      };
	    }();

	    if (!token_count) {
	      return function () {
	        return 0;
	      };
	    }

	    if (token_count === 1) {
	      return function (data) {
	        return scoreObject(tokens[0], data);
	      };
	    }

	    if (search.options.conjunction === 'and') {
	      return function (data) {
	        var score;

	        for (var i = 0, sum = 0; i < token_count; i++) {
	          score = scoreObject(tokens[i], data);
	          if (score <= 0) return 0;
	          sum += score;
	        }

	        return sum / token_count;
	      };
	    } else {
	      return function (data) {
	        for (var i = 0, sum = 0; i < token_count; i++) {
	          sum += scoreObject(tokens[i], data);
	        }

	        return sum / token_count;
	      };
	    }
	  }

	  /**
	   * Returns a function that can be used to compare two
	   * results, for sorting purposes. If no sorting should
	   * be performed, `null` will be returned.
	   *
	   * @param {string|object} search
	   * @return function(a,b)
	   */
	  getSortFunction(search, options) {
	    var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;
	    self = this;
	    search = self.prepareSearch(search, options);
	    sort = !search.query && options.sort_empty || options.sort;
	    /**
	     * Fetches the specified sort field value
	     * from a search result item.
	     *
	     * @param  {string} name
	     * @param  {object} result
	     * @return {string}
	     */

	    get_field = function (name, result) {
	      if (name === '$score') return result.score;
	      return getattr(self.items[result.id], name, options.nesting);
	    }; // parse options


	    fields = [];

	    if (sort) {
	      for (i = 0, n = sort.length; i < n; i++) {
	        if (search.query || sort[i].field !== '$score') {
	          fields.push(sort[i]);
	        }
	      }
	    } // the "$score" field is implied to be the primary
	    // sort field, unless it's manually specified


	    if (search.query) {
	      implicit_score = true;

	      for (i = 0, n = fields.length; i < n; i++) {
	        if (fields[i].field === '$score') {
	          implicit_score = false;
	          break;
	        }
	      }

	      if (implicit_score) {
	        fields.unshift({
	          field: '$score',
	          direction: 'desc'
	        });
	      }
	    } else {
	      for (i = 0, n = fields.length; i < n; i++) {
	        if (fields[i].field === '$score') {
	          fields.splice(i, 1);
	          break;
	        }
	      }
	    }

	    multipliers = [];

	    for (i = 0, n = fields.length; i < n; i++) {
	      multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
	    } // build function


	    fields_count = fields.length;

	    if (!fields_count) {
	      return null;
	    } else if (fields_count === 1) {
	      field = fields[0].field;
	      multiplier = multipliers[0];
	      return function (a, b) {
	        return multiplier * cmp(get_field(field, a), get_field(field, b));
	      };
	    } else {
	      return function (a, b) {
	        var i, result, field;

	        for (i = 0; i < fields_count; i++) {
	          field = fields[i].field;
	          result = multipliers[i] * cmp(get_field(field, a), get_field(field, b));
	          if (result) return result;
	        }

	        return 0;
	      };
	    }
	  }

	  /**
	   * Parses a search query and returns an object
	   * with tokens and fields ready to be populated
	   * with results.
	   *
	   */
	  prepareSearch(query, options) {
	    if (typeof query === 'object') return query;
	    options = Object.assign({}, options);
	    var option_fields = options.fields;
	    var option_sort = options.sort;
	    var option_sort_empty = options.sort_empty;
	    if (option_fields && !Array.isArray(option_fields)) options.fields = [option_fields];
	    if (option_sort && !Array.isArray(option_sort)) options.sort = [option_sort];
	    if (option_sort_empty && !Array.isArray(option_sort_empty)) options.sort_empty = [option_sort_empty];
	    return {
	      options: options,
	      query: String(query || '').toLowerCase(),
	      tokens: this.tokenize(query, options.respect_word_boundaries),
	      total: 0,
	      items: []
	    };
	  }

	  /**
	   * Searches through all items and returns a sorted array of matches.
	   *
	   */
	  search(query, options) {
	    var self = this,
	        score,
	        search;
	    var fn_sort;
	    var fn_score;
	    search = this.prepareSearch(query, options);
	    options = search.options;
	    query = search.query; // generate result scoring function

	    fn_score = options.score || self.getScoreFunction(search); // perform search and sort

	    if (query.length) {
	      self.iterator(self.items, function (item, id) {
	        score = fn_score(item);

	        if (options.filter === false || score > 0) {
	          search.items.push({
	            'score': score,
	            'id': id
	          });
	        }
	      });
	    } else {
	      self.iterator(self.items, function (item, id) {
	        search.items.push({
	          'score': 1,
	          'id': id
	        });
	      });
	    }

	    fn_sort = self.getSortFunction(search, options);
	    if (fn_sort) search.items.sort(fn_sort); // apply limits

	    search.total = search.items.length;

	    if (typeof options.limit === 'number') {
	      search.items = search.items.slice(0, options.limit);
	    }

	    return search;
	  }

	}

	/**
	 * highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
	 * Highlights arbitrary terms in a node.
	 *
	 * - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
	 * - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
	 */
	function highlight(element, pattern) {
	  if (typeof pattern === 'string' && !pattern.length) return;
	  var regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;

	  var highlight = function highlight(node) {
	    var skip = 0; // Wrap matching part of text node with highlighting <span>, e.g.
	    // Soccer  ->  <span class="highlight">Soc</span>cer  for regex = /soc/i

	    if (node.nodeType === 3) {
	      var pos = node.data.search(regex);

	      if (pos >= 0 && node.data.length > 0) {
	        var match = node.data.match(regex);
	        var spannode = document.createElement('span');
	        spannode.className = 'highlight';
	        var middlebit = node.splitText(pos);
	        middlebit.splitText(match[0].length);
	        var middleclone = middlebit.cloneNode(true);
	        spannode.appendChild(middleclone);
	        middlebit.parentNode.replaceChild(spannode, middlebit);
	        skip = 1;
	      }
	    } // Recurse element node, looking for child text nodes to highlight, unless element
	    // is childless, <script>, <style>, or already highlighted: <span class="hightlight">
	    else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== 'highlight' || node.tagName !== 'SPAN')) {
	        for (var i = 0; i < node.childNodes.length; ++i) {
	          i += highlight(node.childNodes[i]);
	        }
	      }

	    return skip;
	  };

	  highlight(element);
	}
	/**
	 * removeHighlight fn copied from highlight v5 and
	 * edited to remove with(), pass js strict mode, and use without jquery
	 */

	function removeHighlight(el) {
	  var elements = document.querySelectorAll("span.highlight");
	  Array.prototype.forEach.call(elements, function (el, i) {
	    var parent = el.parentNode;
	    parent.replaceChild(el.firstChild, el);
	    parent.normalize();
	  });
	}

	const KEY_A = 65;
	const KEY_RETURN = 13;
	const KEY_ESC = 27;
	const KEY_LEFT = 37;
	const KEY_UP = 38;
	const KEY_RIGHT = 39;
	const KEY_DOWN = 40;
	const KEY_BACKSPACE = 8;
	const KEY_DELETE = 46;
	const KEY_TAB = 9;
	const IS_MAC = typeof navigator === 'undefined' ? false : /Mac/.test(navigator.userAgent);
	const KEY_SHORTCUT = IS_MAC ? 'metaKey' : 'ctrlKey'; // ctrl key or apple key for ma

	var defaults = {
	  options: [],
	  optgroups: [],
	  plugins: [],
	  delimiter: ',',
	  splitOn: null,
	  // regexp or string for splitting up values from a paste command
	  persist: true,
	  diacritics: true,
	  create: null,
	  createOnBlur: false,
	  createFilter: null,
	  highlight: true,
	  openOnFocus: true,
	  shouldOpen: null,
	  maxOptions: 50,
	  maxItems: null,
	  hideSelected: null,
	  duplicates: false,
	  addPrecedence: false,
	  selectOnTab: false,
	  preload: null,
	  allowEmptyOption: false,
	  closeAfterSelect: false,
	  loadThrottle: 300,
	  loadingClass: 'loading',
	  dataAttr: null,
	  //'data-data',
	  optgroupField: 'optgroup',
	  valueField: 'value',
	  labelField: 'text',
	  disabledField: 'disabled',
	  optgroupLabelField: 'label',
	  optgroupValueField: 'value',
	  lockOptgroupOrder: false,
	  sortField: '$order',
	  searchField: ['text'],
	  searchConjunction: 'and',
	  mode: null,
	  wrapperClass: 'ts-control',
	  inputClass: 'ts-input',
	  dropdownClass: 'ts-dropdown',
	  dropdownContentClass: 'ts-dropdown-content',
	  itemClass: 'item',
	  optionClass: 'option',
	  dropdownParent: null,
	  controlInput: null,
	  copyClassesToDropdown: true,
	  placeholder: null,
	  hidePlaceholder: null,
	  shouldLoad: function (query) {
	    return query.length > 0;
	  },

	  /*
	  load                 : null, // function(query, callback) { ... }
	  score                : null, // function(search) { ... }
	  onInitialize         : null, // function() { ... }
	  onChange             : null, // function(value) { ... }
	  onItemAdd            : null, // function(value, $item) { ... }
	  onItemRemove         : null, // function(value) { ... }
	  onClear              : null, // function() { ... }
	  onOptionAdd          : null, // function(value, data) { ... }
	  onOptionRemove       : null, // function(value) { ... }
	  onOptionClear        : null, // function() { ... }
	  onOptionGroupAdd     : null, // function(id, data) { ... }
	  onOptionGroupRemove  : null, // function(id) { ... }
	  onOptionGroupClear   : null, // function() { ... }
	  onDropdownOpen       : null, // function(dropdown) { ... }
	  onDropdownClose      : null, // function(dropdown) { ... }
	  onType               : null, // function(str) { ... }
	  onDelete             : null, // function(values) { ... }
	  */
	  render: {
	    /*
	    item: null,
	    optgroup: null,
	    optgroup_header: null,
	    option: null,
	    option_create: null
	    */
	  }
	};

	/**
	 * Converts a scalar to its best string representation
	 * for hash keys and HTML attribute values.
	 *
	 * Transformations:
	 *   'str'     -> 'str'
	 *   null      -> ''
	 *   undefined -> ''
	 *   true      -> '1'
	 *   false     -> '0'
	 *   0         -> '0'
	 *   1         -> '1'
	 *
	 */
	function hash_key(value) {
	  if (typeof value === 'undefined' || value === null) return null;
	  if (typeof value === 'boolean') return value ? '1' : '0';
	  return value + '';
	}
	/**
	 * Escapes a string for use within HTML.
	 *
	 */

	function escape_html(str) {
	  return (str + '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}
	/**
	 * Debounce the user provided load function
	 *
	 */

	function loadDebounce(fn, delay) {
	  var timeout;
	  return function (value, callback) {
	    var self = this;

	    if (timeout) {
	      self.loading = Math.max(self.loading - 1, 0);
	    }

	    clearTimeout(timeout);
	    timeout = setTimeout(function () {
	      timeout = null;
	      self.loadedSearches[value] = true;
	      fn.call(self, value, callback);
	    }, delay);
	  };
	}
	/**
	 * Debounce all fired events types listed in `types`
	 * while executing the provided `fn`.
	 *
	 */

	function debounce_events(self, types, fn) {
	  var type;
	  var trigger = self.trigger;
	  var event_args = {}; // override trigger method

	  self.trigger = function () {
	    var type = arguments[0];

	    if (types.indexOf(type) !== -1) {
	      event_args[type] = arguments;
	    } else {
	      return trigger.apply(self, arguments);
	    }
	  }; // invoke provided function


	  fn.apply(self, []);
	  self.trigger = trigger; // trigger queued events

	  for (type in event_args) {
	    trigger.apply(self, event_args[type]);
	  }
	}
	/**
	 * Determines the current selection within a text input control.
	 * Returns an object containing:
	 *   - start
	 *   - length
	 *
	 */

	function getSelection(input) {
	  return {
	    start: input.selectionStart,
	    length: input.selectionEnd - input.selectionStart
	  };
	}
	/**
	 * Prevent default
	 *
	 */

	function preventDefault(evt, stop = false) {
	  if (evt) {
	    evt.preventDefault();

	    if (stop) {
	      evt.stopPropagation();
	    }
	  }
	}
	/**
	 * Prevent default
	 *
	 */

	function addEvent(target, type, callback, options) {
	  target.addEventListener(type, callback, options);
	}
	/**
	 * Return true if the requested key is down
	 * Will return false if more than one control character is pressed ( when [ctrl+shift+a] != [ctrl+a] )
	 * The current evt may not always set ( eg calling advanceSelection() )
	 *
	 */

	function isKeyDown(key_name, evt) {
	  if (!evt) {
	    return false;
	  }

	  if (!evt[key_name]) {
	    return false;
	  }

	  var count = (evt.altKey ? 1 : 0) + (evt.ctrlKey ? 1 : 0) + (evt.shiftKey ? 1 : 0) + (evt.metaKey ? 1 : 0);

	  if (count === 1) {
	    return true;
	  }

	  return false;
	}
	/**
	 * Get the id of an element
	 * If the id attribute is not set, set the attribute with the given id
	 *
	 */

	function getId(el, id) {
	  const existing_id = el.getAttribute('id');

	  if (existing_id) {
	    return existing_id;
	  }

	  el.setAttribute('id', id);
	  return id;
	}

	function getSettings(input, settings_user) {
	  var settings = Object.assign({}, defaults, settings_user);
	  var attr_data = settings.dataAttr;
	  var field_label = settings.labelField;
	  var field_value = settings.valueField;
	  var field_disabled = settings.disabledField;
	  var field_optgroup = settings.optgroupField;
	  var field_optgroup_label = settings.optgroupLabelField;
	  var field_optgroup_value = settings.optgroupValueField;
	  var tag_name = input.tagName.toLowerCase();
	  var placeholder = input.getAttribute('placeholder') || input.getAttribute('data-placeholder');

	  if (!placeholder && !settings.allowEmptyOption) {
	    let option = input.querySelector('option[value=""]');

	    if (option) {
	      placeholder = option.textContent;
	    }
	  }

	  var settings_element = {
	    placeholder: placeholder,
	    options: [],
	    optgroups: [],
	    items: [],
	    maxItems: null
	  };
	  /**
	   * Initialize from a <select> element.
	   *
	   */

	  var init_select = () => {
	    var tagName;
	    var options = settings_element.options;
	    var optionsMap = {};
	    var group_count = 1;

	    var readData = el => {
	      var data = Object.assign({}, el.dataset); // get plain object from DOMStringMap

	      var json = attr_data && data[attr_data];

	      if (typeof json === 'string' && json.length) {
	        data = Object.assign(data, JSON.parse(json));
	      }

	      return data;
	    };

	    var addOption = (option, group) => {
	      var value = hash_key(option.value);
	      if (!value && !settings.allowEmptyOption) return; // if the option already exists, it's probably been
	      // duplicated in another optgroup. in this case, push
	      // the current group to the "optgroup" property on the
	      // existing option so that it's rendered in both places.

	      if (optionsMap.hasOwnProperty(value)) {
	        if (group) {
	          var arr = optionsMap[value][field_optgroup];

	          if (!arr) {
	            optionsMap[value][field_optgroup] = group;
	          } else if (!Array.isArray(arr)) {
	            optionsMap[value][field_optgroup] = [arr, group];
	          } else {
	            arr.push(group);
	          }
	        }

	        return;
	      }

	      var option_data = readData(option);
	      option_data[field_label] = option_data[field_label] || option.textContent;
	      option_data[field_value] = option_data[field_value] || value;
	      option_data[field_disabled] = option_data[field_disabled] || option.disabled;
	      option_data[field_optgroup] = option_data[field_optgroup] || group;
	      option_data.$option = option;
	      optionsMap[value] = option_data;
	      options.push(option_data);

	      if (option.selected) {
	        settings_element.items.push(value);
	      }
	    };

	    var addGroup = optgroup => {
	      var id, optgroup_data;
	      optgroup_data = readData(optgroup);
	      optgroup_data[field_optgroup_label] = optgroup_data[field_optgroup_label] || optgroup.getAttribute('label') || '';
	      optgroup_data[field_optgroup_value] = optgroup_data[field_optgroup_value] || group_count++;
	      optgroup_data[field_disabled] = optgroup_data[field_disabled] || optgroup.disabled;
	      settings_element.optgroups.push(optgroup_data);
	      id = optgroup_data[field_optgroup_value];

	      for (const option of optgroup.children) {
	        addOption(option, id);
	      }
	    };

	    settings_element.maxItems = input.hasAttribute('multiple') ? null : 1;

	    for (const child of input.children) {
	      tagName = child.tagName.toLowerCase();

	      if (tagName === 'optgroup') {
	        addGroup(child);
	      } else if (tagName === 'option') {
	        addOption(child);
	      }
	    }
	  };
	  /**
	   * Initialize from a <input type="text"> element.
	   *
	   */


	  var init_textbox = () => {
	    var values, option;
	    var data_raw = input.getAttribute(attr_data);

	    if (!data_raw) {
	      var value = input.value.trim() || '';
	      if (!settings.allowEmptyOption && !value.length) return;
	      values = value.split(settings.delimiter);

	      for (const _value of values) {
	        option = {};
	        option[field_label] = _value;
	        option[field_value] = _value;
	        settings_element.options.push(option);
	      }

	      settings_element.items = values;
	    } else {
	      settings_element.options = JSON.parse(data_raw);

	      for (const opt of settings_element.options) {
	        settings_element.items.push(opt[field_value]);
	      }
	    }
	  };

	  if (tag_name === 'select') {
	    init_select();
	  } else {
	    init_textbox();
	  }

	  return Object.assign({}, defaults, settings_element, settings_user);
	}

	/**
	 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
	 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
	 *
	 * param query should be {}
	 */
	function getDom(query) {
	  if (query.jquery) {
	    return query[0];
	  }

	  if (query instanceof HTMLElement) {
	    return query;
	  }

	  if (query.indexOf('<') > -1) {
	    let div = document.createElement('div');
	    div.innerHTML = query.trim(); // Never return a text node of whitespace as the result

	    return div.firstChild;
	  }

	  return document.querySelector(query);
	}
	function escapeQuery(query) {
	  return query.replace(/['"\\]/g, '\\$&');
	}
	/**
	 * Dispatch an event
	 *
	 */

	function triggerEvent(dom_el, event_name) {
	  var event = document.createEvent('HTMLEvents');
	  event.initEvent(event_name, true, false);
	  dom_el.dispatchEvent(event);
	}
	/**
	 * Apply CSS rules to a dom element
	 *
	 */

	function applyCSS(dom_el, css) {
	  Object.assign(dom_el.style, css);
	}
	/**
	 * Add css classes
	 *
	 */

	function addClasses(elmts, ...classes) {
	  var norm_classes = classesArray(classes);
	  elmts = castAsArray(elmts);
	  elmts.map(el => {
	    norm_classes.map(cls => {
	      el.classList.add(cls);
	    });
	  });
	}
	/**
	 * Remove css classes
	 *
	 */

	function removeClasses(elmts, ...classes) {
	  var norm_classes = classesArray(classes);
	  elmts = castAsArray(elmts);
	  elmts.map(el => {
	    norm_classes.map(cls => {
	      el.classList.remove(cls);
	    });
	  });
	}
	/**
	 * Return arguments
	 *
	 */

	function classesArray(args) {
	  var classes = [];

	  for (let _classes of args) {
	    if (typeof _classes === 'string') {
	      _classes = _classes.trim().split(/[\11\12\14\15\40]/);
	    }

	    if (Array.isArray(_classes)) {
	      classes = classes.concat(_classes);
	    }
	  }

	  return classes.filter(Boolean);
	}
	/**
	 * Create an array from arg if it's not already an array
	 *
	 */

	function castAsArray(arg) {
	  if (!Array.isArray(arg)) {
	    arg = [arg];
	  }

	  return arg;
	}
	/**
	 * Get the closest node to the evt.target matching the selector
	 * Stops at wrapper
	 *
	 */

	function parentMatch(target, selector, wrapper) {
	  if (wrapper && !wrapper.contains(target)) {
	    return;
	  }

	  while (target && target.matches) {
	    if (target.matches(selector)) {
	      return target;
	    }

	    target = target.parentNode;
	  }
	}
	/**
	 * Get the first or last item from an array
	 *
	 * > 0 - right (last)
	 * < 0 - left (first)
	 *
	 */

	function getTail(list, direction) {
	  if (direction > 0) {
	    return list[list.length - 1];
	  }

	  return list[0];
	}
	/**
	 * Return true if an object is empty
	 *
	 */

	function isEmptyObject(obj) {
	  return Object.keys(obj).length === 0;
	}
	/**
	 * Get the index of an element amongst sibling nodes of the same type
	 *
	 */

	function nodeIndex(el, amongst) {
	  if (!el) return -1;
	  amongst = amongst || el.nodeName;
	  var i = 0;

	  while (el = el.previousElementSibling) {
	    if (el.matches(amongst)) {
	      i++;
	    }
	  }

	  return i;
	}
	/**
	 * Set attributes of an element
	 *
	 */

	function setAttr(el, attrs) {
	  for (const attr in attrs) {
	    el.setAttribute(attr, attrs[attr]);
	  }
	}

	var instance_i = 0;
	class TomSelect extends MicroPlugin(MicroEvent) {
	  constructor(input_arg, settings) {
	    super();
	    this.control_input = void 0;
	    this.wrapper = void 0;
	    this.dropdown = void 0;
	    this.control = void 0;
	    this.dropdown_content = void 0;
	    this.order = 0;
	    this.settings = void 0;
	    this.input = void 0;
	    this.tabIndex = void 0;
	    this.is_select_tag = void 0;
	    this.rtl = void 0;
	    this.inputId = void 0;
	    this._destroy = void 0;
	    this.sifter = void 0;
	    this.tab_key = false;
	    this.isOpen = false;
	    this.isDisabled = false;
	    this.isRequired = void 0;
	    this.isInvalid = false;
	    this.isLocked = false;
	    this.isFocused = false;
	    this.isInputHidden = false;
	    this.isSetup = false;
	    this.ignoreFocus = false;
	    this.ignoreBlur = false;
	    this.hasOptions = false;
	    this.currentResults = null;
	    this.lastValue = '';
	    this.caretPos = 0;
	    this.loading = 0;
	    this.loadedSearches = {};
	    this.activeOption = null;
	    this.activeItems = [];
	    this.optgroups = {};
	    this.options = {};
	    this.options_i = 0;
	    this.userOptions = {};
	    this.items = [];
	    this.renderCache = {
	      'item': {},
	      'option': {}
	    };
	    instance_i++;
	    var dir;
	    var input = getDom(input_arg);

	    if (input.tomselect) {
	      throw new Error('Tom Select already initialized on this element');
	    }

	    input.tomselect = this; // detect rtl environment

	    var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
	    dir = computedStyle.getPropertyValue('direction'); // setup default state

	    this.settings = getSettings(input, settings);
	    this.input = input;
	    this.tabIndex = input.tabIndex || 0;
	    this.is_select_tag = input.tagName.toLowerCase() === 'select';
	    this.rtl = /rtl/i.test(dir);
	    this.inputId = getId(input, 'tomselect-' + instance_i);
	    this.isRequired = input.required; // debounce user defined load() if loadThrottle > 0

	    if (this.settings.load && this.settings.loadThrottle) {
	      this.settings.load = loadDebounce(this.settings.load, this.settings.loadThrottle);
	    } // search system


	    this.sifter = new Sifter(this.options, {
	      diacritics: this.settings.diacritics
	    });
	    this.setupOptions(this.settings.options, this.settings.optgroups);
	    delete this.settings.optgroups;
	    delete this.settings.options; // option-dependent defaults

	    this.settings.mode = this.settings.mode || (this.settings.maxItems === 1 ? 'single' : 'multi');

	    if (typeof this.settings.hideSelected !== 'boolean') {
	      this.settings.hideSelected = this.settings.mode === 'multi';
	    }

	    if (typeof this.settings.hidePlaceholder !== 'boolean') {
	      this.settings.hidePlaceholder = this.settings.mode !== 'multi';
	    } // set up createFilter callback


	    var filter = this.settings.createFilter;

	    if (typeof filter !== 'function') {
	      if (typeof filter === 'string') {
	        filter = new RegExp(filter);
	      }

	      if (filter instanceof RegExp) {
	        this.settings.createFilter = input => filter.test(input);
	      } else {
	        this.settings.createFilter = () => true;
	      }
	    }

	    this.initializePlugins(this.settings.plugins);
	    this.setupCallbacks();
	    this.setupTemplates();
	    this.setup();
	  } // methods
	  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	  /**
	   * Creates all elements and sets up event bindings.
	   *
	   */


	  setup() {
	    var self = this;
	    var settings = self.settings;
	    var wrapper;
	    var control;
	    var control_input;
	    var dropdown;
	    var dropdown_content;
	    var inputMode;
	    var classes;
	    var classes_plugins;
	    var input = self.input;
	    var control_id;
	    const passive_event = {
	      passive: true
	    };
	    const listboxId = self.inputId + '-ts-dropdown';
	    inputMode = self.settings.mode;
	    classes = input.getAttribute('class') || '';
	    wrapper = getDom('<div>');
	    addClasses(wrapper, settings.wrapperClass, classes, inputMode);
	    control = getDom('<div class="items">');
	    addClasses(control, settings.inputClass);
	    wrapper.append(control);
	    dropdown = self.render('dropdown');
	    addClasses(dropdown, settings.dropdownClass, inputMode);
	    dropdown_content = getDom(`<div style="scroll-behavior: smooth;" role="listbox" id="${listboxId}" tabindex="-1">`);
	    addClasses(dropdown_content, settings.dropdownContentClass);
	    dropdown.append(dropdown_content);
	    getDom(settings.dropdownParent || wrapper).appendChild(dropdown);

	    if (settings.controlInput) {
	      control_input = getDom(settings.controlInput);
	    } else {
	      control_input = getDom('<input type="text" autocomplete="off" size="1" />'); // set attributes

	      var attrs = ['autocorrect', 'autocapitalize', 'autocomplete'];

	      for (const attr of attrs) {
	        if (input.getAttribute(attr)) {
	          setAttr(control_input, {
	            [attr]: input.getAttribute(attr)
	          });
	        }
	      }
	    }

	    if (!settings.controlInput) {
	      control_input.tabIndex = input.disabled ? -1 : self.tabIndex;
	      control.appendChild(control_input);
	    }

	    setAttr(control_input, {
	      role: 'combobox',
	      haspopup: 'listbox',
	      'aria-expanded': 'false',
	      'aria-controls': listboxId
	    });
	    control_id = getId(control_input, self.inputId + '-tomselected');
	    let query = "label[for='" + escapeQuery(self.inputId) + "']";
	    let label = document.querySelector(query);

	    if (label) {
	      setAttr(label, {
	        for: control_id
	      });
	      let label_id = getId(label, self.inputId + '-ts-label');
	      setAttr(dropdown_content, {
	        'aria-labelledby': label_id
	      });
	    }

	    if (self.settings.copyClassesToDropdown) {
	      addClasses(dropdown, classes);
	    }

	    wrapper.style.width = input.style.width;

	    if (self.plugins.names.length) {
	      classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
	      addClasses([wrapper, dropdown], classes_plugins);
	    }

	    if ((settings.maxItems === null || settings.maxItems > 1) && self.is_select_tag) {
	      setAttr(input, {
	        multiple: 'multiple'
	      });
	    }

	    if (self.settings.placeholder) {
	      setAttr(control_input, {
	        placeholder: settings.placeholder
	      });
	    } // if splitOn was not passed in, construct it from the delimiter to allow pasting universally


	    if (!self.settings.splitOn && self.settings.delimiter) {
	      var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	      self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
	    }

	    self.control = control;
	    self.control_input = control_input;
	    self.wrapper = wrapper;
	    self.dropdown = dropdown;
	    self.dropdown_content = dropdown_content;
	    self.control_input.type = input.type;
	    addEvent(dropdown, 'mouseenter', e => {
	      var target_match = parentMatch(e.target, '[data-selectable]', dropdown);

	      if (target_match) {
	        return self.onOptionHover(e, target_match);
	      }
	    }, {
	      capture: true
	    });
	    addEvent(control, 'mousedown', evt => {
	      // retain focus by preventing native handling. if the
	      // event target is the input it should not be modified.
	      // otherwise, text selection within the input won't work.
	      if (evt.target == control_input) {
	        self.clearActiveItems();
	        evt.stopPropagation();
	        self.inputState();
	        return;
	      }

	      var target_match = parentMatch(evt.target, '.' + self.settings.itemClass, control);

	      if (target_match) {
	        return self.onItemSelect(evt, target_match);
	      }

	      return self.onMouseDown(evt);
	    });
	    addEvent(control, 'click', e => self.onClick(e));
	    addEvent(control_input, 'keydown', e => self.onKeyDown(e));
	    addEvent(control_input, 'keyup', e => self.onKeyUp(e));
	    addEvent(control_input, 'keypress', e => self.onKeyPress(e));
	    addEvent(control_input, 'resize', () => self.positionDropdown(), passive_event);
	    addEvent(control_input, 'blur', e => self.onBlur(e));
	    addEvent(control_input, 'focus', e => {
	      self.ignoreBlur = false;
	      self.onFocus(e);
	    });
	    addEvent(control_input, 'paste', e => self.onPaste(e)); // clicking anywhere in the control should not close the dropdown
	    // clicking on an option should selectit

	    var doc_mousedown = e => {
	      // if dropdownParent is set, options may not be within self.wrapper
	      var option = parentMatch(e.target, '[data-selectable]', self.dropdown); // outside of this instance

	      if (!option && !self.wrapper.contains(e.target)) {
	        if (self.isFocused) {
	          self.blur();
	        }

	        self.inputState();
	        return;
	      }

	      preventDefault(e, true);

	      if (option) {
	        self.onOptionSelect(e, option);
	      }
	    };

	    var win_scroll = () => {
	      if (self.isOpen) {
	        self.positionDropdown();
	      }
	    };

	    addEvent(document, 'mousedown', doc_mousedown);
	    addEvent(window, 'sroll', win_scroll, passive_event);
	    addEvent(window, 'resize', win_scroll, passive_event);

	    self._destroy = () => {
	      document.removeEventListener('mousedown', doc_mousedown);
	      window.removeEventListener('sroll', win_scroll);
	      window.removeEventListener('resize', win_scroll);
	    }; // store original html and tab index so that they can be
	    // restored when the destroy() method is called.


	    this.revertSettings = {
	      innerHTML: input.innerHTML,
	      tabIndex: input.tabIndex
	    };
	    input.tabIndex = -1;
	    setAttr(input, {
	      hidden: 'hidden'
	    });
	    input.insertAdjacentElement('afterend', self.wrapper);
	    self.setValue(settings.items);
	    delete settings.items;
	    addEvent(input, 'invalid', e => {
	      preventDefault(e);

	      if (!self.isInvalid) {
	        self.isInvalid = true;
	        self.refreshState();
	      }
	    });
	    self.updateOriginalInput();
	    self.refreshItems();
	    self.refreshState();
	    self.inputState();
	    self.isSetup = true;

	    if (input.disabled) {
	      self.disable();
	    }

	    self.on('change', this.onChange);
	    addClasses(input, 'tomselected');
	    self.trigger('initialize'); // preload options

	    if (settings.preload === true) {
	      self.load('');
	    }
	  }
	  /**
	   * Register options and optgroups
	   *
	   */


	  setupOptions(options = [], optgroups = []) {
	    // build options table
	    for (const option of options) {
	      this.registerOption(option);
	    } // build optgroup table


	    for (const optgroup of optgroups) {
	      this.registerOptionGroup(optgroup);
	    }
	  }
	  /**
	   * Sets up default rendering functions.
	   */


	  setupTemplates() {
	    var self = this;
	    var field_label = self.settings.labelField;
	    var field_optgroup = self.settings.optgroupLabelField;
	    var templates = {
	      'optgroup': (data, escape) => {
	        let optgroup = document.createElement('div');
	        optgroup.className = 'optgroup';
	        optgroup.appendChild(data.options);
	        return optgroup;
	      },
	      'optgroup_header': (data, escape) => {
	        return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
	      },
	      'option': (data, escape) => {
	        return '<div>' + escape(data[field_label]) + '</div>';
	      },
	      'item': (data, escape) => {
	        return '<div>' + escape(data[field_label]) + '</div>';
	      },
	      'option_create': (data, escape) => {
	        return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
	      },
	      'no_results': (data, escape) => {
	        return '<div class="no-results">No results found</div>';
	      },
	      'loading': (data, escape) => {
	        return '<div class="spinner"></div>';
	      },
	      'not_loading': () => {},
	      'dropdown': () => {
	        return '<div style="display:none"></div>';
	      }
	    };
	    self.settings.render = Object.assign({}, templates, self.settings.render);
	  }
	  /**
	   * Maps fired events to callbacks provided
	   * in the settings used when creating the control.
	   */


	  setupCallbacks() {
	    var key, fn;
	    var callbacks = {
	      'initialize': 'onInitialize',
	      'change': 'onChange',
	      'item_add': 'onItemAdd',
	      'item_remove': 'onItemRemove',
	      'clear': 'onClear',
	      'option_add': 'onOptionAdd',
	      'option_remove': 'onOptionRemove',
	      'option_clear': 'onOptionClear',
	      'optgroup_add': 'onOptionGroupAdd',
	      'optgroup_remove': 'onOptionGroupRemove',
	      'optgroup_clear': 'onOptionGroupClear',
	      'dropdown_open': 'onDropdownOpen',
	      'dropdown_close': 'onDropdownClose',
	      'type': 'onType',
	      'load': 'onLoad',
	      'focus': 'onFocus',
	      'blur': 'onBlur'
	    };

	    for (key in callbacks) {
	      fn = this.settings[callbacks[key]];
	      if (fn) this.on(key, fn);
	    }
	  }
	  /**
	   * Triggered when the main control element
	   * has a click event.
	   *
	   */


	  onClick(e) {
	    var self = this; // necessary for mobile webkit devices (manual focus triggering
	    // is ignored unless invoked within a click event)
	    // also necessary to reopen a dropdown that has been closed by
	    // closeAfterSelect

	    if (!self.isFocused || !self.isOpen) {
	      self.focus();
	      preventDefault(e);
	    }
	  }
	  /**
	   * Triggered when the main control element
	   * has a mouse down event.
	   *
	   */


	  onMouseDown(e) {
	    var self = this;

	    if (self.isFocused) {
	      if (self.settings.mode !== 'single') {
	        self.setActiveItem();
	      }

	      self.open();
	      return false;
	    } else {
	      // give control focus
	      setTimeout(() => self.focus(), 0);
	    }
	  }
	  /**
	   * Triggered when the value of the control has been changed.
	   * This should propagate the event to the original DOM
	   * input / select element.
	   */


	  onChange() {
	    triggerEvent(this.input, 'input');
	    triggerEvent(this.input, 'change');
	  }
	  /**
	   * Triggered on <input> paste.
	   *
	   */


	  onPaste(e) {
	    var self = this;

	    if (self.isFull() || self.isInputHidden || self.isLocked) {
	      preventDefault(e);
	      return;
	    } // If a regex or string is included, this will split the pasted
	    // input and create Items for each separate value


	    if (self.settings.splitOn) {
	      // Wait for pasted text to be recognized in value
	      setTimeout(() => {
	        var pastedText = self.inputValue();

	        if (!pastedText.match(self.settings.splitOn)) {
	          return;
	        }

	        var splitInput = pastedText.trim().split(self.settings.splitOn);

	        for (const piece of splitInput) {
	          self.createItem(piece);
	        }
	      }, 0);
	    }
	  }
	  /**
	   * Triggered on <input> keypress.
	   *
	   */


	  onKeyPress(e) {
	    var self = this;

	    if (self.isLocked) {
	      preventDefault(e);
	      return;
	    }

	    var character = String.fromCharCode(e.keyCode || e.which);

	    if (self.settings.create && self.settings.mode === 'multi' && character === self.settings.delimiter) {
	      self.createItem();
	      preventDefault(e);
	      return;
	    }
	  }
	  /**
	   * Triggered on <input> keydown.
	   *
	   */


	  onKeyDown(e) {
	    var self = this;

	    if (self.isLocked) {
	      if (e.keyCode !== KEY_TAB) {
	        preventDefault(e);
	      }

	      return;
	    }

	    switch (e.keyCode) {
	      // ctrl+A: select all
	      case KEY_A:
	        if (isKeyDown(KEY_SHORTCUT, e)) {
	          self.selectAll();
	          return;
	        }

	        break;
	      // esc: close dropdown

	      case KEY_ESC:
	        if (self.isOpen) {
	          preventDefault(e, true);
	          self.close();
	        }

	        self.clearActiveItems();
	        return;
	      // down: open dropdown or move selection down

	      case KEY_DOWN:
	        if (!self.isOpen && self.hasOptions) {
	          self.open();
	        } else if (self.activeOption) {
	          let next = self.getAdjacent(self.activeOption, 1);
	          if (next) self.setActiveOption(next);
	        }

	        preventDefault(e);
	        return;
	      // up: move selection up

	      case KEY_UP:
	        if (self.activeOption) {
	          let prev = self.getAdjacent(self.activeOption, -1);
	          if (prev) self.setActiveOption(prev);
	        }

	        preventDefault(e);
	        return;
	      // doc_src select active option

	      case KEY_RETURN:
	        if (self.isOpen && self.activeOption) {
	          self.onOptionSelect(e, self.activeOption);
	          preventDefault(e);
	        }

	        return;
	      // left: modifiy item selection to the left

	      case KEY_LEFT:
	        self.advanceSelection(-1, e);
	        return;
	      // right: modifiy item selection to the right

	      case KEY_RIGHT:
	        self.advanceSelection(1, e);
	        return;
	      // tab: select active option and/or create item

	      case KEY_TAB:
	        if (self.settings.selectOnTab && self.isOpen && self.activeOption) {
	          self.tab_key = true;
	          self.onOptionSelect(e, self.activeOption); // prevent default [tab] behaviour of jump to the next field
	          // if select isFull, then the dropdown won't be open and [tab] will work normally

	          preventDefault(e);
	          self.tab_key = false;
	        }

	        if (self.settings.create && self.createItem()) {
	          preventDefault(e);
	        }

	        return;
	      // delete|backspace: delete items

	      case KEY_BACKSPACE:
	      case KEY_DELETE:
	        self.deleteSelection(e);
	        return;
	    } // don't enter text in the control_input when active items are selected


	    if (self.isInputHidden && !isKeyDown(KEY_SHORTCUT, e)) {
	      preventDefault(e);
	    }
	  }
	  /**
	   * Triggered on <input> keyup.
	   *
	   */


	  onKeyUp(e) {
	    var self = this;

	    if (self.isLocked) {
	      preventDefault(e);
	      return;
	    }

	    var value = self.inputValue();

	    if (self.lastValue !== value) {
	      self.lastValue = value;

	      if (self.settings.shouldLoad.call(self, value)) {
	        self.load(value);
	      }

	      self.refreshOptions();
	      self.trigger('type', value);
	    }
	  }
	  /**
	   * Triggered on <input> focus.
	   *
	   */


	  onFocus(e) {
	    var self = this;
	    var wasFocused = self.isFocused;

	    if (self.isDisabled) {
	      self.blur();
	      preventDefault(e);
	      return;
	    }

	    if (self.ignoreFocus) return;
	    self.isFocused = true;
	    if (self.settings.preload === 'focus') self.load('');
	    if (!wasFocused) self.trigger('focus');

	    if (!self.activeItems.length) {
	      self.showInput();
	      self.setActiveItem();
	      self.refreshOptions(!!self.settings.openOnFocus);
	    }

	    self.refreshState();
	  }
	  /**
	   * Triggered on <input> blur.
	   *
	   */


	  onBlur(e) {
	    var self = this;
	    if (!self.isFocused) return;
	    self.isFocused = false;
	    self.ignoreFocus = false;

	    if (!self.ignoreBlur && document.activeElement === self.dropdown_content) {
	      // necessary to prevent IE closing the dropdown when the scrollbar is clicked
	      self.ignoreBlur = true;
	      self.onFocus(e);
	      return;
	    }

	    var deactivate = () => {
	      self.close();
	      self.setActiveItem();
	      self.setCaret(self.items.length);
	      self.trigger('blur');
	    };

	    if (self.settings.create && self.settings.createOnBlur) {
	      self.createItem(null, false, deactivate);
	    } else {
	      deactivate();
	    }
	  }
	  /**
	   * Triggered when the user rolls over
	   * an option in the autocomplete dropdown menu.
	   * @deprecated v1.3
	   */


	  onOptionHover(evt, option) {}
	  /**
	   * Triggered when the user clicks on an option
	   * in the autocomplete dropdown menu.
	   *
	   */


	  onOptionSelect(evt, option) {
	    var value,
	        self = this;

	    if (!option) {
	      return;
	    } // should not be possible to trigger a option under a disabled optgroup


	    if (option.parentElement && option.parentElement.matches('[data-disabled]')) {
	      return;
	    }

	    if (option.classList.contains('create')) {
	      self.createItem(null, true, () => {
	        if (self.settings.closeAfterSelect) {
	          self.close();
	        }
	      });
	    } else {
	      value = option.dataset.value;

	      if (typeof value !== 'undefined') {
	        self.lastQuery = null;
	        self.addItem(value);

	        if (self.settings.closeAfterSelect) {
	          self.close();
	        } else if (!self.settings.hideSelected && evt.type && /mouse/.test(evt.type)) {
	          self.setActiveOption(self.getOption(value));
	        }
	      }
	    }
	  }
	  /**
	   * Triggered when the user clicks on an item
	   * that has been selected.
	   *
	   */


	  onItemSelect(evt, item) {
	    var self = this;
	    if (self.isLocked) return;

	    if (self.settings.mode === 'multi') {
	      preventDefault(evt);
	      self.setActiveItem(item, evt);
	    }
	  }
	  /**
	   * Invokes the user-provided option provider / loader.
	   *
	   */


	  load(value) {
	    var self = this;
	    var fn = self.settings.load;
	    if (!fn) return;
	    if (self.loadedSearches.hasOwnProperty(value)) return;
	    addClasses(self.wrapper, self.settings.loadingClass);
	    self.loading++;
	    fn.call(self, value, function (options, optgroups) {
	      self.loading = Math.max(self.loading - 1, 0);
	      self.lastQuery = null;
	      self.clearActiveOption(); // when new results load, focus should be on first option

	      self.setupOptions(options, optgroups);
	      self.refreshOptions(self.isFocused && !self.isInputHidden);

	      if (!self.loading) {
	        removeClasses(self.wrapper, self.settings.loadingClass);
	      }

	      self.trigger('load', options, optgroups);
	    });
	  }
	  /**
	   * @deprecated 1.1
	   *
	   */


	  onSearchChange(value) {
	    this.load(value);
	  }
	  /**
	   * Sets the input field of the control to the specified value.
	   *
	   */


	  setTextboxValue(value = '') {
	    var input = this.control_input;
	    var changed = input.value !== value;

	    if (changed) {
	      input.value = value;
	      triggerEvent(input, 'update');
	      this.lastValue = value;
	    }
	  }
	  /**
	   * Returns the value of the control. If multiple items
	   * can be selected (e.g. <select multiple>), this returns
	   * an array. If only one item can be selected, this
	   * returns a string.
	   *
	   */


	  getValue() {
	    if (this.is_select_tag && this.input.hasAttribute('multiple')) {
	      return this.items;
	    }

	    return this.items.join(this.settings.delimiter);
	  }
	  /**
	   * Resets the selected items to the given value.
	   *
	   */


	  setValue(value, silent) {
	    var events = silent ? [] : ['change'];
	    debounce_events(this, events, () => {
	      this.clear(silent);
	      this.addItems(value, silent);
	    });
	  }
	  /**
	   * Resets the number of max items to the given value
	   *
	   */


	  setMaxItems(value) {
	    if (value === 0) value = null; //reset to unlimited items.

	    this.settings.maxItems = value;
	    this.refreshState();
	  }
	  /**
	   * Sets the selected item.
	   *
	   */


	  setActiveItem(item, e) {
	    var self = this;
	    var eventName;
	    var i, begin, end, swap;
	    var last;
	    if (self.settings.mode === 'single') return; // clear the active selection

	    if (!item) {
	      self.clearActiveItems();

	      if (self.isFocused) {
	        self.showInput();
	      }

	      return;
	    } // modify selection


	    eventName = e && e.type.toLowerCase();

	    if (eventName === 'mousedown' && isKeyDown('shiftKey', e) && self.activeItems.length) {
	      last = self.getLastActive();
	      begin = Array.prototype.indexOf.call(self.control.children, last);
	      end = Array.prototype.indexOf.call(self.control.children, item);

	      if (begin > end) {
	        swap = begin;
	        begin = end;
	        end = swap;
	      }

	      for (i = begin; i <= end; i++) {
	        item = self.control.children[i];

	        if (self.activeItems.indexOf(item) === -1) {
	          self.setActiveItemClass(item);
	        }
	      }

	      preventDefault(e);
	    } else if (eventName === 'mousedown' && isKeyDown(KEY_SHORTCUT, e) || eventName === 'keydown' && isKeyDown('shiftKey', e)) {
	      if (item.classList.contains('active')) {
	        self.removeActiveItem(item);
	      } else {
	        self.setActiveItemClass(item);
	      }
	    } else {
	      self.clearActiveItems();
	      self.setActiveItemClass(item);
	    } // ensure control has focus


	    self.hideInput();

	    if (!self.isFocused) {
	      self.focus();
	    }
	  }
	  /**
	   * Set the active and last-active classes
	   *
	   */


	  setActiveItemClass(item) {
	    var last_active = this.control.querySelector('.last-active');
	    if (last_active) removeClasses(last_active, 'last-active');
	    addClasses(item, 'active last-active');

	    if (this.activeItems.indexOf(item) == -1) {
	      this.activeItems.push(item);
	    }
	  }
	  /**
	   * Remove active item
	   *
	   */


	  removeActiveItem(item) {
	    var idx = this.activeItems.indexOf(item);
	    this.activeItems.splice(idx, 1);
	    removeClasses(item, 'active');
	  }
	  /**
	   * Clears all the active items
	   *
	   */


	  clearActiveItems() {
	    removeClasses(this.activeItems, 'active');
	    this.activeItems = [];
	  }
	  /**
	   * Sets the selected item in the dropdown menu
	   * of available options.
	   *
	   */


	  setActiveOption(option) {
	    var height_menu, height_item, y;

	    if (option === this.activeOption) {
	      return;
	    }

	    this.clearActiveOption();
	    if (!option) return;
	    this.activeOption = option;
	    setAttr(this.control_input, {
	      'aria-activedescendant': option.getAttribute('id')
	    });
	    setAttr(option, {
	      'aria-selected': 'true'
	    });
	    addClasses(option, 'active');
	    height_menu = this.dropdown_content.clientHeight;
	    let scrollTop = this.dropdown_content.scrollTop || 0;
	    height_item = this.activeOption.offsetHeight;
	    y = this.activeOption.getBoundingClientRect().top - this.dropdown_content.getBoundingClientRect().top + scrollTop;

	    if (y + height_item > height_menu + scrollTop) {
	      this.dropdown_content.scrollTop = y - height_menu + height_item;
	    } else if (y < scrollTop) {
	      this.dropdown_content.scrollTop = y;
	    }
	  }
	  /**
	   * Clears the active option
	   *
	   */


	  clearActiveOption() {
	    if (this.activeOption) {
	      removeClasses(this.activeOption, 'active');
	      this.activeOption.removeAttribute('aria-selected');
	    }

	    this.activeOption = null;
	    this.control_input.removeAttribute('aria-activedescendant');
	  }
	  /**
	   * Selects all items (CTRL + A).
	   */


	  selectAll() {
	    if (this.settings.mode === 'single') return;
	    this.activeItems = this.controlChildren();

	    if (this.activeItems.length) {
	      addClasses(this.activeItems, 'active');
	      this.hideInput();
	      this.close();
	    }

	    this.focus();
	  }
	  /**
	   * Determines if the control_input should be in a hidden or visible state
	   *
	   */


	  inputState() {
	    var self = this;
	    if (self.settings.controlInput) return;

	    if (self.activeItems.length > 0 || !self.isFocused && this.settings.hidePlaceholder && self.items.length > 0) {
	      self.setTextboxValue();
	      self.isInputHidden = true;
	      addClasses(self.wrapper, 'input-hidden');
	    } else {
	      self.isInputHidden = false;
	      removeClasses(self.wrapper, 'input-hidden');
	    }
	  }
	  /**
	   * Hides the input element out of view, while
	   * retaining its focus.
	   * @deprecated 1.3
	   */


	  hideInput() {
	    this.inputState();
	  }
	  /**
	   * Restores input visibility.
	   * @deprecated 1.3
	   */


	  showInput() {
	    this.inputState();
	  }
	  /**
	   * Get the input value
	   */


	  inputValue() {
	    return this.control_input.value.trim();
	  }
	  /**
	   * Gives the control focus.
	   */


	  focus() {
	    var self = this;
	    if (self.isDisabled) return;
	    self.ignoreFocus = true;
	    self.control_input.focus();
	    setTimeout(() => {
	      self.ignoreFocus = false;
	      self.onFocus();
	    }, 0);
	  }
	  /**
	   * Forces the control out of focus.
	   *
	   */


	  blur() {
	    this.control_input.blur();
	    this.onBlur(null);
	  }
	  /**
	   * Returns a function that scores an object
	   * to show how good of a match it is to the
	   * provided query.
	   *
	   * @return {function}
	   */


	  getScoreFunction(query) {
	    return this.sifter.getScoreFunction(query, this.getSearchOptions());
	  }
	  /**
	   * Returns search options for sifter (the system
	   * for scoring and sorting results).
	   *
	   * @see https://github.com/brianreavis/sifter.js
	   * @return {object}
	   */


	  getSearchOptions() {
	    var sort;
	    var settings = this.settings;

	    if (typeof settings.sortField === 'string') {
	      sort = [{
	        field: settings.sortField
	      }];
	    }

	    return {
	      fields: settings.searchField,
	      conjunction: settings.searchConjunction,
	      sort: sort,
	      nesting: settings.nesting
	    };
	  }
	  /**
	   * Searches through available options and returns
	   * a sorted array of matches.
	   *
	   */


	  search(query) {
	    var i, result, calculateScore;
	    var self = this;
	    var settings = self.settings;
	    var options = this.getSearchOptions(); // validate user-provided result scoring function

	    if (settings.score) {
	      calculateScore = self.settings.score.call(self, query);

	      if (typeof calculateScore !== 'function') {
	        throw new Error('Tom Select "score" setting must be a function that returns a function');
	      }
	    } // perform search


	    if (query !== self.lastQuery) {
	      self.lastQuery = query;
	      result = self.sifter.search(query, Object.assign(options, {
	        score: calculateScore
	      }));
	      self.currentResults = result;
	    } else {
	      result = Object.assign({}, self.currentResults);
	    } // filter out selected items


	    if (settings.hideSelected) {
	      for (i = result.items.length - 1; i >= 0; i--) {
	        if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
	          result.items.splice(i, 1);
	        }
	      }
	    }

	    return result;
	  }
	  /**
	   * Refreshes the list of available options shown
	   * in the autocomplete dropdown menu.
	   *
	   */


	  refreshOptions(triggerDropdown = true) {
	    var i, j, k, n, groups_order, optgroup, optgroups, html, has_create_option;
	    var active, create;
	    var groups;
	    var self = this;
	    var query = self.inputValue();
	    var results = self.search(query);
	    var active_before_hash = self.activeOption && hash_key(self.activeOption.dataset.value);
	    var show_dropdown = self.settings.shouldOpen || false; // build markup

	    n = results.items.length;

	    if (typeof self.settings.maxOptions === 'number') {
	      n = Math.min(n, self.settings.maxOptions);
	    }

	    if (n > 0) {
	      show_dropdown = true;
	    } // render and group available options individually


	    groups = {};
	    groups_order = [];

	    for (i = 0; i < n; i++) {
	      // get option dom element, don't re-render if we
	      let option = self.options[results.items[i].id];
	      let opt_value = hash_key(option[self.settings.valueField]);
	      let option_el = self.getOption(opt_value);

	      if (!option_el) {
	        option_el = self.render('option', option);
	      } // toggle 'selected' class


	      if (!self.settings.hideSelected) {
	        option_el.classList.toggle('selected', self.items.includes(opt_value));
	      }

	      optgroup = option[self.settings.optgroupField] || '';
	      optgroups = Array.isArray(optgroup) ? optgroup : [optgroup];

	      for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
	        optgroup = optgroups[j];

	        if (!self.optgroups.hasOwnProperty(optgroup)) {
	          optgroup = '';
	        }

	        if (!groups.hasOwnProperty(optgroup)) {
	          groups[optgroup] = document.createDocumentFragment();
	          groups_order.push(optgroup);
	        } // a child could only have one parent, so if you have more parents clone the child


	        if (j > 0) {
	          option_el = option_el.cloneNode(true);
	          removeClasses(option_el, 'active');
	          option_el.removeAttribute('aria-selected');
	        }

	        groups[optgroup].appendChild(option_el);
	      }
	    } // sort optgroups


	    if (this.settings.lockOptgroupOrder) {
	      groups_order.sort((a, b) => {
	        var a_order = self.optgroups[a] && self.optgroups[a].$order || 0;
	        var b_order = self.optgroups[b] && self.optgroups[b].$order || 0;
	        return a_order - b_order;
	      });
	    } // render optgroup headers & join groups


	    html = document.createDocumentFragment();

	    for (optgroup of groups_order) {
	      if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].children.length) {
	        let group_options = document.createDocumentFragment();
	        group_options.appendChild(self.render('optgroup_header', self.optgroups[optgroup]));
	        group_options.appendChild(groups[optgroup]);
	        let group_html = self.render('optgroup', {
	          group: self.optgroups[optgroup],
	          options: group_options
	        });
	        html.appendChild(group_html);
	      } else {
	        html.appendChild(groups[optgroup]);
	      }
	    }

	    self.dropdown_content.innerHTML = '';
	    self.dropdown_content.appendChild(html); // highlight matching terms inline

	    if (self.settings.highlight) {
	      removeHighlight(self.dropdown_content);

	      if (results.query.length && results.tokens.length) {
	        for (const tok of results.tokens) {
	          highlight(self.dropdown_content, tok.regex);
	        }
	      }
	    } // helper method for adding templates to dropdown


	    var add_template = template => {
	      let content = self.render(template, {
	        input: query
	      });

	      if (content) {
	        show_dropdown = true;
	        self.dropdown_content.insertBefore(content, self.dropdown_content.firstChild);
	      }

	      return content;
	    }; // invalid query


	    if (!self.settings.shouldLoad.call(self, query)) {
	      add_template('not_loading'); // add loading message
	    } else if (self.loading) {
	      add_template('loading'); // add no_results message
	    } else if (results.items.length === 0) {
	      add_template('no_results');
	    } // add create option


	    has_create_option = self.canCreate(query);

	    if (has_create_option) {
	      create = add_template('option_create');
	    } // activate


	    self.hasOptions = results.items.length > 0 || has_create_option;

	    if (show_dropdown) {
	      if (results.items.length > 0) {
	        active = active_before_hash && self.getOption(active_before_hash);

	        if (!active || !self.dropdown_content.contains(active)) {
	          let active_index = 0;

	          if (create && !self.settings.addPrecedence) {
	            active_index = 1;
	          }

	          active = self.selectable()[active_index];
	        }
	      } else {
	        active = create;
	      }

	      self.setActiveOption(active);

	      if (triggerDropdown && !self.isOpen) {
	        self.open();
	      }
	    } else {
	      self.clearActiveOption();

	      if (triggerDropdown && self.isOpen) {
	        self.close();
	      }
	    }
	  }
	  /**
	   * Return list of selectable options
	   *
	   */


	  selectable() {
	    return this.dropdown_content.querySelectorAll('[data-selectable]');
	  }
	  /**
	   * Adds an available option. If it already exists,
	   * nothing will happen. Note: this does not refresh
	   * the options list dropdown (use `refreshOptions`
	   * for that).
	   *
	   * Usage:
	   *
	   *   this.addOption(data)
	   *
	   */


	  addOption(data) {
	    var value,
	        self = this;

	    if (Array.isArray(data)) {
	      for (const dat of data) {
	        self.addOption(dat);
	      }

	      return;
	    }

	    if (value = self.registerOption(data)) {
	      self.userOptions[value] = true;
	      self.lastQuery = null;
	      self.trigger('option_add', value, data);
	    }
	  }
	  /**
	   * Registers an option to the pool of options.
	   *
	   */


	  registerOption(data) {
	    var key = hash_key(data[this.settings.valueField]);
	    if (key === null || this.options.hasOwnProperty(key)) return false;
	    data.$order = data.$order || ++this.order;
	    data.$id = this.inputId + '-opt-' + this.options_i++;
	    this.options[key] = data;
	    return key;
	  }
	  /**
	   * Registers an option group to the pool of option groups.
	   *
	   * @return {boolean|string}
	   */


	  registerOptionGroup(data) {
	    var key = hash_key(data[this.settings.optgroupValueField]);
	    if (key === null) return false;
	    data.$order = data.$order || ++this.order;
	    this.optgroups[key] = data;
	    return key;
	  }
	  /**
	   * Registers a new optgroup for options
	   * to be bucketed into.
	   *
	   */


	  addOptionGroup(id, data) {
	    var hashed_id;
	    data[this.settings.optgroupValueField] = id;

	    if (hashed_id = this.registerOptionGroup(data)) {
	      this.trigger('optgroup_add', hashed_id, data);
	    }
	  }
	  /**
	   * Removes an existing option group.
	   *
	   */


	  removeOptionGroup(id) {
	    if (this.optgroups.hasOwnProperty(id)) {
	      delete this.optgroups[id];
	      this.clearCache();
	      this.trigger('optgroup_remove', id);
	    }
	  }
	  /**
	   * Clears all existing option groups.
	   */


	  clearOptionGroups() {
	    this.optgroups = {};
	    this.clearCache();
	    this.trigger('optgroup_clear');
	  }
	  /**
	   * Updates an option available for selection. If
	   * it is visible in the selected items or options
	   * dropdown, it will be re-rendered automatically.
	   *
	   */


	  updateOption(value, data) {
	    var self = this;
	    var item, item_new;
	    var value_new, index_item, cache_items, cache_options, order_old;
	    value = hash_key(value);
	    value_new = hash_key(data[self.settings.valueField]); // sanity checks

	    if (value === null) return;
	    if (!self.options.hasOwnProperty(value)) return;
	    if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
	    order_old = self.options[value].$order; // update references

	    if (value_new !== value) {
	      delete self.options[value];
	      index_item = self.items.indexOf(value);

	      if (index_item !== -1) {
	        self.items.splice(index_item, 1, value_new);
	      }
	    }

	    data.$order = data.$order || order_old;
	    self.options[value_new] = data; // invalidate render cache

	    cache_items = self.renderCache['item'];
	    cache_options = self.renderCache['option'];

	    if (cache_items) {
	      delete cache_items[value];
	      delete cache_items[value_new];
	    }

	    if (cache_options) {
	      delete cache_options[value];
	      delete cache_options[value_new];
	    } // update the item if it's selected


	    if (self.items.indexOf(value_new) !== -1) {
	      item = self.getItem(value);
	      item_new = self.render('item', data);
	      if (item.classList.contains('active')) addClasses(item_new, 'active');
	      item.parentNode.insertBefore(item_new, item);
	      item.remove();
	    } // invalidate last query because we might have updated the sortField


	    self.lastQuery = null; // update dropdown contents

	    if (self.isOpen) {
	      self.refreshOptions(false);
	    }
	  }
	  /**
	   * Removes a single option.
	   *
	   */


	  removeOption(value, silent) {
	    var self = this;
	    value = hash_key(value);
	    var cache_items = self.renderCache['item'];
	    var cache_options = self.renderCache['option'];
	    if (cache_items) delete cache_items[value];
	    if (cache_options) delete cache_options[value];
	    delete self.userOptions[value];
	    delete self.options[value];
	    self.lastQuery = null;
	    self.trigger('option_remove', value);
	    self.removeItem(value, silent);
	  }
	  /**
	   * Clears all options.
	   */


	  clearOptions() {
	    this.loadedSearches = {};
	    this.userOptions = {};
	    this.clearCache();
	    var selected = {};

	    for (let key in this.options) {
	      if (this.options.hasOwnProperty(key) && this.items.indexOf(key) >= 0) {
	        selected[key] = this.options[key];
	      }
	    }

	    this.options = this.sifter.items = selected;
	    this.lastQuery = null;
	    this.trigger('option_clear');
	  }
	  /**
	   * Returns the dom element of the option
	   * matching the given value.
	   *
	   * @returns {object}
	   */


	  getOption(value) {
	    // cached ?
	    if (this.renderCache['option'].hasOwnProperty(value)) {
	      return this.renderCache['option'][value];
	    } // from existing dropdown menu dom


	    return this.getElementWithValue(value, this.selectable());
	  }
	  /**
	   * Returns the dom element of the next or previous dom element of the same type
	   * Note: adjacent options may not be adjacent DOM elements (optgroups)
	   *
	   */


	  getAdjacent(option, direction, type = 'option') {
	    var self = this,
	        all;

	    if (!option) {
	      return;
	    }

	    if (type == 'item') {
	      all = self.controlChildren();
	    } else {
	      all = self.dropdown_content.querySelectorAll('[data-selectable]');
	    }

	    for (let i = 0; i < all.length; i++) {
	      if (all[i] != option) {
	        continue;
	      }

	      if (direction > 0) {
	        return all[i + 1];
	      }

	      return all[i - 1];
	    }
	  }
	  /**
	   * Finds the first element with a "data-value" attribute
	   * that matches the given value.
	   *
	   */


	  getElementWithValue(value, els) {
	    value = hash_key(value);

	    if (value !== null) {
	      for (const node of els) {
	        let el = node;

	        if (el.getAttribute('data-value') === value) {
	          return el;
	        }
	      }
	    }
	  }
	  /**
	   * Returns the dom element of the item
	   * matching the given value.
	   *
	   */


	  getItem(value) {
	    return this.getElementWithValue(value, this.control.children);
	  }
	  /**
	   * "Selects" multiple items at once. Adds them to the list
	   * at the current caret position.
	   *
	   */


	  addItems(values, silent) {
	    var self = this;
	    self.buffer = document.createDocumentFragment();

	    for (const child of self.control.children) {
	      self.buffer.appendChild(child);
	    }

	    var items = Array.isArray(values) ? values : [values];
	    items = items.filter(x => self.items.indexOf(x) === -1);

	    for (let i = 0, n = items.length; i < n; i++) {
	      self.isPending = i < n - 1;
	      self.addItem(items[i], silent);
	    }

	    var control = self.control;
	    control.insertBefore(self.buffer, control.firstChild);
	    self.buffer = null;
	  }
	  /**
	   * "Selects" an item. Adds it to the list
	   * at the current caret position.
	   *
	   */


	  addItem(value, silent) {
	    var events = silent ? [] : ['change'];
	    debounce_events(this, events, () => {
	      var item;
	      var self = this;
	      var inputMode = self.settings.mode;
	      var wasFull;
	      value = hash_key(value);

	      if (self.items.indexOf(value) !== -1) {
	        if (inputMode === 'single') {
	          self.close();
	        }

	        if (inputMode === 'single' || !self.settings.duplicates) {
	          return;
	        }
	      }

	      if (!self.options.hasOwnProperty(value)) return;
	      if (inputMode === 'single') self.clear(silent);
	      if (inputMode === 'multi' && self.isFull()) return;
	      item = self.render('item', self.options[value]);

	      if (self.control.contains(item)) {
	        // duplicates
	        item = item.cloneNode(true);
	      }

	      wasFull = self.isFull();
	      self.items.splice(self.caretPos, 0, value);
	      self.insertAtCaret(item);

	      if (self.isSetup) {
	        let options = self.selectable(); // update menu / remove the option (if this is not one item being added as part of series)

	        if (!self.isPending) {
	          let option = self.getOption(value);
	          let next = self.getAdjacent(option, 1);
	          self.refreshOptions(self.isFocused && inputMode !== 'single');

	          if (next) {
	            self.setActiveOption(next);
	          }
	        } // hide the menu if the maximum number of items have been selected or no options are left


	        if (!options.length || self.isFull()) {
	          self.close();
	        } else if (!self.isPending) {
	          self.positionDropdown();
	        }

	        self.trigger('item_add', value, item);

	        if (!self.isPending) {
	          self.updateOriginalInput({
	            silent: silent
	          });
	        }
	      }

	      if (!self.isPending || !wasFull && self.isFull()) {
	        self.refreshState();
	      }
	    });
	  }
	  /**
	   * Removes the selected item matching
	   * the provided value.
	   *
	   */


	  removeItem(value, silent) {
	    var i,
	        idx,
	        self = this;
	    var item = self.getItem(value);
	    if (!item) return;
	    value = hash_key(item.dataset.value);
	    i = self.items.indexOf(value);

	    if (i !== -1) {
	      item.remove();

	      if (item.classList.contains('active')) {
	        idx = self.activeItems.indexOf(item);
	        self.activeItems.splice(idx, 1);
	        removeClasses(item, 'active');
	      }

	      self.items.splice(i, 1);
	      self.lastQuery = null;

	      if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
	        self.removeOption(value, silent);
	      }

	      if (i < self.caretPos) {
	        self.setCaret(self.caretPos - 1);
	      }

	      self.updateOriginalInput({
	        silent: silent
	      });
	      self.refreshState();
	      self.positionDropdown();
	      self.trigger('item_remove', value, item);
	    }
	  }
	  /**
	   * Invokes the `create` method provided in the
	   * TomSelect options that should provide the data
	   * for the new item, given the user input.
	   *
	   * Once this completes, it will be added
	   * to the item list.
	   *
	   */


	  createItem(input, triggerDropdown = true, callback) {
	    var self = this;
	    var caret = self.caretPos;
	    var output;
	    input = input || self.inputValue();
	    if (typeof callback !== 'function') callback = () => {};

	    if (!self.canCreate(input)) {
	      callback();
	      return false;
	    }

	    self.lock();
	    var created = false;

	    var create = data => {
	      self.unlock();
	      if (!data || typeof data !== 'object') return callback();
	      var value = hash_key(data[self.settings.valueField]);

	      if (typeof value !== 'string') {
	        return callback();
	      }

	      self.setTextboxValue();
	      self.addOption(data);
	      self.setCaret(caret);
	      self.addItem(value);
	      self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
	      callback(data);
	      created = true;
	    };

	    if (typeof self.settings.create === 'function') {
	      output = self.settings.create.call(this, input, create);
	    } else {
	      output = {
	        [self.settings.labelField]: input,
	        [self.settings.valueField]: input
	      };
	    }

	    if (!created) {
	      create(output);
	    }

	    return true;
	  }
	  /**
	   * Re-renders the selected item lists.
	   */


	  refreshItems() {
	    var self = this;
	    self.lastQuery = null;

	    if (self.isSetup) {
	      self.addItems(self.items);
	    }

	    self.updateOriginalInput();
	    self.refreshState();
	  }
	  /**
	   * Updates all state-dependent attributes
	   * and CSS classes.
	   */


	  refreshState() {
	    var self = this;
	    self.refreshValidityState();
	    var isFull = self.isFull();
	    var isLocked = self.isLocked;
	    self.wrapper.classList.toggle('rtl', self.rtl);
	    var classList = self.control.classList;
	    classList.toggle('focus', self.isFocused);
	    classList.toggle('disabled', self.isDisabled);
	    classList.toggle('required', self.isRequired);
	    classList.toggle('invalid', self.isInvalid);
	    classList.toggle('locked', isLocked);
	    classList.toggle('full', isFull);
	    classList.toggle('not-full', !isFull);
	    classList.toggle('input-active', self.isFocused && !self.isInputHidden);
	    classList.toggle('dropdown-active', self.isOpen);
	    classList.toggle('has-options', isEmptyObject(self.options));
	    classList.toggle('has-items', self.items.length > 0);
	  }
	  /**
	   * Update the `required` attribute of both input and control input.
	   *
	   * The `required` property needs to be activated on the control input
	   * for the error to be displayed at the right place. `required` also
	   * needs to be temporarily deactivated on the input since the input is
	   * hidden and can't show errors.
	   */


	  refreshValidityState() {
	    var self = this;

	    if (!self.input.checkValidity) {
	      return;
	    } // if required, make sure the input required attribute = true so checkValidity() will work


	    if (this.isRequired) {
	      self.input.required = true;
	    }

	    var invalid = !self.input.checkValidity();
	    self.isInvalid = invalid;
	    self.control_input.required = invalid;

	    if (this.isRequired) {
	      self.input.required = !invalid;
	    }
	  }
	  /**
	   * Determines whether or not more items can be added
	   * to the control without exceeding the user-defined maximum.
	   *
	   * @returns {boolean}
	   */


	  isFull() {
	    return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
	  }
	  /**
	   * Refreshes the original <select> or <input>
	   * element to reflect the current state.
	   *
	   */


	  updateOriginalInput(opts = {}) {
	    var i,
	        value,
	        option,
	        self = this;

	    if (self.is_select_tag) {
	      // remove selected attribute from options whose values are not in self.items
	      self.input.querySelectorAll('option[selected]').forEach(option => {
	        if (self.items.indexOf(option.value) == -1) {
	          option.removeAttribute('selected');
	        }
	      }); // order selected <option> tags for values in self.items

	      for (i = self.items.length - 1; i >= 0; i--) {
	        value = self.items[i];
	        var option = self.options[value].$option;

	        if (!option) {
	          const label = self.options[value][self.settings.labelField] || '';
	          option = getDom('<option value="' + escape_html(value) + '">' + escape_html(label) + '</option>');
	          self.options[value].$option = option;
	        }

	        setAttr(option, {
	          selected: 'true'
	        });
	        self.input.prepend(option);
	      }
	    } else {
	      self.input.value = self.getValue();
	    }

	    if (self.isSetup) {
	      if (!opts.silent) {
	        self.trigger('change', self.getValue());
	      }
	    }
	  }
	  /**
	   * Shows the autocomplete dropdown containing
	   * the available options.
	   */


	  open() {
	    var self = this;
	    if (self.isLocked || self.isOpen || self.settings.mode === 'multi' && self.isFull()) return;
	    self.isOpen = true;
	    setAttr(self.control_input, {
	      'aria-expanded': 'true'
	    });
	    self.refreshState();
	    applyCSS(self.dropdown, {
	      visibility: 'hidden',
	      display: 'block'
	    });
	    self.positionDropdown();
	    applyCSS(self.dropdown, {
	      visibility: 'visible',
	      display: 'block'
	    });
	    self.focus();
	    self.trigger('dropdown_open', self.dropdown);
	  }
	  /**
	   * Closes the autocomplete dropdown menu.
	   */


	  close() {
	    var self = this;
	    var trigger = self.isOpen;

	    if (self.settings.mode === 'single' && self.items.length) {
	      self.hideInput(); // Do not trigger blur while inside a blur event,
	      // this fixes some weird tabbing behavior in FF and IE.
	      // See #selectize.js#1164

	      if (!self.tab_key) {
	        self.blur(); // close keyboard on iOS
	      }
	    }

	    self.isOpen = false;
	    setAttr(self.control_input, {
	      'aria-expanded': 'false'
	    });
	    applyCSS(self.dropdown, {
	      display: 'none'
	    });
	    self.clearActiveOption();
	    self.refreshState();
	    self.setTextboxValue();
	    if (trigger) self.trigger('dropdown_close', self.dropdown);
	  }
	  /**
	   * Calculates and applies the appropriate
	   * position of the dropdown if dropdownParent = 'body'.
	   * Otherwise, position is determined by css
	   */


	  positionDropdown() {
	    if (this.settings.dropdownParent !== 'body') {
	      return;
	    }

	    var context = this.control;
	    var rect = context.getBoundingClientRect();
	    var top = context.offsetHeight + rect.top + window.scrollY;
	    var left = rect.left + window.scrollX;
	    applyCSS(this.dropdown, {
	      width: rect.width + 'px',
	      top: top + 'px',
	      left: left + 'px'
	    });
	  }
	  /**
	   * Resets / clears all selected items
	   * from the control.
	   *
	   */


	  clear(silent) {
	    var self = this;
	    if (!self.items.length) return;
	    var items = self.controlChildren();

	    for (const item of items) {
	      item.remove();
	    }

	    self.items = [];
	    self.lastQuery = null;
	    self.setCaret(0);
	    self.setActiveItem();
	    self.updateOriginalInput({
	      silent: silent
	    });
	    self.refreshState();
	    self.showInput();
	    self.trigger('clear');
	  }
	  /**
	   * A helper method for inserting an element
	   * at the current caret position.
	   *
	   */


	  insertAtCaret(el) {
	    var self = this;
	    var caret = Math.min(self.caretPos, self.items.length);
	    var target = self.buffer || self.control;

	    if (caret === 0) {
	      target.insertBefore(el, target.firstChild);
	    } else {
	      target.insertBefore(el, target.children[caret]);
	    }

	    self.setCaret(caret + 1);
	  }
	  /**
	   * Removes the current selected item(s).
	   *
	   */


	  deleteSelection(e) {
	    var direction, selection, values, caret, tail;
	    var self = this;
	    direction = e && e.keyCode === KEY_BACKSPACE ? -1 : 1;
	    selection = getSelection(self.control_input); // determine items that will be removed

	    values = [];

	    if (self.activeItems.length) {
	      tail = getTail(self.activeItems, direction);
	      caret = nodeIndex(tail);

	      if (direction > 0) {
	        caret++;
	      }

	      for (const item of self.activeItems) {
	        values.push(item.dataset.value);
	      }
	    } else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
	      if (direction < 0 && selection.start === 0 && selection.length === 0) {
	        values.push(self.items[self.caretPos - 1]);
	      } else if (direction > 0 && selection.start === self.inputValue().length) {
	        values.push(self.items[self.caretPos]);
	      }
	    } // allow the callback to abort


	    if (!values.length || typeof self.settings.onDelete === 'function' && self.settings.onDelete.call(self, values, e) === false) {
	      return false;
	    }

	    preventDefault(e, true); // perform removal

	    if (typeof caret !== 'undefined') {
	      self.setCaret(caret);
	    }

	    while (values.length) {
	      self.removeItem(values.pop());
	    }

	    self.showInput();
	    self.positionDropdown();
	    self.refreshOptions(false);
	    return true;
	  }
	  /**
	   * Selects the previous / next item (depending on the `direction` argument).
	   *
	   * > 0 - right
	   * < 0 - left
	   *
	   */


	  advanceSelection(direction, e) {
	    var idx,
	        last_active,
	        adjacent,
	        self = this;
	    if (self.rtl) direction *= -1;
	    if (self.inputValue().length) return; // add or remove to active items

	    if (isKeyDown(KEY_SHORTCUT, e) || isKeyDown('shiftKey', e)) {
	      last_active = self.getLastActive(direction);

	      if (last_active) {
	        if (!last_active.classList.contains('active')) {
	          adjacent = last_active;
	        } else {
	          adjacent = self.getAdjacent(last_active, direction, 'item');
	        } // if no active item, get items adjacent to the control input

	      } else if (direction > 0) {
	        adjacent = self.control_input.nextElementSibling;
	      } else {
	        adjacent = self.control_input.previousElementSibling;
	      }

	      if (adjacent) {
	        if (adjacent.classList.contains('active')) {
	          self.removeActiveItem(last_active);
	        }

	        self.setActiveItemClass(adjacent); // mark as last_active !! after removeActiveItem() on last_active
	      } // move caret to the left or right

	    } else if (self.isFocused && !self.activeItems.length) {
	      self.setCaret(self.caretPos + direction); // move caret before or after selected items
	    } else {
	      last_active = self.getLastActive(direction);

	      if (last_active) {
	        idx = nodeIndex(last_active);
	        self.setCaret(direction > 0 ? idx + 1 : idx);
	        self.setActiveItem();
	      }
	    }
	  }
	  /**
	   * Get the last active item
	   *
	   */


	  getLastActive(direction) {
	    let last_active = this.control.querySelector('.last-active');

	    if (last_active) {
	      return last_active;
	    }

	    var result = this.control.querySelectorAll('.active');

	    if (result) {
	      return getTail(result, direction);
	    }
	  }
	  /**
	   * Moves the caret to the specified index.
	   *
	   * The input must be moved by leaving it in place and moving the
	   * siblings, due to the fact that focus cannot be restored once lost
	   * on mobile webkit devices
	   *
	   */


	  setCaret(new_pos) {
	    var self = this;

	    if (self.settings.mode === 'single' || self.settings.controlInput) {
	      new_pos = self.items.length;
	    } else {
	      new_pos = Math.max(0, Math.min(self.items.length, new_pos));

	      if (new_pos != self.caretPos && !self.isPending) {
	        self.controlChildren().forEach((child, j) => {
	          if (j < new_pos) {
	            self.control_input.insertAdjacentElement('beforebegin', child);
	          } else {
	            self.control.appendChild(child);
	          }
	        });
	      }
	    }

	    self.caretPos = new_pos;
	  }
	  /**
	   * Return list of item dom elements
	   *
	   */


	  controlChildren() {
	    return Array.from(this.control.getElementsByClassName(this.settings.itemClass));
	  }
	  /**
	   * Disables user input on the control. Used while
	   * items are being asynchronously created.
	   */


	  lock() {
	    this.close();
	    this.isLocked = true;
	    this.refreshState();
	  }
	  /**
	   * Re-enables user input on the control.
	   */


	  unlock() {
	    this.isLocked = false;
	    this.refreshState();
	  }
	  /**
	   * Disables user input on the control completely.
	   * While disabled, it cannot receive focus.
	   */


	  disable() {
	    var self = this;
	    self.input.disabled = true;
	    self.control_input.disabled = true;
	    self.control_input.tabIndex = -1;
	    self.isDisabled = true;
	    self.lock();
	  }
	  /**
	   * Enables the control so that it can respond
	   * to focus and user input.
	   */


	  enable() {
	    var self = this;
	    self.input.disabled = false;
	    self.control_input.disabled = false;
	    self.control_input.tabIndex = self.tabIndex;
	    self.isDisabled = false;
	    self.unlock();
	  }
	  /**
	   * Completely destroys the control and
	   * unbinds all event listeners so that it can
	   * be garbage collected.
	   */


	  destroy() {
	    var self = this;
	    var revertSettings = self.revertSettings;
	    self.trigger('destroy');
	    self.off();
	    self.wrapper.remove();
	    self.dropdown.remove();
	    self.input.innerHTML = revertSettings.innerHTML;
	    self.input.tabIndex = revertSettings.tabIndex;
	    removeClasses(self.input, 'tomselected');
	    self.input.removeAttribute('hidden');
	    self.input.required = this.isRequired;

	    self._destroy();

	    delete self.input.tomselect;
	  }
	  /**
	   * A helper method for rendering "item" and
	   * "option" templates, given the data.
	   *
	   */


	  render(templateName, data) {
	    var value, id, html;
	    var self = this;

	    if (templateName === 'option' || templateName === 'item') {
	      value = hash_key(data[self.settings.valueField]); // pull markup from cache if it exists

	      if (self.renderCache[templateName].hasOwnProperty(value)) {
	        return self.renderCache[templateName][value];
	      }
	    }

	    var template = self.settings.render[templateName];

	    if (typeof template !== 'function') {
	      return null;
	    } // render markup


	    html = template.call(this, data, escape_html);

	    if (!html) {
	      return html;
	    }

	    html = getDom(html); // add mandatory attributes

	    if (templateName === 'option' || templateName === 'option_create') {
	      if (data[self.settings.disabledField]) {
	        setAttr(html, {
	          'aria-disabled': 'true'
	        });
	      } else {
	        setAttr(html, {
	          'data-selectable': ''
	        });
	      }
	    } else if (templateName === 'optgroup') {
	      id = data.group[self.settings.optgroupValueField];
	      setAttr(html, {
	        'data-group': id
	      });

	      if (data.group[self.settings.disabledField]) {
	        setAttr(html, {
	          'data-disabled': ''
	        });
	      }
	    }

	    if (templateName === 'option' || templateName === 'item') {
	      setAttr(html, {
	        'data-value': value
	      }); // make sure we have some classes if a template is overwritten

	      if (templateName === 'item') {
	        addClasses(html, self.settings.itemClass);
	      } else {
	        addClasses(html, self.settings.optionClass);
	        setAttr(html, {
	          role: 'option',
	          id: data.$id
	        });
	      } // update cache


	      self.renderCache[templateName][value] = html;
	    }

	    return html;
	  }
	  /**
	   * Clears the render cache for a template. If
	   * no template is given, clears all render
	   * caches.
	   *
	   */


	  clearCache(templateName) {
	    var self = this;

	    if (templateName === void 0) {
	      self.renderCache = {
	        'item': {},
	        'option': {}
	      };
	    } else {
	      self.renderCache[templateName] = {};
	    }
	  }
	  /**
	   * Determines whether or not to display the
	   * create item prompt, given a user input.
	   *
	   */


	  canCreate(input) {
	    return this.settings.create && input.length && this.settings.createFilter.call(this, input);
	  }
	  /**
	   * Wraps this.`method` so that `new_fn` can be invoked 'before', 'after', or 'instead' of the original method
	   *
	   * this.hook('instead','onKeyDown',function( arg1, arg2 ...){
	   *
	   * });
	   */


	  hook(when, method, new_fn) {
	    var self = this;
	    var orig_method = self[method];

	    self[method] = function () {
	      var result, result_new;

	      if (when === 'after') {
	        result = orig_method.apply(self, arguments);
	      }

	      result_new = new_fn.apply(self, arguments);

	      if (when === 'instead') {
	        return result_new;
	      }

	      if (when === 'before') {
	        result = orig_method.apply(self, arguments);
	      }

	      return result;
	    };
	  }

	}

	/**
	 * Plugin: "change_listener" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('change_listener', function (options) {
	  var self = this;
	  var changed = false;
	  addEvent(self.input, 'change', () => {
	    // prevent infinite loops
	    if (changed) {
	      changed = false;
	      return;
	    }

	    changed = true;
	    var settings = getSettings(self.input, {});
	    self.setupOptions(settings.options, settings.optgroups);
	    self.setValue(settings.items);
	  });
	});

	/**
	 * Plugin: "restore_on_backspace" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('checkbox_options', function (options) {
	  var self = this;
	  var orig_onOptionSelect = self.onOptionSelect;
	  self.settings.hideSelected = false; // update the checkbox for an option

	  var UpdateCheckbox = function UpdateCheckbox(option) {
	    var checkbox = option.querySelector('input');

	    if (option.classList.contains('selected')) {
	      checkbox.checked = true;
	    } else {
	      checkbox.checked = false;
	    }
	  }; // add checkbox to option template


	  self.hook('after', 'setupTemplates', () => {
	    var orig_render_option = self.settings.render.option;

	    self.settings.render.option = function (data) {
	      var rendered = getDom(orig_render_option.apply(self, arguments));
	      var checkbox = document.createElement('input');
	      checkbox.addEventListener('click', function (evt) {
	        preventDefault(evt);
	      });
	      checkbox.type = 'checkbox';
	      var value = hash_key(data[self.settings.valueField]);

	      if (self.items.indexOf(value) > -1) {
	        checkbox.checked = true;
	      }

	      rendered.prepend(checkbox);
	      return rendered;
	    };
	  }); // uncheck when item removed

	  self.on('item_remove', value => {
	    var option = self.getOption(value);

	    if (option) {
	      // if dropdown hasn't been opened yet, the option won't exist
	      option.classList.remove('selected'); // selected class won't be removed yet

	      UpdateCheckbox(option);
	    }
	  }); // remove items when selected option is clicked

	  self.hook('instead', 'onOptionSelect', function (evt, option) {
	    if (option.classList.contains('selected')) {
	      option.classList.remove('selected');
	      self.removeItem(option.dataset.value);
	      self.refreshOptions();
	      preventDefault(evt, true);
	      return;
	    }

	    return orig_onOptionSelect.apply(self, arguments);
	  }); // update option checkbox

	  self.hook('after', 'onOptionSelect', (evt, option) => {
	    UpdateCheckbox(option);
	  });
	});

	/**
	 * Plugin: "dropdown_header" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('clear_button', function (options) {
	  var self = this;
	  options = Object.assign({
	    className: 'clear-button',
	    title: 'Clear All',
	    html: data => {
	      return `<div class="${data.className}" title="${data.title}">&times;</div>`;
	    }
	  }, options);
	  self.hook('after', 'setup', () => {
	    var button = getDom(options.html(options));
	    button.addEventListener('click', evt => {
	      while (self.items.length > 0) {
	        self.removeItem(self.items[0], true);
	      }

	      self.updateOriginalInput();
	      evt.preventDefault();
	      evt.stopPropagation();
	    });
	    self.control.appendChild(button);
	  });
	});

	/**
	 * Plugin: "drag_drop" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('drag_drop', function (options) {
	  var self = this;
	  if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
	  if (self.settings.mode !== 'multi') return;
	  var orig_lock = self.lock;
	  var orig_unlock = self.unlock;
	  self.hook('instead', 'lock', function () {
	    var sortable = self.control.dataset.sortable;
	    if (sortable) sortable.disable();
	    return orig_lock.apply(self, arguments);
	  });
	  self.hook('instead', 'unlock', function () {
	    var sortable = self.control.dataset.sortable;
	    if (sortable) sortable.enable();
	    return orig_unlock.apply(self, arguments);
	  });
	  self.hook('after', 'setup', () => {
	    var $control = $(self.control).sortable({
	      items: '[data-value]',
	      forcePlaceholderSize: true,
	      disabled: self.isLocked,
	      start: (e, ui) => {
	        ui.placeholder.css('width', ui.helper.css('width'));
	        $control.css({
	          overflow: 'visible'
	        });
	      },
	      stop: () => {
	        $control.css({
	          overflow: 'hidden'
	        });
	        var values = [];
	        $control.children('[data-value]').each(function () {
	          values.push($(this).attr('data-value'));
	        });
	        self.setValue(values);
	      }
	    });
	  });
	});

	/**
	 * Plugin: "dropdown_header" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('dropdown_header', function (options) {
	  var self = this;
	  options = Object.assign({
	    title: 'Untitled',
	    headerClass: 'dropdown-header',
	    titleRowClass: 'dropdown-header-title',
	    labelClass: 'dropdown-header-label',
	    closeClass: 'dropdown-header-close',
	    html: data => {
	      return '<div class="' + data.headerClass + '">' + '<div class="' + data.titleRowClass + '">' + '<span class="' + data.labelClass + '">' + data.title + '</span>' + '<a class="' + data.closeClass + '">&times;</a>' + '</div>' + '</div>';
	    }
	  }, options);
	  self.hook('after', 'setup', () => {
	    var header = getDom(options.html(options));
	    var close_link = header.querySelector('.' + options.closeClass);

	    if (close_link) {
	      close_link.addEventListener('click', evt => {
	        preventDefault(evt, true);
	        self.close();
	      });
	    }

	    self.dropdown.insertBefore(header, self.dropdown.firstChild);
	  });
	});

	/**
	 * Plugin: "dropdown_input" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('dropdown_input', function () {
	  var self = this;
	  var input = self.settings.controlInput || '<input type="text" autocomplete="off" class="dropdown-input" />';
	  input = getDom(input);

	  if (self.settings.placeholder) {
	    setAttr(input, {
	      placeholder: self.settings.placeholder
	    });
	  }

	  self.settings.controlInput = input;
	  self.settings.shouldOpen = true; // make sure the input is shown even if there are no options to display in the dropdown

	  self.hook('after', 'setup', () => {
	    // set tabIndex on wrapper
	    setAttr(self.wrapper, {
	      tabindex: self.input.disabled ? '-1' : self.tabIndex
	    }); // keyboard navigation

	    addEvent(self.wrapper, 'keypress', evt => {
	      if (self.control.contains(evt.target)) {
	        return;
	      }

	      if (self.dropdown.contains(evt.target)) {
	        return;
	      } // open dropdown on enter when wrapper is tab-focused


	      switch (evt.keyCode) {
	        case KEY_RETURN:
	          self.onClick(evt);
	          return;
	      }
	    });
	    let div = getDom('<div class="dropdown-input-wrap">');
	    div.appendChild(input);
	    self.dropdown.insertBefore(div, self.dropdown.firstChild);
	  });
	});

	/**
	 * Plugin: "input_autogrow" (Tom Select)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('input_autogrow', function () {
	  var self = this;
	  self.hook('after', 'setup', () => {
	    var test_input = document.createElement('span');
	    var control = self.control_input;
	    test_input.style.cssText = 'position:absolute; top:-99999px; left:-99999px; width:auto; padding:0; white-space:pre; ';
	    self.wrapper.appendChild(test_input);
	    var transfer_styles = ['letterSpacing', 'fontSize', 'fontFamily', 'fontWeight', 'textTransform'];

	    for (const style_name of transfer_styles) {
	      test_input.style[style_name] = control.style[style_name];
	    }
	    /**
	     * Set the control width
	     *
	     */


	    var resize = () => {
	      if (self.items.length > 0) {
	        test_input.textContent = control.value;
	        control.style.width = test_input.clientWidth + 'px';
	      } else {
	        control.style.width = '';
	      }
	    };

	    resize();
	    self.on('update item_add item_remove', resize);
	    addEvent(control, 'input', resize);
	    addEvent(control, 'keyup', resize);
	    addEvent(control, 'blur', resize);
	    addEvent(control, 'update', resize);
	  });
	});

	/**
	 * Plugin: "input_autogrow" (Tom Select)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('no_backspace_delete', function () {
	  var self = this;
	  var orig_deleteSelection = self.deleteSelection;
	  this.hook('instead', 'deleteSelection', function () {
	    if (self.activeItems.length) {
	      return orig_deleteSelection.apply(self, arguments);
	    }

	    return false;
	  });
	});

	/**
	 * Plugin: "input_autogrow" (Tom Select)
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('no_active_items', function (options) {
	  this.hook('instead', 'setActiveItem', () => {});
	  this.hook('instead', 'selectAll', () => {});
	});

	/**
	 * Plugin: "optgroup_columns" (Tom Select.js)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('optgroup_columns', function () {
	  var self = this;
	  var orig_keydown = self.onKeyDown;
	  self.hook('instead', 'onKeyDown', function (evt) {
	    var index, option, options, optgroup;

	    if (!self.isOpen || !(evt.keyCode === KEY_LEFT || evt.keyCode === KEY_RIGHT)) {
	      return orig_keydown.apply(self, arguments);
	    }

	    optgroup = parentMatch(self.activeOption, '[data-group]');
	    index = nodeIndex(self.activeOption, '[data-selectable]');

	    if (evt.keyCode === KEY_LEFT) {
	      optgroup = optgroup.previousSibling;
	    } else {
	      optgroup = optgroup.nextSibling;
	    }

	    if (!optgroup) {
	      return;
	    }

	    options = optgroup.querySelectorAll('[data-selectable]');
	    option = options[Math.min(options.length - 1, index)];

	    if (option) {
	      self.setActiveOption(option);
	    }
	  });
	});

	/**
	 * Plugin: "remove_button" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('remove_button', function (options) {
	  options = Object.assign({
	    label: '&times;',
	    title: 'Remove',
	    className: 'remove',
	    append: true
	  }, options); //options.className = 'remove-single';

	  var self = this; // override the render method to add remove button to each item

	  if (!options.append) {
	    return;
	  }

	  var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
	  self.hook('after', 'setupTemplates', () => {
	    var orig_render_item = self.settings.render.item;

	    self.settings.render.item = function () {
	      var rendered = getDom(orig_render_item.apply(self, arguments));
	      var close_button = getDom(html);
	      rendered.appendChild(close_button);
	      addEvent(close_button, 'mousedown', evt => {
	        preventDefault(evt, true);
	      });
	      addEvent(close_button, 'click', evt => {
	        // propagating will trigger the dropdown to show for single mode
	        preventDefault(evt, true);
	        if (self.isLocked) return;
	        var value = rendered.dataset.value;
	        self.removeItem(value);
	        self.refreshOptions(false);
	      });
	      return rendered;
	    };
	  });
	});

	/**
	 * Plugin: "restore_on_backspace" (Tom Select)
	 * Copyright (c) contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 */
	TomSelect.define('restore_on_backspace', function (options) {
	  var self = this;

	  options.text = options.text || function (option) {
	    return option[self.settings.labelField];
	  };

	  self.on('item_remove', function (value) {
	    if (self.control_input.value.trim() === '') {
	      var option = self.options[value];

	      if (option) {
	        self.setTextboxValue(options.text.call(self, option));
	      }
	    }
	  });
	});

	return TomSelect;

})));
var tomSelect=function(el,opts){return new TomSelect(el,opts);} 
//# sourceMappingURL=tom-select.complete.js.map
