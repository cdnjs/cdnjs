"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(["\n\n\t\t<div class=\"ams-button\" ng-click=\"open = !open\">\n\t\t\t<div class=\"ams-button-text\" ng-bind-html=\"amssh.create_dropdown_label(stats, outputModelNotFormatted, self.output_type)\"></div>\n\t\t\t<div class=\"ams-caret\"></div>\n\t\t</div>\n\n\t\t<div class=\"ams-container ng-cloak\" ng-show=\"open\">\n\n\t\t\t<div class=\"ams-helpers\">\n\t\t\t\t<div class=\"selects\">\n\t\t\t\t\t<button class=\"all ams-btn\" type=\"button\" accesskey=\"a\" ng-click=\"amse.check_all()\" ng-hide=\"hide_helpers.indexOf('check_all') > -1\">{{ 'CHECK_ALL' | translate }}</button>\n\t\t\t\t\t<button class=\"none ams-btn\" type=\"button\" accesskey=\"n\" ng-click=\"amse.uncheck_all()\" ng-hide=\"hide_helpers.indexOf('check_none') > -1\">{{ 'CHECK_NONE' | translate }}</button>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"resets\">\n\t\t\t\t\t<button class=\"reset ams-btn\" type=\"button\" accesskey=\"r\" ng-click=\"reset()\" ng-hide=\"hide_helpers.indexOf('reset') > -1\">{{ 'RESET' | translate }}</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"ams-search\" ng-show=\"search_field !== null\">\n\t\t\t\t<input class=\"ams-search-field\" type=\"text\" name=\"ams-search-field\" value=\"\" placeholder=\"{{ 'SEARCH' | translate }}\" ng-model=\"search\" autofocus>\n\t\t\t\t<div class=\"ams-spinner\" ng-show=\"search_spinner_visible\"></div>\n\t\t\t\t<button class=\"clear ams-btn\" type=\"button\" accesskey=\"c\" name=\"clear\" title=\"{{ 'CLEAR' | translate }}\" ng-click=\"search = ''\"></button>\n\t\t\t</div>\n\n\t\t\t<div class=\"ams-items\">\n\t\t\t\t<div\n\t\t\t\t\tng-repeat=\"item in items track by item[ops.ID_PROPERTY]\"\n\t\t\t\t\tclass=\"ams-item {{ amssh.get_level_class(item) }} {{ amssh.get_type_class(item) }} {{ amssh.get_open_class(item) }} {{ $index === focused_index ? 'ams-item-focused' : '' }}\"\n\t\t\t\t>\n\t\t\t\t\t<!-- Caret -->\n\t\t\t\t\t<div\n\t\t\t\t\t\tclass=\"ams-caret {{ amssh.get_open_class(item) }}\"\n\t\t\t\t\t\tng-click=\"toggle_open_node(item)\"\n\t\t\t\t\t></div>\n\n\t\t\t\t\t<!-- Text of the element -->\n\t\t\t\t\t<div class=\"ams-item-text\" ng-bind-html=\"amssh.create_label(item)\"></div>\n\n\t\t\t\t\t<!-- Check holder -->\n\t\t\t\t\t<div\n\t\t\t\t\t\tclass=\"check {{ amssh.get_checked_class(item) }}\"\n\t\t\t\t\t\tng-click=\"toggle_check_node(item)\"\n\t\t\t\t\t>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t"], ["\n\n\t\t<div class=\"ams-button\" ng-click=\"open = !open\">\n\t\t\t<div class=\"ams-button-text\" ng-bind-html=\"amssh.create_dropdown_label(stats, outputModelNotFormatted, self.output_type)\"></div>\n\t\t\t<div class=\"ams-caret\"></div>\n\t\t</div>\n\n\t\t<div class=\"ams-container ng-cloak\" ng-show=\"open\">\n\n\t\t\t<div class=\"ams-helpers\">\n\t\t\t\t<div class=\"selects\">\n\t\t\t\t\t<button class=\"all ams-btn\" type=\"button\" accesskey=\"a\" ng-click=\"amse.check_all()\" ng-hide=\"hide_helpers.indexOf('check_all') > -1\">{{ 'CHECK_ALL' | translate }}</button>\n\t\t\t\t\t<button class=\"none ams-btn\" type=\"button\" accesskey=\"n\" ng-click=\"amse.uncheck_all()\" ng-hide=\"hide_helpers.indexOf('check_none') > -1\">{{ 'CHECK_NONE' | translate }}</button>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"resets\">\n\t\t\t\t\t<button class=\"reset ams-btn\" type=\"button\" accesskey=\"r\" ng-click=\"reset()\" ng-hide=\"hide_helpers.indexOf('reset') > -1\">{{ 'RESET' | translate }}</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"ams-search\" ng-show=\"search_field !== null\">\n\t\t\t\t<input class=\"ams-search-field\" type=\"text\" name=\"ams-search-field\" value=\"\" placeholder=\"{{ 'SEARCH' | translate }}\" ng-model=\"search\" autofocus>\n\t\t\t\t<div class=\"ams-spinner\" ng-show=\"search_spinner_visible\"></div>\n\t\t\t\t<button class=\"clear ams-btn\" type=\"button\" accesskey=\"c\" name=\"clear\" title=\"{{ 'CLEAR' | translate }}\" ng-click=\"search = ''\"></button>\n\t\t\t</div>\n\n\t\t\t<div class=\"ams-items\">\n\t\t\t\t<div\n\t\t\t\t\tng-repeat=\"item in items track by item[ops.ID_PROPERTY]\"\n\t\t\t\t\tclass=\"ams-item {{ amssh.get_level_class(item) }} {{ amssh.get_type_class(item) }} {{ amssh.get_open_class(item) }} {{ $index === focused_index ? 'ams-item-focused' : '' }}\"\n\t\t\t\t>\n\t\t\t\t\t<!-- Caret -->\n\t\t\t\t\t<div\n\t\t\t\t\t\tclass=\"ams-caret {{ amssh.get_open_class(item) }}\"\n\t\t\t\t\t\tng-click=\"toggle_open_node(item)\"\n\t\t\t\t\t></div>\n\n\t\t\t\t\t<!-- Text of the element -->\n\t\t\t\t\t<div class=\"ams-item-text\" ng-bind-html=\"amssh.create_label(item)\"></div>\n\n\t\t\t\t\t<!-- Check holder -->\n\t\t\t\t\t<div\n\t\t\t\t\t\tclass=\"check {{ amssh.get_checked_class(item) }}\"\n\t\t\t\t\t\tng-click=\"toggle_check_node(item)\"\n\t\t\t\t\t>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\n\t"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function (e) {
	function f(a, c) {
		function b(a) {
			if (!this || this.constructor !== b) return new b(a);this._keys = [];this._values = [];this._itp = [];this.objectOnly = c;a && v.call(this, a);
		}c || w(a, "size", { get: x });a.constructor = b;b.prototype = a;return b;
	}function v(a) {
		this.add ? a.forEach(this.add, this) : a.forEach(function (a) {
			this.set(a[0], a[1]);
		}, this);
	}function d(a) {
		this.has(a) && (this._keys.splice(b, 1), this._values.splice(b, 1), this._itp.forEach(function (a) {
			b < a[0] && a[0]--;
		}));return -1 < b;
	}function m(a) {
		return this.has(a) ? this._values[b] : void 0;
	}function n(a, c) {
		if (this.objectOnly && c !== Object(c)) throw new TypeError("Invalid value used as weak collection key");if (c != c || 0 === c) for (b = a.length; b-- && !y(a[b], c);) {} else b = a.indexOf(c);return -1 < b;
	}function p(a) {
		return n.call(this, this._values, a);
	}function q(a) {
		return n.call(this, this._keys, a);
	}function r(a, c) {
		this.has(a) ? this._values[b] = c : this._values[this._keys.push(a) - 1] = c;return this;
	}function t(a) {
		this.has(a) || this._values.push(a);return this;
	}function h() {
		(this._keys || 0).length = this._values.length = 0;
	}function z() {
		return k(this._itp, this._keys);
	}function l() {
		return k(this._itp, this._values);
	}function A() {
		return k(this._itp, this._keys, this._values);
	}function B() {
		return k(this._itp, this._values, this._values);
	}function k(a, c, b) {
		var g = [0],
		    e = !1;a.push(g);return { next: function next() {
				var f,
				    d = g[0];!e && d < c.length ? (f = b ? [c[d], b[d]] : c[d], g[0]++) : (e = !0, a.splice(a.indexOf(g), 1));return { done: e, value: f };
			} };
	}function x() {
		return this._values.length;
	}function u(a, c) {
		for (var b = this.entries();;) {
			var d = b.next();if (d.done) break;
			a.call(c, d.value[1], d.value[0], this);
		}
	}var b,
	    w = Object.defineProperty,
	    y = function y(a, b) {
		return isNaN(a) ? isNaN(b) : a === b;
	};"undefined" == typeof WeakMap && (e.WeakMap = f({ "delete": d, clear: h, get: m, has: q, set: r }, !0));"undefined" != typeof Map && "function" === typeof new Map().values && new Map().values().next || (e.Map = f({ "delete": d, has: q, get: m, set: r, keys: z, values: l, entries: A, forEach: u, clear: h }));"undefined" != typeof Set && "function" === typeof new Set().values && new Set().values().next || (e.Set = f({ has: p, add: t, "delete": d, clear: h,
		keys: l, values: l, entries: B, forEach: u }));"undefined" == typeof WeakSet && (e.WeakSet = f({ "delete": d, add: t, clear: h, has: p }, !0));
})("undefined" != typeof exports && "undefined" != typeof global ? global : window);

var angular_multi_select_consts = angular.module('angular-multi-select-constants', []);

angular_multi_select_consts.constant("angularMultiSelectConstants", {
	/*
  * Default key names of the input data
  */
	ID_PROPERTY: 'id',
	OPEN_PROPERTY: 'open',
	CHECKED_PROPERTY: 'checked',
	CHILDREN_PROPERTY: 'children',

	/*
  * Internal data keys
  */
	INTERNAL_KEY_LEVEL: '$ams_level',
	INTERNAL_KEY_ORDER: '$ams_order',
	INTERNAL_KEY_PARENTS_ID: '$ams_parents_id',
	INTERNAL_KEY_CHILDREN_LEAFS: '$ams_children_leafs',
	INTERNAL_KEY_CHILDREN_NODES: '$ams_children_nodes',
	INTERNAL_KEY_CHECKED_CHILDREN: '$ams_checked_children',
	INTERNAL_KEY_TREE_VISIBILITY: '$ams_tree_visibility',
	INTERNAL_KEY_CHECKED_MODIFICATION: '$ams_checked_modification',

	/*
  * This gets injected while processing the stats, in the dropdown
  * label. This allows us to iterate over the output model when
  * generating the dropdown label.
  */
	INTERNAL_KEY_OUTPUT_MODEL_HACK: '$ams_output_model_hack',
	INTERNAL_KEY_OUTPUT_TYPE_HACK: '$ams_output_type_hack',

	/*
  * Possible values of the input/internal data
  */
	INPUT_DATA_OPEN: true,
	INPUT_DATA_CLOSED: false,
	INTERNAL_DATA_OPEN: true,
	INTERNAL_DATA_CLOSED: false,

	INPUT_DATA_CHECKED: true,
	INPUT_DATA_UNCHECKED: false,
	INTERNAL_DATA_LEAF_CHECKED: true,
	INTERNAL_DATA_LEAF_UNCHECKED: false,
	INTERNAL_DATA_NODE_CHECKED: 1,
	INTERNAL_DATA_NODE_MIXED: 0,
	INTERNAL_DATA_NODE_UNCHECKED: -1,
	INTERNAL_DATA_NODE_CHECK_UNDEFINED: null,

	INTERNAL_DATA_VISIBLE: true,
	INTERNAL_DATA_INVISIBLE: false,
	INTERNAL_DATA_VISIBILITY_UNDEFINED: null,

	INTERNAL_STATS_CHECKED_LEAFS: '$ams_stats_checked_leafs',
	INTERNAL_STATS_CHECKED_NODES: '$ams_stats_checked_nodes',
	INTERNAL_STATS_UNCHECKED_NODES: '$ams_stats_unchecked_nodes',
	INTERNAL_STATS_TOTAL_LEAFS: '$ams_stats_total_leafs',
	INTERNAL_STATS_TOTAL_NODES: '$ams_stats_total_nodes',

	/*
  * Possible values of the output type of data
  */
	OUTPUT_DATA_TYPE_OBJECTS: 'objects',
	OUTPUT_DATA_TYPE_ARRAYS: 'arrays',
	OUTPUT_DATA_TYPE_OBJECT: 'object',
	OUTPUT_DATA_TYPE_ARRAY: 'array',
	OUTPUT_DATA_TYPE_VALUES: 'values',
	OUTPUT_DATA_TYPE_VALUE: 'value',

	/*
  * CSS classes helpers
  */
	CSS_OPEN: 'open',
	CSS_CLOSED: 'closed',

	CSS_LEAF_CHECKED: 'checked',
	CSS_LEAF_UNCHECKED: 'unchecked',
	CSS_NODE_MIXED: 'mixed',
	CSS_NODE_CHECKED: 'checked',
	CSS_NODE_UNCHECKED: 'unchecked',

	CSS_LEAF: 'leaf',
	CSS_NODE: 'node',

	/*
  * Possible values for the output data query
  */
	FIND_LEAFS: 'leafs',
	FIND_LEAFS_MIXED_NODES: 'leafs_mixed_nodes',
	FIND_LEAFS_CHECKED_NODES: 'leafs_checked_nodes',
	FIND_LEAFS_MIXED_CHECKED_NODES: 'leafs_mixed_checked_nodes',
	FIND_MIXED_NODES: 'midex_nodes',
	FIND_CHECKED_NODES: 'checked_nodes',
	FIND_MIXED_CHECKED_NODES: 'mixed_checked_nodes'
});

var angular_multi_select_data_converter = angular.module('angular-multi-select-data-converter', ['angular-multi-select-utils', 'angular-multi-select-constants']);

