/*
 * Angular JS Multi Select
 * Creates a dropdown-like widget with check-able items.
 *
 * Project started on: 23 May 2015
 * Current version: 5.5.5
 *
 * Released under the MIT License
 * --------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Alexander Nestorov (https://github.com/alexandernst)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * --------------------------------------------------------------------------------
 */

var angular_multi_select = angular.module('angular-multi-select', ['ng', 'angular.filter']);

angular_multi_select.directive('angularMultiSelect',
	['$rootScope', '$sce', '$timeout', '$filter', '$interpolate', '$cacheFactory',
	function ($rootScope, $sce, $timeout, $filter, $interpolate, $cacheFactory) {

	'use strict';
	return {
		restrict: 'AE',

		scope: {
			//api
			api: '=',

			// models
			inputModel: '=',
			outputModel: '=',
			singleOutputModel: '=',

			// callbacks
			onClear: '&',
			onClose: '&',
			onSearchChange: '&',
			onItemClick: '&',
			onOpen: '&',
			onReset: '&',
			onSelectAll: '&',
			onSelectNone: '&',

			// i18n
			translation: '='
		},

		templateUrl: 'angular-multi-select.htm',

		link: function ($scope, element, attrs) {

			$scope.interpolate = function(data) {
				return $interpolate(data.replace(/<\[/g, $interpolate.startSymbol()).replace(/]>/g, $interpolate.endSymbol()));
			};

			attrs.idProperty = attrs.idProperty || "angular-multi-select-id";
			attrs.selectionMode = attrs.selectionMode || "multi";
			attrs.selectionMode = attrs.selectionMode === "1" ? "single" : attrs.selectionMode;
			attrs.selectionMode = attrs.selectionMode.toLowerCase();
			attrs.toggleChildren = attrs.toggleChildren === "false" ? false : true;
			attrs.helperElements = attrs.helperElements || "reset filter";
			attrs.searchProperty = attrs.searchProperty || "";
			attrs.hiddenProperty = attrs.hiddenProperty || "";
			attrs.buttonTemplate = attrs.buttonTemplate || "angular-multi-select-btn-count.htm";
			attrs.buttonLabelSeparator = attrs.buttonLabelSeparator || '[", ", ""]';
			attrs.minSearchLength = parseInt(attrs.minSearchLength, 10) || 3;

			$scope.delayStart = parseInt(attrs.delayStart) || 0;
			$scope.preselectProp = attrs.preselectProp || "";
			$scope.singleOutputProp = attrs.singleOutputProp || "";
			$scope.preselectValue = attrs.preselectValue || "";
			$scope.outputModelProps = attrs.outputModelProps || "";
			try {
				$scope.outputModelProps = JSON.parse($scope.outputModelProps);
			} catch(e) {
				$scope.outputModelProps = [];
			}
			$scope.outputModelType = attrs.outputModelType || "objects";
			$scope._shadowModel = [];
			$scope.filteredModel = [];
			$scope.searchInput = {
				value: ''  // Won't work if not an object. Why? Fuck me if I know...
			};
			$scope.kbFocus = [];
			$scope.kbFocusIndex = null;
			$scope.visible = false;
			$scope.tickProperty = attrs.tickProperty;
			$scope.idProperty = attrs.idProperty;
			$scope.groupProperty = attrs.groupProperty;
			$scope.itemLabel = attrs.hasOwnProperty("itemLabel") ? attrs.itemLabel : "";
			$scope._interpolatedItemLabel = $scope.interpolate($scope.itemLabel);
			$scope.buttonLabel =  attrs.hasOwnProperty("buttonLabel") ? attrs.buttonLabel : "";
			$scope._interpolatedButtonLabel = $scope.interpolate($scope.buttonLabel);
			$scope.buttonTemplate = attrs.buttonTemplate;
			$scope.buttonLabelSeparator = JSON.parse(attrs.buttonLabelSeparator);
			$scope.hiddenProperty = attrs.hiddenProperty;
			$scope.outputModel = $scope.outputModel || [];

			if($scope.api !== undefined) {
				$scope.api =  {
					select_all: function() {
						$timeout(function() {
							$scope.selectAll();
						}, 0);
					},
					select_none: function() {
						$timeout(function() {
							$scope.selectNone();
						}, 0);
					},
					select: function(id) {
						$timeout(function() {
							var item = $scope._getItemById(id);
							if(item !== null && !$scope._isChecked(item)) {
								$scope.clickItem(item, true);
							}
						}, 0);
					},
					select_many: function (ids) {
						$timeout(function() {
							angular.forEach(ids, function (id) {
								var item = $scope._getItemById(id);
								if (item !== null && !$scope._isChecked(item)) {
									$scope.clickItem(item, true);
								}
							}, 0);
						});
					},
					reset: function() {
						$timeout(function() {
							$scope.reset();
						}, 0);
					},
					clear: function() {
						$timeout(function() {
							$scope.clear();
						}, 0);
					},
					open: function() {
						$timeout(function() {
							$scope.visible = true;
						}, 0);
					},
					close: function() {
						$timeout(function() {
							$scope.visible = false;
						}, 0);
					}
				};
			}

			$scope._trans = {
				selected: "selected",
				selectAll: "Select all",
				selectNone: "Select none",
				reset: "Reset",
				search: "Search..."
			};
			angular.extend($scope._trans, $scope.translation);

			$scope.lang = {
				selectAll: $sce.trustAsHtml($scope._trans.selectAll),
				selectNone: $sce.trustAsHtml($scope._trans.selectNone),
				reset: $sce.trustAsHtml($scope._trans.reset),
				search: $scope._trans.search
			};

			$scope._hasHelperElementOption = function(helperElement) {
				return attrs.helperElements.search(new RegExp("\\b" + helperElement + "\\b")) !== -1;
			};

			$scope.helperStatus = {
				all: $scope._hasHelperElementOption('all') ? true : $scope._hasHelperElementOption('noall') ? false : attrs.selectionMode !== "single",
				none: $scope._hasHelperElementOption('none') ? true : $scope._hasHelperElementOption('nonone') ? false : attrs.selectionMode !== "single",
				reset: $scope._hasHelperElementOption('reset') ? true : !$scope._hasHelperElementOption('noreset'),
				filter: $scope._hasHelperElementOption('filter') ? true : !$scope._hasHelperElementOption('nofilter')
			};

			$scope.Math = window.Math;

			//Cache holders
			$scope.uuid = Math.random() + "_";
			$scope.c_items_labels = $cacheFactory($scope.uuid + "item_labels");
			$scope.c_button_label = $cacheFactory($scope.uuid + "button_label");
			$scope.c_has_children = $cacheFactory($scope.uuid + "has_children");

			/**
			 * Backport for Angular 1.3.x of Angular 1.4.x's "merge()" function.
			 * @param dst
			 * @param objs
			 * @param deep
			 * @returns {*}
			 */
			$scope.baseExtend = function(dst, objs, deep) {
				var h = dst.$$hashKey;

				for (var i = 0, ii = objs.length; i < ii; ++i) {
					var obj = objs[i];
					if (!angular.isObject(obj) && !angular.isFunction(obj)) continue;
					var keys = Object.keys(obj);
					for (var j = 0, jj = keys.length; j < jj; j++) {
						var key = keys[j];
						var src = obj[key];

						if (deep && angular.isObject(src)) {
							if (!angular.isObject(dst[key])) dst[key] = angular.isArray(src) ? [] : {};
							$scope.baseExtend(dst[key], [src], true);
						} else {
							dst[key] = src;
						}
					}
				}

				if (h) {
					dst.$$hashKey = h;
				} else {
					delete dst.$$hashKey;
				}
				return dst;
			};

			$scope.merge = function(dst) {
				return $scope.baseExtend(dst, [].slice.call(arguments, 1), true);
			};

			$scope.deepCompare = function(x, y){
				if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
				// after this just checking type of one would be enough
				if (x.constructor !== y.constructor) { return false; }
				// if they are functions, they should exactly refer to same one (because of closures)
				if (x instanceof Function) { return x === y; }
				// if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
				if (x instanceof RegExp) { return x === y; }
				if (x === y || x.valueOf() === y.valueOf()) { return true; }
				if (Array.isArray(x) && x.length !== y.length) { return false; }

				// if they are dates, they must had equal valueOf
				if (x instanceof Date) { return false; }

				// if they are strictly equal, they both need to be object at least
				if (!(x instanceof Object)) { return false; }
				if (!(y instanceof Object)) { return false; }

				// recursive object equality check
				var p = Object.keys(x);
				return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) &&
					p.every(function (i) { return $scope.deepCompare(x[i], y[i]); });
			};

			/**
			 * Helper function to inverse the result of a function called by a filter from a template
			 * @param f
			 * @returns {Function}
			 */
			$scope.not = function(f) {
				return function(v) {
					return !f(v);
				};
			};

			/**
			 * Recursive function for iterating nested objects.
			 * This function will take an array `obj` of objects and will
			 * traverse all object and nested object that have a property
			 * called `key`, if that property's value is an array.
			 * A filter function (`fn`) can be passed. If that is the case,
			 * the filter function will be passed each object. If `true` is
			 * returned, the object won't be filtered, otherwise it will be
			 * filtered only if that object doesn't contain any nested objects
			 * that will be included (that is, it will be filtered only if
			 * `fn` returned `false` for all nested objects of the current
			 * object).
			 * @param {Object|Array} obj
			 * @param {String} key
			 * @param {function(Object)} fn
			 * @returns {*}
			 * @private
			 */
			$scope._walk = function(obj, key, fn) {
				var _idx;
				if(angular.isArray(obj)) {
					var _objs = [];

					for(_idx in obj) {
						var _tmp_obj = $scope._walk(obj[_idx], key, fn);
						if (_tmp_obj !== null) {
							_objs.push(_tmp_obj);
						}
					}

					return _objs.length > 0 ? _objs : null;
				} else if(angular.isObject(obj)) {
					fn = fn || function(){ return true; };
					var should_be_returned = fn(obj);

					if (obj.hasOwnProperty(key) && angular.isArray(obj[key]) ) {
						var sub = [];

						for(_idx in obj[key]) {
							var new_obj = $scope._walk(obj[key][_idx], key, fn);
							if (new_obj !== null) {
								sub.push(new_obj);
							}
						}

						if(sub.length !== obj[key].length){
							obj[key] = sub;
						}
						should_be_returned = sub.length > 0;
					}

					return should_be_returned ? obj : null;
				}
			};

			/**
			 * Helper function that syncs the changes from modelA to modelB.
			 * @param {Array} dst
			 * @param {Array} src
			 * @private
			 */
			$scope._syncModels = function(dst, src) {
				/*
				 * We can't use $scope.merge() here as that will wipe
				 * the elements that are in the src but not in the dst model.
				 * We need to iterate over the src and dst items at the same
				 * time and apply changes only when both items exist and the
				 * tick property is different.
				 */
				$scope._walk(src, attrs.groupProperty, function(item) {
					$scope._walk(dst, attrs.groupProperty, function(_item) {
						if(_item[attrs.idProperty] === item[attrs.idProperty]) {
							//Don't use extend here as it's really expensive and because
							//the only thing that can change in an item is it's tick state.
							_item[attrs.tickProperty] = item[attrs.tickProperty];
						}
						return true;
					});
					return true;
				});
			};

			/**
			 * Helper function that returns an item by matching the passed id.
			 * @param {String|int} id
			 * @param {mixed} model
			 * @returns {Object}
			 * @private
			 */
			$scope._getItemById = function(id, model) {
				/*
				 * This will make changes only to the filtered model, which is
				 * what 99% of the developers would expect. However, the other
				 * 1% might want to select and modify items from the shadow
				 * model. Does that makes sense? Should they be able to do that?
				 */
				model = model || $scope.filteredModel;

				var item = null;

				$scope._walk(model, attrs.groupProperty, function(_item) {
					if(_item[attrs.idProperty] === id) {
						item = _item;
					}
					return true;
				});

				return item;
			};

			/**
			 * Helper function used to get the parent of an item.
			 * @param {Array} model
			 * @param {Object} item
			 * @returns {Object}
			 * @private
			 */
			$scope._getParent = function(model, item) {
				var parent = null;
				var _found = false;
				var _lastParent = null;

				$scope._walk(model, attrs.groupProperty, function(_item) {

					if(_found === true) return true;

					if($scope._hasChildren(_item, false) > 0 && _item[attrs.idProperty] !== item[attrs.idProperty]) {
						_lastParent = _item;
					}

					if(_item[attrs.idProperty] === item[attrs.idProperty]) {
						parent = _lastParent;
						_found = true;
					}

					return true;
				});

				return parent;
			};

			/**
			 * Helper function that returns all the leafs of a model.
			 * @param {Array} model
			 * @returns {Array}
			 * @private
			 */
			$scope._getLeafs = function(model) {
				var _leafs = [];

				$scope._walk(model, attrs.groupProperty, function(_item) {
					if($scope._hasChildren(_item, false) === 0) {
						_leafs.push(_item);
					}
					return true;
				});

				return _leafs;
			};

			/**
			 * Helper function that returns all the nodes of a model,
			 * that is, all the items that have children.
			 * @param {Array} model
			 * @returns {Array}
			 * @private
			 */
			$scope._getNodes = function(model) {
				var _nodes = [];

				$scope._walk(model, attrs.groupProperty, function(_item) {
					if($scope._hasChildren(_item, false) > 0) {
						_nodes.push(_item);
					}
					return true;
				});

				return _nodes;
			};

			$scope._createButtonLabel = function(objs, index) {
				var _cache = $scope.c_button_label.get(objs.length + "_" + objs[index][attrs.idProperty] + "_" + index);
				if(_cache !== undefined) return _cache;

				var _interpolated = $scope._interpolatedButtonLabel(objs[index]);

				var _s = "";
				if(objs.length > 1) {
					_s += index == objs.length - 1 ? $scope.buttonLabelSeparator[1] : $scope.buttonLabelSeparator[0];
				}

				var _html = $sce.trustAsHtml(_interpolated + _s);
				$scope.c_button_label.put(objs.length + "_" + objs[index][attrs.idProperty] + "_" + index, _html);

				return _html;
			};

			/**
			 * Helper function to draw each item's label
			 * @param {Object} item
			 * @returns {String}
			 * @private
			 */
			$scope._createItemLabel = function(item) {
				var _cache = $scope.c_items_labels.get(item[attrs.idProperty]);
				if(_cache !== undefined) return _cache;

				var _interpolated = $scope._interpolatedItemLabel(item);
				var _html = $sce.trustAsHtml(_interpolated);
				$scope.c_items_labels.put(item[attrs.idProperty], _html);

				return _html;
			};

			/**
			 * Helper function that returns the number of children that
			 * the passed item contains. If `recursive` is set to false,
			 * the function will return 1 if the item contains any number
			 * of children, without traversing all of them.
			 *
			 * @param {Object} item
			 * @param {boolean=} recursive
			 * @returns {number}
			 * @private
			 */
			$scope._hasChildren = function(item, recursive) {
				recursive = recursive || false;

				if(
					recursive === false &&
					item.hasOwnProperty(attrs.groupProperty) &&
					angular.isArray(item[attrs.groupProperty]) &&
					item[attrs.groupProperty].length > 0
				) {
					return 1;
				}

				var _cache = $scope.c_has_children.get(item[attrs.idProperty]);
				if(_cache !== undefined) return _cache;

				var _n_children = -1;

				$scope._walk(item, attrs.groupProperty, function() {
					_n_children++;
					return true;
				});

				$scope.c_button_label.put(item[attrs.idProperty], _n_children);
				return _n_children;
			};

			/**
			 * Helper function that checks if a  single element is hidden.
			 * @param item
			 * @returns {boolean}
			 * @private
			 */
			$scope._isHidden = function(item) {
				return item[attrs.hiddenProperty] === true;
			};

			/**
			 * Helper function that checks if a single element is checked.
			 * @param {Object} item
			 * @returns {boolean}
			 * @private
			 */
			$scope._isChecked = function(item) {
				return item[attrs.tickProperty] === true;
			};

			/**
			 * Helper function that checks if the nested objects of first
			 * level are checked. Returns:
			 * - +N if all are checked, N being the number of checked items.
			 * - 0 if none is checked.
			 * - -N if some are checked, N being the number of checked items.
			 *
			 * Note that this function won't count as checked the items that
			 * are unchecked, but have checked children, no matter how many
			 * of the children are checked.
			 *
			 * @param {Array|Object} item
			 * @returns {number}
			 * @private
			 */
			$scope._areAllChecked = function(item) {
				var _checked = 0, _total = 0;

				$scope._walk(item, attrs.groupProperty, function(_item) {
					if($scope._hasChildren(_item, false) === 0  || !attrs.toggleChildren) {
						if($scope._isChecked(_item)) {
							_checked++;
						}
						_total++;
					}
					return true;
				});

				item.allChecked = _total > 0 && _total === _checked;

				return _total === _checked ? _checked : _checked > 0 ? -_checked : 0;
			};

			/**
			 * Helper function that ensures that all items have all properties.
			 * Because of this, we can stop using 'hasOwnProperty', which is very expensive.
			 * @param model
			 * @private
			 */
			$scope._enforceProps = function(model) {

				var ids = [];

				$scope._walk(model, attrs.groupProperty, function(_item){
					//ID property
					if(_item.hasOwnProperty(attrs.idProperty) === false || ids.indexOf(_item[attrs.idProperty]) !== -1) {
						_item[attrs.idProperty] = Math.floor((Math.random() * 100000000) + 1);
					}
					ids.push(_item[attrs.idProperty]);

					//Tick property
					_item[attrs.tickProperty] = _item[attrs.tickProperty] || false;

					//Tick time property
					_item._check_time = 0;

					//Hidden property
					_item[attrs.hiddenProperty] = _item[attrs.hiddenProperty] || false;

					return true;
				});
			};

			/**
			 * Helper function that will traverse all items and
			 * make sure that the following rules are applied:
			 *
			 * - if in 'single' select mode, none or 1 item is checked. If
			 *   that is not the case, all items will be unchecked.
			 * - if all children of an item are checked, the item itself is
			 *   checked (and vice versa).
			 * @param {Array} model
			 * @private
			 */
			$scope._enforceChecks = function(model) {
				var _n_checked = 0;
				var _leafs = $scope._getLeafs(model);
				var _checked_idxs = [];

				_leafs.sort(function (a, b) {
					return a._check_time > b._check_time;
				});

				var _break = false;
				for(var _idx in _leafs) {
					var _state = $scope._isChecked(_leafs[_idx]);

					if (_state) {
						_n_checked++;
						_checked_idxs.push(_idx);
					}

					if (_n_checked > 1 && attrs.selectionMode === "single") {
						_break = true;
						$scope._uncheckAll(model);
						break;
					}

					if (attrs.selectionMode !== "single" && attrs.selectionMode !== "multi" && _n_checked > parseInt(attrs.selectionMode)) {
						_n_checked--;
						$scope._uncheck(_leafs[_checked_idxs.shift()]);
					}
				}

				if(_break === true  || !attrs.toggleChildren) return;

				angular.forEach($scope._getNodes(model), function(item) {
					item[attrs.tickProperty] = $scope._areAllChecked(item) !== 0;
				});
			};

			/**
			 * If an item without children is passed and if it's not
			 * checked or it doesn't have a check value, it will be
			 * checked; else it will be unchecked.
			 *
			 * If an item with children is passed, if none or more,
			 * but not all, of the children are checked, all children
			 * and the item itself will be checked. If all
			 * children are checked, then they, and the item itself,
			 * will be unchecked.
			 * @param {Object} item
			 * @private
			 */
			$scope._flipCheck = function(item) {
				if($scope._hasChildren(item) > 0 && attrs.toggleChildren) {
					var _state = Math.abs($scope._areAllChecked(item)) === 0;

					$scope._walk(item, attrs.groupProperty, function(_item) {
						if(_state) {
							$scope._check(_item);
						} else {
							$scope._uncheck(_item);
						}
						return true;
					});
				} else {
					if(!$scope._isChecked(item)) {
						$scope._check(item);
					} else {
						$scope._uncheck(item);
					}
				}
			};

			/**
			 * Helper function to uncheck a single item
			 * @param item
			 * @private
			 */
			$scope._uncheck = function(item) {
				item[attrs.tickProperty] = false;
			};

			/**
			 * Helper function to uncheck all items
			 * @param {Array} model
			 * @private
			 */
			$scope._uncheckAll = function(model) {
				$scope._walk(model, attrs.groupProperty, function(item){
					$scope._uncheck(item);
					return true;
				});
			};

			/**
			 * Helper function to check a single item
			 * @param item
			 * @private
			 */
			$scope._check = function(item) {
				item[attrs.tickProperty] = true;
				item._check_time = (new Date()).getTime();
			};

			/**
			 * Helper function to check all items
			 * @param {Array} model
			 * @private
			 */
			$scope._checkAll = function(model) {
				$scope._walk(model, attrs.groupProperty, function(item){
					$scope._check(item);
					return true;
				});
			};

			/**
			 * Call this function when an item is clicked
			 * @param {Object} item
			 * @param {boolean=} resetFocus
			 */
			$scope.clickItem = function(item, resetFocus) {
				if(resetFocus === true) {
					$scope.kbFocusIndex = null;
				}

				if(attrs.selectionMode === "single" && $scope._areAllChecked($scope._shadowModel) !== 0) {
					if (!(($scope._hasChildren(item, false) === 0 || $scope._hasChildren(item) === 1) && $scope._isChecked(item))) {
						$scope._uncheckAll($scope._shadowModel);
						$scope._uncheckAll($scope.filteredModel);
					}
				}

				$scope._flipCheck(item);

				//Close if in single mode
				if(attrs.selectionMode === "single") {
					$scope.visible = false;
				}

				//Run onItemClick callback
				$timeout(function() {
					$scope.onItemClick({
						item: angular.copy(item)
					});
				}, 0);
			};

			/**
			 * Returns true if [attrs.searchProperty} matches the search input field (latinized, fuzzy match);
			 * @param {Object} obj
			 * @returns {boolean}
			 * @private
			 */
			$scope._filter = function(obj) {
				if(attrs.searchProperty === "" || $scope.searchInput.value === undefined || $scope.searchInput.value === "") {
					return true;
				}

				/**
				 * TODO: While this works, it's extremely slow. Waiting for
				 * https://github.com/a8m/angular-filter/issues/107 to get
				 * implemented so we can refactor this a little bit.
				 */
				var tmp_obj = angular.extend({}, obj);
				tmp_obj[attrs.searchProperty] = $filter('latinize')(tmp_obj[attrs.searchProperty]);

				var fltr = $scope.searchInput.value;
				fltr = $filter('latinize')(fltr);

				var match = $filter('fuzzyBy')([tmp_obj], attrs.searchProperty, fltr);
				return match.length > 0;
			};

			/**
			 * This will the ran when we get input data or when the
			 * input data is changed.
			 */
			$scope.fillShadowModel = function() {
				$scope._shadowModel = angular.copy($scope.inputModel);
				$scope._enforceProps($scope._shadowModel);

				try {
					$scope.preselectValue = JSON.parse($scope.preselectValue);
				} catch(e) {
					$scope.preselectValue = [$scope.preselectValue];
				}
				if($scope.preselectProp !== "" && angular.isArray($scope.preselectValue) && !angular.equals($scope.preselectValue, [""])) {
					//Pre-select
					$scope._walk($scope._shadowModel, attrs.groupProperty, function(_item) {
						if(_item.hasOwnProperty($scope.preselectProp) && $scope.preselectValue.indexOf(_item[$scope.preselectProp]) !== -1) {
							$scope._check(_item);
						}
						return true;
					});
				}

				$scope._enforceChecks($scope._shadowModel);
				$scope.fillFilteredModel();
			};

			/**
			 * Called when the 'select all' button is clicked
			 */
			$scope.selectAll = function() {
				$scope._checkAll($scope.filteredModel);

				//Run onSelectAll callback
				$timeout(function() {
					$scope.onSelectAll();
				}, 0);
			};

			/**
			 * Called when the 'select none' button is clicked
			 */
			$scope.selectNone = function() {
				$scope._uncheckAll($scope.filteredModel);

				//Run onSelectNone callback
				$timeout(function() {
					$scope.onSelectNone();
				}, 0);
			};

			/**
			 * Called when the 'reset' button is clicked
			 */
			$scope.reset = function() {
				$scope.fillShadowModel();
				$timeout(function() {
					$scope.onReset();
				}, 0);
			};

			/**
			 * Called when the 'clear' button is clicked
			 */
			$scope.clear = function() {
				$scope.searchInput.value = "";

				//Run onClear callback
				$timeout(function() {
					$scope.onClear();
				}, 0);
			};

			/**
			 * When a selection or a filter change happens, we re-fill
			 * the filtered model and apply the filtering logic.
			 * Note that we don't perform neither an enforce-ID nor enforce-checks
			 * logic here as the shadow model (_shadowModel) is guaranteed to
			 * be sanitized.
			 */
			$scope.fillFilteredModel = function() {
				$scope.filteredModel = angular.copy($scope._shadowModel);
				$scope.filteredModel = $scope._walk($scope.filteredModel, attrs.groupProperty, $scope._filter);
			};

			/**
			 * This is used to initially fill the shadow model and to
			 * handle input data change properly.
			 */
			$scope.$watch('inputModel', function(_new, _old) {
				if(!_new && angular.equals(_new, _old)) return;

				$scope.c_items_labels.removeAll();
				$scope.c_button_label.removeAll();

				$scope.c_has_children.removeAll();

				$timeout(function() {
					$scope.fillShadowModel();
				}, $scope.delayStart);
			}, true);

			/**
			 * When the data in our filtered model changes, we want to do several things:
			 *
			 * - update the button label
			 * - update our output model
			 * - fill the keyboard focus array helper
			 */
			$scope.$watch('filteredModel', function(_new, _old) {
				if(!$scope.deepCompare(_new, _old)) {
					$scope._enforceChecks($scope.filteredModel);
					$scope._syncModels($scope._shadowModel, $scope.filteredModel);

					var _tmp = $scope._walk(angular.copy($scope._shadowModel), attrs.groupProperty, function(_item) {
						$scope.kbFocus.push(_item[attrs.idProperty]);
						return $scope._isChecked(_item);
					});
					_tmp = _tmp === null ? [] : _tmp;

					var _new_shadowOutputModel = angular.copy(_tmp);
					if(!$scope.deepCompare(angular.copy($scope._shadowOutputModel), _new_shadowOutputModel)) {
						$scope._shadowOutputModel = _new_shadowOutputModel;
					}

					//If 'output-model-props' was specified, remove the keys we don't need
					var _shadow = angular.copy(_tmp);
					if($scope.outputModelProps.length > 0) {
						$scope._walk(_shadow, attrs.groupProperty, function(_item) {
							angular.forEach(_item, function(v, k) {
								if($scope.outputModelProps.indexOf(k) === -1 && k !== attrs.groupProperty) {
									delete _item[k];
								}
							});
							return true;
						});
					}

					//If the type of output was specified, format the data accordingly
					if($scope.outputModelType === "arrays" && $scope.outputModelProps.length > 0) {
						//Convert the output model in an array of arrays. Each "sub-array" should contain
						//the values of the, what it is now, data object.
						var _arrays = [];
						$scope._walk(_shadow, attrs.groupProperty, function(_item) {
							var _new = [];
							if($scope._hasChildren(_item) !== 0) return; //We want only leafs, for now...
							angular.forEach($scope.outputModelProps, function(v) {
								_new.push(_item[v]);
							});
							_arrays.push(_new);
							return true;
						});
						_shadow = _arrays;
					} else if($scope.outputModelType === "array" && $scope.outputModelProps.length > 0) {
						//Convert the output model in a single array with the values of each of the, what it is now,
						//data object.
						var _array = [];
						$scope._walk(_shadow, attrs.groupProperty, function(_item) {
							if($scope._hasChildren(_item) !== 0) return; //We want only leafs, for now...
							angular.forEach($scope.outputModelProps, function(v) {
								_array.push(_item[v]);
							});
							return true;
						});
						_shadow = _array;
					} else {
						//We already have the data
					}

					//We need to make a copy of the object as 'outputModel' contains AngularJS internal keys/values
					var _current_output_model = angular.copy($scope.outputModel);
					if(!$scope.deepCompare(_current_output_model, _shadow)) {
						$scope.outputModel = _shadow;
					}

					//Output a single model too, if dev asked for it
					if($scope.singleOutputModel !== undefined) {
						var _obj = _tmp.pop() || {};
						if(Object.keys(_obj).length === 0) {
							_obj[$scope.singleOutputProp] = "";
						}

						if($scope._hasChildren(_obj) !== 0) {
							_obj = $scope._getLeafs(_obj)[0];
						}
						var _v = _obj;
						if($scope.singleOutputProp !== "" && _obj.hasOwnProperty($scope.singleOutputProp)) {
							_v = _obj[$scope.singleOutputProp];
						}
						$scope.singleOutputModel = _v;
					}

					$scope.kbFocus = [];
					if($scope.helperStatus.all === true) {
						$scope.kbFocus.push("all");
					}
					if($scope.helperStatus.none === true) {
						$scope.kbFocus.push("none");
					}
					if($scope.helperStatus.reset === true) {
						$scope.kbFocus.push("reset");
					}
					if($scope.helperStatus.filter === true) {
						$scope.kbFocus.push("input");
						$scope.kbFocus.push("clear");
					}
					$scope._walk($scope.filteredModel, attrs.groupProperty, function(_item) {
						$scope.kbFocus.push(_item[attrs.idProperty]);
						return true;
					});
				}
			}, true);

			/**
			 * Watch for search input and trigger a re-fill of the filtered model.
			 * The shadow model (_shadowModel) is not modified here because we want
			 * to preserve the original state of the inputModel ('reset' button functionality)
			 */
			$scope.$watch('searchInput.value', function(_new, _old) {
				if(!angular.equals(_new, _old)) {
					if(_new.length > attrs.minSearchLength || (_new.length < _old.length && _old.length >= 0) ) {
						$scope.kbFocusIndex = null;
						$scope.fillFilteredModel();
					}

					//Run onSearchChange callback
					$timeout(function() {
						$scope.onSearchChange({
							input: _new
						});
					}, 0);
				}
			});

			/**
			 * Watch for show/hide event
			 */
			$rootScope.$on('angular-multi-select-on-visible-change', function(msg, obj) {
				if($scope.$id !== obj.id && obj.visible === true && $scope.visible === true) {
					$scope.visible = !$scope.visible;
				}
			});
			$scope.$watch('visible', function(_new, _old) {
				if(!angular.equals(_new, _old) && _new === true) {

					//Make sure we focus the input when opened
					$scope.kbFocusIndex = $scope.kbFocus.indexOf("input") || 0;

					//Make sre to close other instances of the widget
					$rootScope.$emit('angular-multi-select-on-visible-change', {
						visible: $scope.visible,
						id: $scope.$id
					});

					//Listen for mouse events
					$scope.stopListeningMouseEvents = $scope.$on('angular-multi-select-click', function(msg, obj) {
						var inside = false;
						var el = obj.event.target;
						while(el) {
							if(angular.element(el).attr("angular-multi-select") !== undefined) {
								inside = true;
								break;
							}
							el = el.parentNode;
						}

						if(inside === false){
							$scope.visible = false;
							$scope.$apply();
						}
					});

					//Listen for keyboard events
					$scope.stopListeningKeyboardEvents = $scope.$on('angular-multi-select-keydown', function(msg, obj) {
						var key = obj.event.keyCode ? obj.event.keyCode : obj.event.which;
						var _current_index = $scope.kbFocusIndex;
						var _refocus_input = false;

						if(key === 27) {
							//ESC should close
							$scope.visible = false;
						} else if(key === 13 || key === 32) {
							//(Un)select the element
							var _current = $scope.kbFocus[$scope.kbFocusIndex];
							if(angular.isNumber(_current)) {
								$scope._walk($scope.filteredModel, attrs.groupProperty, function(item){
									if(item[attrs.idProperty] === _current) {
										$scope.clickItem(item);
									}
									return true;
								});
							}
						} else if(key === 40 || key === 39 || (!obj.event.shiftKey && key == 9)) {
							//Next element ( tab, down & right key )
							if ($scope.kbFocusIndex === null) {
								$scope.kbFocusIndex = -1;
							}

							if($scope.kbFocusIndex < $scope.kbFocus.length - 1 ) {
								$scope.kbFocusIndex++;
							} else {
								$scope.kbFocusIndex = 0;
							}
						} else if(key === 38 || key === 37 || (obj.event.shiftKey && key == 9)) {
							//Prev element ( shift+tab, up & left key )
							if ($scope.kbFocusIndex === null) {
								$scope.kbFocusIndex = 1;
							}

							if($scope.kbFocusIndex > 0) {
								$scope.kbFocusIndex--;
							} else {
								$scope.kbFocusIndex = $scope.kbFocus.length - 1;
							}
						} else {
							_refocus_input = true;
						}

						$scope.$apply();

						if(_refocus_input === true) {
							$timeout(function() {
								$scope.kbFocusIndex = _current_index;
							}, 0);
						}

					});

					//Run onOpen callback
					$timeout(function() {
						$scope._open_pos();
						$scope.onOpen();
					}, 0);
				} else if (!angular.equals(_new, _old) && _new === false){

					//Stop listening for mouse events
					$scope.stopListeningMouseEvents();
					$scope.stopListeningMouseEvents = null;

					//Stop listening for  keyboard events
					$scope.stopListeningKeyboardEvents();
					$scope.stopListeningKeyboardEvents = null;

					//Run onClose callback
					$timeout(function() {
						$scope._close_pos();
						$scope.onClose();
					}, 0);
				}
			});

			/**
			 * Destroy the directive and stop listening to events if the
			 * directive gets removed from the DOM
			 */
			element.on("$destroy", function() {
				if($scope.stopListeningMouseEvents) {
					$scope.stopListeningMouseEvents();
				}
				if($scope.stopListeningKeyboardEvents) {
					$scope.stopListeningKeyboardEvents();
				}
				$scope._shadowModel = [];
				$scope.filteredModel = [];
				$scope.$destroy();
			});

			/**
			 * Open the layer on top or to the left of the button if there is
			 * no enough space.
			 */
			$scope._open_pos = function() {
				var ams_layer = angular.element(element[0].querySelector(".ams_layer"));
				var _bounds = ams_layer[0].getBoundingClientRect();

				var body = document.body;
				var docElem = document.documentElement;
				var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
				var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

				var clientTop = docElem.clientTop || body.clientTop || 0;
				var clientLeft = docElem.clientLeft || body.clientLeft || 0;

				var _dist_to_top_border = Math.round(_bounds.top +  scrollTop - clientTop);
				var _dist_to_left_border = Math.round(_bounds.left + scrollLeft - clientLeft);

				var _dist_to_bottom_border = window.innerHeight - _dist_to_top_border - _bounds.height;
				var _dist_to_right_border = window.innerWidth - _dist_to_left_border - _bounds.width;

				var classes = "";
				if(_dist_to_bottom_border < 0 && _dist_to_top_border >= _bounds.height) {
					classes += "position_top ";
				}

				if(_dist_to_right_border < 0 && _dist_to_left_border > _bounds.width) {
					classes += "position_left ";
				}

				ams_layer.addClass(classes);
			};

			/**
			 * We need to remove the classes after closing and not before
			 * opening because we could hit a race condition while calculing
			 * the width/height of the layer
			 */
			$scope._close_pos = function() {
				var ams_layer = angular.element(element[0].querySelector(".ams_layer"));

				ams_layer.removeClass("position_top");
				ams_layer.removeClass("position_left");
			};

		} //end of link function
	}; //end of return
}]);

