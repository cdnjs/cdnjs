!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Select3=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
_dereq_(4);_dereq_(5);_dereq_(6);_dereq_(8);_dereq_(9);_dereq_(10);_dereq_(11);_dereq_(12);_dereq_(13);_dereq_(14);_dereq_(15);_dereq_(16);_dereq_(17);_dereq_(18);module.exports=_dereq_(7);
},{}],2:[function(_dereq_,module,exports){
'use strict';

/**
 * @license
 * lodash 3.3.1 (Custom Build) <https://lodash.com/>
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch
 *  (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @category Date
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => logs the number of milliseconds it took for the deferred function to be invoked
 */
var now = Date.now;

/**
 * Creates a function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time it was invoked.
 *
 * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // avoid costly calculations while the window size is in flux
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 */
function debounce(func, wait) {
    var args,
        result,
        stamp,
        timeoutId,
        trailingCall,
        lastCalled = 0;

    wait = wait < 0 ? 0 : (+wait || 0);

    function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
            var isCalled = trailingCall;
            timeoutId = trailingCall = undefined;
            if (isCalled) {
                lastCalled = now();
                result = func.apply(null, args);
                if (!timeoutId) {
                    args = null;
                }
            }
        } else {
            timeoutId = setTimeout(delayed, remaining);
        }
    }

    function debounced() {
        args = arguments;
        stamp = now();
        trailingCall = true;

        if (!timeoutId) {
            timeoutId = setTimeout(delayed, wait);
        }
        return result;
    }
    return debounced;
}

module.exports = debounce;

},{}],3:[function(_dereq_,module,exports){
'use strict';

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

/**
 * Used by `escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} match The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(match) {
    return htmlEscapes[match];
}

var reUnescapedHtml = new RegExp('[' + Object.keys(htmlEscapes).join('') + ']', 'g');

/**
 * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
 * corresponding HTML entities.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {string} string The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('Fred, Wilma, & Pebbles');
 * // => 'Fred, Wilma, &amp; Pebbles'
 */
function escape(string) {
    return string ? String(string).replace(reUnescapedHtml, escapeHtmlChar) : '';
}

module.exports = escape;

},{}],4:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var debounce = _dereq_(2);

var Select3 = _dereq_(7);

_dereq_(12);

/**
 * Option listener that implements a convenience query function for performing AJAX requests.
 */
Select3.OptionListeners.unshift(function(select3, options) {

    var ajax = options.ajax;
    if (ajax && ajax.url) {
        var formatError = ajax.formatError || Select3.Locale.ajaxError;
        var minimumInputLength = ajax.minimumInputLength || 0;
        var params = ajax.params;
        var processItem = ajax.processItem || function(item) { return item; };
        var quietMillis = ajax.quietMillis || 0;
        var resultsCb = ajax.results || function(data) { return { results: data, more: false }; };
        var transport = ajax.transport || $.ajax;

        if (quietMillis) {
            transport = debounce(transport, quietMillis);
        }

        options.query = function(queryOptions) {
            var offset = queryOptions.offset;
            var term = queryOptions.term;
            if (term.length < minimumInputLength) {
                queryOptions.error(
                    Select3.Locale.needMoreCharacters(minimumInputLength - term.length)
                );
            } else {
                select3.dropdown.showLoading();

                var url = (ajax.url instanceof Function ? ajax.url() : ajax.url);
                if (params) {
                    url += (url.indexOf('?') > -1 ? '&' : '?') + $.param(params(term, offset));
                }

                var success = ajax.success;
                var error = ajax.error;

                transport($.extend({}, ajax, {
                    url: url,
                    success: function(data, textStatus, jqXHR) {
                        if (success) {
                            success(data, textStatus, jqXHR);
                        }

                        var results = resultsCb(data, offset);
                        results.results = results.results.map(processItem);
                        queryOptions.callback(results);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        if (error) {
                            error(jqXHR, textStatus, errorThrown);
                        }

                        queryOptions.error(
                            formatError(term, jqXHR, textStatus, errorThrown),
                            { escape: false }
                        );
                    }
                }));
            }
        };
    }
});

},{}],5:[function(_dereq_,module,exports){
'use strict';

var Select3 = _dereq_(7);

var latestQueryNum = 0;

/**
 * Option listener that will discard any callbacks from the query function if another query has
 * been called afterwards. This prevents responses from remote sources arriving out-of-order.
 */
Select3.OptionListeners.push(function(select3, options) {

    var query = options.query;
    if (query) {
        options.query = function(queryOptions) {
            latestQueryNum++;
            var queryNum = latestQueryNum;

            var callback = queryOptions.callback;
            var error = queryOptions.error;
            queryOptions.callback = function() {
                if (queryNum === latestQueryNum) {
                    callback.apply(null, arguments);
                }
            };
            queryOptions.error = function() {
                if (queryNum === latestQueryNum) {
                    error.apply(null, arguments);
                }
            };
            query(queryOptions);
        };
    }
});

},{}],6:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Select3Dropdown = _dereq_(9);

var BACKDROP_Z_INDEX = 9998;
var FOREGROUND_Z_INDEX = 9999;

/**
 * Methods.
 */
$.extend(Select3Dropdown.prototype, {

    /**
     * @inherit
     */
    addToDom: function() {

        var $select3El = this.select3.$el;
        $select3El.css({ zIndex: FOREGROUND_Z_INDEX, position: 'relative' });
        this.$el.appendTo($select3El[0].ownerDocument.body).css('zIndex', FOREGROUND_Z_INDEX);
    },

    /**
     * @inherit
     */
    removeCloseHandler: function() {

        if (this._$backdrop && !this.parentMenu) {
            this._$backdrop.remove();
            this._$backdrop = null;
        }
    },

    /**
     * @inherit
     */
    setupCloseHandler: function() {

        var $backdrop;
        if (this.parentMenu) {
            $backdrop = this.parentMenu._$backdrop;
        } else {
            $backdrop = $('<div>').addClass('.select3-backdrop').css({
                background: 'transparent',
                bottom: 0,
                left: 0,
                position: 'fixed',
                right: 0,
                top: 0,
                zIndex: BACKDROP_Z_INDEX
            });

            $('body').append($backdrop);
        }

        $backdrop.on('click', this.close.bind(this));

        this._$backdrop = $backdrop;
    }

});

},{}],7:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

/**
 * Create a new Select3 instance or invoke a method on an instance.
 *
 * @param methodName Optional name of a method to call. If omitted, a Select3 instance is created
 *                   for each element in the set of matched elements. If an element in the set
 *                   already has a Select3 instance, the result is the same as if the setOptions()
 *                   method is called.
 * @param options Optional options object to pass to the given method or the constructor. See the
 *                documentation for the respective methods to see which options they accept. In case
 *                a new instance is being created, the following property is used:
 *                inputType - The input type to use. Default input types include 'Multiple' and
 *                            'Single', but you can add custom input types to the InputTypes map or
 *                            just specify one here as a function. The default value is 'Single',
 *                            unless multiple is true in which case it is 'Multiple'.
 *                multiple - Boolean determining whether multiple items may be selected
 *                           (default: false). If true, a MultipleSelect3 instance is created,
 *                           otherwise a SingleSelect3 instance is created.
 *
 * @return If the given method returns a value, this method returns the value of that method
 *         executed on the first element in the set of matched elements.
 */
function select3(methodName, options) {
    /* jshint validthis: true */

    var result;

    this.each(function() {
        var instance = this.select3;

        if (instance) {
            if ($.type(methodName) !== 'string') {
                options = methodName;
                methodName = 'setOptions';
            }

            if ($.type(instance[methodName]) === 'function') {
                if (result === undefined) {
                    result = instance[methodName].call(instance, options);
                }
            } else {
                throw new Error('Unknown method: ' + methodName);
            }
        } else {
            if ($.type(methodName) === 'string') {
                if (methodName !== 'destroy') {
                    throw new Error('Cannot call method on element without Select3 instance');
                }
            } else {
                options = $.extend({}, methodName, { element: this });

                // this is a one-time hack to facilitate the select3-traditional module, because
                // the module is not able to hook this early into creation of the instance
                var $this = $(this);
                if ($this.is('select') && $this.prop('multiple')) {
                    options.multiple = true;
                }

                var InputTypes = Select3.InputTypes;
                var InputType = (options.inputType || (options.multiple ? 'Multiple' : 'Single'));
                if ($.type(InputType) !== 'function') {
                    if (InputTypes[InputType]) {
                        InputType = InputTypes[InputType];
                    } else {
                        throw new Error('Unknown Select3 input type: ' + InputType);
                    }
                }

                this.select3 = new InputType(options);
            }
        }
    });

    return (result === undefined ? this : result);
}

/**
 * Select3 Base Constructor.
 *
 * You will never use this constructor directly. Instead, you use $(selector).select3(options) to
 * create an instance of either MultipleSelect3 or SingleSelect3. This class defines all
 * functionality that is common between both.
 *
 * @param options Options object. Accepts the same options as the setOptions method(), in addition
 *                to the following ones:
 *                data - Initial selection data to set. This should be an array of objects with 'id'
 *                       and 'text' properties. This option is mutually exclusive with 'value'.
 *                element - The DOM element to which to attach the Select3 instance. This property
 *                          is set automatically by the $.fn.select3() function.
 *                value - Initial value to set. This should be an array of IDs. This property is
 *                        mutually exclusive with 'data'.
 */
function Select3(options) {

    if (!(this instanceof Select3)) {
        return select3.apply(this, arguments);
    }

    /**
     * jQuery container for the element to which this instance is attached.
     */
    this.$el = $(options.element);

    /**
     * jQuery container for the search input.
     *
     * May be null as long as there is no visible search input. It is set by initSearchInput().
     */
    this.$searchInput = null;

    /**
     * Reference to the currently open dropdown.
     */
    this.dropdown = null;

    /**
     * Whether the input is enabled.
     *
     * This is false when the option readOnly is false or the option removeOnly is false.
     */
    this.enabled = true;

    /**
     * Boolean whether the browser has touch input.
     */
    this.hasTouch = (typeof window !== 'undefined' && 'ontouchstart' in window);

    /**
     * Boolean whether the browser has a physical keyboard attached to it.
     *
     * Given that there is no way for JavaScript to reliably detect this yet, we just assume it's
     * the opposite of hasTouch for now.
     */
    this.hasKeyboard = !this.hasTouch;

    /**
     * Array of items from which to select. If set, this will be an array of objects with 'id' and
     * 'text' properties.
     *
     * If given, all items are expected to be available locally and all selection operations operate
     * on this local array only. If null, items are not available locally, and a query function
     * should be provided to fetch remote data.
     */
    this.items = null;

    /**
     * The function to be used for matching search results.
     */
    this.matcher = Select3.matcher;

    /**
     * Options passed to the Select3 instance or set through setOptions().
     */
    this.options = {};

    /**
     * Results from a search query.
     */
    this.results = [];

    /**
     * Array of search input listeners.
     *
     * Custom listeners can be specified in the options object.
     */
    this.searchInputListeners = Select3.SearchInputListeners;

    /**
     * Mapping of templates.
     *
     * Custom templates can be specified in the options object.
     */
    this.templates = $.extend({}, Select3.Templates);

    /**
     * The last used search term.
     */
    this.term = '';

    this.setOptions(options);

    if (options.value) {
        this.value(options.value, { triggerChange: false });
    } else {
        this.data(options.data || null, { triggerChange: false });
    }

    this._events = [];

    this.$el.on('select3-close', this._closed.bind(this));

    this.delegateEvents();
}

