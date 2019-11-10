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

        var _ref$values = _ref.values,
            values = _ref$values === undefined ? null : _ref$values,
            _ref$iframe = _ref.iframe,
            iframe = _ref$iframe === undefined ? null : _ref$iframe,
            _ref$selectClass = _ref.selectClass,
            selectClass = _ref$selectClass === undefined ? 'highlight' : _ref$selectClass,
            _ref$trigger = _ref.trigger,
            trigger = _ref$trigger === undefined ? '@' : _ref$trigger,
            _ref$selectTemplate = _ref.selectTemplate,
            selectTemplate = _ref$selectTemplate === undefined ? null : _ref$selectTemplate,
            _ref$menuItemTemplate = _ref.menuItemTemplate,
            menuItemTemplate = _ref$menuItemTemplate === undefined ? null : _ref$menuItemTemplate,
            _ref$lookup = _ref.lookup,
            lookup = _ref$lookup === undefined ? 'key' : _ref$lookup,
            _ref$fillAttr = _ref.fillAttr,
            fillAttr = _ref$fillAttr === undefined ? 'value' : _ref$fillAttr,
            _ref$collection = _ref.collection,
            collection = _ref$collection === undefined ? null : _ref$collection,
            _ref$menuContainer = _ref.menuContainer,
            menuContainer = _ref$menuContainer === undefined ? null : _ref$menuContainer,
            _ref$noMatchTemplate = _ref.noMatchTemplate,
            noMatchTemplate = _ref$noMatchTemplate === undefined ? null : _ref$noMatchTemplate,
            _ref$requireLeadingSp = _ref.requireLeadingSpace,
            requireLeadingSpace = _ref$requireLeadingSp === undefined ? true : _ref$requireLeadingSp,
            _ref$allowSpaces = _ref.allowSpaces,
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces;

        _classCallCheck(this, Tribute);

        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;

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

                // array of objects or a function returning an array of objects
                values: values,

                requireLeadingSpace: requireLeadingSpace
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
                    values: item.values,
                    requireLeadingSpace: item.requireLeadingSpace
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

            // Only proceed if menu isn't already shown for the current element & mentionText
            if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
                return;
            }
            this.currentMentionTextSnapshot = this.current.mentionText;

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

            var processValues = function processValues(values) {
                // Tribute may not be active any more by the time the value callback returns
                if (!_this2.isActive) {
                    return;
                }
                var items = _this2.search.filter(_this2.current.mentionText, values, {
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

                _this2.current.filteredItems = items;

                var ul = _this2.menu.querySelector('ul');

                if (!items.length) {
                    var noMatchEvent = new CustomEvent('tribute-no-match', { detail: _this2.menu });
                    _this2.current.element.dispatchEvent(noMatchEvent);
                    if (!_this2.current.collection.noMatchTemplate) {
                        _this2.hideMenu();
                    } else {
                        ul.innerHTML = _this2.current.collection.noMatchTemplate();
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

                _this2.range.positionMenuAtCaret(scrollTo);
            };

            if (typeof this.current.collection.values === 'function') {
                this.current.collection.values(this.current.mentionText, processValues);
            } else {
                processValues(this.current.collection.values);
            }
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
            if (typeof collection.values === 'function') {
                throw new Error('Unable to append to values, as it is a function.');
            } else if (!replace) {
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
            return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            var info = tribute.range.getTriggerInfo(false, false, true, tribute.allowSpaces);

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
            var info = this.tribute.range.getTriggerInfo(false, false, true, this.tribute.allowSpaces);

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            var info = this.getTriggerInfo(false, false, true, this.tribute.allowSpaces);

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

            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces);

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
        value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces) {
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

                    _this2.tribute.collection.forEach(function (config) {
                        var c = config.trigger;
                        var idx = effectiveRange.lastIndexOf(c);

                        if (idx > mostRecentTriggerCharPos) {
                            mostRecentTriggerCharPos = idx;
                            triggerChar = c;
                            requireLeadingSpace = config.requireLeadingSpace;
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

                        var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;

                        if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
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
                top: rect.top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFTSxPO0FBQ0YsMkJBY0c7QUFBQTs7QUFBQSwrQkFiQyxNQWFEO0FBQUEsWUFiQyxNQWFELCtCQWJVLElBYVY7QUFBQSwrQkFaQyxNQVlEO0FBQUEsWUFaQyxNQVlELCtCQVpVLElBWVY7QUFBQSxvQ0FYQyxXQVdEO0FBQUEsWUFYQyxXQVdELG9DQVhlLFdBV2Y7QUFBQSxnQ0FWQyxPQVVEO0FBQUEsWUFWQyxPQVVELGdDQVZXLEdBVVg7QUFBQSx1Q0FUQyxjQVNEO0FBQUEsWUFUQyxjQVNELHVDQVRrQixJQVNsQjtBQUFBLHlDQVJDLGdCQVFEO0FBQUEsWUFSQyxnQkFRRCx5Q0FSb0IsSUFRcEI7QUFBQSwrQkFQQyxNQU9EO0FBQUEsWUFQQyxNQU9ELCtCQVBVLEtBT1Y7QUFBQSxpQ0FOQyxRQU1EO0FBQUEsWUFOQyxRQU1ELGlDQU5ZLE9BTVo7QUFBQSxtQ0FMQyxVQUtEO0FBQUEsWUFMQyxVQUtELG1DQUxjLElBS2Q7QUFBQSxzQ0FKQyxhQUlEO0FBQUEsWUFKQyxhQUlELHNDQUppQixJQUlqQjtBQUFBLHdDQUhDLGVBR0Q7QUFBQSxZQUhDLGVBR0Qsd0NBSG1CLElBR25CO0FBQUEseUNBRkMsbUJBRUQ7QUFBQSxZQUZDLG1CQUVELHlDQUZ1QixJQUV2QjtBQUFBLG9DQURDLFdBQ0Q7QUFBQSxZQURDLFdBQ0Qsb0NBRGUsS0FDZjs7QUFBQTs7QUFFQyxhQUFLLFlBQUwsR0FBb0IsQ0FB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RWYsd0JBQVksS0FGRztBQUdmLG9CQUFRO0FBSE8sU0FBbkI7QUFLQSxZQUFJLE1BQU0sU0FBUyxXQUFULENBQXFCLGFBQXJCLENBQVY7QUFDQSxZQUFJLGVBQUosQ0FBb0IsS0FBcEIsRUFBMkIsT0FBTyxPQUFsQyxFQUEyQyxPQUFPLFVBQWxELEVBQThELE9BQU8sTUFBckU7QUFDQSxlQUFPLEdBQVA7QUFDSDs7QUFFRCxnQkFBWSxTQUFaLEdBQXdCLE9BQU8sS0FBUCxDQUFhLFNBQXJDOztBQUVBLFdBQU8sV0FBUCxHQUFxQixXQUFyQjtBQUNILENBbEJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBcIi4vdXRpbHNcIjtcbmltcG9ydCBUcmlidXRlRXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVFdmVudHNcIjtcbmltcG9ydCBUcmlidXRlTWVudUV2ZW50cyBmcm9tIFwiLi9UcmlidXRlTWVudUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVSYW5nZSBmcm9tIFwiLi9UcmlidXRlUmFuZ2VcIjtcbmltcG9ydCBUcmlidXRlU2VhcmNoIGZyb20gXCIuL1RyaWJ1dGVTZWFyY2hcIjtcblxuY2xhc3MgVHJpYnV0ZSB7XG4gICAgY29uc3RydWN0b3Ioe1xuICAgICAgICB2YWx1ZXMgPSBudWxsLFxuICAgICAgICBpZnJhbWUgPSBudWxsLFxuICAgICAgICBzZWxlY3RDbGFzcyA9ICdoaWdobGlnaHQnLFxuICAgICAgICB0cmlnZ2VyID0gJ0AnLFxuICAgICAgICBzZWxlY3RUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIG1lbnVJdGVtVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBsb29rdXAgPSAna2V5JyxcbiAgICAgICAgZmlsbEF0dHIgPSAndmFsdWUnLFxuICAgICAgICBjb2xsZWN0aW9uID0gbnVsbCxcbiAgICAgICAgbWVudUNvbnRhaW5lciA9IG51bGwsXG4gICAgICAgIG5vTWF0Y2hUZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSB0cnVlLFxuICAgICAgICBhbGxvd1NwYWNlcyA9IGZhbHNlLFxuICAgIH0pIHtcblxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IG1lbnVDb250YWluZXJcbiAgICAgICAgdGhpcy5hbGxvd1NwYWNlcyA9IGFsbG93U3BhY2VzXG5cbiAgICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gW3tcbiAgICAgICAgICAgICAgICAvLyBzeW1ib2wgdGhhdCBzdGFydHMgdGhlIGxvb2t1cFxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXG5cbiAgICAgICAgICAgICAgICBpZnJhbWU6IGlmcmFtZSxcblxuICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBzZWxlY3RDbGFzcyxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCBvbiBzZWxlY3QgdGhhdCByZXR1bnMgdGhlIGNvbnRlbnQgdG8gaW5zZXJ0XG4gICAgICAgICAgICAgICAgc2VsZWN0VGVtcGxhdGU6IChzZWxlY3RUZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRTZWxlY3RUZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB0aGF0IHJldHVybnMgY29udGVudCBmb3IgYW4gaXRlbVxuICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChtZW51SXRlbVRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtZW51IGlzIGVtcHR5LCBkaXNhYmxlcyBoaWRpbmcgb2YgbWVudS5cbiAgICAgICAgICAgICAgICBub01hdGNoVGVtcGxhdGU6ICh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH0pKG5vTWF0Y2hUZW1wbGF0ZSksXG5cbiAgICAgICAgICAgICAgICAvLyBjb2x1bW4gdG8gc2VhcmNoIGFnYWluc3QgaW4gdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgIGxvb2t1cDogbG9va3VwLFxuXG4gICAgICAgICAgICAgICAgLy8gY29sdW1uIHRoYXQgY29udGFpbnMgdGhlIGNvbnRlbnQgdG8gaW5zZXJ0IGJ5IGRlZmF1bHRcbiAgICAgICAgICAgICAgICBmaWxsQXR0cjogZmlsbEF0dHIsXG5cbiAgICAgICAgICAgICAgICAvLyBhcnJheSBvZiBvYmplY3RzIG9yIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGFuIGFycmF5IG9mIG9iamVjdHNcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHZhbHVlcyxcblxuICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IHJlcXVpcmVMZWFkaW5nU3BhY2UsXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24ubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXI6IGl0ZW0udHJpZ2dlciB8fCB0cmlnZ2VyLFxuICAgICAgICAgICAgICAgICAgICBpZnJhbWU6IGl0ZW0uaWZyYW1lIHx8IGlmcmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6IGl0ZW0uc2VsZWN0Q2xhc3MgfHwgc2VsZWN0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFRlbXBsYXRlOiAoaXRlbS5zZWxlY3RUZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRTZWxlY3RUZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZTogKGl0ZW0ubWVudUl0ZW1UZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgd2hlbiBtZW51IGlzIGVtcHR5LCBkaXNhYmxlcyBoaWRpbmcgb2YgbWVudS5cbiAgICAgICAgICAgICAgICAgICAgbm9NYXRjaFRlbXBsYXRlOiAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdC5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pKG5vTWF0Y2hUZW1wbGF0ZSksXG4gICAgICAgICAgICAgICAgICAgIGxvb2t1cDogaXRlbS5sb29rdXAgfHwgbG9va3VwLFxuICAgICAgICAgICAgICAgICAgICBmaWxsQXR0cjogaXRlbS5maWxsQXR0ciB8fCBmaWxsQXR0cixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBpdGVtLnZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZTogaXRlbS5yZXF1aXJlTGVhZGluZ1NwYWNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIE5vIGNvbGxlY3Rpb24gc3BlY2lmaWVkLicpXG4gICAgICAgIH1cblxuICAgICAgICBuZXcgVHJpYnV0ZVJhbmdlKHRoaXMpXG4gICAgICAgIG5ldyBUcmlidXRlRXZlbnRzKHRoaXMpXG4gICAgICAgIG5ldyBUcmlidXRlTWVudUV2ZW50cyh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZVNlYXJjaCh0aGlzKVxuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0U2VsZWN0VGVtcGxhdGUoaXRlbSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlciArIGl0ZW0ub3JpZ2luYWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uZmlsbEF0dHJdO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZShtYXRjaEl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoSXRlbS5zdHJpbmdcbiAgICB9XG5cbiAgICBzdGF0aWMgaW5wdXRUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIFsnVEVYVEFSRUEnLCAnSU5QVVQnXVxuICAgIH1cblxuICAgIHRyaWdnZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2xsZWN0aW9uLm1hcChjb25maWcgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy50cmlnZ2VyXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYXR0YWNoKGVsKSB7XG4gICAgICAgIGlmICghZWwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIE11c3QgcGFzcyBpbiBhIERPTSBub2RlIG9yIE5vZGVMaXN0LicpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiBpdCBpcyBhIGpRdWVyeSBjb2xsZWN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgalF1ZXJ5ICE9PSAndW5kZWZpbmVkJyAmJiBlbCBpbnN0YW5jZW9mIGpRdWVyeSkge1xuICAgICAgICAgICAgZWwgPSBlbC5nZXQoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXMgZWwgYW4gQXJyYXkvQXJyYXktbGlrZSBvYmplY3Q/XG4gICAgICAgIGlmIChlbC5jb25zdHJ1Y3RvciA9PT0gTm9kZUxpc3QgfHwgZWwuY29uc3RydWN0b3IgPT09IEhUTUxDb2xsZWN0aW9uIHx8IGVsLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICAgICAgbGV0IGxlbmd0aCA9IGVsLmxlbmd0aFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2F0dGFjaChlbFtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFjaChlbClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9hdHRhY2goZWwpIHtcbiAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS10cmlidXRlJykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignVHJpYnV0ZSB3YXMgYWxyZWFkeSBib3VuZCB0byAnICsgZWwubm9kZU5hbWUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuc3VyZUVkaXRhYmxlKGVsKVxuICAgICAgICB0aGlzLmV2ZW50cy5iaW5kKGVsKVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScsIHRydWUpXG4gICAgfVxuXG4gICAgZW5zdXJlRWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICBpZiAoVHJpYnV0ZS5pbnB1dFR5cGVzKCkuaW5kZXhPZihlbGVtZW50Lm5vZGVOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY29udGVudEVkaXRhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBDYW5ub3QgYmluZCB0byAnICsgZWxlbWVudC5ub2RlTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZU1lbnUoKSB7XG4gICAgICAgIGxldCB3cmFwcGVyID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICAgICAgdWwgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgndWwnKVxuXG4gICAgICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ3RyaWJ1dGUtY29udGFpbmVyJ1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHVsKVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1lbnVDb250YWluZXIuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yKGVsZW1lbnQsIHNjcm9sbFRvKSB7XG4gICAgICAgIC8vIE9ubHkgcHJvY2VlZCBpZiBtZW51IGlzbid0IGFscmVhZHkgc2hvd24gZm9yIHRoZSBjdXJyZW50IGVsZW1lbnQgJiBtZW50aW9uVGV4dFxuICAgICAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLmN1cnJlbnQuZWxlbWVudCA9PT0gZWxlbWVudCAmJiB0aGlzLmN1cnJlbnQubWVudGlvblRleHQgPT09IHRoaXMuY3VycmVudE1lbnRpb25UZXh0U25hcHNob3QpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRNZW50aW9uVGV4dFNuYXBzaG90ID0gdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0XG5cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBtZW51IGlmIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAgIGlmICghdGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLmNyZWF0ZU1lbnUoKVxuICAgICAgICAgICAgdGhpcy5tZW51RXZlbnRzLmJpbmQodGhpcy5tZW51KVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWVcbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG5cbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnQubWVudGlvblRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCA9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9jZXNzVmFsdWVzID0gKHZhbHVlcykgPT4ge1xuICAgICAgICAgICAgLy8gVHJpYnV0ZSBtYXkgbm90IGJlIGFjdGl2ZSBhbnkgbW9yZSBieSB0aGUgdGltZSB0aGUgdmFsdWUgY2FsbGJhY2sgcmV0dXJuc1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnNlYXJjaC5maWx0ZXIodGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCB2YWx1ZXMsIHtcbiAgICAgICAgICAgICAgICBwcmU6ICc8c3Bhbj4nLFxuICAgICAgICAgICAgICAgIHBvc3Q6ICc8L3NwYW4+JyxcbiAgICAgICAgICAgICAgICBleHRyYWN0OiAoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwXVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAoZWwpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbG9va3VwIGF0dHJpYnV0ZSwgbG9va3VwIG11c3QgYmUgc3RyaW5nIG9yIGZ1bmN0aW9uLicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtcyA9IGl0ZW1zXG5cbiAgICAgICAgICAgIGxldCB1bCA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vTWF0Y2hFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1uby1tYXRjaCcsIHsgZGV0YWlsOiB0aGlzLm1lbnUgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5vTWF0Y2hFdmVudClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1bC5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgbGkgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVTZWxlY3RlZCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubWVudUl0ZW1UZW1wbGF0ZShpdGVtKVxuICAgICAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyh0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHByb2Nlc3NWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzVmFsdWVzKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVNZW51KCkge1xuICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lOydcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0SXRlbUF0SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVyblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zW2luZGV4XVxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdFRlbXBsYXRlKGl0ZW0pXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHQoY29udGVudClcbiAgICB9XG5cbiAgICByZXBsYWNlVGV4dChjb250ZW50KSB7XG4gICAgICAgIHRoaXMucmFuZ2UucmVwbGFjZVRyaWdnZXJUZXh0KGNvbnRlbnQsIHRydWUsIHRydWUpXG4gICAgfVxuXG4gICAgX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYXBwZW5kIHRvIHZhbHVlcywgYXMgaXQgaXMgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9IGVsc2UgaWYgKCFyZXBsYWNlKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IGNvbGxlY3Rpb24udmFsdWVzLmNvbmNhdChuZXdWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kKGNvbGxlY3Rpb25JbmRleCwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KGNvbGxlY3Rpb25JbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcigncGxlYXNlIHByb3ZpZGUgYW4gaW5kZXggZm9yIHRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZS4nKVxuXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uW2luZGV4XVxuXG4gICAgICAgIHRoaXMuX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpXG4gICAgfVxuXG4gICAgYXBwZW5kQ3VycmVudChuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZCh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc3RhdGUuIFBsZWFzZSB1c2UgYXBwZW5kIGluc3RlYWQgYW5kIHBhc3MgYW4gaW5kZXguJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImNsYXNzIFRyaWJ1dGVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuZXZlbnRzID0gdGhpc1xuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogOSxcbiAgICAgICAgICAgIHZhbHVlOiAnVEFCJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDgsXG4gICAgICAgICAgICB2YWx1ZTogJ0RFTEVURSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAxMyxcbiAgICAgICAgICAgIHZhbHVlOiAnRU5URVInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMjcsXG4gICAgICAgICAgICB2YWx1ZTogJ0VTQ0FQRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzOCxcbiAgICAgICAgICAgIHZhbHVlOiAnVVAnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogNDAsXG4gICAgICAgICAgICB2YWx1ZTogJ0RPV04nXG4gICAgICAgIH1dXG4gICAgfVxuXG4gICAgYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICB0aGlzLmtleWRvd24uYmluZChlbGVtZW50LCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgdGhpcy5rZXl1cC5iaW5kKGVsZW1lbnQsIHRoaXMpLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICB0aGlzLmlucHV0LmJpbmQoZWxlbWVudCwgdGhpcyksIGZhbHNlKVxuICAgIH1cblxuICAgIGtleWRvd24oaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5zaG91bGREZWFjdGl2YXRlKGV2ZW50KSkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXNcbiAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgaWYgKG8ua2V5ID09PSBldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW28udmFsdWUudG9Mb3dlckNhc2UoKV0oZXZlbnQsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5wdXQoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSB0cnVlXG4gICAgICAgIGluc3RhbmNlLmtleXVwLmNhbGwodGhpcywgaW5zdGFuY2UsIGV2ZW50KVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcblxuICAgICAgICBpZiAodHJpYnV0ZS5tZW51ICYmIHRyaWJ1dGUubWVudS5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBldmVudC50YXJnZXRcbiAgICAgICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnbGknKSB7XG4gICAgICAgICAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKCFsaSB8fCBsaSA9PT0gdHJpYnV0ZS5tZW51KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZpbmQgdGhlIDxsaT4gY29udGFpbmVyIGZvciB0aGUgY2xpY2snKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyaWJ1dGUuc2VsZWN0SXRlbUF0SW5kZXgobGkuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpXG4gICAgICAgICAgICB0cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgfSBlbHNlIGlmICh0cmlidXRlLmN1cnJlbnQuZWxlbWVudCkge1xuICAgICAgICAgICAgdHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBrZXl1cChpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlLmlucHV0RXZlbnQpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlLnVwZGF0ZVNlbGVjdGlvbih0aGlzKVxuXG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAyNykgcmV0dXJuXG5cbiAgICAgICAgaWYgKCFpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICBsZXQga2V5Q29kZSA9IGluc3RhbmNlLmdldEtleUNvZGUoaW5zdGFuY2UsIHRoaXMsIGV2ZW50KVxuXG4gICAgICAgICAgICBpZiAoaXNOYU4oa2V5Q29kZSkpIHJldHVyblxuXG4gICAgICAgICAgICBsZXQgdHJpZ2dlciA9IGluc3RhbmNlLnRyaWJ1dGUudHJpZ2dlcnMoKS5maW5kKHRyaWdnZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyLmNoYXJDb2RlQXQoMCkgPT09IGtleUNvZGVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jYWxsYmFja3MoKS50cmlnZ2VyQ2hhcihldmVudCwgdGhpcywgdHJpZ2dlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnN0YW5jZS50cmlidXRlLmN1cnJlbnQudHJpZ2dlciAmJiBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPT09IGZhbHNlXG4gICAgICAgICAgICB8fCBpbnN0YW5jZS50cmlidXRlLmlzQWN0aXZlICYmIGV2ZW50LmtleUNvZGUgPT09IDgpIHtcbiAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMsIHRydWUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGREZWFjdGl2YXRlKGV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy50cmlidXRlLmlzQWN0aXZlKSByZXR1cm4gZmFsc2VcblxuICAgICAgICBpZiAodGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRLZXlQcmVzc2VkID0gZmFsc2VcbiAgICAgICAgICAgIFRyaWJ1dGVFdmVudHMua2V5cygpLmZvckVhY2gobyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IG8ua2V5KSBldmVudEtleVByZXNzZWQgPSB0cnVlXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gIWV2ZW50S2V5UHJlc3NlZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgZ2V0S2V5Q29kZShpbnN0YW5jZSwgZWwsIGV2ZW50KSB7XG4gICAgICAgIGxldCBjaGFyXG4gICAgICAgIGxldCB0cmlidXRlID0gaW5zdGFuY2UudHJpYnV0ZVxuICAgICAgICBsZXQgaW5mbyA9IHRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlLCB0cmlidXRlLmFsbG93U3BhY2VzKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mby5tZW50aW9uVHJpZ2dlckNoYXIuY2hhckNvZGVBdCgwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb24oZWwpIHtcbiAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCA9IGVsXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy50cmlidXRlLnJhbmdlLmdldFRyaWdnZXJJbmZvKGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZFBhdGggPSBpbmZvLm1lbnRpb25TZWxlY3RlZFBhdGhcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0ID0gaW5mby5tZW50aW9uVGV4dFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRPZmZzZXQgPSBpbmZvLm1lbnRpb25TZWxlY3RlZE9mZnNldFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2tzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJpZ2dlckNoYXI6IChlLCBlbCwgdHJpZ2dlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0cmlidXRlID0gdGhpcy50cmlidXRlXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbkl0ZW0gPSB0cmlidXRlLmNvbGxlY3Rpb24uZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHJpZ2dlciA9PT0gdHJpZ2dlclxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25JdGVtXG4gICAgICAgICAgICAgICAgaWYgKHRyaWJ1dGUuaW5wdXRFdmVudCkgdHJpYnV0ZS5zaG93TWVudUZvcihlbCwgdHJ1ZSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlcjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNlbGVjdEl0ZW1BdEluZGV4KHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgICAgICB9LCAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGU6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgdXAgdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5maWx0ZXJlZEl0ZW1zLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkICYmIHNlbGVjdGVkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZC0tXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3RpdmVMaSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZG93bjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgZG93biB1bFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKytcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUxpKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZWxldGU6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgdGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcihlbClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRBY3RpdmVMaShpbmRleCkge1xuICAgICAgICBsZXQgbGlzID0gdGhpcy50cmlidXRlLm1lbnUucXVlcnlTZWxlY3RvckFsbCgnbGknKSxcbiAgICAgICAgICAgIGxlbmd0aCA9IGxpcy5sZW5ndGggPj4+IDBcblxuICAgICAgICBpZiAoaW5kZXgpIHRoaXMudHJpYnV0ZS5tZW51U2VsZWN0ZWQgPSBpbmRleDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBsaXNbaV1cbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy50cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbi5zZWxlY3RDbGFzc1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaS5jbGFzc05hbWUgPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVFdmVudHM7XG4iLCJjbGFzcyBUcmlidXRlTWVudUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5tZW51RXZlbnRzID0gdGhpc1xuICAgICAgICB0aGlzLm1lbnUgPSB0aGlzLnRyaWJ1dGUubWVudVxuICAgIH1cblxuICAgIGJpbmQobWVudSkge1xuICAgICAgICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cy5rZXlkb3duLmJpbmQodGhpcy5tZW51LCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMuY2xpY2suYmluZChudWxsLCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCwgdHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSkpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCwgZmFsc2UpLCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5vbnNjcm9sbCA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDMwMCwgZmFsc2UpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dFxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICAgICAgICAgIHZhciBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdClcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZU1lbnVFdmVudHM7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL2plZmYtY29sbGlucy9tZW50LmlvXG5jbGFzcyBUcmlidXRlUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UgPSB0aGlzXG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBpZnJhbWVcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uaWZyYW1lXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnRcbiAgICB9XG5cbiAgICBwb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICBjb29yZGluYXRlc1xuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgaWYgKGluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24odGhpcy5nZXREb2N1bWVudCgpLmFjdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZUNhcmV0UG9zaXRpb24oaW5mby5tZW50aW9uUG9zaXRpb24pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIGJ1dHRvbiBpbnRvIHBsYWNlLlxuICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6ICR7Y29vcmRpbmF0ZXMudG9wfXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtjb29yZGluYXRlcy5sZWZ0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMDAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO2BcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEVsZW1lbnQodGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgZWxlbSA9IHRhcmdldEVsZW1lbnRcblxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0uY2hpbGROb2Rlc1twYXRoW2ldXVxuICAgICAgICAgICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChlbGVtLmxlbmd0aCA8IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgLT0gZWxlbS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2hpbGROb2Rlcy5sZW5ndGggPT09IDAgJiYgIWVsZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLnByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZWxlbSwgb2Zmc2V0KVxuICAgICAgICByYW5nZS5zZXRFbmQoZWxlbSwgb2Zmc2V0KVxuICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB0YXJnZXRFbGVtZW50LmZvY3VzKClcbiAgICB9XG5cbiAgICByZXNldFNlbGVjdGlvbih0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKHRhcmdldEVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCAhPT0gdGhpcy5nZXREb2N1bWVudCgpLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50LmZvY3VzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0RWxlbWVudCh0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBsYWNlVHJpZ2dlclRleHQodGV4dCwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgaGFzVHJhaWxpbmdTcGFjZSkge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50XG4gICAgICAgIHRoaXMucmVzZXRTZWxlY3Rpb24oY29udGV4dC5lbGVtZW50LCBjb250ZXh0LnNlbGVjdGVkUGF0aCwgY29udGV4dC5zZWxlY3RlZE9mZnNldClcblxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8odHJ1ZSwgaGFzVHJhaWxpbmdTcGFjZSwgcmVxdWlyZUxlYWRpbmdTcGFjZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzKVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZXZlbnRcbiAgICAgICAgbGV0IHJlcGxhY2VFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1yZXBsYWNlZCcsIHtcbiAgICAgICAgICAgIGRldGFpbDogdGV4dFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChpbmZvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgbGV0IG15RmllbGQgPSB0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudFxuICAgICAgICAgICAgICAgIHRleHQgKz0gJyAnXG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gaW5mby5tZW50aW9uUG9zaXRpb25cbiAgICAgICAgICAgICAgICBsZXQgZW5kUG9zID0gaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArIDFcbiAgICAgICAgICAgICAgICBteUZpZWxkLnZhbHVlID0gbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdGV4dCArXG4gICAgICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgbXlGaWVsZC52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGEgc3BhY2UgdG8gdGhlIGVuZCBvZiB0aGUgcGFzdGVkIHRleHRcbiAgICAgICAgICAgICAgICB0ZXh0ICs9ICdcXHhBMCdcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3RlSHRtbCh0ZXh0LCBpbmZvLm1lbnRpb25Qb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArIDEpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRleHQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KHJlcGxhY2VFdmVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhc3RlSHRtbChodG1sLCBzdGFydFBvcywgZW5kUG9zKSB7XG4gICAgICAgIGxldCByYW5nZSwgc2VsXG4gICAgICAgIHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChzZWwuYW5jaG9yTm9kZSwgc3RhcnRQb3MpXG4gICAgICAgIHJhbmdlLnNldEVuZChzZWwuYW5jaG9yTm9kZSwgZW5kUG9zKVxuICAgICAgICByYW5nZS5kZWxldGVDb250ZW50cygpXG5cbiAgICAgICAgbGV0IGVsID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGVsLmlubmVySFRNTCA9IGh0bWxcbiAgICAgICAgbGV0IGZyYWcgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgICAgICAgbm9kZSwgbGFzdE5vZGVcbiAgICAgICAgd2hpbGUgKChub2RlID0gZWwuZmlyc3RDaGlsZCkpIHtcbiAgICAgICAgICAgIGxhc3ROb2RlID0gZnJhZy5hcHBlbmRDaGlsZChub2RlKVxuICAgICAgICB9XG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUoZnJhZylcblxuICAgICAgICAvLyBQcmVzZXJ2ZSB0aGUgc2VsZWN0aW9uXG4gICAgICAgIGlmIChsYXN0Tm9kZSkge1xuICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS5jbG9uZVJhbmdlKClcbiAgICAgICAgICAgIHJhbmdlLnNldFN0YXJ0QWZ0ZXIobGFzdE5vZGUpXG4gICAgICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuICAgICAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXaW5kb3dTZWxlY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5pZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5pZnJhbWUuY29udGVudFdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIH1cblxuICAgIGdldE5vZGVQb3NpdGlvbkluUGFyZW50KGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXNbaV1cblxuICAgICAgICAgICAgaWYgKG5vZGUgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q29udGVudEVkaXRhYmxlU2VsZWN0ZWRQYXRoKCkge1xuICAgICAgICAvLyBjb250ZW50IGVkaXRhYmxlXG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHNlbC5hbmNob3JOb2RlXG4gICAgICAgIGxldCBwYXRoID0gW11cbiAgICAgICAgbGV0IG9mZnNldFxuXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaVxuICAgICAgICAgICAgbGV0IGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICB3aGlsZSAoc2VsZWN0ZWQgIT09IG51bGwgJiYgY2UgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmdldE5vZGVQb3NpdGlvbkluUGFyZW50KHNlbGVjdGVkKVxuICAgICAgICAgICAgICAgIHBhdGgucHVzaChpKVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWQucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZSA9IHNlbGVjdGVkLmNvbnRlbnRFZGl0YWJsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGgucmV2ZXJzZSgpXG5cbiAgICAgICAgICAgIC8vIGdldFJhbmdlQXQgbWF5IG5vdCBleGlzdCwgbmVlZCBhbHRlcm5hdGl2ZVxuICAgICAgICAgICAgb2Zmc2V0ID0gc2VsLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICB0ZXh0XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGxldCB0ZXh0Q29tcG9uZW50ID0gdGhpcy5nZXREb2N1bWVudCgpLmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRleHRDb21wb25lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50LnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRWxlbSA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuYW5jaG9yTm9kZVxuXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRFbGVtICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgd29ya2luZ05vZGVDb250ZW50ID0gc2VsZWN0ZWRFbGVtLnRleHRDb250ZW50XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdFN0YXJ0T2Zmc2V0ID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKS5nZXRSYW5nZUF0KDApLnN0YXJ0T2Zmc2V0XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0U3RhcnRPZmZzZXQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gd29ya2luZ05vZGVDb250ZW50LnN1YnN0cmluZygwLCBzZWxlY3RTdGFydE9mZnNldClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGV4dFxuICAgIH1cblxuICAgIGdldFRyaWdnZXJJbmZvKG1lbnVBbHJlYWR5QWN0aXZlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCBhbGxvd1NwYWNlcykge1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICAgICAgbGV0IHNlbGVjdGVkLCBwYXRoLCBvZmZzZXRcblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY3R4LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb250ZW50IGVkaXRhYmxlXG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5mbyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlU2VsZWN0ZWRQYXRoKClcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkluZm8pIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGlvbkluZm8uc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICBwYXRoID0gc2VsZWN0aW9uSW5mby5wYXRoXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gc2VsZWN0aW9uSW5mby5vZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlZmZlY3RpdmVSYW5nZSA9IHRoaXMuZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKVxuXG4gICAgICAgIGlmIChlZmZlY3RpdmVSYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVmZmVjdGl2ZVJhbmdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gLTFcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ2hhclxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb25maWcudHJpZ2dlclxuICAgICAgICAgICAgICAgIGxldCBpZHggPSBlZmZlY3RpdmVSYW5nZS5sYXN0SW5kZXhPZihjKVxuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcykge1xuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSBpZHhcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBjXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSBjb25maWcucmVxdWlyZUxlYWRpbmdTcGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPj0gMCAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICFyZXF1aXJlTGVhZGluZ1NwYWNlIHx8XG4gICAgICAgICAgICAgICAgICAgIC9bXFx4QTBcXHNdL2cudGVzdChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGVuZ3RoKVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxKVxuICAgICAgICAgICAgICAgIGxldCBmaXJzdFNuaXBwZXRDaGFyID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnN1YnN0cmluZygwLCAxKVxuICAgICAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnICcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICdcXHhBMCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGlmIChoYXNUcmFpbGluZ1NwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC50cmltKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVnZXggPSBhbGxvd1NwYWNlcyA/IC9bXlxcUyBdL2cgOiAvW1xceEEwXFxzXS9nO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFsZWFkaW5nU3BhY2UgJiYgKG1lbnVBbHJlYWR5QWN0aXZlIHx8ICEocmVnZXgudGVzdChjdXJyZW50VHJpZ2dlclNuaXBwZXQpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25Qb3NpdGlvbjogbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRleHQ6IGN1cnJlbnRUcmlnZ2VyU25pcHBldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZEVsZW1lbnQ6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZE9mZnNldDogb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRyaWdnZXJDaGFyOiB0cmlnZ2VyQ2hhclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDb250ZW50RWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJyAmJiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnXG4gICAgfVxuXG4gICAgZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24oZWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBbJ2RpcmVjdGlvbicsICdib3hTaXppbmcnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ292ZXJmbG93WCcsXG4gICAgICAgICAgICAnb3ZlcmZsb3dZJywgJ2JvcmRlclRvcFdpZHRoJywgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAgICAgICAgICAgJ2JvcmRlckJvdHRvbVdpZHRoJywgJ2JvcmRlckxlZnRXaWR0aCcsICdwYWRkaW5nVG9wJyxcbiAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLCAncGFkZGluZ0JvdHRvbScsICdwYWRkaW5nTGVmdCcsXG4gICAgICAgICAgICAnZm9udFN0eWxlJywgJ2ZvbnRWYXJpYW50JywgJ2ZvbnRXZWlnaHQnLCAnZm9udFN0cmV0Y2gnLFxuICAgICAgICAgICAgJ2ZvbnRTaXplJywgJ2ZvbnRTaXplQWRqdXN0JywgJ2xpbmVIZWlnaHQnLCAnZm9udEZhbWlseScsXG4gICAgICAgICAgICAndGV4dEFsaWduJywgJ3RleHRUcmFuc2Zvcm0nLCAndGV4dEluZGVudCcsXG4gICAgICAgICAgICAndGV4dERlY29yYXRpb24nLCAnbGV0dGVyU3BhY2luZycsICd3b3JkU3BhY2luZydcbiAgICAgICAgXVxuXG4gICAgICAgIGxldCBpc0ZpcmVmb3ggPSAod2luZG93Lm1veklubmVyU2NyZWVuWCAhPT0gbnVsbClcblxuICAgICAgICBsZXQgZGl2ID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2J1xuICAgICAgICB0aGlzLmdldERvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZChkaXYpXG5cbiAgICAgICAgbGV0IHN0eWxlID0gZGl2LnN0eWxlXG4gICAgICAgIGxldCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IGVsZW1lbnQuY3VycmVudFN0eWxlXG5cbiAgICAgICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCdcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwb3NpdGlvbiBvZmYtc2NyZWVuXG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcblxuICAgICAgICAvLyB0cmFuc2ZlciB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMgdG8gdGhlIGRpdlxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgc3R5bGUud2lkdGggPSBgJHsocGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMil9cHhgXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKVxuICAgICAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIH1cblxuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBwb3NpdGlvbilcblxuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gZGl2LnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnwqAnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZyhwb3NpdGlvbikgfHwgJy4nXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKVxuXG4gICAgICAgIGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5kb3dUb3AgKyBzcGFuLm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlSW50KGNvbXB1dGVkLmZvbnRTaXplKSAtIGVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCArIHNwYW4ub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlckxlZnRXaWR0aClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LnJlbW92ZUNoaWxkKGRpdilcblxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKHNlbGVjdGVkTm9kZVBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBtYXJrZXJUZXh0Q2hhciA9ICfvu78nXG4gICAgICAgIGxldCBtYXJrZXJFbCwgbWFya2VySWQgPSBgc2VsXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9XyR7TWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyKX1gXG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgcHJldlJhbmdlID0gc2VsLmdldFJhbmdlQXQoMClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcblxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1hcmtlciBlbGVtZW50IGNvbnRhaW5pbmcgYSBzaW5nbGUgaW52aXNpYmxlIGNoYXJhY3RlciB1c2luZyBET00gbWV0aG9kcyBhbmQgaW5zZXJ0IGl0XG4gICAgICAgIG1hcmtlckVsID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBtYXJrZXJFbC5pZCA9IG1hcmtlcklkXG4gICAgICAgIG1hcmtlckVsLmFwcGVuZENoaWxkKHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVUZXh0Tm9kZShtYXJrZXJUZXh0Q2hhcikpXG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUobWFya2VyRWwpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocHJldlJhbmdlKVxuXG4gICAgICAgIGxldCByZWN0ID0gbWFya2VyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCxcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBtYXJrZXJFbC5vZmZzZXRIZWlnaHQgKyB3aW5kb3dUb3BcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlckVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWFya2VyRWwpXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KGVsZW0pIHtcbiAgICAgICAgbGV0IHJlYXNvbmFibGVCdWZmZXIgPSAyMCxcbiAgICAgICAgICAgIGNsaWVudFJlY3RcbiAgICAgICAgbGV0IG1heFNjcm9sbERpc3BsYWNlbWVudCA9IDEwMFxuICAgICAgICBsZXQgZSA9IGVsZW1cblxuICAgICAgICB3aGlsZSAoY2xpZW50UmVjdCA9PT0gdW5kZWZpbmVkIHx8IGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICBjbGllbnRSZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICAgICAgICBpZiAoY2xpZW50UmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlID0gZS5jaGlsZE5vZGVzWzBdXG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCB8fCAhZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1Ub3AgPSBjbGllbnRSZWN0LnRvcFxuICAgICAgICBsZXQgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBjbGllbnRSZWN0LmhlaWdodFxuXG4gICAgICAgIGlmIChlbGVtVG9wIDwgMCkge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtQm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlclxuXG4gICAgICAgICAgICBpZiAobWF4WSAtIHdpbmRvdy5wYWdlWU9mZnNldCA+IG1heFNjcm9sbERpc3BsYWNlbWVudCkge1xuICAgICAgICAgICAgICAgIG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBtYXhTY3JvbGxEaXNwbGFjZW1lbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgLSAod2luZG93LmlubmVySGVpZ2h0IC0gZWxlbUJvdHRvbSlcblxuICAgICAgICAgICAgaWYgKHRhcmdldFkgPiBtYXhZKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0WSA9IG1heFlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRhcmdldFkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVJhbmdlO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0eW9yay9mdXp6eVxuY2xhc3MgVHJpYnV0ZVNlYXJjaCB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5zZWFyY2ggPSB0aGlzXG4gICAgfVxuXG4gICAgc2ltcGxlRmlsdGVyKHBhdHRlcm4sIGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoc3RyaW5nID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3QocGF0dGVybiwgc3RyaW5nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRlc3QocGF0dGVybiwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0cmluZykgIT09IG51bGxcbiAgICB9XG5cbiAgICBtYXRjaChwYXR0ZXJuLCBzdHJpbmcsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgbGV0IHBhdHRlcm5JZHggPSAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICBsZW4gPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxTY29yZSA9IDAsXG4gICAgICAgICAgICBjdXJyU2NvcmUgPSAwLFxuICAgICAgICAgICAgcHJlID0gb3B0cy5wcmUgfHwgJycsXG4gICAgICAgICAgICBwb3N0ID0gb3B0cy5wb3N0IHx8ICcnLFxuICAgICAgICAgICAgY29tcGFyZVN0cmluZyA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBzdHJpbmcgfHwgc3RyaW5nLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBjaCwgY29tcGFyZUNoYXJcblxuICAgICAgICBwYXR0ZXJuID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHBhdHRlcm4gfHwgcGF0dGVybi50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgbGV0IHBhdHRlcm5DYWNoZSA9IHRoaXMudHJhdmVyc2UoY29tcGFyZVN0cmluZywgcGF0dGVybiwgMCwgMCwgW10pXG4gICAgICAgIGlmICghcGF0dGVybkNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcmVkOiB0aGlzLnJlbmRlcihzdHJpbmcsIHBhdHRlcm5DYWNoZS5jYWNoZSwgcHJlLCBwb3N0KSxcbiAgICAgICAgICAgIHNjb3JlOiBwYXR0ZXJuQ2FjaGUuc2NvcmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgc3RyaW5nSW5kZXgsIHBhdHRlcm5JbmRleCwgcGF0dGVybkNhY2hlKSB7XG4gICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIHNlYXJjaCBhdCBlbmRcbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSBwYXR0ZXJuSW5kZXgpIHtcblxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHNvY3JlIGFuZCBjb3B5IHRoZSBjYWNoZSBjb250YWluaW5nIHRoZSBpbmRpY2VzIHdoZXJlIGl0J3MgZm91bmRcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSxcbiAgICAgICAgICAgICAgICBjYWNoZTogcGF0dGVybkNhY2hlLnNsaWNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHN0cmluZyBhdCBlbmQgb3IgcmVtYWluaW5nIHBhdHRlcm4gPiByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSBzdHJpbmdJbmRleCB8fCBwYXR0ZXJuLmxlbmd0aCAtIHBhdHRlcm5JbmRleCA+IHN0cmluZy5sZW5ndGggLSBzdHJpbmdJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGMgPSBwYXR0ZXJuW3BhdHRlcm5JbmRleF1cbiAgICAgICAgbGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgc3RyaW5nSW5kZXgpXG4gICAgICAgIGxldCBiZXN0LCB0ZW1wXG5cbiAgICAgICAgd2hpbGUgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wdXNoKGluZGV4KVxuICAgICAgICAgICAgdGVtcCA9IHRoaXMudHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBpbmRleCArIDEsIHBhdHRlcm5JbmRleCArIDEsIHBhdHRlcm5DYWNoZSlcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wb3AoKVxuXG4gICAgICAgICAgICAvLyBpZiBkb3duc3RyZWFtIHRyYXZlcnNhbCBmYWlsZWQsIHJldHVybiBiZXN0IGFuc3dlciBzbyBmYXJcbiAgICAgICAgICAgIGlmICghdGVtcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiZXN0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmVzdCB8fCBiZXN0LnNjb3JlIDwgdGVtcC5zY29yZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSB0ZW1wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgaW5kZXggKyAxKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJlc3RcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgbGV0IHNjb3JlID0gMFxuICAgICAgICBsZXQgdGVtcCA9IDFcblxuICAgICAgICBwYXR0ZXJuQ2FjaGUuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuQ2FjaGVbaSAtIDFdICsgMSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCArPSB0ZW1wICsgMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3JlICs9IHRlbXBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gc2NvcmVcbiAgICB9XG5cbiAgICByZW5kZXIoc3RyaW5nLCBpbmRpY2VzLCBwcmUsIHBvc3QpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkID0gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRpY2VzWzBdKVxuXG4gICAgICAgIGluZGljZXMuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIHJlbmRlcmVkICs9IHByZSArIHN0cmluZ1tpbmRleF0gKyBwb3N0ICtcbiAgICAgICAgICAgICAgICBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgMSwgKGluZGljZXNbaSArIDFdKSA/IGluZGljZXNbaSArIDFdIDogc3RyaW5nLmxlbmd0aClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVuZGVyZWRcbiAgICB9XG5cbiAgICBmaWx0ZXIocGF0dGVybiwgYXJyLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGVsZW1lbnQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gb3B0cy5leHRyYWN0KGVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHIpIHsgLy8gdGFrZSBjYXJlIG9mIHVuZGVmaW5lZHMgLyBudWxscyAvIGV0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWQgPSB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0ciwgb3B0cylcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbcHJldi5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiByZW5kZXJlZC5yZW5kZXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiByZW5kZXJlZC5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgICAgICAgIH0sIFtdKVxuXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tcGFyZSA9IGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkgcmV0dXJuIGNvbXBhcmVcbiAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVNlYXJjaDsiLCIvKipcbiogVHJpYnV0ZS5qc1xuKiBOYXRpdmUgRVM2IEphdmFTY3JpcHQgQG1lbnRpb24gUGx1Z2luXG4qKi9cblxuaW1wb3J0IFRyaWJ1dGUgZnJvbSBcIi4vVHJpYnV0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKVxuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDBcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV1cbiAgICAgICAgdmFyIHZhbHVlXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn1cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlXG5cbiAgICBmdW5jdGlvbiBDdXN0b21FdmVudChldmVudCwgcGFyYW1zKSB7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICAgICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JylcbiAgICAgICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKVxuICAgICAgICByZXR1cm4gZXZ0XG4gICAgfVxuXG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZVxuXG4gICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnRcbn0pKClcbiJdfQ==
