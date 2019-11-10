//     ConstraintJS (CJS) 0.9.2
//     ConstraintJS may be freely distributed under the MIT License
//     http://cjs.from.so/

/* jslint nomen: true, vars: true */
/* jshint -W093 */
/* global document */
/** @expose cjs */
var cjs = (function (root) {
"use strict";

// Utility functions
// -----------------

// Many of the functions here are from http://underscorejs.org/
// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

// Create quick reference variables for speed access to core prototypes.
var slice         = ArrayProto.slice,
	toString      = ObjProto.toString,
	concat        = ArrayProto.concat,
	push          = ArrayProto.push;

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeSome    = ArrayProto.some,
	nativeIndexOf = ArrayProto.indexOf,
	nativeEvery   = ArrayProto.every,
	nativeForEach = ArrayProto.forEach,
	nativeKeys    = Object.keys,
	nativeFilter  = ArrayProto.filter,
	nativeReduce  = ArrayProto.reduce,
	nativeMap     = ArrayProto.map;

//Bind a function to a context
var bind = function (func, context) { return function () { return func.apply(context, arguments); }; },
	doc	= root.document,
	sTO = bind(root.setTimeout, root),
	cTO = bind(root.clearTimeout, root),
	// Binary and unary operators will be used for constraint modifiers and for templates,
	// which allow these operators to be used in constraints
	unary_operators = { "+": function (a) { return +a; }, "-": function (a) { return -a; },
						"~": function (a) { return ~a; }, "!": function (a) { return !a; }
	},
	binary_operators = {"===": function (a, b) { return a === b;}, "!==":function (a, b) { return a !== b; },
						"==":  function (a, b) { return a == b; }, "!=": function (a, b) { return a != b; },
						">":   function (a, b) { return a > b;  }, ">=": function (a, b) { return a >= b; },
						"<":   function (a, b) { return a < b;  }, "<=": function (a, b) { return a <= b; },
						"+":   function (a, b) { return a + b;  }, "-":  function (a, b) { return a - b; },
						"*":   function (a, b) { return a * b;  }, "/":  function (a, b) { return a / b; },
						"%":   function (a, b) { return a % b;  }, "^":  function (a, b) { return a ^ b; },
						"&&":  function (a, b) { return a && b; }, "||": function (a, b) { return a || b; },
						"&":   function (a, b) { return a & b;  }, "|":  function (a, b) { return a | b; },
						"<<":  function (a, b) { return a << b; }, ">>": function (a, b) { return a >> b; },
						">>>": function (a, b) { return a >>> b;}
	};

// Establish the object that gets returned to break out of a loop iteration.
var breaker = {};

// Creating a unique id for constraints allows for quicker referencing
var uniqueId = (function () {
	var id = 0;
	return function () { return id++; };
}());

// Create a (shallow-cloned) duplicate of an object.
var clone = function(obj) {
	if (!isObject(obj)) { return obj; }
	return isArray(obj) ? obj.slice() : extend({}, obj);
};

// Returns the keys of an object
var keys = nativeKeys || function (obj) {
	if (obj !== Object(obj)) { throw new TypeError('Invalid object'); }
	var keys = [], key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			keys[keys.length] = key;
		}
	}
	return keys;
};

// Get the last element of an array. Passing **n** will return the last N
// values in the array.
var last = function(array, n) {
	if (!array) {
		return void 0;
	} else if (n===undefined) {
		return array[array.length - 1];
	} else {
		return slice.call(array, Math.max(array.length - n, 0));
	}
};

// Determine if at least one element in the object matches a truth test.
// Delegates to **ECMAScript 5**'s native `some` if available.
var any = function(obj, iterator, context) {
	var result = false;
	if (!obj) { return result; }
	if (nativeSome && obj.some === nativeSome) { return obj.some(iterator, context); }
	each(obj, function(value, index, list) {
		if (result || (result = iterator.call(context, value, index, list))) { return breaker; }
	});
	return !!result;
};

// Returns everything but the first entry of the array.
// Especially useful on the arguments object. Passing an **n** will return
// the rest N values in the array.
var rest = function(array, n) {
	return slice.call(array, n === undefined ? 1 : n);
};

// Trim out all falsy values from an array.
var compact = function(array) {
	return filter(array, identity);
};

// Determine whether all of the elements match a truth test.
// Delegates to **ECMAScript 5**'s native `every` if available.
var every = function(obj, iterator, context) {
	iterator = iterator || identity;
	var result = true;
	if (!obj) {
		return result;
	} else if (nativeEvery && obj.every === nativeEvery) {
		return obj.every(iterator, context);
	} else {
		each(obj, function(value, index, list) {
			if (!(result = result && iterator.call(context, value, index, list))) {
				return breaker;
			}
		});
		return !!result;
	}
};

// Recursive call for flatten (from underscore)
var recursiveFlatten = function(input, shallow, output) {
	if (shallow && every(input, isArray)) {
		return concat.apply(output, input);
	}
	each(input, function(value) {
		if (isArray(value) || isArguments(value)) {
			if(shallow) {
				push.apply(output, value);
			} else {
				recursiveFlatten(value, shallow, output);
			}
		} else {
			output.push(value);
		}
	});
	return output;
};

// Initial call to the recursive flatten function
var flatten = function(input, shallow) {
	return recursiveFlatten(input, shallow, []);
};

// Retrieve the values of an object's properties.
var values = function (obj) {
	var values = [];
	var key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			values.push(obj[key]);
		}
	}
	return values;
};

// Is a given value a number?
var isNumber = function (obj) {
		return toString.call(obj) === '[object Number]';
	},
	// Is a given value an array?
	// Delegates to ECMA5's native Array.isArray
	isArray = Array.isArray || function (obj) {
		return toString.call(obj) === '[object Array]';
	},
	// Is a given value a function?
	isFunction = function (obj) {
		return toString.call(obj) === '[object Function]';
	},
	// Is the given value a String?
	isString = function (obj) {
		return toString.call(obj) === '[object String]';
	},
	// Is a given variable an object?
	isObject = function (obj) {
		return obj === Object(obj);
	},
	// Is a given value a DOM element?
	isElement = function(obj) {
		return !!(obj && obj.nodeType === 1);
	},
	// Any element of any type?
	isAnyElement = function(obj) {
		return !!(obj && (obj.nodeType > 0));
	},
	// Is a given variable an arguments object?
	isArguments = function (obj) {
		return toString.call(obj) === '[object Arguments]';
	};
 
// Keep the identity function around for default iterators.
var identity = function (value) {
	return value;
};

// Safely convert anything iterable into a real, live array.
var toArray = function (obj) {
	if (!obj) { return []; }
	if (isArray(obj)) { return slice.call(obj); }
	if (isArguments(obj)) { return slice.call(obj); }
	if (obj.toArray && isFunction(obj.toArray)) { return obj.toArray(); }
	return map(obj, identity);
};

// `hasOwnProperty` proxy, useful if you don't know if obj is null or not
var hOP = ObjProto.hasOwnProperty,
	has = function (obj, key) {
		return hOP.call(obj, key);
	};

// Run through each element and calls `iterator` where `this` === `context`
var each = function (obj, iterator, context) {
	var i, key, l;
	if (!obj) { return; }
	if (nativeForEach && obj.forEach === nativeForEach) {
		obj.forEach(iterator, context);
	} else if (obj.length === +obj.length) {
		for (i = 0, l = obj.length; i < l; i++) {
			if (has(obj, i) && iterator.call(context, obj[i], i, obj) === breaker) { return; }
		}
	} else {
		for (key in obj) {
			if (has(obj, key)) {
				if (iterator.call(context, obj[key], key, obj) === breaker) { return; }
			}
		}
	}
};

// Run through each element and calls 'iterator' where 'this' === context
// and returns the return value for every element
var map = function (obj, iterator, context) {
	var results = [];
	if (!obj) { return results; }
	if (nativeMap && obj.map === nativeMap) { return obj.map(iterator, context); }
	each(obj, function (value, index, list) {
		results[results.length] = iterator.call(context, value, index, list);
	});
	if (obj.length === +obj.length) { results.length = obj.length; }
	return results;
};

// Return all the elements that pass a truth test.
// Delegates to **ECMAScript 5**'s native `filter` if available.
var filter = function(obj, iterator, context) {
	var results = [];
	if (!obj) { return results; }
	if (nativeFilter && obj.filter === nativeFilter) { return obj.filter(iterator, context); }
	each(obj, function(value, index, list) {
		if (iterator.call(context, value, index, list)) { results.push(value); }
	});
	return results;
};

// Extend a given object with all the properties in passed-in object(s).
var extend = function (obj) {
	each(slice.call(arguments, 1), function(source) {
		if (source) {
			for (var prop in source) {
				if(source.hasOwnProperty(prop)) {
					obj[prop] = source[prop];
				}
			}
		}
	});
	return obj;
};
	
// Return the first item in arr where test is true
var indexWhere = function (arr, test, start_index) {
	var i, len = arr.length;
	for (i = start_index || 0; i < len; i++) {
		if (test(arr[i], i)) { return i; }
	}
	return -1;
};

// The default equality check function
var eqeqeq = function (a, b) { return a === b; };

// Return the first item in arr equal to item (where equality is defined in equality_check)
var indexOf = function (arr, item, start_index, equality_check) {
	if(!equality_check && !start_index && nativeIndexOf && arr.indexOf === nativeIndexOf) {
		return arr.indexOf(item);
	} else {
		equality_check = equality_check || eqeqeq;
		return indexWhere(arr, function (x) { return equality_check(item, x); }, start_index);
	}
};
	
// Remove an item in an array
var remove = function (arr, obj) {
		return removeIndex(arr, indexOf(arr, obj));
	},
	removeIndex = function(arr, index) {
		if (index >= 0) { return arr.splice(index, 1)[0]; }
		return index;
	};

// Fold down a list of values into a single value
var reduce = function(obj, iterator, memo) {
	var initial = arguments.length > 2;
	if (!obj) obj = [];
	if (nativeReduce && obj.reduce === nativeReduce) {
		return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
	}
	each(obj, function(value, index, list) {
		memo = iterator(memo, value, index, list);
	});
	return memo;
};

// Longest common subsequence between two arrays, based on
// the [rosetta code implementation](http://rosettacode.org/wiki/Longest_common_subsequence#JavaScript)
var popsym = function (index, x, y, symbols, r, n, equality_check) {
		var s = x[index],
			pos = symbols[s] + 1;
		pos = indexOf(y, s, pos > r ? pos : r, equality_check);
		if (pos < 0) { pos = n; }
		symbols[s] = pos;
		return pos;
	},
	indexed_lcs = function (x, y, equality_check) {
		var symbols = {}, r = 0, p = 0, p1, L = 0, idx, i,
			m = x.length, n = y.length, S = new Array(m < n ? n : m);
		if (n === 0 || m === 0) { return []; }
		p1 = popsym(0, x, y, symbols, r, n, equality_check);
		for (i = 0; i < m; i++) {
			p = (r === p) ? p1 : popsym(i, x, y, symbols, r, n, equality_check);
			p1 = popsym(i + 1, x, y, symbols, r, n, equality_check);

			if (p > p1) {
				i++;
				idx = p1;
			} else {
				idx = p;
			}

			if (idx === n || i === m) {
				p=popsym(i, x, y, symbols, r, n, equality_check);
			} else {
				r = idx;
				S[L] = {item: x[i], indicies: [i, idx]};
				L++;
			}
		}
		return S.slice(0,L);
	};

// "Subtracts" `y` from `x` (takes `x-y`) and returns a list of items in `x` that aren't in `y`
var diff = function (x, y, equality_check) {
	var i, j, xi,
		y_clone = clone(y),
		x_len = x.length,
		y_len = y.length,
		diff = [],
		diff_len = 0;

	// If there aren't any items, then the difference is the same as `x`.
	// not bothering to return a clone here because diff is private none of my code
	// modifies the return value
	if(y_len === 0 || x_len === 0) {
		return x;
	}

	for (i = 0; i < x_len; i += 1) {
		xi = x[i];
		j = indexOf(y_clone, xi, 0, equality_check);
		if(j >= 0) {
			removeIndex(y_clone, j);
			// If there's nothing left to subtract, just add the rest of x to diff and return
			if(--y_len === 0) {
				diff.push.apply(diff, rest(x, i+1));
				break;
			}
		} else {
			diff[diff_len] = xi;
			diff_len++;
		}
	}
	return diff;
};

// Returns the items that are in both x and y, but also accounts for the count of equivalent items (as defined by equality_check)
// Examples:
// `x = [1,2,2,3]`, `y = [1,2,4]` -> `[1,2]`;
// `x = [1,1,1]`,   `y = [1,1]`   -> `[1,1]`
var dualized_intersection = function (x, y, equality_check) {
	var i, j, xi,
		y_clone = clone(y),
		x_len = x.length,
		y_len = y.length,
		intersection = [];

	for (i = 0; i < x_len && y_len > 0; i++) {
		xi = x[i];
		j = indexOf(y_clone, xi, 0, equality_check);
		if(j >= 0) {
			intersection.push([xi, removeIndex(y_clone, j)]);
			y_len--;
		}
	}

	return intersection;
};

// Utility functions for `array_source_map`
var get_index_moved = function(info) {
		var item = info[1].item;
		return {item: item, from: info[0].index, to: info[1].index, from_item: info[0].item, to_item: item};
	}, 
	add_indicies = function(x, i) {
		return {item: x, index: i};
	},
	add_from_to_indicies = function(info) {
		return {item: info.item, from: info.indicies[0], to: info.indicies[1]};
	},
	get_index = function(x) { return x.index; },
	get_to = function(x) { return x.to; },
	add_from_and_from_item = function(x) {
		return { from: x.index, from_item: x.item };
	};

// Get where every item came from and went to and return that map
var array_source_map = function (from, to, equality_check) {
	var eq = equality_check || eqeqeq,
		item_aware_equality_check = function (a, b) { return eq(a ? a.item : a, b ? b.item : b); },
		indexed_from = map(from, add_indicies),
		indexed_to = map(to, add_indicies),
		indexed_common_subsequence = map(indexed_lcs(from, to), add_from_to_indicies),
		indexed_removed = diff(indexed_from, indexed_common_subsequence, item_aware_equality_check),
		indexed_added = diff(indexed_to, indexed_common_subsequence, item_aware_equality_check),
		indexed_moved = map(dualized_intersection(indexed_removed, indexed_added, item_aware_equality_check), get_index_moved);

	indexed_added = diff(indexed_added, indexed_moved, item_aware_equality_check);
	indexed_removed = diff(indexed_removed, indexed_moved, item_aware_equality_check);

	var added_indicies = map(indexed_added, get_index),
		moved_indicies = map(indexed_moved, get_to),
		ics_indicies = map(indexed_common_subsequence, get_to),
		to_mappings = map(to, function (item, index) {
				var info, info_index;

				// Added items
				if ((info_index = indexOf(added_indicies, index)) >= 0) {
					info = indexed_added[info_index];
					return { to: index, to_item: item, item: item };
				} else if ((info_index = indexOf(moved_indicies, index)) >= 0) {
					info = indexed_moved[info_index];
					return { to: index, to_item: item, item: item, from: info.from, from_item: info.from_item };
				} else if ((info_index = indexOf(ics_indicies, index)) >= 0) {
					info = indexed_common_subsequence[info_index];
					return { to: index, to_item: item, item: item, from: info.from, from_item: from[info.from] };
				}
			});

	return to_mappings.concat(map(indexed_removed, add_from_and_from_item));
};

// These utility functions help compute the array diff (without having to re-declare them every time get_array_diff is called
var has_from = function(x) { return x.hasOwnProperty("from"); },
	not_has_from = function(x) { return !has_from(x); },
	has_to = function(x) { return x.hasOwnProperty("to"); },
	not_has_to = function(x) { return !has_to(x); },
	has_from_and_to = function(x) { return has_from(x) && has_to(x); },
	unequal_from_to = function(x) { return has_from_and_to(x) && x.from !== x.to; },
	sort_by_from_fn = function(a, b) {
		// This is equivalent to (but faster than):

		//     if (a_has_from && b_has_from) { return a.from - b.from; }
		//     else if (a_has_from && !b_has_from) { return -1; }
		//     else if (!a_has_from && b_has_from) { return 1; }
		//     else { return 0; }
		var a_has_from = has_from(a), b_has_from = has_from(b);
		return a_has_from && b_has_from ? a.from - b.from : b_has_from - a_has_from;
	};

/**
 *
 * `arrayDiff` returns an object with attributes:
 * `removed`, `added`, and `moved`.
 * Every item in `removed` has the format: `{item, index}`
 * Every item in `added` has the format: `{item, index}`
 * Every item in `moved` has the format: `{from_index, to_index}`
 * Every item in `index_changed` has the format: `{from_index, to_index}`
 *
 * When `oldArray` removes every item in `removed`, adds every item in `added`,
 * and moves every item in `moved` (in that order), it will result in an array
 * that is equivalent to `newArray`. Note: this function is used internally to
 * determine how to keep DOM nodes in sync with an underlying model with the
 * smallest number of modifications to the DOM tree.
 *
 * @method cjs.arrayDiff
 * @param {array[*]} from_val - The 'former' array
 * @param {array[*]} to_val - The 'new' array
 * @param {function} [equality_check] - A function that checks for equality between items
 * @return {Object} - added, removed, and moved items
 *
 * @example Taking the diff between `old_array` and `new_array` with the default equality check
 *
 *     var old_array = ['a','b','c'],
 *         new_array = ['c','b','d'],
 *         diff = cjs.arrayDiff(old_array, new_array);
 *		
 *     // diff === {
 *     //   added: [ { item: 'd', to: 2, to_item: 'd' } ],
 *     //   removed: [ { from: 0, from_item: 'a' } ],
 *     //   moved: [ { item: 'c', from: 2, insert_at: 0, move_from: 1, to: 0 } ],
 *     //   index_changed: [ { from: 2, from_item: 'c', item: 'c', to: 0, to_item: 'c' } ]
 *     // }
 *		
 */
var get_array_diff = function (from_val, to_val, equality_check) {
	var source_map = array_source_map(from_val, to_val, equality_check),
		rearranged_array = clone(source_map).sort(sort_by_from_fn),

		added = filter(source_map, not_has_from), // back to front
		removed = filter(rearranged_array, not_has_to).reverse(), // back to front
		index_changed = filter(source_map, unequal_from_to),
		moved = [];

	each(removed, function (info) { removeIndex(rearranged_array, info.from); });
	each(added, function (info) { rearranged_array.splice(info.to, 0, info); });
	
	each(source_map, function (info, index) {
		if (has_from_and_to(info)) {
			if (rearranged_array[index] !== info) {
				var rearranged_array_info_index = indexOf(rearranged_array, info, index);
				rearranged_array.splice(index, 0, removeIndex(rearranged_array, rearranged_array_info_index));
				moved.push({move_from: rearranged_array_info_index, insert_at: index, item: info.item, from: info.from, to: info.to});
			}
		}
	});
	rearranged_array = null;
	return { added: added, removed: removed, moved: moved, index_changed: index_changed , mapping: source_map};
};

// Convert dashed to camelCase; used by the css and data modules
// Microsoft forgot to hump their vendor prefix (#9572)
var rdashAlpha = /-([a-z]|[0-9])/ig, rmsPrefix = /^-ms-/,
	fcamelCase = function(all, letter) { return String(letter).toUpperCase(); },
	camel_case = function(string) { return string.replace( rmsPrefix, "ms-" ).replace(rdashAlpha, fcamelCase); };

// ConstraintJS Core Functionality
// -------------------------------

var Constraint, // Declare here, will be defined later
	ArrayConstraint,
	MapConstraint,
	is_constraint,
	is_array,
	is_map,
	
	// Save the previous value of the `cjs` variable.
	old_cjs = root.cjs,
	/**
	 * `cjs` is ConstraintJS's only *visible* object; every other method an property is a property of `cjs`.
	 * The `cjs` object itself can also be called to create a constraint object.
	 *
	 * @method cjs
	 * @param {object} value - A map of initial values
	 * @param {object} options - A set of options to control how the array constraint is evaluated
	 * @return {cjs.ArrayConstraint} A new array constraint
	 * @see cjs.noConflict
	 *
	 * @example Creating an array constraint
	 *
	 *     var cjs_arr = cjs([1,2,3]);
	 *         cjs_arr.item(0); // 1
	 */

	/**
	 * Input value constraint
	 *
	 * @method cjs^2
	 * @param {dom} node - The DOM node whose value to follow
	 * @return {cjs.Binding} A constraint whose value is the current value of the input
	 *
	 * @example Creating an input value constraint
	 *
	 *     var inp_elem = document.getElementById('myTextInput'),
	 *         cjs_val = cjs(inp_elem);
	 */
	/**
	 * Create a map constraint
	 *
	 * @method cjs^3
	 * @param {object} value - A map of initial values
	 * @param {object} options - A set of options to control how the map constraint is evaluated
	 * @return {cjs.MapConstraint} A new map constraint
	 *
	 * @example Creating a map constraint
	 *
	 *     var cobj_obj = cjs({
	 *         foo: 1
	 *     });
	 *     cobj.get('foo'); // 1
	 *     cobj.put('bar', 2);
	 *     cobj.get('bar') // 2
	 */
	/**
	 * Create a standard constraint
	 *
	 * @method cjs^4
	 * @param {object} value - The constraint's value
	 * @param {object} options - A set of options to control how the constraint is evaluated
	 * @return {cjs.Constraint} A new constraint
	 * 
	 * @example Creating an empty constraint
	 *
	 *     var x = cjs(),
	 *         y = cjs(1),
	 *         z = cjs(function() {
	 *             return y.get() + 1;
	 *         });
	 *     x.get(); // undefined
	 *     y.get(); // 1
	 *     z.get(); // 2
	 *
	 * @example With options
	 *
	 *     var yes_lit = cjs(function() { return 1; },
	 *                         { literal: true }),
	 *     var not_lit = cjs(function() { return 1; },
	 *                         { literal: false });
	 *     yes_lit.get(); // (function)
	 *     not_lit.get(); // 1
	 */
	cjs = function (arg0, arg1) {
		if(isArray(arg0)) {
			return new ArrayConstraint(extend({
				value: arg0
			}, arg1));
		} else if(isPolyDOM(arg0)) {
			return cjs.inputValue(arg0);
		} else if(isObject(arg0) && !isFunction(arg0)) {
			return new MapConstraint(extend({
				value: arg0
			}, arg1));
		} else {
			return new Constraint(arg0, arg1);
		}
	};

// Constraint Solver
// -----------------
// Implements constraint solving, as described in:
// [Integrating pointer variables into one-way constraint models](http://doi.acm.org/10.1145/180171.180174)

//   Edge from A -> B means A sends data to B

