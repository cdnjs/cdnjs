(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("./utils");

var _TributeEvents = require("./TributeEvents");

var _TributeEvents2 = _interopRequireDefault(_TributeEvents);

var _TributeMenuEvents = require("./TributeMenuEvents");

var _TributeMenuEvents2 = _interopRequireDefault(_TributeMenuEvents);

var _TributeRange = require("./TributeRange");

var _TributeRange2 = _interopRequireDefault(_TributeRange);

var _TributeSearch = require("./TributeSearch");

var _TributeSearch2 = _interopRequireDefault(_TributeSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tribute = function () {
    function Tribute(_ref) {
        var _this = this;

        var _ref$values = _ref.values;
        var values = _ref$values === undefined ? null : _ref$values;
        var _ref$iframe = _ref.iframe;
        var iframe = _ref$iframe === undefined ? null : _ref$iframe;
        var _ref$selectClass = _ref.selectClass;
        var selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass;
        var _ref$trigger = _ref.trigger;
        var trigger = _ref$trigger === undefined ? '@' : _ref$trigger;
        var _ref$selectTemplate = _ref.selectTemplate;
        var selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate;
        var _ref$menuItemTemplate = _ref.menuItemTemplate;
        var menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate;
        var _ref$lookup = _ref.lookup;
        var lookup = _ref$lookup === undefined ? 'key' : _ref$lookup;
        var _ref$fillAttr = _ref.fillAttr;
        var fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr;
        var _ref$collection = _ref.collection;
        var collection = _ref$collection === undefined ? null : _ref$collection;
        var _ref$menuContainer = _ref.menuContainer;
        var menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer;
        var _ref$noMatchTemplate = _ref.noMatchTemplate;
        var noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate;

        _classCallCheck(this, Tribute);

        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                iframe: iframe,

                selectClass: selectClass,

                // function called on select that retuns the content to insert
                selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),

                // function called that returns content for an item
                menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),

                // function called when menu is empty, disables hiding of menu.
                noMatchTemplate: function (t) {
                    if (typeof t === 'function') {
                        return t.bind(_this);
                    }

                    return null;
                }(noMatchTemplate),

                // column to search against in the object
                lookup: lookup,

                // column that contains the content to insert by default
                fillAttr: fillAttr,

                // array of objects
                values: values
            }];
        } else if (collection) {
            this.collection = collection.map(function (item) {
                return {
                    trigger: item.trigger || trigger,
                    iframe: item.iframe || iframe,
                    selectClass: item.selectClass || selectClass,
                    selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
                    menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
                    // function called when menu is empty, disables hiding of menu.
                    noMatchTemplate: function (t) {
                        if (typeof t === 'function') {
                            return t.bind(_this);
                        }

                        return null;
                    }(noMatchTemplate),
                    lookup: item.lookup || lookup,
                    fillAttr: item.fillAttr || fillAttr,
                    values: item.values
                };
            });
        } else {
            throw new Error('[Tribute] No collection specified.');
        }

        new _TributeRange2.default(this);
        new _TributeEvents2.default(this);
        new _TributeMenuEvents2.default(this);
        new _TributeSearch2.default(this);
    }

    _createClass(Tribute, [{
        key: "triggers",
        value: function triggers() {
            return this.collection.map(function (config) {
                return config.trigger;
            });
        }
    }, {
        key: "attach",
        value: function attach(el) {
            if (!el) {
                throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
            }

            // Check if it is a jQuery collection
            if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
                el = el.get();
            }

            // Is el an Array/Array-like object?
            if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
                var length = el.length;
                for (var i = 0; i < length; ++i) {
                    this._attach(el[i]);
                }
            } else {
                this._attach(el);
            }
        }
    }, {
        key: "_attach",
        value: function _attach(el) {
            if (el.hasAttribute('data-tribute')) {
                console.warn('Tribute was already bound to ' + el.nodeName);
            }

            this.ensureEditable(el);
            this.events.bind(el);
            el.setAttribute('data-tribute', true);
        }
    }, {
        key: "ensureEditable",
        value: function ensureEditable(element) {
            if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
                if (element.contentEditable) {
                    element.contentEditable = true;
                } else {
                    throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
                }
            }
        }
    }, {
        key: "createMenu",
        value: function createMenu() {
            var wrapper = this.range.getDocument().createElement('div'),
                ul = this.range.getDocument().createElement('ul');

            wrapper.className = 'tribute-container';
            wrapper.appendChild(ul);

            if (this.menuContainer) {
                return this.menuContainer.appendChild(wrapper);
            }

            return this.range.getDocument().body.appendChild(wrapper);
        }
    }, {
        key: "showMenuFor",
        value: function showMenuFor(element, scrollTo) {
            var _this2 = this;

            var items = void 0;
            // create the menu if it doesn't exist.
            if (!this.menu) {
                this.menu = this.createMenu();
                this.menuEvents.bind(this.menu);
            }

            this.isActive = true;
            this.menuSelected = 0;

            if (!this.current.mentionText) {
                this.current.mentionText = '';
            }

            items = this.search.filter(this.current.mentionText, this.current.collection.values, {
                pre: '<span>',
                post: '</span>',
                extract: function extract(el) {
                    if (typeof _this2.current.collection.lookup === 'string') {
                        return el[_this2.current.collection.lookup];
                    } else if (typeof _this2.current.collection.lookup === 'function') {
                        return _this2.current.collection.lookup(el);
                    } else {
                        throw new Error('Invalid lookup attribute, lookup must be string or function.');
                    }
                }
            });

            this.current.filteredItems = items;

            var ul = this.menu.querySelector('ul');

            if (!items.length) {
                var noMatchEvent = new CustomEvent('tribute-no-match', { detail: this.menu });
                this.current.element.dispatchEvent(noMatchEvent);
                if (!this.current.collection.noMatchTemplate) {
                    this.hideMenu();
                } else {
                    ul.innerHTML = this.current.collection.noMatchTemplate();
                }

                return;
            }

            ul.innerHTML = '';

            items.forEach(function (item, index) {
                var li = _this2.range.getDocument().createElement('li');
                li.setAttribute('data-index', index);
                li.addEventListener('mouseenter', function (e) {
                    var li = e.target;
                    var index = li.getAttribute('data-index');
                    _this2.events.setActiveLi(index);
                });
                if (_this2.menuSelected === index) {
                    li.className = _this2.current.collection.selectClass;
                }
                li.innerHTML = _this2.current.collection.menuItemTemplate(item);
                ul.appendChild(li);
            });

            this.range.positionMenuAtCaret(scrollTo);
        }
    }, {
        key: "hideMenu",
        value: function hideMenu() {
            if (this.menu) {
                this.menu.style.cssText = 'display: none;';
                this.isActive = false;
                this.menuSelected = 0;
                this.current = {};
            }
        }
    }, {
        key: "selectItemAtIndex",
        value: function selectItemAtIndex(index) {
            index = parseInt(index);
            if (typeof index !== 'number') return;
            var item = this.current.filteredItems[index];
            var content = this.current.collection.selectTemplate(item);
            this.replaceText(content);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content) {
            this.range.replaceTriggerText(content, true, true);
        }
    }, {
        key: "_append",
        value: function _append(collection, newValues, replace) {
            if (!replace) {
                collection.values = collection.values.concat(newValues);
            } else {
                collection.values = newValues;
            }
        }
    }, {
        key: "append",
        value: function append(collectionIndex, newValues, replace) {
            var index = parseInt(collectionIndex);
            if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');

            var collection = this.collection[index];

            this._append(collection, newValues, replace);
        }
    }, {
        key: "appendCurrent",
        value: function appendCurrent(newValues, replace) {
            if (this.isActive) {
                this._append(this.current.collection, newValues, replace);
            } else {
                throw new Error('No active state. Please use append instead and pass an index.');
            }
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            return "@" + item.original[this.current.collection.fillAttr];
        }
    }, {
        key: "defaultMenuItemTemplate",
        value: function defaultMenuItemTemplate(matchItem) {
            return matchItem.string;
        }
    }, {
        key: "inputTypes",
        value: function inputTypes() {
            return ['TEXTAREA', 'INPUT'];
        }
    }]);

    return Tribute;
}();