angular_multi_select_data_converter.factory('angularMultiSelectDataConverter', ['angularMultiSelectUtils', 'angularMultiSelectConstants', function (angularMultiSelectUtils, angularMultiSelectConstants) {
	'use strict';
	/*
  ██████  ██████  ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████  ██████  ██████
 ██      ██    ██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██
 ██      ██    ██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██    ██    ██ ██████
 ██      ██    ██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██
  ██████  ██████  ██   ████ ███████    ██    ██   ██  ██████   ██████    ██     ██████  ██   ██
 */

	var DataConverter = function DataConverter(ops) {
		this.amsu = new angularMultiSelectUtils();
		_extends(this, this.amsu.sanitize_ops(ops));
	};

	/*
  ██████ ██   ██ ███████  ██████ ██   ██     ██████  ██████  ███████ ██████  ███████  ██████  ██    ██ ██ ███████ ██ ████████ ███████ ███████
 ██      ██   ██ ██      ██      ██  ██      ██   ██ ██   ██ ██      ██   ██ ██      ██    ██ ██    ██ ██ ██      ██    ██    ██      ██
 ██      ███████ █████   ██      █████       ██████  ██████  █████   ██████  █████   ██    ██ ██    ██ ██ ███████ ██    ██    █████   ███████
 ██      ██   ██ ██      ██      ██  ██      ██      ██   ██ ██      ██   ██ ██      ██ ▄▄ ██ ██    ██ ██      ██ ██    ██    ██           ██
  ██████ ██   ██ ███████  ██████ ██   ██     ██      ██   ██ ███████ ██   ██ ███████  ██████   ██████  ██ ███████ ██    ██    ███████ ███████
                                                                                         ▀▀
 */
	DataConverter.prototype.check_prerequisites = function (data) {
		/*
   * Takes an array of data and walks through each element object
   * and checks if each object has:
   *
   * - a valid ID. If it doesn't, it generates one.
   * - open property. If it's not 'true' (strictly compared), it
   *   creates one and set's it to false.
   * - children property. If it's not an array or if it's empty,
   *   it deletes the property, else it will delete the checked
   *   property. Note that nodes can't have a checked property at
   *   this step of the process.
   * - checked property. If it's not 'true' (strictly compared),
   *   creates one and set's it to false.
   *
   * Note that you can completely skip this step (thus saving some
   * CPU cycles) if you are sure that all objects in your input data:
   *
   * - have valid and unique ID.
   * - have open property, which is boolean and false for leafs
   * - children properties are non-empty arrays
   * - only leafs have a checked property and it's a boolean
   */
		if (this.DEBUG === true) console.time(this.NAME + ' -> check_prerequisites');

		if (!Array.isArray(data)) return false;

		var ids = new Set();
		var ctx = this;
		var correct = true;
		var id_seed = Date.now();

		function process_items(items) {
			if (correct === false) return;

			for (var i = 0; i < items.length; i++) {
				var item = items[i];

				if (item.constructor.toString().indexOf('Array') !== -1) {
					return correct = false;
				}

				// Check for id field.
				// If not present, assign one
				if (!(ctx.ID_PROPERTY in item) || ids.has(item[ctx.ID_PROPERTY])) {
					while (ids.has(id_seed)) {
						id_seed++;
					}
					item[ctx.ID_PROPERTY] = id_seed++;
				}
				ids.add(item[ctx.ID_PROPERTY]);

				// Check for open field.
				// If open field doesn't exist or is not "true", set to false
				if (!(ctx.OPEN_PROPERTY in item) || item[ctx.OPEN_PROPERTY] !== angularMultiSelectConstants.INPUT_DATA_OPEN) {
					item[ctx.OPEN_PROPERTY] = angularMultiSelectConstants.INPUT_DATA_CLOSED;
				}

				// Check for children field.
				// If not an array or empty array, remove it.
				if (ctx.CHILDREN_PROPERTY in item && (!Array.isArray(item[ctx.CHILDREN_PROPERTY]) || item[ctx.CHILDREN_PROPERTY].length === 0)) {
					delete item[ctx.CHILDREN_PROPERTY];
				}

				// If children field is present, remove "checked" field.
				// If checked field is present, but value is not boolean or 1,
				// set to false.
				if (ctx.CHILDREN_PROPERTY in item) {
					delete item[ctx.CHECKED_PROPERTY];
				}

				if (ctx.CHECKED_PROPERTY in item && item[ctx.CHECKED_PROPERTY] !== angularMultiSelectConstants.INPUT_DATA_CHECKED) {
					item[ctx.CHECKED_PROPERTY] = angularMultiSelectConstants.INPUT_DATA_UNCHECKED;
				}

				if (!(ctx.CHILDREN_PROPERTY in item) && !(ctx.CHECKED_PROPERTY in item)) {
					item[ctx.CHECKED_PROPERTY] = angularMultiSelectConstants.INPUT_DATA_UNCHECKED;
				}

				if (ctx.CHILDREN_PROPERTY in item) {
					process_items(item[ctx.CHILDREN_PROPERTY]);
				}
			}
		}

		process_items(data);

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> check_prerequisites');

		// Return data array or false if something is wrong.
		return correct ? data : correct;
	};

	/*
 ████████  ██████      ██ ███    ██ ████████ ███████ ██████  ███    ██  █████  ██
    ██    ██    ██     ██ ████   ██    ██    ██      ██   ██ ████   ██ ██   ██ ██
    ██    ██    ██     ██ ██ ██  ██    ██    █████   ██████  ██ ██  ██ ███████ ██
    ██    ██    ██     ██ ██  ██ ██    ██    ██      ██   ██ ██  ██ ██ ██   ██ ██
    ██     ██████      ██ ██   ████    ██    ███████ ██   ██ ██   ████ ██   ██ ███████
 */
	DataConverter.prototype.to_internal = function (data) {
		/*
   * Takes an array of (nested) objects and flattens it, while
   * also adding some internal properties required for faster
   * un/check and state actions.
   *
   * Note that you can skip this step (thus saving some CPU cycles)
   * only if you're completely sure how this method works, what and
   * how it does what it does.
   */
		if (this.DEBUG === true) console.time(this.NAME + ' -> to_internal');

		var order = 1;
		var ctx = this;
		var i, j, item;
		var final_data = [];

		function process_items(items, level) {
			for (var i = 0; i < items.length; i++) {
				item = items[i];

				var final_item = _extends({}, item);
				delete final_item[ctx.CHECKED_PROPERTY];
				delete final_item[ctx.CHILDREN_PROPERTY];

				if (ctx.CHECKED_PROPERTY in item && typeof item[ctx.CHECKED_PROPERTY] === 'boolean') {
					final_item[ctx.CHECKED_PROPERTY] = item[ctx.CHECKED_PROPERTY];
				} else {
					final_item[ctx.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECK_UNDEFINED;
				}

				//Assigned in order
				final_item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] = level;
				final_item[angularMultiSelectConstants.INTERNAL_KEY_ORDER] = order++;

				//Required to be present for further calculation
				final_item[angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID] = [];
				final_item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] = 0;
				final_item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_NODES] = 0;
				final_item[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = 0;
				final_item[angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY] = angularMultiSelectConstants.INTERNAL_DATA_VISIBILITY_UNDEFINED;
				final_item[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = 0;

				final_data.push(final_item);

				if (ctx.CHILDREN_PROPERTY in item) {
					process_items(item[ctx.CHILDREN_PROPERTY], level + 1);
				}
			}
		}

		process_items(data, 0);

		// calculate parents_id, visibility, children and checked properties
		var parents = [];
		var time_seed = Date.now();
		for (i = 0; i < final_data.length; i++) {
			item = final_data[i];

			item[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time_seed++;

			// Assign all the parent node IDs
			parents[item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL]] = item[ctx.ID_PROPERTY];
			if (item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] !== 0) {
				item[angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID] = parents.slice(0, item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL]);
			}

			// If this is a root element, it should be visible
			if (item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] === 0) item[angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY] = angularMultiSelectConstants.INTERNAL_DATA_VISIBLE;

			// we are guaranteed to have a checked property for leafs
			// if the current item is a leaf, it won't have children, hence skip
			if (typeof item[this.CHECKED_PROPERTY] === 'boolean') continue;

			var counter_checked = 0;
			var counter_unchecked = 0;
			var counter_null = 0;

			for (j = i + 1; j < final_data.length; j++) {
				var child = final_data[j];

				// Decide if children should be visible in the tree
				if (item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] === child[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] - 1) {
					child[angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY] = item[this.OPEN_PROPERTY];
				}

				if (item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] >= child[angularMultiSelectConstants.INTERNAL_KEY_LEVEL]) break;

				// Logic that decides the checked state of node items
				if (child[this.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED) {
					counter_checked++;
					item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS]++;
				} else if (child[this.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_LEAF_UNCHECKED) {
					counter_unchecked++;
					item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS]++;
				} else if (child[this.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECK_UNDEFINED) {
					counter_null++;
					item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_NODES]++;
				}
			}

			// If the number of checked or unchecked elements equals to
			// the number of children, then the current item should be
			// either 1 or -1 (checked or unchecked). Else, it should be
			// marked as 0 (mixed state).
			if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === counter_checked) {
				item[this.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED;
			} else if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === counter_unchecked) {
				item[this.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED;
			} else {
				item[this.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED;
			}

			item[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = counter_checked;
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_internal');

		return final_data;
	};

	/*
 ████████  ██████      ███████ ██   ██ ████████ ███████ ██████  ███    ██  █████  ██
    ██    ██    ██     ██       ██ ██     ██    ██      ██   ██ ████   ██ ██   ██ ██
    ██    ██    ██     █████     ███      ██    █████   ██████  ██ ██  ██ ███████ ██
    ██    ██    ██     ██       ██ ██     ██    ██      ██   ██ ██  ██ ██ ██   ██ ██
    ██     ██████      ███████ ██   ██    ██    ███████ ██   ██ ██   ████ ██   ██ ███████
 */
	DataConverter.prototype.to_external = function (data) {
		/*
   * This is the opposite of what 'to_internal' is supposed to do.
   * This will take an array of objects, usually the output of
   * get_*_tree and delete all the metadata of the engine, leaving
   * only the data that the user cares about.
   */
		if (!Array.isArray(data) || data.length === 0) {
			return [];
		}

		if (this.DEBUG === true) console.time(this.NAME + ' -> to_external');

		data = JSON.parse(JSON.stringify(data));

		for (var i = 0; i < data.length; i++) {
			//AMS engine metadata
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_LEVEL];
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_ORDER];
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID];
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS];
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_NODES];
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN];
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY];
			delete data[i][angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION];

			//TODO: Remove after https://github.com/techfort/LokiJS/issues/346
			delete data[i].meta;
			delete data[i].$loki;
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_external');

		return data;
	};

	/*
 ████████  ██████      ███████  ██████  ██████  ███    ███  █████  ████████
    ██    ██    ██     ██      ██    ██ ██   ██ ████  ████ ██   ██    ██
    ██    ██    ██     █████   ██    ██ ██████  ██ ████ ██ ███████    ██
    ██    ██    ██     ██      ██    ██ ██   ██ ██  ██  ██ ██   ██    ██
    ██     ██████      ██       ██████  ██   ██ ██      ██ ██   ██    ██
 */
	DataConverter.prototype.to_format = function (data, format, keys) {
		/*
   * Converts the input data to the desired output.
   */
		var res;

		switch (format) {
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_OBJECTS:
				res = this.to_array_of_objects(data, keys);
				break;
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_ARRAYS:
				res = this.to_array_of_arrays(data, keys);
				break;
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_OBJECT:
				res = this.to_object(data, keys);
				break;
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_ARRAY:
				res = this.to_array(data, keys);
				break;
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_VALUES:
				res = this.to_values(data, keys);
				break;
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_VALUE:
				res = this.to_value(data, keys);
				break;
		}

		return res;
	};

	/*
 ████████  ██████       █████  ██████  ██████   █████  ██    ██      ██████  ███████      ██████  ██████       ██ ███████  ██████ ████████ ███████
    ██    ██    ██     ██   ██ ██   ██ ██   ██ ██   ██  ██  ██      ██    ██ ██          ██    ██ ██   ██      ██ ██      ██         ██    ██
    ██    ██    ██     ███████ ██████  ██████  ███████   ████       ██    ██ █████       ██    ██ ██████       ██ █████   ██         ██    ███████
    ██    ██    ██     ██   ██ ██   ██ ██   ██ ██   ██    ██        ██    ██ ██          ██    ██ ██   ██ ██   ██ ██      ██         ██         ██
    ██     ██████      ██   ██ ██   ██ ██   ██ ██   ██    ██         ██████  ██           ██████  ██████   █████  ███████  ██████    ██    ███████
 */
	DataConverter.prototype.to_array_of_objects = function (data, keys) {
		/*
   * Takes an array of objects (the result of get_checked_tree usually)
   * and returns it as is if the "keys" argument hasn't been passed or
   * an array of objects, each object containing only the keys in the
   * "key" argument.
   */
		if (!Array.isArray(data) || data.length === 0) {
			return [];
		}

		if (this.DEBUG === true) console.time(this.NAME + ' -> to_array_of_objects');

		if (keys === undefined) {
			keys = [];
		}

		var new_data = [];
		for (var i = 0; i < data.length; i++) {
			var new_obj = {};
			var obj = data[i];

			if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || Array.isArray(obj)) {
				continue;
			}

			if (keys.length === 0) {
				new_data.push(obj);
			} else {
				for (var j = 0; j < keys.length; j++) {
					if (!(keys[j] in obj)) {
						continue;
					}

					new_obj[keys[j]] = obj[keys[j]];
				}
				new_data.push(new_obj);
			}
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_array_of_objects');

		return new_data;
	};

	/*
 ████████  ██████       █████  ██████  ██████   █████  ██    ██      ██████  ███████      █████  ██████  ██████   █████  ██    ██ ███████
    ██    ██    ██     ██   ██ ██   ██ ██   ██ ██   ██  ██  ██      ██    ██ ██          ██   ██ ██   ██ ██   ██ ██   ██  ██  ██  ██
    ██    ██    ██     ███████ ██████  ██████  ███████   ████       ██    ██ █████       ███████ ██████  ██████  ███████   ████   ███████
    ██    ██    ██     ██   ██ ██   ██ ██   ██ ██   ██    ██        ██    ██ ██          ██   ██ ██   ██ ██   ██ ██   ██    ██         ██
    ██     ██████      ██   ██ ██   ██ ██   ██ ██   ██    ██         ██████  ██          ██   ██ ██   ██ ██   ██ ██   ██    ██    ███████
 */
	DataConverter.prototype.to_array_of_arrays = function (data, keys) {
		/*
   * Takes an array of objects (the result of get_checked_tree usually)
   * and returns an array of arrays. Each array inside the returned
   * array contains the values of the keys that result of the
   * intersection of the object's keys and the argument "keys". The
   * array will contain the values in the order they have in the "key"
   * argument.
   */
		if (!Array.isArray(data) || data.length === 0) {
			return [];
		}

		if (this.DEBUG === true) console.time(this.NAME + ' -> to_array_of_arrays');

		if (keys === undefined) {
			keys = [];
		}

		function vals(obj) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
		}

		var new_data = [];
		for (var i = 0; i < data.length; i++) {
			var new_arr = [];
			var obj = data[i];

			if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || Array.isArray(obj)) {
				continue;
			}

			if (keys.length === 0) {
				new_data.push(vals(obj));
			} else {
				for (var j = 0; j < keys.length; j++) {
					if (!(keys[j] in obj)) {
						continue;
					}

					new_arr.push(obj[keys[j]]);
				}
				new_data.push(new_arr);
			}
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_array_of_arrays');

		return new_data;
	};

	/*
 ████████  ██████       █████  ██████  ██████   █████  ██    ██
    ██    ██    ██     ██   ██ ██   ██ ██   ██ ██   ██  ██  ██
    ██    ██    ██     ███████ ██████  ██████  ███████   ████
    ██    ██    ██     ██   ██ ██   ██ ██   ██ ██   ██    ██
    ██     ██████      ██   ██ ██   ██ ██   ██ ██   ██    ██
 */
	DataConverter.prototype.to_array = function (data, keys) {
		/*
   * Takes an array of objects (the result of get_checked_tree usually)
   * and returns a single array filled with the values of all the
   * objects's keys that are contained in the "keys" argument.
   * This usually doesn't make much sense when more than 1 item in the
   * tree is selected, but you're free to use it however you like.
   */
		if (!Array.isArray(data) || data.length === 0) {
			return [];
		}

		if (this.DEBUG === true) console.time(this.NAME + ' -> to_array');

		if (keys === undefined) {
			keys = [];
		}

		function vals(obj) {
			return Object.keys(obj).map(function (key) {
				return obj[key];
			});
		}

		var j;
		var obj = data[0];
		var ret = [];

		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || Array.isArray(obj)) {
			//do nothing
		} else {
				if (keys.length === 0) {
					var obj_vals = vals(obj);
					for (j = 0; j < obj_vals.length; j++) {
						ret.push(obj_vals[j]);
					}
				} else {
					for (j = 0; j < keys.length; j++) {
						if (!(keys[j] in obj)) {
							continue;
						}

						ret.push(obj[keys[j]]);
					}
				}
			}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_array');

		return ret;
	};

	/*
 ████████  ██████       ██████  ██████       ██ ███████  ██████ ████████
    ██    ██    ██     ██    ██ ██   ██      ██ ██      ██         ██
    ██    ██    ██     ██    ██ ██████       ██ █████   ██         ██
    ██    ██    ██     ██    ██ ██   ██ ██   ██ ██      ██         ██
    ██     ██████       ██████  ██████   █████  ███████  ██████    ██
 */
	DataConverter.prototype.to_object = function (data, keys) {
		/*
   * Takes an array of objects (the result of get_checked_tree usually)
   * and returns the first object.
   * If the "keys" argument is passed, only the keys of the object that
   * match the values in the "keys" argument will be returned.
   * This usually doesn't make much sense when more than 1 item in the tree
   * is selected, but you're free to use it however you like.
   */

		if (!Array.isArray(data) || data.length === 0) {
			return {};
		}

		if (this.DEBUG === true) console.time(this.NAME + ' -> to_object');

		if (keys === undefined) {
			keys = [];
		}

		var ret;
		var obj = data[0];

		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || Array.isArray(obj)) {
			ret = {};
		} else {
			if (keys.length === 0) {
				ret = obj;
			} else {
				var new_obj = {};
				for (var i = 0; i < keys.length; i++) {
					if (!(keys[i] in obj)) {
						continue;
					}

					new_obj[keys[i]] = obj[keys[i]];
				}
				ret = new_obj;
			}
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_object');

		return ret;
	};

	/*
 ████████  ██████      ██    ██  █████  ██      ██    ██ ███████ ███████
    ██    ██    ██     ██    ██ ██   ██ ██      ██    ██ ██      ██
    ██    ██    ██     ██    ██ ███████ ██      ██    ██ █████   ███████
    ██    ██    ██      ██  ██  ██   ██ ██      ██    ██ ██           ██
    ██     ██████        ████   ██   ██ ███████  ██████  ███████ ███████
 */
	DataConverter.prototype.to_values = function (data, keys) {
		/*
   * Takes an array of one object (the result of get_checked_tree usually)
   * and returns the value of the key in the object that is passed as the
   * "key" argument.
   * If "key" hasn't been passed, the first available value in the object
   * will be returned.
   */
		if (!Array.isArray(data) || data.length === 0) {
			return [];
		}

		if (this.DEBUG === true) console.time(this.NAME + ' -> to_values');

		if (keys === undefined) {
			keys = [];
		}

		var ret = [];

		if ((typeof data === "undefined" ? "undefined" : _typeof(data)) !== 'object' || !Array.isArray(data) || keys.length === 0) {
			//do nothing
		} else {
				for (var i = 0; i < data.length; i++) {
					for (var j = 0; j < keys.length; j++) {
						if (!(keys[j] in data[i])) {
							continue;
						}

						ret.push(data[i][keys[j]]);
					}
				}
			}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_values');

		return ret;
	};

	/*
 ████████  ██████      ██    ██  █████  ██      ██    ██ ███████
    ██    ██    ██     ██    ██ ██   ██ ██      ██    ██ ██
    ██    ██    ██     ██    ██ ███████ ██      ██    ██ █████
    ██    ██    ██      ██  ██  ██   ██ ██      ██    ██ ██
    ██     ██████        ████   ██   ██ ███████  ██████  ███████
 */
	DataConverter.prototype.to_value = function (data, key) {
		/*
   * Takes an array of one object (the result of get_checked_tree usually)
   * and returns the value of the key in the object that is passed as the
   * "key" argument.
   * If "key" hasn't been passed, the first available value in the object
   * will be returned.
   */
		if (!Array.isArray(data) || data.length === 0) {
			return undefined;
		}

		if (this.DEBUG === true) console.time(this.NAME + ' -> to_value');

		var ret;
		var obj = data[0];

		if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || Array.isArray(obj)) {
			ret = undefined;
		} else {
			if (key === undefined) {
				var keys = Object.keys(obj);
				if (keys.length === 0) {
					ret = undefined;
				} else {
					key = keys[0];
					ret = key in obj ? obj[key] : undefined;
				}
			} else {
				key = Array.isArray(key) ? key[0] : key;
				ret = key in obj ? obj[key] : undefined;
			}
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + ' -> to_value');

		return ret;
	};

	return DataConverter;
}]);