var constraint_solver = {
	// `stack` keeps track of the list of constraints that is currently being fetched. If constraint A is fetched while B is on the top of the stack
	// then A is added to the top of the stack and B is marked as dependent on A
	stack: [],

	// node is the Constraint whose value we are fetching and auto_add_outgoing specifies whether dependencies FROM node should
	// be automatically added
	getValue: function (auto_add_outgoing) {
		var node = this,
			stack = constraint_solver.stack,
			stack_len = stack.length,
			demanding_var, dependency_edge;
		
		if (stack_len > 0) { // There's a constraint that's asking for my value
			// Let's call it demanding_var
			demanding_var = stack[stack_len - 1];
			dependency_edge = node._outEdges[demanding_var._id];

			// If there's already a dependency set up, mark it as still being used by setting its timestamp to the demanding
			// variable's timestamp + `1` (because that variable's timestamp will be incrememted later on, so they will be equal)
			// 
			// Code in the this.nullify will check this timestamp and remove the dependency if it's out of date
			if(dependency_edge) {
				// Update timestamp
				dependency_edge.tstamp++;
			} else {
				// Make sure that the dependency should be added
				if (node._options.auto_add_outgoing_dependencies !== false &&
						demanding_var._options.auto_add_incoming_dependencies !== false &&
						auto_add_outgoing !== false) {
					// and add it if it should
					node._outEdges[demanding_var._id] =
						demanding_var._inEdges[node._id] = {from: node, to: demanding_var, tstamp: demanding_var._tstamp + 1};
				}
			}
		}

		// If the node's cached value is invalid...
		if (!node._valid) {
			// Push node onto the stack to make it clear that it's being fetched
			stack[stack_len] = node;
			// Mark it as valid
			node._valid = true;

			// Set the timestamp before fetching in case a constraint depends on itself
			node._tstamp++;

			if (node._options.cache_value !== false) {
				// Check if dynamic value. If it is, then call it. If not, just fetch it
				// set this to the node's cached value, which will be returned
				node._cached_value = isFunction(node._value) && !node._options.literal ? node._value.call(node._options.context) : node._value;
			} else if(isFunction(node._value)) {
				// if it's just a non-cached function call, just call the function
				node._value.call(node._options.context);
			}
			// Pop the item off the stack
			stack.length = stack_len;
		}

		return node._cached_value;
	},
	
	// Utility function to mark a listener as being in the call stack
	add_in_call_stack: function(nl) {
		nl.in_call_stack = true;
	},
	nullify: function(node) {
		// Unfortunately, running nullification listeners can, in some cases cause nullify to be indirectly called by itself
		// (as in while running `nullify`). The variable is_root will prevent another call to `run_nullification_listeners` at
		// the bottom of this function
		var i, outgoingEdges, toNodeID, invalid, curr_node, equals, old_value, new_value, changeListeners,
			to_nullify = [node],
			to_nullify_len = 1,
			is_root = !this._is_nullifying;

		if (is_root) {
			// This variable is used to track `is_root` for any potential future calls
			this._is_nullifying = true;
		}

		// Using a list instead of a recursive call because the call stack can get tall and annoying for debugging with
		// recursive calls
		for (i = 0; i < to_nullify_len; i+= 1) {
			curr_node = to_nullify[i]; // the constraint we are currently nullifying
			to_nullify[i] = false; // To save space, stop keeping track of the object (also useful for debugging occasionally)

			// We only care to nullify if the current node is actually valid
			if (curr_node._valid) {
				curr_node._valid = false; // Mark it as invalid...
				invalid = true;

				// The user can also optionally check if the node should be nullified. This is useful if a large number of nodes
				// depend on this node, and the potential cost of nullifying/re-evaluating them is higher than the cost of
				// re-evaluating this node
				if (curr_node._options.cache_value !== false && curr_node._options.check_on_nullify === true) {
					// Only mark as invalid if the old value is different from the current value.
					equals = curr_node._options.equals || eqeqeq;
					old_value = curr_node._cached_value;
					new_value = curr_node.get();

					if (equals(old_value, new_value)) {
						invalid = false;
					}
				}

				// If I'm still invalid, after a potential check
				if (invalid) {
					// Add all of the change listeners to the call stack, and mark each change listener
					// as being in the call stack
					changeListeners = curr_node._changeListeners;
					each(changeListeners, this.add_in_call_stack);
					this.nullified_call_stack.push.apply(this.nullified_call_stack, changeListeners);

					// Then, get every outgoing edge and add it to the nullify queue
					outgoingEdges = curr_node._outEdges;
					for (toNodeID in outgoingEdges) {
						if (has(outgoingEdges, toNodeID)) {
							var outgoingEdge = outgoingEdges[toNodeID];
							var dependentNode = outgoingEdge.to;

							// If the edge's timestamp is out of date, then this dependency isn't used
							// any more and remove it
							if (outgoingEdge.tstamp < dependentNode._tstamp) {
								delete curr_node._outEdges[toNodeID];
								delete dependentNode._inEdges[node._id];
							} else {
								// But if the dependency still is being used, then add it to the nullification
								// queue
								to_nullify[to_nullify_len] = dependentNode;
								to_nullify_len += 1;
							}
						}
					}
				}
			}
		}

		// If I'm the first one, then run the nullification listeners and remove the is_nullifying flag
		if (is_root) {
			// If nobody told us to wait, then run the nullification listeners
			if (this.semaphore >= 0 && this.nullified_call_stack.length > 0) {
				this.run_nullified_listeners();
			}
			delete this._is_nullifying;
		}
	},
	
	/**
	 * 
	 * Remove the edge going from `fromNode` to `toNode`
	 * @method cjs.removeDependency
	 */
	removeDependency: function(fromNode, toNode) {
		delete fromNode._outEdges[toNode._id];
		delete toNode._inEdges[fromNode._id];
	},

	// Use a semaphore to decide when running the nullification listeners is appropriate
	semaphore: 0,

	/**
	 * Tells the constraint solver to delay before running any `onChange` listeners
	 *
	 * Note that `signal` needs to be called the same number of times as `wait` before
	 * the `onChange` listeners will run.
	 * @method cjs.wait
	 * @see cjs.signal
	 * @see cjs.onChange
	 * @example
	 *     var x = cjs(1);
	 *     x.onChange(function() {
	 *         console.log('x changed');
	 *     });
	 *     cjs.wait();
	 *     x.set(2);
	 *     x.set(3);
	 *     cjs.signal(); // output: x changed
	 */
	wait: function() {
		this.semaphore -= 1;
	},
	/**
	 * Tells the constraint solver it is ready to run any `onChange` listeners.
	 * Note that `signal` needs to be called the same number of times as `wait` before
	 * the `onChange` listeners will run.
	 * @method cjs.signal
	 * @see cjs.wait
	 * @see cjs.onChange
	 * @example
	 *     var x = cjs(1);
	 *     x.onChange(function() {
	 *         console.log('x changed');
	 *     });
	 *     cjs.wait();
	 *     cjs.wait();
	 *     x.set(2);
	 *     x.set(3);
	 *     cjs.signal();
	 *     cjs.signal(); // output: x changed
	 */
	signal: function () {
		this.semaphore += 1;
		// When we signal that we're ready, try running the call stack
		if (this.semaphore >= 0 && this.nullified_call_stack.length > 0) {
			this.run_nullified_listeners();
		}
	},
	// The list of nullified listeners to run
	nullified_call_stack: [],
	// Tracks whether we are in the middle of running the nullification listeners
	running_listeners: false,
	// Clear all of the dependencies
	clearEdges: function(node, silent) {
		if(silent !== true) {
			this.wait();
		}
		var node_id = node._id;
		// Clear the incoming edges
		each(node._inEdges, function (edge, key) {
			var fromNode = edge.from;
			delete fromNode._outEdges[node_id];
			delete node._inEdges[key];
		});
		// and the outgoing edges
		each(node._outEdges, function (edge, key) {
			var toNode = edge.to;
			
			if (silent !== true) {
				constraint_solver.nullify(toNode);
			}
			delete toNode._inEdges[node_id];
			delete node._outEdges[key];
		});
		if(silent !== true) {
			this.signal();
		}
	},
	run_nullified_listeners: function () {
		var nullified_info, callback, context;
		// Make sure `run_nullified_listeners` isn't indirectly called by itself
		if (!this.running_listeners) {
			this.running_listeners = true;
			while (this.nullified_call_stack.length > 0) {
				nullified_info = this.nullified_call_stack.shift();
				callback = nullified_info.callback;
				context = nullified_info.context || root;

				nullified_info.in_call_stack = false;
				// If in debugging mode, then call the callback outside of a `try` statement
				if(cjs.__debug) {
					callback.apply(context, nullified_info.args);
				} else {
					try {
						// Call the nullification callback with any specified arguments
						callback.apply(context, nullified_info.args);
					} catch(e) {
						if(has(root, "console")) {
							root.console.error(e);
						}
					}
				}
			}
			this.running_listeners = false;
		}
	},
	remove_from_call_stack: function(info) {
		remove(this.nullified_call_stack, info);
	}
};

// Constraint Variables
// --------------------

/**
 * ***Note***: The preferred way to create a constraint is with the `cjs.constraint` function (lower-case 'c')
 * `cjs.Constraint` is the constructor for the base constraint. Valid properties for `options` are:
 *
 * - `auto_add_outgoing_dependencies`: allow the constraint solver to determine when things depend on me. *default:* `true`
 * - `auto_add_incoming_dependencies`: allow the constraint solver to determine when things I depend on things. *default:* `true`
 * - `cache_value`: whether or not to keep track of the current value. *default:* `true`
 * - `check_on_nullify`: when nullified, check if my value has actually changed (requires immediately re-evaluating me). *default*: `false`
 * - `context`: if `value` is a function, the value of `this`, when that function is called. *default:* `window`
 * - `equals`: the function to check if two values are equal, *default:* `===`
 * - `literal`: if `value` is a function, the value of the constraint should be the function itself (not its return value). *default:* `false`
 * - `run_on_add_listener`: when `onChange` is called, whether or not immediately validate the value. *default:* `true`
 *
 * @class cjs.Constraint
 * @classdesc A constraint object communicates with the constraint solver to store and maintain constraint values
 * @param {*} value - The initial value of the constraint or a function to compute its value
 * @param {Object} [options] - A set of options to control how and when the constraint's value is evaluated:
 */
Constraint = function (value, options) {
	// These are all hidden values that should not be referred to directly
	this._options = extend({
		context: root
	}, options); // keeps track of the above options
	this._value = value; // Constant or a function
	this._id = uniqueId(); // different for every constraint, helps with optimizing speed
	this._outEdges = {}; // The nodes that depend on me, key is link to edge object (with properties toNode, fromNode=this)
	this._inEdges = {}; // The nodes that I depend on, key is link to edge object (with properties toNode=this, fromNode)
	this._changeListeners = []; // A list of callbacks that will be called when I'm nullified
	this._tstamp = 0; // Marks the last time I was updated

	if(this._options.literal || !isFunction(this._value)) { // We already have a value that doesn't need to be computed
		this._valid = true; // Tracks whether or not the cached value if valid
		this._cached_value = this._value; // Caches the node's value
	} else {
		this._valid = false;
		this._cached_value = undefined;
	}
};

(function(My) {
	var proto = My.prototype;
	/** @lends cjs.Constraint.prototype */

	/**
	 * Get the current value of this constraint. For computed constraints, if the constraint is invalid, its value will be re-computed.
	 *
	 *
	 * @method get
	 * @param {boolean} [autoAddOutgoing=true] - Whether to automatically add a dependency from this constraint to ones that depend on it.
	 * @return {*} The current constraint value
	 * @see set
	 *
	 * @example
	 *     var x = cjs(1);
	 *     x.get(); // 1
	 */
	proto.get = constraint_solver.getValue;

	/**
	 * Change the current value of the constraint. Other constraints that depend on its value will be invalidated.
	 *
	 * @method set
	 * @see cjs.Constraint
	 * @param {*} value - The initial value of the constraint or a function to compute its value
	 * @param {Object} [options] - A set of options to control how and when the constraint's value is evaluated:
	 * @return {cjs.Constraint} - `this`
	 * @see get
	 * @see invalidate
	 *
	 * @example
	 *     var x = cjs(1);
	 *     x.get(); // 1
	 *     x.set(function() { return 2; });
	 *     x.get(); // 2
	 *     x.set('c');
	 *     x.get(); // 'c'
	 */
	proto.set = function (value, options) {
		var old_value = this._value;
		this._value = value;

		// If it's a value
		if (this._options.literal || !isFunction(value)) {
			// Then use the specified equality check
			var equality_check = this._options.equal || eqeqeq;
			if(!equality_check(old_value, value)) {
				// And nullify if they aren't equal
				constraint_solver.nullify(this);
			}
		} else if(old_value !== value) { // Otherwise, check function equality
			// And if they aren't the same function, nullify
			constraint_solver.nullify(this);
		}

		return this;
	};

	/**
	 * Change how this constraint is computed (see Constraint options)
	 *
	 * @method setOption
	 * @see cjs.Constraint
	 * @param {Object} options - An object with the options to change
	 * @return {cjs.Constraint} - `this`
	 *
	 * @example
	 *     var x = cjs(function() { return 1; });
	 *     x.get(); // 1
	 *     x.setOption({
	 *         literal: true,
	 *         auto_add_outgoing_dependencies: false
	 *     });
	 *     x.get(); // (function)
	 */
	/**
	 * @method setOption^2
	 * @see cjs.Constraint
	 * @param {String} key - The name of the option to set
	 * @param {*} value - The option's new value
	 * @return {cjs.Constraint} - `this`
	 *
	 * @example
	 *     var x = cjs(function() { return 1; });
	 *     x.get(); // 1
	 *     x.setOption("literal", true);
	 *     x.get(); // (function)
	 */
	proto.setOption = function(arg0, arg1) {
		if(isString(arg0)) {
			this._options[arg0] = arg1;
		} else {
			extend(this._options, arg0);
		}
		// Nullify my value regardless of what changed
		// changing context, literal, etc. might change my value
		return this.invalidate();
	};

	/**
	 * Mark this constraint's value as invalid. This signals that the next time its value is fetched,
	 * it should be recomputed, rather than returning the cached value.
	 *
	 * An invalid constraint's value is only updated when it is next requested (for example, via `.get()`).
	 *
	 * @method invalidate
	 * @return {cjs.Constraint} - `this`
	 * @see isValid
	 *
	 * @example Tracking the window height
	 *     var height = cjs(window.innerHeight);
	 *     window.addEventListener("resize", function() {
	 *         height.invalidate();
	 *     });
	 */
	proto.invalidate = function () {
		constraint_solver.nullify(this);
		return this;
	};

	/**
	 * Find out if this constraint's value needs to be recomputed (i.e. whether it's invalid).
	 *
	 * An invalid constraint's value is only updated when it is next requested (for example, via `.get()`).
	 *
	 * @method isValid
	 * @return {boolean} - `true` if this constraint's current value is valid. `false` otherwise.
	 * @see invalidate
	 *
	 * @example
	 *     var x = cjs(1),
	 *         y = x.add(2);
	 *     y.get();     // 3
	 *     y.isValid(); // true
	 *     x.set(2);
	 *     y.isValid(); // false
	 *     y.get();     // 4
	 *     y.isValid(); //true
	 */
	proto.isValid = function () {
		return this._valid;
	};

	/**
	 * Removes every dependency to this node
	 *
	 * @method remove
	 * @param {boolean} [silent=false] - If set to `true`, avoids invalidating any dependent constraints.
	 * @return {cjs.Constraint} - `this`
	 * @see destroy
	 */
	proto.remove = function (silent) {
		constraint_solver.clearEdges(this, silent);
		this._valid = false;			// In case it gets used in the future, make sure this constraint is marked as invalid
		this._cached_value = undefined; // and remove the cached value
		return this;
	};
	
	/**
	 * Removes any dependent constraint, clears this constraints options, and removes every change listener. This is
	 * useful for making sure no memory is deallocated
	 *
	 * @method destroy
	 * @param {boolean} [silent=false] - If set to `true`, avoids invalidating any dependent constraints.
	 * @return {cjs.Constraint} - `this`
	 * @see remove
	 *
	 * @example
	 *     var x = cjs(1);
	 *     x.destroy(); // ...x is no longer needed
	 */
	proto.destroy = function (silent) {
		each(this._changeListeners, function(cl) {
			// remove it from the call stack
			if (cl.in_call_stack) {
				constraint_solver.remove_from_call_stack(cl);
			}
		});
		this.remove(silent);
		this._options = {};
		this._changeListeners = [];
		return this;
	};

	/**
	 * Call `callback` as soon as this constraint's value is invalidated. Note that if the constraint's value
	 * is invalidated multiple times, `callback` is only called once.
	 *
	 * @method onChange
	 * @param {function} callback
	 * @param {*} [thisArg=window] - The context to use for `callback`
	 * @param {...*} args - The first `args.length` arguments to `callback`
	 * @return {cjs.Constraint} - `this`
	 * @see offChange
	 *
	 * @example
	 *     var x = cjs(1);
	 *     x.onChange(function() {
	 *         console.log("x is " + x.get());
	 *     });
	 *     x.set(2); // x is 2
	 */
	proto.onChange = function(callback, thisArg) {
		var args = slice.call(arguments, 2); // Additional arguments
		this._changeListeners.push({
			callback: callback, // function
			context: thisArg, // 'this' when called
			args: slice.call(arguments, 2), // arguments to pass into the callback
			in_call_stack: false // internally keeps track of if this function will be called in the near future
		});
		if(this._options.run_on_add_listener !== false) {
			// Make sure my current value is up to date but don't add outgoing constraints.
			// That way, when it changes the callback will be called
			this.get(false);
		}
		return this;
	};
	
	/**
	 * Removes the first listener to `callback` that was created by `onChange`. `thisArg` is optional and
	 * if specified, it only removes listeners within the same context. If thisArg is not specified,
	 * the first `callback` is removed. 
	 *
	 * @method offChange
	 * @param {function} callback
	 * @param {*} [thisArg] - If specified, only remove listeners that were added with this context
	 * @return {cjs.Constraint} - `this`
	 * @see onChange
	 *
	 *     var x = cjs(1),
	 *         callback = function(){};
	 *     x.onChange(callback);
	 *     // ...
	 *     x.offChange(callback);
	 */
	proto.offChange = function (callback, thisArg) {
		var cl, i;
		for(i = this._changeListeners.length-1; i>=0; i-=1) {
			cl = this._changeListeners[i];
			// Same callback and either the same context or context wasn't specified
			if(cl.callback === callback && (!thisArg || cl.context === thisArg)) {
				// Then get rid of it
				removeIndex(this._changeListeners, i);
				// And remove it if it's in the callback
				if (cl.in_call_stack) {
					constraint_solver.remove_from_call_stack(cl);
				}
				// Only searching for the last one
				break;
			}
		}
		return this;
	};

	/**
	 * Change this constraint's value in different states
	 *
	 * @method inFSM
	 * @param {cjs.FSM} fsm - The finite-state machine to depend on
	 * @param {Object} values - Keys are the state specifications for the FSM, values are the value for those specific states
	 * @return {cjs.Constraint} - `this`
	 *
	 * @example
	 *     var fsm = cjs.fsm("state1", "state2")
	 *                  .addTransition("state1", "state2",
	 *                        cjs.on("click"));
	 *     var x = cjs().inFSM(fsm, {
	 *         state1: 'val1',
	 *         state2: function() { return 'val2'; }
	 *     });
	 */
	proto.inFSM = function(fsm, values) {
		each(values, function(v, k) {
			// add listeners to the fsm for that state that will set my getter's value
			fsm.on(k, function() {
				this.set(v);
			}, this);

			if(fsm.is(k)) {
				this.set(v);
			}
		}, this);
		
		return this;
	};

	/**
	 * Returns the last value in the array `[this].concat(args)` if every value is truthy. Otherwise, returns `false.
	 * Every argument won't necessarily be evaluated. For instance:
	 *
	 * - `x = cjs(false); cjs.get(x.and(a))` does not evaluate `a`
	 *
	 * @method and
	 * @param {...*} args - Any number of constraints or values to pass the "and" test
	 * @return {boolean|*} - `false` if this or any passed in value is falsy. Otherwise, the last value passed in.
	 *
	 * @example
	 *
	 *     var x = c1.and(c2, c3, true);
	 */
	proto.and = function() {
		var args = ([this]).concat(toArray(arguments)),
			len = args.length;

		return new My(function() {
			var i = 0, val;
			for(;i<len; i++) {
				// If any value is falsy, return false
				if(!(val = cjs.get(args[i]))) {
					return false;
				}
			}
			// Otherwise, return the last value fetched
			return val;
		});
	};

	/**
	 * Returns the first truthy value in the array `[this].concat(args)`. If no value is truthy, returns `false`.
	 * Every argument won't necessarily be evaluated. For instance:
	 *
	 * - `y = cjs(true); cjs.get(y.or(b))` does not evaluate `b`
	 *
	 * @method or
	 * @param {...*} args - Any number of constraints or values to pass the "or" test
	 * @return {boolean|*} - The first truthy value or `false` if there aren't any
	 *
	 * @example
	 *
	 *     var x = c1.or(c2, c3, false);
	 */
	proto.or = function() {
		var args = ([this]).concat(toArray(arguments)),
			len = args.length;

		return new My(function() {
			var i = 0, val;
			for(;i<len; i++) {
				// Return the first value (including this) that is truthy
				if((val = cjs.get(args[i]))) {
					return val;
				}
			}
			//Nothing was truthy, so return false
			return false;
		});
	};

	/**
	 * @ignore
	 * Creates a new function that takes in any number of arguments and creates a constraint whose result
	 * is calling `modifier_fn` on `this` plus every argument
	 */
	var createConstraintModifier = function(modifier_fn) {
		return function() {
			var args = ([this]).concat(toArray(arguments));
			return new My(function() {
				return modifier_fn.apply(this, map(args, cjs.get));
			});
		};
	};

	var get_prop = function(a, b) { return a ? a[b] : undefined; };
	/**
	 * Property constraint modifier.
	 *
	 * @method prop
	 * @param {...strings} args - Any number of properties to fetch
	 * @return {*} - A constraint whose value is `this[args[0]][args[1]]...`
	 * @example
	 * 
	 *     w = x.prop("y", "z"); // means w <- x.y.z
	 */
	proto.prop = createConstraintModifier(function(me) { return reduce(rest(arguments), get_prop, me); });

	/**
	 * Integer conversion constraint modifier.
	 * @method toInt
	 * @return {*} - A constrant whose value is parseInt(this)
	 * @example Given `<input />` element `inp_elem`
	 *
	 *     var inp_val = cjs(inp_elem).toInt();
	 */
	proto.toInt = createConstraintModifier(function(me) { return parseInt.apply(this, arguments); });

	/**
	 * Float conversion constraint modifier.
	 * @method toFloat
	 * @return {*} - A constraint whose value is parseFloat(this)
	 * @example Given `<input />` element `inp_elem`
	 *
	 *     var inp_val = cjs(inp_elem).toFloat();
	 */
	proto.toFloat = createConstraintModifier(function(me) { return parseFloat.apply(this, arguments); });

	// For all the arithmetic operators, allow any number of arguments to be passed in. For example:
	/**
	 * Addition constraint modifier
	 * @method add
	 * @param {...number} args - Any number of constraints or numbers
	 * @return {number} - A constraint whose value is `this.get() + args[0].get() + args[1].get() + ...`
	 * @example
	 *
	 *     x = y.add(1,2,z); // x <- y + 1 + 2 + z
	 * @example The same method can also be used to add units to values
	 *
	 *     x = y.add("px"); // x <- ypx
	 */
	proto.add = createConstraintModifier(function() { return reduce(arguments, binary_operators["+"], 0); });
	/**
	 * Subtraction constraint modifier
	 * @method sub
	 * @param {...number} args - Any number of constraints or numbers
	 * @return {number} - A constraint whose value is `this.get() - args[0].get() - args[1].get() - ...`
	 * @example
	 *
	 *     x = y.sub(1,2,z); // x <- y - 1 - 2 - z
	 */
	proto.sub = createConstraintModifier(function(me) { return reduce(rest(arguments), binary_operators["-"], me); });
	/**
	 * Multiplication constraint modifier
	 * @method mul
	 * @param {...number} args - Any number of constraints or numbers
	 * @return {number} - A constraint whose value is `this.get() * args[0].get() * args[1].get() * ...`
	 * @example
	 *
	 *     x = y.mul(1,2,z); //x <- y * 1 * 2 * z
	 */
	proto.mul = createConstraintModifier(function(me) { return reduce(rest(arguments), binary_operators["*"], me); });
	/**
	 * Division constraint modifier
	 * @method div
	 * @param {...number} args - Any number of constraints or numbers
	 * @return {number} - A constraint whose value is `this.get() / args[0].get() / args[1].get() / ...`
	 * @example
	 *
	 *     x = y.div(1,2,z); // x <- y / 1 / 2 / z
	 */
	proto.div = createConstraintModifier(function(me) { return reduce(rest(arguments), binary_operators["/"], me); });

	/**
	 * Absolute value constraint modifier
	 * @method abs
	 * @return {number} - A constraint whose value is `Math.abs(this.get())`
	 * @example
	 *
	 *     x = c1.abs(); // x <- abs(c1)
	 */
	/**
	 * Floor
	 * @method floor
	 * @return {number} - A constraint whose value is `Math.floor(this.get())`
	 * @example
	 *
	 *     x = c1.floor(); // x <- floor(c1)
	 */
	/**
	 * Ceil
	 * @method ceil
	 * @return {number} - A constraint whose value is `Math.ceil(this.get())`
	 * @example
	 *
	 *     x = c1.ceil(); // x <- ceil(c1)
	 */
	/**
	 * Round
	 * @method round
	 * @return {number} - A constraint whose value is `Math.round(this.get())`
	 * @example
	 *
	 *     x = c1.round(); // x <- round(c1)
	 */
	/**
	 * Square root
	 * @method sqrt
	 * @return {number} - A constraint whose value is `Math.sqrt(this.get())`
	 * @example
	 *
	 *     x = c1.sqrt(); // x <- sqrt(c1)
	 */
	/**
	 * Arccosine
	 * @method acos
	 * @return {number} - A constraint whose value is `Math.acos(this.get())`
	 * @example
	 *
	 *     angle = r.div(x).acos()
	 */
	/**
	 * Arcsin
	 * @method asin
	 * @return {number} - A constraint whose value is `Math.asin(this.get())`
	 * @example
	 *
	 *     angle = r.div(y).asin()
	 */
	/**
	 * Arctan
	 * @method atan
	 * @return {number} - A constraint whose value is `Math.atan(this.get())`
	 * @example
	 *
	 *     angle = y.div(x).atan()
	 */
	/**
	 * Arctan2
	 * @method atan2
	 * @param {number|cjs.Constraint} x
	 * @return {number} - A constraint whose value is `Math.atan2(this.get()/x.get())`
	 * @example
	 *
	 *     angle = y.atan2(x)
	 */
	/**
	 * Cosine
	 * @method cos
	 * @return {number} - A constraint whose value is `Math.cos(this.get())`
	 * @example
	 *
	 *     dx = r.mul(angle.cos())
	 */
	/**
	 * Sine
	 * @method sin
	 * @return {number} - A constraint whose value is `Math.sin(this.get())`
	 * @example
	 *
	 *     dy = r.mul(angle.sin())
	 */
	/**
	 * Tangent
	 * @method tan
	 * @return {number} - A constraint whose value is `Math.tan(this.get())`
	 * @example
	 *
	 *     dy = r.mul(angle.sin())
	 */
	/**
	 * Max
	 * @method max
	 * @param {...number} args - Any number of constraints or numbers
	 * @return {number} - A constraint whose value is the **highest** of `this.get()`, `args[0].get()`, `args[1].get()`...
	 * @example
	 *
	 *     val = val1.max(val2, val3);
	 */
	/**
	 * Min
	 * @method min
	 * @param {...number} args - Any number of constraints or numbers
	 * @return {number} - A constraint whose value is the **lowest** of `this.get()`, `args[0].get()`, `args[1].get()`...
	 * @example
	 *
	 *     val = val1.min(val2, val3);
	 */
	/**
	 * Power
	 * @method pow
	 * @param {number} x - The exponent
	 * @return {number} - A constraint whose value is `Math.pow(this.get(), x.get())`
	 * @example
	 *
	 *     d = dx.pow(2).add(dy.pow(2)).sqrt()
	 */
	/**
	 * Natural Log (base e)
	 * @method log
	 * @return {number} - A constraint whose value is `Math.log(this.get())`
	 * @example
	 *
	 *     num_digits = num.max(2).log().div(Math.log(10)).ceil()
	 */
	/**
	 * Exp (E^x)
	 * @method exp
	 * @return {number} - A constraint whose value is `Math.exp(this.get())`
	 * @example
	 *
	 *     neg_1 = cjs(i*pi).exp()
	 */
	each(["abs", "acos", "asin", "atan", "atan2", "cos", "max", "min", "sin", "tan",
			"pow", "round", "floor", "ceil", "sqrt", "log", "exp"], function(op_name) {
		proto[op_name] = createConstraintModifier(bind(Math[op_name], Math));
	});

	/**
	 * Coerce an object to a number
	 * @method pos
	 * @return {number} - A constraint whose value is `+(this.get())`
	 * @example
	 *
	 *     numeric_val = val.pos()
	 */
	/**
	 * Negative operator
	 * @method neg
	 * @return {number} - A constraint whose value is `-(this.get())`
	 * @example
	 *
	 *     neg_val = x.neg()
	 */
	/**
	 * Not operator
	 * @method not
	 * @return {boolean} - A constraint whose value is `!(this.get())`
	 * @example
	 *
	 *     opposite = x.not()
	 */
	/**
	 * Bitwise not operator
	 * @method bitwiseNot
	 * @return {number} - A constraint whose value is `~(this.get())`
	 * @example
	 *
	 *     inverseBits = val.bitwiseNot()
	 */
	/**
	 * Equals unary operator
	 * @method eq
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() == other.get()`
	 *
	 * @example
	 *
	 *     isNull = val.eq(null)
	 */
	/**
	 * Not equals operator
	 * @method neq
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() != other.get()`
	 *
	 * @example
	 *
	 *     notNull = val.neq(null)
	 */
	/**
	 * Strict equals operator
	 * @method eqStrict
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() === other.get()`
	 *
	 * @example
	 *
	 *     isOne = val.eqStrict(1)
	 */
	/**
	 * Not strict equals binary operator
	 * @method neqStrict
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() !== other.get()`
	 *
	 * @example
	 *
	 *     notOne = val.neqStrict(1)
	 */
	/**
	 * @method gt
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() > other.get()`
	 *
	 * @example
	 *
	 *     isPositive = val.gt(0)
	 */
	/**
	 * @method lt
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() < other.get()`
	 * 
	 * @example
	 *
	 *     isNegative = val.lt(0)
	 */
	/**
	 * @method ge
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() >= other.get()`
	 *
	 * @example
	 *
	 *     isBig = val.ge(100)
	 */
	/**
	 * @method le
	 * @param {*} other - A constraint or value to compare against
	 * @return {boolean} - A constraint whose value is `this.get() <= other.get()`
	 *
	 * @example
	 *
	 *     isSmall = val.le(100)
	 */
	/**
	 * @method xor
	 * @param {*} other - A constraint or value to compare against
	 * @return {number} - A constraint whose value is `this.get() ^ other.get()`
	 */
	/**
	 * @method bitwiseAnd
	 * @param {*} other - A constraint or value to compare against
	 * @return {number} - A constraint whose value is `this.get() & other.get()`
	 */
	/**
	 * @method bitwiseOr
	 * @param {*} other - A constraint or value to compare against
	 * @return {number} - A constraint whose value is `this.get() | other.get()`
	 */
	/**
	 * @method mod
	 * @param {*} other - A constraint or value to compare against
	 * @return {number} - A constraint whose value is `this.get() % other.get()`
	 * @example
	 *		isEven = x.mod(2).eq(0);
	 *
	 */
	/**
	 * @method rightShift
	 * @param {*} other - A constraint or value to compare against
	 * @return {number} - A constraint whose value is `this.get() >> other.get()`
	 */
	/**
	 * @method leftShift
	 * @param {*} other - A constraint or value to compare against
	 * @return {number} - A constraint whose value is `this.get() << other.get()`
	 */
	/**
	 * @method unsignedRightShift
	 * @param {*} other - A constraint or value to compare against
	 * @return {number} - A constraint whose value is `this.get() >>> other.get()`
	 */
	each({
		u: { // Unary operators
			pos: "+", neg: "-", not: "!", bitwiseNot: "~"
		},
		bi: { // Binary operators
			eqStrct: "===",	neqStrict:  "!==",	eq:        "==",neq: "!=",
			gt:      ">",	ge:         ">=",	lt:        "<",	le: "<=",
			xor:     "^",	bitwiseAnd: "&",	bitwiseOr: "|",	mod: "%",
			rightShift:">>",leftShift:  "<<",	unsignedRightShift: ">>>"
		}
	},	function(ops, operator_prefix) {
		var op_list = operator_prefix === "u" ? unary_operators : binary_operators;
		each(ops, function(key, op_name) {
			proto[op_name] = createConstraintModifier(op_list[key]);
		});
	});

	/**
	 * Object type modifier
	 * @method typeOf
	 * @param {*} other - a constraint or value to compare against
	 * @return {*} - a constraint whose value is `typeof this.get()`
	 * @example
	 *
	 *     var valIsNumber = val.typeOf().eq('[object Number]')
	 */
	proto.typeOf = createConstraintModifier(function(a) { return typeof a;});

	/**
	 * Object instance check modifier
	 * @method instanceOf
	 * @param {*} other - a constraint or value to compare against
	 * @return {boolean} - a constraint whose value is `this.get() instanceof other.get()`
	 * @example
	 *
	 *     var valIsArray = val.instanceof(Array)
	 */
	proto.instanceOf = createConstraintModifier(function(a, b) { return a instanceof b;});
} (Constraint));
/** @lends */