/**
 * Methods.
 */
$.extend(Select3.prototype, {

    /**
     * Convenience shortcut for this.$el.find(selector).
     */
    $: function(selector) {

        return this.$el.find(selector);
    },

    /**
     * Closes the dropdown.
     */
    close: function() {

        if (this.dropdown) {
            this.dropdown.close();
        }
    },

    /**
     * Sets or gets the selection data.
     *
     * The selection data contains both IDs and text labels. If you only want to set or get the IDs,
     * you should use the value() method.
     *
     * @param newData Optional new data to set. For a MultipleSelect3 instance the data must be
     *                an array of objects with 'id' and 'text' properties, for a SingleSelect3
     *                instance the data must be a single such object or null to indicate no item is
     *                selected.
     * @param options Optional options object. May contain the following property:
     *                triggerChange - Set to false to suppress the "change" event being triggered.
     *
     * @return If newData is omitted, this method returns the current data.
     */
    data: function(newData, options) {

        options = options || {};

        if (newData === undefined) {
            return this._data;
        } else {
            newData = this.validateData(newData);

            this._data = newData;
            this._value = this.getValueForData(newData);

            if (options.triggerChange !== false) {
                this.triggerChange();
            }
        }
    },

    /**
     * Attaches all listeners from the events map to the instance's element.
     *
     * Normally, you should not have to call this method yourself as it's called automatically in
     * the constructor.
     */
    delegateEvents: function() {

        this.undelegateEvents();

        $.each(this.events, function(event, listener) {
            var selector, index = event.indexOf(' ');
            if (index > -1) {
                selector = event.slice(index + 1);
                event = event.slice(0, index);
            }

            if ($.type(listener) === 'string') {
                listener = this[listener];
            }

            listener = listener.bind(this);

            if (selector) {
                this.$el.on(event, selector, listener);
            } else {
                this.$el.on(event, listener);
            }

            this._events.push({ event: event, selector: selector, listener: listener });
        }.bind(this));
    },

    /**
     * Destroys the Select3 instance.
     */
    destroy: function() {

        this.undelegateEvents();

        var $el = this.$el;
        $el.children().remove();
        $el[0].select3 = null;
        $el = null;
    },

    /**
     * Filters the results to be displayed in the dropdown.
     *
     * The default implementation simply returns the results unfiltered, but the MultiSelect3 class
     * overrides this method to filter out any items that have already been selected.
     *
     * @param results Array of items with 'id' and 'text' properties.
     *
     * @return The filtered array.
     */
    filterResults: function(results) {

        return results;
    },

    /**
     * Applies focus to the input.
     */
    focus: function() {

        if (this.$searchInput) {
            this.$searchInput.focus();
        }
    },

    /**
     * Returns the correct item for a given ID.
     *
     * @param id The ID to get the item for.
     *
     * @return The corresponding item. Will be an object with 'id' and 'text' properties or null if
     *         the item cannot be found. Note that if no items are defined, this method assumes the
     *         text labels will be equal to the IDs.
     */
    getItemForId: function(id) {

        var items = this.items;
        if (items) {
            return Select3.findNestedById(items, id);
        } else {
            return { id: id, text: '' + id };
        }
    },

    /**
     * Initializes the search input element.
     *
     * Sets the $searchInput property, invokes all search input listeners and attaches the default
     * action of searching when something is typed.
     */
    initSearchInput: function($input) {

        this.$searchInput = $input;

        this.searchInputListeners.forEach(function(listener) {
            listener(this, $input);
        }.bind(this));

        $input.on('keyup', function(event) {
            if (!event.isDefaultPrevented()) {
                this.search();
            }
        }.bind(this));
    },

    /**
     * Loads a follow-up page with results after a search.
     *
     * This method should only be called after a call to search() when the callback has indicated
     * more results are available.
     */
    loadMore: function() {

        this.options.query({
            callback: function(response) {
                if (response && response.results) {
                    this._addResults(
                        Select3.processItems(response.results),
                        { hasMore: !!response.more }
                    );
                } else {
                    throw new Error('callback must be passed a response object');
                }
            }.bind(this),
            error: this._addResults.bind(this, []),
            offset: this.results.length,
            select3: this,
            term: this.term,
        });
    },

    /**
     * Opens the dropdown.
     *
     * @param options Optional options object. May contain the following property:
     *                showSearchInput - Boolean whether a search input should be shown in the
     *                                  dropdown. Default is false.
     */
    open: function(options) {

        options = options || {};

        if (!this.dropdown) {
            if (this.triggerEvent('select3-opening')) {
                var Dropdown = this.options.dropdown || Select3.Dropdown;
                if (Dropdown) {
                    this.dropdown = new Dropdown({
                        position: this.options.positionDropdown,
                        select3: this,
                        showSearchInput: options.showSearchInput
                    });
                }

                this.search('');
            }
        }
    },

    /**
     * (Re-)positions the dropdown.
     */
    positionDropdown: function() {

        if (this.dropdown) {
            this.dropdown.position();
        }
    },

    /**
     * Searches for results based on the term entered in the search input.
     *
     * If an items array has been passed with the options to the Select3 instance, a local search
     * will be performed among those items. Otherwise, the query function specified in the options
     * will be used to perform the search. If neither is defined, nothing happens.
     *
     * @param term Optional term to search for. If ommitted, the value of the search input element
     *             is used as term.
     */
    search: function(term) {

        var self = this;
        function setResults(results, resultOptions) {
            self._setResults(results, $.extend({ term: term }, resultOptions));
        }

        if (term === undefined) {
            if (!self.$searchInput) {
                return;
            }

            term = self.$searchInput.val();
        }

        if (self.items) {
            term = Select3.transformText(term);
            var matcher = self.matcher;
            setResults(self.items.map(function(item) {
                return matcher(item, term);
            }).filter(function(item) {
                return !!item;
            }));
        } else if (self.options.query) {
            self.options.query({
                callback: function(response) {
                    if (response && response.results) {
                        setResults(
                            Select3.processItems(response.results),
                            { hasMore: !!response.more }
                        );
                    } else {
                        throw new Error('callback must be passed a response object');
                    }
                },
                error: self._showError.bind(self),
                offset: 0,
                select3: self,
                term: term,
            });
        }

        self.term = term;
    },

    /**
     * Sets one or more options on this Select3 instance.
     *
     * @param options Options object. May contain one or more of the following properties:
     *                closeOnSelect - Set to false to keep the dropdown open after the user has
     *                                selected an item. This is useful if you want to allow the user
     *                                to quickly select multiple items. The default value is true.
     *                dropdown - Custom dropdown implementation to use for this instance.
     *                initSelection - Function to map values by ID to selection data. This function
     *                                receives two arguments, 'value' and 'callback'. The value is
     *                                the current value of the selection, which is an ID or an array
     *                                of IDs depending on the input type. The callback should be
     *                                invoked with an object or array of objects, respectively,
     *                                containing 'id' and 'text' properties.
     *                items - Array of items from which to select. Should be an array of objects
     *                        with 'id' and 'text' properties. As convenience, you may also pass an
     *                        array of strings, in which case the same string is used for both the
     *                        'id' and 'text' properties. If items are given, all items are expected
     *                        to be available locally and all selection operations operate on this
     *                        local array only. If null, items are not available locally, and a
     *                        query function should be provided to fetch remote data.
     *                matcher - Function to determine whether text matches a given search term. Note
     *                          this function is only used if you have specified an array of items.
     *                          Receives two arguments:
     *                          item - The item that should match the search term.
     *                          term - The search term. Note that for performance reasons, the term
     *                                 has always been already processed using
     *                                 Select3.transformText().
     *                          The method should return the item if it matches, and null otherwise.
     *                          If the item has a children array, the matcher is expected to filter
     *                          those itself (be sure to only return the filtered array of children
     *                          in the returned item and not to modify the children of the item
     *                          argument).
     *                placeholder - Placeholder text to display when the element has no focus and
     *                              no selected items.
     *                positionDropdown - Function to position the dropdown. Receives two arguments:
     *                                   $dropdownEl - The element to be positioned.
     *                                   $selectEl - The element of the Select3 instance, that you
     *                                               can position the dropdown to.
     *                                   The default implementation positions the dropdown element
     *                                   under the Select3's element and gives it the same width.
     *                query - Function to use for querying items. Receives a single object as
     *                        argument with the following properties:
     *                        callback - Callback to invoke when the results are available. This
     *                                   callback should be passed a single object as argument with
     *                                   the following properties:
     *                                   more - Boolean that can be set to true to indicate there
     *                                          are more results available. Additional results may
     *                                          be fetched by the user through pagination.
     *                                   results - Array of result items. The format for the result
     *                                             items is the same as for passing local items.
     *                        offset - This property is only used for pagination and indicates how
     *                                 many results should be skipped when returning more results.
     *                        select3 - The Select3 instance the query function is used on.
     *                        term - The search term the user is searching for. Unlike with the
     *                               matcher function, the term has not been processed using
     *                               Select3.transformText().
     *                readOnly - If true, disables any modification of the input.
     *                removeOnly - If true, disables any modification of the input except removing
     *                             of selected items.
     *                searchInputListeners - Array of search input listeners. By default, the global
     *                                       array Select3.SearchInputListeners is used.
     *                showDropdown - Set to false if you don't want to use any dropdown (you can
     *                               still open it programmatically using open()).
     *                templates - Object with instance-specific templates to override the global
     *                            templates assigned to Select3.Templates.
     */
    setOptions: function(options) {

        options = options || {};

        Select3.OptionListeners.forEach(function(listener) {
            listener(this, options);
        }.bind(this));

        $.extend(this.options, options);

        var allowedTypes = $.extend({
            closeOnSelect: 'boolean',
            dropdown: 'function|null',
            initSelection: 'function|null',
            matcher: 'function|null',
            placeholder: 'string',
            positionDropdown: 'function|null',
            query: 'function|null',
            readOnly: 'boolean',
            removeOnly: 'boolean',
            searchInputListeners: 'array'
        }, options.allowedTypes);

        $.each(options, function(key, value) {
            var type = allowedTypes[key];
            if (type && !type.split('|').some(function(type) { return $.type(value) === type; })) {
                throw new Error(key + ' must be of type ' + type);
            }

            switch (key) {
            case 'items':
                this.items = (value === null ? value : Select3.processItems(value));
                break;

            case 'matcher':
                this.matcher = value;
                break;

            case 'searchInputListeners':
                this.searchInputListeners = value;
                break;

            case 'templates':
                $.extend(this.templates, value);
                break;
            }
        }.bind(this));

        this.enabled = (!this.options.readOnly && !this.options.removeOnly);
    },

    /**
     * Returns the result of the given template.
     *
     * @param templateName Name of the template to process.
     * @param options Options to pass to the template.
     *
     * @return String containing HTML.
     */
    template: function(templateName, options) {

        var template = this.templates[templateName];
        if (template) {
            if ($.type(template) === 'function') {
                return template(options);
            } else if (template.render) {
                return template.render(options);
            } else {
                return template.toString();
            }
        } else {
            throw new Error('Unknown template: ' + templateName);
        }
    },

    /**
     * Triggers the change event.
     *
     * The event object at least contains the following property:
     * value - The new value of the Select3 instance.
     *
     * @param Optional additional options added to the event object.
     */
    triggerChange: function(options) {

        this.triggerEvent('change', $.extend({ value: this._value }, options));
    },

    /**
     * Triggers an event on the instance's element.
     *
     * @param Optional event data to be added to the event object.
     *
     * @return Whether the default action of the event may be executed, ie. returns false if
     *         preventDefault() has been called.
     */
    triggerEvent: function(eventName, data) {

        var event = $.Event(eventName, data || {});
        this.$el.trigger(event);
        return !event.isDefaultPrevented();
    },

    /**
     * Detaches all listeners from the events map from the instance's element.
     *
     * Normally, you should not have to call this method yourself as it's called automatically in
     * the destroy() method.
     */
    undelegateEvents: function() {

        this._events.forEach(function(event) {
            if (event.selector) {
                this.$el.off(event.event, event.selector, event.listener);
            } else {
                this.$el.off(event.event, event.listener);
            }
        }, this);

        this._events = [];
    },

    /**
     * Shorthand for value().
     */
    val: function(newValue) {

        return this.value(newValue);
    },

    /**
     * Validates a single item. Throws an exception if the item is invalid.
     *
     * @param item The item to validate.
     *
     * @return The validated item. May differ from the input item.
     */
    validateItem: function(item) {

        if (item && Select3.isValidId(item.id) && $.type(item.text) === 'string') {
            return item;
        } else {
            throw new Error('Item should have id (number or string) and text (string) properties');
        }
    },

    /**
     * Sets or gets the value of the selection.
     *
     * The value of the selection only concerns the IDs of the selection items. If you are
     * interested in the IDs and the text labels, you should use the data() method.
     *
     * Note that if neither the items option nor the initSelection option have been set, Select3
     * will have no way to determine what text labels should be used with the given IDs in which
     * case it will assume the text is equal to the ID. This is useful if you're working with tags,
     * or selecting e-mail addresses for instance, but may not always be what you want.
     *
     * @param newValue Optional new value to set. For a MultipleSelect3 instance the value must be
     *                 an array of IDs, for a SingleSelect3 instance the value must be a single ID
     *                 (a string or a number) or null to indicate no item is selected.
     * @param options Optional options object. May contain the following property:
     *                triggerChange - Set to false to suppress the "change" event being triggered.
     *
     * @return If newValue is omitted, this method returns the current value.
     */
    value: function(newValue, options) {

        options = options || {};

        if (newValue === undefined) {
            return this._value;
        } else {
            newValue = this.validateValue(newValue);

            this._value = newValue;

            if (this.options.initSelection) {
                this.options.initSelection(newValue, function(data) {
                    if (this._value === newValue) {
                        this._data = this.validateData(data);

                        if (options.triggerChange !== false) {
                            this.triggerChange();
                        }
                    }
                }.bind(this));
            } else {
                this._data = this.getDataForValue(newValue);

                if (options.triggerChange !== false) {
                    this.triggerChange();
                }
            }
        }
    },

    /**
     * @private
     */
    _addResults: function(results, options) {

        this.results = this.results.concat(results);

        if (this.dropdown) {
            this.dropdown.showResults(
                this.filterResults(results),
                $.extend({ add: true }, options)
            );
        }
    },

    /**
     * @private
     */
    _closed: function() {

        this.dropdown = null;
    },

    /**
     * @private
     */
    _getItemId: function(elementOrEvent) {

        // returns the item ID related to an element or event target.
        // IDs can be either numbers or strings, but attribute values are always strings, so we
        // will have to find out whether the item ID ought to be a number or string ourselves.
        // $.fn.data() is a bit overzealous for our case, because it returns a number whenever the
        // attribute value can be parsed as a number. however, it is possible an item had an ID
        // which is a string but which is parseable as number, in which case we verify if the ID
        // as number is actually found among the data or results. if it isn't, we assume it was
        // supposed to be a string after all...

        var $element;
        if (elementOrEvent.target) {
            $element = $(elementOrEvent.target).closest('[data-item-id]');
        } else if (elementOrEvent.length) {
            $element = elementOrEvent;
        } else {
            $element = $(elementOrEvent);
        }

        var id = $element.data('item-id');
        if ($.type(id) === 'string') {
            return id;
        } else {
            if (Select3.findById(this._data || [], id) ||
                Select3.findNestedById(this.results, id)) {
                return id;
            } else {
                return '' + id;
            }
        }
    },

    /**
     * @private
     */
    _setResults: function(results, options) {

        this.results = results;

        if (this.dropdown) {
            this.dropdown.showResults(this.filterResults(results), options || {});
        }
    },

    /**
     * @private
     */
    _showError: function(error, options) {

        this.results = [];

        if (this.dropdown) {
            this.dropdown.showError(error, options);
        }
    }

});