var angular_multi_select_engine = angular.module('angular-multi-select-engine', ['angular-multi-select-utils', 'angular-multi-select-constants']);

angular_multi_select_engine.factory('angularMultiSelectEngine', ['angularMultiSelectUtils', 'angularMultiSelectConstants', function (angularMultiSelectUtils, angularMultiSelectConstants) {
	'use strict';
	/*
  ██████  ██████  ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████  ██████  ██████
 ██      ██    ██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██
 ██      ██    ██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██    ██    ██ ██████
 ██      ██    ██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██
  ██████  ██████  ██   ████ ███████    ██    ██   ██  ██████   ██████    ██     ██████  ██   ██
 */

	var Engine = function Engine(ops) {
		this.amsu = new angularMultiSelectUtils();
		_extends(this, this.amsu.sanitize_ops(ops));

		/*
   * Initiate the database and setup index fields.
   */
		this.db = new loki();

		this.on_data_change_fn = null;
		this.on_visual_change_fn = null;
	};

	/*
  ██████  ███    ██     ██████   █████  ████████  █████       ██████ ██   ██  █████  ███    ██  ██████  ███████
 ██    ██ ████   ██     ██   ██ ██   ██    ██    ██   ██     ██      ██   ██ ██   ██ ████   ██ ██       ██
 ██    ██ ██ ██  ██     ██   ██ ███████    ██    ███████     ██      ███████ ███████ ██ ██  ██ ██   ███ █████
 ██    ██ ██  ██ ██     ██   ██ ██   ██    ██    ██   ██     ██      ██   ██ ██   ██ ██  ██ ██ ██    ██ ██
  ██████  ██   ████     ██████  ██   ██    ██    ██   ██      ██████ ██   ██ ██   ██ ██   ████  ██████  ███████
 */
	Engine.prototype.on_data_change = function (ops) {
		/*
   * Will be executed when the data in one or more of the items in the
   * tree are changed. Changes such as open/close (visibility related)
   * won't trigger this function.
   *
   * Note that this method will be ran only once after applying
   * multiple data updates if there are more than one, like for example
   * when checking a node that has multiple children.
   */

		var default_ops = {
			skip_internal: false
		};

		ops = ops || {};
		for (var k in default_ops) {
			if (!ops.hasOwnProperty(k)) {
				ops[k] = default_ops[k];
			}
		}

		if (ops.skip_internal === false) {
			/*
    * Handle situation where a maximum amount of checked leafs has been specified.
    */
			if (this.MAX_CHECKED_LEAFS > -1 && this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS] > this.MAX_CHECKED_LEAFS) {
				this.uncheck_first(this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS] - this.MAX_CHECKED_LEAFS);
			}
		}

		if (typeof this.on_data_change_fn === 'function') {
			this.on_data_change_fn();
		}
	};

	/*
  ██████  ███    ██     ██    ██ ██ ███████ ██    ██  █████  ██           ██████ ██   ██  █████  ███    ██  ██████  ███████
 ██    ██ ████   ██     ██    ██ ██ ██      ██    ██ ██   ██ ██          ██      ██   ██ ██   ██ ████   ██ ██       ██
 ██    ██ ██ ██  ██     ██    ██ ██ ███████ ██    ██ ███████ ██          ██      ███████ ███████ ██ ██  ██ ██   ███ █████
 ██    ██ ██  ██ ██      ██  ██  ██      ██ ██    ██ ██   ██ ██          ██      ██   ██ ██   ██ ██  ██ ██ ██    ██ ██
  ██████  ██   ████       ████   ██ ███████  ██████  ██   ██ ███████      ██████ ██   ██ ██   ██ ██   ████  ██████  ███████
 */
	Engine.prototype.on_visual_change = function (ops) {
		/*
  * Will be executed when the tree changed somehow, visually speaking.
  * This function could be triggered by an open/close action for example.
  * Changes such as un/checking an item won't trigger this function.
  *
  * Note that this method will be ran only once, after applying all the
  * visual changes required by the action, like for example when closing
  * a node that has multiple children.
  */

		var default_ops = {
			skip_internal: false
		};

		ops = ops || {};
		for (var k in default_ops) {
			if (!ops.hasOwnProperty(k)) {
				ops[k] = default_ops[k];
			}
		}

		if (ops.skip_internal === false) {
			//Do something here?
		}

		if (typeof this.on_visual_change_fn === 'function') {
			this.on_visual_change_fn();
		}
	};

	/*
  ██████ ██████  ███████  █████  ████████ ███████      ██████  ██████  ██      ██      ███████  ██████ ████████ ██  ██████  ███    ██
 ██      ██   ██ ██      ██   ██    ██    ██          ██      ██    ██ ██      ██      ██      ██         ██    ██ ██    ██ ████   ██
 ██      ██████  █████   ███████    ██    █████       ██      ██    ██ ██      ██      █████   ██         ██    ██ ██    ██ ██ ██  ██
 ██      ██   ██ ██      ██   ██    ██    ██          ██      ██    ██ ██      ██      ██      ██         ██    ██ ██    ██ ██  ██ ██
  ██████ ██   ██ ███████ ██   ██    ██    ███████      ██████  ██████  ███████ ███████ ███████  ██████    ██    ██  ██████  ██   ████
 */
	Engine.prototype.create_collection = function (name) {
		/*
   * Create a collection in the database and create indices.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> create_collection");

		this.collection = this.db.addCollection(name, {
			indices: [this.ID_PROPERTY, this.CHECKED_PROPERTY, angularMultiSelectConstants.INTERNAL_KEY_LEVEL, angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID, angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY]
		});

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> create_collection");
	};

	/*
 ██████  ███████ ███    ███  ██████  ██    ██ ███████      ██████  ██████  ██      ██      ███████  ██████ ████████ ██  ██████  ███    ██
 ██   ██ ██      ████  ████ ██    ██ ██    ██ ██          ██      ██    ██ ██      ██      ██      ██         ██    ██ ██    ██ ████   ██
 ██████  █████   ██ ████ ██ ██    ██ ██    ██ █████       ██      ██    ██ ██      ██      █████   ██         ██    ██ ██    ██ ██ ██  ██
 ██   ██ ██      ██  ██  ██ ██    ██  ██  ██  ██          ██      ██    ██ ██      ██      ██      ██         ██    ██ ██    ██ ██  ██ ██
 ██   ██ ███████ ██      ██  ██████    ████   ███████      ██████  ██████  ███████ ███████ ███████  ██████    ██    ██  ██████  ██   ████
 */
	Engine.prototype.remove_collection = function (name) {
		/*
   * Remove a collection from the database.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> remove_collection");

		name = name || this.NAME;
		this.db.removeCollection(name);

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> remove_collection");
	};

	/*
 ██ ███    ██ ███████ ███████ ██████  ████████
 ██ ████   ██ ██      ██      ██   ██    ██
 ██ ██ ██  ██ ███████ █████   ██████     ██
 ██ ██  ██ ██      ██ ██      ██   ██    ██
 ██ ██   ████ ███████ ███████ ██   ██    ██
 */
	Engine.prototype.insert = function (items) {
		/*
   * Iterate over an array of items and insert them.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> insert");

		this.remove_collection(this.NAME);
		this.create_collection(this.NAME);

		this.reset_stats();

		items = items || [];

		if (Array.isArray(items)) {
			for (var i = 0; i < items.length; i++) {
				this.collection.insert(items[i]);
				this.update_stats(items[i]);
			}
		} else {
			this.collection.insert(items);
			this.update_stats(items);
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> insert");

		this.on_data_change();
	};

	/*
  ██████  ███████ ████████     ███████ ████████  █████  ████████ ███████
 ██       ██         ██        ██         ██    ██   ██    ██    ██
 ██   ███ █████      ██        ███████    ██    ███████    ██    ███████
 ██    ██ ██         ██             ██    ██    ██   ██    ██         ██
  ██████  ███████    ██        ███████    ██    ██   ██    ██    ███████
 */
	Engine.prototype.get_stats = function () {
		return this.stats;
	};

	/*
 ██    ██ ██████  ██████   █████  ████████ ███████     ███████ ████████  █████  ████████ ███████
 ██    ██ ██   ██ ██   ██ ██   ██    ██    ██          ██         ██    ██   ██    ██    ██
 ██    ██ ██████  ██   ██ ███████    ██    █████       ███████    ██    ███████    ██    ███████
 ██    ██ ██      ██   ██ ██   ██    ██    ██               ██    ██    ██   ██    ██         ██
  ██████  ██      ██████  ██   ██    ██    ███████     ███████    ██    ██   ██    ██    ███████
 */
	Engine.prototype.update_stats = function (item) {
		switch (item[this.CHECKED_PROPERTY]) {
			case angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED:
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]++;
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_NODES]++;
				break;
			case angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED:
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]++;
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_NODES]++;
				break;
			case angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED:
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_NODES]++;
				break;

			case angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED:
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS]++;
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_LEAFS]++;
				break;
			case angularMultiSelectConstants.INTERNAL_DATA_LEAF_UNCHECKED:
				this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_LEAFS]++;
				break;
		}
	};

	/*
 ██████  ███████ ███████ ███████ ████████     ███████ ████████  █████  ████████ ███████
 ██   ██ ██      ██      ██         ██        ██         ██    ██   ██    ██    ██
 ██████  █████   ███████ █████      ██        ███████    ██    ███████    ██    ███████
 ██   ██ ██           ██ ██         ██             ██    ██    ██   ██    ██         ██
 ██   ██ ███████ ███████ ███████    ██        ███████    ██    ██   ██    ██    ███████
 */
	Engine.prototype.reset_stats = function () {
		var _stats;

		this.stats = (_stats = {}, _defineProperty(_stats, angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS, 0), _defineProperty(_stats, angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES, 0), _defineProperty(_stats, angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES, 0), _defineProperty(_stats, angularMultiSelectConstants.INTERNAL_STATS_TOTAL_LEAFS, 0), _defineProperty(_stats, angularMultiSelectConstants.INTERNAL_STATS_TOTAL_NODES, 0), _stats);
	};

	/*
  ██████  ███████ ████████     ███████ ██    ██ ██      ██          ████████ ██████  ███████ ███████
 ██       ██         ██        ██      ██    ██ ██      ██             ██    ██   ██ ██      ██
 ██   ███ █████      ██        █████   ██    ██ ██      ██             ██    ██████  █████   █████
 ██    ██ ██         ██        ██      ██    ██ ██      ██             ██    ██   ██ ██      ██
  ██████  ███████    ██        ██       ██████  ███████ ███████        ██    ██   ██ ███████ ███████
 */
	Engine.prototype.get_full_tree = function () {
		/*
   * Get the entire set of data currently inserted in Loki.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> get_full_tree");

		//TODO: Strip LokiJS metadata. https://github.com/techfort/LokiJS/issues/346
		var tree = this.collection.chain().find({}).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, false).data();

		if (this.DEBUG === true) console.time(this.NAME + " -> get_full_tree");

		return tree;
	};

	/*
  ██████  ███████ ████████     ██    ██ ██ ███████ ██ ██████  ██      ███████     ████████ ██████  ███████ ███████
 ██       ██         ██        ██    ██ ██ ██      ██ ██   ██ ██      ██             ██    ██   ██ ██      ██
 ██   ███ █████      ██        ██    ██ ██ ███████ ██ ██████  ██      █████          ██    ██████  █████   █████
 ██    ██ ██         ██         ██  ██  ██      ██ ██ ██   ██ ██      ██             ██    ██   ██ ██      ██
  ██████  ███████    ██          ████   ██ ███████ ██ ██████  ███████ ███████        ██    ██   ██ ███████ ███████
 */
	Engine.prototype.get_visible_tree = function () {
		/*
   * Get only the visible elements from Loki.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> get_visible_tree");

		//TODO: Strip LokiJS metadata. https://github.com/techfort/LokiJS/issues/346
		var tree = this.collection.chain().find(_defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY, angularMultiSelectConstants.INTERNAL_DATA_VISIBLE)).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, false).data();

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> get_visible_tree");

		return tree;
	};

	/*
  ██████  ███████ ████████     ███████ ██ ██   ████████ ███████ ██████  ███████ ██████      ████████ ██████  ███████ ███████
 ██       ██         ██        ██      ██ ██      ██    ██      ██   ██ ██      ██   ██        ██    ██   ██ ██      ██
 ██   ███ █████      ██        █████   ██ ██      ██    █████   ██████  █████   ██   ██        ██    ██████  █████   █████
 ██    ██ ██         ██        ██      ██ ██      ██    ██      ██   ██ ██      ██   ██        ██    ██   ██ ██      ██
  ██████  ███████    ██        ██      ██ ███████ ██    ███████ ██   ██ ███████ ██████         ██    ██   ██ ███████ ███████
 */
	Engine.prototype.get_filtered_tree = function (query) {
		if (this.DEBUG === true) console.time(this.NAME + " -> get_filtered_tree");

		var filter = [];
		for (var i = 0; i < query.length; i++) {
			var item = query[i];
			filter.push(_defineProperty({}, item.field, {
				'$contains': item.query
			}));
		}

		//TODO: Strip LokiJS metadata. https://github.com/techfort/LokiJS/issues/346
		var tree = this.collection.chain().find({
			'$and': filter
		}).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, false).data();

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> get_filtered_tree");

		return tree;
	};

	/*
  ██████  ███████ ████████      ██████ ██   ██ ███████  ██████ ██   ██ ███████ ██████      ████████ ██████  ███████ ███████
 ██       ██         ██        ██      ██   ██ ██      ██      ██  ██  ██      ██   ██        ██    ██   ██ ██      ██
 ██   ███ █████      ██        ██      ███████ █████   ██      █████   █████   ██   ██        ██    ██████  █████   █████
 ██    ██ ██         ██        ██      ██   ██ ██      ██      ██  ██  ██      ██   ██        ██    ██   ██ ██      ██
  ██████  ███████    ██         ██████ ██   ██ ███████  ██████ ██   ██ ███████ ██████         ██    ██   ██ ███████ ███████
 */
	Engine.prototype.get_checked_tree = function (filter) {
		/*
   * Get only the checked elements from Loki.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> get_checked_tree");

		var query_filter;
		switch (filter) {
			case angularMultiSelectConstants.FIND_LEAFS:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED];
				break;

			case angularMultiSelectConstants.FIND_LEAFS_MIXED_NODES:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED, angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED];
				break;

			case angularMultiSelectConstants.FIND_LEAFS_CHECKED_NODES:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED, angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED];
				break;

			case angularMultiSelectConstants.FIND_LEAFS_MIXED_CHECKED_NODES:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED, angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED, angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED];
				break;

			case angularMultiSelectConstants.FIND_MIXED_NODES:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED];
				break;

			case angularMultiSelectConstants.FIND_CHECKED_NODES:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED];
				break;

			case angularMultiSelectConstants.FIND_MIXED_CHECKED_NODES:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED, angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED];
				break;

			default:
				query_filter = [angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED];
				break;
		}

		//TODO: Strip LokiJS metadata. https://github.com/techfort/LokiJS/issues/346
		var tree = this.collection.chain().find(_defineProperty({}, this.CHECKED_PROPERTY, {
			'$in': query_filter
		})).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, false).data();

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> get_checked_tree");

		return tree;
	};

	/*
  ██████  ███████ ████████     ██ ████████ ███████ ███    ███
 ██       ██         ██        ██    ██    ██      ████  ████
 ██   ███ █████      ██        ██    ██    █████   ██ ████ ██
 ██    ██ ██         ██        ██    ██    ██      ██  ██  ██
  ██████  ███████    ██        ██    ██    ███████ ██      ██
 */
	Engine.prototype.get_item = function (item) {
		if ((typeof item === "undefined" ? "undefined" : _typeof(item)) !== 'object' || Object.keys(item).length === 0) return {};

		var filter = [];
		for (var k in item) {
			filter.push(_defineProperty({}, k, item[k]));
		}

		var res = this.collection.find({
			'$and': filter
		});

		if (Array.isArray(res) && res.length > 0) {
			return res[0];
		} else {
			return {};
		}
	};

	/*
 ████████  ██████   ██████   ██████  ██      ███████      ██████  ██████  ███████ ███    ██
    ██    ██    ██ ██       ██       ██      ██          ██    ██ ██   ██ ██      ████   ██
    ██    ██    ██ ██   ███ ██   ███ ██      █████       ██    ██ ██████  █████   ██ ██  ██
    ██    ██    ██ ██    ██ ██    ██ ██      ██          ██    ██ ██      ██      ██  ██ ██
    ██     ██████   ██████   ██████  ███████ ███████      ██████  ██      ███████ ██   ████
 */
	Engine.prototype.toggle_open_node = function (item) {
		/*
   * Toggle the open/closed state of an element.
   * Note that leafs are not supposed to be toggleable.
   */
		if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) return;

		if (item[this.OPEN_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_OPEN) {
			this.close_node(item);
		} else {
			this.open_node(item);
		}

		this.on_visual_change();
	};

	/*
  ██████  ██████  ███████ ███    ██     ███    ██  ██████  ██████  ███████
 ██    ██ ██   ██ ██      ████   ██     ████   ██ ██    ██ ██   ██ ██
 ██    ██ ██████  █████   ██ ██  ██     ██ ██  ██ ██    ██ ██   ██ █████
 ██    ██ ██      ██      ██  ██ ██     ██  ██ ██ ██    ██ ██   ██ ██
  ██████  ██      ███████ ██   ████     ██   ████  ██████  ██████  ███████
 */
	Engine.prototype.open_node = function (item) {
		var _this = this;

		/*
   * Open an item.
   * First, mark the item itself as open, then find all
   * the children items of that item and iterate over the
   * results. For each item:
   *
   * If the item is a node and it's closed, we'll create
   * a rule such that it will skip the next N items on the
   * result. Else mark the item as visible.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> open_node");

		var skip = 0;

		this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, item[this.ID_PROPERTY])).update(function (obj) {
			obj[_this.OPEN_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_OPEN;
		});

		this.collection.chain().find({
			'$and': [_defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID, {
				'$contains': item[this.ID_PROPERTY]
			}), _defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_LEVEL, {
				'$gte': item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] + 1
			})]
		}).limit(item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] + item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_NODES]).update(function (obj) {
			if (skip > 0) {
				skip--;
				return;
			}

			if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] > 0 && obj[_this.OPEN_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_CLOSED) {
				skip = obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] + obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_NODES];
			}

			obj[angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY] = angularMultiSelectConstants.INTERNAL_DATA_VISIBLE;
		});

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> open_node");
	};

	/*
  ██████ ██       ██████  ███████ ███████     ███    ██  ██████  ██████  ███████
 ██      ██      ██    ██ ██      ██          ████   ██ ██    ██ ██   ██ ██
 ██      ██      ██    ██ ███████ █████       ██ ██  ██ ██    ██ ██   ██ █████
 ██      ██      ██    ██      ██ ██          ██  ██ ██ ██    ██ ██   ██ ██
  ██████ ███████  ██████  ███████ ███████     ██   ████  ██████  ██████  ███████
 */
	Engine.prototype.close_node = function (item) {
		var _this2 = this;

		/*
   * Close an item.
   * First, mark the item itself as closed, then find all
   * children and mark then as invisible.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> close_node");

		this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, item[this.ID_PROPERTY])).update(function (obj) {
			obj[_this2.OPEN_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_CLOSED;
		});

		this.collection.chain().find({
			'$and': [_defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID, {
				'$contains': item[this.ID_PROPERTY]
			}), _defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_LEVEL, {
				'$gte': item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] + 1
			})]
		}).limit(item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] + item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_NODES]).update(function (obj) {
			obj[angularMultiSelectConstants.INTERNAL_KEY_TREE_VISIBILITY] = angularMultiSelectConstants.INTERNAL_DATA_INVISIBLE;
		});

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> close_node");
	};

	/*
  ██████ ██   ██ ███████  ██████ ██   ██      █████  ██      ██
 ██      ██   ██ ██      ██      ██  ██      ██   ██ ██      ██
 ██      ███████ █████   ██      █████       ███████ ██      ██
 ██      ██   ██ ██      ██      ██  ██      ██   ██ ██      ██
  ██████ ██   ██ ███████  ██████ ██   ██     ██   ██ ███████ ███████
 */
	Engine.prototype.check_all = function () {
		var _this3 = this;

		if (this.DEBUG === true) console.time(this.NAME + " -> check_all");

		this.collection.chain().find({}).update(function (obj) {
			if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
				obj[_this3.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED;
			} else {
				obj[_this3.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED;
				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS];
			}
		});

		this.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES] = 0;
		this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS] = this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_LEAFS];
		this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES] = this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_NODES];

		if (this.DEBUG === true) console.time(this.NAME + " -> check_all");

		this.on_data_change();
	};

	/*
 ██    ██ ███    ██  ██████ ██   ██ ███████  ██████ ██   ██      █████  ██      ██
 ██    ██ ████   ██ ██      ██   ██ ██      ██      ██  ██      ██   ██ ██      ██
 ██    ██ ██ ██  ██ ██      ███████ █████   ██      █████       ███████ ██      ██
 ██    ██ ██  ██ ██ ██      ██   ██ ██      ██      ██  ██      ██   ██ ██      ██
  ██████  ██   ████  ██████ ██   ██ ███████  ██████ ██   ██     ██   ██ ███████ ███████
 */
	Engine.prototype.uncheck_all = function () {
		var _this4 = this;

		if (this.DEBUG === true) console.time(this.NAME + " -> uncheck_all");

		this.collection.chain().find({}).update(function (obj) {
			if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
				obj[_this4.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_LEAF_UNCHECKED;
			} else {
				obj[_this4.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED;
				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = 0;
			}
		});

		this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS] = 0;
		this.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES] = 0;
		this.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES] = this.stats[angularMultiSelectConstants.INTERNAL_STATS_TOTAL_NODES];

		if (this.DEBUG === true) console.time(this.NAME + " -> uncheck_all");

		this.on_data_change();
	};

	/*
 ████████  ██████   ██████   ██████  ██      ███████      ██████ ██   ██ ███████  ██████ ██   ██
    ██    ██    ██ ██       ██       ██      ██          ██      ██   ██ ██      ██      ██  ██
    ██    ██    ██ ██   ███ ██   ███ ██      █████       ██      ███████ █████   ██      █████
    ██    ██    ██ ██    ██ ██    ██ ██      ██          ██      ██   ██ ██      ██      ██  ██
    ██     ██████   ██████   ██████  ███████ ███████      ██████ ██   ██ ███████  ██████ ██   ██
 */
	Engine.prototype.toggle_check_node = function (item, ops) {
		/*
   * Toggle the checked state on an item.
   * Note that there are, in total, 5 different states:
   *
   * true: checked leaf.
   * false: unchecked leaf.
   * -1: all children leafs of the node are unchecked.
   * 0: at least one children leaf of the node is checked.
   * 1: all children leafs of the node are checked.
   *
   * If the node/item is (fully) checked, uncheck, else check.
   */
		switch (item[this.CHECKED_PROPERTY]) {
			case angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED:
			case angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED:
				this.uncheck_node(item, ops);
				break;
			case angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED:
			case angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED:
			case angularMultiSelectConstants.INTERNAL_DATA_LEAF_UNCHECKED:
				this.check_node(item, ops);
				break;
		}
	};

	/*
  ██████ ██   ██ ███████  ██████ ██   ██     ███    ██  ██████  ██████  ███████     ██████  ██    ██
 ██      ██   ██ ██      ██      ██  ██      ████   ██ ██    ██ ██   ██ ██          ██   ██  ██  ██
 ██      ███████ █████   ██      █████       ██ ██  ██ ██    ██ ██   ██ █████       ██████    ████
 ██      ██   ██ ██      ██      ██  ██      ██  ██ ██ ██    ██ ██   ██ ██          ██   ██    ██
  ██████ ██   ██ ███████  ██████ ██   ██     ██   ████  ██████  ██████  ███████     ██████     ██
 */
	Engine.prototype.check_node_by = function (where) {
		if (this.DEBUG === true) console.time(this.NAME + " -> check_node_by");

		var _where = _slicedToArray(where, 2);

		var key = _where[0];
		var value = _where[1];

		var item = this.collection.findOne({
			"$and": [_defineProperty({}, key, value), _defineProperty({}, this.CHECKED_PROPERTY, {
				'$nin': [angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED, angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED]
			})]
		});

		if (item !== null) {
			this.check_node(item);
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> check_node_by");
	};

	/*
  ██████ ██   ██ ███████  ██████ ██   ██     ███    ██  ██████  ██████  ███████
 ██      ██   ██ ██      ██      ██  ██      ████   ██ ██    ██ ██   ██ ██
 ██      ███████ █████   ██      █████       ██ ██  ██ ██    ██ ██   ██ █████
 ██      ██   ██ ██      ██      ██  ██      ██  ██ ██ ██    ██ ██   ██ ██
  ██████ ██   ██ ███████  ██████ ██   ██     ██   ████  ██████  ██████  ███████
 */
	Engine.prototype.check_node = function (item, ops) {
		var _this5 = this;

		if (this.DEBUG === true) console.time(this.NAME + " -> check_node");

		var default_ops = {
			call_on_data_change: true
		};

		ops = ops || {};
		for (var k in default_ops) {
			if (!ops.hasOwnProperty(k)) {
				ops[k] = default_ops[k];
			}
		}

		/*
   * Used for internal calculations.
   */
		var time = new Date();
		var diff_checked_children = 0;
		var currently_checked_children = item[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN];

		//TODO: Optimize when MAX_CHECKED_LEAFS is set?

		/*
   * If the item is a leaf, mark it as checked.
   * If the item is a note, set it's counter of checked leafs to the number of leafs it contains.
   */
		this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, item[this.ID_PROPERTY])).update(function (obj) {
			if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
				_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS]++;

				obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED;
			} else {
				if (obj[_this5.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED) {
					_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]--;
				}
				_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]++;

				obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED;
				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS];
				diff_checked_children = obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] - currently_checked_children;
			}

			obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
		});

		/*
   * If the passed item is a leaf, search all parent nodes,
   * add 1 to their checked_children counter and set their
   * checked state based on the checked_children counter.
   *
   */
		if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
			this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, {
				'$in': item[angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID]
			})).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, true).update(function (obj) {
				if (obj[_this5.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED) {
					_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]--;
				}
				if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] + 1 === obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS]) {
					_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]++;
				}

				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN]++; // We can't overflow this as we're checking an unchecked item
				if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] === obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS]) {
					obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED;
				} else {
					obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED;
				}

				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
			});
			/*
    * If it's a node:
    *     1. Search all children leafs and nodes and mark them as checked.
    *     2. Search all parent nodes,
    *        add N to their checked_children counter and
    *        set their checked state based on the checked_children counter.
    *        N is the difference between the checked leafs of the nodes we're checking
    *        before and after the operation.
    */
		} else {
				this.collection.chain().find({
					'$and': [_defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID, {
						'$contains': item[this.ID_PROPERTY]
					}), _defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_LEVEL, {
						'$gte': item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] + 1
					}), _defineProperty({}, this.CHECKED_PROPERTY, {
						'$in': [angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED, angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED, angularMultiSelectConstants.INTERNAL_DATA_LEAF_UNCHECKED]
					})]
				}).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, false).update(function (obj) {
					if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
						_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS]++;

						obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED;
					} else {
						_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]++;
						if (obj[_this5.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED) {
							_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]--;
						}

						obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED;
						obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS];
					}

					obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
				});

				this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, {
					'$in': item[angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID]
				})).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, true).update(function (obj) {
					if (obj[_this5.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED) {
						_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]--;
					}
					if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] + diff_checked_children === obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS]) {
						_this5.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]++;
					}

					obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] += diff_checked_children;
					if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] === obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS]) {
						obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED;
					} else {
						obj[_this5.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED;
					}

					obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
				});
			}

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> check_node");

		if (ops.call_on_data_change) {
			this.on_data_change();
		}
	};

	/*
 ██    ██ ███    ██  ██████ ██   ██ ███████  ██████ ██   ██     ███    ██  ██████  ██████  ███████
 ██    ██ ████   ██ ██      ██   ██ ██      ██      ██  ██      ████   ██ ██    ██ ██   ██ ██
 ██    ██ ██ ██  ██ ██      ███████ █████   ██      █████       ██ ██  ██ ██    ██ ██   ██ █████
 ██    ██ ██  ██ ██ ██      ██   ██ ██      ██      ██  ██      ██  ██ ██ ██    ██ ██   ██ ██
  ██████  ██   ████  ██████ ██   ██ ███████  ██████ ██   ██     ██   ████  ██████  ██████  ███████
 */
	Engine.prototype.uncheck_node = function (item, ops) {
		var _this6 = this;

		if (this.DEBUG === true) console.time(this.NAME + " -> uncheck_node");

		var default_ops = {
			call_on_data_change: true
		};

		ops = ops || {};
		for (var k in default_ops) {
			if (!ops.hasOwnProperty(k)) {
				ops[k] = default_ops[k];
			}
		}

		/*
   * Used for internal calculations.
   */
		var time = new Date();
		var diff_checked_children = 0;
		var currently_checked_children = item[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN];

		/*
   * If the item is a leaf, mark it as unchecked.
   * If the item is a note, set it's counter of checked leafs to the number of leafs it contains.
   */
		this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, item[this.ID_PROPERTY])).update(function (obj) {
			if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
				_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS]--;

				obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_LEAF_UNCHECKED;
			} else {
				_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]--;
				_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]++;

				obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED;
				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = 0;
				diff_checked_children = currently_checked_children - obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN];
			}

			obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
		});

		/*
   * If the passed item is a leaf, search all parent nodes,
   * substract 1 from their checked_children counter and set their
   * checked state based on the checked_children counter.
   */
		if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
			this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, {
				'$in': item[angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID]
			})).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, true).update(function (obj) {
				if (obj[_this6.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED) {
					_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]--;
				}
				if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] - 1 === 0) {
					_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]++;
				}

				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN]--; // We can't underflow this as we're unchecking a checked item
				if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] === 0) {
					obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED;
				} else {
					obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED;
				}

				obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
			});
			/*
    * If it's a node:
    *     1. Search all children leafs and nodes and mark them as unchecked.
    *     2. Search all parent nodes,
    *        substract N from their checked_children counter and
    *        set their checked state based on the checked_children counter.
    *        N is the difference between the checked leafs of the nodes we're checking
    *        before and after the operation.
    */
		} else {
				this.collection.chain().find({
					'$and': [_defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID, {
						'$contains': item[this.ID_PROPERTY]
					}), _defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_LEVEL, {
						'$gte': item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL] + 1
					}), _defineProperty({}, this.CHECKED_PROPERTY, {
						'$in': [angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED, angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED, angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED]
					})]
				}).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, false).update(function (obj) {
					if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
						_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_LEAFS]--;

						obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_LEAF_UNCHECKED;
					} else {
						_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]++;
						if (obj[_this6.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED) {
							_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]--;
						}

						obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED;
						obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] = 0;
					}

					obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
				});

				this.collection.chain().find(_defineProperty({}, this.ID_PROPERTY, {
					'$in': item[angularMultiSelectConstants.INTERNAL_KEY_PARENTS_ID]
				})).simplesort(angularMultiSelectConstants.INTERNAL_KEY_ORDER, true).update(function (obj) {
					if (obj[_this6.CHECKED_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_NODE_CHECKED) {
						_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_CHECKED_NODES]--;
					}
					if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] - diff_checked_children === 0) {
						_this6.stats[angularMultiSelectConstants.INTERNAL_STATS_UNCHECKED_NODES]++;
					}

					obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] -= diff_checked_children;
					if (obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_CHILDREN] === 0) {
						obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_UNCHECKED;
					} else {
						obj[_this6.CHECKED_PROPERTY] = angularMultiSelectConstants.INTERNAL_DATA_NODE_MIXED;
					}

					obj[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] = time.getTime();
				});
			}

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> uncheck_node");

		if (ops.call_on_data_change) {
			this.on_data_change();
		}
	};

	/*
 ██    ██ ███    ██  ██████ ██   ██ ███████  ██████ ██   ██     ███████ ██ ██████  ███████ ████████
 ██    ██ ████   ██ ██      ██   ██ ██      ██      ██  ██      ██      ██ ██   ██ ██         ██
 ██    ██ ██ ██  ██ ██      ███████ █████   ██      █████       █████   ██ ██████  ███████    ██
 ██    ██ ██  ██ ██ ██      ██   ██ ██      ██      ██  ██      ██      ██ ██   ██      ██    ██
  ██████  ██   ████  ██████ ██   ██ ███████  ██████ ██   ██     ██      ██ ██   ██ ███████    ██
 */
	Engine.prototype.uncheck_first = function (n) {
		/*
   * Find the oldest n leaf that have been marked as checked and uncheck them.
   * This function is used to control the maximum amount of checked leafs.
   */
		if (this.DEBUG === true) console.time(this.NAME + " -> uncheck_first");

		n = n || 1;

		var leaf = this.collection.chain().find({
			'$and': [_defineProperty({}, this.CHECKED_PROPERTY, angularMultiSelectConstants.INTERNAL_DATA_LEAF_CHECKED), _defineProperty({}, angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS, 0)]

		})
		/*
   * Each element is guaranteed to have an INTERNAL_KEY_CHECKED_MODIFICATION
   * field that contains a unixtime date of the last time the item has
   * changed it's checked state.
   * If the fields of two elements match, then sort by the order field.
   * This exception should happen only when this method is called on a verbatim
   * tree that hasn't been modified in any way, meaning, right after a
   * call to this.insert().
   */
		.sort(function (a, b) {
			var diff = a[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION] - b[angularMultiSelectConstants.INTERNAL_KEY_CHECKED_MODIFICATION];
			if (diff === 0) {
				return a[angularMultiSelectConstants.INTERNAL_KEY_ORDER] - b[angularMultiSelectConstants.INTERNAL_KEY_ORDER];
			} else {
				return diff;
			}
		}).limit(n).data();

		for (var i = 0; i < leaf.length; i++) {
			this.toggle_check_node(leaf[i], {
				call_on_data_change: false
			});
		}

		if (this.DEBUG === true) console.timeEnd(this.NAME + " -> uncheck_first");
	};

	return Engine;
}]);