// Create some exposed utility functions
/**
 * Determine whether an object is a constraint
 * @method cjs.isConstraint
 * @param {*} obj - An object to check
 * @return {boolean} - `obj instanceof cjs.Constraint`
 */
is_constraint = function(obj) { return obj instanceof Constraint; };

// Expore core functions
// -------------------------
extend(cjs, {
	/**
	 * Constraint constructor
	 *
	 * @method cjs.constraint
	 * @constructs cjs.Constraint
	 * @param {*} value - The initial value of the constraint or a function to compute its value
	 * @param {Object} [options] - A set of options to control how and when the constraint's value is evaluated
	 * @return {cjs.Constraint} - A new constraint object
	 * @see cjs.Constraint
	 */
	constraint: function(value, options) { return new Constraint(value, options); },
	/** @expose cjs.Constraint */
	Constraint: Constraint,
	/** @expose cjs.isConstraint */
	isConstraint: is_constraint,

	/**
	 * Create a new constraint whose value changes by state
	 *
	 * @method cjs.inFSM
	 * @param {cjs.FSM} fsm - The finite-state machine to depend on
	 * @param {Object} values - Keys are the state specifications for the FSM, values are the value for those specific states
	 * @return {cjs.Constraint} - A new constraint object
	 * @see cjs.Constraint.prototype.inFSM
	 *
	 * @example
	 *
	 *     var fsm = cjs.fsm("state1", "state2")
	 *                  .addTransition("state1", "state2",
	 *                       cjs.on("click"));
	 *     var x = cjs.inFSM(fsm, {
	 *         state1: 'val1',
	 *         state2: function() { return 'val2'; }
	 *     });
	 */
	inFSM: function(fsm, values) {
		return (new Constraint()).inFSM(fsm, values);
	},

	/**
	 * Gets the value of an object regardless of if it's a constraint (standard, array, or map) or not.
	 *
	 * @method cjs.get
	 * @param {*} obj - The object whose value to return
	 * @param {boolean} [autoAddOutgoing=true] - Whether to automatically add a dependency from this constraint to ones that depend on it.
	 * @return {*} - The value
	 *
	 * @see cjs.isConstraint
	 * @see cjs.Constraint.prototype.get
	 * @see cjs.isArrayConstraint
	 * @see cjs.ArrayConstraint.prototype.toArray
	 * @see cjs.isMapConstraint
	 * @see cjs.MapConstraint.prototype.toObject
	 *
	 * @example
	 *     var w = 1,
	 *         x = cjs(2),
	 *         y = cjs(['a','b']),
	 *         z = cjs({c: 2});
	 *
	 *     cjs.get(w); // 1
	 *     cjs.get(x); // 2
	 *     cjs.get(y); // ['a','b'] 
	 *     cjs.get(z); // {c: 2}
	 */
	get: function (obj, arg0) {
		if(is_constraint(obj))	{ return obj.get(arg0); }
		else if(is_array(obj))	{ return obj.toArray(); }
		else if(is_map(obj))	{ return obj.toObject(); }
		else					{ return obj; }
	},

	/** @expose cjs.wait */
	wait: bind(constraint_solver.wait, constraint_solver),
	/** @expose cjs.signal */
	signal: bind(constraint_solver.signal, constraint_solver),
	/** @expose cjs.removeDependency */
	removeDependency: constraint_solver.removeDependency,

	/** @expose cjs.arrayDiff */
	arrayDiff: get_array_diff, // expose this useful function

	/**
	 * The version number of ConstraintJS
	 * @property {string} cjs.version
	 * @see cjs.toString
	 */
	version: "0.9.2", // This template will be filled in by the builder

	/**
	 * Print out the name and version of ConstraintJS
	 *
	 * @method cjs.toString
	 * @return {string} - `ConstraintJS v(version#)`
	 * @see cjs.version
	 */
	toString: function() { return "ConstraintJS v" + cjs.version; },

	/** @private */
	__debug: false,

	/**
	 * Restore the previous value of `cjs`
	 *
	 * @method cjs.noConflict
	 * @return {object} - `cjs`
	 *
	 * @example Renaming `cjs` to `ninjaCJS`
	 *
	 *     var ninjaCJS = cjs.noConflict();
	 *     var x = ninjaCJS(1);
	 * @see cjs
	 */
	noConflict: has(root, "cjs") ?  function() {
										// If there was a previous `cjs` property then track it
										// and allow `cjs.noConflict` to restore its previous value
										if(root.cjs === cjs) { root.cjs = old_cjs; }
										// and return a reference to `cjs` if the user wants it
										return cjs;
									} :
									// ...otherwise, `cjs.noConflict` will just delete the old value
									function() {
										delete root.cjs;
										return cjs;
									}
});

// Array Constraints
// -----------------

var isPositiveInteger = function (val) {
	return isNumber(val) && Math.round(val) === val && val >= 0;
};

/**
 * ***Note:*** The preferred constructor for arrays is `cjs.array`
 *
 * This class is meant to emulate standard arrays, but with constraints
 * It contains many of the standard array functions (push, pop, slice, etc)
 * and makes them constraint-enabled.
 *
 *     x[1] = y[2] + z[3] === x.item(1, y.item(2) + z.item(3))
 *
 * Options:
 *
 * - `equals`: the function to check if two values are equal, *default:* `===`
 * - `value`: an array for the initial value of this constraint
 *
 * @class cjs.ArrayConstraint
 * @classdesc A class that adds constraint to arrays
 * @param {Object} [options] - A set of options to control how the array constraint is evaluated
 *
 * @see cjs
 * @see cjs.array
 */
ArrayConstraint = function (options) {
	options = extend({
		equals: eqeqeq, // How to check for equality, useful for indexOf, etc
		value: [] // starting value
	}, options);

	// Every value in the array is a constraint
	this._value = map(options.value, function(val) {
		return new Constraint(val, {literal: true});
	});

	// When we fetch an item in the array that doesn't exist, it gets added to
	// the unsubstantiated items list to create a dependency
	this._unsubstantiated_items = [];

	this.$len = new Constraint(this._value.length); // Keep track of the array length in a constraint
	this.$equality_check = new Constraint(options.equals, {literal: true}); // How to check for equality again...
};

(function (my) {
	var proto = my.prototype;
	/**
	 * Any iterator in forEach can return this object to break out of its loop.
	 * @property {object} cjs.ArrayConstraint.BREAK
	 */
	my.BREAK = {};

	/** @lends cjs.ArrayConstraint.prototype */


	// Get a particular item in the array
	var _get = function (arr, key) {
		var val = arr._value[key];
		if (val === undefined) { // Even if arr[key] is set to undefined, it would be a constraint
			// Create a dependency so that if the value for this key changes
			// later on, we can detect it in the constraint solver
			val = new Constraint(undefined, {literal: true});
			arr._unsubstantiated_items[key] = val;
		}
		return val.get();
	};

	// For internal use; set a particular item in the array
	var _put = function (arr, key, val) {
		cjs.wait(); // Don't run any nullification listeners until this function is done running
		var $previous_value = arr._value[key];

		// If there's an unsubstantiated item; use that, so that dependencies still work
		if ($previous_value === undefined && arr._unsubstantiated_items[key]) {
			$previous_value = arr._value[key] = arr._unsubstantiated_items[key];
			delete arr._unsubstantiated_items[key];
		}

		if (is_constraint($previous_value)) {
			// If there was a previous value, just set it
			var prev_val = $previous_value.get();
			$previous_value.set(val);
		} else {
			// Otherwise, just create a new value
			arr._value[key] = new Constraint(val, {literal: true});
		}
		_update_len(arr); // Make sure the length hasn't changed
		cjs.signal(); // OK, run nullification listeners now if necessary
		return val;
	};

	// Remove every element of the array
	var _clear = function (arr, silent) {
		var $val;
		cjs.wait();

		// Keep on popping and don't stop!
		while (arr._value.length > 0) {
			$val = arr._value.pop();
			var len = arr._value.length;
			if (is_constraint($val)) {
				$val.destroy(silent); // Clear memory for every element
			}
		}
		_update_len(arr);

		cjs.signal();
		return this;
	};

	var _update_len = function (arr) {
		// The setter will automatically not update if the value is the same
		arr.$len.set(arr._value.length);
	};


	/**
	 * Change the equality check; useful for indexOf
	 *
	 * @method setEqualityCheck
	 * @param {function} equality_check - A new function to check for equality between two items in this array
	 * @return {cjs.ArrayConstraint} `this`
	 */
	proto.setEqualityCheck = function (equality_check) {
		this.$equality_check.set(equality_check);
		return this;
	};

	/**
	 * The forEach() method executes a provided function once per array element.
	 * 
	 * @method forEach
	 * @param {function} callback - Function to execute for each element.
	 * @param {*} thisArg - Object to use as `this` when executing `callback`.
	 * @return {cjs.ArrayConstraint} `this`
	 * @example
	 *     var arr = cjs(['a','b','c']);
	 *     arr.forEach(function(val, i) {
	 *         console.log(val);
	 *         if(i === 1) {
	 *             return cjs.ArrayConstraint.BREAK;
	 *         }
	 *     }); // 'a' ... 'b'
	 */
	proto.forEach = function (callback, thisArg) {
		var i, len = this.length();
		thisArg = thisArg || root; // Set thisArg to window if not specified
		for (i = 0; i < len; i += 1) {
			if (callback.call(thisArg, _get(this, i), i) === my.BREAK) { // "break" equivalent
				return this;
			}
		}
		return this;
	};

	/**
	 *  The map() method creates a new array (not array constraint) with the results of calling a provided
	 *  function on every element in this array.
	 * 
	 * @method map
	 * @param {function} callback - Function that produces an element of the new Array from an element of the current one.
	 * @param {*} thisArg - Object to use as `this` when executing `callback`.
	 * @return {array} - The result of calling `callback` on every element
	 * @example
	 *     var arr = cjs([1,2,3]);
	 *     arr.map(function(x) { return x+1;}) // [2,3,4]
	 */
	proto.map = function (callback, thisArg) {
		var rv = [];
		thisArg = thisArg || root;
		this.forEach(function(val, i) {
			rv[i] = callback.call(thisArg, val, i);
		});
		return rv;
	};

	/**
	 * Replaces the whole array
	 *
	 * @method setValue
	 * @param {array} arr - The new value
	 * @return {cjs.ArrayConstraint} - `this`
	 * @example
	 *     var arr = cjs([1,2,3]);
	 *     arr.toArray(); //[1,2,3]
	 *     arr.setValue(['a','b','c']);
	 *     arr.toArray(); //['a','b','c']
	 */
	proto.setValue = function (arr) {
		cjs.wait(); // Don't run nullified functions quite yet
		_clear(this);
		this.push.apply(this, arr);
		cjs.signal(); // OK, now run them
		return this;
	};

	/**
	 * Convert my value to a standard JavaScript array
	 *
	 * @method item
	 * @return {array} - A standard JavaScript array
	 * @see toArray
	 * @example
	 *     var arr = cjs([1,2,3]);
	 *     arr.item(); //[1,2,3]
	 */
	/**
	 * Get item `key`
	 *
	 * @method item^2
	 * @param {number} key - The array index
	 * @return {*} - The value at index `key`
	 * @example
	 *     var arr = cjs(['a','b']);
	 *     arr.item(0); //['a']
	 */
	/**
	 * Set item i
	 *
	 * @method item^3
	 * @param {number} key - The array index
	 * @param {*} value - The new value
	 * @return {*} - `value`
	 * @example
	 *     var arr = cjs(['a','b']);
	 *     arr.item(0,'x');
	 *     arr.toArray(); // ['x','b']
	 */
	proto.item = function (key, val) {
		if(arguments.length === 0) { // Just return an array if called with no arguments
			return this.toArray();
		} else if (arguments.length === 1) { // Get if called with one argument
			return _get(this, key);
		} else if (arguments.length > 1) { // Put if called with more than one argument
			return _put(this, key, val);
		}
	};

	/**
	 * Clear this array and try to clean up any memory.
	 *
	 * @method destroy
	 * @param {boolean} [silent=false] - If set to `true`, avoids invalidating any dependent constraints.
	 */
	proto.destroy = function (silent) {
		_clear(this, silent);
		this.$len.destroy(silent);
	};

	/**
	 * Get the length of the array.
	 *
	 * @method length
	 * @return {number} - The length of the array
	 * @example
	 *     var arr = cjs(['a','b']);
	 *     arr.length(); // 2
	 */
	proto.length = function () {
		return this.$len.get(); // Remember that length is a constraint
	};
	
	/**
	 * The push() method mutates an array by appending the given elements and returning the new length of the array.
	 *
	 * @method push
	 * @param {...*} elements - The set of elements to append to the end of the array
	 * @return {number} - The new length of the array
	 *
	 * @see pop
	 * @see shift
	 * @see unshift
	 * @see splice
	 * @example
	 *     var arr = cjs(['a','b']);
	 *     arr.push('c','d'); // 4
	 *     arr.toArray(); // ['a','b','c','d']
	 */
	proto.push = function () {
		var i, len = arguments.length, value_len = this._value.length;
		//Make operation atomic
		cjs.wait();
		// Add every item that was passed in
		for (i = 0; i < len; i++) {
			_put(this, value_len+i, arguments[i]);
		}
		cjs.signal();
		return this.length(); // return the new length
	};

	/**
	 * The pop() method removes the last element from an array and returns that element.
	 *
	 * @method pop
	 * @return {*} - The value that was popped off or `undefined`
	 * 
	 * @see push
	 * @see shift
	 * @see unshift
	 * @see splice
	 * @example
	 *     var arr = cjs(['a','b']);
	 *     arr.pop(); // 'b'
	 *     arr.toArray(); // ['a']
	 */
	proto.pop = function () {
		var rv, $value = this._value.pop(); // $value should be a constraint
		cjs.wait();

		if (is_constraint($value)) { // if it's a constraint return the value.
										// otherwise, return undefined
			rv = $value.get();
			$value.destroy();
		}
		// And set the proper length
		_update_len(this);

		// Ok, ready to go again
		cjs.signal();
		
		return rv;
	};

	/**
	 * Converts this array to a JavaScript array
	 *
	 * @method toArray
	 * @return {array} - This object as a JavaScript array
	 * @example
	 *     var arr = cjs(['a','b']);
	 *     arr.toArray(); // ['a', 'b']
	 */
	proto.toArray = function () {
		return this.map(identity); // just get every element
	};

	/**
	 * Returns the *first* item where calling filter is truthy
	 * 
	 * @method indexWhere
	 * @param {function} filter - The function to call on every item
	 * @param {*} thisArg - Object to use as `this` when executing `callback`.
	 * @return {number} - The first index where calling `filter` is truthy or `-1`
	 * @example
	 *     var arr = cjs(['a','b','b']);
	 *     arr.indexWhere(function(val, i) {
	 *         return val ==='b';
	 *     }); // 1
	 */
	proto.indexWhere = function (filter, thisArg) {
		var i, len = this.length(), $val;
		thisArg = thisArg || this;

		for (i = 0; i < len; i += 1) {
			$val = this._value[i];
			if (filter.call(thisArg, $val.get(), i)) { return i; }
		}

		return -1; // -1 if not found
	};
	/**
	 * Returns the *last* item where calling filter is truthy
	 * 
	 * @method lastIndexWhere
	 * @param {function} filter - The function to call on every item
	 * @param {*} thisArg - Object to use as `this` when executing `callback`.
	 * @return {number} - The last index where calling `filter` is truthy or `-1`
	 *
	 * @example
	 *     var arr = cjs(['a','b','a']);
	 *     arr.lastIndexWhere(function(val, i) {
	 *         return val ==='a';
	 *     }); // 2
	 */
	proto.lastIndexWhere = function (filter, thisArg) {
		var i, len = this.length(), $val;
		thisArg = thisArg || this;

		for (i = len - 1; i >= 0; i -= 1) {
			$val = this._value[i];
			if (filter.call(thisArg, $val.get(), i)) { return i; }
		}

		return -1; // -1 if not found
	};

	/**
	 * Returns the *first* index of `item`
	 * 
	 * @method indexOf
	 * @param {*} item - The item we are searching for
	 * @param {function} [equality_check] - How to check whether two objects are equal, defaults to the option that was passed in)
	 * @return {number} - The item's index or `-1`
	 *
	 * @example
	 *     var arr = cjs(['a','b','a']);
	 *     arr.indexOf('a'); // 0
	 */
	proto.indexOf = function (item, equality_check) {
		equality_check = equality_check || this.$equality_check.get();
		var filter = function (x) { return equality_check(x, item); };
		return this.indexWhere(filter);
	};

	/**
	 * Returns the *last* index of `item`
	 * 
	 * @method lastIndexOf
	 * @param {*} item - The item we are searching for
	 * @param {function} [equality_check] - How to check whether two objects are equal, defaults to the option that was passed in)
	 * @return {number} - The item's index or `-1`
	 * @example
	 *     var arr = cjs(['a','b','a']);
	 *     arr.indexOf('a'); // 2
	 */
	proto.lastIndexOf = function (item, equality_check) {
		equality_check = equality_check || this.$equality_check.get();
		var filter = function (x) { return equality_check(x, item); };
		return this.lastIndexWhere(filter);
	};

	/**
	 * Return `true` if `filter` against any item in my array is truthy
	 * 
	 * @method some
	 * @param {function} filter - The function to check against
	 * @param {*} thisArg - Object to use as `this` when executing `filter`.
	 * @return {boolean} - `true` if some item matches `filter`. `false` otherwise
	 * @see every
	 * @example
	 *     var arr = cjs([1,3,5]);
	 *     arr.some(function(x) { return x%2===0; }); // false
	 */
	proto.some = function(filter, thisArg) {
		return this.indexWhere(filter, thisArg) >= 0;
	};

	/**
	 * Return `true` if `filter` against every item in my array is truthy
	 * 
	 * @method every
	 * @param {function} filter - The function to check against
	 * @param {*} thisArg - Object to use as `this` when executing `filter`.
	 * @return {boolean} - `true` if some item matches `filter`. `false` otherwise
	 * @see some
	 * @example
	 *     var arr = cjs([2,4,6]);
	 *     arr.some(function(x) { return x%2===0; }); // true
	 */
	proto.every = function(filter, thisArg) {
		var rv = true;
		this.forEach(function() {
			if(!filter.apply(thisArg, arguments)) { // break on the first non-obeying element
				rv = false;
				return my.BREAK;
			}
		});
		return rv;
	};

	/**
	 * The splice() method changes the content of an array, adding new elements while removing old elements.
	 *
	 * @method splice
	 * @param {number} index - Index at which to start changing the array. If greater than the length of the array,
	 * no elements will be removed.
	 * @param {number} howMany - An integer indicating the number of old array elements to remove.
	 * If howMany is 0, no elements are removed. In this case, you should specify at least one new element.
	 * If howMany is greater than the number of elements left in the array starting at index,
	 * then all of the elements through the end of the array will be deleted.
	 * @param {...*} elements - The elements to add to the array. If you don't specify any elements,
	 * splice simply removes elements from the array.
	 * @return {array.*} - An array containing the removed elements. If only one element is removed,
	 * an array of one element is returned. If no elements are removed, an empty array is returned.
	 *
	 * @see push
	 * @see pop
	 * @see shift
	 * @see unshift
	 * @example
	 *     var arr = cjs(['a','b','c']);
	 *     arr.splice(0,2,'x','y'); //['a','b']
	 *     arr.toArray(); // ['x','y','c']
	 */
	proto.splice = function (index, howmany) {
		var i;
		if (!isNumber(howmany)) { howmany = 0; }
		if (!isPositiveInteger(index) || !isPositiveInteger(howmany)) {
			throw new Error("index and howmany must be positive integers");
		}
		var to_insert = slice.call(arguments, 2),
			to_insert_len = to_insert.length;

		// Don't run any listeners until we're done
		cjs.wait();
		// It's useful to keep track of if the resulting shift size is negative because
		// that will influence which direction we loop in
		var resulting_shift_size = to_insert_len - howmany;

		// removed will hold the items that were removed
		var removed = map(this._value.slice(index, index + howmany), function(x) {
			return x ? x.get() : undefined;
		});

		// If we have to remove items
		if (resulting_shift_size < 0) {
			var value_len = this._value.length,
				insertion_max = index + to_insert_len,
				movement_max = value_len + resulting_shift_size;

			// If it's in the insertion range, use the user-specified insert
			for (i = index; i<insertion_max; i += 1) {
				_put(this, i, to_insert[i - index]);
			}

			// Otherwise, use put (don't use splice here to make sure that 
			// item i has the same constraint object (for dependency purposes)
			for (; i<movement_max; i += 1) {
				_put(this, i, _get(this, i - resulting_shift_size));
			}

			// Then, just get rid of the last resulting_shift_size elements
			for (; i<value_len; i += 1) {
				var $value = this._value.pop(); // $value should be a constraint
				if (is_constraint($value)) {  // and dealocate
					$value.destroy();
				}
			}
		} else {
			for (i = this._value.length + resulting_shift_size - 1; i >= index; i -= 1) {
				if (i < index + to_insert_len) {
					// If it's in the insertion range...
					_put(this, i, to_insert[i - index]);
				} else {
					// If not...
					_put(this, i, _get(this, i - resulting_shift_size));
				}
			}
		}

		if(resulting_shift_size !== 0) { // Don't bother if no resulting shift
			_update_len(this);
		}

		cjs.signal(); // And finally run any listeners
		return removed;
	};

	/**
	 * The shift() method removes the first element from an array and returns that element.
	 * This method changes the length of the array.
	 *
	 * @method shift
	 * @return {*} - The element that was removed
	 *
	 * @see unshift
	 * @see push
	 * @see pop
	 * @see splice
	 * @example
	 *     var arr = cjs(['a','b','c']);
	 *     arr.shift(); // 'a'
	 *     arr.toArray(); //['b','c']
	 */
	proto.shift = function () {
		var rv_arr = this.splice(0, 1);
		return rv_arr[0];
	};

	/**
	 * The unshift() method adds one or more elements to the beginning of an array and returns the new length
	 * of the array.
	 *
	 * @method unshift
	 * @param {...*} elements - The elements to be added
	 * @return {number} - The new array length
	 *
	 * @see shift
	 * @see push
	 * @see pop
	 * @see splice
	 * @example
	 *     var arr = cjs(['a','b','c']);
	 *     arr.unshift('x','y'); // 5
	 *     arr.toArray(); //['x','y','a','b','c']
	 */
	proto.unshift = function () {
		this.splice.apply(this, ([0, 0]).concat(toArray(arguments)));
		return this.length();
	};

	/**
	 * The concat() method returns a new array comprised of this array joined with other array(s) and/or value(s).
	 *
	 * @method concat
	 * @param {...*} values - Arrays and/or values to concatenate to the resulting array.
	 * @return {array} The concatenated array
	 * @example
	 *     var arr1 = cjs(['a','b','c']),
	 *     arr2 = cjs(['x']);
	 *     arr1.concat(arr2); // ['a','b','c','x']
	 */
	proto.concat = function () {
		// Every argument could either be a JS array or array constraint
		var args = map(arguments, function(arg) {
			return is_array(arg) ? arg.toArray() : arg;
		});
		var my_val = this.toArray();
		return my_val.concat.apply(my_val, args);
	};

	/**
	 * The slice() method returns a portion of an array.
	 *
	 * @method slice
	 * @param {number} [begin=0] - Zero-based index at which to begin extraction.
	 * @param {number} [end=this.length] - Zero-based index at which to end extraction. slice extracts up to but not including end.
	 * @return {array} A JavaScript array
	 * @example
	 *     var arr = cjs(['a','b','c']);
	 *     arr.slice(1); // ['b','c']
	 */
	proto.slice = function () {
		// Just call the normal slice with the same arguments
		var sliced_arr = this._value.slice.apply(this._value, arguments);
		return map(sliced_arr, function(x) {
			return x ? x.get() : undefined;
		});
	};

	/**
	 * Return a constraint whose value is bound to my value for key
	 *
	 * @method itemConstraint
	 * @param {number|Constraint} key - The array index
	 * @return {Constraint} - A constraint whose value is `this[key]`
	 * @example
	 *     var arr = cjs(['a','b','c']);
	 *     var first_item = arr.itemConstraint(0);
	 *     first_item.get(); // 'a'
	 *     arr.item(0,'x');
	 *     first_item.get(); // 'x'
	 */
	proto.itemConstraint = function(key) {
		return new Constraint(function() {
			// Call cjs.get on the key so the key can also be a constraint
			return this.item(cjs.get(key));
		}, {
			context: this
		});
	};

	/**
	 * The filter() method creates a new array with all elements that pass the test implemented by the provided function.
	 *
	 * @method filter
	 * @param {function} callback - Function to test each element of the array.
	 * @param {*} [thisObject] - Object to use as this when executing callback.
	 * @return {array} A filtered JavaScript array
	 */
	/**
	 * The join() method joins all elements of an array into a string.
	 *
	 * @method join
	 * @param {string} [separator=','] - Specifies a string to separate each element of the array.
	 * The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma.
	 * @return {string} The joined string
	 */
	/**
	 * The sort() method sorts the elements of an array in place and returns the array.
	 * The default sort order is lexicographic (not numeric).
	 *
	 * @method sort
	 * @param {function} [compreFunction] - Specifies a function that defines the sort order. If omitted,
	 * the array is sorted lexicographically (in dictionary order) according to the string conversion of each element.
	 * @return {array} A sofrted JavaScript array
	 */
	/**
	 * The reverse() method reverses an array in place. The first array element becomes the last and the last becomes the first.
	 *
	 * @method reverse
	 * @return {array} A JavaScript array whose value is the reverse of mine
	 */
	/**
	 * The toString() method returns a string representing the specified array and its elements.
	 *
	 * @method toString
	 * @return {string} A string representation of this array.
	 */
	each(["filter", "join", "sort", "reverse", "toString"], function (fn_name) {
		// All of these functions will just convert to an array and return that
		proto[fn_name] = function () {
			var my_val = this.toArray();
			return my_val[fn_name].apply(my_val, arguments);
		};
	});
}(ArrayConstraint));
/** @lends */