/**
 * Dropdown class to use for displaying dropdowns.
 *
 * The default implementation of a dropdown is defined in the select3-dropdown module.
 */
Select3.Dropdown = null;

/**
 * Mapping of input types.
 */
Select3.InputTypes = {};

/**
 * Array of option listeners.
 *
 * Option listeners are invoked when setOptions() is called. Every listener receives two arguments:
 *
 * select3 - The Select3 instance.
 * options - The options that are about to be set. The listener may modify this options object.
 *
 * An example of an option listener is the select3-traditional module.
 */
Select3.OptionListeners = [];

/**
 * Array of search input listeners.
 *
 * Search input listeners are invoked when initSearchInput() is called (typically right after the
 * search input is created). Every listener receives two arguments:
 *
 * select3 - The Select3 instance.
 * $input - jQuery container with the search input.
 *
 * An example of a search input listener is the select3-keyboard module.
 */
Select3.SearchInputListeners = [];

/**
 * Mapping with templates to use for rendering select boxes and dropdowns. See select3-templates.js
 * for a useful set of default templates, as well as for documentation of the individual templates.
 */
Select3.Templates = {};

/**
 * Finds an item in the given array with the specified ID.
 *
 * @param array Array to search in.
 * @param id ID to search for.
 *
 * @return The item in the array with the given ID, or null if the item was not found.
 */
Select3.findById = function(array, id) {

    var index = Select3.findIndexById(array, id);
    return (index > -1 ? array[index] : null);
};

/**
 * Finds the index of an item in the given array with the specified ID.
 *
 * @param array Array to search in.
 * @param id ID to search for.
 *
 * @return The index of the item in the array with the given ID, or -1 if the item was not found.
 */
Select3.findIndexById = function(array, id) {

    for (var i = 0, length = array.length; i < length; i++) {
        if (array[i].id === id) {
            return i;
        }
    }
    return -1;
};

/**
 * Finds an item in the given array with the specified ID. Items in the array may contain 'children'
 * properties which in turn will be searched for the item.
 *
 * @param array Array to search in.
 * @param id ID to search for.
 *
 * @return The item in the array with the given ID, or null if the item was not found.
 */
Select3.findNestedById = function(array, id) {

    for (var i = 0, length = array.length; i < length; i++) {
        var item = array[i];
        if (item.id === id) {
            return item;
        } else if (item.children) {
            var result = Select3.findNestedById(item.children, id);
            if (result) {
                return result;
            }
        }
    }
    return null;
};

/**
 * Utility method for inheriting another class.
 *
 * @param SubClass Constructor function of the subclass.
 * @param SuperClass Optional constructor function of the superclass. If omitted, Select3 is used
 *                   as superclass.
 * @param prototype Object with methods you want to add to the subclass prototype.
 *
 * @return A utility function for calling the methods of the superclass. This function receives two
 *         arguments: The this object on which you want to execute the method and the name of the
 *         method. Any arguments past those are passed to the superclass method.
 */
Select3.inherits = function(SubClass, SuperClass, prototype) {

    if (arguments.length === 2) {
        prototype = SuperClass;
        SuperClass = Select3;
    }

    SubClass.prototype = $.extend(
        Object.create(SuperClass.prototype),
        { constructor: SubClass },
        prototype
    );

    return function(self, methodName) {
        SuperClass.prototype[methodName].apply(self, Array.prototype.slice.call(arguments, 2));
    };
};

/**
 * Checks whether a value can be used as a valid ID for selection items. Only numbers and strings
 * are accepted to be used as IDs.
 *
 * @param id The value to check whether it is a valid ID.
 *
 * @return true if the value is a valid ID, false otherwise.
 */
Select3.isValidId = function(id) {

    var type = $.type(id);
    return type === 'number' || type === 'string';
};

/**
 * Decides whether a given item matches a search term. The default implementation simply
 * checks whether the term is contained within the item's text, after transforming them using
 * transformText().
 *
 * @param item The item that should match the search term.
 * @param term The search term. Note that for performance reasons, the term has always been already
 *             processed using transformText().
 *
 * @return true if the text matches the term, false otherwise.
 */
Select3.matcher = function(item, term) {

    var result = null;
    if (Select3.transformText(item.text).indexOf(term) > -1) {
        result = item;
    } else if (item.children) {
        var matchingChildren = item.children.map(function(child) {
            return Select3.matcher(child, term);
        }).filter(function(child) {
            return !!child;
        });
        if (matchingChildren.length) {
            result = { id: item.id, text: item.text, children: matchingChildren };
        }
    }
    return result;
};

/**
 * Helper function for processing items.
 *
 * @param item The item to process, either as object containing 'id' and 'text' properties or just
 *             as ID. The 'id' property of an item is optional if it has a 'children' property
 *             containing an array of items.
 *
 * @return Object containing 'id' and 'text' properties.
 */
Select3.processItem = function(item) {

    if (Select3.isValidId(item)) {
        return { id: item, text: '' + item };
    } else if (item &&
               (Select3.isValidId(item.id) || item.children) &&
               $.type(item.text) === 'string') {
        if (item.children) {
            item.children = Select3.processItems(item.children);
        }

        return item;
    } else {
        throw new Error('invalid item');
    }
};

/**
 * Helper function for processing an array of items.
 *
 * @param items Array of items to process. See processItem() for details about a single item.
 *
 * @return Array with items.
 */
