/**
 * simplebar - v6.0.0-beta.10
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

    var SimpleBar = /** @class */ (function (_super) {
        __extends(SimpleBar, _super);
        function SimpleBar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SimpleBar.initDOMLoadedElements = function () {
            document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
            window.removeEventListener('load', this.initDOMLoadedElements);
            Array.prototype.forEach.call(document.querySelectorAll('[data-simplebar]'), function (el) {
                if (el.getAttribute('data-simplebar') !== 'init' &&
                    !SimpleBar.instances.has(el))
                    new SimpleBar(el, SimpleBarCore.getOptions(el.attributes));
            });
        };
        SimpleBar.prototype.removeObserver = function () {
            var _a;
            (_a = SimpleBar.globalObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
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
                Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
                    if (addedNode.nodeType === 1) {
                        if (addedNode.hasAttribute('data-simplebar')) {
                            !SimpleBar.instances.has(addedNode) &&
                                document.documentElement.contains(addedNode) &&
                                new SimpleBar(addedNode, SimpleBarCore.getOptions(addedNode.attributes));
                        }
                        else {
                            Array.prototype.forEach.call(addedNode.querySelectorAll('[data-simplebar]'), function (el) {
                                if (el.getAttribute('data-simplebar') !== 'init' &&
                                    !SimpleBar.instances.has(el) &&
                                    document.documentElement.contains(el))
                                    new SimpleBar(el, SimpleBarCore.getOptions(el.attributes));
                            });
                        }
                    }
                });
                Array.prototype.forEach.call(mutation.removedNodes, function (removedNode) {
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