/**
 * Determine whether an object is an array constraint
 * @method cjs.isArrayConstraint
 * @param {*} obj - An object to check
 * @return {boolean} - `true` if `obj` is a `cjs.ArrayConstraint`, `false` otherwise
 */
is_array = function(obj) {
	return obj instanceof ArrayConstraint;
};

extend(cjs, {
	/**
	 * @method cjs.array
	 * @constructs cjs.ArrayConstraint
	 * @param {Object} [options] - A set of options to control how the array constraint is evaluated
	 * @return {cjs.ArrayConstraint} - A new array constraint object
	 * @see cjs.ArrayConstraint
	 * @example
	 *     var arr = cjs.array({
	 *         value: [1,2,3]
	 *     });
	 */
	array: function (options) { return new ArrayConstraint(options); },
	/** @expose cjs.ArrayConstraint */
	ArrayConstraint: ArrayConstraint,
	/** @expose cjs.isArrayConstraint */
	isArrayConstraint: is_array
});

// Map Constraints
// ---------------

// Maps use hashing to improve performance. By default, the hash is a simple toString
// function
var defaulthash = function (key) { return key.toString(); };

// A string can also be specified as the hash, so that the hash is the result of calling
// that property of the object
var get_str_hash_fn = function (prop_name) {
	return function (key) {
		return key[prop_name]();
	};
};

/**
 * ***Note:*** the preferred way to create a map constraint is with `cjs.map`
 * This class is meant to emulate JavaScript objects ({}) but with constraints
 *
 * Options:
 *
 * - `hash`: a key hash to use to improve performance when searching for a key (default: `x.toString()`)
 * - `valuehash`: a value hash to use improve performance when searching for a value (default: `false`)
 * - `equals`: How to check for equality when searching for a key (default: `===`)
 * - `valueequals`: How to check for equality when searching for a value (default: `===`)
 * - `value`: An optional starting value (default: `{}`)
 * - `keys`: An optional starting set of keys (default: `[]`)
 * - `values`: An optional starting set of values (default: `[]`)
 * - `literal_values`: True if values that are functions should return a function rather than that function's return value. (default: `false`)
 * - `create_unsubstantiated`: Create a constraint when searching for non-existent keys. (default: `true`)
 *
 * @class cjs.MapConstraint
 * @classdesc A class that adds constraint to objects
 * @param {Object} [options] - A set of options to control how the map constraint is evaluated
 */
MapConstraint = function (options) {
	options = extend({
		hash: defaulthash, // Improves performance when searching by key
		valuehash: false, // Function if we should hash values, which improves performance when searching by value. By default, we don't hash values
		equals: eqeqeq, // Equality check when searching by key
		valueequals: eqeqeq, // Equality check when searching by value
		value: {}, // Optional starting value
		keys: [], // Rather than passing in 'value', keys and values can be equal-length arrays specifying keys...
		values: [], // and values
		literal_values: false, // true if every value should be literal
		create_unsubstantiated: true // Create a value when a key isn't found
	}, options);

	// Append all of the keys and values passed to the keys and values arrays
	each(options.value, function (v, k) {
		options.keys.push(k);
		options.values.push(v);
	}, this);

	// Convert to boolean
	this._default_literal_values = !!options.literal_values;
	this.$equality_check = new Constraint(options.equals, {literal: true});
	this.$vequality_check = new Constraint(options.valueequals, {literal: true});

	// Get my hash
	this._hash = isString(options.hash) ? get_str_hash_fn(options.hash) : options.hash;
	this._create_unsubstantiated = options.create_unsubstantiated;

	this._khash = {};

	// If we're hashing values, then set this._valuehash as a function
	if (options.valuehash) {
		this._vhash = {};
		if (isFunction(options.valuehash)) {
			this._valuehash = options.valuehash;
		} else if (isString(options.valuehash)) {
			this._valuehash = get_str_hash_fn(options.valuehash);
		} else {
			this._valuehash = defaulthash;
		}
	} else {
		this._vhash = false;
	}

	var is_literal = this._default_literal_values;

	// Keeps track of the values and maintains the proper order
	this._ordered_values = map(options.keys, function (k, i) {
		var v = options.values[i];
		// Have key (k) and value (v)
		var info = {
			key: new Constraint(k, {literal: true}),
			value: new Constraint(v, {literal: is_literal}),
			index: new Constraint(i, {literal: true})
		};

		// Properly put the entry into the key hash
		var hash = this._hash(k);
		var hash_val = this._khash[hash];
		if (hash_val) {
			hash_val.push(info);
		} else {
			this._khash[hash] = [info];
		}

		// If we hash values too, properly put the entry into the value hash
		if (this._vhash) {
			var value_hash = this._valuehash(v);
			var vhash_val = this._vhash[value_hash];
			if (vhash_val) {
				vhash_val.push(info);
			} else {
				this._vhash[value_hash] = [info];
			}
		}
		// And finally, set return info for this._ordered_values[i]
		return info;
	}, this);

	// Keeps track of requested values that aren't set
	this._unsubstantiated_values = {};

	// Array to store keys
	this.$keys = new Constraint(function () {
			var rv = [];
			this.forEach(function (value, key, index) {
				rv[index] = key;
			});
			return rv;
		}, {context: this});

	// Array to store values
	this.$values = new Constraint(function() {
		var rv = [];
		this.forEach(function (value, key, index) {
			rv[index] = value;
		});
		return rv;
	}, {context: this});

	// Full entries (includes keys and values)
	this.$entries = new Constraint(function() {
		var rv = [];
		this.forEach(function (value, key, index) {
			rv[index] = {key: key, value: value};
		});
		return rv;
	}, {context: this});

	// Number of keys
	this.$size = new Constraint(function() {
		return this._ordered_values.length;
	}, {context: this});
};

(function (my) {
	/**
	 * Any iterator in forEach can return this object to break out of its loop.
	 * @property {object} cjs.MapConstraint.BREAK
	 */
	my.BREAK = ArrayConstraint.BREAK;

	var proto = my.prototype;
	/** @lends cjs.MapConstraint.prototype */

	// Utility function to return information about a key
	var _find_key = function (key, fetch_unsubstantiated, create_unsubstantiated) {
		// Get the hash
		var hash = this._hash(key),
			rv = {
				h: hash, // the actual hash value
				hv: false, // the hash array at the hash value
				i: -1, // the index of the key in the hash array
				ui: -1, // the index in the unsubstantiated array
				uhv: false // the unsubstantiated hash array
			},
			eq = this.$equality_check.get(),
			index_where_fn = function (a, b) {
				return eq(a.key.get(), key);
			},
			hash_values = this._khash[hash];

		if (hash_values) { // We found a potential hash array
			var key_index = indexWhere(hash_values, index_where_fn);
			rv.hv = hash_values;
			if(key_index >= 0) { // Wohoo! we also found the key in there
				rv.i = key_index;
				return rv;
			}
		}

		// Haven't returned yet, so we didn't find the entry. Look for an unsubstantiated
		// value instead.
		if (fetch_unsubstantiated !== false) { //Not found
			var unsubstantiated_values = this._unsubstantiated_values[hash];
			var unsubstantiated_index = -1;
			if (unsubstantiated_values) {
				rv.uhv = unsubstantiated_values;
				unsubstantiated_index = indexWhere(unsubstantiated_values, index_where_fn);
				if(unsubstantiated_index >= 0) {
					rv.ui = unsubstantiated_index;
					return rv;
				}
			}

			// We haven't returned yet, so we didn't find an unsubstantiated value either
			// Check to see if we should create one.
			if(create_unsubstantiated === true) {
				var is_literal = this._default_literal_values;
				var unsubstantiated_info = {
					key: new Constraint(key, {literal: true}),
					value: new Constraint(undefined, {literal: is_literal}), // will be undefined
					index: new Constraint(-1, {literal: true}) // with a negative index
				};

				if(unsubstantiated_values) { // The hash was found but not the particular value
					// Add it onto the end
					unsubstantiated_index = unsubstantiated_values.length;
					unsubstantiated_values[unsubstantiated_index] = unsubstantiated_info;
				} else {
					// The hash wasn't found; create a new array
					unsubstantiated_index = 0;
					this._unsubstantiated_values[hash] = unsubstantiated_values = [unsubstantiated_info];
				}
			}
			rv.uhv = unsubstantiated_values || false; // Want to return false if not found
			rv.ui = unsubstantiated_index;
		}
		return rv;
	};

	// Responsible for setting a key properly
	var _do_set_item_ki = function (ki, key, value, index, literal) {
		// ki is the key information from _find_key
		var i, value_hash, vhash_val, info,
			key_index = ki.i, // where the key is in the hash array
			hash_values = ki.hv, // the hash array
			hash = ki.h; // the hash value

		if (key_index >= 0) { // The key was already in this map
			// get the information
			info = hash_values[key_index];

			if (this._vhash) { // If we're hashing values, the new value has to get re-hashed
				var old_value = info.value.get(),
					old_value_hash = this._valuehash(old_value),
					old_vhash_val = this._vhash[old_value_hash];
				value_hash = this._valuehash(value);

				if (old_vhash_val) { // This should probably always be true, unless something went wrong...
					var len = old_vhash_val.length;
					for (i = 0; i < len; i += 1) {
						if (old_vhash_val[i] === info) { // wohoo, found it
							old_vhash_val.splice(i, 1);
							if (old_vhash_val.length === 0) {
								delete this._vhash[old_value_hash]; // don't keep the old hash array
							}
							break;
						}
					}
				}

				// Put the new value has in
				vhash_val = this._vhash[value_hash]; // hash array
				if (vhash_val) {
					vhash_val.push(info); // add onto the hash array
				} else {
					this._vhash[value_hash] = [info]; // create a new hash array
				}
			}

			info.value.set(value); // set the value constraint to the new value

			if (isPositiveInteger(index)) { // But they also specified an index...
				var old_index = info.index.get();
				if(old_index !== index) { // great...now we have to move it too
					// take out the old value
					this._ordered_values.splice(old_index, 1);
					// and re-add it
					this._ordered_values.splice(index, 0, info);

					// Properly iterate regardless of whether moving higher or lower
					var low = Math.min(old_index, index);
					var high = Math.max(old_index, index);
					// update the indicies of every thing between that might have been affected
					for (i = low; i <= high; i += 1) {
						_set_index(this._ordered_values[i], i);
					}
					this.$keys.invalidate(); // Keys are now invalid
				}
			}
		} else {
			// They didn't specify an index or at least they specified it wrong...
			if (!isPositiveInteger(index)) {
				index = this._ordered_values.length; // just set it to the 
			}
			// Check to see if there was an unsubstantiated item
			var unsubstantiated_index = ki.ui;

			if (unsubstantiated_index >= 0) { // Found it! Now let's remove it from the list of unsubstantiated items
				var unsubstantiated_hash_values = ki.uhv,
					unsubstantiated_info = unsubstantiated_hash_values[unsubstantiated_index];

				unsubstantiated_hash_values.splice(unsubstantiated_index, 1);
				if (unsubstantiated_hash_values.length === 0) {
					delete this._unsubstantiated_values[hash];
				}

				info = unsubstantiated_info; // re-use the same object to keep dependencies

				info.value.set(value); // but update its value and index
				info.index.set(index);
			} else {
				// Nothing in unsubstantiated; just create it from scratch
				info = {
					key: new Constraint(key, {literal: true}),
					value: new Constraint(value, {literal: literal === undefined ? this._default_literal_values : !!literal}),
					index: new Constraint(index, {literal: true})
				};
			}

			if(hash_values) { // There was already a hash array
				hash_values.push(info);
			} else { // Have to create the hash array
				hash_values = this._khash[hash] = [info];
			}

			//If we're hashing values...
			if (this._vhash) {
				value_hash = this._valuehash(value);
				vhash_val = this._vhash[value_hash];
				// Add the item to the value hash
				if (vhash_val) {
					vhash_val.push(info);
				} else {
					this._vhash[value_hash] = [info];
				}
			}

			//  insert into values
			this._ordered_values.splice(index, 0, info);

			// Push the index of every item that I spliced before up
			for (i = index + 1; i < this._ordered_values.length; i += 1) {
				_set_index(this._ordered_values[i], i);
			}
			// Now, size and keys are invalid
			this.$size.invalidate();
			this.$keys.invalidate();
		}
		this.$values.invalidate();
		this.$entries.invalidate();
	};

	// Cange an info's specified index
	var _set_index = function (info, to_index) {
		info.index.set(to_index);
	};

	// Deallocate memory from constraints
	var _destroy_info = function (infos, silent) {
		each(infos, function (info) {
			info.key.destroy(silent);
			info.value.destroy(silent);
			info.index.destroy(silent);
		});
	};

	// removes the selected item and destroys its value to deallocate it
	var _remove_index = function (index, silent) {
		var info = this._ordered_values[index];
		_destroy_info(this._ordered_values.splice(index, 1), silent);
		if(silent !== true) {
			this.$size.invalidate();
		}
	};
	
	/**
	 * Get the keys on this object.
	 *
	 * @method keys
	 * @return {array.*} - The set of keys
	 * @see values
	 * @see entries
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.keys(); // ['x','y']
	 */
	proto.keys = function () { return this.$keys.get(); };

	/**
	 * Get the values on this object.
	 *
	 * @method values
	 * @return {array.*} - The set of values
	 * @see keys
	 * @see entries
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.values(); // [1,2]
	 */
	proto.values = function () { return this.$values.get(); };

	/**
	 * Get every key and value of this object as an array.
	 *
	 * @method entries
	 * @return {array.object} - A set of objects with properties `key` and `value`
	 * @see keys
	 * @see values
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.entries(); // [{key:'x',value:1},
	 *                    //  {key:'y',value:2}]
	 */
	proto.entries = function () { return this.$entries.get(); };

	/**
	 * Get the number of entries in this object.
	 *
	 * @method size
	 * @return {number} - The number of entries
	 * @see isEmpty
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.size(); // 2
	 */
	proto.size = function () { return this.$size.get(); };
	
	/**
	 * Check if this object has any entries
	 *
	 * @method isEmpty
	 * @return {boolean} - `true` if there are no entries, `false` otherwise
	 * @see size
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.isEmpty(); // false
	 */
	proto.isEmpty = function () { return this.size() === 0; };

	/**
	 * Set the entry for `key` to `value` (`this[key]=value`)
	 *
	 * @method put
	 * @param {*} key - The entry's key
	 * @param {*} value - The entry's value
	 * @param {number} [index=this.size] - The entry's index
	 * @param {boolean} [literal] - Whether to treat the value as literal
	 * @return {cjs.MapConstraint} - `this`
	 * @see get
	 * @see getOrPut
	 * @see item
	 * @see remove
	 * @see clear
	 *
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.put("z", 3, 1);
	 *     map.keys(); // ['x','z','y']
	 */
	proto.put = function (key, value, index, literal) {
		cjs.wait();
		// Find out if there's a key or unsubstantiated info but don't create it
		var ki = _find_key.call(this, key, true, false);
		// And do the work of putting
		_do_set_item_ki.call(this, ki, key, value, index, literal);
		cjs.signal();
		return this;
	};

	/**
	 * Remove a key's entry (like `delete this[key]`)
	 *
	 * @method remove
	 * @param {*} key - The entry's key
	 * @return {cjs.MapConstraint} - `this`
	 *
	 * @see put
	 * @see clear
	 *
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.remove("x");
	 *     map.keys(); // ['y']
	 */
	proto.remove = function (key) {
		// Find out if there's an actual key set
		var ki = _find_key.call(this, key, false, false),
			key_index = ki.i,
			hash_values = ki.hv,
			i, info, ordered_index, value_hash, vhash_val;

		// If the item was found
		if (key_index >= 0) {
			cjs.wait();

			info = hash_values[key_index]; // The info about the value
			ordered_index = info.index.get(); // The map's index (not the index in the hash array)

			hash_values.splice(key_index, 1); // Remove info from the hash array
			if (hash_values.length === 0) { // If there isn't anything in the hash array,
				delete this._khash[ki.h]; // remove it
			}

			// If the value is also hashed..
			if (this._vhash) {
				// Find the value hash information
				value_hash = this._valuehash(info.value.get()); // the lookup key for the value hash
				vhash_val = this._vhash[value_hash]; // the value hash array
				if (vhash_val) { // Found the value hash
					var len = vhash_val.length;
					for (i = 0; i < len; i += 1) {
						if (vhash_val[i] === info) { // found the actual item
							vhash_val.splice(i, 1); // remove it from the array
							if (vhash_val.length === 0) {
								delete this._vhash[value_hash]; // and if it's empty, remove the whole value hash array
							}
							break; // Wohoo!
						}
					}
				}
			}

			_remove_index.call(this, ordered_index); // remove ordered_index (splices the ordered array)
			for (i = ordered_index; i < this._ordered_values.length; i += 1) {
				_set_index(this._ordered_values[i], i); // and update the index for every item
			}

			// And now all of these constraint variables are invalid.
			this.$size.invalidate();
			this.$keys.invalidate();
			this.$values.invalidate();
			this.$entries.invalidate();

			// OK, now you can run any nullified listeners
			cjs.signal();
		}
		return this;
	};
	
	/**
	 * Get the item at key (like this[key])
	 *
	 * @method get
	 * @param {*} key - The entry's key
	 * @return {*|undefined} - the value at that entry or `undefined`
	 *
	 * @see item
	 * @see put
	 * @see getOrPut
	 *
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.get("x"); // 1
	 */
	proto.get = function (key) {
		// Try to find the key and search in any unsubstantiated values
		var ki = _find_key.call(this, key, true, this._create_unsubstantiated),
			key_index = ki.i,
			hash_values = ki.hv;

		if (key_index >= 0) { // Found it; get the item in the hash's value
			var info = hash_values[key_index];
			return info.value.get();
		} else if(this._create_unsubstantiated) {
			var unsubstantiated_info = ki.uhv[ki.ui]; // use the unsubstantiated getter to create a dependency
			return unsubstantiated_info.value.get();
		} else { // not found and can't create unsubstantiated item
			return undefined;
		}
	};

	/**
	 * Convert my value to a standard JavaScript object. The keys are converted using `toString`
	 *
	 * @method item
	 * @return {object} - A standard JavaScript object
	 * @see toObject
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.item(); // {x:1,y:2}
	 */
	/**
	 * Get item `key`
	 *
	 * @method item^2
	 * @param {number} key - The object key
	 * @return {*} - The value at index `key`
	 *
	 * @see get
	 * @see put
	 * @see getOrPut
	 * 
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.item('x'); // 1
	 */     
	/**
	 * Set item i
	 *
	 * @method item^3
	 * @param {number} key - The object key
	 * @param {*} value - The new value
	 * @return {cjs.MapConstraint} - `this`
	 *
	 * @see get
	 * @see put
	 * @see getOrPut
	 *
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.item('z', 3);
	 *     map.keys(); //['x','y','z']
	 */
	proto.item = function (arg0, arg1, arg2) {
		if(arguments.length === 0) { // no arguments? return an object
			return this.toObject();
		} else if (arguments.length === 1) { // One, try to get the keys values
			return this.get(arg0);
		} else { // more than two, try to set
			return this.put(arg0, arg1, arg2);
		}
	};

	/**
	 * Return a constraint whose value is bound to my value for key
	 *
	 * @method itemConstraint
	 * @param {*|Constraint} key - The array index
	 * @return {Constraint} - A constraint whose value is `this[key]`
	 *
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     var x_val = map.itemConstraint('x');
	 *     x_val.get(); // 1
	 *     map.item('x', 3);
	 *     x_val.get(); // 3
	 */
	proto.itemConstraint = function(key) {
		return new Constraint(function() {
			// Call cjs.get on the key so the key can also be a constraint
			return this.get(cjs.get(key));
		}, {
			context: this
		});
	};

	/**
	 * Clear every entry of this object.
	 *
	 * @method clear
	 * @return {cjs.MapConstraint} - `this`
	 * @see remove
	 * @see isEmpty
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.isEmpty(); // false
	 *     map.clear();
	 *     map.isEmpty(); // true
	 */
	proto.clear = function (silent) {
		if (this.size() > 0) { // If I actually have something
			cjs.wait();
			// Keep removing items
			while (this._ordered_values.length > 0) {
				_remove_index.call(this, 0, silent);
			}
			// And get rid of every key hash
			each(this._khash, function (arr, hash) {
				delete this._khash[hash];
			}, this);
			// and value hash if applicable
			if (this._vhash) {
				each(this._vhash, function (arr, hash) {
					delete this._vhash[hash];
				}, this);
			}

			// and everything should be invalid
			if(!silent) {
				this.$keys.invalidate();
				this.$values.invalidate();
				this.$entries.invalidate();
				this.$size.invalidate();
			}

			cjs.signal(); // ready to run nullification listeners
		}
		return this;
	};

	/**
	 * The forEach() method executes a provided function once per entry.
	 * If cjs.MapConstraint.BREAK is returned for any element, we stop looping
	 * 
	 * @method forEach
	 * @param {function} callback - Function to execute for each entry.
	 * @param {*} thisArg - Object to use as `this` when executing `callback`.
	 * @return {cjs.MapConstraint} - `this`
	 * @example
	 *     var map = cjs({x:1,y:2,z:3});
	 *     map.forEach(function(val, key) {
	 *         console.log(key+':'+val);
	 *         if(key === 'y') {
	 *             return cjs.MapConstraint.BREAK;
	 *         }
	 *     }); // x:1 ... y:2
	 */
	proto.forEach = function (func, thisArg) {
		var i, info, len = this.size(),
			ov_clone = this._ordered_values.slice();
		thisArg = thisArg || this;
		for (i = 0; i < len; i += 1) {
			info = ov_clone[i];
			if (info && func.call(thisArg, info.value.get(), info.key.get(), info.index.get()) === my.BREAK) { // break if desired
				break;
			}
		}
		return this;
	};

	/**
	 * Change the default equality check when getting a key
	 * 
	 * @method setEqualityCheck
	 * @param {function} equality_check - The new key equality check
	 * @return {cjs.ArrayConstraint} - `this`
	 */
	proto.setEqualityCheck = function (equality_check) {
		this.$equality_check.set(equality_check);
		return this;
	};

	/**
	 * Change the default value equality check when getting a value
	 * 
	 * @method setValueEqualityCheck
	 * @param {function} vequality_check - The new value equality check
	 * @return {cjs.ArrayConstraint} - `this`
	 */
	proto.setValueEqualityCheck = function (vequality_check) {
		this.$vequality_check.set(vequality_check);
		return this;
	};

	/**
	 * Change the hash function when getting a key
	 * 
	 * @method setHash
	 * @param {function|string} hash - The new hashing function (or a string representing a property name for every key to use as the hash)
	 * @return {cjs.ArrayConstraint} - `this`
	 */
	proto.setHash = function (hash) {
		cjs.wait();
		// First, empty out the old key hash and unsubstantiated values
		this._hash = isString(hash) ? get_str_hash_fn(hash) : hash;
		this._khash = {};
		// Then, for every one of my values, re-hash
		each(this._ordered_values, function (info) {
			var key = info.key.get();
			var hash = this._hash(key);
			var hash_val = this._khash[hash];
			if (hash_val) {
				hash_val.push(info);
			} else {
				this._khash[hash] = [info];
			}
		}, this);

		// And re-hash for every unsubstantiated value
		var new_unsubstantiated_values = {};
		each(this._unsubstantiated_values, function(unsubstantiated_value_arr) {
			each(unsubstantiated_value_arr, function(info) {
				var key = info.key.get();
				var hash = this._hash(key);
				var hash_val = this.new_unsubstatiated_values[hash];
				if(hash_val) {
					hash_val.push(info);
				} else {
					new_unsubstantiated_values[hash] = [info];
				}
			}, this);
		}, this);
		this._unsubstantiated_values = new_unsubstantiated_values;

		cjs.signal();
		return this;
	};

	/**
	 * Change the hash function when getting a value
	 * 
	 * @method setValueHash
	 * @param {function|string} hash - The new hashing function (or a string representing a property name for every key to use as the hash)
	 * @return {cjs.ArrayConstraint} - `this`
	 */
	proto.setValueHash = function (vhash) {
		this._valuehash = isString(vhash) ? get_str_hash_fn(vhash) : vhash;
		// Empty out the old value hash
		this._vhash = {};

		if (this._valuehash) {
			// And reset the value hash for every element
			each(this._ordered_values, function (info) {
				var value = info.value.get();
				var hash = this._valuehash(value);
				var hash_val = this._vhash[hash];
				if (hash_val) {
					hash_val.push(info);
				} else {
					this._vhash[hash] = [info];
				}
			}, this);
		}

		return this;
	};

	/**
	 * Get the index of the entry with key = `key`
	 * 
	 * @method indexOf
	 * @param {*} key - The key to search for.
	 * @return {number} - The index of the entry with key=`key` or `-1`
	 *
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.indexOf('z'); // -1
	 */
	proto.indexOf = function (key) {
		// get hash information
		var ki = _find_key.call(this, key, true, this._create_unsubstantiated),
			key_index = ki.i,
			hash_values = ki.hv;
		if (key_index >= 0) { // Found! return the proper item's index
			var info = hash_values[key_index];
			return info.index.get();
		} else if(ki.ui >= 0) { // Not found but creating unsubstantiated items
			var unsubstantiated_info = ki.uhv[ki.ui];
			return unsubstantiated_info.index.get(); // create a dependency
		} else { // Not found and not creating unsubstantiated items
			return -1;
		}
	};

	/**
	 * Search for a key or create it if it wasn't found
	 * 
	 * @method getOrPut
	 * @param {*} key - The key to search for.
	 * @param {function} create_fn - A function to create the value if `key` is not found
	 * @param {*} [create_fn_context] - The context in which to call `create_fn`
	 * @param {number} [index=this.size] - Where to place a value that is created
	 * @param {boolean} [literal=false] - Whether to create the value as a literal constraint
	 * (the value of a function is the function)
	 * @return {number} - The index of the entry with key=`key` or `-1`
	 *
	 * @see get
	 * @see put
	 * @see item
	 * @example
	 *     var map = xjs({x: 1, y: 2});
	 *     map.getOrPut('x', function() {
	 *         console.log("evaluating");
	 *         return 3;
	 *     }); // output: 'evaluating'
	 *     // 3
	 *     map.getOrPut('x', function() {
	 *         console.log("evaluating");
	 *         return 3;
	 *     }); // (no output)
	 *     // 3
	 */
	proto.getOrPut = function (key, create_fn, create_fn_context, index, literal) {
		var ki = _find_key.call(this, key, true, false),
			key_index = ki.i, // index within hash array
			hash_values = ki.hv, // hash array
			hash = ki.h, // hash value
			context, value, info;

		if (key_index >= 0) { // found actual item!
			info = hash_values[key_index];
			return info.value.get();
		} else { // need to create it
			cjs.wait();
			context = create_fn_context || this;
			value = create_fn.call(context, key); // will set the value to this
			_do_set_item_ki.call(this, ki, key, value, index, literal); // do the work of putting
			cjs.signal();
			return value;
		}
	};

	/**
	 * Check if there is any entry with key = `key`
	 * 
	 * @method has
	 * @param {*} key - The key to search for.
	 * @return {boolean} - `true` if there is an entry with key=`key`, `false` otherwise.
	 *
	 * @see get
	 * @see item
	 * @example
	 *     var map = cjs({x: 1, y: 2});
	 *     map.has('x'); // true
	 */
	proto.has = function (key) {
		var ki = _find_key.call(this, key, true, this._create_unsubstantiated);
		var key_index = ki.i;
		if (key_index >= 0) { // Found successfully
			return true;
		} else if(this._create_unsubstantiated) { // Didn't find but there is an unsubstantiated item
			var unsubstantiated_info = ki.uhv[ki.ui];
			unsubstantiated_info.index.get(); // Add a dependency
			return false;
		} else { // No dependency to be added; just say we didn't find it
			return false;
		}
	};

	/**
	 * Move the entry at `old_index` to index `new_index`
	 *
	 * @method moveIndex
	 * @param {number} old_index - The index to move from
	 * @param {number} new_index - The index to move to
	 * @return {cjs.ArrayConstraint} - `this`
	 * @example
	 *     var map = cjs({x: 1, y: 2, z: 3});
	 *     map.keys(); // ['x','y', 'z']
	 *     map.moveIndex(1, 0)
	 *     map.keys(); // ['y','x', 'z']
	 */
	proto.moveIndex = function (old_index, new_index) {
		var i;
		cjs.wait();
		var info = this._ordered_values[old_index];
		// take out the old value
		this._ordered_values.splice(old_index, 1);
		// and re-add it
		this._ordered_values.splice(new_index, 0, info);

		// Properly iterate regardless of whether moving higher or lower
		var low = Math.min(old_index, new_index);
		var high = Math.max(old_index, new_index);
		// update the indicies of every thing between that might have been affected
		for (i = low; i <= high; i += 1) {
			_set_index(this._ordered_values[i], i);
		}

		// Invalidate the relevant properties (size shouldn't change)
		this.$keys.invalidate();
		this.$values.invalidate();
		this.$entries.invalidate();

		cjs.signal();
		return this;
	};

	/**
	 * Move the entry with key `key` to `index
	 *
	 * @method move
	 * @param {*} key - The key to search for 
	 * @param {number} to_index - The new index for the key
	 * @return {cjs.ArrayConstraint} - `this`
	 * @example
	 *     var map = cjs({x: 1, y: 2, z: 3});
	 *     map.keys(); // ['x','y', 'z']
	 *     map.move('z', 0)
	 *     map.keys(); // ['z','x', 'y']
	 */
	proto.move = function (key, to_index) {
		//Move a key to a new index
		var ki = _find_key.call(this, key, false, false);
		var key_index = ki.i;
		if (key_index >= 0) {
			var info = ki.hv[key_index];
			// leverage the previous move_index function
			this.moveIndex(info.index.get(), to_index);
		}
		return this;
	};

	/**
	 * Given a value, find the corresponding key
	 *
	 * @method keyForValue
	 * @param {*} value - The value whose key to search for 
	 * @param {function} [eq_check] - How to check if two values are equal (default: `===`
	 * @return {*|undefined} - The key where `this.get(key)===value`
	 * @example
	 *     var map = cjs({x: 1, y: 2, z: 3});
	 *     map.keyForValue(1); // 'x'
	 */
	proto.keyForValue = function (value, eq_check) {
		eq_check = eq_check || this.$vequality_check.get();
		var i;
		// It's advantageous here to use a value hash if it's there
		if (this._vhash) {
			var value_hash = this._valuehash(value);
			var vhash_val = this._vhash[value_hash];
			// Find that value hash's array
			if (vhash_val) {
				var len = vhash_val.length;
				for (i = 0; i < len; i += 1) {
					var info = vhash_val[i];
					if (eq_check(info.value.get(), value)) { // found it! here's the key
						return info.key.get();
					}
				}
			}
			// Didn't find it
			return undefined;
		} else {
			// Without a value hash, we have to iterate through every item
			var key;
			this.forEach(function (v, k) {
				if (eq_check(value, v)) { // found
					key = k;
					return my.BREAK; // Break out of the forEach
				}
			});
			return key;
		}
	};

	/**
	 * Clear this object and try to clean up any memory.
	 *
	 * @method destroy
	 * @param {boolean} [silent=false] - If set to `true`, avoids invalidating any dependent constraints.
	 */
	proto.destroy = function (silent) {
		cjs.wait();
		this.clear(silent);
		this.$equality_check.destroy(silent);
		this.$vequality_check.destroy(silent);
		this.$keys.destroy(silent);
		this.$values.destroy(silent);
		this.$entries.destroy(silent);
		this.$size.destroy(silent);
		cjs.signal();
	};

	/**
	 * Converts this array to a JavaScript object.
	 *
	 * @method toObject
	 * @param {function} [key_map_fn] - A function to convert keys
	 * @return {object} - This object as a JavaScript object
	 * @example
	 *     var map = cjs({x: 1, y: 2, z: 3});
	 *     map.toObject(); // {x:1,y:2,z:3}
	 */
	proto.toObject = function (key_map_fn) {
		var rv = {};
		key_map_fn = key_map_fn || identity; // just use the key if not supplied
		this.forEach(function (v, k) { rv[key_map_fn(k)] = v; });
		return rv;
	};
}(MapConstraint));
/** @lends */