exports.default = Tribute;
module.exports = exports["default"];

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeEvents = function () {
    function TributeEvents(tribute) {
        _classCallCheck(this, TributeEvents);

        this.tribute = tribute;
        this.tribute.events = this;
    }

    _createClass(TributeEvents, [{
        key: 'bind',
        value: function bind(element) {
            element.addEventListener('keydown', this.keydown.bind(element, this), false);
            element.addEventListener('keyup', this.keyup.bind(element, this), false);
            element.addEventListener('input', this.input.bind(element, this), false);
        }
    }, {
        key: 'keydown',
        value: function keydown(instance, event) {
            if (instance.shouldDeactivate(event)) {
                instance.tribute.isActive = false;
            }

            var element = this;
            instance.commandEvent = false;

            TributeEvents.keys().forEach(function (o) {
                if (o.key === event.keyCode) {
                    instance.commandEvent = true;
                    instance.callbacks()[o.value.toLowerCase()](event, element);
                }
            });
        }
    }, {
        key: 'input',
        value: function input(instance, event) {
            instance.inputEvent = true;
            instance.keyup.call(this, instance, event);
        }
    }, {
        key: 'click',
        value: function click(instance, event) {
            var tribute = instance.tribute;

            if (tribute.menu && tribute.menu.contains(event.target)) {
                var li = event.target;
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'));
                tribute.hideMenu();
            } else if (tribute.current.element) {
                tribute.hideMenu();
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, event) {
            var _this = this;

            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

            if (!instance.tribute.isActive) {
                var _ret = function () {
                    var keyCode = instance.getKeyCode(instance, _this, event);

                    if (isNaN(keyCode)) return {
                            v: void 0
                        };

                    var trigger = instance.tribute.triggers().find(function (trigger) {
                        return trigger.charCodeAt(0) === keyCode;
                    });

                    if (typeof trigger !== 'undefined') {
                        instance.callbacks().triggerChar(event, _this, trigger);
                    }
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }

            if (instance.tribute.current.trigger && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
                instance.tribute.showMenuFor(this, true);
            }
        }
    }, {
        key: 'shouldDeactivate',
        value: function shouldDeactivate(event) {
            if (!this.tribute.isActive) return false;

            if (this.tribute.current.mentionText.length === 0) {
                var eventKeyPressed = false;
                TributeEvents.keys().forEach(function (o) {
                    if (event.keyCode === o.key) eventKeyPressed = true;
                });

                return !eventKeyPressed;
            }

            return false;
        }
    }, {
        key: 'getKeyCode',
        value: function getKeyCode(instance, el, event) {
            var char = void 0;
            var tribute = instance.tribute;
            var info = tribute.range.getTriggerInfo(false, false, true);

            if (info) {
                return info.mentionTriggerChar.charCodeAt(0);
            } else {
                return false;
            }
        }
    }, {
        key: 'updateSelection',
        value: function updateSelection(el) {
            this.tribute.current.element = el;
            var info = this.tribute.range.getTriggerInfo(false, false, true);

            if (info) {
                this.tribute.current.selectedPath = info.mentionSelectedPath;
                this.tribute.current.mentionText = info.mentionText;
                this.tribute.current.selectedOffset = info.mentionSelectedOffset;
            }
        }
    }, {
        key: 'callbacks',
        value: function callbacks() {
            var _this2 = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var tribute = _this2.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;
                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this2.tribute.isActive) {
                        e.preventDefault();
                        setTimeout(function () {
                            _this2.tribute.selectItemAtIndex(_this2.tribute.menuSelected);
                            _this2.tribute.hideMenu();
                        }, 0);
                    }
                },
                escape: function escape(e, el) {
                    if (_this2.tribute.isActive) {
                        e.preventDefault();
                        _this2.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this2.callbacks().enter(e, el);
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this2.tribute.isActive) {
                        e.preventDefault();
                        var count = _this2.tribute.current.filteredItems.length,
                            selected = _this2.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this2.tribute.menuSelected--;
                            _this2.setActiveLi();
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this2.tribute.isActive) {
                        e.preventDefault();
                        var count = _this2.tribute.current.filteredItems.length - 1,
                            selected = _this2.tribute.menuSelected;

                        if (count > selected) {
                            _this2.tribute.menuSelected++;
                            _this2.setActiveLi();
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this2.tribute.isActive && _this2.tribute.current.mentionText.length < 1) {
                        _this2.tribute.hideMenu();
                    } else if (_this2.tribute.isActive) {
                        _this2.tribute.showMenuFor(el);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            if (index) this.tribute.menuSelected = index;

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    li.className = this.tribute.current.collection.selectClass;
                } else {
                    li.className = '';
                }
            }
        }
    }], [{
        key: 'keys',
        value: function keys() {
            return [{
                key: 9,
                value: 'TAB'
            }, {
                key: 8,
                value: 'DELETE'
            }, {
                key: 13,
                value: 'ENTER'
            }, {
                key: 27,
                value: 'ESCAPE'
            }, {
                key: 38,
                value: 'UP'
            }, {
                key: 40,
                value: 'DOWN'
            }];
        }
    }]);

    return TributeEvents;
}();

exports.default = TributeEvents;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TributeMenuEvents = function () {
    function TributeMenuEvents(tribute) {
        _classCallCheck(this, TributeMenuEvents);

        this.tribute = tribute;
        this.tribute.menuEvents = this;
        this.menu = this.tribute.menu;
    }

    _createClass(TributeMenuEvents, [{
        key: 'bind',
        value: function bind(menu) {
            var _this = this;

            menu.addEventListener('keydown', this.tribute.events.keydown.bind(this.menu, this), false);
            this.tribute.range.getDocument().addEventListener('click', this.tribute.events.click.bind(null, this), false);
            window.addEventListener('resize', this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.showMenuFor(_this.tribute.current.element, true);
                }
            }, 300, false));

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.debounce(function () {
                    if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(_this.tribute.current.element, false);
                    }
                }, 300, false), false);
            } else {
                window.onscroll = this.debounce(function () {
                    if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(_this.tribute.current.element, false);
                    }
                }, 300, false);
            }
        }
    }, {
        key: 'debounce',
        value: function debounce(func, wait, immediate) {
            var _this2 = this,
                _arguments = arguments;

            var timeout;
            return function () {
                var context = _this2,
                    args = _arguments;
                var later = function later() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
    }]);

    return TributeMenuEvents;
}();

exports.default = TributeMenuEvents;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/jeff-collins/ment.io

