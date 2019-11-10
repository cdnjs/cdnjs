/*! JsObservable v0.9.72 (Beta): http://jsviews.com/#jsobservable */
/*
 * Subcomponent of JsViews
 * Data change events for data-linking
 *
 * Copyright 2015, Boris Moore
 * Released under the MIT License.
 */

//jshint -W018, -W041

(function(factory) {
	// global var is the this object, which is window when running in the usual browser environment
	var global = (0, eval)('this'), // jshint ignore:line
		$ = global.jQuery;

	if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery"], factory); // Require jQuery
	} else if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory($)
			: function($) { // If no global jQuery, take jQuery passed as parameter: require("jsobservable")(jQuery)
				return factory($);
			};
	} else { // Browser using plain <script> tag
		factory(false);
	}
} (

// factory (for jsviews.js)
function($) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var global = (0, eval)('this'), // jshint ignore:line
	setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

$ = $ || global.jQuery;

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw "JsObservable requires jQuery"; // We require jQuery
}

var versionNumber = "v0.9.72",
	$observe, $observable,

	$views = $.views =
		$.views ||
		setGlobals && global.jsrender && jsrender.views || //jsrender was loaded before jquery.observable
		{ // jsrender not loaded so set up $.views and $.views.sub here, and merge back in jsrender if loaded afterwards
			jsviews: versionNumber,
			sub: {}
		},
	$sub = $views.sub,
	$isFunction = $.isFunction,
	$isArray = $.isArray,
	OBJECT = "object";