/**
 * Determine whether an object is a map constraint
 * @method cjs.isMapConstraint
 * @param {*} obj - An object to check
 * @return {boolean} - `true` if `obj` is a `cjs.MapConstraint`, `false` otherwise
 */
is_map = function(obj) {
	return obj instanceof MapConstraint;
};

extend(cjs, {
	/**
	 * @method cjs.map
	 * @constructs cjs.MapConstraint
	 * @param {Object} [options] - A set of options to control how the map constraint is evaluated
	 * @return {cjs.MapConstraint} - A new map constraint object
	 * @see cjs.MapConstraint
	 */
	map: function (arg0, arg1) { return new MapConstraint(arg0, arg1); },
	/** @expose cjs.MapConstraint */
	MapConstraint: MapConstraint,
	/** @expose cjs.isMapConstraint */
	isMapConstraint: is_map
});

// Liven
// -----

// Will automatically call the provided function when it becomes invalid
extend(cjs, {
	/**
	 * Memoize a function to avoid unnecessary re-evaluation. Its options are:
	 *
	 * - `context`: The context in which `func` should be evaluated
	 * - `run_on_create`: Whether to run `func` immediately after creating the live function. (default: `true`)
	 * - `pause_while_running`: Whether to explicitly prevent this live function from being called recursively (default: `false`)
	 * - `on_destroy`: A function to call when `destroy` is called (default: `false`)
	 *
	 * The return value of this method also has two functions:
	 * - `pause`: Pause evaluation of the live function
	 * - `resume`: Resume evaluation of the live function
	 * - `run`: Run `func` if it's invalid
	 *
	 * @method cjs.liven
	 * @param {function} func - The function to make live
	 * @param {object} [options] - A set of options to control how liven works
	 * @return {object} An object with properties `destroy`, `pause`, `resume`, and `run`
	 *
	 * @example
	 *     var x_val = cjs(0);
	 *     var api_update = cjs.liven(function() {
	 *         console.log('updating other x');
	 *         other_api.setX(x_val);
	 *     }); // 'updating other x'
	 *     x_val.set(2); // 'updating other x'
	 *		
	 */
	liven:	function (func, options) {
				options = extend({
					context: root, // what to equate `this` to
					run_on_create: true, // whether it should run immediately
					pause_while_running: false, // whether to allow the function to be called recursively (indirectly)
					on_destroy: false // a function to call when this liven function is destroyed
				}, options);

				//Make constraint-aware values just by calling func in a constraint
				var node = new Constraint(func, {
					context: options.context,
					cache_value: false,
					auto_add_outgoing_dependencies: false,
					run_on_add_listener: !!options.run_on_create
				});

				// check if running
				var paused = false;
				var do_get;

				// Destroy the node and make sure no memory is allocated
				var destroy = function (silent) {
					if(options.on_destroy) {
						options.on_destroy.call(options.context, silent);
					}
					node.destroy(silent);
					node = null;
				};

				// Stop changing and remove it from the event queue if necessary
				var pause = function () {
					if(paused === false) {
						paused = true;
						node.offChange(do_get);
						return true; // successfully paused
					}
					return false;
				};

				// Re-add to the event queue
				var resume = function () {
					if(paused === true) {
						paused = false;
						node.onChange(do_get);
						return true; // successfully resumed
					}
					return false;
				};

				// The actual getter, will call the constraint's getter
				do_get = function () {
					if (options.pause_while_running) {
						pause();
					}
					node.get();
					if (options.pause_while_running) {
						resume();
					}
				};

				// When the value changes, call do_get
				node.onChange(do_get);

				var rv = {
					destroy: destroy,
					pause: pause,
					resume: resume,
					run: function(arg0) {
						do_get(arg0);
						return this;
					},
					_constraint: node // for debugging purposes
				};
				return rv;
			}
});

