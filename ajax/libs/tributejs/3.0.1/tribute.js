(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

var _utils2 = _interopRequireDefault(_utils);

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
            allowSpaces = _ref$allowSpaces === undefined ? false : _ref$allowSpaces,
            _ref$replaceTextSuffi = _ref.replaceTextSuffix,
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi;

        _classCallCheck(this, Tribute);

        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;

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

                    return function () {
                        return '<li>No match!</li>';
                    }.bind(_this);
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
        key: "showMenuForCollection",
        value: function showMenuForCollection(element, collectionIndex) {
            if (element !== document.activeElement) {
                this.placeCaretAtEnd(element);
            }

            this.current.collection = this.collection[collectionIndex || 0];
            this.current.element = element;

            this.insertTextAtCursor(this.current.collection.trigger);
            this.showMenuFor(element);
        }

        // TODO: make sure this works for inputs/textareas

    }, {
        key: "placeCaretAtEnd",
        value: function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }

        // for contenteditable

    }, {
        key: "insertTextAtCursor",
        value: function insertTextAtCursor(text) {
            var sel, range, html;
            sel = window.getSelection();
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.selectNodeContents(textNode);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }

        // for regular inputs

    }, {
        key: "insertAtCaret",
        value: function insertAtCaret(textarea, text) {
            var scrollPos = txtarea.scrollTop;
            var caretPos = txtarea.selectionStart;

            var front = txtarea.value.substring(0, caretPos);
            var back = txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
            txtarea.value = front + text + back;
            caretPos = caretPos + text.length;
            txtarea.selectionStart = caretPos;
            txtarea.selectionEnd = caretPos;
            txtarea.focus();
            txtarea.scrollTop = scrollPos;
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
        value: function selectItemAtIndex(index, originalEvent) {
            index = parseInt(index);
            if (typeof index !== 'number') return;
            var item = this.current.filteredItems[index];
            var content = this.current.collection.selectTemplate(item);
            this.replaceText(content, originalEvent, item);
        }
    }, {
        key: "replaceText",
        value: function replaceText(content, originalEvent, item) {
            this.range.replaceTriggerText(content, true, true, originalEvent, item);
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
            if (this.range.isContentEditable(this.current.element)) {
                return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
            }

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
                instance.tribute.hideMenu();
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
                event.preventDefault();
                event.stopPropagation();
                while (li.nodeName.toLowerCase() !== 'li') {
                    li = li.parentNode;
                    if (!li || li === tribute.menu) {
                        throw new Error('cannot find the <li> container for the click');
                    }
                }
                tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
                tribute.hideMenu();
            } else if (tribute.current.element) {
                setTimeout(function () {
                    return tribute.hideMenu();
                });
            }
        }
    }, {
        key: 'keyup',
        value: function keyup(instance, event) {
            if (instance.inputEvent) {
                instance.inputEvent = false;
            }
            instance.updateSelection(this);

            if (event.keyCode === 27) return;

            if (!instance.tribute.isActive) {
                var keyCode = instance.getKeyCode(instance, this, event);

                if (isNaN(keyCode) || !keyCode) return;

                var trigger = instance.tribute.triggers().find(function (trigger) {
                    return trigger.charCodeAt(0) === keyCode;
                });

                if (typeof trigger !== 'undefined') {
                    instance.callbacks().triggerChar(event, this, trigger);
                }
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
            var _this = this;

            return {
                triggerChar: function triggerChar(e, el, trigger) {
                    var tribute = _this.tribute;
                    tribute.current.trigger = trigger;

                    var collectionItem = tribute.collection.find(function (item) {
                        return item.trigger === trigger;
                    });

                    tribute.current.collection = collectionItem;
                    if (tribute.inputEvent) tribute.showMenuFor(el, true);
                },
                enter: function enter(e, el) {
                    // choose selection
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);
                            _this.tribute.hideMenu();
                        }, 0);
                    }
                },
                escape: function escape(e, el) {
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.tribute.isActive = false;
                        _this.tribute.hideMenu();
                    }
                },
                tab: function tab(e, el) {
                    // choose first match
                    _this.callbacks().enter(e, el);
                },
                up: function up(e, el) {
                    // navigate up ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length,
                            selected = _this.tribute.menuSelected;

                        if (count > selected && selected > 0) {
                            _this.tribute.menuSelected--;
                            _this.setActiveLi();
                        } else if (selected === 0) {
                            _this.tribute.menuSelected = count - 1;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = _this.tribute.menu.scrollHeight;
                        }
                    }
                },
                down: function down(e, el) {
                    // navigate down ul
                    if (_this.tribute.isActive) {
                        e.preventDefault();
                        e.stopPropagation();
                        var count = _this.tribute.current.filteredItems.length - 1,
                            selected = _this.tribute.menuSelected;

                        if (count > selected) {
                            _this.tribute.menuSelected++;
                            _this.setActiveLi();
                        } else if (count === selected) {
                            _this.tribute.menuSelected = 0;
                            _this.setActiveLi();
                            _this.tribute.menu.scrollTop = 0;
                        }
                    }
                },
                delete: function _delete(e, el) {
                    if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
                        _this.tribute.hideMenu();
                    } else if (_this.tribute.isActive) {
                        _this.tribute.showMenuFor(el);
                    }
                }
            };
        }
    }, {
        key: 'setActiveLi',
        value: function setActiveLi(index) {
            var lis = this.tribute.menu.querySelectorAll('li'),
                length = lis.length >>> 0;

            // get heights
            var menuFullHeight = this.getFullHeight(this.tribute.menu),
                liHeight = this.getFullHeight(lis[0]);

            if (index) this.tribute.menuSelected = index;

            for (var i = 0; i < length; i++) {
                var li = lis[i];
                if (i === this.tribute.menuSelected) {
                    var offset = liHeight * (i + 1);
                    var scrollTop = this.tribute.menu.scrollTop;
                    var totalScroll = scrollTop + menuFullHeight;

                    if (offset > totalScroll) {
                        this.tribute.menu.scrollTop += liHeight;
                    } else if (offset < totalScroll) {
                        this.tribute.menu.scrollTop -= liHeight;
                    }

                    li.className = this.tribute.current.collection.selectClass;
                } else {
                    li.className = '';
                }
            }
        }
    }, {
        key: 'getFullHeight',
        value: function getFullHeight(elem, includeMargin) {
            var height = elem.getBoundingClientRect().height;

            if (includeMargin) {
                var style = elem.currentStyle || window.getComputedStyle(elem);
                return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
            }

            return height;
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
            this.tribute.range.getDocument().addEventListener('mousedown', this.tribute.events.click.bind(null, this), false);
            window.addEventListener('resize', this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
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

            if (typeof info !== 'undefined') {
                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.getDocument().activeElement, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                setTimeout(function () {
                    _this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                         left: ' + coordinates.left + 'px;\n                                         position: absolute;\n                                         zIndex: 10000;\n                                         display: block;';

                    if (scrollTo) _this.scrollIntoView();
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

        // TODO: this may not be necessary anymore as we are using mouseup instead of click

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
        value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
            var context = this.tribute.current;
            // TODO: this may not be necessary anymore as we are using mouseup instead of click
            // this.resetSelection(context.element, context.selectedPath, context.selectedOffset)

            var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces);

            // Create the event
            var replaceEvent = new CustomEvent('tribute-replaced', {
                detail: {
                    item: item,
                    event: originalEvent
                }
            });

            if (info !== undefined) {
                if (!this.isContentEditable(context.element)) {
                    var myField = this.getDocument().activeElement;
                    var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
                    text += textSuffix;
                    var startPos = info.mentionPosition;
                    var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;
                    myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
                    myField.selectionStart = startPos + text.length;
                    myField.selectionEnd = startPos + text.length;
                } else {
                    // add a space to the end of the pasted text
                    var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';
                    text += _textSuffix;
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
        value: function getContentEditableSelectedPath(ctx) {
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
                text = '';

            if (!this.isContentEditable(context.element)) {
                var textComponent = this.getDocument().activeElement;
                if (textComponent) {
                    var startPos = textComponent.selectionStart;
                    if (textComponent.value && startPos >= 0) {
                        text = textComponent.value.substring(0, startPos);
                    }
                }
            } else {
                var selectedElem = this.getWindowSelection().anchorNode;

                if (selectedElem != null) {
                    var workingNodeContent = selectedElem.textContent;
                    var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

                    if (workingNodeContent && selectStartOffset >= 0) {
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
                var selectionInfo = this.getContentEditableSelectedPath(ctx);

                if (selectionInfo) {
                    selected = selectionInfo.selected;
                    path = selectionInfo.path;
                    offset = selectionInfo.offset;
                }
            }

            var effectiveRange = this.getTextPrecedingCurrentSelection();

            if (effectiveRange !== undefined && effectiveRange !== null) {
                var mostRecentTriggerCharPos = -1;
                var triggerChar = void 0;

                this.tribute.collection.forEach(function (config) {
                    var c = config.trigger;
                    var idx = config.requireLeadingSpace ? _this2.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

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
                            mentionPosition: mostRecentTriggerCharPos,
                            mentionText: currentTriggerSnippet,
                            mentionSelectedElement: selected,
                            mentionSelectedPath: path,
                            mentionSelectedOffset: offset,
                            mentionTriggerChar: triggerChar
                        };
                    }
                }
            }
        }
    }, {
        key: 'lastIndexWithLeadingSpace',
        value: function lastIndexWithLeadingSpace(str, char) {
            var reversedStr = str.split('').reverse().join('');
            var index = -1;

            for (var cidx = 0, len = str.length; cidx < len; cidx++) {
                var firstChar = cidx === str.length - 1;
                var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
                var match = char === reversedStr[cidx];

                if (match && (firstChar || leadingSpace)) {
                    index = str.length - 1 - cidx;
                    break;
                }
            }

            return index;
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
            var e = this.menu;

            if (typeof e === 'undefined') return;

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

if (window && typeof window.CustomEvent !== "function") {
    var CustomEvent = function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    if (typeof window.Event !== 'undefined') {
        CustomEvent.prototype = window.Event.prototype;
    }

    window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFlRztBQUFBOztBQUFBLCtCQWRDLE1BY0Q7QUFBQSxZQWRDLE1BY0QsK0JBZFUsSUFjVjtBQUFBLCtCQWJDLE1BYUQ7QUFBQSxZQWJDLE1BYUQsK0JBYlUsSUFhVjtBQUFBLG9DQVpDLFdBWUQ7QUFBQSxZQVpDLFdBWUQsb0NBWmUsV0FZZjtBQUFBLGdDQVhDLE9BV0Q7QUFBQSxZQVhDLE9BV0QsZ0NBWFcsR0FXWDtBQUFBLHVDQVZDLGNBVUQ7QUFBQSxZQVZDLGNBVUQsdUNBVmtCLElBVWxCO0FBQUEseUNBVEMsZ0JBU0Q7QUFBQSxZQVRDLGdCQVNELHlDQVRvQixJQVNwQjtBQUFBLCtCQVJDLE1BUUQ7QUFBQSxZQVJDLE1BUUQsK0JBUlUsS0FRVjtBQUFBLGlDQVBDLFFBT0Q7QUFBQSxZQVBDLFFBT0QsaUNBUFksT0FPWjtBQUFBLG1DQU5DLFVBTUQ7QUFBQSxZQU5DLFVBTUQsbUNBTmMsSUFNZDtBQUFBLHNDQUxDLGFBS0Q7QUFBQSxZQUxDLGFBS0Qsc0NBTGlCLElBS2pCO0FBQUEsd0NBSkMsZUFJRDtBQUFBLFlBSkMsZUFJRCx3Q0FKbUIsSUFJbkI7QUFBQSx5Q0FIQyxtQkFHRDtBQUFBLFlBSEMsbUJBR0QseUNBSHVCLElBR3ZCO0FBQUEsb0NBRkMsV0FFRDtBQUFBLFlBRkMsV0FFRCxvQ0FGZSxLQUVmO0FBQUEseUNBREMsaUJBQ0Q7QUFBQSxZQURDLGlC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QWtDLElBQWxDLENBQUosRUFBNkM7QUFDekMsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDRCxlQUFPLFNBQVA7QUFDSCxLQW5CRDtBQW9CSDs7QUFFRCxJQUFJLFVBQVUsT0FBTyxPQUFPLFdBQWQsS0FBOEIsVUFBNUMsRUFBd0Q7QUFBQSxRQUM3QyxXQUQ2QyxHQUN0RCxTQUFTLFdBQVQsQ0FBcUIsS0FBckIsRUFBNEIsTUFBNUIsRUFBb0M7QUFDbEMsaUJBQVMsVUFBVTtBQUNqQixxQkFBUyxLQURRO0FBRWpCLHdCQUFZLEtBRks7QUFHakIsb0JBQVE7QUFIUyxTQUFuQjtBQUtBLFlBQUksTUFBTSxTQUFTLFdBQVQsQ0FBcUIsYUFBckIsQ0FBVjtBQUNBLFlBQUksZUFBSixDQUFvQixLQUFwQixFQUEyQixPQUFPLE9BQWxDLEVBQTJDLE9BQU8sVUFBbEQsRUFBOEQsT0FBTyxNQUFyRTtBQUNBLGVBQU8sR0FBUDtBQUNELEtBVnFEOztBQVl2RCxRQUFJLE9BQU8sT0FBTyxLQUFkLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDLG9CQUFZLFNBQVosR0FBd0IsT0FBTyxLQUFQLENBQWEsU0FBckM7QUFDRDs7QUFFQSxXQUFPLFdBQVAsR0FBcUIsV0FBckI7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVHJpYnV0ZVV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgVHJpYnV0ZUV2ZW50cyBmcm9tIFwiLi9UcmlidXRlRXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZU1lbnVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZU1lbnVFdmVudHNcIjtcbmltcG9ydCBUcmlidXRlUmFuZ2UgZnJvbSBcIi4vVHJpYnV0ZVJhbmdlXCI7XG5pbXBvcnQgVHJpYnV0ZVNlYXJjaCBmcm9tIFwiLi9UcmlidXRlU2VhcmNoXCI7XG5cbmNsYXNzIFRyaWJ1dGUge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgICAgdmFsdWVzID0gbnVsbCxcbiAgICAgICAgaWZyYW1lID0gbnVsbCxcbiAgICAgICAgc2VsZWN0Q2xhc3MgPSAnaGlnaGxpZ2h0JyxcbiAgICAgICAgdHJpZ2dlciA9ICdAJyxcbiAgICAgICAgc2VsZWN0VGVtcGxhdGUgPSBudWxsLFxuICAgICAgICBtZW51SXRlbVRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbG9va3VwID0gJ2tleScsXG4gICAgICAgIGZpbGxBdHRyID0gJ3ZhbHVlJyxcbiAgICAgICAgY29sbGVjdGlvbiA9IG51bGwsXG4gICAgICAgIG1lbnVDb250YWluZXIgPSBudWxsLFxuICAgICAgICBub01hdGNoVGVtcGxhdGUgPSBudWxsLFxuICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gdHJ1ZSxcbiAgICAgICAgYWxsb3dTcGFjZXMgPSBmYWxzZSxcbiAgICAgICAgcmVwbGFjZVRleHRTdWZmaXggPSBudWxsLFxuICAgIH0pIHtcblxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgdGhpcy5jdXJyZW50ID0ge31cbiAgICAgICAgdGhpcy5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lciA9IG1lbnVDb250YWluZXJcbiAgICAgICAgdGhpcy5hbGxvd1NwYWNlcyA9IGFsbG93U3BhY2VzXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRTdWZmaXggPSByZXBsYWNlVGV4dFN1ZmZpeFxuXG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IFt7XG4gICAgICAgICAgICAgICAgLy8gc3ltYm9sIHRoYXQgc3RhcnRzIHRoZSBsb29rdXBcbiAgICAgICAgICAgICAgICB0cmlnZ2VyOiB0cmlnZ2VyLFxuXG4gICAgICAgICAgICAgICAgaWZyYW1lOiBpZnJhbWUsXG5cbiAgICAgICAgICAgICAgICBzZWxlY3RDbGFzczogc2VsZWN0Q2xhc3MsXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgb24gc2VsZWN0IHRoYXQgcmV0dW5zIHRoZSBjb250ZW50IHRvIGluc2VydFxuICAgICAgICAgICAgICAgIHNlbGVjdFRlbXBsYXRlOiAoc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG5cbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBjYWxsZWQgdGhhdCByZXR1cm5zIGNvbnRlbnQgZm9yIGFuIGl0ZW1cbiAgICAgICAgICAgICAgICBtZW51SXRlbVRlbXBsYXRlOiAobWVudUl0ZW1UZW1wbGF0ZSB8fCBUcmlidXRlLmRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgbm9NYXRjaFRlbXBsYXRlOiAodCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtyZXR1cm4gJzxsaT5ObyBtYXRjaCE8L2xpPid9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuXG4gICAgICAgICAgICAgICAgLy8gY29sdW1uIHRvIHNlYXJjaCBhZ2FpbnN0IGluIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgICBsb29rdXA6IGxvb2t1cCxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0aGF0IGNvbnRhaW5zIHRoZSBjb250ZW50IHRvIGluc2VydCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgZmlsbEF0dHI6IGZpbGxBdHRyLFxuXG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyBvciBhIGZ1bmN0aW9uIHJldHVybmluZyBhbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG5cbiAgICAgICAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlOiByZXF1aXJlTGVhZGluZ1NwYWNlLFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBsb29rdXA6IGl0ZW0ubG9va3VwIHx8IGxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEF0dHI6IGl0ZW0uZmlsbEF0dHIgfHwgZmlsbEF0dHIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogaXRlbS52YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IGl0ZW0ucmVxdWlyZUxlYWRpbmdTcGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBObyBjb2xsZWN0aW9uIHNwZWNpZmllZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgbmV3IFRyaWJ1dGVSYW5nZSh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZUV2ZW50cyh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZU1lbnVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVTZWFyY2godGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFNlbGVjdFRlbXBsYXRlKGl0ZW0pIHtcbiAgICAgIGlmICh0aGlzLnJhbmdlLmlzQ29udGVudEVkaXRhYmxlKHRoaXMuY3VycmVudC5lbGVtZW50KSkge1xuICAgICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCJ0cmlidXRlLW1lbnRpb25cIj4nICsgKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXSkgKyAnPC9zcGFuPic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyICsgaXRlbS5vcmlnaW5hbFt0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5maWxsQXR0cl07XG4gICAgfVxuXG4gICAgc3RhdGljIGRlZmF1bHRNZW51SXRlbVRlbXBsYXRlKG1hdGNoSXRlbSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hJdGVtLnN0cmluZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpbnB1dFR5cGVzKCkge1xuICAgICAgICByZXR1cm4gWydURVhUQVJFQScsICdJTlBVVCddXG4gICAgfVxuXG4gICAgdHJpZ2dlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24ubWFwKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdHRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2F0dGFjaChlbCkge1xuICAgICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUcmlidXRlIHdhcyBhbHJlYWR5IGJvdW5kIHRvICcgKyBlbC5ub2RlTmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5zdXJlRWRpdGFibGUoZWwpXG4gICAgICAgIHRoaXMuZXZlbnRzLmJpbmQoZWwpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS10cmlidXRlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBlbnN1cmVFZGl0YWJsZShlbGVtZW50KSB7XG4gICAgICAgIGlmIChUcmlidXRlLmlucHV0VHlwZXMoKS5pbmRleE9mKGVsZW1lbnQubm9kZU5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY29udGVudEVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW1RyaWJ1dGVdIENhbm5vdCBiaW5kIHRvICcgKyBlbGVtZW50Lm5vZGVOYW1lKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlTWVudSgpIHtcbiAgICAgICAgbGV0IHdyYXBwZXIgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgICAgICB1bCA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCd1bCcpXG5cbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSAndHJpYnV0ZS1jb250YWluZXInXG4gICAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQodWwpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVudUNvbnRhaW5lci5hcHBlbmRDaGlsZCh3cmFwcGVyKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgfVxuXG4gICAgc2hvd01lbnVGb3IoZWxlbWVudCwgc2Nyb2xsVG8pIHtcbiAgICAgICAgLy8gT25seSBwcm9jZWVkIGlmIG1lbnUgaXNuJ3QgYWxyZWFkeSBzaG93biBmb3IgdGhlIGN1cnJlbnQgZWxlbWVudCAmIG1lbnRpb25UZXh0XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlICYmIHRoaXMuY3VycmVudC5lbGVtZW50ID09PSBlbGVtZW50ICYmIHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCA9PT0gdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudE1lbnRpb25UZXh0U25hcHNob3QgPSB0aGlzLmN1cnJlbnQubWVudGlvblRleHRcblxuICAgICAgICAvLyBjcmVhdGUgdGhlIG1lbnUgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgICAgICAgaWYgKCF0aGlzLm1lbnUpIHtcbiAgICAgICAgICAgIHRoaXMubWVudSA9IHRoaXMuY3JlYXRlTWVudSgpXG4gICAgICAgICAgICB0aGlzLm1lbnVFdmVudHMuYmluZCh0aGlzLm1lbnUpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgICB0aGlzLm1lbnVTZWxlY3RlZCA9IDBcblxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5tZW50aW9uVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID0gJydcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2Nlc3NWYWx1ZXMgPSAodmFsdWVzKSA9PiB7XG4gICAgICAgICAgICAvLyBUcmlidXRlIG1heSBub3QgYmUgYWN0aXZlIGFueSBtb3JlIGJ5IHRoZSB0aW1lIHRoZSB2YWx1ZSBjYWxsYmFjayByZXR1cm5zXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGl0ZW1zID0gdGhpcy5zZWFyY2guZmlsdGVyKHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCwgdmFsdWVzLCB7XG4gICAgICAgICAgICAgICAgcHJlOiAnPHNwYW4+JyxcbiAgICAgICAgICAgICAgICBwb3N0OiAnPC9zcGFuPicsXG4gICAgICAgICAgICAgICAgZXh0cmFjdDogKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmxvb2t1cF1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwKGVsKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGxvb2t1cCBhdHRyaWJ1dGUsIGxvb2t1cCBtdXN0IGJlIHN0cmluZyBvciBmdW5jdGlvbi4nKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50LmZpbHRlcmVkSXRlbXMgPSBpdGVtc1xuXG5cbiAgICAgICAgICAgIGxldCB1bCA9IHRoaXMubWVudS5xdWVyeVNlbGVjdG9yKCd1bCcpXG5cbiAgICAgICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vTWF0Y2hFdmVudCA9IG5ldyBDdXN0b21FdmVudCgndHJpYnV0ZS1uby1tYXRjaCcsIHsgZGV0YWlsOiB0aGlzLm1lbnUgfSlcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudC5kaXNwYXRjaEV2ZW50KG5vTWF0Y2hFdmVudClcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm5vTWF0Y2hUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1bC5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1bC5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgICAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBsaSA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgbGkgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpXG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50cy5zZXRBY3RpdmVMaShpbmRleClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1lbnVTZWxlY3RlZCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubWVudUl0ZW1UZW1wbGF0ZShpdGVtKVxuICAgICAgICAgICAgICAgIHVsLmFwcGVuZENoaWxkKGxpKVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyh0aGlzLmN1cnJlbnQubWVudGlvblRleHQsIHByb2Nlc3NWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzVmFsdWVzKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dNZW51Rm9yQ29sbGVjdGlvbihlbGVtZW50LCBjb2xsZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucGxhY2VDYXJldEF0RW5kKGVsZW1lbnQpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltjb2xsZWN0aW9uSW5kZXggfHwgMF1cbiAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQgPSBlbGVtZW50XG5cbiAgICAgICAgdGhpcy5pbnNlcnRUZXh0QXRDdXJzb3IodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlcilcbiAgICAgICAgdGhpcy5zaG93TWVudUZvcihlbGVtZW50KVxuICAgIH1cblxuICAgIC8vIFRPRE86IG1ha2Ugc3VyZSB0aGlzIHdvcmtzIGZvciBpbnB1dHMvdGV4dGFyZWFzXG4gICAgcGxhY2VDYXJldEF0RW5kKGVsKSB7XG4gICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93LmdldFNlbGVjdGlvbiAhPSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZVJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWwpO1xuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgICAgICAgICAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuY3JlYXRlVGV4dFJhbmdlICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0UmFuZ2UgPSBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSgpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGVsKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmb3IgY29udGVudGVkaXRhYmxlXG4gICAgaW5zZXJ0VGV4dEF0Q3Vyc29yKHRleHQpIHtcbiAgICAgICAgdmFyIHNlbCwgcmFuZ2UsIGh0bWw7XG4gICAgICAgIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbiAgICAgICAgdmFyIHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUodGV4dE5vZGUpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGV4dE5vZGUpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKVxuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgIH1cblxuICAgIC8vIGZvciByZWd1bGFyIGlucHV0c1xuICAgIGluc2VydEF0Q2FyZXQodGV4dGFyZWEsIHRleHQpIHtcbiAgICAgICAgdmFyIHNjcm9sbFBvcyA9IHR4dGFyZWEuc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgY2FyZXRQb3MgPSB0eHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuXG4gICAgICAgIHZhciBmcm9udCA9ICh0eHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcoMCwgY2FyZXRQb3MpO1xuICAgICAgICB2YXIgYmFjayA9ICh0eHRhcmVhLnZhbHVlKS5zdWJzdHJpbmcodHh0YXJlYS5zZWxlY3Rpb25FbmQsIHR4dGFyZWEudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgdHh0YXJlYS52YWx1ZSA9IGZyb250ICsgdGV4dCArIGJhY2s7XG4gICAgICAgIGNhcmV0UG9zID0gY2FyZXRQb3MgKyB0ZXh0Lmxlbmd0aDtcbiAgICAgICAgdHh0YXJlYS5zZWxlY3Rpb25TdGFydCA9IGNhcmV0UG9zO1xuICAgICAgICB0eHRhcmVhLnNlbGVjdGlvbkVuZCA9IGNhcmV0UG9zO1xuICAgICAgICB0eHRhcmVhLmZvY3VzKCk7XG4gICAgICAgIHR4dGFyZWEuc2Nyb2xsVG9wID0gc2Nyb2xsUG9zO1xuICAgIH1cblxuICAgIGhpZGVNZW51KCkge1xuICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lOydcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0SXRlbUF0SW5kZXgoaW5kZXgsIG9yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVyblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zW2luZGV4XVxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdFRlbXBsYXRlKGl0ZW0pXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSlcbiAgICB9XG5cbiAgICByZXBsYWNlVGV4dChjb250ZW50LCBvcmlnaW5hbEV2ZW50LCBpdGVtKSB7XG4gICAgICAgIHRoaXMucmFuZ2UucmVwbGFjZVRyaWdnZXJUZXh0KGNvbnRlbnQsIHRydWUsIHRydWUsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gYXBwZW5kIHRvIHZhbHVlcywgYXMgaXQgaXMgYSBmdW5jdGlvbi4nKVxuICAgICAgICB9IGVsc2UgaWYgKCFyZXBsYWNlKSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IGNvbGxlY3Rpb24udmFsdWVzLmNvbmNhdChuZXdWYWx1ZXMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb2xsZWN0aW9uLnZhbHVlcyA9IG5ld1ZhbHVlc1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwZW5kKGNvbGxlY3Rpb25JbmRleCwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KGNvbGxlY3Rpb25JbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHRocm93IG5ldyBFcnJvcigncGxlYXNlIHByb3ZpZGUgYW4gaW5kZXggZm9yIHRoZSBjb2xsZWN0aW9uIHRvIHVwZGF0ZS4nKVxuXG4gICAgICAgIGxldCBjb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uW2luZGV4XVxuXG4gICAgICAgIHRoaXMuX2FwcGVuZChjb2xsZWN0aW9uLCBuZXdWYWx1ZXMsIHJlcGxhY2UpXG4gICAgfVxuXG4gICAgYXBwZW5kQ3VycmVudChuZXdWYWx1ZXMsIHJlcGxhY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2FwcGVuZCh0aGlzLmN1cnJlbnQuY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhY3RpdmUgc3RhdGUuIFBsZWFzZSB1c2UgYXBwZW5kIGluc3RlYWQgYW5kIHBhc3MgYW4gaW5kZXguJylcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImNsYXNzIFRyaWJ1dGVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuZXZlbnRzID0gdGhpc1xuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogOSxcbiAgICAgICAgICAgIHZhbHVlOiAnVEFCJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDgsXG4gICAgICAgICAgICB2YWx1ZTogJ0RFTEVURSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAxMyxcbiAgICAgICAgICAgIHZhbHVlOiAnRU5URVInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMjcsXG4gICAgICAgICAgICB2YWx1ZTogJ0VTQ0FQRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzOCxcbiAgICAgICAgICAgIHZhbHVlOiAnVVAnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogNDAsXG4gICAgICAgICAgICB2YWx1ZTogJ0RPV04nXG4gICAgICAgIH1dXG4gICAgfVxuXG4gICAgYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICB0aGlzLmtleWRvd24uYmluZChlbGVtZW50LCB0aGlzKSwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgdGhpcy5rZXl1cC5iaW5kKGVsZW1lbnQsIHRoaXMpLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICB0aGlzLmlucHV0LmJpbmQoZWxlbWVudCwgdGhpcyksIGZhbHNlKVxuICAgIH1cblxuICAgIGtleWRvd24oaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5zaG91bGREZWFjdGl2YXRlKGV2ZW50KSkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpbnN0YW5jZS50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtZW50ID0gdGhpc1xuICAgICAgICBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPSBmYWxzZVxuXG4gICAgICAgIFRyaWJ1dGVFdmVudHMua2V5cygpLmZvckVhY2gobyA9PiB7XG4gICAgICAgICAgICBpZiAoby5rZXkgPT09IGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZS5jb21tYW5kRXZlbnQgPSB0cnVlXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY2FsbGJhY2tzKClbby52YWx1ZS50b0xvd2VyQ2FzZSgpXShldmVudCwgZWxlbWVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpbnB1dChpbnN0YW5jZSwgZXZlbnQpIHtcbiAgICAgICAgaW5zdGFuY2UuaW5wdXRFdmVudCA9IHRydWVcbiAgICAgICAgaW5zdGFuY2Uua2V5dXAuY2FsbCh0aGlzLCBpbnN0YW5jZSwgZXZlbnQpXG4gICAgfVxuXG4gICAgY2xpY2soaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGxldCB0cmlidXRlID0gaW5zdGFuY2UudHJpYnV0ZVxuICAgICAgICBpZiAodHJpYnV0ZS5tZW51ICYmIHRyaWJ1dGUubWVudS5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBldmVudC50YXJnZXRcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICB3aGlsZSAobGkubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2xpJykge1xuICAgICAgICAgICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIGlmICghbGkgfHwgbGkgPT09IHRyaWJ1dGUubWVudSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBmaW5kIHRoZSA8bGk+IGNvbnRhaW5lciBmb3IgdGhlIGNsaWNrJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmlidXRlLnNlbGVjdEl0ZW1BdEluZGV4KGxpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCBldmVudClcbiAgICAgICAgICAgIHRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICB9IGVsc2UgaWYgKHRyaWJ1dGUuY3VycmVudC5lbGVtZW50KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWJ1dGUuaGlkZU1lbnUoKSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGtleXVwKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2UuaW5wdXRFdmVudCkge1xuICAgICAgICAgICAgaW5zdGFuY2UuaW5wdXRFdmVudCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFuY2UudXBkYXRlU2VsZWN0aW9uKHRoaXMpXG5cbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSByZXR1cm5cblxuICAgICAgICBpZiAoIWluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBrZXlDb2RlID0gaW5zdGFuY2UuZ2V0S2V5Q29kZShpbnN0YW5jZSwgdGhpcywgZXZlbnQpXG5cbiAgICAgICAgICAgIGlmIChpc05hTihrZXlDb2RlKSB8fCAha2V5Q29kZSkgcmV0dXJuXG5cbiAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gaW5zdGFuY2UudHJpYnV0ZS50cmlnZ2VycygpLmZpbmQodHJpZ2dlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIuY2hhckNvZGVBdCgwKSA9PT0ga2V5Q29kZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLnRyaWdnZXJDaGFyKGV2ZW50LCB0aGlzLCB0cmlnZ2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyICYmIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9PT0gZmFsc2VcbiAgICAgICAgICAgIHx8IGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgJiYgZXZlbnQua2V5Q29kZSA9PT0gOCkge1xuICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcywgdHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZERlYWN0aXZhdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBldmVudEtleVByZXNzZWQgPSBmYWxzZVxuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gby5rZXkpIGV2ZW50S2V5UHJlc3NlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiAhZXZlbnRLZXlQcmVzc2VkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBnZXRLZXlDb2RlKGluc3RhbmNlLCBlbCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGNoYXJcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGxldCBpbmZvID0gdHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgZmFsc2UsIHRydWUsIHRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvLm1lbnRpb25UcmlnZ2VyQ2hhci5jaGFyQ29kZUF0KDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvbihlbCkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50ID0gZWxcbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgaWYgKGluZm8pIHtcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50LnNlbGVjdGVkUGF0aCA9IGluZm8ubWVudGlvblNlbGVjdGVkUGF0aFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQubWVudGlvblRleHQgPSBpbmZvLm1lbnRpb25UZXh0XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZE9mZnNldCA9IGluZm8ubWVudGlvblNlbGVjdGVkT2Zmc2V0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYWxsYmFja3MoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmlnZ2VyQ2hhcjogKGUsIGVsLCB0cmlnZ2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHRyaWJ1dGUgPSB0aGlzLnRyaWJ1dGVcbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQudHJpZ2dlciA9IHRyaWdnZXJcblxuICAgICAgICAgICAgICAgIGxldCBjb2xsZWN0aW9uSXRlbSA9IHRyaWJ1dGUuY29sbGVjdGlvbi5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS50cmlnZ2VyID09PSB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uID0gY29sbGVjdGlvbkl0ZW1cbiAgICAgICAgICAgICAgICBpZiAodHJpYnV0ZS5pbnB1dEV2ZW50KSB0cmlidXRlLnNob3dNZW51Rm9yKGVsLCB0cnVlKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGVyOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjaG9vc2Ugc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleCh0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLCBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmhpZGVNZW51KClcbiAgICAgICAgICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlOiAoZSwgZWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhYjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3MoKS5lbnRlcihlLCBlbClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgdXAgdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLS1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IGNvdW50IC0gMVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCA9IHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIGRvd24gdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKytcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKGVsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGl2ZUxpKGluZGV4KSB7XG4gICAgICAgIGxldCBsaXMgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICAgICAgbGVuZ3RoID0gbGlzLmxlbmd0aCA+Pj4gMFxuXG4gICAgICAgIC8vIGdldCBoZWlnaHRzXG4gICAgICAgIGxldCBtZW51RnVsbEhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodCh0aGlzLnRyaWJ1dGUubWVudSksXG4gICAgICAgICAgICBsaUhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodChsaXNbMF0pXG5cbiAgICAgICAgaWYgKGluZGV4KSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gaW5kZXg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpID0gbGlzW2ldXG4gICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBsaUhlaWdodCAqIChpKzEpXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcCA9IHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcFxuICAgICAgICAgICAgICAgIGxldCB0b3RhbFNjcm9sbCA9IHNjcm9sbFRvcCArIG1lbnVGdWxsSGVpZ2h0XG5cbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID4gdG90YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCArPSBsaUhlaWdodFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0IDwgdG90YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCAtPSBsaUhlaWdodFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZ1bGxIZWlnaHQoZWxlbSwgaW5jbHVkZU1hcmdpbikge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cbiAgICAgIGlmIChpbmNsdWRlTWFyZ2luKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IGVsZW0uY3VycmVudFN0eWxlIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pXG4gICAgICAgIHJldHVybiBoZWlnaHQgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblRvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkJvdHRvbSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlaWdodFxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlRXZlbnRzO1xuIiwiY2xhc3MgVHJpYnV0ZU1lbnVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUubWVudUV2ZW50cyA9IHRoaXNcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy50cmlidXRlLm1lbnVcbiAgICB9XG5cbiAgICBiaW5kKG1lbnUpIHtcbiAgICAgICAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJyxcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5ldmVudHMua2V5ZG93bi5iaW5kKHRoaXMubWVudSwgdGhpcyksIGZhbHNlKVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmV2ZW50cy5jbGljay5iaW5kKG51bGwsIHRoaXMpLCBmYWxzZSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMCwgZmFsc2UpKVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAzMDAsIGZhbHNlKSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cub25zY3JvbGwgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5zaG93TWVudUZvcih0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50LCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAzMDAsIGZhbHNlKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXRcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzID0gYXJndW1lbnRzXG4gICAgICAgICAgICB2YXIgbGF0ZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGxcbiAgICAgICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXRcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KVxuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpXG4gICAgICAgICAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVNZW51RXZlbnRzO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9qZWZmLWNvbGxpbnMvbWVudC5pb1xuY2xhc3MgVHJpYnV0ZVJhbmdlIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmlidXRlKSB7XG4gICAgICAgIHRoaXMudHJpYnV0ZSA9IHRyaWJ1dGVcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlID0gdGhpc1xuICAgIH1cblxuICAgIGdldERvY3VtZW50KCkge1xuICAgICAgICBsZXQgaWZyYW1lXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICBpZnJhbWUgPSB0aGlzLnRyaWJ1dGUuY3VycmVudC5jb2xsZWN0aW9uLmlmcmFtZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50XG4gICAgfVxuXG4gICAgcG9zaXRpb25NZW51QXRDYXJldChzY3JvbGxUbykge1xuICAgICAgICBsZXQgY29udGV4dCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LFxuICAgICAgICAgICAgY29vcmRpbmF0ZXNcblxuICAgICAgICBsZXQgaW5mbyA9IHRoaXMuZ2V0VHJpZ2dlckluZm8oZmFsc2UsIGZhbHNlLCB0cnVlLCB0aGlzLnRyaWJ1dGUuYWxsb3dTcGFjZXMpXG5cbiAgICAgICAgaWYgKHR5cGVvZiBpbmZvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24odGhpcy5nZXREb2N1bWVudCgpLmFjdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGluZm8ubWVudGlvblBvc2l0aW9uKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZUNhcmV0UG9zaXRpb24oaW5mby5tZW50aW9uUG9zaXRpb24pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgdG9wOiAke2Nvb3JkaW5hdGVzLnRvcH1weDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtjb29yZGluYXRlcy5sZWZ0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO2BcblxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxUbykgdGhpcy5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgICAgICB9LCAwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWxlbWVudCh0YXJnZXRFbGVtZW50LCBwYXRoLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJhbmdlXG4gICAgICAgIGxldCBlbGVtID0gdGFyZ2V0RWxlbWVudFxuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5jaGlsZE5vZGVzW3BhdGhbaV1dXG4gICAgICAgICAgICAgICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsZW0ubGVuZ3RoIDwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCAtPSBlbGVtLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBlbGVtID0gZWxlbS5uZXh0U2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZWxlbS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCAmJiAhZWxlbS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ucHJldmlvdXNTaWJsaW5nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlUmFuZ2UoKVxuICAgICAgICByYW5nZS5zZXRTdGFydChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLnNldEVuZChlbGVtLCBvZmZzZXQpXG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge31cblxuICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpXG4gICAgICAgIHRhcmdldEVsZW1lbnQuZm9jdXMoKVxuICAgIH1cblxuICAgIC8vIFRPRE86IHRoaXMgbWF5IG5vdCBiZSBuZWNlc3NhcnkgYW55bW9yZSBhcyB3ZSBhcmUgdXNpbmcgbW91c2V1cCBpbnN0ZWFkIG9mIGNsaWNrXG4gICAgcmVzZXRTZWxlY3Rpb24odGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZSh0YXJnZXRFbGVtZW50KSkge1xuICAgICAgICAgICAgaWYgKHRhcmdldEVsZW1lbnQgIT09IHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5mb2N1cygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQodGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwbGFjZVRyaWdnZXJUZXh0KHRleHQsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGhhc1RyYWlsaW5nU3BhY2UsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuICAgICAgICAvLyBUT0RPOiB0aGlzIG1heSBub3QgYmUgbmVjZXNzYXJ5IGFueW1vcmUgYXMgd2UgYXJlIHVzaW5nIG1vdXNldXAgaW5zdGVhZCBvZiBjbGlja1xuICAgICAgICAvLyB0aGlzLnJlc2V0U2VsZWN0aW9uKGNvbnRleHQuZWxlbWVudCwgY29udGV4dC5zZWxlY3RlZFBhdGgsIGNvbnRleHQuc2VsZWN0ZWRPZmZzZXQpXG5cbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKHRydWUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcylcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGV2ZW50XG4gICAgICAgIGxldCByZXBsYWNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtcmVwbGFjZWQnLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBvcmlnaW5hbEV2ZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlGaWVsZCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50XG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdWZmaXggPSB0eXBlb2YgdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4ID09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgICAgIDogJyAnXG4gICAgICAgICAgICAgICAgdGV4dCArPSB0ZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgbGV0IHN0YXJ0UG9zID0gaW5mby5tZW50aW9uUG9zaXRpb25cbiAgICAgICAgICAgICAgICBsZXQgZW5kUG9zID0gaW5mby5tZW50aW9uUG9zaXRpb24gKyBpbmZvLm1lbnRpb25UZXh0Lmxlbmd0aCArIHRleHRTdWZmaXgubGVuZ3RoXG4gICAgICAgICAgICAgICAgbXlGaWVsZC52YWx1ZSA9IG15RmllbGQudmFsdWUuc3Vic3RyaW5nKDAsIHN0YXJ0UG9zKSArIHRleHQgK1xuICAgICAgICAgICAgICAgICAgICBteUZpZWxkLnZhbHVlLnN1YnN0cmluZyhlbmRQb3MsIG15RmllbGQudmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgIG15RmllbGQuc2VsZWN0aW9uU3RhcnQgPSBzdGFydFBvcyArIHRleHQubGVuZ3RoXG4gICAgICAgICAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25FbmQgPSBzdGFydFBvcyArIHRleHQubGVuZ3RoXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGFkZCBhIHNwYWNlIHRvIHRoZSBlbmQgb2YgdGhlIHBhc3RlZCB0ZXh0XG4gICAgICAgICAgICAgICAgbGV0IHRleHRTdWZmaXggPSB0eXBlb2YgdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4ID09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLnJlcGxhY2VUZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgICAgIDogJ1xceEEwJ1xuICAgICAgICAgICAgICAgIHRleHQgKz0gdGV4dFN1ZmZpeFxuICAgICAgICAgICAgICAgIHRoaXMucGFzdGVIdG1sKHRleHQsIGluZm8ubWVudGlvblBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgMSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29udGV4dC5lbGVtZW50LmRpc3BhdGNoRXZlbnQocmVwbGFjZUV2ZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGFzdGVIdG1sKGh0bWwsIHN0YXJ0UG9zLCBlbmRQb3MpIHtcbiAgICAgICAgbGV0IHJhbmdlLCBzZWxcbiAgICAgICAgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzdGFydFBvcylcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBlbmRQb3MpXG4gICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKClcblxuICAgICAgICBsZXQgZWwgPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gaHRtbFxuICAgICAgICBsZXQgZnJhZyA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgICAgICBub2RlLCBsYXN0Tm9kZVxuICAgICAgICB3aGlsZSAoKG5vZGUgPSBlbC5maXJzdENoaWxkKSkge1xuICAgICAgICAgICAgbGFzdE5vZGUgPSBmcmFnLmFwcGVuZENoaWxkKG5vZGUpXG4gICAgICAgIH1cbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShmcmFnKVxuXG4gICAgICAgIC8vIFByZXNlcnZlIHRoZSBzZWxlY3Rpb25cbiAgICAgICAgaWYgKGxhc3ROb2RlKSB7XG4gICAgICAgICAgICByYW5nZSA9IHJhbmdlLmNsb25lUmFuZ2UoKVxuICAgICAgICAgICAgcmFuZ2Uuc2V0U3RhcnRBZnRlcihsYXN0Tm9kZSlcbiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKHRydWUpXG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFdpbmRvd1NlbGVjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJpYnV0ZS5jb2xsZWN0aW9uLmlmcmFtZS5jb250ZW50V2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2luZG93LmdldFNlbGVjdGlvbigpXG4gICAgfVxuXG4gICAgZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2Rlc1tpXVxuXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVTZWxlY3RlZFBhdGgoY3R4KSB7XG4gICAgICAgIGxldCBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHNlbC5hbmNob3JOb2RlXG4gICAgICAgIGxldCBwYXRoID0gW11cbiAgICAgICAgbGV0IG9mZnNldFxuXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgaVxuICAgICAgICAgICAgbGV0IGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICB3aGlsZSAoc2VsZWN0ZWQgIT09IG51bGwgJiYgY2UgIT09ICd0cnVlJykge1xuICAgICAgICAgICAgICAgIGkgPSB0aGlzLmdldE5vZGVQb3NpdGlvbkluUGFyZW50KHNlbGVjdGVkKVxuICAgICAgICAgICAgICAgIHBhdGgucHVzaChpKVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWQucGFyZW50Tm9kZVxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBjZSA9IHNlbGVjdGVkLmNvbnRlbnRFZGl0YWJsZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhdGgucmV2ZXJzZSgpXG5cbiAgICAgICAgICAgIC8vIGdldFJhbmdlQXQgbWF5IG5vdCBleGlzdCwgbmVlZCBhbHRlcm5hdGl2ZVxuICAgICAgICAgICAgb2Zmc2V0ID0gc2VsLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWQsXG4gICAgICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICB0ZXh0ID0gJydcblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY29udGV4dC5lbGVtZW50KSkge1xuICAgICAgICAgICAgbGV0IHRleHRDb21wb25lbnQgPSB0aGlzLmdldERvY3VtZW50KCkuYWN0aXZlRWxlbWVudFxuICAgICAgICAgICAgaWYgKHRleHRDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSB0ZXh0Q29tcG9uZW50LnNlbGVjdGlvblN0YXJ0XG4gICAgICAgICAgICAgICAgaWYgKHRleHRDb21wb25lbnQudmFsdWUgJiYgc3RhcnRQb3MgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dENvbXBvbmVudC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKS5hbmNob3JOb2RlXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEVsZW0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGxldCB3b3JraW5nTm9kZUNvbnRlbnQgPSBzZWxlY3RlZEVsZW0udGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0U3RhcnRPZmZzZXQgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmdldFJhbmdlQXQoMCkuc3RhcnRPZmZzZXRcblxuICAgICAgICAgICAgICAgIGlmICh3b3JraW5nTm9kZUNvbnRlbnQgJiYgc2VsZWN0U3RhcnRPZmZzZXQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gd29ya2luZ05vZGVDb250ZW50LnN1YnN0cmluZygwLCBzZWxlY3RTdGFydE9mZnNldClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGV4dFxuICAgIH1cblxuICAgIGdldFRyaWdnZXJJbmZvKG1lbnVBbHJlYWR5QWN0aXZlLCBoYXNUcmFpbGluZ1NwYWNlLCByZXF1aXJlTGVhZGluZ1NwYWNlLCBhbGxvd1NwYWNlcykge1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy50cmlidXRlLmN1cnJlbnRcbiAgICAgICAgbGV0IHNlbGVjdGVkLCBwYXRoLCBvZmZzZXRcblxuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUoY3R4LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5hY3RpdmVFbGVtZW50XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5mbyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlU2VsZWN0ZWRQYXRoKGN0eClcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkluZm8pIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGlvbkluZm8uc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICBwYXRoID0gc2VsZWN0aW9uSW5mby5wYXRoXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gc2VsZWN0aW9uSW5mby5vZmZzZXRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlZmZlY3RpdmVSYW5nZSA9IHRoaXMuZ2V0VGV4dFByZWNlZGluZ0N1cnJlbnRTZWxlY3Rpb24oKVxuXG4gICAgICAgIGlmIChlZmZlY3RpdmVSYW5nZSAhPT0gdW5kZWZpbmVkICYmIGVmZmVjdGl2ZVJhbmdlICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsZXQgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gLTFcbiAgICAgICAgICAgIGxldCB0cmlnZ2VyQ2hhclxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY29sbGVjdGlvbi5mb3JFYWNoKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGMgPSBjb25maWcudHJpZ2dlclxuICAgICAgICAgICAgICAgIGxldCBpZHggPSBjb25maWcucmVxdWlyZUxlYWRpbmdTcGFjZSA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEluZGV4V2l0aExlYWRpbmdTcGFjZShlZmZlY3RpdmVSYW5nZSwgYykgOlxuICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5sYXN0SW5kZXhPZihjKVxuXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcykge1xuICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPSBpZHhcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBjXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2UgPSBjb25maWcucmVxdWlyZUxlYWRpbmdTcGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmIChtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgPj0gMCAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID09PSAwIHx8XG4gICAgICAgICAgICAgICAgICAgICFyZXF1aXJlTGVhZGluZ1NwYWNlIHx8XG4gICAgICAgICAgICAgICAgICAgIC9bXFx4QTBcXHNdL2cudGVzdChcbiAgICAgICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLnN1YnN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcylcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSxcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGVuZ3RoKVxuXG4gICAgICAgICAgICAgICAgdHJpZ2dlckNoYXIgPSBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLCBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MgKyAxKVxuICAgICAgICAgICAgICAgIGxldCBmaXJzdFNuaXBwZXRDaGFyID0gY3VycmVudFRyaWdnZXJTbmlwcGV0LnN1YnN0cmluZygwLCAxKVxuICAgICAgICAgICAgICAgIGxldCBsZWFkaW5nU3BhY2UgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnICcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0U25pcHBldENoYXIgPT09ICdcXHhBMCdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGlmIChoYXNUcmFpbGluZ1NwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmlnZ2VyU25pcHBldCA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC50cmltKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVnZXggPSBhbGxvd1NwYWNlcyA/IC9bXlxcUyBdL2cgOiAvW1xceEEwXFxzXS9nO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFsZWFkaW5nU3BhY2UgJiYgKG1lbnVBbHJlYWR5QWN0aXZlIHx8ICEocmVnZXgudGVzdChjdXJyZW50VHJpZ2dlclNuaXBwZXQpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25Qb3NpdGlvbjogbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRleHQ6IGN1cnJlbnRUcmlnZ2VyU25pcHBldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZEVsZW1lbnQ6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZE9mZnNldDogb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRyaWdnZXJDaGFyOiB0cmlnZ2VyQ2hhclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGFzdEluZGV4V2l0aExlYWRpbmdTcGFjZSAoc3RyLCBjaGFyKSB7XG4gICAgICAgIGxldCByZXZlcnNlZFN0ciA9IHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpXG4gICAgICAgIGxldCBpbmRleCA9IC0xXG5cbiAgICAgICAgZm9yIChsZXQgY2lkeCA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGNpZHggPCBsZW47IGNpZHgrKykge1xuICAgICAgICAgICAgbGV0IGZpcnN0Q2hhciA9IGNpZHggPT09IHN0ci5sZW5ndGggLSAxXG4gICAgICAgICAgICBsZXQgbGVhZGluZ1NwYWNlID0gL1xccy8udGVzdChyZXZlcnNlZFN0cltjaWR4ICsgMV0pXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBjaGFyID09PSByZXZlcnNlZFN0cltjaWR4XVxuXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgKGZpcnN0Q2hhciB8fCBsZWFkaW5nU3BhY2UpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBzdHIubGVuZ3RoIC0gMSAtIGNpZHhcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaXNDb250ZW50RWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJyAmJiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnXG4gICAgfVxuXG4gICAgZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24oZWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAgICAgbGV0IHByb3BlcnRpZXMgPSBbJ2RpcmVjdGlvbicsICdib3hTaXppbmcnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ292ZXJmbG93WCcsXG4gICAgICAgICAgICAnb3ZlcmZsb3dZJywgJ2JvcmRlclRvcFdpZHRoJywgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAgICAgICAgICAgJ2JvcmRlckJvdHRvbVdpZHRoJywgJ2JvcmRlckxlZnRXaWR0aCcsICdwYWRkaW5nVG9wJyxcbiAgICAgICAgICAgICdwYWRkaW5nUmlnaHQnLCAncGFkZGluZ0JvdHRvbScsICdwYWRkaW5nTGVmdCcsXG4gICAgICAgICAgICAnZm9udFN0eWxlJywgJ2ZvbnRWYXJpYW50JywgJ2ZvbnRXZWlnaHQnLCAnZm9udFN0cmV0Y2gnLFxuICAgICAgICAgICAgJ2ZvbnRTaXplJywgJ2ZvbnRTaXplQWRqdXN0JywgJ2xpbmVIZWlnaHQnLCAnZm9udEZhbWlseScsXG4gICAgICAgICAgICAndGV4dEFsaWduJywgJ3RleHRUcmFuc2Zvcm0nLCAndGV4dEluZGVudCcsXG4gICAgICAgICAgICAndGV4dERlY29yYXRpb24nLCAnbGV0dGVyU3BhY2luZycsICd3b3JkU3BhY2luZydcbiAgICAgICAgXVxuXG4gICAgICAgIGxldCBpc0ZpcmVmb3ggPSAod2luZG93Lm1veklubmVyU2NyZWVuWCAhPT0gbnVsbClcblxuICAgICAgICBsZXQgZGl2ID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2J1xuICAgICAgICB0aGlzLmdldERvY3VtZW50KCkuYm9keS5hcHBlbmRDaGlsZChkaXYpXG5cbiAgICAgICAgbGV0IHN0eWxlID0gZGl2LnN0eWxlXG4gICAgICAgIGxldCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSA6IGVsZW1lbnQuY3VycmVudFN0eWxlXG5cbiAgICAgICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCdcbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIHN0eWxlLndvcmRXcmFwID0gJ2JyZWFrLXdvcmQnXG4gICAgICAgIH1cblxuICAgICAgICAvLyBwb3NpdGlvbiBvZmYtc2NyZWVuXG4gICAgICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcblxuICAgICAgICAvLyB0cmFuc2ZlciB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMgdG8gdGhlIGRpdlxuICAgICAgICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICBzdHlsZVtwcm9wXSA9IGNvbXB1dGVkW3Byb3BdXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGlzRmlyZWZveCkge1xuICAgICAgICAgICAgc3R5bGUud2lkdGggPSBgJHsocGFyc2VJbnQoY29tcHV0ZWQud2lkdGgpIC0gMil9cHhgXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKVxuICAgICAgICAgICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nXG4gICAgICAgIH1cblxuICAgICAgICBkaXYudGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBwb3NpdGlvbilcblxuICAgICAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgICAgICAgZGl2LnRleHRDb250ZW50ID0gZGl2LnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnwqAnKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNwYW4gPSB0aGlzLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZyhwb3NpdGlvbikgfHwgJy4nXG4gICAgICAgIGRpdi5hcHBlbmRDaGlsZChzcGFuKVxuXG4gICAgICAgIGxldCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgICAgIGxldCBjb29yZGluYXRlcyA9IHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyB3aW5kb3dUb3AgKyBzcGFuLm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlSW50KGNvbXB1dGVkLmZvbnRTaXplKSAtIGVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCArIHNwYW4ub2Zmc2V0TGVmdCArIHBhcnNlSW50KGNvbXB1dGVkLmJvcmRlckxlZnRXaWR0aClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LnJlbW92ZUNoaWxkKGRpdilcblxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKHNlbGVjdGVkTm9kZVBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBtYXJrZXJUZXh0Q2hhciA9ICfvu78nXG4gICAgICAgIGxldCBtYXJrZXJFbCwgbWFya2VySWQgPSBgc2VsXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9XyR7TWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyKX1gXG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgcHJldlJhbmdlID0gc2VsLmdldFJhbmdlQXQoMClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcblxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1hcmtlciBlbGVtZW50IGNvbnRhaW5pbmcgYSBzaW5nbGUgaW52aXNpYmxlIGNoYXJhY3RlciB1c2luZyBET00gbWV0aG9kcyBhbmQgaW5zZXJ0IGl0XG4gICAgICAgIG1hcmtlckVsID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBtYXJrZXJFbC5pZCA9IG1hcmtlcklkXG4gICAgICAgIG1hcmtlckVsLmFwcGVuZENoaWxkKHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVUZXh0Tm9kZShtYXJrZXJUZXh0Q2hhcikpXG4gICAgICAgIHJhbmdlLmluc2VydE5vZGUobWFya2VyRWwpXG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICBzZWwuYWRkUmFuZ2UocHJldlJhbmdlKVxuXG4gICAgICAgIGxldCByZWN0ID0gbWFya2VyRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcbiAgICAgICAgbGV0IGNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luZG93TGVmdCxcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBtYXJrZXJFbC5vZmZzZXRIZWlnaHQgKyB3aW5kb3dUb3BcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlckVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobWFya2VyRWwpXG4gICAgICAgIHJldHVybiBjb29yZGluYXRlc1xuICAgIH1cblxuICAgIHNjcm9sbEludG9WaWV3KGVsZW0pIHtcbiAgICAgICAgbGV0IHJlYXNvbmFibGVCdWZmZXIgPSAyMCxcbiAgICAgICAgICAgIGNsaWVudFJlY3RcbiAgICAgICAgbGV0IG1heFNjcm9sbERpc3BsYWNlbWVudCA9IDEwMFxuICAgICAgICBsZXQgZSA9IHRoaXMubWVudVxuXG4gICAgICAgIGlmICh0eXBlb2YgZSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICB3aGlsZSAoY2xpZW50UmVjdCA9PT0gdW5kZWZpbmVkIHx8IGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICBjbGllbnRSZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICAgICAgICBpZiAoY2xpZW50UmVjdC5oZWlnaHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlID0gZS5jaGlsZE5vZGVzWzBdXG4gICAgICAgICAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCB8fCAhZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGVsZW1Ub3AgPSBjbGllbnRSZWN0LnRvcFxuICAgICAgICBsZXQgZWxlbUJvdHRvbSA9IGVsZW1Ub3AgKyBjbGllbnRSZWN0LmhlaWdodFxuXG4gICAgICAgIGlmIChlbGVtVG9wIDwgMCkge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIGlmIChlbGVtQm90dG9tID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICBsZXQgbWF4WSA9IHdpbmRvdy5wYWdlWU9mZnNldCArIGNsaWVudFJlY3QudG9wIC0gcmVhc29uYWJsZUJ1ZmZlclxuXG4gICAgICAgICAgICBpZiAobWF4WSAtIHdpbmRvdy5wYWdlWU9mZnNldCA+IG1heFNjcm9sbERpc3BsYWNlbWVudCkge1xuICAgICAgICAgICAgICAgIG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBtYXhTY3JvbGxEaXNwbGFjZW1lbnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHRhcmdldFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgLSAod2luZG93LmlubmVySGVpZ2h0IC0gZWxlbUJvdHRvbSlcblxuICAgICAgICAgICAgaWYgKHRhcmdldFkgPiBtYXhZKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0WSA9IG1heFlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHRhcmdldFkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVJhbmdlO1xuIiwiLy8gVGhhbmtzIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXR0eW9yay9mdXp6eVxuY2xhc3MgVHJpYnV0ZVNlYXJjaCB7XG4gICAgY29uc3RydWN0b3IodHJpYnV0ZSkge1xuICAgICAgICB0aGlzLnRyaWJ1dGUgPSB0cmlidXRlXG4gICAgICAgIHRoaXMudHJpYnV0ZS5zZWFyY2ggPSB0aGlzXG4gICAgfVxuXG4gICAgc2ltcGxlRmlsdGVyKHBhdHRlcm4sIGFycmF5KSB7XG4gICAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoc3RyaW5nID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRlc3QocGF0dGVybiwgc3RyaW5nKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRlc3QocGF0dGVybiwgc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0cmluZykgIT09IG51bGxcbiAgICB9XG5cbiAgICBtYXRjaChwYXR0ZXJuLCBzdHJpbmcsIG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICAgICAgbGV0IHBhdHRlcm5JZHggPSAwLFxuICAgICAgICAgICAgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICBsZW4gPSBzdHJpbmcubGVuZ3RoLFxuICAgICAgICAgICAgdG90YWxTY29yZSA9IDAsXG4gICAgICAgICAgICBjdXJyU2NvcmUgPSAwLFxuICAgICAgICAgICAgcHJlID0gb3B0cy5wcmUgfHwgJycsXG4gICAgICAgICAgICBwb3N0ID0gb3B0cy5wb3N0IHx8ICcnLFxuICAgICAgICAgICAgY29tcGFyZVN0cmluZyA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBzdHJpbmcgfHwgc3RyaW5nLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICBjaCwgY29tcGFyZUNoYXJcblxuICAgICAgICBwYXR0ZXJuID0gb3B0cy5jYXNlU2Vuc2l0aXZlICYmIHBhdHRlcm4gfHwgcGF0dGVybi50b0xvd2VyQ2FzZSgpXG5cbiAgICAgICAgbGV0IHBhdHRlcm5DYWNoZSA9IHRoaXMudHJhdmVyc2UoY29tcGFyZVN0cmluZywgcGF0dGVybiwgMCwgMCwgW10pXG4gICAgICAgIGlmICghcGF0dGVybkNhY2hlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlbmRlcmVkOiB0aGlzLnJlbmRlcihzdHJpbmcsIHBhdHRlcm5DYWNoZS5jYWNoZSwgcHJlLCBwb3N0KSxcbiAgICAgICAgICAgIHNjb3JlOiBwYXR0ZXJuQ2FjaGUuc2NvcmVcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgc3RyaW5nSW5kZXgsIHBhdHRlcm5JbmRleCwgcGF0dGVybkNhY2hlKSB7XG4gICAgICAgIC8vIGlmIHRoZSBwYXR0ZXJuIHNlYXJjaCBhdCBlbmRcbiAgICAgICAgaWYgKHBhdHRlcm4ubGVuZ3RoID09PSBwYXR0ZXJuSW5kZXgpIHtcblxuICAgICAgICAgICAgLy8gY2FsY3VsYXRlIHNvY3JlIGFuZCBjb3B5IHRoZSBjYWNoZSBjb250YWluaW5nIHRoZSBpbmRpY2VzIHdoZXJlIGl0J3MgZm91bmRcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc2NvcmU6IHRoaXMuY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSxcbiAgICAgICAgICAgICAgICBjYWNoZTogcGF0dGVybkNhY2hlLnNsaWNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHN0cmluZyBhdCBlbmQgb3IgcmVtYWluaW5nIHBhdHRlcm4gPiByZW1haW5pbmcgc3RyaW5nXG4gICAgICAgIGlmIChzdHJpbmcubGVuZ3RoID09PSBzdHJpbmdJbmRleCB8fCBwYXR0ZXJuLmxlbmd0aCAtIHBhdHRlcm5JbmRleCA+IHN0cmluZy5sZW5ndGggLSBzdHJpbmdJbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGMgPSBwYXR0ZXJuW3BhdHRlcm5JbmRleF1cbiAgICAgICAgbGV0IGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgc3RyaW5nSW5kZXgpXG4gICAgICAgIGxldCBiZXN0LCB0ZW1wXG5cbiAgICAgICAgd2hpbGUgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wdXNoKGluZGV4KVxuICAgICAgICAgICAgdGVtcCA9IHRoaXMudHJhdmVyc2Uoc3RyaW5nLCBwYXR0ZXJuLCBpbmRleCArIDEsIHBhdHRlcm5JbmRleCArIDEsIHBhdHRlcm5DYWNoZSlcbiAgICAgICAgICAgIHBhdHRlcm5DYWNoZS5wb3AoKVxuXG4gICAgICAgICAgICAvLyBpZiBkb3duc3RyZWFtIHRyYXZlcnNhbCBmYWlsZWQsIHJldHVybiBiZXN0IGFuc3dlciBzbyBmYXJcbiAgICAgICAgICAgIGlmICghdGVtcCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiZXN0XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghYmVzdCB8fCBiZXN0LnNjb3JlIDwgdGVtcC5zY29yZSkge1xuICAgICAgICAgICAgICAgIGJlc3QgPSB0ZW1wXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4ID0gc3RyaW5nLmluZGV4T2YoYywgaW5kZXggKyAxKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJlc3RcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVTY29yZShwYXR0ZXJuQ2FjaGUpIHtcbiAgICAgICAgbGV0IHNjb3JlID0gMFxuICAgICAgICBsZXQgdGVtcCA9IDFcblxuICAgICAgICBwYXR0ZXJuQ2FjaGUuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXR0ZXJuQ2FjaGVbaSAtIDFdICsgMSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCArPSB0ZW1wICsgMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjb3JlICs9IHRlbXBcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gc2NvcmVcbiAgICB9XG5cbiAgICByZW5kZXIoc3RyaW5nLCBpbmRpY2VzLCBwcmUsIHBvc3QpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVkID0gc3RyaW5nLnN1YnN0cmluZygwLCBpbmRpY2VzWzBdKVxuXG4gICAgICAgIGluZGljZXMuZm9yRWFjaCgoaW5kZXgsIGkpID0+IHtcbiAgICAgICAgICAgIHJlbmRlcmVkICs9IHByZSArIHN0cmluZ1tpbmRleF0gKyBwb3N0ICtcbiAgICAgICAgICAgICAgICBzdHJpbmcuc3Vic3RyaW5nKGluZGV4ICsgMSwgKGluZGljZXNbaSArIDFdKSA/IGluZGljZXNbaSArIDFdIDogc3RyaW5nLmxlbmd0aClcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gcmVuZGVyZWRcbiAgICB9XG5cbiAgICBmaWx0ZXIocGF0dGVybiwgYXJyLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgIC5yZWR1Y2UoKHByZXYsIGVsZW1lbnQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHN0ciA9IGVsZW1lbnRcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmV4dHJhY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RyID0gb3B0cy5leHRyYWN0KGVsZW1lbnQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdHIpIHsgLy8gdGFrZSBjYXJlIG9mIHVuZGVmaW5lZHMgLyBudWxscyAvIGV0Yy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ciA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgcmVuZGVyZWQgPSB0aGlzLm1hdGNoKHBhdHRlcm4sIHN0ciwgb3B0cylcblxuICAgICAgICAgICAgICAgIGlmIChyZW5kZXJlZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZbcHJldi5sZW5ndGhdID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nOiByZW5kZXJlZC5yZW5kZXJlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlOiByZW5kZXJlZC5zY29yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgICAgICAgIH0sIFtdKVxuXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBsZXQgY29tcGFyZSA9IGIuc2NvcmUgLSBhLnNjb3JlXG4gICAgICAgICAgICBpZiAoY29tcGFyZSkgcmV0dXJuIGNvbXBhcmVcbiAgICAgICAgICAgIHJldHVybiBhLmluZGV4IC0gYi5pbmRleFxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZVNlYXJjaDsiLCIvKipcbiogVHJpYnV0ZS5qc1xuKiBOYXRpdmUgRVM2IEphdmFTY3JpcHQgQG1lbnRpb24gUGx1Z2luXG4qKi9cblxuaW1wb3J0IFRyaWJ1dGUgZnJvbSBcIi4vVHJpYnV0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKVxuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDBcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV1cbiAgICAgICAgdmFyIHZhbHVlXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKVxuICAgIHJldHVybiBldnRcbiAgfVxuXG4gaWYgKHR5cGVvZiB3aW5kb3cuRXZlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlXG4gfVxuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50XG59Il19