Select3.processItems = function(items) {

    if ($.type(items) === 'array') {
        return items.map(Select3.processItem);
    } else {
        throw new Error('invalid items');
    }
};

/**
 * Quotes a string so it can be used in a CSS attribute selector. It adds double quotes to the
 * string and escapes all occurrences of the quote character inside the string.
 *
 * @param string The string to quote.
 *
 * @return The quoted string.
 */
Select3.quoteCssAttr = function(string) {

    return '"' + ('' + string).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
};

/**
 * Transforms text in order to find matches. The default implementation casts all strings to
 * lower-case so that any matches found will be case-insensitive.
 *
 * @param string The string to transform.
 *
 * @return The transformed string.
 */
Select3.transformText = function(string) {

    return string.toLowerCase();
};

module.exports = $.fn.select3 = Select3;

},{}],8:[function(_dereq_,module,exports){
'use strict';

var DIACRITICS = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03C9': '\u03C9',
    '\u03C2': '\u03C3'
};

var Select3 = _dereq_(7);
var previousTransform = Select3.transformText;

/**
 * Extended version of the transformText() function that simplifies diacritics to their latin1
 * counterparts.
 *
 * Note that if all query functions fetch their results from a remote server, you may not need this
 * function, because it makes sense to remove diacritics server-side in such cases.
 */
Select3.transformText = function(string) {
    var result = '';
    for (var i = 0, length = string.length; i < length; i++) {
        var character = string[i];
        result += DIACRITICS[character] || character;
    }
    return previousTransform(result);
};

},{}],9:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var debounce = _dereq_(2);

var Select3 = _dereq_(7);

/**
 * Select3 Dropdown Constructor.
 *
 * @param options Options object. Should have the following properties:
 *                select3 - Select3 instance to show the dropdown for.
 *                showSearchInput - Boolean whether a search input should be shown.
 */
function Select3Dropdown(options) {

    var select3 = options.select3;

    this.$el = $(select3.template('dropdown', {
        dropdownCssClass: select3.options.dropdownCssClass,
        searchInputPlaceholder: select3.options.searchInputPlaceholder,
        showSearchInput: options.showSearchInput
    }));

    /**
     * jQuery container to add the results to.
     */
    this.$results = this.$('.select3-results-container');

    /**
     * Boolean indicating whether more results are available than currently displayed in the
     * dropdown.
     */
    this.hasMore = false;

    /**
     * The currently highlighted result item.
     */
    this.highlightedResult = null;

    /**
     * Boolean whether the load more link is currently highlighted.
     */
    this.loadMoreHighlighted = false;

    /**
     * Options passed to the dropdown constructor.
     */
    this.options = options;

    /**
     * The results displayed in the dropdown.
     */
    this.results = [];

    /**
     * Select3 instance.
     */
    this.select3 = select3;

    this._closeProxy = this.close.bind(this);
    if (select3.options.closeOnSelect !== false) {
        select3.$el.on('select3-selecting', this._closeProxy);
    }

    this.addToDom();
    this.position();
    this.setupCloseHandler();

    this._scrolledProxy = debounce(this._scrolled.bind(this), 50);

    this._suppressMouseWheel();

    if (options.showSearchInput) {
        select3.initSearchInput(this.$('.select3-search-input'));
        select3.focus();
    }

    this._delegateEvents();

    this.showLoading();

    this.triggerOpen();
}

/**
 * Methods.
 */
$.extend(Select3Dropdown.prototype, {

    /**
     * Convenience shortcut for this.$el.find(selector).
     */
    $: function(selector) {

        return this.$el.find(selector);
    },

    /**
     * Adds the dropdown to the DOM.
     */
    addToDom: function() {

        this.$el.appendTo(this.select3.$el[0].ownerDocument.body);
    },

    /**
     * Closes the dropdown.
     */
    close: function() {

        this.$el.remove();

        this.removeCloseHandler();

        this.select3.$el.off('select3-selecting', this._closeProxy);

        this.triggerClose();
    },

    /**
     * Events map.
     *
     * Follows the same format as Backbone: http://backbonejs.org/#View-delegateEvents
     */
    events: {
        'click .select3-load-more': '_loadMoreClicked',
        'click .select3-result-item': '_resultClicked',
        'mouseenter .select3-load-more': 'highlightLoadMore',
        'mouseenter .select3-result-item': '_resultHovered'
    },

    /**
     * Highlights a result item.
     *
     * @param item The item to highlight.
     */
    highlight: function(item) {

        if (this.loadMoreHighlighted) {
            this.$('.select3-load-more').removeClass('highlight');
        }

        this.$('.select3-result-item').removeClass('highlight')
            .filter('[data-item-id=' + Select3.quoteCssAttr(item.id) + ']').addClass('highlight');

        this.highlightedResult = item;
        this.loadMoreHighlighted = false;

        this.select3.triggerEvent('select3-highlight', { item: item, id: item.id });
    },

    /**
     * Highlights the load more link.
     *
     * @param item The item to highlight.
     */
    highlightLoadMore: function() {

        this.$('.select3-result-item').removeClass('highlight');

        this.$('.select3-load-more').addClass('highlight');

        this.highlightedResult = null;
        this.loadMoreHighlighted = true;
    },

    /**
     * Positions the dropdown inside the DOM.
     */
    position: function() {

        var position = this.options.position;
        if (position) {
            position(this.$el, this.select3.$el);
        }

        this._scrolled();
    },

    /**
     * Removes the event handler to close the dropdown.
     */
    removeCloseHandler: function() {

        $('body').off('click', this._closeProxy);
    },

    /**
     * Renders an array of result items.
     *
     * @param items Array of result items.
     *
     * @return HTML-formatted string to display the result items.
     */
    renderItems: function(items) {

        var select3 = this.select3;
        return items.map(function(item) {
            var result = select3.template(item.id ? 'resultItem' : 'resultLabel', item);
            if (item.children) {
                result += select3.template('resultChildren', {
                    childrenHtml: this.renderItems(item.children)
                });
            }
            return result;
        }, this).join('');
    },

    /**
     * Selects the highlighted item.
     */
    selectHighlight: function() {

        if (this.highlightedResult) {
            this.selectItem(this.highlightedResult.id);
        } else if (this.loadMoreHighlighted) {
            this._loadMoreClicked();
        }
    },

    /**
     * Selects the item with the given ID.
     *
     * @param id ID of the item to select.
     */
    selectItem: function(id) {

        var select3 = this.select3;
        var item = Select3.findNestedById(select3.results, id);
        if (item) {
            var options = { id: id, item: item };
            if (select3.triggerEvent('select3-selecting', options)) {
                select3.triggerEvent('select3-selected', options);
            }
        }
    },

    /**
     * Sets up an event handler that will close the dropdown when the Select3 control loses focus.
     */
    setupCloseHandler: function() {

        $('body').on('click', this._closeProxy);
    },

    /**
     * Shows an error message.
     *
     * @param message Error message to display.
     * @param options Options object. May contain the following property:
     *                escape - Set to false to disable HTML-escaping of the message. Useful if you
     *                         want to set raw HTML as the message, but may open you up to XSS
     *                         attacks if you're not careful with escaping user input.
     */
    showError: function(message, options) {

        options = options || {};

        this.$results.html(this.select3.template('error', {
            escape: options.escape !== false,
            message: message,
        }));

        this.hasMore = false;
        this.results = [];

        this.highlightedResult = null;
        this.loadMoreHighlighted = false;

        this.position();
    },

    /**
     * Shows a loading indicator in the dropdown.
     */
    showLoading: function() {

        this.$results.html(this.select3.template('loading'));

        this.hasMore = false;
        this.results = [];

        this.highlightedResult = null;
        this.loadMoreHighlighted = false;

        this.position();
    },

    /**
     * Shows the results from a search query.
     *
     * @param results Array of result items.
     * @param options Options object. May contain the following properties:
     *                add - True if the results should be added to any already shown results.
     *                hasMore - Boolean whether more results can be fetched using the query()
     *                          function.
     *                term - The search term for which the results are displayed.
     */
    showResults: function(results, options) {

        var resultsHtml = this.renderItems(results);
        if (options.hasMore) {
            resultsHtml += this.select3.template('loadMore');
        } else {
            if (!resultsHtml && !options.add) {
                resultsHtml = this.select3.template('noResults', { term: options.term });
            }
        }

        if (options.add) {
            this.$('.select3-loading').replaceWith(resultsHtml);

            this.results = this.results.concat(results);
        } else {
            this.$results.html(resultsHtml);

            this.results = results;
        }

        this.hasMore = options.hasMore;

        if (!options.add || this.loadMoreHighlighted) {
            this._highlightFirstItem(results);
        }

        this.position();
    },

    /**
     * Triggers the 'select3-close' event.
     */
    triggerClose: function() {

        this.select3.$el.trigger('select3-close');
    },

    /**
     * Triggers the 'select3-open' event.
     */
    triggerOpen: function() {

        this.select3.$el.trigger('select3-open');
    },

    /**
     * @private
     */
    _delegateEvents: function() {

        $.each(this.events, function(event, listener) {
            var index = event.indexOf(' ');
            var selector = event.slice(index + 1);
            event = event.slice(0, index);

            if ($.type(listener) === 'string') {
                listener = this[listener];
            }

            listener = listener.bind(this);

            this.$el.on(event, selector, listener);
        }.bind(this));

        this.$results.on('scroll touchmove touchend', this._scrolledProxy);
    },

    /**
     * @private
     */
    _highlightFirstItem: function(results) {

        function findFirstItem(results) {
            for (var i = 0, length = results.length; i < length; i++) {
                var result = results[i];
                if (result.id) {
                    return result;
                } else if (result.children) {
                    var item = findFirstItem(result.children);
                    if (item) {
                        return item;
                    }
                }
            }
        }

        var firstItem = findFirstItem(results);
        if (firstItem) {
            this.highlight(firstItem);
        } else {
            this.highlightedResult = null;
            this.loadMoreHighlighted = false;
        }
    },

    /**
     * @private
     */
    _loadMoreClicked: function() {

        this.$('.select3-load-more').replaceWith(this.select3.template('loading'));

        this.select3.loadMore();

        this.select3.focus();

        return false;
    },

    /**
     * @private
     */
    _resultClicked: function(event) {

        this.selectItem(this.select3._getItemId(event));

        return false;
    },

    /**
     * @private
     */
    _resultHovered: function(event) {

        var id = this.select3._getItemId(event);
        var item = Select3.findNestedById(this.results, id);
        if (item) {
            this.highlight(item);
        }
    },

    /**
     * @private
     */
    _scrolled: function() {

        var $loadMore = this.$('.select3-load-more');
        if ($loadMore.length) {
            if ($loadMore[0].offsetTop - this.$results[0].scrollTop < this.$el.height()) {
                this._loadMoreClicked();
            }
        }
    },

    /**
     * @private
     */
    _scrollToHighlight: function(options) {

        var el;
        if (this.highlightedResult) {
            var quotedId = Select3.quoteCssAttr(this.highlightedResult.id);
            el = this.$('.select3-result-item[data-item-id=' + quotedId + ']')[0];
        } else if (this.loadMoreHighlighted) {
            el = this.$('.select3-load-more')[0];
        } else {
            return; // no highlight to scroll to
        }

        var rect = el.getBoundingClientRect(),
            containerRect = this.$results[0].getBoundingClientRect();

        if (rect.top < containerRect.top || rect.bottom > containerRect.bottom) {
            el.scrollIntoView(options.alignToTop);
        }
    },

    /**
     * @private
     */
    _suppressMouseWheel: function() {

        var suppressMouseWheelSelector = this.select3.options.suppressMouseWheelSelector;
        if (suppressMouseWheelSelector === null) {
            return;
        }

        var selector = suppressMouseWheelSelector || '.select3-results-container';
        this.$el.on('DOMMouseScroll mousewheel', selector, function(event) {

            // Thanks to Troy Alford:
            // http://stackoverflow.com/questions/5802467/prevent-scrolling-of-parent-element

            var $el = $(this),
                scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = $el.height(),
                originalEvent = event.originalEvent,
                delta = (event.type === 'DOMMouseScroll' ? originalEvent.detail * -40
                                                         : originalEvent.wheelDelta),
                up = delta > 0;

            function prevent() {
                event.stopPropagation();
                event.preventDefault();
                event.returnValue = false;
                return false;
            }

            if (!up && -delta > scrollHeight - height - scrollTop) {
                // Scrolling down, but this will take us past the bottom.
                $el.scrollTop(scrollHeight);
                return prevent();
            } else if (up && delta > scrollTop) {
                // Scrolling up, but this will take us past the top.
                $el.scrollTop(0);
                return prevent();
            }
        });
    }

});

