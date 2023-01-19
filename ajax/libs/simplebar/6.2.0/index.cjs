/**
 * simplebar - v6.2.0
 * Scrollbars, simpler.
 * https://grsmto.github.io/simplebar/
 *
 * Made by Adrien Denat from a fork by Jonathan Nicol
 * Under MIT License
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('can-use-dom'), require('simplebar-core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'can-use-dom', 'simplebar-core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SimpleBar = {}, global.canUseDOM, global.SimpleBar));
})(this, (function (exports, canUseDOM, SimpleBarCore) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var getOptions = SimpleBarCore.getOptions;
    var SimpleBar = /** @class */ (function (_super) {
        __extends(SimpleBar, _super);
        function SimpleBar() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            // // Save a reference to the instance, so we know this DOM node has already been instancied
            SimpleBar.instances.set(args[0], _this);
            return _this;
        }
        SimpleBar.initDOMLoadedElements = function () {
            document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
            window.removeEventListener('load', this.initDOMLoadedElements);
            Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
                if (el.getAttribute('data-simplebar') !== 'init' &&
                    !SimpleBar.instances.has(el))
                    new SimpleBar(el, getOptions(el.attributes));
            });
        };
        SimpleBar.removeObserver = function () {
            var _a;
            (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        };
        SimpleBar.prototype.initDOM = function () {
            var _this = this;
            var _a, _b, _c;
            // make sure this element doesn't have the elements yet
            if (!Array.prototype.filter.call(this.el.children, function (child) {
                return child.classList.contains(_this.classNames.wrapper);
            }).length) {
                // Prepare DOM
                this.wrapperEl = document.createElement('div');
                this.contentWrapperEl = document.createElement('div');
                this.offsetEl = document.createElement('div');
                this.maskEl = document.createElement('div');
                this.contentEl = document.createElement('div');
                this.placeholderEl = document.createElement('div');
                this.heightAutoObserverWrapperEl = document.createElement('div');
                this.heightAutoObserverEl = document.createElement('div');
                this.wrapperEl.classList.add(this.classNames.wrapper);
                this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
                this.offsetEl.classList.add(this.classNames.offset);
                this.maskEl.classList.add(this.classNames.mask);
                this.contentEl.classList.add(this.classNames.contentEl);
                this.placeholderEl.classList.add(this.classNames.placeholder);
                this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl);
                this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl);
                while (this.el.firstChild) {
                    this.contentEl.appendChild(this.el.firstChild);
                }
                this.contentWrapperEl.appendChild(this.contentEl);
                this.offsetEl.appendChild(this.contentWrapperEl);
                this.maskEl.appendChild(this.offsetEl);
                this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
                this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
                this.wrapperEl.appendChild(this.maskEl);
                this.wrapperEl.appendChild(this.placeholderEl);
                this.el.appendChild(this.wrapperEl);
                (_a = this.contentWrapperEl) === null || _a === void 0 ? void 0 : _a.setAttribute('tabindex', '0');
                (_b = this.contentWrapperEl) === null || _b === void 0 ? void 0 : _b.setAttribute('role', 'region');
                (_c = this.contentWrapperEl) === null || _c === void 0 ? void 0 : _c.setAttribute('aria-label', this.options.ariaLabel);
            }
            if (!this.axis.x.track.el || !this.axis.y.track.el) {
                var track = document.createElement('div');
                var scrollbar = document.createElement('div');
                track.classList.add(this.classNames.track);
                scrollbar.classList.add(this.classNames.scrollbar);
                track.appendChild(scrollbar);
                this.axis.x.track.el = track.cloneNode(true);
                this.axis.x.track.el.classList.add(this.classNames.horizontal);
                this.axis.y.track.el = track.cloneNode(true);
                this.axis.y.track.el.classList.add(this.classNames.vertical);
                this.el.appendChild(this.axis.x.track.el);
                this.el.appendChild(this.axis.y.track.el);
            }
            SimpleBarCore.prototype.initDOM.call(this);
            this.el.setAttribute('data-simplebar', 'init');
        };
        SimpleBar.prototype.unMount = function () {
            SimpleBarCore.prototype.unMount.call(this);
            SimpleBar.instances["delete"](this.el);
        };
        SimpleBar.initHtmlApi = function () {
            this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
            // MutationObserver is IE11+
            if (typeof MutationObserver !== 'undefined') {
                // Mutation observer to observe dynamically added elements
                this.globalObserver = new MutationObserver(SimpleBar.handleMutations);
                this.globalObserver.observe(document, { childList: true, subtree: true });
            }
            // Taken from jQuery `ready` function
            // Instantiate elements already present on the page
            if (document.readyState === 'complete' || // @ts-ignore: IE specific
                (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
                // Handle it asynchronously to allow scripts the opportunity to delay init
                window.setTimeout(this.initDOMLoadedElements);
            }
            else {
                document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
                window.addEventListener('load', this.initDOMLoadedElements);
            }
        };
        SimpleBar.handleMutations = function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (addedNode) {
                    if (addedNode.nodeType === 1) {
                        if (addedNode.hasAttribute('data-simplebar')) {
                            !SimpleBar.instances.has(addedNode) &&
                                document.documentElement.contains(addedNode) &&
                                new SimpleBar(addedNode, getOptions(addedNode.attributes));
                        }
                        else {
                            addedNode
                                .querySelectorAll('[data-simplebar]')
                                .forEach(function (el) {
                                if (el.getAttribute('data-simplebar') !== 'init' &&
                                    !SimpleBar.instances.has(el) &&
                                    document.documentElement.contains(el))
                                    new SimpleBar(el, getOptions(el.attributes));
                            });
                        }
                    }
                });
                mutation.removedNodes.forEach(function (removedNode) {
                    if (removedNode.nodeType === 1) {
                        if (removedNode.getAttribute('data-simplebar') === 'init') {
                            SimpleBar.instances.has(removedNode) &&
                                !document.documentElement.contains(removedNode) &&
                                SimpleBar.instances.get(removedNode).unMount();
                        }
                        else {
                            Array.prototype.forEach.call(removedNode.querySelectorAll('[data-simplebar="init"]'), function (el) {
                                SimpleBar.instances.has(el) &&
                                    !document.documentElement.contains(el) &&
                                    SimpleBar.instances.get(el).unMount();
                            });
                        }
                    }
                });
            });
        };
        SimpleBar.instances = new WeakMap();
        return SimpleBar;
    }(SimpleBarCore));
    /**
     * HTML API
     * Called only in a browser env.
     */
    if (canUseDOM) {
        SimpleBar.initHtmlApi();
    }

    exports.default = SimpleBar;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