var angular_multi_select_styles_helper = angular.module('angular-multi-select-styles-helper', ['angular-multi-select-utils', 'angular-multi-select-constants']);

angular_multi_select_styles_helper.run([function () {
	'use strict';
	/*
  * This is used to generate some CSS styling at runtime.
  * This code as ran after everything else is loaded and
  * uses "document.styleSheets" to read the loaded CSS styling.
  *
  * * The right padding of each element is extended with as many
  * pixels as the width of the check marker.
  *
  * * 20 levels of indent classes are generated based on the
  * width of the first level.
  */

	var inject = angular.element("<style>");

	//Default values, just in case...
	var check_width = 10;
	var level_width = 20;

	var styles = document.styleSheets || [];
	for (var i = 0; i < styles.length; i++) {
		var style = styles[i];

		if (!style.href || style.href.indexOf("angular-multi-select") === -1) {
			continue;
		}

		var rules = style.cssRules || [];
		for (var j = 0; j < rules.length; j++) {
			var rule = rules[j];

			switch (rule.selectorText) {
				case ".ams-item .check":
					check_width = parseInt(rule.style.width);
					break;
				case ".ams-item-level-0":
					level_width = parseInt(rule.style.paddingLeft);
					break;
			}
		}
	}

	var indent = "";
	for (i = 1; i < 20; i++) {
		indent += ".ams-item-level-" + i + " { padding-left: " + (i + 1) * level_width + "px; }";
	}
	inject.text(".ams-item { padding-right: " + (check_width + 10) + "px; } " + indent);
	angular.element(document.getElementsByTagName('head')).append(inject);
}]);

