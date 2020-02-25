/* !
 * @author Sean Coker <hello@sean.is>
 * @version 1.15.0
 * @url http://sean.is/poppin/tags
 * @license MIT
 * @description Taggle is a dependency-less tagging library
 */

// @todo remove bower from next major version

(function(root, factory) {
    'use strict';
    var libName = 'Taggle';

    /* global define, module */
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            var module = factory();
            root[libName] = module;
            return module;
        });
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = root[libName] = factory();
    }
    else {
        root[libName] = factory();
    }
}(this, function() {
    'use strict';
    /////////////////////
    // Default options //
    /////////////////////

    var noop = function() {};
    var retTrue = function() {
        return true;
    };
    var BACKSPACE = 8;
    var DELETE = 46;
    var COMMA = 188;
    var TAB = 9;
    var ENTER = 13;
    var ARROW_LEFT = 37;
    var ARROW_RIGHT = 39;

    var DEFAULTS = {
        /**
         * Class names to be added on each tag entered
         * @type {String}
         */
        additionalTagClasses: '',

        /**
         * Allow duplicate tags to be entered in the field?
         * @type {Boolean}
         */
        allowDuplicates: false,

        /**
         * Allow the saving of a tag on blur, rather than it being
         * removed.
         *
         * @type {Boolean}
         */
        saveOnBlur: false,

        /**
         * Clear the input value when blurring.
         *
         * @type {Boolean}
         */
        clearOnBlur: true,

        /**
         * Class name that will be added onto duplicate existant tag
         * @type {String}
         * @todo
         * @deprecated can be handled by onBeforeTagAdd
         */
        duplicateTagClass: '',

        /**
         * Class added to the container div when focused
         * @type {String}
         */
        containerFocusClass: 'active',

        /**
         * Should the input be focused when the container is clicked?
         * @type {Bool}
         */
        focusInputOnContainerClick: true,

        /**
         * Name added to the hidden inputs within each tag
         * @type {String}
         */
        hiddenInputName: 'taggles[]',

        /**
         * Tags that should be preloaded in the div on load
         * @type {Array}
         */
        tags: [],

        /**
         * The default delimeter character to split tags on
         * @type {String}
         * @todo Change this to just "delimiter: ','"
         */
        delimeter: ',',
        delimiter: '',

        /**
         * Add an ID to each of the tags.
         * @type {Boolean}
         * @todo
         * @deprecated make this the default in next version
         */
        attachTagId: false,

        /**
         * Tags that the user will be restricted to
         * @type {Array}
         */
        allowedTags: [],

        /**
         * Tags that the user will not be able to add
         * @type {Array}
         */
        disallowedTags: [],

        /**
         * Spaces will be removed from the tags by default
         * @type {Boolean}
         */
        trimTags: true,

        /**
         * Limit the number of tags that can be added
         * @type {Number}
         */
        maxTags: null,

        /**
         * If within a form, you can specify the tab index flow
         * @type {Number}
         * @todo  make 0 in next update
         */
        tabIndex: 1,

        /**
         * Placeholder string to be placed in an empty taggle field
         * @type {String}
         */
        placeholder: 'Enter tags...',

        /**
         * Keycodes that will add a tag
         * @type {Array}
         */
        submitKeys: [COMMA, TAB, ENTER],

        /**
         * Preserve case of tags being added ie
         * "tag" is different than "Tag"
         * @type {Boolean}
         */
        preserveCase: false,

        // @todo bind callback hooks to instance

        /**
         * Function hook called with the to-be-added input DOM element.
         *
         * @param  {HTMLElement} input The input element to be added
         */
        inputFormatter: noop,

        /**
         * Function hook called with the to-be-added tag DOM element.
         * Use this function to edit the list item before it is appended
         * to the DOM
         * @param  {HTMLElement} li The list item to be added
         */
        tagFormatter: noop,

        /**
         * Function hook called before a tag is added. Return false
         * to prevent tag from being added
         * @param  {String} tag The tag to be added
         */
        onBeforeTagAdd: noop,

        /**
         * Function hook called when a tag is added
         * @param  {Event} event Event triggered when tag was added
         * @param  {String} tag The tag added
         */
        onTagAdd: noop,

        /**
         * Function hook called before a tag is removed. Return false
         * to prevent tag from being removed
         * @param  {String} tag The tag to be removed
         */
        onBeforeTagRemove: retTrue,

        /**
         * Function hook called when a tag is removed
         * @param  {Event} event Event triggered when tag was removed
         * @param  {String} tag The tag removed
         */
        onTagRemove: noop
    };

    //////////////////////
    // Helper functions //
    //////////////////////

    function _extend() {
        var master = arguments[0];
        for (var i = 1, l = arguments.length; i < l; i++) {
            var object = arguments[i];
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    master[key] = object[key];
                }
            }
        }

        return master;
    }

    function _isArray(arr) {
        if (Array.isArray) {
            return Array.isArray(arr);
        }
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

    function _on(element, eventName, handler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + eventName, handler);
        }
        else {
            element['on' + eventName] = handler;
        }
    }

    function _off(element, eventName, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent('on' + eventName, handler);
        }
        else {
            element['on' + eventName] = null;
        }
    }

    function _trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

    function _setText(el, text) {
        if (window.attachEvent && !window.addEventListener) { // <= IE8
            el.innerText = text;
        }
        else {
            el.textContent = text;
        }
    }

    function _clamp(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    /**
     * Constructor
     * @param {Mixed} el ID of an element or the actual element
     * @param {Object} options
     */
    var Taggle = function(el, options) {
        // @todo also check that option type is correct #106
        // @todo uncomment this in next major version
        // for (var key in (options || {})) {
        //     if (!DEFAULTS.hasOwnProperty(key)) {
        //         throw new Error('"' + key + '" is not a valid option.');
        //     }
        // }

        this.settings = _extend({}, DEFAULTS, options);
        this.measurements = {
            container: {
                rect: null,
                style: null,
                padding: null
            }
        };
        this.container = el;
        this.tag = {
            values: [],
            elements: []
        };
        this.list = document.createElement('ul');
        this.inputLi = document.createElement('li');
        this.input = document.createElement('input');
        this.sizer = document.createElement('div');
        this.pasting = false;
        this.placeholder = null;
        this.data = null;

        if (this.settings.placeholder) {
            this.placeholder = document.createElement('span');
        }

        if (typeof el === 'string') {
            this.container = document.getElementById(el);
        }

        this._id = 0;
        this._backspacePressed = false;
        this._inputPosition = 0;
        this._closeEvents = [];
        this._closeButtons = [];
        this._setMeasurements();
        this._setupTextarea();
        this._attachEvents();
    };

    /**
     * Gets all the layout measurements up front
     */
    Taggle.prototype._setMeasurements = function() {
        this.measurements.container.rect = this.container.getBoundingClientRect();
        this.measurements.container.style = window.getComputedStyle(this.container);

        var style = this.measurements.container.style;
        var lpad = parseInt(style['padding-left'] || style.paddingLeft, 10);
        var rpad = parseInt(style['padding-right'] || style.paddingRight, 10);
        var lborder = parseInt(style['border-left-width'] || style.borderLeftWidth, 10);
        var rborder = parseInt(style['border-right-width'] || style.borderRightWidth, 10);

        this.measurements.container.padding = lpad + rpad + lborder + rborder;
    };

    /**
     * Setup the div container for tags to be entered
     */
    Taggle.prototype._setupTextarea = function() {
        var fontSize;

        this.list.className = 'taggle_list';
        this.input.type = 'text';
        // Make sure no left/right padding messes with the input sizing
        this.input.style.paddingLeft = 0;
        this.input.style.paddingRight = 0;
        this.input.className = 'taggle_input';
        this.input.tabIndex = this.settings.tabIndex;
        this.sizer.className = 'taggle_sizer';

        if (this.settings.tags.length) {
            for (var i = 0, len = this.settings.tags.length; i < len; i++) {
                var taggle = this._createTag(this.settings.tags[i], this.tag.values.length);
                this.list.appendChild(taggle);
            }
        }

        if (this.placeholder) {
            this._hidePlaceholder();
            this.placeholder.classList.add('taggle_placeholder');
            this.container.appendChild(this.placeholder);
            _setText(this.placeholder, this.settings.placeholder);

            if (!this.settings.tags.length) {
                this._showPlaceholder();
            }
        }

        var formattedInput = this.settings.inputFormatter(this.input);
        if (formattedInput) {
            this.input = formattedInput;
        }

        this.inputLi.appendChild(this.input);
        this.list.appendChild(this.inputLi);
        this.container.appendChild(this.list);
        this.container.appendChild(this.sizer);
        fontSize = window.getComputedStyle(this.input).fontSize;
        this.sizer.style.fontSize = fontSize;
    };

    /**
     * Attaches neccessary events
     */
    Taggle.prototype._attachEvents = function() {
        var self = this;

        if (this._eventsAttached) {
            return false;
        }

        this._eventsAttached = true;

        function containerClick() {
            self.input.focus();
        }

        if (this.settings.focusInputOnContainerClick) {
            this._handleContainerClick = containerClick.bind(this);
            _on(this.container, 'click', this._handleContainerClick);
        }

        this._handleFocus = this._setFocusStateForContainer.bind(this);
        this._handleBlur = this._blurEvent.bind(this);
        this._handleKeydown = this._keydownEvents.bind(this);
        this._handleKeyup = this._keyupEvents.bind(this);

        _on(this.input, 'focus', this._handleFocus);
        _on(this.input, 'blur', this._handleBlur);
        _on(this.input, 'keydown', this._handleKeydown);
        _on(this.input, 'keyup', this._handleKeyup);

        return true;
    };

    Taggle.prototype._detachEvents = function() {
        if (!this._eventsAttached) {
            return false;
        }

        var self = this;

        this._eventsAttached = false;

        _off(this.container, 'click', this._handleContainerClick);
        _off(this.input, 'focus', this._handleFocus);
        _off(this.input, 'blur', this._handleBlur);
        _off(this.input, 'keydown', this._handleKeydown);
        _off(this.input, 'keyup', this._handleKeyup);

        this._closeButtons.forEach(function(button, i) {
            var eventFn = self._closeEvents[i];

            _off(button, 'click', eventFn);
        });

        return true;
    };

    /**
     * Resizes the hidden input where user types to fill in the
     * width of the div
     */
    Taggle.prototype._fixInputWidth = function() {
        this._setMeasurements();
        this._setInputWidth();
    };

    /**
     * Returns whether or not the specified tag text can be added
     * @param  {Event} e event causing the potentially added tag
     * @param  {String} text tag value
     * @return {Boolean}
     */
    Taggle.prototype._canAdd = function(e, text) {
        if (!text) {
            return false;
        }
        var limit = this.settings.maxTags;
        if (limit !== null && limit <= this.getTagValues().length) {
            return false;
        }

        if (this.settings.onBeforeTagAdd(e, text) === false) {
            return false;
        }

        if (!this.settings.allowDuplicates && this._hasDupes(text)) {
            return false;
        }

        var sensitive = this.settings.preserveCase;
        var allowed = this.settings.allowedTags;

        if (allowed.length && !this._tagIsInArray(text, allowed, sensitive)) {
            return false;
        }

        var disallowed = this.settings.disallowedTags;
        if (disallowed.length && this._tagIsInArray(text, disallowed, sensitive)) {
            return false;
        }

        return true;
    };

    /**
     * Returns whether a string is in an array based on case sensitivity
     *
     * @param  {String} text string to search for
     * @param  {Array} arr array of strings to search through
     * @param  {Boolean} caseSensitive
     * @return {Boolean}
     */
    Taggle.prototype._tagIsInArray = function(text, arr, caseSensitive) {
        if (caseSensitive) {
            return arr.indexOf(text) !== -1;
        }

        var lowercased = [].slice.apply(arr).map(function(str) {
            return str.toLowerCase();
        });

        return lowercased.indexOf(text) !== -1;
    };

    /**
     * Appends tag with its corresponding input to the list
     * @param  {Event} e
     * @param  {String} text
     * @param  {Number} index
     */
    Taggle.prototype._add = function(e, text, index) {
        var self = this;
        var values = text || '';
        var delimiter = this.settings.delimiter || this.settings.delimeter;

        if (typeof text !== 'string') {
            values = this.input.value;

            if (this.settings.trimTags) {
                if (values[0] === delimiter) {
                    values = values.replace(delimiter, '');
                }
                values = _trim(values);
            }
        }

        values.split(delimiter).map(function(val) {
            if (self.settings.trimTags) {
                val = _trim(val);
            }
            return self._formatTag(val);
        }).forEach(function(val) {
            if (!self._canAdd(e, val)) {
                return;
            }

            var currentTagLength = self.tag.values.length;
            var tagIndex = _clamp(index || currentTagLength, 0, currentTagLength);
            var li = self._createTag(val, tagIndex);
            var lis = self.list.children;
            var lastLi = lis[tagIndex];
            self.list.insertBefore(li, lastLi);


            val = self.tag.values[tagIndex];

            self.settings.onTagAdd(e, val);

            self.input.value = '';
            self._fixInputWidth();
            self._setFocusStateForContainer();
        });
    };

    /**
     * Removes last tag if it has already been probed
     * @param  {Event} e
     */
    Taggle.prototype._checkPrevOrNextTag = function(e) {
        e = e || window.event;

        var taggles = this.container.querySelectorAll('.taggle');
        var prevTagIndex = _clamp(this._inputPosition - 1, 0, taggles.length - 1);
        var nextTagIndex = _clamp(this._inputPosition, 0, taggles.length - 1);
        var index = prevTagIndex;

        if (e.keyCode === DELETE) {
            index = nextTagIndex;
        }

        var targetTaggle = taggles[index];
        var hotClass = 'taggle_hot';
        var isDeleteOrBackspace = [BACKSPACE, DELETE].indexOf(e.keyCode) !== -1;

        // prevent holding backspace from deleting all tags
        if (this.input.value === '' && isDeleteOrBackspace && !this._backspacePressed) {
            if (targetTaggle.classList.contains(hotClass)) {
                this._backspacePressed = true;
                this._remove(targetTaggle, e);
                this._fixInputWidth();
                this._setFocusStateForContainer();
            }
            else {
                targetTaggle.classList.add(hotClass);
            }
        }
        else if (targetTaggle.classList.contains(hotClass)) {
            targetTaggle.classList.remove(hotClass);
        }
    };

    /**
     * Setter for the hidden input.
     * @param {Number} width
     */
    Taggle.prototype._setInputWidth = function() {
        var width = this.sizer.getBoundingClientRect().width;
        var max = this.measurements.container.rect.width - this.measurements.container.padding;
        var size = parseInt(this.sizer.style.fontSize, 10);

        // 1.5 just seems to be a good multiplier here
        var newWidth = Math.round(_clamp(width + (size * 1.5), 10, max));

        this.input.style.width = newWidth + 'px';
    };

    /**
     * Checks global tags array if provided tag exists
     * @param  {String} text
     * @return {Boolean}
     */
    Taggle.prototype._hasDupes = function(text) {
        var needle = this.tag.values.indexOf(text);
        var tagglelist = this.container.querySelector('.taggle_list');
        var dupes;

        if (this.settings.duplicateTagClass) {
            dupes = tagglelist.querySelectorAll('.' + this.settings.duplicateTagClass);
            for (var i = 0, len = dupes.length; i < len; i++) {
                dupes[i].classList.remove(this.settings.duplicateTagClass);
            }
        }

        // if found
        if (needle > -1) {
            if (this.settings.duplicateTagClass) {
                tagglelist.childNodes[needle].classList.add(this.settings.duplicateTagClass);
            }
            return true;
        }

        return false;
    };

    /**
     * Checks whether or not the key pressed is acceptable
     * @param  {Number}  key code
     * @return {Boolean}
     */
    Taggle.prototype._isConfirmKey = function(key) {
        var confirmKey = false;

        if (this.settings.submitKeys.indexOf(key) > -1) {
            confirmKey = true;
        }

        return confirmKey;
    };

    // Event handlers

    /**
     * Handles focus state of div container.
     */
    Taggle.prototype._setFocusStateForContainer = function() {
        this._fixInputWidth();

        if (!this.container.classList.contains(this.settings.containerFocusClass)) {
            this.container.classList.add(this.settings.containerFocusClass);
        }

        this._hidePlaceholder();
    };

    /**
     * Runs all the events that need to happen on a blur
     * @param  {Event} e
     */
    Taggle.prototype._blurEvent = function(e) {
        if (this.container.classList.contains(this.settings.containerFocusClass)) {
            this.container.classList.remove(this.settings.containerFocusClass);
        }

        if (this.settings.saveOnBlur) {
            e = e || window.event;

            this._setInputWidth();

            if (this.input.value !== '') {
                this._confirmValidTagEvent(e);
                return;
            }

            if (this.tag.values.length) {
                this._checkPrevOrNextTag(e);
            }
        }
        else if (this.settings.clearOnBlur) {
            this.input.value = '';
            this._setInputWidth();
        }

        if (!this.tag.values.length && !this.input.value) {
            this._showPlaceholder();
        }
    };

    /**
     * Runs all the events that need to run on keydown
     * @param  {Event} e
     */
    Taggle.prototype._keydownEvents = function(e) {
        e = e || window.event;

        var key = e.keyCode;
        this.pasting = false;

        this._setInputWidth();

        if (key === 86 && e.metaKey) {
            this.pasting = true;
        }

        if (this._isConfirmKey(key) && this.input.value !== '') {
            this._confirmValidTagEvent(e);
            return;
        }

        if (this.tag.values.length) {
            this._checkPrevOrNextTag(e);
        }
    };

    /**
     * Runs all the events that need to run on keyup
     * @param  {Event} e
     */
    Taggle.prototype._keyupEvents = function(e) {
        e = e || window.event;

        this._backspacePressed = false;

        if ([ARROW_LEFT, ARROW_RIGHT].indexOf(e.keyCode) !== -1) {
            this._moveInput(e.keyCode);
            return;
        }

        _setText(this.sizer, this.input.value);

        // If we break to a new line because the text is too long
        // and decide to delete everything, we should resize the input
        // so it falls back inline
        if (!this.input.value) {
            this._setInputWidth();
        }

        if (this.pasting && this.input.value !== '') {
            this._add(e);
            this.pasting = false;
        }
    };

    Taggle.prototype._moveInput = function(direction) {
        var currentIndex = this._inputPosition;

        switch (direction) {
            case ARROW_LEFT: {
                var leftNewIndex = _clamp(this._inputPosition - 1, 0, this.tag.values.length);
                var leftIndexChanged = currentIndex !== leftNewIndex;

                this._inputPosition = leftNewIndex;

                if (leftIndexChanged) {
                    this.list.insertBefore(this.inputLi, this.list.childNodes[leftNewIndex] || null);
                    this.input.focus();
                }
                break;
            }

            case ARROW_RIGHT: {
                var rightNewIndex = _clamp(this._inputPosition + 1, 0, this.tag.values.length);
                var rightIndexChanged = currentIndex !== rightNewIndex;

                this._inputPosition = rightNewIndex;

                if (rightIndexChanged) {
                    this.list.insertBefore(this.inputLi, this.list.childNodes[rightNewIndex + 1] || null);
                    this.input.focus();
                }
                break;
            }

            default:
                break;
        }
    };

    /**
     * Confirms the inputted value to be converted to a tag
     * @param  {Event} e
     */
    Taggle.prototype._confirmValidTagEvent = function(e) {
        e = e || window.event;

        // prevents from jumping out of textarea
        if (e.preventDefault) {
            e.preventDefault();
        }
        else {
            e.returnValue = false;
        }

        this._add(e, null, this._inputPosition);
    };

    Taggle.prototype._createTag = function(text, index) {
        var li = document.createElement('li');
        var close = document.createElement('button');
        var hidden = document.createElement('input');
        var span = document.createElement('span');

        text = this._formatTag(text);

        _setText(close, '×');
        close.className = 'close';
        // IE8 does not allow you to modify the `type` property directly.
        close.setAttribute('type', 'button');

        var eventFn = this._remove.bind(this, close);

        _on(close, 'click', eventFn);

        _setText(span, text);
        span.className = 'taggle_text';

        li.className = 'taggle ' + this.settings.additionalTagClasses;

        hidden.type = 'hidden';
        hidden.value = text;
        hidden.name = this.settings.hiddenInputName;

        li.appendChild(span);
        li.appendChild(close);
        li.appendChild(hidden);

        var formatted = this.settings.tagFormatter(li);

        if (typeof formatted !== 'undefined') {
            li = formatted;
        }

        if (!(li instanceof HTMLElement) || !(li.localName === 'li' || li.tagName === 'LI')) {
            throw new Error('tagFormatter must return an li element');
        }

        if (this.settings.attachTagId) {
            this._id += 1;

            text = {
                text: text,
                id: this._id
            };
        }

        this.tag.values.splice(index, 0, text);
        this.tag.elements.splice(index, 0, li);
        this._closeEvents.splice(index, 0, eventFn);
        this._closeButtons.splice(index, 0, close);
        this._inputPosition = _clamp(this._inputPosition + 1, 0, this.tag.values.length);

        return li;
    };

    Taggle.prototype._showPlaceholder = function() {
        if (this.placeholder) {
            this.placeholder.style.opacity = 1;
            this.placeholder.setAttribute('aria-hidden', 'false');
        }
    };

    Taggle.prototype._hidePlaceholder = function() {
        if (this.placeholder) {
            this.placeholder.style.opacity = 0;
            this.placeholder.setAttribute('aria-hidden', 'true');
        }
    };

    /**
     * Removes tag from the tags collection
     * @param  {li} li List item to remove
     * @param  {Event} e
     */
    Taggle.prototype._remove = function(li, e) {
        var self = this;
        var text;
        var elem;
        var index;

        if (li.tagName.toLowerCase() !== 'li') {
            li = li.parentNode;
        }

        elem = (li.tagName.toLowerCase() === 'a') ? li.parentNode : li;
        index = this.tag.elements.indexOf(elem);

        text = this.tag.values[index];

        function done(error) {
            if (error) {
                return;
            }

            var eventFn = self._closeEvents[index];
            var button = self._closeButtons[index];

            _off(button, 'click', eventFn);

            li.parentNode.removeChild(li);

            // Going to assume the indicies match for now
            self.tag.elements.splice(index, 1);
            self.tag.values.splice(index, 1);

            self._closeEvents.splice(index, 1);
            self._closeButtons.splice(index, 1);

            self.settings.onTagRemove(e, text);

            if (index < self._inputPosition) {
                self._inputPosition = _clamp(self._inputPosition - 1, 0, self.tag.values.length);
            }

            self._setFocusStateForContainer();
        }

        var ret = this.settings.onBeforeTagRemove(e, text, done);

        if (!ret) {
            return;
        }

        done();
    };

    /**
     * Format the text for a tag
     * @param {String} text Tag text
     * @return {String}
     */
    Taggle.prototype._formatTag = function(text) {
        return this.settings.preserveCase ? text : text.toLowerCase();
    };

    Taggle.prototype._isIndexInRange = function(index) {
        return index >= 0 && index <= this.tag.values.length - 1;
    };

    Taggle.prototype.getTags = function() {
        return {
            elements: this.getTagElements(),
            values: this.getTagValues()
        };
    };

    // @todo
    // @deprecated use getTags().elements
    Taggle.prototype.getTagElements = function() {
        return [].slice.apply(this.tag.elements);
    };

    // @todo
    // @deprecated use getTags().values
    Taggle.prototype.getTagValues = function() {
        return [].slice.apply(this.tag.values);
    };

    Taggle.prototype.getInput = function() {
        return this.input;
    };

    Taggle.prototype.getContainer = function() {
        return this.container;
    };

    Taggle.prototype.add = function(text, index) {
        var isArr = _isArray(text);

        if (isArr) {
            var startingIndex = index;

            for (var i = 0, len = text.length; i < len; i++) {
                if (typeof text[i] === 'string') {
                    this._add(null, text[i], startingIndex);

                    if (!isNaN(startingIndex)) {
                        startingIndex += 1;
                    }
                }
            }
        }
        else {
            this._add(null, text, index);
        }

        return this;
    };

    Taggle.prototype.edit = function(text, index) {
        if (typeof text !== 'string') {
            throw new Error('First edit argument must be of type string');
        }

        if (typeof index !== 'number') {
            throw new Error('Second edit argument must be a number');
        }

        if (!this._isIndexInRange(index)) {
            throw new Error('Edit index should be between 0 and ' + this.tag.values.length - 1);
        }

        var textValue = this.tag.values[index];

        if (typeof textValue === 'string') {
            this.tag.values[index] = text;
        }
        else {
            this.tag.values[index].text = text;
        }

        _setText(this.tag.elements[index], text);

        return this;
    };

    Taggle.prototype.move = function(currentIndex, destinationIndex) {
        if (typeof currentIndex !== 'number' || typeof destinationIndex !== 'number') {
            throw new Error('Both arguments must be numbers');
        }

        if (!this._isIndexInRange(currentIndex)) {
            throw new Error('First index should be between 0 and ' + this.tag.values.length - 1);
        }

        if (!this._isIndexInRange(destinationIndex)) {
            throw new Error('Second index should be between 0 and ' + this.tag.values.length - 1);
        }

        if (currentIndex === destinationIndex) {
            return this;
        }

        var value = this.tag.values[currentIndex];
        var element = this.tag.elements[currentIndex];
        var lastElement = this.tag.elements[destinationIndex];
        var eventFn = this._closeEvents[currentIndex];
        var closeButton = this._closeButtons[currentIndex];

        this.tag.values.splice(currentIndex, 1);
        this.tag.elements.splice(currentIndex, 1);
        this._closeEvents.splice(currentIndex, 1);
        this._closeButtons.splice(currentIndex, 1);

        this.tag.values.splice(destinationIndex, 0, value);
        this.tag.elements.splice(destinationIndex, 0, element);
        this._closeEvents.splice(currentIndex, 0, eventFn);
        this._closeButtons.splice(currentIndex, 0, closeButton);

        this.list.insertBefore(element, lastElement.nextSibling);

        return this;
    };

    Taggle.prototype.remove = function(text, all) {
        var len = this.tag.values.length - 1;
        var found = false;

        while (len > -1) {
            var tagText = this.tag.values[len];
            if (this.settings.attachTagId) {
                tagText = tagText.text;
            }

            if (tagText === text) {
                found = true;
                this._remove(this.tag.elements[len]);
            }

            if (found && !all) {
                break;
            }

            len--;
        }

        return this;
    };

    Taggle.prototype.removeAll = function() {
        for (var i = this.tag.values.length - 1; i >= 0; i--) {
            this._remove(this.tag.elements[i]);
        }

        this._showPlaceholder();

        return this;
    };

    Taggle.prototype.setOptions = function(options) {
        this.settings = _extend({}, this.settings, options || {});

        return this;
    };

    Taggle.prototype.enable = function() {
        var buttons = [].slice.call(this.container.querySelectorAll('button'));
        var inputs = [].slice.call(this.container.querySelectorAll('input'));

        buttons.concat(inputs).forEach(function(el) {
            el.removeAttribute('disabled');
        });

        return this;
    };

    Taggle.prototype.disable = function() {
        var buttons = [].slice.call(this.container.querySelectorAll('button'));
        var inputs = [].slice.call(this.container.querySelectorAll('input'));

        buttons.concat(inputs).forEach(function(el) {
            el.setAttribute('disabled', '');
        });

        return this;
    };

    Taggle.prototype.setData = function(data) {
        this.data = data;

        return this;
    };

    Taggle.prototype.getData = function() {
        return this.data;
    };

    Taggle.prototype.attachEvents = function() {
        var self = this;

        var attached = this._attachEvents();

        if (attached) {
            this._closeButtons.forEach(function(button, i) {
                var eventFn = self._closeEvents[i];

                _on(button, 'click', eventFn);
            });
        }

        return this;
    };

    Taggle.prototype.removeEvents = function() {
        this._detachEvents();

        return this;
    };

    return Taggle;
}));