var TributeRange = function () {
    function TributeRange(tribute) {
        _classCallCheck(this, TributeRange);

        this.tribute = tribute;
        this.tribute.range = this;
    }

    _createClass(TributeRange, [{
        key: 'getDocument',
        value: function getDocument() {
            var iframe = void 0;
            if (this.tribute.current.collection) {
                iframe = this.tribute.current.collection.iframe;
            }

            if (!iframe) {
                return document;
            }

            return iframe.contentWindow.document;
        }
    }, {
        key: 'positionMenuAtCaret',
        value: function positionMenuAtCaret(scrollTo) {
            var _this = this;

            var context = this.tribute.current,
                coordinates = void 0;
            var info = this.getTriggerInfo(false, false, true);

            if (info !== undefined) {
                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.getDocument().activeElement, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                // Move the button into place.
                this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                       left: ' + coordinates.left + 'px;\n                                       position: absolute;\n                                       zIndex: 10000;\n                                       display: block;';

                setTimeout(function () {
                    if (scrollTo) _this.scrollIntoView(_this.getDocument().activeElement);
                }, 0);
            } else {
                this.tribute.menu.style.cssText = 'display: none';
            }
        }
    }, {
        key: 'selectElement',
        value: function selectElement(targetElement, path, offset) {
            var range = void 0;
            var elem = targetElement;

            if (path) {
                for (var i = 0; i < path.length; i++) {
                    elem = elem.childNodes[path[i]];
                    if (elem === undefined) {
                        return;
                    }
                    while (elem.length < offset) {
                        offset -= elem.length;
                        elem = elem.nextSibling;
                    }
                    if (elem.childNodes.length === 0 && !elem.length) {
                        elem = elem.previousSibling;
                    }
                }
            }
            var sel = this.getWindowSelection();

            range = this.getDocument().createRange();
            range.setStart(elem, offset);
            range.setEnd(elem, offset);
            range.collapse(true);

            try {
                sel.removeAllRanges();
            } catch (error) {}

            sel.addRange(range);
            targetElement.focus();
        }
    }, {
        key: 'resetSelection',
        value: function resetSelection(targetElement, path, offset) {
            if (!this.isContentEditable(targetElement)) {
                if (targetElement !== this.getDocument().activeElement) {
                    targetElement.focus();
                }
            } else {
                this.selectElement(targetElement, path, offset);
            }
        }
    }, {
        key: 'replaceTriggerText',
        value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace) {
            var context = this.tribute.current;
            this.resetSelection(context.element, context.selectedPath, context.selectedOffset);

            var info = this.getTriggerInfo(requireLeadingSpace, true, hasTrailingSpace);

            // Create the event
            var replaceEvent = new CustomEvent('tribute-replaced', {
                detail: text
            });

            if (info !== undefined) {
                if (!this.isContentEditable(context.element)) {
                    var myField = this.getDocument().activeElement;
                    text += ' ';
                    var startPos = info.mentionPosition;
                    var endPos = info.mentionPosition + info.mentionText.length + 1;
                    myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
                    myField.selectionStart = startPos + text.length;
                    myField.selectionEnd = startPos + text.length;
                } else {
                    // add a space to the end of the pasted text
                    text += '\xA0';
                    this.pasteHtml(text, info.mentionPosition, info.mentionPosition + info.mentionText.length + 1);
                }

                context.element.dispatchEvent(replaceEvent);
            }
        }
    }, {
        key: 'pasteHtml',
        value: function pasteHtml(html, startPos, endPos) {
            var range = void 0,
                sel = void 0;
            sel = this.getWindowSelection();
            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, startPos);
            range.setEnd(sel.anchorNode, endPos);
            range.deleteContents();

            var el = this.getDocument().createElement('div');
            el.innerHTML = html;
            var frag = this.getDocument().createDocumentFragment(),
                node = void 0,
                lastNode = void 0;
            while (node = el.firstChild) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }, {
        key: 'getWindowSelection',
        value: function getWindowSelection() {
            if (this.tribute.collection.iframe) {
                return this.tribute.collection.iframe.contentWindow.getSelection();
            }

            return window.getSelection();
        }
    }, {
        key: 'getNodePositionInParent',
        value: function getNodePositionInParent(element) {
            if (element.parentNode === null) {
                return 0;
            }

            for (var i = 0; i < element.parentNode.childNodes.length; i++) {
                var node = element.parentNode.childNodes[i];

                if (node === element) {
                    return i;
                }
            }
        }
    }, {
        key: 'getContentEditableSelectedPath',
        value: function getContentEditableSelectedPath() {
            // content editable
            var sel = this.getWindowSelection();
            var selected = sel.anchorNode;
            var path = [];
            var offset = void 0;

            if (selected != null) {
                var i = void 0;
                var ce = selected.contentEditable;
                while (selected !== null && ce !== 'true') {
                    i = this.getNodePositionInParent(selected);
                    path.push(i);
                    selected = selected.parentNode;
                    if (selected !== null) {
                        ce = selected.contentEditable;
                    }
                }
                path.reverse();

                // getRangeAt may not exist, need alternative
                offset = sel.getRangeAt(0).startOffset;

                return {
                    selected: selected,
                    path: path,
                    offset: offset
                };
            }
        }
    }, {
        key: 'getTextPrecedingCurrentSelection',
        value: function getTextPrecedingCurrentSelection() {
            var context = this.tribute.current,
                text = void 0;

            if (!this.isContentEditable(context.element)) {
                var textComponent = this.getDocument().activeElement;
                var startPos = textComponent.selectionStart;
                text = textComponent.value.substring(0, startPos);
            } else {
                var selectedElem = this.getWindowSelection().anchorNode;

                if (selectedElem != null) {
                    var workingNodeContent = selectedElem.textContent;
                    var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                    if (selectStartOffset >= 0) {
                        text = workingNodeContent.substring(0, selectStartOffset);
                    }
                }
            }

            return text;
        }
    }, {
        key: 'getTriggerInfo',
        value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace) {
            var _this2 = this;

            var ctx = this.tribute.current;
            var selected = void 0,
                path = void 0,
                offset = void 0;

            if (!this.isContentEditable(ctx.element)) {
                selected = this.getDocument().activeElement;
            } else {
                // content editable
                var selectionInfo = this.getContentEditableSelectedPath();

                if (selectionInfo) {
                    selected = selectionInfo.selected;
                    path = selectionInfo.path;
                    offset = selectionInfo.offset;
                }
            }

            var effectiveRange = this.getTextPrecedingCurrentSelection();

            if (effectiveRange !== undefined && effectiveRange !== null) {
                var _ret = function () {
                    var mostRecentTriggerCharPos = -1;
                    var triggerChar = void 0;

                    _this2.tribute.triggers().forEach(function (c) {
                        var idx = effectiveRange.lastIndexOf(c);

                        if (idx > mostRecentTriggerCharPos) {
                            mostRecentTriggerCharPos = idx;
                            triggerChar = c;
                        }
                    });

                    if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
                        var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + 1, effectiveRange.length);

                        triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + 1);
                        var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
                        var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');
                        if (hasTrailingSpace) {
                            currentTriggerSnippet = currentTriggerSnippet.trim();
                        }
                        if (!leadingSpace && (menuAlreadyActive || !/[\xA0\s]/g.test(currentTriggerSnippet))) {
                            return {
                                v: {
                                    mentionPosition: mostRecentTriggerCharPos,
                                    mentionText: currentTriggerSnippet,
                                    mentionSelectedElement: selected,
                                    mentionSelectedPath: path,
                                    mentionSelectedOffset: offset,
                                    mentionTriggerChar: triggerChar
                                }
                            };
                        }
                    }
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    }, {
        key: 'isContentEditable',
        value: function isContentEditable(element) {
            return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
        }
    }, {
        key: 'getTextAreaOrInputUnderlinePosition',
        value: function getTextAreaOrInputUnderlinePosition(element, position) {
            var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];

            var isFirefox = window.mozInnerScreenX !== null;

            var div = this.getDocument().createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            this.getDocument().body.appendChild(div);

            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;

            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT') {
                style.wordWrap = 'break-word';
            }

            // position off-screen
            style.position = 'absolute';
            style.visibility = 'hidden';

            // transfer the element's properties to the div
            properties.forEach(function (prop) {
                style[prop] = computed[prop];
            });

            if (isFirefox) {
                style.width = parseInt(computed.width) - 2 + 'px';
                if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
            } else {
                style.overflow = 'hidden';
            }

            div.textContent = element.value.substring(0, position);

            if (element.nodeName === 'INPUT') {
                div.textContent = div.textContent.replace(/\s/g, ' ');
            }

            var span = this.getDocument().createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);

            var rect = element.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            var coordinates = {
                top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize),
                left: rect.left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
            };

            this.getDocument().body.removeChild(div);

            return coordinates;
        }
    }, {
        key: 'getContentEditableCaretPosition',
        value: function getContentEditableCaretPosition(selectedNodePosition) {
            var markerTextChar = '﻿';
            var markerEl = void 0,
                markerId = 'sel_' + new Date().getTime() + '_' + Math.random().toString().substr(2);
            var range = void 0;
            var sel = this.getWindowSelection();
            var prevRange = sel.getRangeAt(0);

            range = this.getDocument().createRange();
            range.setStart(sel.anchorNode, selectedNodePosition);
            range.setEnd(sel.anchorNode, selectedNodePosition);

            range.collapse(false);

            // Create the marker element containing a single invisible character using DOM methods and insert it
            markerEl = this.getDocument().createElement('span');
            markerEl.id = markerId;
            markerEl.appendChild(this.getDocument().createTextNode(markerTextChar));
            range.insertNode(markerEl);
            sel.removeAllRanges();
            sel.addRange(prevRange);

            var rect = markerEl.getBoundingClientRect();
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
            var coordinates = {
                left: rect.left + windowLeft,
                top: rect.top + markerEl.offsetHeight + windowTop
            };

            markerEl.parentNode.removeChild(markerEl);
            return coordinates;
        }
    }, {
        key: 'scrollIntoView',
        value: function scrollIntoView(elem) {
            var reasonableBuffer = 20,
                clientRect = void 0;
            var maxScrollDisplacement = 100;
            var e = elem;

            while (clientRect === undefined || clientRect.height === 0) {
                clientRect = e.getBoundingClientRect();

                if (clientRect.height === 0) {
                    e = e.childNodes[0];
                    if (e === undefined || !e.getBoundingClientRect) {
                        return;
                    }
                }
            }

            var elemTop = clientRect.top;
            var elemBottom = elemTop + clientRect.height;

            if (elemTop < 0) {
                window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
            } else if (elemBottom > window.innerHeight) {
                var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

                if (maxY - window.pageYOffset > maxScrollDisplacement) {
                    maxY = window.pageYOffset + maxScrollDisplacement;
                }

                var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

                if (targetY > maxY) {
                    targetY = maxY;
                }

                window.scrollTo(0, targetY);
            }
        }
    }]);

    return TributeRange;
}();