module.exports = Select3.Dropdown = Select3Dropdown;

},{}],10:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Select3 = _dereq_(7);
var MultipleSelect3 = _dereq_(13);

function isValidEmail(email) {

    var atIndex = email.indexOf('@');
    var dotIndex = email.lastIndexOf('.');
    var spaceIndex = email.indexOf(' ');
    return (atIndex > 0 && dotIndex > atIndex + 1 &&
            dotIndex < email.length - 2 && spaceIndex === -1);
}

function lastWord(token, length) {

    length = (length === undefined ? token.length : length);
    for (var i = length - 1; i >= 0; i--) {
        if ((/\s/).test(token[i])) {
            return token.slice(i + 1, length);
        }
    }
    return token.slice(0, length);
}

function stripEnclosure(token, enclosure) {

    if (token.slice(0, 1) === enclosure[0] && token.slice(-1) === enclosure[1]) {
        return token.slice(1, -1).trim();
    } else {
        return token.trim();
    }
}

function createEmailItem(token) {

    var email = lastWord(token);
    var name = token.slice(0, -email.length).trim();
    if (isValidEmail(email)) {
        email = stripEnclosure(stripEnclosure(email, '()'), '<>');
        name = stripEnclosure(name, '""').trim() || email;
        return { id: email, text: name };
    } else {
        return (token.trim() ? { id: token, text: token } : null);
    }
}

function emailTokenizer(input, selection, createToken) {

    function hasToken(input) {
        if (input) {
            for (var i = 0, length = input.length; i < length; i++) {
                var char = input[i];
                switch (char) {
                case ';':
                case ',':
                case '\n':
                    return true;
                case ' ':
                case '\t':
                    if (isValidEmail(lastWord(input, i))) {
                        return true;
                    }
                    break;
                case '"':
                    do { i++; } while(i < length && input[i] !== '"');
                    break;
                default:
                    continue;
                }
            }
        }
        return false;
    }

    function takeToken(input) {
        for (var i = 0, length = input.length; i < length; i++) {
            var char = input[i];
            switch (char) {
            case ';':
            case ',':
            case '\n':
                return { term: input.slice(0, i), input: input.slice(i + 1) };
            case ' ':
            case '\t':
                if (isValidEmail(lastWord(input, i))) {
                    return { term: input.slice(0, i), input: input.slice(i + 1) };
                }
                break;
            case '"':
                do { i++; } while(i < length && input[i] !== '"');
                break;
            default:
                continue;
            }
        }
        return {};
    }

    while (hasToken(input)) {
        var token = takeToken(input);
        if (token.term) {
            var item = createEmailItem(token.term);
            if (item && !(item.id && Select3.findById(selection, item.id))) {
                createToken(item);
            }
        }
        input = token.input;
    }

    return input;
}

/**
 * EmailSelect3 Constructor.
 *
 * @param options Options object. Accepts all options from the MultipleSelect3 Constructor.
 */
function EmailSelect3(options) {

    MultipleSelect3.call(this, options);
}

/**
 * Methods.
 */
var callSuper = Select3.inherits(EmailSelect3, MultipleSelect3, {

    /**
     * @inherit
     */
    initSearchInput: function($input) {

        callSuper(this, 'initSearchInput', $input);

        $input.on('blur', function() {
            var term = $input.val();
            if (isValidEmail(lastWord(term))) {
                this.add(createEmailItem(term));
            }
        }.bind(this));
    },

    /**
     * @inherit
     *
     * Note that for the Email input type the option showDropdown is set to false and the tokenizer
     * option is set to a tokenizer specialized for email addresses.
     */
    setOptions: function(options) {

        options = $.extend({
            createTokenItem: createEmailItem,
            showDropdown: false,
            tokenizer: emailTokenizer
        }, options);

        callSuper(this, 'setOptions', options);
    }

});

module.exports = Select3.InputTypes.Email = EmailSelect3;

},{}],11:[function(_dereq_,module,exports){
'use strict';

var Select3 = _dereq_(7);

var KEY_DOWN_ARROW = 40;
var KEY_ENTER = 13;
var KEY_ESCAPE = 27;
var KEY_UP_ARROW = 38;

/**
 * Search input listener providing keyboard support for navigating the dropdown.
 */
function listener(select3, $input) {

    /**
     * Moves a dropdown's highlight to the next or previous result item.
     *
     * @param delta Either 1 to move to the next item, or -1 to move to the previous item.
     */
    function moveHighlight(dropdown, delta) {

        function findElementIndex($elements, selector) {
            for (var i = 0, length = $elements.length; i < length; i++) {
                if ($elements.eq(i).is(selector)) {
                    return i;
                }
            }
            return -1;
        }

        function scrollToHighlight() {
            var el;
            if (dropdown.highlightedResult) {
                var quotedId = Select3.quoteCssAttr(dropdown.highlightedResult.id);
                el = dropdown.$('.select3-result-item[data-item-id=' + quotedId + ']')[0];
            } else if (dropdown.loadMoreHighlighted) {
                el = dropdown.$('.select3-load-more')[0];
            } else {
                return; // no highlight to scroll to
            }

            var rect = el.getBoundingClientRect(),
                containerRect = dropdown.$results[0].getBoundingClientRect();

            if (rect.top < containerRect.top || rect.bottom > containerRect.bottom) {
                el.scrollIntoView(delta < 0);
            }
        }

        var results = dropdown.results;
        if (results.length) {
            var $results = dropdown.$('.select3-result-item');
            var defaultIndex = (delta > 0 ? 0 : $results.length - 1);
            var index = defaultIndex;
            var highlightedResult = dropdown.highlightedResult;
            if (highlightedResult) {
                var quotedId = Select3.quoteCssAttr(highlightedResult.id);
                index = findElementIndex($results, '[data-item-id=' + quotedId + ']') + delta;
                if (delta > 0 ? index >= $results.length : index < 0) {
                    if (dropdown.hasMore) {
                        dropdown.highlightLoadMore();
                        scrollToHighlight();
                        return;
                    } else {
                        index = defaultIndex;
                    }
                }
            }

            var result = Select3.findNestedById(results,
                                                dropdown.select3._getItemId($results[index]));
            if (result) {
                dropdown.highlight(result);
                scrollToHighlight();
            }
        }
    }

    function keyHeld(event) {

        var dropdown = select3.dropdown;
        if (dropdown) {
            if (event.keyCode === KEY_DOWN_ARROW) {
                moveHighlight(dropdown, 1);
            } else if (event.keyCode === KEY_UP_ARROW) {
                moveHighlight(dropdown, -1);
            }
        }
    }

    function keyReleased(event) {

        function open() {
            if (select3.options.showDropdown !== false) {
                select3.open();
            }
        }

        var dropdown = select3.dropdown;
        if (event.keyCode === KEY_ENTER && !event.ctrlKey) {
            if (dropdown) {
                dropdown.selectHighlight();
            } else if (select3.options.showDropdown !== false) {
                open();
            }

            event.preventDefault();
        } else if (event.keyCode === KEY_ESCAPE) {
            select3.close();

            event.preventDefault();
        } else if (event.keyCode === KEY_DOWN_ARROW || event.keyCode === KEY_UP_ARROW) {
            // handled in keyHeld() because the response feels faster and it works with repeated
            // events if the user holds the key for a longer period
            // still, we issue an open() call here in case the dropdown was not yet open...
            open();

            event.preventDefault();
        } else {
            open();
        }
    }

    $input.on('keydown', keyHeld).on('keyup', keyReleased);
}

Select3.SearchInputListeners.push(listener);

},{}],12:[function(_dereq_,module,exports){
'use strict';

var escape = _dereq_(3);
var Select3 = _dereq_(7);

/**
 * Localizable elements of the Select3 Templates.
 *
 * Be aware that these strings are added straight to the HTML output of the templates, so any
 * non-safe strings should be escaped.
 */
Select3.Locale = {

    ajaxError: function(term) { return 'Failed to fetch results for <b>' + escape(term) + '</b>'; },
    loading: 'Loading...',
    loadMore: 'Load more...',
    needMoreCharacters: function(numCharacters) {
        return 'Enter ' + numCharacters + ' more characters to search';
    },
    noResults: 'No results found',
    noResultsForTerm: function(term) { return 'No results for <b>' + escape(term) + '</b>'; }

};

},{}],13:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Select3 = _dereq_(7);

var KEY_BACKSPACE = 8;
var KEY_DELETE = 46;
var KEY_ENTER = 13;

/**
 * MultipleSelect3 Constructor.
 *
 * @param options Options object. Accepts all options from the Select3 Base Constructor in addition
 *                to those accepted by MultipleSelect3.setOptions().
 */
function MultipleSelect3(options) {

    Select3.call(this, options);

    this.$el.html(this.template('multipleSelectInput', { enabled: this.enabled }));

    this._highlightedItemId = null;

    this.initSearchInput(this.$('.select3-multiple-input:not(.select3-width-detector)'));

    this._rerenderSelection();

    if (!options.positionDropdown) {
        this.options.positionDropdown = function($el, $selectEl) {
            var offset = $selectEl.offset(),
                elHeight = $el.height(),
                selectHeight = $selectEl.height(),
                bottom = $selectEl[0].getBoundingClientRect().top + selectHeight + elHeight;

            $el.css({
                left: offset.left + 'px',
                top: offset.top + (typeof window !== 'undefined' &&
                                   bottom > $(window).height() ? -elHeight : selectHeight) + 'px'
            }).width($selectEl.width());
        };
    }
}

