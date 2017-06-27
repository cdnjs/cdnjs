/* !
 * @author Sean Coker <sean@seancoker.com>
 * @version 1.6.1
 * @url http://sean.is/poppin/tags
 * @license MIT
 * @description Taggle is a dependency-less tagging library
 */

(function(window, document) {
    'use strict';

    /////////////////////
    // Default options //
    /////////////////////

    var noop = function() {};

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
         * Class name that will be added onto duplicate existant tag
         * @type {String}
         * @todo
         * @deprecated
         */
        duplicateTagClass: '',

        /**
         * Class added to the container div when focused
         * @type {String}
         */
        containerFocusClass: 'active',

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
         * If within a form, you can specify the tab index flow
         * @type {Number}
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
        submitKeys: [],

        /**
         * Preserve case of tags being added ie
         * "tag" is different than "Tag"
         * @type {Boolean}
         */
        preserveCase: false,

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
        onBeforeTagRemove: noop,

        /**
         * Function hook called when a tag is removed
         * @param  {Event} event Event triggered when tag was removed
         * @param  {String} tag The tag removed
         */
        onTagRemove: noop
    };

    var BACKSPACE = 8;
    var COMMA = 188;
    var TAB = 9;
    var ENTER = 13;

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

    /**
     * Constructor
     * @param {Mixed} el ID of an element or the actual element
     * @param {Object} options
     */
    var Taggle = function(el, options) {
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

        if (this.settings.placeholder) {
            this.placeholder = document.createElement('span');
        }

        if (!this.settings.submitKeys.length) {
            this.settings.submitKeys = [COMMA, TAB, ENTER];
        }

        if (typeof el === 'string') {
            this.container = document.getElementById(el);
        }

        this._getMeasurements();
        this._setupTextarea();
        this._attachEvents();
    };

    /**
     * Gets all the layout measurements up front
     */
    Taggle.prototype._getMeasurements = function() {
        var style;
        var lpad;
        var rpad;

        this.measurements.container.rect = this.container.getBoundingClientRect();
        this.measurements.container.style = window.getComputedStyle(this.container);

        style = this.measurements.container.style;
        lpad = parseInt(style['padding-left'] || style.paddingLeft, 10);
        rpad = parseInt(style['padding-right'] || style.paddingRight, 10);

        this.measurements.container.padding = lpad + rpad;
    };

    /**
     * Setup the div container for tags to be entered
     */
    Taggle.prototype._setupTextarea = function() {
        var fontSize;

        this.list.className = 'taggle_list';
        this.input.type = 'text';
        this.input.className = 'taggle_input';
        this.input.tabIndex = this.settings.tabIndex;
        this.sizer.className = 'taggle_sizer';

        if (this.settings.tags.length) {
            for (var i = 0, len = this.settings.tags.length; i < len; i++) {
                var taggle = this._createTag(this.settings.tags[i]);
                this.list.appendChild(taggle);
            }
        }

        if (this.placeholder) {
            this.placeholder.style.opacity = 0;
            this.placeholder.classList.add('taggle_placeholder');
            this.container.appendChild(this.placeholder);
            _setText(this.placeholder, this.settings.placeholder);

            if (!this.settings.tags.length) {
                this.placeholder.style.opacity = 1;
            }
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

        _on(this.container, 'click', function() {
            self.input.focus();
        });

        _on(this.input, 'focus', this._focusInput.bind(this));
        _on(this.input, 'blur', this._blurEvent.bind(this));
        _on(this.input, 'keydown', this._keydownEvents.bind(this));
        _on(this.input, 'keyup', this._keyupEvents.bind(this));
    };

    /**
     * Resizes the hidden input where user types to fill in the
     * width of the div
     */
    Taggle.prototype._fixInputWidth = function() {
        var width;
        var inputRect;
        var rect;
        var leftPos;
        var padding;

        // Reset width incase we've broken to the next line on a backspace erase
        this._setInputWidth();

        inputRect = this.input.getBoundingClientRect();
        rect = this.measurements.container.rect;
        width = ~~rect.width;
        // Could probably just use right - left all the time
        // but eh, this check is mostly for IE8
        if (!width) {
            width = ~~rect.right - ~~rect.left;
        }
        leftPos = ~~inputRect.left - ~~rect.left;
        padding = this.measurements.container.padding;

        this._setInputWidth(width - leftPos - padding);
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
     */
    Taggle.prototype._add = function(e, text) {
        var self = this;
        var values = text || '';

        if (typeof text !== 'string') {
            values = _trim(this.input.value);
        }

        values.split(',').map(function(val) {
            return self._formatTag(val);
        }).forEach(function(val) {
            if (!self._canAdd(e, val)) {
                return;
            }

            var li = self._createTag(val);
            var lis = self.list.querySelectorAll('li');
            var lastLi = lis[lis.length - 1];
            self.list.insertBefore(li, lastLi);

            self.settings.onTagAdd(e, val);

            self.input.value = '';
            self._setInputWidth();
            self._fixInputWidth();
            self._focusInput();
        });
    };

    /**
     * Removes last tag if it has already been probed
     * @param  {Event} e
     */
    Taggle.prototype._checkLastTag = function(e) {
        e = e || window.event;

        var taggles = this.container.querySelectorAll('.taggle');
        var lastTaggle = taggles[taggles.length - 1];
        var hotClass = 'taggle_hot';
        var heldDown = this.input.classList.contains('taggle_back');

        // prevent holding backspace from deleting all tags
        if (this.input.value === '' && e.keyCode === BACKSPACE && !heldDown) {
            if (lastTaggle.classList.contains(hotClass)) {
                this.input.classList.add('taggle_back');
                this._remove(lastTaggle, e);
                this._fixInputWidth();
                this._focusInput();
            }
            else {
                lastTaggle.classList.add(hotClass);
            }
        }
        else if (lastTaggle.classList.contains(hotClass)) {
            lastTaggle.classList.remove(hotClass);
        }
    };

    /**
     * Setter for the hidden input.
     * @param {Number} width
     */
    Taggle.prototype._setInputWidth = function(width) {
        this.input.style.width = (width || 10) + 'px';
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
    Taggle.prototype._focusInput = function() {
        this._fixInputWidth();

        if (!this.container.classList.contains(this.settings.containerFocusClass)) {
            this.container.classList.add(this.settings.containerFocusClass);
        }

        if (this.placeholder) {
            this.placeholder.style.opacity = 0;
        }
    };

    /**
     * Runs all the events that need to happen on a blur
     * @param  {Event} e
     */
    Taggle.prototype._blurEvent = function(e) {
        if (this.settings.saveOnBlur) {
            e = e || window.event;

            this._listenForEndOfContainer();

            if (this.input.value !== '') {
                this._confirmValidTagEvent(e);
                return;
            }

            if (this.tag.values.length) {
                this._checkLastTag(e);
            }

        }
        else {
            this.input.value = '';
            this._setInputWidth();

            if (this.container.classList.contains(this.settings.containerFocusClass)) {
                this.container.classList.remove(this.settings.containerFocusClass);
            }

            if (!this.tag.values.length && this.placeholder) {
                this.placeholder.style.opacity = 1;
            }
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

        this._listenForEndOfContainer();

        if (key === 86 && e.metaKey) {
            this.pasting = true;
        }

        if (this._isConfirmKey(key) && this.input.value !== '') {
            this._confirmValidTagEvent(e);
            return;
        }

        if (this.tag.values.length) {
            this._checkLastTag(e);
        }
    };

    /**
     * Runs all the events that need to run on keyup
     * @param  {Event} e
     */
    Taggle.prototype._keyupEvents = function(e) {
        e = e || window.event;

        this.input.classList.remove('taggle_back');

        _setText(this.sizer, this.input.value);

        if (this.pasting && this.input.value !== '') {
            this._add(e);
            this.pasting = false;
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

        this._add(e);
    };

    /**
     * Approximates when the hidden input should break to the next line
     */
    Taggle.prototype._listenForEndOfContainer = function() {
        var width = this.sizer.getBoundingClientRect().width;
        var max = this.measurements.container.rect.width - this.measurements.container.padding;
        var size = parseInt(this.sizer.style.fontSize, 10);

        // 1.5 just seems to be a good multiplier here
        if (width + (size * 1.5) > parseInt(this.input.style.width, 10)) {
            this.input.style.width = max + 'px';
        }
    };

    Taggle.prototype._createTag = function(text) {
        var li = document.createElement('li');
        var close = document.createElement('button');
        var hidden = document.createElement('input');
        var span = document.createElement('span');

        text = this._formatTag(text);

        close.innerHTML = '&times;';
        close.className = 'close';
        _on(close, 'click', this._remove.bind(this, close));

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

        if (!(li instanceof HTMLElement) || li.tagName !== 'LI') {
            throw new Error('tagFormatter must return an li element');
        }

        this.tag.values.push(text);
        this.tag.elements.push(li);

        return li;
    };

    /**
     * Removes tag from the tags collection
     * @param  {li} li List item to remove
     * @param  {Event} e
     */
    Taggle.prototype._remove = function(li, e) {
        var span;
        var text;
        var elem;
        var index;

        if (li.tagName.toLowerCase() !== 'li') {
            li = li.parentNode;
        }

        span = li.querySelector('.taggle_text');
        text = span.innerText || span.textContent;

        if (this.settings.onBeforeTagRemove(e, text) === false) {
            return;
        }

        li.parentNode.removeChild(li);

        elem = (li.tagName.toLowerCase() === 'a') ? li.parentNode : li;
        index = this.tag.elements.indexOf(elem);

        // Going to assume the indicies match for now
        this.tag.elements.splice(index, 1);
        this.tag.values.splice(index, 1);

        this.settings.onTagRemove(e, text);

        this._focusInput();
    };

    /**
     * Format the text for a tag
     * @param {String} text Tag text
     * @return {String}
     */
    Taggle.prototype._formatTag = function(text) {
        return this.settings.preserveCase ? text : text.toLowerCase();
    };

    Taggle.prototype.getTags = function() {
        return {
            elements: this.getTagElements(),
            values: this.getTagValues()
        };
    };

    // @todo
    // @deprecated
    Taggle.prototype.getTagElements = function() {
        return this.tag.elements;
    };

    // @todo
    // @deprecated
    Taggle.prototype.getTagValues = function() {
        return [].slice.apply(this.tag.values);
    };

    Taggle.prototype.getInput = function() {
        return this.input;
    };

    Taggle.prototype.getContainer = function() {
        return this.container;
    };

    Taggle.prototype.add = function(text) {
        var isArr = _isArray(text);

        if (isArr) {
            for (var i = 0, len = text.length; i < len; i++) {
                if (typeof text[i] === 'string') {
                    this._add(null, text[i]);
                }
            }
        }
        else {
            this._add(null, text);
        }

        return this;
    };

    Taggle.prototype.remove = function(text, all) {
        var len = this.tag.values.length - 1;
        var found = false;

        while (len > -1) {
            if (this.tag.values[len] === text) {
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

        return this;
    };

    /* global define, module */
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function() {
            return Taggle;
        });
    }
    else if (typeof exports === 'object') {
        // CommonJS
        module.exports = Taggle;
    }
    else {
        // Vanilla browser global
        window.Taggle = Taggle;
    }

}(window, document));