angular_multi_select_styles_helper.factory('angularMultiSelectStylesHelper', ['$sce', '$interpolate', 'angularMultiSelectUtils', 'angularMultiSelectConstants', function ($sce, $interpolate, angularMultiSelectUtils, angularMultiSelectConstants) {
	'use strict';
	/*
  ██████  ██████  ███    ██ ███████ ████████ ██████  ██    ██  ██████ ████████  ██████  ██████
 ██      ██    ██ ████   ██ ██         ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██
 ██      ██    ██ ██ ██  ██ ███████    ██    ██████  ██    ██ ██         ██    ██    ██ ██████
 ██      ██    ██ ██  ██ ██      ██    ██    ██   ██ ██    ██ ██         ██    ██    ██ ██   ██
  ██████  ██████  ██   ████ ███████    ██    ██   ██  ██████   ██████    ██     ██████  ██   ██
 */

	var StylesHelper = function StylesHelper(ops, attrs) {
		attrs = attrs || {};
		this.amsu = new angularMultiSelectUtils();
		_extends(this, this.amsu.sanitize_ops(ops));

		this.START_REPLACE_SYMBOL_REGEX = /<\[/g;
		this.END_REPLACE_SYMBOL_REGEX = /\]>/g;
		this.START_INTERPOLATE_SYMBOL = $interpolate.startSymbol();
		this.END_INTERPOLATE_SYMBOL = $interpolate.endSymbol();

		this.START_REPLACE_SYMBOL_ALTERNATIVE_REGEX = /<#/g;
		this.END_REPLACE_SYMBOL_ALTERNATIVE_REGEX = /#>/g;
		this.START_INTERPOLATE_SYMBOL_ALTERNATIVE = $interpolate.startSymbol();
		this.END_INTERPOLATE_SYMBOL_ALTERNATIVE = $interpolate.endSymbol();

		this.START_REPLACE_SYMBOL_ALTERNATIVE2_REGEX = /<\(/g;
		this.END_REPLACE_SYMBOL_ALTERNATIVE2_REGEX = /\)>/g;
		this.START_INTERPOLATE_SYMBOL_ALTERNATIVE2 = $interpolate.startSymbol();
		this.END_INTERPOLATE_SYMBOL_ALTERNATIVE2 = $interpolate.endSymbol();

		this.START_REPLACE_SYMBOL_ALTERNATIVE_REPETITIVE_REGEX = /<#/g;
		this.END_REPLACE_SYMBOL_ALTERNATIVE_REPETITIVE_REGEX = /#>/g;
		this.START_INTERPOLATE_SYMBOL_ALTERNATIVE_REPETITIVE = '<[' + $interpolate.startSymbol();
		this.END_INTERPOLATE_SYMBOL_ALTERNATIVE_REPETITIVE = $interpolate.endSymbol() + ']>';

		/*
   * String representation of nodes/leafs and dropdown label.
   */
		this.dropdown_repr_attr = attrs.dropdownLabel || "";
		this.dropdown_repr = this.interpolate_alternative(this.dropdown_repr_attr)({ angularMultiSelectConstants: angularMultiSelectConstants });
		this.dropdown_repr = this.interpolate(this.dropdown_repr);

		this.node_repr_attr = attrs.nodeLabel || "";
		this.node_repr = this.interpolate_alternative_repetitive(this.node_repr_attr)({ angularMultiSelectConstants: angularMultiSelectConstants });
		this.node_repr = this.interpolate(this.node_repr);

		this.leaf_repr_attr = attrs.leafLabel || "";
		this.leaf_repr = this.interpolate_alternative_repetitive(this.leaf_repr_attr)({ angularMultiSelectConstants: angularMultiSelectConstants });
		this.leaf_repr = this.interpolate(this.leaf_repr);
	};

	/*
  ██████  ███████ ████████     ██      ███████ ██    ██ ███████ ██           ██████ ██       █████  ███████ ███████
 ██       ██         ██        ██      ██      ██    ██ ██      ██          ██      ██      ██   ██ ██      ██
 ██   ███ █████      ██        ██      █████   ██    ██ █████   ██          ██      ██      ███████ ███████ ███████
 ██    ██ ██         ██        ██      ██       ██  ██  ██      ██          ██      ██      ██   ██      ██      ██
  ██████  ███████    ██        ███████ ███████   ████   ███████ ███████      ██████ ███████ ██   ██ ███████ ███████
 */
	StylesHelper.prototype.get_level_class = function (item) {
		return "ams-item-level-" + item[angularMultiSelectConstants.INTERNAL_KEY_LEVEL];
	};

	/*
  ██████  ███████ ████████      ██████  ██████  ███████ ███    ██      ██████ ██       █████  ███████ ███████
 ██       ██         ██        ██    ██ ██   ██ ██      ████   ██     ██      ██      ██   ██ ██      ██
 ██   ███ █████      ██        ██    ██ ██████  █████   ██ ██  ██     ██      ██      ███████ ███████ ███████
 ██    ██ ██         ██        ██    ██ ██      ██      ██  ██ ██     ██      ██      ██   ██      ██      ██
  ██████  ███████    ██         ██████  ██      ███████ ██   ████      ██████ ███████ ██   ██ ███████ ███████
 */
	StylesHelper.prototype.get_open_class = function (item) {
		if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
			return '';
		}

		return item[this.OPEN_PROPERTY] === true ? angularMultiSelectConstants.CSS_OPEN : angularMultiSelectConstants.CSS_CLOSED;
	};

	/*
  ██████  ███████ ████████      ██████ ██   ██ ███████  ██████ ██   ██ ███████ ██████       ██████ ██       █████  ███████ ███████
 ██       ██         ██        ██      ██   ██ ██      ██      ██  ██  ██      ██   ██     ██      ██      ██   ██ ██      ██
 ██   ███ █████      ██        ██      ███████ █████   ██      █████   █████   ██   ██     ██      ██      ███████ ███████ ███████
 ██    ██ ██         ██        ██      ██   ██ ██      ██      ██  ██  ██      ██   ██     ██      ██      ██   ██      ██      ██
  ██████  ███████    ██         ██████ ██   ██ ███████  ██████ ██   ██ ███████ ██████       ██████ ███████ ██   ██ ███████ ███████
 */
	StylesHelper.prototype.get_checked_class = function (item) {
		if (typeof item[this.CHECKED_PROPERTY] === 'boolean') {
			return item[this.CHECKED_PROPERTY] ? angularMultiSelectConstants.CSS_LEAF_CHECKED : angularMultiSelectConstants.CSS_LEAF_UNCHECKED;
		} else {
			return item[this.CHECKED_PROPERTY] < 0 ? angularMultiSelectConstants.CSS_NODE_UNCHECKED : item[this.CHECKED_PROPERTY] > 0 ? angularMultiSelectConstants.CSS_NODE_CHECKED : angularMultiSelectConstants.CSS_NODE_MIXED;
		}
	};

	/*
  ██████  ███████ ████████     ████████ ██    ██ ██████  ███████      ██████ ██       █████  ███████ ███████
 ██       ██         ██           ██     ██  ██  ██   ██ ██          ██      ██      ██   ██ ██      ██
 ██   ███ █████      ██           ██      ████   ██████  █████       ██      ██      ███████ ███████ ███████
 ██    ██ ██         ██           ██       ██    ██      ██          ██      ██      ██   ██      ██      ██
  ██████  ███████    ██           ██       ██    ██      ███████      ██████ ███████ ██   ██ ███████ ███████
 */
	StylesHelper.prototype.get_type_class = function (item) {
		return item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0 ? angularMultiSelectConstants.CSS_LEAF : angularMultiSelectConstants.CSS_NODE;
	};

	/*
 ██ ███    ██ ████████ ███████ ██████  ██████   ██████  ██       █████  ████████ ███████
 ██ ████   ██    ██    ██      ██   ██ ██   ██ ██    ██ ██      ██   ██    ██    ██
 ██ ██ ██  ██    ██    █████   ██████  ██████  ██    ██ ██      ███████    ██    █████
 ██ ██  ██ ██    ██    ██      ██   ██ ██      ██    ██ ██      ██   ██    ██    ██
 ██ ██   ████    ██    ███████ ██   ██ ██       ██████  ███████ ██   ██    ██    ███████
 */
	StylesHelper.prototype.interpolate = function (str) {
		/*
   * Interpolation method used to interpolate <[ ]>.
   * This is normaly used to interpolate the data of nodes/leafs.
   */
		str = str.replace(this.START_REPLACE_SYMBOL_REGEX, this.START_INTERPOLATE_SYMBOL).replace(this.END_REPLACE_SYMBOL_REGEX, this.END_INTERPOLATE_SYMBOL);
		return $interpolate(str);
	};

	/*
 ██ ███    ██ ████████ ███████ ██████  ██████   ██████  ██       █████  ████████ ███████      █████  ██   ████████ ███████ ██████  ███    ██  █████  ████████ ██ ██    ██ ███████
 ██ ████   ██    ██    ██      ██   ██ ██   ██ ██    ██ ██      ██   ██    ██    ██          ██   ██ ██      ██    ██      ██   ██ ████   ██ ██   ██    ██    ██ ██    ██ ██
 ██ ██ ██  ██    ██    █████   ██████  ██████  ██    ██ ██      ███████    ██    █████       ███████ ██      ██    █████   ██████  ██ ██  ██ ███████    ██    ██ ██    ██ █████
 ██ ██  ██ ██    ██    ██      ██   ██ ██      ██    ██ ██      ██   ██    ██    ██          ██   ██ ██      ██    ██      ██   ██ ██  ██ ██ ██   ██    ██    ██  ██  ██  ██
 ██ ██   ████    ██    ███████ ██   ██ ██       ██████  ███████ ██   ██    ██    ███████     ██   ██ ███████ ██    ███████ ██   ██ ██   ████ ██   ██    ██    ██   ████   ███████
 */
	StylesHelper.prototype.interpolate_alternative = function (str) {
		/*
   * Interpolation method used to interpolate <# #>.
   * This is normaly used to interpolate the data of the dropdown label, but
   * can also be used to interpolate internal data.
   */
		str = str.replace(this.START_REPLACE_SYMBOL_ALTERNATIVE_REGEX, this.START_INTERPOLATE_SYMBOL_ALTERNATIVE).replace(this.END_REPLACE_SYMBOL_ALTERNATIVE_REGEX, this.END_INTERPOLATE_SYMBOL_ALTERNATIVE);
		return $interpolate(str);
	};

	/*
 ██ ███    ██ ████████ ███████ ██████  ██████   ██████  ██       █████  ████████ ███████      █████  ██   ████████ ███████ ██████  ███    ██  █████  ████████ ██ ██    ██ ███████     ██████
 ██ ████   ██    ██    ██      ██   ██ ██   ██ ██    ██ ██      ██   ██    ██    ██          ██   ██ ██      ██    ██      ██   ██ ████   ██ ██   ██    ██    ██ ██    ██ ██               ██
 ██ ██ ██  ██    ██    █████   ██████  ██████  ██    ██ ██      ███████    ██    █████       ███████ ██      ██    █████   ██████  ██ ██  ██ ███████    ██    ██ ██    ██ █████        █████
 ██ ██  ██ ██    ██    ██      ██   ██ ██      ██    ██ ██      ██   ██    ██    ██          ██   ██ ██      ██    ██      ██   ██ ██  ██ ██ ██   ██    ██    ██  ██  ██  ██          ██
 ██ ██   ████    ██    ███████ ██   ██ ██       ██████  ███████ ██   ██    ██    ███████     ██   ██ ███████ ██    ███████ ██   ██ ██   ████ ██   ██    ██    ██   ████   ███████     ███████
 */
	StylesHelper.prototype.interpolate_alternative2 = function (str) {
		/*
   * Interpolation method used to interpolate <( )>.
   * This is normaly used to interpolate the data of each output model
   * item in the dropdown label.
   */
		str = str.replace(this.START_REPLACE_SYMBOL_ALTERNATIVE2_REGEX, this.START_INTERPOLATE_SYMBOL_ALTERNATIVE2).replace(this.END_REPLACE_SYMBOL_ALTERNATIVE2_REGEX, this.END_INTERPOLATE_SYMBOL_ALTERNATIVE2);
		return $interpolate(str);
	};

	/*
 ██ ███    ██ ████████ ███████ ██████  ██████   ██████  ██       █████  ████████ ███████      █████  ██   ████████ ███████ ██████  ███    ██  █████  ████████ ██ ██    ██ ███████     ██████  ███████ ██████  ███████ ████████ ██ ████████ ██ ██    ██ ███████
 ██ ████   ██    ██    ██      ██   ██ ██   ██ ██    ██ ██      ██   ██    ██    ██          ██   ██ ██      ██    ██      ██   ██ ████   ██ ██   ██    ██    ██ ██    ██ ██          ██   ██ ██      ██   ██ ██         ██    ██    ██    ██ ██    ██ ██
 ██ ██ ██  ██    ██    █████   ██████  ██████  ██    ██ ██      ███████    ██    █████       ███████ ██      ██    █████   ██████  ██ ██  ██ ███████    ██    ██ ██    ██ █████       ██████  █████   ██████  █████      ██    ██    ██    ██ ██    ██ █████
 ██ ██  ██ ██    ██    ██      ██   ██ ██      ██    ██ ██      ██   ██    ██    ██          ██   ██ ██      ██    ██      ██   ██ ██  ██ ██ ██   ██    ██    ██  ██  ██  ██          ██   ██ ██      ██      ██         ██    ██    ██    ██  ██  ██  ██
 ██ ██   ████    ██    ███████ ██   ██ ██       ██████  ███████ ██   ██    ██    ███████     ██   ██ ███████ ██    ███████ ██   ██ ██   ████ ██   ██    ██    ██   ████   ███████     ██   ██ ███████ ██      ███████    ██    ██    ██    ██   ████   ███████
 */
	StylesHelper.prototype.interpolate_alternative_repetitive = function (str) {
		/*
   * Interpolation method used to interpolate <# #>.
   * This is normaly used to interpolate the data of the nodes/leafs, but
   * there is one difference between this method and 'interpolate'. This method
   * is suitable to be called and then chain a call to 'interpolate'. This is
   * useful when the user wants to interpolate some constant values from
   * angularMultiSelectConstants and then interpolate those values with a node/leaf.
   */
		str = str.replace(this.START_REPLACE_SYMBOL_ALTERNATIVE_REPETITIVE_REGEX, this.START_INTERPOLATE_SYMBOL_ALTERNATIVE_REPETITIVE).replace(this.END_REPLACE_SYMBOL_ALTERNATIVE_REPETITIVE_REGEX, this.END_INTERPOLATE_SYMBOL_ALTERNATIVE_REPETITIVE);
		return $interpolate(str);
	};

	/*
  ██████ ██████  ███████  █████  ████████ ███████     ██████  ██████   ██████  ██████  ██████   ██████  ██     ██ ███    ██     ██       █████  ██████  ███████ ██
 ██      ██   ██ ██      ██   ██    ██    ██          ██   ██ ██   ██ ██    ██ ██   ██ ██   ██ ██    ██ ██     ██ ████   ██     ██      ██   ██ ██   ██ ██      ██
 ██      ██████  █████   ███████    ██    █████       ██   ██ ██████  ██    ██ ██████  ██   ██ ██    ██ ██  █  ██ ██ ██  ██     ██      ███████ ██████  █████   ██
 ██      ██   ██ ██      ██   ██    ██    ██          ██   ██ ██   ██ ██    ██ ██      ██   ██ ██    ██ ██ ███ ██ ██  ██ ██     ██      ██   ██ ██   ██ ██      ██
  ██████ ██   ██ ███████ ██   ██    ██    ███████     ██████  ██   ██  ██████  ██      ██████   ██████   ███ ███  ██   ████     ███████ ██   ██ ██████  ███████ ███████
 */
	StylesHelper.prototype.create_dropdown_label = function (stats, outputModel, output_type) {
		//TODO: Cache + cache invalidation on data change

		if (stats === undefined) {
			return '';
		}

		/*
   * This is kind of a hack... 'stats' is an object that is used to interpolate
   * the dropdown label. Since the interpolation string might contain a call to the
   * 'outputModelIterator' filter, we need to pass somehow the output model and the
   * output type. The easiest way (and the cleanest, AFAIK) is to attach temporarily
   * those to the 'stats' object and then delete them.
   */
		stats[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_MODEL_HACK] = outputModel;
		stats[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_TYPE_HACK] = output_type;

		var _interpolated = this.dropdown_repr(stats);

		delete stats[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_MODEL_HACK];
		delete stats[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_TYPE_HACK];

		return $sce.trustAsHtml(_interpolated);
	};

	/*
  ██████ ██████  ███████  █████  ████████ ███████     ██       █████  ██████  ███████ ██
 ██      ██   ██ ██      ██   ██    ██    ██          ██      ██   ██ ██   ██ ██      ██
 ██      ██████  █████   ███████    ██    █████       ██      ███████ ██████  █████   ██
 ██      ██   ██ ██      ██   ██    ██    ██          ██      ██   ██ ██   ██ ██      ██
  ██████ ██   ██ ███████ ██   ██    ██    ███████     ███████ ██   ██ ██████  ███████ ███████
 */
	StylesHelper.prototype.create_label = function (item) {
		//TODO: Cache + cache invalidation on data change

		var _interpolated;
		if (item[angularMultiSelectConstants.INTERNAL_KEY_CHILDREN_LEAFS] === 0) {
			_interpolated = this.leaf_repr(item);
		} else {
			_interpolated = this.node_repr(item);
		}

		return $sce.trustAsHtml(_interpolated);
	};

	/*
 ████████ ██████   █████  ███    ██ ███████ ███████  ██████  ██████  ███    ███     ██████   ██████  ███████ ██ ████████ ██  ██████  ███    ██
    ██    ██   ██ ██   ██ ████   ██ ██      ██      ██    ██ ██   ██ ████  ████     ██   ██ ██    ██ ██      ██    ██    ██ ██    ██ ████   ██
    ██    ██████  ███████ ██ ██  ██ ███████ █████   ██    ██ ██████  ██ ████ ██     ██████  ██    ██ ███████ ██    ██    ██ ██    ██ ██ ██  ██
    ██    ██   ██ ██   ██ ██  ██ ██      ██ ██      ██    ██ ██   ██ ██  ██  ██     ██      ██    ██      ██ ██    ██    ██ ██    ██ ██  ██ ██
    ██    ██   ██ ██   ██ ██   ████ ███████ ██       ██████  ██   ██ ██      ██     ██       ██████  ███████ ██    ██    ██  ██████  ██   ████
 */
	StylesHelper.prototype.transform_position = function (element) {
		var btn = element[0].getElementsByClassName('ams-button')[0];
		var container = element[0].getElementsByClassName('ams-container')[0];

		var translateX = 0,
		    translateY = 0;
		var btn_rect = btn.getBoundingClientRect();
		var container_rect = container.getBoundingClientRect();

		/*
   * If the available width to the right is not enough and there is
   * enough available width to the left, flip the X position.
   */
		if (document.documentElement.clientWidth - (btn_rect.left + btn_rect.width) < container_rect.width && btn_rect.left + btn_rect.width >= container_rect.width) {
			translateX -= container_rect.width - btn_rect.width;
		}

		/*
   * If the available height to the bottom is not enough and there is
   * enough available height to the top, flip the Y position.
   */
		if (document.documentElement.clientHeight - (btn_rect.top + btn_rect.height) < container_rect.height && btn_rect.top >= container_rect.height) {
			translateY -= container_rect.height + btn_rect.height;
		}

		container.style.transform = "translate(" + translateX + "px, " + translateY + "px)";
	};

	return StylesHelper;
}]);