angular_multi_select.directive('angularMultiSelectKeyTrap', function() {
	'use strict';
	return function(scope, elem) {
		elem.bind('keydown', function(event) {
			scope.$broadcast('angular-multi-select-keydown', { event: event } );
		});
	};
});

angular_multi_select.directive('angularMultiSelectMouseTrap', function() {
	'use strict';
	return function(scope, elem) {
		elem.bind('click', function(event) {
			scope.$broadcast('angular-multi-select-click', { event: event } );
		});
	};
});

angular_multi_select.directive('setFocus', ["$timeout", function($timeout) {
	'use strict';
	return function(scope, element, attrs) {
		attrs.setFocus = attrs.setFocus || false;
		scope.$watch(attrs.setFocus, function(_new) {
			$timeout(function() {
				if(_new) {
					element[0].focus();
				} else {
					element[0].blur();
				}
			});
		}, true);
	};
}]);

angular_multi_select.run(['$templateCache', '$interpolate', function($templateCache, $interpolate) {
	'use strict';

	var replaceInterpolation = function(str) {
		var startSymbol = $interpolate.startSymbol();
		var endSymbol = $interpolate.endSymbol();
		return str.replace(/\{\{/g, startSymbol).replace(/\}\}/g, endSymbol);
	};

	var template = "" +
		"<div class='ams_btn_template_repeat'>{{ Math.abs(_areAllChecked(filteredModel)) }} {{ _trans.selected }}</div>" +
		"<span class='caret'></span>";
	template = replaceInterpolation(template);
	$templateCache.put('angular-multi-select-btn-count.htm', template);

	template = "" +
		"<div class='ams_btn_template_repeat' ng-show='(_getLeafs(_shadowOutputModel) | filter:search ).length === 0'>0 {{ _trans.selected }}</div>" +
		"<div class='ams_btn_template_repeat' ng-repeat='obj in objs = (_getLeafs(_shadowOutputModel) | filter:search )' ng-bind-html='_createButtonLabel(objs, \$index)'></div>" +
		"<span class='caret'></span>";
	template = replaceInterpolation(template);
	$templateCache.put('angular-multi-select-btn-data.htm', template);

	template = "" +
		"<div class='ams_item' ng-click='clickItem(item, true);' ng-class='{ams_selected: item[tickProperty], ams_all_children_checked: item.allChecked, ams_group:_hasChildren(item, false) > 0 && toggleChildren, ams_focused: kbFocus[kbFocusIndex] === item[idProperty]}'>" +
			"<div ng-bind-html='_createItemLabel(item)'></div>" +
			"<span class='ams_tick' ng-if='item[tickProperty] === true'></span>" +
		"</div>" +

		"<ul ng-if='item.sub'>" +
			"<li ng-repeat='item in item[groupProperty] | filter: not(_isHidden)' ng-include=\"'angular-multi-select-item.htm'\"></li>" +
		"</ul>";
	template = replaceInterpolation(template);
	$templateCache.put('angular-multi-select-item.htm', template);

	template =
		'<span class="ams">' +
			// main button
			"<button class='ams_btn' type='button' ng-click='visible = !visible'><div class='ams_btn_template' ng-include src='buttonTemplate'></div></button>" +
			// overlay layer
			'<div class="ams_layer" ng-show="visible">' +
				// container of the helper elements
				'<div class="ams_helpers_container" ng-if="helperStatus.filter || helperStatus.all || helperStatus.none || helperStatus.reset ">' +
					// container of the first 3 buttons, select all, none and reset
					'<div class="ams_row" ng-if="helperStatus.all || helperStatus.none || helperStatus.reset ">' +
						// select all
						'<button type="button" class="ams_helper_btn ams_selectall"' +
							'ng-if="helperStatus.all" ng-click="selectAll()" ng-bind-html="lang.selectAll" set-focus="kbFocus[kbFocusIndex] === \'all\'"">' +
						'</button>'+
						// select none
						'<button type="button" class="ams_helper_btn ams_selectnone"' +
							'ng-if="helperStatus.none" ng-click="selectNone()" ng-bind-html="lang.selectNone" set-focus="kbFocus[kbFocusIndex] === \'none\'">' +
						'</button>'+
						// reset
						'<button type="button" class="ams_helper_btn reset ams_reset"' +
							'ng-if="helperStatus.reset" ng-click="reset()" ng-bind-html="lang.reset" set-focus="kbFocus[kbFocusIndex] === \'reset\'">' +
						'</button>' +
					'</div>' +
					// the search box
					'<div class="ams_row ams_search" ng-if="helperStatus.filter">' +
						// textfield
						'<input placeholder="{{ lang.search }}" type="text" ' +
							'ng-model="searchInput.value" class="inputFilter ams_filter" set-focus="kbFocus[kbFocusIndex] === \'input\'"' +
						'/>' +
						// clear button
						'<button type="button" class="ams_helper_btn ams_clear" ng-click="clear()" set-focus="kbFocus[kbFocusIndex] === \'clear\'"></button> ' +
					'</div> ' +
				'</div> ' +

				// selection items
				'<div class="ams_items_container">' +
					"<ul>" +
						"<li ng-repeat='item in filteredModel | filter: not(_isHidden)' ng-include=\"'angular-multi-select-item.htm'\"></li>" +
					"</ul>" +
				'</div>'+
			'</div>'+
		'</span>';
	template = replaceInterpolation(template);
	$templateCache.put('angular-multi-select.htm', template);
}]);
