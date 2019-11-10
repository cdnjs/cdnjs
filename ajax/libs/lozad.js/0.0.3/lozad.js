/*! lozad.js - v0.0.3 - 2017-09-05
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2017 Apoorv Saxena; Licensed MIT */

;(function() {

    const _Lozad = function(config) {
        this.config = config || {};
        this.config.selector = this.config.selector || '.lozad';
        this.config.rootMargin = this.config.rootMargin || '0px';
        this.config.threshold = this.config.threshold || 0;
        this.activate();
    };

    _Lozad.prototype.activate = function() {
        if (!window.IntersectionObserver) {
            loadAll.call(this);
        } else {
            if (this.observer) {
                this.observer.disconnect();
            }
            this.observer = new IntersectionObserver(onIntersection.bind(this), this.config);
            var elements = getElements.call(this);
            for (var i = 0; i < elements.length; i++) {
                if (!isLoaded(elements[i])) {
                    this.observer.observe(elements[i]);
                }
            }
        }
    };

    const getElements = function() {
        return document.querySelectorAll(this.config.selector);
    };

    const loadAll = function() {
        var elements = getElements.call(this);
        for (var i = 0; i < elements.length; i++) {
            if (!isLoaded(elements[i])) {
                this.load(elements[i]);
                markAsLoaded(elements[i]);
            }
        }
    };

    _Lozad.prototype.load = function(el) {
        el.src = el.dataset.src;
    };

    const markAsLoaded = function(el) {
        el.dataset.loaded = true;
    };

    const onIntersection = function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].intersectionRatio > 0) {
                this.observer.unobserve(entries[i].target);
                this.load(entries[i].target);
                markAsLoaded(entries[i].target);
            }
        }
    };

    const isLoaded = function(el) {
        return (el.dataset.loaded === "true");
    };

    // open to the world.
    // commonjs
    if (typeof exports === 'object') {
        module.exports = _Lozad;
    }
    // AMD module
    else if (typeof define === 'function' && define.amd) {
        define('Lozad', function() {
            return _Lozad;
        });
    }
    // Browser global
    else {
        window.Lozad = _Lozad;
    }

})();