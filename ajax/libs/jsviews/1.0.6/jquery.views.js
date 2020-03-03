/*! jquery.views.js v1.0.6: http://jsviews.com/ */
/*
 * Interactive data-driven views using JsRender templates.
 * Subcomponent of JsViews
 * Requires jQuery and jsrender.js (Best-of-breed templating in browser or on Node.js)
 *   See JsRender at http://jsviews.com/#download and http://github.com/BorisMoore/jsrender
 * Also requires jquery.observable.js
 *   See JsObservable at http://jsviews.com/#download and http://github.com/BorisMoore/jsviews
 *
 * Copyright 2020, Boris Moore
 * Released under the MIT License.
 */

//jshint -W018, -W041, -W120

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (typeof exports === "object") { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take jQuery passed as parameter (with JsRender and JsObservable): require("jquery.views")(jQuery)
				return factory(global, $);
			};
	} else if (typeof define === "function" && define.amd) { // AMD script loader, e.g. RequireJS
		define(["jquery", "./jsrender", "./jquery.observable"], function($, jsr, jso) {
			return factory(global, $, jsr, jso);
		}); // Require jQuery, JsRender, JsObservable
	} else { // Browser using plain <script> tag
		factory(global, false);
	}
} (

// factory (for jquery.views.js)
function(global, $, jsr, jso) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

jsr = jsr || setGlobals && global.jsrender;
$ = $ || global.jQuery;

var versionNumber = "v1.0.6",
	requiresStr = "JsViews requires ";

if (!$ || !$.fn) {
	// jQuery is not loaded.
	throw requiresStr + "jQuery"; // We require jQuery
}

if (jsr && !jsr.fn) {
	jsr.views.sub._jq($); // map over from jsrender namespace to jQuery namespace
}

var $observe, $observable,
	$isArray = $.isArray,
	$views = $.views;

if (!$views || !$views.map || $views.jsviews !== versionNumber) {
		// JsRender is not loaded.
	throw requiresStr + "JsRender " + versionNumber; // jsrender.js must be loaded before JsViews and after jQuery
}

var document = global.document,
	$viewsSettings = $views.settings,
	$sub = $views.sub,
	$subSettings = $sub.settings,
	$extend = $sub.extend,
	$isFunction = $.isFunction,
	$expando = $.expando,
	$converters = $views.converters,
	$tags = $views.tags,
	$subSettingsAdvanced = $subSettings.advanced,

	// These two settings can be overridden on settings after loading jsRender, and prior to loading jquery.observable.js and/or JsViews
	propertyChangeStr = $sub.propChng = $sub.propChng || "propertyChange",
	arrayChangeStr = $sub.arrChng = $sub.arrChng || "arrayChange",

	HTML = "html",
	_ocp = "_ocp", // Observable contextual parameter
	syntaxError = $sub.syntaxErr,
	rFirstElem = /<(?!script)(\w+)[>\s]/,
	error = $sub._er,
	onRenderError = $sub._err,
	delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, topView,
	rEscapeQuotes = /['"\\]/g; // Escape quotes and \ character
if ($.link) { return $; } // JsViews is already loaded

$subSettings.trigger = true;

var activeBody, rTagDatalink, $view, $viewsLinkAttr, linkViewsSel, wrapMap, viewStore, oldAdvSet, useInput,
	isIE = window.navigator.userAgent,
	TEXTCONTENT = document.textContent !== undefined ? "textContent" : "innerText",
	jsvAttrStr = "data-jsv",
	elementChangeStr = "change.jsv",
	onBeforeChangeStr = "onBeforeChange",
	onAfterChangeStr = "onAfterChange",
	onAfterCreateStr = "onAfterCreate",
	CHECKED = "checked",
	CHECKBOX = "checkbox",
	RADIO = "radio",
	RADIOINPUT = "input[type=",
	CHECKBOXINPUT = RADIOINPUT + CHECKBOX + "]", // input[type=checkbox]
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
	rConvertMarkers = /((\/>)|<\/(\w+)>|)(\s*)([#/]\d+(?:_|(\^)))`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>)|$)/g,
	rOpenViewMarkers = /(#)()(\d+)(_)/g,
	rOpenMarkers = /(#)()(\d+)([_^])/g,
	rViewMarkers = /(?:(#)|(\/))(\d+)(_)/g,
	rTagMarkers = /(?:(#)|(\/))(\d+)(\^)/g,
	rOpenTagMarkers = /(#)()(\d+)(\^)/g,
	rMarkerTokens = /(?:(#)|(\/))(\d+)([_^])([-+@\d]+)?/g,
	rSplitBindings = /&(\d+)\+?/g,
	rShallowArrayPath = /^[^.]*$/, // No '.' in path
	getComputedStyle = global.getComputedStyle,
	$inArray = $.inArray;

RADIOINPUT += RADIO + "]"; // input[type=radio]
isIE = isIE.indexOf('MSIE ')>0 || isIE.indexOf('Trident/')>0;

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

function updateValues(sourceValues, tagElse, async, bindId, ev) {
// Observably update a data value targeted by the binding.to binding of a 2way data-link binding. Called when elem changes
// Called when linkedElem of a tag control changes: as updateValue(val, index, tagElse, bindId, ev) - this: undefined
// Called directly as tag.updateValues(val1, val2, val3, ...) - this: tag
	var linkCtx, cvtBack, cnvtName, target, view, binding, sourceValue, origVals, sourceElem, sourceEl,
		tos, to, tcpTag, exprOb, contextCb, l, m, tag, vals, ind;

	if (bindId && bindId._tgId) {
		tag = bindId;
		bindId = tag._tgId;
		if (!tag.bindTo) {
			defineBindToDataTargets(bindingStore[bindId], tag); // If this tag is updating for the first time, we need to create the 'to' bindings first
			tag.bindTo = [0];
		}
	}
	if ((binding = bindingStore[bindId]) && (tos = binding.to)) {
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
		} else if (sourceElem._jsvSel) {
			// Checkbox group (possibly using {{checkboxgroup}} tag) data-linking to array of strings
			vals = sourceElem._jsvSel;
			ind = $inArray(sourceElem.value, vals);
			if (ind > -1 && !sourceElem.checked) {
				vals.splice(ind, 1); // Checking this checkbox
			} else if (ind < 0 && sourceElem.checked) {
				vals.push(sourceElem.value); // Unchecking this checkbox
			}
			sourceValues = [vals.slice()];
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

		l = tos.length;
		while (l--) {
			if (to = tos[l]) {
				to = to + "" === to ? [linkCtx.data, to] : to; // [object, path]
				target = to[0];
				tcpTag = to.tag; // If this is a tag contextual parameter - the owner tag
				sourceValue = (target && target._ocp && !target._vw
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
						if ((m = tcpTag._.toIndex[to.ind]) !== undefined) {
							tcpTag.updateValue(sourceValue, m, to.tagElse, undefined, undefined, ev); // if doesn't map, don't update, or update scoped tagCtxPrm. But should initialize from outer from binding...
						}
						tcpTag.setValue(sourceValue, to.ind, to.tagElse);
					} else if (sourceValue !== undefined && target) {
						if ((tcpTag = ev && (sourceEl = ev.target)._jsvInd === l && sourceEl._jsvLkEl) && (m = tcpTag._.fromIndex[l]) !== undefined) {
							// The source is a tag linkedElem (linkedElement: [..., "elemSelector", ...], which is updating
							tcpTag.setValue(origVals[l], m, sourceEl._jsvElse);
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
						$observable(target, async).setProperty(to[1], sourceValue); // 2way binding change event - observably updating bound object
					}
				}
			}
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
			updateValue(val, source._jsvInd, source._jsvElse, undefined, bindId[1], ev);
		}
		ev.target._jsvChg = undefined; // Clear marker
	}
}

function onDataLinkedTagChange(ev, eventArgs) {
	// Update or initial rendering of any tag (including {{:}}) whether inline or data-linked element.
	var attr, sourceValue, noUpdate, forceUpdate, hasError, onError, bindEarly, tagCtx, l,
		linkCtx = this,
		linkFn = linkCtx.fn,
		tag = linkCtx.tag,
		source = linkCtx.data,
		target = linkCtx.elem,
		cvt = linkCtx.convert,
		parentElem = target.parentNode,
		view = linkCtx.view,
		oldLinkCtx = view._lc,
		onEvent = eventArgs && changeHandler(view, onBeforeChangeStr, tag);

	if (parentElem && (!onEvent || onEvent.call(tag || linkCtx, ev, eventArgs) !== false)
			// If data changed, the ev.data is set to be the path. Use that to filter the handler action...
			&& (!eventArgs || ev.data.prop === "*" || ev.data.prop === eventArgs.path)) {

		// Set linkCtx on view, dynamically, just during this handler call
		view._lc = linkCtx;
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
			attr = tag && tag.attr || linkCtx.attr || (linkCtx._dfAt = defaultAttr(target, true, cvt !== undefined));
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
					// Remove dynamically added linkCtx from view
					view._lc = oldLinkCtx;
					if (eventArgs && (onEvent = changeHandler(view, onAfterChangeStr, tag))) {
						onEvent.call(tag || linkCtx, ev, eventArgs);
					}
					if (tag.tagCtx.props.dataMap) {
						tag.tagCtx.props.dataMap.map(tag.tagCtx.args[0], tag.tagCtx, tag.tagCtx.map, isRenderCall || !tag._.bnd);
					}
					return;
				}

				if (tag.onUnbind) {
					tag.onUnbind(tag.tagCtx, linkCtx, tag.ctx, ev, eventArgs);
				}

				tag.linkedElems = tag.linkedElem = tag.mainElem = tag.displayElem = undefined;
				l = tag.tagCtxs.length;
				while (l--) {
					tagCtx = tag.tagCtxs[l];
					tagCtx.linkedElems = tagCtx.mainElem = tagCtx.displayElem = undefined;
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
			if (bindEarly = tag && (!tag.inline || linkCtx.fn._lr) && tag.template) {
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

		if (tag && tag._.ths) {
			// Tag has a this=expr binding for which we have created an additional 'to' (defineBindToDataTargets) target (at index bindTo.length)
			// We now have the this pointer, so we push it to the binding, using updateValue(index)
			tag.updateValue(tag, tag.bindTo ? tag.bindTo.length : 1); // If bindTo not defined yet, it will be [0], so length 1
		}

		if (eventArgs && (onEvent = changeHandler(view, onAfterChangeStr, tag))) {
			onEvent.call(tag || linkCtx, ev, eventArgs);
		}
		// Remove dynamically added linkCtx from view
		view._lc = oldLinkCtx;
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
		renders = attr !== NONE && sourceValue !== undefined && !linkCtx._noUpd && !((attr === VALUE || attr === HTML) && (!tag && linkCtx.elem._jsvChg)),
		// For data-link="^{...}", don't update the first time (no initial render) - e.g. to leave server rendered values.
		source = linkCtx.data,
		target = tag && tag.parentElem || linkCtx.elem,
		targetParent = target.parentNode,
		$target = $(target),
		view = linkCtx.view,
		targetVal = linkCtx._val,
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
			if (target.name && $isArray(sourceValue)) {
				target._jsvSel = sourceValue; // Checkbox group (possibly using {{checkboxgroup}} tag) data-linking to array of strings
				sourceValue = $inArray(target.value, sourceValue) > -1;
			} else {
				sourceValue = sourceValue && sourceValue !== "false";
			}
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
				if (tag && tag.inline) {
					nodesToRemove = tag.nodes(true);
					if (tag._elCnt) {
						if (prevNode && prevNode !== nextNode) { // nextNode !== prevNode
							// This prevNode will be removed from the DOM, so transfer the view tokens on prevNode to nextNode of this 'viewToRefresh'
							transferViewTokens(prevNode, nextNode, target, tag._tgId, "^", true);
						} else {
							// nextNode === prevNode, or there is no nextNode and so the target._df may have tokens
							tokens = prevNode ? prevNode.getAttribute(jsvAttrStr) : target._df;
							id = tag._tgId + "^";
							openIndex = tokens.indexOf("#" + id) + 1;
							closeIndex = tokens.indexOf("/" + id);

							if (openIndex && closeIndex > 0) {
								// If prevNode, or target._df, include tokens referencing view and tag bindings contained within the open and close tokens
								// of the updated tag control, they need to be processed (disposed)
								openIndex += id.length;
								if (closeIndex > openIndex) {
									disposeTokens(tokens.slice(openIndex, closeIndex)); // Dispose view and tag bindings
									tokens = tokens.slice(0, openIndex) + tokens.slice(closeIndex);

									if (prevNode) {
										prevNode.setAttribute(jsvAttrStr, tokens); // Remove tokens of replaced content
									} else if (target._df) { // Remove tokens of replaced content
										setDefer(target, tokens);
									}
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
			} else {
				if (change = change || targetVal !== sourceValue) {
					if (attr === "text" && target.children && !target.children[0]) {
						// This code is faster then $target.text()
						target[TEXTCONTENT] = sourceValue === null ? "" : sourceValue;
					} else {
						$target[setter](sourceValue);
					}
				}
				if ((jsvSel = targetParent._jsvSel)
					// Setting value of <option> element
					&& (attr === VALUE || !$target.attr(VALUE))) { // Setting value attribute, or setting textContent if attribute is null
					// Set/unselect selection based on value set on parent <select>. Works for multiselect too
					target.selected = $inArray("" + sourceValue, $isArray(jsvSel) ? jsvSel : [jsvSel]) > -1;
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

function arrayChangeHandler(ev, eventArgs) { // array change handler for 'array' views
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
					self.addViews(index, items, eventArgs._dly);
					break;
				case "remove":
					self.removeViews(index, items.length, undefined, eventArgs._dly);
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
		allowArray = !tag,
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
		if (tagDepends = tag.tagCtx.props.depends || tag.depends) {
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

		if (tag) {
			// Add dependency paths for declared boundProps (so no need to write ^myprop=... to get binding) and for linkedProp too if there is one
			l = tag.boundProps.length;
			while (l--) {
				prop = tag.boundProps[l];
				k = tag._.bnd.paths.length;
				while (k--) { // Iterate across tagCtxs
					propDeps = tag._.bnd.paths[k]["_" + prop];
					if (propDeps && propDeps.length && propDeps.skp) { // Not already a bound prop ^prop=expression;
						exprFnDeps = exprFnDeps.concat(propDeps); // Add dependencies for this prop expression
					}
				}
			}
			allowArray = tag.onArrayChange === undefined || tag.onArrayChange === true;
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
			allowArray ? 0 : 1, // 'this' pointer for observeAndBind, used to set allowArray to 1 or 0.
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

		if (linkedElems || cvtBk !== undefined || tag && tag.bindTo) {
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

		if (tag && !tag.inline) {
			if (!tag.flow) {
				target.setAttribute(jsvAttrStr, (target.getAttribute(jsvAttrStr)||"") + "#" + bindId + "^/" + bindId + "^");
			}
			tag._tgId = "" + bindId;
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

		var i, k, html, vwInfos, view, placeholderParent, targetEl, refresh, late, prntView,
			onRender = addBindingMarkers,
			replaceMode = context && context.target === "replace",
			l = to.length;

		while (l--) { // iterate over 'to' targets. (Usually one, but can be multiple)
			targetEl = to[l];

			prntView = parentView || $view(targetEl);
			if ("" + tmplOrLinkExpr === tmplOrLinkExpr) {
				// tmplOrLinkExpr is a string: treat as data-link expression.
				addDataBinding(late = [], tmplOrLinkExpr, targetEl, prntView, undefined, "expr", from, context);
			} else {
				if (tmplOrLinkExpr.markup !== undefined) {
					// This is a call to template.link()
					if (replaceMode) {
						placeholderParent = targetEl.parentNode;
					}
					prntView._.scp = true; // Set scope flag on prntView for link() call - used to set view.isTop for outermost view of created linked content
					html = tmplOrLinkExpr.render(from, context, noIteration, prntView, undefined, onRender, true);
					prntView._.scp = undefined;
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
				} else if (tmplOrLinkExpr === true && prntView === topView) {
					// $.link(true, selector, data, ctx) - where selector points to elem in top-level content. (If not top-level content, no-op)
					refresh = {lnk: "top"};
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
				late = prntView.link(from, targetEl, prevNode, nextNode, html, refresh, context);
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
		// rConvertMarkers = /(^|(\/>)|<\/(\w+)>|)(\s*)([#/]\d+(?:_|(\^)))`(\s*)(<\w+(?=[\s\/>]))?|\s*(?:(<\w+(?=[\s\/>]))|<\/(\w+)>(\s*)|(\/>)\s*|(>))/g,
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
		tag = (tag1 || tag2 || "").toLowerCase();
		closeTag = closeTag || closeTag2;
		selfClose = selfClose || selfClose2;
		if (isVoid && !selfClose && (!all || closeTag || tag || id && !inTag)) { // !all = end of string
			isVoid = undefined;
			parentTag = tagStack.shift(); // preceding tag was a void element, with no closing slash, such as <br>.
		}
		closeTag = closeTag || selfClose;
		if (closeTag) {
			closeTag = closeTag.toLowerCase();
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
		if (elCnt && !inTag) {
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
						if (onAftCr = changeHandler(view, onAfterCreateStr) || onAfterCreate) {
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
				type: isLink || "link",
				data: data, // source
				elem: node, // target
				view: currentView,
				ctx: context,
				attr: attr,
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
				tmpl.links[tagExpr] = linkFn = $sub.tmplFn(tagExpr.replace(rEscapeQuotes, "\\$&"), tmpl, true, convertBack, hasElse);
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
		// If the link expression uses a custom tag, the onDataLinkedTagChange call will call renderTag, which will set tagCtx on linkCtx
		if (!eventArgs || !eventArgs.refresh) {
			onDataLinkedTagChange.call(linkCtx, ev, eventArgs);
		}
	}
	var view,
		linkCtxType = linkCtx.type;
	if (linkCtxType === "top" || linkCtxType === "expr") {
		// Top-level linking: .link(expressionOrTrue, data, context) - so we need to create a view for the linking, with the data and ctx
		// which may be different than the current context of the target. Note that this view is not a standard data-linked view, so it will
		// be disposed only when its parent view is disposed.
		linkCtx.view = new $sub.View(
			$sub.extendCtx(linkCtx.ctx, linkCtx.view.ctx),
			"link", linkCtx.view, linkCtx.data, linkCtx.expr, undefined, addBindingMarkers);
	}
	linkCtx._ctxCb = $sub._gccb(view = linkCtx.view); // getContextCallback: _ctxCb, for filtering/appending to dependency paths: function(path, object) { return [(object|path)*]}
	linkCtx._hdl = handler;
	// handler._ctx = linkCtx; Could pass linkCtx for use in a depends = function() {} call, so depends is different for different linkCtx's
	if (linkCtx.elem.nodeName === "SELECT" && linkCtxType === "link" && !linkCtx.attr
		&& linkCtx.convert !== undefined) { // data-link expression on <select> tag is the assign tag {:...}, not some other expression such as {on ...} (See https://github.com/BorisMoore/jsviews/issues/444)
		var $elem = $(linkCtx.elem);
		$elem.on("jsv-domchange", function() {
			// If the options have changed dynamically under the select, we need to refresh the data-linked selection, using the new options
			if (!arguments[3].refresh) { // eventArgs.refresh !== true - so a refresh action will only set the selection once
				var source = linkCtx.fn(view.data, view, $sub);
				$elem.val(linkCtx.convert || linkCtx.convertBack ? $sub._cnvt(linkCtx.convert, view, source) : source);
			}
		});
	}

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
	linkMarkup = $.trim(linkMarkup);
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

	var linkedElems, linkedElements, linkedElem, l, m, $linkCtxElem, linkCtxElem, linkedEl, linkedTag,
		tagCtxElse, props, val, oldVal, indexTo, i, mapDeps, propDeps,
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
						linkCtxElem = !tag.inline && $linkCtxElem.filter(linkedElements[l]);
						m = tagCtxslength;
						while (m--) {
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
				linkCtxElem = !tag.inline && $linkCtxElem.filter(linkedElements);
				m = tagCtxslength;
				while (m--) {
					tagCtxElse = tagCtxs[m];
					linkedElem = linkCtxElem[0] ? linkCtxElem : tagCtxElse.contents(true, linkedElements).eq(0);
					if (linkedElem[0]) {
						tagCtxElse.mainElem = linkedElem;
					}
				}
			}
			if (linkedElements = tag.displayElement) {
				// tag.displayElement: - selector for identifying displayElem in template/rendered content
				// (But for tag bindings on data-linked elements, defaults to data-linked element)
				linkCtxElem = !tag.inline && $linkCtxElem.filter(linkedElements);
				m = tagCtxslength;
				while (m--) {
					tagCtxElse = tagCtxs[m];
					linkedElem = linkCtxElem[0] ? linkCtxElem : tagCtxElse.contents(true, linkedElements).eq(0);
					if (linkedElem[0]) {
						tagCtxElse.displayElem = linkedElem;
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

		if (tag._.unlinked && tagCtxElse.map && tag.mapProps) {
			// Compile the dependency paths for observable changes in mapProps (e.g. start, end, filter)
			i = tag.mapProps.length;
			mapDeps = props.mapDepends || tag.mapDepends || []; // dependency paths
			mapDeps = $isArray(mapDeps) ? mapDeps : [mapDeps];
			while (i--) { // Iterate through mapProps
				var prop = tag.mapProps[i];
				propDeps = tag._.bnd.paths[m]["_" + prop]; // paths for mapProps on this tagCtx
				if (propDeps && propDeps.length && propDeps.skp) { // Not already a bound prop ^prop=expression;
					mapDeps = mapDeps.concat(propDeps); // Add dependencies for this prop expression
				}
			}
			if (mapDeps.length) {
				tagCtxElse.map.observe(mapDeps, linkCtx); // Listen to observable changes of mapProps, and call map.update when change happens
			}
		}
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
		if (tag._tgId && tag._.unlinked && (tag.linkedElems || tag.bindTo)) {
			defineBindToDataTargets(bindingStore[tag._tgId], tag);
		}
		m = tagCtxs.length;
		while (m--) {
			props = tag.cvtArgs(m, 1); // array of bindFrom args/props
			l = props.length;
			while (l--) {
				// If the bound property or arg has not yet been set (e.g. during initial rendering),
				// or has been unset, because onUpdate is set to true, or if onUpdate is false,
				// but this particular bound arg/prop is being changed observably: call setValue()
				tag.setValue(props[l], l, m, ev, eventArgs);
			}
			if (tag._.unlinked) {
				tagCtx = tagCtxs[m];
				linkedElems = tagCtx.linkedElems || !m && tag.linkedElem && [tag.linkedElem];
				indexTo = (tag.bindTo || [0]).length;
				while (indexTo--) {
					if ((linkedElem = linkedElems && linkedElems[indexTo]) && (l = linkedElem.length)) {
						while (l--) {
							linkedEl = linkedElem[l];
							linkedTag = linkedEl._jsvLkEl;
							if (!linkedTag || linkedTag !== tag) {
								// For data-linked tags, identify the linkedEl with the tag, for "to" binding
								// (For data-linked elements, if not yet bound, we identify later when the linkCtx.elem is bound)
								linkedEl._jsvLkEl = tag;
								linkedEl._jsvInd = indexTo;
								linkedEl._jsvElse = m;
								bindLinkedElChange(tag, linkedEl);
								linkedEl._jsvBnd = "&" + tag._tgId + "+"; // Add a "+" for cloned binding - so removing
								// elems with cloned bindings will not remove the 'parent' binding from the bindingStore.
							}
						}
					}
				}
			}
		}
	}
	tag._.unlinked = undefined;
	if (tag._.lt) { // Late tag: Late path: @some.path had not returned @some object, so try again with refresh
		tag.refresh();
	}
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
	if (trig === true && useInput && (!isIE || $elem[0].contentEditable !== TRUE)) { // IE oninput event is not raised for contenteditable changes
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

	var pathIndex, path, lastPath, bindtoOb, to, bindTo, paths, k, obsCtxPrm, linkedCtxParam, contextCb, targetPaths, bindTos, fromIndex,
		tagElse = 1,
		tos = [],
		linkCtx = binding.linkCtx,
		source = linkCtx.data,
		targetPathsElses = linkCtx.fn.paths;

	if (binding && !binding.to) {
		if (tag) {
			if (!tag.convertBack) {
				tag.convertBack = cvtBk;
			}
			bindTo = tag.bindTo;
			tagElse = tag.tagCtxs ? tag.tagCtxs.length : 1;
		}
		while (tagElse--) {
			bindTos = [];
			if (targetPaths = targetPathsElses[tagElse]) {
				bindTo = targetPaths._jsvto ? ["jsvto"] : (bindTo || [0]);
				if (!tagElse && tag && tag._.ths) {
					// Tag has a this=expr bindign for which we will create an additional 'to' target (at index bindTo.length)
					bindTo = bindTo.concat("this");
				}
				k = bindTo.length;
				while (k--) {
					path = "";
					contextCb = linkCtx._ctxCb;
					paths = bindTo[k];
					paths = targetPaths[+paths === paths ? paths : "_" + paths]; // If path is a string, prepend "_" to avoid collision (e.g. with array.length if path is "length")
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
						fromIndex = tag._.fromIndex;
						if (fromIndex && linkedCtxParam && linkedCtxParam[fromIndex[k]]) {
							// This is a tag binding, with linked tag contextual parameters
							to = [tag.tagCtxs[tagElse].ctx[linkedCtxParam[fromIndex[k]]][0], _ocp];
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
			to = l>1
				? [to[l-2], to[l-1]] // With path: [object, path]
				: [to[l-1]];         // No path, (e.g. [function] for computed with setter)
		}
		source = to[0];
		targetPath = to[1];
	}
	to = to || [source, path];
	to._cxp = topCp;
	return to;
}

function mergeCtxs(tag, newCtxs, replace) { // Merge updated tagCtxs into tag.tagCtxs
	var tagCtx, newTagCtx, latePath,
		view = tag.tagCtx.view,
		tagCtxs = tag.tagCtxs || [tag.tagCtx],
		l = tagCtxs.length,
		refresh = !newCtxs;

	if (refresh) {
		newCtxs = tag._.bnd.call(view.tmpl, (tag.linkCtx || view).data, view, $sub);
		if (newCtxs.lt) {
			return; // We are calling tag.refresh() but a late path (@a.b.c) has not yet returned an object (@a) so cancel the refresh()
		}
		tag._.lt = undefined; // All late paths are now resolved, so this is no longer a late tag
		newCtxs = $isArray(newCtxs) ? newCtxs : [newCtxs];
	}

	if (replace) {
		// Replace previous tagCtxs by new ones, rather than merging
		tagCtxs = tag.tagCtxs = newCtxs;
		tag.tagCtx = tagCtxs[0];
		addLinkMethods(tag);
	} else {
		while (l--) {
			tagCtx = tagCtxs[l];
			newTagCtx = newCtxs[l];
			$extend(tagCtx.ctx, newTagCtx.ctx); // We don't support propagating ctx variables, ~foo, observably, to nested views. So extend, not setProperty...
			tagCtx.args = newTagCtx.args;
			if (refresh) {
				tagCtx.tmpl = newTagCtx.tmpl;
			}
			$observable(tagCtx.props).setProperty(newTagCtx.props);
		}
	}
	$sub._thp(tag, tagCtxs[0]); // tagHandlersFromProps
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
					tag.onUnbind(tag.tagCtx, linkCtx, tag.ctx);
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
		delete binding.s[binding.cbId];
	}
}

function $unlink(to) {
	if (to) {
		to = to.jquery ? to : $(to);
		to.each(function() {
			var innerView;
			//TODO fix this for better perf. Rather that calling inner view multiple times which does querySelectorAll each time, consider a single querySelectorAll
			// or simply call view.removeViews() on the top-level views under the target 'to' node, then clean(...)
			// And/or replace each() by for() or while()
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
	var ret = oldJsvDelimiters.apply(0, arguments),
		// Now set also delimOpenChar0 etc. in context of jquery.views.js...
		delimChars = $subSettings.delimiters;

	delimOpenChar0 = delimChars[0].charAt(0);
	delimOpenChar1 = delimChars[0].charAt(1);
	delimCloseChar0 = delimChars[1].charAt(0);
	delimCloseChar1 = delimChars[1].charAt(1);
	linkChar = delimChars[2];

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
				if (viewOrTag) {
					if (vwInfo.open) {                    // A "#m_" or "#m^" token
						viewOrTag._prv = nextNode;
					} else if (vwInfo.close) {            // A "/m_" or "/m^" token
						viewOrTag._nxt = nextNode;
					}
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

function updateValue(val, index, tagElse, async, bindId, ev) {
// async, bindId and ev not documented - used internally, e.g. for paged and sorted arrays on tags with dataMap, such as {{for}}
// Observably update a data value targeted by the binding.to binding of a 2way data-link binding. Called when elem changes
// Called when linkedElem of a tag control changes: as updateValue(val, index, tagElse, bindId, ev) - this: undefined
// Called directly as tag.updateValue(val, index, tagElse) - this: tag
	var self = this,
		values = [];
	if (self && self._tgId) {
		bindId = self;
	}
	if (arguments.length < 4) {
		if (+index !== index) {
			async = index;
			tagElse = index = 0;
		} else if (+tagElse !== tagElse) {
			async = tagElse;
			tagElse = 0;
		}
	}
	values[index||0] = val;
	updateValues(values, tagElse, async, bindId, ev);
	return self;
}

function setValues() {
	// tagCtx.setValues() calls tag.setValue() on that tagCtx for each bindTo target
	var m = this.tag.bindTo.length,
		ev = arguments[m],
		eventArgs = arguments[m+1];
	while (m--) {
		this.tag.setValue(arguments[m], m, this.index, ev, eventArgs);
	}
}

function addLinkMethods(tagOrView) { // tagOrView is View prototype or tag instance

	var l, m, tagCtx, boundProps, bindFrom, key, theTag, theView;

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
			select = deep ? select || "*" : select;
			filtered = select ? nodes.filter(select) : nodes;
			nodes = deep ? filtered.add(nodes.find(select)) : filtered;
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
		// For a view, a tag or a tagCtx, return child tags - at any depth, or as immediate children only.
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
			tagCtx.contents = tagOrView.contents;
			tagCtx.childTags = tagOrView.childTags;
			tagCtx.nodes = tagOrView.nodes;
		}

		boundProps = theTag.boundProps = theTag.boundProps || [];
		if (bindFrom = theTag.bindFrom) {
			l = bindFrom.length;
			while (l--) {
				key = bindFrom[l];
				if (key + "" === key) {
					bindFrom[key] = 1;
					if ($inArray(key, boundProps) < 0) {
						boundProps.push(key); // Add any 'bindFrom' props to boundProps array. (So two-way binding works without writing ^foo=expression)
					}
				}
			}
		}

		theTag.setValue = $sub._gm( // getMethod
			theTag.constructor.prototype.setValue || function(val) { // base method
				return val;
			},
			function(val, indexFrom, tagElse, ev, eventArgs) {
				indexFrom = indexFrom || 0;
				tagElse = tagElse || 0;

				var linkedElem, linkedEl, linkedCtxParam, linkedCtxPrmKey, indexTo, linkedElems, newVal,
					tagCtx = theTag.tagCtxs[tagElse];

				if ((eventArgs || val !== undefined) && tagCtx._bdArgs && tagCtx._bdArgs[indexFrom]===val) {
					if (tagCtx._bdVals) { // If val is not undefined (or is coming from an observable change event), and is a value that was already returned, use stored value and don't call tag.setValue()
						val = tagCtx._bdVals[indexFrom];
					}
				} else {
					// Call tag method tag.setValue(), if implemented
					tagCtx._bdArgs = tagCtx._bdArgs || [];
					tagCtx._bdArgs[indexFrom] = val;
					newVal = theTag.base.call(theTag, val, indexFrom, tagElse, ev, eventArgs);
					if (newVal !== undefined) {
						tagCtx._bdVals = tagCtx._bdVals || [];
						tagCtx._bdVals[indexFrom] = newVal; // store value, so that if same value is called later we'll use the stored value, and won't call tag.setValue()
						val = newVal;
					}
				}

				if (val !== undefined && (linkedCtxParam = theTag.linkedCtxParam) && linkedCtxParam[indexFrom]
						// If this setValue call corresponds to a tag contextual parameter and the tag has a converter, then we need to set the
						// value of this contextual parameter (since it is not directly bound to the tag argument/property when there is a converter).
						&& (linkedCtxPrmKey = linkedCtxParam[indexFrom])
					) {
					tagCtx.ctxPrm(linkedCtxPrmKey, val);
				}
				indexTo = theTag._.toIndex[indexFrom];
				if (indexTo !== undefined) {
					if (linkedElems = tagCtx.linkedElems || theTag.linkedElem && [theTag.linkedElem]) {
						if ((linkedElem = linkedElems[indexTo]) && (l = linkedElem.length)) {
							while (l--) {
								linkedEl = linkedElem[l];
								if (val !== undefined && !linkedEl._jsvChg && theTag.linkCtx._val !== val) {
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
									} else {
										linkedEl[linkedEl.contentEditable === TRUE ? "innerHTML" : TEXTCONTENT] = val;
									}
								}
								if (tagCtx.props.name) {
									linkedEl.name = linkedEl.name || tagCtx.props.name;
								}
							}
						}
					}
				}
				return theTag;
			}
		);
		theTag.updateValue = updateValue;

		theTag.updateValues = function() {
			var tagElse, async,
				tag = this,
				bindToLength = tag.bindTo ? tag.bindTo.length : 1,
				extra = arguments.length - bindToLength;

			if (extra) {
				tagElse = arguments[bindToLength];
				if (extra > 1) {
					async = extra > 1 ? arguments[bindToLength + 1] : undefined;
				} else if (+tagElse !==  tagElse) {
					async = tagElse;
					tagElse = 0;
				}
			}
			return updateValues(arguments, tagElse, async, this);
		};

		theTag.setValues = function() {
		// tag.setValues(a, b, c) calls tagCtx.setValues(a, b, c)  on the first tagCtx
			setValues.apply(theTag.tagCtx, arguments);
			return theTag;
		};

		theTag.refresh = function() {
			var attr, sourceValue,
				linkCtx = theTag.linkCtx,
				view = theTag.tagCtx.view;

			if (!(sourceValue = mergeCtxs(theTag))) {
				return;
			}
			if (theTag.onUnbind) {
				theTag.onUnbind(theTag.tagCtx, linkCtx, theTag.ctx);
				theTag._.unlinked = true;
			}
			attr = theTag.inline ? HTML : (linkCtx.attr || defaultAttr(theTag.parentElem, true));
			sourceValue = theTag.tagName === ":"
				? $sub._cnvt(theTag.convert, view, theTag.tagCtx)
				: $sub._tag(theTag, view, view.tmpl, sourceValue, true); // Get rendered HTML for tag, based on refreshed tagCtxs

			observeAndBind(linkCtx, linkCtx.data, linkCtx.elem);
			updateContent(sourceValue, linkCtx, attr, theTag);
			callAfterLink(theTag);
			return theTag;
		};

		theTag.domChange = function() { // domChange notification support
			var elem = this.parentElem,
				hasListener = $._data(elem).events,
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
		theView.addViews = function(index, dataItems, delayed) {
			// if view is not an array view, do nothing
			var i, viewsCount,
				view = this,
				itemsCount = dataItems.length,
				views = view.views;

			if (!view._.useKey && itemsCount) {
				// view is of type "array"
				viewsCount = views.length + itemsCount;

				if ((delayed || viewsCount === view.data.length) // If delayed or if views not already synced to array (e.g. triggered by array.length propertyChange - jsviews/issues/301)
					&& renderAndLink(view, index, view.tmpl, views, dataItems, view.ctx) !== false
					&& !view._.srt) { // Not part of a 'sort' on refresh
					view.fixIndex(index + itemsCount);
				}
			}
		};

		theView.removeViews = function(index, itemsCount, keepNodes, delayed) {
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
					&& (delayed || viewsCount - itemsCount === view.data.length)) { // If views not already synced to array (e.g. triggered by array.length propertyChange - jsviews/issues/301)
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
			function parts(itemView, str) { // Get the totkens preceding the 'open' token for this view, #n_, and the tokens following (and including) the 'open' token
				return RegExp("^(.*)(" + (str ? "\\/" : "#") + itemView._.id + "_.*)$").exec(str || itemView._prv.getAttribute(jsvAttrStr));
			}
			function setPrv(itemView, tokens) {
				var tag,
					prv = itemView._prv;
				prv.setAttribute(jsvAttrStr, tokens);
				tokens.replace(rTagMarkers, function(all, open, close, id) {
					tag = bindingStore[id].linkCtx.tag;
					if (tag.inline) {
						tag[open ? "_prv" : "_nxt"] = prv;
					}
				});
				tokens.replace(rViewMarkers, function(all, open, close, id) {
					viewStore[id][open ? "_prv" : "_nxt"] = prv;
				});
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
					views[lastChange-1]._nxt = selfNxt;
					if (selfNxt) {
						afterParts = parts(view, selfNxt.getAttribute(jsvAttrStr));
						selfNxt.setAttribute(jsvAttrStr, startParts[1] + afterParts[2]);
					} else {
						afterParts = parts(view, view.parentElem._df);

						setDefer(view.parentElem, startParts[1] + afterParts[2]);
					}
				}
				setPrv(endView, afterParts[1] + endParts[2]);
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
			return view;
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
		bindTo: [], // Don't need to bind to first arg, so prevent the default [0] binding
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
					contextOb = /^(.*)[.^][\w$]+$/.exec(tagCtx.params.args.slice(-params.length - 1)[0]);
					contextOb = contextOb && $sub.tmplFn(delimOpenChar1 + ":" + contextOb[1] + delimCloseChar0, view.tmpl, true)(linkCtx.data, view);
				}

				if (tag._evs) {
					tag.onUnbind(tagCtx, linkCtx, tag.ctx);
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
		onArrayChange: false,
		onUnbind: function() {
			var self = this,
				oldIsCleanCall = isCleanCall;
			if (self.activeElem) {
				isCleanCall = 0; // Needed when using jquery-1.x, to avoid bug where jQuery calls cleanData on elements that are not being removed
				self.activeElem.off(self._evs, self._sel, self._hlr);
				isCleanCall = oldIsCleanCall;
			}
		},
		contentCtx: true,
		setSize: true,
		dataBoundOnly: true
	},
	radiogroup: {
		boundProps: ["disabled"],
		init: function(tagCtx) {
			this.name = tagCtx.props.name || (Math.random() + "jsv").slice(9);
		},
		onBind: function(tagCtx, linkCtx) {
			var domChngCntnr, $linkedElem, l,
				tag = this,
				useDisable = tagCtx.params.props;
			useDisable = useDisable && useDisable.disabled;
			if (tag.inline) {
				// If the first element is owned by (rendered by) this tag (not by a childTag such as {^{for}})
				// use it as container for detecting dom changes
				domChngCntnr = tag.contents("*")[0];
				domChngCntnr = domChngCntnr && $view(domChngCntnr).ctx.tag === tag.parent ? domChngCntnr : tag.parentElem;
				$linkedElem = tag.contents(true, RADIOINPUT);
			} else {
				domChngCntnr = linkCtx.elem;
				$linkedElem = $(RADIOINPUT, linkCtx.elem);
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
					$linkedElem = tag.linkedElem = tag.contents(true, RADIOINPUT);
					l = $linkedElem.length;
					while (l--) {
						// Configure binding and name for each radio input element
						linkedElem = $linkedElem[l];
						linkedElem._jsvLkEl = tag;
						linkedElem.name = linkedElem.name || tag.name;
						linkedElem._jsvBnd = "&" + tag._tgId + "+";
						linkedElem.checked = val === linkedElem.value;
						if (useDisable) {
							linkedElem.disabled = !!tagCtx.props.disabled;
						}
					}
					tag.linkedElems = tagCtx.linkedElems = [$linkedElem];
				}
			});
		},
		onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
			var propParams = tagCtx.params.props;
			if (propParams && propParams.disabled) {
				this.linkedElem.prop("disabled", !!tagCtx.props.disabled);
			}
		},
		onUpdate: false, // don't rerender
		contentCtx: true,
		dataBoundOnly: true
	},
	checkboxgroup: {
		boundProps: ["disabled"],
		init: function(tagCtx) {
			this.name = tagCtx.props.name || (Math.random() + "jsv").slice(9);
		},
		onBind: function(tagCtx, linkCtx) {
			var domChngCntnr,
				tag = this,
				tgCtxProps = tagCtx.params.props,
				cvt = tgCtxProps && tgCtxProps.convert,
				cvtBk = tgCtxProps && tgCtxProps.convertBack,
				useDisable = tgCtxProps && tgCtxProps.disabled,
				linkExpr = tagCtx.params.args[0] + (cvt ? " convert=" + cvt : "") + (cvtBk ? " convertBack=" + cvtBk : ""),
				$linkedElem = tag.contents(true, CHECKBOXINPUT),
				l = $linkedElem.length;
			while (l--) {
				// Configure the name for each checkbox input element
				$linkedElem[l].name = $linkedElem[l].name || tag.name;
			}
			$linkedElem.link(linkExpr, linkCtx.data);

			// Establish a domchange listener in case this checkboxgroup wraps a {^{for}} or {^{if}} or similar which might dynamically insert new checkbox input elements
			if (tag.inline) {
				// If the first element is owned by (rendered by) this tag (not by a childTag such as {^{for}}) use it as container for detecting dom changes
				domChngCntnr = tag.contents("*")[0];
				domChngCntnr = domChngCntnr && $.view(domChngCntnr).ctx.tag === tag.parent ? domChngCntnr : tag.parentElem;
			} else {
				domChngCntnr = linkCtx.elem;
			}
			$(domChngCntnr).on("jsv-domchange", function(ev, forOrIfTagCtx) {
				var linkedElem,
					parentTags = forOrIfTagCtx.ctx.parentTags;
				if (!tag.inline || domChngCntnr !== tag.parentElem // The domChngCntnr is specific to this tag
					// The domChngCntnr is the parentElem of this tag, so need to make sure dom change event is for a content change within this tag, not outside it.
					|| parentTags && parentTags[tag.tagName] === tag) {
					// Contents have changed so recreate $linkedElem for the checkbox input elements (including possible new one just inserted)
					$linkedElem = tag.contents(true, CHECKBOXINPUT);
					l = $linkedElem.length;
					while (l--) {
						// Configure binding and name for each checkbox input element
						linkedElem = $linkedElem[l];
						if (!linkedElem._jsvSel) {
							linkedElem.name = linkedElem.name || tag.name;
							$.link(linkExpr, linkedElem, linkCtx.data);
							if (useDisable) {
								linkedElem.disabled = !!tagCtx.props.disabled;
							}
						}
					}
				}
			});
		},
		onAfterLink: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
			var propParams = tagCtx.params.props;
			if (propParams && propParams.disabled) {
				this.contents(true, CHECKBOXINPUT).prop("disabled", !!tagCtx.props.disabled);
			}
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
	sortDataMap: $views.map({
		getTgt: $tags["for"].sortDataMap.getTgt, // getTargetSorted
		obsSrc: function(map, ev, eventArgs) {
			map.update(); // refresh sorting and filtering
		},
		obsTgt: function(map, ev, eventArgs) {
			var l,
				items = eventArgs.items,
				source = map.src;
			if (eventArgs.change === "remove") {
				l = items.length;
				while (l--) {
					$observable(source).remove($inArray(items[l], source));
				}
			} else if (eventArgs.change === "insert") {
				$observable(source).insert(items);
			}
		}
	}),
	mapProps: ["filter", "sort", "reverse", "start", "end", "step"],
	bindTo: ["paged", "sorted"],
	bindFrom: [0],

	onArrayChange: function(ev, eventArgs, tagCtx, linkCtx) {
		var arrayView, propsArr,
			targetLength = ev.target.length,
			tag = this;
		if (!tag.rendering) {
			if (tag._.noVws // Child views not supported because target is not html - e.g. data-link="title{for ...}"
				|| tag.tagCtxs[1] && ( // There is an {{else}}
					eventArgs.change === "insert" && targetLength === eventArgs.items.length // inserting, and new length is same as inserted length, so going from 0 to n
					|| eventArgs.change === "remove" && !targetLength) // removing, and new length 0, so going from n to 0
				) {
				propsArr = tagCtx.map && tagCtx.map.propsArr; // Used by {{props}}, which derives from {{for}}
				tag.refresh();
				if (propsArr) {
					tagCtx.map.propsArr = propsArr; // Keep previous propsArr with new map
				}
			} else for (arrayView in tag._.arrVws) {
				arrayView = tag._.arrVws[arrayView];
				if (arrayView.data === ev.target) {
					arrayChangeHandler.apply(arrayView, arguments);
				}
			}
		}
		tag.domChange(tagCtx, linkCtx, eventArgs);
		ev.done = true;
	},
	onUpdate: function(ev, eventArgs, tagCtxs) {
		this.setDataMap(tagCtxs);
	},
	onBind: function(tagCtx, linkCtx, ctx, ev, eventArgs) {
		var data,
			tag = this,
			i = 0,
			arrayBindings = tag._ars = tag._ars || {},
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
			if (arrayBindings[i]) { // Is there was a previous binding on this tagCtx, (maybe with data different from new data)
				$observe(arrayBindings[i], true); //unobserve previous array
				delete arrayBindings[i];
			}
			if (!arrayBindings[i] && $isArray(data)) {
				(function() {
					var tagCt = tagCtx;
					$observe(data, arrayBindings[i] = function(ev, eventArgs) { // Store arrayChangeHandler on tag._ars[i]
						tag.onArrayChange(ev, eventArgs, tagCt, linkCtx);
					});
				})();
			}
		}
		for (i = selected + 1; i < l; i++) { // If there were previous bindings on later tagCtxs, remove them
			if (arrayBindings[i]) {
				$observe(arrayBindings[i], true); //unobserve previous binding
				delete arrayBindings[i];
			}
		}
		if (eventArgs) {
			tag.domChange(tagCtx, linkCtx, eventArgs);
		}
	},
	onAfterLink: function(tagCtx) {
		var data, map, props,
			tag = this,
			i = 0,
			tagCtxs = tag.tagCtxs,
			l = tagCtxs.length,
			selected = tag.selected || 0;

		for (; i <= selected; i++) {
			tagCtx = tagCtxs[i];    // loop through tagCtxs up to selected
			map = tagCtx.map;
			data = tagCtx.map
				? map.tgt      // 'data' is mapped data
				: tagCtx.args.length
					? tagCtx.args[0]    // or args[0]
					: tagCtx.view.data; // or defaults to current data.
			if ($isArray(data) && (props = tagCtx.params.props)) {
				if (props.paged && !tag.paged) {
					$.observable(tag).setProperty("paged", data.slice());
					tag.updateValue(tag.paged, 0, i, true); // Update paged (async, to wait until parent tag has been datalinked)
				}
				if (props.sorted && !tag.sorted) {
					$.observable(tag).setProperty("sorted", map && map.sorted || data.slice());
					tag.updateValue(tag.sorted, 1, i, true); // Update sorted (async, to wait until parent tag has been datalinked)
				}
			}
		}
	},
	onDispose: function() {
		var l, tag = this;
		for (l in tag._ars) {
			$observe(tag._ars[l], true); //unobserve
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
	var target, l, props = map.options.props;
	updatePropsArr(map.propsArr, eventArgs.path, eventArgs.value, eventArgs.remove);
	if (props.sort !== undefined || props.start !== undefined || props.end !== undefined || props.step !== undefined || props.filter || props.reverse) {
		map.update(); // refresh sorting and filtering
	} else if (eventArgs.change === "set") {
		target = map.tgt;
		l = target.length;
		while (l-- && target[l].key !== eventArgs.path) {}
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
	var items, l, key, remove,
		source = map.src,
		change = eventArgs.change;

	if (change === "set") {
		if (eventArgs.path === "prop") {
			$observable(source).setProperty(ev.target.key, eventArgs.value);
		} else { // path === "key"
			$observable(source).removeProperty(eventArgs.oldValue); // When key is modified observably, remove old one and set new one
			$observable(source).setProperty(eventArgs.value, ev.target.prop);
		}
	} else if (change === "insert" || (remove = change === "remove")) {
		items = eventArgs.items;
		l = items.length;
		while (l--) {
			if (key = items[l].key) {
				updatePropsArr(map.propsArr, key, items[l].prop, remove);
				if (remove) {
					$observable(source).removeProperty(key);
					delete source[key];
				} else {
					$observable(source).setProperty(key, items[l].prop);
				}
			}
		}
	}
}

function updatePropsArr(propsArr, key, prop, remove) {
	var l = propsArr.length;
	while (l-- && propsArr[l].key !== key) {}
	if (l === -1) {
		if (key && !remove) {
			propsArr.push({key: key, prop: prop});
		}
	} else if (remove) {
		propsArr.splice(l, 1);
	}
}

function shallowArrayFilter(path /*, object, parentObs*/) { // Filter used by {{props}} for the mappedProps target array
	return rShallowArrayPath.test(path); // No '.' in path
}

$tags("props", {
	baseTag: "for",
	dataMap: $views.map({
		getTgt: $tags.props.dataMap.getTgt, // getTargetProps
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
					if (!view && node.tagName) { // Not a text node
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
		isCleanCall++; // Make sure cleanData does disposal only when coming from these calls.
		try {
			result = oldFn.apply(this, arguments);
		}
		finally {
			isCleanCall--;
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
						tokens = path.slice(5);
						tag = tag.tag;
					} else if (path.slice(0, 8) === "~tagCtx.") {
						// "~tagCtx.xxx"
						tokens = path.slice(8);
						tag = tag.tagCtx;
					}
					if (tokens) {
						return tag ? [tag, tokens] : [];
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
						items = [helper, path.join(".")]; // 2way bindng on ~foo.helperLeafProperty or ~computed() or ~contextualParam
					}
				}
				return items || [];
			}
			if (path.charAt(0) === "#") {
				// We return new items to insert into the sequence, replacing the "#a.b.c" string: [view, "a.b.c" currentDataItem]
				// so currentDataItem becomes the object for subsequent paths. The 'true' flag makes the paths bind only to leaf changes.
				return path === "#data" ? [] : [view, path.replace(rViewPath, "")];
			}
		}
	};
};

//===================
// ctxPrm helpers
//===================
// The following helper functions for observable contextual parameters are needed by render.js in data-linking scenarios
// Implemented here rather than in render.js to keep render.js size down, and exposed via $.sub...

$sub._cp = function(paramVal, paramExpr, view, tagCtxPrm) { // Create tag or inline contextual parameter
	// Called for inline contextual parameter ~foo=expression, from compiled function for expression. (tagCtxPrm is undefined)
	// Called for tag parameter (two-way binding), from renderTag. (tagCtxPrm is {tag: ..., ind: ...})
	if (view.linked) { // In JsViews, returns [view, linkFn] where linkFn is compiled function for expression, or observable contextual parameter object
		if (tagCtxPrm && (tagCtxPrm.cvt || tagCtxPrm.tag._.toIndex[tagCtxPrm.ind] === undefined)) {
			paramVal = [{_ocp: paramVal}]; // With convert, or with bindTo/bindFrom different, the tag contextual parameter object will be 'local' to the tag.
				// It will be updated by bindFrom binding, and by tag.setValue(...), but not by tag.updateValue() (which will update bindTo value externally)
			tagCtxPrm.updateValue = function(val) {
				$.observable(paramVal._cxp.data).setProperty(_ocp, val); // Set the value (res[0]._ocp)
				return this;
			};
		} else if (paramExpr) { // With no convert/convertBack and no bindTo/bindFrom difference, tag contextual parameter 2way binds to bindTo/bindFrom value.
				// So tag.updateValue() updates external value, which updates contextual  parameter through 2way binding
			var params = delimOpenChar1 + ":" + paramExpr + delimCloseChar0,
				links = topView.tmpl.links, // Use topView links, as for compiled top-level linking expressions. To do - should this ever get disposed?
				linkFn = links[params];
			if (!linkFn) {
				links[params] = linkFn = $sub.tmplFn(params, view.tmpl, true);
			}
			paramVal = linkFn.deps[0]
				? [view, linkFn] // compiled expression
				: [{_ocp: tagCtxPrm ? paramVal : linkFn()}]; // Static value - no deps - returns observable contextual parameter object
		} else {
			paramVal = [{_ocp: paramVal}]; // Uninitialized observable contextual parameter object
		}
		paramVal._cxp = tagCtxPrm || {
			updateValue: function(val) {
				$observable(paramVal._cxp.data).setProperty(paramVal._cxp.path, val);
				return this;
			}
		};
	}
	return paramVal; // In JsRender returns evaluated expression
};

$sub._ucp = function(key, value, view, obsCtxPrm) {
	var tag = obsCtxPrm.tag,
		index = tag ? $inArray(key, tag.linkedCtxParam) : 0;
	if (!obsCtxPrm.path) {
		resolveDataTargetPath("~" + key, view.data, $sub._gccb(view));
	}
	return (obsCtxPrm.updateValue || tag.updateValue)(value, index, obsCtxPrm.tagElse, undefined, tag);
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
