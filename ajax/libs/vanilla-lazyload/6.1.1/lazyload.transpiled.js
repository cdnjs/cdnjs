'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
        module.exports = factory();
    } else {
        root.LazyLoad = factory();
    }
})(window, function () {

    var _isBot = !('onscroll' in window) || /glebot/.test(navigator.userAgent);

    var _getTopOffset = function _getTopOffset(element) {
        return element.getBoundingClientRect().top + window.pageYOffset - element.ownerDocument.documentElement.clientTop;
    };

    var _isBelowViewport = function _isBelowViewport(element, container, threshold) {
        var fold = container === window ? window.innerHeight + window.pageYOffset : _getTopOffset(container) + container.offsetHeight;
        return fold <= _getTopOffset(element) - threshold;
    };

    var _getLeftOffset = function _getLeftOffset(element) {
        return element.getBoundingClientRect().left + window.pageXOffset - element.ownerDocument.documentElement.clientLeft;
    };

    var _isAtRightOfViewport = function _isAtRightOfViewport(element, container, threshold) {
        var documentWidth = window.innerWidth;
        var fold = container === window ? documentWidth + window.pageXOffset : _getLeftOffset(container) + documentWidth;
        return fold <= _getLeftOffset(element) - threshold;
    };

    var _isAboveViewport = function _isAboveViewport(element, container, threshold) {
        var fold = container === window ? window.pageYOffset : _getTopOffset(container);
        return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
    };

    var _isAtLeftOfViewport = function _isAtLeftOfViewport(element, container, threshold) {
        var fold = container === window ? window.pageXOffset : _getLeftOffset(container);
        return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
    };

    var _isInsideViewport = function _isInsideViewport(element, container, threshold) {
        return !_isBelowViewport(element, container, threshold) && !_isAboveViewport(element, container, threshold) && !_isAtRightOfViewport(element, container, threshold) && !_isAtLeftOfViewport(element, container, threshold);
    };

    var _callCallback = function _callCallback(callback, argument) {
        if (callback) {
            callback(argument);
        }
    };

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

    var LazyLoad = function () {
        function LazyLoad(instanceSettings) {
            _classCallCheck(this, LazyLoad);

            this._settings = Object.assign({}, _defaultSettings, instanceSettings);
            this._queryOriginNode = this._settings.container === window ? document : this._settings.container;

            this._previousLoopTime = 0;
            this._loopTimeout = null;
            this._boundHandleScroll = this.handleScroll.bind(this);

            window.addEventListener("resize", this._boundHandleScroll);
            this.update();
        }

        _createClass(LazyLoad, [{
            key: '_setSourcesForPicture',
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
            key: '_setSources',
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
            key: '_showOnAppear',
            value: function _showOnAppear(element) {
                var settings = this._settings;

                var errorCallback = function errorCallback() {
                    /* As this method is asynchronous, it must be protected against external destroy() calls */
                    if (!settings) {
                        return;
                    }
                    element.removeEventListener("load", loadCallback);
                    element.removeEventListener("error", errorCallback);
                    element.classList.remove(settings.class_loading);
                    element.classList.add(settings.class_error);
                    _callCallback(settings.callback_error, element);
                };

                var loadCallback = function loadCallback() {
                    /* As this method is asynchronous, it must be protected against external destroy() calls */
                    if (!settings) {
                        return;
                    }
                    element.classList.remove(settings.class_loading);
                    element.classList.add(settings.class_loaded);
                    element.removeEventListener("load", loadCallback);
                    element.removeEventListener("error", errorCallback);
                    /* Calling LOAD callback */
                    _callCallback(settings.callback_load, element);
                };

                if (element.tagName === "IMG" || element.tagName === "IFRAME") {
                    element.addEventListener("load", loadCallback);
                    element.addEventListener("error", errorCallback);
                    element.classList.add(settings.class_loading);
                }

                this._setSources(element, settings.data_srcset, settings.data_src);
                /* Calling SET callback */
                _callCallback(settings.callback_set, element);
            }
        }, {
            key: '_loopThroughElements',
            value: function _loopThroughElements() {
                var settings = this._settings,
                    elements = this._elements,
                    elementsLength = !elements ? 0 : elements.length;
                var i = void 0,
                    processedIndexes = [];

                for (i = 0; i < elementsLength; i++) {
                    var element = elements[i];
                    /* If must skip_invisible and element is invisible, skip it */
                    if (settings.skip_invisible && element.offsetParent === null) {
                        continue;
                    }

                    if (_isBot || _isInsideViewport(element, settings.container, settings.threshold)) {
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
                    _callCallback(settings.callback_processed, elements.length);
                }
                /* Stop listening to scroll event when 0 elements remains */
                if (elementsLength === 0) {
                    this._stopScrollHandler();
                }
            }
        }, {
            key: '_purgeElements',
            value: function _purgeElements() {
                var elements = this._elements,
                    elementsLength = elements.length;
                var i = void 0,
                    elementsToPurge = [];

                for (i = 0; i < elementsLength; i++) {
                    var element = elements[i];
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
            key: '_startScrollHandler',
            value: function _startScrollHandler() {
                if (!this._isHandlingScroll) {
                    this._isHandlingScroll = true;
                    this._settings.container.addEventListener("scroll", this._boundHandleScroll);
                }
            }
        }, {
            key: '_stopScrollHandler',
            value: function _stopScrollHandler() {
                if (this._isHandlingScroll) {
                    this._isHandlingScroll = false;
                    this._settings.container.removeEventListener("scroll", this._boundHandleScroll);
                }
            }
        }, {
            key: 'handleScroll',
            value: function handleScroll() {
                var throttle = this._settings.throttle;

                if (throttle !== 0) {
                    var getTime = function getTime() {
                        new Date().getTime();
                    };
                    var now = getTime();
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
                            this._previousLoopTime = getTime();
                            this._loopTimeout = null;
                            this._loopThroughElements();
                        }.bind(this), remainingTime);
                    }
                } else {
                    this._loopThroughElements();
                }
            }
        }, {
            key: 'update',
            value: function update() {
                // Converts to array the nodeset obtained querying the DOM from _queryOriginNode with elements_selector
                this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
                this._purgeElements();
                this._loopThroughElements();
                this._startScrollHandler();
            }
        }, {
            key: 'destroy',
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

    return LazyLoad;
});