/**
 * Methods.
 */
var callSuper = Select3.inherits(MultipleSelect3, {

    /**
     * Adds an item to the selection, if it's not selected yet.
     *
     * @param item The item to add. May be an item with 'id' and 'text' properties or just an ID.
     */
    add: function(item) {

        var itemIsId = Select3.isValidId(item);
        var id = (itemIsId ? item : this.validateItem(item) && item.id);

        if (this._value.indexOf(id) === -1) {
            this._value.push(id);

            if (itemIsId && this.options.initSelection) {
                this.options.initSelection([id], function(data) {
                    if (this._value.indexOf(id) > -1) {
                        item = this.validateItem(data[0]);
                        this._data.push(item);

                        this.triggerChange({ added: item });
                    }
                }.bind(this));
            } else {
                if (itemIsId) {
                    item = this.getItemForId(id);
                }
                this._data.push(item);

                this.triggerChange({ added: item });
            }
        }

        this.$searchInput.val('');
    },

    /**
     * Events map.
     *
     * Follows the same format as Backbone: http://backbonejs.org/#View-delegateEvents
     */
    events: {
        'change': '_rerenderSelection',
        'change .select3-multiple-input': function() { return false; },
        'click': '_clicked',
        'click .select3-multiple-selected-item': '_itemClicked',
        'keydown .select3-multiple-input': '_keyHeld',
        'keyup .select3-multiple-input': '_keyReleased',
        'paste .select3-multiple-input': '_onPaste',
        'select3-selected': '_resultSelected'
    },

    /**
     * @inherit
     */
    filterResults: function(results) {

        return results.filter(function(item) {
            return !Select3.findById(this._data, item.id);
        }, this);
    },

    /**
     * Returns the correct data for a given value.
     *
     * @param value The value to get the data for. Should be an array of IDs.
     *
     * @return The corresponding data. Will be an array of objects with 'id' and 'text' properties.
     *         Note that if no items are defined, this method assumes the text labels will be equal
     *         to the IDs.
     */
    getDataForValue: function(value) {

        return value.map(this.getItemForId.bind(this)).filter(function(item) { return !!item; });
    },

    /**
     * Returns the correct value for the given data.
     *
     * @param data The data to get the value for. Should be an array of objects with 'id' and 'text'
     *             properties.
     *
     * @return The corresponding value. Will be an array of IDs.
     */
    getValueForData: function(data) {

        return data.map(function(item) { return item.id; });
    },

    /**
     * Removes an item from the selection, if it is selected.
     *
     * @param item The item to remove. May be an item with 'id' and 'text' properties or just an ID.
     */
    remove: function(item) {

        var id = ($.type(item) === 'object' ? item.id : item);

        var removedItem;
        var index = Select3.findIndexById(this._data, id);
        if (index > -1) {
            removedItem = this._data[index];
            this._data.splice(index, 1);
        }

        if (this._value[index] !== id) {
            index = this._value.indexOf(id);
        }
        if (index > -1) {
            this._value.splice(index, 1);
        }

        if (removedItem) {
            this.triggerChange({ removed: removedItem });
        }

        if (id === this._highlightedItemId) {
            this._highlightedItemId = null;
        }
    },

    /**
     * @inherit
     */
    search: function() {

        var term = this.$searchInput.val();

        if (this.options.tokenizer) {
            term = this.options.tokenizer(term, this._data, this.add.bind(this), this.options);

            if ($.type(term) === 'string') {
                this.$searchInput.val(term);
            } else {
                term = '';
            }
        }

        if (this.dropdown) {
            callSuper(this, 'search');
        }
    },

    /**
     * @inherit
     *
     * @param options Options object. In addition to the options supported in the base
     *                implementation, this may contain the following properties:
     *                backspaceHighlightsBeforeDelete - If set to true, when the user enters a
     *                                                  backspace while there is no text in the
     *                                                  search field but there are selected items,
     *                                                  the last selected item will be highlighted
     *                                                  and when a second backspace is entered the
     *                                                  item is deleted. If false, the item gets
     *                                                  deleted on the first backspace. The default
     *                                                  value is true on devices that have touch
     *                                                  input and false on devices that don't.
     *                createTokenItem - Function to create a new item from a user's search term.
     *                                  This is used to turn the term into an item when dropdowns
     *                                  are disabled and the user presses Enter. It is also used by
     *                                  the default tokenizer to create items for individual tokens.
     *                                  The function receives a 'token' parameter which is the
     *                                  search term (or part of a search term) to create an item for
     *                                  and must return an item object with 'id' and 'text'
     *                                  properties or null if no token can be created from the term.
     *                                  The default is a function that returns an item where the id
     *                                  and text both match the token for any non-empty string and
     *                                  which returns null otherwise.
     *                tokenizer - Function for tokenizing search terms. Will receive the following
     *                            parameters:
     *                            input - The input string to tokenize.
     *                            selection - The current selection data.
     *                            createToken - Callback to create a token from the search terms.
     *                                          Should be passed an item object with 'id' and 'text'
     *                                          properties.
     *                            options - The options set on the Select3 instance.
     *                            Any string returned by the tokenizer function is treated as the
     *                            remainder of untokenized input.
     */
    setOptions: function(options) {

        options = options || {};

        var backspaceHighlightsBeforeDelete = 'backspaceHighlightsBeforeDelete';
        if (options[backspaceHighlightsBeforeDelete] === undefined) {
            options[backspaceHighlightsBeforeDelete] = this.hasTouch;
        }

        options.allowedTypes = options.allowedTypes || {};
        options.allowedTypes[backspaceHighlightsBeforeDelete] = 'boolean';

        callSuper(this, 'setOptions', options);
    },

    /**
     * Validates data to set. Throws an exception if the data is invalid.
     *
     * @param data The data to validate. Should be an array of objects with 'id' and 'text'
     *             properties.
     *
     * @return The validated data. This may differ from the input data.
     */
    validateData: function(data) {

        if (data === null) {
            return [];
        } else if ($.type(data) === 'array') {
            return data.map(this.validateItem.bind(this));
        } else {
            throw new Error('Data for MultiSelect3 instance should be array');
        }
    },

    /**
     * Validates a value to set. Throws an exception if the value is invalid.
     *
     * @param value The value to validate. Should be an array of IDs.
     *
     * @return The validated value. This may differ from the input value.
     */
    validateValue: function(value) {

        if (value === null) {
            return [];
        } else if ($.type(value) === 'array') {
            if (value.every(Select3.isValidId)) {
                return value;
            } else {
                throw new Error('Value contains invalid IDs');
            }
        } else {
            throw new Error('Value for MultiSelect3 instance should be an array');
        }
    },

    /**
     * @private
     */
    _backspacePressed: function() {

        if (this.options.backspaceHighlightsBeforeDelete) {
            if (this._highlightedItemId) {
                this._deletePressed();
            } else if (this._value.length) {
                this._highlightItem(this._value.slice(-1)[0]);
            }
        } else if (this._value.length) {
            this.remove(this._value.slice(-1)[0]);
        }
    },

    /**
     * @private
     */
    _clicked: function() {

        if (this.enabled) {
            this.focus();

            this._open();

            return false;
        }
    },

    /**
     * @private
     */
    _createToken: function() {

        var term = this.$searchInput.val();
        var createTokenItem = this.options.createTokenItem;

        if (term && createTokenItem) {
            var item = createTokenItem(term);
            if (item) {
                this.add(item);
            }
        }
    },

    /**
     * @private
     */
    _deletePressed: function() {

        if (this._highlightedItemId) {
            this.remove(this._highlightedItemId);
        }
    },

    /**
     * @private
     */
    _highlightItem: function(id) {

        this._highlightedItemId = id;
        this.$('.select3-multiple-selected-item').removeClass('highlighted')
            .filter('[data-item-id=' + Select3.quoteCssAttr(id) + ']').addClass('highlighted');

        if (this.hasKeyboard) {
            this.focus();
        }
    },

    /**
     * @private
     */
    _itemClicked: function(event) {

        if (this.enabled) {
            this._highlightItem(this._getItemId(event));
        }
    },

    /**
     * @private
     */
    _itemRemoveClicked: function(event) {

        this.remove(this._getItemId(event));

        this._updateInputWidth();

        return false;
    },

    /**
     * @private
     */
    _keyHeld: function() {

        this._originalValue = this.$searchInput.val();
    },

    /**
     * @private
     */
    _keyReleased: function(event) {

        var inputHadText = !!this._originalValue;

        if (event.keyCode === KEY_ENTER && !event.ctrlKey) {
            if (this.options.createTokenItem) {
                this._createToken();
            }
        } else if (event.keyCode === KEY_BACKSPACE && !inputHadText) {
            this._backspacePressed();
        } else if (event.keyCode === KEY_DELETE && !inputHadText) {
            this._deletePressed();
        }

        this._updateInputWidth();
    },

    /**
     * @private
     */
    _onPaste: function() {

        setTimeout(function() {
            this.search();

            if (this.options.createTokenItem) {
                this._createToken();
            }
        }.bind(this), 10);
    },

    /**
     * @private
     */
    _open: function() {

        if (this.options.showDropdown !== false) {
            this.open();
        }
    },

    _renderSelectedItem: function(item) {

        this.$searchInput.before(this.template('multipleSelectedItem', $.extend({
            highlighted: (item.id === this._highlightedItemId),
            removable: !this.options.readOnly
        }, item)));

        var quotedId = Select3.quoteCssAttr(item.id);
        this.$('.select3-multiple-selected-item[data-item-id=' + quotedId + ']')
            .find('.select3-multiple-selected-item-remove')
            .on('click', this._itemRemoveClicked.bind(this));
    },

    /**
     * @private
     */
    _rerenderSelection: function(event) {

        event = event || {};

        if (event.added) {
            this._renderSelectedItem(event.added);

            this._scrollToBottom();
        } else if (event.removed) {
            var quotedId = Select3.quoteCssAttr(event.removed.id);
            this.$('.select3-multiple-selected-item[data-item-id=' + quotedId + ']').remove();
        } else {
            this.$('.select3-multiple-selected-item').remove();

            this._data.forEach(this._renderSelectedItem, this);

            this._updateInputWidth();
        }

        if (event.added || event.removed) {
            if (this.dropdown) {
                this.dropdown.showResults(this.filterResults(this.results), {
                    hasMore: this.dropdown.hasMore
                });
            }

            if (this.hasKeyboard) {
                this.focus();
            }
        }

        this.positionDropdown();

        this._updatePlaceholder();
    },

    /**
     * @private
     */
    _resultSelected: function(event) {

        if (this._value.indexOf(event.id) === -1) {
            this.add(event.item);
        } else {
            this.remove(event.item);
        }
    },

    /**
     * @private
     */
    _scrollToBottom: function() {

        var $inputContainer = this.$('.select3-multiple-input-container');
        $inputContainer.scrollTop($inputContainer.height());
    },

    /**
     * @private
     */
    _updateInputWidth: function() {

        if (this.enabled) {
            var $input = this.$searchInput, $widthDetector = this.$('.select3-width-detector');
            $widthDetector.text($input.val() ||
                                !this._data.length && this.options.placeholder ||
                                '');
            $input.width($widthDetector.width() + 20);

            this.positionDropdown();
        }
    },

    /**
     * @private
     */
    _updatePlaceholder: function() {

        var placeholder = this._data.length ? '' : this.options.placeholder;
        if (this.enabled) {
            this.$searchInput.attr('placeholder', placeholder);
        } else {
            this.$('.select3-placeholder').text(placeholder);
        }
    }

});

