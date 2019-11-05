/*!
  * Phonon v2.0.0-alpha.1 (https://github.com/quark-dev/Phonon-Framework)
  * Copyright 2015-2019 qathom
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.phonon = factory());
}(this, function () { 'use strict';

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

    function elementEvent(domElement, eventName, moduleName, detail) {
        if (detail === void 0) { detail = {}; }
        var fullEventName = eventName + ".ph." + moduleName;
        domElement.dispatchEvent(new CustomEvent(fullEventName, { detail: detail }));
    }
    function pageEvent(eventName, pageName, detail) {
        if (detail === void 0) { detail = {}; }
        var fullEventName = pageName + "." + eventName;
        window.dispatchEvent(new CustomEvent(fullEventName, { detail: detail }));
        document.dispatchEvent(new CustomEvent(fullEventName, { detail: detail }));
    }
    function winDocEvent(eventName, moduleName, detail) {
        if (detail === void 0) { detail = {}; }
        var fullEventName = eventName + ".ph." + moduleName;
        window.dispatchEvent(new CustomEvent(fullEventName, { detail: detail }));
        document.dispatchEvent(new CustomEvent(fullEventName, { detail: detail }));
    }
    var dispatch = {
        elementEvent: elementEvent,
        pageEvent: pageEvent,
        winDocEvent: winDocEvent,
    };

    function onError() {
        if (typeof window === 'undefined') {
            return;
        }
        window.addEventListener('error', function (event) {
            console.error('-- Phonon Error --');
            console.error('An error has occured!'
                + ' ' + 'You can pen an issue here: https://github.com/quark-dev/Phonon-Framework/issues');
            console.error(JSON.stringify(event));
        });
    }

    var availableEvents = ['mousedown', 'mousemove', 'mouseup'];
    var touchScreen = false;
    if (typeof window !== 'undefined') {
        if (('ontouchstart' in window) || window.DocumentTouch
            && document instanceof window.DocumentTouch) {
            touchScreen = true;
            availableEvents = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        }
        if (window.navigator.pointerEnabled) {
            availableEvents = ['pointerdown', 'pointermove', 'pointerup', 'pointercancel'];
        }
        else if (window.navigator.msPointerEnabled) {
            availableEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel'];
        }
    }
    var transitions = [
        { name: 'transition', start: 'transitionstart', end: 'transitionend' },
        { name: 'MozTransition', start: 'transitionstart', end: 'transitionend' },
        { name: 'msTransition', start: 'msTransitionStart', end: 'msTransitionEnd' },
        { name: 'WebkitTransition', start: 'webkitTransitionStart', end: 'webkitTransitionEnd' },
    ];
    var animations = [
        { name: 'animation', start: 'animationstart', end: 'animationend' },
        { name: 'MozAnimation', start: 'animationstart', end: 'animationend' },
        { name: 'msAnimation', start: 'msAnimationStart', end: 'msAnimationEnd' },
        { name: 'WebkitAnimation', start: 'webkitAnimationStart', end: 'webkitAnimationEnd' },
    ];
    var el = window.document.createElement('div');
    var transition = transitions.find(function (t) { return typeof el.style[t.name] !== 'undefined'; });
    var animation = animations.find(function (t) { return typeof el.style[t.name] !== 'undefined'; });
    var transitionStart = transition ? transition.start : 'transitionstart';
    var transitionEnd = transition ? transition.end : 'transitionend';
    var animationStart = animation ? animation.start : 'animationstart';
    var animationEnd = animation ? animation.end : 'animationend';
    var events = {
        TOUCH_SCREEN: touchScreen,
        NETWORK_ONLINE: 'online',
        NETWORK_OFFLINE: 'offline',
        NETWORK_RECONNECTING: 'reconnecting',
        NETWORK_RECONNECTING_SUCCESS: 'reconnect.success',
        NETWORK_RECONNECTING_FAILURE: 'reconnect.failure',
        SHOW: 'show',
        SHOWN: 'shown',
        HIDE: 'hide',
        HIDDEN: 'hidden',
        HASH: 'hash',
        START: availableEvents[0],
        MOVE: availableEvents[1],
        END: availableEvents[2],
        CANCEL: typeof availableEvents[3] === 'undefined' ? null : availableEvents[3],
        CLICK: 'click',
        TRANSITION_START: transitionStart,
        TRANSITION_END: transitionEnd,
        ANIMATION_START: animationStart,
        ANIMATION_END: animationEnd,
        ITEM_SELECTED: 'itemSelected',
    };

    function closest(element, selector) {
        if (!Element.prototype.matches) ;
        var el = element;
        do {
            if (el.matches(selector)) {
                return el;
            }
            el = (el.parentElement || el.parentNode);
        } while (el !== null && el.nodeType === 1);
        return null;
    }
    function attrConfig(element) {
        if (!element) {
            return null;
        }
        var attr = element.getAttribute('data-config');
        if (!attr) {
            return null;
        }
        try {
            var config = JSON.parse(attr);
            return config;
        }
        catch (e) {
        }
        var keys = (attr.match(/(\w+)\s*:\s*(["'])?/igm) || [])
            .map(function (e) { return e.replace(/(\w+)\s*:\s*(["'])?/igm, '$1'); });
        var values = attr.match(/[^:]+(?=,|$)/igm) || [];
        var json = {};
        keys.forEach(function (key, i) {
            var value = values[i].replace(/ /g, '').replace(/\'|"/g, '');
            var convertedValue = '';
            if (value === 'true' || value === 'false') {
                convertedValue = value === 'true';
            }
            else if (!isNaN(value)) {
                convertedValue = parseFloat(value);
            }
            else {
                convertedValue = value;
            }
            json[key] = convertedValue;
        });
        return json;
    }
    function removeClasses(element, classList, prefix) {
        if (prefix === void 0) { prefix = null; }
        classList.forEach(function (className) {
            var cName = prefix ? prefix + "-" + className : className;
            if (element.classList.contains(cName)) {
                element.classList.remove(cName);
            }
        });
    }
    function isElement(node) {
        return node.nodeType === 1
            && typeof node.className === 'string';
    }
    var selector = {
        attrConfig: attrConfig,
        removeClasses: removeClasses,
        closest: closest,
        isElement: isElement,
    };

    var components = {};
    function getName(component) {
        if (typeof component === 'string') {
            return component.toLowerCase();
        }
        return component.constructor.name.toLowerCase();
    }
    function addComponent(component) {
        var name = getName(component);
        if (!components[name]) {
            components[name] = [];
        }
        components[name].push(component);
    }
    function removeComponent(componentName, element) {
        var name = getName(componentName);
        var index = (components[name] || []).findIndex(function (c) { return c.getElement() === element; });
        if (index === -1) {
            return;
        }
        var component = components[name][index];
        component.destroy();
        components[name].splice(index, 1);
    }
    function getComponent(component, options) {
        var className = getName(component);
        var element = options.element;
        if (!element) {
            return null;
        }
        var selector = typeof element === 'string' ? document.querySelector(element) : element;
        var existingComponent = (components[className] || [])
            .find(function (c) { return c.getElement() === selector; });
        if (!existingComponent) {
            return null;
        }
        if (options) {
            existingComponent.setProps(options);
        }
        return existingComponent;
    }
    var stack = {
        addComponent: addComponent,
        getComponent: getComponent,
        removeComponent: removeComponent,
    };

    var mutatorSubscribers = [];
    function subscribe(subscriber) {
        mutatorSubscribers.push(subscriber);
        if (document.body) {
            Array.from(document.body.querySelectorAll("." + subscriber.componentClass) || [])
                .filter(function (component) { return component.getAttribute('data-no-boot') === null; })
                .forEach(function (component) {
                dispatchChangeEvent(subscriber, 'onAdded', component, stack.addComponent);
            });
        }
    }
    function dispatchChangeEvent(subscriber, eventName) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var callback = subscriber[eventName];
        if (!callback) {
            return;
        }
        callback.apply(callback, args);
    }
    function nodeFn(element, added) {
        if (added === void 0) { added = true; }
        if (element.getAttribute('data-no-boot') !== null) {
            return;
        }
        var elementClasses = element.className.split(' ');
        var subscriber = mutatorSubscribers.find(function (l) { return elementClasses.indexOf(l.componentClass) > -1; });
        if (!subscriber) {
            return;
        }
        var eventName = added ? 'onAdded' : 'onRemoved';
        var args = added ? [element, stack.addComponent] : [element, stack.removeComponent];
        dispatchChangeEvent.apply(void 0, [subscriber, eventName].concat(args));
    }
    function apply(node, added) {
        if (added === void 0) { added = true; }
        nodeFn(node, added);
        var nextNode = node.firstElementChild;
        while (nextNode) {
            var next = nextNode.nextElementSibling;
            if (isElement(nextNode)) {
                apply(nextNode, added);
            }
            nextNode = next;
        }
    }
    function getElements(nodes) {
        return Array
            .from(nodes)
            .filter(function (node) { return isElement(node); });
    }
    function observe() {
        (new MutationObserver(function (mutations) { return mutations.forEach(function (mutation) {
            if (mutation.type === 'attributes') {
                return;
            }
            var addedNodes = mutation.addedNodes, removedNodes = mutation.removedNodes;
            getElements(addedNodes).forEach(function (node) { return apply(node, true); });
            getElements(removedNodes).forEach(function (node) { return apply(node, false); });
        }); })).observe(document, {
            childList: true,
            subtree: true,
            characterData: true,
            attributes: true,
        });
    }
    function boot() {
        if (!('MutationObserver' in window)) {
            return;
        }
        if (document.body) {
            observe();
        }
        else {
            var obs_1 = new MutationObserver(function () {
                if (document.body) {
                    obs_1.disconnect();
                    observe();
                }
            });
            obs_1.observe(document, { childList: true, subtree: true });
        }
    }
    boot();
    var observer = {
        subscribe: subscribe,
        getComponent: stack.getComponent,
    };

    var sleep = (function (timeout) {
        return new Promise(function (resolve) {
            setTimeout(resolve, timeout);
        });
    });

    onError();
    var utils = {
        sleep: sleep,
        Event: events,
        Dispatch: dispatch,
        Selector: selector,
        Observer: observer,
    };

    /*
     * Fix module resolution error with Typescript (for CommonJS components in dist/)
     * by creating util.js
     * Current fix is to add explicit .js extension in all components (accordion.ts, modal.ts, etc.)
     *
     * Resources:
     * https://www.typescriptlang.org/docs/handbook/module-resolution.html
     * https://github.com/Microsoft/TypeScript/issues/16577
     */

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
                var dataConfig = utils.Selector.attrConfig(element);
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
                utils.Dispatch.elementEvent(element, eventName, this.name, detail);
            }
            else {
                utils.Dispatch.winDocEvent(eventName, this.name, detail);
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

    var Collapse = (function (_super) {
        __extends(Collapse, _super);
        function Collapse(props) {
            if (props === void 0) { props = { toggle: false }; }
            var _this = _super.call(this, 'collapse', { toggle: false }, props) || this;
            var toggle = _this.getProp('toggle');
            if (toggle) {
                _this.toggle();
            }
            return _this;
        }
        Collapse.attachDOM = function () {
            var className = 'collapse';
            utils.Observer.subscribe({
                componentClass: className,
                onAdded: function (element, create) {
                    create(new Collapse({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Collapse', element);
                },
            });
            document.addEventListener(utils.Event.CLICK, function (event) {
                if (!event.target) {
                    return;
                }
                var target = utils.Selector.closest(event.target, '[data-toggle]');
                if (!target) {
                    return;
                }
                var dataToggleAttr = target.getAttribute('data-toggle');
                if (dataToggleAttr && dataToggleAttr === className) {
                    var id = target.getAttribute('data-target') || target.getAttribute('href');
                    if (!id) {
                        return;
                    }
                    event.preventDefault();
                    var collapse = document.querySelector(id);
                    if (!collapse) {
                        return;
                    }
                    var collapseComponent = utils.Observer.getComponent(className, { element: collapse });
                    if (!collapseComponent) {
                        return;
                    }
                    collapseComponent.toggle({ element: collapse, toggle: true });
                }
            });
        };
        Collapse.prototype.getHeight = function () {
            return this.getElement().getBoundingClientRect(this.getElement()).height;
        };
        Collapse.prototype.toggle = function () {
            if (this.isVisible()) {
                return this.hide();
            }
            return this.show();
        };
        Collapse.prototype.show = function () {
            var _this = this;
            var element = this.getElement();
            if (element.classList.contains('collapsing') || this.isVisible()) {
                return false;
            }
            this.triggerEvent(utils.Event.SHOW);
            var onCollapsed = function () {
                _this.triggerEvent(utils.Event.SHOWN);
                element.classList.add('show');
                element.classList.remove('collapsing');
                element.removeEventListener(utils.Event.TRANSITION_END, onCollapsed);
                element.setAttribute('aria-expanded', true);
                element.style.height = 'auto';
            };
            if (!element.classList.contains('collapsing')) {
                element.classList.add('collapsing');
            }
            element.addEventListener(utils.Event.TRANSITION_END, onCollapsed);
            var height = this.getHeight();
            element.style.height = '0px';
            setTimeout(function () {
                element.style.height = height + "px";
            }, 20);
            return true;
        };
        Collapse.prototype.hide = function () {
            var _this = this;
            var element = this.getElement();
            if (element.classList.contains('collapsing')) {
                return false;
            }
            if (!element.classList.contains('show')) {
                return false;
            }
            this.triggerEvent(utils.Event.HIDE);
            var onCollapsed = function () {
                _this.triggerEvent(utils.Event.HIDDEN);
                element.classList.remove('collapsing');
                element.style.height = 'auto';
                element.removeEventListener(utils.Event.TRANSITION_END, onCollapsed);
                element.setAttribute('aria-expanded', false);
            };
            element.style.height = element.offsetHeight + "px";
            setTimeout(function () {
                element.style.height = '0px';
            }, 20);
            element.addEventListener(utils.Event.TRANSITION_END, onCollapsed);
            if (!element.classList.contains('collapsing')) {
                element.classList.add('collapsing');
            }
            element.classList.remove('show');
            return true;
        };
        Collapse.prototype.isVisible = function () {
            return this.getElement().classList.contains('show');
        };
        return Collapse;
    }(Component));
    Collapse.attachDOM();

    var Accordion = (function (_super) {
        __extends(Accordion, _super);
        function Accordion(props) {
            var _this = _super.call(this, 'accordion', { multiple: false }, props) || this;
            _this.collapses = [];
            var element = _this.getElement();
            var toggles = Array
                .from(element.querySelectorAll('[data-toggle="accordion"]') || []);
            toggles.forEach(function (toggle) {
                var collapseId = toggle.getAttribute('href') || toggle.getAttribute('data-target');
                if (collapseId === null) {
                    throw new Error('Accordion: collapse is missing href or data-target attribute');
                }
                var collapse = document.querySelector(collapseId);
                if (collapse) {
                    _this.addCollapse(collapse);
                }
            });
            _this.registerElement({ target: element, event: utils.Event.CLICK });
            return _this;
        }
        Accordion.attachDOM = function () {
            utils.Observer.subscribe({
                componentClass: 'accordion',
                onAdded: function (element, create) {
                    create(new Accordion({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Accordion', element);
                },
            });
        };
        Accordion.prototype.addCollapse = function (element) {
            var collapse = new Collapse({
                element: element,
            });
            this.collapses.push(collapse);
            return collapse;
        };
        Accordion.prototype.getCollapse = function (element) {
            var el = this.getElement();
            var collapse = this.collapses.find(function (c) { return el.getAttribute('id') === element.getAttribute('id'); });
            if (!collapse) {
                collapse = this.addCollapse(element);
            }
            return collapse;
        };
        Accordion.prototype.getCollapses = function () {
            return this.collapses;
        };
        Accordion.prototype.setCollapses = function (showCollapse) {
            var _this = this;
            var element = this.getElement();
            var collapse = this.getCollapse(showCollapse);
            var multipleOpen = this.getProp('multiple');
            if (!multipleOpen) {
                this.collapses.filter(function (c) { return c.getElement() !== collapse.getElement(); }).forEach(function (c) {
                    _this.toggleIcon(c.getElement(), 'icon-minus', 'icon-plus');
                    c.hide();
                });
            }
            var v = collapse.isVisible();
            this.toggleIcon(collapse.getElement(), v ? 'icon-minus' : 'icon-plus', v ? 'icon-plus' : 'icon-minus');
            collapse.toggle();
        };
        Accordion.prototype.onElementEvent = function (event) {
            var target = event.target;
            var toggleEl = utils.Selector.closest(target, '[data-toggle="accordion"]');
            if (!toggleEl) {
                return;
            }
            var collapseId = toggleEl.getAttribute('data-target') || toggleEl.getAttribute('href');
            if (!collapseId) {
                return;
            }
            var collapseEl = document.querySelector(collapseId);
            var accordion = utils.Selector.closest(toggleEl, '.accordion');
            if (!accordion || !collapseEl) {
                return;
            }
            event.preventDefault();
            this.show(collapseEl);
        };
        Accordion.prototype.toggleIcon = function (collapse, remove, add) {
            var id = collapse.getAttribute('id');
            var selector = "[data-toggle=\"accordion\"][href=\"#" + id + "\"] .collapse-toggle";
            var iconEl = document.querySelector(selector);
            if (!iconEl) {
                return;
            }
            if (iconEl.classList.contains(remove)) {
                iconEl.classList.remove(remove);
                iconEl.classList.add(add);
            }
        };
        Accordion.prototype.show = function (collapseEl) {
            var collapse = collapseEl;
            if (typeof collapseEl === 'string') {
                collapse = document.querySelector(collapseEl);
            }
            if (!collapse) {
                throw new Error("The collapsible " + collapseEl + " is an invalid HTMLElement.");
            }
            this.setCollapses(collapse);
            return true;
        };
        Accordion.prototype.hide = function (collapseEl) {
            var collapse = collapseEl;
            if (typeof collapseEl === 'string') {
                collapse = document.querySelector(collapseEl);
            }
            if (!collapse) {
                throw new Error("The collapsible " + collapseEl + " is an invalid HTMLElement.");
            }
            var collapseObj = this.getCollapse(collapse);
            return collapseObj.hide();
        };
        return Accordion;
    }(Component));
    Accordion.attachDOM();

    var Alert = (function (_super) {
        __extends(Alert, _super);
        function Alert(props) {
            if (props === void 0) { props = { fade: true }; }
            var _this = _super.call(this, 'alert', { fade: true }, props) || this;
            _this.onTransition = false;
            if (_this.getOpacity() !== 0) {
                var target = _this.getElement().querySelector('[data-dismiss="alert"]');
                if (target) {
                    _this.registerElement({ target: target, event: utils.Event.CLICK });
                }
            }
            return _this;
        }
        Alert.attachDOM = function () {
            utils.Observer.subscribe({
                componentClass: 'alert',
                onAdded: function (element, create) {
                    create(new Alert({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Alert', element);
                },
            });
        };
        Alert.prototype.show = function () {
            var _this = this;
            if (this.onTransition) {
                return false;
            }
            var element = this.getElement();
            if (element.classList.contains('show') && this.getOpacity() !== 0) {
                return false;
            }
            this.onTransition = true;
            this.triggerEvent(utils.Event.SHOW);
            var onShow = function () {
                _this.triggerEvent(utils.Event.SHOWN);
                if (element.classList.contains('fade')) {
                    element.classList.remove('fade');
                }
                var target = utils.Selector.closest(_this.getElement(), '[data-dismiss="alert"]');
                if (target) {
                    _this.registerElement({ target: target, event: utils.Event.CLICK });
                }
                element.removeEventListener(utils.Event.TRANSITION_END, onShow);
                _this.onTransition = false;
            };
            var fade = this.getProp('fade');
            if (fade && !element.classList.contains('fade')) {
                element.classList.add('fade');
            }
            element.classList.add('show');
            element.addEventListener(utils.Event.TRANSITION_END, onShow);
            if (element.classList.contains('hide')) {
                element.classList.remove('hide');
            }
            if (!fade) {
                onShow();
            }
            return true;
        };
        Alert.prototype.hide = function (el) {
            var _this = this;
            if (this.onTransition || this.getOpacity() === 0) {
                return false;
            }
            this.onTransition = true;
            var element = el || this.getElement();
            this.triggerEvent(utils.Event.HIDE);
            var onHide = function () {
                _this.triggerEvent(utils.Event.HIDDEN);
                element.removeEventListener(utils.Event.TRANSITION_END, onHide);
                _this.onTransition = false;
            };
            var fade = this.getProp('fade');
            if (fade && !element.classList.contains('fade')) {
                element.classList.add('fade');
            }
            element.addEventListener(utils.Event.TRANSITION_END, onHide);
            if (!element.classList.contains('hide')) {
                element.classList.add('hide');
            }
            if (element.classList.contains('show')) {
                element.classList.remove('show');
            }
            if (!fade) {
                onHide();
            }
            return true;
        };
        Alert.prototype.onElementEvent = function (event) {
            if (event.type !== utils.Event.CLICK) {
                return;
            }
            this.hide();
        };
        Alert.prototype.destroy = function () {
            this.unregisterElements();
            this.hide();
        };
        Alert.prototype.getOpacity = function () {
            var element = this.getElement();
            var opacity = window.getComputedStyle(element).opacity;
            return parseFloat(opacity || '');
        };
        return Alert;
    }(Component));
    Alert.attachDOM();

    var Size;
    (function (Size) {
        Size["sm"] = "sm";
        Size["md"] = "md";
        Size["lg"] = "lg";
        Size["xl"] = "xl";
    })(Size || (Size = {}));
    var Color;
    (function (Color) {
        Color["primary"] = "primary";
        Color["secondary"] = "secondary";
        Color["success"] = "success";
        Color["warning"] = "warning";
        Color["danger"] = "danger";
    })(Color || (Color = {}));
    var Direction;
    (function (Direction) {
        Direction["top"] = "top";
        Direction["right"] = "right";
        Direction["bottom"] = "bottom";
        Direction["left"] = "left";
    })(Direction || (Direction = {}));

    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader(props) {
            if (props === void 0) { props = { color: Color.primary, size: Size.md }; }
            return _super.call(this, 'loader', { fade: true, size: Size.md, color: Color.primary }, props) || this;
        }
        Loader.prototype.show = function () {
            var element = this.getElement();
            if (element.classList.contains('hide')) {
                element.classList.remove('hide');
            }
            this.triggerEvent(utils.Event.SHOW);
            var size = this.getProp('size');
            utils.Selector.removeClasses(element, Object.values(Size), 'loader');
            element.classList.add("loader-" + size);
            var color = this.getProp('color');
            var spinner = this.getSpinner();
            utils.Selector.removeClasses(spinner, Object.values(Color), 'loader');
            spinner.classList.add("loader-" + color);
            this.triggerEvent(utils.Event.SHOWN);
            return true;
        };
        Loader.prototype.animate = function (startAnimation) {
            if (startAnimation === void 0) { startAnimation = true; }
            if (startAnimation) {
                this.show();
            }
            else {
                this.hide();
            }
            var loaderSpinner = this.getSpinner();
            if (startAnimation
                && !loaderSpinner.classList.contains('loader-spinner-animated')) {
                loaderSpinner.classList.add('loader-spinner-animated');
                return true;
            }
            if (!startAnimation
                && loaderSpinner.classList.contains('loader-spinner-animated')) {
                loaderSpinner.classList.remove('loader-spinner-animated');
            }
            return true;
        };
        Loader.prototype.hide = function () {
            var element = this.getElement();
            if (!element.classList.contains('hide')) {
                element.classList.add('hide');
            }
            this.triggerEvent(utils.Event.HIDE);
            this.triggerEvent(utils.Event.HIDDEN);
            return true;
        };
        Loader.prototype.getSpinner = function () {
            return this.getElement().querySelector('.loader-spinner');
        };
        return Loader;
    }(Component));

    var Modal = (function (_super) {
        __extends(Modal, _super);
        function Modal(props, autoCreate) {
            if (autoCreate === void 0) { autoCreate = true; }
            var _this = _super.call(this, 'modal', {
                title: null,
                message: null,
                cancelable: true,
                background: null,
                cancelableKeyCodes: [
                    27,
                    13,
                ],
                buttons: [
                    { event: 'confirm', text: 'Ok', dismiss: true, class: 'btn btn-primary' },
                ],
                center: true,
            }, props) || this;
            _this.backdropSelector = 'modal-backdrop';
            _this.elementGenerated = false;
            _this.setTemplate(''
                + '<div class="modal" tabindex="-1" role="modal" data-no-boot>'
                + '<div class="modal-inner" role="document">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h5 class="modal-title"></h5>'
                + '<button type="button" class="icon-close" data-dismiss="modal" aria-label="Close">'
                + '<span class="icon" aria-hidden="true"></span>'
                + '</button>'
                + '</div>'
                + '<div class="modal-body">'
                + '<p></p>'
                + '</div>'
                + '<div class="modal-footer">'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>');
            if (autoCreate && _this.getElement() === null) {
                _this.build();
            }
            return _this;
        }
        Modal.attachDOM = function () {
            var className = 'modal';
            utils.Observer.subscribe({
                componentClass: className,
                onAdded: function (element, create) {
                    create(new Modal({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Modal', element);
                },
            });
            document.addEventListener(utils.Event.CLICK, function (event) {
                var target = event.target;
                if (!target) {
                    return;
                }
                var toggleEl = utils.Selector.closest(target, "[data-toggle=\"" + className + "\"]");
                if (toggleEl) {
                    var selector = toggleEl.getAttribute('data-target');
                    if (!selector) {
                        return;
                    }
                    var modal = document.querySelector(selector);
                    if (!modal) {
                        return;
                    }
                    var modalComponent = utils.Observer.getComponent(className, { element: modal });
                    if (!modalComponent) {
                        return;
                    }
                    target.blur();
                    modalComponent.show();
                }
            });
        };
        Modal.prototype.build = function () {
            var _this = this;
            this.elementGenerated = true;
            var builder = document.createElement('div');
            builder.innerHTML = this.getTemplate();
            this.setElement(builder.firstChild);
            var element = this.getElement();
            var title = this.getProp('title');
            if (title !== null) {
                element.querySelector('.modal-title').innerHTML = title;
            }
            var message = this.getProp('message');
            if (message !== null) {
                element.querySelector('.modal-body').firstChild.innerHTML = message;
            }
            else {
                this.removeTextBody();
            }
            var cancelable = this.getProp('cancelable');
            if (!cancelable) {
                element.querySelector('.close').style.display = 'none';
            }
            var buttons = this.getProp('buttons');
            if (Array.isArray(buttons) && buttons.length > 0) {
                buttons.forEach(function (button) {
                    element.querySelector('.modal-footer').appendChild(_this.buildButton(button));
                });
            }
            else {
                this.removeFooter();
            }
            document.body.appendChild(element);
        };
        Modal.prototype.show = function () {
            var _this = this;
            var element = this.getElement();
            if (element === null) {
                this.build();
            }
            if (element.classList.contains('show')) {
                return false;
            }
            document.body.style.overflow = 'hidden';
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var onShown;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, utils.sleep(20)];
                        case 1:
                            _a.sent();
                            this.triggerEvent(utils.Event.SHOW);
                            this.buildBackdrop();
                            this.attachEvents();
                            onShown = function () {
                                _this.triggerEvent(utils.Event.SHOWN);
                                element.removeEventListener(utils.Event.TRANSITION_END, onShown);
                            };
                            element.addEventListener(utils.Event.TRANSITION_END, onShown);
                            if (this.getProp('center')) {
                                this.center();
                            }
                            element.classList.add('show');
                            return [2];
                    }
                });
            }); })();
            return true;
        };
        Modal.prototype.hide = function () {
            var _this = this;
            var element = this.getElement();
            if (!element.classList.contains('show')) {
                return false;
            }
            document.body.style.overflow = 'visible';
            this.triggerEvent(utils.Event.HIDE);
            this.detachEvents();
            element.classList.add('hide');
            element.classList.remove('show');
            var backdrop = this.getBackdrop();
            var onHidden = function () {
                if (backdrop) {
                    document.body.removeChild(backdrop);
                    backdrop.removeEventListener(utils.Event.TRANSITION_END, onHidden);
                }
                element.classList.remove('hide');
                _this.triggerEvent(utils.Event.HIDDEN);
                if (_this.elementGenerated) {
                    document.body.removeChild(element);
                }
            };
            if (backdrop) {
                backdrop.addEventListener(utils.Event.TRANSITION_END, onHidden);
                backdrop.classList.add('fadeout');
            }
            return true;
        };
        Modal.prototype.onElementEvent = function (event) {
            if (event.type === 'keyup') {
                var keycodes = this.getProp('cancelableKeyCodes');
                if (keycodes.find(function (k) { return k === event.keyCode; })) {
                    this.hide();
                }
                return;
            }
            if (event.type === utils.Event.START) {
                this.hide();
                return;
            }
            if (event.type === utils.Event.CLICK) {
                var target = event.target;
                var eventName = target.getAttribute('data-event');
                if (eventName) {
                    this.triggerEvent(eventName);
                }
                var dismissButton = utils.Selector.closest(target, '[data-dismiss]');
                if (dismissButton && dismissButton.getAttribute('data-dismiss') === 'modal') {
                    this.hide();
                }
            }
        };
        Modal.prototype.setBackgroud = function () {
            var element = this.getElement();
            var background = this.getProp('background');
            if (!background) {
                return;
            }
            if (!element.classList.contains("modal-" + background)) {
                element.classList.add("modal-" + background);
            }
            if (!element.classList.contains('text-white')) {
                element.classList.add('text-white');
            }
        };
        Modal.prototype.buildButton = function (buttonInfo) {
            var button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.setAttribute('class', buttonInfo.class || 'btn');
            button.setAttribute('data-event', buttonInfo.event);
            button.innerHTML = buttonInfo.text;
            if (buttonInfo.dismiss) {
                button.setAttribute('data-dismiss', 'modal');
            }
            return button;
        };
        Modal.prototype.buildBackdrop = function () {
            var backdrop = document.createElement('div');
            backdrop.setAttribute('data-id', this.getId());
            backdrop.classList.add(this.backdropSelector);
            document.body.appendChild(backdrop);
        };
        Modal.prototype.getBackdrop = function () {
            return document.querySelector("." + this.backdropSelector + "[data-id=\"" + this.getId() + "\"]");
        };
        Modal.prototype.removeTextBody = function () {
            var element = this.getElement();
            element.querySelector('.modal-body')
                .removeChild(element.querySelector('.modal-body').firstChild);
        };
        Modal.prototype.removeFooter = function () {
            var element = this.getElement();
            var footer = element.querySelector('.modal-footer');
            element.querySelector('.modal-content').removeChild(footer);
        };
        Modal.prototype.center = function () {
            var element = this.getElement();
            var computedStyle = window.getComputedStyle(element);
            if (computedStyle && computedStyle.height) {
                var height = computedStyle.height.slice(0, computedStyle.height.length - 2);
                var top_1 = (window.innerHeight / 2) - (parseFloat(height) / 2);
                element.style.top = top_1 + "px";
            }
        };
        Modal.prototype.attachEvents = function () {
            var _this = this;
            var element = this.getElement();
            var buttons = Array
                .from(element.querySelectorAll('[data-dismiss], .modal-footer button') || []);
            buttons.forEach(function (button) { return _this.registerElement({
                target: button,
                event: utils.Event.CLICK,
            }); });
            var cancelable = this.getProp('cancelable');
            var backdrop = this.getBackdrop();
            if (cancelable && backdrop) {
                this.registerElement({ target: backdrop, event: utils.Event.START });
                this.registerElement({ target: document, event: 'keyup' });
            }
        };
        Modal.prototype.detachEvents = function () {
            var _this = this;
            var element = this.getElement();
            var buttons = Array
                .from(element.querySelectorAll('[data-dismiss], .modal-footer button') || []);
            buttons.forEach(function (button) { return _this.unregisterElement({
                target: button,
                event: utils.Event.CLICK,
            }); });
            var cancelable = this.getProp('cancelable');
            if (cancelable) {
                var backdrop = this.getBackdrop();
                this.unregisterElement({ target: backdrop, event: utils.Event.START });
                this.unregisterElement({ target: document, event: 'keyup' });
            }
        };
        return Modal;
    }(Component));
    Modal.attachDOM();

    var ModalConfirm = (function (_super) {
        __extends(ModalConfirm, _super);
        function ModalConfirm(props) {
            var _this = _super.call(this, Object.assign({
                buttons: [
                    { event: 'cancel', text: 'Cancel', dismiss: true, class: 'btn btn-secondary' },
                    { event: 'confirm', text: 'Ok', dismiss: true, class: 'btn btn-primary' },
                ],
            }, props), false) || this;
            _this.setTemplate(''
                + '<div class="modal" tabindex="-1" role="modal" data-no-boot>'
                + '<div class="modal-inner" role="document">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h5 class="modal-title"></h5>'
                + '<button type="button" class="icon-close" data-dismiss="modal" aria-label="Close">'
                + '<span class="icon" aria-hidden="true"></span>'
                + '</button>'
                + '</div>'
                + '<div class="modal-body">'
                + '<p></p>'
                + '</div>'
                + '<div class="modal-footer">'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>');
            if (_this.getElement() === null) {
                _this.build();
            }
            return _this;
        }
        return ModalConfirm;
    }(Modal));

    var ModalLoader = (function (_super) {
        __extends(ModalLoader, _super);
        function ModalLoader(props) {
            var _this = _super.call(this, Object.assign({
                buttons: [
                    { event: 'cancel', text: 'Cancel', dismiss: true, class: 'btn btn-secondary' },
                    { event: 'confirm', text: 'Ok', dismiss: true, class: 'btn btn-primary' },
                ],
            }, props), false) || this;
            _this.loader = null;
            _this.setTemplate(''
                + '<div class="modal" tabindex="-1" role="modal" data-no-boot>'
                + '<div class="modal-inner" role="document">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h5 class="modal-title"></h5>'
                + '<button type="button" class="icon-close" data-dismiss="modal" aria-label="Close">'
                + '<span class="icon" aria-hidden="true"></span>'
                + '</button>'
                + '</div>'
                + '<div class="modal-body">'
                + '<p></p>'
                + '<div class="mx-auto text-center">'
                + '<div class="loader mx-auto d-block">'
                + '<div class="loader-spinner"></div>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="modal-footer">'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>');
            if (_this.getElement() === null) {
                _this.build();
            }
            return _this;
        }
        ModalLoader.prototype.show = function () {
            _super.prototype.show.call(this);
            this.loader = new Loader({ element: this.getElement().querySelector('.loader') });
            this.loader.animate(true);
            return true;
        };
        ModalLoader.prototype.hide = function () {
            _super.prototype.hide.call(this);
            if (this.loader) {
                this.loader.animate(false);
            }
            this.loader = null;
            return true;
        };
        return ModalLoader;
    }(Modal));

    var ModalPrompt = (function (_super) {
        __extends(ModalPrompt, _super);
        function ModalPrompt(props) {
            var _this = _super.call(this, Object.assign({
                buttons: [
                    { event: 'cancel', text: 'Cancel', dismiss: true, class: 'btn btn-secondary' },
                    { event: 'confirm', text: 'Ok', dismiss: true, class: 'btn btn-primary' },
                ],
                inputValue: '',
            }, props), false) || this;
            _this.setTemplate(''
                + '<div class="modal" tabindex="-1" role="modal" data-no-boot>'
                + '<div class="modal-inner" role="document">'
                + '<div class="modal-content">'
                + '<div class="modal-header">'
                + '<h5 class="modal-title"></h5>'
                + '<button type="button" class="icon-close" data-dismiss="modal" aria-label="Close">'
                + '<span class="icon" aria-hidden="true"></span>'
                + '</button>'
                + '</div>'
                + '<div class="modal-body">'
                + '<p></p>'
                + '<input class="form-control" type="text" value="">'
                + '</div>'
                + '<div class="modal-footer">'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>');
            if (_this.getElement() === null) {
                _this.build();
            }
            return _this;
        }
        ModalPrompt.prototype.show = function () {
            _super.prototype.show.call(this);
            var defaultValue = this.getProp('inputValue');
            if (typeof defaultValue === 'string') {
                this.setInputValue(defaultValue);
            }
            this.attachInputEvent();
            return true;
        };
        ModalPrompt.prototype.hide = function () {
            _super.prototype.hide.call(this);
            this.detachInputEvent();
            return true;
        };
        ModalPrompt.prototype.setInputValue = function (value) {
            if (value === void 0) { value = ''; }
            this.getInput().value = value;
        };
        ModalPrompt.prototype.getInputValue = function () {
            return this.getInput().value;
        };
        ModalPrompt.prototype.onElementEvent = function (event) {
            if (event.target === this.getInput()) {
                return;
            }
        };
        ModalPrompt.prototype.getInput = function () {
            return this.getElement().querySelector('.form-control');
        };
        ModalPrompt.prototype.attachInputEvent = function () {
            this.registerElement({ target: this.getInput(), event: 'keyup' });
        };
        ModalPrompt.prototype.detachInputEvent = function () {
            this.unregisterElement({ target: this.getInput(), event: 'keyup' });
        };
        return ModalPrompt;
    }(Modal));

    var Notification = (function (_super) {
        __extends(Notification, _super);
        function Notification(props) {
            if (props === void 0) { props = { element: null, title: '', button: true }; }
            var _this = _super.call(this, 'notification', {
                button: true,
                timeout: null,
                title: '',
                message: null,
                background: 'primary',
                appendIn: document.body,
                directionX: 'right',
                directionY: 'top',
                offsetX: 0,
                offsetY: 0,
            }, props) || this;
            _this.timeoutCallback = null;
            _this.elementGenerated = false;
            _this.setTemplate(''
                + '<div class="notification" data-no-boot>'
                + '<div class="notification-inner">'
                + '<div class="notification-header">'
                + '<h5 class="notification-title"></h5>'
                + '<button type="button" class="icon-close" data-dismiss="notification" aria-label="Close">'
                + '<span class="icon" aria-hidden="true"></span>'
                + '</button>'
                + '</div>'
                + '<div class="notification-body"></div>'
                + '</div>'
                + '</div>');
            if (_this.getElement() === null) {
                _this.build();
            }
            return _this;
        }
        Notification.attachDOM = function () {
            utils.Observer.subscribe({
                componentClass: 'notification',
                onAdded: function (element, create) {
                    create(new Notification({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Notification', element);
                },
            });
        };
        Notification.prototype.build = function () {
            this.elementGenerated = true;
            var builder = document.createElement('div');
            builder.innerHTML = this.getTemplate();
            this.setElement(builder.firstChild);
            var element = this.getElement();
            element.querySelector('.notification-title').innerHTML = this.getProp('title');
            if (this.getProp('message')) {
                element.querySelector('.notification-body').innerHTML = this.getProp('message');
            }
            else {
                element.querySelector('.notification-body').style.display = 'none';
            }
            if (!this.getProp('button')) {
                element.querySelector('button').style.display = 'none';
            }
            var container = this.getProp('appendIn');
            container.appendChild(element);
        };
        Notification.prototype.setPosition = function () {
            var x = this.getProp('directionX');
            var y = this.getProp('directionY');
            var offsetX = this.getProp('offsetX');
            var offsetY = this.getProp('offsetY');
            var notification = this.getElement();
            utils.Selector.removeClasses(notification, Object.values(Direction));
            notification.style.marginLeft = '0px';
            notification.style.marginRight = '0px';
            notification.classList.add("notification-" + x);
            notification.classList.add("notification-" + y);
            var activeNotifications = Array
                .from(document.querySelectorAll('.notification.show') || []);
            var totalNotifY = 0;
            activeNotifications.forEach(function (n) {
                if (notification !== n) {
                    var style = getComputedStyle(n);
                    var top_1 = parseInt(style.marginTop, 10);
                    var bottom = parseInt(style.marginBottom, 10);
                    totalNotifY += n.offsetHeight + top_1 + bottom;
                }
            });
            notification.style.transform = "translateY(" + (y === 'top' ? '' : '-') + totalNotifY + "px)";
            notification.style["margin" + x.replace(/^\w/, function (c) { return c.toUpperCase(); })] = offsetX + "px";
            notification.style["margin" + y.replace(/^\w/, function (c) { return c.toUpperCase(); })] = offsetY + "px";
        };
        Notification.prototype.show = function () {
            var _this = this;
            if (this.getElement() === null) {
                this.build();
            }
            var element = this.getElement();
            if (element.classList.contains('show')) {
                return false;
            }
            var background = this.getProp('background');
            if (background) {
                element.removeAttribute('class');
                element.setAttribute('class', 'notification');
                element.classList.add("notification-" + background);
                element.querySelector('button').classList.add("btn-" + background);
            }
            var buttonElement = element.querySelector('button[data-dismiss]');
            var button = this.getProp('button');
            if (button && buttonElement) {
                this.registerElement({ target: buttonElement, event: utils.Event.CLICK });
            }
            var toggleButton = element.querySelector('button[data-dismiss]');
            this.registerElement({ target: buttonElement, event: utils.Event.CLICK });
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var timeout, onShown;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, utils.sleep(20)];
                        case 1:
                            _a.sent();
                            this.setPosition();
                            timeout = this.getProp('timeout');
                            if (Number.isInteger(timeout) && timeout > 0) {
                                this.timeoutCallback = setTimeout(function () {
                                    _this.hide();
                                }, timeout + 1);
                            }
                            element.classList.add('show');
                            this.triggerEvent(utils.Event.SHOW);
                            onShown = function () {
                                _this.triggerEvent(utils.Event.SHOWN);
                                element.removeEventListener(utils.Event.TRANSITION_END, onShown);
                            };
                            element.addEventListener(utils.Event.TRANSITION_END, onShown);
                            return [2];
                    }
                });
            }); })();
            return true;
        };
        Notification.prototype.hideBody = function () {
            var body = this.getElement().querySelector('.notification-body');
            if (body.classList.contains('show')) {
                body.classList.remove('show');
            }
        };
        Notification.prototype.hide = function () {
            var _this = this;
            if (this.timeoutCallback) {
                clearTimeout(this.timeoutCallback);
                this.timeoutCallback = null;
            }
            var element = this.getElement();
            if (!element.classList.contains('show')) {
                return false;
            }
            this.triggerEvent(utils.Event.HIDE);
            var button = this.getProp('button');
            var buttonElement = element.querySelector('button[data-dismiss]');
            if (button && buttonElement) {
                this.unregisterElement({ target: buttonElement, event: utils.Event.CLICK });
            }
            element.classList.remove('show');
            element.classList.add('hide');
            this.hideBody();
            var onHidden = function () {
                element.removeEventListener(utils.Event.TRANSITION_END, onHidden);
                element.classList.remove('hide');
                _this.triggerEvent(utils.Event.HIDDEN);
                if (_this.elementGenerated) {
                    document.body.removeChild(element);
                }
            };
            element.addEventListener(utils.Event.TRANSITION_END, onHidden);
            return true;
        };
        Notification.prototype.onElementEvent = function () {
            this.hide();
        };
        return Notification;
    }(Component));

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
            utils.Observer.subscribe({
                componentClass: className,
                onAdded: function (element, create) {
                    create(new OffCanvas({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('OffCanvas', element);
                },
            });
            document.addEventListener(utils.Event.CLICK, function (event) {
                var target = event.target;
                if (!target) {
                    return;
                }
                var toggleEl = utils.Selector.closest(target, "[data-toggle=\"" + className + "\"]");
                if (toggleEl) {
                    var selector = toggleEl.getAttribute('data-target');
                    if (!selector) {
                        return;
                    }
                    var offCanvas = document.querySelector(selector);
                    if (!offCanvas) {
                        return;
                    }
                    var offCanvasComponent = utils.Observer.getComponent(className, { element: offCanvas });
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
            this.triggerEvent(utils.Event.SHOW);
            if (!this.showAside) {
                this.createBackdrop();
            }
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var onShown, container, containerShowClass, el;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, utils.sleep(20)];
                        case 1:
                            _a.sent();
                            this.attachEvents();
                            onShown = function () {
                                _this.triggerEvent(utils.Event.SHOWN);
                                if (_this.animate) {
                                    var element = _this.getElement();
                                    element.removeEventListener(utils.Event.TRANSITION_END, onShown);
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
                                el.addEventListener(utils.Event.TRANSITION_END, onShown);
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
            this.triggerEvent(utils.Event.HIDE);
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
                    backdrop_1.removeEventListener(utils.Event.TRANSITION_END, onHidden_1);
                    _this.triggerEvent(utils.Event.HIDDEN);
                    _this.removeBackdrop();
                };
                if (backdrop_1) {
                    backdrop_1.addEventListener(utils.Event.TRANSITION_END, onHidden_1);
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
                event: utils.Event.CLICK,
            }); });
            var backdrop = this.getBackdrop();
            if (!this.showAside && backdrop) {
                this.registerElement({ target: backdrop, event: utils.Event.START });
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
                    event: utils.Event.CLICK,
                }); });
            }
            var backdrop = this.getBackdrop();
            if (!this.showAside && backdrop) {
                this.unregisterElement({ target: backdrop, event: utils.Event.START });
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

    var Progress = (function (_super) {
        __extends(Progress, _super);
        function Progress(props) {
            var _this = _super.call(this, 'progress', {
                height: 8,
                min: 0,
                max: 100,
                now: 0,
                label: false,
                striped: false,
                animate: true,
                background: null,
            }, props) || this;
            _this.onTransition = false;
            _this.setHeight();
            _this.setAccessibility();
            if (_this.getProp('striped')) {
                _this.setStriped();
            }
            if (_this.getProp('background')) {
                _this.setBackground();
            }
            _this.set(_this.getProp('now'));
            return _this;
        }
        Progress.attachDOM = function () {
            utils.Observer.subscribe({
                componentClass: 'progress',
                onAdded: function (element, create) {
                    create(new Progress({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Progress', element);
                },
            });
        };
        Progress.prototype.set = function (value) {
            if (value === void 0) { value = 0; }
            var progressBar = this.getProgressBar();
            var min = this.getProp('min');
            var max = this.getProp('max');
            var progress = Math.round((value / (min + max)) * 100);
            if (value < min) {
                console.error("Progress: Warning, " + value + " is under min value.");
                return false;
            }
            if (value > max) {
                console.error("Progress: Warning, " + value + " is above max value.");
                return false;
            }
            progressBar.setAttribute('aria-valuenow', "" + value);
            if (this.getProp('label')) {
                progressBar.innerHTML = progress + "%";
            }
            progressBar.style.width = progress + "%";
            return true;
        };
        Progress.prototype.animateProgressBar = function (startAnimation) {
            if (startAnimation === void 0) { startAnimation = true; }
            if (!this.getProp('striped')) {
                throw new Error('Progress: Animation works only with striped progress.');
                return false;
            }
            var progressBar = this.getProgressBar();
            if (startAnimation && !progressBar.classList.contains('progress-bar-animated')) {
                progressBar.classList.add('progress-bar-animated');
            }
            if (!startAnimation && progressBar.classList.contains('progress-bar-animated')) {
                progressBar.classList.remove('progress-bar-animated');
            }
            return true;
        };
        Progress.prototype.show = function () {
            var progress = this.getElement();
            progress.style.height = this.getProp('height') + "px";
            this.triggerEvent(utils.Event.SHOW);
            this.triggerEvent(utils.Event.SHOWN);
            return true;
        };
        Progress.prototype.hide = function () {
            var progress = this.getElement();
            progress.style.height = '0px';
            this.triggerEvent(utils.Event.HIDE);
            this.triggerEvent(utils.Event.HIDDEN);
            return true;
        };
        Progress.prototype.destroy = function () {
            this.unregisterElements();
            this.hide();
        };
        Progress.prototype.setHeight = function () {
            this.getElement().style.height = this.getProp('height') + "px";
        };
        Progress.prototype.setAccessibility = function () {
            var progress = this.getElement();
            progress.setAttribute('aria-valuemin', "" + this.getProp('min'));
            progress.setAttribute('aria-valuemax', "" + this.getProp('max'));
        };
        Progress.prototype.setStriped = function () {
            this.getProgressBar().classList.add('progress-bar-striped');
            if (this.getProp('animate')) {
                this.animateProgressBar();
            }
        };
        Progress.prototype.setBackground = function () {
            var progressBar = this.getProgressBar();
            var background = this.getProp('background');
            if (progressBar.classList.contains("bg-" + background)) {
                progressBar.classList.add("bg-" + background);
            }
        };
        Progress.prototype.getProgressBar = function () {
            return this.getElement().querySelector('.progress-bar');
        };
        return Progress;
    }(Component));
    Progress.attachDOM();

    var Selectbox = (function (_super) {
        __extends(Selectbox, _super);
        function Selectbox(props) {
            var _this = _super.call(this, 'selectbox', {
                name: null,
                selectable: true,
                filterItems: null,
                multiple: false,
                tag: false,
            }, props) || this;
            if (!_this.getProp('name')) {
                var hiddenInput = _this.getElement().querySelector('input[type="hidden"]');
                if (hiddenInput) {
                    _this.setProp('name', hiddenInput.getAttribute('name'));
                }
            }
            _this.filterItemsHandler = function (event) {
                var target = event.target;
                if (!target) {
                    return;
                }
                var search = target.value;
                if (search === '') {
                    _this.showItems();
                    return;
                }
                _this.getItems().forEach(function (item) {
                    var filterItems = _this.getProp('filterItems');
                    var fn = typeof filterItems === 'function' ? filterItems : _this.filterItems;
                    if (fn(search, item)) {
                        item.element.style.display = 'block';
                    }
                    else {
                        item.element.style.display = 'none';
                    }
                });
            };
            _this.registerElement({ target: _this.getElement(), event: utils.Event.CLICK });
            _this.searchInputInContainer = _this.getElement()
                .querySelector('.selectbox-input-container .input-select-one') !== null;
            var selectedItem = _this.getItemData(_this.getElement().querySelector('[data-selected]'));
            if (selectedItem) {
                _this.setSelected(selectedItem.value, selectedItem.text);
            }
            return _this;
        }
        Selectbox.attachDOM = function () {
            utils.Observer.subscribe({
                componentClass: 'selectbox',
                onAdded: function (element, create) {
                    create(new Selectbox({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Selectbox', element);
                },
            });
        };
        Selectbox.prototype.getSearchInput = function () {
            return this.getElement().querySelector('.input-select-one');
        };
        Selectbox.prototype.filterItems = function (search, item) {
            if (search === void 0) { search = ''; }
            return item.value.indexOf(search) > -1 || item.text.indexOf(search) > -1;
        };
        Selectbox.prototype.showItems = function () {
            this.getItems().forEach(function (item) {
                item.element.style.display = 'block';
            });
        };
        Selectbox.prototype.getItems = function () {
            var _this = this;
            var items = Array
                .from(this.getElement().querySelectorAll('.selectbox-menu-item') || []);
            return items.map(function (item) {
                var info = _this.getItemData(item);
                return { text: info.text, value: info.value, element: item };
            });
        };
        Selectbox.prototype.setSelected = function (value, text) {
            if (value === void 0) { value = ''; }
            if (text === void 0) { text = ''; }
            var selectable = this.getProp('selectable');
            if (!selectable) {
                return false;
            }
            var element = this.getElement();
            var multiple = this.getProp('multiple');
            if (multiple) {
                this.addItemSelection(value);
            }
            else {
                var itemsSelected = Array
                    .from(element.querySelectorAll('.selectbox-item-selection .item-selected') || []);
                if (itemsSelected.length === 0) {
                    this.addItemSelection(value);
                }
            }
            var lastSelectedEl = element
                .querySelector('.selectbox-item-selection .item-selected:last-child');
            var spanEl = lastSelectedEl.querySelector('[data-value]');
            if (spanEl) {
                spanEl.innerHTML = text;
            }
            else {
                lastSelectedEl.innerHTML = text;
            }
            var hiddenInputs = Array
                .from(this.getElement().querySelectorAll('input[type="hidden"]') || []);
            var lastInput = hiddenInputs.slice(-1).pop();
            if (lastInput) {
                lastInput.setAttribute('value', value);
            }
            this.updateActiveList();
            this.setSearchInputWidth();
            var searchInput = this.getSearchInput();
            if (value === '') {
                this.showPlaceholder();
            }
            else {
                this.showPlaceholder(false);
            }
            return true;
        };
        Selectbox.prototype.getSelected = function () {
            var hiddenInputs = Array
                .from(this.getElement().querySelectorAll('input[type="hidden"]') || []);
            if (!this.getProp('multiple')) {
                return hiddenInputs.length > 0 ? hiddenInputs[0].value : '';
            }
            return hiddenInputs.map(function (input) { return input.value; });
        };
        Selectbox.prototype.setSearchInputWidth = function () {
            if (!this.searchInputInContainer) {
                return;
            }
            var selectbox = this.getElement();
            var selection = selectbox.querySelector('.selectbox-item-selection');
            var availableSpace = selectbox.offsetWidth - selection.offsetWidth;
            var searchInput = this.getSearchInput();
            if (!searchInput) {
                throw new Error('Selectbox: search input is not defined');
            }
            var selectedItemWidth = Array
                .from(selectbox.querySelectorAll('.item-selected') || [])
                .reduce(function (total, el) { return (total + el.offsetWidth); }, 0);
            if (availableSpace > 0) {
                searchInput.style.width = "calc(100% - " + (selectedItemWidth + 15) + "px)";
            }
            searchInput.style.left = selectedItemWidth + "px";
        };
        Selectbox.prototype.getItemData = function (item) {
            if (item === void 0) { item = null; }
            var text = '';
            var value = '';
            if (item) {
                text = item.getAttribute('data-text') || item.innerHTML;
                var selectedTextNode = item.querySelector('.text');
                if (selectedTextNode) {
                    text = selectedTextNode.innerHTML;
                }
                value = item.getAttribute('data-value') || '';
            }
            return { text: text, value: value };
        };
        Selectbox.prototype.onElementEvent = function (event) {
            var target = event.target;
            if (event.type === utils.Event.START) {
                var selectbox = utils.Selector.closest(target, '.selectbox');
                if (!selectbox || selectbox !== this.getElement()) {
                    this.hide();
                }
            }
            else if (event.type === utils.Event.CLICK) {
                var dataToggleAttr = target.getAttribute('data-toggle');
                if (dataToggleAttr && dataToggleAttr === 'selectbox') {
                    this.toggle();
                    return;
                }
                var dismissButton = utils.Selector
                    .closest(target, '[data-dismiss="selectbox"]');
                if (dismissButton) {
                    this.hide();
                    return;
                }
                var selectedTag = utils.Selector.closest(target, '.icon-close');
                if (selectedTag) {
                    this.removeSelected(selectedTag.parentNode);
                    return;
                }
                var item = utils.Selector.closest(target, '.selectbox-menu-item');
                if (item && !item.classList.contains('disabled')) {
                    var itemInfo = this.getItemData(item);
                    if (this.getSelected() !== itemInfo.value) {
                        this.setSelected(itemInfo.value, itemInfo.text);
                        var selectInput = this.getElement().querySelector('.input-select-one').value = '';
                        var detail = { item: item, text: itemInfo.text, value: itemInfo.value };
                        this.triggerEvent(utils.Event.ITEM_SELECTED, detail);
                    }
                    this.hide();
                    return;
                }
                var selectboxMenu = utils.Selector.closest(target, '.selectbox-menu');
                if (selectboxMenu) {
                    return;
                }
                this.toggle();
            }
            else if (event.type === 'keyup' && event.keyCode === 8) {
                var inputTarget = event.target;
                if (inputTarget.value !== '') {
                    return;
                }
                if (!this.searchInputInContainer) {
                    return;
                }
                this.removeLastSelected();
            }
        };
        Selectbox.prototype.addItemSelection = function (value) {
            var itemSelectedEl = document.createElement('div');
            itemSelectedEl.classList.add('item-selected');
            if (this.getProp('tag')) {
                itemSelectedEl.classList.add('tag');
                var spanEl = document.createElement('span');
                spanEl.setAttribute('data-value', 'true');
                itemSelectedEl.appendChild(spanEl);
                var closeEl = document.createElement('button');
                closeEl.setAttribute('type', 'button');
                closeEl.classList.add('icon-close');
                var iconEl = document.createElement('span');
                iconEl.setAttribute('class', 'icon');
                iconEl.setAttribute('aria-hidden', 'true');
                closeEl.appendChild(iconEl);
                itemSelectedEl.appendChild(closeEl);
            }
            var element = this.getElement();
            element.querySelector('.selectbox-item-selection').appendChild(itemSelectedEl);
            var selectbox = this.getElement();
            var hiddenInputs = Array.from(selectbox.querySelectorAll('input[type="hidden"]') || []);
            var lastHiddenInput = hiddenInputs.length > 0 ? hiddenInputs[hiddenInputs.length - 1] : null;
            if ((!this.getProp('multiple') && !lastHiddenInput) || this.getProp('multiple')) {
                var hiddenInput = document.createElement('input');
                hiddenInput.setAttribute('type', 'hidden');
                var name_1 = this.getProp('name');
                hiddenInput.setAttribute('name', this.getProp('multiple') ? name_1 + "[]" : name_1);
                hiddenInput.setAttribute('value', value);
                selectbox.insertBefore(hiddenInput, lastHiddenInput ? lastHiddenInput.nextSibling : selectbox.firstChild);
            }
        };
        Selectbox.prototype.removeLastSelected = function () {
            var selectbox = this.getElement();
            var selectedItems = Array
                .from(selectbox.querySelectorAll('.selectbox-item-selection .item-selected') || []);
            if (selectedItems.length === 0) {
                return;
            }
            var lastSelectedItem = selectedItems[selectedItems.length - 1];
            this.removeSelected(lastSelectedItem);
        };
        Selectbox.prototype.removeSelected = function (selectedItem) {
            var selectbox = this.getElement();
            var selectedItems = Array
                .from(selectbox.querySelectorAll('.selectbox-item-selection .item-selected') || []);
            if (selectedItems.length === 0) {
                return;
            }
            selectbox.querySelector('.selectbox-item-selection').removeChild(selectedItem);
            if (this.getProp('multiple')) {
                var values = this.getSelected();
                var hiddenInput = selectbox
                    .querySelector("input[type=\"hidden\"][value=\"" + values.slice(-1).pop() + "\"]");
                this.getElement().removeChild(hiddenInput);
            }
            else {
                var hiddenInput = selectbox.querySelector('input[type="hidden"]');
                if (!this.getProp('multiple') && hiddenInput) {
                    hiddenInput.setAttribute('value', '');
                }
            }
            this.updateActiveList();
            this.setSearchInputWidth();
            if (selectedItems.length === 1) {
                this.showPlaceholder();
            }
        };
        Selectbox.prototype.showPlaceholder = function (show) {
            if (show === void 0) { show = true; }
            var searchInput = this.getSearchInput();
            if (!searchInput) {
                return;
            }
            if (show && searchInput.classList.contains('hide-placeholder')) {
                searchInput.classList.remove('hide-placeholder');
            }
            else if (!show && !searchInput.classList.contains('hide-placeholder')) {
                searchInput.classList.add('hide-placeholder');
            }
        };
        Selectbox.prototype.updateActiveList = function () {
            var _this = this;
            var selected = this.getSelected();
            var selectedItems = Array.isArray(selected) ? selected : [selected];
            var items = Array
                .from(this.getElement().querySelectorAll('.selectbox-menu-item') || []);
            items.forEach(function (item) {
                var data = _this.getItemData(item);
                if (selectedItems.indexOf(data.value) > -1) {
                    if (!item.classList.contains('selected')) {
                        item.classList.add('selected');
                    }
                }
                else {
                    if (item.classList.contains('selected')) {
                        item.classList.remove('selected');
                    }
                }
            });
        };
        Selectbox.prototype.toggle = function () {
            if (this.getElement().classList.contains('active')) {
                return this.hide();
            }
            return this.show();
        };
        Selectbox.prototype.show = function () {
            var element = this.getElement();
            if (element.classList.contains('active')) {
                return false;
            }
            element.classList.add('active');
            var selectboxMenu = element.querySelector('.selectbox-menu');
            var selectInput = this.getSearchInput();
            selectboxMenu.scrollTop = 0;
            this.triggerEvent(utils.Event.SHOW);
            this.triggerEvent(utils.Event.SHOWN);
            this.registerElement({ target: document.body, event: utils.Event.START });
            if (selectInput) {
                this.registerElement({ target: selectInput, event: 'keyup' });
                selectInput.addEventListener('keyup', this.filterItemsHandler);
                selectInput.focus();
            }
            var closeButton = element.querySelector('[data-dismiss="selectbox"]');
            if (closeButton) {
                this.registerElement({ target: closeButton, event: utils.Event.CLICK });
            }
            return true;
        };
        Selectbox.prototype.hide = function () {
            var element = this.getElement();
            if (!element.classList.contains('active')) {
                return false;
            }
            element.classList.remove('active');
            this.triggerEvent(utils.Event.HIDE);
            this.triggerEvent(utils.Event.HIDDEN);
            this.unregisterElement({ target: document.body, event: utils.Event.START });
            var closeButton = element.querySelector('[data-dismiss="selectbox"]');
            if (closeButton) {
                this.unregisterElement({ target: closeButton, event: utils.Event.CLICK });
            }
            var selectInput = this.getSearchInput();
            if (selectInput) {
                selectInput.removeEventListener('keyup', this.filterItemsHandler);
                selectInput.value = '';
                this.unregisterElement({ target: selectInput, event: 'keyup' });
            }
            this.showItems();
            return true;
        };
        return Selectbox;
    }(Component));
    Selectbox.attachDOM();

    var Tab = (function (_super) {
        __extends(Tab, _super);
        function Tab(props) {
            var _this = _super.call(this, 'tab', {}, props) || this;
            _this.tabSelector = 'tab';
            _this.tabItemSelector = 'tab-item';
            _this.tabContentSelector = 'tab-pane';
            _this.onAnimation = false;
            _this.registerElement({ target: _this.getElement(), event: utils.Event.CLICK });
            return _this;
        }
        Tab.attachDOM = function () {
            utils.Observer.subscribe({
                componentClass: 'tabs',
                onAdded: function (element, create) {
                    create(new Tab({ element: element }));
                },
                onRemoved: function (element, remove) {
                    remove('Tab', element);
                },
            });
        };
        Tab.prototype.onElementEvent = function (event) {
            var target = event.target;
            if (!target) {
                return;
            }
            var dataToggleAttr = target.getAttribute('data-toggle');
            if (dataToggleAttr) {
                var id = target.getAttribute('href') || target.getAttribute('data-target');
                if (!id) {
                    return;
                }
                event.preventDefault();
                this.show(target);
            }
        };
        Tab.prototype.show = function (tabLink) {
            var _this = this;
            if (this.onAnimation) {
                return false;
            }
            var tabItem = utils.Selector.closest(tabLink, "." + this.tabItemSelector);
            if (!tabItem || tabItem.classList.contains('active')) {
                return false;
            }
            var id = tabLink.getAttribute('href') || tabLink.getAttribute('data-target');
            if (!id) {
                return false;
            }
            var tabContainer = this.getElement();
            var tabItems = Array.from(tabContainer.querySelectorAll('.tab-item') || []);
            tabItems.forEach(function (tab) {
                if (tab.classList.contains('active')) {
                    tab.classList.remove('active');
                }
                var link = tab.querySelector('.tab-link');
                if (link) {
                    link.setAttribute('aria-selected', 'false');
                }
            });
            this.onAnimation = true;
            tabItem.classList.add('active');
            tabLink.setAttribute('aria-selected', 'true');
            var tabContent = document.querySelector(id);
            if (!tabContent) {
                return false;
            }
            var tabContentParent = tabContent.parentNode;
            if (!tabContentParent) {
                return false;
            }
            var tabContents = Array
                .from(tabContentParent.querySelectorAll("." + this.tabContentSelector) || []);
            var prevTabItem = tabContainer.querySelector('.tab-item.active');
            tabContents.forEach(function (tab) {
                if (tab.classList.contains('active')) {
                    tab.classList.remove('active');
                }
            });
            tabContent.classList.add('showing');
            this.triggerEvent(utils.Event.SHOW, this.getTabEvent(tabLink));
            if (prevTabItem) {
                this.triggerEvent(utils.Event.HIDE, this.getTabEvent(prevTabItem));
            }
            var onShowed = function () {
                tabContent.classList.remove('animate');
                tabContent.classList.add('active');
                tabContent.classList.remove('showing');
                _this.triggerEvent(utils.Event.SHOWN, _this.getTabEvent(tabLink));
                if (prevTabItem) {
                    _this.triggerEvent(utils.Event.HIDDEN, _this.getTabEvent(prevTabItem));
                }
                _this.onAnimation = false;
                tabContent.removeEventListener(utils.Event.TRANSITION_END, onShowed);
            };
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, utils.sleep(20)];
                        case 1:
                            _a.sent();
                            tabContent.addEventListener(utils.Event.TRANSITION_END, onShowed);
                            tabContent.classList.add('animate');
                            return [2];
                    }
                });
            }); })();
            return true;
        };
        Tab.prototype.getTabEvent = function (tabLink) {
            return {
                id: tabLink.getAttribute('href') || tabLink.getAttribute('data-target'),
                target: tabLink,
            };
        };
        Tab.prototype.destroy = function () {
            this.registerElement({ target: this.getElement(), event: utils.Event.CLICK });
        };
        return Tab;
    }(Component));
    Tab.attachDOM();

    var componentCreator = function (component, options) {
        if (options === void 0) { options = {}; }
        return utils.Observer.getComponent(component, options) || new component(options);
    };
    var api = {
        accordion: function (options) { return componentCreator(Accordion, options); },
        alert: function (options) { return componentCreator(Alert, options); },
        modal: function (options) { return componentCreator(Modal, options); },
        modalConfirm: function (options) { return componentCreator(ModalConfirm, options); },
        modalLoader: function (options) { return componentCreator(ModalLoader, options); },
        modalPrompt: function (options) { return componentCreator(ModalPrompt, options); },
        loader: function (options) { return componentCreator(Loader, options); },
        collapse: function (options) { return componentCreator(Collapse, options); },
        notification: function (options) { return componentCreator(Notification, options); },
        offCanvas: function (options) { return componentCreator(OffCanvas, options); },
        tab: function (options) { return componentCreator(Tab, options); },
        selectbox: function (options) { return componentCreator(Selectbox, options); },
        progress: function (options) { return componentCreator(Progress, options); },
    };
    var phonon = Object.assign(api, utils);

    return phonon;

}));
//# sourceMappingURL=phonon.js.map
