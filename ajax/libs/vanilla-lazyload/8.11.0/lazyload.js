var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.LazyLoad = factory();
})(this, function () {
	'use strict';

	var getDefaultSettings = function getDefaultSettings() {
		return {
			elements_selector: "img",
			container: window,
			threshold: 300,
			throttle: 150,
			data_src: "src",
			data_srcset: "srcset",
			data_sizes: "sizes",
			class_loading: "loading",
			class_loaded: "loaded",
			class_error: "error",
			class_initial: "initial",
			skip_invisible: true,
			callback_load: null,
			callback_error: null,
			callback_set: null,
			callback_processed: null,
			callback_enter: null
		};
	};

	var isBot = !("onscroll" in window) || /glebot/.test(navigator.userAgent);

	var callCallback = function callCallback(callback, argument) {
		if (callback) {
			callback(argument);
		}
	};

	var getTopOffset = function getTopOffset(element) {
		return element.getBoundingClientRect().top + window.pageYOffset - element.ownerDocument.documentElement.clientTop;
	};

	var isBelowViewport = function isBelowViewport(element, container, threshold) {
		var fold = container === window ? window.innerHeight + window.pageYOffset : getTopOffset(container) + container.offsetHeight;
		return fold <= getTopOffset(element) - threshold;
	};

	var getLeftOffset = function getLeftOffset(element) {
		return element.getBoundingClientRect().left + window.pageXOffset - element.ownerDocument.documentElement.clientLeft;
	};

	var isAtRightOfViewport = function isAtRightOfViewport(element, container, threshold) {
		var documentWidth = window.innerWidth;
		var fold = container === window ? documentWidth + window.pageXOffset : getLeftOffset(container) + documentWidth;
		return fold <= getLeftOffset(element) - threshold;
	};

	var isAboveViewport = function isAboveViewport(element, container, threshold) {
		var fold = container === window ? window.pageYOffset : getTopOffset(container);
		return fold >= getTopOffset(element) + threshold + element.offsetHeight;
	};

	var isAtLeftOfViewport = function isAtLeftOfViewport(element, container, threshold) {
		var fold = container === window ? window.pageXOffset : getLeftOffset(container);
		return fold >= getLeftOffset(element) + threshold + element.offsetWidth;
	};

	function isInsideViewport(element, container, threshold) {
		return !isBelowViewport(element, container, threshold) && !isAboveViewport(element, container, threshold) && !isAtRightOfViewport(element, container, threshold) && !isAtLeftOfViewport(element, container, threshold);
	}

	/* Creates instance and notifies it through the window element */
	var createInstance = function createInstance(classObj, options) {
		var event;
		var eventString = "LazyLoad::Initialized";
		var instance = new classObj(options);
		try {
			// Works in modern browsers
			event = new CustomEvent(eventString, { detail: { instance: instance } });
		} catch (err) {
			// Works in Internet Explorer (all versions)
			event = document.createEvent("CustomEvent");
			event.initCustomEvent(eventString, false, false, { instance: instance });
		}
		window.dispatchEvent(event);
	};

	/* Auto initialization of one or more instances of lazyload, depending on the 
     options passed in (plain object or an array) */
	function autoInitialize(classObj, options) {
		var optsLength = options.length;
		if (!optsLength) {
			// Plain object
			createInstance(classObj, options);
		} else {
			// Array of objects
			for (var i = 0; i < optsLength; i++) {
				createInstance(classObj, options[i]);
			}
		}
	}

	var dataPrefix = "data-";
	var processedDataName = "was-processed";
	var processedDataValue = "true";

	var getData = function getData(element, attribute) {
		return element.getAttribute(dataPrefix + attribute);
	};

	var setData = function setData(element, attribute, value) {
		return element.setAttribute(dataPrefix + attribute, value);
	};

	var setWasProcessed = function setWasProcessed(element) {
		return setData(element, processedDataName, processedDataValue);
	};

	var getWasProcessed = function getWasProcessed(element) {
		return getData(element, processedDataName) === processedDataValue;
	};

	var setSourcesInChildren = function setSourcesInChildren(parentTag, attrName, dataAttrName) {
		for (var i = 0, childTag; childTag = parentTag.children[i]; i += 1) {
			if (childTag.tagName === "SOURCE") {
				var attributeValue = getData(childTag, dataAttrName);
				if (attributeValue) {
					childTag.setAttribute(attrName, attributeValue);
				}
			}
		}
	};

	var setAttributeIfNotNullOrEmpty = function setAttributeIfNotNullOrEmpty(element, attrName, value) {
		if (!value) {
			return;
		}
		element.setAttribute(attrName, value);
	};

	function setSources(element, settings) {
		var sizesDataName = settings.data_sizes,
		    srcsetDataName = settings.data_srcset,
		    srcDataName = settings.data_src;

		var srcDataValue = getData(element, srcDataName);
		var tagName = element.tagName;
		if (tagName === "IMG") {
			var parent = element.parentNode;
			if (parent && parent.tagName === "PICTURE") {
				setSourcesInChildren(parent, "srcset", srcsetDataName);
			}
			var sizesDataValue = getData(element, sizesDataName);
			setAttributeIfNotNullOrEmpty(element, "sizes", sizesDataValue);
			var srcsetDataValue = getData(element, srcsetDataName);
			setAttributeIfNotNullOrEmpty(element, "srcset", srcsetDataValue);
			setAttributeIfNotNullOrEmpty(element, "src", srcDataValue);
			return;
		}
		if (tagName === "IFRAME") {
			setAttributeIfNotNullOrEmpty(element, "src", srcDataValue);
			return;
		}
		if (tagName === "VIDEO") {
			setSourcesInChildren(element, "src", srcDataName);
			setAttributeIfNotNullOrEmpty(element, "src", srcDataValue);
			return;
		}
		if (srcDataValue) {
			element.style.backgroundImage = 'url("' + srcDataValue + '")';
		}
	}

	var runningOnBrowser = typeof window !== "undefined";

	var supportsClassList = runningOnBrowser && "classList" in document.createElement("p");

	var addClass = function addClass(element, className) {
		if (supportsClassList) {
			element.classList.add(className);
			return;
		}
		element.className += (element.className ? " " : "") + className;
	};

	var removeClass = function removeClass(element, className) {
		if (supportsClassList) {
			element.classList.remove(className);
			return;
		}
		element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, "");
	};

	/*
  * Constructor
  */

	var LazyLoad = function LazyLoad(instanceSettings) {
		this._settings = _extends({}, getDefaultSettings(), instanceSettings);
		this._queryOriginNode = this._settings.container === window ? document : this._settings.container;

		this._previousLoopTime = 0;
		this._loopTimeout = null;
		this._boundHandleScroll = this.handleScroll.bind(this);

		this._isFirstLoop = true;
		window.addEventListener("resize", this._boundHandleScroll);
		this.update();
	};

	LazyLoad.prototype = {
		_reveal: function _reveal(element, force) {
			if (!force && getWasProcessed(element)) {
				return; // element has already been processed and force wasn't true
			}

			var settings = this._settings;

			var errorCallback = function errorCallback() {
				/* As this method is asynchronous, it must be protected against external destroy() calls */
				if (!settings) {
					return;
				}
				element.removeEventListener("load", loadCallback);
				element.removeEventListener("error", errorCallback);
				removeClass(element, settings.class_loading);
				addClass(element, settings.class_error);
				callCallback(settings.callback_error, element);
			};

			var loadCallback = function loadCallback() {
				/* As this method is asynchronous, it must be protected against external destroy() calls */
				if (!settings) {
					return;
				}
				removeClass(element, settings.class_loading);
				addClass(element, settings.class_loaded);
				element.removeEventListener("load", loadCallback);
				element.removeEventListener("error", errorCallback);
				callCallback(settings.callback_load, element);
			};

			callCallback(settings.callback_enter, element);
			if (["IMG", "IFRAME", "VIDEO"].indexOf(element.tagName) > -1) {
				element.addEventListener("load", loadCallback);
				element.addEventListener("error", errorCallback);
				addClass(element, settings.class_loading);
			}
			setSources(element, settings);
			callCallback(settings.callback_set, element);
		},

		_loopThroughElements: function _loopThroughElements(forceDownload) {
			var settings = this._settings,
			    elements = this._elements,
			    elementsLength = !elements ? 0 : elements.length;
			var i = void 0,
			    processedIndexes = [],
			    firstLoop = this._isFirstLoop;

			for (i = 0; i < elementsLength; i++) {
				var element = elements[i];
				/* If must skip_invisible and element is invisible, skip it */
				if (settings.skip_invisible && element.offsetParent === null) {
					continue;
				}

				if (isBot || forceDownload || isInsideViewport(element, settings.container, settings.threshold)) {
					if (firstLoop) {
						addClass(element, settings.class_initial);
					}
					/* Start loading the image */
					this.load(element);
					/* Marking the element as processed. */
					processedIndexes.push(i);
					setWasProcessed(element);
				}
			}
			/* Removing processed elements from this._elements. */
			while (processedIndexes.length) {
				elements.splice(processedIndexes.pop(), 1);
				callCallback(settings.callback_processed, elements.length);
			}
			/* Stop listening to scroll event when 0 elements remains */
			if (elementsLength === 0) {
				this._stopScrollHandler();
			}
			/* Sets isFirstLoop to false */
			if (firstLoop) {
				this._isFirstLoop = false;
			}
		},

		_purgeElements: function _purgeElements() {
			var elements = this._elements,
			    elementsLength = elements.length;
			var i = void 0,
			    elementsToPurge = [];

			for (i = 0; i < elementsLength; i++) {
				var element = elements[i];
				/* If the element has already been processed, skip it */
				if (getWasProcessed(element)) {
					elementsToPurge.push(i);
				}
			}
			/* Removing elements to purge from this._elements. */
			while (elementsToPurge.length > 0) {
				elements.splice(elementsToPurge.pop(), 1);
			}
		},

		_startScrollHandler: function _startScrollHandler() {
			if (!this._isHandlingScroll) {
				this._isHandlingScroll = true;
				this._settings.container.addEventListener("scroll", this._boundHandleScroll);
			}
		},

		_stopScrollHandler: function _stopScrollHandler() {
			if (this._isHandlingScroll) {
				this._isHandlingScroll = false;
				this._settings.container.removeEventListener("scroll", this._boundHandleScroll);
			}
		},

		handleScroll: function handleScroll() {
			var throttle = this._settings.throttle;

			if (throttle !== 0) {
				var now = Date.now();
				var remainingTime = throttle - (now - this._previousLoopTime);
				if (remainingTime <= 0 || remainingTime > throttle) {
					if (this._loopTimeout) {
						clearTimeout(this._loopTimeout);
						this._loopTimeout = null;
					}
					this._previousLoopTime = now;
					this._loopThroughElements();
				} else if (!this._loopTimeout) {
					this._loopTimeout = setTimeout(function () {
						this._previousLoopTime = Date.now();
						this._loopTimeout = null;
						this._loopThroughElements();
					}.bind(this), remainingTime);
				}
			} else {
				this._loopThroughElements();
			}
		},

		loadAll: function loadAll() {
			this._loopThroughElements(true);
		},

		update: function update() {
			// Converts to array the nodeset obtained querying the DOM from _queryOriginNode with elements_selector
			this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
			this._purgeElements();
			this._loopThroughElements();
			this._startScrollHandler();
		},

		destroy: function destroy() {
			window.removeEventListener("resize", this._boundHandleScroll);
			if (this._loopTimeout) {
				clearTimeout(this._loopTimeout);
				this._loopTimeout = null;
			}
			this._stopScrollHandler();
			this._elements = null;
			this._queryOriginNode = null;
			this._settings = null;
		},

		load: function load(element, force) {
			this._reveal(element, force);
		}
	};

	/* Automatic instances creation if required (useful for async script loading!) */
	var autoInitOptions = window.lazyLoadOptions;
	if (runningOnBrowser && autoInitOptions) {
		autoInitialize(LazyLoad, autoInitOptions);
	}

	return LazyLoad;
});