exports.default = TributeRange;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Thanks to https://github.com/mattyork/fuzzy

var TributeSearch = function () {
    function TributeSearch(tribute) {
        _classCallCheck(this, TributeSearch);

        this.tribute = tribute;
        this.tribute.search = this;
    }

    _createClass(TributeSearch, [{
        key: 'simpleFilter',
        value: function simpleFilter(pattern, array) {
            var _this = this;

            return array.filter(function (string) {
                return _this.test(pattern, string);
            });
        }
    }, {
        key: 'test',
        value: function test(pattern, string) {
            return this.match(pattern, string) !== null;
        }
    }, {
        key: 'match',
        value: function match(pattern, string, opts) {
            opts = opts || {};
            var patternIdx = 0,
                result = [],
                len = string.length,
                totalScore = 0,
                currScore = 0,
                pre = opts.pre || '',
                post = opts.post || '',
                compareString = opts.caseSensitive && string || string.toLowerCase(),
                ch = void 0,
                compareChar = void 0;

            pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

            var patternCache = this.traverse(compareString, pattern, 0, 0, []);
            if (!patternCache) {
                return null;
            }

            return {
                rendered: this.render(string, patternCache.cache, pre, post),
                score: patternCache.score
            };
        }
    }, {
        key: 'traverse',
        value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
            // if the pattern search at end
            if (pattern.length === patternIndex) {

                // calculate socre and copy the cache containing the indices where it's found
                return {
                    score: this.calculateScore(patternCache),
                    cache: patternCache.slice()
                };
            }

            // if string at end or remaining pattern > remaining string
            if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
                return undefined;
            }

            var c = pattern[patternIndex];
            var index = string.indexOf(c, stringIndex);
            var best = void 0,
                temp = void 0;

            while (index > -1) {
                patternCache.push(index);
                temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
                patternCache.pop();

                // if downstream traversal failed, return best answer so far
                if (!temp) {
                    return best;
                }

                if (!best || best.score < temp.score) {
                    best = temp;
                }

                index = string.indexOf(c, index + 1);
            }

            return best;
        }
    }, {
        key: 'calculateScore',
        value: function calculateScore(patternCache) {
            var score = 0;
            var temp = 1;

            patternCache.forEach(function (index, i) {
                if (i > 0) {
                    if (patternCache[i - 1] + 1 === index) {
                        temp += temp + 1;
                    } else {
                        temp = 1;
                    }
                }

                score += temp;
            });

            return score;
        }
    }, {
        key: 'render',
        value: function render(string, indices, pre, post) {
            var rendered = string.substring(0, indices[0]);

            indices.forEach(function (index, i) {
                rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
            });

            return rendered;
        }
    }, {
        key: 'filter',
        value: function filter(pattern, arr, opts) {
            var _this2 = this;

            opts = opts || {};
            return arr.reduce(function (prev, element, idx, arr) {
                var str = element;

                if (opts.extract) {
                    str = opts.extract(element);

                    if (!str) {
                        // take care of undefineds / nulls / etc.
                        str = '';
                    }
                }

                var rendered = _this2.match(pattern, str, opts);

                if (rendered != null) {
                    prev[prev.length] = {
                        string: rendered.rendered,
                        score: rendered.score,
                        index: idx,
                        original: element
                    };
                }

                return prev;
            }, []).sort(function (a, b) {
                var compare = b.score - a.score;
                if (compare) return compare;
                return a.index - b.index;
            });
        }
    }]);

    return TributeSearch;
}();

exports.default = TributeSearch;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tribute = require("./Tribute");

