"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _defaultSettings = {
    elements_selector: "img",
    container: window,
    threshold: 300,
    throttle: 150,
    data_src: "original",
    data_srcset: "original-set",
    class_loading: "loading",
    class_loaded: "loaded",
    class_error: "error",
    skip_invisible: true,
    callback_load: null,
    callback_error: null,
    callback_set: null,
    callback_processed: null
};

/* 
 * UTILITY FUNCTIONS
 * -----------------
 */

function _now() {
    return new Date().getTime();
}

var LazyLoad = function () {
    function LazyLoad(instanceSettings) {
        _classCallCheck(this, LazyLoad);

        this._settings = this._mergeObjects(_defaultSettings, instanceSettings);
        this._queryOriginNode = this._settings.container === window ? document : this._settings.container;

        this._previousLoopTime = 0;
        this._loopTimeout = null;

        this._boundHandleScroll = this.handleScroll.bind(this);

        window.addEventListener("resize", this._boundHandleScroll);
        this.update();
    }

    _createClass(LazyLoad, [{
        key: "_isInsideViewport",
        value: function _isInsideViewport(element, container, threshold) {
            var ownerDocument, documentTop, documentLeft;

            function _getDocumentWidth() {
                return window.innerWidth || ownerDocument.documentElement.clientWidth || document.body.clientWidth;
            }

            function _getDocumentHeight() {
                return window.innerHeight || ownerDocument.documentElement.clientHeight || document.body.clientHeight;
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
    }, {
        key: "_mergeObjects",
        value: function _mergeObjects(obj1, obj2) {
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
    }, {
        key: "_setSourcesForPicture",
        value: function _setSourcesForPicture(element, srcsetDataAttribute) {
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
    }, {
        key: "_setSources",
        value: function _setSources(element, srcsetDataAttribute, srcDataAttribute) {
            var tagName = element.tagName;
            var elementSrc = element.getAttribute('data-' + srcDataAttribute);
            if (tagName === "IMG") {
                this._setSourcesForPicture(element, srcsetDataAttribute);
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
    }, {
        key: "_showOnAppear",
        value: function _showOnAppear(element) {
            var settings = this._settings;

            function errorCallback() {
                element.removeEventListener("load", loadCallback);
                element.classList.remove(settings.class_loading);
                element.classList.add(settings.class_error);
                /* Calling ERROR callback */
                if (settings.callback_error) {
                    settings.callback_error(element);
                }
            }

            function loadCallback() {
                /* As this method is asynchronous, it must be protected against external destroy() calls */
                if (settings === null) {
                    return;
                }
                element.classList.remove(settings.class_loading);
                element.classList.add(settings.class_loaded);
                element.removeEventListener("load", loadCallback);
                element.removeEventListener("error", errorCallback);
                /* Calling LOAD callback */
                if (settings.callback_load) {
                    settings.callback_load(element);
                }
            }

            if (element.tagName === "IMG" || element.tagName === "IFRAME") {
                element.addEventListener("load", loadCallback);
                element.addEventListener("error", errorCallback);
                element.classList.add(settings.class_loading);
            }

            this._setSources(element, settings.data_srcset, settings.data_src);
            /* Calling SET callback */
            if (settings.callback_set) {
                settings.callback_set(element);
            }
        }
    }, {
        key: "_loopThroughElements",
        value: function _loopThroughElements() {
            var i = void 0,
                element = void 0,
                settings = this._settings,
                elements = this._elements,
                elementsLength = !elements ? 0 : elements.length,
                processedIndexes = [];

            for (i = 0; i < elementsLength; i++) {
                element = elements[i];
                /* If must skip_invisible and element is invisible, skip it */
                if (settings.skip_invisible && element.offsetParent === null) {
                    continue;
                }
                if (this._isInsideViewport(element, settings.container, settings.threshold)) {
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
        }
    }, {
        key: "_purgeElements",
        value: function _purgeElements() {
            var i = void 0,
                element = void 0,
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
        }
    }, {
        key: "_startScrollHandler",
        value: function _startScrollHandler() {
            if (!this._isHandlingScroll) {
                this._isHandlingScroll = true;
                this._settings.container.addEventListener("scroll", this._boundHandleScroll);
            }
        }
    }, {
        key: "_stopScrollHandler",
        value: function _stopScrollHandler() {
            if (this._isHandlingScroll) {
                this._isHandlingScroll = false;
                this._settings.container.removeEventListener("scroll", this._boundHandleScroll);
            }
        }

        /*
        * PUBLIC FUNCTIONS
        * ----------------
        */

    }, {
        key: "handleScroll",
        value: function handleScroll() {
            var _this = this;

            var remainingTime = void 0,
                now = void 0,
                throttle = void 0;

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
                    this._loopTimeout = setTimeout(function () {
                        _this._previousLoopTime = _now();
                        _this._loopTimeout = null;
                        _this._loopThroughElements();
                    }, remainingTime);
                }
            } else {
                this._loopThroughElements();
            }
        }
    }, {
        key: "update",
        value: function update() {
            // Converts to array the nodeset obtained querying the DOM from _queryOriginNode with elements_selector
            this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
            this._purgeElements();
            this._loopThroughElements();
            this._startScrollHandler();
        }
    }, {
        key: "destroy",
        value: function destroy() {
            window.removeEventListener("resize", this._boundHandleScroll);
            if (this._loopTimeout) {
                clearTimeout(this._loopTimeout);
                this._loopTimeout = null;
            }
            this._stopScrollHandler();
            this._elements = null;
            this._queryOriginNode = null;
            this._settings = null;
        }
    }]);

    return LazyLoad;
}();

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
        module.exports = factory();
    } else {
        root.LazyLoad = factory();
    }
})(window, function () {
    return LazyLoad;
});
