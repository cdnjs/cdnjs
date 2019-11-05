/*!
  * Notification v2.0.0-alpha.1 (https://github.com/quark-dev/Phonon-Framework)
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
        Util.Observer.subscribe({
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
        Util.Selector.removeClasses(notification, Object.values(Direction));
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
            this.registerElement({ target: buttonElement, event: Util.Event.CLICK });
        }
        var toggleButton = element.querySelector('button[data-dismiss]');
        this.registerElement({ target: buttonElement, event: Util.Event.CLICK });
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var timeout, onShown;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, Util.sleep(20)];
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
                        this.triggerEvent(Util.Event.SHOW);
                        onShown = function () {
                            _this.triggerEvent(Util.Event.SHOWN);
                            element.removeEventListener(Util.Event.TRANSITION_END, onShown);
                        };
                        element.addEventListener(Util.Event.TRANSITION_END, onShown);
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
        this.triggerEvent(Util.Event.HIDE);
        var button = this.getProp('button');
        var buttonElement = element.querySelector('button[data-dismiss]');
        if (button && buttonElement) {
            this.unregisterElement({ target: buttonElement, event: Util.Event.CLICK });
        }
        element.classList.remove('show');
        element.classList.add('hide');
        this.hideBody();
        var onHidden = function () {
            element.removeEventListener(Util.Event.TRANSITION_END, onHidden);
            element.classList.remove('hide');
            _this.triggerEvent(Util.Event.HIDDEN);
            if (_this.elementGenerated) {
                document.body.removeChild(element);
            }
        };
        element.addEventListener(Util.Event.TRANSITION_END, onHidden);
        return true;
    };
    Notification.prototype.onElementEvent = function () {
        this.hide();
    };
    return Notification;
}(Component));

module.exports = Notification;
//# sourceMappingURL=notification.js.map
