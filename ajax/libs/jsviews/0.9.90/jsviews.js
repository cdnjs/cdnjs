/*! jsviews.js v0.9.90 (Beta) single-file version: http://jsviews.com/ */
/*! includes JsRender, JsObservable and JsViews - see: http://jsviews.com/#download */

/* Interactive data-driven views using JsRender templates */

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsRender >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsRender:
 * See http://jsviews.com/#jsrender and http://github.com/BorisMoore/jsrender
 * Copyright 2017, Boris Moore
 * Released under the MIT License.
 */

//jshint -W018, -W041, -W120

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take jQuery passed as parameter: require("jsviews")(jQuery)
				return factory(global, $);
			};
	} else if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery"], function($) {
			return factory(global, $);
		}); // Require jQuery
	} else { // Browser using plain <script> tag
		factory(global, false);
	}
} (

// factory (for jsviews.js)
function(global, $) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

$ = $ || global.jQuery; // $ is jQuery passed in by CommonJS loader (Browserify), or global jQuery.

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw "JsViews requires jQuery"; // We require jQuery
}

var versionNumber = "v0.9.90",

	jsvStoreName, rTag, rTmplString, topView, $views, $observe, $observable, $expando,
	_ocp = "_ocp", // Observable contextual parameter

//TODO	tmplFnsCache = {},
	$isFunction, $isArray, $templates, $converters, $helpers, $tags, $sub, $subSettings, $subSettingsAdvanced, $viewsSettings, delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, setting, baseOnError,

	rPath = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
	//        not                               object     helper    view  viewProperty pathTokens      leafToken

	rParams = /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
	//          lftPrn0        lftPrn        bound            path    operator err                                                eq             path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot                           prn2  space
	// (left paren? followed by (path? followed by operator) or (path followed by left paren?)) or comma or apos or quot or right paren or space

	isRenderCall,
	rNewLine = /[ \t]*(\r\n|\n|\r)/g,
	rUnescapeQuotes = /\\(['"])/g,
	rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
	rBuildHash = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$_\.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,
	rTestElseIf = /^if\s/,
	rFirstElem = /<(\w+)[>\s]/,
	rAttrEncode = /[\x00`><"'&=]/g, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
	rIsHtml = /[\x00`><\"'&=]/,
	rHasHandlers = /^on[A-Z]|^convert(Back)?$/,
	rWrappedInViewMarker = /^\#\d+_`[\s\S]*\/\d+_`$/,
	rHtmlEncode = rAttrEncode,
	viewId = 0,
	charEntities = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\x00": "&#0;",
		"'": "&#39;",
		'"': "&#34;",
		"`": "&#96;",
		"=": "&#61;"
	},
	HTML = "html",
	OBJECT = "object",
	tmplAttr = "data-jsv-tmpl",
	jsvTmpl = "jsvTmpl",
	indexStr = "For #index in nested block use #getIndex().",
	$render = {},

	jsr = global.jsrender,
	jsrToJq = jsr && $ && !$.render, // JsRender already loaded, without jQuery. but we will re-load it now to attach to jQuery

	jsvStores = {
		template: {
			compile: compileTmpl
		},
		tag: {
			compile: compileTag
		},
		viewModel: {
			compile: compileViewModel
		},
		helper: {},
		converter: {}
	};

	// views object ($.views if jQuery is loaded, jsrender.views if no jQuery, e.g. in Node.js)
	$views = {
		jsviews: versionNumber,
		sub: {
			// subscription, e.g. JsViews integration
			View: View,
			Err: JsViewsError,
			tmplFn: tmplFn,
			parse: parseParams,
			extend: $extend,
			extendCtx: extendCtx,
			syntaxErr: syntaxError,
			onStore: {
				template: function(name, item) {
					if (item === null) {
						delete $render[name];
					} else {
						$render[name] = item;
					}
				}
			},
			addSetting: addSetting,
			settings: {
				allowCode: false
			},
			advSet: noop, // Update advanced settings
			_ths: tagHandlersFromProps,
			_gm: getMethod,
			_tg: function() {}, // Constructor for tagDef
			_cnvt: convertVal,
			_tag: renderTag,
			_er: error,
			_err: onRenderError,
			_cp: retVal, // Get observable contextual parameters (or properties) ~foo=expr. In JsRender, simply returns val.
			_sq: function(token) {
				if (token === "constructor") {
					syntaxError("");
				}
				return token;
			}
		},
		settings: {
			delimiters: $viewsDelimiters,
			advanced: function(value) {
				return value
					? (
							$extend($subSettingsAdvanced, value),
							$sub.advSet(),
							$viewsSettings
						)
						: $subSettingsAdvanced;
				}
		},
		map: dataMap    // If jsObservable loaded first, use that definition of dataMap
	};

function getDerivedMethod(baseMethod, method) {
	return function() {
		var ret,
			tag = this,
			prevBase = tag.base;

		tag.base = baseMethod; // Within method call, calling this.base will call the base method
		ret = method.apply(tag, arguments); // Call the method
		tag.base = prevBase; // Replace this.base to be the base method of the previous call, for chained calls
		return ret;
	};
}

function getMethod(baseMethod, method) {
	// For derived methods (or handlers declared declaratively as in {{:foo onChange=~fooChanged}} replace by a derived method, to allow using this.base(...)
	// or this.baseApply(arguments) to call the base implementation. (Equivalent to this._super(...) and this._superApply(arguments) in jQuery UI)
	if ($isFunction(method)) {
		method = getDerivedMethod(
				!baseMethod
					? noop // no base method implementation, so use noop as base method
					: baseMethod._d
						? baseMethod // baseMethod is a derived method, so use it
						: getDerivedMethod(noop, baseMethod), // baseMethod is not derived so make its base method be the noop method
				method
			);
		method._d = 1; // Add flag that this is a derived method
	}
	return method;
}

function tagHandlersFromProps(tag, tagCtx) {
	var prop,
		props = tagCtx.props;
	for (prop in props) {
		if (rHasHandlers.test(prop) && !(tag[prop] && tag[prop].fix)) { // Don't override handlers with fix expando (used in datepicker and spinner)
			tag[prop] = prop !== "convert" ? getMethod(tag.constructor.prototype[prop], props[prop]) : props[prop];
			// Copy over the onFoo props, convert and convertBack from tagCtx.props to tag (overrides values in tagDef).
			// Note: unsupported scenario: if handlers are dynamically added ^onFoo=expression this will work, but dynamically removing will not work.
		}
	}
}

function retVal(val) {
	return val;
}

function noop() {
	return "";
}

function dbgBreak(val) {
	// Usage examples: {{dbg:...}}, {{:~dbg(...)}}, {{dbg .../}}, {^{for ... onAfterLink=~dbg}} etc.
	try {
		console.log("JsRender dbg breakpoint: " + val);
		throw "dbg breakpoint"; // To break here, stop on caught exceptions.
	}
	catch (e) {}
	return this.base ? this.baseApply(arguments) : val;
}

function JsViewsError(message) {
	// Error exception type for JsViews/JsRender
	// Override of $.views.sub.Error is possible
	this.name = ($.link ? "JsViews" : "JsRender") + " Error";
	this.message = message || this.name;
}

function $extend(target, source) {
	if (target) {
		for (var name in source) {
			target[name] = source[name];
		}
		return target;
	}
}

(JsViewsError.prototype = new Error()).constructor = JsViewsError;

//========================== Top-level functions ==========================

//===================
// views.delimiters
//===================

function $viewsDelimiters(openChars, closeChars, link) {
	// Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
	// openChars, closeChars: opening and closing strings, each with two characters
	if (!openChars) {
		return $subSettings.delimiters;
	}
	if ($isArray(openChars)) {
		return $viewsDelimiters.apply($views, openChars);
	}

	$subSettings.delimiters = [openChars, closeChars, linkChar = link ? link.charAt(0) : linkChar];

	delimOpenChar0 = openChars.charAt(0); // Escape the characters - since they could be regex special characters
	delimOpenChar1 = openChars.charAt(1);
	delimCloseChar0 = closeChars.charAt(0);
	delimCloseChar1 = closeChars.charAt(1);
	openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1; // Default is "{^{"
	closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1;                   // Default is "}}"
	// Build regex with new delimiters
	//          [tag    (followed by / space or })  or cvtr+colon or html or code] followed by space+params then convertBack?
	rTag = "(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(\\w+)?(:)|(>)|(\\*))\\s*((?:[^\\"
		+ delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

	// Make rTag available to JsViews (or other components) for parsing binding expressions
	$sub.rTag = "(?:" + rTag + ")";
	//                        { ^? {   tag+params slash?  or closingTag                                                   or comment
	rTag = new RegExp("(?:" + openChars + rTag + "(\\/)?|\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1 + "(?:(?:\\/(\\w+))\\s*|!--[\\s\\S]*?--))" + closeChars, "g");

	// Default:  bind     tagName         cvt   cln html code    params            slash   bind2         closeBlk  comment
	//      /(?:{(\^)?{(?:(\w+(?=[\/\s}]))|(\w+)?(:)|(>)|(\*))\s*((?:[^}]|}(?!}))*?)(\/)?|{(\^)?{(?:(?:\/(\w+))\s*|!--[\s\S]*?--))}}

	$sub.rTmpl = new RegExp("^\\s|\\s$|<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
	// $sub.rTmpl looks for initial or final white space, html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}.
	// Each of these strings are considered NOT to be jQuery selectors
	return $viewsSettings;
}

//=========
// View.get
//=========

function getView(inner, type) { //view.get(inner, type)
	if (!type && inner !== true) {
		// view.get(type)
		type = inner;
		inner = undefined;
	}

	var views, i, l, found,
		view = this,
		root = !type || type === "root";
		// If type is undefined, returns root view (view under top view).

	if (inner) {
		// Go through views - this one, and all nested ones, depth-first - and return first one with given type.
		// If type is undefined, i.e. view.get(true), return first child view.
		found = type && view.type === type && view;
		if (!found) {
			views = view.views;
			if (view._.useKey) {
				for (i in views) {
					if (found = type ? views[i].get(inner, type) : views[i]) {
						break;
					}
				}
			} else {
				for (i = 0, l = views.length; !found && i < l; i++) {
					found = type ? views[i].get(inner, type) : views[i];
				}
			}
		}
	} else if (root) {
		// Find root view. (view whose parent is top view)
		found = view.root;
	} else {
		while (view && !found) {
			// Go through views - this one, and all parent ones - and return first one with given type.
			found = view.type === type ? view : undefined;
			view = view.parent;
		}
	}
	return found;
}

function getNestedIndex() {
	var view = this.get("item");
	return view ? view.index : undefined;
}

getNestedIndex.depends = function() {
	return [this.get("item"), "index"];
};

function getIndex() {
	return this.index;
}

getIndex.depends = "index";

//==========
// View.hlp
//==========

function contextParameter(key, value, isContextCb) {
	// Helper method called as view.ctxPrm(key) for helpers or template parameters ~foo - from compiled template or from context callback
	var wrapped, deps, res, obsCtxPrm,
		storeView = this,
		isUpdate = !isRenderCall && value !== undefined,
		store = storeView.ctx;

	if (key in store || key in (store = $helpers)) {
		res = store && store[key];
		if (key === "tag" || key === "root" || key === "parentTags" || storeView._.it === key ) {
			return res;
		}
	} else {
		store = undefined;
	}
	if (!res || !$isFunction(res) && storeView.linked || storeView.tagCtx) { // Data-linked view, or tag instance
		if (!res || !res._cxp) {
			// Not a contextual parameter
			if (store !== $helpers) {
				// Set storeView to tag (if this is a tag.ctxPrm() call) or to root view ("data" view of linked template)
				storeView = storeView.tagCtx
					? storeView // Is a tag, not a view
					: (storeView = storeView.scope || storeView, !storeView.isTop && storeView.ctx.tag || storeView);
				store = storeView._ocps;
				res = store && store[key] || res;
			}
			if (!(res && res._cxp) && (isContextCb || isUpdate)) {
				res = $sub._crcp(key, res, storeView, store); // Create observable contextual parameter
			}
		}
		if (obsCtxPrm = res && res._cxp) {
			if (isUpdate) {
				return $sub._ucp(key, value, storeView, obsCtxPrm); // Update observable contextual parameter
			}
			if (isContextCb) { // If this helper resource is an observable contextual parameter
				// In a context callback for a contextual param, return the [view, dependencies...] array - needed for observe call
				deps = res[1] ? $sub._ceo(res[1].deps) : [_ocp]; // fn deps (with any exprObs cloned using $sub._ceo)
				deps.unshift(res[0]); // view
				deps._cxp = obsCtxPrm;
				return deps;
			}
			res = res[1] // linkFn for compiled expression
				? obsCtxPrm.tag && obsCtxPrm.tag.cvtArgs
					? obsCtxPrm.tag.cvtArgs(true, obsCtxPrm.tagElse)[obsCtxPrm.ind] // = tag.bndArgs() - for tag contextual parameter
					: res[1](res[0].data, res[0], $sub)    // = fn(data, view, $sub) for compiled binding expression
				: res[0]._ocp; // Observable contextual parameter (uninitialized, or initialized as static expression, so no path dependencies)
		}
	}
	if (res && $isFunction(res)) {
		// If a helper is of type function, and not already wrapped, we will wrap it, so if called with no this pointer it will be called with the
		// view as 'this' context. If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
		// Note that helper functions on deeper paths will have specific this pointers, from the preceding path.
		// For example, ~util.foo() will have the ~util object as 'this' pointer
		wrapped = function() {
			return res.apply((!this || this === global) ? storeView : this, arguments);
		};
		$extend(wrapped, res); // Attach same expandos (if any) to the wrapped function
		wrapped._vw = storeView;
	}
	return wrapped || res;
}

function getTemplate(tmpl) {
	return tmpl && (tmpl.fn
		? tmpl
		: this.getRsc("templates", tmpl) || $templates(tmpl)); // not yet compiled
}

//==============
// views._cnvt
//==============

function convertVal(converter, view, tagCtx, onError) {
	// Called from compiled template code for {{:}}
	// self is template object or linkCtx object
	var tag, value, argsLen, bindTo,
		// If tagCtx is an integer, then it is the key for the compiled function to return the boundTag tagCtx
		boundTag = typeof tagCtx === "number" && view.tmpl.bnds[tagCtx-1],
		linkCtx = view.linkCtx; // For data-link="{cvt:...}"...

	if (onError === undefined && boundTag && boundTag._lr) { // lateRender
		onError = "";
	}
	if (onError !== undefined) {
		tagCtx = onError = {props: {}, args: [onError]};
	} else if (boundTag) {
		tagCtx = boundTag(view.data, view, $sub);
	}
	boundTag = boundTag._bd && boundTag;
	value = tagCtx.args[0];
	if (converter || boundTag) {
		tag = linkCtx && linkCtx.tag;
		tagCtx.view = view;
		if (!tag) {
			tag = $extend(new $sub._tg(), {
				_: {
					bnd: boundTag,
					unlinked: true
				},
				inline: !linkCtx,
				tagName: ":",
				convert: converter,
				flow: true,
				tagCtx: tagCtx
			});
			argsLen = tagCtx.args.length;
			if (argsLen>1) {
				bindTo = tag.bindTo = [];
				while (argsLen--) {
					bindTo.unshift(argsLen); // Bind to all the arguments - generate bindTo array: [0,1,2...]
				}
			}
			if (linkCtx) {
				linkCtx.tag = tag;
				tag.linkCtx = linkCtx;
			}
			tagCtx.ctx = extendCtx(tagCtx.ctx, (linkCtx ? linkCtx.view : view).ctx);
			tagHandlersFromProps(tag, tagCtx);
		}
		tag._er = onError && value;
		tag.ctx = tagCtx.ctx || tag.ctx || {};
		tagCtx.ctx = undefined;

		value = tag.cvtArgs()[0]; // If there is a convertBack but no convert, converter will be "true"
	}

	// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
	value = boundTag && view._.onRender
		? view._.onRender(value, view, tag)
		: value;
	return value != undefined ? value : "";
}

function convertArgs(bound, tagElse) { // tag.cvtArgs()
	var l, key, boundArgs, args, bindTo, tag, converter,
		tagCtx = this;

	if (tagCtx.tagName) {
		tag = tagCtx;
		tagCtx = tag.tagCtxs ? tag.tagCtxs[tagElse || 0] : tag.tagCtx;
	} else {
		tag = tagCtx.tag;
	}

	bindTo = tag.bindTo;
	args = tagCtx.args;

	if ((converter = tag.convert) && "" + converter === converter) {
		converter = converter === "true"
			? undefined
			: (tagCtx.view.getRsc("converters", converter) || error("Unknown converter: '" + converter + "'"));
	}

	if (bound && bound.length) {
	 args = bound;
	} else {
		if (converter && !bound) { // If there is a converter, use a copy of the tagCtx.args array for rendering, and replace the args[0] in
			args = args.slice(); // the copied array with the converted value. But we do not modify the value of tag.tagCtx.args[0] (the original args array)
		}
		if (bindTo) { // Get the values of the boundArgs
			boundArgs = [];
			l = bindTo.length;
			while (l--) {
				key = bindTo[l];
				boundArgs.unshift(argOrProp(tagCtx, key));
			}
			if (bound) {
				args = boundArgs; // Call to convertBoundArgs() - returns the boundArgs
			}
		}
	}
	if (converter) {
		bindTo = bindTo || [0];
		l = bindTo.length;
		converter = converter.apply(tag, boundArgs || args);
		if (!$isArray(converter) || converter.length !== l) {
			converter = [converter];
			bindTo = [0];
			l = 1;
		}
		if (bound) {        // Call to bndArgs convertBoundArgs() - so apply converter to all boundArgs
			args = converter; // The array of values returned from the converter
		} else {            // Call to cvtArgs()
			while (l--) {
				key = bindTo[l];
				if (+key === key) {
					args[key] = converter[l];
				}
			}
		}
	}
	return args;
}

function argOrProp(context, key) {
	context = context[+key === key ? "args" : "props"];
	return context && context[key];
}

function convertBoundArgs(tagElse) { // tag.bndArgs()
	return this.cvtArgs(true, tagElse);
}

//=============
// views._tag
//=============

function getResource(resourceType, itemName) {
	var res, store,
		view = this;
	if ("" + itemName === itemName) {
		while ((res === undefined) && view) {
			store = view.tmpl && view.tmpl[resourceType];
			res = store && store[itemName];
			view = view.parent;
		}
		return res || $views[resourceType][itemName];
	}
}

function renderTag(tagName, parentView, tmpl, tagCtxs, isUpdate, onError) {
	function makeArray(type) {
		var linkedElement;
		if (linkedElement = tag[type]) {
			tag[type] = linkedElement = $isArray(linkedElement) ? linkedElement: [linkedElement];

			if (bindToLength !== linkedElement.length) {
				error(type + " length not same as bindTo ");
			}
		}
	}

	parentView = parentView || topView;
	var tag, tag_, tagDef, template, tags, attr, parentTag, l, m, n, itemRet, tagCtx, tagCtxCtx, ctxPrm, bindTo,
		content, callInit, mapDef, thisMap, args, props, tagDataMap, contentCtx, key, bindToLength,
		i = 0,
		ret = "",
		linkCtx = parentView.linkCtx || 0,
		ctx = parentView.ctx,
		parentTmpl = tmpl || parentView.tmpl,
		// If tagCtxs is an integer, then it is the key for the compiled function to return the boundTag tagCtxs
		boundTag = typeof tagCtxs === "number" && parentView.tmpl.bnds[tagCtxs-1];

	if (tagName._is === "tag") {
		tag = tagName;
		tagName = tag.tagName;
		tagCtxs = tag.tagCtxs;
		template = tag.template;
	} else {
		tagDef = parentView.getRsc("tags", tagName) || error("Unknown tag: {{" + tagName + "}} ");
		template = tagDef.template;
	}
	if (onError === undefined && boundTag) {
		if (boundTag._lr = (tagDef.lateRender || boundTag._lr) && boundTag._lr !== "false") {
			onError = ""; // If lateRender, set temporary onError, to skip initial rendering (and render just "")
		}
	}
	if (onError !== undefined) {
		ret += onError;
		tagCtxs = onError = [{props: {}, args: [], params: {}}];
	} else if (boundTag) {
		tagCtxs = boundTag(parentView.data, parentView, $sub);
	}

	l = tagCtxs.length;
	for (; i < l; i++) {
		tagCtx = tagCtxs[i];
		content = tagCtx.tmpl;
		if (!linkCtx || !linkCtx.tag || i && !linkCtx.tag.inline || tag._er || content && +content===content) {
			// Initialize tagCtx
			// For block tags, tagCtx.tmpl is an integer > 0
			if (content && parentTmpl.tmpls) {
				tagCtx.tmpl = tagCtx.content = parentTmpl.tmpls[content - 1]; // Set the tmpl property to the content of the block tag
			}
			tagCtx.index = i;
			tagCtx.render = renderContent;
			tagCtx.view = parentView;
			tagCtx.ctx = extendCtx(tagCtx.ctx, ctx); // Clone and extend parentView.ctx
		}
		if (tmpl = tagCtx.props.tmpl) {
			// If the tmpl property is overridden, set the value (when initializing, or, in case of binding: ^tmpl=..., when updating)
			tagCtx.tmpl = parentView.getTmpl(tmpl);
			tagCtx.content = tagCtx.content || tagCtx.tmpl;
		}

		if (!tag) {
			// This will only be hit for initial tagCtx (not for {{else}}) - if the tag instance does not exist yet
			// If the tag has not already been instantiated, we will create a new instance.
			// ~tag will access the tag, even within the rendering of the template content of this tag.
			// From child/descendant tags, can access using ~tag.parent, or ~parentTags.tagName
			tag = new tagDef._ctr();
			callInit = !!tag.init;

			tag.parent = parentTag = ctx && ctx.tag;
			tag.tagCtxs = tagCtxs;
			tagDataMap = tag.dataMap;

			if (linkCtx) {
				tag.inline = false;
				linkCtx.tag = tag;
				tag.linkCtx = linkCtx;
			}
			if (tag._.bnd = boundTag || linkCtx.fn) {
				// Bound if {^{tag...}} or data-link="{tag...}"
				tag._.arrVws = {};
			} else if (tag.dataBoundOnly) {
				error(tagName + " must be data-bound:\n{^{" + tagName + "}}");
			}
			//TODO better perf for childTags() - keep child tag.tags array, (and remove child, when disposed)
			// tag.tags = [];
		}
		tagCtxs = tag.tagCtxs;
		tagDataMap = tag.dataMap;

		tagCtx.tag = tag;
		if (tagDataMap && tagCtxs) {
			tagCtx.map = tagCtxs[i].map; // Copy over the compiled map instance from the previous tagCtxs to the refreshed ones
		}
		if (!tag.flow) {
			tagCtxCtx = tagCtx.ctx = tagCtx.ctx || {};

			// tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
			tags = tag.parents = tagCtxCtx.parentTags = ctx && extendCtx(tagCtxCtx.parentTags, ctx.parentTags) || {};
			if (parentTag) {
				tags[parentTag.tagName] = parentTag;
				//TODO better perf for childTags: parentTag.tags.push(tag);
			}
			tags[tag.tagName] = tagCtxCtx.tag = tag;
		}
	}
	if (!(tag._er = onError)) {
		tagHandlersFromProps(tag, tagCtxs[0]);
		tag.rendering = {}; // Provide object for state during render calls to tag and elses. (Used by {{if}} and {{for}}...)
		for (i = 0; i < l; i++) { // Iterate tagCtx for each {{else}} block
			tagCtx = tag.tagCtx = tagCtxs[i];
			props = tagCtx.props;
			tag.ctx = tagCtx.ctx;

			if (!i) {
				if (callInit) {
					tag.init(tagCtx, linkCtx, tag.ctx);
					callInit = undefined;
				}
				if (!tagCtx.args.length && tag.argDefault !== false) {
					tagCtx.args = args = [tagCtx.view.data]; // Missing first arg defaults to the current data context
					tagCtx.params.args = ["#data"];
				}

				bindTo = tag.bindTo;

				if (bindTo !== undefined) {
					bindTo = tag.bindTo = $isArray(bindTo) ? bindTo : [bindTo];
					m = bindTo.length;
					while (m--) {
						key = bindTo[m];
						if (!isNaN(parseInt(key))) {
							key = parseInt(key); // Convert "0" to 0,  etc.
						}
						bindTo[m] = key;
					}
				}

				bindTo = tag.bindTo || [0];
				bindToLength = bindTo.length;
				if (tag._.bnd){
					makeArray("linkedElement");
					makeArray("linkedCtxParam");
				}

				if (linkCtx) {
					// Set attr on linkCtx to ensure outputting to the correct target attribute.
					// Setting either linkCtx.attr or this.attr in the init() allows per-instance choice of target attrib.
					linkCtx.attr = tag.attr = linkCtx.attr || tag.attr;
				}
				attr = tag.attr;
				tag._.noVws = attr && attr !== HTML;
			}
			args = tag.cvtArgs(undefined, i);
			if (tag.linkedCtxParam) {
				m = bindToLength;
				while (m--) {
					if (ctxPrm = tag.linkedCtxParam[m]) {
						key = bindTo[m];
						// Create tag contextual parameter
						tagCtx.ctx[ctxPrm] = $sub._cp(argOrProp(tagCtx, key), argOrProp(tagCtx.params, key), tagCtx.view, tag._.bnd && {tag: tag, ind: m, tagElse: i});
					}
				}
			}
			if (mapDef = props.dataMap || tagDataMap) {
				if (args.length || props.dataMap) {
					thisMap = tagCtx.map;
					if (!thisMap || thisMap.src !== args[0] || isUpdate) {
						if (thisMap && thisMap.src) {
							thisMap.unmap(); // only called if observable map - not when only used in JsRender, e.g. by {{props}}
						}
						thisMap = tagCtx.map = mapDef.map(args[0], props, undefined, !tag._.bnd);
					}
					args = [thisMap.tgt];
				}
			}

			itemRet = undefined;
			if (tag.render) {
				itemRet = tag.render.apply(tag, args);
				if (parentView.linked && itemRet && !rWrappedInViewMarker.test(itemRet)) {
					// When a tag renders content from the render method, with data linking then we need to wrap with view markers, if absent,
					// to provide a contentView for the tag, which will correctly dispose bindings if deleted. The 'tmpl' for this view will
					// be a dumbed-down template which will always return the  itemRet string (no matter what the data is). The itemRet string
					// is not compiled as template markup, so can include "{{" or "}}" without triggering syntax errors
					tmpl = { // 'Dumbed-down' template which always renders 'static' itemRet string
						links: []
					};
					tmpl.render = tmpl.fn = function() {
						return itemRet;
					};
					itemRet = renderWithViews(tmpl, parentView.data, undefined, true, parentView, undefined, undefined, tag);
				}
			}
			if (!args.length) {
				args = [parentView]; // no arguments - (e.g. {{else}}) get data context from view.
			}
			if (itemRet === undefined) {
				contentCtx = args[0]; // Default data context for wrapped block content is the first argument
				if (tag.contentCtx) { // Set tag.contentCtx to true, to inherit parent context, or to a function to provide alternate context.
					contentCtx = tag.contentCtx === true ? parentView : tag.contentCtx(contentCtx);
				}
				itemRet = tagCtx.render(contentCtx, true) || (isUpdate ? undefined : "");
			}
			// No return value from render, and no template/content tagCtx.render(...), so return undefined
			ret = ret ? ret + (itemRet || "") : itemRet; // If no rendered content, this will be undefined
		}
		tag.rendering = undefined;
	}
	tag.tagCtx = tagCtxs[0];
	tag.ctx = tag.tagCtx.ctx;

	if (tag._.noVws) {
		if (tag.inline) {
			// inline tag with attr set to "text" will insert HTML-encoded content - as if it was element-based innerText
			ret = attr === "text"
				? $converters.html(ret)
				: "";
		}
	}
	return boundTag && parentView._.onRender
		// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
		? parentView._.onRender(ret, parentView, tag)
		: ret;
}

//=================
// View constructor
//=================

function View(context, type, parentView, data, template, key, onRender, contentTmpl) {
	// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
	var views, parentView_, tag, self_,
		self = this,
		isArray = type === "array";
		// If the data is an array, this is an 'array view' with a views array for each child 'item view'
		// If the data is not an array, this is an 'item view' with a views 'hash' object for any child nested views

	self.content = contentTmpl;
	self.views = isArray ? [] : {};
	self.data = data;
	self.tmpl = template;
	self_ = self._ = {
		key: 0,
		// ._.useKey is non zero if is not an 'array view' (owning a data array). Use this as next key for adding to child views hash
		useKey: isArray ? 0 : 1,
		id: "" + viewId++,
		onRender: onRender,
		bnds: {}
	};
	self.linked = !!onRender;
	self.type = type || "top";
	if (self.parent = parentView) {
		self.root = parentView.root || self; // view whose parent is top view
		views = parentView.views;
		parentView_ = parentView._;
		self.isTop = parentView_.scp; // Is top content view of a link("#container", ...) call
		self.scope = (!context.tag || context.tag === parentView.ctx.tag) && !self.isTop && parentView.scope || self;
		if (parentView_.useKey) {
			// Parent is not an 'array view'. Add this view to its views object
			// self._key = is the key in the parent view hash
			views[self_.key = "_" + parentView_.useKey++] = self;
			self.index = indexStr;
			self.getIndex = getNestedIndex;
		} else if (views.length === (self_.key = self.index = key)) { // Parent is an 'array view'. Add this view to its views array
			views.push(self); // Adding to end of views array. (Using push when possible - better perf than splice)
		} else {
			views.splice(key, 0, self); // Inserting in views array
		}
		// If no context was passed in, use parent context
		// If context was passed in, it should have been merged already with parent context
		self.ctx = context || parentView.ctx;
	} else {
		self.ctx = context || {};
	}
}

View.prototype = {
	get: getView,
	getIndex: getIndex,
	getRsc: getResource,
	getTmpl: getTemplate,
	ctxPrm: contextParameter,
	_is: "view"
};

//====================================================
// Registration
//====================================================

function compileChildResources(parentTmpl) {
	var storeName, storeNames, resources;
	for (storeName in jsvStores) {
		storeNames = storeName + "s";
		if (parentTmpl[storeNames]) {
			resources = parentTmpl[storeNames];    // Resources not yet compiled
			parentTmpl[storeNames] = {};               // Remove uncompiled resources
			$views[storeNames](resources, parentTmpl); // Add back in the compiled resources
		}
	}
}

//===============
// compileTag
//===============

function compileTag(name, tagDef, parentTmpl) {
	var tmpl, baseTag, prop, l, key, bindToLength,
		bindTo = tagDef.bindTo,
		compiledDef = new $sub._tg();

	function Tag() {
		var tag = this;
		tag._ = {
			unlinked: true
		};
		tag.inline = true;
		tag.tagName = name;
	}

	if ($isFunction(tagDef)) {
		// Simple tag declared as function. No presenter instantation.
		tagDef = {
			depends: tagDef.depends,
			render: tagDef
		};
	} else if ("" + tagDef === tagDef) {
		tagDef = {template: tagDef};
	}

	if (baseTag = tagDef.baseTag) {
		tagDef.flow = !!tagDef.flow; // Set flow property, so defaults to false even if baseTag has flow=true
		tagDef.baseTag = baseTag = "" + baseTag === baseTag
			? (parentTmpl && parentTmpl.tags[baseTag] || $tags[baseTag])
			: baseTag;

		compiledDef = $extend(compiledDef, baseTag);

		for (prop in tagDef) {
			compiledDef[prop] = getMethod(baseTag[prop], tagDef[prop]);
		}
	} else {
		compiledDef = $extend(compiledDef, tagDef);
	}

	// Tag declared as object, used as the prototype for tag instantiation (control/presenter)
	if ((tmpl = compiledDef.template) !== undefined) {
		compiledDef.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
	}
	(Tag.prototype = compiledDef).constructor = compiledDef._ctr = Tag;

	if (parentTmpl) {
		compiledDef._parentTmpl = parentTmpl;
	}
	return compiledDef;
}

function baseApply(args) {
	// In derived method (or handler declared declaratively as in {{:foo onChange=~fooChanged}} can call base method,
	// using this.baseApply(arguments) (Equivalent to this._superApply(arguments) in jQuery UI)
	return this.base.apply(this, args);
}

//===============
// compileTmpl
//===============

function compileTmpl(name, tmpl, parentTmpl, options) {
	// tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object

	//==== nested functions ====
	function lookupTemplate(value) {
		// If value is of type string - treat as selector, or name of compiled template
		// Return the template object, if already compiled, or the markup string
		var currentName, tmpl;
		if (("" + value === value) || value.nodeType > 0 && (elem = value)) {
			if (!elem) {
				if (/^\.\/[^\\:*?"<>]*$/.test(value)) {
					// tmpl="./some/file.html"
					// If the template is not named, use "./some/file.html" as name.
					if (tmpl = $templates[name = name || value]) {
						value = tmpl;
					} else {
						// BROWSER-SPECIFIC CODE (not on Node.js):
						// Look for server-generated script block with id "./some/file.html"
						elem = document.getElementById(value);
					}
				} else if ($.fn && !$sub.rTmpl.test(value)) {
					try {
						elem = $ (value, document)[0]; // if jQuery is loaded, test for selector returning elements, and get first element
					} catch (e) {}
				}// END BROWSER-SPECIFIC CODE
			} //BROWSER-SPECIFIC CODE
			if (elem) {
				// Generally this is a script element.
				// However we allow it to be any element, so you can for example take the content of a div,
				// use it as a template, and replace it by the same content rendered against data.
				// e.g. for linking the content of a div to a container, and using the initial content as template:
				// $.link("#content", model, {tmpl: "#content"});
				if (options) {
					// We will compile a new template using the markup in the script element
					value = elem.innerHTML;
				} else {
					// We will cache a single copy of the compiled template, and associate it with the name
					// (renaming from a previous name if there was one).
					currentName = elem.getAttribute(tmplAttr);
					if (currentName) {
						if (currentName !== jsvTmpl) {
							value = $templates[currentName];
							delete $templates[currentName];
						} else if ($.fn) {
							value = $.data(elem)[jsvTmpl]; // Get cached compiled template
						}
					}
					if (!currentName || !value) { // Not yet compiled, or cached version lost
						name = name || ($.fn ? jsvTmpl : value);
						value = compileTmpl(name, elem.innerHTML, parentTmpl, options);
					}
					value.tmplName = name = name || currentName;
					if (name !== jsvTmpl) {
						$templates[name] = value;
					}
					elem.setAttribute(tmplAttr, name);
					if ($.fn) {
						$.data(elem, jsvTmpl, value);
					}
				}
			} // END BROWSER-SPECIFIC CODE
			elem = undefined;
		} else if (!value.fn) {
			value = undefined;
			// If value is not a string. HTML element, or compiled template, return undefined
		}
		return value;
	}

	var elem, compiledTmpl,
		tmplOrMarkup = tmpl = tmpl || "";
	$sub._html = $converters.html;

	//==== Compile the template ====
	if (options === 0) {
		options = undefined;
		tmplOrMarkup = lookupTemplate(tmplOrMarkup); // Top-level compile so do a template lookup
	}

	// If options, then this was already compiled from a (script) element template declaration.
	// If not, then if tmpl is a template object, use it for options
	options = options || (tmpl.markup ? tmpl : {});
	options.tmplName = name;
	if (parentTmpl) {
		options._parentTmpl = parentTmpl;
	}
	// If tmpl is not a markup string or a selector string, then it must be a template object
	// In that case, get it from the markup property of the object
	if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = lookupTemplate(tmpl.markup))) {
		if (tmplOrMarkup.fn) {
			// If the string references a compiled template object, need to recompile to merge any modified options
			tmplOrMarkup = tmplOrMarkup.markup;
		}
	}
	if (tmplOrMarkup !== undefined) {
		if (tmplOrMarkup.fn || tmpl.fn) {
			// tmpl is already compiled, so use it
			if (tmplOrMarkup.fn) {
				compiledTmpl = tmplOrMarkup;
			}
		} else {
			// tmplOrMarkup is a markup string, not a compiled template
			// Create template object
			tmpl = tmplObject(tmplOrMarkup, options);
			// Compile to AST and then to compiled function
			tmplFn(tmplOrMarkup.replace(rEscapeQuotes, "\\$&"), tmpl);
		}
		if (!compiledTmpl) {
			compiledTmpl = $extend(function() {
				return compiledTmpl.render.apply(compiledTmpl, arguments);
			}, tmpl);

			compileChildResources(compiledTmpl);
		}
		return compiledTmpl;
	}
}

//==== /end of function compileTmpl ====

//=================
// compileViewModel
//=================

function getDefaultVal(defaultVal, data) {
	return $isFunction(defaultVal)
		? defaultVal.call(data)
		: defaultVal;
}

function unmapArray(modelArr) {
		var arr = [],
			i = 0,
			l = modelArr.length;
		for (; i<l; i++) {
			arr.push(modelArr[i].unmap());
		}
		return arr;
}

function compileViewModel(name, type) {
	var i, constructor,
		viewModels = this,
		getters = type.getters,
		extend = type.extend,
		id = type.id,
		proto = $.extend({
			_is: name || "unnamed",
			unmap: unmap,
			merge: merge
		}, extend),
		args = "",
		body = "",
		g = getters ? getters.length : 0,
		$observable = $.observable,
		getterNames = {};

	function GetNew(args) {
		constructor.apply(this, args);
	}

	function vm() {
		return new GetNew(arguments);
	}

	function iterate(data, action) {
		var getterType, defaultVal, prop, ob,
			j = 0;
		for (; j<g; j++) {
			prop = getters[j];
			getterType = undefined;
			if (prop + "" !== prop) {
				getterType = prop;
				prop = getterType.getter;
			}
			if ((ob = data[prop]) === undefined && getterType && (defaultVal = getterType.defaultVal) !== undefined) {
				ob = getDefaultVal(defaultVal, data);
			}
			action(ob, getterType && viewModels[getterType.type], prop);
		}
	}

	function map(data) {
		data = data + "" === data
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array
		var l, prop,
			j = 0,
			ob = data,
			arr = [];

		if ($isArray(data)) {
			data = data || [];
			l = data.length;
			for (; j<l; j++) {
				arr.push(this.map(data[j]));
			}
			arr._is = name;
			arr.unmap = unmap;
			arr.merge = merge;
			return arr;
		}

		if (data) {
			iterate(data, function(ob, viewModel) {
				if (viewModel) { // Iterate to build getters arg array (value, or mapped value)
					ob = viewModel.map(ob);
				}
				arr.push(ob);
			});

			ob = this.apply(this, arr); // Insantiate this View Model, passing getters args array to constructor
			for (prop in data) { // Copy over any other properties. that are not get/set properties
				if (prop !== $expando && !getterNames[prop]) {
					ob[prop] = data[prop];
				}
			}
		}
		return ob;
	}

	function merge(data) {
		data = data + "" === data
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array
		var j, l, m, prop, mod, found, assigned, ob, newModArr,
			k = 0,
			model = this;

		if ($isArray(model)) {
			assigned = {};
			newModArr = [];
			l = data.length;
			m = model.length;
			for (; k<l; k++) {
				ob = data[k];
				found = false;
				for (j=0; j<m && !found; j++) {
					if (assigned[j]) {
						continue;
					}
					mod = model[j];

					if (id) {
						assigned[j] = found = id + "" === id
						? (ob[id] && (getterNames[id] ? mod[id]() : mod[id]) === ob[id])
						: id(mod, ob);
					}
				}
				if (found) {
					mod.merge(ob);
					newModArr.push(mod);
				} else {
					newModArr.push(vm.map(ob));
				}
			}
			if ($observable) {
				$observable(model).refresh(newModArr, true);
			} else {
				model.splice.apply(model, [0, model.length].concat(newModArr));
			}
			return;
		}
		iterate(data, function(ob, viewModel, getter) {
			if (viewModel) {
				model[getter]().merge(ob); // Update typed property
			} else {
				model[getter](ob); // Update non-typed property
			}
		});
		for (prop in data) {
			if (prop !== $expando && !getterNames[prop]) {
				model[prop] = data[prop];
			}
		}
	}

	function unmap() {
		var ob, prop, getterType, arr, value,
			k = 0,
			model = this;

		if ($isArray(model)) {
			return unmapArray(model);
		}
		ob = {};
		for (; k<g; k++) {
			prop = getters[k];
			getterType = undefined;
			if (prop + "" !== prop) {
				getterType = prop;
				prop = getterType.getter;
			}
			value = model[prop]();
			ob[prop] = getterType && value && viewModels[getterType.type]
				? $isArray(value)
					? unmapArray(value)
					: value.unmap()
				: value;
		}
		for (prop in model) {
			if (prop !== "_is" && !getterNames[prop] && prop !== $expando  && (prop.charAt(0) !== "_" || !getterNames[prop.slice(1)]) && !$isFunction(model[prop])) {
				ob[prop] = model[prop];
			}
		}
		return ob;
	}

	GetNew.prototype = proto;

	for (i=0; i<g; i++) {
		(function(getter) {
			getter = getter.getter || getter;
			getterNames[getter] = i+1;
			var privField = "_" + getter;

			args += (args ? "," : "") + getter;
			body += "this." + privField + " = " + getter + ";\n";
			proto[getter] = proto[getter] || function(val) {
				if (!arguments.length) {
					return this[privField]; // If there is no argument, use as a getter
				}
				if ($observable) {
					$observable(this).setProperty(getter, val);
				} else {
					this[privField] = val;
				}
			};

			if ($observable) {
				proto[getter].set = proto[getter].set || function(val) {
					this[privField] = val; // Setter called by observable property change
				};
			}
		})(getters[i]);
	}

	constructor = new Function(args, body.slice(0, -1));
	constructor.prototype = proto;
	proto.constructor = constructor;

	vm.map = map;
	vm.getters = getters;
	vm.extend = extend;
	vm.id = id;
	return vm;
}

function tmplObject(markup, options) {
	// Template object constructor
	var htmlTag,
		wrapMap = $subSettingsAdvanced._wm || {}, // Only used in JsViews. Otherwise empty: {}
		tmpl = $extend(
			{
				tmpls: [],
				links: {}, // Compiled functions for link expressions
				bnds: [],
				_is: "template",
				render: renderContent
			},
			options
		);

	tmpl.markup = markup;
	if (!options.htmlTag) {
		// Set tmpl.tag to the top-level HTML tag used in the template, if any...
		htmlTag = rFirstElem.exec(markup);
		tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
	}
	htmlTag = wrapMap[tmpl.htmlTag];
	if (htmlTag && htmlTag !== wrapMap.div) {
		// When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
		// Currently not trimmed for <li> tag. (Not worth adding perf cost)
		tmpl.markup = $.trim(tmpl.markup);
	}

	return tmpl;
}

//==============
// registerStore
//==============

function registerStore(storeName, storeSettings) {

	function theStore(name, item, parentTmpl) {
		// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

		// For store of name 'thing', Call as:
		//    $.views.things(items[, parentTmpl]),
		// or $.views.things(name, item[, parentTmpl])

		var compile, itemName, thisStore, cnt,
			onStore = $sub.onStore[storeName];

		if (name && typeof name === OBJECT && !name.nodeType && !name.markup && !name.getTgt && !(storeName === "viewModel" && name.getters || name.extend)) {
			// Call to $.views.things(items[, parentTmpl]),

			// Adding items to the store
			// If name is a hash, then item is parentTmpl. Iterate over hash and call store for key.
			for (itemName in name) {
				theStore(itemName, name[itemName], item);
			}
			return item || $views;
		}
		// Adding a single unnamed item to the store
		if (item === undefined) {
			item = name;
			name = undefined;
		}
		if (name && "" + name !== name) { // name must be a string
			parentTmpl = item;
			item = name;
			name = undefined;
		}
		thisStore = parentTmpl
			? storeName === "viewModel"
				? parentTmpl
				: (parentTmpl[storeNames] = parentTmpl[storeNames] || {})
			: theStore;
		compile = storeSettings.compile;

		if (item === null) {
			// If item is null, delete this entry
			if (name) {
				delete thisStore[name];
			}
		} else {
			if (compile) {
				item = compile.call(thisStore, name, item, parentTmpl, 0) || {};
				item._is = storeName; // Only do this for compiled objects (tags, templates...)
			}
			if (name) {
				thisStore[name] = item;
			}
		}
		if (onStore) {
			// e.g. JsViews integration
			onStore(name, item, parentTmpl, compile);
		}
		return item;
	}

	var storeNames = storeName + "s";
	$views[storeNames] = theStore;
}

function addSetting(st) {
	$viewsSettings[st] = function(value) {
		return arguments.length
			? ($subSettings[st] = value, $viewsSettings)
			: $subSettings[st];
	};
}

//=========
// dataMap
//=========

function dataMap(mapDef) {
	function Map(source, options) {
		this.tgt = mapDef.getTgt(source, options);
	}

	if ($isFunction(mapDef)) {
		// Simple map declared as function
		mapDef = {
			getTgt: mapDef
		};
	}

	if (mapDef.baseMap) {
		mapDef = $extend($extend({}, mapDef.baseMap), mapDef);
	}

	mapDef.map = function(source, options) {
		return new Map(source, options);
	};
	return mapDef;
}

//==============
// renderContent
//==============

function renderContent(data, context, noIteration, parentView, key, onRender) {
	var i, l, tag, tmpl, tagCtx, isTopRenderCall, prevData, prevIndex,
		view = parentView,
		result = "";

	if (context === true) {
		noIteration = context; // passing boolean as second param - noIteration
		context = undefined;
	} else if (typeof context !== OBJECT) {
		context = undefined; // context must be a boolean (noIteration) or a plain object
	}

	if (tag = this.tag) {
		// This is a call from renderTag or tagCtx.render(...)
		tagCtx = this;
		view = view || tagCtx.view;
		tmpl = view.getTmpl(tag.template || tagCtx.tmpl);
		if (!arguments.length) {
			data = view;
		}
	} else {
		// This is a template.render(...) call
		tmpl = this;
	}

	if (tmpl) {
		if (!parentView && data && data._is === "view") {
			view = data; // When passing in a view to render or link (and not passing in a parent view) use the passed-in view as parentView
		}

		if (view && data === view) {
			// Inherit the data from the parent view.
			data = view.data;
		}

		isTopRenderCall = !view;
		isRenderCall = isRenderCall || isTopRenderCall;
		if (!view) {
			(context = context || {}).root = data; // Provide ~root as shortcut to top-level data.
		}
		if (!isRenderCall || $subSettingsAdvanced.useViews || tmpl.useViews || view && view !== topView) {
			result = renderWithViews(tmpl, data, context, noIteration, view, key, onRender, tag);
		} else {
			if (view) { // In a block
				prevData = view.data;
				prevIndex = view.index;
				view.index = indexStr;
			} else {
				view = topView;
				prevData = view.data;
				view.data = data;
				view.ctx = context;
			}
			if ($isArray(data) && !noIteration) {
				// Create a view for the array, whose child views correspond to each data item. (Note: if key and parentView are passed in
				// along with parent view, treat as insert -e.g. from view.addViews - so parentView is already the view item for array)
				for (i = 0, l = data.length; i < l; i++) {
					view.index = i;
					view.data = data[i];
					result += tmpl.fn(data[i], view, $sub);
				}
			} else {
				view.data = data;
				result += tmpl.fn(data, view, $sub);
			}
			view.data = prevData;
			view.index = prevIndex;
		}
		if (isTopRenderCall) {
			isRenderCall = undefined;
		}
	}
	return result;
}

function renderWithViews(tmpl, data, context, noIteration, view, key, onRender, tag) {
	function setItemVar(item) {
		// When itemVar is specified, set modified ctx with user-named ~item
		newCtx = $extend({}, context);
		newCtx[itemVar] = item;
	}

	// Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
	// If the data is the parent view, treat as noIteration, re-render with the same data context.
	// tmpl can be a string (e.g. rendered by a tag.render() method), or a compiled template.
	var i, l, newView, childView, itemResult, swapContent, contentTmpl, outerOnRender, tmplName, itemVar, newCtx, tagCtx,
		result = "";

	if (tag) {
		// This is a call from renderTag or tagCtx.render(...)
		tmplName = tag.tagName;
		tagCtx = tag.tagCtx;
		context = context ? extendCtx(context, tag.ctx) : tag.ctx;

		if (tmpl === view.content) { // {{xxx tmpl=#content}}
			contentTmpl = tmpl !== view.ctx._wrp // We are rendering the #content
				? view.ctx._wrp // #content was the tagCtx.props.tmpl wrapper of the block content - so within this view, #content will now be the view.ctx._wrp block content
				: undefined; // #content was the view.ctx._wrp block content - so within this view, there is no longer any #content to wrap.
		} else if (tmpl !== tagCtx.content) {
			if (tmpl === tag.template) { // Rendering {{tag}} tag.template, replacing block content.
				contentTmpl = tagCtx.tmpl; // Set #content to block content (or wrapped block content if tagCtx.props.tmpl is set)
				context._wrp = tagCtx.content; // Pass wrapped block content to nested views
			} else { // Rendering tagCtx.props.tmpl wrapper
				contentTmpl = tagCtx.content || view.content; // Set #content to wrapped block content
			}
		} else {
			contentTmpl = view.content; // Nested views inherit same wrapped #content property
		}

		if (tagCtx.props.link === false) {
			// link=false setting on block tag
			// We will override inherited value of link by the explicit setting link=false taken from props
			// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
			context = context || {};
			context.link = false;
		}

		if (itemVar = tagCtx.props.itemVar) {
			if (itemVar.charAt(0) !== "~") {
				syntaxError("Use itemVar='~myItem'");
			}
			itemVar = itemVar.slice(1);
		}
	}

	if (view) {
		onRender = onRender || view._.onRender;
		context = extendCtx(context, view.ctx);
	}

	if (key === true) {
		swapContent = true;
		key = 0;
	}

	// If link===false, do not call onRender, so no data-linking marker nodes
	if (onRender && (context && context.link === false || tag && tag._.noVws)) {
		onRender = undefined;
	}
	outerOnRender = onRender;
	if (onRender === true) {
		// Used by view.refresh(). Don't create a new wrapper view.
		outerOnRender = undefined;
		onRender = view._.onRender;
	}
	// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
	context = tmpl.helpers
		? extendCtx(tmpl.helpers, context)
		: context;

	newCtx = context;
	if ($isArray(data) && !noIteration) {
		// Create a view for the array, whose child views correspond to each data item. (Note: if key and view are passed in
		// along with parent view, treat as insert -e.g. from view.addViews - so view is already the view item for array)
		newView = swapContent
			? view
			: (key !== undefined && view)
				|| new View(context, "array", view, data, tmpl, key, onRender, contentTmpl);
		if (view && view._.useKey) {
			// Parent is not an 'array view'
			newView._.bnd = !tag || tag._.bnd && tag; // For array views that are data bound for collection change events, set the
			// view._.bnd property to true for top-level link() or data-link="{for}", or to the tag instance for a data-bound tag, e.g. {^{for ...}}
		}
		for (i = 0, l = data.length; i < l; i++) {
			// Create a view for each data item.
			if (itemVar) {
				setItemVar(data[i]); // use modified ctx with user-named ~item
			}
			childView = new View(newCtx, "item", newView, data[i], tmpl, (key || 0) + i, onRender, newView.content);
			childView._.it = itemVar;

			itemResult = tmpl.fn(data[i], childView, $sub);
			result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
		}
	} else {
		// Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "mytag" except for
		// "item", "array" and "data" views. A "data" view is from programmatic render(object) against a 'singleton'.
		if (itemVar) {
			setItemVar(data);
		}
		newView = swapContent ? view : new View(newCtx, tmplName || "data", view, data, tmpl, key, onRender, contentTmpl);
		newView._.it = itemVar;
		result += tmpl.fn(data, newView, $sub);
	}
	if (tag) {
		newView.tag = tag;
		newView.tagElse = tagCtx.index;
		tagCtx.contentView = newView;
	}
	return outerOnRender ? outerOnRender(result, newView) : result;
}

//===========================
// Build and compile template
//===========================

// Generate a reusable function that will serve to render a template against data
// (Compile AST then build template function)

function onRenderError(e, view, fallback) {
	var message = fallback !== undefined
		? $isFunction(fallback)
			? fallback.call(view.data, e, view)
			: fallback || ""
		: "{Error: " + (e.message||e) + "}";

	if ($subSettings.onError && (fallback = $subSettings.onError.call(view.data, e, fallback && message, view)) !== undefined) {
		message = fallback; // There is a settings.debugMode(handler) onError override. Call it, and use return value (if any) to replace message
	}

	return view && !view.linkCtx ? $converters.html(message) : message;
}

function error(message) {
	throw new $sub.Err(message);
}

function syntaxError(message) {
	error("Syntax error\n" + message);
}

function tmplFn(markup, tmpl, isLinkExpr, convertBack, hasElse) {
	// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
	// Used for compiling templates, and also by JsViews to build functions for data link expressions

	//==== nested functions ====
	function pushprecedingContent(shift) {
		shift -= loc;
		if (shift) {
			content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
		}
	}

	function blockTagCheck(tagName, block) {
		if (tagName) {
			tagName += '}}';
			//			'{{include}} block has {{/for}} with no open {{for}}'
			syntaxError((
				block
					? '{{' + block + '}} block has {{/' + tagName + ' without {{' + tagName
					: 'Unmatched or missing {{/' + tagName) + ', in template:\n' + markup);
		}
	}

	function parseTag(all, bind, tagName, converter, colon, html, codeTag, params, slash, bind2, closeBlock, index) {
/*

     bind     tagName         cvt   cln html code    params            slash   bind2         closeBlk  comment
/(?:{(\^)?{(?:(\w+(?=[\/\s}]))|(\w+)?(:)|(>)|(\*))\s*((?:[^}]|}(?!}))*?)(\/)?|{(\^)?{(?:(?:\/(\w+))\s*|!--[\s\S]*?--))}}/g

(?:
  {(\^)?{            bind
  (?:
    (\w+             tagName
      (?=[\/\s}])
    )
    |
    (\w+)?(:)        converter colon
    |
    (>)              html
    |
    (\*)             codeTag
  )
  \s*
  (                  params
    (?:[^}]|}(?!}))*?
  )
  (\/)?              slash
  |
  {(\^)?{            bind2
  (?:
    (?:\/(\w+))\s*   closeBlock
    |
    !--[\s\S]*?--    comment
  )
)
}}/g

*/
		if (codeTag && bind || slash && !tagName || params && params.slice(-1) === ":" || bind2) {
			syntaxError(all);
		}

		// Build abstract syntax tree (AST): [tagName, converter, params, content, hash, bindings, contentMarkup]
		if (html) {
			colon = ":";
			converter = HTML;
		}
		slash = slash || isLinkExpr && !hasElse;

		var late,
			pathBindings = (bind || isLinkExpr) && [[]], // pathBindings is an array of arrays for arg bindings and a hash of arrays for prop bindings
			props = "",
			args = "",
			ctxProps = "",
			paramsArgs = "",
			paramsProps = "",
			paramsCtxProps = "",
			onError = "",
			useTrigger = "",
			// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
			block = !slash && !colon;

		//==== nested helper function ====
		tagName = tagName || (params = params || "#data", colon); // {{:}} is equivalent to {{:#data}}
		pushprecedingContent(index);
		loc = index + all.length; // location marker - parsed up to here
		if (codeTag) {
			if (allowCode) {
				content.push(["*", "\n" + params.replace(/^:/, "ret+= ").replace(rUnescapeQuotes, "$1") + ";\n"]);
			}
		} else if (tagName) {
			if (tagName === "else") {
				if (rTestElseIf.test(params)) {
					syntaxError('for "{{else if expr}}" use "{{else expr}}"');
				}
				pathBindings = current[8] && [[]];
				current[9] = markup.substring(current[9], index); // contentMarkup for block tag
				current = stack.pop();
				content = current[2];
				block = true;
			}
			if (params) {
				// remove newlines from the params string, to avoid compiled code errors for unterminated strings
				parseParams(params.replace(rNewLine, " "), pathBindings, tmpl)
					.replace(rBuildHash, function(all, onerror, isCtx, key, keyToken, keyValue, arg, param) {
						key = "'" + keyToken + "':";
						if (arg) {
							args += keyValue + ",";
							paramsArgs += "'" + param + "',";
						} else if (isCtx) {
							ctxProps += key + 'j._cp(' + keyValue + ',"' + param + '",view),';
							// Compiled code for evaluating tagCtx on a tag will have: ctx:{'foo':j._cp(compiledExpr, "expr", view)}
							paramsCtxProps += key + "'" + param + "',";
						} else if (onerror) {
							onError += keyValue;
						} else {
							if (keyToken === "trigger") {
								useTrigger += keyValue;
							}
							if (keyToken === "lateRender") {
								late = param; // Render after first pass
							}
							props += key + keyValue + ",";
							paramsProps += key + "'" + param + "',";
							hasHandlers = hasHandlers || rHasHandlers.test(keyToken);
						}
						return "";
					}).slice(0, -1);
			}

			if (pathBindings && pathBindings[0]) {
				pathBindings.pop(); // Remove the binding that was prepared for next arg. (There is always an extra one ready).
			}

			newNode = [
					tagName,
					converter || !!convertBack || hasHandlers || "",
					block && [],
					parsedParam(paramsArgs || (tagName === ":" ? "'#data'," : ""), paramsProps, paramsCtxProps), // {{:}} equivalent to {{:#data}}
					parsedParam(args || (tagName === ":" ? "data," : ""), props, ctxProps),
					onError,
					useTrigger,
					late,
					pathBindings || 0
				];
			content.push(newNode);
			if (block) {
				stack.push(current);
				current = newNode;
				current[9] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
			}
		} else if (closeBlock) {
			blockTagCheck(closeBlock !== current[0] && current[0] !== "else" && closeBlock, current[0]);
			current[9] = markup.substring(current[9], index); // contentMarkup for block tag
			current = stack.pop();
		}
		blockTagCheck(!current && closeBlock);
		content = current[2];
	}
	//==== /end of nested functions ====

	var i, result, newNode, hasHandlers, bindings,
		allowCode = $subSettings.allowCode || tmpl && tmpl.allowCode
			|| $viewsSettings.allowCode === true, // include direct setting of settings.allowCode true for backward compat only
		astTop = [],
		loc = 0,
		stack = [],
		content = astTop,
		current = [,,astTop];

	if (allowCode && tmpl._is) {
		tmpl.allowCode = allowCode;
	}

//TODO	result = tmplFnsCache[markup]; // Only cache if template is not named and markup length < ...,
//and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
//		if (result) {
//			tmpl.fn = result;
//		} else {

//		result = markup;
	if (isLinkExpr) {
		if (convertBack !== undefined) {
			markup = markup.slice(0, -convertBack.length - 2) + delimCloseChar0;
		}
		markup = delimOpenChar0 + markup + delimCloseChar1;
	}

	blockTagCheck(stack[0] && stack[0][2].pop()[0]);
	// Build the AST (abstract syntax tree) under astTop
	markup.replace(rTag, parseTag);

	pushprecedingContent(markup.length);

	if (loc = astTop[astTop.length - 1]) {
		blockTagCheck("" + loc !== loc && (+loc[9] === loc[9]) && loc[0]);
	}
//			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
//		}

	if (isLinkExpr) {
		result = buildCode(astTop, markup, isLinkExpr);
		bindings = [];
		i = astTop.length;
		while (i--) {
			bindings.unshift(astTop[i][8]); // With data-link expressions, pathBindings array for tagCtx[i] is astTop[i][8]
		}
		setPaths(result, bindings);
	} else {
		result = buildCode(astTop, tmpl);
	}
	return result;
}

function setPaths(fn, pathsArr) {
	var key, paths,
		i = 0,
		l = pathsArr.length;
	fn.deps = [];
	fn.paths = []; // The array of path binding (array/dictionary)s for each tag/else block's args and props
	for (; i < l; i++) {
		fn.paths.push(paths = pathsArr[i]);
		for (key in paths) {
			if (key !== "_jsvto" && paths.hasOwnProperty(key) && paths[key].length && !paths[key].skp) {
				fn.deps = fn.deps.concat(paths[key]); // deps is the concatenation of the paths arrays for the different bindings
			}
		}
	}
}

function parsedParam(args, props, ctx) {
	return [args.slice(0, -1), props.slice(0, -1), ctx.slice(0, -1)];
}

function paramStructure(parts, type) {
	return '\n\t'
		+ (type
			? type + ':{'
			: '')
		+ 'args:[' + parts[0] + ']'
		+ (parts[1] || !type
			? ',\n\tprops:{' + parts[1] + '}'
			: "")
		+ (parts[2] ? ',\n\tctx:{' + parts[2] + '}' : "");
}

function parseParams(params, pathBindings, tmpl) {

	function parseTokens(all, lftPrn0, lftPrn, bound, path, operator, err, eq, path2, prn, comma, lftPrn2, apos, quot, rtPrn, rtPrnDot, prn2, space, index, full) {
	// /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(!*?[#~]?[\w$.^]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?[#~]?[\w$.^]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*(([)\]])(?=\s*[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
	//   lftPrn0        lftPrn        bound            path    operator err                                                eq             path2       prn    comma   lftPrn2   apos quot      rtPrn rtPrnDot                        prn2  space
		// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space
		function parsePath(allPath, not, object, helper, view, viewProperty, pathTokens, leafToken) {
			//rPath = /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
			//          not                               object     helper    view  viewProperty pathTokens      leafToken
			var subPath = object === ".";
			if (object) {
				path = path.slice(not.length);
				if (/^\.?constructor$/.test(leafToken||path)) {
					syntaxError(allPath);
				}
				if (!subPath) {
					allPath = (helper
							? 'view.ctxPrm("' + helper + '")'
							: view
								? "view"
								: "data")
						+ (leafToken
							? (viewProperty
								? "." + viewProperty
								: helper
									? ""
									: (view ? "" : "." + object)
								) + (pathTokens || "")
							: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));

					allPath = allPath + (leafToken ? "." + leafToken : "");

					allPath = not + (allPath.slice(0, 9) === "view.data"
						? allPath.slice(5) // convert #view.data... to data...
						: allPath);
				}
				if (bindings) {
					binds = named === "linkTo" ? (bindto = pathBindings._jsvto = pathBindings._jsvto || []) : bndCtx.bd;
					if (theOb = subPath && binds[binds.length-1]) {
						if (theOb._cpfn) { // Computed property exprOb
							while (theOb.sb) {
								theOb = theOb.sb;
							}
							if (theOb.bnd) {
								path = "^" + path.slice(1);
							}
							theOb.sb = path;
							theOb.bnd = theOb.bnd || path.charAt(0) === "^";
						}
					} else {
						binds.push(path);
					}
					pathStart[parenDepth] = index + (subPath ? 1 : 0);
				}
			}
			return allPath;
		}

		//bound = bindings && bound;
		if (bound && !eq) {
			path = bound + path; // e.g. some.fn(...)^some.path - so here path is "^some.path"
		}
		operator = operator || "";
		lftPrn = lftPrn || lftPrn0 || lftPrn2;
		path = path || path2;
		// Could do this - but not worth perf cost?? :-
		// if (!path.lastIndexOf("#data.", 0)) { path = path.slice(6); } // If path starts with "#data.", remove that.
		prn = prn || prn2 || "";

		var expr, exprFn, binds, theOb, newOb,
			rtSq = ")";

		if (prn === "[") {
			prn ="[j._sq(";
			rtSq = ")]";
		}

		if (err && !aposed && !quoted) {
			syntaxError(params);
		} else {
			if (bindings && rtPrnDot && !aposed && !quoted) {
				// This is a binding to a path in which an object is returned by a helper/data function/expression, e.g. foo()^x.y or (a?b:c)^x.y
				// We create a compiled function to get the object instance (which will be called when the dependent data of the subexpression changes, to return the new object, and trigger re-binding of the subsequent path)
				if (!named || boundName || bindto) {
					expr = pathStart[parenDepth - 1];
					if (full.length - 1 > index - (expr || 0)) { // We need to compile a subexpression
						expr = full.slice(expr, index + all.length);
						if (exprFn !== true) { // If not reentrant call during compilation
							binds = bindto || bndStack[parenDepth-1].bd;
							// Insert exprOb object, to be used during binding to return the computed object
							theOb = binds[binds.length-1];
							if (theOb && theOb.prm) {
								while (theOb.sb && theOb.sb.prm) {
									theOb = theOb.sb;
								}
								newOb = theOb.sb = {path: theOb.sb, bnd: theOb.bnd};
							} else {
								binds.push(newOb = {path: binds.pop()}); // Insert exprOb object, to be used during binding to return the computed object
							}											 // (e.g. "some.object()" in "some.object().a.b" - to be used as context for binding the following tokens "a.b")
						}
						rtPrnDot = delimOpenChar1 + ":" + expr // The parameter or function subexpression
							+ " onerror=''" // set onerror='' in order to wrap generated code with a try catch - returning '' as object instance if there is an error/missing parent
							+ delimCloseChar0;
						exprFn = tmplLinks[rtPrnDot];
						if (!exprFn) {
							tmplLinks[rtPrnDot] = true; // Flag that this exprFn (for rtPrnDot) is being compiled
							tmplLinks[rtPrnDot] = exprFn = tmplFn(rtPrnDot, tmpl, true); // Compile the expression (or use cached copy already in tmpl.links)
						}
						if (exprFn !== true && newOb) {
							// If not reentrant call during compilation
							newOb._cpfn = exprFn;
							newOb.prm = bndCtx.bd;
							newOb.bnd = newOb.bnd || newOb.path && newOb.path.indexOf("^") >= 0;
						}
					}
				}
			}
			return (aposed
				// within single-quoted string
				? (aposed = !apos, (aposed ? all : lftPrn2 + '"'))
				: quoted
				// within double-quoted string
					? (quoted = !quot, (quoted ? all : lftPrn2 + '"'))
					:
				(
					(lftPrn
						? (pathStart[parenDepth] = index++, bndCtx = bndStack[++parenDepth] = {bd: []}, lftPrn)
						: "")
					+ (space
						? (parenDepth
							? ""
				// New arg or prop - so insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash, and prepare new bindings array
							: (paramIndex = full.slice(paramIndex, index), named
								? (named = boundName = bindto = false, "\b")
								: "\b,") + paramIndex + (paramIndex = index + all.length, bindings && pathBindings.push(bndCtx.bd = []), "\b")
						)
						: eq
				// named param. Remove bindings for arg and create instead bindings array for prop
							? (parenDepth && syntaxError(params), bindings && pathBindings.pop(), named = path, boundName = bound, paramIndex = index + all.length,
									bindings && ((bindings = bndCtx.bd = pathBindings[named] = []), bindings.skp = !bound), path + ':')
							: path
				// path
								? (path.split("^").join(".").replace(rPath, parsePath)
									+ (prn
				// some.fncall(
										? (bndCtx = bndStack[++parenDepth] = {bd: []}, fnCall[parenDepth] = rtSq, prn)
										: operator)
								)
								: operator
				// operator
									? operator
									: rtPrn
				// function
										? ((rtPrn = fnCall[parenDepth] || rtPrn, fnCall[parenDepth] = false, bndCtx = bndStack[--parenDepth], rtPrn)
											+ (prn // rtPrn and prn, e.g )( in (a)() or a()(), or )[ in a()[]
												? (bndCtx = bndStack[++parenDepth], fnCall[parenDepth] = rtSq, prn)
												: "")
										)
										: comma
											? (fnCall[parenDepth] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
											: lftPrn0
												? ""
												: (aposed = apos, quoted = quot, '"')
				))
			);
		}
	}

	var named, bindto, boundName,
		quoted, // boolean for string content in double quotes
		aposed, // or in single quotes
		bindings = pathBindings && pathBindings[0], // bindings array for the first arg
		bndCtx = {bd: bindings},
		bndStack = {0: bndCtx},
		paramIndex = 0, // list,
		tmplLinks = (tmpl ? tmpl.links : bindings && (bindings.links = bindings.links || {})) || topView.tmpl.links,
		// The following are used for tracking path parsing including nested paths, such as "a.b(c^d + (e))^f", and chained computed paths such as
		// "a.b().c^d().e.f().g" - which has four chained paths, "a.b()", "^c.d()", ".e.f()" and ".g"
		parenDepth = 0,
		fnCall = {}, // We are in a function call
		pathStart = {}, // tracks the start of the current path such as c^d() in the above example
		result = (params + (tmpl ? " " : "")).replace(rParams, parseTokens);

	return !parenDepth && result || syntaxError(params); // Syntax error if unbalanced parens in params expression
}

function buildCode(ast, tmpl, isLinkExpr) {
	// Build the template function code from the AST nodes, and set as property on the passed-in template object
	// Used for compiling templates, and also by JsViews to build functions for data link expressions
	var i, node, tagName, converter, tagCtx, hasTag, hasEncoder, getsVal, hasCnvt, useCnvt, tmplBindings, pathBindings, params, boundOnErrStart,
		boundOnErrEnd, tagRender, nestedTmpls, tmplName, nestedTmpl, tagAndElses, content, markup, nextIsElse, oldCode, isElse, isGetVal, tagCtxFn,
		onError, tagStart, trigger, lateRender,
		tmplBindingKey = 0,
		useViews = $subSettingsAdvanced.useViews || tmpl.useViews || tmpl.tags || tmpl.templates || tmpl.helpers || tmpl.converters,
		code = "",
		tmplOptions = {},
		l = ast.length;

	if ("" + tmpl === tmpl) {
		tmplName = isLinkExpr ? 'data-link="' + tmpl.replace(rNewLine, " ").slice(1, -1) + '"' : tmpl;
		tmpl = 0;
	} else {
		tmplName = tmpl.tmplName || "unnamed";
		if (tmpl.allowCode) {
			tmplOptions.allowCode = true;
		}
		if (tmpl.debug) {
			tmplOptions.debug = true;
		}
		tmplBindings = tmpl.bnds;
		nestedTmpls = tmpl.tmpls;
	}
	for (i = 0; i < l; i++) {
		// AST nodes: [0: tagName, 1: converter, 2: content, 3: params, 4: code, 5: onError, 6: trigger, 7:pathBindings, 8: contentMarkup]
		node = ast[i];

		// Add newline for each callout to t() c() etc. and each markup string
		if ("" + node === node) {
			// a markup string to be inserted
			code += '\n+"' + node + '"';
		} else {
			// a compiled tag expression to be inserted
			tagName = node[0];
			if (tagName === "*") {
				// Code tag: {{* }}
				code += ";\n" + node[1] + "\nret=ret";
			} else {
				converter = node[1];
				content = !isLinkExpr && node[2];
				tagCtx = paramStructure(node[3], 'params') + '},' + paramStructure(params = node[4]);
				trigger = node[6];
				lateRender = node[7];
				markup = node[9] && node[9].replace(rUnescapeQuotes, "$1");
				if (isElse = tagName === "else") {
					if (pathBindings) {
						pathBindings.push(node[8]);
					}
				} else {
					onError = node[5] || $subSettings.debugMode !== false && "undefined"; // If debugMode not false, set default onError handler on tag to "undefined" (see onRenderError)
					if (tmplBindings && (pathBindings = node[8])) { // Array of paths, or false if not data-bound
						pathBindings = [pathBindings];
						tmplBindingKey = tmplBindings.push(1); // Add placeholder in tmplBindings for compiled function
					}
				}
				useViews = useViews || params[1] || params[2] || pathBindings || /view.(?!index)/.test(params[0]);
				// useViews is for perf optimization. For render() we only use views if necessary - for the more advanced scenarios.
				// We use views if there are props, contextual properties or args with #... (other than #index) - but you can force
				// using the full view infrastructure, (and pay a perf price) by opting in: Set useViews: true on the template, manually...
				if (isGetVal = tagName === ":") {
					if (converter) {
						tagName = converter === HTML ? ">" : converter + tagName;
					}
				} else {
					if (content) { // TODO optimize - if content.length === 0 or if there is a tmpl="..." specified - set content to null / don't run this compilation code - since content won't get used!!
						// Create template object for nested template
						nestedTmpl = tmplObject(markup, tmplOptions);
						nestedTmpl.tmplName = tmplName + "/" + tagName;
						// Compile to AST and then to compiled function
						nestedTmpl.useViews = nestedTmpl.useViews || useViews;
						buildCode(content, nestedTmpl);
						useViews = nestedTmpl.useViews;
						nestedTmpls.push(nestedTmpl);
					}

					if (!isElse) {
						// This is not an else tag.
						tagAndElses = tagName;
						useViews = useViews || tagName && (!$tags[tagName] || !$tags[tagName].flow);
						// Switch to a new code string for this bound tag (and its elses, if it has any) - for returning the tagCtxs array
						oldCode = code;
						code = "";
					}
					nextIsElse = ast[i + 1];
					nextIsElse = nextIsElse && nextIsElse[0] === "else";
				}
				tagStart = onError ? ";\ntry{\nret+=" : "\n+";
				boundOnErrStart = "";
				boundOnErrEnd = "";

				if (isGetVal && (pathBindings || trigger || converter && converter !== HTML || lateRender)) {
					// For convertVal we need a compiled function to return the new tagCtx(s)
					tagCtxFn = new Function("data,view,j,u", "// " + tmplName + " " + (++tmplBindingKey) + " " + tagName
										+ "\nreturn {" + tagCtx + "};");
					tagCtxFn._er = onError;
					tagCtxFn._tag = tagName;
					tagCtxFn._bd = !!pathBindings; // data-linked tag {^{.../}}
					tagCtxFn._lr = lateRender;

					if (isLinkExpr) {
						return tagCtxFn;
					}

					setPaths(tagCtxFn, pathBindings);
					tagRender = 'c("' + converter + '",view,';
					useCnvt = true;
					boundOnErrStart = tagRender + tmplBindingKey + ",";
					boundOnErrEnd = ")";
				}
				code += (isGetVal
					? (isLinkExpr ? (onError ? "try{\n" : "") + "return " : tagStart) + (useCnvt // Call _cnvt if there is a converter: {{cnvt: ... }} or {^{cnvt: ... }}
						? (useCnvt = undefined, useViews = hasCnvt = true, tagRender + (tagCtxFn
							? ((tmplBindings[tmplBindingKey - 1] = tagCtxFn), tmplBindingKey) // Store the compiled tagCtxFn in tmpl.bnds, and pass the key to convertVal()
							: "{" + tagCtx + "}") + ")")
						: tagName === ">"
							? (hasEncoder = true, "h(" + params[0] + ")")
							: (getsVal = true, "((v=" + params[0] + ')!=null?v:' + (isLinkExpr ? 'null)' : '"")'))
							// Non strict equality so data-link="title{:expr}" with expr=null/undefined removes title attribute
					)
					: (hasTag = true, "\n{view:view,tmpl:" // Add this tagCtx to the compiled code for the tagCtxs to be passed to renderTag()
						+ (content ? nestedTmpls.length : "0") + "," // For block tags, pass in the key (nestedTmpls.length) to the nested content template
						+ tagCtx + "},"));

				if (tagAndElses && !nextIsElse) {
					// This is a data-link expression or an inline tag without any elses, or the last {{else}} of an inline tag
					// We complete the code for returning the tagCtxs array
					code = "[" + code.slice(0, -1) + "]";
					tagRender = 't("' + tagAndElses + '",view,this,';
					if (isLinkExpr || pathBindings) {
						// This is a bound tag (data-link expression or inline bound tag {^{tag ...}}) so we store a compiled tagCtxs function in tmp.bnds
						code = new Function("data,view,j,u", " // " + tmplName + " " + tmplBindingKey + " " + tagAndElses + "\nreturn " + code + ";");
						code._er = onError;
						code._tag = tagAndElses;
						if (pathBindings) {
							setPaths(tmplBindings[tmplBindingKey - 1] = code, pathBindings);
						}
						code._lr = lateRender;
						if (isLinkExpr) {
							return code; // For a data-link expression we return the compiled tagCtxs function
						}
						boundOnErrStart = tagRender + tmplBindingKey + ",undefined,";
						boundOnErrEnd = ")";
					}

					// This is the last {{else}} for an inline tag.
					// For a bound tag, pass the tagCtxs fn lookup key to renderTag.
					// For an unbound tag, include the code directly for evaluating tagCtxs array
					code = oldCode + tagStart + tagRender + (code.deps && tmplBindingKey || code) + ")";
					pathBindings = 0;
					tagAndElses = 0;
				}
				if (onError && !nextIsElse) {
					useViews = true;
					code += ';\n}catch(e){ret' + (isLinkExpr ? "urn " : "+=") + boundOnErrStart + 'j._err(e,view,' + onError + ')' + boundOnErrEnd + ';}' + (isLinkExpr ? "" : 'ret=ret');
				}
			}
		}
	}
	// Include only the var references that are needed in the code
	code = "// " + tmplName

		+ "\nvar v"
		+ (hasTag ? ",t=j._tag" : "")                // has tag
		+ (hasCnvt ? ",c=j._cnvt" : "")              // converter
		+ (hasEncoder ? ",h=j._html" : "")           // html converter
		+ (isLinkExpr ? ";\n" : ',ret=""\n')
		+ (tmplOptions.debug ? "debugger;" : "")
		+ code
		+ (isLinkExpr ? "\n" : ";\nreturn ret;");

	try {
		code = new Function("data,view,j,u", code);
	} catch (e) {
		syntaxError("Compiled template code:\n\n" + code + '\n: "' + (e.message||e) + '"');
	}
	if (tmpl) {
		tmpl.fn = code;
		tmpl.useViews = !!useViews;
	}
	return code;
}

//==========
// Utilities
//==========

// Merge objects, in particular contexts which inherit from parent contexts
function extendCtx(context, parentContext) {
	// Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
	// If neither context nor parentContext are defined, return undefined
	return context && context !== parentContext
		? (parentContext
			? $extend($extend({}, parentContext), context)
			: context)
		: parentContext && $extend({}, parentContext);
}

// Get character entity for HTML and Attribute encoding
function getCharEntity(ch) {
	return charEntities[ch] || (charEntities[ch] = "&#" + ch.charCodeAt(0) + ";");
}

function getTargetProps(source) {
	// this pointer is theMap - which has tagCtx.props too
	// arguments: tagCtx.args.
	var key, prop,
		props = [];

	if (typeof source === OBJECT) {
		for (key in source) {
			prop = source[key];
			if (key !== $expando && source.hasOwnProperty(key) && !$isFunction(prop)) {
				props.push({key: key, prop: prop});
			}
		}
	}
	return props;
}

function $fnRender(data, context, noIteration) {
	var tmplElem = this.jquery && (this[0] || error('Unknown template')), // Targeted element not found for jQuery template selector such as "#myTmpl"
		tmpl = tmplElem.getAttribute(tmplAttr);

	return renderContent.call(tmpl && $.data(tmplElem)[jsvTmpl] || $templates(tmplElem),
		data, context, noIteration);
}

//========================== Register converters ==========================

function htmlEncode(text) {
	// HTML encode: Replace < > & ' and " by corresponding entities.
	return text != undefined ? rIsHtml.test(text) && ("" + text).replace(rHtmlEncode, getCharEntity) || text : "";
}

//========================== Initialize ==========================

$sub = $views.sub;
$viewsSettings = $views.settings;

if (!(jsr || $ && $.render)) {
	// JsRender not already loaded, or loaded without jQuery, and we are now moving from jsrender namespace to jQuery namepace
	for (jsvStoreName in jsvStores) {
		registerStore(jsvStoreName, jsvStores[jsvStoreName]);
	}

	$converters = $views.converters;
	$helpers = $views.helpers;
	$tags = $views.tags;

	$sub._tg.prototype = {
		baseApply: baseApply,
		cvtArgs: convertArgs,
		bndArgs: convertBoundArgs,
		ctxPrm: contextParameter
	};

	topView = $sub.topView = new View();

	//BROWSER-SPECIFIC CODE
	if ($) {

		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery (= $) is loaded

		$.fn.render = $fnRender;
		$expando = $.expando;
		if ($.observable) {
			$extend($sub, $.views.sub); // jquery.observable.js was loaded before jsrender.js
			$views.map = $.views.map;
		}

	} else {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is not loaded.

		$ = {};

		if (setGlobals) {
			global.jsrender = $; // We are loading jsrender.js from a script element, not AMD or CommonJS, so set global
		}

		// Error warning if jsrender.js is used as template engine on Node.js (e.g. Express or Hapi...)
		// Use jsrender-node.js instead...
		$.renderFile = $.__express = $.compile = function() { throw "Node.js: use npm jsrender, or jsrender-node.js"; };

		//END BROWSER-SPECIFIC CODE
		$.isFunction = function(ob) {
			return typeof ob === "function";
		};

		$.isArray = Array.isArray || function(obj) {
			return ({}.toString).call(obj) === "[object Array]";
		};

		$sub._jq = function(jq) { // private method to move from JsRender APIs from jsrender namespace to jQuery namespace
			if (jq !== $) {
				$extend(jq, $); // map over from jsrender namespace to jQuery namespace
				$ = jq;
				$.fn.render = $fnRender;
				delete $.jsrender;
				$expando = $.expando;
			}
		};

		$.jsrender = versionNumber;
	}
	$subSettings = $sub.settings;
	$subSettings.allowCode = false;
	$isFunction = $.isFunction;
	$.render = $render;
	$.views = $views;
	$.templates = $templates = $views.templates;

	for (setting in $subSettings) {
		addSetting(setting);
	}

	($viewsSettings.debugMode = function(debugMode) {
		return debugMode === undefined
			? $subSettings.debugMode
			: (
				$subSettings.debugMode = debugMode,
				$subSettings.onError = debugMode + "" === debugMode
					? new Function("", "return '" + debugMode + "';")
					: $isFunction(debugMode)
						? debugMode
						: undefined,
				$viewsSettings);
	})(false); // jshint ignore:line

	$subSettingsAdvanced = $subSettings.advanced = {
		useViews: false,
		_jsv: false // For global access to JsViews store
	};

	//========================== Register tags ==========================

	$tags({
		"if": {
			render: function(val) {
				// This function is called once for {{if}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				// If not done (a previous block has not been rendered), look at expression for this block and render the block if expression is truthy
				// Otherwise return ""
				var self = this,
					tagCtx = self.tagCtx,
					ret = (self.rendering.done || !val && (arguments.length || !tagCtx.index))
						? ""
						: (self.rendering.done = true,
							self.selected = tagCtx.index,
							undefined); // Test is satisfied, so render content on current context
				return ret;
			},
			contentCtx: true, // Inherit parent view data context
			flow: true
		},
		"for": {
			render: function(val) {
				// This function is called once for {{for}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				var finalElse = !arguments.length,
					value,
					self = this,
					tagCtx = self.tagCtx,
					result = "",
					done = 0;

				if (!self.rendering.done) {
					value = finalElse ? tagCtx.view.data : val; // For the final else, defaults to current data without iteration.
					if (value !== undefined) {
						result += tagCtx.render(value, finalElse); // Iterates except on final else, if data is an array. (Use {{include}} to compose templates without array iteration)
						done += $isArray(value) ? value.length : 1;
					}
					if (self.rendering.done = done) {
						self.selected = tagCtx.index;
					}
					// If nothing was rendered we will look at the next {{else}}. Otherwise, we are done.
				}
				return result;
			},
			flow: true
		},
		props: {
			baseTag: "for",
			dataMap: dataMap(getTargetProps),
			flow: true
		},
		include: {
			flow: true
		},
		"*": {
			// {{* code... }} - Ignored if template.allowCode and $.views.settings.allowCode are false. Otherwise include code in compiled template
			render: retVal,
			flow: true
		},
		":*": {
			// {{:* returnedExpression }} - Ignored if template.allowCode and $.views.settings.allowCode are false. Otherwise include code in compiled template
			render: retVal,
			flow: true
		},
		dbg: $helpers.dbg = $converters.dbg = dbgBreak // Register {{dbg/}}, {{dbg:...}} and ~dbg() to throw and catch, as breakpoints for debugging.
	});

	$converters({
		html: htmlEncode,
		attr: htmlEncode, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
		url: function(text) {
			// URL encoding helper.
			return text != undefined ? encodeURI("" + text) : text === null ? text : ""; // null returns null, e.g. to remove attribute. undefined returns ""
		}
	});
}
//========================== Define default delimiters ==========================
$subSettings = $sub.settings;
$isArray = ($||jsr).isArray;
$viewsSettings.delimiters("{{", "}}", "^");


if (jsrToJq) { // Moving from jsrender namespace to jQuery namepace - copy over the stored items (templates, converters, helpers...)
	jsr.views.sub._jq($);
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsObservable >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsObservable:
 * See http://www.jsviews.com/#jsobservable and http://github.com/borismoore/jsviews
 * Copyright 2017, Boris Moore
 * Released under the MIT License.
 */

//========================== Top-level vars ==========================

$views = $.views;
$sub = $views.sub;
$isFunction = $.isFunction;
$isArray = $.isArray;
$expando = $.expando;
if (!$.observe) {

	var $eventSpecial = $.event.special,
		slice = [].slice,
		splice = [].splice,
		concat = [].concat,
		PARSEINT = parseInt,
		rNotWhite = /\S+/g,
		propertyChangeStr = $sub.propChng = $sub.propChng || "propertyChange",// These two settings can be overridden on settings after loading
		arrayChangeStr = $sub.arrChng = $sub.arrChng || "arrayChange",        // jsRender, and prior to loading jquery.observable.js and/or JsViews
		cbBindingsStore = {},
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

	ObjectObservable = function(ns, data) {
		this._data = data;
		this._ns = ns;
		return this;
	},

	ArrayObservable = function(ns, data) {
		this._data = data;
		this._ns = ns;
		return this;
	},

	wrapArray = function(data) {
		return $isArray(data)
			? [data]
			: data;
	},

	dependsPaths = function(paths, root, callback) {
		// Process depends = ... paths to resolve objects, and recursively process functions.
		paths = paths
			? $isArray(paths)
				? paths
				: [paths]
			: [];

		var i, path, object, rt,
			nextObj = object = root,
			l = paths && paths.length,
			out = [];

		for (i = 0; i < l; i++) {
			path = paths[i];
			if ($isFunction(path)) { // path is a depends function, returning [path1, ...]
				rt = root.tagName
						? root.linkCtx.data // root is tag instance. rt is current data context of tag
						: root; // rt = root = current data context of computed prop
				out = out.concat(dependsPaths(path.call(root, rt, callback), rt, callback));
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
		if (out.length) {
			out.unshift({_ar: 1}); // Switch on allowArray, for depends paths.
			out.push({_ar: -1});
		}
		return out;
	},

	removeCbBindings = function(cbBindings, cbBindingsId) {
		// If the cbBindings collection is empty we will remove it from the cbBindingsStore
		for (var cb in cbBindings) {
			return;
		}
		delete cbBindingsStore[cbBindingsId]; // This binding collection is empty, so remove from store
	},

	onDataChange = function(ev, eventArgs) {
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
				cb = ctx.cb,
				allowArray = ctx.arOk,
				paths = ctx.paths,
				ns = ctx.ns;

			if (ev.type === arrayChangeStr) {
				(cb.array || cb).call(ctx, ev, eventArgs); // If there is an arrayHandler expando on the regular handler, use it, otherwise use the regular handler for arrayChange events also - for example: $.observe(array, handler)
				// or observeAll() with an array in the graph. Note that on data-link bindings we ensure always to have an array handler - $.noop if none is specified e.g. on the data-linked tag.
			} else if (ctx.prop === eventArgs.path || ctx.prop === "*") {
				if (observeAll) {
					allPath = observeAll._path + "." + eventArgs.path;
					filter = observeAll.filter;
					parentObs = [ev.target].concat(observeAll.parents());

					if (isOb(oldValue)) {
						observe_apply(undefined, ns, [oldValue], paths, cb, true, filter, [parentObs], allPath); // unobserve
					}
					if (isOb(value)) {
						observe_apply(undefined, ns, [value], paths, cb, undefined, filter, [parentObs], allPath);
					}
				} else {
					if (isOb(oldValue)) { // oldValue is an object, so unobserve
						observe_apply(undefined, ns, [oldValue], paths, cb, true); // unobserve
					}
					if (isOb(value)) { // value is an object, so observe
						observe_apply(undefined, ns, [value], paths, cb);
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

	$observeAll = function(cb, filter, unobserve) {
		observeAll(this._ns, this._data, cb, filter, [], "root", unobserve);
	},

	$unobserveAll = function(cb, filter) {
		$observeAll.call(this, cb, filter, true);
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
				case "set":
					newAllPath = allPath + "." + eventArgs.path;
					filterAndObserveAll(eventArgs, "oldValue", true); // unobserve old value
					filterAndObserveAll(eventArgs, "value"); // observe new value
			}
			updatedTgt = undefined;
			cb.apply(this, arguments); // Observe this object (invoke the callback)
		}
		wrappedCb._wrp = 1;

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
		return $observe.apply(undefined, arguments);
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

				if (!unobserve && (off || isArrayBinding)) {
					events = obIdExpando && $._data(object);
					events = events && events.events;
					events = events && events[isArrayBinding ? arrayChangeStr : propertyChangeStr];
					el = events && events.length;
					while (el--) { // Skip duplicates
						data = events[el] && events[el].data;
						if (data && (off && data.ns !== initialNs
							// When observing, don't unbind dups unless they have the same namespace
							|| !off && data.ns === initialNs && data.cb && data.cb._cId === callback._cId && (!callback._wrp || data.cb._wrp)))
							// When observing and doing array binding, don't bind dups if they have the same namespace (Dups can happen e.g. with {^{for people ^~foo=people}})
						{
							return;
						}
					}
				}
				if (unobserve || off) {
					$(boundObOrArr).off(namespace, onDataChange);
				} else {
					evData = isArrayBinding ? {}
						: {
							fullPath: path,
							paths: pathStr ? [pathStr] : [],
							prop: prop,
							arOk: allowArray
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
							filter: filter
						};
					}
					$(boundObOrArr).on(namespace, null, evData, onDataChange);

					if (cbBindings) {
						// Add object to cbBindings
						cbBindings[$data(object).obId || $data(object, "obId", observeObjKey++)] = object;
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
				// Note: For jsviews/issues/292 ctxCb will need var ctxCb = contextCb || function(exprOb, origRt) {return exprOb._cpfn(origRt);};

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
							if (sub || allowArray && $isArray(newObj)) { // observe on new object
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
					// allowArray is 1 if this is a call to observe that does not come from observeAndBind (tag binding), or is from a 'depends' path,
					// so we allow arrayChange binding. Otherwise allowArray is zero.
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
						observeOnOff(arrayChangeStr + ".observe" + (callback ? getCbKey(callback) : ""), undefined, true, unbind);
					}
					object = prevObj;
					allPath = prevAllPath;
				}
			}

			var i, p, skip, parts, prop, path, dep, unobserve, callback, cbId, inId, el, data, events, contextCb, innerContextCb,
				items, cbBindings, depth, innerCb, parentObs, allPath, filter, initNsArr, initNsArrLen, view, cbItemCount,
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
				lastArg = l && lastArg + "" !== lastArg && (!lastArg || $isFunction(lastArg)) ? (l--, paths.pop()) : undefined;
				if (unobserve && !l && $isFunction(root)) {
					lastArg = root;
					root = undefined;
				}
			}
			callback = lastArg;
			if (l && $isFunction(paths[l - 1])) {
				innerContextCb = contextCb = callback;
				callback = paths.pop();
				l--;
			}

			if (unobserve && callback && !callback._cId) {
				return;
			}

			// Use a unique namespace (e.g. obs7) associated with each observe() callback to allow unobserve to remove handlers
			ns += callback
				? ((inId = callback._inId || ""), unobserve)
					? callback._cId + inId
					: (cbId = getCbKey(callback)) + inId
				: "";

			if (cbId && !unobserve) {
				cbBindings = cbBindingsStore[cbId] = cbBindingsStore[cbId] || {};
			}

			initNsArr = initialNs && initialNs.match(rNotWhite) || [""];
			initNsArrLen = initNsArr.length;

			while (initNsArrLen--) {
				initialNs = initNsArr[initNsArrLen];
				if (root && !paths[0]) {
					if ($isArray(root)) {
						bindArray(root, unobserve, true); // observe(array, handler)
					}
					if (unobserve) {
						observeOnOff(ns, ""); // unobserve(objectOrArray[, handler])
					}
				}
				if (unobserve && !l && !root) { // unobserve() - unobserves all
					for (p in cbBindingsStore) {
						p = cbBindingsStore[p];
						for (data in p) {
							object = p[data];
							if ($isArray(object)) {
								bindArray(object, unobserve, unobserve);
							} else {
								observeOnOff(ns, "");
							}
						}
					}
				}
				depth = 0;
				cbItemCount = 0;
				for (i = 0; i < l; i++) {
					if (cbItemCount) {
						cbItemCount--; // contextCb was moved to a contextual parameter outer context. Needs to revert after cbItemCount
					} else {
						contextCb = innerContextCb;
					}

					path = paths[i];
					if (path === "" || path === root) {
						continue;
					}
					if (path && path._ar) {
						allowArray += path._ar; // Switch on allowArray for depends paths, and off, afterwards.
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
						if (contextCb) {
							items = contextCb(path, root, depth);
						}
						contextCb = innerContextCb;
						parts = path.split(".");
					} else if (path && path._cxp) { // contextual parameter
						view = path.shift();  // Contextual data
						if (_ocp in view) {
							root = view; // observable contextual parameter
							contextCb = 0;
						} else {
							contextCb = $sub._gccb(view); // getContextCb: Get context callback for the contextual view (where contextual param evaluated/assigned)
							root = view.data;
						}
						items = path;
						items.push(origRoot);
						cbItemCount = items.length;
					} else {
						if (!$isFunction(path)) {
							if (path && path._cpfn) {
								// Path is an exprOb returned by a computed property - helper/data function (compiled expr function).
								// Set current object on exprOb.ob, and get innerCb for updating the object
								innerCb = unobserve ? path.cb : getInnerCb(path);
								// innerCb._ctx = callback._ctx; Could pass context (e.g. linkCtx) for use in a depends = function() {} call, so depends is different for different linkCtx's
								innerCb._cId = callback._cId;
								// Set the same cbBindingsStore key as for callback, so when callback is disposed, disposal of innerCb happens too.
								innerCb._inId = innerCb._inId || ".obIn" + observeInnerCbKey++;
								if (path.bnd || path.prm && path.prm.length || !path.sb) {
									// If the exprOb is bound e.g. foo()^sub.path, or has parameters e.g. foo(bar) or is a leaf object (so no sub path) e.g. foo()
									// then observe changes on the object, or its parameters and sub-path
									innerObserve([object], path.path, [path.root||root], path.prm, innerCb, contextCb, unobserve);
								}
								if (path.sb) { // subPath
									if (path.sb.prm) {
										path.sb.root = root;
									}
									innerObserve([path.ob], path.sb, callback, contextCb, unobserve);
								}
								path = origRoot;
								object = undefined;
							}
						}
						parts = [root = path];
					}
					if (items) {
						// If the array of objects and paths returned by contextCb is non empty, insert them
						// into the sequence, replacing the current item (path). Otherwise simply remove current item (path)
						l += items.length - 1;
						splice.apply(paths, [i--, 1].concat(items));
						items = undefined;
						continue;
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
												&& data.ns === initialNs
												&& data.cb._cId === callback._cId
												&& data.cb._inId === callback._inId
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
											$.observable(initialNs, object)[(unobserve ? "un" : "") + "observeAll"](callback); // observe or unobserve the object for any property change
										}
										break;
									} else if (prop) {
										observeOnOff(ns + ".p_" + prop, parts.join("^")); // By using "^" rather than "." we ensure that deep binding will be used on newly inserted object graphs
									}
								}
								if (allPath) {
									allPath += "." + prop;
								}
								prop = object[prop];
								if (!parts[0]) {
									bindArray(prop, unobserve); // [un]observe(object, "arrayProperty") observes array changes on property of type array
								}
							}
							if ($isFunction(prop)) {
								if (dep = prop.depends) {
									// This is a computed observable. We will observe any declared dependencies.
									// Pass {_ar: ...} objects to switch on allowArray, for depends paths, then return to contextual allowArray value
									innerObserve([object], dependsPaths(dep, object, callback), callback, contextCb, unobserve);
								}
								break;
							}
							object = prop;
						}
					}
				}
			}
			if (cbId) {
				removeCbBindings(cbBindings, cbId);
			}

			// Return the cbBindings to the top-level caller, along with the cbId
			return {cbId: cbId, bnd: cbBindings};
		}

		var initialNs,
			allowArray = this == 1 ? 0 : 1, // If this == 1, this is a call from observeAndBind - doing binding of datalink expressions. We don't bind
			// arrayChange events in this scenario. Instead, {^{for}} and similar do specific arrayChange binding to the tagCtx.args[0] value, in onAfterLink.
			// Note deliberately using this == 1, rather than this === 1 because of IE<10 bug- see jsviews/issues/237
			paths = slice.call(arguments),
			origRoot = paths[0];

		if (origRoot + "" === origRoot && allowArray) {
			initialNs = origRoot; // The first arg is a namespace, since it is a string, and this call is not from observeAndBind
			paths.shift();
			origRoot = paths[0];
		}
		return innerObserve.apply(1, paths);
	};

	$observable = function(ns, data) {
		if (arguments.length === 1) {
			data = ns;
			ns = "";
		}
		return $isArray(data)
			? new ArrayObservable(ns, data)
			: new ObjectObservable(ns, data);
	};

	//========================== Initialize ==========================

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
			path = path || "";
			var key, pair, parts,
				multi = path + "" !== path && !path._is, // Hash of paths, not view object
				self = this,
				object = self._data;

			if (object) {
				if (multi) {
					nonStrict = value;
					if ($isArray(path)) {
						// This is the array format generated by serializeArray. However, this has the problem that it coerces types to string,
						// and does not provide simple support of convertTo and convertFrom functions.
						key = path.length;
						while (key--) {
							pair = path[key];
							self.setProperty(pair.name, pair.value, nonStrict === undefined || nonStrict); //If nonStrict not specified, default to true;
						}
					} else {
						// Object representation where property name is path and property value is value.
						for (key in path) {
							self.setProperty(key, path[key], nonStrict);
						}
					}
				} else if (path !== $expando) {
					// Simple single property case.
					if (path._is) {
						parts = [path];
					} else {
						parts = path.split(/[.^]/);
						while (object && parts.length > 1) {
							object = object[parts.shift()];
						}
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
					leaf = leaf._vw // Case of JsViews 2-way data-linking to an observable context parameter, with a setter.
						// The view will be the this pointer for getter and setter. Note: this is the one scenario where path is "".
					 || leaf;
					getter = property;
					setter = getter.set === true ? getter : getter.set;
					property = getter.call(leaf); // get - only treated as getter if also a setter. Otherwise it is simply a property of type function.
					// See unit tests 'Can observe properties of type function'.
				}
			}

			if ((property !== value || nonStrict && property != value)
				// Optional non-strict equality, since serializeArray, and form-based editors can map numbers to strings, etc.
				// Date objects don't support != comparison. Treat as special case.
				&& (!(property instanceof Date && value instanceof Date) || property > value || property < value)) {
				if (setter) {
					setter.call(leaf, value);   //set
					value = getter.call(leaf);  //get updated value
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
		},

		_trigger: function(target, eventArgs) {
			$(target).triggerHandler(propertyChangeStr + (this._ns ? "." + /^\S+/.exec(this._ns)[0] : ""), eventArgs); // If white-space separated namespaces, use first one only
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
			if (index > -1) {
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
			if (index > oldLength) {
				index = oldLength;
			}
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
			if (numToRemove > 0 && index > -1) {
				items = _data.slice(index, index + numToRemove);
				if (numToRemove = items.length) {
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
				this._move(oldIndex, newIndex, numToMove);
			}
			return this;
		},

		_move: function(oldIndex, newIndex, numToMove) {
			var items,
				_data = this._data,
				oldLength = _data.length,
				excess = oldIndex + numToMove - oldLength;
			if (excess > 0) {
				numToMove -= excess;
			}
			if (numToMove) {
				items = _data.splice(oldIndex, numToMove); // remove
				if (newIndex > _data.length) {
					newIndex = _data.length;
				}
				splice.apply(_data, [newIndex, 0].concat(items)); //re-insert
				if (newIndex !== oldIndex) {
					this._trigger({change: "move", oldIndex: oldIndex, index: newIndex, items: items}, oldLength);
				}
			}
		},

		refresh: function(newItems) {
			function insertAdded() {
				if (k) {
					self.insert(j-k, addedItems); // Not found in original array - so insert
					dataLength += k;
					i += k;
					k = 0;
					addedItems = [];
				}
			}

			// For refresh operation we iteratively step through the target array and sort by move/add/remove operations on the source array until they match
			var i, j, k, newItem, num,
				self = this,
				addedItems = [],
				data = self._data,
				oldItems = data.slice(),
				oldLength = data.length,
				dataLength = oldLength,
				newLength = newItems.length;
			self._srt = true; // Flag for sorting during refresh
			for (j=k=0; j<newLength; j++) {
				if ((newItem = newItems[j]) === data[j-k]) {
						insertAdded();
				} else {
					for (i=j-k; i<dataLength; i++) {
						if (newItem === data[i]) {
							break;
						}
					}
					if (i<dataLength) {
						insertAdded();
						num = 0;
						while (num++ < newLength-i && newItems[j+num] === data[i+num]);
						self.move(i, j, num); // Found newItem in original array - so move it to new position
						j += num - 1;
					} else {
						k++;
						addedItems.push(newItem); // Not found in original array - so insert
					}
				}
			}
			insertAdded();
			if (dataLength > j) {
				self.remove(j, dataLength - j);
			}
			self._srt = undefined; // We have finished sort operations during refresh
			self._trigger({change: "refresh", oldItems: oldItems}, oldLength);
			return self;
		},

		_trigger: function(eventArgs, oldLength) {
			var self = this,
				_data = self._data,
				length = _data.length,
				$_data = $([_data]);
			if (self._srt) {
				eventArgs.refresh = true; // We are sorting during refresh
			} else if (length !== oldLength) { // We have finished sort operations during refresh
				$_data.triggerHandler(propertyChangeStr, {change: "set", path: "length", value: length, oldValue: oldLength});
			}
			$_data.triggerHandler(arrayChangeStr + (self._ns ? "." + /^\S+/.exec(self._ns)[0] : ""), eventArgs); // If white-space separated namespaces, use first one only
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
					if (mapDef.obsTgt) {
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

	$sub.advSet = function() { // refresh advanced settings
		$sub._gccb = this._gccb; // getContextCallback method
		global._jsv = $subSettings.advanced._jsv
			? { // create global _jsv, for accessing views, etc
					cbBindings: cbBindingsStore
				}
			: undefined; // In IE8 cannot do delete global._jsv
	};
	$sub._dp = dependsPaths;
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< JsViews >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/* JsViews:
 * Interactive data-driven views using templates and data-linking.
 * See http://www.jsviews.com/#jsviews and http://github.com/BorisMoore/jsviews
 * Copyright 2017, Boris Moore
 * Released under the MIT License.
 */

//========================== Top-level vars ==========================

$viewsSettings = $views.settings;
$subSettings = $sub.settings;
$subSettingsAdvanced = $subSettings.advanced;
$converters = $views.converters;
$.templates = $templates = $views.templates;
$tags = $views.tags;
rFirstElem = /<(?!script)(\w+)[>\s]/;

if ($.link) { return $; } // JsViews is already loaded

$subSettings.trigger = true;
var activeBody, rTagDatalink, $view, $viewsLinkAttr, linkViewsSel, wrapMap, viewStore, oldAdvSet, useInput,
	jsvAttrStr = "data-jsv",
	elementChangeStr = "change.jsv",
	onBeforeChangeStr = "onBeforeChange",
	onAfterChangeStr = "onAfterChange",
	onAfterCreateStr = "onAfterCreate",
	CHECKED = "checked",
	CHECKBOX = "checkbox",
	RADIO = "radio",
	NONE = "none",
	VALUE = "value",
	SCRIPT = "SCRIPT",
	TRUE = "true",
	closeScript = '"></script>',
	openScript = '<script type="jsv',
	deferAttr = jsvAttrStr + "-df",
	bindElsSel = "script,[" + jsvAttrStr + "]",
	fnSetters = {
		value: "val",
		input: "val",
		html: HTML,
		text: "text"
	},
	valueBinding = {from: VALUE, to: VALUE},
	isCleanCall = 0,
	oldCleanData = $.cleanData,
	oldJsvDelimiters = $viewsSettings.delimiters,
	safeFragment = document.createDocumentFragment(),
	qsa = document.querySelector,

	// elContent maps tagNames which have only element content, so may not support script nodes.
	elContent = {ol: 1, ul: 1, table: 1, tbody: 1, thead: 1, tfoot: 1, tr: 1, colgroup: 1, dl: 1, select: 1, optgroup: 1, svg: 1, svg_ns: 1},
	badParent = {tr: "table"},
	voidElems = {br: 1, img: 1, input: 1, hr: 1, area: 1, base: 1, col: 1, link: 1, meta: 1,
		command: 1, embed: 1, keygen: 1, param: 1, source: 1, track: 1, wbr: 1},
	displayStyles = {},
	bindingStore = {},
	bindingKey = 1,
	rViewPath = /^#(view\.?)?/,
	rConvertMarkers = /((\/>)|<\/(\w+)>|)(\s*)([#\/]\d+(?:_|(\^)))`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>)|$)/g,
	rOpenViewMarkers = /(#)()(\d+)(_)/g,
	rOpenMarkers = /(#)()(\d+)([_^])/g,
	rViewMarkers = /(?:(#)|(\/))(\d+)(_)/g,
	rOpenTagMarkers = /(#)()(\d+)(\^)/g,
	rMarkerTokens = /(?:(#)|(\/))(\d+)([_^])([-+@\d]+)?/g,
	rSplitBindings = /&(\d+)\+?/g,
	getComputedStyle = global.getComputedStyle;

$observable = $.observable;

if (!$observable) {
	// JsObservable is not loaded.
	throw requiresStr + "JsObservable"; // jquery.observable.js must be loaded before JsViews
}

$observe = $observable.observe;

//========================== Top-level functions ==========================

//===============
// Event handlers
//===============

function updateValues(sourceValues, tagElse, bindId, ev) {
// Observably update data values targeted by bindTo
// Called when linkedElem changes: called as updateValues(sourceValues, tagElse, bindId, ev) - this: undefined
// Called directly as tag.updateValues(val1, val2, val3, ...) - this: tag
	var linkCtx, cvtBack, cnvtName, target, view, binding, sourceValue, origVals, sourceElem, sourceEl,
		oldLinkCtx, tos, to, tcpTag, exprOb, contextCb, l, tag;

	if (bindId && bindId._tgId) {
		tag = bindId;
		bindId = tag._tgId;
	}
	if (binding = bindingStore[bindId]) {
		if (tos = binding.to) {
			tos = tos[tagElse||0];
			// The binding has a 'to' field, which is of the form [tosForElse0, tosForElse1, ...]
			// where tosForElseX is of the form [[[targetObject, toPath], [targetObject, toPath], ...], cvtBack]
			linkCtx = binding.linkCtx;
			sourceElem = linkCtx.elem;
			view = linkCtx.view;
			tag = linkCtx.tag;
			if (!tag && tos._cxp) {
				tag = tos._cxp.path !== _ocp && tos._cxp.tag;
				sourceValue = sourceValues[0];
				sourceValues = [];
				sourceValues[tos._cxp.ind] = sourceValue;
			}

			if (tag) {
				tag._.chg = 1; // Set 'changing' marker to prevent tag update from updating itself
				if (cnvtName = tag.convertBack) {
					if ($isFunction(cnvtName)) {
						cvtBack = cnvtName;
					} else {
						cvtBack = view.getRsc("converters", cnvtName);
					}
				}
			}

			if (sourceElem.nodeName === "SELECT") {
				// data-link <select> to string or (multiselect) array of strings
				if (sourceElem.multiple && sourceValues[0] === null) {
					// Case where sourceValues was undefined, and set to [null] by $source[setter]() above
					sourceValues = [[]];
				}
				sourceElem._jsvSel = sourceValues;
			}
			origVals = sourceValues;
			if (cvtBack) {
				sourceValues = cvtBack.apply(tag, sourceValues);
				if (sourceValues === undefined) {
					tos = []; // If cvtBack does not return anything, do not update target.
					//(But cvtBack may be designed to modify observable values from code as a side effect)
				}
				sourceValues = $isArray(sourceValues) ? sourceValues : [sourceValues];
				// If there are multiple tos (e.g. multiple args on data-linked input) then cvtBack can update not only
				// the first arg, but all of them by returning an array.
			}

			// Set linkCtx on view, dynamically, just during this handler call
			oldLinkCtx = view.linkCtx;
			view.linkCtx = linkCtx;
			l = tos.length;
			while (l--) {
				if (to = tos[l]) {
					to = to + "" === to ? [linkCtx.data, to] : to; // [object, path]
					target = to[0];
					tcpTag = to.tag; // If this is a tag contextual parameter - the owner tag
					sourceValue = (to[1] === _ocp
						? origVals  // If to target is for tag contextual parameter set to static expression (or uninitialized) - we are
						// binding to tag.ctx.foo._ocp - and we use original values, without applying cvtBack converter
						: sourceValues // Otherwise use the converted value
					)[l];
					if (sourceValue !== undefined && (!tag || !tag.onBeforeUpdateVal || tag.onBeforeUpdateVal(ev, {
							change: "change",
							data: target,
							path: to[1],
							index: l,
							tagElse: tagElse,
							value: sourceValue
						}) !== false)) {
						if (tcpTag) { // We are modifying a tag contextual parameter ~foo (e.g. from within block) so update 'owner' tag: tcpTag
							tcpTag.updateValue(sourceValue, to.ind, to.tagElse, undefined, ev);
							if (tcpTag.setValue) {
								tcpTag.setValue(sourceValue, to.ind, to.tagElse);
							}
						} else if (sourceValue !== undefined && target) {
							if (tcpTag = ev && (sourceEl = ev.target)._jsvInd === l && sourceEl._jsvLkEl) {
								// The source is a tag linkedElem (linkedElement: [..., "elemSelector", ...], which is updating
								tcpTag.setValue(origVals[l], l, sourceEl._jsvElse);
							}
							if (target._cpfn) {
								contextCb = linkCtx._ctxCb; // This is the exprOb for a computed property
								exprOb = target;
								target = linkCtx.data;
								if (exprOb._cpCtx) { // Computed value for a contextual parameter
									target = exprOb.data; // The data for the contextual view (where contextual param expression evaluated/assigned)
									contextCb = exprOb._cpCtx; // Context callback for contextual view
								}
								while (exprOb && exprOb.sb) { // Step through chained computed values to leaf one...
									target = contextCb(exprOb, target);
									exprOb = exprOb.sb;
								}
							}
							$observable(target).setProperty(to[1], sourceValue); // 2way binding change event - observably updating bound object
						}
					}
				}
			}
			view.linkCtx = oldLinkCtx;
		}
	}
	if (tag) {
		tag._.chg = undefined; // Clear marker
		return tag;
	}
}

function onElemChange(ev) {
	var bindId, val,
		source = ev.target,
		fromAttr = defaultAttr(source),
		setter = fnSetters[fromAttr];

	if (!source._jsvTr || ev.delegateTarget !== activeBody && ev.target.type !== "number" || ev.type === "input") {
		// If this is an element using trigger, ignore event delegated (bubbled) to activeBody
		val = $isFunction(fromAttr)
			? fromAttr(source)
			: (source = $(source), setter
				? source[setter]()
				: source.attr(fromAttr));

		ev.target._jsvChg = 1; // // Set 'changing' marker to prevent linkedElem change event triggering its own refresh
		rSplitBindings.lastIndex = 0; // Ensure starts at zero
		while (bindId = rSplitBindings.exec(ev.target._jsvBnd)) {
			// _jsvBnd is a string with the syntax: "&bindingId1&bindingId2"
			updateValue(val, source._jsvInd, source._jsvElse, bindId[1], ev);
		}
		ev.target._jsvChg = undefined; // Clear marker
	}
}

function onDataLinkedTagChange(ev, eventArgs) {
	// Update or initial rendering of any tag (including {{:}}) whether inline or data-linked element.
	var attr, sourceValue, noUpdate, forceUpdate, hasError, onError, bindEarly,
		linkCtx = this,
		linkFn = linkCtx.fn,
		tag = linkCtx.tag,
		source = linkCtx.data,
		target = linkCtx.elem,
		cvt = linkCtx.convert,
		parentElem = target.parentNode,
		view = linkCtx.view,
		oldLinkCtx = view.linkCtx,
		onEvent = eventArgs && changeHandler(view, onBeforeChangeStr, tag);

	// Set linkCtx on view, dynamically, just during this handler call
	view.linkCtx = linkCtx;
	if (parentElem && (!onEvent || onEvent.call(tag || linkCtx, ev, eventArgs) !== false)
			// If data changed, the ev.data is set to be the path. Use that to filter the handler action...
			&& (!eventArgs || ev.data.prop === "*" || ev.data.prop === eventArgs.path)) {

		if (eventArgs) {
			linkCtx.eventArgs = eventArgs;
		}
		if (eventArgs || linkCtx._toLk) {
			// If eventArgs are defined, this is a data update
			// Otherwise this is the initial data-link rendering call. Bind on this the first time it gets called
			linkCtx._toLk = 0; // Remove flag to skip unneccessary rebinding next time
			if (linkFn._er) {
				// data-link="exprUsingTagOrCvt with onerror=..." - e.g. {tag ... {cvt:... {:... convert='cvt'
				try {
					sourceValue = linkFn(source, view, $sub); // Compiled link expression
					// For data-link="{:xxx}" with no cvt or cvtBk returns value. Otherwise returns tagCtxs
				} catch (e) {
					hasError = linkFn._er;
					onError = onRenderError(e,view,(new Function("data,view", "return " + hasError + ";"))(source, view));
					sourceValue = [{props: {}, args: [onError], tag: tag}];
				}
			} else {
				sourceValue = linkFn(source, view, $sub); // Compiled link expression
				// For data-link="{:xxx}" with no cvt or cvtBk returns value. Otherwise returns tagCtxs
			}
			// Compiled link expression for linkTag: return value for data-link="{:xxx}" with no cvt or cvtBk, otherwise tagCtx or tagCtxs
			attr = tag && tag.attr || linkCtx.attr || defaultAttr(target, true, cvt !== undefined);
			if (attr === VALUE && (tag && tag.parentElem || linkCtx.elem).type === CHECKBOX) {
				attr = CHECKED;
			}
			// For {{: ...}} without a convert or convertBack, (tag and linkFn._tag undefined) we already have the sourceValue, and we are done
			if (tag) {
				// Existing tag instance
				forceUpdate = hasError || tag._er;
				// If the new tagCtxs hasError or the previous tagCtxs had error, then force update
				sourceValue = sourceValue[0] ? sourceValue : [sourceValue];

				// Tag will update unless tag.onUpdate is false or is a function which returns false
				noUpdate = !forceUpdate && (tag.onUpdate === false || eventArgs && $isFunction(tag.onUpdate) && tag.onUpdate(ev, eventArgs, sourceValue) === false);

				mergeCtxs(tag, sourceValue, forceUpdate); // Merge new tagCtxs (in sourceValue var) with current tagCtxs on tag instance

				if (tag._.chg && (attr === HTML || attr === VALUE) || noUpdate || attr === NONE) {
					// This is an update coming from the tag itself (linkedElem change), or else onUpdate returned false, or attr === "none"
					callAfterLink(tag, ev, eventArgs);
					if (!tag._.chg) {
						// onUpdate returned false, or attr === "none" - so don't refresh the tag: we just use the new tagCtxs merged
						// from the sourceValue (which may optionally have been modifed in onUpdate()...) and then bind, and we are done
						observeAndBind(linkCtx, source, target);
					}
					view.linkCtx = oldLinkCtx;
					if (eventArgs && (onEvent = changeHandler(view, onAfterChangeStr, tag))) {
						onEvent.call(tag || linkCtx, ev, eventArgs);
					}
					return;
				}

				if (tag.onUnbind) {
					tag.onUnbind(tag.tagCtx, linkCtx, tag.ctx, ev, eventArgs);
				}

				sourceValue = tag.tagName === ":" // Call convertVal if it is a {{cvt:...}} - otherwise call renderTag
					? $sub._cnvt(tag.convert, view, sourceValue[0]) // convertVal()    // convertVal(converter, view, tagCtx, onError)
					: $sub._tag(tag, view, view.tmpl, sourceValue, true, onError); // renderTag(tagName, parentView, tmpl, tagCtxs, isUpdate, onError)
			} else if (linkFn._tag) {
				// For {{: ...}} with either cvt or cvtBack we call convertVal to get the sourceValue and instantiate the tag
				// If cvt is undefined then this is a tag, and we call renderTag to get the rendered content and instantiate the tag
				cvt = cvt === "" ? TRUE : cvt; // If there is a cvtBack but no cvt, set cvt to "true"
				sourceValue = cvt // Call convertVal if it is a {{cvt:...}} - otherwise call renderTag
					? $sub._cnvt(cvt, view, sourceValue[0] || sourceValue)                 // convertVal(converter, view, tagCtx, onError)
					: $sub._tag(linkFn._tag, view, view.tmpl, sourceValue, true, onError); // renderTag(tagName, parentView, tmpl, tagCtxs, isUpdate, onError)

				addLinkMethods(tag = linkCtx.tag); // In both convertVal and renderTag we have instantiated a tag
				attr = linkCtx.attr || attr; // linkCtx.attr may have been set to tag.attr during tag instantiation in renderTag
			}
			if (bindEarly = tag && !tag.inline && tag.template) {
				// Data-linked tags with templated contents need to be data-linked before their contents, so that observable updates
				// will trigger the parent tags before the child tags.
				observeAndBind(linkCtx, source, target);
			}
			updateContent(sourceValue, linkCtx, attr, tag);
			linkCtx._noUpd = 0; // For data-link="^{...}" remove _noUpd flag so updates on subsequent calls

			if (tag) {
				tag._er = hasError;
				callAfterLink(tag, ev, eventArgs);
			}
		}

		if (!bindEarly) {
			observeAndBind(linkCtx, source, target);
		}

		if (eventArgs && (onEvent = changeHandler(view, onAfterChangeStr, tag))) {
			onEvent.call(tag || linkCtx, ev, eventArgs);
		}
		// Remove dynamically added linkCtx from view
		view.linkCtx = oldLinkCtx;
	}
}

function setDefer(elem, value) {
	elem._df = value; // Use both an expando and an attribute to track deferred tokens. Attribute is needed for querySelectorAll for getViewInfos (childTags)
	elem[(value ? "set" : "remove") + "Attribute"](deferAttr, "");
}

function updateContent(sourceValue, linkCtx, attr, tag) {
	// When called for a tag, either in tag.refresh() or onDataLinkedTagChange(), returns tag
	// When called (in onDataLinkedTagChange) for target HTML returns true
	// When called (in onDataLinkedTagChange) for other targets returns boolean for "changed"
	var setter, prevNode, nextNode, late, nodesToRemove, useProp, tokens, id, openIndex, closeIndex, testElem, nodeName, cStyle, jsvSel,
		renders = attr !== NONE && sourceValue !== undefined && !linkCtx._noUpd && !((attr === VALUE || attr === HTML) && (tag ? tag._.chg : linkCtx.elem._jsvChg)),
		// For data-link="^{...}", don't update the first time (no initial render) - e.g. to leave server rendered values.
		source = linkCtx.data,
		target = tag && tag.parentElem || linkCtx.elem,
		targetParent = target.parentNode,
		$target = $(target),
		view = linkCtx.view,
		targetVal = linkCtx._val,
		oldLinkCtx = view.linkCtx,
		change = tag;

	if (tag) {
		// Initialize the tag with element references
		tag._.unlinked = true; // Set to unlinked, so initialization is triggered after re-rendering, e.g. for setting linkedElem, and calling onBind
		tag.parentElem = tag.parentElem || (linkCtx.expr || tag._elCnt) ? target : targetParent;
		prevNode = tag._prv;
		nextNode = tag._nxt;
	}
	if (!renders) {
		linkCtx._val = sourceValue;
		return;
	}

	if (attr === "visible") {
		attr = "css-display";
	}
	if (/^css-/.test(attr)) {
		if (linkCtx.attr === "visible") {
			// Get the current display style
			cStyle = (target.currentStyle || getComputedStyle.call(global, target, "")).display;

			if (sourceValue) {
				// We are showing the element.
				// Get the cached 'visible' display value from the -jsvd expando
				sourceValue = target._jsvd
					// Or, if not yet cached, get the current display value
					|| cStyle;
				if (sourceValue === NONE && !(sourceValue = displayStyles[nodeName = target.nodeName])) {
					// Currently display value is 'none', and the 'visible' style has not been cached.
					// We create an element to find the correct 'visible' display style for this nodeName
					testElem = document.createElement(nodeName);
					document.body.appendChild(testElem);

					// Get the default style for this HTML tag to use as 'visible' style
					sourceValue
						// and cache it as a hash against nodeName
						= displayStyles[nodeName]
						= (testElem.currentStyle || getComputedStyle.call(global, testElem, "")).display;
					document.body.removeChild(testElem);
				}
			} else {
				// We are hiding the element.
				// Cache the current display value as 'visible' style, on _jsvd expando, for when we show the element again
				target._jsvd = cStyle;
				sourceValue = NONE; // Hide the element
			}
		}
		if (change = change || targetVal !== sourceValue) {
			$.style(target, attr.slice(4), sourceValue);
		}
	} else if (attr !== "link") { // attr === "link" is for tag controls which do data binding but have no rendered output or target
		if (/^data-/.test(attr)) {
			$.data(target, attr.slice(5), sourceValue); // Support for binding to data attributes: data-foo{:expr}: data-foo attribute will be
			// expr.toString(), but $.data(element, "foo") and $(element).data("foo") will actually return value of expr, even if of type object
		} else if (/^prop-/.test(attr)) {
			useProp = true;
			attr = attr.slice(5);
		} else if (attr === CHECKED) {
			useProp = true;
			sourceValue = sourceValue && sourceValue !== "false";
			// The string value "false" can occur with data-link="checked{attr:expr}" - as a result of attr, and hence using convertVal()
			// We will set the "checked" property
			// We will compare this with the current value
		} else if (attr === RADIO) {
			// This is a special binding attribute for radio buttons, which corresponds to the default 'to' binding.
			// This allows binding both to value (for each input) and to the default checked radio button (for each input in named group,
			// e.g. binding to parent data).
			// Place value binding first: <input type="radio" data-link="value{:name} {:#get('data').data.currency:} " .../>
			// or (allowing any order for the binding expressions):
			// <input type="radio" value="{{:name}}" data-link="{:#get('data').data.currency:} value^{:name}" .../>
			useProp = true;
			attr = CHECKED;
			sourceValue = target.value === sourceValue;
			// If the data value corresponds to the value attribute of this radio button input, set the checked property to true
			// Otherwise set the checked property to false
		} else if (attr === "selected" || attr === "disabled" || attr === "multiple" || attr === "readonly") {
			sourceValue = (sourceValue && sourceValue !== "false") ? attr : null;
			// Use attr, not prop, so when the options (for example) are changed dynamically, but include the previously selected value,
			// they will still be selected after the change
		} else if (attr === VALUE && target.nodeName === "SELECT") {
			target._jsvSel = $isArray(sourceValue)
				? sourceValue
				: "" + sourceValue; // If not array, coerce to string
		}

		if (setter = fnSetters[attr]) {
			if (attr === HTML) {
				// Set linkCtx on view, dynamically, just during this handler call
				view.linkCtx = linkCtx;
				if (tag && tag.inline) {
					nodesToRemove = tag.nodes(true);
					if (tag._elCnt) {
						if (prevNode && prevNode !== nextNode) {
							// This prevNode will be removed from the DOM, so transfer the view tokens on prevNode to nextNode of this 'viewToRefresh'
							transferViewTokens(prevNode, nextNode, target, tag._tgId, "^", true);
						} else if (tokens = target._df) { // This occurs when there is no nextNode, and so the target._df may include tokens referencing
							// view and tag bindings contained within the open and close tokens of the updated tag control. They need to be processed (disposed)
							id = tag._tgId + "^";
							openIndex = tokens.indexOf("#" + id) + 1;
							closeIndex = tokens.indexOf("/" + id);

							if (openIndex && closeIndex > 0) {
								openIndex += id.length;
								if (closeIndex > openIndex) {
									setDefer(target, tokens.slice(0, openIndex) + tokens.slice(closeIndex));
									disposeTokens(tokens.slice(openIndex, closeIndex));
								}
							}
						}
						prevNode = prevNode
							? prevNode.previousSibling
							: nextNode
								? nextNode.previousSibling
								: target.lastChild;
					}
					// Remove HTML nodes
					$(nodesToRemove).remove(); // Note if !tag._elCnt removing the nodesToRemove will process and dispose view and tag bindings contained within the updated tag control

					// Insert and link new content
					late = view.link(view.data, target, prevNode, nextNode, sourceValue, tag && {tag: tag._tgId});
				} else {
					// data-linked value targeting innerHTML: data-link="html{:expr}" or contenteditable="true"
					renders = renders && targetVal !== sourceValue;
					if (renders) {
						$target.empty();
						late = view.link(source, target, prevNode, nextNode, sourceValue, tag && {tag: tag._tgId});
					}
				}
				// Remove dynamically added linkCtx and ctx from view
				view.linkCtx = oldLinkCtx;
			} else {
				if (change = change || targetVal !== sourceValue) {
					if (attr === "text" && target.children && !target.children[0]) {
						// This code is faster then $target.text()
						if (target.textContent !== undefined) {
							target.textContent = sourceValue;
						} else {
							target.innerText = sourceValue === null ? "" : sourceValue;
						}
					} else {
						$target[setter](sourceValue);
					}
				}
				if ((jsvSel = targetParent._jsvSel)
					// Setting value of <option> element
					&& (attr === VALUE || !$target.attr(VALUE))) { // Setting value attribute, or setting textContent if attribute is null
					// Set/unselect selection based on value set on parent <select>. Works for multiselect too
					target.selected = $.inArray("" + sourceValue, $isArray(jsvSel) ? jsvSel : [jsvSel]) > -1;
				}
			}
		} else if (change = change || targetVal !== sourceValue) {
			// Setting an attribute to undefined should remove the attribute
			$target[useProp ? "prop" : "attr"](attr, sourceValue === undefined && !useProp ? null : sourceValue);
		}
	}
	linkCtx._val = sourceValue;
	lateLink(late); // Do any deferred linking (lateRender)
	return change;
}

function arrayChangeHandler(ev, eventArgs) {
	var self = this,
		onBeforeChange = changeHandler(self, onBeforeChangeStr, self.tag),
		onAfterChange = changeHandler(self, onAfterChangeStr, self.tag);
	if (!onBeforeChange || onBeforeChange.call(self, ev, eventArgs) !== false) {
		if (eventArgs) {
			// This is an observable action (not a trigger/handler call from pushValues, or similar, for which eventArgs will be null)
			var action = eventArgs.change,
				index = eventArgs.index,
				items = eventArgs.items;
			self._.srt = eventArgs.refresh; // true if part of a 'sort' on refresh
			switch (action) {
				case "insert":
					self.addViews(index, items);
					break;
				case "remove":
					self.removeViews(index, items.length);
					break;
				case "move":
						self.moveViews(eventArgs.oldIndex, index, items.length);
					break;
				case "refresh":
					self._.srt = undefined;
					self.fixIndex(0);
					// Other cases: (e.g.undefined, for setProperty on observable object) etc. do nothing
			}
		}
		if (onAfterChange) {
			onAfterChange.call(self, ev, eventArgs);
		}
	}
}

//=============================
// Utilities for event handlers
//=============================

function setArrayChangeLink(view) {
	// Add/remove arrayChange handler on view
	var handler, arrayBinding,
		type = view.type, // undefined if view is being removed
		data = view.data,
		bound = view._.bnd; // true for top-level link() or data-link="{for}", or the for tag instance for {^{for}} (or for any custom tag that has an onArrayChange handler)

	if (!view._.useKey && bound) {
		// This is an array view. (view._.useKey not defined => data is array), and is data-bound to collection change events

		if (arrayBinding = view._.bndArr) {
			// First remove the current handler if there is one
			$([arrayBinding[1]]).off(arrayChangeStr, arrayBinding[0]);
			view._.bndArr = undefined;
		}
		if (bound !== !!bound) {
			// bound is not a boolean, so it is the data-linked tag that 'owns' this array binding - e.g. {^{for...}}
			if (type) {
				bound._.arrVws[view._.id] = view;
			} else {
				delete bound._.arrVws[view._.id]; // if view.type is undefined, view is being removed
			}
		} else if (type && data) {
			// If this view is not being removed, but the data array has been replaced, then bind to the new data array
			handler = function(ev) {
				if (!(ev.data && ev.data.off)) {
					// Skip if !!ev.data.off: - a handler that has already been removed (maybe was on handler collection at call time - then removed by another handler)
					// If view.type is undefined, do nothing. (Corresponds to case where there is another handler on the same data whose
					// effect was to remove this view, and which happened to precede this event in the trigger sequence. So although this
					// event has been removed now, it is still called since already on the trigger sequence)
					arrayChangeHandler.apply(view, arguments);
				}
			};
			$([data]).on(arrayChangeStr, handler);
			view._.bndArr = [handler, data];
		}
	}
}

function defaultAttr(elem, to, linkGetVal) {
	// to: true - default attribute for setting data value on HTML element; false: default attribute for getting value from HTML element
	// Merge in the default attribute bindings for this target element
	var nodeName = elem.nodeName.toLowerCase(),
		attr =
			$subSettingsAdvanced._fe[nodeName] // get form element binding settings for input textarea select or optgroup
			|| elem.contentEditable === TRUE && {to: HTML, from: HTML}; // Or if contentEditable set to "true" set attr to "html"
	return attr
		? (to
			? ((nodeName === "input" && elem.type === RADIO) // For radio buttons, bind from value, but bind to 'radio' - special value.
				? RADIO
				: attr.to)
			: attr.from)
		: to
			? linkGetVal ? "text" : HTML // Default innerText for data-link="a.b.c" or data-link="{:a.b.c}" (with or without converters)- otherwise innerHTML
			: ""; // Default is not to bind from
}

//==============================
// Rendering and DOM insertion
//==============================

function renderAndLink(view, index, tmpl, views, data, context, refresh) {
	var html, linkToNode, prevView, nodesToRemove, bindId,
		parentNode = view.parentElem,
		prevNode = view._prv,
		nextNode = view._nxt,
		elCnt = view._elCnt;

	if (prevNode && prevNode.parentNode !== parentNode) {
		error("Missing parentNode");
		// Abandon, since node has already been removed, or wrapper element has been inserted between prevNode and parentNode
	}

	if (refresh) {
		nodesToRemove = view.nodes();
		if (elCnt && prevNode && prevNode !== nextNode) {
			// This prevNode will be removed from the DOM, so transfer the view tokens on prevNode to nextNode of this 'viewToRefresh'
			transferViewTokens(prevNode, nextNode, parentNode, view._.id, "_", true);
		}
		// Remove child views
		view.removeViews(undefined, undefined, true);
		linkToNode = nextNode;

		if (elCnt) {
			prevNode = prevNode
				? prevNode.previousSibling
				: nextNode
					? nextNode.previousSibling
					: parentNode.lastChild;
		}

		// Remove HTML nodes
		$(nodesToRemove).remove();

		for (bindId in view._.bnds) {
			// The view bindings may have already been removed above in: $(nodesToRemove).remove();
			// If not, remove them here:
			removeViewBinding(bindId);
		}
	} else {
		// addViews. Only called if view is of type "array"
		if (index) {
			// index is a number, so indexed view in view array
			prevView = views[index - 1];
			if (!prevView) {
				return false; // If subview for provided index does not exist, do nothing
			}
			prevNode = prevView._nxt;
		}
		if (elCnt) {
			linkToNode = prevNode;
			prevNode = linkToNode
				? linkToNode.previousSibling         // There is a linkToNode, so insert after previousSibling, or at the beginning
				: parentNode.lastChild;              // If no prevView and no prevNode, index is 0 and the container is empty,
				// so prevNode = linkToNode = null. But if prevView._nxt is null then we set prevNode to parentNode.lastChild
				// (which must be before the prevView) so we insert after that node - and only link the inserted nodes
		} else {
			linkToNode = prevNode.nextSibling;
		}
	}
	html = tmpl.render(data, context, view._.useKey && refresh, view, refresh || index, true);
	// Pass in view._.useKey as test for noIteration (which corresponds to when self._.useKey > 0 and self.data is an array)

	// Link the new HTML nodes to the data
	lateLink(view.link(data, parentNode, prevNode, linkToNode, html, prevView));
}

//=====================
// addBindingMarkers
//=====================

function addBindingMarkers(value, view, tag) {
	// Insert binding markers into the rendered template output, which will get converted to appropriate
	// data-jsv attributes (element-only content) or script marker nodes (phrasing or flow content), in convertMarkers,
	// within view.link, prior to inserting into the DOM. Linking will then bind based on these markers in the DOM.
	// Added view markers: #m_...VIEW.../m_
	// Added tag markers: #m^...TAG..../m^
	var id, end;
	if (tag) {
		// This is a binding marker for a data-linked tag {^{...}}
		end = "^`";
		addLinkMethods(tag); // This is {^{>...}} or {^{tag ...}}, {{cvt:...} or {^{:...}}, and tag was defined in convertVal or renderTag
		id = tag._tgId;
		if (!id) {
			bindingStore[id = bindingKey++] = tag; // Store the tag temporarily, ready for databinding.
			// During linking, in addDataBinding, the tag will be attached to the linkCtx,
			// and then in observeAndBind, bindingStore[bindId] will be replaced by binding info.
			tag._tgId = "" + id;
		}
	} else {
		// This is a binding marker for a view
		// Add the view to the store of current linked views
		end = "_`";
		viewStore[id = view._.id] = view;
	}
	// Example: "#23^TheValue/23^"
	return "#" + id + end
		+ (value != undefined ? value : "") // For {^{:name}} this gives the equivalent semantics to compiled
											// (v=data.name)!=null?v:""; used in {{:name}} or data-link="name"
		+ "/" + id + end;
}

//==============================
// Data-linking and data binding
//==============================

//---------------
// observeAndBind
//---------------

function observeAndBind(linkCtx, source, target) {
	var binding, l, k, linkedElem, exprFnDeps, exprOb, prop, propDeps, depends, tagDepends, bindId, linkedElems,
		tag = linkCtx.tag,
		cvtBk = linkCtx.convertBack,
		handler = linkCtx._hdl;
	source = typeof source === "object" && source; // If not an object set to false

	if (tag) {
		// Use the 'depends' paths set on linkCtx.tag, or on the converter
		// - which may have been set on declaration or in events: init, render, onAfterLink etc.
		if (depends = tag.convert) {
			depends = depends === TRUE ? tag.tagCtx.props.convert : depends;
			depends = linkCtx.view.getRsc("converters", depends) || depends;
			depends = depends && depends.depends;
			depends = depends && $sub._dp(depends, source, handler); // dependsPaths
		}
		if (tagDepends = tag.depends) {
			tagDepends = $sub._dp(tagDepends, tag, handler);
			depends = depends ? depends.concat(tagDepends) : tagDepends;
		}
		linkedElems = tag.linkedElems;
	}
	depends = depends || [];
	if (!linkCtx._depends || ("" + linkCtx._depends !== "" + depends)) {
		// Only bind the first time, or if the new depends (toString) has changed from when last bound

		exprFnDeps = linkCtx.fn.deps.slice(); // Make a copy of the dependency paths for the compiled linkCtx expression - to pass to observe(). In getInnerCb(),
		// (and whenever the object is updated, in innerCb), we will set exprOb.ob to the current object returned by that computed expression, for this view.

		if (linkCtx._depends) {
			bindId = linkCtx._depends.bdId;
			// Unobserve previous binding
			$observable._apply(1, [source], exprFnDeps, linkCtx._depends, handler, linkCtx._ctxCb, true);
		}

		if (tag && tag.boundProps) {
			// Add dependency paths for declared boundProps (so no need to write ^myprop=... to get binding) and for linkedProp too if there is one
			l = tag.boundProps.length;
			while (l--) {
				prop = tag.boundProps[l];
				k = tag._.bnd.paths.length;
				while (k--) {
					propDeps = tag._.bnd.paths[k][prop];
					if (propDeps && propDeps.skp) { // Not already a bound prop ^prop=expression;
						exprFnDeps = exprFnDeps.concat(propDeps); // Add dependencies for this prop expression
					}
				}
			}
		}

		l = exprFnDeps.length;
		while (l--) {
			exprOb = exprFnDeps[l];
			if (exprOb._cpfn) {
				// This path is an 'exprOb', corresponding to a computed property returning an object. We replace the exprOb by
				// a view-binding-specific exprOb instance. The current object will be stored as exprOb.ob.
				exprFnDeps[l] = $extend({}, exprOb);
			}
		}
		binding = $observable._apply(
			1,
			[source],
			exprFnDeps, // flatten the paths - to gather all the dependencies across args and bound params
			depends,
			handler,
			linkCtx._ctxCb);
		// The binding returned by $observe has a bnd array with the source objects of the individual bindings.

		if (!bindId) {
			bindId = linkCtx._bndId || "" + bindingKey++;
			linkCtx._bndId = undefined;
			// Store the binding key on the view and on the element, for disposal when the view is removed
			target._jsvBnd = (target._jsvBnd || "") + "&" + bindId;
			linkCtx.view._.bnds[bindId] = bindId;
		}

		binding.elem = target; // The target of all the individual bindings
		binding.linkCtx = linkCtx;
		binding._tgId = bindId;

		depends.bdId = bindId;
		linkCtx._depends = depends;
		// Store the binding.
		bindingStore[bindId] = binding; // Note: If this corresponds to a data-linked tag, we are replacing the
		// temporarily stored tag by the stored binding. The tag will now be at binding.linkCtx.tag

		if (linkedElems || cvtBk !== undefined || tag && (tag.bindTo || tag.linkedElement || tag.linkedCtxParam)) {
			defineBindToDataTargets(binding, tag, cvtBk);
		}
		if (linkedElems) {
			l = linkedElems.length;
			while (l--) {
				linkedElem = linkedElems[l];
				k = linkedElem && linkedElem.length;
				while (k--) {
					linkedElem[k]._jsvLkEl = tag;
					bindLinkedElChange(tag, linkedElem[k]);
					linkedElem[k]._jsvBnd = "&" + bindId + "+"; // Add a "+" for cloned binding - so removing
					// elems with cloned bindings will not remove the 'parent' binding from the bindingStore.
				}
			}
		} else if (cvtBk !== undefined) {
			bindLinkedElChange(tag, target);
		}

		if (tag) {
			if (!tag.flow && !tag.inline) {
				target.setAttribute(jsvAttrStr, (target.getAttribute(jsvAttrStr)||"") + "#" + bindId + "^/" + bindId + "^");
				tag._tgId = "" + bindId;
			}
		}
	}
}

//-------
// $.link
//-------

function lateLink(late) {
	// Do any deferred linking (lateRender)
	var lnkCtx;
	if (late) {
		while (lnkCtx = late.pop()) {
			lnkCtx._hdl();
		}
	}
}

function tmplLink(to, from, context, noIteration, parentView, prevNode, nextNode) {
	return $link(this, to, from, context, noIteration, parentView, prevNode, nextNode);
}

function $link(tmplOrLinkExpr, to, from, context, noIteration, parentView, prevNode, nextNode) {
	// When linking from a template, prevNode and nextNode parameters are ignored
	if (context === true) {
		noIteration = context; // passing boolean as third param - noIteration
		context = undefined;
	} else if (typeof context !== "object") {
		context = undefined; // context must be a boolean (noIteration) or a plain object
	} else {
		context = $extend({}, context);
	}
	if (tmplOrLinkExpr && to) {
		to = to.jquery ? to : $(to); // to is a jquery object or an element or selector

		if (!activeBody) {
			activeBody = document.body;
			useInput = "oninput" in activeBody;
			$(activeBody)
				.on(elementChangeStr, onElemChange)
				.on('blur.jsv', '[contenteditable]', onElemChange);
		}

		var i, k, html, vwInfos, view, placeholderParent, targetEl, refresh, topLevelCall, late,
			onRender = addBindingMarkers,
			replaceMode = context && context.target === "replace",
			l = to.length;

		while (l--) { // iterate over 'to' targets. (Usually one, but can be multiple)
			targetEl = to[l];

			parentView = parentView || $view(targetEl);
			if (topLevelCall = parentView === topView) {
				topView.data = (topView.ctx = context || {}).root = from;
			}
			if ("" + tmplOrLinkExpr === tmplOrLinkExpr) {
				// tmplOrLinkExpr is a string: treat as data-link expression.
				addDataBinding(late = [], tmplOrLinkExpr, targetEl, parentView, undefined, true, from, context);
			} else {
				if (tmplOrLinkExpr.markup !== undefined) {
					// This is a call to template.link()
					if (replaceMode) {
						placeholderParent = targetEl.parentNode;
					}
					parentView._.scp = true; // Set scope flag on parentView for link() call - used to set view.isTop for outermost view of created linked content
					html = tmplOrLinkExpr.render(from, context, noIteration, parentView, undefined, onRender, true);
					parentView._.scp = undefined;
					// TODO Consider finding a way to bind data (link) within template without html being different for each view, the HTML can
					// be evaluated once outside the while (l--), and pushed into a document fragment, then cloned and inserted at each target.

					if (placeholderParent) {
						// This is target="replace" mode
						prevNode = targetEl.previousSibling;
						nextNode = targetEl.nextSibling;
						$.cleanData([targetEl], true);
						placeholderParent.removeChild(targetEl);

						targetEl = placeholderParent;
					} else {
						prevNode = nextNode = undefined; // When linking from a template, prevNode and nextNode parameters are ignored
						$(targetEl).empty();
					}
				} else if (tmplOrLinkExpr === true && parentView === topView) {
					// $.link(true, selector, data, ctx) - where selector points to elem in top-level content. (If not top-level content, no-op)
					refresh = {lnk: 1};
				} else {
					break; // no-op - $.link(true, selector, data, ctx) targeting within previously linked rendered template
				}

// TODO Consider deferred linking API feature on per-template basis - {@{ instead of {^{ which allows the user to see the rendered content
// before that content is linked, with better perceived perf. Have view.link return a deferred, and pass that to onAfterLink...
// or something along those lines.
// setTimeout(function() {

				if (targetEl._df && !nextNode) {
					// We are inserting new content and the target element has some deferred binding annotations,and there is no nextNode.
					// Those views may be stale views (that will be recreated in this new linking action) so we will first remove them
					// (if not already removed).
					vwInfos = viewInfos(targetEl._df, true, rOpenViewMarkers);

					for (i = 0, k = vwInfos.length; i < k; i++) {
						view = vwInfos[i];
						if ((view = viewStore[view.id]) && view.data !== undefined) {
							// If this is the _prv (prevNode) for a view, remove the view
							// - unless view.data is undefined, in which case it is already being removed
							view.parent.removeViews(view._.key, undefined, true);
						}
					}
					setDefer(targetEl); // remove defer tokens
				}

				// Link the content of the element, since this is a call to template.link(), or to $(el).link(true, ...),
				late = parentView.link(from, targetEl, prevNode, nextNode, html, refresh, context);
//});
			}
			lateLink(late); // Do any deferred linking (lateRender)
		}
	}
	return to; // Allow chaining, to attach event handlers, etc.
}

//----------
// view.link
//----------

function viewLink(outerData, parentNode, prevNode, nextNode, html, refresh, context, validateOnly) {
	// Optionally insert HTML into DOM using documentFragments (and wrapping HTML appropriately).
	// Data-link existing contents of parentNode, or the inserted HTML, if provided

	// Depending on the content model for the HTML elements, the standard data-linking markers inserted in the HTML by addBindingMarkers during
	// template rendering will be converted either to script marker nodes or, for element-only content sections, to data-jsv element annotations.

	// Data-linking will then add _prv and _nxt to views, where:
	//     _prv: References the previous node (script element of type "jsv123"), or (for elCnt=true), the first element node in the view (or if none, set _prv = _nxt)
	//     _nxt: References the last node (script element of type "jsv/123"), or (for elCnt=true), the next element node after the view.

	//==== nested functions ====
	function convertMarkers(all, preceding, selfClose, closeTag, spaceBefore, id, boundId, spaceAfter, tag1, tag2, closeTag2, spaceAfterClose, selfClose2, endOpenTag) {
		// rConvertMarkers = /(^|(\/>)|<\/(\w+)>|)(\s*)([#\/]\d+(?:_|(\^)))`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>))/g,
		//                 prec, slfCl, clsTag,  spBefore, id,      bndId  spAfter,tag1,                   tag2,               clTag2,sac  slfCl2, endOpenTag
		// Convert the markers that were included by addBindingMarkers in template output, to appropriate DOM annotations:
		// data-jsv attributes (for element-only content) or script marker nodes (within phrasing or flow content).

// TODO consider detecting 'quoted' contexts (attribute strings) so that attribute encoding does not need to encode >
// Currently rAttrEncode = /[><"'&]/g includes '>' encoding in order to avoid erroneous parsing of <span title="&lt;a/>"></span>">
		var errorMsg, bndId,
			endOfElCnt = "";
		if (endOpenTag) {
			inTag = 0;
			return all;
		}
		tag = tag1 || tag2 || "";
		closeTag = closeTag || closeTag2;
		selfClose = selfClose || selfClose2;
		if (isVoid && !selfClose && (!all || closeTag || tag || id && !inTag)) { // !all = end of string
			isVoid = undefined;
			parentTag = tagStack.shift(); // preceding tag was a void element, with no closing slash, such as <br>.
		}
		closeTag = closeTag || selfClose;
		if (closeTag) {
			inTag = 0;
			isVoid = undefined;
			// TODO: smart insertion of <tbody> - to be completed for robust insertion of deferred bindings etc.
			//if (closeTag === "table" && parentTag === "tbody") {
			//	preceding = "</tbody>" + preceding;
			//	parentTag = "table";
			//	tagStack.shift();
			//}
			if (validate) {
				if (selfClose || selfClose2) {
					if (!voidElems[parentTag] && !/;svg;|;math;/.test(";" + tagStack.join(";") + ";")) {
						// Only self-closing elements must be legitimate void elements, such as <br/>, per HTML schema,
						// or under svg or math foreign namespace elements.
						errorMsg = "'<" + parentTag + ".../";
					}
				} else if (voidElems[closeTag]) {
					errorMsg = "'</" + closeTag; // closing tag such as </input>
				} else if (!tagStack.length || closeTag !== parentTag) {
					errorMsg = "Mismatch: '</" + closeTag;
				}
				if (errorMsg) {
					syntaxError(errorMsg + ">' in:\n" + html);
				}
			}
			prevElCnt = elCnt;
			parentTag = tagStack.shift();
			elCnt = elContent[parentTag];
			closeTag2 = closeTag2 ? ("</" + closeTag2 + ">") : "";
			if (prevElCnt) {
				// If there are ids (markers since the last tag), move them to the defer string
				defer += ids;
				ids = "";
				if (!elCnt) {
					endOfElCnt = closeTag2 + openScript + "@" + defer + closeScript + (spaceAfterClose || "");
					defer = deferStack.shift();
				} else {
					defer += "-"; // Will be used for stepping back through deferred tokens
				}
			}
		}
		if (elCnt) {
			// elContent maps tagNames which have only element content, so may not support script nodes.
			// We are in element-only content, can remove white space, and use data-jsv attributes on elements as markers
			// Example: <tr data-jsv="/2_#6_"> - close marker for view 2 and open marker for view 6

			if (id) {
				// append marker for this id, to ids string
				ids += id;
			} else {
				preceding = (closeTag2 || selfClose2 || "");
			}
			if (tag) {
				// TODO: smart insertion of <tbody> - to be completed for robust insertion of deferred bindings etc.
				//if (tag === "<tr" && parentTag === "table") {
				//	tagStack.unshift(parentTag);
				//	parentTag = "tbody";
				//	preceding += "<" + parentTag + ">";
				//	if (defer) {
				//		defer += "+"; // Will be used for stepping back through deferred tokens
				//	}
				//	// TODO: move this to design-time validation check
				//	//	error('"' + parentTag + '" has incorrect parent tag');
				//}
				preceding += tag;
				if (ids) {
					preceding += ' ' + jsvAttrStr + '="' + ids + '"';
					ids = "";
				}
			}
		} else {
			// We are in phrasing or flow content, so use script marker nodes
			// Example: <script type="jsv3/"></script> - data-linked tag, close marker
			// We validate with inTag so no script markers are inserted in attribute context e.g. for:
			// "<table {{if ...}}...{{/if}}... >" or "<table {{if ...}}...> ...{{/if}}..."
			preceding = id
				? (preceding + endOfElCnt + spaceBefore + (inTag ? "" : openScript + id + closeScript)+ spaceAfter + tag)
				: endOfElCnt || all;
		}

		if (validate && boundId) {
			if (inTag) {
				// JsViews data-linking tags are not allowed within element markup.
				// See jsviews/issues/303
				syntaxError('{^{ within elem markup (' + inTag + ' ). Use data-link="..."');
			}
			if (id.charAt(0) === "#") {
				tagStack.unshift(id.slice(1));
			} else if (id.slice(1) !== (bndId = tagStack.shift())) {
				// See jsviews/issues/213
				syntaxError('Closing tag for {^{...}} under different elem: <' + bndId + '>');
			}
		}
		if (tag) {
			inTag = tag;
			// If there are ids (markers since the last tag), move them to the defer string
			tagStack.unshift(parentTag);
			parentTag = tag.slice(1);
			if (validate && tagStack[0] && tagStack[0] === badParent[parentTag]) {
				// Missing <tbody>
				// TODO: replace this by smart insertion of <tbody> tags
				error('Parent of <tr> must be <tbody>');
			}
			isVoid = voidElems[parentTag];
			if ((elCnt = elContent[parentTag]) && !prevElCnt) {
				deferStack.unshift(defer);
				defer = "";
			}
			prevElCnt = elCnt;
//TODO Consider providing validation which throws if you place <span> as child of <tr>, etc. - since if not caught,
//this can cause errors subsequently which are difficult to debug.
//				if (elContent[tagStack[0]]>2 && !elCnt) {
//					error(parentTag + " in " + tagStack[0]);
//				}
			if (defer && elCnt) {
				defer += "+"; // Will be used for stepping back through deferred tokens
			}
		}
		return preceding;
	}

	function processViewInfos(vwInfos, targetParent) {
		// If targetParent, we are processing viewInfos (which may include navigation through '+-' paths) and hooking up to the right parentElem etc.
		// (and elem may also be defined - the next node)
		// If no targetParent, then we are processing viewInfos on newly inserted content
		var deferPath, deferChar, bindChar, parentElem, id, onAftCr, deep,
			addedBindEls = [];

		// In elCnt context (element-only content model), prevNode is the first node after the open, nextNode is the first node after the close.
		// If both are null/undefined, then open and close are at end of parent content, so the view is empty, and its placeholder is the
		// 'lastChild' of the parentNode. If there is a prevNode, then it is either the first node in the view, or the view is empty and
		// its placeholder is the 'previousSibling' of the prevNode, which is also the nextNode.
		if (vwInfos) {
			if (vwInfos._tkns.charAt(0) === "@") {
				// We are processing newly inserted content. This is a special script element that was created in convertMarkers() to process deferred bindings,
				// and inserted following the target parent element - because no element tags (outside elCnt) were encountered to carry those binding tokens.
				// We will step back from the preceding sibling of this element, looking at targetParent elements until we find the one that the current binding
				// token belongs to. Set elem to null (the special script element), and remove it from the DOM.
				targetParent = elem.previousSibling;
				elem.parentNode.removeChild(elem);
				elem = undefined;
			}
			len = vwInfos.length;
			while (len--) {
				vwInfo = vwInfos[len];
//if (prevIds.indexOf(vwInfo.token) < 0) { // This token is a newly created view or tag binding
				bindChar = vwInfo.ch;
				if (deferPath = vwInfo.path) {
					// We have a 'deferred path'
					j = deferPath.length - 1;
					while (deferChar = deferPath.charAt(j--)) {
						// Use the "+" and"-" characters to navigate the path back to the original parent node where the deferred bindings ocurred
						if (deferChar === "+") {
							if (deferPath.charAt(j) === "-") {
								j--;
								targetParent = targetParent.previousSibling;
							} else {
								targetParent = targetParent.parentNode;
							}
						} else {
							targetParent = targetParent.lastChild;
						}
						// Note: Can use previousSibling and lastChild, not previousElementSibling and lastElementChild,
						// since we have removed white space within elCnt. Hence support IE < 9
					}
				}
				if (bindChar === "^") {
					if (tag = bindingStore[id = vwInfo.id]) {
						// The binding may have been deleted, for example in a different handler to an array collectionChange event
						// This is a tag binding
						deep = targetParent && (!elem || elem.parentNode !== targetParent); // We are stepping back looking for the right targetParent,
						// or we are linking existing content and this element is in elCnt, not an immediate child of the targetParent.
						if (!elem || deep) {
							tag.parentElem = targetParent;
						}
						if (vwInfo.elCnt && deep) {
							// With element only content, if there is no following element, or if the binding is deeper than the following element
							// then we need to set the open or close token as a deferred binding annotation on the parent
							setDefer(targetParent, (vwInfo.open ? "#" : "/") + id + bindChar + (targetParent._df || ""));
						}
						// This is an open or close marker for a data-linked tag {^{...}}. Add it to bindEls.
						addedBindEls.push([deep ? null : elem, vwInfo]);
					}
				} else if (view = viewStore[id = vwInfo.id]) {
					// The view may have been deleted, for example in a different handler to an array collectionChange event
					if (!view.parentElem) {
						// If view is not already extended for JsViews, extend and initialize the view object created in JsRender, as a JsViews view
						view.parentElem = targetParent || elem && elem.parentNode || parentNode;
						view._.onRender = addBindingMarkers;
						view._.onArrayChange = arrayChangeHandler;
						setArrayChangeLink(view);
					}
					parentElem = view.parentElem;
					if (vwInfo.open) {
						// This is an 'open view' node (preceding script marker node,
						// or if elCnt, the first element in the view, with a data-jsv annotation) for binding
						view._elCnt = vwInfo.elCnt;
						if (targetParent && !elem) {
							setDefer(targetParent, "#" + id + bindChar + (targetParent._df || ""));
						} else {
							// No targetParent, so there is a ._nxt elem (and this is processing tokens on the elem)
							if (!view._prv) {
								setDefer(parentElem, removeSubStr(parentElem._df, "#" + id + bindChar));
							}
							view._prv = elem;
						}
					} else {
						// This is a 'close view' marker node for binding
						if (targetParent && (!elem || elem.parentNode !== targetParent)) {
							// There is no ._nxt so add token to _df. It is deferred.
							setDefer(targetParent, "/" + id + bindChar + (targetParent._df || ""));
							view._nxt = undefined;
						} else if (elem) {
							// This view did not have a ._nxt, but has one now, so token may be in _df, and must be removed. (No longer deferred)
							if (!view._nxt) {
								setDefer(parentElem, removeSubStr(parentElem._df, "/" + id + bindChar));
							}
							view._nxt = elem;
						}
						if (onAftCr = view.ctx && view.ctx[onAfterCreateStr] || onAfterCreate) {
							onAftCr.call(view.ctx.tag, view);
						}
					}
//}
				}
			}
			len = addedBindEls.length;
			while (len--) {
				// These were added in reverse order to addedBindEls. We push them in BindEls in the correct order.
				bindEls.push(addedBindEls[len]);
			}
		}
		return !vwInfos || vwInfos.elCnt;
	}

	function getViewInfos(vwInfos) {
		// Used by view.childTags() and tag.childTags()
		// Similar to processViewInfos in how it steps through bindings to find tags. Only finds data-linked tags.
		var level, parentTag, named;

		if (vwInfos) {
			len = vwInfos.length;
			for (j = 0; j < len; j++) {
				vwInfo = vwInfos[j];
				// This is an open marker for a data-linked tag {^{...}}, within the content of the tag whose id is get.id. Add it to bindEls.
				// Note - if bindingStore[vwInfo.id]._is === "tag" then getViewInfos is being called too soon - during first linking pass
				tag = bindingStore[vwInfo.id];
				if (!tag._is && tag.linkCtx) {
					parentTag = tag = tag.linkCtx.tag;
					named = tag.tagName === tagName;
					if (!tag.flow || named) {
						if (!deep) {
							level = 1;
							while (parentTag = parentTag.parent) {
								level++;
							}
							tagDepth = tagDepth || level; // The level of the first tag encountered.
						}
						if ((deep || level === tagDepth) && (!tagName || named)) {
							// Filter on top-level or tagName as appropriate
							tags.push(tag);
						}
					}
				}
			}
		}
	}

	function dataLink() {
		//================ Data-link and fixup of data-jsv annotations ================
		var j, index,
			tokens = "",
			wrap = {},
			selector = linkViewsSel + (get ? ",[" + deferAttr + "]" : "");
			// If a childTags() call, get = ",[" + deferAttr + "]" - since we need to include elements that have a ._df expando for deferred tokens

		elems = qsa ? parentNode.querySelectorAll(selector) : $(selector, parentNode).get();
		l = elems.length;

		// The prevNode will be in the returned query, since we called markPrevOrNextNode() on it.
		// But it may have contained nodes that satisfy the selector also.
		if (prevNode && prevNode.innerHTML) {
			// Find the last contained node of prevNode, to use as the prevNode - so we only link subsequent elems in the query
			prevNodes = qsa ? prevNode.querySelectorAll(selector) : $(selector, prevNode).get();
			prevNode = prevNodes.length ? prevNodes[prevNodes.length - 1] : prevNode;
		}

		tagDepth = 0;
		for (i = 0; i < l; i++) {
			elem = elems[i];
			if (prevNode && !found) {
				// If prevNode is set, not false, skip linking. If this element is the prevNode, set to false so subsequent elements will link.
				found = (elem === prevNode);
			} else if (nextNode && elem === nextNode) {
				// If nextNode is set then break when we get to nextNode
				if (get) {
					tokens += markerNodeInfo(elem);
				}
				break;
			} else if (elem.parentNode) {
				// elem has not been removed from DOM
				if (get) {
					tokens += markerNodeInfo(elem);
					if (elem._df) {
						j = i + 1;
						while (j < l && elem.contains(elems[j])) {
							j++;
						}
						// Add deferred tokens after any tokens on descendant elements of this one
						wrap[j-1] = elem._df;
					}
					if (wrap[i]) {
						tokens += wrap[i] || "";
					}
				} else {
					if (isLink && (vwInfo = viewInfos(elem, undefined, rViewMarkers)) && (vwInfo = vwInfo[0])) {
						// If this is a link(trueOrString ...) call we will avoid re-binding to elems that are within template-rendered views
						skip = skip ? (vwInfo.id !== skip && skip) : vwInfo.open && vwInfo.id;
					}
					if (!skip && processInfos(viewInfos(elem))
						// If a link() call, processViewInfos() adds bindings to bindEls, and returns true for non-script nodes, for adding data-link bindings
						// If a childTags() call, getViewInfos returns array of tag bindings.
							&& elem.getAttribute($viewsLinkAttr)) {
						bindEls.push([elem]); // A data-linked element so add to bindEls too
					}
				}
			}
		}

		if (get) {
			tokens += parentNode._df || "";
			if (index = tokens.indexOf("#" + get.id) + 1) {
				// We are looking for view.childTags() or tag.childTags() - so start after the open token of the parent view or tag.
				tokens = tokens.slice(index + get.id.length);
			}
			index = tokens.indexOf("/" + get.id);
			if (index + 1) {
				// We are looking for view.childTags() or tag.childTags() - so don't look beyond the close token of the parent view or tag.
				tokens = tokens.slice(0, index);
			}
			// Call getViewInfos to add the found childTags to the tags array
			getViewInfos(viewInfos(tokens, undefined, rOpenTagMarkers));
		}

		if (html === undefined && parentNode.getAttribute($viewsLinkAttr)) {
			bindEls.push([parentNode]); // Support data-linking top-level element directly (not within a data-linked container)
		}

		// Remove temporary marker script nodes they were added by markPrevOrNextNode
		unmarkPrevOrNextNode(prevNode, elCnt);
		unmarkPrevOrNextNode(nextNode, elCnt);

		if (get) {
			return; // We have added childTags to the tags array, so we are done
		}

		if (elCnt && defer + ids) {
			// There are some views with elCnt, for which the open or close did not precede any HTML tag - so they have not been processed yet
			elem = nextNode;
			if (defer) {
				if (nextNode) {
					processViewInfos(viewInfos(defer + "+", true), nextNode);
				} else {
					processViewInfos(viewInfos(defer, true), parentNode);
				}
			}
			processViewInfos(viewInfos(ids, true), parentNode);
			// If there were any tokens on nextNode which have now been associated with inserted HTML tags, remove them from nextNode
			if (nextNode) {
				tokens = nextNode.getAttribute(jsvAttrStr);
				if (l = tokens.indexOf(prevIds) + 1) {
					tokens = tokens.slice(l + prevIds.length - 1);
				}
				nextNode.setAttribute(jsvAttrStr, ids + tokens);
			}
		}

// if (context.lazyLink) {
// setTimeout(doLinking) (doLinking is function wrapper of following lines)
// See Future tasks, and https://github.com/BorisMoore/jsviews/issues/368.
// Could call context.lazyLink as callback, on async completion - or return promise.
		//================ Bind the data-linked elements and tags ================
		l = bindEls.length;
		for (i = 0; i < l; i++) {
			elem = bindEls[i];
			linkInfo = elem[1];
			elem = elem[0];
			if (linkInfo) {
				if (tag = bindingStore[linkInfo.id]) {
					if (linkCtx = tag.linkCtx) {
						// The tag may have been stored temporarily on the bindingStore - or may have already been replaced by the actual binding
						tag = linkCtx.tag;
						tag.linkCtx = linkCtx;
					}
					if (linkInfo.open) {
						// This is an 'open linked tag' binding annotation for a data-linked tag {^{...}}
						if (elem) {
							tag.parentElem = elem.parentNode;
							tag._prv = elem;
						}
						tag._elCnt = linkInfo.elCnt;
						// We data-link depth-first ("on the way in"), which is better for perf - and allows setting parent tags etc.
						view = tag.tagCtx.view;

						// Add data binding (unless skipped due to lateRender)
						addDataBinding(late, undefined, tag._prv, view, linkInfo.id);
					} else {
						tag._nxt = elem;
						if (tag._.unlinked && !tag._toLk) {
							// This is a 'close linked tag' binding annotation (and data-binding was not skipped due to lateRender)
							tagCtx = tag.tagCtx;
							view = tagCtx.view;
							callAfterLink(tag);
						}
					}
				}
			} else {
				// Add data binding for a data-linked element (with data-link attribute)
				addDataBinding(late, elem.getAttribute($viewsLinkAttr), elem, $view(elem), undefined, isLink, outerData, context);
			}
		}
//});
	}
	//==== /end of nested functions ====

	var inTag, linkCtx, tag, i, l, j, len, elems, elem, view, vwInfo, linkInfo, prevNodes, token, prevView, nextView,
		node, tags, deep, tagName, tagCtx, validate, tagDepth, depth, fragment, copiedNode, firstTag, parentTag,
		isVoid, wrapper, div, tokens, elCnt, prevElCnt, htmlTag, ids, prevIds, found, skip, isLink, get,
		self = this,
		thisId = self._.id + "_",
		defer = "",
		// The marker ids for which no tag was encountered (empty views or final closing markers) which we carry over to container tag
		bindEls = [],
		tagStack = [],
		deferStack = [],
		late = [],
		onAfterCreate = changeHandler(self, onAfterCreateStr),
		processInfos = processViewInfos;

	if (refresh) {
		if (refresh.tmpl) {
			// refresh is the prevView, passed in from addViews()
			prevView = "/" + refresh._.id + "_";
		} else {
			isLink = refresh.lnk; // Top-level linking
			if (refresh.tag) {
				thisId = refresh.tag + "^";
				refresh = true;
			}
			if (get = refresh.get) {
				processInfos = getViewInfos;
				tags = get.tags;
				deep = get.deep;
				tagName = get.name;
			}
		}
		refresh = refresh === true;
	}

	parentNode = parentNode
		? ("" + parentNode === parentNode
			? $(parentNode)[0]  // It is a string, so treat as selector
			: parentNode.jquery
				? parentNode[0]   // A jQuery object - take first element.
				: parentNode)
		: (self.parentElem    // view.link()
			|| document.body);  // link(null, data) to link the whole document

	validate = !$subSettingsAdvanced.noValidate && parentNode.contentEditable !== TRUE;
	parentTag = parentNode.tagName.toLowerCase();
	elCnt = !!elContent[parentTag];

	prevNode = prevNode && markPrevOrNextNode(prevNode, elCnt);
	nextNode = nextNode && markPrevOrNextNode(nextNode, elCnt) || null;

	if (html != undefined) {
		//================ Insert html into DOM using documentFragments (and wrapping HTML appropriately). ================
		// Also convert markers to DOM annotations, based on content model.
		// Corresponds to nextNode ? $(nextNode).before(html) : $(parentNode).html(html);
		// but allows insertion to wrap correctly even with inserted script nodes. jQuery version will fail e.g. under tbody or select.
		// This version should also be slightly faster
		div = document.createElement("div");
		wrapper = div;
		prevIds = ids = "";
		htmlTag = parentNode.namespaceURI === "http://www.w3.org/2000/svg" ? "svg_ns" : (firstTag = rFirstElem.exec(html)) && firstTag[1] || "";
		if (elCnt) {
			// Now look for following view, and find its tokens, or if not found, get the parentNode._df tokens
			node = nextNode;
			while (node && !(nextView = viewInfos(node))) {
				node = node.nextSibling;
			}
			if (tokens = nextView ? nextView._tkns : parentNode._df) {
				token = prevView || "";
				if (refresh || !prevView) {
					token += "#" + thisId;
				}
				j = tokens.indexOf(token);
				if (j + 1) {
					j += token.length;
					// Transfer the initial tokens to inserted nodes, by setting them as the ids variable, picked up in convertMarkers
					prevIds = ids = tokens.slice(0, j);
					tokens = tokens.slice(j);
					if (nextView) {
						node.setAttribute(jsvAttrStr, tokens);
					} else {
						setDefer(parentNode, tokens);
					}
				}
			}
		}

		//================ Convert the markers to DOM annotations, based on content model. ================
//			oldElCnt = elCnt;
		isVoid = undefined;
		html = ("" + html).replace(rConvertMarkers, convertMarkers);
//			if (!!oldElCnt !== !!elCnt) {
//				error("Parse: " + html); // Parse error. Content not well-formed?
//			}
		if (validate && tagStack.length) {
			syntaxError("Mismatched '<" + parentTag + "...>' in:\n" + html); // Unmatched tag
		}
		if (validateOnly) {
			return;
		}
		// Append wrapper element to doc fragment
		safeFragment.appendChild(div);

		// Go to html and back, then peel off extra wrappers
		// Corresponds to jQuery $(nextNode).before(html) or $(parentNode).html(html);
		// but supports svg elements, and other features missing from jQuery version (and this version should also be slightly faster)
		htmlTag = wrapMap[htmlTag] || wrapMap.div;
		depth = htmlTag[0];
		wrapper.innerHTML = htmlTag[1] + html + htmlTag[2];
		while (depth--) {
			wrapper = wrapper.lastChild;
		}
		safeFragment.removeChild(div);
		fragment = document.createDocumentFragment();
		while (copiedNode = wrapper.firstChild) {
			fragment.appendChild(copiedNode);
		}
		// Insert into the DOM
		parentNode.insertBefore(fragment, nextNode);
	}
	dataLink();

	return late;
}

function addDataBinding(late, linkMarkup, node, currentView, boundTagId, isLink, data, context) {
	// Add data binding for data-linked elements or {^{...}} data-linked tags
	var tmpl, tokens, attr, convertBack, tagExpr, linkFn, linkCtx, tag, rTagIndex, hasElse, lastIndex,
		linkExpressions = [];

	if (boundTagId) {
		// boundTagId is a string for {^{...}} data-linked tag. So only one linkTag in linkMarkup
		// data and context arguments are undefined
		tag = bindingStore[boundTagId];
		tag = tag.linkCtx ? tag.linkCtx.tag : tag;

		linkCtx = tag.linkCtx || {
			type: "inline",
			data: currentView.data,                   // source
			elem: tag._elCnt ? tag.parentElem : node, // target
			view: currentView,
			ctx: currentView.ctx,
			attr: HTML, // Script marker nodes are associated with {^{ and always target HTML.
			fn: tag._.bnd,
			tag: tag,
			// Pass the boundTagId in the linkCtx, so that it can be picked up in observeAndBind
			_bndId: boundTagId
		};
		tag.linkCtx = linkCtx;
		bindDataLinkTarget(linkCtx, late);
		tag._toLk = linkCtx._bndId; // If data binding happened, remove _toLk flag from tag
	} else if (linkMarkup && node) {
		// Data-linked element

		// If isLink then this is a top-level linking: .link(expression, target, data, ....) or
		// .link(true, target, data, ....) scenario - and data and context are passed in separately from the view
		data = isLink ? data : currentView.data;

		// Compiled linkFn expressions could be stored in the tmpl.links array of the template
		// TODO - consider also caching globally so that if {{:foo}} or data-link="foo" occurs in different places,
		// the compiled template for this is cached and only compiled once...
		//links = currentView.links || currentView.tmpl.links;

		tmpl = currentView.tmpl;

//			if (!(linkTags = links[linkMarkup])) {
		// This is the first time this view template has been linked, so we compile the data-link expressions, and store them on the template.

		linkMarkup = normalizeLinkTag(linkMarkup, defaultAttr(node));
		lastIndex = rTagDatalink.lastIndex = 0;
		while (tokens = rTagDatalink.exec(linkMarkup)) { // TODO require } to be followed by whitespace or $, and remove the \}(!\}) option.
			linkExpressions.push(tokens);
			lastIndex = rTagDatalink.lastIndex;
		}
		if (lastIndex < linkMarkup.length) {
			syntaxError(linkMarkup);
		}
		while (tokens = linkExpressions.shift()) {
			// Iterate over the data-link expressions, for different target attrs,
			// e.g. <input data-link="{:firstName:} title{>~description(firstName, lastName)}"
			// tokens: [all, attr, bindOnly, tagExpr, tagName, converter, colon, html, comment, code, params]
			rTagIndex = rTagDatalink.lastIndex;
			attr = tokens[1];
			tagExpr = tokens[3];
			while (linkExpressions[0] && linkExpressions[0][4] === "else") { // If this is {sometag...} and is followed by an {else...} add to tagExpr
				tagExpr += delimCloseChar1 + delimOpenChar0 + linkExpressions.shift()[3];
				hasElse = true;
			}
			if (hasElse) { // If an {else} has been added, need also to add closing {{/sometag}}
				tagExpr += delimCloseChar1 + delimOpenChar0 + delimOpenChar1 + "/" + tokens[4] + delimCloseChar0;
			}
			linkCtx = {
				type: isLink ? "top" : "link",
				data: data, // source
				elem: node, // target
				view: currentView,
				ctx: context,
				attr: attr,
				isLk: isLink, // top-level linking?
				_toLk : 1, // Flag to data-link on initial data-link call rendering call
				_noUpd : tokens[2] // Flag for data-link="^{...}" so on initial data-link call will bind, but not render)
			};

			convertBack = undefined;
			if (tokens[6]) {
				convertBack = tokens[10] || undefined;
				linkCtx.convert = tokens[5] || "";
				if (convertBack !== undefined && defaultAttr(node)) {
					if (attr) {
						syntaxError(tagExpr + "- Remove target: " + attr);
					}
					// Default target, so allow 2 way binding
					linkCtx.convertBack = convertBack = convertBack.slice(1);
				}
			}
			// Compile the linkFn expression which evaluates and binds a data-link expression
			// TODO - optimize for the case of simple data path with no conversion, helpers, etc.:
			//     i.e. data-link="a.b.c". Avoid creating new instances of Function every time. Can use a default function for all of these...

			linkCtx.expr = attr + tagExpr;
			linkFn = tmpl.links[tagExpr];
			if (!linkFn) {
				tmpl.links[tagExpr] = linkFn = $sub.tmplFn(tagExpr, tmpl, true, convertBack, hasElse);
			}
			linkCtx.fn = linkFn;
			bindDataLinkTarget(linkCtx, late);
			// We store rTagIndex in local scope, since this addDataBinding method can sometimes be called recursively,
			// and each is using the same rTagDatalink instance.
			rTagDatalink.lastIndex = rTagIndex;
		}
//		}
	}
}

function bindDataLinkTarget(linkCtx, late) {
	// Add data link bindings for a link expression in data-link attribute markup
	function handler(ev, eventArgs) {
		onDataLinkedTagChange.call(linkCtx, ev, eventArgs);
		// If the link expression uses a custom tag, the onDataLinkedTagChange call will call renderTag, which will set tagCtx on linkCtx
	}
	if (linkCtx.isLk) {
		// Top-level linking: .link(expressionOrTrue, data, context) - so we need to create a view for the linking, with the data and ctx
		// which may be different than the current context of the target. Note that this view is not a standard data-linked view, so it will
		// be disposed only when its parent view is disposed.
		linkCtx.view = new $sub.View(
			$sub.extendCtx(linkCtx.ctx, linkCtx.view.ctx),
			"link", linkCtx.view, linkCtx.data, linkCtx.expr, undefined, addBindingMarkers);
	}
	linkCtx._ctxCb = $sub._gccb(linkCtx.view); // getContextCallback: _ctxCb, for filtering/appending to dependency paths: function(path, object) { return [(object|path)*]}
	linkCtx._hdl = handler;
	// handler._ctx = linkCtx; Could pass linkCtx for use in a depends = function() {} call, so depends is different for different linkCtx's
	if (linkCtx.fn._lr) {
		linkCtx._toLk = 1;
		late.push(linkCtx); // lateRender - defer rendering and linking (sync but after first linking pass)
	} else {
		handler(true);
	}
}

//=====================
// Data-linking helpers
//=====================

function removeSubStr(str, substr) {
	var k;
	return str
		? (k = str.indexOf(substr),
			(k + 1
				? str.slice(0, k) + str.slice(k + substr.length)
				: str))
		: "";
}

function markerNodeInfo(node) {
	return node &&
		("" + node === node
			? node
			: node.tagName === SCRIPT
				? node.type.slice(3)
				: node.nodeType === 1 && node.getAttribute(jsvAttrStr) || "");
}

function viewInfos(node, isVal, rBinding) {
	// Test whether node is a script marker node, and if so, return metadata
	function getInfos(all, open, close, id, ch, elPath) {
		infos.push({
			elCnt: elCnt,
			id: id,
			ch: ch,
			open: open,
			close: close,
			path: elPath,
			token: all
		});
	}
	var elCnt, tokens,
		infos = [];
	if (tokens = isVal ? node : markerNodeInfo(node)) {
		elCnt = infos.elCnt = node.tagName !== SCRIPT;
		elCnt = tokens.charAt(0) === "@" || elCnt;
		infos._tkns = tokens;
		// rMarkerTokens = /(?:(#)|(\/))(\d+)([_^])([-+@\d]+)?/g;
		tokens.replace(rBinding || rMarkerTokens, getInfos);
		return infos;
	}
}

function unmarkPrevOrNextNode(node, elCnt) {
	if (node) {
		if (node.type === "jsv") {
			node.parentNode.removeChild(node);
		} else if (elCnt && node.getAttribute($viewsLinkAttr) === "") {
			node.removeAttribute($viewsLinkAttr);
		}
	}
}

function markPrevOrNextNode(node, elCnt) {
	var marker = node;
	while (elCnt && marker && marker.nodeType !== 1) {
		marker = marker.previousSibling;
	}
	if (marker) {
		if (marker.nodeType !== 1) {
			// For text nodes, we will add a script node before
			marker = document.createElement(SCRIPT);
			marker.type = "jsv";
			node.parentNode.insertBefore(marker, node);
		} else if (!markerNodeInfo(marker) && !marker.getAttribute($viewsLinkAttr)) {
			// For element nodes, we will add a data-link attribute (unless there is already one)
			// so that this node gets included in the node linking process.
			marker.setAttribute($viewsLinkAttr, "");
		}
	}
	return marker;
}

function normalizeLinkTag(linkMarkup, twoway) {
	linkMarkup = $.trim(linkMarkup).replace(rEscapeQuotes, "\\$&");
	return linkMarkup.slice(-1) !== delimCloseChar0
	// If simplified syntax is used: data-link="expression", convert to data-link="{:expression}",
	// or for inputs, data-link="{:expression:}" for (default) two-way binding
		? linkMarkup = delimOpenChar1 + ":" + linkMarkup + (twoway ? ":" : "") + delimCloseChar0
		: linkMarkup;
}

//===========================
// Methods for views and tags
//===========================

function callAfterLink(tag, ev, eventArgs) {
	function copyFromTagCtxToTag() {
		linkedElems = tagCtx.linkedElems || tag.linkedElems || tag.linkedElem && [tag.linkedElem];
		if (linkedElems) {
			tag.linkedElems = tagCtx.linkedElems = linkedElems;
			tag.linkedElem = linkedElems[0] = tag.linkedElem || linkedElems[0];
		}
		if (linkedElem = tagCtx.mainElem || tag.mainElem) {
			tagCtx.mainElem = tag.mainElem = linkedElem;
		}
		if (linkedElem = tagCtx.displayElem || tag.displayElem) {
			tagCtx.displayElem = tag.displayElem = linkedElem;
		}
	}

	var linkedElems, linkedElements, linkedElem, l, m, $linkCtxElem, linkCtxElem, tagCtxElse, props, val, oldVal,
		tagCtx = tag.tagCtx,
		tagCtxs = tag.tagCtxs,
		tagCtxslength = tagCtxs && tagCtxs.length,
		linkCtx = tag.linkCtx,
		bindTo = tag.bindTo || {};

	if (tag._.unlinked) { // First call to onAfterLink, or first call after onUpdate: updateContent. Initialize and call onBind and set properties
		$linkCtxElem = $(linkCtx.elem);
		if (tag.linkedElement || tag.mainElement || tag.displayElement) {
			if (linkedElements = tag.linkedElement) {
				// tag.linkedElement: - selector, or array of selectors, for identifying linked elements in template/rendered content.
				// (But for tag bindings on data-linked elements, defaults to data-linked element)
				tag.linkedElem = undefined;
				l = linkedElements.length;
				while (l--) {
					if (linkedElements[l]) {
						m = tagCtxslength;
						while (m--) {
							linkCtxElem = !m && !tag.inline && $linkCtxElem.filter(linkedElements[l]);
							tagCtxElse = tagCtxs[m];
							linkedElems = tagCtxElse.linkedElems = tagCtxElse.linkedElems || new Array(l);
							linkedElem = linkCtxElem[0] ? linkCtxElem : tagCtxElse.contents(true, linkedElements[l]);
							if (linkedElem[0] && linkedElem[0].type !== RADIO) {
								linkedElems[l] = linkedElem.eq(0);
							}
						}
					}
				}
			}
			if (linkedElements = tag.mainElement) {
				// tag.mainElement: - selector for identifying mainElem in template/rendered content
				// (But for tag bindings on data-linked elements, defaults to data-linked element)
				m = tagCtxslength;
				while (m--) {
					linkCtxElem = !m && !tag.inline && $linkCtxElem.filter(linkedElements);
					tagCtxElse = tagCtxs[m];
					linkedElem = linkCtxElem[0] ? linkCtxElem : tagCtxElse.contents(true, linkedElements).eq(0);
					if (linkedElem[0]) {
						tagCtxElse.mainElem = linkedElem;
					}
				}
			}
			if (linkedElements = tag.displayElement) {
				// tag.mainElement: - selector for identifying mainElem in template/rendered content
				// (But for tag bindings on data-linked elements, defaults to data-linked element)
				m = tagCtxslength;
				while (m--) {
					linkCtxElem = !m && !tag.inline && $linkCtxElem.filter(linkedElements);
					tagCtxElse = tagCtxs[m];
					linkedElem = linkCtxElem[0] ? linkCtxElem : tagCtxElse.contents(true, linkedElements).eq(0);
					if (linkedElem[0]) {
						tagCtxElse.displayElem = linkedElem;
						if (!m) {
							tag.displayElem = linkedElem;
						}
					}
				}
			}
			copyFromTagCtxToTag();
		}
		if (tag.onBind) {
			tag.onBind(tagCtx, linkCtx, tag.ctx, ev, eventArgs);
			copyFromTagCtxToTag();
		}
	}

	m = tagCtxslength;
	while (m--) {
		tagCtxElse = tagCtxs[m];
		props = tagCtxElse.props;

		if (linkedElem = tagCtxElse.mainElem || !tag.mainElement && tagCtxElse.linkedElems && tagCtxElse.linkedElems[0]) {
			// linkedElem is the mainElem (defaulting to linkedElem)
			if (linkedElem[0] && props.id && !linkedElem[0].id) {
				linkedElem[0].id = props.id;
			}
			if (tag.setSize) {
				if (val = !bindTo.height && props.height || tag.height) {
					linkedElem.height(val);
				}
				if (val = !bindTo.width && props.width || tag.width) {
					linkedElem.width(val);
				}
			}
		}

		if (val = (linkedElem = tagCtxElse.displayElem || linkedElem) && (!bindTo["class"] && props["class"] || tag.className)) {
			// This code supports dynamic binding to class - where it adds the class if absent, and removes/adds if a previous value is present
			oldVal = linkedElem[0]._jsvCl;
			if (val !== oldVal) {
				if (linkedElem.hasClass(oldVal)) {
					linkedElem.removeClass(oldVal);
				}
				linkedElem.addClass(val);
				linkedElem[0]._jsvCl = val;
			}
		}
	}

	if (tag.onAfterLink) {
		tag.onAfterLink(tagCtx, linkCtx, tag.ctx, ev, eventArgs);
		copyFromTagCtxToTag();
	}

	if (!tag.flow && !tag._.chg) {
		if (tag.inline && tag._.unlinked && (tag.linkedElems || bindTo)) {
			defineBindToDataTargets(bindingStore[tag._tgId], tag);
		}
		tag.setValue();
	}
	tag._.unlinked = undefined;
}

function asyncOnElemChange(ev) {
	var which = ev.which;
	if (!(which > 15 && which < 21 || which > 32 && which < 41 || which > 111 && which < 131 || which === 27 || which === 144)) {
		// Shift, Ctrl, Alt, Pause, Caplock, Page up/down End, Home, Left, Up, Right, Down, Function keys, Escape, Numlock
		setTimeout(function() {
			onElemChange(ev);
		});
	}
}

function bindTriggerEvent($elem, trig, onoff) {
	// Bind keydown, or other trigger - (rather than use the default change event bubbled to activeBody)
	if (trig === true && useInput) {
		$elem[onoff]("input.jsv", onElemChange); // For HTML5 browser with "oninput" support - for mouse editing of text
	} else {
		trig = "" + trig === trig ? trig : "keydown.jsv"; // Set trigger to (true || truey non-string (e.g. 1) || 'keydown')
		$elem[onoff](trig, trig.indexOf("keydown") >= 0 ? asyncOnElemChange : onElemChange); // Get 'keydown' with async
	}
}

function bindLinkedElChange(tag, linkedElem) {
	// Two-way binding for linkedElem - in the case of input, textarea or contentEditable elements.
	// Trigger setting may have changed. Unbind previous trigger binding (if any) and bind new one.

	var $linkedElem, newTrig,
		oldTrig = linkedElem._jsvTr || false;

	if (tag) {
		newTrig = tag.tagCtx.props.trigger;
		if (newTrig === undefined) {
			newTrig = tag.trigger;
		}
	}
	if (newTrig === undefined) {
		newTrig = $subSettings.trigger;
	}
	// Trigger is noop except for text box, textarea, contenteditable...
	newTrig = newTrig && (linkedElem.tagName === "INPUT" && linkedElem.type !== CHECKBOX && linkedElem.type !== RADIO
		|| linkedElem.type === "textarea" || linkedElem.contentEditable === TRUE) && newTrig || false;

	if (oldTrig !== newTrig) {
		$linkedElem = $(linkedElem);
		bindTriggerEvent($linkedElem, oldTrig, "off");
		bindTriggerEvent($linkedElem, linkedElem._jsvTr = newTrig, "on");
	}
}

function defineBindToDataTargets(binding, tag, cvtBk) {
	// Two-way binding.
	// We set the binding.to[1] to be the cvtBack, and binding.to[0] to be either the path to the target, or [object, path] where the target is the
	// path on the provided object. So for a computed path with an object call: a.b.getObject().d.e, we set to[0] to be [exprOb, "d.e"], and
	// we bind to the path on the returned object, exprOb.ob, as target. Otherwise our target is the first path, paths[0], which we will convert
	// with contextCb() for paths like ~a.b.c or #x.y.z

	var pathIndex, path, lastPath, bindtoOb, to, bindTo, paths, k, l, obsCtxPrm, linkedCtxParam, contextCb, targetPaths, bindTos,
		tagElse = 1,
		tos = [],
		linkCtx = binding.linkCtx,
		source = linkCtx.data,
		targetPathsElses = linkCtx.fn.paths;

	if (binding && !binding.to) {
		if (tag) {
			tag.convertBack = tag.convertBack || cvtBk;
			bindTo = tag.bindTo;
			tagElse = tag.tagCtxs ? tag.tagCtxs.length : 1;
		}
		while (tagElse--) {
			bindTos = [];
			if (targetPaths = targetPathsElses[tagElse]) {
				bindTo = targetPaths._jsvto ? ["_jsvto"] : (bindTo || [0]);
				k = bindTo.length;
				while (k--) {
					path = "";
					contextCb = linkCtx._ctxCb;
					paths = targetPaths[bindTo[k]];
					if (pathIndex = paths && paths.length) {
						lastPath = paths[pathIndex - 1];
						if (lastPath._cpfn) { // Computed property exprOb

							bindtoOb = lastPath;
							while (lastPath.sb && lastPath.sb._cpfn) {
								path = lastPath = lastPath.sb;
							}
							path = lastPath.sb || path && path.path;
							lastPath = path ? path.slice(1) : bindtoOb.path;
						}
						to = path
							? [bindtoOb, // 'exprOb' for this expression and view-binding. So bindtoOb.ob is current object returned by expression.
									lastPath]
							: resolveDataTargetPath(lastPath, source, contextCb); // Get 'to' for target path: lastPath
					} else {
						// Contextual parameter ~foo with no external binding - has ctx.foo = [{_ocp: xxx}] and binds to ctx.foo._ocp
						linkedCtxParam = tag.linkedCtxParam;
						to = [];
						if (linkedCtxParam && linkedCtxParam[k]) {
							// This is a tag binding, with linked tag contextual parameters
							to = [tag.tagCtxs[tagElse].ctx[linkedCtxParam[k]][0], _ocp];
						}
					}
					if ((obsCtxPrm = to._cxp) && obsCtxPrm.tag && lastPath.indexOf(".")<0) {
						// This is a binding for a tag contextual parameter (e.g. <input data-link="~wd"/> within a tag block content
						to = obsCtxPrm;
					}
					bindTos.unshift(to);
				}
			}
			tos.unshift(bindTos);
		}
		binding.to = tos;
	}
}

function resolveDataTargetPath(targetPath, source, contextCb) {
	// Iteratively process targetPath, resolving ~a.b.c paths for contextual parameters
	var path, bindtoOb, to, l, obsCtxPrm, view, topCp, data;

	while (targetPath && targetPath !== _ocp && (to = contextCb(path = targetPath.split("^").join("."), source)) && (l = to.length)) {
		if (obsCtxPrm = to[0]._cxp) { // Two-way binding to a contextual parameter reference, ~foo (declared as ~foo=expr on a parent tag)
			topCp = topCp || obsCtxPrm;
			view = to[0][0];
			if (_ocp in view) {
				data = view;
				view = view._vw;
			} else {
				data = view.data;
			}
			topCp.path = targetPath = to[0][1];
			to = [topCp.data = data, targetPath];
				contextCb = $sub._gccb(view);
				if (targetPath._cpfn) { // computed property
					bindtoOb = targetPath;
					bindtoOb.data = to[0];
					bindtoOb._cpCtx = contextCb;
					while (targetPath.sb && targetPath.sb._cpfn) {
						path = targetPath = targetPath.sb;
					}
					path = targetPath.sb || path && path.path;
					targetPath = path ? path.slice(1) : bindtoOb.path;
					to = [
						bindtoOb, // 'exprOb' for this expression and view-binding. So bindtoOb.ob is current object returned by expression.
						targetPath
					];
				} else if (obsCtxPrm.tag && obsCtxPrm.path === _ocp) {
					to = obsCtxPrm;
				}
		} else { // Two-way binding to a helper - e.g. ~address.street, or computed, e.g. ~fullName(), or view property e.g. #data.foo
			to = l>2
				? [to[l-3], to[l-2]] // With path: [object, path]
				: [to[l-2]];         // No path, (e.g. [function] for computed with setter)
		}
		source = to[0];
		targetPath = to[1];
	}
	to = to || [source, path];
	to._cxp = topCp;
	return to;
}

function mergeCtxs(tag, newCtxs, replace) { // Merge updated tagCtxs into tag.tagCtxs
	var tagCtx, newTagCtx,
		view = tag.tagCtx.view,
		tagCtxs = tag.tagCtxs || [tag.tagCtx],
		l = tagCtxs.length,
		refresh = !newCtxs;

	newCtxs = newCtxs || tag._.bnd.call(view.tmpl, (tag.linkCtx || view).data, view, $sub);

	if (replace) {
		// Replace previous tagCtxs by new ones, rather than merging
		tagCtxs = tag.tagCtxs = newCtxs;
		tag.tagCtx = tagCtxs[0];
		addLinkMethods(tag);
	} else {
		while (l--) {
			tagCtx = tagCtxs[l];
			newTagCtx = newCtxs[l];
			$observable(tagCtx.props).setProperty(newTagCtx.props);
			$extend(tagCtx.ctx, newTagCtx.ctx); // We don't support propagating ctx variables, ~foo, observably, to nested views. So extend, not setProperty...
			tagCtx.args = newTagCtx.args;
			if (refresh) {
				tagCtx.tmpl = newTagCtx.tmpl;
			}
		}
	}
	$sub._ths(tag, tagCtxs[0]); // tagHandlersFromProps
	return tagCtxs;
}

//=========
// Disposal
//=========

function clean(elems) {
	// Remove data-link bindings, or contained views
	var l, elem, bindings,
		elemArray = [],
		len = elems.length,
		i = len;
	while (i--) {
		// Copy into an array, so that deletion of nodes from DOM will not cause our 'i' counter to get shifted
		// (Note: This seems as fast or faster than elemArray = [].slice.call(elems); ...)
		elemArray.push(elems[i]);
	}
	i = len;
	while (i--) {
		elem = elemArray[i];
		if (elem.parentNode) {
			// Has not already been removed from the DOM
			if (bindings = elem._jsvBnd) {
				// Get propertyChange bindings for this element
				// This may be an element with data-link, or the opening script marker node for a data-linked tag {^{...}}
				// bindings is a string with the syntax: "(&bindingId)*"
				bindings = bindings.slice(1).split("&");
				elem._jsvBnd = "";
				l = bindings.length;
				while (l--) {
					// Remove associated bindings
					removeViewBinding(bindings[l], elem._jsvLkEl, elem); // unbind bindings with this bindingId on this view
				}
			}
			disposeTokens(markerNodeInfo(elem) + (elem._df || ""), elem);
		}
	}
}

function removeViewBinding(bindId, linkedElemTag, elem) {
	// Unbind
	var objId, linkCtx, tag, object, obsId, tagCtxs, l, map, linkedElem, trigger, view, tagCtx, linkedElems, allLinkedElems,
		binding = bindingStore[bindId];

	if (linkedElemTag) {
		elem._jsvLkEl = undefined;
	} else if (binding && (!elem || elem === binding.elem)) { // Test that elem is actually binding.elem, since cloned elements can have inappropriate markerNode info
		delete bindingStore[bindId]; // Delete already, so call to onDispose handler below cannot trigger recursive deletion (through recursive call to jQuery cleanData)
		for (objId in binding.bnd) {
			object = binding.bnd[objId];
			obsId = binding.cbId;
			if ($isArray(object)) {
				$([object]).off(arrayChangeStr + obsId).off(propertyChangeStr + obsId); // There may be either or both of arrayChange and propertyChange
			} else {
				$(object).off(propertyChangeStr + obsId);
			}
			delete binding.bnd[objId];
		}

		if (linkCtx = binding.linkCtx) {
			if (tag = linkCtx.tag) {
				if (tagCtxs = tag.tagCtxs) {
					l = tagCtxs.length;
					while (l--) {
						tagCtx = tagCtxs[l];
						if (map = tagCtx.map) {
							map.unmap(); //unobserve
						}
						// Copy linkedElems in case tag.linkedElem or tag.linkedElems are undefined in onUnbind
						if (linkedElems = tagCtx.linkedElems) {
							allLinkedElems = (allLinkedElems || []).concat(linkedElems);
						}
					}
				}

				if (tag.onUnbind) {
					tag.onUnbind(tag.tagCtx, linkCtx, tag.ctx, true);
				}
				if (tag.onDispose) {
					tag.onDispose();
				}

				if (!tag._elCnt) {
					if (tag._prv) {
						tag._prv.parentNode.removeChild(tag._prv);
					}
					if (tag._nxt) {
						tag._nxt.parentNode.removeChild(tag._nxt);
					}
				}
			}

			linkedElems = allLinkedElems || [$(linkCtx.elem)];
			l = linkedElems.length;
			while (l--) {
				linkedElem = linkedElems[l];
				if (trigger = linkedElem && linkedElem[0] && linkedElem[0]._jsvTr) {
					bindTriggerEvent(linkedElem, trigger, "off");
					linkedElem[0]._jsvTr = undefined;
				}
			}

			view = linkCtx.view;
			if (view.type === "link") {
				view.parent.removeViews(view._.key, undefined, true); // A "link" view is associated with the binding, so should be disposed with binding.
			} else {
				delete view._.bnds[bindId];
			}
		}
		delete cbBindingsStore[binding.cbId];
	}
}

function $unlink(to) {
	if (to) {
		to = to.jquery ? to : $(to);
		to.each(function() {
			var innerView;
			//TODO fix this for better perf. Rather that calling inner view multiple times which does querySelectorAll each time, consider a single querySelectorAll
			// or simply call view.removeViews() on the top-level views under the target 'to' node, then clean(...)
			while ((innerView = $view(this, true)) && innerView.parent) {
				innerView.parent.removeViews(innerView._.key, undefined, true);
			}
			clean(this.getElementsByTagName("*"));
		});
		clean(to);
	} else {
		// Call to $.unlink() is equivalent to $.unlink(true, "body")
		if (activeBody) {
			$(activeBody)
				.off(elementChangeStr, onElemChange)
				.off('blur.jsv', '[contenteditable]', onElemChange);
			activeBody = undefined;
		}
		topView.removeViews();
		clean(document.body.getElementsByTagName("*"));
	}
}

//========
// Helpers
//========

function inputAttrib(elem) {
	return elem.type === CHECKBOX ? elem[CHECKED] : elem.value;
}

function changeHandler(view, name, tag) {
	// Get onBeforeChange, onAfterChange, onAfterCreate handler - if there is one;
	return tag && tag[name] || view.ctx[name] && view.ctxPrm(name) || $views.helpers[name];
}

//========================== Initialize ==========================

//=====================
// JsRender integration
//=====================

addLinkMethods($sub.View.prototype); // Modify the View prototype to include link methods

$sub.onStore.template = function(name, item, parentTmpl) {
	if (item === null) {
		delete $.link[name];
		delete $.render[name];
	} else {
		item.link = tmplLink;

		if (name && !parentTmpl && name !== "jsvTmpl") {
			$.render[name] = item;
			$.link[name] = function() {
				return tmplLink.apply(item, arguments);
			};
		}
	}
};

$sub.viewInfos = viewInfos; // Expose viewInfos() as public helper method

// Define JsViews version of delimiters(), and initialize
($viewsSettings.delimiters = function() {
	// Run delimiters initialization in context of jsrender.js
	var ret = oldJsvDelimiters.apply(0, arguments);

	if (oldJsvDelimiters !== $viewsDelimiters) {
		// If JsRender was loaded before JsViews, then need also to initialize and set globals in that JsRender instance
		ret = $viewsDelimiters.apply(0, arguments);
	}

	// Data-linking must use new delimiters
	rTagDatalink = new RegExp("(?:^|\\s*)([\\w-]*)(\\" + linkChar + ")?(\\" + delimOpenChar1 + $sub.rTag + "(:\\w*)?\\" + delimCloseChar0 + ")", "g");
	return ret;
})(); // jshint ignore:line

$sub.addSetting("trigger");

//====================================
// Additional members for linked views
//====================================

function transferViewTokens(prevNode, nextNode, parentElem, id, viewOrTagChar, refresh) {
	// Transfer tokens on prevNode of viewToRemove/viewToRefresh to nextNode or parentElem._df
	// view marker tokens: #m_...VIEW.../m_
	// tag marker tokens: #m^...TAG..../m^

	var i, l, vwInfos, vwInfo, viewOrTag, viewId, tokens,
		precedingLength = 0,
		emptyView = prevNode === nextNode;

	if (prevNode) {
		// prevNode is either the first node in the viewOrTag, or has been replaced by the vwInfos tokens string
		vwInfos = viewInfos(prevNode) || [];
		for (i = 0, l = vwInfos.length; i < l; i++) {
			// Step through views or tags on the prevNode
			vwInfo = vwInfos[i];
			viewId = vwInfo.id;
			if (viewId === id && vwInfo.ch === viewOrTagChar) {
				if (refresh) {
					// This is viewOrTagToRefresh, this is the last viewOrTag to process...
					l = 0;
				} else {
					// This is viewOrTagToRemove, so we are done...
					break;
				}
			}
			if (!emptyView) {
				viewOrTag = vwInfo.ch === "_"
					? viewStore[viewId]                 // A view: "#m_" or "/m_"
					: bindingStore[viewId].linkCtx.tag; // A tag   "#m^" or "/m^"
				if (vwInfo.open) {                    // A "#m_" or "#m^" token
					viewOrTag._prv = nextNode;
				} else if (vwInfo.close) {            // A "/m_" or "/m^" token
					viewOrTag._nxt = nextNode;
				}
			}
			precedingLength += viewId.length + 2;
		}

		if (precedingLength) {
			prevNode.setAttribute(jsvAttrStr, prevNode.getAttribute(jsvAttrStr).slice(precedingLength));
		}
		tokens = nextNode ? nextNode.getAttribute(jsvAttrStr) : parentElem._df;
		if (l = tokens.indexOf("/" + id + viewOrTagChar) + 1) {
			tokens = vwInfos._tkns.slice(0, precedingLength) + tokens.slice(l + (refresh ? -1 : id.length + 1));
		}
		if (tokens) {
			if (nextNode) {
				// If viewOrTagToRemove was an empty viewOrTag, we will remove both #n and /n
				// (and any intervening tokens) from the nextNode (=== prevNode)
				// If viewOrTagToRemove was not empty, we will take tokens preceding #n from prevNode,
				// and concatenate with tokens following /n on nextNode
				nextNode.setAttribute(jsvAttrStr, tokens);
			} else {
				setDefer(parentElem, tokens);
			}
		}
	} else {
		// !prevNode, so there may be a deferred nodes token on the parentElem. Remove it.
		setDefer(parentElem, removeSubStr(parentElem._df, "#" + id + viewOrTagChar));
		if (!refresh && !nextNode) {
			// If this viewOrTag is being removed, and there was no .nxt, remove closing token from deferred tokens
			setDefer(parentElem, removeSubStr(parentElem._df, "/" + id + viewOrTagChar));
		}
	}
}

function disposeTokens(tokens, elem) {
	var i, l, vwItem, vwInfos;
	if (vwInfos = viewInfos(tokens, true, rOpenMarkers)) {
		for (i = 0, l = vwInfos.length; i < l; i++) {
			vwItem = vwInfos[i];
			if (vwItem.ch === "_") {
				if ((vwItem = viewStore[vwItem.id]) && vwItem.type && (!elem || vwItem._prv === elem || vwItem.parentElem === elem )) {
					// If this is the _prv (prevNode) for a view, remove the view
					// - unless view.type is undefined, in which case it is already being removed
					// (or unless the elem is not related - e.g. a cloned element which 'accidentally' picked up the data-jsv atttribute of the ._df expando)
					vwItem.parent.removeViews(vwItem._.key, undefined, true);
				}
			} else {
				removeViewBinding(vwItem.id, undefined, elem); // unbind bindings with this bindingId on this view
			}
		}
	}
}

//============================================
// Add link methods to data-linked view or tag
//============================================

function updateValue(val, index, tagElse, bindId, ev) {
// Observably update a data value targeted by bindTo
// Called when linkedElem changes: called as updateValue(val, index, tagElse, bindId, ev) - this: undefined
// Called directly as tag.updateValue(val, index, tagElse) - this: tag
	var values = [];
	if (this && this._tgId) {
		bindId = this;
	}
	values[index||0] = val;
	updateValues(values, tagElse, bindId, ev);
	return this;
}

function setValues() {
	var args = arguments,
		m = args.length;

	if (!m) {
		args = this.tag.cvtArgs(true, this.index); // setValues() with no arguments calls setValue with boundArgs values
		m = args.length;
	}
	while (m--) {
		this.tag.setValue(args[m], m, this.index);
	}
}

function addLinkMethods(tagOrView) { // tagOrView is View prototype or tag instance

	var l, m, tagCtx, boundProps, bindTo, key, theTag, theView;

	tagOrView.contents = function(deep, select) {
		// For a view, a tag or a tagCtx, return jQuery object with the content nodes,
		if (deep !== !!deep) {
			// deep not boolean, so this is contents(selector)
			select = deep;
			deep = undefined;
		}
		var filtered,
			nodes = $(this.nodes());
		if (nodes[0]) {
			filtered = select ? nodes.filter(select) : nodes;
			nodes = deep && select ? filtered.add(nodes.find(select)) : filtered;
		}
		return nodes;
	};

	tagOrView.nodes = function(withMarkers, prevNode, nextNode) {
		// For a view, a tag or a tagCtx, return top-level nodes
		// Do not return any script marker nodes, unless withMarkers is true
		// Optionally limit range, by passing in prevNode or nextNode parameters

		var node,
			self = this.contentView || this, // If tagCtx, use tagCtx.contentView
			elCnt = self._elCnt,
			prevIsFirstNode = !prevNode && elCnt,
			nodes = [];

		if (!self.args) { // If tagCtx with no content (so no contentView) self is tagCtx: return empty [];
			prevNode = prevNode || self._prv;
			nextNode = nextNode || self._nxt;

			node = prevIsFirstNode
				? (prevNode === self._nxt
					? self.parentElem.lastSibling
					: prevNode)
				: (self.inline === false
					? prevNode || self.linkCtx.elem.firstChild
					: prevNode && prevNode.nextSibling);

			while (node && (!nextNode || node !== nextNode)) {
				if (withMarkers || elCnt || node.tagName !== SCRIPT) {
					// All the top-level nodes in the view
					// (except script marker nodes, unless withMarkers = true)
					// (Note: If a script marker node, viewInfo.elCnt undefined)
					nodes.push(node);
				}
				node = node.nextSibling;
			}
		}
		return nodes;
	};

	tagOrView.childTags = function(deep, tagName) {
		// For a view, a tagor a tagCtx, return child tags - at any depth, or as immediate children only.
		if (deep !== !!deep) {
			// deep not boolean, so this is childTags(tagName) - which looks for top-level tags of given tagName
			tagName = deep;
			deep = undefined;
		}

		var self = this.contentView || this, // If tagCtx, use tagCtx.contentView
			view = self.link ? self : self.tagCtx.view, // This may be a view or a tag. If a tag, get the view from tag.tagCtx.view
			prevNode = self._prv,
			elCnt = self._elCnt,
			tags = [];

		if (!self.args) { // If tagCtx with no content (so no contentView) self is tagCtx: return empty [];
			view.link(
				undefined,
				self.parentElem,
				elCnt ? prevNode && prevNode.previousSibling : prevNode,
				self._nxt,
				undefined,
				{get:{
					tags: tags,
					deep: deep,
					name: tagName,
					id: self.link ? self._.id + "_" : self._tgId + "^"
				}}
			);
		}
		return tags;
	};

	if (tagOrView._is === "tag") {
		//=======================
		// This is a TAG instance
		//=======================

		theTag = tagOrView;

		m = theTag.tagCtxs.length;
		while (m--) {
			tagCtx = theTag.tagCtxs[m];

			tagCtx.setValues = setValues;
			tagCtx.cvtArgs = convertArgs;
			tagCtx.bndArgs = convertBoundArgs;
			tagCtx.contents = tagOrView.contents;
			tagCtx.childTags = tagOrView.childTags;
			tagCtx.nodes = tagOrView.nodes;
		}

		boundProps = theTag.boundProps = theTag.boundProps || [];
		if (bindTo = theTag.linkTo ? ["linkTo"] : theTag.bindTo) {
			l = bindTo.length;
			while (l--) {
				key = bindTo[l];
				if (key + "" === key) {
					bindTo[key] = 1;
					if ($.inArray(key, boundProps) < 0) {
						boundProps.push(key); // Add any 'bindTo' props to boundProps array. (So two-way binding works without writing ^foo=expression)
					}
				}
			}
		}

		theTag.setValue = $sub._gm(theTag.constructor.prototype.setValue, function(val, index, tagElse) {
			if (!arguments.length) { // tag.setValue() calls setValue(val, index) for each parameter in bindTo array
				theTag.setValues(); // = theTag.bndArgs()
				return theTag;
			}
			var linkedElem, linkedEl, linkedTag,
				linkedCtxParam = theTag.linkedCtxParam,
				tagCtx = theTag.tagCtxs[tagElse || 0],
				props = tagCtx.props,
				linkCtx = theTag.linkCtx,
				linkedElems = tagCtx.linkedElems || theTag.linkedElem && [theTag.linkedElem];

			if (val !== undefined) {
				theTag.base.call(theTag , val, index, tagElse);
			} else if (theTag.getValue && (val = theTag.getValue(tagElse)) && val !== undefined) {
				// If bound args are not initialized, and getValue is defined, use getValue to initialize
				if (theTag.bindTo.length > 1) {
					val = val[index]; // getVal returns value if tag.bndArgs() (and bindTo) length is 1, or array of values if bindTo.length > 1
				}
				if (linkedCtxParam && linkedCtxParam[index]) {
					// Values of tag contextual param were already intialized (during rendering) so need to observably update to values from tag.getValue()
					$.observable(tagCtx.ctx[linkedCtxParam[index]][0]).setProperty(_ocp, val);
				}
			}
			if ((linkedElem = linkedElems && linkedElems[index]) && linkedElem[0]) {
				l = linkedElem.length;
				while (l--) {
					linkedEl = linkedElem[l];
					if (theTag._.unlinked) {
						linkedTag = linkedEl._jsvLkEl;
						if (!linkedTag || linkedTag !== theTag) {
							if (linkedTag) {
								val = linkedTag.cvtArgs(true, tagElse)[index]; // Need to use converter of linked tag
							}
							// For data-linked tags, identify the linkedEl with the tag, for "to" binding
							// (For data-linked elements, if not yet bound, we identify later when the linkCtx.elem is bound)
							linkedEl._jsvLkEl = theTag;
							linkedEl._jsvInd = index;
							linkedEl._jsvElse = tagElse;
							bindLinkedElChange(theTag, linkedEl);
							linkedEl._jsvBnd = "&" + theTag._tgId + "+"; // Add a "+" for cloned binding - so removing
							// elems with cloned bindings will not remove the 'parent' binding from the bindingStore.
						}
					}
					if (val !== undefined && !linkedEl._jsvChg && linkCtx._val !== val) {
						if (linkedEl.value !== undefined) {
							if (linkedEl.type === CHECKBOX) {
								linkedEl[CHECKED] = val && val !== "false";
							} else if (linkedEl.type === RADIO) {
								linkedEl[CHECKED] = (linkedEl.value === val);
							} else if ($isArray(val)) {
								linkedEl.value = val; // Don't use jQuery since it replaces array by mapped clone
							} else {
								$(linkedEl).val(val); // Use jQuery for attrHooks - can't just set value (on select, for example)
							}
						} else if (linkedEl.contentEditable === TRUE) {
							linkedEl.innerHTML = val;
						}
					}
					if (props.name) {
						linkedEl.name = linkedEl.name || props.name;
					}
				}
			}
			return theTag;
		});

		theTag.updateValue = updateValue;

		theTag.updateValues = function() {
			return updateValues(arguments, undefined, this);
		};

		theTag.setValues = function() {
			var m = arguments.length ? 1 : theTag.tagCtxs.length;
			while (m--) {
				setValues.apply(theTag.tagCtxs[m], arguments);
			}
		};

		theTag.refresh = function(sourceValue) {
			var attr,
				linkCtx = theTag.linkCtx,
				view = theTag.tagCtx.view;

			if (theTag.onUnbind) {
				theTag.onUnbind(theTag.tagCtx, linkCtx, theTag.ctx);
			}
			attr = theTag.inline ? HTML : (linkCtx.attr || defaultAttr(theTag.parentElem, true));
			sourceValue = $sub._tag(theTag, view, view.tmpl, mergeCtxs(theTag), true); // Get rendered HTML for tag, based on refreshed tagCtxs
			updateContent(sourceValue, linkCtx, attr, theTag);
			callAfterLink(theTag);
			return theTag;
		};

		theTag.domChange = function() { // domChange notification support
			var elem = this.parentElem,
				hasListener = $.hasData(elem) && $._data(elem).events,
				domChangeNotification = "jsv-domchange";

			if (hasListener && hasListener[domChangeNotification]) {
				// Only trigger handler if there is a handler listening for this event. (Note using triggerHandler - so no event bubbling.)
				$(elem).triggerHandler(domChangeNotification, arguments);
			}
		};

		//====================================
		// End of added link methods for TAG
		//====================================
	} else {
		//=========================
		// This is a VIEW prototype
		//=========================

		theView = tagOrView;

		// Note: a linked view will also, after linking have nodes[], _prv (prevNode), _nxt (nextNode) ...
		theView.addViews = function(index, dataItems) {
			// if view is not an array view, do nothing
			var i, viewsCount,
				view = this,
				itemsCount = dataItems.length,
				views = view.views;

			if (!view._.useKey && itemsCount) {
				// view is of type "array"
				viewsCount = views.length + itemsCount;

				if (viewsCount === view.data.length // If views not already synced to array (e.g. triggered by array.length propertyChange - jsviews/issues/301)
						&& renderAndLink(view, index, view.tmpl, views, dataItems, view.ctx) !== false) {
					if (!view._.srt) { // Not part of a 'sort' on refresh
						view.fixIndex(index + itemsCount);
					}
				}
			}
		};

		theView.removeViews = function(index, itemsCount, keepNodes, isMove) {
			// view.removeViews() removes all the child views
			// view.removeViews(index) removes the child view with specified index or key
			// view.removeViews(index, count) removes the specified nummber of child views, starting with the specified index
			function removeView(index) {
				var id, bindId, parentElem, prevNode, nextNode, nodesToRemove,
					viewToRemove = views[index];

				if (viewToRemove && viewToRemove.link) {
					id = viewToRemove._.id;
					if (!keepNodes) {
						// Remove the HTML nodes from the DOM, unless they have already been removed, including nodes of child views
						nodesToRemove = viewToRemove.nodes();
					}

					// Remove child views, without removing nodes
					viewToRemove.removeViews(undefined, undefined, true);

					viewToRemove.type = undefined; // Set type to undefined: used as a flag that this view is being removed
					prevNode = viewToRemove._prv;
					nextNode = viewToRemove._nxt;
					parentElem = viewToRemove.parentElem;
					// If prevNode and nextNode are the same, the view is empty
					if (!keepNodes) {
						// Remove the HTML nodes from the DOM, unless they have already been removed, including nodes of child views
						if (viewToRemove._elCnt) {
							// if keepNodes is false (and transferring of tokens has not already been done at a higher level)
							// then transfer tokens from prevNode which is being removed, to nextNode.
							transferViewTokens(prevNode, nextNode, parentElem, id, "_");
						}
						$(nodesToRemove).remove();
					}
					if (!viewToRemove._elCnt) {
						try {
							prevNode.parentNode.removeChild(prevNode); // (prevNode.parentNode is parentElem, except if jQuery Mobile or similar has inserted an intermediate wrapper
							nextNode.parentNode.removeChild(nextNode);
						} catch (e) {}
					}
					setArrayChangeLink(viewToRemove);
					for (bindId in viewToRemove._.bnds) {
						removeViewBinding(bindId);
					}
					delete viewStore[id];
				}
			}

			var current, childView, viewsCount,
				view = this,
				isArray = !view._.useKey,
				views = view.views;

			if (isArray) {
				viewsCount = views.length;
			}
			if (index === undefined) {
				// Remove all child views
				if (isArray) {
					// views and data are arrays
					current = viewsCount;
					while (current--) {
						removeView(current);
					}
					view.views = [];
				} else {
					// views and data are objects
					for (childView in views) {
						// Remove by key
						removeView(childView);
					}
					view.views = {};
				}
			} else {
				if (itemsCount === undefined) {
					if (isArray) {
						// The parentView is data array view.
						// Set itemsCount to 1, to remove this item
						itemsCount = 1;
					} else {
						// Remove child view with key 'index'
						removeView(index);
						delete views[index];
					}
				}
				if (isArray && itemsCount
					&& (isMove || viewsCount - itemsCount === view.data.length)) { // If views not already synced to array (e.g. triggered by array.length propertyChange - jsviews/issues/301)
					current = index + itemsCount;
					// Remove indexed items (parentView is data array view);
					while (current-- > index) {
						removeView(current);
					}
					views.splice(index, itemsCount);
					if (!view._.srt) {
						view.fixIndex(index);
					}
				}
			}
		};

		theView.moveViews = function(oldIndex, index, itemsCount) {
			function parts(itemView, str) {
				return RegExp("^(.*)(" + (str ? "\\/" : "#") + itemView._.id + "_.*)$").exec(str || itemView._prv.getAttribute(jsvAttrStr));
			}
			function setPrv(itemView, tokens) {
				itemView._prv.setAttribute(jsvAttrStr, tokens);
			}
			var nodes, childView, nxtView, insertBefore, viewId,
				view = this,
				selfNxt = view._nxt,
				views = view.views,
				backwards = index < oldIndex,
				firstChange = backwards ? index : oldIndex,
				lastChange = backwards ? oldIndex : index,
				i = index,
				movedNodes = [],

				viewsToMove = views.splice(oldIndex, itemsCount); // remove

			if (index > views.length) {
				index = views.length;
			}
			views.splice.apply(views, [index, 0].concat(viewsToMove)); //re-insert

			itemsCount = viewsToMove.length;
			insertBefore = index + itemsCount;
			lastChange += itemsCount;

			for (i; i < insertBefore; i++) {
				childView = views[i];
				nodes = childView.nodes(true);
				movedNodes = view._elCnt ? movedNodes.concat(nodes) : movedNodes.concat(childView._prv, nodes, childView._nxt);
			}
			movedNodes = $(movedNodes);

			if (insertBefore < views.length) {
				movedNodes.insertBefore(views[insertBefore]._prv);
			} else if (selfNxt) {
				movedNodes.insertBefore(selfNxt);
			} else {
				movedNodes.appendTo(view.parentElem);
			}

			if (view._elCnt) {
				var afterParts,
					endChange = backwards ? firstChange + itemsCount : lastChange - itemsCount,
					beforeView = views[firstChange-1],
					startView = views[firstChange],
					endView = views[endChange],
					afterView = views[lastChange],
					startParts = parts(startView),
					endParts = parts(endView);

				setPrv(startView, endParts[1] + startParts[2]);
				if (afterView) {
					afterParts = parts(afterView);
					setPrv(afterView, startParts[1] + afterParts[2]);
				} else {
					if (selfNxt) {
						afterParts = parts(view, selfNxt.getAttribute(jsvAttrStr));
						selfNxt.setAttribute(jsvAttrStr, startParts[1] + afterParts[2]);
					} else {
						afterParts = parts(view, view.parentElem._df);
						setDefer(view.parentElem, startParts[1] + afterParts[2]);
					}
				}
				setPrv(endView, afterParts[1] + endParts[2]);
				if (beforeView) {
					beforeView._nxt = startView._prv;
				} else {
					view._prv = startView._prv;
				}
				views[endChange-1]._nxt = endView._prv;
				views[lastChange-1]._nxt = afterView ? afterView._prv : selfNxt;
			}
			view.fixIndex(firstChange);
		};

		theView.refresh = function() {
			var view = this,
				parent = view.parent;

			if (parent) {
				renderAndLink(view, view.index, view.tmpl, parent.views, view.data, undefined, true);
				setArrayChangeLink(view);
			}
		};

		theView.fixIndex = function(fromIndex) {
			// Fixup index on following view items...
			var views = this.views,
				index = views.length;
			while (fromIndex < index--) {
				if (views[index].index !== index) {
					$observable(views[index]).setProperty("index", index);
					// This is fixing up index, but not key, and not index on child views. From child views, use view.getIndex()
				}
			}
		};

		theView.link = viewLink;

		//====================================
		// End of added link methods for VIEW
		//====================================
	}
}

//========================
// JsViews-specific converters
//========================

$converters.merge = function(val) {
	// Special converter used in data-linking to space-separated lists, such as className:
	// Currently only supports toggle semantics - and has no effect if toggle string is not specified
	// data-link="class{merge:boolExpr toggle=className}"
	var regularExpression,
		currentValue = this.linkCtx.elem.className,
		toggle = this.tagCtx.props.toggle;

	if (toggle) {
		// We are toggling the class specified by the toggle property,
		// and the boolean val binding is driving the insert/remove toggle

		regularExpression = toggle.replace(/[\\^$.|?*+()[{]/g, "\\$&");
		// Escape any regular expression special characters (metacharacters) within the toggle string
		regularExpression = "(\\s(?=" + regularExpression + "$)|(\\s)|^)(" + regularExpression + "(\\s|$))";
		// Example: /(\s(?=myclass$)|(\s)|^)?(myclass(\s|$))/ - so matches (" myclass" or " " or ^ ) followed by ("myclass " or "myclass$") where ^/$ are beginning/end of string
		currentValue = currentValue.replace(new RegExp(regularExpression), "$2");
		val = currentValue + (val ? (currentValue && " ") + toggle : "");
	}
	return val;
};

//========================
// JsViews-specific tags
//========================

$tags({
	on: {
		attr: NONE,
		init: function(tagCtx) {
			var content,
				tag = this,
				i = 0,
				args = tagCtx.args, // [events,] [selector,] handler
				l = args.length;

			for (; i<l && !$isFunction(args[i]); i++); // Handler is first arg of type function
			tag._hi = l>i && i+1; // handler index
			if (tag.inline) {
				if (!$sub.rTmpl.exec(content = $.trim(tagCtx.tmpl.markup))) {
					// Inline {^{on}} tag with no content (or external template content) or with content containing
					// no HTML or JsRender tags: We will wrap the (text) content, or the operation name in a <button> element
					// (Otherwise we will attach the handler to the element content after data-linking)
					tag.template = "<button>" + (content || tagCtx.params.args[i] || "noop") + "</button>";
				}
				tag.attr = HTML;
			}
		},
		onBind: function() {
			if (this.template) { // {^{on/}} with no content has template rendering <button>. Make it the mainElem, so we can set id, size or class
				this.mainElem = this.contents("button");
			}
		},
		onAfterLink: function(tagCtx, linkCtx) {
			var handler, params, find, activeElem,
				tag = this,
				i = tag._hi,
				args = tagCtx.args, // [events,] [selector,] handler
				l = args.length,
				props = tagCtx.props,
				data = props.data,
				view = tagCtx.view,
				contextOb = props.context; // Context ('this' pointer) for attached handler

			if (i) { // There is a handler
				handler = args[i-1];
				params = args.slice(i); // Subsequent args are params
				args = args.slice(0, i-1); // Preceding args (if any) are events and selector
				tag._sel = args[1]; // Selector for descendant elements - for delegated events on those elements, delegating to the activeElem

				activeElem = tag.activeElem = tag.activeElem || $(tag.inline
					? (tag._sel = args[1] || "*", tag.parentElem)
					// If inline, attach to child elements of tag parent element (filtered by selector argument if provided.
					// (In handler we'll filter out events from sibling elements preceding or following tag.)
					// This allows us to use the delegated pattern where the attached event works even for added elements satisfying the selector
					: linkCtx.elem);

				if (!contextOb) {
					// Get the path for the preceding object (context object) of handler (which is the last arg), compile function
					// to return that context object, and run compiled function against data
					contextOb = /^(.*)[\.^][\w$]+$/.exec(tagCtx.params.args.slice(-params.length - 1)[0]);
					contextOb = contextOb && $sub.tmplFn(delimOpenChar1 + ":" + contextOb[1] + delimCloseChar0, view.tmpl, true)(linkCtx.data, view);
				}

				if (tag._evs) {
					tag.onUnbind();
				}

				activeElem.on(
					tag._evs = args[0] || "click", // events defaults to "click"
					tag._sel,
					data == undefined ? null : data,
					tag._hlr = function hndlr(ev) {
						var nodes, length,
							found = !tag.inline;

						if (!found) { // If inline, filter out events from sibling elements preceding or following tag.
							nodes = tag.contents("*");
							l = nodes.length;
							while (!found && l--) {
								if (nodes[l].contains(ev.target)) {
									found = true;
								}
							}
						}
						if (found) { // target elem is indeed within the tag, so call the {on} handler
							return handler.apply(contextOb || linkCtx.data, [].concat(
								params, // e.g. par1, par2
								ev,
								{change: ev.type, view: view, linkCtx: linkCtx},
								params.slice.call(arguments, 1) // If triggering event (e.g. jsv-domchange) has additional arguments after ev, pass them too
							));
							// for {on 'click' handler par1 par2} use handler(par1, par2, ev, domchangeEventArgs)
							// for {on 'jsv-domchange' handler par1 par2} use handler(par1, par2, ev, domchangeEventArgs, tagCtx, linkCtx, observableEventArgs)
						}
					}
				);
			}
		},
		onUpdate: false,
		onUnbind: function() {
			var self = this;
			if (self.activeElem) {
				self.activeElem.off(self._evs, self._sel, self._hlr);
			}
		},
		contentCtx: true,
		setSize: true,
		dataBoundOnly: true
	},
	radiogroup: {
		init: function(tagCtx) {
			this.name = tagCtx.props.name || (Math.random() + "jsv").slice(9);
		},
		onBind: function(tagCtx, linkCtx) {
			var domChngCntnr, $linkedElem, l,
				tag = this;

			if (tag.inline) {
				// If the first element is owned by (rendered by) this tag (not by a childTag such as {^{for}})
				// use it as container for detecting dom changes
				domChngCntnr = tag.contents("*")[0];
				domChngCntnr = domChngCntnr && $view(domChngCntnr).ctx.tag === tag.parent ? domChngCntnr : tag.parentElem;
				$linkedElem = tag.contents(true, "input[type=radio]");
			} else {
				domChngCntnr = linkCtx.elem;
				$linkedElem = $("input[type=radio]", linkCtx.elem);
			}
			tag.linkedElem = $linkedElem;
			l = $linkedElem.length;
			while (l--) {
				// Configure the name for each radio input element
				$linkedElem[l].name = $linkedElem[l].name || tag.name;
			}
			// Establish a domchange listener in case this radiogroup wraps a {^{for}} or {^{if}} or similar which might dynamically insert new radio input elements
			$(domChngCntnr).on("jsv-domchange", function(ev, forOrIfTagCtx) {
				var linkedElem, val,
					parentTags = forOrIfTagCtx.ctx.parentTags;
				if (!tag.inline || domChngCntnr !== tag.parentElem // The domChngCntnr is specific to this tag
					// The domChngCntnr is the parentElem of this tag, so need to make sure dom change event is for
					// a content change within this tag, not outside it.
					|| parentTags && parentTags[tag.tagName] === tag) {
					// Contents have changed so recreate $linkedElem for the radio input elements (including possible new one just inserted)
					val = tag.cvtArgs()[0];
					$linkedElem = tag.linkedElem = tag.contents(true, "input[type=radio]");
					l = $linkedElem.length;
					while (l--) {
						// Configure binding and name for each radio input element
						linkedElem = $linkedElem[l];
						linkedElem._jsvLkEl = tag;
						linkedElem.name = linkedElem.name || tag.name;
						linkedElem._jsvBnd = "&" + tag._tgId + "+";
						linkedElem.checked = val === linkedElem.value;
					}
					tag.linkedElems = tagCtx.linkedElems = [$linkedElem];
				}
			});
		},
		onUpdate: false, // don't rerender
		contentCtx: true,
		dataBoundOnly: true
	}
});

$extend($tags["for"], {
	//onUpdate: function(ev, eventArgs, newTagCtxs) {
		//Consider adding filtering for perf optimization. However the below prevents update on some scenarios which _should_ update - namely when there is another array on which for also depends.
		//var i, l, tci, prevArg;
		//for (tci = 0; (prevArg = this.tagCtxs[tci]) && prevArg.args.length; tci++) {
		//	if (prevArg.args[0] !== newTagCtxs[tci].args[0]) {
		//		return true;
		//	}
		//}
		//return false;
	//},
	onArrayChange: function(ev, eventArgs, tagCtx, linkCtx) {
		var arrayView,
			target = ev.target,
			targetLength = target.length,
			tag = this,
			change = eventArgs.change;
		if (tag._.noVws // Child views not supported because target is not html - e.g. data-link="title{for ...}"
			|| tag.tagCtxs[1] && ( // There is an {{else}}
				change === "insert" && targetLength === eventArgs.items.length // inserting, and new length is same as inserted length, so going from 0 to n
				|| change === "remove" && !targetLength // removing , and new length 0, so going from n to 0
			)) {
			tag.refresh();
		} else {
			for (arrayView in tag._.arrVws) {
				arrayView = tag._.arrVws[arrayView];
				if (arrayView.data === target) {
					arrayChangeHandler.apply(arrayView, arguments);
				}
			}
		}
		tag.domChange(tagCtx, linkCtx, eventArgs);
		ev.done = true;
	},
	onAfterLink: function(tagCtx, linkCtx) {
		var arrHandler, arrBinding, data,
			tag = this,
			i = 0,
			arrayBindings = tag._ars || {},
			tagCtxs = tag.tagCtxs,
			l = tagCtxs.length,
			selected = tag.selected || 0;

		for (; i <= selected; i++) {
			tagCtx = tagCtxs[i];    // loop through tagCtxs up to selected
			data = tagCtx.map
				? tagCtx.map.tgt      // 'data' is mapped data
				: tagCtx.args.length
					? tagCtx.args[0]    // or args[0]
					: tagCtx.view.data; // or defaults to current data.

			if ((arrBinding = arrayBindings[i]) && data !== arrBinding[0]) { // Is there previous array data on this tagCtx, different from new data
				$observe(arrBinding[0], arrBinding[1], true); //unobserve previous array
				delete arrayBindings[i];
			}
			if (!arrayBindings[i] && $isArray(data)) {
				(function() {
					var tagCt = tagCtx;
					$observe(data, arrHandler = function(ev, eventArgs) {
						tag.onArrayChange(ev, eventArgs, tagCt, linkCtx);
					});
					arrayBindings[i] = [data, arrHandler]; // Store array data and arrayChangeHandler on tag._ars[i]
				})();
			}
		}
		for (i = selected + 1; i < l; i++) { // If there were previous bindings on later tagCtxs, remove them
			if (arrBinding = arrayBindings[i]) {
				$observe(arrBinding[0], arrBinding[1], true); //unobserve previous binding
				delete arrayBindings[i];
			}
		}
		tag._ars = arrayBindings;
	},
	onDispose: function() {
		var l, tag = this;
		for (l in tag._ars) {
			$observe(tag._ars[l][0], tag._ars[l][1], true); //unobserve
		}
	}
});

$extend($tags["if"], {
	onUpdate: function(ev, eventArgs, newTagCtxs) {
		var prevArg, different,
			tci = 0;
		for (; (prevArg = this.tagCtxs[tci]); tci++) {
			different = prevArg.props.tmpl !== newTagCtxs[tci].props.tmpl || prevArg.args.length && !(prevArg = prevArg.args[0]) !== !newTagCtxs[tci].args[0];
			if ((!this.convert && !!prevArg) || different) {
				return different;
				// If there is not a change of template, and there is no converter, and newArg and prevArg are both truthy, return false to cancel update.
				// (Even if values on later elses are different, we still don't want to update, since rendered output would be unchanged)
				// If newArg and prevArg are different, return true, to update
				// If newArg and prevArg are both falsey, move to the next {{else ...}}
			}
		}
		// Boolean value of all args are unchanged (falsey), so return false to cancel update
		return false;
	},
	onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
		if (eventArgs) {
			this.domChange(tagCtx, linkCtx, eventArgs);
		}
	}
});

function observeProps(map, ev, eventArgs) {
	if (eventArgs.change === "set") {
		var target = map.tgt,
			l = target.length;
		while (l--) {
			if (target[l].key === eventArgs.path) {
				break;
			}
		}
		if (l === -1) {
			if (eventArgs.path && !eventArgs.remove) {
				$observable(target).insert({key: eventArgs.path, prop: eventArgs.value});
			}
		} else if (eventArgs.remove) {
			$observable(target).remove(l);
		} else {
			$observable(target[l]).setProperty("prop", eventArgs.value);
		}
	}
}

function observeMappedProps(map, ev, eventArgs) {
	var item,
		source = map.src,
		change = eventArgs.change;

	if (change === "set") {
		if (eventArgs.path === "prop") {
			$observable(source).setProperty(ev.target.key, eventArgs.value);
		} else { // path === "key"
			$observable(source).removeProperty(eventArgs.oldValue); // When key is modified observably, remove old one and set new one
			$observable(source).setProperty(eventArgs.value, ev.target.prop);
		}
	} else if (change === "remove") {
		item = eventArgs.items[0];
		$observable(source).removeProperty(item.key);
		delete source[item.key];
	} else if (change === "insert") {
		item = eventArgs.items[0];
		if (item.key) {
			$observable(source).setProperty(item.key, item.prop);
		}
	}
}

function shallowArrayFilter(allPath /*, object, parentObs*/) { // Filter used by {{props}} for the mappedProps target array
	return allPath.indexOf(".") < 0;
}

$tags("props", {
	baseTag: "for",
	dataMap: $views.map({
		getTgt: $tags.props.dataMap.getTgt,
		obsSrc: observeProps,
		obsTgt: observeMappedProps,
		tgtFlt: shallowArrayFilter
	}),
	flow: true
});

//========================
// Extend jQuery namespace
//========================

$extend($, {

	//=======================
	// jQuery $.view() plugin
	//=======================

	view: $view = function(node, inner, type) {
		// $.view() returns top view
		// $.view(node) returns view that contains node
		// $.view(selector) returns view that contains first selected element
		// $.view(nodeOrSelector, type) returns nearest containing view of given type
		// $.view(nodeOrSelector, "root") returns root containing view (child of top view)
		// $.view(nodeOrSelector, true, type) returns nearest inner (contained) view of given type

		function getInnerView(nd, isVl) {
			if (nd) {
				vwInfos = viewInfos(nd, isVl, rOpenViewMarkers);
				for (j = 0, k = vwInfos.length; j < k; j++) {
					if ((view = viewStore[vwInfos[j].id]) && (view = view && type ? view.get(true, type) : view)) {
						break;
					}
				}
			}
		}

		if (inner !== !!inner) {
			// inner not boolean, so this is view(nodeOrSelector, type)
			type = inner;
			inner = undefined;
		}
		var view, vwInfos, i, j, k, l, elems,
			level = 0,
			body = document.body;

		if (node && node !== body && topView._.useKey > 1) {
			// Perf optimization for common cases

			node = "" + node === node
				? $(node)[0]
				: node.jquery
					? node[0]
					: node;

			if (node) {
				if (inner) {
					getInnerView(node._df, true);
					if (!view) {
						// Treat supplied node as a container element and return the first view encountered.
						elems = qsa ? node.querySelectorAll(bindElsSel) : $(bindElsSel, node).get();
						l = elems.length;
						for (i = 0; !view && i < l; i++) {
							getInnerView(elems[i]);
						}
					}
					return view;
				}
				while (node) {
					// Move back through siblings and up through parents to find preceding node which is a _prv (prevNode)
					// script marker node for a non-element-content view, or a _prv (first node) for an elCnt view
					if (vwInfos = viewInfos(node, undefined, rViewMarkers)) {
						l = vwInfos.length;
						while (l--) {
							view = vwInfos[l];
							if (view.open) {
								if (level < 1) {
									view = viewStore[view.id];
									return view && type ? view.get(type) : view || topView;
								}
								level--;
							} else {
								// level starts at zero. If we hit a view.close, then we move level to 1, and we don't return a view until
								// we are back at level zero (or a parent view with level < 0)
								level++;
							}
						}
					}
					node = node.previousSibling || node.parentNode;
				}
			}
		}
		return topView;
	},

	link: $link,
	unlink: $unlink,

	//=====================
	// override $.cleanData
	//=====================
	cleanData: function(elems) {
		if (elems.length && isCleanCall) {
			// Remove JsViews bindings. Also, remove from the DOM any corresponding script marker nodes
			clean(elems);
		}
		oldCleanData.apply($, arguments);
	}
});

// Possible future addition - e.g. for ckeditor tag control
//$views.utility = {
//	validate: function(html) {
//		try {
//			topView.link(undefined, document.createElement("div"), undefined, undefined, html, undefined, undefined, 1);
//		}
//		catch (e) {
//			return e.message;
//		}
//	}
//};

//===============================
// Extend jQuery instance plugins
//===============================

$extend($.fn, {
	link: function(expr, from, context, noIteration, parentView, prevNode, nextNode) {
		return $link(expr, this, from, context, noIteration, parentView, prevNode, nextNode);
	},
	unlink: function() {
		return $unlink(this);
	},
	view: function(inner, type) {
		return $view(this[0], inner, type);
	}
});

//==============================================================================
// Override jQuery methods that call our overridden cleanData, for disposal etc.
//==============================================================================

$.each([HTML, "replaceWith", "empty", "remove"], function(i, name) {
	var oldFn = $.fn[name];
	$.fn[name] = function() {
		var result;
		isCleanCall = 1; // Make sure cleanData does disposal only when coming from these calls.
		try {
			result = oldFn.apply(this, arguments);
		}
		finally {
			isCleanCall = 0;
		}
		return result;
	};
});

//===============
// Extend topView
//===============

$extend(topView = $sub.topView, {tmpl: {links: {}}});

viewStore = {0: topView}; // Top-level view

//===================
// Extend $.views.sub
//===================

$sub._glt = function(elem) { // get linked tags (Used in validate.js)
	var linkCtx,
		regEx = /#(\d*)\^\/\1\^/g,
		linkCtxs = [],
		tokens = markerNodeInfo(elem);

	while (linkCtx = regEx.exec(tokens)) {
		if (linkCtx = bindingStore[linkCtx[1]]) {
			linkCtxs.push(linkCtx.linkCtx.tag);
		}
	}
	return linkCtxs;
};

$sub._gccb = function(view) { // Return a callback for accessing the context of a template/data-link expression - and converting ~foo, #foo etc.
	// TODO Consider exposing or allowing override, as public API
	return function(path, object, depth) {
		// TODO consider only calling the contextCb on the initial token in path '~a.b.c' and not calling again on
		// the individual tokens, 'a', 'b', 'c'... Currently it is called multiple times
		var tokens, tag, items, helper, last, nextPath, l, obsCtxPrm, addedTagCpDep, key, bindTo;
		if (view && path) {
			if (path._cpfn) {
				return path._cpfn.call(view.tmpl, object, view, $sub); // exprOb for computed property
			}
			if (path.charAt(0) === "~") {
				// We return new items to insert into the sequence, replacing the "~a.b.c" string:
				// [helperObject 'a', "a.b.c" currentDataItem] so currentDataItem becomes the object for subsequent paths.
				if (path.slice(0, 4) === "~tag") {
					tag = view.ctx;
					if (path.charAt(4) === ".") {
						// "~tag.xxx"
						tokens = path.slice(5).split(".");
						tag = tag.tag;
					}
					if (tokens) {
						return tag ? [tag, tokens.join("."), object] : [];
					}
				}
				path = path.slice(1).split(".");
				if (helper = view.ctxPrm(last = path.shift(), undefined, true)) {
					if (obsCtxPrm = helper._cxp) { // helper for (contextual parameter ~foo=...) is an array - [view, ctxPrmDependencies ...]
						if (path.length) {
							nextPath = "." + path.join(".");
							last = helper[l = helper.length-1];
							if (last._cpfn) {
								last.sb = nextPath;
								last.bnd = !!depth;
							} else {
								helper[l] = (last + nextPath).replace("#data.", "");
								if (last.slice(0, 5) === "#view") {
									helper[l] = helper[l].slice(6);
									helper.splice(l, 0, view);
								}
							}
						}
						items = [helper]; // Contextual parameter
						if ((tag = obsCtxPrm.tag) && tag.convert) {
							// If there is a converter, it might mix inputs, so tag contextual param needs to depend on all bound args/props.
							bindTo = tag.bindTo || [0];
							l = bindTo.length;
							while (l--) {
								if (depth !== undefined && l !== obsCtxPrm.ind) {
									key = bindTo[l];
									addedTagCpDep = [helper[0], tag.tagCtx.params[+key === key ? "args" : "props"]];
									addedTagCpDep._cxp = obsCtxPrm;
									items.push(addedTagCpDep); // Added dependency for tag contextual parameter
								}
							}
						}
					} else if (path.length || $isFunction(helper)) {
						items = [helper, path.join("."), object]; // 2way bindng on ~foo.helperLeafProperty or ~computed() or ~contextualParam
					}
				}
				return items || [];
			}
			if (path.charAt(0) === "#") {
				// We return new items to insert into the sequence, replacing the "#a.b.c" string: [view, "a.b.c" currentDataItem]
				// so currentDataItem becomes the object for subsequent paths. The 'true' flag makes the paths bind only to leaf changes.
				return path === "#data" ? [] : [view, path.replace(rViewPath, ""), object];
			}
		}
	};
};

//===================
// ctxPrm  helpers
//===================
// The following helper functions for observable contextual parameters are needed by render.js in data-linking scenarios
// Implemented here rather than in render.js to keep render.js size down, and exposed via $.sub...

$sub._cp = function(paramVal, paramExpr, view, tagCtxPrm) { // Create tag or inline contextual parameter
	// Called for inline contextual parameter ~foo=expression, from compiled function for expression. (tagCtxPrm is undefined)
	// Called for tag parameter (two-way binding), from renderTag. (tagCtxPrm is {tag: ..., ind: ...})
	if (view.linked) { // In JsViews, returns [view, linkFn] where linkFn is compiled function for expression, or observable contextual parameter object
		if (paramExpr) {
			var params = delimOpenChar1 + ":" + paramExpr + delimCloseChar0,
				links = topView.tmpl.links, // Use topView links, as for compiled top-level linking expressions. To do - should this ever get disposed?
				linkFn = links[params];
			if (!linkFn) {
				links[params] = linkFn = $sub.tmplFn(params, view.tmpl, true);
			}
			paramVal = linkFn.deps[0]
				? [view, linkFn] // compiled expression
				: [{_ocp: tagCtxPrm ? tagCtxPrm.tag.cvtArgs(true, tagCtxPrm.tagElse)[tagCtxPrm.ind] : linkFn()}]; // Static value - no deps - returns observable contextual parameter object
		} else {
			paramVal = [{_ocp: undefined}]; // Uninitialized observable contextual parameter object
		}
		paramVal._cxp = tagCtxPrm || {
			updateValue: function(val) {
				$observable(paramVal._cxp.data).setProperty(paramVal._cxp.path, val);
				return this;
			}
		}; // Flag that this is a contextual parameter
	}
	return paramVal; // In JsRender returns evaluated expression
};

$sub._crcp = function(key, res, storeView, store) {
	// Create observable contextual parameter for helper. (Called when updating or observing contextual parameter, from view.ctxPrm() )
	(store || (storeView._ocps = storeView._ocps || {}))[key]
		= res
		= [{
			_ocp: res, // The observable contextual parameter value
			_vw: storeView
		}];
	res._cxp = {
		path: _ocp,
		ind: 0,
		updateValue: function(val, path) {
			$.observable(res[0]).setProperty(_ocp, val); // Set the value (res[0]._ocp)
			return this;
		}
	};
	return res;
};

$sub._ucp = function(key, value, view, obsCtxPrm) {
	// update observable contextual parameter
	var index, tag;
	if (!obsCtxPrm.path) {
		resolveDataTargetPath("~" + key, view.data, $sub._gccb(view));
	}
	if (tag = obsCtxPrm.tag) { // If this is a tag contextual parameter
		index = $.inArray(key, tag.linkedCtxParam);
		tag.setValue(value, index, obsCtxPrm.tagElse);
	}
	return (tag||obsCtxPrm).updateValue(value, index, obsCtxPrm.tagElse);
};

$sub._ceo = function cloneExprObjects(obs) { // Clone exprObs so that each referenced contextual parameter ~foo uses its own exprOb instances
	var ob,
		clones = [],
		l = obs.length;
	while (l--) {
		ob = obs[l];
		if (ob._cpfn) {
			ob = $extend({}, ob);              // If an exprOb, clone it. If a string, keep as is
			ob.prm = cloneExprObjects(ob.prm); // Recursively clone exprObs in parameters, too
		}
		clones.unshift(ob);
	}
	return clones;
};

//=========================
// Extend $.views.settings
//=========================

oldAdvSet = $sub.advSet;

$sub.advSet = function() { // refresh advanced settings
	oldAdvSet.call($sub);
	global._jsv = $subSettingsAdvanced._jsv
		? $extend(global._jsv || {}, { // create global _jsv, for accessing views, etc
				views: viewStore,
				bindings: bindingStore
			})
		: undefined; // In IE8 cannot do delete global._jsv
	$viewsLinkAttr = $subSettingsAdvanced.linkAttr;
	linkViewsSel = bindElsSel + ",[" + $viewsLinkAttr + "]";
	wrapMap = $subSettingsAdvanced._wm;
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
};

$viewsSettings.advanced({
	linkAttr: "data-link",
	useViews: false,
	noValidate: false,
	// wrapMap provide appropriate wrappers for inserting innerHTML, used in insertBefore
	// We have to close these tags to support XHTML (#13200)
	// TODO investigate whether more recent jQuery implementation using wrapMap in domManip/$().html() etc. is better optimized now...
	_wm: {
		option: [1, "<select multiple='multiple'>", "</select>"],
		legend: [1, "<fieldset>", "</fieldset>"],
		area: [1, "<map>", "</map>"],
		param: [1, "<object>", "</object>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		svg_ns: [1, "<svg>", "</svg>"],
		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		div: $.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
	},
	_fe: {
		input: {
			from: inputAttrib, to: VALUE
		},
		textarea: valueBinding,
		select: valueBinding,
		optgroup: {
			to: "label"
		}
	}
});

return $;
}, window));
