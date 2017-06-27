(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.LazyLoad = factory();
    }
}(window, function () {

    const _isBot = !("onscroll" in window) || /glebot/.test(navigator.userAgent);

    const _getTopOffset = function (element) {
        return element.getBoundingClientRect().top + window.pageYOffset - element.ownerDocument.documentElement.clientTop;
    };

    const _isBelowViewport = function (element, container, threshold) {
        const fold = (container === window) ?
            window.innerHeight + window.pageYOffset :
            _getTopOffset(container) + container.offsetHeight;
        return fold <= _getTopOffset(element) - threshold;
    };

    const _getLeftOffset = function (element) {
        return element.getBoundingClientRect().left + window.pageXOffset - element.ownerDocument.documentElement.clientLeft;
    };

    const _isAtRightOfViewport = function (element, container, threshold) {
        const documentWidth = window.innerWidth;
        const fold = (container === window) ?
            documentWidth + window.pageXOffset :
            _getLeftOffset(container) + documentWidth;
        return fold <= _getLeftOffset(element) - threshold;
    };

    const _isAboveViewport = function (element, container, threshold) {
        const fold = (container === window) ? window.pageYOffset : _getTopOffset(container);
        return fold >= _getTopOffset(element) + threshold + element.offsetHeight;
    };

    const _isAtLeftOfViewport = function (element, container, threshold) {
        const fold = (container === window) ? window.pageXOffset : _getLeftOffset(container);
        return fold >= _getLeftOffset(element) + threshold + element.offsetWidth;
    };

    const _isInsideViewport = function (element, container, threshold) {
        return !_isBelowViewport(element, container, threshold) &&
            !_isAboveViewport(element, container, threshold) &&
            !_isAtRightOfViewport(element, container, threshold) &&
            !_isAtLeftOfViewport(element, container, threshold);
    };

    const _callCallback = function (callback, argument) {
        if (callback) { callback(argument); }
    };

    /* Creates instance and notifies it through the window element */
    const _createInstance = function(options) {
        let instance = new LazyLoad(options);
        let event = new CustomEvent("LazyLoad::Initialized", {detail: {instance}});
        window.dispatchEvent(event);
    };

    /* Auto initialization of one or more instances of lazyload, depending on the 
       options passed in (plain object or an array) */
    const _autoInitialize = function(options) {
        let optsLength = options.length;
        if (!optsLength) {
            // Plain object
            _createInstance(options);
        }
        else {
            // Array of objects
            for (let i=0; i<optsLength; i++) {
                _createInstance(options[i]);
            }
        }
    };

    const _defaultSettings = {
        elements_selector: "img",
        container: window,
        threshold: 300,
        throttle: 150,
        data_src: "original",
        data_srcset: "original-set",
        class_loading: "loading",
        class_loaded: "loaded",
        class_error: "error",
        class_initial: "initial",
        skip_invisible: true,
        callback_load: null,
        callback_error: null,
        callback_set: null,
        callback_processed: null
    };

    class LazyLoad {
        constructor(instanceSettings) {
            this._settings = Object.assign({}, _defaultSettings, instanceSettings);
            this._queryOriginNode = this._settings.container === window ? document : this._settings.container;
            
            this._previousLoopTime = 0;
            this._loopTimeout = null;
            this._boundHandleScroll = this.handleScroll.bind(this);

            this._isFirstLoop = true;
            window.addEventListener("resize", this._boundHandleScroll);
            this.update();
        }

        _setSourcesForPicture(element, srcsetDataAttribute) {
            const parent = element.parentElement;
            if (parent.tagName !== "PICTURE") {
                return;
            }
            for (let i = 0; i < parent.children.length; i++) {
                let pictureChild = parent.children[i];
                if (pictureChild.tagName === "SOURCE") {
                    let sourceSrcset = pictureChild.getAttribute("data-" + srcsetDataAttribute);
                    if (sourceSrcset) {
                        pictureChild.setAttribute("srcset", sourceSrcset);
                    }
                }
            }
        }

        _setSources(element, srcsetDataAttribute, srcDataAttribute) {
            const tagName = element.tagName;
            const elementSrc = element.getAttribute("data-" + srcDataAttribute);
            if (tagName === "IMG") {
                this._setSourcesForPicture(element, srcsetDataAttribute);
                const imgSrcset = element.getAttribute("data-" + srcsetDataAttribute);
                if (imgSrcset) { element.setAttribute("srcset", imgSrcset); }
                if (elementSrc) { element.setAttribute("src", elementSrc); }
                return;
            }
            if (tagName === "IFRAME") {
                if (elementSrc) { element.setAttribute("src", elementSrc); }
                return;
            }
            if (elementSrc) { element.style.backgroundImage = "url(" + elementSrc + ")"; }
        }

        _showOnAppear(element) {
            const settings = this._settings;

            const errorCallback = function () {
                /* As this method is asynchronous, it must be protected against external destroy() calls */
                if (!settings) { return; }
                element.removeEventListener("load", loadCallback);
                element.removeEventListener("error", errorCallback);
                element.classList.remove(settings.class_loading);
                element.classList.add(settings.class_error);
                _callCallback(settings.callback_error, element);
            };

            const loadCallback = function () {
                /* As this method is asynchronous, it must be protected against external destroy() calls */
                if (!settings) { return; }
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

        _loopThroughElements() {
            const settings = this._settings,
                elements = this._elements,
                elementsLength = (!elements) ? 0 : elements.length;
            let i,
                processedIndexes = [],
                firstLoop = this._isFirstLoop;

            for (i = 0; i < elementsLength; i++) {
                let element = elements[i];
                /* If must skip_invisible and element is invisible, skip it */
                if (settings.skip_invisible && (element.offsetParent === null)) {
                    continue;
                }
                
                if (_isBot || _isInsideViewport(element, settings.container, settings.threshold)) {
                    if (firstLoop) {
                        element.classList.add(settings.class_initial);
                    }
                    /* Start loading the image */
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
            /* Sets isFirstLoop to false */
            if (firstLoop) {
                this._isFirstLoop = false;
            }
        }

        _purgeElements() {
            const elements = this._elements,
                elementsLength = elements.length;
            let i,
                elementsToPurge = [];

            for (i = 0; i < elementsLength; i++) {
                let element = elements[i];
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

        _startScrollHandler() {
            if (!this._isHandlingScroll) {
                this._isHandlingScroll = true;
                this._settings.container.addEventListener("scroll", this._boundHandleScroll);
            }
        }

        _stopScrollHandler() {
            if (this._isHandlingScroll) {
                this._isHandlingScroll = false;
                this._settings.container.removeEventListener("scroll", this._boundHandleScroll);
            }
        }


        handleScroll() {
            const throttle = this._settings.throttle;

            if (throttle !== 0) {
                const getTime = () => { (new Date()).getTime(); };
                let now = getTime();
                let remainingTime = throttle - (now - this._previousLoopTime);
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

        update() {
            // Converts to array the nodeset obtained querying the DOM from _queryOriginNode with elements_selector
            this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
            this._purgeElements();
            this._loopThroughElements();
            this._startScrollHandler();
        }

        destroy() {
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
    }

    /* Automatic instances creation if required (useful for async script loading!) */
    let autoInitOptions = window.lazyLoadOptions;
    if (autoInitOptions) { _autoInitialize(autoInitOptions); }
    
    return LazyLoad;

}));
