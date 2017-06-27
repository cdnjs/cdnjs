/*jshint scripturl:true, smarttabs:true */

 /*!
 * @author Sean Coker <sean@seancoker.com>
 * @version 1.5.0
 * @url http://sean.is/poppin/tags
 * @license MIT
 * @description Taggle is a dependency-less tagging library
 */

;(function(window, document, undefined) {

    var DEFAULTS = {

        /**
         * Class names to be added on each tag entered
         * @type {String}
         */
        additionalTagClasses:   '',

        /**
         * Allow duplicate tags to be entered in the field?
         * @type {Boolean}
         */
        allowDuplicates:        false,

        /**
         * Class name that will be added onto duplicate existant tag
         * @type {String}
         */
        duplicateTagClass:      '',

        /**
         * Class added to the container div when focused
         * @type {String}
         */
        containerFocusClass:    'active',

        /**
         * Name added to the hidden inputs within each tag
         * @type {String}
         */
        hiddenInputName:        'taggles[]',

        /**
         * Tags that should be preloaded in the div on load
         * @type {Array}
         */
        tags:                   [],

        /**
         * Tags that the user will be restricted to
         * @type {Array}
         */
        allowedTags:            [],

        /**
         * If within a form, you can specify the tab index flow
         * @type {Number}
         */
        tabIndex:               1,

        /**
         * Placeholder string to be placed in an empty taggle field
         * @type {String}
         */
        placeholder:            'Enter tags...',

        /**
         * Keycodes that will add a tag
         * @type {Array}
         */
        submitKeys:             [],

        /**
         * Function hook called when a tag is added
         * @param  {Event} event Event triggered when tag was added
         * @param  {String} tag The tag added
         */
        onTagAdd:               function() {},

        /**
         * Function hook called when a tag is removed
         * @param  {Event} event Event triggered when tag was removed
         * @param  {String} tag The tag removed
         */
        onTagRemove:            function() {}
    },

    BACKSPACE = 8,
    COMMA = 188,
    TAB = 9,
    ENTER = 13;

    /**
     * Constructor
     * @param {Mixed} el ID of an element or the actual element
     * @param {Object} options
     */
    var Taggle = function(el, options) {
        var self = this,
            settings = _extend({}, DEFAULTS, options),
            measurements = {
                container: {
                    rect: null,
                    style: null,
                    padding: null
                }
            },

            container = el,
            tag = {
                values: [],
                elements: []
            },

            list = document.createElement('ul'),
            input_li = document.createElement('li'),
            input = document.createElement('input'),
            sizer = document.createElement('div'),
            placeholder;

        if (settings.placeholder) {
            placeholder = document.createElement('span');
        }

        if (!settings.submitKeys.length) {
            settings.submitKeys = [COMMA, TAB, ENTER];
        }

        if (typeof el === 'string') {
            container = document.getElementById(el);
        }

        function _init() {
            _getMeasurements();
            _setupTextarea();
            _attachEvents();
        }

        /**
         * Gets all the layout measurements up front
         */
        function _getMeasurements() {
            var style,
                lpad, rpad;

            measurements.container.rect = container.getBoundingClientRect();
            measurements.container.style = window.getComputedStyle(container);

            style = measurements.container.style;
            lpad = parseInt(style['padding-left'] || style.paddingLeft, 10);
            rpad = parseInt(style['padding-right'] || style.paddingRight, 10);
            measurements.container.padding =  lpad + rpad;
        }

        /**
         * Setup the div container for tags to be entered
         */
        function _setupTextarea() {
            var font_size;

            list.className = 'taggle_list';
            input.type = 'text';
            input.className = 'taggle_input';
            input.tabIndex = settings.tabIndex;
            sizer.className = 'taggle_sizer';

            if (settings.tags.length) {
                for (var i = 0, len = settings.tags.length; i < len; i++) {
                    var tag = _createTag(settings.tags[i]);
                    list.appendChild(tag);
                }
            }

            if (placeholder) {
                placeholder.style.opacity = 0;
                placeholder.classList.add('taggle_placeholder');
                container.appendChild(placeholder);
                _setText(placeholder, settings.placeholder);

                if (!settings.tags.length) {
                    placeholder.style.opacity = 1;
                }
            }

            input_li.appendChild(input);
            list.appendChild(input_li);
            container.appendChild(list);
            container.appendChild(sizer);
            font_size = window.getComputedStyle(input).fontSize;
            sizer.style.fontSize = font_size;
        }

        /**
         * Attaches neccessary events
         */
        function _attachEvents() {
            _on(container, 'click', function() {
                input.focus();
            });

            input.onfocus = _focusInput;
            input.onblur = _blurInput;

            _on(input, 'keydown', _keydownEvents);
            _on(input, 'keyup', _keyupEvents);
        }

        /**
         * Resizes the hidden input where user types to fill in the
         * width of the div
         */
        function _fixInputWidth() {
            var width,
                input_rect, rect,
                left_pos,
                padding;
            //reset width incase we've broken to the next line on a backspace erase
            _setInputWidth();

            input_rect = input.getBoundingClientRect();
            rect = measurements.container.rect;
            width = ~~rect.width;
            // Could probably just use right - left all the time
            // but eh, this check is mostly for IE8
            if (!width) {
                width = ~~rect.right - ~~rect.left;
            }
            left_pos = ~~input_rect.left - ~~rect.left;
            padding = measurements.container.padding;

            _setInputWidth(width - left_pos - padding);
        }

        /**
         * Returns whether or not the specified tag text can be added
         * @param  {String} text tag value
         * @return {Boolean}
         */
        function _canAdd(text) {
            if (!text) {
                return false;
            }

            if (!settings.allowDuplicates && _hasDupes(text)) {
                return false;
            }

            if (settings.allowedTags.length && settings.allowedTags.indexOf(text) === -1) {
                return false;
            }

            return true;
        }

        /**
         * Appends tag with its corresponding input to the list
         * @param  {String} tag
         */
        function _add(e, text) {
            var val = typeof text === 'string' ? text.toLowerCase() : _trim(input.value.toLowerCase()),
                li,
                lis,
                last_li;

            if (!_canAdd(val)) {
                return;
            }

            li = _createTag(val);
            lis = list.querySelectorAll('li');
            last_li = lis[lis.length - 1];
            list.insertBefore(li, last_li);

            settings.onTagAdd(e, val);

            input.value = '';
            _setInputWidth();
            _fixInputWidth();
            _focusInput();
        }

        /**
         * Removes last tag if it has already been probed
         */
        function _checkLastTag(e) {
            e = e || window.event;

            var taggles = container.querySelectorAll('.taggle'),
                last_taggle = taggles[taggles.length - 1],
                hot_class = 'taggle_hot',
                held_down = input.classList.contains('taggle_back');

            //prevent holding backspace from deleting all tags
            if (input.value === '' && e.keyCode === BACKSPACE && !held_down) {
                if (last_taggle.classList.contains(hot_class)) {
                    input.classList.add('taggle_back');
                    _remove(last_taggle, e);
                    _fixInputWidth();
                    _focusInput();
                }
                else {
                    last_taggle.classList.add(hot_class);
                }
            }
            else if (last_taggle.classList.contains(hot_class)) {
                last_taggle.classList.remove(hot_class);
            }
        }

        /**
         * Setter for the hidden input.
         * @param {Number} width
         */
        function _setInputWidth(width) {
            input.style.width = (width || 10) + 'px';
        }

        /**
         * Checks global tags array if provided tag exists
         * @param  {String} tag
         */
        function _hasDupes(text) {
            var needle = tag.values.indexOf(text),
                taggle_list = container.querySelector('.taggle_list'),
                dupes;

            if (settings.duplicateTagClass) {
                dupes = taggle_list.querySelectorAll('.' + settings.duplicateTagClass);
                for (var i = 0, len = dupes.length; i < len; i++) {
                    dupes[i].classList.remove(settings.duplicateTagClass);
                }
            }

            //if found
            if (needle > -1) {
                if (settings.duplicateTagClass) {
                    taggle_list.childNodes[needle].classList.add(settings.duplicateTagClass);
                }
                return true;
            }

            return false;
        }

        /**
         * Checks whether or not the key pressed is acceptable
         * @param  {Number}  key code
         * @return {Boolean}
         */
        function _isConfirmKey(key) {
            var confirm_key = false;

            if (settings.submitKeys.indexOf(key) > -1) {
                confirm_key = true;
            }

            return confirm_key;
        }

        //event handlers

        /**
         * Handles focus state of div container.
         */
        function _focusInput() {
            _fixInputWidth();

            if (!container.classList.contains(settings.containerFocusClass)) {
                container.classList.add(settings.containerFocusClass);
            }

            if (placeholder) {
                placeholder.style.opacity = 0;
            }
        }

        /**
         * Sets state of container when blurred
         */
        function _blurInput() {
            input.value = '';
            _setInputWidth();

            if (container.classList.contains(settings.containerFocusClass)) {
                container.classList.remove(settings.containerFocusClass);
            }

            if (!tag.values.length && placeholder) {
                placeholder.style.opacity = 1;
            }
        }

        /**
         * Runs all the events that need to run on keydown
         * @param  {Event} e
         */
         function _keydownEvents(e) {
            e = e || window.event;

            var key = e.keyCode;

            _listenForEndOfContainer();

            if (_isConfirmKey(key) && input.value !== '') {
                _confirmValidTagEvent(e);
                return;
            }

            if (tag.values.length) {
                _checkLastTag(e);
            }
        }

        /**
         * Runs all the events that need to run on keyup
         * @param  {Event} e
         */
        function _keyupEvents(e) {
            e = e || window.event;

            input.classList.remove('taggle_back');

            _setText(sizer, input.value);
        }

        /**
         * Confirms the inputted value to be converted to a tag
         * @param  {Event} e
         * @return {Boolean}
         */
        function _confirmValidTagEvent(e) {
            e = e || window.event;

            _add(e);

            //prevents from jumping out of textarea
            if (e.preventDefault) {
                e.preventDefault();
            }
            else {
                e.returnValue = false;
            }
        }

        /**
         * Approximates when the hidden input should break to the next line
         */
        function _listenForEndOfContainer() {
            var width = sizer.getBoundingClientRect().width,
                max = measurements.container.rect.width - measurements.container.padding,
                size = parseInt(sizer.style.fontSize, 10);

            //1.5 just seems to be a good multiplier here
            if (width + (size * 1.5) > parseInt(input.style.width, 10)) {
                input.style.width = max + 'px';
            }
        }

        function _createTag(text) {
            var li = document.createElement('li'),
                close = document.createElement('a'),
                hidden = document.createElement('input'),
                span = document.createElement('span');

            text = text.toLowerCase();

            close.href = 'javascript:void(0)';
            close.innerHTML = '&times;';
            close.className = 'close';
            close.onclick = _remove.bind(null, close);

            _setText(span, text);
            span.className = 'taggle_text';

            li.className = 'taggle ' + settings.additionalTagClasses;

            hidden.type = 'hidden';
            hidden.value = text;
            hidden.name = settings.hiddenInputName;

            li.appendChild(span);
            li.appendChild(close);
            li.appendChild(hidden);

            tag.values.push(text);
            tag.elements.push(li);

            return li;
        }

        /**
         * Removes tag from the tags collection
         * @param  {li} li List item to remove
         * @param  {Event} e
         */
        function _remove(li, e) {
            var span,
                text;

            if (li.tagName.toLowerCase() !== 'li') {
                li = li.parentNode;
            }

            span = li.querySelector('.taggle_text');
            text = span.innerText || span.textContent;

            settings.onTagRemove(e, text);

            li.parentNode.removeChild(li);
            _removeFromTheTags(li, tag);

            _focusInput();
        }

        self.getTags = function() {
            return tag;
        };

        self.getTagElements = function() {
            return tag.elements;
        };

        self.getTagValues = function() {
            return tag.values;
        };

        self.getInput = function() {
            return input;
        };

        self.getContainer = function() {
            return container;
        };

        self.add = function(text) {
            var is_arr = _isArray(text);

            if (typeof text === 'string') {
                return _add(null, text);
            }

            if (is_arr) {
                for (var i = 0, len = text.length; i < len; i++) {
                    if (typeof text[i] === 'string') {
                        _add(null, text[i]);
                    }
                }
            }

            return self;
        };

        self.remove = function(text, all) {
            var len = tag.values.length - 1,
                found = false;

            while (len > -1) {
                if (tag.values[len] === text) {
                    found = true;
                    _remove(tag.elements[len]);
                }

                if (found && !all) {
                    break;
                }

                len--;
            }

            return self;
        };

        // Bang bang bang skeet skeet
        _init();
    };


    function _extend() {
        if (arguments.length < 2) {
            return;
        }
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

    /**
     * Grabs the text from the li item and removes it from global array
     * @param  {Element} el
     */
    function _removeFromTheTags(el, tag) {
        var elem = (el.tagName.toLowerCase() === 'a') ? el.parentNode : el,
            index = tag.elements.indexOf(elem);

        // Going to assume the indicies match for now
        tag.elements.splice(index, 1);
        tag.values.splice(index, 1);
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

    window.Taggle = Taggle;

}(window, document));
