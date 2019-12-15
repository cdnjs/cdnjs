(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Tribute = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
            replaceTextSuffix = _ref$replaceTextSuffi === undefined ? null : _ref$replaceTextSuffi,
            _ref$positionMenu = _ref.positionMenu,
            positionMenu = _ref$positionMenu === undefined ? true : _ref$positionMenu;

        _classCallCheck(this, Tribute);

        this.menuSelected = 0;
        this.current = {};
        this.inputEvent = false;
        this.isActive = false;
        this.menuContainer = menuContainer;
        this.allowSpaces = allowSpaces;
        this.replaceTextSuffix = replaceTextSuffix;
        this.positionMenu = positionMenu;
        this.hasTrailingSpace = false;

        if (values) {
            this.collection = [{
                // symbol that starts the lookup
                trigger: trigger,

                // is it wrapped in an iframe
                iframe: iframe,

                // class applied to selected item
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

                    return noMatchTemplate;
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
                element.tributeMenu = this.menu;
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

                _this2.range.positionMenuAtCaret(scrollTo);

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
            this.current.externalTrigger = true;
            this.current.element = element;

            if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);

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
            var scrollPos = textarea.scrollTop;
            var caretPos = textarea.selectionStart;

            var front = textarea.value.substring(0, caretPos);
            var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
            textarea.value = front + text + back;
            caretPos = caretPos + text.length;
            textarea.selectionStart = caretPos;
            textarea.selectionEnd = caretPos;
            textarea.focus();
            textarea.scrollTop = scrollPos;
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
            if (content !== null) this.replaceText(content, originalEvent, item);
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
    }, {
        key: "detach",
        value: function detach(el) {
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
                    this._detach(el[i]);
                }
            } else {
                this._detach(el);
            }
        }
    }, {
        key: "_detach",
        value: function _detach(el) {
            var _this3 = this;

            this.events.unbind(el);
            if (el.tributeMenu) {
                this.menuEvents.unbind(el.tributeMenu);
            }

            setTimeout(function () {
                el.removeAttribute('data-tribute');
                _this3.isActive = false;
                if (el.tributeMenu) {
                    el.tributeMenu.remove();
                }
            });
        }
    }], [{
        key: "defaultSelectTemplate",
        value: function defaultSelectTemplate(item) {
            if (typeof item === 'undefined') return null;
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
            element.boundKeydown = this.keydown.bind(element, this);
            element.boundKeyup = this.keyup.bind(element, this);
            element.boundInput = this.input.bind(element, this);

            element.addEventListener('keydown', element.boundKeydown, false);
            element.addEventListener('keyup', element.boundKeyup, false);
            element.addEventListener('input', element.boundInput, false);
        }
    }, {
        key: 'unbind',
        value: function unbind(element) {
            element.removeEventListener('keydown', element.boundKeydown, false);
            element.removeEventListener('keyup', element.boundKeyup, false);
            element.removeEventListener('input', element.boundInput, false);

            delete element.boundKeydown;
            delete element.boundKeyup;
            delete element.boundInput;
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

                // TODO: should fire with externalTrigger and target is outside of menu
            } else if (tribute.current.element && !tribute.current.externalTrigger) {
                tribute.current.externalTrigger = false;
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

            if (!instance.tribute.allowSpaces && instance.tribute.hasTrailingSpace) {
                instance.tribute.hasTrailingSpace = false;
                instance.commandEvent = true;
                instance.callbacks()["space"](event, this);
                return;
            }

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
            var info = tribute.range.getTriggerInfo(false, tribute.hasTrailingSpace, true, tribute.allowSpaces);

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
            var info = this.tribute.range.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces);

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
                space: function space(e, el) {
                    if (_this.tribute.isActive && !_this.tribute.allowSpaces) {
                        e.stopPropagation();
                        setTimeout(function () {
                            _this.tribute.hideMenu();
                            _this.tribute.isActive = false;
                        }, 0);
                    }
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

            menu.menuKeydownEvent = this.tribute.events.keydown.bind(this.menu, this);
            this.menuClickEvent = this.tribute.events.click.bind(null, this);
            this.menuContainerScrollEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.showMenuFor(_this.tribute.current.element, false);
                }
            }, 300, false);
            this.windowResizeEvent = this.debounce(function () {
                if (_this.tribute.isActive) {
                    _this.tribute.range.positionMenuAtCaret(true);
                }
            }, 300, false);

            // fixes IE11 issues with mousedown
            this.tribute.range.getDocument().addEventListener('MSPointerDown', this.menuKeydownEvent, false);
            menu.addEventListener('keydown', this.menuKeydownEvent, false);
            this.tribute.range.getDocument().addEventListener('mousedown', this.menuClickEvent, false);
            window.addEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.addEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.addEventListener('scroll', this.menuContainerScrollEvent);
            }
        }
    }, {
        key: 'unbind',
        value: function unbind(menu) {
            menu.removeEventListener('keydown', menu.menuKeydownEvent, false);
            delete menu.menuKeydownEvent;
            this.tribute.range.getDocument().removeEventListener('mousedown', this.menuClickEvent, false);
            this.tribute.range.getDocument().removeEventListener('MSPointerDown', this.menuClickEvent, false);
            window.removeEventListener('resize', this.windowResizeEvent);

            if (this.menuContainer) {
                this.menuContainer.removeEventListener('scroll', this.menuContainerScrollEvent, false);
            } else {
                window.removeEventListener('scroll', this.menuContainerScrollEvent);
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

            var info = this.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces);

            if (typeof info !== 'undefined') {

                if (!this.tribute.positionMenu) {
                    this.tribute.menu.style.cssText = 'display: block;';
                    return;
                }

                if (!this.isContentEditable(context.element)) {
                    coordinates = this.getTextAreaOrInputUnderlinePosition(this.tribute.current.element, info.mentionPosition);
                } else {
                    coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
                }

                this.tribute.menu.style.cssText = 'top: ' + coordinates.top + 'px;\n                                     left: ' + coordinates.left + 'px;\n                                     right: ' + coordinates.right + 'px;\n                                     bottom: ' + coordinates.bottom + 'px;\n                                     position: absolute;\n                                     zIndex: 10000;\n                                     display: block;';

                if (coordinates.left === 'auto') {
                    this.tribute.menu.style.left = 'auto';
                }

                if (coordinates.top === 'auto') {
                    this.tribute.menu.style.top = 'auto';
                }

                if (scrollTo) this.scrollIntoView();

                window.setTimeout(function () {
                    var menuDimensions = {
                        width: _this.tribute.menu.offsetWidth,
                        height: _this.tribute.menu.offsetHeight
                    };
                    var menuIsOffScreen = _this.isMenuOffScreen(coordinates, menuDimensions);

                    if (menuIsOffScreen.horizontally || menuIsOffScreen.vertically) {
                        _this.tribute.menu.style.cssText = 'display: none';
                        _this.positionMenuAtCaret(scrollTo);
                    }
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
                if (targetElement !== this.tribute.current.element) {
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
                    var myField = this.tribute.current.element;
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
                var textComponent = this.tribute.current.element;
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
                selected = this.tribute.current.element;
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

                    this.tribute.hasTrailingSpace = regex.test(currentTriggerSnippet);

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
        key: 'isMenuOffScreen',
        value: function isMenuOffScreen(coordinates, menuDimensions) {
            var contentWidth = menuDimensions.width + coordinates.left;
            var contentHeight = menuDimensions.height + coordinates.top;

            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;
            var doc = document.documentElement;
            var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
            var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

            return {
                horizontally: Math.ceil(contentWidth - windowLeft) >= windowWidth,
                vertically: Math.ceil(contentHeight - windowTop) >= windowHeight
            };
        }
    }, {
        key: 'getMenuDimensions',
        value: function getMenuDimensions() {
            // Width of the menu depends of its contents and position
            // We must check what its width would be without any obstruction
            // This way, we can achieve good positioning for flipping the menu
            var dimensions = {
                width: null,
                height: null
            };

            this.tribute.menu.style.cssText = 'top: 0px;\n                                 left: 0px;\n                                 position: fixed;\n                                 zIndex: 10000;\n                                 display: block;\n                                 visibility; hidden;';
            dimensions.width = this.tribute.menu.offsetWidth;
            dimensions.height = this.tribute.menu.offsetHeight;

            this.tribute.menu.style.cssText = 'display: none;';

            return dimensions;
        }
    }, {
        key: 'getTextAreaOrInputUnderlinePosition',
        value: function getTextAreaOrInputUnderlinePosition(element, position, flipped) {
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

            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.horizontally) {
                coordinates.right = windowWidth - coordinates.left;
                coordinates.left = 'auto';
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.vertically) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top - span.offsetTop);
                coordinates.top = 'auto';
            }

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
            var windowWidth = window.innerWidth;
            var windowHeight = window.innerHeight;

            var menuDimensions = this.getMenuDimensions();
            var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

            if (menuIsOffScreen.horizontally) {
                coordinates.left = 'auto';
                coordinates.right = windowWidth - rect.left - windowLeft;
            }

            var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

            if (menuIsOffScreen.vertically) {
                var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
                var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);

                windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
                windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
                coordinates.top = 'auto';
                coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top);
            }

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

                // calculate score and copy the cache containing the indices where it's found
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvVHJpYnV0ZS5qcyIsInNyYy9UcmlidXRlRXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVNZW51RXZlbnRzLmpzIiwic3JjL1RyaWJ1dGVSYW5nZS5qcyIsInNyYy9UcmlidXRlU2VhcmNoLmpzIiwic3JjL2luZGV4LmpzIiwic3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNLE87QUFDRiwyQkFnQkc7QUFBQTs7QUFBQSwrQkFmQyxNQWVEO0FBQUEsWUFmQyxNQWVELCtCQWZVLElBZVY7QUFBQSwrQkFkQyxNQWNEO0FBQUEsWUFkQyxNQWNELCtCQWRVLElBY1Y7QUFBQSxvQ0FiQyxXQWFEO0FBQUEsWUFiQyxXQWFELG9DQWJlLFdBYWY7QUFBQSxnQ0FaQyxPQVlEO0FBQUEsWUFaQyxPQVlELGdDQVpXLEdBWVg7QUFBQSx1Q0FYQyxjQVdEO0FBQUEsWUFYQyxjQVdELHVDQVhrQixJQVdsQjtBQUFBLHlDQVZDLGdCQVVEO0FBQUEsWUFWQyxnQkFVRCx5Q0FWb0IsSUFVcEI7QUFBQSwrQkFUQyxNQVNEO0FBQUEsWUFUQyxNQVNELCtCQVRVLEtBU1Y7QUFBQSxpQ0FSQyxRQVFEO0FBQUEsWUFSQyxRQVFELGlDQVJZLE9BUVo7QUFBQSxtQ0FQQyxVQU9EO0FBQUEsWUFQQyxVQU9ELG1DQVBjLElBT2Q7QUFBQSxzQ0FOQyxhQU1EO0FBQUEsWUFOQyxhQU1ELHNDQU5pQixJQU1qQjtBQUFBLHdDQUxDLGVBS0Q7QUFBQSxZQUxDLGVBS0Qsd0NBTG1CLElBS25CO0FBQUEseUNBSkMsbUJBSUQ7QUFBQSxZQUpDLG1CQUlELHlDQUp1QixJQUl2QjtBQUFBLG9DQUhDLFdBR0Q7QUFBQSxZQUhDLFdBR0Qsb0NBSGUsS0FHZjtBQUFBLHlDQUZDLGlCQUVEO0FBQUEsWUFGQyxp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b3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFRyaWJ1dGVVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IFRyaWJ1dGVFdmVudHMgZnJvbSBcIi4vVHJpYnV0ZUV2ZW50c1wiO1xuaW1wb3J0IFRyaWJ1dGVNZW51RXZlbnRzIGZyb20gXCIuL1RyaWJ1dGVNZW51RXZlbnRzXCI7XG5pbXBvcnQgVHJpYnV0ZVJhbmdlIGZyb20gXCIuL1RyaWJ1dGVSYW5nZVwiO1xuaW1wb3J0IFRyaWJ1dGVTZWFyY2ggZnJvbSBcIi4vVHJpYnV0ZVNlYXJjaFwiO1xuXG5jbGFzcyBUcmlidXRlIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICAgIHZhbHVlcyA9IG51bGwsXG4gICAgICAgIGlmcmFtZSA9IG51bGwsXG4gICAgICAgIHNlbGVjdENsYXNzID0gJ2hpZ2hsaWdodCcsXG4gICAgICAgIHRyaWdnZXIgPSAnQCcsXG4gICAgICAgIHNlbGVjdFRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZSA9IG51bGwsXG4gICAgICAgIGxvb2t1cCA9ICdrZXknLFxuICAgICAgICBmaWxsQXR0ciA9ICd2YWx1ZScsXG4gICAgICAgIGNvbGxlY3Rpb24gPSBudWxsLFxuICAgICAgICBtZW51Q29udGFpbmVyID0gbnVsbCxcbiAgICAgICAgbm9NYXRjaFRlbXBsYXRlID0gbnVsbCxcbiAgICAgICAgcmVxdWlyZUxlYWRpbmdTcGFjZSA9IHRydWUsXG4gICAgICAgIGFsbG93U3BhY2VzID0gZmFsc2UsXG4gICAgICAgIHJlcGxhY2VUZXh0U3VmZml4ID0gbnVsbCxcbiAgICAgICAgcG9zaXRpb25NZW51ID0gdHJ1ZSxcbiAgICB9KSB7XG5cbiAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgIHRoaXMuY3VycmVudCA9IHt9XG4gICAgICAgIHRoaXMuaW5wdXRFdmVudCA9IGZhbHNlXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICB0aGlzLm1lbnVDb250YWluZXIgPSBtZW51Q29udGFpbmVyXG4gICAgICAgIHRoaXMuYWxsb3dTcGFjZXMgPSBhbGxvd1NwYWNlc1xuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0U3VmZml4ID0gcmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgdGhpcy5wb3NpdGlvbk1lbnUgPSBwb3NpdGlvbk1lbnVcbiAgICAgICAgdGhpcy5oYXNUcmFpbGluZ1NwYWNlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uID0gW3tcbiAgICAgICAgICAgICAgICAvLyBzeW1ib2wgdGhhdCBzdGFydHMgdGhlIGxvb2t1cFxuICAgICAgICAgICAgICAgIHRyaWdnZXI6IHRyaWdnZXIsXG5cbiAgICAgICAgICAgICAgICAvLyBpcyBpdCB3cmFwcGVkIGluIGFuIGlmcmFtZVxuICAgICAgICAgICAgICAgIGlmcmFtZTogaWZyYW1lLFxuXG4gICAgICAgICAgICAgICAgLy8gY2xhc3MgYXBwbGllZCB0byBzZWxlY3RlZCBpdGVtXG4gICAgICAgICAgICAgICAgc2VsZWN0Q2xhc3M6IHNlbGVjdENsYXNzLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIG9uIHNlbGVjdCB0aGF0IHJldHVucyB0aGUgY29udGVudCB0byBpbnNlcnRcbiAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKHNlbGVjdFRlbXBsYXRlIHx8IFRyaWJ1dGUuZGVmYXVsdFNlbGVjdFRlbXBsYXRlKS5iaW5kKHRoaXMpLFxuXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHRoYXQgcmV0dXJucyBjb250ZW50IGZvciBhbiBpdGVtXG4gICAgICAgICAgICAgICAgbWVudUl0ZW1UZW1wbGF0ZTogKG1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcblxuICAgICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIG1lbnUgaXMgZW1wdHksIGRpc2FibGVzIGhpZGluZyBvZiBtZW51LlxuICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub01hdGNoVGVtcGxhdGVcbiAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuXG4gICAgICAgICAgICAgICAgLy8gY29sdW1uIHRvIHNlYXJjaCBhZ2FpbnN0IGluIHRoZSBvYmplY3RcbiAgICAgICAgICAgICAgICBsb29rdXA6IGxvb2t1cCxcblxuICAgICAgICAgICAgICAgIC8vIGNvbHVtbiB0aGF0IGNvbnRhaW5zIHRoZSBjb250ZW50IHRvIGluc2VydCBieSBkZWZhdWx0XG4gICAgICAgICAgICAgICAgZmlsbEF0dHI6IGZpbGxBdHRyLFxuXG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgb2Ygb2JqZWN0cyBvciBhIGZ1bmN0aW9uIHJldHVybmluZyBhbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICAgICAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG5cbiAgICAgICAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlOiByZXF1aXJlTGVhZGluZ1NwYWNlLFxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyOiBpdGVtLnRyaWdnZXIgfHwgdHJpZ2dlcixcbiAgICAgICAgICAgICAgICAgICAgaWZyYW1lOiBpdGVtLmlmcmFtZSB8fCBpZnJhbWUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENsYXNzOiBpdGVtLnNlbGVjdENsYXNzIHx8IHNlbGVjdENsYXNzLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RUZW1wbGF0ZTogKGl0ZW0uc2VsZWN0VGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0U2VsZWN0VGVtcGxhdGUpLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG1lbnVJdGVtVGVtcGxhdGU6IChpdGVtLm1lbnVJdGVtVGVtcGxhdGUgfHwgVHJpYnV0ZS5kZWZhdWx0TWVudUl0ZW1UZW1wbGF0ZSkuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gY2FsbGVkIHdoZW4gbWVudSBpcyBlbXB0eSwgZGlzYWJsZXMgaGlkaW5nIG9mIG1lbnUuXG4gICAgICAgICAgICAgICAgICAgIG5vTWF0Y2hUZW1wbGF0ZTogKHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHQuYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KShub01hdGNoVGVtcGxhdGUpLFxuICAgICAgICAgICAgICAgICAgICBsb29rdXA6IGl0ZW0ubG9va3VwIHx8IGxvb2t1cCxcbiAgICAgICAgICAgICAgICAgICAgZmlsbEF0dHI6IGl0ZW0uZmlsbEF0dHIgfHwgZmlsbEF0dHIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogaXRlbS52YWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVMZWFkaW5nU3BhY2U6IGl0ZW0ucmVxdWlyZUxlYWRpbmdTcGFjZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBObyBjb2xsZWN0aW9uIHNwZWNpZmllZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgbmV3IFRyaWJ1dGVSYW5nZSh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZUV2ZW50cyh0aGlzKVxuICAgICAgICBuZXcgVHJpYnV0ZU1lbnVFdmVudHModGhpcylcbiAgICAgICAgbmV3IFRyaWJ1dGVTZWFyY2godGhpcylcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdFNlbGVjdFRlbXBsYXRlKGl0ZW0pIHtcbiAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHRoaXMucmFuZ2UuaXNDb250ZW50RWRpdGFibGUodGhpcy5jdXJyZW50LmVsZW1lbnQpKSB7XG4gICAgICAgICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cInRyaWJ1dGUtbWVudGlvblwiPicgKyAodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udHJpZ2dlciArIGl0ZW0ub3JpZ2luYWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24uZmlsbEF0dHJdKSArICc8L3NwYW4+JztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIgKyBpdGVtLm9yaWdpbmFsW3RoaXMuY3VycmVudC5jb2xsZWN0aW9uLmZpbGxBdHRyXTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVmYXVsdE1lbnVJdGVtVGVtcGxhdGUobWF0Y2hJdGVtKSB7XG4gICAgICAgIHJldHVybiBtYXRjaEl0ZW0uc3RyaW5nXG4gICAgfVxuXG4gICAgc3RhdGljIGlucHV0VHlwZXMoKSB7XG4gICAgICAgIHJldHVybiBbJ1RFWFRBUkVBJywgJ0lOUFVUJ11cbiAgICB9XG5cbiAgICB0cmlnZ2VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29sbGVjdGlvbi5tYXAoY29uZmlnID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjb25maWcudHJpZ2dlclxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF0dGFjaChlbCkge1xuICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tUcmlidXRlXSBNdXN0IHBhc3MgaW4gYSBET00gbm9kZSBvciBOb2RlTGlzdC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgaXMgYSBqUXVlcnkgY29sbGVjdGlvblxuICAgICAgICBpZiAodHlwZW9mIGpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgZWwgaW5zdGFuY2VvZiBqUXVlcnkpIHtcbiAgICAgICAgICAgIGVsID0gZWwuZ2V0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElzIGVsIGFuIEFycmF5L0FycmF5LWxpa2Ugb2JqZWN0P1xuICAgICAgICBpZiAoZWwuY29uc3RydWN0b3IgPT09IE5vZGVMaXN0IHx8IGVsLmNvbnN0cnVjdG9yID09PSBIVE1MQ29sbGVjdGlvbiB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBsZW5ndGggPSBlbC5sZW5ndGhcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdHRhY2goZWxbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2goZWwpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYXR0YWNoKGVsKSB7XG4gICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdHJpYnV0ZScpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RyaWJ1dGUgd2FzIGFscmVhZHkgYm91bmQgdG8gJyArIGVsLm5vZGVOYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnN1cmVFZGl0YWJsZShlbClcbiAgICAgICAgdGhpcy5ldmVudHMuYmluZChlbClcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnLCB0cnVlKVxuICAgIH1cblxuICAgIGVuc3VyZUVkaXRhYmxlKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKFRyaWJ1dGUuaW5wdXRUeXBlcygpLmluZGV4T2YoZWxlbWVudC5ub2RlTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jb250ZW50RWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gQ2Fubm90IGJpbmQgdG8gJyArIGVsZW1lbnQubm9kZU5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVNZW51KCkge1xuICAgICAgICBsZXQgd3JhcHBlciA9IHRoaXMucmFuZ2UuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgICAgICAgIHVsID0gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3VsJylcblxuICAgICAgICB3cmFwcGVyLmNsYXNzTmFtZSA9ICd0cmlidXRlLWNvbnRhaW5lcidcbiAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZCh1bClcblxuICAgICAgICBpZiAodGhpcy5tZW51Q29udGFpbmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tZW51Q29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yYW5nZS5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQod3JhcHBlcilcbiAgICB9XG5cbiAgICBzaG93TWVudUZvcihlbGVtZW50LCBzY3JvbGxUbykge1xuICAgICAgICAvLyBPbmx5IHByb2NlZWQgaWYgbWVudSBpc24ndCBhbHJlYWR5IHNob3duIGZvciB0aGUgY3VycmVudCBlbGVtZW50ICYgbWVudGlvblRleHRcbiAgICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgJiYgdGhpcy5jdXJyZW50LmVsZW1lbnQgPT09IGVsZW1lbnQgJiYgdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0ID09PSB0aGlzLmN1cnJlbnRNZW50aW9uVGV4dFNuYXBzaG90KSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50TWVudGlvblRleHRTbmFwc2hvdCA9IHRoaXMuY3VycmVudC5tZW50aW9uVGV4dFxuXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbWVudSBpZiBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgICBpZiAoIXRoaXMubWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51ID0gdGhpcy5jcmVhdGVNZW51KClcbiAgICAgICAgICAgIGVsZW1lbnQudHJpYnV0ZU1lbnUgPSB0aGlzLm1lbnVcbiAgICAgICAgICAgIHRoaXMubWVudUV2ZW50cy5iaW5kKHRoaXMubWVudSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICAgIHRoaXMubWVudVNlbGVjdGVkID0gMFxuXG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQubWVudGlvblRleHQgPSAnJ1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvY2Vzc1ZhbHVlcyA9ICh2YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIC8vIFRyaWJ1dGUgbWF5IG5vdCBiZSBhY3RpdmUgYW55IG1vcmUgYnkgdGhlIHRpbWUgdGhlIHZhbHVlIGNhbGxiYWNrIHJldHVybnNcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0aGlzLnNlYXJjaC5maWx0ZXIodGhpcy5jdXJyZW50Lm1lbnRpb25UZXh0LCB2YWx1ZXMsIHtcbiAgICAgICAgICAgICAgICBwcmU6ICc8c3Bhbj4nLFxuICAgICAgICAgICAgICAgIHBvc3Q6ICc8L3NwYW4+JyxcbiAgICAgICAgICAgICAgICBleHRyYWN0OiAoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxbdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubG9va3VwXVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5sb29rdXAoZWwpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbG9va3VwIGF0dHJpYnV0ZSwgbG9va3VwIG11c3QgYmUgc3RyaW5nIG9yIGZ1bmN0aW9uLicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQuZmlsdGVyZWRJdGVtcyA9IGl0ZW1zXG5cblxuICAgICAgICAgICAgbGV0IHVsID0gdGhpcy5tZW51LnF1ZXJ5U2VsZWN0b3IoJ3VsJylcblxuICAgICAgICAgICAgdGhpcy5yYW5nZS5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuXG4gICAgICAgICAgICBpZiAoIWl0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxldCBub01hdGNoRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtbm8tbWF0Y2gnLCB7IGRldGFpbDogdGhpcy5tZW51IH0pXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChub01hdGNoRXZlbnQpXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi5ub01hdGNoVGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24ubm9NYXRjaFRlbXBsYXRlKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdWwuaW5uZXJIVE1MID0gJydcblxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbGkgPSB0aGlzLnJhbmdlLmdldERvY3VtZW50KCkuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIGluZGV4KVxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IGxpID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKVxuICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudHMuc2V0QWN0aXZlTGkoaW5kZXgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tZW51U2VsZWN0ZWQgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTmFtZSA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdENsYXNzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxpLmlubmVySFRNTCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLm1lbnVJdGVtVGVtcGxhdGUoaXRlbSlcbiAgICAgICAgICAgICAgICB1bC5hcHBlbmRDaGlsZChsaSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnZhbHVlcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udmFsdWVzKHRoaXMuY3VycmVudC5tZW50aW9uVGV4dCwgcHJvY2Vzc1ZhbHVlcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2Nlc3NWYWx1ZXModGhpcy5jdXJyZW50LmNvbGxlY3Rpb24udmFsdWVzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd01lbnVGb3JDb2xsZWN0aW9uKGVsZW1lbnQsIGNvbGxlY3Rpb25JbmRleCkge1xuICAgICAgICBpZiAoZWxlbWVudCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5wbGFjZUNhcmV0QXRFbmQoZWxlbWVudClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudC5jb2xsZWN0aW9uID0gdGhpcy5jb2xsZWN0aW9uW2NvbGxlY3Rpb25JbmRleCB8fCAwXVxuICAgICAgICB0aGlzLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyID0gdHJ1ZVxuICAgICAgICB0aGlzLmN1cnJlbnQuZWxlbWVudCA9IGVsZW1lbnRcblxuICAgICAgICBpZiAoZWxlbWVudC5pc0NvbnRlbnRFZGl0YWJsZSlcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0VGV4dEF0Q3Vyc29yKHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnRyaWdnZXIpXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuaW5zZXJ0QXRDYXJldChlbGVtZW50LCB0aGlzLmN1cnJlbnQuY29sbGVjdGlvbi50cmlnZ2VyKVxuXG4gICAgICAgIHRoaXMuc2hvd01lbnVGb3IoZWxlbWVudClcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBtYWtlIHN1cmUgdGhpcyB3b3JrcyBmb3IgaW5wdXRzL3RleHRhcmVhc1xuICAgIHBsYWNlQ2FyZXRBdEVuZChlbCkge1xuICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5nZXRTZWxlY3Rpb24gIT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICAgICAgICAgICYmIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVSYW5nZSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsKTtcbiAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5ib2R5LmNyZWF0ZVRleHRSYW5nZSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YXIgdGV4dFJhbmdlID0gZG9jdW1lbnQuYm9keS5jcmVhdGVUZXh0UmFuZ2UoKTtcbiAgICAgICAgICAgIHRleHRSYW5nZS5tb3ZlVG9FbGVtZW50VGV4dChlbCk7XG4gICAgICAgICAgICB0ZXh0UmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgICAgICAgICAgdGV4dFJhbmdlLnNlbGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZm9yIGNvbnRlbnRlZGl0YWJsZVxuICAgIGluc2VydFRleHRBdEN1cnNvcih0ZXh0KSB7XG4gICAgICAgIHZhciBzZWwsIHJhbmdlLCBodG1sO1xuICAgICAgICBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHJhbmdlID0gc2VsLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIHJhbmdlLmRlbGV0ZUNvbnRlbnRzKCk7XG4gICAgICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgICByYW5nZS5pbnNlcnROb2RlKHRleHROb2RlKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKHRleHROb2RlKVxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSlcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSlcbiAgICB9XG5cbiAgICAvLyBmb3IgcmVndWxhciBpbnB1dHNcbiAgICBpbnNlcnRBdENhcmV0KHRleHRhcmVhLCB0ZXh0KSB7XG4gICAgICAgIHZhciBzY3JvbGxQb3MgPSB0ZXh0YXJlYS5zY3JvbGxUb3A7XG4gICAgICAgIHZhciBjYXJldFBvcyA9IHRleHRhcmVhLnNlbGVjdGlvblN0YXJ0O1xuXG4gICAgICAgIHZhciBmcm9udCA9ICh0ZXh0YXJlYS52YWx1ZSkuc3Vic3RyaW5nKDAsIGNhcmV0UG9zKTtcbiAgICAgICAgdmFyIGJhY2sgPSAodGV4dGFyZWEudmFsdWUpLnN1YnN0cmluZyh0ZXh0YXJlYS5zZWxlY3Rpb25FbmQsIHRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gZnJvbnQgKyB0ZXh0ICsgYmFjaztcbiAgICAgICAgY2FyZXRQb3MgPSBjYXJldFBvcyArIHRleHQubGVuZ3RoO1xuICAgICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25TdGFydCA9IGNhcmV0UG9zO1xuICAgICAgICB0ZXh0YXJlYS5zZWxlY3Rpb25FbmQgPSBjYXJldFBvcztcbiAgICAgICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgICAgICAgdGV4dGFyZWEuc2Nyb2xsVG9wID0gc2Nyb2xsUG9zO1xuICAgIH1cblxuICAgIGhpZGVNZW51KCkge1xuICAgICAgICBpZiAodGhpcy5tZW51KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5OiBub25lOydcbiAgICAgICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgdGhpcy5tZW51U2VsZWN0ZWQgPSAwXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSB7fVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0SXRlbUF0SW5kZXgoaW5kZXgsIG9yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleClcbiAgICAgICAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVyblxuICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY3VycmVudC5maWx0ZXJlZEl0ZW1zW2luZGV4XVxuICAgICAgICBsZXQgY29udGVudCA9IHRoaXMuY3VycmVudC5jb2xsZWN0aW9uLnNlbGVjdFRlbXBsYXRlKGl0ZW0pXG4gICAgICAgIGlmIChjb250ZW50ICE9PSBudWxsKSB0aGlzLnJlcGxhY2VUZXh0KGNvbnRlbnQsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pXG4gICAgfVxuXG4gICAgcmVwbGFjZVRleHQoY29udGVudCwgb3JpZ2luYWxFdmVudCwgaXRlbSkge1xuICAgICAgICB0aGlzLnJhbmdlLnJlcGxhY2VUcmlnZ2VyVGV4dChjb250ZW50LCB0cnVlLCB0cnVlLCBvcmlnaW5hbEV2ZW50LCBpdGVtKVxuICAgIH1cblxuICAgIF9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29sbGVjdGlvbi52YWx1ZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGFwcGVuZCB0byB2YWx1ZXMsIGFzIGl0IGlzIGEgZnVuY3Rpb24uJylcbiAgICAgICAgfSBlbHNlIGlmICghcmVwbGFjZSkge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBjb2xsZWN0aW9uLnZhbHVlcy5jb25jYXQobmV3VmFsdWVzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sbGVjdGlvbi52YWx1ZXMgPSBuZXdWYWx1ZXNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZChjb2xsZWN0aW9uSW5kZXgsIG5ld1ZhbHVlcywgcmVwbGFjZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludChjb2xsZWN0aW9uSW5kZXgpXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ3BsZWFzZSBwcm92aWRlIGFuIGluZGV4IGZvciB0aGUgY29sbGVjdGlvbiB0byB1cGRhdGUuJylcblxuICAgICAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuY29sbGVjdGlvbltpbmRleF1cblxuICAgICAgICB0aGlzLl9hcHBlbmQoY29sbGVjdGlvbiwgbmV3VmFsdWVzLCByZXBsYWNlKVxuICAgIH1cblxuICAgIGFwcGVuZEN1cnJlbnQobmV3VmFsdWVzLCByZXBsYWNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hcHBlbmQodGhpcy5jdXJyZW50LmNvbGxlY3Rpb24sIG5ld1ZhbHVlcywgcmVwbGFjZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gYWN0aXZlIHN0YXRlLiBQbGVhc2UgdXNlIGFwcGVuZCBpbnN0ZWFkIGFuZCBwYXNzIGFuIGluZGV4LicpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXRhY2goZWwpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbVHJpYnV0ZV0gTXVzdCBwYXNzIGluIGEgRE9NIG5vZGUgb3IgTm9kZUxpc3QuJylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGEgalF1ZXJ5IGNvbGxlY3Rpb25cbiAgICAgICAgaWYgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIGVsIGluc3RhbmNlb2YgalF1ZXJ5KSB7XG4gICAgICAgICAgICBlbCA9IGVsLmdldCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBJcyBlbCBhbiBBcnJheS9BcnJheS1saWtlIG9iamVjdD9cbiAgICAgICAgaWYgKGVsLmNvbnN0cnVjdG9yID09PSBOb2RlTGlzdCB8fCBlbC5jb25zdHJ1Y3RvciA9PT0gSFRNTENvbGxlY3Rpb24gfHwgZWwuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICBsZXQgbGVuZ3RoID0gZWwubGVuZ3RoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGV0YWNoKGVsKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2RldGFjaChlbCkge1xuICAgICAgICB0aGlzLmV2ZW50cy51bmJpbmQoZWwpXG4gICAgICAgIGlmIChlbC50cmlidXRlTWVudSkge1xuICAgICAgICAgICAgdGhpcy5tZW51RXZlbnRzLnVuYmluZChlbC50cmlidXRlTWVudSlcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyaWJ1dGUnKVxuICAgICAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoZWwudHJpYnV0ZU1lbnUpIHtcbiAgICAgICAgICAgICAgICBlbC50cmlidXRlTWVudS5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZTtcbiIsImNsYXNzIFRyaWJ1dGVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuZXZlbnRzID0gdGhpc1xuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIGtleTogOSxcbiAgICAgICAgICAgIHZhbHVlOiAnVEFCJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXk6IDgsXG4gICAgICAgICAgICB2YWx1ZTogJ0RFTEVURSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAxMyxcbiAgICAgICAgICAgIHZhbHVlOiAnRU5URVInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogMjcsXG4gICAgICAgICAgICB2YWx1ZTogJ0VTQ0FQRSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAga2V5OiAzOCxcbiAgICAgICAgICAgIHZhbHVlOiAnVVAnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGtleTogNDAsXG4gICAgICAgICAgICB2YWx1ZTogJ0RPV04nXG4gICAgICAgIH1dXG4gICAgfVxuXG4gICAgYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXlkb3duID0gdGhpcy5rZXlkb3duLmJpbmQoZWxlbWVudCwgdGhpcyk7XG4gICAgICAgIGVsZW1lbnQuYm91bmRLZXl1cCA9IHRoaXMua2V5dXAuYmluZChlbGVtZW50LCB0aGlzKTtcbiAgICAgICAgZWxlbWVudC5ib3VuZElucHV0ID0gdGhpcy5pbnB1dC5iaW5kKGVsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuICAgIH1cblxuICAgIHVuYmluZChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kS2V5ZG93biwgZmFsc2UpXG4gICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLFxuICAgICAgICAgICAgZWxlbWVudC5ib3VuZEtleXVwLCBmYWxzZSlcbiAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsXG4gICAgICAgICAgICBlbGVtZW50LmJvdW5kSW5wdXQsIGZhbHNlKVxuXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kS2V5ZG93blxuICAgICAgICBkZWxldGUgZWxlbWVudC5ib3VuZEtleXVwXG4gICAgICAgIGRlbGV0ZSBlbGVtZW50LmJvdW5kSW5wdXRcbiAgICB9XG5cbiAgICBrZXlkb3duKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBpZiAoaW5zdGFuY2Uuc2hvdWxkRGVhY3RpdmF0ZShldmVudCkpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgaW5zdGFuY2UudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXNcbiAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gZmFsc2VcblxuICAgICAgICBUcmlidXRlRXZlbnRzLmtleXMoKS5mb3JFYWNoKG8gPT4ge1xuICAgICAgICAgICAgaWYgKG8ua2V5ID09PSBldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW28udmFsdWUudG9Mb3dlckNhc2UoKV0oZXZlbnQsIGVsZW1lbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5wdXQoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGluc3RhbmNlLmlucHV0RXZlbnQgPSB0cnVlXG4gICAgICAgIGluc3RhbmNlLmtleXVwLmNhbGwodGhpcywgaW5zdGFuY2UsIGV2ZW50KVxuICAgIH1cblxuICAgIGNsaWNrKGluc3RhbmNlLCBldmVudCkge1xuICAgICAgICBsZXQgdHJpYnV0ZSA9IGluc3RhbmNlLnRyaWJ1dGVcbiAgICAgICAgaWYgKHRyaWJ1dGUubWVudSAmJiB0cmlidXRlLm1lbnUuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgbGV0IGxpID0gZXZlbnQudGFyZ2V0XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdsaScpIHtcbiAgICAgICAgICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgICAgICAgICAgICBpZiAoIWxpIHx8IGxpID09PSB0cmlidXRlLm1lbnUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZmluZCB0aGUgPGxpPiBjb250YWluZXIgZm9yIHRoZSBjbGljaycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJpYnV0ZS5zZWxlY3RJdGVtQXRJbmRleChsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgZXZlbnQpXG4gICAgICAgICAgICB0cmlidXRlLmhpZGVNZW51KClcblxuICAgICAgICAvLyBUT0RPOiBzaG91bGQgZmlyZSB3aXRoIGV4dGVybmFsVHJpZ2dlciBhbmQgdGFyZ2V0IGlzIG91dHNpZGUgb2YgbWVudVxuICAgICAgICB9IGVsc2UgaWYgKHRyaWJ1dGUuY3VycmVudC5lbGVtZW50ICYmICF0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyKSB7XG4gICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuZXh0ZXJuYWxUcmlnZ2VyID0gZmFsc2VcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpYnV0ZS5oaWRlTWVudSgpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAga2V5dXAoaW5zdGFuY2UsIGV2ZW50KSB7XG4gICAgICAgIGlmIChpbnN0YW5jZS5pbnB1dEV2ZW50KSB7XG4gICAgICAgICAgICBpbnN0YW5jZS5pbnB1dEV2ZW50ID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS51cGRhdGVTZWxlY3Rpb24odGhpcylcblxuICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHJldHVyblxuXG4gICAgICAgIGlmICghaW5zdGFuY2UudHJpYnV0ZS5hbGxvd1NwYWNlcyAmJiBpbnN0YW5jZS50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSA9IGZhbHNlO1xuICAgICAgICAgICAgaW5zdGFuY2UuY29tbWFuZEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpW1wic3BhY2VcIl0oZXZlbnQsIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIGxldCBrZXlDb2RlID0gaW5zdGFuY2UuZ2V0S2V5Q29kZShpbnN0YW5jZSwgdGhpcywgZXZlbnQpXG5cbiAgICAgICAgICAgIGlmIChpc05hTihrZXlDb2RlKSB8fCAha2V5Q29kZSkgcmV0dXJuXG5cbiAgICAgICAgICAgIGxldCB0cmlnZ2VyID0gaW5zdGFuY2UudHJpYnV0ZS50cmlnZ2VycygpLmZpbmQodHJpZ2dlciA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWdnZXIuY2hhckNvZGVBdCgwKSA9PT0ga2V5Q29kZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlLmNhbGxiYWNrcygpLnRyaWdnZXJDaGFyKGV2ZW50LCB0aGlzLCB0cmlnZ2VyKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLnRyaWJ1dGUuY3VycmVudC50cmlnZ2VyICYmIGluc3RhbmNlLmNvbW1hbmRFdmVudCA9PT0gZmFsc2VcbiAgICAgICAgICAgIHx8IGluc3RhbmNlLnRyaWJ1dGUuaXNBY3RpdmUgJiYgZXZlbnQua2V5Q29kZSA9PT0gOCkge1xuICAgICAgICAgIGluc3RhbmNlLnRyaWJ1dGUuc2hvd01lbnVGb3IodGhpcywgdHJ1ZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZERlYWN0aXZhdGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCBldmVudEtleVByZXNzZWQgPSBmYWxzZVxuICAgICAgICAgICAgVHJpYnV0ZUV2ZW50cy5rZXlzKCkuZm9yRWFjaChvID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gby5rZXkpIGV2ZW50S2V5UHJlc3NlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiAhZXZlbnRLZXlQcmVzc2VkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBnZXRLZXlDb2RlKGluc3RhbmNlLCBlbCwgZXZlbnQpIHtcbiAgICAgICAgbGV0IGNoYXJcbiAgICAgICAgbGV0IHRyaWJ1dGUgPSBpbnN0YW5jZS50cmlidXRlXG4gICAgICAgIGxldCBpbmZvID0gdHJpYnV0ZS5yYW5nZS5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgdHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlLCB0cnVlLCB0cmlidXRlLmFsbG93U3BhY2VzKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5mby5tZW50aW9uVHJpZ2dlckNoYXIuY2hhckNvZGVBdCgwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb24oZWwpIHtcbiAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCA9IGVsXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy50cmlidXRlLnJhbmdlLmdldFRyaWdnZXJJbmZvKGZhbHNlLCB0aGlzLnRyaWJ1dGUuaGFzVHJhaWxpbmdTcGFjZSwgdHJ1ZSwgdGhpcy50cmlidXRlLmFsbG93U3BhY2VzKVxuXG4gICAgICAgIGlmIChpbmZvKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUuY3VycmVudC5zZWxlY3RlZFBhdGggPSBpbmZvLm1lbnRpb25TZWxlY3RlZFBhdGhcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5jdXJyZW50Lm1lbnRpb25UZXh0ID0gaW5mby5tZW50aW9uVGV4dFxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmN1cnJlbnQuc2VsZWN0ZWRPZmZzZXQgPSBpbmZvLm1lbnRpb25TZWxlY3RlZE9mZnNldFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FsbGJhY2tzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHJpZ2dlckNoYXI6IChlLCBlbCwgdHJpZ2dlcikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0cmlidXRlID0gdGhpcy50cmlidXRlXG4gICAgICAgICAgICAgICAgdHJpYnV0ZS5jdXJyZW50LnRyaWdnZXIgPSB0cmlnZ2VyXG5cbiAgICAgICAgICAgICAgICBsZXQgY29sbGVjdGlvbkl0ZW0gPSB0cmlidXRlLmNvbGxlY3Rpb24uZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHJpZ2dlciA9PT0gdHJpZ2dlclxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB0cmlidXRlLmN1cnJlbnQuY29sbGVjdGlvbiA9IGNvbGxlY3Rpb25JdGVtXG4gICAgICAgICAgICAgICAgaWYgKHRyaWJ1dGUuaW5wdXRFdmVudCkgdHJpYnV0ZS5zaG93TWVudUZvcihlbCwgdHJ1ZSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRlcjogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY2hvb3NlIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuc2VsZWN0SXRlbUF0SW5kZXgodGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCwgZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVzY2FwZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUuaGlkZU1lbnUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YWI6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNob29zZSBmaXJzdCBtYXRjaFxuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzKCkuZW50ZXIoZSwgZWwpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3BhY2U6IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUgJiYgIXRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcykge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLmlzQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB1cDogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gbmF2aWdhdGUgdXAgdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID4gc2VsZWN0ZWQgJiYgc2VsZWN0ZWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkLS1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGVjdGVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IGNvdW50IC0gMVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCA9IHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRvd246IChlLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIGRvd24gdWxcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmZpbHRlcmVkSXRlbXMubGVuZ3RoIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZFxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkKytcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlTGkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc2Nyb2xsVG9wID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlbGV0ZTogKGUsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5pc0FjdGl2ZSAmJiB0aGlzLnRyaWJ1dGUuY3VycmVudC5tZW50aW9uVGV4dC5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oaWRlTWVudSgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyaWJ1dGUuaXNBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKGVsKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEFjdGl2ZUxpKGluZGV4KSB7XG4gICAgICAgIGxldCBsaXMgPSB0aGlzLnRyaWJ1dGUubWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLFxuICAgICAgICAgICAgbGVuZ3RoID0gbGlzLmxlbmd0aCA+Pj4gMFxuXG4gICAgICAgIC8vIGdldCBoZWlnaHRzXG4gICAgICAgIGxldCBtZW51RnVsbEhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodCh0aGlzLnRyaWJ1dGUubWVudSksXG4gICAgICAgICAgICBsaUhlaWdodCA9IHRoaXMuZ2V0RnVsbEhlaWdodChsaXNbMF0pXG5cbiAgICAgICAgaWYgKGluZGV4KSB0aGlzLnRyaWJ1dGUubWVudVNlbGVjdGVkID0gaW5kZXg7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpID0gbGlzW2ldXG4gICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy50cmlidXRlLm1lbnVTZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIGxldCBvZmZzZXQgPSBsaUhlaWdodCAqIChpKzEpXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbFRvcCA9IHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcFxuICAgICAgICAgICAgICAgIGxldCB0b3RhbFNjcm9sbCA9IHNjcm9sbFRvcCArIG1lbnVGdWxsSGVpZ2h0XG5cbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0ID4gdG90YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCArPSBsaUhlaWdodFxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2Zmc2V0IDwgdG90YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnNjcm9sbFRvcCAtPSBsaUhlaWdodFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uc2VsZWN0Q2xhc3NcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZ1bGxIZWlnaHQoZWxlbSwgaW5jbHVkZU1hcmdpbikge1xuICAgICAgbGV0IGhlaWdodCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG5cbiAgICAgIGlmIChpbmNsdWRlTWFyZ2luKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IGVsZW0uY3VycmVudFN0eWxlIHx8IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pXG4gICAgICAgIHJldHVybiBoZWlnaHQgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblRvcCkgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpbkJvdHRvbSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGhlaWdodFxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlRXZlbnRzO1xuIiwiY2xhc3MgVHJpYnV0ZU1lbnVFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUubWVudUV2ZW50cyA9IHRoaXNcbiAgICAgICAgdGhpcy5tZW51ID0gdGhpcy50cmlidXRlLm1lbnVcbiAgICB9XG5cbiAgICBiaW5kKG1lbnUpIHtcbiAgICAgICAgbWVudS5tZW51S2V5ZG93bkV2ZW50ID0gdGhpcy50cmlidXRlLmV2ZW50cy5rZXlkb3duLmJpbmQodGhpcy5tZW51LCB0aGlzKVxuICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50ID0gdGhpcy50cmlidXRlLmV2ZW50cy5jbGljay5iaW5kKG51bGwsIHRoaXMpXG4gICAgICAgIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50ID0gdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnNob3dNZW51Rm9yKHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQsIGZhbHNlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDAsIGZhbHNlKVxuICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50ID0gdGhpcy5kZWJvdW5jZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmlidXRlLmlzQWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLnBvc2l0aW9uTWVudUF0Q2FyZXQodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwLCBmYWxzZSlcblxuICAgICAgICAvLyBmaXhlcyBJRTExIGlzc3VlcyB3aXRoIG1vdXNlZG93blxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdNU1BvaW50ZXJEb3duJyxcbiAgICAgICAgICAgIHRoaXMubWVudUtleWRvd25FdmVudCwgZmFsc2UpXG4gICAgICAgIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVLZXlkb3duRXZlbnQsIGZhbHNlKVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UuZ2V0RG9jdW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLFxuICAgICAgICAgICAgdGhpcy5tZW51Q2xpY2tFdmVudCwgZmFsc2UpXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLndpbmRvd1Jlc2l6ZUV2ZW50KVxuXG4gICAgICAgIGlmICh0aGlzLm1lbnVDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWVudUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudCwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5tZW51Q29udGFpbmVyU2Nyb2xsRXZlbnQpXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHVuYmluZChtZW51KSB7XG4gICAgICAgIG1lbnUucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsXG4gICAgICAgICAgICBtZW51Lm1lbnVLZXlkb3duRXZlbnQsIGZhbHNlKVxuICAgICAgICBkZWxldGUgbWVudS5tZW51S2V5ZG93bkV2ZW50XG4gICAgICAgIHRoaXMudHJpYnV0ZS5yYW5nZS5nZXREb2N1bWVudCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgdGhpcy50cmlidXRlLnJhbmdlLmdldERvY3VtZW50KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcignTVNQb2ludGVyRG93bicsXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGlja0V2ZW50LCBmYWxzZSlcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMud2luZG93UmVzaXplRXZlbnQpXG5cbiAgICAgICAgaWYgKHRoaXMubWVudUNvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5tZW51Q29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMubWVudUNvbnRhaW5lclNjcm9sbEV2ZW50LCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm1lbnVDb250YWluZXJTY3JvbGxFdmVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgdGltZW91dFxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICAgICAgICAgIHZhciBsYXRlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbFxuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdClcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgVHJpYnV0ZU1lbnVFdmVudHM7XG4iLCIvLyBUaGFua3MgdG8gaHR0cHM6Ly9naXRodWIuY29tL2plZmYtY29sbGlucy9tZW50LmlvXG5jbGFzcyBUcmlidXRlUmFuZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUucmFuZ2UgPSB0aGlzXG4gICAgfVxuXG4gICAgZ2V0RG9jdW1lbnQoKSB7XG4gICAgICAgIGxldCBpZnJhbWVcbiAgICAgICAgaWYgKHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmcmFtZSA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmNvbGxlY3Rpb24uaWZyYW1lXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnRcbiAgICB9XG5cbiAgICBwb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKSB7XG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcy50cmlidXRlLmN1cnJlbnQsXG4gICAgICAgICAgICBjb29yZGluYXRlc1xuXG4gICAgICAgIGxldCBpbmZvID0gdGhpcy5nZXRUcmlnZ2VySW5mbyhmYWxzZSwgdGhpcy50cmlidXRlLmhhc1RyYWlsaW5nU3BhY2UsIHRydWUsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcylcblxuICAgICAgICBpZiAodHlwZW9mIGluZm8gIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIGlmKCF0aGlzLnRyaWJ1dGUucG9zaXRpb25NZW51KXtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYGRpc3BsYXk6IGJsb2NrO2BcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0VGV4dEFyZWFPcklucHV0VW5kZXJsaW5lUG9zaXRpb24odGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgaW5mby5tZW50aW9uUG9zaXRpb24pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlcyA9IHRoaXMuZ2V0Q29udGVudEVkaXRhYmxlQ2FyZXRQb3NpdGlvbihpbmZvLm1lbnRpb25Qb3NpdGlvbilcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS5jc3NUZXh0ID0gYHRvcDogJHtjb29yZGluYXRlcy50b3B9cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJHtjb29yZGluYXRlcy5sZWZ0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAke2Nvb3JkaW5hdGVzLnJpZ2h0fXB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJHtjb29yZGluYXRlcy5ib3R0b219cHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7YFxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMubGVmdCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29vcmRpbmF0ZXMudG9wID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWJ1dGUubWVudS5zdHlsZS50b3AgPSAnYXV0bydcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNjcm9sbFRvKSB0aGlzLnNjcm9sbEludG9WaWV3KClcblxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZW51RGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy50cmlidXRlLm1lbnUub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICAgICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4uaG9yaXpvbnRhbGx5IHx8IG1lbnVJc09mZlNjcmVlbi52ZXJ0aWNhbGx5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NpdGlvbk1lbnVBdENhcmV0KHNjcm9sbFRvKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdEVsZW1lbnQodGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgZWxlbSA9IHRhcmdldEVsZW1lbnRcblxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0uY2hpbGROb2Rlc1twYXRoW2ldXVxuICAgICAgICAgICAgICAgIGlmIChlbGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlIChlbGVtLmxlbmd0aCA8IG9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgLT0gZWxlbS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgZWxlbSA9IGVsZW0ubmV4dFNpYmxpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW0uY2hpbGROb2Rlcy5sZW5ndGggPT09IDAgJiYgIWVsZW0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBlbGVtLnByZXZpb3VzU2libGluZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoZWxlbSwgb2Zmc2V0KVxuICAgICAgICByYW5nZS5zZXRFbmQoZWxlbSwgb2Zmc2V0KVxuICAgICAgICByYW5nZS5jb2xsYXBzZSh0cnVlKVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB0YXJnZXRFbGVtZW50LmZvY3VzKClcbiAgICB9XG5cbiAgICAvLyBUT0RPOiB0aGlzIG1heSBub3QgYmUgbmVjZXNzYXJ5IGFueW1vcmUgYXMgd2UgYXJlIHVzaW5nIG1vdXNldXAgaW5zdGVhZCBvZiBjbGlja1xuICAgIHJlc2V0U2VsZWN0aW9uKHRhcmdldEVsZW1lbnQsIHBhdGgsIG9mZnNldCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDb250ZW50RWRpdGFibGUodGFyZ2V0RWxlbWVudCkpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXRFbGVtZW50ICE9PSB0aGlzLnRyaWJ1dGUuY3VycmVudC5lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5mb2N1cygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEVsZW1lbnQodGFyZ2V0RWxlbWVudCwgcGF0aCwgb2Zmc2V0KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVwbGFjZVRyaWdnZXJUZXh0KHRleHQsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGhhc1RyYWlsaW5nU3BhY2UsIG9yaWdpbmFsRXZlbnQsIGl0ZW0pIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuICAgICAgICAvLyBUT0RPOiB0aGlzIG1heSBub3QgYmUgbmVjZXNzYXJ5IGFueW1vcmUgYXMgd2UgYXJlIHVzaW5nIG1vdXNldXAgaW5zdGVhZCBvZiBjbGlja1xuICAgICAgICAvLyB0aGlzLnJlc2V0U2VsZWN0aW9uKGNvbnRleHQuZWxlbWVudCwgY29udGV4dC5zZWxlY3RlZFBhdGgsIGNvbnRleHQuc2VsZWN0ZWRPZmZzZXQpXG5cbiAgICAgICAgbGV0IGluZm8gPSB0aGlzLmdldFRyaWdnZXJJbmZvKHRydWUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIHRoaXMudHJpYnV0ZS5hbGxvd1NwYWNlcylcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGV2ZW50XG4gICAgICAgIGxldCByZXBsYWNlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3RyaWJ1dGUtcmVwbGFjZWQnLCB7XG4gICAgICAgICAgICBkZXRhaWw6IHtcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgICAgIGV2ZW50OiBvcmlnaW5hbEV2ZW50XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKGluZm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQ29udGVudEVkaXRhYmxlKGNvbnRleHQuZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgbXlGaWVsZCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnRcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN1ZmZpeCA9IHR5cGVvZiB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXggPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICAgICAgOiAnICdcbiAgICAgICAgICAgICAgICB0ZXh0ICs9IHRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvblxuICAgICAgICAgICAgICAgIGxldCBlbmRQb3MgPSBpbmZvLm1lbnRpb25Qb3NpdGlvbiArIGluZm8ubWVudGlvblRleHQubGVuZ3RoICsgdGV4dFN1ZmZpeC5sZW5ndGhcbiAgICAgICAgICAgICAgICBteUZpZWxkLnZhbHVlID0gbXlGaWVsZC52YWx1ZS5zdWJzdHJpbmcoMCwgc3RhcnRQb3MpICsgdGV4dCArXG4gICAgICAgICAgICAgICAgICAgIG15RmllbGQudmFsdWUuc3Vic3RyaW5nKGVuZFBvcywgbXlGaWVsZC52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgbXlGaWVsZC5zZWxlY3Rpb25TdGFydCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgICAgICBteUZpZWxkLnNlbGVjdGlvbkVuZCA9IHN0YXJ0UG9zICsgdGV4dC5sZW5ndGhcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYWRkIGEgc3BhY2UgdG8gdGhlIGVuZCBvZiB0aGUgcGFzdGVkIHRleHRcbiAgICAgICAgICAgICAgICBsZXQgdGV4dFN1ZmZpeCA9IHR5cGVvZiB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXggPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUucmVwbGFjZVRleHRTdWZmaXhcbiAgICAgICAgICAgICAgICAgICAgOiAnXFx4QTAnXG4gICAgICAgICAgICAgICAgdGV4dCArPSB0ZXh0U3VmZml4XG4gICAgICAgICAgICAgICAgdGhpcy5wYXN0ZUh0bWwodGV4dCwgaW5mby5tZW50aW9uUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGluZm8ubWVudGlvblBvc2l0aW9uICsgaW5mby5tZW50aW9uVGV4dC5sZW5ndGggKyAxKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb250ZXh0LmVsZW1lbnQuZGlzcGF0Y2hFdmVudChyZXBsYWNlRXZlbnQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYXN0ZUh0bWwoaHRtbCwgc3RhcnRQb3MsIGVuZFBvcykge1xuICAgICAgICBsZXQgcmFuZ2UsIHNlbFxuICAgICAgICBzZWwgPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpXG4gICAgICAgIHJhbmdlID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVJhbmdlKClcbiAgICAgICAgcmFuZ2Uuc2V0U3RhcnQoc2VsLmFuY2hvck5vZGUsIHN0YXJ0UG9zKVxuICAgICAgICByYW5nZS5zZXRFbmQoc2VsLmFuY2hvck5vZGUsIGVuZFBvcylcbiAgICAgICAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKVxuXG4gICAgICAgIGxldCBlbCA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sXG4gICAgICAgIGxldCBmcmFnID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgICAgIG5vZGUsIGxhc3ROb2RlXG4gICAgICAgIHdoaWxlICgobm9kZSA9IGVsLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgICAgICBsYXN0Tm9kZSA9IGZyYWcuYXBwZW5kQ2hpbGQobm9kZSlcbiAgICAgICAgfVxuICAgICAgICByYW5nZS5pbnNlcnROb2RlKGZyYWcpXG5cbiAgICAgICAgLy8gUHJlc2VydmUgdGhlIHNlbGVjdGlvblxuICAgICAgICBpZiAobGFzdE5vZGUpIHtcbiAgICAgICAgICAgIHJhbmdlID0gcmFuZ2UuY2xvbmVSYW5nZSgpXG4gICAgICAgICAgICByYW5nZS5zZXRTdGFydEFmdGVyKGxhc3ROb2RlKVxuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSlcbiAgICAgICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKVxuICAgICAgICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V2luZG93U2VsZWN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uaWZyYW1lLmNvbnRlbnRXaW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0U2VsZWN0aW9uKClcbiAgICB9XG5cbiAgICBnZXROb2RlUG9zaXRpb25JblBhcmVudChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzW2ldXG5cbiAgICAgICAgICAgIGlmIChub2RlID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpIHtcbiAgICAgICAgbGV0IHNlbCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKClcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gc2VsLmFuY2hvck5vZGVcbiAgICAgICAgbGV0IHBhdGggPSBbXVxuICAgICAgICBsZXQgb2Zmc2V0XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBpXG4gICAgICAgICAgICBsZXQgY2UgPSBzZWxlY3RlZC5jb250ZW50RWRpdGFibGVcbiAgICAgICAgICAgIHdoaWxlIChzZWxlY3RlZCAhPT0gbnVsbCAmJiBjZSAhPT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgaSA9IHRoaXMuZ2V0Tm9kZVBvc2l0aW9uSW5QYXJlbnQoc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgcGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZC5wYXJlbnROb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNlID0gc2VsZWN0ZWQuY29udGVudEVkaXRhYmxlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aC5yZXZlcnNlKClcblxuICAgICAgICAgICAgLy8gZ2V0UmFuZ2VBdCBtYXkgbm90IGV4aXN0LCBuZWVkIGFsdGVybmF0aXZlXG4gICAgICAgICAgICBvZmZzZXQgPSBzZWwuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcbiAgICAgICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgICAgIG9mZnNldDogb2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUZXh0UHJlY2VkaW5nQ3VycmVudFNlbGVjdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRleHQgPSB0aGlzLnRyaWJ1dGUuY3VycmVudCxcbiAgICAgICAgICAgIHRleHQgPSAnJ1xuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjb250ZXh0LmVsZW1lbnQpKSB7XG4gICAgICAgICAgICBsZXQgdGV4dENvbXBvbmVudCA9IHRoaXMudHJpYnV0ZS5jdXJyZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFBvcyA9IHRleHRDb21wb25lbnQuc2VsZWN0aW9uU3RhcnRcbiAgICAgICAgICAgICAgICBpZiAodGV4dENvbXBvbmVudC52YWx1ZSAmJiBzdGFydFBvcyA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0Q29tcG9uZW50LnZhbHVlLnN1YnN0cmluZygwLCBzdGFydFBvcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZEVsZW0gPSB0aGlzLmdldFdpbmRvd1NlbGVjdGlvbigpLmFuY2hvck5vZGVcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkRWxlbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbGV0IHdvcmtpbmdOb2RlQ29udGVudCA9IHNlbGVjdGVkRWxlbS50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RTdGFydE9mZnNldCA9IHRoaXMuZ2V0V2luZG93U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5zdGFydE9mZnNldFxuXG4gICAgICAgICAgICAgICAgaWYgKHdvcmtpbmdOb2RlQ29udGVudCAmJiBzZWxlY3RTdGFydE9mZnNldCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSB3b3JraW5nTm9kZUNvbnRlbnQuc3Vic3RyaW5nKDAsIHNlbGVjdFN0YXJ0T2Zmc2V0KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuXG4gICAgZ2V0VHJpZ2dlckluZm8obWVudUFscmVhZHlBY3RpdmUsIGhhc1RyYWlsaW5nU3BhY2UsIHJlcXVpcmVMZWFkaW5nU3BhY2UsIGFsbG93U3BhY2VzKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLnRyaWJ1dGUuY3VycmVudFxuICAgICAgICBsZXQgc2VsZWN0ZWQsIHBhdGgsIG9mZnNldFxuXG4gICAgICAgIGlmICghdGhpcy5pc0NvbnRlbnRFZGl0YWJsZShjdHguZWxlbWVudCkpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gdGhpcy50cmlidXRlLmN1cnJlbnQuZWxlbWVudFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZm8gPSB0aGlzLmdldENvbnRlbnRFZGl0YWJsZVNlbGVjdGVkUGF0aChjdHgpXG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3Rpb25JbmZvLnNlbGVjdGVkXG4gICAgICAgICAgICAgICAgcGF0aCA9IHNlbGVjdGlvbkluZm8ucGF0aFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IHNlbGVjdGlvbkluZm8ub2Zmc2V0XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZWZmZWN0aXZlUmFuZ2UgPSB0aGlzLmdldFRleHRQcmVjZWRpbmdDdXJyZW50U2VsZWN0aW9uKClcblxuICAgICAgICBpZiAoZWZmZWN0aXZlUmFuZ2UgIT09IHVuZGVmaW5lZCAmJiBlZmZlY3RpdmVSYW5nZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9IC0xXG4gICAgICAgICAgICBsZXQgdHJpZ2dlckNoYXJcblxuICAgICAgICAgICAgdGhpcy50cmlidXRlLmNvbGxlY3Rpb24uZm9yRWFjaChjb25maWcgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjID0gY29uZmlnLnRyaWdnZXJcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gY29uZmlnLnJlcXVpcmVMZWFkaW5nU3BhY2UgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbmRleFdpdGhMZWFkaW5nU3BhY2UoZWZmZWN0aXZlUmFuZ2UsIGMpIDpcbiAgICAgICAgICAgICAgICAgICAgZWZmZWN0aXZlUmFuZ2UubGFzdEluZGV4T2YoYylcblxuICAgICAgICAgICAgICAgIGlmIChpZHggPiBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID0gaWR4XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFyID0gY1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlTGVhZGluZ1NwYWNlID0gY29uZmlnLnJlcXVpcmVMZWFkaW5nU3BhY2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAobW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zID49IDAgJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICAgIG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAhcmVxdWlyZUxlYWRpbmdTcGFjZSB8fFxuICAgICAgICAgICAgICAgICAgICAvW1xceEEwXFxzXS9nLnRlc3QoXG4gICAgICAgICAgICAgICAgICAgICAgICBlZmZlY3RpdmVSYW5nZS5zdWJzdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3N0UmVjZW50VHJpZ2dlckNoYXJQb3MpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFRyaWdnZXJTbmlwcGV0ID0gZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcyArIDEsXG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdGl2ZVJhbmdlLmxlbmd0aClcblxuICAgICAgICAgICAgICAgIHRyaWdnZXJDaGFyID0gZWZmZWN0aXZlUmFuZ2Uuc3Vic3RyaW5nKG1vc3RSZWNlbnRUcmlnZ2VyQ2hhclBvcywgbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zICsgMSlcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RTbmlwcGV0Q2hhciA9IGN1cnJlbnRUcmlnZ2VyU25pcHBldC5zdWJzdHJpbmcoMCwgMSlcbiAgICAgICAgICAgICAgICBsZXQgbGVhZGluZ1NwYWNlID0gY3VycmVudFRyaWdnZXJTbmlwcGV0Lmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RTbmlwcGV0Q2hhciA9PT0gJyAnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFNuaXBwZXRDaGFyID09PSAnXFx4QTAnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBpZiAoaGFzVHJhaWxpbmdTcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJpZ2dlclNuaXBwZXQgPSBjdXJyZW50VHJpZ2dlclNuaXBwZXQudHJpbSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlZ2V4ID0gYWxsb3dTcGFjZXMgPyAvW15cXFMgXS9nIDogL1tcXHhBMFxcc10vZztcblxuICAgICAgICAgICAgICAgIHRoaXMudHJpYnV0ZS5oYXNUcmFpbGluZ1NwYWNlID0gcmVnZXgudGVzdChjdXJyZW50VHJpZ2dlclNuaXBwZXQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFsZWFkaW5nU3BhY2UgJiYgKG1lbnVBbHJlYWR5QWN0aXZlIHx8ICEocmVnZXgudGVzdChjdXJyZW50VHJpZ2dlclNuaXBwZXQpKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25Qb3NpdGlvbjogbW9zdFJlY2VudFRyaWdnZXJDaGFyUG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRleHQ6IGN1cnJlbnRUcmlnZ2VyU25pcHBldCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZEVsZW1lbnQ6IHNlbGVjdGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblNlbGVjdGVkUGF0aDogcGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnRpb25TZWxlY3RlZE9mZnNldDogb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWVudGlvblRyaWdnZXJDaGFyOiB0cmlnZ2VyQ2hhclxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGFzdEluZGV4V2l0aExlYWRpbmdTcGFjZSAoc3RyLCBjaGFyKSB7XG4gICAgICAgIGxldCByZXZlcnNlZFN0ciA9IHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpXG4gICAgICAgIGxldCBpbmRleCA9IC0xXG5cbiAgICAgICAgZm9yIChsZXQgY2lkeCA9IDAsIGxlbiA9IHN0ci5sZW5ndGg7IGNpZHggPCBsZW47IGNpZHgrKykge1xuICAgICAgICAgICAgbGV0IGZpcnN0Q2hhciA9IGNpZHggPT09IHN0ci5sZW5ndGggLSAxXG4gICAgICAgICAgICBsZXQgbGVhZGluZ1NwYWNlID0gL1xccy8udGVzdChyZXZlcnNlZFN0cltjaWR4ICsgMV0pXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBjaGFyID09PSByZXZlcnNlZFN0cltjaWR4XVxuXG4gICAgICAgICAgICBpZiAobWF0Y2ggJiYgKGZpcnN0Q2hhciB8fCBsZWFkaW5nU3BhY2UpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBzdHIubGVuZ3RoIC0gMSAtIGNpZHhcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaXNDb250ZW50RWRpdGFibGUoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudC5ub2RlTmFtZSAhPT0gJ0lOUFVUJyAmJiBlbGVtZW50Lm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnXG4gICAgfVxuXG4gICAgaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucykge1xuICAgICAgICBsZXQgY29udGVudFdpZHRoID0gbWVudURpbWVuc2lvbnMud2lkdGggKyBjb29yZGluYXRlcy5sZWZ0XG4gICAgICAgIGxldCBjb250ZW50SGVpZ2h0ID0gbWVudURpbWVuc2lvbnMuaGVpZ2h0ICsgY29vcmRpbmF0ZXMudG9wXG5cbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBob3Jpem9udGFsbHk6IE1hdGguY2VpbChjb250ZW50V2lkdGggLSB3aW5kb3dMZWZ0KSA+PSB3aW5kb3dXaWR0aCxcbiAgICAgICAgICAgIHZlcnRpY2FsbHk6IE1hdGguY2VpbChjb250ZW50SGVpZ2h0IC0gd2luZG93VG9wKSA+PSB3aW5kb3dIZWlnaHRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1lbnVEaW1lbnNpb25zKCkge1xuICAgICAgICAvLyBXaWR0aCBvZiB0aGUgbWVudSBkZXBlbmRzIG9mIGl0cyBjb250ZW50cyBhbmQgcG9zaXRpb25cbiAgICAgICAgLy8gV2UgbXVzdCBjaGVjayB3aGF0IGl0cyB3aWR0aCB3b3VsZCBiZSB3aXRob3V0IGFueSBvYnN0cnVjdGlvblxuICAgICAgICAvLyBUaGlzIHdheSwgd2UgY2FuIGFjaGlldmUgZ29vZCBwb3NpdGlvbmluZyBmb3IgZmxpcHBpbmcgdGhlIG1lbnVcbiAgICAgICAgbGV0IGRpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogbnVsbCxcbiAgICAgICAgICAgIGhlaWdodDogbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlidXRlLm1lbnUuc3R5bGUuY3NzVGV4dCA9IGB0b3A6IDBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IDBweDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk7IGhpZGRlbjtgXG4gICAgICAgZGltZW5zaW9ucy53aWR0aCA9IHRoaXMudHJpYnV0ZS5tZW51Lm9mZnNldFdpZHRoXG4gICAgICAgZGltZW5zaW9ucy5oZWlnaHQgPSB0aGlzLnRyaWJ1dGUubWVudS5vZmZzZXRIZWlnaHRcblxuICAgICAgIHRoaXMudHJpYnV0ZS5tZW51LnN0eWxlLmNzc1RleHQgPSBgZGlzcGxheTogbm9uZTtgXG5cbiAgICAgICByZXR1cm4gZGltZW5zaW9uc1xuICAgIH1cblxuICAgIGdldFRleHRBcmVhT3JJbnB1dFVuZGVybGluZVBvc2l0aW9uKGVsZW1lbnQsIHBvc2l0aW9uLCBmbGlwcGVkKSB7XG4gICAgICAgIGxldCBwcm9wZXJ0aWVzID0gWydkaXJlY3Rpb24nLCAnYm94U2l6aW5nJywgJ3dpZHRoJywgJ2hlaWdodCcsICdvdmVyZmxvd1gnLFxuICAgICAgICAgICAgJ292ZXJmbG93WScsICdib3JkZXJUb3BXaWR0aCcsICdib3JkZXJSaWdodFdpZHRoJyxcbiAgICAgICAgICAgICdib3JkZXJCb3R0b21XaWR0aCcsICdib3JkZXJMZWZ0V2lkdGgnLCAncGFkZGluZ1RvcCcsXG4gICAgICAgICAgICAncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdCb3R0b20nLCAncGFkZGluZ0xlZnQnLFxuICAgICAgICAgICAgJ2ZvbnRTdHlsZScsICdmb250VmFyaWFudCcsICdmb250V2VpZ2h0JywgJ2ZvbnRTdHJldGNoJyxcbiAgICAgICAgICAgICdmb250U2l6ZScsICdmb250U2l6ZUFkanVzdCcsICdsaW5lSGVpZ2h0JywgJ2ZvbnRGYW1pbHknLFxuICAgICAgICAgICAgJ3RleHRBbGlnbicsICd0ZXh0VHJhbnNmb3JtJywgJ3RleHRJbmRlbnQnLFxuICAgICAgICAgICAgJ3RleHREZWNvcmF0aW9uJywgJ2xldHRlclNwYWNpbmcnLCAnd29yZFNwYWNpbmcnXG4gICAgICAgIF1cblxuICAgICAgICBsZXQgaXNGaXJlZm94ID0gKHdpbmRvdy5tb3pJbm5lclNjcmVlblggIT09IG51bGwpXG5cbiAgICAgICAgbGV0IGRpdiA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBkaXYuaWQgPSAnaW5wdXQtdGV4dGFyZWEtY2FyZXQtcG9zaXRpb24tbWlycm9yLWRpdidcbiAgICAgICAgdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuYXBwZW5kQ2hpbGQoZGl2KVxuXG4gICAgICAgIGxldCBzdHlsZSA9IGRpdi5zdHlsZVxuICAgICAgICBsZXQgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkgOiBlbGVtZW50LmN1cnJlbnRTdHlsZVxuXG4gICAgICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnXG4gICAgICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJ1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcG9zaXRpb24gb2ZmLXNjcmVlblxuICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG5cbiAgICAgICAgLy8gdHJhbnNmZXIgdGhlIGVsZW1lbnQncyBwcm9wZXJ0aWVzIHRvIHRoZSBkaXZcbiAgICAgICAgcHJvcGVydGllcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXVxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChpc0ZpcmVmb3gpIHtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoID0gYCR7KHBhcnNlSW50KGNvbXB1dGVkLndpZHRoKSAtIDIpfXB4YFxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyc2VJbnQoY29tcHV0ZWQuaGVpZ2h0KSlcbiAgICAgICAgICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuICAgICAgICB9XG5cbiAgICAgICAgZGl2LnRleHRDb250ZW50ID0gZWxlbWVudC52YWx1ZS5zdWJzdHJpbmcoMCwgcG9zaXRpb24pXG5cbiAgICAgICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIGRpdi50ZXh0Q29udGVudCA9IGRpdi50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ8KgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzcGFuID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBzcGFuLnRleHRDb250ZW50ID0gZWxlbWVudC52YWx1ZS5zdWJzdHJpbmcocG9zaXRpb24pIHx8ICcuJ1xuICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoc3BhbilcblxuICAgICAgICBsZXQgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgbGV0IGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICBsZXQgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgIGxldCB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcblxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgd2luZG93VG9wICsgc3Bhbi5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZC5ib3JkZXJUb3BXaWR0aCkgKyBwYXJzZUludChjb21wdXRlZC5mb250U2l6ZSkgLSBlbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbmRvd0xlZnQgKyBzcGFuLm9mZnNldExlZnQgKyBwYXJzZUludChjb21wdXRlZC5ib3JkZXJMZWZ0V2lkdGgpXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG5cbiAgICAgICAgbGV0IG1lbnVEaW1lbnNpb25zID0gdGhpcy5nZXRNZW51RGltZW5zaW9ucygpXG4gICAgICAgIGxldCBtZW51SXNPZmZTY3JlZW4gPSB0aGlzLmlzTWVudU9mZlNjcmVlbihjb29yZGluYXRlcywgbWVudURpbWVuc2lvbnMpXG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi5ob3Jpem9udGFsbHkpIHtcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnJpZ2h0ID0gd2luZG93V2lkdGggLSBjb29yZGluYXRlcy5sZWZ0XG4gICAgICAgICAgICBjb29yZGluYXRlcy5sZWZ0ID0gJ2F1dG8nXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFyZW50SGVpZ2h0ID0gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXJcbiAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5Lm9mZnNldEhlaWdodFxuXG4gICAgICAgIGlmIChtZW51SXNPZmZTY3JlZW4udmVydGljYWxseSkge1xuICAgICAgICAgICAgbGV0IHBhcmVudFJlY3QgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgICAgID8gdGhpcy50cmlidXRlLm1lbnVDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICA6IHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBsZXQgc2Nyb2xsU3RpbGxBdmFpbGFibGUgPSBwYXJlbnRIZWlnaHQgLSAod2luZG93SGVpZ2h0IC0gcGFyZW50UmVjdC50b3ApXG5cbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLmJvdHRvbSA9IHNjcm9sbFN0aWxsQXZhaWxhYmxlICsgKHdpbmRvd0hlaWdodCAtIHJlY3QudG9wIC0gc3Bhbi5vZmZzZXRUb3ApXG4gICAgICAgICAgICBjb29yZGluYXRlcy50b3AgPSAnYXV0bydcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0RG9jdW1lbnQoKS5ib2R5LnJlbW92ZUNoaWxkKGRpdilcblxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBnZXRDb250ZW50RWRpdGFibGVDYXJldFBvc2l0aW9uKHNlbGVjdGVkTm9kZVBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBtYXJrZXJUZXh0Q2hhciA9ICfvu78nXG4gICAgICAgIGxldCBtYXJrZXJFbCwgbWFya2VySWQgPSBgc2VsXyR7bmV3IERhdGUoKS5nZXRUaW1lKCl9XyR7TWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyKX1gXG4gICAgICAgIGxldCByYW5nZVxuICAgICAgICBsZXQgc2VsID0gdGhpcy5nZXRXaW5kb3dTZWxlY3Rpb24oKVxuICAgICAgICBsZXQgcHJldlJhbmdlID0gc2VsLmdldFJhbmdlQXQoMClcblxuICAgICAgICByYW5nZSA9IHRoaXMuZ2V0RG9jdW1lbnQoKS5jcmVhdGVSYW5nZSgpXG4gICAgICAgIHJhbmdlLnNldFN0YXJ0KHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcbiAgICAgICAgcmFuZ2Uuc2V0RW5kKHNlbC5hbmNob3JOb2RlLCBzZWxlY3RlZE5vZGVQb3NpdGlvbilcblxuICAgICAgICByYW5nZS5jb2xsYXBzZShmYWxzZSlcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIG1hcmtlciBlbGVtZW50IGNvbnRhaW5pbmcgYSBzaW5nbGUgaW52aXNpYmxlIGNoYXJhY3RlciB1c2luZyBET00gbWV0aG9kcyBhbmQgaW5zZXJ0IGl0XG4gICAgICAgIG1hcmtlckVsID0gdGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICBtYXJrZXJFbC5pZCA9IG1hcmtlcklkXG5cbiAgICAgICAgbWFya2VyRWwuYXBwZW5kQ2hpbGQodGhpcy5nZXREb2N1bWVudCgpLmNyZWF0ZVRleHROb2RlKG1hcmtlclRleHRDaGFyKSlcbiAgICAgICAgcmFuZ2UuaW5zZXJ0Tm9kZShtYXJrZXJFbClcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpXG4gICAgICAgIHNlbC5hZGRSYW5nZShwcmV2UmFuZ2UpXG5cbiAgICAgICAgbGV0IHJlY3QgPSBtYXJrZXJFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgICAgIGxldCB3aW5kb3dMZWZ0ID0gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMClcbiAgICAgICAgbGV0IHdpbmRvd1RvcCA9ICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jLnNjcm9sbFRvcCkgLSAoZG9jLmNsaWVudFRvcCB8fCAwKVxuICAgICAgICBsZXQgY29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW5kb3dMZWZ0LFxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIG1hcmtlckVsLm9mZnNldEhlaWdodCArIHdpbmRvd1RvcFxuICAgICAgICB9XG4gICAgICAgIGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcblxuICAgICAgICBsZXQgbWVudURpbWVuc2lvbnMgPSB0aGlzLmdldE1lbnVEaW1lbnNpb25zKClcbiAgICAgICAgbGV0IG1lbnVJc09mZlNjcmVlbiA9IHRoaXMuaXNNZW51T2ZmU2NyZWVuKGNvb3JkaW5hdGVzLCBtZW51RGltZW5zaW9ucylcblxuICAgICAgICBpZiAobWVudUlzT2ZmU2NyZWVuLmhvcml6b250YWxseSkge1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMubGVmdCA9ICdhdXRvJ1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMucmlnaHQgPSB3aW5kb3dXaWR0aCAtIHJlY3QubGVmdCAtIHdpbmRvd0xlZnRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnRIZWlnaHQgPSB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lclxuICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5vZmZzZXRIZWlnaHRcbiAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkub2Zmc2V0SGVpZ2h0XG5cbiAgICAgICAgaWYgKG1lbnVJc09mZlNjcmVlbi52ZXJ0aWNhbGx5KSB7XG4gICAgICAgICAgICBsZXQgcGFyZW50UmVjdCA9IHRoaXMudHJpYnV0ZS5tZW51Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnRyaWJ1dGUubWVudUNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5nZXREb2N1bWVudCgpLmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIGxldCBzY3JvbGxTdGlsbEF2YWlsYWJsZSA9IHBhcmVudEhlaWdodCAtICh3aW5kb3dIZWlnaHQgLSBwYXJlbnRSZWN0LnRvcClcblxuICAgICAgICAgICAgd2luZG93TGVmdCA9ICh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApXG4gICAgICAgICAgICB3aW5kb3dUb3AgPSAod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcbiAgICAgICAgICAgIGNvb3JkaW5hdGVzLnRvcCA9ICdhdXRvJ1xuICAgICAgICAgICAgY29vcmRpbmF0ZXMuYm90dG9tID0gc2Nyb2xsU3RpbGxBdmFpbGFibGUgKyAod2luZG93SGVpZ2h0IC0gcmVjdC50b3ApXG4gICAgICAgIH1cblxuICAgICAgICBtYXJrZXJFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG1hcmtlckVsKVxuICAgICAgICByZXR1cm4gY29vcmRpbmF0ZXNcbiAgICB9XG5cbiAgICBzY3JvbGxJbnRvVmlldyhlbGVtKSB7XG4gICAgICAgIGxldCByZWFzb25hYmxlQnVmZmVyID0gMjAsXG4gICAgICAgICAgICBjbGllbnRSZWN0XG4gICAgICAgIGxldCBtYXhTY3JvbGxEaXNwbGFjZW1lbnQgPSAxMDBcbiAgICAgICAgbGV0IGUgPSB0aGlzLm1lbnVcblxuICAgICAgICBpZiAodHlwZW9mIGUgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG5cbiAgICAgICAgd2hpbGUgKGNsaWVudFJlY3QgPT09IHVuZGVmaW5lZCB8fCBjbGllbnRSZWN0LmhlaWdodCA9PT0gMCkge1xuICAgICAgICAgICAgY2xpZW50UmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICAgICAgICAgICAgaWYgKGNsaWVudFJlY3QuaGVpZ2h0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZSA9IGUuY2hpbGROb2Rlc1swXVxuICAgICAgICAgICAgICAgIGlmIChlID09PSB1bmRlZmluZWQgfHwgIWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlbGVtVG9wID0gY2xpZW50UmVjdC50b3BcbiAgICAgICAgbGV0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgY2xpZW50UmVjdC5oZWlnaHRcblxuICAgICAgICBpZiAoZWxlbVRvcCA8IDApIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXIpXG4gICAgICAgIH0gZWxzZSBpZiAoZWxlbUJvdHRvbSA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgbGV0IG1heFkgPSB3aW5kb3cucGFnZVlPZmZzZXQgKyBjbGllbnRSZWN0LnRvcCAtIHJlYXNvbmFibGVCdWZmZXJcblxuICAgICAgICAgICAgaWYgKG1heFkgLSB3aW5kb3cucGFnZVlPZmZzZXQgPiBtYXhTY3JvbGxEaXNwbGFjZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBtYXhZID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgbWF4U2Nyb2xsRGlzcGxhY2VtZW50XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB0YXJnZXRZID0gd2luZG93LnBhZ2VZT2Zmc2V0IC0gKHdpbmRvdy5pbm5lckhlaWdodCAtIGVsZW1Cb3R0b20pXG5cbiAgICAgICAgICAgIGlmICh0YXJnZXRZID4gbWF4WSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFkgPSBtYXhZXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB0YXJnZXRZKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVSYW5nZTtcbiIsIi8vIFRoYW5rcyB0byBodHRwczovL2dpdGh1Yi5jb20vbWF0dHlvcmsvZnV6enlcbmNsYXNzIFRyaWJ1dGVTZWFyY2gge1xuICAgIGNvbnN0cnVjdG9yKHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy50cmlidXRlID0gdHJpYnV0ZVxuICAgICAgICB0aGlzLnRyaWJ1dGUuc2VhcmNoID0gdGhpc1xuICAgIH1cblxuICAgIHNpbXBsZUZpbHRlcihwYXR0ZXJuLCBhcnJheSkge1xuICAgICAgICByZXR1cm4gYXJyYXkuZmlsdGVyKHN0cmluZyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXN0KHBhdHRlcm4sIHN0cmluZylcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0ZXN0KHBhdHRlcm4sIHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHJpbmcpICE9PSBudWxsXG4gICAgfVxuXG4gICAgbWF0Y2gocGF0dGVybiwgc3RyaW5nLCBvcHRzKSB7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgICAgIGxldCBwYXR0ZXJuSWR4ID0gMCxcbiAgICAgICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICAgICAgbGVuID0gc3RyaW5nLmxlbmd0aCxcbiAgICAgICAgICAgIHRvdGFsU2NvcmUgPSAwLFxuICAgICAgICAgICAgY3VyclNjb3JlID0gMCxcbiAgICAgICAgICAgIHByZSA9IG9wdHMucHJlIHx8ICcnLFxuICAgICAgICAgICAgcG9zdCA9IG9wdHMucG9zdCB8fCAnJyxcbiAgICAgICAgICAgIGNvbXBhcmVTdHJpbmcgPSBvcHRzLmNhc2VTZW5zaXRpdmUgJiYgc3RyaW5nIHx8IHN0cmluZy50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgY2gsIGNvbXBhcmVDaGFyXG5cbiAgICAgICAgcGF0dGVybiA9IG9wdHMuY2FzZVNlbnNpdGl2ZSAmJiBwYXR0ZXJuIHx8IHBhdHRlcm4udG9Mb3dlckNhc2UoKVxuXG4gICAgICAgIGxldCBwYXR0ZXJuQ2FjaGUgPSB0aGlzLnRyYXZlcnNlKGNvbXBhcmVTdHJpbmcsIHBhdHRlcm4sIDAsIDAsIFtdKVxuICAgICAgICBpZiAoIXBhdHRlcm5DYWNoZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW5kZXJlZDogdGhpcy5yZW5kZXIoc3RyaW5nLCBwYXR0ZXJuQ2FjaGUuY2FjaGUsIHByZSwgcG9zdCksXG4gICAgICAgICAgICBzY29yZTogcGF0dGVybkNhY2hlLnNjb3JlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cmF2ZXJzZShzdHJpbmcsIHBhdHRlcm4sIHN0cmluZ0luZGV4LCBwYXR0ZXJuSW5kZXgsIHBhdHRlcm5DYWNoZSkge1xuICAgICAgICAvLyBpZiB0aGUgcGF0dGVybiBzZWFyY2ggYXQgZW5kXG4gICAgICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA9PT0gcGF0dGVybkluZGV4KSB7XG5cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBzY29yZSBhbmQgY29weSB0aGUgY2FjaGUgY29udGFpbmluZyB0aGUgaW5kaWNlcyB3aGVyZSBpdCdzIGZvdW5kXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNjb3JlOiB0aGlzLmNhbGN1bGF0ZVNjb3JlKHBhdHRlcm5DYWNoZSksXG4gICAgICAgICAgICAgICAgY2FjaGU6IHBhdHRlcm5DYWNoZS5zbGljZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBzdHJpbmcgYXQgZW5kIG9yIHJlbWFpbmluZyBwYXR0ZXJuID4gcmVtYWluaW5nIHN0cmluZ1xuICAgICAgICBpZiAoc3RyaW5nLmxlbmd0aCA9PT0gc3RyaW5nSW5kZXggfHwgcGF0dGVybi5sZW5ndGggLSBwYXR0ZXJuSW5kZXggPiBzdHJpbmcubGVuZ3RoIC0gc3RyaW5nSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjID0gcGF0dGVybltwYXR0ZXJuSW5kZXhdXG4gICAgICAgIGxldCBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIHN0cmluZ0luZGV4KVxuICAgICAgICBsZXQgYmVzdCwgdGVtcFxuXG4gICAgICAgIHdoaWxlIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucHVzaChpbmRleClcbiAgICAgICAgICAgIHRlbXAgPSB0aGlzLnRyYXZlcnNlKHN0cmluZywgcGF0dGVybiwgaW5kZXggKyAxLCBwYXR0ZXJuSW5kZXggKyAxLCBwYXR0ZXJuQ2FjaGUpXG4gICAgICAgICAgICBwYXR0ZXJuQ2FjaGUucG9wKClcblxuICAgICAgICAgICAgLy8gaWYgZG93bnN0cmVhbSB0cmF2ZXJzYWwgZmFpbGVkLCByZXR1cm4gYmVzdCBhbnN3ZXIgc28gZmFyXG4gICAgICAgICAgICBpZiAoIXRlbXApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYmVzdFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWJlc3QgfHwgYmVzdC5zY29yZSA8IHRlbXAuc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBiZXN0ID0gdGVtcFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbmRleCA9IHN0cmluZy5pbmRleE9mKGMsIGluZGV4ICsgMSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiZXN0XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlU2NvcmUocGF0dGVybkNhY2hlKSB7XG4gICAgICAgIGxldCBzY29yZSA9IDBcbiAgICAgICAgbGV0IHRlbXAgPSAxXG5cbiAgICAgICAgcGF0dGVybkNhY2hlLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0dGVybkNhY2hlW2kgLSAxXSArIDEgPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgKz0gdGVtcCArIDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXAgPSAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY29yZSArPSB0ZW1wXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHNjb3JlXG4gICAgfVxuXG4gICAgcmVuZGVyKHN0cmluZywgaW5kaWNlcywgcHJlLCBwb3N0KSB7XG4gICAgICAgIHZhciByZW5kZXJlZCA9IHN0cmluZy5zdWJzdHJpbmcoMCwgaW5kaWNlc1swXSlcblxuICAgICAgICBpbmRpY2VzLmZvckVhY2goKGluZGV4LCBpKSA9PiB7XG4gICAgICAgICAgICByZW5kZXJlZCArPSBwcmUgKyBzdHJpbmdbaW5kZXhdICsgcG9zdCArXG4gICAgICAgICAgICAgICAgc3RyaW5nLnN1YnN0cmluZyhpbmRleCArIDEsIChpbmRpY2VzW2kgKyAxXSkgPyBpbmRpY2VzW2kgKyAxXSA6IHN0cmluZy5sZW5ndGgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHJlbmRlcmVkXG4gICAgfVxuXG4gICAgZmlsdGVyKHBhdHRlcm4sIGFyciwgb3B0cykge1xuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgICAgICByZXR1cm4gYXJyXG4gICAgICAgICAgICAucmVkdWNlKChwcmV2LCBlbGVtZW50LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBzdHIgPSBlbGVtZW50XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0cy5leHRyYWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IG9wdHMuZXh0cmFjdChlbGVtZW50KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RyKSB7IC8vIHRha2UgY2FyZSBvZiB1bmRlZmluZWRzIC8gbnVsbHMgLyBldGMuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHJlbmRlcmVkID0gdGhpcy5tYXRjaChwYXR0ZXJuLCBzdHIsIG9wdHMpXG5cbiAgICAgICAgICAgICAgICBpZiAocmVuZGVyZWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBwcmV2W3ByZXYubGVuZ3RoXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZzogcmVuZGVyZWQucmVuZGVyZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZTogcmVuZGVyZWQuc2NvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2XG4gICAgICAgICAgICB9LCBbXSlcblxuICAgICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbXBhcmUgPSBiLnNjb3JlIC0gYS5zY29yZVxuICAgICAgICAgICAgaWYgKGNvbXBhcmUpIHJldHVybiBjb21wYXJlXG4gICAgICAgICAgICByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXhcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyaWJ1dGVTZWFyY2g7XG4iLCIvKipcbiogVHJpYnV0ZS5qc1xuKiBOYXRpdmUgRVM2IEphdmFTY3JpcHQgQG1lbnRpb24gUGx1Z2luXG4qKi9cblxuaW1wb3J0IFRyaWJ1dGUgZnJvbSBcIi4vVHJpYnV0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBUcmlidXRlO1xuIiwiaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKVxuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDBcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV1cbiAgICAgICAgdmFyIHZhbHVlXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn1cblxuaWYgKHdpbmRvdyAmJiB0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7XG4gICAgICBidWJibGVzOiBmYWxzZSxcbiAgICAgIGNhbmNlbGFibGU6IGZhbHNlLFxuICAgICAgZGV0YWlsOiB1bmRlZmluZWRcbiAgICB9XG4gICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpXG4gICAgZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKVxuICAgIHJldHVybiBldnRcbiAgfVxuXG4gaWYgKHR5cGVvZiB3aW5kb3cuRXZlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlXG4gfVxuXG4gIHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50XG59Il19