module.exports = Select3.InputTypes.Multiple = MultipleSelect3;

},{}],14:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Select3 = _dereq_(7);

/**
 * SingleSelect3 Constructor.
 *
 * @param options Options object. Accepts all options from the Select3 Base Constructor in addition
 *                to those accepted by SingleSelect3.setOptions().
 */
function SingleSelect3(options) {

    Select3.call(this, options);

    this.$el.html(this.template('singleSelectInput', this.options));

    this._rerenderSelection();

    if (!options.positionDropdown) {
        this.options.positionDropdown = function($el, $selectEl) {
            var offset = $selectEl.offset(),
                top = offset.top + $selectEl.height();

            if (typeof window !== 'undefined') {
                var fixedOffset = $selectEl[0].getBoundingClientRect(),
                    elHeight = $el.height(),
                    windowHeight = $(window).height();

                if (fixedOffset.top + elHeight > windowHeight) {
                    top = Math.max(windowHeight - elHeight + offset.top - fixedOffset.top, 0);
                }
            }

            $el.css({ left: offset.left + 'px', top: top + 'px' }).width($selectEl.width());
        };
    }
}

/**
 * Methods.
 */
var callSuper = Select3.inherits(SingleSelect3, {

    /**
     * Events map.
     *
     * Follows the same format as Backbone: http://backbonejs.org/#View-delegateEvents
     */
    events: {
        'change': '_rerenderSelection',
        'click': '_clicked',
        'select3-selected': '_resultSelected'
    },

    /**
     * Returns the correct data for a given value.
     *
     * @param value The value to get the data for. Should be an ID.
     *
     * @return The corresponding data. Will be an object with 'id' and 'text' properties. Note that
     *         if no items are defined, this method assumes the text label will be equal to the ID.
     */
    getDataForValue: function(value) {

        return this.getItemForId(value);
    },

    /**
     * Returns the correct value for the given data.
     *
     * @param data The data to get the value for. Should be an object with 'id' and 'text'
     *             properties or null.
     *
     * @return The corresponding value. Will be an ID or null.
     */
    getValueForData: function(data) {

        return (data ? data.id : null);
    },

    /**
     * @inherit
     *
     * @param options Options object. In addition to the options supported in the base
     *                implementation, this may contain the following properties:
     *                allowClear - Boolean whether the selected item may be removed.
     *                showSearchInputInDropdown - Set to false to remove the search input used in
     *                                            dropdowns. The default is true.
     */
    setOptions: function(options) {

        options = options || {};

        options.allowedTypes = $.extend(options.allowedTypes || {}, {
            allowClear: 'boolean',
            showSearchInputInDropdown: 'boolean'
        });

        callSuper(this, 'setOptions', options);
    },

    /**
     * Validates data to set. Throws an exception if the data is invalid.
     *
     * @param data The data to validate. Should be an object with 'id' and 'text' properties or null
     *             to indicate no item is selected.
     *
     * @return The validated data. This may differ from the input data.
     */
    validateData: function(data) {

        return (data === null ? data : this.validateItem(data));
    },

    /**
     * Validates a value to set. Throws an exception if the value is invalid.
     *
     * @param value The value to validate. Should be null or a valid ID.
     *
     * @return The validated value. This may differ from the input value.
     */
    validateValue: function(value) {

        if (value === null || Select3.isValidId(value)) {
            return value;
        } else {
            throw new Error('Value for SingleSelect3 instance should be a valid ID or null');
        }
    },

    /**
     * @private
     */
    _clicked: function() {

        if (this.enabled) {
            if (this.dropdown) {
                this.close();
            } else if (this.options.showDropdown !== false) {
                this.open({ showSearchInput: this.options.showSearchInputInDropdown !== false });
            }

            return false;
        }
    },

    /**
     * @private
     */
    _itemRemoveClicked: function() {

        this.data(null);

        return false;
    },

    /**
     * @private
     */
    _rerenderSelection: function() {

        var $container = this.$('.select3-single-result-container');
        if (this._data) {
            $container.html(
                this.template('singleSelectedItem', $.extend({
                    removable: this.options.allowClear && !this.options.readOnly
                }, this._data))
            );

            $container.find('.select3-single-selected-item-remove')
                      .on('click', this._itemRemoveClicked.bind(this));
        } else {
            $container.html(
                this.template('singleSelectPlaceholder', { placeholder: this.options.placeholder })
            );
        }
    },

    /**
     * @private
     */
    _resultSelected: function(event) {

        this.data(event.item);

        this.close();
    }

});

