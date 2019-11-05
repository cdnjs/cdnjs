/*!
  * Offcanvas v2.0.0-alpha.1 (https://github.com/quark-dev/Phonon-Framework)
  * Copyright 2015-2019 qathom
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Util = _interopDefault(require('../util.js'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var Component = (function () {
    function Component(name, defaultProps, props) {
        var _this = this;
        this.template = '';
        this.id = null;
        this.eventHandlers = [];
        this.registeredElements = [];
        this.name = name;
        var element = typeof props.element === 'string'
            ? document.querySelector(props.element) : props.element;
        var config = {};
        if (element) {
            var dataConfig = Util.Selector.attrConfig(element);
            if (dataConfig) {
                config = dataConfig;
            }
        }
        this.defaultProps = defaultProps;
        this.props = Object.assign(defaultProps, config, props, { element: element });
        this.id = this.uid();
        this.elementListener = function (event) { return _this.onBeforeElementEvent(event); };
        this.setEventsHandler();
    }
    Component.prototype.setTemplate = function (template) {
        this.template = template;
    };
    Component.prototype.getTemplate = function () {
        return this.template;
    };
    Component.prototype.getElement = function () {
        return this.getProp('element') || null;
    };
    Component.prototype.setElement = function (element) {
        this.props.element = element;
    };
    Component.prototype.getId = function () {
        return this.id;
    };
    Component.prototype.uid = function () {
        return Math.random().toString(36).substr(2, 10);
    };
    Component.prototype.getName = function () {
        return this.name;
    };
    Component.prototype.getProps = function () {
        return this.props;
    };
    Component.prototype.getProp = function (name) {
        var defaultValue = this.defaultProps[name];
        return typeof this.props[name] !== 'undefined' ? this.props[name] : defaultValue;
    };
    Component.prototype.setProps = function (props) {
        var componentProps = Object.assign({}, props);
        this.props = Object.assign(this.props, componentProps);
    };
    Component.prototype.setProp = function (name, value) {
        if (typeof this.props[name] === 'undefined') {
            throw new Error('Cannot set an invalid prop');
        }
        this.props[name] = value;
    };
    Component.prototype.registerElements = function (elements) {
        var _this = this;
        elements.forEach(function (element) { return _this.registerElement(element); });
    };
    Component.prototype.registerElement = function (element) {
        element.target.addEventListener(element.event, this.elementListener);
        this.registeredElements.push(element);
    };
    Component.prototype.unregisterElements = function () {
        var _this = this;
        this.registeredElements.forEach(function (element) {
            _this.unregisterElement(element);
        });
    };
    Component.prototype.unregisterElement = function (element) {
        var registeredElementIndex = this.registeredElements
            .findIndex(function (el) { return el.target === element.target && el.event === element.event; });
        if (registeredElementIndex > -1) {
            element.target.removeEventListener(element.event, this.elementListener);
            this.registeredElements.splice(registeredElementIndex, 1);
        }
        else {
            console.error('Warning! Could not remove element:'
                + ' ' + (element.target + " with event: " + element.event + "."));
        }
    };
    Component.prototype.triggerEvent = function (eventName, detail, objectEventOnly) {
        var _this = this;
        if (detail === void 0) { detail = {}; }
        if (objectEventOnly === void 0) { objectEventOnly = false; }
        var eventNameObject = eventName.split('.').reduce(function (acc, current, index) {
            if (index === 0) {
                return current;
            }
            return acc + current.charAt(0).toUpperCase() + current.slice(1);
        });
        var eventNameAlias = "on" + eventNameObject
            .charAt(0).toUpperCase() + eventNameObject.slice(1);
        var props = this.getProps();
        this.eventHandlers.forEach(function (scope) {
            if (typeof scope[eventNameObject] === 'function') {
                scope[eventNameObject].apply(_this, [detail]);
            }
            if (typeof scope[eventNameAlias] === 'function') {
                props[eventNameAlias].apply(_this, [detail]);
            }
        });
        if (objectEventOnly) {
            return;
        }
        var element = this.getElement();
        if (element) {
            Util.Dispatch.elementEvent(element, eventName, this.name, detail);
        }
        else {
            Util.Dispatch.winDocEvent(eventName, this.name, detail);
        }
    };
    Component.prototype.preventClosable = function () {
        return false;
    };
    Component.prototype.destroy = function () {
        this.unregisterElements();
    };
    Component.prototype.onElementEvent = function (event) {
    };
    Component.prototype.setEventsHandler = function () {
        var props = this.getProps();
        var scope = Object.keys(props).reduce(function (cur, key) {
            if (typeof props[key] === 'function') {
                cur[key] = props[key];
            }
            return cur;
        }, {});
        if (Object.keys(scope).length > 0) {
            this.eventHandlers.push(scope);
        }
    };
    Component.prototype.onBeforeElementEvent = function (event) {
        if (this.preventClosable()) {
            return;
        }
        this.onElementEvent(event);
    };
    return Component;
}());

var OffCanvas = (function (_super) {
    __extends(OffCanvas, _super);
    function OffCanvas(props) {
        var _this = _super.call(this, 'off-canvas', {
            toggle: false,
            closableKeyCodes: [27],
            container: document.body,
            setupContainer: true,
            aside: {
                md: false,
                lg: true,
                xl: true,
            },
        }, props) || this;
        _this.currentWidthName = null;
        _this.animate = true;
        _this.showAside = false;
        _this.directions = ['left', 'right'];
        _this.direction = null;
        _this.sizes = [];
        _this.backdropSelector = 'offcanvas-backdrop';
        var sm = { name: 'sm', media: window.matchMedia('(min-width: 1px)') };
        var md = { name: 'md', media: window.matchMedia('(min-width: 768px)') };
        var lg = { name: 'lg', media: window.matchMedia('(min-width: 992px)') };
        var xl = { name: 'xl', media: window.matchMedia('(min-width: 1200px)') };
        _this.sizes = [sm, md, lg, xl].reverse();
        _this.checkDirection();
        if (_this.getProp('setupContainer')) {
            _this.checkWidth();
        }
        var toggle = _this.getProp('toggle');
        if (toggle) {
            _this.toggle();
        }
        window.addEventListener('resize', function () { return _this.checkWidth(); }, false);
        return _this;
    }
    OffCanvas.attachDOM = function () {
        var className = 'offcanvas';
        Util.Observer.subscribe({
            componentClass: className,
            onAdded: function (element, create) {
                create(new OffCanvas({ element: element }));
            },
            onRemoved: function (element, remove) {
                remove('OffCanvas', element);
            },
        });
        document.addEventListener(Util.Event.CLICK, function (event) {
            var target = event.target;
            if (!target) {
                return;
            }
            var toggleEl = Util.Selector.closest(target, "[data-toggle=\"" + className + "\"]");
            if (toggleEl) {
                var selector = toggleEl.getAttribute('data-target');
                if (!selector) {
                    return;
                }
                var offCanvas = document.querySelector(selector);
                if (!offCanvas) {
                    return;
                }
                var offCanvasComponent = Util.Observer.getComponent(className, { element: offCanvas });
                if (!offCanvasComponent) {
                    return;
                }
                target.blur();
                offCanvasComponent.toggle();
            }
        });
    };
    OffCanvas.prototype.checkDirection = function () {
        var _this = this;
        var element = this.getElement();
        this.directions.every(function (direction) {
            if (element.classList.contains("offcanvas-" + direction)) {
                _this.direction = direction;
                return false;
            }
            return true;
        });
    };
    OffCanvas.prototype.checkWidth = function () {
        if (!('matchMedia' in window)) {
            return;
        }
        var size = this.sizes.find(function (s) {
            var mediaQuery = s.media;
            var match = mediaQuery.media.match(/[a-z]?-width:\s?([0-9]+)/);
            return match && mediaQuery.matches ? true : false;
        });
        if (!size) {
            return;
        }
        this.setAside(size.name);
    };
    OffCanvas.prototype.setAside = function (sizeName) {
        var container = this.getContainer();
        if (this.currentWidthName === sizeName || !container) {
            return;
        }
        this.currentWidthName = sizeName;
        var aside = this.getProp('aside');
        this.showAside = aside[sizeName] === true;
        if (aside[sizeName] === true) {
            if (!container.classList.contains("offcanvas-aside-" + this.direction)) {
                container.classList.add("offcanvas-aside-" + this.direction);
            }
            this.animate = false;
            if (this.getBackdrop()) {
                this.removeBackdrop();
            }
            var containerShowClass = this.getShowClass();
            if (this.isVisible() && !container.classList.contains(containerShowClass)) {
                container.classList.add(containerShowClass);
            }
            else if (!this.isVisible() && container.classList.contains(containerShowClass)) {
                container.classList.remove(containerShowClass);
            }
        }
        else {
            if (container.classList.contains("offcanvas-aside-" + this.direction)) {
                container.classList.remove("offcanvas-aside-" + this.direction);
            }
            this.animate = true;
            this.hide();
        }
    };
    OffCanvas.prototype.onElementEvent = function (event) {
        var closableKeyCodes = this.getProp('closableKeyCodes');
        if (event.type === 'keyup' && !closableKeyCodes.find(function (k) { return k === event.keyCode; })) {
            return;
        }
        this.hide();
    };
    OffCanvas.prototype.isVisible = function () {
        return this.getElement().classList.contains('show');
    };
    OffCanvas.prototype.show = function () {
        var _this = this;
        if (this.getElement().classList.contains('show')) {
            return false;
        }
        this.triggerEvent(Util.Event.SHOW);
        if (!this.showAside) {
            this.createBackdrop();
        }
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var onShown, container, containerShowClass, el;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Util.sleep(20)];
                    case 1:
                        _a.sent();
                        this.attachEvents();
                        onShown = function () {
                            _this.triggerEvent(Util.Event.SHOWN);
                            if (_this.animate) {
                                var element = _this.getElement();
                                element.removeEventListener(Util.Event.TRANSITION_END, onShown);
                                element.classList.remove('animate');
                            }
                        };
                        if (this.showAside) {
                            container = this.getContainer();
                            containerShowClass = this.getShowClass();
                            if (container && !container.classList.contains(containerShowClass)) {
                                container.classList.add(containerShowClass);
                            }
                        }
                        el = this.getElement();
                        if (this.animate) {
                            el.addEventListener(Util.Event.TRANSITION_END, onShown);
                            el.classList.add('animate');
                        }
                        else {
                            onShown();
                        }
                        el.classList.add('show');
                        return [2];
                }
            });
        }); })();
        return true;
    };
    OffCanvas.prototype.hide = function () {
        var _this = this;
        var element = this.getElement();
        if (!element.classList.contains('show')) {
            return false;
        }
        this.triggerEvent(Util.Event.HIDE);
        this.detachEvents();
        if (this.animate) {
            element.classList.add('animate');
        }
        element.classList.remove('show');
        if (this.showAside) {
            var container = this.getContainer();
            var containerShowClass = this.getShowClass();
            if (container && container.classList.contains(containerShowClass)) {
                container.classList.remove(containerShowClass);
            }
        }
        if (!this.showAside) {
            var backdrop_1 = this.getBackdrop();
            if (!backdrop_1) {
                return true;
            }
            var onHidden_1 = function () {
                if (_this.animate) {
                    element.classList.remove('animate');
                }
                backdrop_1.removeEventListener(Util.Event.TRANSITION_END, onHidden_1);
                _this.triggerEvent(Util.Event.HIDDEN);
                _this.removeBackdrop();
            };
            if (backdrop_1) {
                backdrop_1.addEventListener(Util.Event.TRANSITION_END, onHidden_1);
                backdrop_1.classList.add('fadeout');
            }
        }
        return true;
    };
    OffCanvas.prototype.toggle = function () {
        if (this.isVisible()) {
            return this.hide();
        }
        return this.show();
    };
    OffCanvas.prototype.createBackdrop = function () {
        var backdrop = document.createElement('div');
        var id = this.getId();
        if (id) {
            backdrop.setAttribute('data-id', id);
        }
        backdrop.classList.add(this.backdropSelector);
        var container = this.getContainer();
        if (container) {
            container.appendChild(backdrop);
        }
    };
    OffCanvas.prototype.getBackdrop = function () {
        return document.querySelector("." + this.backdropSelector + "[data-id=\"" + this.getId() + "\"]");
    };
    OffCanvas.prototype.removeBackdrop = function () {
        var backdrop = this.getBackdrop();
        if (backdrop && backdrop.parentNode) {
            backdrop.parentNode.removeChild(backdrop);
        }
    };
    OffCanvas.prototype.attachEvents = function () {
        var _this = this;
        var element = this.getElement();
        Array.from(element.querySelectorAll('[data-dismiss]') || [])
            .forEach(function (button) { return _this.registerElement({
            target: button,
            event: Util.Event.CLICK,
        }); });
        var backdrop = this.getBackdrop();
        if (!this.showAside && backdrop) {
            this.registerElement({ target: backdrop, event: Util.Event.START });
        }
        this.registerElement({ target: document, event: 'keyup' });
    };
    OffCanvas.prototype.detachEvents = function () {
        var _this = this;
        var element = this.getElement();
        var dismissButtons = element.querySelectorAll('[data-dismiss]');
        if (dismissButtons) {
            Array
                .from(dismissButtons)
                .forEach(function (button) { return _this.unregisterElement({
                target: button,
                event: Util.Event.CLICK,
            }); });
        }
        var backdrop = this.getBackdrop();
        if (!this.showAside && backdrop) {
            this.unregisterElement({ target: backdrop, event: Util.Event.START });
        }
        this.unregisterElement({ target: document, event: 'keyup' });
    };
    OffCanvas.prototype.getContainer = function () {
        var container = this.getProp('container');
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        return container;
    };
    OffCanvas.prototype.getShowClass = function () {
        return "show-" + this.direction;
    };
    return OffCanvas;
}(Component));
OffCanvas.attachDOM();

module.exports = OffCanvas;
//# sourceMappingURL=offcanvas.js.map
