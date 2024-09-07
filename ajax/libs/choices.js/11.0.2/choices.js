/*! choices.js v11.0.2 | © 2024 Josh Johnson | https://github.com/jshjohnson/Choices#readme */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Choices = factory());
})(this, (function () { 'use strict';

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
    /* global Reflect, Promise, SuppressedError, Symbol */

    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
      return extendStatics(d, b);
    };
    function __extends(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    }
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
      var e = new Error(message);
      return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    var ActionType = {
        ADD_CHOICE: 'ADD_CHOICE',
        REMOVE_CHOICE: 'REMOVE_CHOICE',
        FILTER_CHOICES: 'FILTER_CHOICES',
        ACTIVATE_CHOICES: 'ACTIVATE_CHOICES',
        CLEAR_CHOICES: 'CLEAR_CHOICES',
        ADD_GROUP: 'ADD_GROUP',
        ADD_ITEM: 'ADD_ITEM',
        REMOVE_ITEM: 'REMOVE_ITEM',
        HIGHLIGHT_ITEM: 'HIGHLIGHT_ITEM',
    };

    var EventType = {
        showDropdown: 'showDropdown',
        hideDropdown: 'hideDropdown',
        change: 'change',
        choice: 'choice',
        search: 'search',
        addItem: 'addItem',
        removeItem: 'removeItem',
        highlightItem: 'highlightItem',
        highlightChoice: 'highlightChoice',
        unhighlightItem: 'unhighlightItem',
    };

    var ObjectsInConfig = ['fuseOptions', 'classNames'];

    var PassedElementTypes = {
        Text: 'text',
        SelectOne: 'select-one',
        SelectMultiple: 'select-multiple',
    };

    var addChoice = function (choice) { return ({
        type: ActionType.ADD_CHOICE,
        choice: choice,
    }); };
    var removeChoice = function (choice) { return ({
        type: ActionType.REMOVE_CHOICE,
        choice: choice,
    }); };
    var filterChoices = function (results) { return ({
        type: ActionType.FILTER_CHOICES,
        results: results,
    }); };
    var activateChoices = function (active) {
        return ({
            type: ActionType.ACTIVATE_CHOICES,
            active: active,
        });
    };

    var addGroup = function (group) { return ({
        type: ActionType.ADD_GROUP,
        group: group,
    }); };

    var addItem = function (item) { return ({
        type: ActionType.ADD_ITEM,
        item: item,
    }); };
    var removeItem$1 = function (item) { return ({
        type: ActionType.REMOVE_ITEM,
        item: item,
    }); };
    var highlightItem = function (item, highlighted) { return ({
        type: ActionType.HIGHLIGHT_ITEM,
        item: item,
        highlighted: highlighted,
    }); };

    var getRandomNumber = function (min, max) { return Math.floor(Math.random() * (max - min) + min); };
    var generateChars = function (length) {
        return Array.from({ length: length }, function () { return getRandomNumber(0, 36).toString(36); }).join('');
    };
    var generateId = function (element, prefix) {
        var id = element.id || (element.name && "".concat(element.name, "-").concat(generateChars(2))) || generateChars(4);
        id = id.replace(/(:|\.|\[|\]|,)/g, '');
        id = "".concat(prefix, "-").concat(id);
        return id;
    };
    var getAdjacentEl = function (startEl, selector, direction) {
        if (direction === void 0) { direction = 1; }
        var prop = "".concat(direction > 0 ? 'next' : 'previous', "ElementSibling");
        var sibling = startEl[prop];
        while (sibling) {
            if (sibling.matches(selector)) {
                return sibling;
            }
            sibling = sibling[prop];
        }
        return null;
    };
    var isScrolledIntoView = function (element, parent, direction) {
        if (direction === void 0) { direction = 1; }
        var isVisible;
        if (direction > 0) {
            // In view from bottom
            isVisible = parent.scrollTop + parent.offsetHeight >= element.offsetTop + element.offsetHeight;
        }
        else {
            // In view from top
            isVisible = element.offsetTop >= parent.scrollTop;
        }
        return isVisible;
    };
    var sanitise = function (value) {
        if (typeof value !== 'string') {
            if (value === null || value === undefined) {
                return '';
            }
            if (typeof value === 'object') {
                if ('raw' in value) {
                    return sanitise(value.raw);
                }
                if ('trusted' in value) {
                    return value.trusted;
                }
            }
            return value;
        }
        return value
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/'/g, '&#039;')
            .replace(/"/g, '&quot;');
    };
    var strToEl = (function () {
        var tmpEl = document.createElement('div');
        return function (str) {
            tmpEl.innerHTML = str.trim();
            var firstChild = tmpEl.children[0];
            while (tmpEl.firstChild) {
                tmpEl.removeChild(tmpEl.firstChild);
            }
            return firstChild;
        };
    })();
    var resolveNoticeFunction = function (fn, value) {
        return typeof fn === 'function' ? fn(sanitise(value), value) : fn;
    };
    var resolveStringFunction = function (fn) {
        return typeof fn === 'function' ? fn() : fn;
    };
    var unwrapStringForRaw = function (s) {
        if (typeof s === 'string') {
            return s;
        }
        if (typeof s === 'object') {
            if ('trusted' in s) {
                return s.trusted;
            }
            if ('raw' in s) {
                return s.raw;
            }
        }
        return '';
    };
    var unwrapStringForEscaped = function (s) {
        if (typeof s === 'string') {
            return s;
        }
        if (typeof s === 'object') {
            if ('escaped' in s) {
                return s.escaped;
            }
            if ('trusted' in s) {
                return s.trusted;
            }
        }
        return '';
    };
    var escapeForTemplate = function (allowHTML, s) {
        return allowHTML ? unwrapStringForEscaped(s) : sanitise(s);
    };
    var setElementHtml = function (el, allowHtml, html) {
        el.innerHTML = escapeForTemplate(allowHtml, html);
    };
    var sortByAlpha = function (_a, _b) {
        var value = _a.value, _c = _a.label, label = _c === void 0 ? value : _c;
        var value2 = _b.value, _d = _b.label, label2 = _d === void 0 ? value2 : _d;
        return unwrapStringForRaw(label).localeCompare(unwrapStringForRaw(label2), [], {
            sensitivity: 'base',
            ignorePunctuation: true,
            numeric: true,
        });
    };
    var sortByRank = function (a, b) {
        return a.rank - b.rank;
    };
    var dispatchEvent = function (element, type, customArgs) {
        if (customArgs === void 0) { customArgs = null; }
        var event = new CustomEvent(type, {
            detail: customArgs,
            bubbles: true,
            cancelable: true,
        });
        return element.dispatchEvent(event);
    };
    /**
     * Returns an array of keys present on the first but missing on the second object
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var diff = function (a, b) {
        var aKeys = Object.keys(a).sort();
        var bKeys = Object.keys(b).sort();
        return aKeys.filter(function (i) { return bKeys.indexOf(i) < 0; });
    };
    var getClassNames = function (ClassNames) {
        return Array.isArray(ClassNames) ? ClassNames : [ClassNames];
    };
    var getClassNamesSelector = function (option) {
        if (option && Array.isArray(option)) {
            return option
                .map(function (item) {
                return ".".concat(item);
            })
                .join('');
        }
        return ".".concat(option);
    };
    var addClassesToElement = function (element, className) {
        var _a;
        (_a = element.classList).add.apply(_a, getClassNames(className));
    };
    var removeClassesFromElement = function (element, className) {
        var _a;
        (_a = element.classList).remove.apply(_a, getClassNames(className));
    };
    var parseCustomProperties = function (customProperties) {
        if (typeof customProperties !== 'undefined') {
            try {
                return JSON.parse(customProperties);
            }
            catch (e) {
                return customProperties;
            }
        }
        return {};
    };
    var updateClassList = function (item, add, remove) {
        var itemEl = item.itemEl;
        if (itemEl) {
            removeClassesFromElement(itemEl, remove);
            addClassesToElement(itemEl, add);
        }
    };

    var Dropdown = /** @class */ (function () {
        function Dropdown(_a) {
            var element = _a.element, type = _a.type, classNames = _a.classNames;
            this.element = element;
            this.classNames = classNames;
            this.type = type;
            this.isActive = false;
        }
        /**
         * Show dropdown to user by adding active state class
         */
        Dropdown.prototype.show = function () {
            addClassesToElement(this.element, this.classNames.activeState);
            this.element.setAttribute('aria-expanded', 'true');
            this.isActive = true;
            return this;
        };
        /**
         * Hide dropdown from user
         */
        Dropdown.prototype.hide = function () {
            removeClassesFromElement(this.element, this.classNames.activeState);
            this.element.setAttribute('aria-expanded', 'false');
            this.isActive = false;
            return this;
        };
        return Dropdown;
    }());

    var Container = /** @class */ (function () {
        function Container(_a) {
            var element = _a.element, type = _a.type, classNames = _a.classNames, position = _a.position;
            this.element = element;
            this.classNames = classNames;
            this.type = type;
            this.position = position;
            this.isOpen = false;
            this.isFlipped = false;
            this.isDisabled = false;
            this.isLoading = false;
        }
        /**
         * Determine whether container should be flipped based on passed
         * dropdown position
         */
        Container.prototype.shouldFlip = function (dropdownPos, dropdownHeight) {
            // If flip is enabled and the dropdown bottom position is
            // greater than the window height flip the dropdown.
            var shouldFlip = false;
            if (this.position === 'auto') {
                shouldFlip =
                    this.element.getBoundingClientRect().top - dropdownHeight >= 0 &&
                        !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches;
            }
            else if (this.position === 'top') {
                shouldFlip = true;
            }
            return shouldFlip;
        };
        Container.prototype.setActiveDescendant = function (activeDescendantID) {
            this.element.setAttribute('aria-activedescendant', activeDescendantID);
        };
        Container.prototype.removeActiveDescendant = function () {
            this.element.removeAttribute('aria-activedescendant');
        };
        Container.prototype.open = function (dropdownPos, dropdownHeight) {
            addClassesToElement(this.element, this.classNames.openState);
            this.element.setAttribute('aria-expanded', 'true');
            this.isOpen = true;
            if (this.shouldFlip(dropdownPos, dropdownHeight)) {
                addClassesToElement(this.element, this.classNames.flippedState);
                this.isFlipped = true;
            }
        };
        Container.prototype.close = function () {
            removeClassesFromElement(this.element, this.classNames.openState);
            this.element.setAttribute('aria-expanded', 'false');
            this.removeActiveDescendant();
            this.isOpen = false;
            // A dropdown flips if it does not have space within the page
            if (this.isFlipped) {
                removeClassesFromElement(this.element, this.classNames.flippedState);
                this.isFlipped = false;
            }
        };
        Container.prototype.addFocusState = function () {
            addClassesToElement(this.element, this.classNames.focusState);
        };
        Container.prototype.removeFocusState = function () {
            removeClassesFromElement(this.element, this.classNames.focusState);
        };
        Container.prototype.enable = function () {
            removeClassesFromElement(this.element, this.classNames.disabledState);
            this.element.removeAttribute('aria-disabled');
            if (this.type === PassedElementTypes.SelectOne) {
                this.element.setAttribute('tabindex', '0');
            }
            this.isDisabled = false;
        };
        Container.prototype.disable = function () {
            addClassesToElement(this.element, this.classNames.disabledState);
            this.element.setAttribute('aria-disabled', 'true');
            if (this.type === PassedElementTypes.SelectOne) {
                this.element.setAttribute('tabindex', '-1');
            }
            this.isDisabled = true;
        };
        Container.prototype.wrap = function (element) {
            var el = this.element;
            var parentNode = element.parentNode;
            if (parentNode) {
                if (element.nextSibling) {
                    parentNode.insertBefore(el, element.nextSibling);
                }
                else {
                    parentNode.appendChild(el);
                }
            }
            el.appendChild(element);
        };
        Container.prototype.unwrap = function (element) {
            var el = this.element;
            var parentNode = el.parentNode;
            if (parentNode) {
                // Move passed element outside this element
                parentNode.insertBefore(element, el);
                // Remove this element
                parentNode.removeChild(el);
            }
        };
        Container.prototype.addLoadingState = function () {
            addClassesToElement(this.element, this.classNames.loadingState);
            this.element.setAttribute('aria-busy', 'true');
            this.isLoading = true;
        };
        Container.prototype.removeLoadingState = function () {
            removeClassesFromElement(this.element, this.classNames.loadingState);
            this.element.removeAttribute('aria-busy');
            this.isLoading = false;
        };
        return Container;
    }());

    var Input = /** @class */ (function () {
        function Input(_a) {
            var element = _a.element, type = _a.type, classNames = _a.classNames, preventPaste = _a.preventPaste;
            this.element = element;
            this.type = type;
            this.classNames = classNames;
            this.preventPaste = preventPaste;
            this.isFocussed = this.element.isEqualNode(document.activeElement);
            this.isDisabled = element.disabled;
            this._onPaste = this._onPaste.bind(this);
            this._onInput = this._onInput.bind(this);
            this._onFocus = this._onFocus.bind(this);
            this._onBlur = this._onBlur.bind(this);
        }
        Object.defineProperty(Input.prototype, "placeholder", {
            set: function (placeholder) {
                this.element.placeholder = placeholder;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "value", {
            get: function () {
                return this.element.value;
            },
            set: function (value) {
                this.element.value = value;
            },
            enumerable: false,
            configurable: true
        });
        Input.prototype.addEventListeners = function () {
            var el = this.element;
            el.addEventListener('paste', this._onPaste);
            el.addEventListener('input', this._onInput, {
                passive: true,
            });
            el.addEventListener('focus', this._onFocus, {
                passive: true,
            });
            el.addEventListener('blur', this._onBlur, {
                passive: true,
            });
        };
        Input.prototype.removeEventListeners = function () {
            var el = this.element;
            el.removeEventListener('input', this._onInput);
            el.removeEventListener('paste', this._onPaste);
            el.removeEventListener('focus', this._onFocus);
            el.removeEventListener('blur', this._onBlur);
        };
        Input.prototype.enable = function () {
            var el = this.element;
            el.removeAttribute('disabled');
            this.isDisabled = false;
        };
        Input.prototype.disable = function () {
            var el = this.element;
            el.setAttribute('disabled', '');
            this.isDisabled = true;
        };
        Input.prototype.focus = function () {
            if (!this.isFocussed) {
                this.element.focus();
            }
        };
        Input.prototype.blur = function () {
            if (this.isFocussed) {
                this.element.blur();
            }
        };
        Input.prototype.clear = function (setWidth) {
            if (setWidth === void 0) { setWidth = true; }
            this.element.value = '';
            if (setWidth) {
                this.setWidth();
            }
            return this;
        };
        /**
         * Set the correct input width based on placeholder
         * value or input value
         */
        Input.prototype.setWidth = function () {
            // Resize input to contents or placeholder
            var element = this.element;
            element.style.minWidth = "".concat(element.placeholder.length + 1, "ch");
            element.style.width = "".concat(element.value.length + 1, "ch");
        };
        Input.prototype.setActiveDescendant = function (activeDescendantID) {
            this.element.setAttribute('aria-activedescendant', activeDescendantID);
        };
        Input.prototype.removeActiveDescendant = function () {
            this.element.removeAttribute('aria-activedescendant');
        };
        Input.prototype._onInput = function () {
            if (this.type !== PassedElementTypes.SelectOne) {
                this.setWidth();
            }
        };
        Input.prototype._onPaste = function (event) {
            if (this.preventPaste) {
                event.preventDefault();
            }
        };
        Input.prototype._onFocus = function () {
            this.isFocussed = true;
        };
        Input.prototype._onBlur = function () {
            this.isFocussed = false;
        };
        return Input;
    }());

    var SCROLLING_SPEED = 4;

    var List = /** @class */ (function () {
        function List(_a) {
            var element = _a.element;
            this.element = element;
            this.scrollPos = this.element.scrollTop;
            this.height = this.element.offsetHeight;
        }
        List.prototype.prepend = function (node) {
            var child = this.element.firstElementChild;
            if (child) {
                this.element.insertBefore(node, child);
            }
            else {
                this.element.append(node);
            }
        };
        List.prototype.scrollToTop = function () {
            this.element.scrollTop = 0;
        };
        List.prototype.scrollToChildElement = function (element, direction) {
            var _this = this;
            if (!element) {
                return;
            }
            var listHeight = this.element.offsetHeight;
            // Scroll position of dropdown
            var listScrollPosition = this.element.scrollTop + listHeight;
            var elementHeight = element.offsetHeight;
            // Distance from bottom of element to top of parent
            var elementPos = element.offsetTop + elementHeight;
            // Difference between the element and scroll position
            var destination = direction > 0 ? this.element.scrollTop + elementPos - listScrollPosition : element.offsetTop;
            requestAnimationFrame(function () {
                _this._animateScroll(destination, direction);
            });
        };
        List.prototype._scrollDown = function (scrollPos, strength, destination) {
            var easing = (destination - scrollPos) / strength;
            var distance = easing > 1 ? easing : 1;
            this.element.scrollTop = scrollPos + distance;
        };
        List.prototype._scrollUp = function (scrollPos, strength, destination) {
            var easing = (scrollPos - destination) / strength;
            var distance = easing > 1 ? easing : 1;
            this.element.scrollTop = scrollPos - distance;
        };
        List.prototype._animateScroll = function (destination, direction) {
            var _this = this;
            var strength = SCROLLING_SPEED;
            var choiceListScrollTop = this.element.scrollTop;
            var continueAnimation = false;
            if (direction > 0) {
                this._scrollDown(choiceListScrollTop, strength, destination);
                if (choiceListScrollTop < destination) {
                    continueAnimation = true;
                }
            }
            else {
                this._scrollUp(choiceListScrollTop, strength, destination);
                if (choiceListScrollTop > destination) {
                    continueAnimation = true;
                }
            }
            if (continueAnimation) {
                requestAnimationFrame(function () {
                    _this._animateScroll(destination, direction);
                });
            }
        };
        return List;
    }());

    var WrappedElement = /** @class */ (function () {
        function WrappedElement(_a) {
            var element = _a.element, classNames = _a.classNames;
            this.element = element;
            this.classNames = classNames;
            this.isDisabled = false;
        }
        Object.defineProperty(WrappedElement.prototype, "isActive", {
            get: function () {
                return this.element.dataset.choice === 'active';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WrappedElement.prototype, "dir", {
            get: function () {
                return this.element.dir;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(WrappedElement.prototype, "value", {
            get: function () {
                return this.element.value;
            },
            set: function (value) {
                this.element.setAttribute('value', value);
                this.element.value = value;
            },
            enumerable: false,
            configurable: true
        });
        WrappedElement.prototype.conceal = function () {
            var el = this.element;
            // Hide passed input
            addClassesToElement(el, this.classNames.input);
            el.hidden = true;
            // Remove element from tab index
            el.tabIndex = -1;
            // Backup original styles if any
            var origStyle = el.getAttribute('style');
            if (origStyle) {
                el.setAttribute('data-choice-orig-style', origStyle);
            }
            el.setAttribute('data-choice', 'active');
        };
        WrappedElement.prototype.reveal = function () {
            var el = this.element;
            // Reinstate passed element
            removeClassesFromElement(el, this.classNames.input);
            el.hidden = false;
            el.removeAttribute('tabindex');
            // Recover original styles if any
            var origStyle = el.getAttribute('data-choice-orig-style');
            if (origStyle) {
                el.removeAttribute('data-choice-orig-style');
                el.setAttribute('style', origStyle);
            }
            else {
                el.removeAttribute('style');
            }
            el.removeAttribute('data-choice');
        };
        WrappedElement.prototype.enable = function () {
            this.element.removeAttribute('disabled');
            this.element.disabled = false;
            this.isDisabled = false;
        };
        WrappedElement.prototype.disable = function () {
            this.element.setAttribute('disabled', '');
            this.element.disabled = true;
            this.isDisabled = true;
        };
        WrappedElement.prototype.triggerEvent = function (eventType, data) {
            dispatchEvent(this.element, eventType, data || {});
        };
        return WrappedElement;
    }());

    var WrappedInput = /** @class */ (function (_super) {
        __extends(WrappedInput, _super);
        function WrappedInput() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return WrappedInput;
    }(WrappedElement));

    var coerceBool = function (arg, defaultValue) {
        if (defaultValue === void 0) { defaultValue = true; }
        return typeof arg === 'undefined' ? defaultValue : !!arg;
    };
    var stringToHtmlClass = function (input) {
        if (typeof input === 'string') {
            // eslint-disable-next-line no-param-reassign
            input = input.split(' ').filter(function (s) { return s.length; });
        }
        if (Array.isArray(input) && input.length) {
            return input;
        }
        return undefined;
    };
    var mapInputToChoice = function (value, allowGroup) {
        if (typeof value === 'string') {
            var result_1 = mapInputToChoice({
                value: value,
                label: value,
            }, false);
            return result_1;
        }
        var groupOrChoice = value;
        if ('choices' in groupOrChoice) {
            if (!allowGroup) {
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
                throw new TypeError("optGroup is not allowed");
            }
            var group = groupOrChoice;
            var choices = group.choices.map(function (e) { return mapInputToChoice(e, false); });
            var result_2 = {
                id: 0, // actual ID will be assigned during _addGroup
                label: unwrapStringForRaw(group.label) || group.value,
                active: !!choices.length,
                disabled: !!group.disabled,
                choices: choices,
            };
            return result_2;
        }
        var choice = groupOrChoice;
        var result = {
            id: 0, // actual ID will be assigned during _addChoice
            group: null, // actual group will be assigned during _addGroup but before _addChoice
            score: 0, // used in search
            rank: 0, // used in search, stable sort order
            value: choice.value,
            label: choice.label || choice.value,
            active: coerceBool(choice.active),
            selected: coerceBool(choice.selected, false),
            disabled: coerceBool(choice.disabled, false),
            placeholder: coerceBool(choice.placeholder, false),
            highlighted: false,
            labelClass: stringToHtmlClass(choice.labelClass),
            labelDescription: choice.labelDescription,
            customProperties: choice.customProperties,
        };
        return result;
    };

    var isHtmlInputElement = function (e) { return e.tagName === 'INPUT'; };
    var isHtmlSelectElement = function (e) { return e.tagName === 'SELECT'; };
    var isHtmlOption = function (e) { return e.tagName === 'OPTION'; };
    var isHtmlOptgroup = function (e) { return e.tagName === 'OPTGROUP'; };

    var WrappedSelect = /** @class */ (function (_super) {
        __extends(WrappedSelect, _super);
        function WrappedSelect(_a) {
            var element = _a.element, classNames = _a.classNames, template = _a.template, extractPlaceholder = _a.extractPlaceholder;
            var _this = _super.call(this, { element: element, classNames: classNames }) || this;
            _this.template = template;
            _this.extractPlaceholder = extractPlaceholder;
            return _this;
        }
        Object.defineProperty(WrappedSelect.prototype, "placeholderOption", {
            get: function () {
                return (this.element.querySelector('option[value=""]') ||
                    // Backward compatibility layer for the non-standard placeholder attribute supported in older versions.
                    this.element.querySelector('option[placeholder]'));
            },
            enumerable: false,
            configurable: true
        });
        WrappedSelect.prototype.addOptions = function (choices) {
            var _this = this;
            var fragment = document.createDocumentFragment();
            choices.forEach(function (obj) {
                var choice = obj;
                if (choice.element) {
                    return;
                }
                var option = _this.template(choice);
                fragment.appendChild(option);
                choice.element = option;
            });
            this.element.appendChild(fragment);
        };
        WrappedSelect.prototype.optionsAsChoices = function () {
            var _this = this;
            var choices = [];
            this.element.querySelectorAll(':scope > option, :scope > optgroup').forEach(function (e) {
                if (isHtmlOption(e)) {
                    choices.push(_this._optionToChoice(e));
                }
                else if (isHtmlOptgroup(e)) {
                    choices.push(_this._optgroupToChoice(e));
                }
                // todo: hr as empty optgroup, requires displaying empty opt-groups to be useful
            });
            return choices;
        };
        // eslint-disable-next-line class-methods-use-this
        WrappedSelect.prototype._optionToChoice = function (option) {
            // option.value returns the label if there is no value attribute, which can break legacy placeholder attribute support
            if (!option.hasAttribute('value') && option.hasAttribute('placeholder')) {
                option.setAttribute('value', '');
                option.value = '';
            }
            return {
                id: 0,
                group: null,
                score: 0,
                rank: 0,
                value: option.value,
                label: option.innerHTML,
                element: option,
                active: true,
                // this returns true if nothing is selected on initial load, which will break placeholder support
                selected: this.extractPlaceholder ? option.selected : option.hasAttribute('selected'),
                disabled: option.disabled,
                highlighted: false,
                placeholder: this.extractPlaceholder && (!option.value || option.hasAttribute('placeholder')),
                labelClass: typeof option.dataset.labelClass !== 'undefined' ? stringToHtmlClass(option.dataset.labelClass) : undefined,
                labelDescription: typeof option.dataset.labelDescription !== 'undefined' ? option.dataset.labelDescription : undefined,
                customProperties: parseCustomProperties(option.dataset.customProperties),
            };
        };
        WrappedSelect.prototype._optgroupToChoice = function (optgroup) {
            var _this = this;
            var options = optgroup.querySelectorAll('option');
            var choices = Array.from(options).map(function (option) { return _this._optionToChoice(option); });
            return {
                id: 0,
                label: optgroup.label || '',
                element: optgroup,
                active: !!choices.length,
                disabled: optgroup.disabled,
                choices: choices,
            };
        };
        return WrappedSelect;
    }(WrappedElement));

    var DEFAULT_CLASSNAMES = {
        containerOuter: ['choices'],
        containerInner: ['choices__inner'],
        input: ['choices__input'],
        inputCloned: ['choices__input--cloned'],
        list: ['choices__list'],
        listItems: ['choices__list--multiple'],
        listSingle: ['choices__list--single'],
        listDropdown: ['choices__list--dropdown'],
        item: ['choices__item'],
        itemSelectable: ['choices__item--selectable'],
        itemDisabled: ['choices__item--disabled'],
        itemChoice: ['choices__item--choice'],
        description: ['choices__description'],
        placeholder: ['choices__placeholder'],
        group: ['choices__group'],
        groupHeading: ['choices__heading'],
        button: ['choices__button'],
        activeState: ['is-active'],
        focusState: ['is-focused'],
        openState: ['is-open'],
        disabledState: ['is-disabled'],
        highlightedState: ['is-highlighted'],
        selectedState: ['is-selected'],
        flippedState: ['is-flipped'],
        loadingState: ['is-loading'],
        notice: ['choices__notice'],
        addChoice: ['choices__item--selectable', 'add-choice'],
        noResults: ['has-no-results'],
        noChoices: ['has-no-choices'],
    };
    var DEFAULT_CONFIG = {
        items: [],
        choices: [],
        silent: false,
        renderChoiceLimit: -1,
        maxItemCount: -1,
        closeDropdownOnSelect: 'auto',
        singleModeForMultiSelect: false,
        addChoices: false,
        addItems: true,
        addItemFilter: function (value) { return !!value && value !== ''; },
        removeItems: true,
        removeItemButton: false,
        removeItemButtonAlignLeft: false,
        editItems: false,
        allowHTML: false,
        allowHtmlUserInput: false,
        duplicateItemsAllowed: true,
        delimiter: ',',
        paste: true,
        searchEnabled: true,
        searchChoices: true,
        searchFloor: 1,
        searchResultLimit: 4,
        searchFields: ['label', 'value'],
        position: 'auto',
        resetScrollPosition: true,
        shouldSort: true,
        shouldSortItems: false,
        sorter: sortByAlpha,
        shadowRoot: null,
        placeholder: true,
        placeholderValue: null,
        searchPlaceholderValue: null,
        prependValue: null,
        appendValue: null,
        renderSelectedChoices: 'auto',
        loadingText: 'Loading...',
        noResultsText: 'No results found',
        noChoicesText: 'No choices to choose from',
        itemSelectText: 'Press to select',
        uniqueItemText: 'Only unique values can be added',
        customAddItemText: 'Only values matching specific conditions can be added',
        addItemText: function (value) { return "Press Enter to add <b>\"".concat(value, "\"</b>"); },
        removeItemIconText: function () { return "Remove item"; },
        removeItemLabelText: function (value) { return "Remove item: ".concat(value); },
        maxItemText: function (maxItemCount) { return "Only ".concat(maxItemCount, " values can be added"); },
        valueComparer: function (value1, value2) { return value1 === value2; },
        fuseOptions: {
            includeScore: true,
        },
        labelId: '',
        callbackOnInit: null,
        callbackOnCreateTemplates: null,
        classNames: DEFAULT_CLASSNAMES,
        appendGroupInSearch: false,
    };

    var removeItem = function (item) {
        var itemEl = item.itemEl;
        if (itemEl) {
            itemEl.remove();
            item.itemEl = undefined;
        }
    };
    function items(s, action, context) {
        var state = s;
        var update = true;
        switch (action.type) {
            case ActionType.ADD_ITEM: {
                action.item.selected = true;
                var el = action.item.element;
                if (el) {
                    el.selected = true;
                    el.setAttribute('selected', '');
                }
                state.push(action.item);
                break;
            }
            case ActionType.REMOVE_ITEM: {
                action.item.selected = false;
                var el = action.item.element;
                if (el) {
                    el.selected = false;
                    el.removeAttribute('selected');
                    // For a select-one, if all options are deselected, the first item is selected. To set a black value, select.value needs to be set
                    var select = el.parentElement;
                    if (select && isHtmlSelectElement(select) && select.type === PassedElementTypes.SelectOne) {
                        select.value = '';
                    }
                }
                // this is mixing concerns, but this is *so much faster*
                removeItem(action.item);
                state = state.filter(function (choice) { return choice.id !== action.item.id; });
                break;
            }
            case ActionType.REMOVE_CHOICE: {
                removeItem(action.choice);
                state = state.filter(function (item) { return item.id !== action.choice.id; });
                break;
            }
            case ActionType.HIGHLIGHT_ITEM: {
                var highlighted = action.highlighted;
                var item = state.find(function (obj) { return obj.id === action.item.id; });
                if (item && item.highlighted !== highlighted) {
                    item.highlighted = highlighted;
                    if (context) {
                        updateClassList(item, highlighted ? context.classNames.highlightedState : context.classNames.selectedState, highlighted ? context.classNames.selectedState : context.classNames.highlightedState);
                    }
                }
                break;
            }
            default: {
                update = false;
                break;
            }
        }
        return { state: state, update: update };
    }

    function groups(s, action) {
        var state = s;
        var update = true;
        switch (action.type) {
            case ActionType.ADD_GROUP: {
                state.push(action.group);
                break;
            }
            case ActionType.CLEAR_CHOICES: {
                state = [];
                break;
            }
            default: {
                update = false;
                break;
            }
        }
        return { state: state, update: update };
    }

    /* eslint-disable */
    function choices(s, action, context) {
        var state = s;
        var update = true;
        switch (action.type) {
            case ActionType.ADD_CHOICE: {
                state.push(action.choice);
                break;
            }
            case ActionType.REMOVE_CHOICE: {
                action.choice.choiceEl = undefined;
                if (action.choice.group) {
                    action.choice.group.choices = action.choice.group.choices.filter(function (obj) { return obj.id !== action.choice.id; });
                }
                state = state.filter(function (obj) { return obj.id !== action.choice.id; });
                break;
            }
            case ActionType.ADD_ITEM:
            case ActionType.REMOVE_ITEM: {
                action.item.choiceEl = undefined;
                break;
            }
            case ActionType.FILTER_CHOICES: {
                // avoid O(n^2) algorithm complexity when searching/filtering choices
                var scoreLookup_1 = [];
                action.results.forEach(function (result) {
                    scoreLookup_1[result.item.id] = result;
                });
                state.forEach(function (choice) {
                    var result = scoreLookup_1[choice.id];
                    if (result !== undefined) {
                        choice.score = result.score;
                        choice.rank = result.rank;
                        choice.active = true;
                    }
                    else {
                        choice.score = 0;
                        choice.rank = 0;
                        choice.active = false;
                    }
                    if (context && context.appendGroupInSearch) {
                        choice.choiceEl = undefined;
                    }
                });
                break;
            }
            case ActionType.ACTIVATE_CHOICES: {
                state.forEach(function (choice) {
                    choice.active = action.active;
                    if (context && context.appendGroupInSearch) {
                        choice.choiceEl = undefined;
                    }
                });
                break;
            }
            case ActionType.CLEAR_CHOICES: {
                state = [];
                break;
            }
            default: {
                update = false;
                break;
            }
        }
        return { state: state, update: update };
    }

    var reducers = {
        groups: groups,
        items: items,
        choices: choices,
    };
    var Store = /** @class */ (function () {
        function Store(context) {
            this._state = this.defaultState;
            this._listeners = [];
            this._txn = 0;
            this._context = context;
        }
        Object.defineProperty(Store.prototype, "defaultState", {
            // eslint-disable-next-line class-methods-use-this
            get: function () {
                return {
                    groups: [],
                    items: [],
                    choices: [],
                };
            },
            enumerable: false,
            configurable: true
        });
        // eslint-disable-next-line class-methods-use-this
        Store.prototype.changeSet = function (init) {
            return {
                groups: init,
                items: init,
                choices: init,
            };
        };
        Store.prototype.reset = function () {
            this._state = this.defaultState;
            var changes = this.changeSet(true);
            if (this._txn) {
                this._changeSet = changes;
            }
            else {
                this._listeners.forEach(function (l) { return l(changes); });
            }
        };
        Store.prototype.subscribe = function (onChange) {
            this._listeners.push(onChange);
            return this;
        };
        Store.prototype.dispatch = function (action) {
            var _this = this;
            var state = this._state;
            var hasChanges = false;
            var changes = this._changeSet || this.changeSet(false);
            Object.keys(reducers).forEach(function (key) {
                var stateUpdate = reducers[key](state[key], action, _this._context);
                if (stateUpdate.update) {
                    hasChanges = true;
                    changes[key] = true;
                    state[key] = stateUpdate.state;
                }
            });
            if (hasChanges) {
                if (this._txn) {
                    this._changeSet = changes;
                }
                else {
                    this._listeners.forEach(function (l) { return l(changes); });
                }
            }
        };
        Store.prototype.withTxn = function (func) {
            this._txn++;
            try {
                func();
            }
            finally {
                this._txn = Math.max(0, this._txn - 1);
                if (!this._txn) {
                    var changeSet_1 = this._changeSet;
                    if (changeSet_1) {
                        this._changeSet = undefined;
                        this._listeners.forEach(function (l) { return l(changeSet_1); });
                    }
                }
            }
        };
        Object.defineProperty(Store.prototype, "state", {
            /**
             * Get store object
             */
            get: function () {
                return this._state;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "items", {
            /**
             * Get items from store
             */
            get: function () {
                return this.state.items;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "highlightedActiveItems", {
            /**
             * Get highlighted items from store
             */
            get: function () {
                return this.items.filter(function (item) { return !item.disabled && item.active && item.highlighted; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "choices", {
            /**
             * Get choices from store
             */
            get: function () {
                return this.state.choices;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "activeChoices", {
            /**
             * Get active choices from store
             */
            get: function () {
                return this.choices.filter(function (choice) { return choice.active; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "searchableChoices", {
            /**
             * Get choices that can be searched (excluding placeholders)
             */
            get: function () {
                return this.choices.filter(function (choice) { return !choice.disabled && !choice.placeholder; });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "groups", {
            /**
             * Get groups from store
             */
            get: function () {
                return this.state.groups;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Store.prototype, "activeGroups", {
            /**
             * Get active groups from store
             */
            get: function () {
                var _this = this;
                return this.state.groups.filter(function (group) {
                    var isActive = group.active && !group.disabled;
                    var hasActiveOptions = _this.state.choices.some(function (choice) { return choice.active && !choice.disabled; });
                    return isActive && hasActiveOptions;
                }, []);
            },
            enumerable: false,
            configurable: true
        });
        Store.prototype.inTxn = function () {
            return this._txn > 0;
        };
        /**
         * Get single choice by it's ID
         */
        Store.prototype.getChoiceById = function (id) {
            return this.activeChoices.find(function (choice) { return choice.id === id; });
        };
        /**
         * Get group by group id
         */
        Store.prototype.getGroupById = function (id) {
            return this.groups.find(function (group) { return group.id === id; });
        };
        return Store;
    }());

    var NoticeTypes = {
        noChoices: 'no-choices',
        noResults: 'no-results',
        addChoice: 'add-choice',
        generic: '',
    };

    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = t, e;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function (r) {
          return Object.getOwnPropertyDescriptor(e, r).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
      }
      return e;
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }

    /**
     * Fuse.js v7.0.0 - Lightweight fuzzy-search (http://fusejs.io)
     *
     * Copyright (c) 2023 Kiro Risk (http://kiro.me)
     * All Rights Reserved. Apache Software License 2.0
     *
     * http://www.apache.org/licenses/LICENSE-2.0
     */

    function isArray(value) {
      return !Array.isArray ? getTag(value) === '[object Array]' : Array.isArray(value);
    }

    // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/baseToString.js
    const INFINITY = 1 / 0;
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      let result = value + '';
      return result == '0' && 1 / value == -INFINITY ? '-0' : result;
    }
    function toString(value) {
      return value == null ? '' : baseToString(value);
    }
    function isString(value) {
      return typeof value === 'string';
    }
    function isNumber(value) {
      return typeof value === 'number';
    }

    // Adapted from: https://github.com/lodash/lodash/blob/master/isBoolean.js
    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && getTag(value) == '[object Boolean]';
    }
    function isObject(value) {
      return typeof value === 'object';
    }

    // Checks if `value` is object-like.
    function isObjectLike(value) {
      return isObject(value) && value !== null;
    }
    function isDefined(value) {
      return value !== undefined && value !== null;
    }
    function isBlank(value) {
      return !value.trim().length;
    }

    // Gets the `toStringTag` of `value`.
    // Adapted from: https://github.com/lodash/lodash/blob/master/.internal/getTag.js
    function getTag(value) {
      return value == null ? value === undefined ? '[object Undefined]' : '[object Null]' : Object.prototype.toString.call(value);
    }
    const EXTENDED_SEARCH_UNAVAILABLE = 'Extended search is not available';
    const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
    const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = key => `Invalid value for key ${key}`;
    const PATTERN_LENGTH_TOO_LARGE = max => `Pattern length exceeds max of ${max}.`;
    const MISSING_KEY_PROPERTY = name => `Missing ${name} property in key`;
    const INVALID_KEY_WEIGHT_VALUE = key => `Property 'weight' in key '${key}' must be a positive integer`;
    const hasOwn = Object.prototype.hasOwnProperty;
    class KeyStore {
      constructor(keys) {
        this._keys = [];
        this._keyMap = {};
        let totalWeight = 0;
        keys.forEach(key => {
          let obj = createKey(key);
          this._keys.push(obj);
          this._keyMap[obj.id] = obj;
          totalWeight += obj.weight;
        });

        // Normalize weights so that their sum is equal to 1
        this._keys.forEach(key => {
          key.weight /= totalWeight;
        });
      }
      get(keyId) {
        return this._keyMap[keyId];
      }
      keys() {
        return this._keys;
      }
      toJSON() {
        return JSON.stringify(this._keys);
      }
    }
    function createKey(key) {
      let path = null;
      let id = null;
      let src = null;
      let weight = 1;
      let getFn = null;
      if (isString(key) || isArray(key)) {
        src = key;
        path = createKeyPath(key);
        id = createKeyId(key);
      } else {
        if (!hasOwn.call(key, 'name')) {
          throw new Error(MISSING_KEY_PROPERTY('name'));
        }
        const name = key.name;
        src = name;
        if (hasOwn.call(key, 'weight')) {
          weight = key.weight;
          if (weight <= 0) {
            throw new Error(INVALID_KEY_WEIGHT_VALUE(name));
          }
        }
        path = createKeyPath(name);
        id = createKeyId(name);
        getFn = key.getFn;
      }
      return {
        path,
        id,
        weight,
        src,
        getFn
      };
    }
    function createKeyPath(key) {
      return isArray(key) ? key : key.split('.');
    }
    function createKeyId(key) {
      return isArray(key) ? key.join('.') : key;
    }
    function get(obj, path) {
      let list = [];
      let arr = false;
      const deepGet = (obj, path, index) => {
        if (!isDefined(obj)) {
          return;
        }
        if (!path[index]) {
          // If there's no path left, we've arrived at the object we care about.
          list.push(obj);
        } else {
          let key = path[index];
          const value = obj[key];
          if (!isDefined(value)) {
            return;
          }

          // If we're at the last value in the path, and if it's a string/number/bool,
          // add it to the list
          if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value))) {
            list.push(toString(value));
          } else if (isArray(value)) {
            arr = true;
            // Search each item in the array.
            for (let i = 0, len = value.length; i < len; i += 1) {
              deepGet(value[i], path, index + 1);
            }
          } else if (path.length) {
            // An object. Recurse further.
            deepGet(value, path, index + 1);
          }
        }
      };

      // Backwards compatibility (since path used to be a string)
      deepGet(obj, isString(path) ? path.split('.') : path, 0);
      return arr ? list : list[0];
    }
    const MatchOptions = {
      // Whether the matches should be included in the result set. When `true`, each record in the result
      // set will include the indices of the matched characters.
      // These can consequently be used for highlighting purposes.
      includeMatches: false,
      // When `true`, the matching function will continue to the end of a search pattern even if
      // a perfect match has already been located in the string.
      findAllMatches: false,
      // Minimum number of characters that must be matched before a result is considered a match
      minMatchCharLength: 1
    };
    const BasicOptions = {
      // When `true`, the algorithm continues searching to the end of the input even if a perfect
      // match is found before the end of the same input.
      isCaseSensitive: false,
      // When true, the matching function will continue to the end of a search pattern even if
      includeScore: false,
      // List of properties that will be searched. This also supports nested properties.
      keys: [],
      // Whether to sort the result list, by score
      shouldSort: true,
      // Default sort function: sort by ascending score, ascending index
      sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
    };
    const FuzzyOptions = {
      // Approximately where in the text is the pattern expected to be found?
      location: 0,
      // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
      // (of both letters and location), a threshold of '1.0' would match anything.
      threshold: 0.6,
      // Determines how close the match must be to the fuzzy location (specified above).
      // An exact letter match which is 'distance' characters away from the fuzzy location
      // would score as a complete mismatch. A distance of '0' requires the match be at
      // the exact location specified, a threshold of '1000' would require a perfect match
      // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
      distance: 100
    };
    const AdvancedOptions = {
      // When `true`, it enables the use of unix-like search commands
      useExtendedSearch: false,
      // The get function to use when fetching an object's properties.
      // The default will search nested paths *ie foo.bar.baz*
      getFn: get,
      // When `true`, search will ignore `location` and `distance`, so it won't matter
      // where in the string the pattern appears.
      // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
      ignoreLocation: false,
      // When `true`, the calculation for the relevance score (used for sorting) will
      // ignore the field-length norm.
      // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
      ignoreFieldNorm: false,
      // The weight to determine how much field length norm effects scoring.
      fieldNormWeight: 1
    };
    var Config = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, BasicOptions), MatchOptions), FuzzyOptions), AdvancedOptions);
    const SPACE = /[^ ]+/g;

    // Field-length norm: the shorter the field, the higher the weight.
    // Set to 3 decimals to reduce index size.
    function norm(weight = 1, mantissa = 3) {
      const cache = new Map();
      const m = Math.pow(10, mantissa);
      return {
        get(value) {
          const numTokens = value.match(SPACE).length;
          if (cache.has(numTokens)) {
            return cache.get(numTokens);
          }

          // Default function is 1/sqrt(x), weight makes that variable
          const norm = 1 / Math.pow(numTokens, 0.5 * weight);

          // In place of `toFixed(mantissa)`, for faster computation
          const n = parseFloat(Math.round(norm * m) / m);
          cache.set(numTokens, n);
          return n;
        },
        clear() {
          cache.clear();
        }
      };
    }
    class FuseIndex {
      constructor({
        getFn = Config.getFn,
        fieldNormWeight = Config.fieldNormWeight
      } = {}) {
        this.norm = norm(fieldNormWeight, 3);
        this.getFn = getFn;
        this.isCreated = false;
        this.setIndexRecords();
      }
      setSources(docs = []) {
        this.docs = docs;
      }
      setIndexRecords(records = []) {
        this.records = records;
      }
      setKeys(keys = []) {
        this.keys = keys;
        this._keysMap = {};
        keys.forEach((key, idx) => {
          this._keysMap[key.id] = idx;
        });
      }
      create() {
        if (this.isCreated || !this.docs.length) {
          return;
        }
        this.isCreated = true;

        // List is Array<String>
        if (isString(this.docs[0])) {
          this.docs.forEach((doc, docIndex) => {
            this._addString(doc, docIndex);
          });
        } else {
          // List is Array<Object>
          this.docs.forEach((doc, docIndex) => {
            this._addObject(doc, docIndex);
          });
        }
        this.norm.clear();
      }
      // Adds a doc to the end of the index
      add(doc) {
        const idx = this.size();
        if (isString(doc)) {
          this._addString(doc, idx);
        } else {
          this._addObject(doc, idx);
        }
      }
      // Removes the doc at the specified index of the index
      removeAt(idx) {
        this.records.splice(idx, 1);

        // Change ref index of every subsquent doc
        for (let i = idx, len = this.size(); i < len; i += 1) {
          this.records[i].i -= 1;
        }
      }
      getValueForItemAtKeyId(item, keyId) {
        return item[this._keysMap[keyId]];
      }
      size() {
        return this.records.length;
      }
      _addString(doc, docIndex) {
        if (!isDefined(doc) || isBlank(doc)) {
          return;
        }
        let record = {
          v: doc,
          i: docIndex,
          n: this.norm.get(doc)
        };
        this.records.push(record);
      }
      _addObject(doc, docIndex) {
        let record = {
          i: docIndex,
          $: {}
        };

        // Iterate over every key (i.e, path), and fetch the value at that key
        this.keys.forEach((key, keyIndex) => {
          let value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
          if (!isDefined(value)) {
            return;
          }
          if (isArray(value)) {
            let subRecords = [];
            const stack = [{
              nestedArrIndex: -1,
              value
            }];
            while (stack.length) {
              const {
                nestedArrIndex,
                value
              } = stack.pop();
              if (!isDefined(value)) {
                continue;
              }
              if (isString(value) && !isBlank(value)) {
                let subRecord = {
                  v: value,
                  i: nestedArrIndex,
                  n: this.norm.get(value)
                };
                subRecords.push(subRecord);
              } else if (isArray(value)) {
                value.forEach((item, k) => {
                  stack.push({
                    nestedArrIndex: k,
                    value: item
                  });
                });
              } else ;
            }
            record.$[keyIndex] = subRecords;
          } else if (isString(value) && !isBlank(value)) {
            let subRecord = {
              v: value,
              n: this.norm.get(value)
            };
            record.$[keyIndex] = subRecord;
          }
        });
        this.records.push(record);
      }
      toJSON() {
        return {
          keys: this.keys,
          records: this.records
        };
      }
    }
    function createIndex(keys, docs, {
      getFn = Config.getFn,
      fieldNormWeight = Config.fieldNormWeight
    } = {}) {
      const myIndex = new FuseIndex({
        getFn,
        fieldNormWeight
      });
      myIndex.setKeys(keys.map(createKey));
      myIndex.setSources(docs);
      myIndex.create();
      return myIndex;
    }
    function parseIndex(data, {
      getFn = Config.getFn,
      fieldNormWeight = Config.fieldNormWeight
    } = {}) {
      const {
        keys,
        records
      } = data;
      const myIndex = new FuseIndex({
        getFn,
        fieldNormWeight
      });
      myIndex.setKeys(keys);
      myIndex.setIndexRecords(records);
      return myIndex;
    }
    function computeScore$1(pattern, {
      errors = 0,
      currentLocation = 0,
      expectedLocation = 0,
      distance = Config.distance,
      ignoreLocation = Config.ignoreLocation
    } = {}) {
      const accuracy = errors / pattern.length;
      if (ignoreLocation) {
        return accuracy;
      }
      const proximity = Math.abs(expectedLocation - currentLocation);
      if (!distance) {
        // Dodge divide by zero error.
        return proximity ? 1.0 : accuracy;
      }
      return accuracy + proximity / distance;
    }
    function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
      let indices = [];
      let start = -1;
      let end = -1;
      let i = 0;
      for (let len = matchmask.length; i < len; i += 1) {
        let match = matchmask[i];
        if (match && start === -1) {
          start = i;
        } else if (!match && start !== -1) {
          end = i - 1;
          if (end - start + 1 >= minMatchCharLength) {
            indices.push([start, end]);
          }
          start = -1;
        }
      }

      // (i-1 - start) + 1 => i - start
      if (matchmask[i - 1] && i - start >= minMatchCharLength) {
        indices.push([start, i - 1]);
      }
      return indices;
    }

    // Machine word size
    const MAX_BITS = 32;
    function search(text, pattern, patternAlphabet, {
      location = Config.location,
      distance = Config.distance,
      threshold = Config.threshold,
      findAllMatches = Config.findAllMatches,
      minMatchCharLength = Config.minMatchCharLength,
      includeMatches = Config.includeMatches,
      ignoreLocation = Config.ignoreLocation
    } = {}) {
      if (pattern.length > MAX_BITS) {
        throw new Error(PATTERN_LENGTH_TOO_LARGE(MAX_BITS));
      }
      const patternLen = pattern.length;
      // Set starting location at beginning text and initialize the alphabet.
      const textLen = text.length;
      // Handle the case when location > text.length
      const expectedLocation = Math.max(0, Math.min(location, textLen));
      // Highest score beyond which we give up.
      let currentThreshold = threshold;
      // Is there a nearby exact match? (speedup)
      let bestLocation = expectedLocation;

      // Performance: only computer matches when the minMatchCharLength > 1
      // OR if `includeMatches` is true.
      const computeMatches = minMatchCharLength > 1 || includeMatches;
      // A mask of the matches, used for building the indices
      const matchMask = computeMatches ? Array(textLen) : [];
      let index;

      // Get all exact matches, here for speed up
      while ((index = text.indexOf(pattern, bestLocation)) > -1) {
        let score = computeScore$1(pattern, {
          currentLocation: index,
          expectedLocation,
          distance,
          ignoreLocation
        });
        currentThreshold = Math.min(score, currentThreshold);
        bestLocation = index + patternLen;
        if (computeMatches) {
          let i = 0;
          while (i < patternLen) {
            matchMask[index + i] = 1;
            i += 1;
          }
        }
      }

      // Reset the best location
      bestLocation = -1;
      let lastBitArr = [];
      let finalScore = 1;
      let binMax = patternLen + textLen;
      const mask = 1 << patternLen - 1;
      for (let i = 0; i < patternLen; i += 1) {
        // Scan for the best match; each iteration allows for one more error.
        // Run a binary search to determine how far from the match location we can stray
        // at this error level.
        let binMin = 0;
        let binMid = binMax;
        while (binMin < binMid) {
          const score = computeScore$1(pattern, {
            errors: i,
            currentLocation: expectedLocation + binMid,
            expectedLocation,
            distance,
            ignoreLocation
          });
          if (score <= currentThreshold) {
            binMin = binMid;
          } else {
            binMax = binMid;
          }
          binMid = Math.floor((binMax - binMin) / 2 + binMin);
        }

        // Use the result from this iteration as the maximum for the next.
        binMax = binMid;
        let start = Math.max(1, expectedLocation - binMid + 1);
        let finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

        // Initialize the bit array
        let bitArr = Array(finish + 2);
        bitArr[finish + 1] = (1 << i) - 1;
        for (let j = finish; j >= start; j -= 1) {
          let currentLocation = j - 1;
          let charMatch = patternAlphabet[text.charAt(currentLocation)];
          if (computeMatches) {
            // Speed up: quick bool to int conversion (i.e, `charMatch ? 1 : 0`)
            matchMask[currentLocation] = +!!charMatch;
          }

          // First pass: exact match
          bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

          // Subsequent passes: fuzzy match
          if (i) {
            bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
          }
          if (bitArr[j] & mask) {
            finalScore = computeScore$1(pattern, {
              errors: i,
              currentLocation,
              expectedLocation,
              distance,
              ignoreLocation
            });

            // This match will almost certainly be better than any existing match.
            // But check anyway.
            if (finalScore <= currentThreshold) {
              // Indeed it is
              currentThreshold = finalScore;
              bestLocation = currentLocation;

              // Already passed `loc`, downhill from here on in.
              if (bestLocation <= expectedLocation) {
                break;
              }

              // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
              start = Math.max(1, 2 * expectedLocation - bestLocation);
            }
          }
        }

        // No hope for a (better) match at greater error levels.
        const score = computeScore$1(pattern, {
          errors: i + 1,
          currentLocation: expectedLocation,
          expectedLocation,
          distance,
          ignoreLocation
        });
        if (score > currentThreshold) {
          break;
        }
        lastBitArr = bitArr;
      }
      const result = {
        isMatch: bestLocation >= 0,
        // Count exact matches (those with a score of 0) to be "almost" exact
        score: Math.max(0.001, finalScore)
      };
      if (computeMatches) {
        const indices = convertMaskToIndices(matchMask, minMatchCharLength);
        if (!indices.length) {
          result.isMatch = false;
        } else if (includeMatches) {
          result.indices = indices;
        }
      }
      return result;
    }
    function createPatternAlphabet(pattern) {
      let mask = {};
      for (let i = 0, len = pattern.length; i < len; i += 1) {
        const char = pattern.charAt(i);
        mask[char] = (mask[char] || 0) | 1 << len - i - 1;
      }
      return mask;
    }
    class BitapSearch {
      constructor(pattern, {
        location = Config.location,
        threshold = Config.threshold,
        distance = Config.distance,
        includeMatches = Config.includeMatches,
        findAllMatches = Config.findAllMatches,
        minMatchCharLength = Config.minMatchCharLength,
        isCaseSensitive = Config.isCaseSensitive,
        ignoreLocation = Config.ignoreLocation
      } = {}) {
        this.options = {
          location,
          threshold,
          distance,
          includeMatches,
          findAllMatches,
          minMatchCharLength,
          isCaseSensitive,
          ignoreLocation
        };
        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.chunks = [];
        if (!this.pattern.length) {
          return;
        }
        const addChunk = (pattern, startIndex) => {
          this.chunks.push({
            pattern,
            alphabet: createPatternAlphabet(pattern),
            startIndex
          });
        };
        const len = this.pattern.length;
        if (len > MAX_BITS) {
          let i = 0;
          const remainder = len % MAX_BITS;
          const end = len - remainder;
          while (i < end) {
            addChunk(this.pattern.substr(i, MAX_BITS), i);
            i += MAX_BITS;
          }
          if (remainder) {
            const startIndex = len - MAX_BITS;
            addChunk(this.pattern.substr(startIndex), startIndex);
          }
        } else {
          addChunk(this.pattern, 0);
        }
      }
      searchIn(text) {
        const {
          isCaseSensitive,
          includeMatches
        } = this.options;
        if (!isCaseSensitive) {
          text = text.toLowerCase();
        }

        // Exact match
        if (this.pattern === text) {
          let result = {
            isMatch: true,
            score: 0
          };
          if (includeMatches) {
            result.indices = [[0, text.length - 1]];
          }
          return result;
        }

        // Otherwise, use Bitap algorithm
        const {
          location,
          distance,
          threshold,
          findAllMatches,
          minMatchCharLength,
          ignoreLocation
        } = this.options;
        let allIndices = [];
        let totalScore = 0;
        let hasMatches = false;
        this.chunks.forEach(({
          pattern,
          alphabet,
          startIndex
        }) => {
          const {
            isMatch,
            score,
            indices
          } = search(text, pattern, alphabet, {
            location: location + startIndex,
            distance,
            threshold,
            findAllMatches,
            minMatchCharLength,
            includeMatches,
            ignoreLocation
          });
          if (isMatch) {
            hasMatches = true;
          }
          totalScore += score;
          if (isMatch && indices) {
            allIndices = [...allIndices, ...indices];
          }
        });
        let result = {
          isMatch: hasMatches,
          score: hasMatches ? totalScore / this.chunks.length : 1
        };
        if (hasMatches && includeMatches) {
          result.indices = allIndices;
        }
        return result;
      }
    }
    class BaseMatch {
      constructor(pattern) {
        this.pattern = pattern;
      }
      static isMultiMatch(pattern) {
        return getMatch(pattern, this.multiRegex);
      }
      static isSingleMatch(pattern) {
        return getMatch(pattern, this.singleRegex);
      }
      search( /*text*/) {}
    }
    function getMatch(pattern, exp) {
      const matches = pattern.match(exp);
      return matches ? matches[1] : null;
    }

    // Token: 'file

    class ExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'exact';
      }
      static get multiRegex() {
        return /^="(.*)"$/;
      }
      static get singleRegex() {
        return /^=(.*)$/;
      }
      search(text) {
        const isMatch = text === this.pattern;
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, this.pattern.length - 1]
        };
      }
    }

    // Token: !fire

    class InverseExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'inverse-exact';
      }
      static get multiRegex() {
        return /^!"(.*)"$/;
      }
      static get singleRegex() {
        return /^!(.*)$/;
      }
      search(text) {
        const index = text.indexOf(this.pattern);
        const isMatch = index === -1;
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }

    // Token: ^file

    class PrefixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'prefix-exact';
      }
      static get multiRegex() {
        return /^\^"(.*)"$/;
      }
      static get singleRegex() {
        return /^\^(.*)$/;
      }
      search(text) {
        const isMatch = text.startsWith(this.pattern);
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, this.pattern.length - 1]
        };
      }
    }

    // Token: !^fire

    class InversePrefixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'inverse-prefix-exact';
      }
      static get multiRegex() {
        return /^!\^"(.*)"$/;
      }
      static get singleRegex() {
        return /^!\^(.*)$/;
      }
      search(text) {
        const isMatch = !text.startsWith(this.pattern);
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }

    // Token: .file$

    class SuffixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'suffix-exact';
      }
      static get multiRegex() {
        return /^"(.*)"\$$/;
      }
      static get singleRegex() {
        return /^(.*)\$$/;
      }
      search(text) {
        const isMatch = text.endsWith(this.pattern);
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          indices: [text.length - this.pattern.length, text.length - 1]
        };
      }
    }

    // Token: !.file$

    class InverseSuffixExactMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'inverse-suffix-exact';
      }
      static get multiRegex() {
        return /^!"(.*)"\$$/;
      }
      static get singleRegex() {
        return /^!(.*)\$$/;
      }
      search(text) {
        const isMatch = !text.endsWith(this.pattern);
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          indices: [0, text.length - 1]
        };
      }
    }
    class FuzzyMatch extends BaseMatch {
      constructor(pattern, {
        location = Config.location,
        threshold = Config.threshold,
        distance = Config.distance,
        includeMatches = Config.includeMatches,
        findAllMatches = Config.findAllMatches,
        minMatchCharLength = Config.minMatchCharLength,
        isCaseSensitive = Config.isCaseSensitive,
        ignoreLocation = Config.ignoreLocation
      } = {}) {
        super(pattern);
        this._bitapSearch = new BitapSearch(pattern, {
          location,
          threshold,
          distance,
          includeMatches,
          findAllMatches,
          minMatchCharLength,
          isCaseSensitive,
          ignoreLocation
        });
      }
      static get type() {
        return 'fuzzy';
      }
      static get multiRegex() {
        return /^"(.*)"$/;
      }
      static get singleRegex() {
        return /^(.*)$/;
      }
      search(text) {
        return this._bitapSearch.searchIn(text);
      }
    }

    // Token: 'file

    class IncludeMatch extends BaseMatch {
      constructor(pattern) {
        super(pattern);
      }
      static get type() {
        return 'include';
      }
      static get multiRegex() {
        return /^'"(.*)"$/;
      }
      static get singleRegex() {
        return /^'(.*)$/;
      }
      search(text) {
        let location = 0;
        let index;
        const indices = [];
        const patternLen = this.pattern.length;

        // Get all exact matches
        while ((index = text.indexOf(this.pattern, location)) > -1) {
          location = index + patternLen;
          indices.push([index, location - 1]);
        }
        const isMatch = !!indices.length;
        return {
          isMatch,
          score: isMatch ? 0 : 1,
          indices
        };
      }
    }

    // ❗Order is important. DO NOT CHANGE.
    const searchers = [ExactMatch, IncludeMatch, PrefixExactMatch, InversePrefixExactMatch, InverseSuffixExactMatch, SuffixExactMatch, InverseExactMatch, FuzzyMatch];
    const searchersLen = searchers.length;

    // Regex to split by spaces, but keep anything in quotes together
    const SPACE_RE = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;
    const OR_TOKEN = '|';

    // Return a 2D array representation of the query, for simpler parsing.
    // Example:
    // "^core go$ | rb$ | py$ xy$" => [["^core", "go$"], ["rb$"], ["py$", "xy$"]]
    function parseQuery(pattern, options = {}) {
      return pattern.split(OR_TOKEN).map(item => {
        let query = item.trim().split(SPACE_RE).filter(item => item && !!item.trim());
        let results = [];
        for (let i = 0, len = query.length; i < len; i += 1) {
          const queryItem = query[i];

          // 1. Handle multiple query match (i.e, once that are quoted, like `"hello world"`)
          let found = false;
          let idx = -1;
          while (!found && ++idx < searchersLen) {
            const searcher = searchers[idx];
            let token = searcher.isMultiMatch(queryItem);
            if (token) {
              results.push(new searcher(token, options));
              found = true;
            }
          }
          if (found) {
            continue;
          }

          // 2. Handle single query matches (i.e, once that are *not* quoted)
          idx = -1;
          while (++idx < searchersLen) {
            const searcher = searchers[idx];
            let token = searcher.isSingleMatch(queryItem);
            if (token) {
              results.push(new searcher(token, options));
              break;
            }
          }
        }
        return results;
      });
    }

    // These extended matchers can return an array of matches, as opposed
    // to a singl match
    const MultiMatchSet = new Set([FuzzyMatch.type, IncludeMatch.type]);

    /**
     * Command-like searching
     * ======================
     *
     * Given multiple search terms delimited by spaces.e.g. `^jscript .python$ ruby !java`,
     * search in a given text.
     *
     * Search syntax:
     *
     * | Token       | Match type                 | Description                            |
     * | ----------- | -------------------------- | -------------------------------------- |
     * | `jscript`   | fuzzy-match                | Items that fuzzy match `jscript`       |
     * | `=scheme`   | exact-match                | Items that are `scheme`                |
     * | `'python`   | include-match              | Items that include `python`            |
     * | `!ruby`     | inverse-exact-match        | Items that do not include `ruby`       |
     * | `^java`     | prefix-exact-match         | Items that start with `java`           |
     * | `!^earlang` | inverse-prefix-exact-match | Items that do not start with `earlang` |
     * | `.js$`      | suffix-exact-match         | Items that end with `.js`              |
     * | `!.go$`     | inverse-suffix-exact-match | Items that do not end with `.go`       |
     *
     * A single pipe character acts as an OR operator. For example, the following
     * query matches entries that start with `core` and end with either`go`, `rb`,
     * or`py`.
     *
     * ```
     * ^core go$ | rb$ | py$
     * ```
     */
    class ExtendedSearch {
      constructor(pattern, {
        isCaseSensitive = Config.isCaseSensitive,
        includeMatches = Config.includeMatches,
        minMatchCharLength = Config.minMatchCharLength,
        ignoreLocation = Config.ignoreLocation,
        findAllMatches = Config.findAllMatches,
        location = Config.location,
        threshold = Config.threshold,
        distance = Config.distance
      } = {}) {
        this.query = null;
        this.options = {
          isCaseSensitive,
          includeMatches,
          minMatchCharLength,
          findAllMatches,
          ignoreLocation,
          location,
          threshold,
          distance
        };
        this.pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
        this.query = parseQuery(this.pattern, this.options);
      }
      static condition(_, options) {
        return options.useExtendedSearch;
      }
      searchIn(text) {
        const query = this.query;
        if (!query) {
          return {
            isMatch: false,
            score: 1
          };
        }
        const {
          includeMatches,
          isCaseSensitive
        } = this.options;
        text = isCaseSensitive ? text : text.toLowerCase();
        let numMatches = 0;
        let allIndices = [];
        let totalScore = 0;

        // ORs
        for (let i = 0, qLen = query.length; i < qLen; i += 1) {
          const searchers = query[i];

          // Reset indices
          allIndices.length = 0;
          numMatches = 0;

          // ANDs
          for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
            const searcher = searchers[j];
            const {
              isMatch,
              indices,
              score
            } = searcher.search(text);
            if (isMatch) {
              numMatches += 1;
              totalScore += score;
              if (includeMatches) {
                const type = searcher.constructor.type;
                if (MultiMatchSet.has(type)) {
                  allIndices = [...allIndices, ...indices];
                } else {
                  allIndices.push(indices);
                }
              }
            } else {
              totalScore = 0;
              numMatches = 0;
              allIndices.length = 0;
              break;
            }
          }

          // OR condition, so if TRUE, return
          if (numMatches) {
            let result = {
              isMatch: true,
              score: totalScore / numMatches
            };
            if (includeMatches) {
              result.indices = allIndices;
            }
            return result;
          }
        }

        // Nothing was matched
        return {
          isMatch: false,
          score: 1
        };
      }
    }
    const registeredSearchers = [];
    function register(...args) {
      registeredSearchers.push(...args);
    }
    function createSearcher(pattern, options) {
      for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
        let searcherClass = registeredSearchers[i];
        if (searcherClass.condition(pattern, options)) {
          return new searcherClass(pattern, options);
        }
      }
      return new BitapSearch(pattern, options);
    }
    const LogicalOperator = {
      AND: '$and',
      OR: '$or'
    };
    const KeyType = {
      PATH: '$path',
      PATTERN: '$val'
    };
    const isExpression = query => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
    const isPath = query => !!query[KeyType.PATH];
    const isLeaf = query => !isArray(query) && isObject(query) && !isExpression(query);
    const convertToExplicit = query => ({
      [LogicalOperator.AND]: Object.keys(query).map(key => ({
        [key]: query[key]
      }))
    });

    // When `auto` is `true`, the parse function will infer and initialize and add
    // the appropriate `Searcher` instance
    function parse(query, options, {
      auto = true
    } = {}) {
      const next = query => {
        let keys = Object.keys(query);
        const isQueryPath = isPath(query);
        if (!isQueryPath && keys.length > 1 && !isExpression(query)) {
          return next(convertToExplicit(query));
        }
        if (isLeaf(query)) {
          const key = isQueryPath ? query[KeyType.PATH] : keys[0];
          const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
          if (!isString(pattern)) {
            throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
          }
          const obj = {
            keyId: createKeyId(key),
            pattern
          };
          if (auto) {
            obj.searcher = createSearcher(pattern, options);
          }
          return obj;
        }
        let node = {
          children: [],
          operator: keys[0]
        };
        keys.forEach(key => {
          const value = query[key];
          if (isArray(value)) {
            value.forEach(item => {
              node.children.push(next(item));
            });
          }
        });
        return node;
      };
      if (!isExpression(query)) {
        query = convertToExplicit(query);
      }
      return next(query);
    }

    // Practical scoring function
    function computeScore(results, {
      ignoreFieldNorm = Config.ignoreFieldNorm
    }) {
      results.forEach(result => {
        let totalScore = 1;
        result.matches.forEach(({
          key,
          norm,
          score
        }) => {
          const weight = key ? key.weight : null;
          totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
        });
        result.score = totalScore;
      });
    }
    function transformMatches(result, data) {
      const matches = result.matches;
      data.matches = [];
      if (!isDefined(matches)) {
        return;
      }
      matches.forEach(match => {
        if (!isDefined(match.indices) || !match.indices.length) {
          return;
        }
        const {
          indices,
          value
        } = match;
        let obj = {
          indices,
          value
        };
        if (match.key) {
          obj.key = match.key.src;
        }
        if (match.idx > -1) {
          obj.refIndex = match.idx;
        }
        data.matches.push(obj);
      });
    }
    function transformScore(result, data) {
      data.score = result.score;
    }
    function format(results, docs, {
      includeMatches = Config.includeMatches,
      includeScore = Config.includeScore
    } = {}) {
      const transformers = [];
      if (includeMatches) transformers.push(transformMatches);
      if (includeScore) transformers.push(transformScore);
      return results.map(result => {
        const {
          idx
        } = result;
        const data = {
          item: docs[idx],
          refIndex: idx
        };
        if (transformers.length) {
          transformers.forEach(transformer => {
            transformer(result, data);
          });
        }
        return data;
      });
    }
    class Fuse {
      constructor(docs, options = {}, index) {
        this.options = _objectSpread2(_objectSpread2({}, Config), options);
        if (this.options.useExtendedSearch && !true) {
          throw new Error(EXTENDED_SEARCH_UNAVAILABLE);
        }
        this._keyStore = new KeyStore(this.options.keys);
        this.setCollection(docs, index);
      }
      setCollection(docs, index) {
        this._docs = docs;
        if (index && !(index instanceof FuseIndex)) {
          throw new Error(INCORRECT_INDEX_TYPE);
        }
        this._myIndex = index || createIndex(this.options.keys, this._docs, {
          getFn: this.options.getFn,
          fieldNormWeight: this.options.fieldNormWeight
        });
      }
      add(doc) {
        if (!isDefined(doc)) {
          return;
        }
        this._docs.push(doc);
        this._myIndex.add(doc);
      }
      remove(predicate = ( /* doc, idx */) => false) {
        const results = [];
        for (let i = 0, len = this._docs.length; i < len; i += 1) {
          const doc = this._docs[i];
          if (predicate(doc, i)) {
            this.removeAt(i);
            i -= 1;
            len -= 1;
            results.push(doc);
          }
        }
        return results;
      }
      removeAt(idx) {
        this._docs.splice(idx, 1);
        this._myIndex.removeAt(idx);
      }
      getIndex() {
        return this._myIndex;
      }
      search(query, {
        limit = -1
      } = {}) {
        const {
          includeMatches,
          includeScore,
          shouldSort,
          sortFn,
          ignoreFieldNorm
        } = this.options;
        let results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
        computeScore(results, {
          ignoreFieldNorm
        });
        if (shouldSort) {
          results.sort(sortFn);
        }
        if (isNumber(limit) && limit > -1) {
          results = results.slice(0, limit);
        }
        return format(results, this._docs, {
          includeMatches,
          includeScore
        });
      }
      _searchStringList(query) {
        const searcher = createSearcher(query, this.options);
        const {
          records
        } = this._myIndex;
        const results = [];

        // Iterate over every string in the index
        records.forEach(({
          v: text,
          i: idx,
          n: norm
        }) => {
          if (!isDefined(text)) {
            return;
          }
          const {
            isMatch,
            score,
            indices
          } = searcher.searchIn(text);
          if (isMatch) {
            results.push({
              item: text,
              idx,
              matches: [{
                score,
                value: text,
                norm,
                indices
              }]
            });
          }
        });
        return results;
      }
      _searchLogical(query) {
        const expression = parse(query, this.options);
        const evaluate = (node, item, idx) => {
          if (!node.children) {
            const {
              keyId,
              searcher
            } = node;
            const matches = this._findMatches({
              key: this._keyStore.get(keyId),
              value: this._myIndex.getValueForItemAtKeyId(item, keyId),
              searcher
            });
            if (matches && matches.length) {
              return [{
                idx,
                item,
                matches
              }];
            }
            return [];
          }
          const res = [];
          for (let i = 0, len = node.children.length; i < len; i += 1) {
            const child = node.children[i];
            const result = evaluate(child, item, idx);
            if (result.length) {
              res.push(...result);
            } else if (node.operator === LogicalOperator.AND) {
              return [];
            }
          }
          return res;
        };
        const records = this._myIndex.records;
        const resultMap = {};
        const results = [];
        records.forEach(({
          $: item,
          i: idx
        }) => {
          if (isDefined(item)) {
            let expResults = evaluate(expression, item, idx);
            if (expResults.length) {
              // Dedupe when adding
              if (!resultMap[idx]) {
                resultMap[idx] = {
                  idx,
                  item,
                  matches: []
                };
                results.push(resultMap[idx]);
              }
              expResults.forEach(({
                matches
              }) => {
                resultMap[idx].matches.push(...matches);
              });
            }
          }
        });
        return results;
      }
      _searchObjectList(query) {
        const searcher = createSearcher(query, this.options);
        const {
          keys,
          records
        } = this._myIndex;
        const results = [];

        // List is Array<Object>
        records.forEach(({
          $: item,
          i: idx
        }) => {
          if (!isDefined(item)) {
            return;
          }
          let matches = [];

          // Iterate over every key (i.e, path), and fetch the value at that key
          keys.forEach((key, keyIndex) => {
            matches.push(...this._findMatches({
              key,
              value: item[keyIndex],
              searcher
            }));
          });
          if (matches.length) {
            results.push({
              idx,
              item,
              matches
            });
          }
        });
        return results;
      }
      _findMatches({
        key,
        value,
        searcher
      }) {
        if (!isDefined(value)) {
          return [];
        }
        let matches = [];
        if (isArray(value)) {
          value.forEach(({
            v: text,
            i: idx,
            n: norm
          }) => {
            if (!isDefined(text)) {
              return;
            }
            const {
              isMatch,
              score,
              indices
            } = searcher.searchIn(text);
            if (isMatch) {
              matches.push({
                score,
                key,
                value: text,
                idx,
                norm,
                indices
              });
            }
          });
        } else {
          const {
            v: text,
            n: norm
          } = value;
          const {
            isMatch,
            score,
            indices
          } = searcher.searchIn(text);
          if (isMatch) {
            matches.push({
              score,
              key,
              value: text,
              norm,
              indices
            });
          }
        }
        return matches;
      }
    }
    Fuse.version = '7.0.0';
    Fuse.createIndex = createIndex;
    Fuse.parseIndex = parseIndex;
    Fuse.config = Config;
    {
      Fuse.parseQuery = parse;
    }
    {
      register(ExtendedSearch);
    }

    var SearchByFuse = /** @class */ (function () {
        function SearchByFuse(config) {
            this._haystack = [];
            this._fuseOptions = __assign(__assign({}, config.fuseOptions), { keys: __spreadArray([], config.searchFields, true), includeMatches: true });
        }
        SearchByFuse.prototype.index = function (data) {
            this._haystack = data;
            if (this._fuse) {
                this._fuse.setCollection(data);
            }
        };
        SearchByFuse.prototype.reset = function () {
            this._haystack = [];
            this._fuse = undefined;
        };
        SearchByFuse.prototype.isEmptyIndex = function () {
            return !this._haystack.length;
        };
        SearchByFuse.prototype.search = function (needle) {
            if (!this._fuse) {
                {
                    this._fuse = new Fuse(this._haystack, this._fuseOptions);
                }
            }
            var results = this._fuse.search(needle);
            return results.map(function (value, i) {
                return {
                    item: value.item,
                    score: value.score || 0,
                    rank: i + 1, // If value.score is used for sorting, this can create non-stable sorts!
                };
            });
        };
        return SearchByFuse;
    }());

    function getSearcher(config) {
        {
            return new SearchByFuse(config);
        }
    }

    /**
     * Helpers to create HTML elements used by Choices
     * Can be overridden by providing `callbackOnCreateTemplates` option.
     * `Choices.defaults.templates` allows access to the default template methods from `callbackOnCreateTemplates`
     */
    var isEmptyObject = function (obj) {
        // eslint-disable-next-line no-restricted-syntax
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return false;
            }
        }
        return true;
    };
    var assignCustomProperties = function (el, choice, withCustomProperties) {
        var dataset = el.dataset;
        var customProperties = choice.customProperties, labelClass = choice.labelClass, labelDescription = choice.labelDescription;
        if (labelClass) {
            dataset.labelClass = getClassNames(labelClass).join(' ');
        }
        if (labelDescription) {
            dataset.labelDescription = labelDescription;
        }
        if (withCustomProperties && customProperties) {
            if (typeof customProperties === 'string') {
                dataset.customProperties = customProperties;
            }
            else if (typeof customProperties === 'object' && !isEmptyObject(customProperties)) {
                dataset.customProperties = JSON.stringify(customProperties);
            }
        }
    };
    var addAriaLabel = function (docRoot, id, element) {
        var label = id && docRoot.querySelector("label[for='".concat(id, "']"));
        var text = label && label.innerText;
        if (text) {
            element.setAttribute('aria-label', text);
        }
    };
    var templates = {
        containerOuter: function (_a, dir, isSelectElement, isSelectOneElement, searchEnabled, passedElementType, labelId) {
            var containerOuter = _a.classNames.containerOuter;
            var div = document.createElement('div');
            addClassesToElement(div, containerOuter);
            div.dataset.type = passedElementType;
            if (dir) {
                div.dir = dir;
            }
            if (isSelectOneElement) {
                div.tabIndex = 0;
            }
            if (isSelectElement) {
                div.setAttribute('role', searchEnabled ? 'combobox' : 'listbox');
                if (searchEnabled) {
                    div.setAttribute('aria-autocomplete', 'list');
                }
                else if (!labelId) {
                    addAriaLabel(this._docRoot, this.passedElement.element.id, div);
                }
                div.setAttribute('aria-haspopup', 'true');
                div.setAttribute('aria-expanded', 'false');
            }
            if (labelId) {
                div.setAttribute('aria-labelledby', labelId);
            }
            return div;
        },
        containerInner: function (_a) {
            var containerInner = _a.classNames.containerInner;
            var div = document.createElement('div');
            addClassesToElement(div, containerInner);
            return div;
        },
        itemList: function (_a, isSelectOneElement) {
            var searchEnabled = _a.searchEnabled, _b = _a.classNames, list = _b.list, listSingle = _b.listSingle, listItems = _b.listItems;
            var div = document.createElement('div');
            addClassesToElement(div, list);
            addClassesToElement(div, isSelectOneElement ? listSingle : listItems);
            if (this._isSelectElement && searchEnabled) {
                div.setAttribute('role', 'listbox');
            }
            return div;
        },
        placeholder: function (_a, value) {
            var allowHTML = _a.allowHTML, placeholder = _a.classNames.placeholder;
            var div = document.createElement('div');
            addClassesToElement(div, placeholder);
            setElementHtml(div, allowHTML, value);
            return div;
        },
        item: function (_a, choice, removeItemButton) {
            var allowHTML = _a.allowHTML, removeItemButtonAlignLeft = _a.removeItemButtonAlignLeft, removeItemIconText = _a.removeItemIconText, removeItemLabelText = _a.removeItemLabelText, _b = _a.classNames, item = _b.item, button = _b.button, highlightedState = _b.highlightedState, itemSelectable = _b.itemSelectable, placeholder = _b.placeholder;
            var rawValue = unwrapStringForRaw(choice.value);
            var div = document.createElement('div');
            addClassesToElement(div, item);
            if (choice.labelClass) {
                var spanLabel = document.createElement('span');
                setElementHtml(spanLabel, allowHTML, choice.label);
                addClassesToElement(spanLabel, choice.labelClass);
                div.appendChild(spanLabel);
            }
            else {
                setElementHtml(div, allowHTML, choice.label);
            }
            div.dataset.item = '';
            div.dataset.id = choice.id;
            div.dataset.value = rawValue;
            assignCustomProperties(div, choice, true);
            if (choice.disabled || this.containerOuter.isDisabled) {
                div.setAttribute('aria-disabled', 'true');
            }
            if (this._isSelectElement) {
                div.setAttribute('aria-selected', 'true');
                div.setAttribute('role', 'option');
            }
            if (choice.placeholder) {
                addClassesToElement(div, placeholder);
                div.dataset.placeholder = '';
            }
            addClassesToElement(div, choice.highlighted ? highlightedState : itemSelectable);
            if (removeItemButton) {
                if (choice.disabled) {
                    removeClassesFromElement(div, itemSelectable);
                }
                div.dataset.deletable = '';
                var removeButton = document.createElement('button');
                removeButton.type = 'button';
                addClassesToElement(removeButton, button);
                setElementHtml(removeButton, true, resolveNoticeFunction(removeItemIconText, choice.value));
                var REMOVE_ITEM_LABEL = resolveNoticeFunction(removeItemLabelText, choice.value);
                if (REMOVE_ITEM_LABEL) {
                    removeButton.setAttribute('aria-label', REMOVE_ITEM_LABEL);
                }
                removeButton.dataset.button = '';
                if (removeItemButtonAlignLeft) {
                    div.insertAdjacentElement('afterbegin', removeButton);
                }
                else {
                    div.appendChild(removeButton);
                }
            }
            return div;
        },
        choiceList: function (_a, isSelectOneElement) {
            var list = _a.classNames.list;
            var div = document.createElement('div');
            addClassesToElement(div, list);
            if (!isSelectOneElement) {
                div.setAttribute('aria-multiselectable', 'true');
            }
            div.setAttribute('role', 'listbox');
            return div;
        },
        choiceGroup: function (_a, _b) {
            var allowHTML = _a.allowHTML, _c = _a.classNames, group = _c.group, groupHeading = _c.groupHeading, itemDisabled = _c.itemDisabled;
            var id = _b.id, label = _b.label, disabled = _b.disabled;
            var rawLabel = unwrapStringForRaw(label);
            var div = document.createElement('div');
            addClassesToElement(div, group);
            if (disabled) {
                addClassesToElement(div, itemDisabled);
            }
            div.setAttribute('role', 'group');
            div.dataset.group = '';
            div.dataset.id = id;
            div.dataset.value = rawLabel;
            if (disabled) {
                div.setAttribute('aria-disabled', 'true');
            }
            var heading = document.createElement('div');
            addClassesToElement(heading, groupHeading);
            setElementHtml(heading, allowHTML, label || '');
            div.appendChild(heading);
            return div;
        },
        choice: function (_a, choice, selectText, groupName) {
            var allowHTML = _a.allowHTML, _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, itemSelectable = _b.itemSelectable, selectedState = _b.selectedState, itemDisabled = _b.itemDisabled, description = _b.description, placeholder = _b.placeholder;
            // eslint-disable-next-line prefer-destructuring
            var label = choice.label;
            var rawValue = unwrapStringForRaw(choice.value);
            var div = document.createElement('div');
            div.id = choice.elementId;
            addClassesToElement(div, item);
            addClassesToElement(div, itemChoice);
            if (groupName && typeof label === 'string') {
                label = escapeForTemplate(allowHTML, label);
                label += " (".concat(groupName, ")");
                label = { trusted: label };
            }
            var describedBy = div;
            if (choice.labelClass) {
                var spanLabel = document.createElement('span');
                setElementHtml(spanLabel, allowHTML, label);
                addClassesToElement(spanLabel, choice.labelClass);
                describedBy = spanLabel;
                div.appendChild(spanLabel);
            }
            else {
                setElementHtml(div, allowHTML, label);
            }
            if (choice.labelDescription) {
                var descId = "".concat(choice.elementId, "-description");
                describedBy.setAttribute('aria-describedby', descId);
                var spanDesc = document.createElement('span');
                setElementHtml(spanDesc, allowHTML, choice.labelDescription);
                spanDesc.id = descId;
                addClassesToElement(spanDesc, description);
                div.appendChild(spanDesc);
            }
            if (choice.selected) {
                addClassesToElement(div, selectedState);
            }
            if (choice.placeholder) {
                addClassesToElement(div, placeholder);
            }
            div.setAttribute('role', choice.group ? 'treeitem' : 'option');
            div.dataset.choice = '';
            div.dataset.id = choice.id;
            div.dataset.value = rawValue;
            if (selectText) {
                div.dataset.selectText = selectText;
            }
            if (choice.group) {
                div.dataset.groupId = "".concat(choice.group.id);
            }
            assignCustomProperties(div, choice, false);
            if (choice.disabled) {
                addClassesToElement(div, itemDisabled);
                div.dataset.choiceDisabled = '';
                div.setAttribute('aria-disabled', 'true');
            }
            else {
                addClassesToElement(div, itemSelectable);
                div.dataset.choiceSelectable = '';
            }
            return div;
        },
        input: function (_a, placeholderValue) {
            var _b = _a.classNames, input = _b.input, inputCloned = _b.inputCloned, labelId = _a.labelId;
            var inp = document.createElement('input');
            inp.type = 'search';
            addClassesToElement(inp, input);
            addClassesToElement(inp, inputCloned);
            inp.autocomplete = 'off';
            inp.autocapitalize = 'off';
            inp.spellcheck = false;
            inp.setAttribute('role', 'textbox');
            inp.setAttribute('aria-autocomplete', 'list');
            if (placeholderValue) {
                inp.setAttribute('aria-label', placeholderValue);
            }
            else if (!labelId) {
                addAriaLabel(this._docRoot, this.passedElement.element.id, inp);
            }
            return inp;
        },
        dropdown: function (_a) {
            var _b = _a.classNames, list = _b.list, listDropdown = _b.listDropdown;
            var div = document.createElement('div');
            addClassesToElement(div, list);
            addClassesToElement(div, listDropdown);
            div.setAttribute('aria-expanded', 'false');
            return div;
        },
        notice: function (_a, innerHTML, type) {
            var _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, addChoice = _b.addChoice, noResults = _b.noResults, noChoices = _b.noChoices, noticeItem = _b.notice;
            if (type === void 0) { type = NoticeTypes.generic; }
            var notice = document.createElement('div');
            setElementHtml(notice, true, innerHTML);
            addClassesToElement(notice, item);
            addClassesToElement(notice, itemChoice);
            addClassesToElement(notice, noticeItem);
            // eslint-disable-next-line default-case
            switch (type) {
                case NoticeTypes.addChoice:
                    addClassesToElement(notice, addChoice);
                    break;
                case NoticeTypes.noResults:
                    addClassesToElement(notice, noResults);
                    break;
                case NoticeTypes.noChoices:
                    addClassesToElement(notice, noChoices);
                    break;
            }
            if (type === NoticeTypes.addChoice) {
                notice.dataset.choiceSelectable = '';
                notice.dataset.choice = '';
            }
            return notice;
        },
        option: function (choice) {
            // HtmlOptionElement's label value does not support HTML, so the avoid double escaping unwrap the untrusted string.
            var labelValue = unwrapStringForRaw(choice.label);
            var opt = new Option(labelValue, choice.value, false, choice.selected);
            assignCustomProperties(opt, choice, true);
            opt.disabled = choice.disabled;
            if (choice.selected) {
                opt.setAttribute('selected', '');
            }
            return opt;
        },
    };

    /** @see {@link http://browserhacks.com/#hack-acea075d0ac6954f275a70023906050c} */
    var IS_IE11 = '-ms-scroll-limit' in document.documentElement.style &&
        '-ms-ime-align' in document.documentElement.style;
    var USER_DEFAULTS = {};
    var parseDataSetId = function (element) {
        if (!element) {
            return undefined;
        }
        return element.dataset.id ? parseInt(element.dataset.id, 10) : undefined;
    };
    var selectableChoiceIdentifier = '[data-choice-selectable]';
    /**
     * Choices
     * @author Josh Johnson<josh@joshuajohnson.co.uk>
     */
    var Choices = /** @class */ (function () {
        function Choices(element, userConfig) {
            if (element === void 0) { element = '[data-choice]'; }
            if (userConfig === void 0) { userConfig = {}; }
            var _this = this;
            this.initialisedOK = undefined;
            this._hasNonChoicePlaceholder = false;
            this._lastAddedChoiceId = 0;
            this._lastAddedGroupId = 0;
            var defaults = Choices.defaults;
            this.config = __assign(__assign(__assign({}, defaults.allOptions), defaults.options), userConfig);
            ObjectsInConfig.forEach(function (key) {
                _this.config[key] = __assign(__assign(__assign({}, defaults.allOptions[key]), defaults.options[key]), userConfig[key]);
            });
            var config = this.config;
            if (!config.silent) {
                this._validateConfig();
            }
            var docRoot = config.shadowRoot || document.documentElement;
            this._docRoot = docRoot;
            var passedElement = typeof element === 'string' ? docRoot.querySelector(element) : element;
            if (!passedElement ||
                typeof passedElement !== 'object' ||
                !(isHtmlInputElement(passedElement) || isHtmlSelectElement(passedElement))) {
                if (!passedElement && typeof element === 'string') {
                    throw TypeError("Selector ".concat(element, " failed to find an element"));
                }
                throw TypeError("Expected one of the following types text|select-one|select-multiple");
            }
            var elementType = passedElement.type;
            var isText = elementType === PassedElementTypes.Text;
            if (isText || config.maxItemCount !== 1) {
                config.singleModeForMultiSelect = false;
            }
            if (config.singleModeForMultiSelect) {
                elementType = PassedElementTypes.SelectMultiple;
            }
            var isSelectOne = elementType === PassedElementTypes.SelectOne;
            var isSelectMultiple = elementType === PassedElementTypes.SelectMultiple;
            var isSelect = isSelectOne || isSelectMultiple;
            this._elementType = elementType;
            this._isTextElement = isText;
            this._isSelectOneElement = isSelectOne;
            this._isSelectMultipleElement = isSelectMultiple;
            this._isSelectElement = isSelectOne || isSelectMultiple;
            this._canAddUserChoices = (isText && config.addItems) || (isSelect && config.addChoices);
            if (typeof config.renderSelectedChoices !== 'boolean') {
                config.renderSelectedChoices = config.renderSelectedChoices === 'always' || isSelectOne;
            }
            if (config.closeDropdownOnSelect === 'auto') {
                config.closeDropdownOnSelect = isText || isSelectOne || config.singleModeForMultiSelect;
            }
            else {
                config.closeDropdownOnSelect = coerceBool(config.closeDropdownOnSelect);
            }
            if (config.placeholder) {
                if (config.placeholderValue) {
                    this._hasNonChoicePlaceholder = true;
                }
                else if (passedElement.dataset.placeholder) {
                    this._hasNonChoicePlaceholder = true;
                    config.placeholderValue = passedElement.dataset.placeholder;
                }
            }
            if (userConfig.addItemFilter && typeof userConfig.addItemFilter !== 'function') {
                var re = userConfig.addItemFilter instanceof RegExp ? userConfig.addItemFilter : new RegExp(userConfig.addItemFilter);
                config.addItemFilter = re.test.bind(re);
            }
            if (this._isTextElement) {
                this.passedElement = new WrappedInput({
                    element: passedElement,
                    classNames: config.classNames,
                });
            }
            else {
                var selectEl = passedElement;
                this.passedElement = new WrappedSelect({
                    element: selectEl,
                    classNames: config.classNames,
                    template: function (data) { return _this._templates.option(data); },
                    extractPlaceholder: config.placeholder && !this._hasNonChoicePlaceholder,
                });
            }
            this.initialised = false;
            this._store = new Store(config);
            this._currentValue = '';
            config.searchEnabled = (!isText && config.searchEnabled) || isSelectMultiple;
            this._canSearch = config.searchEnabled;
            this._isScrollingOnIe = false;
            this._highlightPosition = 0;
            this._wasTap = true;
            this._placeholderValue = this._generatePlaceholderValue();
            this._baseId = generateId(passedElement, 'choices-');
            /**
             * setting direction in cases where it's explicitly set on passedElement
             * or when calculated direction is different from the document
             */
            this._direction = passedElement.dir;
            if (!this._direction) {
                var elementDirection = window.getComputedStyle(passedElement).direction;
                var documentDirection = window.getComputedStyle(document.documentElement).direction;
                if (elementDirection !== documentDirection) {
                    this._direction = elementDirection;
                }
            }
            this._idNames = {
                itemChoice: 'item-choice',
            };
            this._templates = defaults.templates;
            this._render = this._render.bind(this);
            this._onFocus = this._onFocus.bind(this);
            this._onBlur = this._onBlur.bind(this);
            this._onKeyUp = this._onKeyUp.bind(this);
            this._onKeyDown = this._onKeyDown.bind(this);
            this._onInput = this._onInput.bind(this);
            this._onClick = this._onClick.bind(this);
            this._onTouchMove = this._onTouchMove.bind(this);
            this._onTouchEnd = this._onTouchEnd.bind(this);
            this._onMouseDown = this._onMouseDown.bind(this);
            this._onMouseOver = this._onMouseOver.bind(this);
            this._onFormReset = this._onFormReset.bind(this);
            this._onSelectKey = this._onSelectKey.bind(this);
            this._onEnterKey = this._onEnterKey.bind(this);
            this._onEscapeKey = this._onEscapeKey.bind(this);
            this._onDirectionKey = this._onDirectionKey.bind(this);
            this._onDeleteKey = this._onDeleteKey.bind(this);
            // If element has already been initialised with Choices, fail silently
            if (this.passedElement.isActive) {
                if (!config.silent) {
                    console.warn('Trying to initialise Choices on element already initialised', { element: element });
                }
                this.initialised = true;
                this.initialisedOK = false;
                return;
            }
            // Let's go
            this.init();
            // preserve the selected item list after setup for form reset
            this._initialItems = this._store.items.map(function (choice) { return choice.value; });
        }
        Object.defineProperty(Choices, "defaults", {
            get: function () {
                return Object.preventExtensions({
                    get options() {
                        return USER_DEFAULTS;
                    },
                    get allOptions() {
                        return DEFAULT_CONFIG;
                    },
                    get templates() {
                        return templates;
                    },
                });
            },
            enumerable: false,
            configurable: true
        });
        Choices.prototype.init = function () {
            if (this.initialised || this.initialisedOK !== undefined) {
                return;
            }
            this._searcher = getSearcher(this.config);
            this._loadChoices();
            this._createTemplates();
            this._createElements();
            this._createStructure();
            if ((this._isTextElement && !this.config.addItems) ||
                this.passedElement.element.hasAttribute('disabled') ||
                !!this.passedElement.element.closest('fieldset:disabled')) {
                this.disable();
            }
            else {
                this.enable();
                this._addEventListeners();
            }
            // should be triggered **after** disabled state to avoid additional re-draws
            this._initStore();
            this.initialised = true;
            this.initialisedOK = true;
            var callbackOnInit = this.config.callbackOnInit;
            // Run callback if it is a function
            if (typeof callbackOnInit === 'function') {
                callbackOnInit.call(this);
            }
        };
        Choices.prototype.destroy = function () {
            if (!this.initialised) {
                return;
            }
            this._removeEventListeners();
            this.passedElement.reveal();
            this.containerOuter.unwrap(this.passedElement.element);
            this._store._listeners = []; // prevents select/input value being wiped
            this.clearStore(false);
            this._stopSearch();
            this._templates = Choices.defaults.templates;
            this.initialised = false;
            this.initialisedOK = undefined;
        };
        Choices.prototype.enable = function () {
            if (this.passedElement.isDisabled) {
                this.passedElement.enable();
            }
            if (this.containerOuter.isDisabled) {
                this._addEventListeners();
                this.input.enable();
                this.containerOuter.enable();
            }
            return this;
        };
        Choices.prototype.disable = function () {
            if (!this.passedElement.isDisabled) {
                this.passedElement.disable();
            }
            if (!this.containerOuter.isDisabled) {
                this._removeEventListeners();
                this.input.disable();
                this.containerOuter.disable();
            }
            return this;
        };
        Choices.prototype.highlightItem = function (item, runEvent) {
            if (runEvent === void 0) { runEvent = true; }
            if (!item || !item.id) {
                return this;
            }
            var choice = this._store.items.find(function (c) { return c.id === item.id; });
            if (!choice || choice.highlighted) {
                return this;
            }
            this._store.dispatch(highlightItem(choice, true));
            if (runEvent) {
                this.passedElement.triggerEvent(EventType.highlightItem, this._getChoiceForOutput(choice));
            }
            return this;
        };
        Choices.prototype.unhighlightItem = function (item, runEvent) {
            if (runEvent === void 0) { runEvent = true; }
            if (!item || !item.id) {
                return this;
            }
            var choice = this._store.items.find(function (c) { return c.id === item.id; });
            if (!choice || !choice.highlighted) {
                return this;
            }
            this._store.dispatch(highlightItem(choice, false));
            if (runEvent) {
                this.passedElement.triggerEvent(EventType.unhighlightItem, this._getChoiceForOutput(choice));
            }
            return this;
        };
        Choices.prototype.highlightAll = function () {
            var _this = this;
            this._store.withTxn(function () {
                _this._store.items.forEach(function (item) {
                    if (!item.highlighted) {
                        _this._store.dispatch(highlightItem(item, true));
                        _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
                    }
                });
            });
            return this;
        };
        Choices.prototype.unhighlightAll = function () {
            var _this = this;
            this._store.withTxn(function () {
                _this._store.items.forEach(function (item) {
                    if (item.highlighted) {
                        _this._store.dispatch(highlightItem(item, false));
                        _this.passedElement.triggerEvent(EventType.highlightItem, _this._getChoiceForOutput(item));
                    }
                });
            });
            return this;
        };
        Choices.prototype.removeActiveItemsByValue = function (value) {
            var _this = this;
            this._store.withTxn(function () {
                _this._store.items.filter(function (item) { return item.value === value; }).forEach(function (item) { return _this._removeItem(item); });
            });
            return this;
        };
        Choices.prototype.removeActiveItems = function (excludedId) {
            var _this = this;
            this._store.withTxn(function () {
                _this._store.items.filter(function (_a) {
                    var id = _a.id;
                    return id !== excludedId;
                }).forEach(function (item) { return _this._removeItem(item); });
            });
            return this;
        };
        Choices.prototype.removeHighlightedItems = function (runEvent) {
            var _this = this;
            if (runEvent === void 0) { runEvent = false; }
            this._store.withTxn(function () {
                _this._store.highlightedActiveItems.forEach(function (item) {
                    _this._removeItem(item);
                    // If this action was performed by the user
                    // trigger the event
                    if (runEvent) {
                        _this._triggerChange(item.value);
                    }
                });
            });
            return this;
        };
        Choices.prototype.showDropdown = function (preventInputFocus) {
            var _this = this;
            if (this.dropdown.isActive) {
                return this;
            }
            requestAnimationFrame(function () {
                _this.dropdown.show();
                var rect = _this.dropdown.element.getBoundingClientRect();
                _this.containerOuter.open(rect.bottom, rect.height);
                if (!preventInputFocus && _this._canSearch) {
                    _this.input.focus();
                }
                _this.passedElement.triggerEvent(EventType.showDropdown);
            });
            return this;
        };
        Choices.prototype.hideDropdown = function (preventInputBlur) {
            var _this = this;
            if (!this.dropdown.isActive) {
                return this;
            }
            requestAnimationFrame(function () {
                _this.dropdown.hide();
                _this.containerOuter.close();
                if (!preventInputBlur && _this._canSearch) {
                    _this.input.removeActiveDescendant();
                    _this.input.blur();
                }
                _this.passedElement.triggerEvent(EventType.hideDropdown);
            });
            return this;
        };
        Choices.prototype.getValue = function (valueOnly) {
            var _this = this;
            var values = this._store.items.map(function (item) {
                return (valueOnly ? item.value : _this._getChoiceForOutput(item));
            });
            return this._isSelectOneElement || this.config.singleModeForMultiSelect ? values[0] : values;
        };
        Choices.prototype.setValue = function (items) {
            var _this = this;
            if (!this.initialisedOK) {
                this._warnChoicesInitFailed('setValue');
                return this;
            }
            this._store.withTxn(function () {
                items.forEach(function (value) {
                    if (value) {
                        _this._addChoice(mapInputToChoice(value, false));
                    }
                });
            });
            // @todo integrate with Store
            this._searcher.reset();
            return this;
        };
        Choices.prototype.setChoiceByValue = function (value) {
            var _this = this;
            if (!this.initialisedOK) {
                this._warnChoicesInitFailed('setChoiceByValue');
                return this;
            }
            if (this._isTextElement) {
                return this;
            }
            this._store.withTxn(function () {
                // If only one value has been passed, convert to array
                var choiceValue = Array.isArray(value) ? value : [value];
                // Loop through each value and
                choiceValue.forEach(function (val) { return _this._findAndSelectChoiceByValue(val); });
                _this.unhighlightAll();
            });
            // @todo integrate with Store
            this._searcher.reset();
            return this;
        };
        /**
         * Set choices of select input via an array of objects (or function that returns array of object or promise of it),
         * a value field name and a label field name.
         * This behaves the same as passing items via the choices option but can be called after initialising Choices.
         * This can also be used to add groups of choices (see example 2); Optionally pass a true `replaceChoices` value to remove any existing choices.
         * Optionally pass a `customProperties` object to add additional data to your choices (useful when searching/filtering etc).
         *
         * **Input types affected:** select-one, select-multiple
         *
         * @example
         * ```js
         * const example = new Choices(element);
         *
         * example.setChoices([
         *   {value: 'One', label: 'Label One', disabled: true},
         *   {value: 'Two', label: 'Label Two', selected: true},
         *   {value: 'Three', label: 'Label Three'},
         * ], 'value', 'label', false);
         * ```
         *
         * @example
         * ```js
         * const example = new Choices(element);
         *
         * example.setChoices(async () => {
         *   try {
         *      const items = await fetch('/items');
         *      return items.json()
         *   } catch(err) {
         *      console.error(err)
         *   }
         * });
         * ```
         *
         * @example
         * ```js
         * const example = new Choices(element);
         *
         * example.setChoices([{
         *   label: 'Group one',
         *   id: 1,
         *   disabled: false,
         *   choices: [
         *     {value: 'Child One', label: 'Child One', selected: true},
         *     {value: 'Child Two', label: 'Child Two',  disabled: true},
         *     {value: 'Child Three', label: 'Child Three'},
         *   ]
         * },
         * {
         *   label: 'Group two',
         *   id: 2,
         *   disabled: false,
         *   choices: [
         *     {value: 'Child Four', label: 'Child Four', disabled: true},
         *     {value: 'Child Five', label: 'Child Five'},
         *     {value: 'Child Six', label: 'Child Six', customProperties: {
         *       description: 'Custom description about child six',
         *       random: 'Another random custom property'
         *     }},
         *   ]
         * }], 'value', 'label', false);
         * ```
         */
        Choices.prototype.setChoices = function (choicesArrayOrFetcher, value, label, replaceChoices, clearSearchFlag) {
            var _this = this;
            if (choicesArrayOrFetcher === void 0) { choicesArrayOrFetcher = []; }
            if (value === void 0) { value = 'value'; }
            if (label === void 0) { label = 'label'; }
            if (replaceChoices === void 0) { replaceChoices = false; }
            if (clearSearchFlag === void 0) { clearSearchFlag = true; }
            if (!this.initialisedOK) {
                this._warnChoicesInitFailed('setChoices');
                return this;
            }
            if (!this._isSelectElement) {
                throw new TypeError("setChoices can't be used with INPUT based Choices");
            }
            if (typeof value !== 'string' || !value) {
                throw new TypeError("value parameter must be a name of 'value' field in passed objects");
            }
            // Clear choices if needed
            if (replaceChoices) {
                this.clearChoices();
            }
            if (typeof choicesArrayOrFetcher === 'function') {
                // it's a choices fetcher function
                var fetcher_1 = choicesArrayOrFetcher(this);
                if (typeof Promise === 'function' && fetcher_1 instanceof Promise) {
                    // that's a promise
                    // eslint-disable-next-line no-promise-executor-return
                    return new Promise(function (resolve) { return requestAnimationFrame(resolve); })
                        .then(function () { return _this._handleLoadingState(true); })
                        .then(function () { return fetcher_1; })
                        .then(function (data) { return _this.setChoices(data, value, label, replaceChoices); })
                        .catch(function (err) {
                        if (!_this.config.silent) {
                            console.error(err);
                        }
                    })
                        .then(function () { return _this._handleLoadingState(false); })
                        .then(function () { return _this; });
                }
                // function returned something else than promise, let's check if it's an array of choices
                if (!Array.isArray(fetcher_1)) {
                    throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: ".concat(typeof fetcher_1));
                }
                // recursion with results, it's sync and choices were cleared already
                return this.setChoices(fetcher_1, value, label, false);
            }
            if (!Array.isArray(choicesArrayOrFetcher)) {
                throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
            }
            this.containerOuter.removeLoadingState();
            this._store.withTxn(function () {
                if (clearSearchFlag) {
                    _this._isSearching = false;
                }
                var isDefaultValue = value === 'value';
                var isDefaultLabel = label === 'label';
                choicesArrayOrFetcher.forEach(function (groupOrChoice) {
                    if ('choices' in groupOrChoice) {
                        var group = groupOrChoice;
                        if (!isDefaultLabel) {
                            group = __assign(__assign({}, group), { label: group[label] });
                        }
                        _this._addGroup(mapInputToChoice(group, true));
                    }
                    else {
                        var choice = groupOrChoice;
                        if (!isDefaultLabel || !isDefaultValue) {
                            choice = __assign(__assign({}, choice), { value: choice[value], label: choice[label] });
                        }
                        _this._addChoice(mapInputToChoice(choice, false));
                    }
                });
                _this.unhighlightAll();
            });
            // @todo integrate with Store
            this._searcher.reset();
            return this;
        };
        Choices.prototype.refresh = function (withEvents, selectFirstOption, deselectAll) {
            var _this = this;
            if (withEvents === void 0) { withEvents = false; }
            if (selectFirstOption === void 0) { selectFirstOption = false; }
            if (deselectAll === void 0) { deselectAll = false; }
            if (!this._isSelectElement) {
                if (!this.config.silent) {
                    console.warn('refresh method can only be used on choices backed by a <select> element');
                }
                return this;
            }
            this._store.withTxn(function () {
                var choicesFromOptions = _this.passedElement.optionsAsChoices();
                // Build the list of items which require preserving
                var existingItems = {};
                if (!deselectAll) {
                    _this._store.items.forEach(function (choice) {
                        if (choice.id && choice.active && choice.selected && !choice.disabled) {
                            existingItems[choice.value] = true;
                        }
                    });
                }
                _this.clearStore(false);
                var updateChoice = function (choice) {
                    if (deselectAll) {
                        _this._store.dispatch(removeItem$1(choice));
                    }
                    else if (existingItems[choice.value]) {
                        choice.selected = true;
                    }
                };
                choicesFromOptions.forEach(function (groupOrChoice) {
                    if ('choices' in groupOrChoice) {
                        groupOrChoice.choices.forEach(updateChoice);
                        return;
                    }
                    updateChoice(groupOrChoice);
                });
                /* @todo only generate add events for the added options instead of all
                if (withEvents) {
                  items.forEach((choice) => {
                    if (existingItems[choice.value]) {
                      this.passedElement.triggerEvent(
                        EventType.removeItem,
                        this._getChoiceForEvent(choice),
                      );
                    }
                  });
                }
                */
                // load new choices & items
                _this._addPredefinedChoices(choicesFromOptions, selectFirstOption, withEvents);
                // re-do search if required
                if (_this._isSearching) {
                    _this._searchChoices(_this.input.value);
                }
            });
            return this;
        };
        Choices.prototype.removeChoice = function (value) {
            var choice = this._store.choices.find(function (c) { return c.value === value; });
            if (!choice) {
                return this;
            }
            this._clearNotice();
            this._store.dispatch(removeChoice(choice));
            // @todo integrate with Store
            this._searcher.reset();
            if (choice.selected) {
                this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(choice));
            }
            return this;
        };
        Choices.prototype.clearChoices = function () {
            var _this = this;
            this._store.withTxn(function () {
                _this._store.choices.forEach(function (choice) {
                    if (!choice.selected) {
                        _this._store.dispatch(removeChoice(choice));
                    }
                });
            });
            // @todo integrate with Store
            this._searcher.reset();
            return this;
        };
        Choices.prototype.clearStore = function (clearOptions) {
            if (clearOptions === void 0) { clearOptions = true; }
            this._stopSearch();
            if (clearOptions) {
                this.passedElement.element.replaceChildren('');
            }
            this.itemList.element.replaceChildren('');
            this.choiceList.element.replaceChildren('');
            this._store.reset();
            this._lastAddedChoiceId = 0;
            this._lastAddedGroupId = 0;
            // @todo integrate with Store
            this._searcher.reset();
            return this;
        };
        Choices.prototype.clearInput = function () {
            var shouldSetInputWidth = !this._isSelectOneElement;
            this.input.clear(shouldSetInputWidth);
            this._stopSearch();
            return this;
        };
        Choices.prototype._validateConfig = function () {
            var config = this.config;
            var invalidConfigOptions = diff(config, DEFAULT_CONFIG);
            if (invalidConfigOptions.length) {
                console.warn('Unknown config option(s) passed', invalidConfigOptions.join(', '));
            }
            if (config.allowHTML && config.allowHtmlUserInput) {
                if (config.addItems) {
                    console.warn('Warning: allowHTML/allowHtmlUserInput/addItems all being true is strongly not recommended and may lead to XSS attacks');
                }
                if (config.addChoices) {
                    console.warn('Warning: allowHTML/allowHtmlUserInput/addChoices all being true is strongly not recommended and may lead to XSS attacks');
                }
            }
        };
        Choices.prototype._render = function (changes) {
            if (changes === void 0) { changes = { choices: true, groups: true, items: true }; }
            if (this._store.inTxn()) {
                return;
            }
            if (this._isSelectElement) {
                if (changes.choices || changes.groups) {
                    this._renderChoices();
                }
            }
            if (changes.items) {
                this._renderItems();
            }
        };
        Choices.prototype._renderChoices = function () {
            var _this = this;
            if (!this._canAddItems()) {
                return; // block rendering choices if the input limit is reached.
            }
            var _a = this, config = _a.config, isSearching = _a._isSearching;
            var _b = this._store, activeGroups = _b.activeGroups, activeChoices = _b.activeChoices;
            var renderLimit = 0;
            if (isSearching && config.searchResultLimit > 0) {
                renderLimit = config.searchResultLimit;
            }
            else if (config.renderChoiceLimit > 0) {
                renderLimit = config.renderChoiceLimit;
            }
            if (this._isSelectElement) {
                var backingOptions = activeChoices.filter(function (choice) { return !choice.element; });
                if (backingOptions.length) {
                    this.passedElement.addOptions(backingOptions);
                }
            }
            var fragment = document.createDocumentFragment();
            var renderableChoices = function (choices) {
                return choices.filter(function (choice) {
                    return !choice.placeholder && (isSearching ? !!choice.rank : config.renderSelectedChoices || !choice.selected);
                });
            };
            var selectableChoices = false;
            var renderChoices = function (choices, withinGroup, groupLabel) {
                if (isSearching) {
                    // sortByRank is used to ensure stable sorting, as scores are non-unique
                    // this additionally ensures fuseOptions.sortFn is not ignored
                    choices.sort(sortByRank);
                }
                else if (config.shouldSort) {
                    choices.sort(config.sorter);
                }
                var choiceLimit = choices.length;
                choiceLimit = !withinGroup && renderLimit && choiceLimit > renderLimit ? renderLimit : choiceLimit;
                choiceLimit--;
                choices.every(function (choice, index) {
                    // choiceEl being empty signals the contents has probably significantly changed
                    var dropdownItem = choice.choiceEl || _this._templates.choice(config, choice, config.itemSelectText, groupLabel);
                    choice.choiceEl = dropdownItem;
                    fragment.appendChild(dropdownItem);
                    if (!choice.disabled && (isSearching || !choice.selected)) {
                        selectableChoices = true;
                    }
                    return index < choiceLimit;
                });
            };
            if (activeChoices.length) {
                if (config.resetScrollPosition) {
                    requestAnimationFrame(function () { return _this.choiceList.scrollToTop(); });
                }
                if (!this._hasNonChoicePlaceholder && !isSearching && this._isSelectOneElement) {
                    // If we have a placeholder choice along with groups
                    renderChoices(activeChoices.filter(function (choice) { return choice.placeholder && !choice.group; }), false, undefined);
                }
                // If we have grouped options
                if (activeGroups.length && !isSearching) {
                    if (config.shouldSort) {
                        activeGroups.sort(config.sorter);
                    }
                    // render Choices without group first, regardless of sort, otherwise they won't be distinguishable
                    // from the last group
                    renderChoices(activeChoices.filter(function (choice) { return !choice.placeholder && !choice.group; }), false, undefined);
                    activeGroups.forEach(function (group) {
                        var groupChoices = renderableChoices(group.choices);
                        if (groupChoices.length) {
                            if (group.label) {
                                var dropdownGroup = group.groupEl || _this._templates.choiceGroup(_this.config, group);
                                group.groupEl = dropdownGroup;
                                dropdownGroup.remove();
                                fragment.appendChild(dropdownGroup);
                            }
                            renderChoices(groupChoices, true, config.appendGroupInSearch && isSearching ? group.label : undefined);
                        }
                    });
                }
                else {
                    renderChoices(renderableChoices(activeChoices), false, undefined);
                }
            }
            if (!selectableChoices) {
                if (!this._notice) {
                    this._notice = {
                        text: resolveStringFunction(isSearching ? config.noResultsText : config.noChoicesText),
                        type: isSearching ? NoticeTypes.noResults : NoticeTypes.noChoices,
                    };
                }
                fragment.replaceChildren('');
            }
            this._renderNotice(fragment);
            this.choiceList.element.replaceChildren(fragment);
            if (selectableChoices) {
                this._highlightChoice();
            }
        };
        Choices.prototype._renderItems = function () {
            var _this = this;
            var items = this._store.items || [];
            var itemList = this.itemList.element;
            var config = this.config;
            var fragment = document.createDocumentFragment();
            var itemFromList = function (item) {
                return itemList.querySelector("[data-item][data-id=\"".concat(item.id, "\"]"));
            };
            var addItemToFragment = function (item) {
                var el = item.itemEl;
                if (el && el.parentElement) {
                    return;
                }
                el = itemFromList(item) || _this._templates.item(config, item, config.removeItemButton);
                item.itemEl = el;
                fragment.appendChild(el);
            };
            // new items
            items.forEach(addItemToFragment);
            var addItems = !!fragment.childNodes.length;
            if (this._isSelectOneElement && this._hasNonChoicePlaceholder) {
                var existingItems = itemList.children.length;
                if (addItems || existingItems > 1) {
                    var placeholder = itemList.querySelector(getClassNamesSelector(config.classNames.placeholder));
                    if (placeholder) {
                        placeholder.remove();
                    }
                }
                else if (!existingItems) {
                    addItems = true;
                    addItemToFragment(mapInputToChoice({
                        selected: true,
                        value: '',
                        label: config.placeholderValue || '',
                        placeholder: true,
                    }, false));
                }
            }
            if (addItems) {
                itemList.append(fragment);
                if (config.shouldSortItems && !this._isSelectOneElement) {
                    items.sort(config.sorter);
                    // push sorting into the DOM
                    items.forEach(function (item) {
                        var el = itemFromList(item);
                        if (el) {
                            el.remove();
                            fragment.append(el);
                        }
                    });
                    itemList.append(fragment);
                }
            }
            if (this._isTextElement) {
                // Update the value of the hidden input
                this.passedElement.value = items.map(function (_a) {
                    var value = _a.value;
                    return value;
                }).join(config.delimiter);
            }
        };
        Choices.prototype._displayNotice = function (text, type, openDropdown) {
            if (openDropdown === void 0) { openDropdown = true; }
            var oldNotice = this._notice;
            if (oldNotice &&
                ((oldNotice.type === type && oldNotice.text === text) ||
                    (oldNotice.type === NoticeTypes.addChoice &&
                        (type === NoticeTypes.noResults || type === NoticeTypes.noChoices)))) {
                if (openDropdown) {
                    this.showDropdown(true);
                }
                return;
            }
            this._clearNotice();
            this._notice = text
                ? {
                    text: text,
                    type: type,
                }
                : undefined;
            this._renderNotice();
            if (openDropdown && text) {
                this.showDropdown(true);
            }
        };
        Choices.prototype._clearNotice = function () {
            if (!this._notice) {
                return;
            }
            var noticeElement = this.choiceList.element.querySelector(getClassNamesSelector(this.config.classNames.notice));
            if (noticeElement) {
                noticeElement.remove();
            }
            this._notice = undefined;
        };
        Choices.prototype._renderNotice = function (fragment) {
            var noticeConf = this._notice;
            if (noticeConf) {
                var notice = this._templates.notice(this.config, noticeConf.text, noticeConf.type);
                if (fragment) {
                    fragment.append(notice);
                }
                else {
                    this.choiceList.prepend(notice);
                }
            }
        };
        // eslint-disable-next-line class-methods-use-this
        Choices.prototype._getChoiceForOutput = function (choice, keyCode) {
            return {
                id: choice.id,
                highlighted: choice.highlighted,
                labelClass: choice.labelClass,
                labelDescription: choice.labelDescription,
                customProperties: choice.customProperties,
                disabled: choice.disabled,
                active: choice.active,
                label: choice.label,
                placeholder: choice.placeholder,
                value: choice.value,
                groupValue: choice.group ? choice.group.label : undefined,
                element: choice.element,
                keyCode: keyCode,
            };
        };
        Choices.prototype._triggerChange = function (value) {
            if (value === undefined || value === null) {
                return;
            }
            this.passedElement.triggerEvent(EventType.change, {
                value: value,
            });
        };
        Choices.prototype._handleButtonAction = function (element) {
            var _this = this;
            var items = this._store.items;
            if (!items.length || !this.config.removeItems || !this.config.removeItemButton) {
                return;
            }
            var id = element && parseDataSetId(element.parentElement);
            var itemToRemove = id && items.find(function (item) { return item.id === id; });
            if (!itemToRemove) {
                return;
            }
            this._store.withTxn(function () {
                // Remove item associated with button
                _this._removeItem(itemToRemove);
                _this._triggerChange(itemToRemove.value);
                if (_this._isSelectOneElement && !_this._hasNonChoicePlaceholder) {
                    var placeholderChoice = _this._store.choices
                        .reverse()
                        .find(function (choice) { return !choice.disabled && choice.placeholder; });
                    if (placeholderChoice) {
                        _this._addItem(placeholderChoice);
                        _this.unhighlightAll();
                        if (placeholderChoice.value) {
                            _this._triggerChange(placeholderChoice.value);
                        }
                    }
                }
            });
        };
        Choices.prototype._handleItemAction = function (element, hasShiftKey) {
            var _this = this;
            if (hasShiftKey === void 0) { hasShiftKey = false; }
            var items = this._store.items;
            if (!items.length || !this.config.removeItems || this._isSelectOneElement) {
                return;
            }
            var id = parseDataSetId(element);
            if (!id) {
                return;
            }
            // We only want to select one item with a click
            // so we deselect any items that aren't the target
            // unless shift is being pressed
            items.forEach(function (item) {
                if (item.id === id && !item.highlighted) {
                    _this.highlightItem(item);
                }
                else if (!hasShiftKey && item.highlighted) {
                    _this.unhighlightItem(item);
                }
            });
            // Focus input as without focus, a user cannot do anything with a
            // highlighted item
            this.input.focus();
        };
        Choices.prototype._handleChoiceAction = function (element) {
            var _this = this;
            // If we are clicking on an option
            var id = parseDataSetId(element);
            var choice = id && this._store.getChoiceById(id);
            if (!choice || choice.disabled) {
                return false;
            }
            var hasActiveDropdown = this.dropdown.isActive;
            if (!choice.selected) {
                if (!this._canAddItems()) {
                    return true; // causes _onEnterKey to early out
                }
                this._store.withTxn(function () {
                    _this._addItem(choice, true, true);
                    _this.clearInput();
                    _this.unhighlightAll();
                });
                this._triggerChange(choice.value);
            }
            // We want to close the dropdown if we are dealing with a single select box
            if (hasActiveDropdown && this.config.closeDropdownOnSelect) {
                this.hideDropdown(true);
                this.containerOuter.element.focus();
            }
            return true;
        };
        Choices.prototype._handleBackspace = function (items) {
            var config = this.config;
            if (!config.removeItems || !items.length) {
                return;
            }
            var lastItem = items[items.length - 1];
            var hasHighlightedItems = items.some(function (item) { return item.highlighted; });
            // If editing the last item is allowed and there are not other selected items,
            // we can edit the item value. Otherwise if we can remove items, remove all selected items
            if (config.editItems && !hasHighlightedItems && lastItem) {
                this.input.value = lastItem.value;
                this.input.setWidth();
                this._removeItem(lastItem);
                this._triggerChange(lastItem.value);
            }
            else {
                if (!hasHighlightedItems) {
                    // Highlight last item if none already highlighted
                    this.highlightItem(lastItem, false);
                }
                this.removeHighlightedItems(true);
            }
        };
        Choices.prototype._loadChoices = function () {
            var _a;
            var config = this.config;
            if (this._isTextElement) {
                // Assign preset items from passed object first
                this._presetChoices = config.items.map(function (e) { return mapInputToChoice(e, false); });
                // Add any values passed from attribute
                if (this.passedElement.value) {
                    var elementItems = this.passedElement.value
                        .split(config.delimiter)
                        .map(function (e) { return mapInputToChoice(e, false); });
                    this._presetChoices = this._presetChoices.concat(elementItems);
                }
                this._presetChoices.forEach(function (choice) {
                    choice.selected = true;
                });
            }
            else if (this._isSelectElement) {
                // Assign preset choices from passed object
                this._presetChoices = config.choices.map(function (e) { return mapInputToChoice(e, true); });
                // Create array of choices from option elements
                var choicesFromOptions = this.passedElement.optionsAsChoices();
                if (choicesFromOptions) {
                    (_a = this._presetChoices).push.apply(_a, choicesFromOptions);
                }
            }
        };
        Choices.prototype._handleLoadingState = function (setLoading) {
            if (setLoading === void 0) { setLoading = true; }
            var el = this.itemList.element;
            if (setLoading) {
                this.disable();
                this.containerOuter.addLoadingState();
                if (this._isSelectOneElement) {
                    el.replaceChildren(this._templates.placeholder(this.config, this.config.loadingText));
                }
                else {
                    this.input.placeholder = this.config.loadingText;
                }
            }
            else {
                this.enable();
                this.containerOuter.removeLoadingState();
                if (this._isSelectOneElement) {
                    el.replaceChildren('');
                    this._render();
                }
                else {
                    this.input.placeholder = this._placeholderValue || '';
                }
            }
        };
        Choices.prototype._handleSearch = function (value) {
            if (!this.input.isFocussed) {
                return;
            }
            // Check that we have a value to search and the input was an alphanumeric character
            if (value !== null && typeof value !== 'undefined' && value.length >= this.config.searchFloor) {
                var resultCount = this.config.searchChoices ? this._searchChoices(value) : 0;
                if (resultCount !== null) {
                    // Trigger search event
                    this.passedElement.triggerEvent(EventType.search, {
                        value: value,
                        resultCount: resultCount,
                    });
                }
            }
            else if (this._store.choices.some(function (option) { return !option.active; })) {
                this._stopSearch();
            }
        };
        Choices.prototype._canAddItems = function () {
            var config = this.config;
            var maxItemCount = config.maxItemCount, maxItemText = config.maxItemText;
            if (!config.singleModeForMultiSelect && maxItemCount > 0 && maxItemCount <= this._store.items.length) {
                this.choiceList.element.replaceChildren('');
                this._displayNotice(typeof maxItemText === 'function' ? maxItemText(maxItemCount) : maxItemText, NoticeTypes.addChoice);
                return false;
            }
            return true;
        };
        Choices.prototype._canCreateItem = function (value) {
            var config = this.config;
            var canAddItem = true;
            var notice = '';
            if (canAddItem && typeof config.addItemFilter === 'function' && !config.addItemFilter(value)) {
                canAddItem = false;
                notice = resolveNoticeFunction(config.customAddItemText, value);
            }
            if (canAddItem) {
                var foundChoice = this._store.choices.find(function (choice) { return config.valueComparer(choice.value, value); });
                if (this._isSelectElement) {
                    // for exact matches, do not prompt to add it as a custom choice
                    if (foundChoice) {
                        this._displayNotice('', NoticeTypes.addChoice);
                        return false;
                    }
                }
                else if (this._isTextElement && !config.duplicateItemsAllowed) {
                    if (foundChoice) {
                        canAddItem = false;
                        notice = resolveNoticeFunction(config.uniqueItemText, value);
                    }
                }
            }
            if (canAddItem) {
                notice = resolveNoticeFunction(config.addItemText, value);
            }
            if (notice) {
                this._displayNotice(notice, NoticeTypes.addChoice);
            }
            return canAddItem;
        };
        Choices.prototype._searchChoices = function (value) {
            var newValue = value.trim().replace(/\s{2,}/, ' ');
            // signal input didn't change search
            if (!newValue.length || newValue === this._currentValue) {
                return null;
            }
            var searcher = this._searcher;
            if (searcher.isEmptyIndex()) {
                searcher.index(this._store.searchableChoices);
            }
            // If new value matches the desired length and is not the same as the current value with a space
            var results = searcher.search(newValue);
            this._currentValue = newValue;
            this._highlightPosition = 0;
            this._isSearching = true;
            var notice = this._notice;
            var noticeType = notice && notice.type;
            if (noticeType !== NoticeTypes.addChoice) {
                if (!results.length) {
                    this._displayNotice(resolveStringFunction(this.config.noResultsText), NoticeTypes.noResults);
                }
                else {
                    this._clearNotice();
                }
            }
            this._store.dispatch(filterChoices(results));
            return results.length;
        };
        Choices.prototype._stopSearch = function () {
            if (this._isSearching) {
                this._currentValue = '';
                this._isSearching = false;
                this._clearNotice();
                this._store.dispatch(activateChoices(true));
                this.passedElement.triggerEvent(EventType.search, {
                    value: '',
                    resultCount: 0,
                });
            }
        };
        Choices.prototype._addEventListeners = function () {
            var documentElement = this._docRoot;
            var outerElement = this.containerOuter.element;
            var inputElement = this.input.element;
            // capture events - can cancel event processing or propagation
            documentElement.addEventListener('touchend', this._onTouchEnd, true);
            outerElement.addEventListener('keydown', this._onKeyDown, true);
            outerElement.addEventListener('mousedown', this._onMouseDown, true);
            // passive events - doesn't call `preventDefault` or `stopPropagation`
            documentElement.addEventListener('click', this._onClick, { passive: true });
            documentElement.addEventListener('touchmove', this._onTouchMove, {
                passive: true,
            });
            this.dropdown.element.addEventListener('mouseover', this._onMouseOver, {
                passive: true,
            });
            if (this._isSelectOneElement) {
                outerElement.addEventListener('focus', this._onFocus, {
                    passive: true,
                });
                outerElement.addEventListener('blur', this._onBlur, {
                    passive: true,
                });
            }
            inputElement.addEventListener('keyup', this._onKeyUp, {
                passive: true,
            });
            inputElement.addEventListener('input', this._onInput, {
                passive: true,
            });
            inputElement.addEventListener('focus', this._onFocus, {
                passive: true,
            });
            inputElement.addEventListener('blur', this._onBlur, {
                passive: true,
            });
            if (inputElement.form) {
                inputElement.form.addEventListener('reset', this._onFormReset, {
                    passive: true,
                });
            }
            this.input.addEventListeners();
        };
        Choices.prototype._removeEventListeners = function () {
            var documentElement = this._docRoot;
            var outerElement = this.containerOuter.element;
            var inputElement = this.input.element;
            documentElement.removeEventListener('touchend', this._onTouchEnd, true);
            outerElement.removeEventListener('keydown', this._onKeyDown, true);
            outerElement.removeEventListener('mousedown', this._onMouseDown, true);
            documentElement.removeEventListener('click', this._onClick);
            documentElement.removeEventListener('touchmove', this._onTouchMove);
            this.dropdown.element.removeEventListener('mouseover', this._onMouseOver);
            if (this._isSelectOneElement) {
                outerElement.removeEventListener('focus', this._onFocus);
                outerElement.removeEventListener('blur', this._onBlur);
            }
            inputElement.removeEventListener('keyup', this._onKeyUp);
            inputElement.removeEventListener('input', this._onInput);
            inputElement.removeEventListener('focus', this._onFocus);
            inputElement.removeEventListener('blur', this._onBlur);
            if (inputElement.form) {
                inputElement.form.removeEventListener('reset', this._onFormReset);
            }
            this.input.removeEventListeners();
        };
        Choices.prototype._onKeyDown = function (event) {
            var keyCode = event.keyCode;
            var hasActiveDropdown = this.dropdown.isActive;
            /*
            See:
            https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
            https://en.wikipedia.org/wiki/UTF-16#Code_points_from_U+010000_to_U+10FFFF - UTF-16 surrogate pairs
            https://stackoverflow.com/a/70866532 - "Unidentified" for mobile
            http://www.unicode.org/versions/Unicode5.2.0/ch16.pdf#G19635 - U+FFFF is reserved (Section 16.7)
        
            Logic: when a key event is sent, `event.key` represents its printable value _or_ one
            of a large list of special values indicating meta keys/functionality. In addition,
            key events for compose functionality contain a value of `Dead` when mid-composition.
        
            I can't quite verify it, but non-English IMEs may also be able to generate key codes
            for code points in the surrogate-pair range, which could potentially be seen as having
            key.length > 1. Since `Fn` is one of the special keys, we can't distinguish by that
            alone.
        
            Here, key.length === 1 means we know for sure the input was printable and not a special
            `key` value. When the length is greater than 1, it could be either a printable surrogate
            pair or a special `key` value. We can tell the difference by checking if the _character
            code_ value (not code point!) is in the "surrogate pair" range or not.
        
            We don't use .codePointAt because an invalid code point would return 65535, which wouldn't
            pass the >= 0x10000 check we would otherwise use.
        
            > ...The Unicode Standard sets aside 66 noncharacter code points. The last two code points
            > of each plane are noncharacters: U+FFFE and U+FFFF on the BMP...
            */
            var wasPrintableChar = event.key.length === 1 ||
                (event.key.length === 2 && event.key.charCodeAt(0) >= 0xd800) ||
                event.key === 'Unidentified';
            if (!this._isTextElement && !hasActiveDropdown) {
                this.showDropdown();
                if (!this.input.isFocussed && wasPrintableChar) {
                    /*
                      We update the input value with the pressed key as
                      the input was not focussed at the time of key press
                      therefore does not have the value of the key.
                    */
                    this.input.value += event.key;
                    // browsers interpret a space as pagedown
                    if (event.key === ' ') {
                        event.preventDefault();
                    }
                }
            }
            switch (keyCode) {
                case 65 /* KeyCodeMap.A_KEY */:
                    return this._onSelectKey(event, this.itemList.element.hasChildNodes());
                case 13 /* KeyCodeMap.ENTER_KEY */:
                    return this._onEnterKey(event, hasActiveDropdown);
                case 27 /* KeyCodeMap.ESC_KEY */:
                    return this._onEscapeKey(event, hasActiveDropdown);
                case 38 /* KeyCodeMap.UP_KEY */:
                case 33 /* KeyCodeMap.PAGE_UP_KEY */:
                case 40 /* KeyCodeMap.DOWN_KEY */:
                case 34 /* KeyCodeMap.PAGE_DOWN_KEY */:
                    return this._onDirectionKey(event, hasActiveDropdown);
                case 8 /* KeyCodeMap.DELETE_KEY */:
                case 46 /* KeyCodeMap.BACK_KEY */:
                    return this._onDeleteKey(event, this._store.items, this.input.isFocussed);
            }
        };
        Choices.prototype._onKeyUp = function ( /* event: KeyboardEvent */) {
            this._canSearch = this.config.searchEnabled;
        };
        Choices.prototype._onInput = function ( /* event: InputEvent */) {
            var value = this.input.value;
            if (!value) {
                if (this._isTextElement) {
                    this.hideDropdown(true);
                }
                else {
                    this._stopSearch();
                }
                return;
            }
            if (!this._canAddItems()) {
                return;
            }
            if (this._canSearch) {
                // do the search even if the entered text can not be added
                this._handleSearch(value);
            }
            if (!this._canAddUserChoices) {
                return;
            }
            // determine if a notice needs to be displayed for why a search result can't be added
            this._canCreateItem(value);
            if (this._isSelectElement) {
                this._highlightPosition = 0; // reset to select the notice and/or exact match
                this._highlightChoice();
            }
        };
        Choices.prototype._onSelectKey = function (event, hasItems) {
            // If CTRL + A or CMD + A have been pressed and there are items to select
            if ((event.ctrlKey || event.metaKey) && hasItems) {
                this._canSearch = false;
                var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
                if (shouldHightlightAll) {
                    this.highlightAll();
                }
            }
        };
        Choices.prototype._onEnterKey = function (event, hasActiveDropdown) {
            var _this = this;
            var value = this.input.value;
            var target = event.target;
            event.preventDefault();
            if (target && target.hasAttribute('data-button')) {
                this._handleButtonAction(target);
                return;
            }
            if (!hasActiveDropdown) {
                if (this._isSelectElement || this._notice) {
                    this.showDropdown();
                }
                return;
            }
            var highlightedChoice = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
            if (highlightedChoice && this._handleChoiceAction(highlightedChoice)) {
                return;
            }
            if (!target || !value) {
                this.hideDropdown(true);
                return;
            }
            if (!this._canAddItems()) {
                return;
            }
            var addedItem = false;
            this._store.withTxn(function () {
                addedItem = _this._findAndSelectChoiceByValue(value, true);
                if (!addedItem) {
                    if (!_this._canAddUserChoices) {
                        return;
                    }
                    if (!_this._canCreateItem(value)) {
                        return;
                    }
                    var sanitisedValue = sanitise(value);
                    var userValue = _this.config.allowHtmlUserInput || sanitisedValue === value ? value : { escaped: sanitisedValue, raw: value };
                    _this._addChoice(mapInputToChoice({
                        value: userValue,
                        label: userValue,
                        selected: true,
                    }, false), true, true);
                    addedItem = true;
                }
                _this.clearInput();
                _this.unhighlightAll();
            });
            if (!addedItem) {
                return;
            }
            this._triggerChange(value);
            if (this.config.closeDropdownOnSelect) {
                this.hideDropdown(true);
            }
        };
        Choices.prototype._onEscapeKey = function (event, hasActiveDropdown) {
            if (hasActiveDropdown) {
                event.stopPropagation();
                this.hideDropdown(true);
                this.containerOuter.element.focus();
            }
        };
        Choices.prototype._onDirectionKey = function (event, hasActiveDropdown) {
            var keyCode = event.keyCode;
            // If up or down key is pressed, traverse through options
            if (hasActiveDropdown || this._isSelectOneElement) {
                this.showDropdown();
                this._canSearch = false;
                var directionInt = keyCode === 40 /* KeyCodeMap.DOWN_KEY */ || keyCode === 34 /* KeyCodeMap.PAGE_DOWN_KEY */ ? 1 : -1;
                var skipKey = event.metaKey || keyCode === 34 /* KeyCodeMap.PAGE_DOWN_KEY */ || keyCode === 33 /* KeyCodeMap.PAGE_UP_KEY */;
                var nextEl = void 0;
                if (skipKey) {
                    if (directionInt > 0) {
                        nextEl = this.dropdown.element.querySelector("".concat(selectableChoiceIdentifier, ":last-of-type"));
                    }
                    else {
                        nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
                    }
                }
                else {
                    var currentEl = this.dropdown.element.querySelector(getClassNamesSelector(this.config.classNames.highlightedState));
                    if (currentEl) {
                        nextEl = getAdjacentEl(currentEl, selectableChoiceIdentifier, directionInt);
                    }
                    else {
                        nextEl = this.dropdown.element.querySelector(selectableChoiceIdentifier);
                    }
                }
                if (nextEl) {
                    // We prevent default to stop the cursor moving
                    // when pressing the arrow
                    if (!isScrolledIntoView(nextEl, this.choiceList.element, directionInt)) {
                        this.choiceList.scrollToChildElement(nextEl, directionInt);
                    }
                    this._highlightChoice(nextEl);
                }
                // Prevent default to maintain cursor position whilst
                // traversing dropdown options
                event.preventDefault();
            }
        };
        Choices.prototype._onDeleteKey = function (event, items, hasFocusedInput) {
            // If backspace or delete key is pressed and the input has no value
            if (!this._isSelectOneElement && !event.target.value && hasFocusedInput) {
                this._handleBackspace(items);
                event.preventDefault();
            }
        };
        Choices.prototype._onTouchMove = function () {
            if (this._wasTap) {
                this._wasTap = false;
            }
        };
        Choices.prototype._onTouchEnd = function (event) {
            var target = (event || event.touches[0]).target;
            var touchWasWithinContainer = this._wasTap && this.containerOuter.element.contains(target);
            if (touchWasWithinContainer) {
                var containerWasExactTarget = target === this.containerOuter.element || target === this.containerInner.element;
                if (containerWasExactTarget) {
                    if (this._isTextElement) {
                        this.input.focus();
                    }
                    else if (this._isSelectMultipleElement) {
                        this.showDropdown();
                    }
                }
                // Prevents focus event firing
                event.stopPropagation();
            }
            this._wasTap = true;
        };
        /**
         * Handles mousedown event in capture mode for containetOuter.element
         */
        Choices.prototype._onMouseDown = function (event) {
            var target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }
            // If we have our mouse down on the scrollbar and are on IE11...
            if (IS_IE11 && this.choiceList.element.contains(target)) {
                // check if click was on a scrollbar area
                var firstChoice = this.choiceList.element.firstElementChild;
                this._isScrollingOnIe =
                    this._direction === 'ltr' ? event.offsetX >= firstChoice.offsetWidth : event.offsetX < firstChoice.offsetLeft;
            }
            if (target === this.input.element) {
                return;
            }
            var item = target.closest('[data-button],[data-item],[data-choice]');
            if (item instanceof HTMLElement) {
                if ('button' in item.dataset) {
                    this._handleButtonAction(item);
                }
                else if ('item' in item.dataset) {
                    this._handleItemAction(item, event.shiftKey);
                }
                else if ('choice' in item.dataset) {
                    this._handleChoiceAction(item);
                }
            }
            event.preventDefault();
        };
        /**
         * Handles mouseover event over this.dropdown
         * @param {MouseEvent} event
         */
        Choices.prototype._onMouseOver = function (_a) {
            var target = _a.target;
            if (target instanceof HTMLElement && 'choice' in target.dataset) {
                this._highlightChoice(target);
            }
        };
        Choices.prototype._onClick = function (_a) {
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var clickWasWithinContainer = containerOuter.element.contains(target);
            if (clickWasWithinContainer) {
                if (!this.dropdown.isActive && !containerOuter.isDisabled) {
                    if (this._isTextElement) {
                        if (document.activeElement !== this.input.element) {
                            this.input.focus();
                        }
                    }
                    else {
                        this.showDropdown();
                        containerOuter.element.focus();
                    }
                }
                else if (this._isSelectOneElement &&
                    target !== this.input.element &&
                    !this.dropdown.element.contains(target)) {
                    this.hideDropdown();
                }
            }
            else {
                containerOuter.removeFocusState();
                this.hideDropdown(true);
                this.unhighlightAll();
            }
        };
        Choices.prototype._onFocus = function (_a) {
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var focusWasWithinContainer = target && containerOuter.element.contains(target);
            if (!focusWasWithinContainer) {
                return;
            }
            var targetIsInput = target === this.input.element;
            if (this._isTextElement) {
                if (targetIsInput) {
                    containerOuter.addFocusState();
                }
            }
            else if (this._isSelectMultipleElement) {
                if (targetIsInput) {
                    this.showDropdown(true);
                    // If element is a select box, the focused element is the container and the dropdown
                    // isn't already open, focus and show dropdown
                    containerOuter.addFocusState();
                }
            }
            else {
                containerOuter.addFocusState();
                if (targetIsInput) {
                    this.showDropdown(true);
                }
            }
        };
        Choices.prototype._onBlur = function (_a) {
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var blurWasWithinContainer = target && containerOuter.element.contains(target);
            if (blurWasWithinContainer && !this._isScrollingOnIe) {
                var targetIsInput = target === this.input.element;
                if (this._isTextElement || this._isSelectMultipleElement) {
                    if (targetIsInput) {
                        containerOuter.removeFocusState();
                        this.hideDropdown(true);
                        this.unhighlightAll();
                    }
                }
                else {
                    containerOuter.removeFocusState();
                    if (targetIsInput || (target === containerOuter.element && !this._canSearch)) {
                        this.hideDropdown(true);
                    }
                }
            }
            else {
                // On IE11, clicking the scollbar blurs our input and thus
                // closes the dropdown. To stop this, we refocus our input
                // if we know we are on IE *and* are scrolling.
                this._isScrollingOnIe = false;
                this.input.element.focus();
            }
        };
        Choices.prototype._onFormReset = function () {
            var _this = this;
            this._store.withTxn(function () {
                _this.clearInput();
                _this.hideDropdown();
                _this.refresh(false, false, true);
                if (_this._initialItems.length) {
                    _this.setChoiceByValue(_this._initialItems);
                }
            });
        };
        Choices.prototype._highlightChoice = function (el) {
            if (el === void 0) { el = null; }
            var choices = Array.from(this.dropdown.element.querySelectorAll(selectableChoiceIdentifier));
            if (!choices.length) {
                return;
            }
            var passedEl = el;
            var highlightedState = this.config.classNames.highlightedState;
            var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(getClassNamesSelector(highlightedState)));
            // Remove any highlighted choices
            highlightedChoices.forEach(function (choice) {
                removeClassesFromElement(choice, highlightedState);
                choice.setAttribute('aria-selected', 'false');
            });
            if (passedEl) {
                this._highlightPosition = choices.indexOf(passedEl);
            }
            else {
                // Highlight choice based on last known highlight location
                if (choices.length > this._highlightPosition) {
                    // If we have an option to highlight
                    passedEl = choices[this._highlightPosition];
                }
                else {
                    // Otherwise highlight the option before
                    passedEl = choices[choices.length - 1];
                }
                if (!passedEl) {
                    passedEl = choices[0];
                }
            }
            addClassesToElement(passedEl, highlightedState);
            passedEl.setAttribute('aria-selected', 'true');
            this.passedElement.triggerEvent(EventType.highlightChoice, {
                el: passedEl,
            });
            if (this.dropdown.isActive) {
                // IE11 ignores aria-label and blocks virtual keyboard
                // if aria-activedescendant is set without a dropdown
                this.input.setActiveDescendant(passedEl.id);
                this.containerOuter.setActiveDescendant(passedEl.id);
            }
        };
        Choices.prototype._addItem = function (item, withEvents, userTriggered) {
            if (withEvents === void 0) { withEvents = true; }
            if (userTriggered === void 0) { userTriggered = false; }
            if (!item.id) {
                throw new TypeError('item.id must be set before _addItem is called for a choice/item');
            }
            if (this.config.singleModeForMultiSelect || this._isSelectOneElement) {
                this.removeActiveItems(item.id);
            }
            this._store.dispatch(addItem(item));
            if (withEvents) {
                this.passedElement.triggerEvent(EventType.addItem, this._getChoiceForOutput(item));
                if (userTriggered) {
                    this.passedElement.triggerEvent(EventType.choice, this._getChoiceForOutput(item));
                }
            }
        };
        Choices.prototype._removeItem = function (item) {
            if (!item.id) {
                return;
            }
            this._store.dispatch(removeItem$1(item));
            this.passedElement.triggerEvent(EventType.removeItem, this._getChoiceForOutput(item));
        };
        Choices.prototype._addChoice = function (choice, withEvents, userTriggered) {
            if (withEvents === void 0) { withEvents = true; }
            if (userTriggered === void 0) { userTriggered = false; }
            if (choice.id) {
                throw new TypeError('Can not re-add a choice which has already been added');
            }
            var config = this.config;
            if ((this._isSelectElement || !config.duplicateItemsAllowed) &&
                this._store.choices.find(function (c) { return config.valueComparer(c.value, choice.value); })) {
                return;
            }
            // Generate unique id, in-place update is required so chaining _addItem works as expected
            this._lastAddedChoiceId++;
            choice.id = this._lastAddedChoiceId;
            choice.elementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choice.id);
            var prependValue = config.prependValue, appendValue = config.appendValue;
            if (prependValue) {
                choice.value = prependValue + choice.value;
            }
            if (appendValue) {
                choice.value += appendValue.toString();
            }
            if ((prependValue || appendValue) && choice.element) {
                choice.element.value = choice.value;
            }
            this._clearNotice();
            this._store.dispatch(addChoice(choice));
            if (choice.selected) {
                this._addItem(choice, withEvents, userTriggered);
            }
        };
        Choices.prototype._addGroup = function (group, withEvents) {
            var _this = this;
            if (withEvents === void 0) { withEvents = true; }
            if (group.id) {
                throw new TypeError('Can not re-add a group which has already been added');
            }
            this._store.dispatch(addGroup(group));
            if (!group.choices) {
                return;
            }
            // add unique id for the group(s), and do not store the full list of choices in this group
            this._lastAddedGroupId++;
            group.id = this._lastAddedGroupId;
            group.choices.forEach(function (item) {
                item.group = group;
                if (group.disabled) {
                    item.disabled = true;
                }
                _this._addChoice(item, withEvents);
            });
        };
        Choices.prototype._createTemplates = function () {
            var _this = this;
            var callbackOnCreateTemplates = this.config.callbackOnCreateTemplates;
            var userTemplates = {};
            if (typeof callbackOnCreateTemplates === 'function') {
                userTemplates = callbackOnCreateTemplates.call(this, strToEl, escapeForTemplate, getClassNames);
            }
            var templating = {};
            Object.keys(this._templates).forEach(function (name) {
                if (name in userTemplates) {
                    templating[name] = userTemplates[name].bind(_this);
                }
                else {
                    templating[name] = _this._templates[name].bind(_this);
                }
            });
            this._templates = templating;
        };
        Choices.prototype._createElements = function () {
            var templating = this._templates;
            var _a = this, config = _a.config, isSelectOneElement = _a._isSelectOneElement;
            var position = config.position, classNames = config.classNames;
            var elementType = this._elementType;
            this.containerOuter = new Container({
                element: templating.containerOuter(config, this._direction, this._isSelectElement, isSelectOneElement, config.searchEnabled, elementType, config.labelId),
                classNames: classNames,
                type: elementType,
                position: position,
            });
            this.containerInner = new Container({
                element: templating.containerInner(config),
                classNames: classNames,
                type: elementType,
                position: position,
            });
            this.input = new Input({
                element: templating.input(config, this._placeholderValue),
                classNames: classNames,
                type: elementType,
                preventPaste: !config.paste,
            });
            this.choiceList = new List({
                element: templating.choiceList(config, isSelectOneElement),
            });
            this.itemList = new List({
                element: templating.itemList(config, isSelectOneElement),
            });
            this.dropdown = new Dropdown({
                element: templating.dropdown(config),
                classNames: classNames,
                type: elementType,
            });
        };
        Choices.prototype._createStructure = function () {
            var _a = this, containerInner = _a.containerInner, containerOuter = _a.containerOuter, passedElement = _a.passedElement;
            var dropdownElement = this.dropdown.element;
            // Hide original element
            passedElement.conceal();
            // Wrap input in container preserving DOM ordering
            containerInner.wrap(passedElement.element);
            // Wrapper inner container with outer container
            containerOuter.wrap(containerInner.element);
            if (this._isSelectOneElement) {
                this.input.placeholder = this.config.searchPlaceholderValue || '';
            }
            else {
                if (this._placeholderValue) {
                    this.input.placeholder = this._placeholderValue;
                }
                this.input.setWidth();
            }
            containerOuter.element.appendChild(containerInner.element);
            containerOuter.element.appendChild(dropdownElement);
            containerInner.element.appendChild(this.itemList.element);
            dropdownElement.appendChild(this.choiceList.element);
            if (!this._isSelectOneElement) {
                containerInner.element.appendChild(this.input.element);
            }
            else if (this.config.searchEnabled) {
                dropdownElement.insertBefore(this.input.element, dropdownElement.firstChild);
            }
            this._highlightPosition = 0;
            this._isSearching = false;
        };
        Choices.prototype._initStore = function () {
            var _this = this;
            this._store.subscribe(this._render).withTxn(function () {
                _this._addPredefinedChoices(_this._presetChoices, _this._isSelectOneElement && !_this._hasNonChoicePlaceholder, false);
            });
            if (!this._store.choices.length || (this._isSelectOneElement && this._hasNonChoicePlaceholder)) {
                this._render();
            }
        };
        Choices.prototype._addPredefinedChoices = function (choices, selectFirstOption, withEvents) {
            var _this = this;
            if (selectFirstOption === void 0) { selectFirstOption = false; }
            if (withEvents === void 0) { withEvents = true; }
            if (selectFirstOption) {
                /**
                 * If there is a selected choice already or the choice is not the first in
                 * the array, add each choice normally.
                 *
                 * Otherwise we pre-select the first enabled choice in the array ("select-one" only)
                 */
                var noSelectedChoices = choices.findIndex(function (choice) { return choice.selected; }) === -1;
                if (noSelectedChoices) {
                    choices.some(function (choice) {
                        if (choice.disabled || 'choices' in choice) {
                            return false;
                        }
                        choice.selected = true;
                        return true;
                    });
                }
            }
            choices.forEach(function (item) {
                if ('choices' in item) {
                    if (_this._isSelectElement) {
                        _this._addGroup(item, withEvents);
                    }
                }
                else {
                    _this._addChoice(item, withEvents);
                }
            });
        };
        Choices.prototype._findAndSelectChoiceByValue = function (value, userTriggered) {
            var _this = this;
            if (userTriggered === void 0) { userTriggered = false; }
            // Check 'value' property exists and the choice isn't already selected
            var foundChoice = this._store.choices.find(function (choice) { return _this.config.valueComparer(choice.value, value); });
            if (foundChoice && !foundChoice.disabled && !foundChoice.selected) {
                this._addItem(foundChoice, true, userTriggered);
                return true;
            }
            return false;
        };
        Choices.prototype._generatePlaceholderValue = function () {
            var config = this.config;
            if (!config.placeholder) {
                return null;
            }
            if (this._hasNonChoicePlaceholder) {
                return config.placeholderValue;
            }
            if (this._isSelectElement) {
                var placeholderOption = this.passedElement.placeholderOption;
                return placeholderOption ? placeholderOption.text : null;
            }
            return null;
        };
        Choices.prototype._warnChoicesInitFailed = function (caller) {
            if (this.config.silent) {
                return;
            }
            if (!this.initialised) {
                throw new TypeError("".concat(caller, " called on a non-initialised instance of Choices"));
            }
            else if (!this.initialisedOK) {
                throw new TypeError("".concat(caller, " called for an element which has multiple instances of Choices initialised on it"));
            }
        };
        Choices.version = '11.0.2';
        return Choices;
    }());

    return Choices;

}));