// A function to hash the arguments passed in. By default, just a concatenation of the arguments' string value
var memoize_default_hash = function () {
	var i, len = arguments.length;
	var rv = "";
	for (i = 0; i < len; i += 1) {
		rv += arguments[i];
	}
	return rv;
},
// A function to check if two sets of arguments are equal; by default just check every value
memoize_default_equals = function (args1, args2) {
	var i,
		len = args1.length;
	if (len === args2.length) {
		for (i = 0; i < len; i += 1) {
			var arg1 = args1[i],
				arg2 = args2[i];
			if (arg1 !== arg2) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
};

extend(cjs, {
	/**
	 * Memoize a function to avoid unnecessary re-evaluation. Its options are:
	 *
	 * - `hash`: Create a unique value for each set of arguments (call with an argument array)
	 * - `equals`: check if two sets of arguments are equal (call with two argument arrays)
	 * - `context`: The context in which `getter_fn` should be evaluated
	 * - `literal_values`: Whether values should be literal if they are functions
	 *
	 * The return value of this method also has two functions:
	 * - `each`: Iterate through every set of arguments and value that is memoized
	 * - `destroy`: Clear the memoized values to clean up memory
	 *
	 * @method cjs.memoize
	 * @param {function} getter_fn - The function to memoize
	 * @param {object} [options] - A set of options to control how memoization works
	 * @return {function} The memoized function
	 *
	 * @example
	 *
	 *     var arr = cjs([3,2,1,4,5,10]),
	 *     get_nth_largest = cjs.memoize(function(n) {
	 *         console.log('recomputing');
	 *         var sorted_arr = arr memoized fn.sort();
	 *         return sorted_arr[ny];
	 *     });
	 *
	 *     get_nth_largest(0); // logfged: recomputing
	 *     get_nth_largest(0); //ulli (nothing logged because answer memoized)
	 *     arr.splice(0, 1); // N
	 *     get_nth_largest(0); // logged: recomputing
	 */
	memoize: function (getter_fn, options) {
		options = extend({
			hash: memoize_default_hash,
			equals: memoize_default_equals,
			context: root,
			literal_values: false
		}, options);

		// Map from args to value
		var args_map = new MapConstraint({
			hash: options.hash,
			equals: options.equals,
			literal_values: options.literal_values
		});

		// When getting a value either create a constraint or return the existing value
		var rv = function () {
			var args = toArray(arguments),
				constraint = args_map.getOrPut(args, function() {
					return new Constraint(function () {
						return getter_fn.apply(options.context, args);
					});
				});
			return constraint.get();
		};

		// Clean up memory after self
		rv.destroy = function (silent) {
			args_map.forEach(function (constraint) {
				constraint.destroy(silent);
			});
			args_map.destroy(silent);

			args_map = null;
			options = null;
		};

		// Run through every argument and call fn on it
		rv.each = function (fn) {
			args_map.forEach(fn);
		};
		return rv;
	}
});

var make_node = function(item) { // Check if the argument is a DOM node or create a new textual node with its contents
		if(isAnyElement(item)) {
			return item;
		} else {
			var node = doc.createTextNode(item);
			return node;
		}
	},
	insert_at = function(child_node, parent_node, index) {
		// Utility function to insert child_node as the index-th child of parent_node
		var children = parent_node.childNodes;
		if(children.length <= index) {
			parent_node.appendChild(child_node);
		} else {
			var before_child = children[index];
			parent_node.insertBefore(child_node, before_child);
		}
	},
	remove_node = function(child_node) {
		// Utility to remove a child DOM node
		var parentNode = child_node.parentNode;
		if(parentNode !== null) {
			parentNode.removeChild(child_node);
		}
	},
	remove_index = function(parent_node, index) {
		// Utility to remove a child DOM node by index
		var children = parent_node.childNodes, child_node;
		if(children.length > index) {
			child_node = children[index];
			remove_node(child_node);
		}
	},
	move_child = function(parent_node, to_index, from_index) {
		// Utility to move a child DOM node by indices
		var children = parent_node.childNodes;
		if(children.length > from_index) {
			var child_node = children[from_index];
			if(parent_node) {
				if(from_index < to_index) { //If it's less than the index we're inserting at...
					to_index++; //Increase the index by 1, to make up for the fact that we're removing me at the beginning
				}
				insert_at(child_node, parent_node, to_index);
			}
		}
	},
	// Check if jQuery is available
	is_jquery_obj = function(x) {
		return has(root, "jQuery") ? (x instanceof root.jQuery) : false;
	},
	nList = root.NodeList || false,
	// a node list is what is returned when you call getElementsByTagName, etc.
	isNList = nList ? function(x) { return x instanceof nList; } : function() { return false; },

	// Convert an object that can be passed into a binding into an array of dom elements
	get_dom_array = function(obj) {
		if(isArray(obj)) { // already an array
			return obj;
		} else if (is_constraint(obj)) { // regular constraint
			return get_dom_array(obj.get());
		} else if(is_array(obj)) { // array constraint
			return obj.toArray();
		} else if(is_map(obj)) { // map constraint
			return obj.values();
		} else if(is_jquery_obj(obj)) { // jQuery object
			return root.jQuery.makeArray(obj);
		} else if(isNList(obj)) { // node list
			return toArray(obj);
		} else { // hopefully just an element; return its value as an array
			return [obj];
		}
	};

/**
 * A binding calls some arbitrary functions passed into options. It is responsible for keeping some aspect of a
 * DOM node in line with a constraint value. For example, it might keep an element's class name in sync with a
 * class_name constraint
 *
 * @private
 * @class cjs.Binding
 * @param {object} options
 * @classdesc Bind a DOM node property to a constraint value
 */
var Binding = function(options) {
	var targets = options.targets, // the DOM nodes
		onAdd = options.onAdd, // optional function to be called when a new target is added
		onRemove = options.onRemove, // optional function to be called when a target is removed
		onMove = options.onMove, // optional function to be called when a target is moved
		setter = options.setter, // a function that sets the attribute value
		getter = options.getter, // a function that gets the attribute value
		init_val = options.init_val, // the value of the attribute before the binding was set
		curr_value, // used in live fn
		last_value, // used in live fn
		old_targets = [], // used in live fn
		onDestroy = options.onDestroy, // a function to be called when the binding is destroyed
		// create a separate function to 
		do_update = function() {
			this._timeout_id = false; // Make it clear that I don't have a timeout set
			var new_targets = filter(get_dom_array(targets), isAnyElement); // update the list of targets

			if(onAdd || onRemove || onMove) { // If the user passed in anything to call when targets change, call it
				var diff = get_array_diff(old_targets, new_targets);
				each(onRemove && diff.removed, function(removed) { onRemove(removed.from_item, removed.from); });
				each(onAdd && diff.added, function(added) { onAdd(added.item, added.to); });
				each(onMove && diff.moved, function(moved) { onMove(moved.item, moved.to_index, moved.from_index); });
				old_targets = new_targets;
			}

			// For every target, update the attribute
			each(new_targets, function(target) {
				setter(target, curr_value, last_value);
			});

			// track the last value so that next time we call diff
			last_value = curr_value;
		};

	this.onDestroy = onDestroy;
	this._throttle_delay = false; // Optional throttling to improve performance
	this._timeout_id = false; // tracks the timeout that helps throttle

	if(isFunction(init_val)) { // If init_val is a getter, call it on the first element
		last_value = init_val(get_dom_array(targets[0]));
	} else { // Otherwise, just take it as is
		last_value = init_val;
	}

	this.$live_fn = cjs.liven(function() {
		curr_value = getter(); // get the value once and inside of live fn to make sure a dependency is added

		if(this._throttle_delay) { // We shouldn't update values right away
			if(!this._timeout_id) { // If there isn't any timeout set yet, then set a timeout to delay the call to do update
				this._timeout_id = sTO(bind(do_update, this), this._throttle_delay);
			}
		} else { // we can update the value right away if no throttle delay is set
			do_update.call(this);
		}
	}, {
		context: this
	});
};

(function(my) {
	/** @lends cjs.Binding.prototype */
	var proto = my.prototype;
	/**
	 * Pause binding (no updates to the attribute until resume is called)
	 *
	 * @method pause
	 * @return {Binding} `this`
	 * @see resume
	 * @see throttle
	 */
	proto.pause = function() { this.$live_fn.pause(); return this; };

	/**
	 * Resume binding (after pause)
	 *
	 * @method resume
	 * @return {Binding} `this`
	 * @see pause
	 * @see throttle
	 */
	proto.resume = function() { this.$live_fn.resume(); return this; };


	/**
	 * Require at least `min_delay` milliseconds between setting the attribute
	 *
	 * @method throttle
	 * @param {number} min_delay - The minimum number of milliseconds between updates
	 * @return {Binding} `this`
	 * @see pause
	 * @see resume
	 */
	proto.throttle = function(min_delay) {
		this._throttle_delay = min_delay > 0 ? min_delay : false; // Make sure it's positive
		if(this._timeout_id && !this._throttle_delay) { // If it was specified that there should be no delay and we are waiting for a re-eval
			cTO(this._timeout_id); // then prevent that re-eval
			this._timeout_id = false;
		}
		// regardless, run the live fn again
		this.$live_fn.run();
		return this;
	};

	/**
	 * Stop updating the binding and try to clean up any memory
	 *
	 * @method destroy
	 * @return {undefined}
	 * @see pause
	 * @see resume
	 * @see throttle
	 */
	proto.destroy = function() {
		this.$live_fn.destroy();
		if(this.onDestroy) {
			this.onDestroy();
		}
	};
}(Binding));
/** @lends */

// Creates a type of binding that accepts any number of arguments and then sets an attribute's value to depend on
// every element that was passed in
var create_list_binding = function(list_binding_getter, list_binding_setter, list_binding_init_value) {
		return function(elements) { // The first argument is a list of elements
			var args = slice.call(arguments, 1), // and the rest are values
				val = cjs(function() { // Create a constraint so that the binding knows of any changes
					return list_binding_getter(args);
				});

			var binding = new Binding({
				targets: elements,
				getter: bind(val.get, val), // use the constraint's value as the getter
				setter: list_binding_setter,
				init_val: list_binding_init_value,
				onDestroy: function() {
					val.destroy(); // Clean up the constraint when we are done
				}
			});
			return binding;
		};
	},
	create_textual_binding = function(setter) { // the text value of a node is set to the concatenation of every argument
		return create_list_binding(function(args) {
			return map(args, cjs.get).join("");
		}, function(element, value) {
			setter(element, value);
		});
	},
	// a binding that accepts either a key and a value or an object with any number of keys and values
	create_obj_binding = function(obj_binding_setter) {
		return function(elements) {
			var vals,
				args = slice.call(arguments, 1);
			if(args.length === 0) { // need at least one argument
				return;
			} else if(args.length === 1) { // an object with keys and values was passed in
				vals = args[0];
			} else if(args.length > 1) { // the first argument was the key, the second was a value
				vals = {};
				vals[args[0]] = args[1];
			}

			var binding = new Binding({
				targets: elements,
				setter: function(element, value) {
					each(value, function(v, k) {
						obj_binding_setter(element, k, v);
					});
				},
				getter: function() {
					if(is_map(vals)) {
						return vals.toObject();
					} else {
						var rv = {};
						each(vals, function(v, k) {
							rv[k] = cjs.get(v);
						});
						return rv;
					}
				}
			});

			return binding;
		};
	};

	/**
	 * Constrain a DOM node's text content
	 *
	 * @method cjs.text
	 * @param {dom} element - The DOM element
	 * @param {...*} values - The desired text value
	 * @return {Binding} - A binding object
	 * @example If `my_elem` is a dom element
	 *
	 *     var message = cjs('hello');
	 *     cjs.text(my_elem, message);
	 */
var text_binding = create_textual_binding(function(element, value) { // set the escaped text of a node
		element.textContent = value;
	}),

	/**
	 * Constrain a DOM node's HTML content
	 *
	 * @method cjs.html
	 * @param {dom} element - The DOM element
	 * @param {...*} values - The desired html content
	 * @return {Binding} - A binding object
	 * @example If `my_elem` is a dom element
	 *
	 *     var message = cjs('<b>hello</b>');
	 *     cjs.text(my_elem, message);
	 */
	html_binding = create_textual_binding(function(element, value) { // set the non-escaped inner HTML of a node
		element.innerHTML = value;
	}),

	/**
	 * Constrain a DOM node's value
	 *
	 * @method cjs.val
	 * @param {dom} element - The DOM element
	 * @param {...*} values - The value the element should have
	 * @return {Binding} - A binding object
	 * @example If `my_elem` is a text input element
	 *
	 *     var value = cjs('hello');
	 *     cjs.val(my_elem, message);
	 */
	val_binding = create_textual_binding(function(element, value) { // set the value of a node
		element.val = value;
	}),

	/**
	 * Constrain a DOM node's class names
	 *
	 * @method cjs.class
	 * @param {dom} element - The DOM element
	 * @param {...*} values - The list of classes the element should have. The binding automatically flattens them.
	 * @return {Binding} - A binding object
	 * @example If `my_elem` is a dom element
	 *
	 *     var classes = cjs('class1 class2');
	 *     cjs.class(my_elem, classes);
	 */
	class_binding = create_list_binding(function(args) { // set the class of a node
		return flatten(map(args, cjs.get), true);
	}, function(element, value, old_value) {
		// Compute difference so that old class values remain
		var ad = get_array_diff(old_value, value),
			curr_class_name = " " + element.className + " "; // add spaces so that the replace regex doesn't need extra logic

		// take out all of the removed classes
		each(ad.removed, function(removed_info) { curr_class_name = curr_class_name.replace(" " + removed_info.from_item + " ", " "); });
		// and add all of the added classes
		curr_class_name += map(ad.added, function(x) { return x.item; }).join(" ");

		curr_class_name = curr_class_name.trim(); // and trim to remove extra spaces

		element.className = curr_class_name; // finally, do the work of setting the class
	}, []), // say that we don't have any classes to start with

	/**
	 * Constrain a DOM node's children
	 *
	 * @method cjs.children
	 * @param {dom} element - The DOM element
	 * @param {...*} elements - The elements to use as the constraint. The binding automatically flattens them.
	 * @return {Binding} - A binding object
	 * @example If `my_elem`, `child1`, and `child2` are dom elements
	 *
	 *     var nodes = cjs(child1, child2);
	 *     cjs.children(my_elem, nodes);
	 */
	children_binding = create_list_binding(function(args) {
		var arg_val_arr = map(args, cjs.get);
		return map(flatten(arg_val_arr, true), make_node);
	}, function(element, value, old_value) {
		var ad = get_array_diff(old_value, value);
		each(ad.removed, function(removed_info) { remove_index(element, removed_info.from); });
		each(ad.added, function(added_info) { insert_at(added_info.item, element, added_info.to); });
		each(ad.moved, function(moved_info) { move_child(element, moved_info.to_index, moved_info.from_index); });
	}, function(element) {
		return toArray(element.childNodes);
	}),

	/**
	 * Constrain a DOM node's CSS style
	 *
	 * @method cjs.css
	 * @param {dom} element - The DOM element
	 * @param {object} values - An object whose key-value pairs are the CSS property names and values respectively
	 * @return {Binding} - A binding object representing the link from constraints to CSS styles
	 *
	 * @example If `my_elem` is a dom element
	 *
	 *     var color = cjs('red'),
	 *     left = cjs(0);
	 *     cjs.css(my_elem, {
	 *         "background-color": color,
	 *         left: left.add('px')
	 *     });
	 */
	/**
	 * Constrain a DOM node's CSS style
	 *
	 * @method cjs.css^2
	 * @param {string} key - The name of the CSS attribute to constraint
	 * @param {cjs.Constraint|string} value - The value of this CSS attribute
	 * @return {Binding} - A binding object representing the link from constraints to elements
	 *
	 * @example If `my_elem` is a dom element
	 *
	 *     var color = cjs('red');
	 *     cjs.css(my_elem, ''background-color', color);
	 */
	css_binding = create_obj_binding(function(element, key, value) {
		element.style[camel_case(key)] = value;
	}),

	/**
	 * Constrain a DOM node's attribute values
	 *
	 * @method cjs.attr
	 * @param {dom} element - The DOM element
	 * @param {object} values - An object whose key-value pairs are the attribute names and values respectively
	 * @return {Binding} - A binding object representing the link from constraints to elements
	 *
	 * @example If `my_elem` is an input element
	 *
	 *     var default_txt = cjs('enter name');
	 *     cjs.attr(my_elem, 'placeholder', default_txt);
	 */
	/**
	 * Constrain a DOM node's attribute value
	 *
	 * @method cjs.attr^2
	 * @param {string} key - The name of the attribute to constraint
	 * @param {cjs.Constraint|string} value - The value of this attribute
	 * @return {Binding} - A binding object representing the link from constraints to elements
	 *
	 * @example If `my_elem` is an input element
	 *
	 *     var default_txt = cjs('enter name'),
	 *         name = cjs('my_name');
	 *     cjs.attr(my_elem, {
	 *         placeholder: default_txt,
	 *         name: name
	 *     });
	 */
	attr_binding = create_obj_binding(function(element, key, value) {
		element.setAttribute(key, value);
	});

var inp_change_events = ["keyup", "input", "paste", "propertychange", "change"],
	/**
	 * Take an input element and create a constraint whose value is constrained to the value of that input element
	 *
	 * @method cjs.inputValue
	 * @param {dom} inp - The input element
	 * @return {cjs.Constraint} - A constraint whose value is the input's value
	 *
	 * @example If `name_input` is an input element
	 *
	 *     var name = cjs.inputValue(name_input),
	 */
	getInputValueConstraint = function(inps) {
		var arr_inp; // tracks if the input is a list of items
		if(isElement(inps)) {
			inps = [inps];
			arr_inp = false;
		} else {
			arr_inp = true;
		}
		// the constraint should just return the value of the input element
		var constraint = cjs(function() {
				if(arr_inp) {
					return map(inps, function(inp) { return inp.value; }); // if it's an array, return every value
				} else {
					return inps[0].value; // otherwise, just return the first value
				}
			}),
			len = inps.length,
			on_change = bind(constraint.invalidate, constraint), // when any input event happens, invalidate the constraint
			activate = function() { // add all the event listeners for every input and event type
				each(inp_change_events, function(event_type) {
					each(inps, function(inp) {
						inp.addEventListener(event_type, on_change);
					});
				});
			},
			deactivate = function() { // clear all the event listeners for every input and event type
				each(inp_change_events, function(event_type) {
					each(inps, function(inp) {
						inp.removeEventListener(event_type, on_change);
					});
				});
			},
			oldDestroy = constraint.destroy;

		// when the constraint is destroyed, remove the event listeners
		constraint.destroy = function() {
			deactivate();
			oldDestroy.call(constraint);
		};

		activate();
		return constraint;
	};

extend(cjs, {
	/** @expose cjs.text */
	text: text_binding,
	/** @expose cjs.html */
	html: html_binding,
	/** @expose cjs.val */
	val: val_binding,
	/** @expose cjs.children */
	children: children_binding,
	/** @expose cjs.attr */
	attr: attr_binding,
	/** @expose cjs.css */
	css: css_binding,
	/** @expose cjs.class */
	"class": class_binding,
	/** @expose cjs.inputValue */
	inputValue: getInputValueConstraint,
	/** @expose cjs.Binding */
	Binding: Binding
});

// Finite State Machines
// ---------------------

// State keeps track of basic state information (its containing FSM does most of the work)
var State = function(fsm, name) {
	this._fsm = fsm; // parent fsm
	this._name = name; // state name (fetch with getName)
	this._id = uniqueId(); // useful for storage
};

(function(my) {
	var proto = my.prototype;
	proto.getName = function() { return this._name; }; // getter for name
	proto.id = function() { return this._id; }; // getter for id
}(State));

// Simple transition representation (again, the containing FSM does most of the work)
var Transition = function(fsm, from_state, to_state, name) {
	this._fsm = fsm; // parent FSM
	this._from = from_state; // from state (fetch with getFrom)
	this._to = to_state; // to state (fetch with getTo)
	this._name = name; // name (fetch with getName)
	this._id = uniqueId(); // useful for storage
};

(function(my) {
	var proto = my.prototype;
	proto.getFrom = function() { return this._from; }; // from getter
	proto.getTo = function() { return this._to; }; // to getter
	proto.getName = function() { return this._name; }; // name getter
	proto.getFSM = function() { return this._fsm; }; // FSM getter
	proto.id = function() { return this._id; }; // getter for id
	proto.run = function() {
		var fsm = this.getFSM();
		// do_transition should be called by the user's code
		if(fsm.is(this.getFrom())) {
			var args = toArray(arguments);
			args.unshift(this);
			args.unshift(this.getTo());
			fsm._setState.apply(fsm, args);
		}
	};
}(Transition));

/*
 * The following selector constructors are used internally to keep track of user-specified
 * selectors (a -> b represents the transition from a to b).
 * 
 * Developers using cjs can specify that they want to add listeners for any number of such
 * selectors and they will be dynamically evaluated and called. For instance, if the user
 * adds a selector for any state to stateA (represented as * -> stateA) *before* stateA is
 * created, then if the developer later adds a state named stateA, their callback should be
 * called whenever the fsm transitions to that newly created stateA
 */

// The selector for a state with a supplied name (e.g. stateA)
var StateSelector = function(state_name) {
	this._state_name = state_name;
};
(function(my) {
	var proto = my.prototype;
	proto.matches = function(state) {
		// Supplied object should be a State object with the given name
		return state instanceof State && (this._state_name === state || this._state_name === state.getName());
	};
}(StateSelector));

// Matches any state (e.g. *)
var AnyStateSelector = function() { };
(function(my) {
	var proto = my.prototype;
	// will match any state (but not transition)
	proto.matches = function(state) {return state instanceof State;};
}(AnyStateSelector));

// Matches certain transitions (see transition formatting spec)
var TransitionSelector = function(pre, from_state_selector, to_state_selector) {
	this.is_pre = pre; // should fire before the transition (as opposed to after)
	this.from_state_selector = from_state_selector; // the selector for the from state (should be a StateSelector or AnyStateSelector)
	this.to_state_selector = to_state_selector; // selector for the to state
};
(function(my) {
	var proto = my.prototype;
	// Make sure that the supplied object is a transition with the same timing
	proto.matches = function(transition, pre) {
		if(transition instanceof Transition && this.is_pre === pre) { 
			var from_state = transition.getFrom();
			var to_state = transition.getTo();
			// And then make sure both of the states match as well
			return this.from_state_selector.matches(from_state) &&
					this.to_state_selector.matches(to_state);
		} else { return false; }
	};
}(TransitionSelector));

// Multiple possibilities (read OR, not AND)
var MultiSelector = function(selectors) {
	this.selectors = selectors; // all of the selectors to test
};
(function(my) {
	var proto = my.prototype;
	proto.matches = function() {
		var match_args = arguments;
		// See if any selectors match
		return any(this.selectors, function(selector) {
			return selector.matches.apply(selector, match_args);
		});
	};
}(MultiSelector));

// return a selector object from a string representing a single state
var parse_single_state_spec = function(str) {
	if(str === "*") {
		return new AnyStateSelector();
	} else {
		return new StateSelector(str);
	}
};

// Parse one side of the transition
var parse_state_spec = function(str) {
	// Split by , and remove any excess spacing
	var state_spec_strs = map(str.split(","), function(ss) { return ss.trim(); }); 

	// The user only specified one state
	if(state_spec_strs.length === 1) {
		return parse_single_state_spec(state_spec_strs[0]);
	} else { // any number of states
		var state_specs = map(state_spec_strs, parse_single_state_spec);
		return new MultiSelector(state_specs);
	}
};

// The user specified a transition
var parse_transition_spec = function(left_str, transition_str, right_str) {
	var left_to_right_transition, right_to_left_transition;
	var left_state_spec = parse_state_spec(left_str);
	var right_state_spec = parse_state_spec(right_str);

	// Bi-directional, after transition
	if(transition_str === "<->") {
		left_to_right_transition = new TransitionSelector(false, left_state_spec, right_state_spec);
		right_to_left_transition = new TransitionSelector(false, right_state_spec, left_state_spec);
		return new MultiSelector(left_to_right_transition, right_to_left_transition);
	} else if(transition_str === ">-<") { // bi-directional, before transition
		left_to_right_transition = new TransitionSelector(true, left_state_spec, right_state_spec);
		right_to_left_transition = new TransitionSelector(true, right_state_spec, left_state_spec);
		return new MultiSelector(left_to_right_transition, right_to_left_transition);
	} else if(transition_str === "->") { // left to right, after transition
		return new TransitionSelector(false, left_state_spec, right_state_spec);
	} else if(transition_str === ">-") { // left to right, before transition
		return new TransitionSelector(true, left_state_spec, right_state_spec);
	} else if(transition_str === "<-") { // right to left, after transition
		return new TransitionSelector(false, right_state_spec, left_state_spec);
	} else if(transition_str === "-<") { // right to left, before transition
		return new TransitionSelector(true, right_state_spec, left_state_spec);
	} else { return null; } // There shouldn't be any way to get here...
};

var transition_separator_regex = new RegExp("^([\\sa-zA-Z0-9,\\-_*]+)((<->|>-<|->|>-|<-|-<)([\\sa-zA-Z0-9,\\-_*]+))?$");
// Given a string specifying a state or set of states, return a selector object
var parse_spec = function(str) {
	var matches = str.match(transition_separator_regex);
	if(matches === null) {
		return null; // Poorly formatted specification
	} else {
		if(matches[2] === undefined) {
			// The user specified a state: "A": ["A", "A", undefined, undefined, undefined]
			var states_str = matches[1];
			return parse_state_spec(states_str);
		} else {
			// The user specified a transition: "A->b": ["A->b", "A", "->b", "->", "b"]
			var from_state_str = matches[1], transition_str = matches[3], to_state_str = matches[4];
			return parse_transition_spec(from_state_str, transition_str, to_state_str);
		}
	}
};


// StateListener
var state_listener_id = 0;
var StateListener = function(selector, callback, context) {
	this._context = context || root; // 'this' in the callback
	this._selector = selector; // used to record interest
	this._callback = callback; // the function to call when selector matches
	this._id = state_listener_id++; // unique id
};
(function(my) {
	var proto = my.prototype;
	// Used to determine if run should be called by the fsm
	proto.interested_in = function() { return this._selector.matches.apply(this._selector, arguments); };
	// Run the user-specified callback
	proto.run = function() { this._callback.apply(this._context, arguments); };
}(StateListener));

/**
 * ***Note:*** The preferred way to create a FSM is through the `cjs.fsm` function
 * This class represents a finite-state machine to track the state of an interface or component
 *
 * @private
 * @class cjs.FSM
 * @classdesc A finite-state machine
 * @param {string} ...state_names - Any number of state names for the FSM to have
 * @see cjs.fsm
 */
var FSM = function() {
	this._states = {}; // simple substate representations
	this._transitions = []; // simple transition representations
	this._curr_state = null; // the currently active state
	this._listeners = []; // listeners for every selector
	this._chain_state = null; // used internally for chaining
	this._did_transition = false; // keeps track of if any transition has run (so that when the user specifies
								// a start state, it knows whether or not to change the current state

	/**
	 * The name of this FSM's active state
	 * @property {Constraint} cjs.FSM.state
	 * @example
	 *
	 *     var my_fsm = cjs.fsm("state1", "state2");
	 *     my_fsm.state.get(); // 'state1'
	 */
	this.state = cjs(function() { // the name of the current state
		if(this._curr_state) { return this._curr_state.getName(); }
		else { return null; }
	}, {
		context: this
	});

	// Option to pass in state names as arguments
	this.addState.apply(this, flatten(arguments, true));
};
(function(my) {
	var proto = my.prototype;
	/** @lends cjs.FSM.prototype */

	// Find the state with a given name
	var getStateWithName = function(fsm, state_name) {
		return fsm._states[state_name];
	};

	/**
	 * Create states and set the current "chain state" to that state
	 *
	 * @method addState
	 * @param {string} ...state_names - Any number of state names to add. The last state becomes the chain state
	 * @return {FSM} - `this`
	 *
	 * @example
	 *
	 *     var fsm = cjs.fsm()
	 *                  .addState('state1')
	 *                  .addState('state2')
	 *                  .addTransition('state2', cjs.on('click'));
	 */
	proto.addState = function() {
		var state;
		each(arguments, function(state_name) {
			state = getStateWithName(this, state_name);
			if(!state) {
				state = this._states[state_name] = new State(this, state_name);
				// if there isn't an active state,
				// make this one the starting state by default
				if(this._curr_state === null) { this._curr_state = state; }
			}
		}, this);

		if(state) { this._chain_state = state; }

		return this;
	};

	/**
	 * Returns the name of the state this machine is currently in. Constraints that depend on the return
	 * value will be automatically updated.
	 *
	 * @method getState
	 * @return {string} - The name of the currently active state
	 * @example
	 *
	 *     var my_fsm = cjs.fsm("state1", "state2");
	 *     my_fsm.getState(); // 'state1'
	 */
	proto.getState = function() {
		return this.state.get();
	};
	
	/**
	 * Add a transition between two states
	 *
	 * @method addTransition
	 * @param {string} to_state - The name of the state the transition should go to
	 * @return {function} - A function that tells the transition to run
	 * @example
	 *
	 *     var x = cjs.fsm();
	 *     x.addState("b")
	 *      .addState("a");
	 *     var run_transition = x.addTransition("b");
	 *     //add a transition from a to b
	 *     window.addEventListener("click", run_transition);
	 *     // run that transition when the window is clicked
	 */
	/**
	 * (variant 2)
	 * @method addTransition^2
	 * @param {string} to_state - The name of the state the transition should go to
	 * @param {CJSEvent|function} add_transition_fn - A `CJSEvent` or a user-specified function for adding the event listener
	 * @return {FSM} - `this`
	 * @example
	 *
	 *     var x = cjs.fsm();
	 *     x.addState("b")
	 *      .addState("a")
	 *      .addTransition("b", cjs.on('click'));
	 *     // add a transition from a to b that runs when the window is clicked
	 * @example
	 *
	 *     var x = cjs.fsm();
	 *     x.addState("b")
	 *      .addState("a")
	 *      .addTransition("b", function(run_transition) {
	 *          window.addEventListener("click", run_transition);
	 *      });
	 *     // add a transition from a to b that runs when the window is clicked
	 */
	/**
	 * (variant 3)
	 * @method addTransition^3
	 * @param {string} from_state - The name of the state the transition should come from
	 * @param {string} to_state - The name of the state the transition should go to
	 * @return {function} - A function that tells the transition to run
	 * @example
	 *
	 *     var x = cjs.fsm("a", "b");
	 *     var run_transition = x.addTransition("a", "b"); //add a transition from a to b
	 *     window.addEventListener("click", run_transition); // run that transition when the window is clicked
	 */
	/**
	 * (variant 4)
	 * @method addTransition^4
	 * @param {string} from_state - The name of the state the transition should come from
	 * @param {string} to_state - The name of the state the transition should go to
	 * @param {CJSEvent|function} add_transition_fn - A `CJSEvent` or a user-specified function for adding the event listener
	 * @return {FSM} - `this`
	 *
	 * @example
	 *
	 *     var x = cjs.fsm("a", "b");
	 *     x.addTransition("a", "b", cjs.on("click"));
	 * @example
	 *
	 *     var x = cjs.fsm("a", "b");
	 *     var run_transition = x.addTransition("a", "b", function(run_transition) {
	 *         window.addEventListener("click", run_transition);
	 *     }); // add a transition from a to b that runs when the window is clicked
	 */
	proto.addTransition = function(a, b, c) {
		var from_state, to_state, transition, add_transition_fn, return_transition_func = false;

		if(arguments.length === 0) {
			throw new Error("addTransition expects at least one argument");
		} else if(arguments.length === 1) { // make a transition from the last entered state to the next state
			return_transition_func = true;
			from_state = this._chain_state;
			to_state = a;
		} else if(arguments.length === 2) {
			if(isFunction(b) || b instanceof CJSEvent) { // b is the function to add the transition
				from_state = this._chain_state;
				to_state = a;
				add_transition_fn = b;
			} else { // from and to states specified
				from_state = a;
				to_state = b;
				return_transition_func = true;
			}
		} else {
			from_state = a;
			to_state = b;
			add_transition_fn = c;
		}

		// do_transition is a function that can be called to activate the transition
		// Creates a new transition that will go from from_state to to_state
		transition = new Transition(this, from_state, to_state);
		this._transitions.push(transition);
		if(return_transition_func) {
			return bind(transition.run, transition);
		} else {
			if(add_transition_fn instanceof CJSEvent) {
				add_transition_fn._addTransition(transition);
			} else {
				// call the supplied function with the code to actually perform the transition
				add_transition_fn.call(this, bind(transition.run, transition), this);
			}
			return this;
		}
	};

	/**
	 * Changes the active state of this FSM.
	 * This function should, ideally, be called by a transition instead of directly.
	 *
	 * @private
	 * @method _setState
	 * @param {State|string} state - The state to transition to
	 * @param {Transition} transition - The transition that ran
	 */
	proto._setState = function(state, transition) {
		var from_state = this.getState(); // the name of my current state
		var to_state = isString(state) ? getStateWithName(this, state) : state;
		if(!to_state) {
			throw new Error("Could not find state '" + state + "'");
		}
		this.did_transition = true;

		// Look for pre-transition callbacks
		each(this._listeners, function(listener) {
			if(listener.interested_in(transition, true)) {
				listener.run(transition, to_state, from_state); // and run 'em
			}
		});
		this._curr_state = to_state;
		this.state.invalidate();
		// Look for post-transition callbacks..
		// and also callbacks that are interested in state entrance
		each(this._listeners, function(listener) {
			if(listener.interested_in(transition, false)) {
				listener.run(transition, to_state, from_state); // and run 'em
			} else if(listener.interested_in(to_state)) {
				listener.run(transition, to_state, from_state); // and run 'em
			}
		});
	};

	/**
	 * Remove all of the states and transitions of this FSM. Useful for cleaning up memory
	 *
	 * @method destroy
	 */
	proto.destroy = function() {
		this.state.destroy();
		this._states = {};
		this._transitions = [];
		this._curr_state = null;
	};

	/**
	 * Specify which state this FSM should begin at.
	 *
	 * @method startsAt
	 * @param {string} state_name - The name of the state to start at
	 * @return {FSM} - `this`
	 * @example
	 *
	 *     var x = cjs.fsm("a", "b");
	 *     x.addTransition("a", "b", cjs.on("click"));
	 */
	proto.startsAt = function(state_name) {
		var state = getStateWithName(this, state_name); // Get existing state
		if(!state) {
			// or create it if necessary
			state = this.create_state(state_name);
		}
		if(!this.did_transition) {
			// If no transitions have occurred, set the current state to the one they specified
			this._curr_state = state;
		}
		this._chain_state = state;
		return this;
	};

	/**
	 * Check if the current state is `state_name`
	 *
	 * @method is
	 * @param {string} state_name - The name of the state to check against
	 * @return {boolean} - `true` if the name of the active state is `state_name`. `false` otherwise
	 * @example
	 *
	 *     var x = cjs.fsm("a", "b");
	 *     fsm.is("a"); // true, because a is the starting state
	 */
	proto.is = function(state_name) {
		// get the current state name & compare
		var state = this.getState();
		return state === null ? false : (state === (isString(state_name) ? state_name : state_name.getName()));
	};

	/**
	 * Call a given function when the finite-state machine enters a given state.
	 * `spec` can be of the form:
	 * - `'*'`: any state
	 * - `'state1'`: A state named `state1`
	 * - `'state1 -> state2'`: Immediately **after** state1 transitions to state2
	 * - `'state1 >- state2'`: Immediately **before** state1 transitions to state2
	 * - `'state1 <-> state2'`: Immediately **after** any transition between state1 and state2
	 * - `'state1 >-< state2'`: Immediately **before** any transition between state1 and state2
	 * - `'state1 <- state2'`: Immediately **after** state2 transitions 2 state1
	 * - `'state1 -< state2'`: Immediately **before** state2 transitions 2 state1
	 * - `'state1 -> *'`: Any transition from state1
	 * - `'* -> state2'`: Any transition to state2
	 *
	 * @method on
	 * @param {string} spec - A specification of which state to call the callback
	 * @param {function} callback - The function to be called
	 * @param {object} [context] - What `this` should evaluate to when `callback` is called
	 * @return {FSM} - `this`
	 *
	 * @see FSM.prototype.off
	 * @example
	 *
	 *     var x = cjs.fsm("a", "b");
	 *     x.on("a->b", function() {...});
	 */
	proto.on = proto.addEventListener = function(spec_str, callback, context) {
		var selector;
		if(isString(spec_str)) {
			selector = parse_spec(spec_str);
			if(selector === null) {
				throw new Error("Unrecognized format for state/transition spec.");
			}
		} else {
			selector = spec_str;
		}
		var listener = new StateListener(selector, callback, context);
		this._listeners.push(listener);
		return this;
	};

	/**
	 * Remove the listener specified by an on call; pass in just the callback
	 *
	 * @method off
	 * @param {function} callback - The function to remove as a callback
	 * @return {FSM} - `this`
	 *
	 * @see FSM.prototype.on
	 */
	proto.off = proto.removeEventListener = function(listener_callback) {
		this._listeners = filter(this._listeners, function(listener) {
			return listener.callback !== listener_callback;
		});
		return this;
	};
}(FSM));
/** @lends */

extend(cjs, {
	/** @expose cjs.FSM */
	FSM: FSM,
	/**
	 * @method cjs.fsm
	 * @constructs FSM
	 * @param {...string} state_names - An initial set of state names to add to the FSM
	 * @return {FSM} - A new FSM
	 * @see FSM
	 * #example Creating a state machine with two states
	 *
	 *     var my_state = cjs.fsm("state1", "state2");
	 */
	fsm: function() { return new FSM(arguments); },
	/**
	 * Determine whether an object is an FSM
	 * @method cjs.isFSM
	 * @param {*} obj - An object to check
	 * @return {boolean} - `true` if `obj` is an `FSM`, `false` otherwise
	 */
	isFSM: function(obj) { return obj instanceof FSM; }
});

var CJSEvent = function(parent, filter, onAddTransition, onRemoveTransition) {
	this._listeners = []; // parent events that want to know when I fire
	this._transitions = []; // a list of transitions that I'm attached to
	this._on_add_transition = onAddTransition; // optional listener for when a transition is added
	this._on_remove_transition = onRemoveTransition; // optional listener for when a transition is removed
	this._live_fns = {}; // one per transitions
	if(parent) {
		parent._listeners.push({event:this, filter: filter}); // add an item to my parent's listener if i have a parent
	}
};

(function(my) {
	/** @lends cjs.CJSEvent.prototype */
	var proto = my.prototype;

	/**
	 * Create a transition that calls filter whenever it fires to ensure that it should fire
	 *
	 * @method guard
	 * @param {function} [filter] - Returns `true` if the event should fire and false otherwise
	 * @return {CJSEvent} A new event that only fires when `filter` returns a truthy value
	 * @example If the user clicks and `ready` is `true`
	 *
	 *     cjs.on("click").guard(function() {
	 *         return ready === true;
	 *     });
	 */
	proto.guard = function(filter) {
		return new CJSEvent(this, filter);
	};

	/**
	 * Add a transition to my list of transitions that this event is attached to
	 *
	 * @private
	 * @method _addTransition
	 * @param {Transition} transition - The transition this event is attached to
	 */
	proto._addTransition = function(transition) {
		this._transitions.push(transition);
		if(this._on_add_transition) {
			this._live_fns[transition.id()] = this._on_add_transition(transition);
		}
	};

	/**
	 * Remove a transition from my list of transitions
	 *
	 * @private
	 * @method _removeTransition
	 * @param {Transition} transition - The transition this event is attached to
	 */
	proto._removeTransition = function(transition) {
		if(remove(this._transitions, transition)) {
			if(this._on_remove_transition) {
				this._on_remove_transition(transition);
			}

			// clear the live fn
			var tid = transition.id();
			this._live_fns[tid].destroy();
			delete this._live_fns[tid];
		}
	};

	/**
	 * When I fire, go through every transition I'm attached to and fire it then let any interested listeners know as well
	 *
	 * @private
	 * @method _fire
	 * @param {...*} events - Any number of events that will be passed to the transition
	 */
	proto._fire = function() {
		var events = arguments;
		each(this._transitions, function(transition) {
			transition.run.apply(transition, events);
		});
		each(this._listeners, function(listener_info) {
			var listener = listener_info.event,
				filter = listener_info.filter;

			if(!filter || filter.apply(root, events)) {
				listener._fire.apply(listener, events);
			}
		});
	};
}(CJSEvent));
/** @lends */

var isElementOrWindow = function(elem) { return elem === root || isElement(elem); },
	do_trim = function(x) { return x.trim(); },
	split_and_trim = function(x) { return map(x.split(" "), do_trim); },
	timeout_event_type = "timeout";

extend(cjs, {
	/** @expose cjs.CJSEvent */
	CJSEvent: CJSEvent,
	/**
	 * Create a new event for use in a finite state machine transition
	 *
	 * @constructs CJSEvent
	 * @method cjs.on
	 * @param {string} event_type - the type of event to listen for (e.g. mousedown, timeout)
	 * @param {...element|number} [target=window] - Any number of target objects to listen to
	 * @return {CJSEvent} - An event that can be attached to 
	 * @example When the window resizes
	 *
	 *     cjs.on("resize")
	 *
	 * @example When the user clicks `elem1` or `elem2`
	 *
	 *     cjs.on("click", elem1, elem2)
	 *
	 * @example After 3 seconds
	 *
	 *     cjs.on("timeout", 3000)
	 */
	on:	function(event_type) {
			var rest_args = arguments.length > 1 ? rest(arguments) : root,
				// no parent, no filter by default
				event = new CJSEvent(false, false, function(transition) {
					var targets = [],
						timeout_id = false,
						event_type_val = [],
						listener = bind(transition.run, transition),
						fsm = transition.getFSM(),
						from = transition.getFrom(),
						state_selector = new StateSelector(from),
						from_state_selector = new TransitionSelector(true, state_selector, new AnyStateSelector()),
						on_listener = function() {
							each(event_type_val, function(event_type) {
								// If the event is 'timeout'
								if(event_type === timeout_event_type) {
									// clear the previous timeout
									if(timeout_id) {
										cTO(timeout_id);
										timeout_id = false;
									}

									// and set a new one
									var delay = cjs.get(rest_args[0]);
									if(!isNumber(delay) || delay < 0) {
										delay = 0;
									}

									timeout_id = sTO(listener, delay);
								} else {
									each(targets, function(target) {
										// otherwise, add the event listener to every one of my targets
										target.addEventListener(event_type, listener);
									});
								}
							});
						},
						off_listener = function() {
							each(event_type_val, function(event_type) {
								each(targets, function(target) {
									if(event_type === timeout_event_type) {
										// If the event is 'timeout'
										if(timeout_id) {
											cTO(timeout_id);
											timeout_id = false;
										}
									} else {
										target.removeEventListener(event_type, listener);
									}
								});
							});
						},
						live_fn = cjs.liven(function() {
							off_listener();

							event_type_val = split_and_trim(cjs.get(event_type));
							// only use DOM elements (or the window) as my target
							targets = filter(get_dom_array(rest_args), isElementOrWindow);

							// when entering the state, add the event listeners, then remove them when leaving the state
							fsm	.on(state_selector, on_listener)
								.on(from_state_selector, off_listener);

							if(fsm.is(from)) {
								// if the FSM is already in the transition's starting state
								on_listener();
							}
						});
					return live_fn;
				});
			return event;
		}
});

// Based on [Mu's parser](https://github.com/raycmorgan/Mu) and
// John Resig's [HTML parser](http://erik.eae.net/simplehtmlparser/simplehtmlparser.js)
var makeMap = function(str){
	var obj = {};
	each(str.split(","), function(item) { obj[item] = true; });
	return obj;
};

// Regular Expressions for parsing tags and attributes
var startTag = /^<([\-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_\-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
	endTag = /^<\/([\-A-Za-z0-9_]+)[^>]*>/,
	handlebar = /^\{\{([#=!>|{\/])?\s*((?:(?:"[^"]*")|(?:'[^']*')|[^\}])*)\s*(\/?)\}?\}\}/,
	attr = /([\-A-Za-z0-9_]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g,
	HB_TYPE = "hb",
	HTML_TYPE = "html";
	
// Empty Elements - HTML 4.01
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed"),
// Block Elements - HTML 4.01
	block = makeMap("address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul"),
// Inline Elements - HTML 4.01
	inline = makeMap("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"),
// Elements that you can, intentionally, leave open (and which close themselves)
	closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"),
// Attributes that have their values filled in disabled="disabled"
	fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),
// Special Elements (can contain anything)
	special = makeMap("script,style");


// Dictates what parents children must have; state must be a direct descendent of diagram
var parent_rules = {
	"state": { parent: ["fsm"] },
	"elif": { parent: ["if"] },
	"else": { parent: ["if", "each"] }
};

var autoclose_nodes = {
	"elif": {
		when_open_sibling: ["elif", "else"]
	},
	"else": {
		when_close_parent: ["if", "each"]
	},
	"state": {
		when_open_sibling: ["state"]
	}
};

// elsif and else must come after either if or elsif
var sibling_rules = {
	"elif": {
		follows: ["elif"], //what it may follow
		or_parent: ["if"] //or the parent can be 'if'
	},
	"else": {
		follows: ["elif"],
		or_parent: ["if", "each"]
	},
	"state": {
		follows: ["state"],
		or_parent: ["fsm"]
	}
};

var parseTemplate = function(input_str, handler) {
	var html_index, hb_index, last_closed_hb_tag, index, chars, match, stack = [], last = input_str;
	stack.last = function() {
		return this[this.length - 1];
	};

	var replace_fn = function(all, text) {
		text = text	.replace(/<!--(.*?)-->/g, "$1")
					.replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");

		if (handler.chars) {
			handler.chars(text);
		}

		return "";
	};

	while (input_str) {
		chars = true;

		// Make sure we're not in a script or style element
		if (!stack.last() || !special[stack.last()]) {
			// Comment
			if (input_str.indexOf("<!--") === 0) {
				index = input_str.indexOf("-->");

				if (index >= 0) {
					if (handler.HTMLcomment) {
						handler.HTMLcomment( input_str.substring( 4, index ) );
					}
					input_str = input_str.substring( index + 3 );
					chars = false;
				}

			// end tag
			} else if (input_str.indexOf("</") === 0) {
				match = input_str.match(endTag);

				if (match) {
					input_str = input_str.substring(match[0].length);
					match[0].replace(endTag, parseEndTag);
					chars = false;
				}

			// start tag
			} else if(input_str.indexOf("<") === 0) {
				match = input_str.match(startTag);

				if (match) {
					input_str = input_str.substring(match[0].length);
					match[0].replace(startTag, parseStartTag);
					chars = false;
				}
			} else if(input_str.indexOf("{{") === 0) {
				match = input_str.match(handlebar);
				if(match) {
					input_str = input_str.substring(match[0].length);
					match[0].replace(handlebar, parseHandlebar);
					chars = false;
				}
			}

			if(chars) {
				html_index = input_str.indexOf("<");
				hb_index = input_str.indexOf("{{");

				if(html_index < 0) { index = hb_index; }
				else if(hb_index < 0) { index = html_index; }
				else { index = Math.min(html_index, hb_index); }
				
				var text = index < 0 ? input_str : input_str.substring(0, index);
				input_str = index < 0 ? "" : input_str.substring(index);
				
				handler.chars(text);
			}
		} else {
			input_str = input_str.replace(new RegExp("(.*)<\/" + stack.last() + "[^>]*>"), replace_fn);

			parseEndTag("", stack.last());
		}

		if (input_str == last) {
			throw new Error("Parse Error: " + input_str);
		}
		last = input_str;
	}
	
	// Clean up any remaining tags
	parseEndTag();

	function parseStartTag( tag, tagName, rest, unary ) {
		tagName = tagName.toLowerCase();

		if ( block[ tagName ] ) {
			while ( stack.last() && inline[ stack.last() ] ) {
				parseEndTag( "", stack.last() );
			}
		}

		if ( closeSelf[ tagName ] && stack.last() == tagName ) {
			parseEndTag( "", tagName );
		}

		unary = empty[ tagName ] || !!unary;

		if ( !unary ) {
			stack.push({type: HTML_TYPE, tag: tagName});
		}
		
		if (handler.startHTML) {
			var attrs = [];

			rest.replace(attr, function(match, name) {
				var value = arguments[2] ? arguments[2] :
					arguments[3] ? arguments[3] :
					arguments[4] ? arguments[4] :
					fillAttrs[name] ? name : "";
				
				attrs.push({
					name: name,
					value: value,
					escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
				});
			});

			handler.startHTML(tagName, attrs, unary);
		}
	}

	function parseEndTag(tag, tagName) {
		popStackUntilTag(tagName, HTML_TYPE);
	}
	function getLatestHandlebarParent() {
		var i, stack_i;
		for(i = stack.length - 1; i>= 0; i--) {
			stack_i = stack[i];
			if(stack_i.type === HB_TYPE) {
				return stack_i;
			}
		}
		return undefined;
	}
	function parseHandlebar(tag, prefix, content) {
		var last_stack, tagName, parsed_content = jsep(content);

		if(parsed_content.type === COMPOUND) {
			if(parsed_content.body.length > 0 && parsed_content.body[0].type === IDENTIFIER) {
				tagName = parsed_content.body[0].name;
			}
		} else {
			if(parsed_content.type === IDENTIFIER) {
				tagName = parsed_content.name;
			}
		}

		switch (prefix) {
			case '{': // literal
				handler.startHB(tagName, parsed_content, true, true);
				break;
			case '>': // partial
				handler.partialHB(tagName, parsed_content);
				break;
			case '#': // start block
				last_stack = getLatestHandlebarParent();

				if(last_stack && has(autoclose_nodes, last_stack.tag)) {
					var autoclose_node = autoclose_nodes[last_stack.tag];
					if(autoclose_node.when_open_sibling.indexOf(tagName) >= 0) {
						popStackUntilTag(last_stack.tag, HB_TYPE);
						last_stack = getLatestHandlebarParent();
					}
				}

				if(has(parent_rules, tagName)) {
					var parent_rule = parent_rules[tagName];
					if(!last_stack || indexOf(parent_rule.parent, last_stack.tag)<0) {
						throw new Error("'" + tagName + "' must be inside of a '"+parent_rule.parent+"' block");
					}
				}

				if(has(sibling_rules, tagName)) {
					var sibling_rule = sibling_rules[tagName];
					if(sibling_rule.follows.indexOf(last_closed_hb_tag) < 0) {
						if(!sibling_rule.or_parent || sibling_rule.or_parent.indexOf(last_stack.tag) < 0) {
							var error_message = "'" + tagName + "' must follow a '" + sibling_rule.follows[0] + "'";
							if(sibling_rule.or_parent) {
								error_message += " or be inside of a '" + sibling_rule.or_parent[0] + "' tag";
							}
							throw new Error(error_message);
						}
					}
				}

				stack.push({type: HB_TYPE, tag: tagName});
				handler.startHB(tagName, parsed_content, false);
				break;

			case '/': // end block
				popStackUntilTag(tagName, HB_TYPE);
				break;
			case '!': // end block
				break;
			default: // unary
				handler.startHB(tagName, parsed_content, true, false);
				break;
		}
	}
	function popStackUntilTag(tagName, type) {
		var i, pos, stack_i;
		for (pos = stack.length - 1; pos >= 0; pos -= 1) {
			if(stack[pos].type === type && stack[pos].tag === tagName) {
				break;
			}
		}
		
		if (pos >= 0) {
			// Close all the open elements, up the stack
			for (i = stack.length - 1; i >= pos; i-- ) {
				stack_i = stack[i];
				if(stack_i.type === HB_TYPE) {
					if (handler.endHB) {
						handler.endHB(stack_i.tag);
					}
				} else {
					if (handler.endHTML) {
						handler.endHTML(stack_i.tag);
					}
				}
			}
			
			// Remove the open elements from the stack
			stack.length = pos;
		}

		if(type === HB_TYPE) {
			last_closed_hb_tag = tagName;
		}
	}
};

var child_is_dynamic_html		= function(child)	{ return child.type === "unary_hb" && child.literal; },
	child_is_text				= function(child)	{ return child.isText; },
	every_child_is_text			= function(arr)		{ return every(arr, child_is_text); },
	any_child_is_dynamic_html	= function(arr)		{ return indexWhere(arr, child_is_dynamic_html) >= 0; },
	escapeHTML = function (unsafe) {
		return unsafe	.replace(/&/g, "&amp;")	.replace(/</g, "&lt;")
						.replace(/>/g, "&gt;")	.replace(/"/g, "&quot;")
						.replace(/'/g, "&#039;");
	},
	compute_object_property = function(object, prop_node, context, lineage, curr_bindings) {
		return object ? object[prop_node.computed ? get_node_value(prop_node, context, lineage, curr_bindings) : prop_node.name] :
						undefined;
	},
	ELSE_COND = {},
	first_body = function(node) {
		return node.type === COMPOUND ? node.body[0] : node;
	},
	rest_body = function(node) {
		return {type: COMPOUND,
				body: node.type === COMPOUND ? rest(node.body) : [] };
	},
	get_instance_node = function(c) { return c.node || c.getNodes(); },
	get_node_value = function(node, context, lineage, curr_bindings) {
		var op, object, call_context, args;
		if(!node) { return; }
		switch(node.type) {
			case THIS_EXP: return cjs.get(last(lineage).this_exp);
			case LITERAL: return node.value;
			case UNARY_EXP:
				op = unary_operators[node.operator];
				return op ? op(get_node_value(node.argument, context, lineage, curr_bindings)) :
							undefined;
			case BINARY_EXP:
			case LOGICAL_EXP:
				op = binary_operators[node.operator];
				return op ? op(get_node_value(node.left, context, lineage, curr_bindings), get_node_value(node.right, context, lineage, curr_bindings)) :
							undefined;
			case IDENTIFIER:
				if(node.name[0] === "@") {
					var name = node.name.slice(1);
					for(var i = lineage.length-1; i>=0; i--) {
						object = lineage[i].at;
						if(object && has(object, name)) {
							return cjs.get(object[name]);
						}
					}
					return undefined;
				}
				return cjs.get(context[node.name]);
			case MEMBER_EXP:
				object = get_node_value(node.object, context, lineage, curr_bindings);
				return compute_object_property(object, node.property, context, lineage, curr_bindings);
			case COMPOUND:
				return get_node_value(node.body[0], context, lineage, curr_bindings);
			case CURR_LEVEL_EXP:
				object = last(lineage).this_exp;
				return compute_object_property(object, node.argument, context, lineage, curr_bindings);
			case PARENT_EXP:
				object = (lineage && lineage.length > 1) ? lineage[lineage.length - 2].this_exp : undefined;
				return compute_object_property(object, node.argument, context, lineage, curr_bindings);
			case CALL_EXP:
				if(node.callee.type === MEMBER_EXP) {
					call_context = get_node_value(node.callee.object, context, lineage, curr_bindings);
					object = compute_object_property(call_context, node.callee.property, context, lineage, curr_bindings);
				} else {
					call_context = root;
					object = get_node_value(node.callee, context, lineage, curr_bindings);
				}

				if(object && isFunction(object)) {
					args = map(node['arguments'], function(arg) {
						return get_node_value(arg, context, lineage, curr_bindings);
					});
					return object.apply(call_context, args);
				}
		}
	},
	create_node_constraint = function(node, context, lineage, curr_bindings) {
		var args = arguments;
		if(node.type === LITERAL) {
			return get_node_value.apply(root, args);
		}
		return cjs(function() {
			return get_node_value.apply(root, args);
		});
	},
	get_escaped_html = function(c) {
		if(c.nodeType === 3) {
			return escapeHTML(c.textContent);
		} else {
			return escapeHTML(c.outerHTML);
		}
	},
	get_concatenated_inner_html_constraint = function(children, context, lineage, curr_bindings) {
		var args = arguments;
		return cjs(function() {
			return map(children, function(child) {
				if(child.type === "unary_hb") {
					if(child.literal) {
						return get_node_value(child.val, context, lineage);
					} else {
						return escapeHTML(get_node_value(child.val, context, lineage));
					}
				} else {
					var child_val = get_instance_node(child);

					if(isArray(child_val)) {
						return map(child_val, get_escaped_html).join("");
					} else {
						return get_escaped_html(child_val);
					}
				}
			}).join("");
		});
	},
	get_concatenated_children_constraint = function(children, args) {
		return cjs(function() {
					var rv = [];
					each(children, function(child) {
						var c_plural = get_instance_node(child);
						if(isArray(c_plural)) {
							rv.push.apply(rv, c_plural);
						} else {
							rv.push(c_plural);
						}
					});
					return rv;
				});
	},
	hb_regex = /^\{\{([\-A-Za-z0-9_]+)\}\}/,
	get_constraint = function(str, context, lineage, curr_bindings) {
		var has_constraint = false,
			strs = [],
			index, match_val, len, context_val;
		while(str.length > 0) {
			index =  str.indexOf("{");
			if(index < 0) {
				strs.push(str);
				break;
			} else {
				match_val = str.match(hb_regex);
				if(match_val) {
					len = match_val[0].length;
					context_val = context[match_val[1]];
					str = str.substr(len);
					strs.push(context_val);

					if(!has_constraint && (is_constraint(context_val) || is_array(context_val))) {
						has_constraint = true;
					}
				} else {
					strs.push(str.substr(0, index));
					str = str.substr(index);
				}
			}
		}

		if(has_constraint) {
			return cjs(function() {
				return map(strs, function(str) {
					if(is_constraint(str)) {
						return str.get();
					} else if(is_array(str)) {
						return str.join(" ");
					} else {
						return "" + str;
					}
				}).join("");
			});
		} else {
			return strs.join("");
		}
	},
	array_this_eq = function(a, b) {
		return a.length === b.length && every(a, function(ai, i) { return ai.this_esp === b[i].this_esp; });
	},
	IS_OBJ = {},
	map_aware_array_eq = function(a, b) {
		return a === b || (a && a.is_obj === IS_OBJ && a.key === b.key && a.value === b.value);
	},
	name_regex = /^(data-)?cjs-out$/,
	on_regex = /^(data-)?cjs-on-(\w+)$/,
	create_template = function(template_str) {
		var root = {
			children: [],
			type: "root"
		}, stack = [root],
		last_pop = false, has_container = false, fsm_stack = [], condition_stack = [];

		parseTemplate(template_str, {
			startHTML: function(tag, attributes, unary) {
				last_pop = {
					type: "html",
					tag: tag,
					attributes: attributes,
					unary: unary,
					children: []
				};

				last(stack).children.push(last_pop);

				if(!unary) {
					stack.push(last_pop);
				}
			},
			endHTML: function(tag) {
				last_pop = stack.pop();
			},
			HTMLcomment: function(str) {
				last_pop = {
					type: "comment",
					str: str
				};
				last(stack).children.push(last_pop);
			},
			chars: function(str) {
				last_pop = {
					type: "chars",
					str: str
				};
				last(stack).children.push(last_pop);
			},
			startHB: function(tag, parsed_content, unary, literal) {
				if(unary) {
					last_pop = {
						type: "unary_hb",
						parsed_content: parsed_content,
						literal: literal,
						tag: tag
					};

					last(stack).children.push(last_pop);
				} else {
					var push_onto_children = true;

					last_pop = {
						type: "hb",
						tag: tag,
						children: []
					};
					switch(tag) {
						case "each":
							last_pop.parsed_content = rest_body(parsed_content);
							last_pop.else_child = false;
							break;
						case "unless":
						case "if":
							last_pop.reverse = tag === "unless";
							last_pop.sub_conditions = [];
							last_pop.condition = rest_body(parsed_content);
							condition_stack.push(last_pop);
							break;
						case "elif":
						case "else":
							push_onto_children = false;
							var last_stack = last(stack);
							if(last_stack.type === "hb" && last_stack.tag === "each") {
								last_stack.else_child = last_pop;
							} else {
								last(condition_stack).sub_conditions.push(last_pop);
							}
							last_pop.condition = tag === "else" ? ELSE_COND : rest_body(parsed_content);
							break;
						case "each":
						case "fsm":
							last_pop.fsm_target = rest_body(parsed_content);
							last_pop.sub_states = {};
							fsm_stack.push(last_pop);
							break;
						case "state":
							var state_name = parsed_content.body[1].name;
							last(fsm_stack).sub_states[state_name] = last_pop;
							push_onto_children = false;
							break;
						case "with":
							last_pop.content = rest_body(parsed_content);
							break;
					}
					if(push_onto_children) {
						last(stack).children.push(last_pop);
					}
					stack.push(last_pop);
				}
			},
			endHB: function(tag) {
				switch(tag) {
					case "if":
					case "unless":
						condition_stack.pop();
						break;
					case "fsm":
						fsm_stack.pop();
				}
				stack.pop();
			},
			partialHB: function(tagName, parsed_content) {
				last_pop = {
					type: "partial_hb",
					tag: tagName,
					content: rest_body(parsed_content)
				};

				last(stack).children.push(last_pop);
			}
		});
		return root;
	},
	call_each = function(arr, prop_name) {
		each(arr, function(x) {
			if(has(x, prop_name)) {
				x[prop_name]();
			}
		});
	},
	create_template_instance = function(template, context, lineage, parent_dom_node) {
		var type = template.type,
			instance_children,
			element;

		if(type === "chars") {
			return {type: type, node: doc.createTextNode(template.str) };
		} else if(type === "root" || type === "html") {
			var args = arguments,
				on_regex_match;
			instance_children = map(template.children, function(child) {
				return create_template_instance(child, context, lineage);
			});

			if(type === "root") {
				if(parent_dom_node) {
					element = parent_dom_node;
				} else if(instance_children.length === 1 && template.children[0].type === "html") {
					return instance_children[0];
				} else {
					element = doc.createElement("span");
				}
			} else {
				element = doc.createElement(template.tag);
			}

			var bindings = [];

			each(template.attributes, function(attr) {
				if(attr.name.match(name_regex)) {
					context[attr.value] = getInputValueConstraint(element);
				} else if((on_regex_match = attr.name.match(on_regex))) {
					var event_name = on_regex_match[2];
					element.addEventListener(event_name, context[attr.value]);
				} else {
					var constraint = get_constraint(attr.value, context, lineage);
					if(is_constraint(constraint)) {
						bindings.push(attr_binding(element, attr.name, constraint));
					} else {
						element.setAttribute(attr.name, constraint);
					}
				}
			});

			if(any_child_is_dynamic_html(template.children)) { // this is where it starts to suck...every child's innerHTML has to be taken and concatenated
				var concatenated_html = get_concatenated_inner_html_constraint(instance_children, context, lineage);
				bindings.push(concatenated_html, html_binding(element, concatenated_html));
			} else {
				var children_constraint = get_concatenated_children_constraint(instance_children, args);
				bindings.push(children_constraint, children_binding(element, children_constraint));
			}

			return {
				node: element,
				type: type,
				pause: function() {
					call_each(instance_children.concat(bindings), "pause");
				},
				resume: function() {
					call_each(instance_children.concat(bindings), "resume");
				},
				destroy: function() {
					call_each(instance_children.concat(bindings), "destroy");
				}
			};
		} else if(type === "unary_hb") {
			var textNode, parsed_elem = first_body(template.parsed_content),
				literal = template.literal,
				val_constraint = cjs(function() {
					return get_node_value(parsed_elem, context, lineage);
				}),
				node, txt_binding;
			if(!literal) {
				node = doc.createTextNode("");
				txt_binding = cjs.text(node, val_constraint);
			}
			return {
				type: type,
				literal: template.literal,
				val: parsed_elem,
				node: node,
				destroy: function() { if(txt_binding) txt_binding.destroy(true); },
				pause: function() { if(txt_binding) txt_binding.pause(); },
				resume: function() { if(txt_binding) txt_binding.resume(); },
			};
		} else if (type === "hb") {
			var tag = template.tag;
			if(tag === "each") {
				var old_arr_val = [], arr_val, lastLineages = [], child_vals = [];
				return {
					type: type,
					getNodes: function() {
						arr_val = get_node_value(template.parsed_content, context, lineage);
						if(!isArray(arr_val)) {
							// IS_OBJ provides a way to ensure the user didn't happen to pass in a similarly formatted array
							arr_val = map(arr_val, function(v, k) { return { key: k, value: v, is_obj: IS_OBJ }; });
						} else if(arr_val.length === 0 && template.else_child) {
							arr_val = [ELSE_COND];
						}

						var diff = get_array_diff(old_arr_val, arr_val, map_aware_array_eq),
							rv = [];
						each(diff.index_changed, function(ic_info) {
							var lastLineageItem = lastLineages[ic_info.from];
							if(lastLineageItem && lastLineageItem.at && lastLineageItem.at.index) {
								lastLineageItem.at.index.set(ic_info.to);
							}
						});
						each(diff.removed, function(removed_info) {
							var index = removed_info.from,
								lastLineageItem = lastLineages[index];
							child_vals.splice(index, 1);
							if(lastLineageItem && lastLineageItem.at) {
								each(lastLineageItem.at, function(v) {
									v.destroy(true);
								});
							}
						});
						each(diff.added, function(added_info) {
							var v = added_info.item,
								index = added_info.to,
								is_else = v === ELSE_COND,
								lastLineageItem = is_else ? false : {this_exp: v, at: ((v && v.is_obj === IS_OBJ) ? {key: cjs(v.key)} : { index: cjs(index)})},
								concated_lineage = is_else ? lineage : lineage.concat(lastLineageItem),
								vals = map(is_else ? template.else_child.children : template.children, function(child) {
									var dom_child = create_template_instance(child, context, concated_lineage);
									return get_instance_node(dom_child);
								});
							child_vals.splice(index, 0, vals);
							lastLineages.splice(index, 0, lastLineageItem);
						}, this);
						each(diff.moved, function(moved_info) {
							var from_index = moved_info.from_index,
								to_index = moved_info.to_index,
								dom_elem = mdom[from_index],
								lastLineageItem = lastLineages[from_index];

							child_vals.splice(from_index, 1);
							child_vals.splice(to_index, 0, dom_elem);
							lastLineages.splice(from_index, 1);
							lastLineages.splice(to_index, 0, lastLineageItem);
						});
						old_arr_val = arr_val;
						return flatten(child_vals, true);
					}
				};
			} else if(tag === "if" || tag === "unless") {
				instance_children = [];
				return {
					type: type,
					getNodes: function() {
						var len = template.sub_conditions.length,
							cond = !!get_node_value(template.condition, context, lineage),
							i = -1, children, memo_index;

						if(template.reverse) {
							cond = !cond;
						}

						if(cond) {
							i = 0;
						} else if(len > 0) {
							for(i = 0; i<len; i++) {
								cond = template.sub_conditions[i];

								if(cond.condition === ELSE_COND || get_node_value(cond.condition, context, lineage)) {
									i++; break;
								}
							}
						}

						if(i < 0) {
							return [];
						} else {
							if(!instance_children[i]) {
								children = i===0 ? template.children : template.sub_conditions[i-1].children;
								instance_children[i] =  flatten(map(children, function(child) {
									return create_template_instance(child, context, lineage);
								}), true);
							}
							
							return map(instance_children[i], get_instance_node);
						}
					}
				};
			} else if(tag === "fsm") {
				var memoized_children = {};
				return {
					type: type,
					getNodes: function() {
						var fsm = get_node_value(template.fsm_target, context, lineage),
							state = fsm.getState(),
							do_child_create = function(child) {
								return create_template_instance(child, context, lineage);
							}, state_name;

						if(!lineage) {
							lineage = [];
						}

						for(state_name in template.sub_states) {
							if(template.sub_states.hasOwnProperty(state_name)) {
								if(state === state_name) {
									var children;
									if(has(memoized_children, state_name)) {
										children = memoized_children[state_name];
									} else {
										children = memoized_children[state_name] = flatten(map(template.sub_states[state_name].children, do_child_create), true);
									}
									return map(children, get_instance_node);
								}
							}
						}
						return [];
					}
				};
			} else if(tag === "with") {
				var new_context = get_node_value(template.content, context, lineage),
					new_lineage = lineage.concat({this_exp: new_context});

				instance_children = flatten(map(template.children, function(child) {
					return create_template_instance(child, new_context, new_lineage);
				}));
				return {
					node: map(instance_children, get_instance_node)
				};
			}
		} else if (type === "partial_hb") {
			var partial = partials[template.tag],
				concated_context = get_node_value(template.content, context, lineage),
				nodes = partial(concated_context);
			return {
				node: nodes,
				pause: function() { nodes.pause(); },
				destroy: function() { nodes.destroy(); },
				resume: function() { ndoes.resume(); }
			};
		} else if (type === "comment") {
			return {
				node: doc.createComment(template.str)
			};
		}
		return { node: [] };
	},
	partials = {},
	isPolyDOM = function(x) {
		return is_jquery_obj(x) || isNList(x) || isAnyElement(x);
	},
	getFirstDOMChild = function(x) {
		if(is_jquery_obj(x) || isNList(x))	{ return x[0]; }
		else if(isAnyElement(x))			{ return x; }
		else								{ return false; }
	},
	template_instance_nodes = [],
	template_instances = [],
	instance_id = 1,
	memoize_template = function(context, parent_dom_node) {
		var template = this,
			instance = create_template_instance(template, context, [{this_exp: context}], getFirstDOMChild(parent_dom_node)),
			node = instance.node,
			id = (instance.id = instance_id++);

		template_instances[id] = instance;
		template_instance_nodes[id] = node;
		node.setAttribute("data-cjs-template-instance", id);

		return node;
	},
	get_template_instance_index = function(dom_node) {
		var instance_id = dom_node.getAttribute("data-cjs-template-instance");
		if(!instance_id) {
			instance_id = indexOf(template_instance_nodes, dom_node);
		}
		return instance_id;
	},
	get_template_instance = function(dom_node) {
		var nodeIndex = get_template_instance_index(dom_node);
		return nodeIndex >= 0 ? template_instances[nodeIndex] : false;
	};

extend(cjs, {
	/**
	 * Create a new template. If `context` is specified, then this function returns a DOM node with the specified template.
	 * Otherwise, it returns a function that can be called with `context` and `[parent]` to create a new template.
	 *
	 * ConstraintJS templates use a (Handlebars)[http://handlebarsjs.com/]. A template can be created with
	 * `cjs.createTemplate`. The format is described below.
	 * 
	 * ## Basics
	 * ConstraintJS templates take standard HTML and add some features
	 *
	 * ### Constraints
	 * Unary handlebars can contain expressions.
	 *
	 *      <h1>{{title}}</h1>
	 *      <p>{{subtext.toUpperCase()+"!"}}</p>
	 *
	 * called with `{ title: cjs('hello'), subtext: 'world'}`:
	 *
	 *     <h1>hello</h1>
	 *     <p>WORLD!</p>
	 *
	 * ### Literals
	 * If the tags in a node should be treated as HTML, use triple braces: `{{{ literal_val }}}`.
	 *
	 *      <h1>{{title}}</h1>
	 *      <p>{{{subtext}}}</p>
	 *
	 * called with `{ title: cjs('hello'), subtext: '<strong>steel</strong city'}`:
	 *
	 *     <h1>hello</h1>
	 *     <p><strong>steel</strong> city</p>
	 *
	 *
	 * ## Comments
	 *
	 *     {{! comments will be ignored in the output}}
	 *
	 * ## Constraint output
	 *
	 * To call `my_func` on event `(event-name)`, give any targets the attribute:
	 *
	 *     data-cjs-on-(event-name)=my_func
	 * 
	 * For example:
	 *
	 *     <div data-cjs-on-click=update_obj />
	 * 
	 * Will call `update_obj` (a property of the template's context when this div is clicked.
	 *
	 * To add the value of an input element to the template's context, use the property `data-cjs-out`:
	 *
	 *     <input data-cjs-out=user_name />
	 *     <h1>Hello, {{user_name}}</h1>
	 *
	 * ## Block Helpers
	 *
	 * ### Loops
	 *
	 * To create an object for every item in an array or object, you can use the `{{#each}}` block helper.
	 * `{{this}}` refers to the current item and `@key` and `@index` refer to the keys for arrays and objects
	 * respectively.
	 *     {{#each obj_name}}
	 *         {{@key}}: {{this}
	 *     {{/each}}
	 *
	 *     {{#each arr_name}}
	 *         {{@index}}: {{this}
	 *     {{/each}}
	 *
	 * If the length of the array is zero (or the object has no keys) then an `{{#else}}` block can be used: 
	 *     
	 *     {{#each arr_name}}
	 *         {{@index}}: {{this}
	 *         {{#else}}
	 *             <strong>No items!</strong>
	 *     {{/each}}
	 *
	 * ### Conditions
	 * The `{{#if}}` block helper can vary the content of a template depending on some condition.
	 * This block helper can have any number of sub-conditions with the related `{{#elif}}` and `{{#else}}` tags.
	 *
	 *     {{#if cond1}}
	 *         Cond content
	 *     {{#elif other_cond}}
	 *         other_cond content
	 *     {{#else}}
	 *         else content
	 *     {{/if}}
	 *
	 * The opposite of an `{{#if}}` block is `{{#unless}}`:
	 *     {{#unless logged_in}}
	 *         Not logged in!
	 *     {{/unless}
	 *
	 * ### State
	 *
	 * The `{{#fsm}}` block helper can vary the content of a template depending on an FSM state
	 *
	 *     {{#fsm my_fsm}}
	 *         {{#state1}}
	 *             State1 content
	 *         {{#state2}}
	 *             State2 content
	 *         {{#state3}}
	 *             State3 content
	 *     {{/fsm}}
	 *
	 * ### With helper
	 *
	 * The `{{#with}}` block helper changes the context in which constraints are evaluated.
	 *
	 *     {{#with obj}}
	 *         Value: {{x}}
	 *     {{/with}}
	 *
	 * when called with `{ obj: {x: 1} }` results in `Value: 1`
	 *
	 * ## Partials
	 *
	 * Partials allow templates to be nested.
	 *
	 *     var my_temp = cjs.createTemplate(...);
	 *     cjs.registerPartial('my_template', my_temp);
	 * Then, in any other template,
	 *
	 *     {{>my_template context}}
	 * 
	 * Nests a copy of `my_template` in `context`
	 *
	 * @method cjs.createTemplate
	 * @param {string|dom} template - the template as either a string or a `script` tag whose contents are the template
	 * @param {object} [context] - Any number of target objects to listen to
	 * @param {dom} [parent] - The parent DOM node for the template
	 * @return {function|dom} - An event that can be attached to 
	 *
	 * @see cjs.destroyTemplate
	 * @see cjs.pauseTemplate
	 * @see cjs.resumeTemplate
	 *
	 * @example
	 *
	 *     <script id='my_template' type='cjs/template'>
	 *         {{x}}
	 *     </script>
	 *     var template_elem = document.getElementById('my_template');
	 *     var template = cjs.createTemplate(template_elem);
	 *     var element1 = template({x: 1});
	 *     var element2 = template({x: 2});
	 *
	 * @example
	 *
	 *     var element = cjs.createTemplate("{{x}}", {x: 1});
	 */
	createTemplate:		function(template_str) {
							if(!isString(template_str)) {
								if(is_jquery_obj(template_str) || isNList(template_str)) {
									template_str = template_str.length > 0 ? template_str[0].textContent.trim() : "";
								} else if(isElement(template_str)) {
									template_str = template_str.textContent.trim();
								} else {
									template_str = "" + template_str;
								}
							}

							var template = create_template(template_str);

							if(arguments.length >= 2) { // Create and use the template immediately
								return memoize_template.apply(template, rest(arguments));
							} else { // create the template as a function that can be called with a context
								return bind(memoize_template, template);
							}
						},
	/**
	 * Register a partial that can be used in other templates
	 *
	 * @method cjs.registerPartial
	 * @param {string} name - The name that this partial can be referred to as
	 * @param {Template} value - The template
	 * @return {cjs} - `cjs`
	 * @see cjs.unregisterPartial
	 */
	registerPartial:	function(name, value) { partials[name] = value; return this;},

	/**
	 * Unregister a partial for other templates
	 *
	 * @method cjs.unregisterPartial
	 * @param {string} name - The name of the partial
	 * @return {cjs} - `cjs`
	 * @see cjs.registerPartial
	 */
	unregisterPartial:	function(name) { delete partials[name]; return this;},

	/**
	 * Destroy a template instance
	 *
	 * @method cjs.destroyTemplate
	 * @param {dom} node - The dom node created by `createTemplate`
	 * @return {boolean} - Whether the template was successfully removed
	 * @see cjs.createTemplate
	 * @see cjs.pauseTemplate
	 * @see cjs.resumeTemplate
	 */
	destroyTemplate:	function(dom_node) {
							var index = get_template_instance_index(dom_node),
								instance = index >= 0 ? template_instances[index] : false;

							if(instance) {
								instance.destroy();
								delete template_instances[index];
							}
							return this;
						},

	/**
	 * Pause dynamic updates to a template
	 *
	 * @method cjs.pauseTemplate
	 * @param {dom} node - The dom node created by `createTemplate`
	 * @return {boolean} - Whether the template was successfully paused
	 * @see cjs.resumeTemplate
	 * @see cjs.createTemplate
	 * @see cjs.destroyTemplate
	 */
	pauseTemplate:		function(dom_node) {
							var instance = get_template_instance(dom_node);
							if(instance) { instance.pause(); }
							return this;
						},

	/**
	 * Resume dynamic updates to a template
	 *
	 * @method cjs.resumeTemplate
	 * @param {dom} node - The dom node created by `createTemplate`
	 * @return {boolean} - Whether the template was successfully resumed
	 * @see cjs.pauseTemplate
	 * @see cjs.createTemplate
	 * @see cjs.destroyTemplate
	 */
	resumeTemplate:		function(dom_node) {
							var instance = get_template_instance(dom_node);
							if(instance) { instance.resume(); }
							return this;
						}
});

// Expression parser
// -----------------
// Uses [jsep](http://jsep.from.so/)

// This is the full set of types that any JSEP node can be.
// Store them here to save space when minified
var COMPOUND = 'Compound',
	IDENTIFIER = 'Identifier',
	MEMBER_EXP = 'MemberExpression',
	LITERAL = 'Literal',
	THIS_EXP = 'ThisExpression',
	CALL_EXP = 'CallExpression',
	UNARY_EXP = 'UnaryExpression',
	BINARY_EXP = 'BinaryExpression',
	LOGICAL_EXP = 'LogicalExpression',
	PARENT_EXP = 'ParentExpression',
	CURR_LEVEL_EXP = 'CurrLevelExpression',

jsep = (function() {
	// Operations
	// ----------
	
	// Set `t` to `true` to save space (when minified, not gzipped)
	var	t = true,
	// Use a quickly-accessible map to store all of the unary operators
	// Values are set to `true` (it really doesn't matter)
		unary_ops = {'-': t, '!': t, '~': t, '+': t},
	// Also use a map for the binary operations but set their values to their
	// binary precedence for quick reference:
	// see [Order of operations](http://en.wikipedia.org/wiki/Order_of_operations#Programming_language)
		binary_ops = {
			'||': 1, '&&': 2, '|': 3,  '^': 4,  '&': 5,
			'==': 6, '!=': 6, '===': 6, '!==': 6,
			'<': 7,  '>': 7,  '<=': 7,  '>=': 7, 
			'<<':8,  '>>': 8, '>>>': 8,
			'+': 9, '-': 9,
			'*': 10, '/': 10, '%': 10
		},
	// Get return the longest key length of any object
		getMaxKeyLen = function(obj) {
			var max_len = 0, len;
			for(var key in obj) {
				if((len = key.length) > max_len && obj.hasOwnProperty(key)) {
					max_len = len;
				}
			}
			return max_len;
		},
		max_unop_len = getMaxKeyLen(unary_ops),
		max_binop_len = getMaxKeyLen(binary_ops),
	// Literals
	// ----------
	// Store the values to return for the various literals we may encounter
		literals = {
			'true': true,
			'false': false,
			'null': null
		},
	// Except for `this`, which is special. This could be changed to something like `'self'` as well
		this_str = 'this',
	// Returns the precedence of a binary operator or `0` if it isn't a binary operator
		binaryPrecedence = function(op_val) {
			return binary_ops[op_val] || 0;
		},
	// Utility function (gets called from multiple places)
	// Also note that `a && b` and `a || b` are *logical* expressions, not binary expressions
		createBinaryExpression = function (operator, left, right) {
			var type = (operator === '||' || operator === '&&') ? LOGICAL_EXP : BINARY_EXP;
			return {
				type: type,
				operator: operator,
				left: left,
				right: right
			};
		},
		// `ch` is a character code in the next three functions
		isDecimalDigit = function(ch) {
			return (ch >= 48 && ch <= 57); // 0...9
		},
		isIdentifierStart = function(ch) {
			return (ch === 36) || (ch === 95) || // `$` and `_`
					(ch === 64) || // @
					(ch >= 65 && ch <= 90) || // A...Z
					(ch >= 97 && ch <= 122); // a...z
		},
		isIdentifierPart = function(ch) {
			return (ch === 36) || (ch === 95) || // `$` and `_`
					(ch >= 65 && ch <= 90) || // A...Z
					(ch >= 97 && ch <= 122) || // a...z
					(ch >= 48 && ch <= 57); // 0...9
		},

		// Parsing
		// -------
		// `expr` is a string with the passed in expression
		jsep = function(expr) {
			// `index` stores the character number we are currently at while `length` is a constant
			// All of the gobbles below will modify `index` as we move along
			var index = 0,
				length = expr.length,

				// Push `index` up to the next non-space character
				gobbleSpaces = function() {
					var ch = expr.charCodeAt(index);
					// space or tab
					while(ch === 32 || ch === 9) {
						ch = expr.charCodeAt(++index);
					}
				},

				// Search for the operation portion of the string (e.g. `+`, `===`)
				// Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
				// and move down from 3 to 2 to 1 character until a matching binary operation is found
				// then, return that binary operation
				gobbleBinaryOp = function() {
					gobbleSpaces();
					var biop, to_check = expr.substr(index, max_binop_len), tc_len = to_check.length;
					while(tc_len > 0) {
						if(binary_ops.hasOwnProperty(to_check)) {
							index += tc_len;
							return to_check;
						}
						to_check = to_check.substr(0, --tc_len);
					}
					return false;
				},

				// This function is responsible for gobbling an individual expression,
				// e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
				gobbleExpression = function() {
					var ch_i, node, biop, prec, stack, biop_info, left, right, i;

					// First, try to get the leftmost thing
					// Then, check to see if there's a binary operator operating on that leftmost thing
					left = gobbleToken();
					biop = gobbleBinaryOp();

					// If there wasn't a binary operator, just return the leftmost node
					if(!biop) {
						return left;
					}

					// Otherwise, we need to start a stack to properly place the binary operations in their
					// precedence structure
					biop_info = { value: biop, prec: binaryPrecedence(biop)};

					right = gobbleToken();
					if(!right) {
						throw new Error("Expected expression after " + biop + " at character " + index);
					}
					stack = [left, biop_info, right];

					// Properly deal with precedence using [recursive descent](http://www.engr.mun.ca/~theo/Misc/exp_parsing.htm)
					while((biop = gobbleBinaryOp())) {
						prec = binaryPrecedence(biop);

						if(prec === 0) {
							break;
						}
						biop_info = { value: biop, prec: prec };

						// Reduce: make a binary expression from the three topmost entries.
						while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
							right = stack.pop();
							biop = stack.pop().value;
							left = stack.pop();
							node = createBinaryExpression(biop, left, right);
							stack.push(node);
						}

						node = gobbleToken();
						if(!node) {
							throw new Error("Expected expression after " + biop + " at character " + index);
						}
						stack.push(biop_info);
						stack.push(node);
					}

					i = stack.length - 1;
					node = stack[i];
					while(i > 1) {
						node = createBinaryExpression(stack[i - 1].value, stack[i - 2], node); 
						i -= 2;
					}

					return node;
				},

				// An individual part of a binary expression:
				// e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
				gobbleToken = function() {
					var ch, curr_node, char, unop, to_check, tc_len;
					
					gobbleSpaces();
					ch = expr.charCodeAt(index);
					if(ch === 46 && expr.charCodeAt(index+1) === 47) {
							index += 2;
							return {
									type: CURR_LEVEL_EXP,
									argument: gobbleToken()
							};
					} else if(ch === 46 && expr.charCodeAt(index+1) === 46 && expr.charCodeAt(index+2) === 47) {
							index += 3;
							return {
									type: PARENT_EXP,
									argument: gobbleToken()
							};
					}

					if(isDecimalDigit(ch) || ch === 46) {
						// Char code 46 is a dot `.` which can start off a numeric literal
						return gobbleNumericLiteral();
					} else if(ch === 39 || ch === 34) {
						// Single or double quotes
						return gobbleStringLiteral();
					} else if(isIdentifierStart(ch)) {
						// `foo`, `bar.baz`
						return gobbleVariable();
					} else if(ch === 40) {
						// Open parentheses
						return gobbleGroup();
					} else {
						to_check = expr.substr(index, max_unop_len);
						tc_len = to_check.length;
						while(tc_len > 0) {
							if(unary_ops.hasOwnProperty(to_check)) {
								index += tc_len;
								return {
									type: UNARY_EXP,
									operator: to_check,
									argument: gobbleToken(),
									prefix: true
								};
							}
							to_check = to_check.substr(0, --tc_len);
						}
						
						return false;
					}
				},
				// Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
				// keep track of everything in the numeric literal and then calling `parseFloat` on that string
				gobbleNumericLiteral = function() {
					var number = '';
					while(isDecimalDigit(expr.charCodeAt(index))) {
						number += expr[index++];
					}

					if(expr[index] === '.') { // can start with a decimal marker
						number += expr[index++];

						while(isDecimalDigit(expr.charCodeAt(index))) {
							number += expr[index++];
						}
					}

					// Check to make sure this isn't a varible name that start with a number (123abc)
					if(isIdentifierStart(expr.charCodeAt(index))) {
						throw new Error('Variable names cannot start with a number (' +
									number + expr[index] + ') at character ' + index);
					}

					return {
						type: LITERAL,
						value: parseFloat(number),
						raw: number
					};
				},

				// Parses a string literal, staring with single or double quotes with basic support for escape codes
				// e.g. `"hello world"`, `'this is\nJSEP'`
				gobbleStringLiteral = function() {
					var str = '', quote = expr[index++], closed = false, ch;

					while(index < length) {
						ch = expr[index++];
						if(ch === quote) {
							closed = true;
							break;
						} else if(ch === '\\') {
							// Check for all of the common escape codes
							ch = expr[index++];
							switch(ch) {
								case 'n': str += '\n'; break;
								case 'r': str += '\r'; break;
								case 't': str += '\t'; break;
								case 'b': str += '\b'; break;
								case 'f': str += '\f'; break;
								case 'v': str += '\x0B'; break;
							}
						} else {
							str += ch;
						}
					}

					if(!closed) {
						throw new Error('Unclosed quote after "'+str+'"');
					}

					return {
						type: LITERAL,
						value: str,
						raw: quote + str + quote
					};
				},
				
				// Gobbles only identifiers
				// e.g.: `foo`, `_value`, `$x1`
				// Also, this function checs if that identifier is a literal:
				// (e.g. `true`, `false`, `null`) or `this`
				gobbleIdentifier = function() {
					var ch = expr.charCodeAt(index), start = index, identifier;

					if(isIdentifierStart(ch)) {
						index++;
					}

					while(index < length) {
						ch = expr.charCodeAt(index);
						if(isIdentifierPart(ch)) {
							index++;
						} else {
							break;
						}
					}
					identifier = expr.slice(start, index);

					if(literals.hasOwnProperty(identifier)) {
						return {
							type: LITERAL,
							value: literals[identifier],
							raw: identifier
						};
					} else if(identifier === this_str) {
						return { type: THIS_EXP };
					} else {
						return {
							type: IDENTIFIER,
							name: identifier
						};
					}
				},

				// Gobbles a list of arguments within the context of a function call. This function
				// also assumes that the `(` has already been gobbled.
				// e.g. `foo(bar, baz)` or `my_func()`
				gobbleArguments = function() {
					var ch_i, args = [], node;
					while(index < length) {
						gobbleSpaces();
						ch_i = expr[index];
						if(ch_i === ')') { // done parsing
							index++;
							break;
						} else if (ch_i === ',') { // between expressions
							index++;
						} else {
							node = gobbleExpression();
							if(!node || node.type === COMPOUND) {
								throw new Error('Expected comma at character ' + index);
							}
							args.push(node);
						}
					}
					return args;
				},

				// Gobble a non-literal variable name. This variable name may include properties
				// e.g. `foo`, `bar.baz`, `foo['bar'].baz`
				// It also gobbles function calls:
				// e.g. `Math.acos(obj.angle)`
				gobbleVariable = function() {
					var ch_i, node, old_index;
					node = gobbleIdentifier();
					gobbleSpaces();
					ch_i = expr[index];
					while(ch_i === '.' || ch_i === '[' || ch_i === '(') {
						if(ch_i === '.') {
							index++;
							gobbleSpaces();
							node = {
								type: MEMBER_EXP,
								computed: false,
								object: node,
								property: gobbleIdentifier()
							};
						} else if(ch_i === '[') {
							old_index = index;
							index++;
							node = {
								type: MEMBER_EXP,
								computed: true,
								object: node,
								property: gobbleExpression()
							};
							gobbleSpaces();
							ch_i = expr[index];
							if(ch_i !== ']') {
								throw new Error('Unclosed [ at character ' + index);
							}
							index++;
							gobbleSpaces();
						} else if(ch_i === '(') {
							// A function call is being made; gobble all the araguments
							index++;
							node = {
								type: CALL_EXP,
								'arguments': gobbleArguments(),
								callee: node
							};
						}
						gobbleSpaces();
						ch_i = expr[index];
					}
					return node;
				},

				// Responsible for parsing a group of things within paraenteses `()`
				// This function assumes that it needs to gobble the opening parenthesis
				// and then tries to gobble everything within that parenthesis, asusming
				// that the next thing it should see is the close parenthesis. If not,
				// then the expression probably doesn't have a `)`
				gobbleGroup = function() {
					index++;
					var node = gobbleExpression();
					gobbleSpaces();
					if(expr[index] === ')') {
						index++;
						return node;
					} else {
						throw new Error('Unclosed ( at character ' + index);
					}
				},
				nodes = [], ch_i, node;
				
			while(index < length) {
				ch_i = expr[index];

				// Expressions can be separated by semicolons, commas, or just inferred without any
				// separators
				if(ch_i === ';' || ch_i ===',') {
					index++; // ignore separators
				} else {
					// Try to gobble each expression individually
					if((node = gobbleExpression())) {
						nodes.push(node);
					// If we weren't able to find a binary expression and are out of room, then
					// the expression passed in probably has too much
					} else if(index < length) {
						throw new Error("Unexpected '"+expr[index]+"' at character " + index);
					}
				}
			}

			// If there's only one expression just try returning the expression
			if(nodes.length === 1) {
				return nodes[0];
			} else {
				return {
					type: COMPOUND,
					body: nodes
				};
			}
		};
	return jsep;
}());

return cjs;
}(this));

// Export for node
if (typeof module !== 'undefined' && module.exports) {
	/** @exports cjs */
	module.exports = cjs;
}
