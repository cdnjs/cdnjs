import defaultSettings from "./lazyload.defaults";
import {isBot, callCallback} from "./lazyload.utils";
import isInsideViewport from "./lazyload.viewport";
import autoInitialize from "./lazyload.autoInitialize";
import setSources from "./lazyload.setSources";

/*
 * Constructor
 */ 

const LazyLoad = function(instanceSettings) {
    this._settings = Object.assign({}, defaultSettings, instanceSettings);
    this._queryOriginNode = this._settings.container === window ? document : this._settings.container;
    
    this._previousLoopTime = 0;
    this._loopTimeout = null;
    this._boundHandleScroll = this.handleScroll.bind(this);

    this._isFirstLoop = true;
    window.addEventListener("resize", this._boundHandleScroll);
    this.update();
};

LazyLoad.prototype = {
    
    /*
     * Private methods
     */

    _reveal: function (element) {
        const settings = this._settings;

        const errorCallback = function () {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (!settings) { return; }
            element.removeEventListener("load", loadCallback);
            element.removeEventListener("error", errorCallback);
            element.classList.remove(settings.class_loading);
            element.classList.add(settings.class_error);
            callCallback(settings.callback_error, element);
        };

        const loadCallback = function () {
            /* As this method is asynchronous, it must be protected against external destroy() calls */
            if (!settings) { return; }
            element.classList.remove(settings.class_loading);
            element.classList.add(settings.class_loaded);
            element.removeEventListener("load", loadCallback);
            element.removeEventListener("error", errorCallback);
            /* Calling LOAD callback */
            callCallback(settings.callback_load, element);
        };

        if (element.tagName === "IMG" || element.tagName === "IFRAME") {
            element.addEventListener("load", loadCallback);
            element.addEventListener("error", errorCallback);
            element.classList.add(settings.class_loading);
        }

        setSources(element, settings.data_srcset, settings.data_src);
        /* Calling SET callback */
        callCallback(settings.callback_set, element);
    },

    _loopThroughElements: function () {
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
            
            if (isBot || isInsideViewport(element, settings.container, settings.threshold)) {
                if (firstLoop) {
                    element.classList.add(settings.class_initial);
                }
                /* Start loading the image */
                this._reveal(element);
                /* Marking the element as processed. */
                processedIndexes.push(i);
                element.dataset.wasProcessed = true;
            }
        }
        /* Removing processed elements from this._elements. */
        while (processedIndexes.length > 0) {
            elements.splice(processedIndexes.pop(), 1);
            /* Calling the end loop callback */
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

    _purgeElements: function () {
        const elements = this._elements,
            elementsLength = elements.length;
        let i,
            elementsToPurge = [];

        for (i = 0; i < elementsLength; i++) {
            let element = elements[i];
            /* If the element has already been processed, skip it */
            if (element.dataset.wasProcessed) {
                elementsToPurge.push(i);
            }
        }
        /* Removing elements to purge from this._elements. */
        while (elementsToPurge.length > 0) {
            elements.splice(elementsToPurge.pop(), 1);
        }
    },

    _startScrollHandler: function () {
        if (!this._isHandlingScroll) {
            this._isHandlingScroll = true;
            this._settings.container.addEventListener("scroll", this._boundHandleScroll);
        }
    },

    _stopScrollHandler: function () {
        if (this._isHandlingScroll) {
            this._isHandlingScroll = false;
            this._settings.container.removeEventListener("scroll", this._boundHandleScroll);
        }
    },

    /* 
     * Public methods
     */

    handleScroll: function () {
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
    },

    update: function () {
        // Converts to array the nodeset obtained querying the DOM from _queryOriginNode with elements_selector
        this._elements = Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector));
        this._purgeElements();
        this._loopThroughElements();
        this._startScrollHandler();
    },

    destroy: function () {
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
if (autoInitOptions) { 
    autoInitialize(LazyLoad, autoInitOptions);
}

export default LazyLoad;