/**
 * sifter.js
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

(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Sifter = factory();
	}
}(this, function() {

	/**
	 * Textually searches arrays and hashes of objects
	 * by property (or multiple properties). Designed
	 * specifically for autocomplete.
	 *
	 * @constructor
	 * @param {array|object} items
	 * @param {object} items
	 */
	var Sifter = function(items, settings) {
		this.items = items;
		this.settings = settings || {diacritics: true};
	};

	/**
	 * Splits a search string into an array of individual
	 * regexps to be used to match results.
	 *
	 * @param {string} query
	 * @returns {array}
	 */
	Sifter.prototype.tokenize = function(query) {
		query = trim(String(query || '').toLowerCase());
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
			tokens.push({
				string : words[i],
				regex  : new RegExp(regex, 'i')
			});
		}

		return tokens;
	};

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
	Sifter.prototype.iterator = function(object, callback) {
		var iterator;
		if (is_array(object)) {
			iterator = Array.prototype.forEach || function(callback) {
				for (var i = 0, n = this.length; i < n; i++) {
					callback(this[i], i, this);
				}
			};
		} else {
			iterator = function(callback) {
				for (var key in this) {
					if (this.hasOwnProperty(key)) {
						callback(this[key], key, this);
					}
				}
			};
		}

		iterator.apply(object, [callback]);
	};

	/**
	 * Returns a function to be used to score individual results.
	 *
	 * Good matches will have a higher score than poor matches.
	 * If an item is not a match, 0 will be returned by the function.
	 *
	 * @param {object|string} search
	 * @param {object} options (optional)
	 * @returns {function}
	 */
	Sifter.prototype.getScoreFunction = function(search, options) {
		var self, search;

		self   = this;
		search = self.prepareSearch(search, options);
		tokens = search.tokens;

		var calculateFieldScore = (function() {
			if (!tokens.length) {
				return function() { return 0; };
			} else if (tokens.length === 1) {
				return function(value) {
					var score, pos;

					value = String(value || '').toLowerCase();
					pos = value.search(tokens[0].regex);
					if (pos === -1) return 0;
					score = tokens[0].string.length / value.length;
					if (pos === 0) score += 0.5;
					return score;
				};
			} else {
				return function(value) {
					var score, pos, i, j;
					value = String(value || '').toLowerCase();
					score = 0;
					for (i = 0, j = tokens.length; i < j; i++) {
						pos = value.search(tokens[i].regex);
						if (pos === -1) continue;
						if (pos === 0) score += 0.5;
						score += tokens[i].string.length / value.length;
					}
					return score / tokens.length;
				};
			}
		})();

		var calculateScore = (function() {
			var fields = search.options.fields;
			if (!fields || !fields.length) {
				return function() { return 0; };
			} else if (fields.length === 1) {
				var field = fields[0];
				return function(data) {
					if (!data.hasOwnProperty(field)) return 0;
					return calculateFieldScore(data[field]);
				};
			} else {
				return function(data) {
					var n = 0;
					var score = 0;
					for (var i = 0, j = fields.length; i < j; i++) {
						if (data.hasOwnProperty(fields[i])) {
							score += calculateFieldScore(data[fields[i]]);
							n++;
						}
					}
					return score / n;
				};
			}
		})();

		return calculateScore;
	};

	/**
	 * Parses a search query and returns an object
	 * with tokens and fields ready to be populated
	 * with results.
	 *
	 * @param {string} query
	 * @param {object} options
	 * @returns {object}
	 */
	Sifter.prototype.prepareSearch = function(query, options) {
		if (typeof query === 'object') return query;
		return {
			options : extend({}, options),
			query   : String(query || '').toLowerCase(),
			tokens  : this.tokenize(query),
			total   : 0,
			items   : []
		};
	};

	/**
	 * Searches through all items and returns a sorted array of matches.
	 *
	 * The `options` parameter can contain:
	 *
	 *   - fields {string|array}
	 *   - sort {string}
	 *   - direction {string}
	 *   - score {function}
	 *   - limit {integer}
	 *
	 * Returns an object containing:
	 *
	 *   - options {object}
	 *   - query {string}
	 *   - tokens {array}
	 *   - total {int}
	 *   - items {array}
	 *
	 * @param {string} query
	 * @param {object} options
	 * @returns {object}
	 */
	Sifter.prototype.search = function(query, options) {
		var self = this, value, score, search, calculateScore;

		search  = this.prepareSearch(query, options);
		options = search.options;
		query   = search.query;

		// generate result scoring function
		if (!is_array(options.fields)) options.fields = [options.fields];
		calculateScore = options.score || self.getScoreFunction(search);

		// perform search and sort
		if (query.length) {
			self.iterator(self.items, function(item, id) {
				score = calculateScore(item);
				if (score > 0) {
					search.items.push({'score': score, 'id': id});
				}
			});
			search.items.sort(function(a, b) {
				return b.score - a.score;
			});
		} else {
			self.iterator(self.items, function(item, id) {
				search.items.push({'score': 1, 'id': id});
			});
			if (options.sort) {
				search.items.sort((function() {
					var field = options.sort;
					var multiplier = options.direction === 'desc' ? -1 : 1;
					return function(a, b) {
						a = a && String(self.items[a.id][field] || '').toLowerCase();
						b = b && String(self.items[b.id][field] || '').toLowerCase();
						if (a > b) return 1 * multiplier;
						if (b > a) return -1 * multiplier;
						return 0;
					};
				})());
			}
		}

		// apply limits
		search.total = search.items.length;
		if (typeof options.limit === 'number') {
			search.items = search.items.slice(0, options.limit);
		}

		return search;
	};

	// utilities
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	var extend = function(a, b) {
		var i, n, k, object;
		for (i = 1, n = arguments.length; i < n; i++) {
			object = arguments[i];
			if (!object) continue;
			for (k in object) {
				if (object.hasOwnProperty(k)) {
					a[k] = object[k];
				}
			}
		}
		return a;
	};

	var trim = function(str) {
		return (str + '').replace(/^\s+|\s+$|/g, '');
	};

	var escape_regex = function(str) {
		return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	};

	var is_array = Array.isArray || ($ && $.isArray) || function(object) {
		return Object.prototype.toString.call(object) === '[object Array]';
	};

	var DIACRITICS = {
		'a': '[aÀÁÂÃÄÅàáâãäå]',
		'c': '[cÇç]',
		'e': '[eÈÉÊËèéêë]',
		'i': '[iÌÍÎÏìíîï]',
		'n': '[nÑñ]',
		'o': '[oÒÓÔÕÕÖØòóôõöø]',
		's': '[sŠš]',
		'u': '[uÙÚÛÜùúûü]',
		'y': '[yŸÿý]',
		'z': '[zŽž]'
	};

	// export
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	return Sifter;

}));