var _Tribute2 = _interopRequireDefault(_Tribute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Tribute2.default; /**
                                     * Tribute.js
                                     * Native ES6 JavaScript @mention Plugin
                                     **/

module.exports = exports["default"];

},{"./Tribute":1}],7:[function(require,module,exports){
'use strict';

if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

(function () {

    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();

},{}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxPO0FBQ0YsMkJBWUc7QUFBQTs7QUFBQSwrQkFYQyxNQVdEO0FBQUEsWUFYQyxNQVdELCtCQVhVLElBV1Y7QUFBQSwrQkFWQyxNQVVEO0FBQUEsWUFWQyxNQVVELCtCQVZVLElBVVY7QUFBQSxvQ0FUQyxXQVNEO0FBQUEsWUFUQyxXQVNELG9DQVRlLFdBU2Y7QUFBQSxnQ0FSQyxPQVFEO0FBQUEsWUFSQyxPQVFELGdDQVJXLEdBUVg7QUFBQSx1Q0FQQyxjQU9EO0FBQUEsWUFQQyxjQU9ELHVDQVBrQixJQU9sQjtBQUFBLHlDQU5DLGdCQU1EO0FBQUEsWUFOQyxnQkFNRCx5Q0FOb0IsSUFNcEI7QUFBQSwrQkFMQyxNQUtEO0FBQUEsWUFMQyxNQUtELCtCQUxVLEtBS1Y7QUFBQSxpQ0FKQyxRQUlEO0FBQUEsWUFKQyxRQUlELGlDQUpZLE9BSVo7QUFBQSxtQ0FIQyxVQUdEO0FBQUEsWUFIQyxVQUdELG1DQUhjLElBR2Q7QUFBQSxzQ0FGQyxhQUVEO0FBQUEsWUFGQyxhQUVELHNDQUZpQixJQUVqQjtBQUFBLHdDQURDLGVBQ0Q7QUFBQSxZQURDLGVBQ0Qsd0NBRG1CLElBQ25COztBQUFBOztBQUVDLGFBQUssWUFBTCxHQUFvQixDQUFwQjtBQUNBLGFBQUssT0FBTCxHQUFlLEVBQWY7QUFDQSxhQUFLLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxh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QUFZLFNBQVosR0FBd0IsT0FBTyxLQUFQLENBQWEsU0FBckM7O0FBRUEsV0FBTyxXQUFQLEdBQXFCLFdBQXJCO0FBQ0gsQ0FsQkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFwiLi91dGlsc1wiO1xuaW1wb3J0IFRyaWJ1dGVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVNZW51RXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVNZW51RXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZVJhbmdlIGZyb20gXCIuL1RyaWJ1dGVSYW5nZVwiO1xuaW1wb3J0IFRyaWJ1dGVTZWFyY2ggZnJvbSBcIi4vVHJpYnV0ZVNlYXJjaFwiO1xuXG5jbGFzcyBUcmlidXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHZhbHVlcyA9IG51bGwsXG4gICAgICAgIGlmcmFtZSA9IG51bGwsXG4gICAgICAgIHNlbGVjdENsYXNzID0gJ2hpZ2hsaWdodCcsXG4gICAgICAgIHRyaWdnZXIgPSAnQCcsXG4gICAgICAgIHNlbGVjdFRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIGxvb2t1cCA9ICdrZXknLFxuICAgICAgICBmaWxsQXR0ciA9ICd2YWx1ZScsXG4gICAgICAgIGNvbGxlY3Rpb24gPSBudWxsLFxuICAgICAgICBtZW51Q29udGFpbmVyID0gbnVsbCxcbiAgICAgICAgbm9NYXRjaFRlbXBsYXRlID0gbnVsbFxuICAgIH0pIHtcblxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IG1lbnVDb250YWluZXJcblxuICAgICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBbe1xuICAgICAgICAgICAgICAgIC8vIHN5bWJvbCB0aGF0IHN0YXJ0cyB0aGUgbG9va3VwXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcblxuICAgICAgICAgICAgICAgIGlmcmFtZTogaWZyYW1lLFxuXG4gICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6IHNlbGVjdENsYXNzLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIG9uIHNlbGVjdCB0aGF0IHJldHVucyB0aGUgY29udGVudCB0byBpbnNlcnRcbiAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKHNlbGVjdFRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdFNlbGVjdFRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHRoYXQgcmV0dXJucyBjb250ZW50IGZvciBhbiBpdGVtXG4gICAgICAgICAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZTogKG1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIG1lbnUgaXMgZW1wdHksIGRpc2FibGVzIGhpZGluZyBvZiBtZW51LlxuICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfSkobm9NYXRjaFRlbXBsYXRlKSxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0byBzZWFyY2ggYWdhaW5zdCBpbiB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgbG9va3VwOiBsb29rdXAsXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdGhhdCBjb250YWlucyB0aGUgY29udGVudCB0byBpbnNlcnQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgICAgIGZpbGxBdHRyOiBmaWxsQXR0cixcblxuICAgICAgICAgICAgICAgIC8vIGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHVlc1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBsb29rdXA6IGl0ZW0ubG9va3VwIHx8IGxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEF0dHI6IGl0ZW0uZmlsbEF0dHIgfHwgZmlsbEF0dHIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogaXRlbS52YWx1ZXNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTm8gY29sbGVjdGlvbiBzcGVjaWZpZWQuJylcbiAgICAgICAgfVxuXG4gICAgICAgIG5ldyBUcmlidXRlUmFuZ2UodGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVNZW51RXZlbnRzKHRoaXMpXG4gICAgICAgIG5ldyBUcmlidXRlU2VhcmNoKHRoaXMpXG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRTZWxlY3RUZW1wbGF0ZShpdGVtKSB7XG4gICAgICAgIHJldHVybiBgQCR7aXRlbS5vcmlnaW5hbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5maWxsQXR0cl19YFxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZShtYXRjaEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoSXRlbS5zdHJpbmdcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5wdXRUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIFsnVEVYVEFSRUEnLCAnSU5QVVQnXVxuICAgIH1cblxuICAgIHRyaWdnZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLm1hcChjb25maWcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50cmlnZ2VyXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXR0YWNoKGVsKSB7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIE11c3QgcGFzcyBpbiBhIERPTSBub2RlIG9yIE5vZGVMaXN0LicpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBpdCBpcyBhIGpRdWVyeSBjb2xsZWN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiBlbCBpbnN0YW5jZW9mIGpRdWVyeSkge1xuICAgICAgICAgICAgZWwgPSBlbC5nZXQoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXMgZWwgYW4gQXJyYXkvQXJyYXktbGlrZSBvYmplY3Q/XG4gICAgICAgIGlmIChlbC5jb25zdHJ1Y3RvciA9PT0gTm9kZUxpc3QgfHwgZWwuY29uc3RydWN0b3IgPT09IEhUTUxDb2xsZWN0aW9uIHx8IGVsLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IGVsLmxlbmd0aFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaChlbFtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaChlbClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hdHRhY2goZWwpIHtcbiAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS10cmlidXRlJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVHJpYnV0ZSB3YXMgYWxyZWFkeSBib3VuZCB0byAnICsgZWwubm9kZU5hbWUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuc3VyZUVkaXRhYmxlKGVsKVxuICAgICAgICB0aGlzLmV2ZW50cy5iaW5kKGVsKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScsIHRydWUpXG4gICAgfVxuXG4gICAgZW5zdXJlRWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICBpZiAoVHJpYnV0ZS5pbnB1dFR5cGVzKCkuaW5kZXhPZihlbGVtZW50Lm5vZGVOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY29udGVudEVkaXRhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBDYW5ub3QgYmluZCB0byAnICsgZWxlbWVudC5ub2RlTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZU1lbnUoKSB7XG4gICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgdWwgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ3RyaWJ1dGUtY29udGFpbmVyJ1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHVsKVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yKGVsZW1lbnQsIHNjcm9sbFRvKSB7XG4gICAgICAgIGxldCBpdGVtc1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBtZW51IGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLmNyZWF0ZU1lbnUoKVxuICAgICAgICAgICAgdGhpcy5tZW51RXZlbnRzLmJpbmQodGhpcy5tZW51KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG5cbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnQubWVudGlvblRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCA9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcyA9IHRoaXMuc2VhcmNoLmZpbHRlcih0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcywge1xuICAgICAgICAgICAgcHJlOiAnPHNwYW4+JyxcbiAgICAgICAgICAgIHBvc3Q6ICc8L3NwYW4+JyxcbiAgICAgICAgICAgIGV4dHJhY3Q6IChlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwXVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBsb29rdXAgYXR0cmlidXRlLCBsb29rdXAgbXVzdCBiZSBzdHJpbmcgb3IgZnVuY3Rpb24uJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXMgPSBpdGVtc1xuXG4gICAgICAgIGxldCB1bCA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgICAgaWYgKCFpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBub01hdGNoRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtbm8tbWF0Y2gnLCB7IGRldGFpbDogdGhpcy5tZW51IH0pXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5vTWF0Y2hFdmVudClcbiAgICAgICAgICAgIGlmICghdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubm9NYXRjaFRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVsLmlubmVySFRNTCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgdWwuaW5uZXJIVE1MID0gJydcblxuICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IGxpID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KVxuICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBsaSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICBsZXQgaW5kZXggPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKVxuICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBpZiAodGhpcy5tZW51U2VsZWN0ZWQgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpLmlubmVySFRNTCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm1lbnVJdGVtVGVtcGxhdGUoaXRlbSlcbiAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICB9KVxuXG4gICAgICAgIHRoaXMucmFuZ2UucG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbylcblxuICAgIH1cblxuICAgIGhpZGVNZW51KCkge1xuICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lOydcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0SXRlbUF0SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVyblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zW2luZGV4XVxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdFRlbXBsYXRlKGl0ZW0pXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHQoY29udGVudClcbiAgICB9XG5cbiAgICByZXBsYWNlVGV4dChjb250ZW50KSB7XG4gICAgICAgIHRoaXMucmFuZ2UucmVwbGFjZVRyaWdnZXJUZXh0KGNvbnRlbnQsIHRydWUsIHRydWUpXG4gICAgfVxuXG4gICAgX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKCFyZXBsYWNlKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IGNvbGxlY3Rpb24udmFsdWVzLmNvbmNhdChuZXdWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kKGNvbGxlY3Rpb25JbmRleCwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KGNvbGxlY3Rpb25JbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcigncGxlYXNlIHByb3ZpZGUgYW4gaW5kZXggZm9yIHRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZS4nKVxuXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uW2luZGV4XVxuXG4gICAgICAgIHRoaXMuX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpXG4gICAgfVxuXG4gICAgYXBwZW5kQ3VycmVudChuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZCh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc3RhdGUuIFBsZWFzZSB1c2UgYXBwZW5kIGluc3RlYWQgYW5kIHBhc3MgYW4gaW5kZXguJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImNsYXNzIFRyaWJ1dGVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuZXZlbnRzID0gdGhpc1xuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogOSxcbiAgICAgICAgICAgIHZhbHVlOiAnVEFCJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDgsXG4gICAgICAgICAgICB2YWx1ZTogJ0RFTEVURSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAxMyxcbiAgICAgICAgICAgIHZhbHVlOiAnRU5URVInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMjcsXG4gICAgICAgICAgICB2YWx1ZTogJ0VTQ0FQRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzOCxcbiAgICAgICAgICAgIHZhbHVlOiAnVVAnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogNDAsXG4gICAgICAgICAgICB2YWx1ZTogJ0RPV04nXG4gICAgICAgIH1dXG4gICAgfVxuXG4gICAgYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICB0aGlzLmtleWRvd24uYmluZChlbGVtZW50LCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgdGhpcy5rZXl1cC5iaW5kKGVsZW1lbnQsIHRoaXMpLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICB0aGlzLmlucHV0LmJpbmQoZWxlbWVudCwgdGhpcyksIGZhbHNlKVxuICAgIH1cblxuICAgIGtleWRvd24oaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5zaG91bGREZWFjdGl2YXRlKGV2ZW50KSkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXNcbiAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgaWYgKG8ua2V5ID09PSBldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW28udmFsdWUudG9Mb3dlckNhc2UoKV0oZXZlbnQsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5wdXQoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSB0cnVlXG4gICAgICAgIGluc3RhbmNlLmtleXVwLmNhbGwodGhpcywgaW5zdGFuY2UsIGV2ZW50KVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcblxuICAgICAgICBpZiAodHJpYnV0ZS5tZW51ICYmIHRyaWJ1dGUubWVudS5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBldmVudC50YXJnZXRcbiAgICAgICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGknKSB7XG4gICAgICAgICAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKCFsaSB8fCBsaSA9PT0gdHJpYnV0ZS5tZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZpbmQgdGhlIDxsaT4gY29udGFpbmVyIGZvciB0aGUgY2xpY2snKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyaWJ1dGUuc2VsZWN0SXRlbUF0SW5kZXgobGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpXG4gICAgICAgICAgICB0cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgfSBlbHNlIGlmICh0cmlidXRlLmN1cnJlbnQuZWxlbWVudCkge1xuICAgICAgICAgICAgdHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXl1cChpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlLmlucHV0RXZlbnQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlLnVwZGF0ZVNlbGVjdGlvbih0aGlzKVxuXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykgcmV0dXJuXG5cbiAgICAgICAgaWYgKCFpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBsZXQga2V5Q29kZSA9IGluc3RhbmNlLmdldEtleUNvZGUoaW5zdGFuY2UsIHRoaXMsIGV2ZW50KVxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oa2V5Q29kZSkpIHJldHVyblxuXG4gICAgICAgICAgICBsZXQgdHJpZ2dlciA9IGluc3RhbmNlLnRyaWJ1dGUudHJpZ2dlcnMoKS5maW5kKHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyLmNoYXJDb2RlQXQoMCkgPT09IGtleUNvZGVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKS50cmlnZ2VyQ2hhcihldmVudCwgdGhpcywgdHJpZ2dlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnN0YW5jZS50cmlidXRlLmN1cnJlbnQudHJpZ2dlciAmJiBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPT09IGZhbHNlXG4gICAgICAgICAgICB8fCBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlICYmIGV2ZW50LmtleUNvZGUgPT09IDgpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcywgdHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZERlYWN0aXZhdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBldmVudEtleVByZXNzZWQgPSBmYWxzZVxuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gby5rZXkpIGV2ZW50S2V5UHJlc3NlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiAhZXZlbnRLZXlQcmVzc2VkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBnZXRLZXlDb2RlKGluc3RhbmNlLCBlbCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGNoYXJcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGxldCBpbmZvID0gdHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgZmFsc2UsIHRydWUpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvLm1lbnRpb25UcmlnZ2VyQ2hhci5jaGFyQ29kZUF0KDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbihlbCkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50ID0gZWxcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZFBhdGggPSBpbmZvLm1lbnRpb25TZWxlY3RlZFBhdGhcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0ID0gaW5mby5tZW50aW9uVGV4dFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRPZmZzZXQgPSBpbmZvLm1lbnRpb25TZWxlY3RlZE9mZnNldFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2tzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJpZ2dlckNoYXI6IChlLCBlbCwgdHJpZ2dlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0cmlidXRlID0gdGhpcy50cmlidXRlXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbkl0ZW0gPSB0cmlidXRlLmNvbGxlY3Rpb24uZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHJpZ2dlciA9PT0gdHJpZ2dlclxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25JdGVtXG4gICAgICAgICAgICAgICAgaWYgKHRyaWJ1dGUuaW5wdXRFdmVudCkgdHJpYnV0ZS5zaG93TWVudUZvcihlbCwgdHJ1ZSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlcjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNlbGVjdEl0ZW1BdEluZGV4KHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGU6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgdXAgdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5maWx0ZXJlZEl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkICYmIHNlbGVjdGVkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZC0tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgZG93biB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWxldGU6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgdGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcihlbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRBY3RpdmVMaShpbmRleCkge1xuICAgICAgICBsZXQgbGlzID0gdGhpcy50cmlidXRlLm1lbnUucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGxpcy5sZW5ndGggPj4+IDBcblxuICAgICAgICBpZiAoaW5kZXgpIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQgPSBpbmRleDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBsaXNbaV1cbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RDbGFzc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5jbGFzc05hbWUgPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVFdmVudHM7XG4iLCJjbGFzcyBUcmlidXRlTWVudUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51RXZlbnRzID0gdGhpc1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLnRyaWJ1dGUubWVudVxuICAgIH1cblxuICAgIGJpbmQobWVudSkge1xuICAgICAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cy5rZXlkb3duLmJpbmQodGhpcy5tZW51LCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMuY2xpY2suYmluZChudWxsLCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSkpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCwgZmFsc2UpLCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5vbnNjcm9sbCA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCwgZmFsc2UpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dFxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICAgICAgICAgIHZhciBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdClcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZU1lbnVFdmVudHM7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL2plZmYtY29sbGlucy9tZW50LmlvXG5jbGFzcyBUcmlidXRlUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UgPSB0aGlzXG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBpZnJhbWVcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uaWZyYW1lXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnRcbiAgICB9XG5cbiAgICBwb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICBjb29yZGluYXRlc1xuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlKVxuXG4gICAgICAgIGlmIChpbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLmdldFRleHRBcmVhT3JJbnB1dFVuZGVybGluZVBvc2l0aW9uKHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5nZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNb3ZlIHRoZSBidXR0b24gaW50byBwbGFjZS5cbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2Nvb3JkaW5hdGVzLnRvcH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICR7Y29vcmRpbmF0ZXMubGVmdH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztgXG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxUbykgdGhpcy5zY3JvbGxJbnRvVmlldyh0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudClcbiAgICAgICAgICAgIH0sIDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gJ2Rpc3BsYXk6IG5vbmUnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZWxlY3RFbGVtZW50KHRhcmdldEVsZW1lbnQsIHBhdGgsIG9mZnNldCkge1xuICAgICAgICBsZXQgcmFuZ2VcbiAgICAgICAgbGV0IGVsZW0gPSB0YXJnZXRFbGVtZW50XG5cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLmNoaWxkTm9kZXNbcGF0aFtpXV1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoZWxlbS5sZW5ndGggPCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0IC09IGVsZW0ubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLm5leHRTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbGVtLmNoaWxkTm9kZXMubGVuZ3RoID09PSAwICYmICFlbGVtLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5wcmV2aW91c1NpYmxpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KGVsZW0sIG9mZnNldClcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKGVsZW0sIG9mZnNldClcbiAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuXG4gICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5mb2N1cygpXG4gICAgfVxuXG4gICAgcmVzZXRTZWxlY3Rpb24odGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZSh0YXJnZXRFbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQgIT09IHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5mb2N1cygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQodGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwbGFjZVRyaWdnZXJUZXh0KHRleHQsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGhhc1RyYWlsaW5nU3BhY2UpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuICAgICAgICB0aGlzLnJlc2V0U2VsZWN0aW9uKGNvbnRleHQuZWxlbWVudCwgY29udGV4dC5zZWxlY3RlZFBhdGgsIGNvbnRleHQuc2VsZWN0ZWRPZmZzZXQpXG5cbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKHJlcXVpcmVMZWFkaW5nU3BhY2UsIHRydWUsIGhhc1RyYWlsaW5nU3BhY2UpXG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBldmVudFxuICAgICAgICBsZXQgcmVwbGFjZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0cmlidXRlLXJlcGxhY2VkJywge1xuICAgICAgICAgICAgZGV0YWlsOiB0ZXh0XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlGaWVsZCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgdGV4dCArPSAnICdcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvblxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgMVxuICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUgPSBteUZpZWxkLnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcykgKyB0ZXh0ICtcbiAgICAgICAgICAgICAgICAgICAgbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoZW5kUG9zLCBteUZpZWxkLnZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvblN0YXJ0ID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgICAgIG15RmllbGQuc2VsZWN0aW9uRW5kID0gc3RhcnRQb3MgKyB0ZXh0Lmxlbmd0aFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBhZGQgYSBzcGFjZSB0byB0aGUgZW5kIG9mIHRoZSBwYXN0ZWQgdGV4dFxuICAgICAgICAgICAgICAgIHRleHQgKz0gJ1xceEEwJ1xuICAgICAgICAgICAgICAgIHRoaXMucGFzdGVIdG1sKHRleHQsIGluZm8ubWVudGlvblBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgMSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5lbGVtZW50LmRpc3BhdGNoRXZlbnQocmVwbGFjZUV2ZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzdGVIdG1sKGh0bWwsIHN0YXJ0UG9zLCBlbmRQb3MpIHtcbiAgICAgICAgbGV0IHJhbmdlLCBzZWxcbiAgICAgICAgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzdGFydFBvcylcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBlbmRQb3MpXG4gICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKClcblxuICAgICAgICBsZXQgZWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gaHRtbFxuICAgICAgICBsZXQgZnJhZyA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgICAgICBub2RlLCBsYXN0Tm9kZVxuICAgICAgICB3aGlsZSAoKG5vZGUgPSBlbC5maXJzdENoaWxkKSkge1xuICAgICAgICAgICAgbGFzdE5vZGUgPSBmcmFnLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShmcmFnKVxuXG4gICAgICAgIC8vIFByZXNlcnZlIHRoZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKGxhc3ROb2RlKSB7XG4gICAgICAgICAgICByYW5nZSA9IHJhbmdlLmNsb25lUmFuZ2UoKVxuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnRBZnRlcihsYXN0Tm9kZSlcbiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFdpbmRvd1NlbGVjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmlmcmFtZS5jb250ZW50V2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgfVxuXG4gICAgZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2Rlc1tpXVxuXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVTZWxlY3RlZFBhdGgoKSB7XG4gICAgICAgIC8vIGNvbnRlbnQgZWRpdGFibGVcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICAgICAgbGV0IHBhdGggPSBbXVxuICAgICAgICBsZXQgb2Zmc2V0XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpXG4gICAgICAgICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICAgICAgLy8gZ2V0UmFuZ2VBdCBtYXkgbm90IGV4aXN0LCBuZWVkIGFsdGVybmF0aXZlXG4gICAgICAgICAgICBvZmZzZXQgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIHRleHRcblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgbGV0IHRleHRDb21wb25lbnQgPSB0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudFxuICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gdGV4dENvbXBvbmVudC5zZWxlY3Rpb25TdGFydFxuICAgICAgICAgICAgdGV4dCA9IHRleHRDb21wb25lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKS5hbmNob3JOb2RlXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEVsZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB3b3JraW5nTm9kZUNvbnRlbnQgPSBzZWxlY3RlZEVsZW0udGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0U3RhcnRPZmZzZXQgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB3b3JraW5nTm9kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHNlbGVjdFN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgZ2V0VHJpZ2dlckluZm8obWVudUFscmVhZHlBY3RpdmUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UpIHtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50XG4gICAgICAgIGxldCBzZWxlY3RlZCwgcGF0aCwgb2Zmc2V0XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGN0eC5lbGVtZW50KSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29udGVudCBlZGl0YWJsZVxuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZm8gPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aCgpXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3Rpb25JbmZvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgcGF0aCA9IHNlbGVjdGlvbkluZm8ucGF0aFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHNlbGVjdGlvbkluZm8ub2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWZmZWN0aXZlUmFuZ2UgPSB0aGlzLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcblxuICAgICAgICBpZiAoZWZmZWN0aXZlUmFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlZmZlY3RpdmVSYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9IC0xXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckNoYXJcblxuICAgICAgICAgICAgdGhpcy50cmlidXRlLnRyaWdnZXJzKCkuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gZWZmZWN0aXZlUmFuZ2UubGFzdEluZGV4T2YoYylcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gaWR4XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFyID0gY1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPj0gMCAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICFyZXF1aXJlTGVhZGluZ1NwYWNlIHx8XG4gICAgICAgICAgICAgICAgICAgIC9bXFx4QTBcXHNdL2cudGVzdChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGVuZ3RoKVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxKVxuICAgICAgICAgICAgICAgIGxldCBmaXJzdFNuaXBwZXRDaGFyID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnN1YnN0cmluZygwLCAxKVxuICAgICAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnICcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICdcXHhBMCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGlmIChoYXNUcmFpbGluZ1NwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC50cmltKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFsZWFkaW5nU3BhY2UgJiYgKG1lbnVBbHJlYWR5QWN0aXZlIHx8ICEoL1tcXHhBMFxcc10vZy50ZXN0KGN1cnJlbnRUcmlnZ2VyU25pcHBldCkpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblBvc2l0aW9uOiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVGV4dDogY3VycmVudFRyaWdnZXJTbmlwcGV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkRWxlbWVudDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uU2VsZWN0ZWRQYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkT2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtZW50aW9uVHJpZ2dlckNoYXI6IHRyaWdnZXJDaGFyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0NvbnRlbnRFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnICYmIGVsZW1lbnQubm9kZU5hbWUgIT09ICdURVhUQVJFQSdcbiAgICB9XG5cbiAgICBnZXRUZXh0QXJlYU9ySW5wdXRVbmRlcmxpbmVQb3NpdGlvbihlbGVtZW50LCBwb3NpdGlvbikge1xuICAgICAgICBsZXQgcHJvcGVydGllcyA9IFsnZGlyZWN0aW9uJywgJ2JveFNpemluZycsICd3aWR0aCcsICdoZWlnaHQnLCAnb3ZlcmZsb3dYJyxcbiAgICAgICAgICAgICdvdmVyZmxvd1knLCAnYm9yZGVyVG9wV2lkdGgnLCAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICAgICAgICAgICAnYm9yZGVyQm90dG9tV2lkdGgnLCAnYm9yZGVyTGVmdFdpZHRoJywgJ3BhZGRpbmdUb3AnLFxuICAgICAgICAgICAgJ3BhZGRpbmdSaWdodCcsICdwYWRkaW5nQm90dG9tJywgJ3BhZGRpbmdMZWZ0JyxcbiAgICAgICAgICAgICdmb250U3R5bGUnLCAnZm9udFZhcmlhbnQnLCAnZm9udFdlaWdodCcsICdmb250U3RyZXRjaCcsXG4gICAgICAgICAgICAnZm9udFNpemUnLCAnZm9udFNpemVBZGp1c3QnLCAnbGluZUhlaWdodCcsICdmb250RmFtaWx5JyxcbiAgICAgICAgICAgICd0ZXh0QWxpZ24nLCAndGV4dFRyYW5zZm9ybScsICd0ZXh0SW5kZW50JyxcbiAgICAgICAgICAgICd0ZXh0RGVjb3JhdGlvbicsICdsZXR0ZXJTcGFjaW5nJywgJ3dvcmRTcGFjaW5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgbGV0IGlzRmlyZWZveCA9ICh3aW5kb3cubW96SW5uZXJTY3JlZW5YICE9PSBudWxsKVxuXG4gICAgICAgIGxldCBkaXYgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZGl2LmlkID0gJ2lucHV0LXRleHRhcmVhLWNhcmV0LXBvc2l0aW9uLW1pcnJvci1kaXYnXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKGRpdilcblxuICAgICAgICBsZXQgc3R5bGUgPSBkaXYuc3R5bGVcbiAgICAgICAgbGV0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogZWxlbWVudC5jdXJyZW50U3R5bGVcblxuICAgICAgICBzdHlsZS53aGl0ZVNwYWNlID0gJ3ByZS13cmFwJ1xuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCdcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mZi1zY3JlZW5cbiAgICAgICAgc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuXG4gICAgICAgIC8vIHRyYW5zZmVyIHRoZSBlbGVtZW50J3MgcHJvcGVydGllcyB0byB0aGUgZGl2XG4gICAgICAgIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF1cbiAgICAgICAgfSlcblxuICAgICAgICBpZiAoaXNGaXJlZm94KSB7XG4gICAgICAgICAgICBzdHlsZS53aWR0aCA9IGAkeyhwYXJzZUludChjb21wdXRlZC53aWR0aCkgLSAyKX1weGBcbiAgICAgICAgICAgIGlmIChlbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpXG4gICAgICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3dZID0gJ3Njcm9sbCdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcbiAgICAgICAgfVxuXG4gICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHBvc2l0aW9uKVxuXG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBkaXYudGV4dENvbnRlbnQucmVwbGFjZSgvXFxzL2csICfCoCcpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc3BhbiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKHBvc2l0aW9uKSB8fCAnLidcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKHNwYW4pXG5cbiAgICAgICAgbGV0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIGxldCBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICAgICAgbGV0IHdpbmRvd0xlZnQgPSAod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKVxuICAgICAgICBsZXQgd2luZG93VG9wID0gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXG5cbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIHdpbmRvd1RvcCArIHNwYW4ub2Zmc2V0VG9wICsgcGFyc2VJbnQoY29tcHV0ZWQuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VJbnQoY29tcHV0ZWQuZm9udFNpemUpLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCArIHNwYW4ub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlckxlZnRXaWR0aClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LnJlbW92ZUNoaWxkKGRpdilcblxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKHNlbGVjdGVkTm9kZVBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBtYXJrZXJUZXh0Q2hhciA9ICfvu78nXG4gICAgICAgIGxldCBtYXJrZXJFbCwgbWFya2VySWQgPSBgc2VsXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9XyR7TWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyKX1gXG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgcHJldlJhbmdlID0gc2VsLmdldFJhbmdlQXQoMClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcblxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1hcmtlciBlbGVtZW50IGNvbnRhaW5pbmcgYSBzaW5nbGUgaW52aXNpYmxlIGNoYXJhY3RlciB1c2luZyBET00gbWV0aG9kcyBhbmQgaW5zZXJ0IGl0XG4gICAgICAgIG1hcmtlckVsID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBtYXJrZXJFbC5pZCA9IG1hcmtlcklkXG4gICAgICAgIG1hcmtlckVsLmFwcGVuZENoaWxkKHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVUZXh0Tm9kZShtYXJrZXJUZXh0Q2hhcikpXG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUobWFya2VyRWwpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocHJldlJhbmdlKVxuXG4gICAgICAgIGxldCByZWN0ID0gbWFya2VyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCxcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBtYXJrZXJFbC5vZmZzZXRIZWlnaHQgKyB3aW5kb3dUb3BcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlckVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWFya2VyRWwpXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KGVsZW0pIHtcbiAgICAgICAgbGV0IHJlYXNvbmFibGVCdWZmZXIgPSAyMCxcbiAgICAgICAgICAgIGNsaWVudFJlY3RcbiAgICAgICAgbGV0IG1heFNjcm9sbERpc3BsYWNlbWVudCA9IDEwMFxuICAgICAgICBsZXQgZSA9IGVsZW1cblxuICAgICAgICB3aGlsZSAoY2xpZW50UmVjdCA9PT0gdW5kZWZpbmVkIHx8IGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICBjbGllbnRSZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICAgICAgICBpZiAoY2xpZW50UmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlID0gZS5jaGlsZE5vZGVzWzBdXG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCB8fCAhZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1Ub3AgPSBjbGllbnRSZWN0LnRvcFxuICAgICAgICBsZXQgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBjbGllbnRSZWN0LmhlaWdodFxuXG4gICAgICAgIGlmIChlbGVtVG9wIDwgMCkge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtQm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlclxuXG4gICAgICAgICAgICBpZiAobWF4WSAtIHdpbmRvdy5wYWdlWU9mZnNldCA+IG1heFNjcm9sbERpc3BsYWNlbWVudCkge1xuICAgICAgICAgICAgICAgIG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBtYXhTY3JvbGxEaXNwbGFjZW1lbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgLSAod2luZG93LmlubmVySGVpZ2h0IC0gZWxlbUJvdHRvbSlcblxuICAgICAgICAgICAgaWYgKHRhcmdldFkgPiBtYXhZKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0WSA9IG1heFlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRhcmdldFkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVJhbmdlO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0eW9yay9mdXp6eVxuY2xhc3MgVHJpYnV0ZVNlYXJjaCB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5zZWFyY2ggPSB0aGlzXG4gICAgfVxuXG4gICAgc2ltcGxlRmlsdGVyKHBhdHRlcm4sIGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoc3RyaW5nID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3QocGF0dGVybiwgc3RyaW5nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRlc3QocGF0dGVybiwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0cmluZykgIT09IG51bGxcbiAgICB9XG5cbiAgICBtYXRjaChwYXR0ZXJuLCBzdHJpbmcsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgbGV0IHBhdHRlcm5JZHggPSAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICBsZW4gPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxTY29yZSA9IDAsXG4gICAgICAgICAgICBjdXJyU2NvcmUgPSAwLFxuICAgICAgICAgICAgcHJlID0gb3B0cy5wcmUgfHwgJycsXG4gICAgICAgICAgICBwb3N0ID0gb3B0cy5wb3N0IHx8ICcnLFxuICAgICAgICAgICAgY29tcGFyZVN0cmluZyA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBzdHJpbmcgfHwgc3RyaW5nLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBjaCwgY29tcGFyZUNoYXJcblxuICAgICAgICBwYXR0ZXJuID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHBhdHRlcm4gfHwgcGF0dGVybi50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgbGV0IHBhdHRlcm5DYWNoZSA9IHRoaXMudHJhdmVyc2UoY29tcGFyZVN0cmluZywgcGF0dGVybiwgMCwgMCwgW10pXG4gICAgICAgIGlmICghcGF0dGVybkNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcmVkOiB0aGlzLnJlbmRlcihzdHJpbmcsIHBhdHRlcm5DYWNoZS5jYWNoZSwgcHJlLCBwb3N0KSxcbiAgICAgICAgICAgIHNjb3JlOiBwYXR0ZXJuQ2FjaGUuc2NvcmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgc3RyaW5nSW5kZXgsIHBhdHRlcm5JbmRleCwgcGF0dGVybkNhY2hlKSB7XG4gICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIHNlYXJjaCBhdCBlbmRcbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSBwYXR0ZXJuSW5kZXgpIHtcblxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHNvY3JlIGFuZCBjb3B5IHRoZSBjYWNoZSBjb250YWluaW5nIHRoZSBpbmRpY2VzIHdoZXJlIGl0J3MgZm91bmRcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSxcbiAgICAgICAgICAgICAgICBjYWNoZTogcGF0dGVybkNhY2hlLnNsaWNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHN0cmluZyBhdCBlbmQgb3IgcmVtYWluaW5nIHBhdHRlcm4gPiByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSBzdHJpbmdJbmRleCB8fCBwYXR0ZXJuLmxlbmd0aCAtIHBhdHRlcm5JbmRleCA+IHN0cmluZy5sZW5ndGggLSBzdHJpbmdJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGMgPSBwYXR0ZXJuW3BhdHRlcm5JbmRleF1cbiAgICAgICAgbGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgc3RyaW5nSW5kZXgpXG4gICAgICAgIGxldCBiZXN0LCB0ZW1wXG5cbiAgICAgICAgd2hpbGUgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wdXNoKGluZGV4KVxuICAgICAgICAgICAgdGVtcCA9IHRoaXMudHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBpbmRleCArIDEsIHBhdHRlcm5JbmRleCArIDEsIHBhdHRlcm5DYWNoZSlcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wb3AoKVxuXG4gICAgICAgICAgICAvLyBpZiBkb3duc3RyZWFtIHRyYXZlcnNhbCBmYWlsZWQsIHJldHVybiBiZXN0IGFuc3dlciBzbyBmYXJcbiAgICAgICAgICAgIGlmICghdGVtcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiZXN0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmVzdCB8fCBiZXN0LnNjb3JlIDwgdGVtcC5zY29yZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSB0ZW1wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgaW5kZXggKyAxKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJlc3RcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgbGV0IHNjb3JlID0gMFxuICAgICAgICBsZXQgdGVtcCA9IDFcblxuICAgICAgICBwYXR0ZXJuQ2FjaGUuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuQ2FjaGVbaSAtIDFdICsgMSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCArPSB0ZW1wICsgMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3JlICs9IHRlbXBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gc2NvcmVcbiAgICB9XG5cbiAgICByZW5kZXIoc3RyaW5nLCBpbmRpY2VzLCBwcmUsIHBvc3QpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkID0gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRpY2VzWzBdKVxuXG4gICAgICAgIGluZGljZXMuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIHJlbmRlcmVkICs9IHByZSArIHN0cmluZ1tpbmRleF0gKyBwb3N0ICtcbiAgICAgICAgICAgICAgICBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgMSwgKGluZGljZXNbaSArIDFdKSA/IGluZGljZXNbaSArIDFdIDogc3RyaW5nLmxlbmd0aClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVuZGVyZWRcbiAgICB9XG5cbiAgICBmaWx0ZXIocGF0dGVybiwgYXJyLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGVsZW1lbnQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gb3B0cy5leHRyYWN0KGVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHIpIHsgLy8gdGFrZSBjYXJlIG9mIHVuZGVmaW5lZHMgLyBudWxscyAvIGV0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWQgPSB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0ciwgb3B0cylcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbcHJldi5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiByZW5kZXJlZC5yZW5kZXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiByZW5kZXJlZC5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgICAgICAgIH0sIFtdKVxuXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tcGFyZSA9IGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkgcmV0dXJuIGNvbXBhcmVcbiAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVNlYXJjaDsiLCIvKipcbiogVHJpYnV0ZS5qc1xuKiBOYXRpdmUgRVM2IEphdmFTY3JpcHQgQG1lbnRpb24gUGx1Z2luXG4qKi9cblxuaW1wb3J0IFRyaWJ1dGUgZnJvbSBcIi4vVHJpYnV0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKVxuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDBcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV1cbiAgICAgICAgdmFyIHZhbHVlXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn1cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlXG5cbiAgICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKVxuICAgICAgICByZXR1cm4gZXZ0XG4gICAgfVxuXG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZVxuXG4gICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnRcbn0pKClcbiJdfQ==