module.exports = Select3.InputTypes.Single = SingleSelect3;

},{}],15:[function(_dereq_,module,exports){
'use strict';

var Select3 = _dereq_(7);
var Select3Dropdown = _dereq_(9);

/**
 * Extended dropdown that supports submenus.
 */
function Select3Submenu(options) {

    /**
     * Optional parent dropdown menu from which this dropdown was opened.
     */
    this.parentMenu = options.parentMenu;

    Select3Dropdown.call(this, options);

    this._closeSubmenuTimeout = 0;
}

var callSuper = Select3.inherits(Select3Submenu, Select3Dropdown, {

    /**
     * @inherit
     */
    close: function() {

        if (this.options.restoreOptions) {
            this.select3.setOptions(this.options.restoreOptions);
        }
        if (this.options.restoreResults) {
            this.select3.results = this.options.restoreResults;
        }

        if (this.submenu) {
            this.submenu.close();
        }

        callSuper(this, 'close');

        if (this.parentMenu) {
            this.parentMenu.submenu = null;
            this.parentMenu = null;
        }
    },

    /**
     * @inherit
     */
    highlight: function(item) {

        if (this.submenu) {
            if (!this.highlightedResult || this.highlightedResult.id !== item.id) {
                if (this._closeSubmenuTimeout) {
                    clearTimeout(this._closeSubmenuTimeout);
                }
                this._closeSubmenuTimeout = setTimeout(
                    this._closeSubmenuAndHighlight.bind(this, item), 100
                );
                return;
            }
        } else {
            if (this.parentMenu && this.parentMenu._closeSubmenuTimeout) {
                clearTimeout(this.parentMenu._closeSubmenuTimeout);
                this.parentMenu._closeSubmenuTimeout = 0;
            }
        }

        this._doHighlight(item);
    },

    /**
     * @inherit
     */
    selectHighlight: function() {

        if (this.submenu) {
            this.submenu.selectHighlight();
        } else {
            callSuper(this, 'selectHighlight');
        }
    },

    /**
     * @inherit
     */
    selectItem: function(id) {

        var select3 = this.select3;
        var item = Select3.findNestedById(select3.results, id);
        if (item && !item.submenu) {
            var options = { id: id, item: item };
            if (select3.triggerEvent('select3-selecting', options)) {
                select3.triggerEvent('select3-selected', options);
            }
        }
    },

    /**
     * @inherit
     */
    showResults: function(results, options) {

        if (this.submenu) {
            this.submenu.showResults(results, options);
        } else {
            callSuper(this, 'showResults', results, options);
        }
    },

    /**
     * @inherit
     */
    triggerClose: function() {

        if (this.parentMenu) {
            this.select3.$el.trigger('select3-close-submenu');
        } else {
            callSuper(this, 'triggerClose');
        }
    },

    /**
     * @inherit
     */
    triggerOpen: function() {

        if (this.parentMenu) {
            this.select3.$el.trigger('select3-open-submenu');
        } else {
            callSuper(this, 'triggerOpen');
        }
    },

    /**
     * @private
     */
    _closeSubmenuAndHighlight: function(item) {

        if (this.submenu) {
            this.submenu.close();
        }

        this._doHighlight(item);
    },

    /**
     * @private
     */
    _doHighlight: function(item) {

        callSuper(this, 'highlight', item);

        if (item.submenu && !this.submenu) {
            var select3 = this.select3;
            var Dropdown = select3.options.dropdown || Select3.Dropdown;
            if (Dropdown) {
                var quotedId = Select3.quoteCssAttr(item.id);
                var $item = this.$('.select3-result-item[data-item-id=' + quotedId + ']');
                var $dropdownEl = this.$el;

                this.submenu = new Dropdown({
                    parentMenu: this,
                    position: item.submenu.positionDropdown || function($el) {
                        var offset = $item.offset();
                        var width = $dropdownEl.width();
                        $el.css({
                            left: offset.left + width + 'px',
                            top: offset.top + 'px'
                        }).width(width);
                    },
                    restoreOptions: {
                        items: select3.items,
                        query: select3.options.query || null
                    },
                    restoreResults: select3.results,
                    select3: select3,
                    showSearchInput: item.submenu.showSearchInput
                });

                select3.setOptions({
                    items: item.submenu.items || null,
                    query: item.submenu.query || null
                });

                select3.search('');
            }
        }
    }

});

Select3.Dropdown = Select3Submenu;

Select3.findNestedById = function(array, id) {

    for (var i = 0, length = array.length; i < length; i++) {
        var item = array[i], result;
        if (item.id === id) {
            result = item;
        } else if (item.children) {
            result = Select3.findNestedById(item.children, id);
        } else if (item.submenu && item.submenu.items) {
            result = Select3.findNestedById(item.submenu.items, id);
        }
        if (result) {
            return result;
        }
    }
    return null;
};

module.exports = Select3Submenu;

},{}],16:[function(_dereq_,module,exports){
'use strict';

var escape = _dereq_(3);

var Select3 = _dereq_(7);

_dereq_(12);

/**
 * Default set of templates to use with Select3.
 *
 * Note that every template can be defined as either a string, a function returning a string (like
 * Handlebars templates, for instance) or as an object containing a render function (like Hogan.js
 * templates, for instance).
 */
Select3.Templates = {

    /**
     * Renders the dropdown.
     *
     * The template is expected to have at least one element with the class
     * 'select3-results-container', which is where all results will be added to.
     *
     * @param options Options object containing the following properties:
     *                dropdownCssClass - Optional CSS class to add to the top-level element.
     *                searchInputPlaceholder - Optional placeholder text to display in the search
     *                                         input in the dropdown.
     *                showSearchInput - Boolean whether a search input should be shown. If true,
     *                                  an input element with the 'select3-search-input' is
     *                                  expected.
     */
    dropdown: function(options) {
        var extraClass = (options.dropdownCssClass ? ' ' + options.dropdownCssClass : ''),
            searchInput = '';
        if (options.showSearchInput) {
            extraClass += ' has-search-input';

            var placeholder = options.searchInputPlaceholder;
            searchInput = (
                '<div class="select3-search-input-container">' +
                    '<input class="select3-search-input"' +
                            (placeholder ? ' placeholder="' + escape(placeholder) + '"'
                                         : '') + '>' +
                '</div>'
            );
        }
        return (
            '<div class="select3-dropdown' + extraClass + '">' +
                searchInput +
                '<div class="select3-results-container"></div>' +
            '</div>'
        );
    },

    /**
     * Renders an error message in the dropdown.
     *
     * @param options Options object containing the following properties:
     *                escape - Boolean whether the message should be HTML-escaped.
     *                message - The message to display.
     */
    error: function(options) {
        return (
            '<div class="select3-error">' +
                (options.escape ? escape(options.message) : options.message) +
            '</div>'
        );
    },

    /**
     * Renders a loading indicator in the dropdown.
     *
     * This template is expected to have an element with a 'select3-loading' class which may be
     * replaced with actual results.
     */
    loading: function() {
        return '<div class="select3-loading">' + Select3.Locale.loading + '</div>';
    },

    /**
     * Load more indicator.
     *
     * This template is expected to have an element with a 'select3-load-more' class which, when
     * clicked, will load more results.
     */
    loadMore: function() {
        return '<div class="select3-load-more">' + Select3.Locale.loadMore + '</div>';
    },

    /**
     * Renders multi-selection input boxes.
     *
     * The template is expected to have at least have elements with the following classes:
     * 'select3-multiple-input-container' - The element containing all the selected items and the
     *                                      input for selecting additional items.
     * 'select3-multiple-input' - The actual input element that allows the user to type to search
     *                            for more items. When selected items are added, they are inserted
     *                            right before this element.
     * 'select3-width-detector' - This element is optional, but important to make sure the
     *                            '.select3-multiple-input' element will fit in the container. The
     *                            width detector also has the 'select2-multiple-input' class on
     *                            purpose to be able to detect the width of text entered in the
     *                            input element.
     *
     * @param options Options object containing the following property:
     *                enabled - Boolean whether the input is enabled.
     */
    multipleSelectInput: function(options) {
        return (
            '<div class="select3-multiple-input-container">' +
                (options.enabled ? '<input type="text" autocomplete="off" autocorrect="off" ' +
                                          'autocapitalize="off" class="select3-multiple-input">' +
                                   '<span class="select3-multiple-input select3-width-detector">' +
                                   '</span>'
                                 : '<div class="select3-multiple-input select3-placeholder">' +
                                   '</div>') +
                '<div class="clearfix"></div>' +
            '</div>'
        );
    },

    /**
     * Renders a selected item in multi-selection input boxes.
     *
     * The template is expected to have a top-level element with the class
     * 'select3-multiple-selected-item'. This element is also required to have a 'data-item-id'
     * attribute with the ID set to that passed through the options object.
     *
     * An element with the class 'select3-multiple-selected-item-remove' should be present which,
     * when clicked, will cause the element to be removed.
     *
     * @param options Options object containing the following properties:
     *                highlighted - Boolean whether this item is currently highlighted.
     *                id - Identifier for the item.
     *                removable - Boolean whether a remove icon should be displayed.
     *                text - Text label which the user sees.
     */
    multipleSelectedItem: function(options) {
        var extraClass = (options.highlighted ? ' highlighted' : '');
        return (
            '<span class="select3-multiple-selected-item' + extraClass + '" ' +
                  'data-item-id="' + escape(options.id) + '">' +
                escape(options.text) +
                (options.removable ? '<a class="select3-multiple-selected-item-remove">' +
                                         '<i class="fa fa-remove"></i>' +
                                     '</a>'
                                   : '') +
            '</span>'
        );
    },

    /**
     * Renders a message there are no results for the given query.
     *
     * @param options Options object containing the following property:
     *                term - Search term the user is searching for.
     */
    noResults: function(options) {
        var Locale = Select3.Locale;
        return (
            '<div class="select3-error">' +
                (options.term ? Locale.noResultsForTerm(options.term) : Locale.noResults) +
            '</div>'
        );
    },

    /**
     * Renders a container for item children.
     *
     * The template is expected to have an element with the class 'select3-result-children'.
     *
     * @param options Options object containing the following property:
     *                childrenHtml - Rendered HTML for the children.
     */
    resultChildren: function(options) {
        return '<div class="select3-result-children">' + options.childrenHtml + '</div>';
    },

    /**
     * Render a result item in the dropdown.
     *
     * The template is expected to have a top-level element with the class 'select3-result-item'.
     * This element is also required to have a 'data-item-id' attribute with the ID set to that
     * passed through the options object.
     *
     * @param options Options object containing the following properties:
     *                id - Identifier for the item.
     *                text - Text label which the user sees.
     *                submenu - Truthy if the result item has a menu with subresults.
     */
    resultItem: function(options) {
        return (
            '<div class="select3-result-item" data-item-id="' + escape(options.id) + '">' +
                escape(options.text) +
                (options.submenu ? '<i class="select3-submenu-icon fa fa-chevron-right"></i>'
                                 : '') +
            '</div>'
        );
    },

    /**
     * Render a result label in the dropdown.
     *
     * The template is expected to have a top-level element with the class 'select3-result-label'.
     *
     * @param options Options object containing the following properties:
     *                text - Text label.
     */
    resultLabel: function(options) {
        return '<div class="select3-result-label">' + escape(options.text) + '</div>';
    },

    /**
     * Renders single-select input boxes.
     *
     * The template is expected to have at least one element with the class
     * 'select3-single-result-container' which is the element containing the selected item or the
     * placeholder.
     */
    singleSelectInput: (
        '<div class="select3-single-select">' +
            '<div class="select3-single-result-container"></div>' +
            '<i class="fa fa-sort-desc select3-caret"></i>' +
        '</div>'
    ),

    /**
     * Renders the placeholder for single-select input boxes.
     *
     * The template is expected to have a top-level element with the class 'select3-placeholder'.
     *
     * @param options Options object containing the following property:
     *                placeholder - The placeholder text.
     */
    singleSelectPlaceholder: function(options) {
        return (
            '<div class="select3-placeholder">' +
                escape(options.placeholder) +
            '</div>'
        );
    },

    /**
     * Renders the selected item in single-select input boxes.
     *
     * The template is expected to have a top-level element with the class
     * 'select3-single-selected-item'. This element is also required to have a 'data-item-id'
     * attribute with the ID set to that passed through the options object.
     *
     * @param options Options object containing the following properties:
     *                id - Identifier for the item.
     *                removable - Boolean whether a remove icon should be displayed.
     *                text - Text label which the user sees.
     */
    singleSelectedItem: function(options) {
        return (
            '<span class="select3-single-selected-item" ' +
                  'data-item-id="' + escape(options.id) + '">' +
                (options.removable ? '<a class="select3-single-selected-item-remove">' +
                                         '<i class="fa fa-remove"></i>' +
                                     '</a>'
                                   : '') +
                escape(options.text) +
            '</span>'
        );
    }

};

},{}],17:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Select3 = _dereq_(7);

function defaultTokenizer(input, selection, createToken, options) {

    var createTokenItem = options.createTokenItem || function(token) {
        return token ? { id: token, text: token } : null;
    };

    var separators = options.tokenSeparators;

    function hasToken(input) {
        return input ? separators.some(function(separator) {
            return input.indexOf(separator) > -1;
        }) : false;
    }

    function takeToken(input) {
        for (var i = 0, length = input.length; i < length; i++) {
            if (separators.indexOf(input[i]) > -1) {
                return { term: input.slice(0, i), input: input.slice(i + 1) };
            }
        }
        return {};
    }

    while (hasToken(input)) {
        var token = takeToken(input);
        if (token.term) {
            var item = createTokenItem(token.term);
            if (item && !Select3.findById(selection, item.id)) {
                createToken(item);
            }
        }
        input = token.input;
    }

    return input;
}

/**
 * Option listener that provides a default tokenizer which is used when the tokenSeparators option
 * is specified.
 *
 * @param options Options object. In addition to the options supported in the multi-input
 *                implementation, this may contain the following property:
 *                tokenSeparators - Array of string separators which are used to separate the search
 *                                  string into tokens. If specified and the tokenizer property is
 *                                  not set, the tokenizer property will be set to a function which
 *                                  splits the search term into tokens separated by any of the given
 *                                  separators. The tokens will be converted into selectable items
 *                                  using the 'createTokenItem' function. The default tokenizer also
 *                                  filters out already selected items.
 */
Select3.OptionListeners.push(function(select3, options) {

    if (options.tokenSeparators) {
        options.allowedTypes = $.extend({ tokenSeparators: 'array' }, options.allowedTypes);

        options.tokenizer = options.tokenizer || defaultTokenizer;
    }
});

},{}],18:[function(_dereq_,module,exports){
'use strict';

var $ = window.jQuery || window.Zepto;

var Select3 = _dereq_(7);

function replaceSelectElement($el, options) {

    var value = (options.multiple ? [] : null);

    var mapOptions = function() {
        var $this = $(this);
        if ($this.is('option')) {
            var id = $this.attr('value') || $this.text();
            if ($this.prop('selected')) {
                if (options.multiple) {
                    value.push(id);
                } else {
                    value = id;
                }
            }

            return {
                id: id,
                text: $this.attr('label') || $this.text()
            };
        } else {
            return {
                text: $this.attr('label'),
                children: $this.children('option,optgroup').map(mapOptions).get()
            };
        }
    };

    options.allowClear = ('allowClear' in options ? options.allowClear : !$el.prop('required'));

    options.items = $el.children('option,optgroup').map(mapOptions).get();

    options.placeholder = options.placeholder || $el.data('placeholder') || '';

    options.value = value;

    var $div = $('<div>').attr({
        'class': $el.attr('class'),
        'id': $el.attr('id'),
        'name': $el.attr('name'),
        'style': $el.attr('style')
    });
    $el.replaceWith($div);
    return $div;
}

/**
 * Option listener providing support for converting traditional <select> boxes into Select3
 * instances.
 */
Select3.OptionListeners.push(function(select3, options) {

    var $el = select3.$el;
    if ($el.is('select')) {
        if ($el.attr('autofocus')) {
            setTimeout(function() {
                select3.focus();
            }, 1);
        }

        select3.$el = replaceSelectElement($el, options);
        select3.$el[0].select3 = select3;
    }
});

},{}]},{},[1])(1)
});