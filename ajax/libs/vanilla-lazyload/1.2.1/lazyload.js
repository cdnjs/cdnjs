/*
 * Lazy Load - for lazy loading images without jQuery
 */

LazyLoad = function (instanceSettings) {

	var _defaultSettings = {
			elements_selector: "img",
			container: window,
			threshold: 300,
			throttle: 40,
			data_src: "original",
			data_srcset: "original-set",
			data_ignore: "ignore",
			class_loading: "loading",
			class_loaded: "loaded",
			skip_invisible: true,
			show_while_loading: false,
			callback_load: null,
			callback_set: null,
			callback_processed: null,
			placeholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
		},
		_supportsAddEventListener = !!window.addEventListener,
		_supportsAttachEvent = !!window.attachEvent,
		_supportsClassList = !!document.body.classList,
		_this = this,
		_previousLoopTime = 0,
		_loopTimeout = null;

	/*
	 * PRIVATE FUNCTIONS *NOT RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
	 * -------------------------------------------------------------------
	 */

	function _addEventListener(element, eventName, callback) {
		// Use addEventListener if available
		if (_supportsAddEventListener) {
			element.addEventListener(eventName, callback);
			return;
		}
		// Otherwise use attachEvent, set this and event
		if (_supportsAttachEvent) {
			element.attachEvent('on' + eventName, (function (el) {
				return function () {
					callback.call(el, window.event);
				};
			}(element)));
			// Break closure and primary circular reference to element
			element = null;
		}
	}

	function _removeEventListener(element, eventName, callback) {
		// Use removeEventListener if available
		if (_supportsAddEventListener) {
			element.removeEventListener(eventName, callback);
			return;
		}
		// Otherwise use detachEvent
		if (_supportsAttachEvent) {
			element.detachEvent('on' + eventName, callback);
		}
	}

	function _isInsideViewport(element, container, threshold) {

		var ownerDocument, documentTop, documentLeft;

		function _getDocumentWidth() {
			return window.innerWidth || (ownerDocument.documentElement.clientWidth || document.body.clientWidth);
		}

		function _getDocumentHeight() {
			return window.innerHeight || (ownerDocument.documentElement.clientHeight || document.body.clientHeight);
		}

		function _getTopOffset(element) {
			return element.getBoundingClientRect().top + documentTop - ownerDocument.documentElement.clientTop;
		}

		function _getLeftOffset(element) {
			return element.getBoundingClientRect().left + documentLeft - ownerDocument.documentElement.clientLeft;
		}

		function _isBelowViewport() {
			var fold;
			if (container === window) {
				fold = _getDocumentHeight() + documentTop;
			} else {
				fold = _getTopOffset(container) + container.offsetHeight;
			}
			return fold <= _getTopOffset(element) - threshold;
		}

		function _isAtRightOfViewport() {
			var fold;
			if (container === window) {
				fold = _getDocumentWidth() + window.pageXOffset;
			} else {
				fold = _getLeftOffset(container) + _getDocumentWidth();
			}
			return fold <= _getLeftOffset(element) - threshold;
		}

		function _isAboveViewport() {
			var fold;
			if (container === window) {
				fold = documentTop;
			} else {
				fold = _getTopOffset(container);
			}
			return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
		}

		function _isAtLeftOfViewport() {
			var fold;
			if (container === window) {
				fold = documentLeft;
			} else {
				fold = _getLeftOffset(container);
			}
			return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
		}

		ownerDocument = element.ownerDocument;
		documentTop = window.pageYOffset || ownerDocument.body.scrollTop;
		documentLeft = window.pageXOffset || ownerDocument.body.scrollLeft;

		return !_isBelowViewport() && !_isAboveViewport() && !_isAtRightOfViewport() && !_isAtLeftOfViewport();
	}

	function _merge_objects(obj1, obj2) {
		var obj3 = {}, propertyName;
		for (propertyName in obj1) {
			if (obj1.hasOwnProperty(propertyName)) {
				obj3[propertyName] = obj1[propertyName];
			}
		}
		for (propertyName in obj2) {
			if (obj2.hasOwnProperty(propertyName)) {
				obj3[propertyName] = obj2[propertyName];
			}
		}
		return obj3;
	}

	function _convertToArray(nodeSet) {
		try {
			return Array.prototype.slice.call(nodeSet);
		}
		catch (e) {
			var array = [],
				i, l = nodeSet.length;

			for (i = 0; i < l; i++) {
				array.push(nodeSet[i]);
			}
			return array;
		}
	}

	function _addClass(element, className) {
		/* HTML 5 compliant browsers. */
		if (_supportsClassList) {
			element.classList.add(className);
			return;
		}
		/* Legacy browsers (IE<10) support. */
		element.className += (element.className ? ' ' : '') + className;
	}

	function _removeClass(element, className) {
		/* HTML 5 compliant browsers. */
		if (_supportsClassList) {
			element.classList.remove(className);
			return;
		}
		/* Legacy browsers (IE<10) support. */
		element.className = element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').replace(/^\s+/, '').replace(/\s+$/, '');
	}

	function _setSrcAndSrcset(target, source, srcsetDataAttribute, srcDataAttribute) {
		var srcSet = source.getAttribute( 'data-' + srcsetDataAttribute),
			src = source.getAttribute( 'data-' + srcDataAttribute);
		if (srcSet) {
			target.setAttribute("srcset", srcSet);
		}
		if (src) {
			target.setAttribute("src", src);
		}
	}

	/*
	 * PRIVATE FUNCTIONS *RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
	 * ---------------------------------------------------------------
	 */

	this.handleScroll = function () {
		var remainingTime,
			now = Date.now(),
			throttle = _this._settings.throttle;

		if (throttle !== 0) {
			remainingTime = throttle - (now - _previousLoopTime);
			if (remainingTime <= 0 || remainingTime > throttle) {
				if (_loopTimeout) {
					clearTimeout(_loopTimeout);
					_loopTimeout = null;
				}
				_previousLoopTime = now;
				_this._loopThroughElements();
			} else if (!_loopTimeout) {
				_loopTimeout = setTimeout(function () {
					_previousLoopTime = Date.now();
					_loopTimeout = null;
					_this._loopThroughElements();
				}, remainingTime);
			}
		}
		else {
			_this._loopThroughElements();
		}
	};

	this._showOnLoad = function (element) {
		var fakeImg,
			settings = this._settings;

		/* If no src attribute given use data:uri. */
		if (!element.getAttribute("src")) {
			element.setAttribute("src", settings.placeholder);
		}
		/* Creating a new `img` in a DOM fragment. */
		fakeImg = document.createElement('img');
		/* Listening to the load event */
		function loadCallback() {
			/* As this method is asynchronous, it must be protected against external destroy() calls */
			if (settings === null) { return; }
			/* Calling LOAD callback */
			if (settings.callback_load) {
				settings.callback_load(element);
			}
			_setSrcAndSrcset(element, element, settings.data_srcset, settings.data_src);
			/* Calling SET callback */
			if (settings.callback_set) {
				settings.callback_set(element);
			}
			_removeClass(element, settings.class_loading);
			_addClass(element, settings.class_loaded);
			_removeEventListener(fakeImg, "load", loadCallback);
		}

		_addEventListener(fakeImg, "load", loadCallback);
		_addClass(element, settings.class_loading);
		_setSrcAndSrcset(fakeImg, element, settings.data_srcset, settings.data_src);
	};

	this._showOnAppear = function (element) {
		var settings = this._settings;

		function loadCallback() {
			/* As this method is asynchronous, it must be protected against external destroy() calls */
			if (settings === null) { return; }
			/* Calling LOAD callback */
			if (settings.callback_load) {
				settings.callback_load(element);
			}
			_removeClass(element, settings.class_loading);
			_addClass(element, settings.class_loaded);
			_removeEventListener(element, "load", loadCallback);
		}

		_addEventListener(element, "load", loadCallback);
		_addClass(element, settings.class_loading);
		_setSrcAndSrcset(element, element, settings.data_srcset, settings.data_src);
		/* Calling SET callback */
		if (settings.callback_set) {
			settings.callback_set(element);
		}
	};

	this._loopThroughElements = function () {
		var i, element,
			settings = this._settings,
			elements = this._elements,
			elementsLength = elements.length,
			processedIndexes = [];

		for (i = 0; i < elementsLength; i++) {
			element = elements[i];
			/* If must skip_invisible and element is invisible, skip it */
			if (settings.skip_invisible && (element.offsetParent === null)) {
				continue;
			}
			if (_isInsideViewport(element, settings.container, settings.threshold)) {
				/* Forking behaviour depending on show_while_loading (true value is ideal for progressive jpeg). */
				if (settings.show_while_loading) {
					this._showOnAppear(element);
				} else {
					this._showOnLoad(element);
				}
				/* Marking the element as processed. */
				processedIndexes.push(i);
				element.setAttribute('data-' + settings.data_ignore, true);
			}
		}
		/* Removing processed elements from this._elements. */
		while (processedIndexes.length > 0) {
			elements.splice(processedIndexes.pop(), 1);
			/* Calling the end loop callback */
			if (settings.callback_processed) {
				settings.callback_processed(elements.length);
			}
		}
		/* Stop listening to scroll event when 0 elements remains */
		if (elements.length === 0) {
			this._stopScrollHandler();
		}
	};

	this._purgeElements = function () {
		var i, element,
			settings = this._settings,
			elements = this._elements,
			elementsLength = elements.length,
			elementsToPurge = [];

		for (i = 0; i < elementsLength; i++) {
			element = elements[i];
			/* If the element has already been processed, skip it */
			if (element.getAttribute('data-' + settings.data_ignore)) {
				elementsToPurge.push(i);
			}
		}
		/* Removing elements to purge from this._elements. */
		while (elementsToPurge.length > 0) {
			elements.splice(elementsToPurge.pop(), 1);
		}
	};

	this._startScrollHandler = function () {
		if (!this._isHandlingScroll) {
			this._isHandlingScroll = true;
			_addEventListener(this._settings.container, "scroll", this.handleScroll);
		}
	};

	this._stopScrollHandler = function () {
		if (this._isHandlingScroll) {
			this._isHandlingScroll = false;
			_removeEventListener(this._settings.container, "scroll", this.handleScroll);
		}
	};

	/*
	 * PUBLIC FUNCTIONS
	 * ----------------
	 */

	this.update = function () {
		this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
		this._purgeElements();
		this._loopThroughElements();
		this._startScrollHandler();
	};

	this.destroy = function () {
		this._stopScrollHandler();
		this._elements = null;
		this._queryOriginNode = null;
		this._settings = null;
	};

	/*
	 * INITIALIZER
	 * -----------
	 */

	this._settings = _merge_objects(_defaultSettings, instanceSettings);
	this._queryOriginNode = this._settings.container === window ? document : this._settings.container;
	this.update();

};