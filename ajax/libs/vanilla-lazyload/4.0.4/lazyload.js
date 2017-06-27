(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.LazyLoad = factory();
    }
}(this, function() {

    var _defaultSettings,
        _isInitialized = false;

    /*
     * PRIVATE FUNCTIONS *NOT RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
     * -------------------------------------------------------------------
     */

    function _init() {
        if (!_isInitialized) {
            _defaultSettings = {
                elements_selector: "img",
                container: window,
                threshold: 300,
                throttle: 150,
                data_src: "original",
                data_srcset: "original-set",
                class_loading: "loading",
                class_loaded: "loaded",
                skip_invisible: true,
                callback_load: null,
                callback_error: null,
                callback_set: null,
                callback_processed: null
            };

            _isInitialized = true;
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

    function _now() {
        var d = new Date();
        return d.getTime();
    }

    function _merge_objects(obj1, obj2) {
        var obj3 = {},
            propertyName;
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
        return Array.prototype.slice.call(nodeSet);
    }

    function _setSourcesForPicture(element, srcsetDataAttribute) {
        var parent = element.parentElement;
        if (parent.tagName !== 'PICTURE') {
            return;
        }
        for (var i = 0; i < parent.children.length; i++) {
            var pictureChild = parent.children[i];
            if (pictureChild.tagName === 'SOURCE') {
                var sourceSrcset = pictureChild.getAttribute('data-' + srcsetDataAttribute);
                if (sourceSrcset) {
                    pictureChild.setAttribute('srcset', sourceSrcset);
                }
            }
        }
    }

    function _setSources(element, srcsetDataAttribute, srcDataAttribute) {
        var tagName = element.tagName;
        var elementSrc = element.getAttribute('data-' + srcDataAttribute);
        if (tagName === "IMG") {
            _setSourcesForPicture(element, srcsetDataAttribute);
            var imgSrcset = element.getAttribute('data-' + srcsetDataAttribute);
            if (imgSrcset) element.setAttribute("srcset", imgSrcset);
            if (elementSrc) element.setAttribute("src", elementSrc);
            return;
        }
        if (tagName === "IFRAME") {
            if (elementSrc) element.setAttribute("src", elementSrc);
            return;
        }
        if (elementSrc) element.style.backgroundImage = "url(" + elementSrc + ")";
    }

    function _bind(fn, obj) {
        return function() {
            return fn.apply(obj, arguments);
        };
    }


    /*
     * INITIALIZER
     * -----------
     */

    function LazyLoad(instanceSettings) {
        _init();

        this._settings = _merge_objects(_defaultSettings, instanceSettings);
        this._queryOriginNode = this._settings.container === window ? document : this._settings.container;

        this._previousLoopTime = 0;
        this._loopTimeout = null;

        this._handleScrollFn = _bind(this.handleScroll, this);

        window.addEventListener("resize", this._handleScrollFn);
        this.update();
    }


    /*
     * PRIVATE FUNCTIONS *RELATED* TO A SPECIFIC INSTANCE OF LAZY LOAD
     * ---------------------------------------------------------------
     */

    LazyLoad.prototype._showOnAppear = function(element) {
        var settings = this._settings;

        function errorCallback() {
            element.removeEventListener("load", loadCallback);
            element.classList.remove(settings.class_loading);
            if (settings.callback_error) {
                settings.callback_error(element);
            }
        }
        function loadCallback() {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (settings === null) {
                return;
            }
            /* Calling LOAD callback */
            if (settings.callback_load) {
                settings.callback_load(element);
            }
            element.classList.remove(settings.class_loading);
            element.classList.add(settings.class_loaded);
            element.removeEventListener("load", loadCallback);
            element.removeEventListener("error", errorCallback);
        }

        if (element.tagName === "IMG" || element.tagName === "IFRAME") {
            element.addEventListener("load", loadCallback);
            element.addEventListener("error", errorCallback);
            element.classList.add(settings.class_loading);
        }

        _setSources(element, settings.data_srcset, settings.data_src);
        /* Calling SET callback */
        if (settings.callback_set) {
            settings.callback_set(element);
        }
    };

    LazyLoad.prototype._loopThroughElements = function() {
        var i, element,
            settings = this._settings,
            elements = this._elements,
            elementsLength = (!elements) ? 0 : elements.length,
            processedIndexes = [];

        for (i = 0; i < elementsLength; i++) {
            element = elements[i];
            /* If must skip_invisible and element is invisible, skip it */
            if (settings.skip_invisible && (element.offsetParent === null)) {
                continue;
            }
            if (_isInsideViewport(element, settings.container, settings.threshold)) {
                this._showOnAppear(element);

                /* Marking the element as processed. */
                processedIndexes.push(i);
                element.wasProcessed = true;
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
        if (elementsLength === 0) {
            this._stopScrollHandler();
        }
    };

    LazyLoad.prototype._purgeElements = function() {
        var i, element,
            elements = this._elements,
            elementsLength = elements.length,
            elementsToPurge = [];

        for (i = 0; i < elementsLength; i++) {
            element = elements[i];
            /* If the element has already been processed, skip it */
            if (element.wasProcessed) {
                elementsToPurge.push(i);
            }
        }
        /* Removing elements to purge from this._elements. */
        while (elementsToPurge.length > 0) {
            elements.splice(elementsToPurge.pop(), 1);
        }
    };

    LazyLoad.prototype._startScrollHandler = function() {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            this._settings.container.addEventListener("scroll", this._handleScrollFn);
        }
    };

    LazyLoad.prototype._stopScrollHandler = function() {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            this._settings.container.removeEventListener("scroll", this._handleScrollFn);
        }
    };


    /*
     * PUBLIC FUNCTIONS
     * ----------------
     */

    LazyLoad.prototype.handleScroll = function() {
        var remainingTime,
            now,
            throttle;

        // IE8 fix for destroy() malfunctioning
        if (!this._settings) {
            return;
        }

        now = _now();
        throttle = this._settings.throttle;

        if (throttle !== 0) {
            remainingTime = throttle - (now - this._previousLoopTime);
            if (remainingTime <= 0 || remainingTime > throttle) {
                if (this._loopTimeout) {
                    clearTimeout(this._loopTimeout);
                    this._loopTimeout = null;
                }
                this._previousLoopTime = now;
                this._loopThroughElements();
            } else if (!this._loopTimeout) {
                this._loopTimeout = setTimeout(_bind(function() {
                    this._previousLoopTime = _now();
                    this._loopTimeout = null;
                    this._loopThroughElements();
                }, this), remainingTime);
            }
        } else {
            this._loopThroughElements();
        }
    };

    LazyLoad.prototype.update = function() {
        this._elements = _convertToArray(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
        this._purgeElements();
        this._loopThroughElements();
        this._startScrollHandler();
    };

    LazyLoad.prototype.destroy = function() {
        window.removeEventListener("resize", this._handleScrollFn);
        if (this._loopTimeout) {
            clearTimeout(this._loopTimeout);
            this._loopTimeout = null;
        }
        this._stopScrollHandler();
        this._elements = null;
        this._queryOriginNode = null;
        this._settings = null;
    };


    return LazyLoad;


}));
