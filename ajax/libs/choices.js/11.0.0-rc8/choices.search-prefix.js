/*! choices.js v11.0.0-rc8 | © 2024 Josh Johnson | https://github.com/jshjohnson/Choices#readme */

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

    var ObjectsInConfig = ['fuseOptions', 'classNames'];

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
    var clearChoices = function () { return ({
        type: ActionType.CLEAR_CHOICES,
    }); };

    var addGroup = function (group) { return ({
        type: ActionType.ADD_GROUP,
        group: group,
    }); };

    var addItem = function (item) { return ({
        type: ActionType.ADD_ITEM,
        item: item,
    }); };
    var removeItem = function (item) { return ({
        type: ActionType.REMOVE_ITEM,
        item: item,
    }); };
    var highlightItem = function (item, highlighted) { return ({
        type: ActionType.HIGHLIGHT_ITEM,
        item: item,
        highlighted: highlighted,
    }); };

    /* eslint-disable @typescript-eslint/no-explicit-any */
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

    var Dropdown = /** @class */ (function () {
        function Dropdown(_a) {
            var element = _a.element, type = _a.type, classNames = _a.classNames;
            this.element = element;
            this.classNames = classNames;
            this.type = type;
            this.isActive = false;
        }
        Object.defineProperty(Dropdown.prototype, "distanceFromTopWindow", {
            /**
             * Bottom position of dropdown in viewport coordinates
             */
            get: function () {
                return this.element.getBoundingClientRect().bottom;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Show dropdown to user by adding active state class
         */
        Dropdown.prototype.show = function () {
            var _a;
            (_a = this.element.classList).add.apply(_a, getClassNames(this.classNames.activeState));
            this.element.setAttribute('aria-expanded', 'true');
            this.isActive = true;
            return this;
        };
        /**
         * Hide dropdown from user
         */
        Dropdown.prototype.hide = function () {
            var _a;
            (_a = this.element.classList).remove.apply(_a, getClassNames(this.classNames.activeState));
            this.element.setAttribute('aria-expanded', 'false');
            this.isActive = false;
            return this;
        };
        return Dropdown;
    }());

    var TEXT_TYPE = 'text';
    var SELECT_ONE_TYPE = 'select-one';
    var SELECT_MULTIPLE_TYPE = 'select-multiple';
    var SCROLLING_SPEED = 4;

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
        Container.prototype.shouldFlip = function (dropdownPos) {
            // If flip is enabled and the dropdown bottom position is
            // greater than the window height flip the dropdown.
            var shouldFlip = false;
            if (this.position === 'auto') {
                shouldFlip = !window.matchMedia("(min-height: ".concat(dropdownPos + 1, "px)")).matches;
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
        Container.prototype.open = function (dropdownPos) {
            var _a, _b;
            (_a = this.element.classList).add.apply(_a, getClassNames(this.classNames.openState));
            this.element.setAttribute('aria-expanded', 'true');
            this.isOpen = true;
            if (this.shouldFlip(dropdownPos)) {
                (_b = this.element.classList).add.apply(_b, getClassNames(this.classNames.flippedState));
                this.isFlipped = true;
            }
        };
        Container.prototype.close = function () {
            var _a, _b;
            (_a = this.element.classList).remove.apply(_a, getClassNames(this.classNames.openState));
            this.element.setAttribute('aria-expanded', 'false');
            this.removeActiveDescendant();
            this.isOpen = false;
            // A dropdown flips if it does not have space within the page
            if (this.isFlipped) {
                (_b = this.element.classList).remove.apply(_b, getClassNames(this.classNames.flippedState));
                this.isFlipped = false;
            }
        };
        Container.prototype.addFocusState = function () {
            var _a;
            (_a = this.element.classList).add.apply(_a, getClassNames(this.classNames.focusState));
        };
        Container.prototype.removeFocusState = function () {
            var _a;
            (_a = this.element.classList).remove.apply(_a, getClassNames(this.classNames.focusState));
        };
        Container.prototype.enable = function () {
            var _a;
            (_a = this.element.classList).remove.apply(_a, getClassNames(this.classNames.disabledState));
            this.element.removeAttribute('aria-disabled');
            if (this.type === SELECT_ONE_TYPE) {
                this.element.setAttribute('tabindex', '0');
            }
            this.isDisabled = false;
        };
        Container.prototype.disable = function () {
            var _a;
            (_a = this.element.classList).add.apply(_a, getClassNames(this.classNames.disabledState));
            this.element.setAttribute('aria-disabled', 'true');
            if (this.type === SELECT_ONE_TYPE) {
                this.element.setAttribute('tabindex', '-1');
            }
            this.isDisabled = true;
        };
        Container.prototype.wrap = function (element) {
            var parentNode = element.parentNode;
            if (parentNode) {
                if (element.nextSibling) {
                    parentNode.insertBefore(this.element, element.nextSibling);
                }
                else {
                    parentNode.appendChild(this.element);
                }
            }
            this.element.appendChild(element);
        };
        Container.prototype.unwrap = function (element) {
            var parentNode = this.element.parentNode;
            if (parentNode) {
                // Move passed element outside this element
                parentNode.insertBefore(element, this.element);
                // Remove this element
                parentNode.removeChild(this.element);
            }
        };
        Container.prototype.addLoadingState = function () {
            var _a;
            (_a = this.element.classList).add.apply(_a, getClassNames(this.classNames.loadingState));
            this.element.setAttribute('aria-busy', 'true');
            this.isLoading = true;
        };
        Container.prototype.removeLoadingState = function () {
            var _a;
            (_a = this.element.classList).remove.apply(_a, getClassNames(this.classNames.loadingState));
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
            var _a = this.element, style = _a.style, value = _a.value, placeholder = _a.placeholder;
            style.minWidth = "".concat(placeholder.length + 1, "ch");
            style.width = "".concat(value.length + 1, "ch");
        };
        Input.prototype.setActiveDescendant = function (activeDescendantID) {
            this.element.setAttribute('aria-activedescendant', activeDescendantID);
        };
        Input.prototype.removeActiveDescendant = function () {
            this.element.removeAttribute('aria-activedescendant');
        };
        Input.prototype._onInput = function () {
            if (this.type !== SELECT_ONE_TYPE) {
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

    var List = /** @class */ (function () {
        function List(_a) {
            var element = _a.element;
            this.element = element;
            this.scrollPos = this.element.scrollTop;
            this.height = this.element.offsetHeight;
        }
        List.prototype.clear = function () {
            this.element.innerHTML = '';
        };
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
            var _a;
            var el = this.element;
            // Hide passed input
            (_a = el.classList).add.apply(_a, getClassNames(this.classNames.input));
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
            var _a;
            var el = this.element;
            // Reinstate passed element
            (_a = el.classList).remove.apply(_a, getClassNames(this.classNames.input));
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
            var element = this.element;
            element.removeAttribute('disabled');
            element.disabled = false;
            this.isDisabled = false;
        };
        WrappedElement.prototype.disable = function () {
            var element = this.element;
            element.setAttribute('disabled', '');
            element.disabled = true;
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
            groupId: 0, // actual ID will be assigned during _addGroup but before _addChoice
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
            var dataset = option.dataset;
            return {
                id: 0,
                groupId: 0,
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
                labelClass: typeof dataset.labelClass !== 'undefined' ? stringToHtmlClass(dataset.labelClass) : undefined,
                labelDescription: typeof dataset.labelDescription !== 'undefined' ? dataset.labelDescription : undefined,
                customProperties: parseCustomProperties(dataset.customProperties),
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

    function items(s, action) {
        var state = s;
        var update = true;
        switch (action.type) {
            case ActionType.ADD_ITEM: {
                var item = action.item;
                item.selected = true;
                var el = item.element;
                if (el) {
                    el.selected = true;
                    el.setAttribute('selected', '');
                }
                state.push(item);
                state.forEach(function (choice) {
                    choice.highlighted = false;
                });
                break;
            }
            case ActionType.REMOVE_ITEM: {
                var item_1 = action.item;
                item_1.selected = false;
                var el = item_1.element;
                if (el) {
                    el.selected = false;
                    el.removeAttribute('selected');
                    // For a select-one, if all options are deselected, the first item is selected. To set a black value, select.value needs to be set
                    var select = el.parentElement;
                    if (select && isHtmlSelectElement(select) && select.type === SELECT_ONE_TYPE) {
                        select.value = '';
                    }
                }
                state = state.filter(function (choice) { return choice.id !== item_1.id; });
                break;
            }
            case ActionType.REMOVE_CHOICE: {
                state = state.filter(function (item) { return item.id !== action.choice.id; });
                break;
            }
            case ActionType.HIGHLIGHT_ITEM: {
                var highlightItemAction_1 = action;
                state.forEach(function (choice) {
                    if (choice.id === highlightItemAction_1.item.id) {
                        choice.highlighted = highlightItemAction_1.highlighted;
                    }
                });
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
    function choices(s, action) {
        var state = s;
        var update = true;
        switch (action.type) {
            case ActionType.ADD_CHOICE: {
                /*
                  A disabled choice appears in the choice dropdown but cannot be selected
                  A selected choice has been added to the passed input's value (added as an item)
                  An active choice appears within the choice dropdown
                */
                state.push(action.choice);
                break;
            }
            case ActionType.REMOVE_CHOICE: {
                state = state.filter(function (obj) { return obj.id !== action.choice.id; });
                break;
            }
            case ActionType.ADD_ITEM:
            case ActionType.REMOVE_ITEM: {
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
                });
                break;
            }
            case ActionType.ACTIVATE_CHOICES: {
                state.forEach(function (choice) {
                    choice.active = action.active;
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
        function Store() {
            this._state = this.defaultState;
            this._listeners = [];
            this._txn = 0;
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
        };
        Store.prototype.dispatch = function (action) {
            var state = this._state;
            var hasChanges = false;
            var changes = this._changeSet || this.changeSet(false);
            Object.keys(reducers).forEach(function (key) {
                var stateUpdate = reducers[key](state[key], action);
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

    var SearchByPrefixFilter = /** @class */ (function () {
        function SearchByPrefixFilter(config) {
            this._haystack = [];
            this._fields = config.searchFields;
        }
        SearchByPrefixFilter.prototype.index = function (data) {
            this._haystack = data;
        };
        SearchByPrefixFilter.prototype.reset = function () {
            this._haystack = [];
        };
        SearchByPrefixFilter.prototype.isEmptyIndex = function () {
            return !this._haystack.length;
        };
        SearchByPrefixFilter.prototype.search = function (_needle) {
            var fields = this._fields;
            if (!fields || !fields.length || !_needle) {
                return [];
            }
            var needle = _needle.toLowerCase();
            return this._haystack
                .filter(function (obj) { return fields.some(function (field) { return field in obj && obj[field].toLowerCase().startsWith(needle); }); })
                .map(function (value, index) {
                return {
                    item: value,
                    score: index,
                    rank: index + 1,
                };
            });
        };
        return SearchByPrefixFilter;
    }());

    function getSearcher(config) {
        return new SearchByPrefixFilter(config);
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
            div.className = getClassNames(containerOuter).join(' ');
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
            div.className = getClassNames(containerInner).join(' ');
            return div;
        },
        itemList: function (_a, isSelectOneElement) {
            var searchEnabled = _a.searchEnabled, _b = _a.classNames, list = _b.list, listSingle = _b.listSingle, listItems = _b.listItems;
            var div = document.createElement('div');
            div.className = "".concat(getClassNames(list).join(' '), " ").concat(isSelectOneElement ? getClassNames(listSingle).join(' ') : getClassNames(listItems).join(' '));
            if (this._isSelectElement && searchEnabled) {
                div.setAttribute('role', 'listbox');
            }
            return div;
        },
        placeholder: function (_a, value) {
            var allowHTML = _a.allowHTML, placeholder = _a.classNames.placeholder;
            var div = document.createElement('div');
            div.className = getClassNames(placeholder).join(' ');
            setElementHtml(div, allowHTML, value);
            return div;
        },
        item: function (_a, choice, removeItemButton) {
            var _b, _c, _d;
            var allowHTML = _a.allowHTML, removeItemButtonAlignLeft = _a.removeItemButtonAlignLeft, removeItemIconText = _a.removeItemIconText, removeItemLabelText = _a.removeItemLabelText, _e = _a.classNames, item = _e.item, button = _e.button, highlightedState = _e.highlightedState, itemSelectable = _e.itemSelectable, placeholder = _e.placeholder;
            var labelClass = choice.labelClass, label = choice.label, disabled = choice.disabled, value = choice.value;
            var rawValue = unwrapStringForRaw(value);
            var div = document.createElement('div');
            div.className = getClassNames(item).join(' ');
            if (labelClass) {
                var spanLabel = document.createElement('span');
                setElementHtml(spanLabel, allowHTML, label);
                spanLabel.className = getClassNames(labelClass).join(' ');
                div.appendChild(spanLabel);
            }
            else {
                setElementHtml(div, allowHTML, label);
            }
            var dataset = div.dataset;
            dataset.item = '';
            dataset.id = choice.id;
            dataset.value = rawValue;
            assignCustomProperties(div, choice, true);
            if (disabled || this.containerOuter.isDisabled) {
                div.setAttribute('aria-disabled', 'true');
            }
            if (this._isSelectElement) {
                div.setAttribute('aria-selected', 'true');
                div.setAttribute('role', 'option');
            }
            if (choice.placeholder) {
                (_b = div.classList).add.apply(_b, getClassNames(placeholder));
                dataset.placeholder = '';
            }
            (_c = div.classList).add.apply(_c, (choice.highlighted ? getClassNames(highlightedState) : getClassNames(itemSelectable)));
            if (removeItemButton) {
                if (disabled) {
                    (_d = div.classList).remove.apply(_d, getClassNames(itemSelectable));
                }
                dataset.deletable = '';
                var removeButton = document.createElement('button');
                removeButton.type = 'button';
                removeButton.className = getClassNames(button).join(' ');
                setElementHtml(removeButton, true, resolveNoticeFunction(removeItemIconText, value));
                var REMOVE_ITEM_LABEL = resolveNoticeFunction(removeItemLabelText, value);
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
            div.className = getClassNames(list).join(' ');
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
            div.className = "".concat(getClassNames(group).join(' '), " ").concat(disabled ? getClassNames(itemDisabled).join(' ') : '');
            div.setAttribute('role', 'group');
            var dataset = div.dataset;
            dataset.group = '';
            dataset.id = id;
            dataset.value = rawLabel;
            if (disabled) {
                div.setAttribute('aria-disabled', 'true');
            }
            var heading = document.createElement('div');
            heading.className = getClassNames(groupHeading).join(' ');
            setElementHtml(heading, allowHTML, label);
            div.appendChild(heading);
            return div;
        },
        choice: function (_a, choice, selectText) {
            var _b, _c, _d, _e, _f;
            var allowHTML = _a.allowHTML, _g = _a.classNames, item = _g.item, itemChoice = _g.itemChoice, itemSelectable = _g.itemSelectable, selectedState = _g.selectedState, itemDisabled = _g.itemDisabled, description = _g.description, placeholder = _g.placeholder;
            var value = choice.value, elementId = choice.elementId, groupId = choice.groupId, label = choice.label, labelClass = choice.labelClass, labelDescription = choice.labelDescription;
            var rawValue = unwrapStringForRaw(value);
            var div = document.createElement('div');
            div.id = elementId;
            div.className = "".concat(getClassNames(item).join(' '), " ").concat(getClassNames(itemChoice).join(' '));
            var describedBy = div;
            if (labelClass) {
                var spanLabel = document.createElement('span');
                setElementHtml(spanLabel, allowHTML, label);
                spanLabel.className = getClassNames(labelClass).join(' ');
                describedBy = spanLabel;
                div.appendChild(spanLabel);
            }
            else {
                setElementHtml(div, allowHTML, label);
            }
            if (labelDescription) {
                var descId = "".concat(elementId, "-description");
                describedBy.setAttribute('aria-describedby', descId);
                var spanDesc = document.createElement('span');
                setElementHtml(spanDesc, allowHTML, labelDescription);
                spanDesc.id = descId;
                (_b = spanDesc.classList).add.apply(_b, getClassNames(description));
                div.appendChild(spanDesc);
            }
            if (choice.selected) {
                (_c = div.classList).add.apply(_c, getClassNames(selectedState));
            }
            if (choice.placeholder) {
                (_d = div.classList).add.apply(_d, getClassNames(placeholder));
            }
            var dataset = div.dataset;
            var showGroupId = groupId && groupId > 0;
            div.setAttribute('role', showGroupId ? 'treeitem' : 'option');
            if (showGroupId) {
                dataset.groupId = "".concat(groupId);
            }
            dataset.choice = '';
            dataset.id = choice.id;
            dataset.value = rawValue;
            dataset.selectText = selectText;
            assignCustomProperties(div, choice, false);
            if (choice.disabled) {
                (_e = div.classList).add.apply(_e, getClassNames(itemDisabled));
                dataset.choiceDisabled = '';
                div.setAttribute('aria-disabled', 'true');
            }
            else {
                (_f = div.classList).add.apply(_f, getClassNames(itemSelectable));
                dataset.choiceSelectable = '';
            }
            return div;
        },
        input: function (_a, placeholderValue) {
            var _b = _a.classNames, input = _b.input, inputCloned = _b.inputCloned, labelId = _a.labelId;
            var inp = document.createElement('input');
            inp.type = 'search';
            inp.className = "".concat(getClassNames(input).join(' '), " ").concat(getClassNames(inputCloned).join(' '));
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
            var _b, _c;
            var _d = _a.classNames, list = _d.list, listDropdown = _d.listDropdown;
            var div = document.createElement('div');
            (_b = div.classList).add.apply(_b, getClassNames(list));
            (_c = div.classList).add.apply(_c, getClassNames(listDropdown));
            div.setAttribute('aria-expanded', 'false');
            return div;
        },
        notice: function (_a, innerHTML, type) {
            var _b = _a.classNames, item = _b.item, itemChoice = _b.itemChoice, addChoice = _b.addChoice, noResults = _b.noResults, noChoices = _b.noChoices, noticeItem = _b.notice;
            if (type === void 0) { type = NoticeTypes.generic; }
            var classes = __spreadArray(__spreadArray(__spreadArray([], getClassNames(item), true), getClassNames(itemChoice), true), getClassNames(noticeItem), true);
            // eslint-disable-next-line default-case
            switch (type) {
                case NoticeTypes.addChoice:
                    classes.push.apply(classes, getClassNames(addChoice));
                    break;
                case NoticeTypes.noResults:
                    classes.push.apply(classes, getClassNames(noResults));
                    break;
                case NoticeTypes.noChoices:
                    classes.push.apply(classes, getClassNames(noChoices));
                    break;
            }
            var notice = document.createElement('div');
            setElementHtml(notice, true, innerHTML);
            notice.className = classes.join(' ');
            if (type === NoticeTypes.addChoice) {
                var dataset = notice.dataset;
                dataset.choiceSelectable = '';
                dataset.choice = '';
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
        var id = element.dataset.id;
        return id ? parseInt(id, 10) : undefined;
    };
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
            this._elementType = passedElement.type;
            this._isTextElement = this._elementType === TEXT_TYPE;
            if (this._isTextElement || config.maxItemCount !== 1) {
                config.singleModeForMultiSelect = false;
            }
            if (config.singleModeForMultiSelect) {
                this._elementType = SELECT_MULTIPLE_TYPE;
            }
            this._isSelectOneElement = this._elementType === SELECT_ONE_TYPE;
            this._isSelectMultipleElement = this._elementType === SELECT_MULTIPLE_TYPE;
            this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement;
            this._canAddUserChoices = (this._isTextElement && config.addItems) || (this._isSelectElement && config.addChoices);
            if (!['auto', 'always'].includes("".concat(config.renderSelectedChoices))) {
                config.renderSelectedChoices = 'auto';
            }
            if (config.closeDropdownOnSelect === 'auto') {
                config.closeDropdownOnSelect = this._isTextElement || this._isSelectOneElement || config.singleModeForMultiSelect;
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
            this._store = new Store();
            this._currentValue = '';
            config.searchEnabled = (!this._isTextElement && config.searchEnabled) || this._elementType === SELECT_MULTIPLE_TYPE;
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
            this._direction = this.passedElement.dir;
            if (!this._direction) {
                var elementDirection = window.getComputedStyle(this.passedElement.element).direction;
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
            if (callbackOnInit && typeof callbackOnInit === 'function') {
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
            this.clearStore();
            this._stopSearch();
            this._templates = Choices.defaults.templates;
            this.initialised = false;
            this.initialisedOK = undefined;
        };
        Choices.prototype.enable = function () {
            var _a = this, passedElement = _a.passedElement, containerOuter = _a.containerOuter;
            if (passedElement.isDisabled) {
                passedElement.enable();
            }
            if (containerOuter.isDisabled) {
                this._addEventListeners();
                this.input.enable();
                containerOuter.enable();
                this._render();
            }
            return this;
        };
        Choices.prototype.disable = function () {
            var _a = this, passedElement = _a.passedElement, containerOuter = _a.containerOuter;
            if (!passedElement.isDisabled) {
                passedElement.disable();
            }
            if (!containerOuter.isDisabled) {
                this._removeEventListeners();
                this.input.disable();
                containerOuter.disable();
                this._render();
            }
            return this;
        };
        Choices.prototype.highlightItem = function (item, runEvent) {
            if (runEvent === void 0) { runEvent = true; }
            if (!item || !item.id) {
                return this;
            }
            var choice = this._store.choices.find(function (c) { return c.id === item.id; });
            if (!choice || choice.highlighted) {
                return this;
            }
            this._store.dispatch(highlightItem(choice, true));
            if (runEvent) {
                this.passedElement.triggerEvent("highlightItem" /* EventType.highlightItem */, this._getChoiceForOutput(choice));
            }
            return this;
        };
        Choices.prototype.unhighlightItem = function (item, runEvent) {
            if (runEvent === void 0) { runEvent = true; }
            if (!item || !item.id) {
                return this;
            }
            var choice = this._store.choices.find(function (c) { return c.id === item.id; });
            if (!choice || !choice.highlighted) {
                return this;
            }
            this._store.dispatch(highlightItem(choice, false));
            if (runEvent) {
                this.passedElement.triggerEvent("highlightItem" /* EventType.highlightItem */, this._getChoiceForOutput(choice));
            }
            return this;
        };
        Choices.prototype.highlightAll = function () {
            var _this = this;
            this._store.withTxn(function () {
                _this._store.items.forEach(function (item) { return _this.highlightItem(item); });
            });
            return this;
        };
        Choices.prototype.unhighlightAll = function () {
            var _this = this;
            this._store.withTxn(function () {
                _this._store.items.forEach(function (item) { return _this.unhighlightItem(item); });
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
                _this.containerOuter.open(_this.dropdown.distanceFromTopWindow);
                if (!preventInputFocus && _this._canSearch) {
                    _this.input.focus();
                }
                _this.passedElement.triggerEvent("showDropdown" /* EventType.showDropdown */);
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
                _this.passedElement.triggerEvent("hideDropdown" /* EventType.hideDropdown */);
            });
            return this;
        };
        Choices.prototype.getValue = function (valueOnly) {
            var _this = this;
            if (valueOnly === void 0) { valueOnly = false; }
            var values = this._store.items.reduce(function (selectedItems, item) {
                var itemValue = valueOnly ? item.value : _this._getChoiceForOutput(item);
                selectedItems.push(itemValue);
                return selectedItems;
            }, []);
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
        Choices.prototype.setChoices = function (choicesArrayOrFetcher, value, label, replaceChoices) {
            var _this = this;
            if (choicesArrayOrFetcher === void 0) { choicesArrayOrFetcher = []; }
            if (value === void 0) { value = 'value'; }
            if (label === void 0) { label = 'label'; }
            if (replaceChoices === void 0) { replaceChoices = false; }
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
                var items = _this._store.items;
                // Build the list of items which require preserving
                var existingItems = {};
                if (!deselectAll) {
                    items.forEach(function (choice) {
                        if (choice.id && choice.active && choice.selected && !choice.disabled) {
                            existingItems[choice.value] = true;
                        }
                    });
                }
                choicesFromOptions.forEach(function (groupOrChoice) {
                    if ('choices' in groupOrChoice) {
                        return;
                    }
                    var choice = groupOrChoice;
                    if (deselectAll) {
                        choice.selected = false;
                    }
                    else if (existingItems[choice.value]) {
                        choice.selected = true;
                    }
                });
                _this.clearStore();
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
            this._store.dispatch(removeChoice(choice));
            // @todo integrate with Store
            this._searcher.reset();
            if (choice.selected) {
                this.passedElement.triggerEvent("removeItem" /* EventType.removeItem */, this._getChoiceForOutput(choice));
            }
            return this;
        };
        Choices.prototype.clearChoices = function () {
            this.passedElement.element.innerHTML = '';
            this._store.dispatch(clearChoices());
            // @todo integrate with Store
            this._searcher.reset();
            return this;
        };
        Choices.prototype.clearStore = function () {
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
            this._clearNotice();
            if (this._isSearching) {
                this._stopSearch();
            }
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
            this.choiceList.clear();
            if (!this._canAddItems()) {
                return; // block rendering choices if the input limit is reached.
            }
            var config = this.config;
            var _a = this._store, activeGroups = _a.activeGroups, activeChoices = _a.activeChoices;
            var choiceListFragment = document.createDocumentFragment();
            var noChoices = true;
            if (activeChoices.length) {
                if (config.resetScrollPosition) {
                    requestAnimationFrame(function () { return _this.choiceList.scrollToTop(); });
                }
                // If we have grouped options
                if (activeGroups.length && !this._isSearching) {
                    if (!this._hasNonChoicePlaceholder) {
                        // If we have a placeholder choice along with groups
                        var activePlaceholders = activeChoices.filter(function (activeChoice) { return activeChoice.placeholder && activeChoice.groupId === -1; });
                        if (activePlaceholders.length) {
                            choiceListFragment = this._createChoicesFragment(activePlaceholders, choiceListFragment);
                        }
                    }
                    choiceListFragment = this._createGroupsFragment(activeGroups, activeChoices, choiceListFragment);
                }
                else {
                    choiceListFragment = this._createChoicesFragment(activeChoices, choiceListFragment);
                }
                noChoices = !choiceListFragment.childNodes.length;
            }
            var notice = this._notice;
            if (noChoices) {
                if (!notice) {
                    this._notice = {
                        text: resolveStringFunction(config.noChoicesText),
                        type: NoticeTypes.noChoices,
                    };
                }
            }
            else if (notice && notice.type === NoticeTypes.noChoices) {
                this._notice = undefined;
            }
            this._renderNotice();
            if (!noChoices) {
                this.choiceList.element.append(choiceListFragment);
                this._highlightChoice();
            }
        };
        Choices.prototype._renderItems = function () {
            var items = this._store.items || [];
            this.itemList.clear();
            // Create a fragment to store our list items
            // (so we don't have to update the DOM for each item)
            var itemListFragment = this._createItemsFragment(items);
            // If we have items to add, append them
            if (itemListFragment.childNodes.length) {
                this.itemList.element.append(itemListFragment);
            }
        };
        Choices.prototype._createGroupsFragment = function (groups, choices, fragment) {
            var _this = this;
            if (fragment === void 0) { fragment = document.createDocumentFragment(); }
            var config = this.config;
            var getGroupChoices = function (group) {
                return choices.filter(function (choice) {
                    if (_this._isSelectOneElement) {
                        return choice.groupId === group.id;
                    }
                    return choice.groupId === group.id && (config.renderSelectedChoices === 'always' || !choice.selected);
                });
            };
            // If sorting is enabled, filter groups
            if (config.shouldSort) {
                groups.sort(config.sorter);
            }
            // Add Choices without group first, regardless of sort, otherwise they won't be distinguishable
            // from the last group
            var choicesWithoutGroup = choices.filter(function (c) { return !c.groupId; });
            if (choicesWithoutGroup.length) {
                this._createChoicesFragment(choicesWithoutGroup, fragment, false);
            }
            groups.forEach(function (group) {
                var groupChoices = getGroupChoices(group);
                if (groupChoices.length) {
                    var dropdownGroup = _this._templates.choiceGroup(_this.config, group);
                    fragment.appendChild(dropdownGroup);
                    _this._createChoicesFragment(groupChoices, fragment, true);
                }
            });
            return fragment;
        };
        Choices.prototype._createChoicesFragment = function (choices, fragment, withinGroup) {
            var _this = this;
            if (fragment === void 0) { fragment = document.createDocumentFragment(); }
            if (withinGroup === void 0) { withinGroup = false; }
            // Create a fragment to store our list items (so we don't have to update the DOM for each item)
            var _a = this, config = _a.config, isSearching = _a._isSearching, isSelectOneElement = _a._isSelectOneElement;
            var searchResultLimit = config.searchResultLimit, renderChoiceLimit = config.renderChoiceLimit;
            var groupLookup = [];
            var appendGroupInSearch = config.appendGroupInSearch && isSearching;
            if (appendGroupInSearch) {
                this._store.groups.forEach(function (group) {
                    groupLookup[group.id] = group.label;
                });
            }
            if (this._isSelectElement) {
                var backingOptions = choices.filter(function (choice) { return !choice.element; });
                if (backingOptions.length) {
                    this.passedElement.addOptions(backingOptions);
                }
            }
            var skipSelected = config.renderSelectedChoices === 'auto' && !isSelectOneElement;
            var placeholderChoices = [];
            var normalChoices = [];
            choices.forEach(function (choice) {
                if ((isSearching && !choice.rank) || (skipSelected && choice.selected)) {
                    return;
                }
                if (_this._hasNonChoicePlaceholder || !choice.placeholder) {
                    normalChoices.push(choice);
                }
                else {
                    placeholderChoices.push(choice);
                }
            });
            if (isSearching) {
                // sortByRank is used to ensure stable sorting, as scores are non-unique
                // this additionally ensures fuseOptions.sortFn is not ignored
                normalChoices.sort(sortByRank);
            }
            else if (config.shouldSort) {
                normalChoices.sort(config.sorter);
            }
            var sortedChoices = isSelectOneElement && placeholderChoices.length ? __spreadArray(__spreadArray([], placeholderChoices, true), normalChoices, true) : normalChoices;
            var choiceLimit = sortedChoices.length;
            var limit = choiceLimit;
            if (isSearching && searchResultLimit > 0) {
                limit = searchResultLimit;
            }
            else if (renderChoiceLimit > 0 && !withinGroup) {
                limit = renderChoiceLimit;
            }
            if (limit < choiceLimit) {
                choiceLimit = limit;
            }
            choiceLimit--;
            // Add each choice to dropdown within range
            sortedChoices.every(function (choice, index) {
                var dropdownItem = _this._templates.choice(config, choice, config.itemSelectText);
                if (appendGroupInSearch && choice.groupId > 0) {
                    var groupName = groupLookup[choice.groupId];
                    if (groupName) {
                        dropdownItem.innerHTML += " (".concat(groupName, ")");
                    }
                }
                fragment.appendChild(dropdownItem);
                return index < choiceLimit;
            });
            return fragment;
        };
        Choices.prototype._createItemsFragment = function (items, fragment) {
            var _this = this;
            if (fragment === void 0) { fragment = document.createDocumentFragment(); }
            // Create fragment to add elements to
            var config = this.config;
            var shouldSortItems = config.shouldSortItems, sorter = config.sorter, removeItemButton = config.removeItemButton, delimiter = config.delimiter;
            // If sorting is enabled, filter items
            if (shouldSortItems && !this._isSelectOneElement) {
                items.sort(sorter);
            }
            if (this._isTextElement) {
                // Update the value of the hidden input
                this.passedElement.value = items.map(function (_a) {
                    var value = _a.value;
                    return value;
                }).join(delimiter);
            }
            var addItemToFragment = function (item) {
                // Create new list element
                var listItem = _this._templates.item(config, item, removeItemButton);
                // Append it to list
                fragment.appendChild(listItem);
            };
            // Add each list item to list
            items.forEach(addItemToFragment);
            if (this._isSelectOneElement && this._hasNonChoicePlaceholder && !items.length) {
                addItemToFragment(mapInputToChoice({
                    selected: true,
                    value: '',
                    label: this.config.placeholderValue || '',
                    active: true,
                    placeholder: true,
                }, false));
            }
            return fragment;
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
        Choices.prototype._renderNotice = function () {
            var noticeConf = this._notice;
            if (noticeConf) {
                var notice = this._templates.notice(this.config, noticeConf.text, noticeConf.type);
                this.choiceList.prepend(notice);
            }
        };
        Choices.prototype._getChoiceForOutput = function (choice, keyCode) {
            if (!choice) {
                return undefined;
            }
            var group = choice.groupId > 0 ? this._store.getGroupById(choice.groupId) : null;
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
                groupValue: group && group.label ? group.label : undefined,
                element: choice.element,
                keyCode: keyCode,
            };
        };
        Choices.prototype._triggerChange = function (value) {
            if (value === undefined || value === null) {
                return;
            }
            this.passedElement.triggerEvent("change" /* EventType.change */, {
                value: value,
            });
        };
        Choices.prototype._handleButtonAction = function (element) {
            var items = this._store.items;
            if (!items.length || !this.config.removeItems || !this.config.removeItemButton) {
                return;
            }
            var id = element && parseDataSetId(element.parentNode);
            var itemToRemove = id && items.find(function (item) { return item.id === id; });
            if (!itemToRemove) {
                return;
            }
            // Remove item associated with button
            this._removeItem(itemToRemove);
            this._triggerChange(itemToRemove.value);
            if (this._isSelectOneElement && !this._hasNonChoicePlaceholder) {
                var placeholderChoice = this._store.choices.reverse().find(function (choice) { return !choice.disabled && choice.placeholder; });
                if (placeholderChoice) {
                    this._addItem(placeholderChoice);
                    if (placeholderChoice.value) {
                        this._triggerChange(placeholderChoice.value);
                    }
                }
            }
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
                var value = this.passedElement.value;
                if (value) {
                    var elementItems = value
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
            var config = this.config;
            if (setLoading) {
                this.disable();
                this.containerOuter.addLoadingState();
                if (this._isSelectOneElement) {
                    this.itemList.clear();
                    this.itemList.element.append(this._templates.placeholder(config, config.loadingText));
                }
                else {
                    this.input.placeholder = config.loadingText;
                }
            }
            else {
                this.enable();
                this.containerOuter.removeLoadingState();
                if (!this._isSelectOneElement) {
                    this.input.placeholder = this._placeholderValue || '';
                }
            }
        };
        Choices.prototype._handleSearch = function (value) {
            if (!this.input.isFocussed) {
                return;
            }
            var choices = this._store.choices;
            var _a = this.config, searchFloor = _a.searchFloor, searchChoices = _a.searchChoices;
            var hasUnactiveChoices = choices.some(function (option) { return !option.active; });
            // Check that we have a value to search and the input was an alphanumeric character
            if (value !== null && typeof value !== 'undefined' && value.length >= searchFloor) {
                var resultCount = searchChoices ? this._searchChoices(value) : 0;
                if (resultCount !== null) {
                    // Trigger search event
                    this.passedElement.triggerEvent("search" /* EventType.search */, {
                        value: value,
                        resultCount: resultCount,
                    });
                }
            }
            else if (hasUnactiveChoices) {
                this._stopSearch();
            }
        };
        Choices.prototype._canAddItems = function () {
            var config = this.config;
            var maxItemCount = config.maxItemCount, maxItemText = config.maxItemText;
            if (!config.singleModeForMultiSelect && maxItemCount > 0 && maxItemCount <= this._store.items.length) {
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
                else if (noticeType === NoticeTypes.noResults) {
                    this._clearNotice();
                }
            }
            this._store.dispatch(filterChoices(results));
            return results.length;
        };
        Choices.prototype._stopSearch = function () {
            var wasSearching = this._isSearching;
            this._currentValue = '';
            this._isSearching = false;
            if (wasSearching) {
                this._store.dispatch(activateChoices(true));
                this.passedElement.triggerEvent("search" /* EventType.search */, {
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
            var items = this._store.items;
            var hasFocusedInput = this.input.isFocussed;
            var hasActiveDropdown = this.dropdown.isActive;
            var hasItems = this.itemList.element.hasChildNodes();
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
                    return this._onSelectKey(event, hasItems);
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
                    return this._onDeleteKey(event, items, hasFocusedInput);
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
                this._clearNotice();
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
            var ctrlKey = event.ctrlKey, metaKey = event.metaKey;
            var hasCtrlDownKeyPressed = ctrlKey || metaKey;
            // If CTRL + A or CMD + A have been pressed and there are items to select
            if (hasCtrlDownKeyPressed && hasItems) {
                this._canSearch = false;
                var shouldHightlightAll = this.config.removeItems && !this.input.value && this.input.element === document.activeElement;
                if (shouldHightlightAll) {
                    this.highlightAll();
                }
            }
        };
        Choices.prototype._onEnterKey = function (event, hasActiveDropdown) {
            var _this = this;
            var config = this.config;
            var value = this.input.value;
            var target = event.target;
            var targetWasRemoveButton = target && target.hasAttribute('data-button');
            event.preventDefault();
            if (targetWasRemoveButton) {
                this._handleButtonAction(target);
                return;
            }
            if (!hasActiveDropdown) {
                if (this._isSelectElement || this._notice) {
                    this.showDropdown();
                }
                return;
            }
            var highlightedChoice = this.dropdown.element.querySelector(getClassNamesSelector(config.classNames.highlightedState));
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
                    var userValue = config.allowHtmlUserInput || sanitisedValue === value ? value : { escaped: sanitisedValue, raw: value };
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
            if (config.closeDropdownOnSelect) {
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
            var keyCode = event.keyCode, metaKey = event.metaKey;
            // If up or down key is pressed, traverse through options
            if (hasActiveDropdown || this._isSelectOneElement) {
                this.showDropdown();
                this._canSearch = false;
                var directionInt = keyCode === 40 /* KeyCodeMap.DOWN_KEY */ || keyCode === 34 /* KeyCodeMap.PAGE_DOWN_KEY */ ? 1 : -1;
                var skipKey = metaKey || keyCode === 34 /* KeyCodeMap.PAGE_DOWN_KEY */ || keyCode === 33 /* KeyCodeMap.PAGE_UP_KEY */;
                var selectableChoiceIdentifier = '[data-choice-selectable]';
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
            var target = event.target;
            // If backspace or delete key is pressed and the input has no value
            if (!this._isSelectOneElement && !target.value && hasFocusedInput) {
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
                var hasShiftKey = event.shiftKey;
                var dataset = item.dataset;
                if ('button' in dataset) {
                    this._handleButtonAction(item);
                }
                else if ('item' in dataset) {
                    this._handleItemAction(item, hasShiftKey);
                }
                else if ('choice' in dataset) {
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
                if (!this.dropdown.isActive && !this.containerOuter.isDisabled) {
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
                var hasHighlightedItems = !!this._store.highlightedActiveItems.length;
                if (hasHighlightedItems) {
                    this.unhighlightAll();
                }
                containerOuter.removeFocusState();
                this.hideDropdown(true);
            }
        };
        Choices.prototype._onFocus = function (_a) {
            var _b;
            var _this = this;
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var focusWasWithinContainer = target && containerOuter.element.contains(target);
            if (!focusWasWithinContainer) {
                return;
            }
            var targetIsInput = target === this.input.element;
            var focusActions = (_b = {},
                _b[TEXT_TYPE] = function () {
                    if (targetIsInput) {
                        containerOuter.addFocusState();
                    }
                },
                _b[SELECT_ONE_TYPE] = function () {
                    containerOuter.addFocusState();
                    if (targetIsInput) {
                        _this.showDropdown(true);
                    }
                },
                _b[SELECT_MULTIPLE_TYPE] = function () {
                    if (targetIsInput) {
                        _this.showDropdown(true);
                        // If element is a select box, the focused element is the container and the dropdown
                        // isn't already open, focus and show dropdown
                        containerOuter.addFocusState();
                    }
                },
                _b);
            focusActions[this._elementType]();
        };
        Choices.prototype._onBlur = function (_a) {
            var _b;
            var _this = this;
            var target = _a.target;
            var containerOuter = this.containerOuter;
            var blurWasWithinContainer = target && containerOuter.element.contains(target);
            if (blurWasWithinContainer && !this._isScrollingOnIe) {
                var activeChoices = this._store.activeChoices;
                var hasHighlightedItems_1 = activeChoices.some(function (item) { return item.highlighted; });
                var targetIsInput_1 = target === this.input.element;
                var blurActions = (_b = {},
                    _b[TEXT_TYPE] = function () {
                        if (targetIsInput_1) {
                            containerOuter.removeFocusState();
                            if (hasHighlightedItems_1) {
                                _this.unhighlightAll();
                            }
                            _this.hideDropdown(true);
                        }
                    },
                    _b[SELECT_ONE_TYPE] = function () {
                        containerOuter.removeFocusState();
                        if (targetIsInput_1 || (target === containerOuter.element && !_this._canSearch)) {
                            _this.hideDropdown(true);
                        }
                    },
                    _b[SELECT_MULTIPLE_TYPE] = function () {
                        if (targetIsInput_1) {
                            containerOuter.removeFocusState();
                            _this.hideDropdown(true);
                            if (hasHighlightedItems_1) {
                                _this.unhighlightAll();
                            }
                        }
                    },
                    _b);
                blurActions[this._elementType]();
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
            var _a;
            if (el === void 0) { el = null; }
            var highlightedState = this.config.classNames.highlightedState;
            var choices = Array.from(this.dropdown.element.querySelectorAll('[data-choice-selectable]'));
            if (!choices.length) {
                return;
            }
            var passedEl = el;
            var highlightedChoices = Array.from(this.dropdown.element.querySelectorAll(getClassNamesSelector(highlightedState)));
            // Remove any highlighted choices
            highlightedChoices.forEach(function (choice) {
                var _a;
                (_a = choice.classList).remove.apply(_a, getClassNames(highlightedState));
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
            (_a = passedEl.classList).add.apply(_a, getClassNames(highlightedState));
            passedEl.setAttribute('aria-selected', 'true');
            this.passedElement.triggerEvent("highlightChoice" /* EventType.highlightChoice */, {
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
            var id = item.id;
            if (!id) {
                throw new TypeError('item.id must be set before _addItem is called for a choice/item');
            }
            if (this.config.singleModeForMultiSelect || this._isSelectOneElement) {
                this.removeActiveItems(id);
            }
            this._store.dispatch(addItem(item));
            if (withEvents) {
                this.passedElement.triggerEvent("addItem" /* EventType.addItem */, this._getChoiceForOutput(item));
                if (userTriggered) {
                    this.passedElement.triggerEvent("choice" /* EventType.choice */, this._getChoiceForOutput(item));
                }
            }
        };
        Choices.prototype._removeItem = function (item) {
            var id = item.id;
            if (!id) {
                return;
            }
            this._store.dispatch(removeItem(item));
            this.passedElement.triggerEvent("removeItem" /* EventType.removeItem */, this._getChoiceForOutput(item));
        };
        Choices.prototype._addChoice = function (choice, withEvents, userTriggered) {
            if (withEvents === void 0) { withEvents = true; }
            if (userTriggered === void 0) { userTriggered = false; }
            if (choice.id) {
                throw new TypeError('Can not re-add a choice which has already been added');
            }
            // Generate unique id, in-place update is required so chaining _addItem works as expected
            this._lastAddedChoiceId++;
            choice.id = this._lastAddedChoiceId;
            choice.elementId = "".concat(this._baseId, "-").concat(this._idNames.itemChoice, "-").concat(choice.id);
            var _a = this.config, prependValue = _a.prependValue, appendValue = _a.appendValue;
            if (prependValue) {
                choice.value = prependValue + choice.value;
            }
            if (appendValue) {
                choice.value += appendValue.toString();
            }
            if ((prependValue || appendValue) && choice.element) {
                choice.element.value = choice.value;
            }
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
            var g = group;
            this._lastAddedGroupId++;
            g.id = this._lastAddedGroupId;
            var id = group.id, choices = group.choices;
            g.choices = [];
            choices.forEach(function (item) {
                item.groupId = id;
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
            if (callbackOnCreateTemplates && typeof callbackOnCreateTemplates === 'function') {
                userTemplates = callbackOnCreateTemplates.call(this, strToEl, escapeForTemplate);
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
            var config = this.config;
            var position = config.position, classNames = config.classNames;
            var elementType = this._elementType;
            this.containerOuter = new Container({
                element: templating.containerOuter(config, this._direction, this._isSelectElement, this._isSelectOneElement, config.searchEnabled, elementType, config.labelId),
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
                element: templating.choiceList(config, this._isSelectOneElement),
            });
            this.itemList = new List({
                element: templating.itemList(config, this._isSelectOneElement),
            });
            this.dropdown = new Dropdown({
                element: templating.dropdown(config),
                classNames: classNames,
                type: elementType,
            });
        };
        Choices.prototype._createStructure = function () {
            var _a = this, containerInner = _a.containerInner, containerOuter = _a.containerOuter, passedElement = _a.passedElement, dropdown = _a.dropdown, input = _a.input;
            // Hide original element
            passedElement.conceal();
            // Wrap input in container preserving DOM ordering
            containerInner.wrap(passedElement.element);
            // Wrapper inner container with outer container
            containerOuter.wrap(containerInner.element);
            if (this._isSelectOneElement) {
                input.placeholder = this.config.searchPlaceholderValue || '';
            }
            else {
                if (this._placeholderValue) {
                    input.placeholder = this._placeholderValue;
                }
                input.setWidth();
            }
            containerOuter.element.appendChild(containerInner.element);
            containerOuter.element.appendChild(dropdown.element);
            containerInner.element.appendChild(this.itemList.element);
            dropdown.element.appendChild(this.choiceList.element);
            if (!this._isSelectOneElement) {
                containerInner.element.appendChild(input.element);
            }
            else if (this.config.searchEnabled) {
                dropdown.element.insertBefore(input.element, dropdown.element.firstChild);
            }
            this._highlightPosition = 0;
            this._isSearching = false;
        };
        Choices.prototype._initStore = function () {
            var _this = this;
            this._store.subscribe(this._render);
            this._store.withTxn(function () {
                _this._addPredefinedChoices(_this._presetChoices, _this._isSelectOneElement && !_this._hasNonChoicePlaceholder, false);
            });
            if (this._isSelectOneElement && this._hasNonChoicePlaceholder) {
                this._render({ choices: false, groups: false, items: true });
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
            var choices = this._store.choices;
            // Check 'value' property exists and the choice isn't already selected
            var foundChoice = choices.find(function (choice) { return _this.config.valueComparer(choice.value, value); });
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
        Choices.version = '11.0.0-rc8';
        return Choices;
    }());

    return Choices;

}));