if (!$.observe) {

	var $eventSpecial = $.event.special,
		slice = [].slice,
		splice = [].splice,
		concat = [].concat,
		$expando = $.expando,
		PARSEINT = parseInt,
		rNotWhite = /\S+/g,
		propertyChangeStr = $sub.propChng = $sub.propChng || "propertyChange",// These two settings can be overridden on settings after loading
		arrayChangeStr = $sub.arrChng = $sub.arrChng || "arrayChange",        // jsRender, and prior to loading jquery.observable.js and/or JsViews
		cbBindingsStore = $sub._cbBnds = $sub._cbBnds || {},
		observeStr = propertyChangeStr + ".observe",
		observeObjKey = 1,
		observeCbKey = 1,
		observeInnerCbKey = 1,
		$hasData = $.hasData,
		$data = $.data,
		remove = {}, // flag for removeProperty

	//========================== Top-level functions ==========================

	getCbKey = function(cb) {
		return cb._cId = cb._cId || (".obs" + observeCbKey++);
	},

	ObjectObservable = function(data) {
		this._data = data;
		return this;
	},

	ArrayObservable = function(data) {
		this._data = data;
		return this;
	},

	wrapArray = function(data) {
		return $isArray(data)
			? [data]
			: data;
	},

	resolvePathObjects = function(paths, root, callback) {
		paths = paths
			? $isArray(paths)
				? paths
				: [paths]
			: [];

		var i, path,
			object = root,
			nextObj = object,
			l = paths && paths.length,
			out = [];

		for (i = 0; i < l; i++) {
			path = paths[i];
			if ($isFunction(path)) {
				out = out.concat(resolvePathObjects(path.call(root, root, callback), root));
				continue;
			} else if ("" + path !== path) {
				root = nextObj = path;
				if (nextObj !== object) {
					out.push(object = nextObj);
				}
				continue;
			}
			if (nextObj !== object) {
				out.push(object = nextObj);
			}
			out.push(path);
		}
		return out;
	},

	removeCbBindings = function(cbBindings, cbBindingsId) {
		// If the cbBindings collection is empty we will remove it from the cbBindingsStore
		for (var cb in cbBindings) {
			return;
		}
		cbBindingsStore[cbBindingsId] = undefined; // This binding collection is empty, so remove from store
	},

	onObservableChange = function(ev, eventArgs) {
		function isOb(val) {
			return typeof val === OBJECT && (paths[0] || allowArray && $isArray(val));
		}

		if (!(ev.data && ev.data.off)) {
			// Skip if !!ev.data.off: - a handler that has already been removed (maybe was on handler collection at call time - then removed by another handler)
			var allPath, filter, parentObs,
				oldValue = eventArgs.oldValue,
				value = eventArgs.value,
				ctx = ev.data,
				observeAll = ctx.observeAll,
				allowArray = !ctx.cb.noArray,
				paths = ctx.paths;

			if (ev.type === arrayChangeStr) {
				(ctx.cb.array || ctx.cb).call(ctx, ev, eventArgs); // If there is an arrayHandler expando on the regular handler, use it, otherwise use the regular handler for arrayChange events also - for example: $.observe(array, handler)
				// or observeAll() with an array in the graph. Note that on data-link bindings we ensure always to have an array handler - $.noop if none is specified e.g. on the data-linked tag.
			} else if (ctx.prop === eventArgs.path || ctx.prop === "*") {
				if (observeAll) {
					allPath = observeAll._path + "." + eventArgs.path;
					filter = observeAll.filter;
					parentObs = [ev.target].concat(observeAll.parents());

					if (isOb(oldValue)) {
						observe_apply(allowArray, observeAll.ns, [oldValue], paths, ctx.cb, true, filter, [parentObs], allPath); // unobserve
					}
					if (isOb(value)) {
						observe_apply(allowArray, observeAll.ns, [value], paths, ctx.cb, undefined, filter, [parentObs], allPath);
					}
				} else {
					if (isOb(oldValue)) { // oldValue is an object, so unobserve
						observe_apply(allowArray, [oldValue], paths, ctx.cb, true); // unobserve
					}
					if (isOb(value)) { // value is an object, so observe
						observe_apply(allowArray, [value], paths, ctx.cb);
					}
				}
				ctx.cb(ev, eventArgs);
			}
		}
	},

	observe_apply = function() {
		// $.observe(), but allowing you to include arrays within the arguments - which you want flattened.
		var args = concat.apply([], arguments); // Flatten the arguments
		return $observe.apply(args.shift(), args);
	},

	$observeAll = function(namespace, cb, filter, unobserve) {
		if (namespace + "" !== namespace) {
			filter = cb;
			cb = namespace;
			namespace = "";
		}
		observeAll(namespace, this._data, cb, filter, [], "root", unobserve);
	},

	$unobserveAll = function(namespace, cb, filter) {
		$observeAll.call(this, namespace, cb, filter, true);
	},

	observeAll = function(namespace, object, cb, filter, parentObs, allPath, unobserve, objMap) {
		function observeArrayItems(arr, unobs) {
			l = arr.length;
			newAllPath = allPath + "[]";
			while (l--) {
				filterAndObserveAll(arr, l, unobs, 1);
			}
		}

		function filterAndObserveAll(obj, prop, unobs, nestedArray) {
			var newObject, newParentObs;
			if (prop !== $expando) {
				if (newObject = $observable._fltr(newAllPath, obj[prop], nextParentObs, filter)) {
					newParentObs = nextParentObs.slice();
					if (nestedArray && updatedTgt && newParentObs[0] !== updatedTgt) {
						newParentObs.unshift(updatedTgt); // For array change events when observing an array which is not the root, need to add updated array to parentObs
					}
					observeAll(namespace, newObject, cb, filter || (nestedArray ? undefined : 0), newParentObs, newAllPath, unobs, objMap);
					// If nested array, need to observe the array too - so set filter to undefined
				}
			}
		}

		function wrappedCb(ev, eventArgs) {
			// This object is changing.
			allPath = ev.data.observeAll._path;
			updatedTgt = ev.target;
			switch (eventArgs.change) { // observeAll/unobserveAll on added or removed objects
				case "insert":
					observeArrayItems(eventArgs.items);
					break;
				case "remove":
					observeArrayItems(eventArgs.items, true); // unobserveAll on removed items
					break;
				case "refresh":
					observeArrayItems(eventArgs.oldItems, true); // unobserveAll on old items
					observeArrayItems(ev.target); // observeAll on new items
					break;
				case "set":
					newAllPath = allPath + "." + eventArgs.path;
					filterAndObserveAll(eventArgs, "oldValue", true);
					filterAndObserveAll(eventArgs, "value");
			}
			updatedTgt = undefined;
			cb.apply(this, arguments); // Observe this object (invoke the callback)
		}

		var l, isObject, newAllPath, nextParentObs, updatedTgt, obId,
			notRemoving = !objMap || objMap.un || !unobserve; // true unless it is an observeAll call (not unobserveAll) and we are removing a listener (not adding one)

		if (object && typeof object === OBJECT) {
			nextParentObs = [object].concat(parentObs); // The parentObs chain for the next depth of observeAll
			isObject = $isArray(object) ? "" : "*";
			if (objMap && notRemoving && $hasData(object) && objMap[obId = $data(object).obId]) {
				objMap[obId]++;
				return; // This object has already being observed/unobserved by this observeAll/unobserveAll call (must be a cyclic object graph) so skip, to avoid
				// stack overflow/multiple instances of listener. See jsviews/pull/305
				// NOTE - WE DO NOT support ObserveAll on data with cyclic graphs which include DUPLICATE REFERENCES TO ARRAY PROPERTIES - such as data.children = data.descendants = []
			}
			if (!objMap) {
				objMap = {un: unobserve}; // Map object to register observed objects for this observeAll
			}

			if (cb) {
				// Observe this object or array - and also listen for changes to object graph, to add or remove observers from the modified object graph
				if (isObject || filter !== 0) {
					// If an object, observe the object. If an array, only add arrayChange binding if has filter or if filter is undefined (!== 0) - which
					// is the case for top-level calls or for nested array (array item of an array - e.g. member of 2-dimensional array).
					// For array properties lower in the tree, with no filter, filter is set to 0 in filterAndObserveAll, so no arrayChange binding here,
					// since they get arrayChange binding added during regular $.observe(array ...) binding.
					wrappedCb._cId = getCbKey(cb); // Identify wrapped callback with unwrapped callback, so unobserveAll will
													// remove previous observeAll wrapped callback, if inner callback was the same;
					if (notRemoving) {
						$observe(namespace, object, isObject, wrappedCb, unobserve, filter, nextParentObs, allPath);
						obId = $data(object).obId;
						objMap[obId] = (objMap[obId] || 0) + 1; // Register on map of objects observed/unobserved by this observeAll/unobserveAll call
							//- or remove from map if we are removing this object from observeAll call. (Avoid dups, for cyclic graphs)
					} else {
						if (--objMap[$data(object).obId]) {
							// Register on map of objects observed/unobserved by this observeAll/unobserveAll call
							//- or remove from map if we are removing this object from observeAll call. (Avoid dups, for cyclic graphs)
							return;
						}
						$observe(namespace, object, isObject, wrappedCb, unobserve, filter, nextParentObs, allPath);
					}
				}
			} else {
				// No callback. Just unobserve if unobserve === true.
				if (objMap) {
					objMap[$data(object).obId] = 1; // Register on map of objects unobserved by this unobserveAll call. (Avoid dups, for cyclic graphs)
				}
				$observe(namespace, object, isObject, undefined, unobserve, filter, nextParentObs, allPath);
			}

			if (isObject) {
				// Continue stepping through object graph, observing object and arrays
				// To override filtering, pass in filter function, or replace $.observable._fltr
				for (l in object) {
					newAllPath = allPath + "." + l;
					filterAndObserveAll(object, l, unobserve);
				}
			} else { // Observe items in Array
				observeArrayItems(object, unobserve);
			}
		}
	},

	shallowFilter = function(allPath /*, object, parentObs*/) {
		return allPath.indexOf(".") < 0 && allPath.indexOf("[") < 0;
	},

	$unobserve = function() {
		[].push.call(arguments, true); // Add true as additional final argument
		return $observe.apply(this, arguments);
	};

	$observe = function() {
		// $.observe([namespace, ]root, [1 or more objects, path or path Array params...], callback[, contextCallback][, unobserve])

		function innerObserve() {

			function observeOnOff(namespace, pathStr, isArrayBinding, off) {
				var j, evData,
					obIdExpando = $hasData(object),
					boundObOrArr = wrapArray(object),
					prntObs = parentObs,
					allPth = allPath;

				namespace = initialNs ? namespace + "." + initialNs : namespace;

				if (unobserve || off) {
					if (obIdExpando) {
						$(boundObOrArr).off(namespace, onObservableChange);
					}
				} else {
					if (events = obIdExpando && $._data(object)) {
						events = events && events.events;
						events = events && events[isArrayBinding ? arrayChangeStr : propertyChangeStr];
						el = events && events.length;

						while (el--) {
							if ((data = events[el].data) && data.cb && data.cb._cId === callback._cId && data.ns === initialNs) {
								if (isArrayBinding) {
									// Duplicate exists, so skip. (This can happen e.g. with {^{for people ~foo=people}})
									// or for cases with cyclic objects - e.g. obj.children = obj.descendants = []
									return;
								}
							}
						}
					}
					evData = isArrayBinding ? {}
						: {
							fullPath: path,
							paths: pathStr ? [pathStr] : [],
							prop: prop
						};
					evData.ns = initialNs;
					evData.cb = callback;

					if (allPath) {
						// This is an observeAll call
						evData.observeAll = {
							_path: allPth,
							path: function() { // Step through path and parentObs parent chain, replacing '[]' by '[n]' based on current index of objects in parent arrays.
								j = prntObs.length;
								return allPth.replace(/[[.]/g, function(all) {
									j--;
									return all === "["
										? "[" + $.inArray(prntObs[j - 1], prntObs[j])
										: ".";
								});
							},
							parents: function() {
								return prntObs; // The chain of parents between the modified object and the root object used in the observeAll() call
							},
							filter: filter,
							ns: initialNs
						};
					}
					$(boundObOrArr).on(namespace, null, evData, onObservableChange);
					if (cbBindings) {
						// Add object to cbBindings, and add the counter to the jQuery data on the object
						(cbBindingsStore[callback._cId] = cbBindings) // In some scenarios cbBindings was empty and removed
							//from store - so defensively add back to store, to ensure correct disposal e.g. when views are removed
							[$data(object).obId || $data(object, "obId", observeObjKey++)] = object;
					}
				}
			}

			function getInnerCb(exprOb) {
				// Returns the innerCb used for updating a computed in a compiled expression (setting the new instance as exprOb.ob, unobserving the previous object,
				// and observing the new one), then calling the outerCB - i.e. the handler for the whole compiled expression.
				// Initialized exprOb.ob to the current object.
				// Uses the contextCb callback to execute the compiled exprOb template in the context of the view/data etc. to get the returned value, typically an object or array.
				// If it is an array, registers array binding
				var origRt = root;
				// Note: For jsviews/issues/292 ctxCb will need var ctxCb = contextCb || function(exprOb, origRt) {return exprOb._jsv(origRt);};

				exprOb.ob = contextCb(exprOb, origRt); // Initialize object

				return exprOb.cb = function(ev, eventArgs) {
					var obj = exprOb.ob, // The old object
						sub = exprOb.sb,
						newObj = contextCb(exprOb, origRt);

					if (newObj !== obj) {
						if (typeof obj === OBJECT) {
							bindArray(obj, true);
							if (sub || allowArray && $isArray(obj)) {
								innerObserve([obj], sub, callback, contextCb, true); // unobserve on the old object
							}
						}
						exprOb.ob = newObj;
						// Put the updated object instance onto the exprOb in the paths array, so subsequent string paths are relative to this object
						if (typeof newObj === OBJECT) {
							bindArray(newObj);
							if (sub || allowArray && $isArray(newObj)) {
								// Register array binding
								innerObserve([newObj], sub, callback, contextCb);
							}
						}
					}
					// Call the outerCb - to execute the compiled expression that this computed is part of
					callback(ev, eventArgs);
				};
			}

			function bindArray(arr, unbind, isArray, relPath) {
				if (allowArray) {
					// This is a call to observe that does not come from observeAndBind (tag binding), so we allow arrayChange binding
					var prevObj = object,
						prevAllPath = allPath;

					object = arr;
					if (relPath) {
						object = arr[relPath];
						allPath += "." + relPath;
					}
					if (filter && object) {
						object = $observable._fltr(allPath, object, relPath ? [arr].concat(parentObs) : parentObs, filter);
					}
					if (object && (isArray || $isArray(object))) {
						observeOnOff(arrayChangeStr + ".observe" + (callback ? (cbId = getCbKey(callback)) : ""), undefined, true, unbind);
					}
					object = prevObj;
					allPath = prevAllPath;
				}
			}

			var i, p, skip, parts, prop, path, dep, unobserve, callback, cbId, el, data, events, contextCb, items, cbBindings, depth, innerCb, parentObs,
				allPath, filter, initNsArr, initNsArrLen,
				ns = observeStr,
				paths = this != 1 // Using != for IE<10 bug- see jsviews/issues/237
					? concat.apply([], arguments) // Flatten the arguments - this is a 'recursive call' with params using the 'wrapped array'
													// style - such as innerObserve([object], path.path, [origRoot], path.prm, innerCb, ...);
					: slice.call(arguments), // Don't flatten - this is the first 'top-level call, to innerObserve.apply(1, paths)
				lastArg = paths.pop() || false,
				root = paths.shift(),
				object = root,
				l = paths.length;

			if (lastArg + "" === lastArg) { // If last arg is a string then this observe call is part of an observeAll call,
				allPath = lastArg;          // and the last three args are the parentObs array, the filter, and the allPath string.
				parentObs = paths.pop();
				filter = paths.pop();
				lastArg = !!paths.pop(); // unobserve
				l -= 3;
			}
			if (lastArg === !!lastArg) {
				unobserve = lastArg;
				lastArg = paths[l-1];
				lastArg = l && lastArg + "" !== lastArg ? (l--, paths.pop()) : undefined;
			}
			callback = lastArg;
			if (l && $isFunction(paths[l - 1])) {
				contextCb = callback;
				callback = paths.pop();
				l--;
			}

			// Use a unique namespace (e.g. obs7) associated with each observe() callback to allow unobserve to remove handlers
			ns += unobserve
				? (callback ? callback._cId + (callback._inId || ""): "")
				: (cbId = getCbKey(callback)) + (callback._inId || "");
			if (!unobserve) {
				cbBindings = cbBindingsStore[cbId] = cbBindingsStore[cbId] || {};
			}

			initNsArr = initialNs && initialNs.match(rNotWhite) || [""];
			initNsArrLen = initNsArr.length;

			while (initNsArrLen--) {
				initialNs = initNsArr[initNsArrLen];

				if ($isArray(root)) {
					bindArray(root, unobserve, true);
				} else {
					// remove onObservableChange handlers that wrap that callback
					if (unobserve && l === 0 && root) {
						observeOnOff(ns, "");
					}
				}
				depth = 0;
				for (i = 0; i < l; i++) {
					path = paths[i];
					if (path === "" || path === undefined) {
						continue;
					}
					object = root;
					if ("" + path === path) {
						// Consider support for computed paths: jsviews/issues/292
						//if (/[\(\[\+]/.test(path)) {
						//	var b={links:{}}, t = $sub.tmplFn("{:"+path+"}", b, true), items = t.paths[0];
						//	l += items.length - 1;
						//	splice.apply(paths, [i--, 1].concat(items));
						//	continue;
						//}
						parts = path.split("^");
						if (parts[1]) {
							// We bind the leaf, plus additional nodes based on depth.
							// "a.b.c^d.e" is depth 2, so listens to changes of e, plus changes of d and of c
							depth = parts[0].split(".").length;
							path = parts.join(".");
							depth = path.split(".").length - depth;
							// if more than one ^ in the path, the first one determines depth
						}
						if (contextCb && (items = contextCb(path, root))) {
							// If contextCb returns an array of objects and paths, we will insert them
							// into the sequence, replacing the current item (path)
							l += items.length - 1;
							splice.apply(paths, [i--, 1].concat(items));
							continue;
						}
						parts = path.split(".");
					} else {
						if (!$isFunction(path)) {
							if (path && path._jsv) {
								// This is a compiled function for binding to an object returned by a helper/data function.
								// Set current object on exprOb.ob, and get innerCb for updating the object
								innerCb = unobserve ? path.cb : getInnerCb(path);
								innerCb.noArray = !allowArray;
								innerCb._cId = callback._cId;
								// Set the same cbBindingsStore key as for callback, so when callback is disposed, disposal of innerCb happens too.
								innerCb._inId = innerCb._inId || ".obIn" + observeInnerCbKey++;
								if (path.bnd || path.prm && path.prm.length || !path.sb) {
									// If the exprOb is bound e.g. foo()^sub.path, or has parameters e.g. foo(bar) or is a leaf object (so no sub path) e.g. foo()
									// then observe changes on the object, or its parameters and sub-path
									innerObserve([object], path.path, [origRoot], path.prm, innerCb, contextCb, unobserve);
								}
								if (path.sb) { // subPath
									innerObserve([path.ob], path.sb, callback, contextCb, unobserve);
								}
								path = origRoot;
								object = undefined;
							} else {
								object = path; // For top-level calls, objects in the paths array become the origRoot for subsequent paths.
							}
						}
						parts = [root = path];
					}
					while (object && (prop = parts.shift()) !== undefined) {
						if (typeof object === OBJECT) {
							if ("" + prop === prop) {
								if (prop === "") {
									continue;
								}
								if ((parts.length < depth + 1) && !object.nodeType) {
									// Add observer for each token in path starting at depth, and on to the leaf
									if (!unobserve && (events = $hasData(object) && $._data(object))) {
										events = events.events;
										events = events && events[propertyChangeStr];
										el = events && events.length;
										skip = 0;
										while (el--) { // Skip duplicates
											data = events[el].data;
											if (data
												&& data.cb._cId === callback._cId
												&& data.ns === initialNs
												&& !callback._inId // Don't skip if this is an innerCb for an object returned by a computed observable.
												&& (data.prop === prop || data.prop === "*" || data.prop === "**")) {
												if (p = parts.join(".")) {
													data.paths.push(p); // We will skip this binding, but if it is not a leaf binding,
													// need to keep bindings for rest of path, ready for if the object gets swapped.
												}
												skip++;
											}
										}
										if (skip) {
											// Duplicate binding(s) found, so move on
											object = object[prop];
											continue;
										}
									}
									if (prop === "*" || prop === "**") { // "*" => all properties. "**" => all properties and sub-properties (i.e. deep observeAll behavior)
										if (!unobserve && events && events.length) {
											// Remove existing bindings, since they will be duplicates with "*" or "**"
											observeOnOff(ns, "", false, true);
										}
										if (prop === "*") {
											observeOnOff(ns, ""); // observe the object for any property change
											for (p in object) {
												// observing "*": So (in addition to listening to prop change, above) listen to arraychange on props of type array
												if (p !== $expando) {
													bindArray(object, unobserve, undefined, p);
												}
											}
										} else {
											$.observable(object)[(unobserve ? "un" : "") + "observeAll"](callback); // observe or unobserve the object for any property change
										}
										break;
									} else if (prop) {
										observeOnOff(ns + "." + prop, parts.join("^")); // By using "^" rather than "." we ensure that deep binding will be used on newly inserted object graphs
									}
								}
								if (allPath) {
									allPath += "." + prop;
								}
								prop = object[prop];
							}
							if ($isFunction(prop)) {
								if (dep = prop.depends) {
									// This is a computed observable. We will observe any declared dependencies
									innerObserve([object], resolvePathObjects(dep, object, callback), callback, contextCb, unobserve);
								}
								break;
							}
							object = prop;
						}
					}
					bindArray(object, unobserve);
				}
			}
			if (cbId) {
				removeCbBindings(cbBindings, cbId);
			}

			// Return the cbBindings to the top-level caller, along with the cbId
			return { cbId: cbId, bnd: cbBindings };
		}

		var initialNs,
			allowArray = this != false, // If this === false, this is a call from observeAndBind - doing binding of datalink expressions. We don't bind
			// arrayChange events in this scenario. Instead, {^{for}} and similar do specific arrayChange binding to the tagCtx.args[0] value, in onAfterLink.
			// Note deliberately using this != false, rather than this !== false because of IE<10 bug- see jsviews/issues/237
			paths = slice.call(arguments),
			origRoot = paths[0];

		if (origRoot + "" === origRoot && allowArray) {
			initialNs = origRoot; // The first arg is a namespace, since it is a string, and this call is not from observeAndBind
			paths.shift();
			origRoot = paths[0];
		}

		return innerObserve.apply(1, paths);
	};

	$observable = function(data) {
		return $isArray(data)
			? new ArrayObservable(data)
			: new ObjectObservable(data);
	};

	//========================== Initialize ==========================

	$sub.getDeps = function() {
		var args = arguments;
		return function() {
			var arg, dep,
				deps = [],
				l = args.length;
			while (l--) {
				arg = args[l--];
				dep = args[l];
				if (dep) {
					deps = deps.concat($isFunction(dep) ? dep(arg, arg) : dep);
				}
			}
			return deps;
		};
	};

	$.observable = $observable;
	$observable._fltr = function(allPath, object, parentObs, filter) {
		if (filter && $isFunction(filter)
			? filter(allPath, object, parentObs)
			: true // TODO Consider supporting filter being a string or strings to do RegEx filtering based on key and/or allPath
		) {
			object = $isFunction(object)
				? object.set && object.call(parentObs[0]) // It is a getter/setter
				: object;
			return typeof object === OBJECT && object;
		}
	};

	$observable.Object = ObjectObservable;
	$observable.Array = ArrayObservable;
	$.observe = $observable.observe = $observe;
	$.unobserve = $observable.unobserve = $unobserve;
	$observable._apply = observe_apply;

	ObjectObservable.prototype = {
		_data: null,

		observeAll: $observeAll,
		unobserveAll: $unobserveAll,

		data: function() {
			return this._data;
		},

		setProperty: function(path, value, nonStrict) {
			var key, pair, parts,
				self = this,
				object = self._data;

			path = path || "";
			if (object) {
				if ($isArray(path)) {
					// This is the array format generated by serializeArray. However, this has the problem that it coerces types to string,
					// and does not provide simple support of convertTo and convertFrom functions.
					key = path.length;
					while (key--) {
						pair = path[key];
						self.setProperty(pair.name, pair.value, nonStrict === undefined || nonStrict); //If nonStrict not specified, default to true;
					}
				} else if ("" + path !== path) {
					// Object representation where property name is path and property value is value.
					for (key in path) {
						self.setProperty(key, path[key], nonStrict);
					}
				} else if (path !== $expando) {
					// Simple single property case.
					parts = path.split(".");
					while (object && parts.length > 1) {
						object = object[parts.shift()];
					}
					if (object) {
						self._setProperty(object, parts[0], value, nonStrict);
					}
				}
			}
			return self;
		},

		removeProperty: function(path) {
			this.setProperty(path, remove);
			return this;
		},

		_setProperty: function(leaf, path, value, nonStrict) {
			var setter, getter, removeProp,
				property = path ? leaf[path] : leaf;

			if ($isFunction(property)) {
				if (property.set) {
					// Case of property setter/getter - with convention that property is getter and property.set is setter
					leaf = leaf._wrp  // Case of JsViews 2-way data-linking to a helper function as getter, with a setter.
						// The view will be the this pointer for getter and setter. Note: this is the one scenario where path is "".
						|| leaf;
					getter = property;
					setter = getter.set === true ? getter : getter.set;
					property = getter.call(leaf); // get - only treated as getter if also a setter. Otherwise it is simply a property of type function. See unit tests 'Can observe properties of type function'.
				}
			}

			if (property !== value || nonStrict && property != value) { // Optional non-strict equality, since serializeArray, and form-based editors can map numbers to strings, etc.
				// Date objects don't support != comparison. Treat as special case.
				if (!(property instanceof Date) || property > value || property < value) {
					if (setter) {
						setter.call(leaf, value);	//set
						value = getter.call(leaf);	//get updated value
					} else if (removeProp = value === remove) {
						if (property !== undefined) {
							delete leaf[path];
							value = undefined;
						} else {
							path = undefined; // If value was already undefined, don't trigger handler for removeProp
						}
					} else if (path) {
						leaf[path] = value;
					}
					if (path) {
						this._trigger(leaf, {change: "set", path: path, value: value, oldValue: property, remove: removeProp});
					}
				}
			}
		},

		_trigger: function(target, eventArgs) {
			$(target).triggerHandler(propertyChangeStr, eventArgs);
		}
	};

	ArrayObservable.prototype = {
		_data: null,

		observeAll: $observeAll,
		unobserveAll: $unobserveAll,

		data: function() {
			return this._data;
		},

		insert: function(index, data) {
			var _data = this._data;
			if (arguments.length === 1) {
				data = index;
				index = _data.length;
			}
			index = PARSEINT(index);
			if (index > -1 && index <= _data.length) {
				data = $isArray(data) ? data : [data];
				// data can be a single item (including a null/undefined value) or an array of items.
				// Note the provided items are inserted without being cloned, as direct references to the provided objects

				if (data.length) {
					this._insert(index, data);
				}
			}
			return this;
		},

		_insert: function(index, data) {
			var _data = this._data,
				oldLength = _data.length;
			splice.apply(_data, [index, 0].concat(data));
			this._trigger({change: "insert", index: index, items: data}, oldLength);
		},

		remove: function(index, numToRemove) {
			var items,
				_data = this._data;

			if (index === undefined) {
				index = _data.length - 1;
			}

			index = PARSEINT(index);
			numToRemove = numToRemove ? PARSEINT(numToRemove) : numToRemove === 0 ? 0 : 1; // if null or undefined: remove 1
			if (numToRemove > -1 && index > -1) {
				items = _data.slice(index, index + numToRemove);
				numToRemove = items.length;
				if (numToRemove) {
					this._remove(index, numToRemove, items);
				}
			}
			return this;
		},

		_remove: function(index, numToRemove, items) {
			var _data = this._data,
				oldLength = _data.length;

			_data.splice(index, numToRemove);
			this._trigger({change: "remove", index: index, items: items}, oldLength);
		},

		move: function(oldIndex, newIndex, numToMove) {
			numToMove = numToMove ? PARSEINT(numToMove) : numToMove === 0 ? 0 : 1; // if null or undefined: move 1
			oldIndex = PARSEINT(oldIndex);
			newIndex = PARSEINT(newIndex);

			if (numToMove > 0 && oldIndex > -1 && newIndex > -1 && oldIndex !== newIndex) {
				var items = this._data.slice(oldIndex, oldIndex + numToMove);
				numToMove = items.length;
				if (numToMove) {
					this._move(oldIndex, newIndex, numToMove, items);
				}
			}
			return this;
		},

		_move: function(oldIndex, newIndex, numToMove, items) {
			var _data = this._data,
				oldLength = _data.length;
			_data.splice(oldIndex, numToMove);
			splice.apply(_data, [newIndex, 0].concat(items));
			this._trigger({change: "move", oldIndex: oldIndex, index: newIndex, items: items}, oldLength);
		},

		refresh: function(newItems) {
			var oldItems = this._data.slice();
			this._refresh(oldItems, newItems);
			return this;
		},

		_refresh: function(oldItems, newItems) {
			var _data = this._data,
				oldLength = _data.length;

			splice.apply(_data, [0, _data.length].concat(newItems));
			this._trigger({change: "refresh", oldItems: oldItems}, oldLength);
		},

		_trigger: function(eventArgs, oldLength) {
			var _data = this._data,
				length = _data.length,
				$_data = $([_data]);

			if (length !== oldLength) {
				$_data.triggerHandler(propertyChangeStr, {change: "set", path: "length", value: length, oldValue: oldLength});
			}
			$_data.triggerHandler(arrayChangeStr, eventArgs);
		}
	};

	$eventSpecial[propertyChangeStr] = $eventSpecial[arrayChangeStr] = {
		// Register a jQuery special 'remove' event, to access the data associated with handlers being removed by jQuery.off().
		// We get data.cb._cId from the event handleObj and get the corresponding cbBindings hash from the cbBindingsStore,
		// then remove this object from that bindings hash - if the object does not have any other handlers associated with the same callback.
		remove: function (handleObj) {
			var cbBindings, found, events, l, data,
				evData = handleObj.data;
			if ((evData) && (evData.off = true, evData = evData.cb)) { //Set off = true as marker for disposed event
				// Get the cb._cId from handleObj.data.cb._cId
				if (cbBindings = cbBindingsStore[evData._cId]) {
					// There were bindings for this callback. If this was the last one, we'll remove it.
					events = $._data(this).events[handleObj.type];
					l = events.length;
					while (l-- && !found) {
						found = (data = events[l].data) && data.cb && data.cb._cId === evData._cId;
						// Found another one with same callback (though may be a different innerCallback)
					}
					if (!found) {
						// This was the last handler for this callback and object, so remove the binding entry
						delete cbBindings[$data(this).obId];
						removeCbBindings(cbBindings, evData._cId);
					}
				}
			}
		}
	};

	$views.map = function(mapDef) {
		function Map(source, options, target, unbound) {
			var changing,
				map = this;
			if (this.src) {
				this.unmap(); // We are re-mapping a new source
			}
			if (typeof source === OBJECT) {
				map.src = source;
				map.tgt = target || map.tgt || [];
				map.options = options || map.options;
				map.update();
				if (!unbound) {
					if (mapDef.obsSrc) {
						$observable(map.src).observeAll(map.obs = function(ev, eventArgs) {
							if (!changing) {
								changing = true;
								mapDef.obsSrc(map, ev, eventArgs);
								changing = undefined;
							}
						}, map.srcFlt);
					}
					if (mapDef.obsTgt ) {
						$observable(map.tgt).observeAll(map.obt = function(ev, eventArgs) {
						if (!changing) {
							changing = true;
							mapDef.obsTgt(map, ev, eventArgs);
							changing = undefined;
						}
						}, map.tgtFlt);
					}
				}
			}
		}

		if ($isFunction(mapDef)) {
			// Simple map declared as function
			mapDef = {
				getTgt: mapDef
			};
		}

		if (mapDef.baseMap) {
			mapDef = $.extend({}, mapDef.baseMap, mapDef);
		}

		mapDef.map = function(source, options, target, unbound) {
			return new Map(source, options, target, unbound);
		};

		(Map.prototype = {
			srcFlt: mapDef.srcFlt || shallowFilter, // default to shallowFilter
			tgtFlt: mapDef.tgtFlt || shallowFilter,
			update: function(options) {
				var map = this;
				$observable(map.tgt).refresh(mapDef.getTgt(map.src, map.options = options || map.options));
			},
			unmap: function() {
				var map = this;
				if (map.src) {
					if (map.obs) {
						$observable(map.src).unobserveAll(map.obs, map.srcFlt);
					}
					if (map.obt) {
						$observable(map.tgt).unobserveAll(map.obt, map.tgtFlt);
					}
					map.src = undefined;
				}
			},
			map: Map,
			_def: mapDef
		}).constructor = Map;

		return mapDef;
	};
}

return $;
}));