var angular_multi_select_utils = angular.module('angular-multi-select-utils', ['angular-multi-select-constants']);

angular_multi_select_utils.factory('angularMultiSelectUtils', ['angularMultiSelectConstants', function (angularMultiSelectConstants) {
	var Utils = function Utils() {};

	/*
 ███████  █████  ███    ██ ██ ████████ ██ ███████ ███████      ██████  ██████  ███████
 ██      ██   ██ ████   ██ ██    ██    ██    ███  ██          ██    ██ ██   ██ ██
 ███████ ███████ ██ ██  ██ ██    ██    ██   ███   █████       ██    ██ ██████  ███████
      ██ ██   ██ ██  ██ ██ ██    ██    ██  ███    ██          ██    ██ ██           ██
 ███████ ██   ██ ██   ████ ██    ██    ██ ███████ ███████      ██████  ██      ███████
 */
	Utils.prototype.sanitize_ops = function (ops) {
		/*
   * This will set all basic and required values to
   * "sane" defaults if none are provided.
   */
		ops = ops || {};

		return {
			DEBUG: ops.DEBUG || false,
			NAME: ops.NAME || 'angular-multi-select-' + Math.round(Date.now() / 1000) + '' + Math.random(),
			MAX_CHECKED_LEAFS: ops.MAX_CHECKED_LEAFS || -1,

			ID_PROPERTY: ops.ID_PROPERTY || angularMultiSelectConstants.ID_PROPERTY,
			OPEN_PROPERTY: ops.OPEN_PROPERTY || angularMultiSelectConstants.OPEN_PROPERTY,
			CHECKED_PROPERTY: ops.CHECKED_PROPERTY || angularMultiSelectConstants.CHECKED_PROPERTY,
			CHILDREN_PROPERTY: ops.CHILDREN_PROPERTY || angularMultiSelectConstants.CHILDREN_PROPERTY
		};
	};

	/*
  █████  ██████  ██████   █████  ██    ██     ███████ ██████   ██████  ███    ███      █████  ████████ ████████ ██████
 ██   ██ ██   ██ ██   ██ ██   ██  ██  ██      ██      ██   ██ ██    ██ ████  ████     ██   ██    ██       ██    ██   ██
 ███████ ██████  ██████  ███████   ████       █████   ██████  ██    ██ ██ ████ ██     ███████    ██       ██    ██████
 ██   ██ ██   ██ ██   ██ ██   ██    ██        ██      ██   ██ ██    ██ ██  ██  ██     ██   ██    ██       ██    ██   ██
 ██   ██ ██   ██ ██   ██ ██   ██    ██        ██      ██   ██  ██████  ██      ██     ██   ██    ██       ██    ██   ██
 */
	Utils.prototype.array_from_attr = function (str) {
		/*
   * This will take a string and try to split it
   * using ',' as separator and return the resulting
   * array or undefined.
   */
		if (typeof str === 'string' && str.length > 0) {
			return str.split(",").map(function (s) {
				return s.replace(/^\s+|\s+$/g, '');
			});
		} else {
			return [];
		}
	};

	/*
 ██████   █████  ██████  ███████ ███████     ██████   █████  ██ ██████  ███████
 ██   ██ ██   ██ ██   ██ ██      ██          ██   ██ ██   ██ ██ ██   ██ ██
 ██████  ███████ ██████  ███████ █████       ██████  ███████ ██ ██████  ███████
 ██      ██   ██ ██   ██      ██ ██          ██      ██   ██ ██ ██   ██      ██
 ██      ██   ██ ██   ██ ███████ ███████     ██      ██   ██ ██ ██   ██ ███████
 */
	Utils.prototype.parse_pairs = function (arr) {
		/*
   * Takes an array of primitives and checks if the second
   * value of each pair of values looks line a number (int or float),
   * and if it does, it converts it to a Number.
   *
   * Note that the function modifies the passed array instead
   * of creating a new one.
   */
		for (var i = 0; i < arr.length; i += 2) {
			var value = arr[i + 1];

			if (value.match(/^'(.*)'$/gi) !== null || value.match(/^"(.*)"$/gi) !== null) {
				arr[i + 1] = value.substring(1, value.length - 1);
			} else if (value.match(/^([0-9\.]*)$/gi) !== null) {
				arr[i + 1] = Number(value);
			}
		}
	};

	/*
 ███████ ██      ███████ ███    ███ ███████ ███    ██ ████████     ██████  ███████ ██       ██████  ███    ██  ██████  ███████     ████████  ██████      ██████  ██ ██████  ███████  ██████ ████████ ██ ██    ██ ███████
 ██      ██      ██      ████  ████ ██      ████   ██    ██        ██   ██ ██      ██      ██    ██ ████   ██ ██       ██             ██    ██    ██     ██   ██ ██ ██   ██ ██      ██         ██    ██ ██    ██ ██
 █████   ██      █████   ██ ████ ██ █████   ██ ██  ██    ██        ██████  █████   ██      ██    ██ ██ ██  ██ ██   ███ ███████        ██    ██    ██     ██   ██ ██ ██████  █████   ██         ██    ██ ██    ██ █████
 ██      ██      ██      ██  ██  ██ ██      ██  ██ ██    ██        ██   ██ ██      ██      ██    ██ ██  ██ ██ ██    ██      ██        ██    ██    ██     ██   ██ ██ ██   ██ ██      ██         ██    ██  ██  ██  ██
 ███████ ███████ ███████ ██      ██ ███████ ██   ████    ██        ██████  ███████ ███████  ██████  ██   ████  ██████  ███████        ██     ██████      ██████  ██ ██   ██ ███████  ██████    ██    ██   ████   ███████
 */
	Utils.prototype.element_belongs_to_directive = function (element, directive_name) {
		/*
   * Check if the passed DOM element is somewhere inside the DOM tree of the
   * directive identified by directive_name.
   */
		var res = false;

		var p = angular.element(element).parent();
		while (p.length > 0) {
			if (p.attr("name") === directive_name) {
				res = true;
				break;
			}
			p = p.parent();
		}

		return res;
	};

	/*
 ██████  ██████  ███████ ██    ██ ███████ ███    ██ ████████     ███████  ██████ ██████   ██████  ██      ██          ██████  ██    ██ ██████  ██████  ██      ██ ███    ██  ██████
 ██   ██ ██   ██ ██      ██    ██ ██      ████   ██    ██        ██      ██      ██   ██ ██    ██ ██      ██          ██   ██ ██    ██ ██   ██ ██   ██ ██      ██ ████   ██ ██
 ██████  ██████  █████   ██    ██ █████   ██ ██  ██    ██        ███████ ██      ██████  ██    ██ ██      ██          ██████  ██    ██ ██████  ██████  ██      ██ ██ ██  ██ ██   ███
 ██      ██   ██ ██       ██  ██  ██      ██  ██ ██    ██             ██ ██      ██   ██ ██    ██ ██      ██          ██   ██ ██    ██ ██   ██ ██   ██ ██      ██ ██  ██ ██ ██    ██
 ██      ██   ██ ███████   ████   ███████ ██   ████    ██        ███████  ██████ ██   ██  ██████  ███████ ███████     ██████   ██████  ██████  ██████  ███████ ██ ██   ████  ██████
 */
	Utils.prototype.prevent_scroll_bubbling = function (element) {
		element.addEventListener('mousewheel', function (e) {
			if (element.clientHeight + element.scrollTop + e.deltaY >= element.scrollHeight) {
				e.preventDefault();
				element.scrollTop = element.scrollHeight;
			} else if (element.scrollTop + e.deltaY <= 0) {
				e.preventDefault();
				element.scrollTop = 0;
			}
		}, false);
	};

	/*
 ██████  ██████   ██████   ██████ ███████ ███████ ███████     ██   ██ ██████      ██ ███    ██ ██████  ██    ██ ████████
 ██   ██ ██   ██ ██    ██ ██      ██      ██      ██          ██  ██  ██   ██     ██ ████   ██ ██   ██ ██    ██    ██
 ██████  ██████  ██    ██ ██      █████   ███████ ███████     █████   ██████      ██ ██ ██  ██ ██████  ██    ██    ██
 ██      ██   ██ ██    ██ ██      ██           ██      ██     ██  ██  ██   ██     ██ ██  ██ ██ ██      ██    ██    ██
 ██      ██   ██  ██████   ██████ ███████ ███████ ███████     ██   ██ ██████      ██ ██   ████ ██       ██████     ██
 */
	Utils.prototype.process_kb_input = function (event, $scope, element) {
		/*
   * Kb events handler. React as follows based on key code:
   *
   * * escape - close the opened AMS instance.
   * * spacebar - toggle the checked state of the focused item.
   * * keyup - focus the previos item, or if at the top, the last one.
   * * keydown - focus the next item, or if at the bottom, the first one.
   * * keyleft - close the current item.
   * * keyright - open the current item.
   *
   * There is an exception in keyup/keydown handlers. Both should "skip"
   * one key hit in order to allow an "empty" focus.
   */

		var item;
		var prevent = true;
		var code = event.keyCode ? event.keyCode : event.which;
		switch (code) {
			case 27:
				//escape
				$scope.open = false;
				break;
			case 32:
				//spacebar
				item = $scope.items[$scope.focused_index];
				if (item !== undefined) {
					$scope.amse.toggle_check_node(item);
				}
				break;
			case 37:
				//keyleft
				item = $scope.items[$scope.focused_index];
				if (item !== undefined && item[angularMultiSelectConstants.OPEN_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_OPEN) {
					$scope.amse.toggle_open_node(item);
				}
				break;
			case 38:
				//keyup
				$scope.focused_index = $scope.focused_index === -1 ? $scope.items.length - 1 : $scope.focused_index - 1;
				break;
			case 39:
				//keyright
				item = $scope.items[$scope.focused_index];
				if (item !== undefined && item[angularMultiSelectConstants.OPEN_PROPERTY] === angularMultiSelectConstants.INTERNAL_DATA_CLOSED) {
					$scope.amse.toggle_open_node(item);
				}
				break;
			case 40:
				//keydown
				$scope.focused_index = $scope.focused_index + 1 > $scope.items.length ? 0 : $scope.focused_index + 1;
				break;
			default:
				prevent = false;
				break;
		}

		if (prevent === true) {
			event.preventDefault();
		}

		$scope.$apply();

		/*
   * This must be done after the $apply() call
   */
		if (code === 38 || code === 40) {
			if ($scope.focused_index !== -1) {
				this.scroll_to_item(element);
			}
		}
	};

	/*
 ███████  ██████ ██████   ██████  ██      ██          ████████  ██████      ██ ████████ ███████ ███    ███
 ██      ██      ██   ██ ██    ██ ██      ██             ██    ██    ██     ██    ██    ██      ████  ████
 ███████ ██      ██████  ██    ██ ██      ██             ██    ██    ██     ██    ██    █████   ██ ████ ██
      ██ ██      ██   ██ ██    ██ ██      ██             ██    ██    ██     ██    ██    ██      ██  ██  ██
 ███████  ██████ ██   ██  ██████  ███████ ███████        ██     ██████      ██    ██    ███████ ██      ██
 */
	Utils.prototype.scroll_to_item = function (element) {
		/*
   * Change the scroll position of the items container in such a way that
   * the focused item gets to be visible.
   */
		var item = element[0].getElementsByClassName('ams-item-focused')[0];
		if (item === undefined) {
			return;
		}

		var container = element[0].getElementsByClassName('ams-items')[0];
		container.scrollTop = item.offsetTop + item.offsetHeight - container.offsetHeight;
	};

	return Utils;
}]);

var angular_multi_select = angular.module('angular-multi-select', ['angular-multi-select-utils', 'angular-multi-select-engine', 'angular-multi-select-constants', 'angular-multi-select-styles-helper', 'angular-multi-select-data-converter']);

angular_multi_select.directive('angularMultiSelect', ['$http', '$compile', '$timeout', '$rootScope', '$templateCache', 'angularMultiSelectUtils', 'angularMultiSelectEngine', 'angularMultiSelectConstants', 'angularMultiSelectStylesHelper', 'angularMultiSelectDataConverter', function ($http, $compile, $timeout, $rootScope, $templateCache, angularMultiSelectUtils, angularMultiSelectEngine, angularMultiSelectConstants, angularMultiSelectStylesHelper, angularMultiSelectDataConverter) {
	'use strict';

	return {
		restrict: 'AE',

		scope: {
			inputModel: '=',
			outputModel: '=?'
		},

		link: function link($scope, element, attrs) {
			var template = $templateCache.get('angular-multi-select.tpl');
			var content = $compile(template)($scope);
			element.append(content);

			var self = {};
			$scope.self = self; //We need to access 'self' from the template
			//TODO. Replace all the $scope pollution with calls to 'self' from the template

			self.react_to_data_changes = false;
			self.react_to_visual_changes = true;

			var amsu = new angularMultiSelectUtils();

			/*
    █████  ████████ ████████ ██████  ██ ██████  ██    ██ ████████ ███████ ███████
   ██   ██    ██       ██    ██   ██ ██ ██   ██ ██    ██    ██    ██      ██
   ███████    ██       ██    ██████  ██ ██████  ██    ██    ██    █████   ███████
   ██   ██    ██       ██    ██   ██ ██ ██   ██ ██    ██    ██    ██           ██
   ██   ██    ██       ██    ██   ██ ██ ██████   ██████     ██    ███████ ███████
   */
			/*
   * Find out what are the properties names of the important bits
   * of the input data.
   */
			$scope.ops = {
				DEBUG: attrs.debug === "true" ? true : false,
				NAME: attrs.name,
				MAX_CHECKED_LEAFS: parseInt(attrs.maxCheckedLeafs),

				ID_PROPERTY: attrs.idProperty,
				OPEN_PROPERTY: attrs.openProperty,
				CHECKED_PROPERTY: attrs.checkedProperty,
				CHILDREN_PROPERTY: attrs.childrenProperty
			};
			$scope.ops = amsu.sanitize_ops($scope.ops);

			/*
    * Set the directive's name as attribute. If it exists, it will be overriten with
    * the same value, else, it will be set with the autogenerated value. This is required
    * for the visibility code.
    */
			element.attr("name", $scope.ops.NAME);

			/*
    * Find out if the input data should be threated in some special way.
    */
			self.do_not_check_data = attrs.doNotCheckData === "true" ? true : false;
			self.do_not_convert_data = attrs.doNotConvertData === "true" ? true : false;

			/*
    * Find out if the output data should be converted in some special way.
    */
			self.output_keys = amsu.array_from_attr(attrs.outputKeys);
			self.output_type = attrs.outputType === undefined ? 'objects' : attrs.outputType;
			self.output_filter = attrs.outputFilter === undefined ? angularMultiSelectConstants.FIND_LEAFS : attrs.outputFilter;

			/*
    * Find out which field to use for the 'search' functionality.
    */
			$scope.search_field = attrs.searchField === undefined ? null : attrs.searchField;

			/*
    * Find out if something should be preselected.
    */
			self.preselect = amsu.array_from_attr(attrs.preselect);
			amsu.parse_pairs(self.preselect);

			/*
    * Find out if some of the helpers should be hidden.
    */
			$scope.hide_helpers = amsu.array_from_attr(attrs.hideHelpers);

			/*
    █████  ███    ███ ███████      ██████  ██████       ██ ███████  ██████ ████████ ███████
   ██   ██ ████  ████ ██          ██    ██ ██   ██      ██ ██      ██         ██    ██
   ███████ ██ ████ ██ ███████     ██    ██ ██████       ██ █████   ██         ██    ███████
   ██   ██ ██  ██  ██      ██     ██    ██ ██   ██ ██   ██ ██      ██         ██         ██
   ██   ██ ██      ██ ███████      ██████  ██████   █████  ███████  ██████    ██    ███████
   */
			$scope.amsc = angularMultiSelectConstants;
			var amse = new angularMultiSelectEngine($scope.ops);
			var amssh = new angularMultiSelectStylesHelper($scope.ops, attrs);
			var amsdc = new angularMultiSelectDataConverter($scope.ops);
			$scope.amse = amse;
			$scope.amssh = amssh;

			/*
   ██████  ██████   ██████   █████  ██████   ██████  █████  ███████ ████████
   ██   ██ ██   ██ ██    ██ ██   ██ ██   ██ ██      ██   ██ ██         ██
   ██████  ██████  ██    ██ ███████ ██   ██ ██      ███████ ███████    ██
   ██   ██ ██   ██ ██    ██ ██   ██ ██   ██ ██      ██   ██      ██    ██
   ██████  ██   ██  ██████  ██   ██ ██████   ██████ ██   ██ ███████    ██
   */
			$scope.toggle_open_node = function (item) {
				$rootScope.$broadcast('ams_toggle_open_node', {
					name: $scope.ops.NAME,
					item: JSON.parse(JSON.stringify(amsdc.to_external([item])[0]))
				});
				amse.toggle_open_node(item);
			};

			$scope.toggle_check_node = function (item) {
				$rootScope.$broadcast('ams_toggle_check_node', {
					name: $scope.ops.NAME,
					item: JSON.parse(JSON.stringify(amsdc.to_external([item])[0]))
				});
				amse.toggle_check_node(item);
			};

			/*
    ██████  ███    ██     ███████ ██    ██ ███████ ███    ██ ████████ ███████
   ██    ██ ████   ██     ██      ██    ██ ██      ████   ██    ██    ██
   ██    ██ ██ ██  ██     █████   ██    ██ █████   ██ ██  ██    ██    ███████
   ██    ██ ██  ██ ██     ██       ██  ██  ██      ██  ██ ██    ██         ██
    ██████  ██   ████     ███████   ████   ███████ ██   ████    ██    ███████
   */
			$rootScope.$on('ams_do_check_all', function (event, args) {
				if (args.name === $scope.ops.NAME || args.name === '*') amse.check_all();
			});

			$rootScope.$on('ams_do_uncheck_all', function (event, args) {
				if (args.name === $scope.ops.NAME || args.name === '*') amse.uncheck_all();
			});

			$rootScope.$on('ams_do_reset', function (event, args) {
				if (args.name === $scope.ops.NAME || args.name === '*') $scope.reset();
			});

			$rootScope.$on('ams_do_toggle_open_node', function (event, args) {
				if (args.name === $scope.ops.NAME || args.name === '*') amse.toggle_open_node(amse.get_item(args.item));
			});

			$rootScope.$on('ams_do_toggle_check_node', function (event, args) {
				if (args.name === $scope.ops.NAME || args.name === '*') amse.toggle_check_node(amse.get_item(args.item));
			});

			$rootScope.$on('ams_open', function (event, args) {
				if (args.name === $scope.ops.NAME || args.name === '*') $scope.open = true;
			});

			$rootScope.$on('ams_close', function (event, args) {
				if (args.name === $scope.ops.NAME || args.name === '*') $scope.open = false;
			});

			/*
   ██    ██ ██ ███████ ██ ██████  ██ ██      ██ ████████ ██    ██
   ██    ██ ██ ██      ██ ██   ██ ██ ██      ██    ██     ██  ██
   ██    ██ ██ ███████ ██ ██████  ██ ██      ██    ██      ████
    ██  ██  ██      ██ ██ ██   ██ ██ ██      ██    ██       ██
     ████   ██ ███████ ██ ██████  ██ ███████ ██    ██       ██
   */
			$scope.open = false;
			$scope.onclick_listener = function (event) {
				if (!event.target) {
					return;
				}

				if (!amsu.element_belongs_to_directive(event.target, $scope.ops.NAME)) {
					$scope.open = false;
					$scope.$apply();
				}
			};
			document.addEventListener('click', $scope.onclick_listener);

			/*
    * Show the directive to the left/right and at the top/bottom
    * of the button itself, depending on the available space.
    */
			$scope.$watch('open', function (_new, _old) {
				if (_new !== true) {
					return;
				}

				$timeout(function () {
					amssh.transform_position(element);
				});
			});

			/*
   ████████ ██     ██ ███████  █████  ██   ██ ███████
      ██    ██     ██ ██      ██   ██ ██  ██  ██
      ██    ██  █  ██ █████   ███████ █████   ███████
      ██    ██ ███ ██ ██      ██   ██ ██  ██       ██
      ██     ███ ███  ███████ ██   ██ ██   ██ ███████
   */

			/*
    * Prevent the scroll event bubbling to the parents on the DOM.
    */
			amsu.prevent_scroll_bubbling(element[0].getElementsByClassName('ams-items')[0]);

			/*
    * Make keyboard navigation possible.
    */
			$scope.focused_index = -1;
			$scope.onkeypress_listener = function (event) {
				if ($scope.open === false) {
					return;
				}

				amsu.process_kb_input(event, $scope, element);
			};
			document.addEventListener('keydown', $scope.onkeypress_listener);

			/*
   ██   ██ ███████ ██      ██████  ███████ ██████  ███████
   ██   ██ ██      ██      ██   ██ ██      ██   ██ ██
   ███████ █████   ██      ██████  █████   ██████  ███████
   ██   ██ ██      ██      ██      ██      ██   ██      ██
   ██   ██ ███████ ███████ ██      ███████ ██   ██ ███████
   */
			/*
    * The 'reset_model' will be filled in with the first available
    * data from the input model and will be used when the 'reset'
    * function is triggered.
    */
			$scope.reset_model = null;
			$scope.reset = function () {
				self.init($scope.reset_model);
			};

			/*
   ███████ ███████  █████  ██████   ██████ ██   ██
   ██      ██      ██   ██ ██   ██ ██      ██   ██
   ███████ █████   ███████ ██████  ██      ███████
        ██ ██      ██   ██ ██   ██ ██      ██   ██
   ███████ ███████ ██   ██ ██   ██  ██████ ██   ██
   */
			$scope.search = "";
			self.search_promise = null;
			$scope.search_spinner_visible = false;
			$scope.$watch('search', function (_new, _old) {
				if (_new === _old && _new === "") {
					return;
				}

				if ($scope.search_field === null) {
					return;
				}

				/*
     * This means that there was a search, but it was deleted
     * and now the normal tree should be repainted.
     */
				if (_new === "") {
					if (self.search_promise !== null) {
						$timeout.cancel(self.search_promise);
					}
					$scope.items = amse.get_visible_tree();
					$scope.search_spinner_visible = false;

					$timeout(function () {
						amssh.transform_position(element);
					});
					return;
				}

				/*
     * If the code execution gets here, it means that there is
     * a search that should be performed
     */
				if (self.search_promise !== null) {
					$timeout.cancel(self.search_promise);
				}

				$scope.search_spinner_visible = true;
				var _search_fn = function _search_fn(query) {
					self.search_promise = $timeout(function () {
						//TODO: this needs a lot of improving. Maybe use lunar.js?
						var filter = [];
						filter.push({
							field: $scope.search_field,
							query: query
						});

						$scope.items = amse.get_filtered_tree(filter);
						$scope.search_spinner_visible = false;

						$timeout(function () {
							amssh.transform_position(element);
						});
					}, 1500, true);
				};
				_search_fn(_new); // Hack for Angular <1.4 support
			});

			/*
    ██████  ███    ██     ██████   █████  ████████  █████       ██████ ██   ██  █████  ███    ██  ██████  ███████
   ██    ██ ████   ██     ██   ██ ██   ██    ██    ██   ██     ██      ██   ██ ██   ██ ████   ██ ██       ██
   ██    ██ ██ ██  ██     ██   ██ ███████    ██    ███████     ██      ███████ ███████ ██ ██  ██ ██   ███ █████
   ██    ██ ██  ██ ██     ██   ██ ██   ██    ██    ██   ██     ██      ██   ██ ██   ██ ██  ██ ██ ██    ██ ██
    ██████  ██   ████     ██████  ██   ██    ██    ██   ██      ██████ ██   ██ ██   ██ ██   ████  ██████  ███████
   */
			amse.on_data_change_fn = function () {
				if (self.react_to_data_changes === false) {
					return;
				}

				/*
     * Will be triggered every time the internal model data is changed.
     * That could happen on check/uncheck, for example.
     */

				$scope.stats = amse.get_stats();
				/*
     * Get the visible tree only once. Consecutive calls on un/check
     * will automatically propagate to the rendered tree.
     */
				if (!$scope.search) {
					$scope.items = amse.get_visible_tree();
				}

				var checked_tree = amse.get_checked_tree(self.output_filter);

				/*
     * Remove internal (undeeded) data.
     */
				var res = amsdc.to_external(checked_tree);

				/*
     * This is used to create the dropdown label.
     */
				if (typeof attrs.dropdownLabel === "string" && attrs.dropdownLabel.indexOf("outputModelIterator" > -1)) {
					$scope.outputModelNotFormatted = JSON.parse(JSON.stringify(res));
				}

				/*
     * Convert the data to the desired output.
     */
				res = amsdc.to_format(res, self.output_type, self.output_keys);

				/*
     * Don't do anything else if the output model hasn't changed.
     */
				if (angular.equals($scope.outputModel, res)) {
					return;
				}

				$scope.outputModel = res;
				$timeout(function () {
					$rootScope.$broadcast('ams_output_model_change', {
						name: $scope.ops.NAME
					});
				});
			};

			/*
    ██████  ███    ██     ██    ██ ██ ███████ ██    ██  █████  ██           ██████ ██   ██  █████  ███    ██  ██████  ███████
   ██    ██ ████   ██     ██    ██ ██ ██      ██    ██ ██   ██ ██          ██      ██   ██ ██   ██ ████   ██ ██       ██
   ██    ██ ██ ██  ██     ██    ██ ██ ███████ ██    ██ ███████ ██          ██      ███████ ███████ ██ ██  ██ ██   ███ █████
   ██    ██ ██  ██ ██      ██  ██  ██      ██ ██    ██ ██   ██ ██          ██      ██   ██ ██   ██ ██  ██ ██ ██    ██ ██
    ██████  ██   ████       ████   ██ ███████  ██████  ██   ██ ███████      ██████ ██   ██ ██   ██ ██   ████  ██████  ███████
   */
			amse.on_visual_change_fn = function () {
				/*
     * Will be triggered when a change that requires a visual change happende.
     * This is normaly on open/close actions.
     */
				$scope.items = amse.get_visible_tree();

				/*
     * This is required to avoid weird gaps appearing between the items
     * container and the button if the amount of shown items changes.
     */
				$timeout(function () {
					amssh.transform_position(element);
				});
			};

			/*
   ███    ███  █████  ██ ███    ██
   ████  ████ ██   ██ ██ ████   ██
   ██ ████ ██ ███████ ██ ██ ██  ██
   ██  ██  ██ ██   ██ ██ ██  ██ ██
   ██      ██ ██   ██ ██ ██   ████
   */
			self.prepare_data = function (data) {
				if (!Array.isArray(data)) {
					return [];
				}

				var checked_data = self.do_not_check_data ? data : amsdc.check_prerequisites(data);
				var internal_data = self.do_not_convert_data ? checked_data : amsdc.to_internal(checked_data);

				return internal_data;
			};

			self.init = function (data) {
				$scope.reset_model = JSON.parse(JSON.stringify(data));

				amse.insert(data);

				for (var i = 0; i < self.preselect.length; i += 2) {
					amse.check_node_by([self.preselect[i], self.preselect[i + 1]]);
				}

				$timeout(function () {
					$rootScope.$broadcast('ams_input_model_change', {
						name: $scope.ops.NAME
					});
				});
			};

			$scope.$watch('inputModel', function (_new, _old) {
				self.react_to_data_changes = false;
				/*
    * The entry point of the directive. This monitors the input data and
    * decides when to populate the internal data model and how to do it.
    */
				var data;
				if (typeof _new === "string") {
					try {
						data = self.prepare_data(JSON.parse(_new));
						self.init(data);
						self.react_to_data_changes = true;
						amse.on_data_change();
					} catch (e) {
						$http.get(_new).then(function (response) {
							data = self.prepare_data(response.data);
							self.init(data);
							self.react_to_data_changes = true;
							amse.on_data_change();
						});
					}
				} else {
					data = self.prepare_data(_new);
					self.init(data);
					self.react_to_data_changes = true;
					amse.on_data_change();
				}
			});

			$scope.$on('$destroy', function () {
				amse.remove_collection($scope.ops.NAME);
				document.removeEventListener('click', $scope.onclick_listener);
				document.removeEventListener('keydown', $scope.onkeypress_listener);
			});
		}
	};
}]);

var angular_multi_select = angular.module('angular-multi-select');

angular_multi_select.run(['$templateCache', function ($templateCache) {

	var html = function html(s) {
		return s.toString();
	};
	$templateCache.put('angular-multi-select.tpl', html(_templateObject));
}]);

var angular_multi_select = angular.module('angular-multi-select');

angular_multi_select.filter('translate', ['angularMultiSelectI18n', function (angularMultiSelectI18n) {
	return function (text) {
		return angularMultiSelectI18n.translate(text);
	};
}]);

angular_multi_select.filter('outputModelIterator', ['angularMultiSelectConstants', 'angularMultiSelectStylesHelper', function (angularMultiSelectConstants, angularMultiSelectStylesHelper) {
	return function (text, data, glue, default_str) {
		var exp,
		    output = [];
		var amssh = new angularMultiSelectStylesHelper();

		if (!data[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_MODEL_HACK] || data[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_MODEL_HACK].length === 0) {
			return default_str || "";
		}

		switch (data[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_TYPE_HACK]) {
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_OBJECTS:
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_ARRAYS:
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_VALUES:
				data[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_MODEL_HACK].map(function (v) {
					exp = amssh.interpolate_alternative2(text);
					output.push(exp(v));
				});
				break;
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_OBJECT:
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_ARRAY:
			case angularMultiSelectConstants.OUTPUT_DATA_TYPE_VALUE:
				exp = amssh.interpolate_alternative2(text);
				output.push(exp(data[angularMultiSelectConstants.INTERNAL_KEY_OUTPUT_MODEL_HACK][0]));
				break;
		}

		return output.join(glue) || default_str || "";
	};
}]);

var angular_multi_select = angular.module('angular-multi-select');

angular_multi_select.provider('angularMultiSelectI18n', function () {
	var lang = "en";
	var langs = {
		'en': {
			CHECK_ALL: 'Check all',
			CHECK_NONE: 'Uncheck all',
			RESET: 'Reset',
			SEARCH: 'Search...',
			CLEAR: 'Clear'
		}
	};

	function getTranslation(lang) {
		return langs[lang];
	}

	function createTranslation(lang, texts) {
		langs[lang] = texts;
	}

	function setLang(newLang) {
		lang = newLang;
	}

	function instantiate$18n() {
		function translate(text) {
			return langs[lang][text] || langs.en[text];
		}

		return {
			translate: translate
		};
	}

	return {
		getTranslation: getTranslation,
		createTranslation: createTranslation,
		setLang: setLang,

		$get: instantiate$18n
	};
});
